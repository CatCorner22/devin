#!/usr/bin/env python3
"""hinshitsu check: test the form of a run's record.

Usage: hinshitsu_check.py [--stage plan|unit|delivery] <run-folder>
       hinshitsu_check.py --record <run-folder>   (state files against the log, rule 14.6)
Exit 0 when every check for the stage passes, 1 when any fails, 2 on a usage error.
Standard library only. Same folder in, same verdict out.

This script tests the shape of the record: that entries, citations, cells and
files exist and agree with each other. It does not prove that any check ran or
that any report is true (rule 17.7).
"""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hinshitsu_text import BANNED_RE, strip_quotes  # noqa: E402

TYPES = set("""CAPABILITY TIER STAGE VOC GAP ASSUMPTION CRITERIA CRITERIA-CHANGE CARD ANSWER
RECONCILIATION DECISION TRACE LAUNCH FINDING RESOLUTION OVERRULE PROBE CHECK COMPACTION REVERSAL
ABANDONED ROLLBACK WAIVER CORRECTION DELIVERY LESSON""".split())
HEADING = re.compile(r"^### E-(\d+) · ([^·]*) · ([A-Z-]+) · (.*)$")
CLASSES = ("BLOCKER", "DEFECT", "FRAGILITY", "STYLE")
REPORT_HEADINGS = ["Check it yourself in 5 minutes", "Summary", "Status", "Voice of the Customer",
                   "Gaps filled", "Lens reconciliation", "Red-cell verdict", "Swarm verdict",
                   "Coverage ledger", "Maps", "Audit log", "LESSONS"]
FILE_RULE = {"AUDIT-LOG.md": "9.4", "FRAMEWORK.md": "7.1", "CONNECTIONS.md": "9.3", "SESSION-STATE.md": "8.1",
             "MINDMAP.md": "9.2", "COVERAGE-LEDGER.md": "10.1", "DELIVERY-REPORT.md": "19.1", "GAUGE.svg": "24.1"}
# The first arrow link on a line that starts with a node name: arrow (-->), thick arrow (==>) or
# dotted arrow (-.->), of any length, with no |label| after it. Later links on the line are not tested.
# Written in the first run under version 2.1.0; its record is `runs/2.1.0-mermaid-edges/`.
EDGE_RE = re.compile(r"^\s*(\w+)([^\n|]*?)(--+>|==+>|-?\.+->)(?!\|)\s*(\w+)", re.M)
MERMAID_RE = re.compile(r"^\s*```mermaid[^\n]*\n(.*?)(?:^\s*```|\Z)", re.M | re.S)
NODE_TEXT_RE = re.compile(r'"[^"\n]*"|\[[^\]\n]*\]|\([^)\n]*\)|\{[^}\n]*\}')
# A label written between the 2 halves of a link (-- text -->, == text ==>, -. text .->): the opener,
# which is not a cross or circle end (--x, --o), then text that holds no other link.
LABEL_OPEN_RE = {kind: re.compile(r"(?<![-=.])%s(?![-=.>]|[xo]\s)(?=\s*\S)(?:(?!--|==|-\.).)*$" % opener)
                 for kind, opener in (("-", "--"), ("=", "=="), (".", r"-\."))}
STAGE_FILES = {
    "plan": ["AUDIT-LOG.md", "FRAMEWORK.md", "CONNECTIONS.md", "SESSION-STATE.md"],
    "unit": ["AUDIT-LOG.md", "FRAMEWORK.md", "CONNECTIONS.md", "SESSION-STATE.md", "MINDMAP.md",
             "COVERAGE-LEDGER.md"],
    "delivery": ["AUDIT-LOG.md", "FRAMEWORK.md", "CONNECTIONS.md", "SESSION-STATE.md", "MINDMAP.md",
                 "COVERAGE-LEDGER.md", "DELIVERY-REPORT.md", "GAUGE.svg"],
}


def parse_log(text):
    out, cur = [], None
    for line in text.splitlines():
        m = HEADING.match(line)
        if m:
            cur = {"n": int(m.group(1)), "time": m.group(2).strip(), "type": m.group(3),
                   "role": m.group(4).strip(), "lines": []}
            out.append(cur)
        elif line.startswith("### E-"):  # any other sub-heading belongs to the entry it stands in
            out.append({"n": None, "type": None, "bad": line, "lines": []})
            cur = out[-1]
        elif cur is not None:
            cur["lines"].append(line)
    for e in out:
        e["body"] = "\n".join(e["lines"])
    return out


def field(body, name):
    # [ \t]* and not \s*: an empty field must not take the next line as its value.
    m = re.search(r"^- %s:[ \t]*(.*)$" % re.escape(name), body, re.M)
    return (m.group(1).strip() or None) if m else None


def criteria_ids_of(crit, changes=()):
    """IDs in the newest CRITERIA entry and in each CRITERIA-CHANGE entry (rule 3.5).

    A CRITERION is a list item or a table row that starts with C<n>, with or without marks.
    """
    if not crit:
        return set()
    bodies = [crit[-1]["body"]] + [e["body"] for e in changes]
    return set(re.findall(r"^[-*\d.\s`|]*\**`?(C\d+)\b", "\n".join(bodies), re.M))


UTC_TIME = re.compile(r"\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d)?Z")
FINDING_ID = re.compile(r"F-\d+")


def finding_id(body):
    """Return the ID of a FINDING entry, the first word of its ID field, or None where that word is not F-<n>.

    The gauge applies the same test (tests/test_gauge.py compares the 2)."""
    fid = field(body, "ID")
    fid = fid.split()[0] if fid else None
    return fid if fid and FINDING_ID.fullmatch(fid) else None


QUOTE = r'["“][^"”\n]+["”]'
def artifact_bases(folder):
    """The folders an artifact path is tested against: the RUN FOLDER, and each folder above it up to the
    root of its repository. Where no repository holds the run, the RUN FOLDER alone."""
    run = folder.resolve()
    above = []
    for parent in run.parents:
        above.append(parent)
        if (parent / ".git").exists():
            return [run] + above
    return [run]


def holds_identifier(line, identifier):
    """True when the identifier stands in the line as a whole word."""
    # Devin prints a session identifier with or without its "devin-" prefix.
    return re.search(r"(?<![\w-])(?:devin-)?%s(?![\w-])" % re.escape(identifier), line) is not None


PASSED_LINE = re.compile(r"(?:^|[—:;-])\s*`?passed`?\.?$")
PLANNED_RUNS = re.compile(r"Planned SUB-AGENT runs:\s*(\d+)")


def last_line(path):
    lines = path.read_text(encoding="utf-8").strip().splitlines()
    return lines[-1].strip() if lines else ""


def planned_runs(entries):
    """The budget of rule 0.9 as the first TIER entry states it, or None."""
    for e in entries:
        if e["type"] == "TIER":
            m = PLANNED_RUNS.search(e["body"])
            return int(m.group(1)) if m else None
    return None


def first_launch_over_budget(entries):
    """Return (entry number, ordinal, budget) of the first LAUNCH past the budget, or None.

    The budget is the number in the first TIER entry. An ANSWER entry that states a higher number raises it
    from that entry on, whether the planned runs are used yet or not; an ANSWER with no number changes nothing.
    """
    budget = planned_runs(entries)
    if budget is None:
        return None
    used = 0
    for e in entries:
        if e["type"] == "ANSWER":
            m = PLANNED_RUNS.search(e["body"])
            if m:
                budget = max(budget, int(m.group(1)))
        elif e["type"] == "LAUNCH":
            used += 1
            if used > budget:
                return e["n"], used, budget
    return None


def check(folder, stage):
    folder = Path(folder)
    errors = []
    err = errors.append
    for name in STAGE_FILES[stage]:
        if not (folder / name).is_file():
            err("%s: file is missing (rule %s)" % (name, FILE_RULE[name]))
    log_path = folder / "AUDIT-LOG.md"
    if not log_path.is_file():
        return errors
    log = parse_log(log_path.read_text(encoding="utf-8"))

    # --- log form (rules 9.4, 9.6) ---
    expected = 1
    before = None  # the last entry whose time has the UTC form of rule 9.4
    for e in log:
        if e["n"] is None:
            err("AUDIT-LOG.md: heading %r does not follow rule 9.4" % e["bad"])
            continue
        if e["n"] != expected:
            err("AUDIT-LOG.md: entry E-%d where E-%d belongs (rule 9.4)" % (e["n"], expected))
        expected = e["n"] + 1
        if e["type"] not in TYPES:
            err("AUDIT-LOG.md: E-%d has unknown type %s (rule 9.4)" % (e["n"], e["type"]))
        if not e["time"]:
            err("AUDIT-LOG.md: E-%d has no time and no `no clock` (rule 0.6)" % e["n"])
        elif UTC_TIME.fullmatch(e["time"]):
            # Times in this form sort as text. Seconds are optional, so only the shared length is compared.
            if before and e["time"][:16] < before["time"][:16]:
                err("AUDIT-LOG.md: E-%d has a time earlier than E-%d (rule 0.6)" % (e["n"], before["n"]))
            before = e
        for ref in re.findall(r"\bE-(\d+)\b", e["body"]):
            if int(ref) > e["n"]:
                err("AUDIT-LOG.md: E-%d cites later entry E-%s (rule 9.6)" % (e["n"], ref))
    entries = [e for e in log if e["n"] is not None]
    by_type = {}
    for e in entries:
        by_type.setdefault(e["type"], []).append(e)

    # Rule 0.1: the probe's LAUNCH entry is E-1 and the CAPABILITY entry is E-2. A log written before
    # that amendment opens with the CAPABILITY entry; both forms are read.
    if (len(entries) > 1 and entries[0]["type"] == "LAUNCH" and entries[1]["type"] == "CAPABILITY"
            and "capability-probe" in (field(entries[0]["body"], "Report") or "")):
        entries_cap = entries[1]
    else:
        entries_cap = entries[0] if entries else None
    if not entries_cap or entries_cap["type"] != "CAPABILITY":
        err("AUDIT-LOG.md: the log does not open with the probe's LAUNCH entry and a CAPABILITY entry (rule 0.1)")
    else:
        cap = entries_cap["body"]
        for part in range(1, 6):
            if not re.search(r"SWARM-CAPABLE part %d[^\n:]*:\s*(yes|no)\b" % part, cap):
                err("AUDIT-LOG.md: E-%d does not answer SWARM-CAPABLE part %d (rule 0.1)" % (entries_cap["n"], part))
        mode = field(cap, "Mode") or ""
        if not mode.startswith(("SWARM", "DEGRADED")):
            err("AUDIT-LOG.md: E-%d states no mode (rule 0.1)" % entries_cap["n"])
        if mode.startswith("SWARM") and re.search(r"SWARM-CAPABLE part \d[^\n:]*:\s*no\b", cap):
            err("AUDIT-LOG.md: E-%d says SWARM with a part answered no (rule 0.3)" % entries_cap["n"])
        probe = folder / "evidence" / "capability-probe.md"
        if mode.startswith("SWARM") and not (probe.is_file() and probe.read_text(encoding="utf-8").strip()):
            err("evidence/capability-probe.md: missing or empty in a SWARM run (rule 0.2)")
    if "TIER" not in by_type:
        err("AUDIT-LOG.md: no TIER entry (rule 0.5)")
    for t in ("VOC", "GAP", "ASSUMPTION", "CRITERIA"):
        if t not in by_type:
            err("AUDIT-LOG.md: no %s entry (sections 2, 3, 4, 23)" % t)

    # --- stages (rule 0.7) ---
    state = {}
    for e in by_type.get("STAGE", []):
        m = re.match(r"(S\d+)\b", field(e["body"], "Stage") or "")
        ev = (field(e["body"], "Event") or "").split()[0:1]
        if not m or not ev or ev[0] not in ("start", "end", "progress", "skipped"):
            err("AUDIT-LOG.md: E-%d STAGE entry lacks Stage or Event (rule 0.7)" % e["n"])
            continue
        sid, ev = m.group(1), ev[0]
        if ev == "skipped" and not re.search(r"\w", (field(e["body"], "Event") or "")[len("skipped"):]):
            err("AUDIT-LOG.md: E-%d skips %s with no reason (rule 0.7)" % (e["n"], sid))
        if ev == "start" and not re.search(r"\b[0-9a-fA-F]{64}\b", e["body"]):
            err("AUDIT-LOG.md: E-%d start of %s has no SHA-256 of the skill read (rule 0.7)" % (e["n"], sid))
        if ev == "end" and state.get(sid) != "start":
            err("AUDIT-LOG.md: E-%d ends %s with no start entry (rule 0.7)" % (e["n"], sid))
        if ev == "end":
            # Only the Artifacts field names files to test; other fields may quote text that looks like a path.
            # A path is tested against the RUN FOLDER and against each folder above it, never against the working directory.
            for path in re.findall(r"`([^`\s]+\.[A-Za-z0-9]+)`", field(e["body"], "Artifacts") or ""):
                if path.startswith("/") or ".." in Path(path).parts:
                    err("AUDIT-LOG.md: E-%d names artifact %s, which is outside the RUN FOLDER and its repository "
                        "(rule 0.7)" % (e["n"], path))
                    continue
                if not any((b / path).exists() for b in artifact_bases(folder)):
                    err("AUDIT-LOG.md: E-%d names artifact %s, which does not exist (rule 0.7)" % (e["n"], path))
        if ev != "progress":
            state[sid] = ev
    needed = {"plan": range(1, 7), "unit": range(1, 7), "delivery": range(1, 12)}[stage]
    for i in needed:
        sid = "S%d" % i
        if state.get(sid) not in ("end", "skipped"):
            err("AUDIT-LOG.md: stage %s has no end or skipped entry (rule 0.7)" % sid)

    # --- criteria approval (rules 3.2 and 3.4) ---
    crit = by_type.get("CRITERIA", [])
    if crit:
        last = crit[-1]["body"]
        frozen = re.search(r"^- (?:State|Status):\s*FROZEN", last, re.M)
        quoted = re.search(r"^- Approval:[^\n]*" + QUOTE, last, re.M)
        if frozen and not quoted:
            err("AUDIT-LOG.md: E-%d is FROZEN with no quoted approval (rule 3.4)" % crit[-1]["n"])
        if stage in ("unit", "delivery") and not frozen:
            err("AUDIT-LOG.md: CRITERIA are not FROZEN; no WORK UNIT may be reported VERIFIED (rule 3.2)")

    # --- custody (rules 1.5 to 1.7) ---
    cited_reports = []  # in LAUNCH order, so that the newest final audit is the last
    degraded_reports = []
    for e in by_type.get("LAUNCH", []):
        b = e["body"]
        scope = re.search(r"`(prompts/[^`]+)`", field(b, "Scope") or "")
        report = re.search(r"`((?:audits|memos|evidence)/[^`]+)`", field(b, "Report") or "")
        ident = field(b, "SUB-AGENT identifier")
        ident = ident.split()[0] if ident else ident  # the identifier is the first word; a link may follow
        if not scope or not (folder / scope.group(1)).is_file():
            err("AUDIT-LOG.md: E-%d LAUNCH scope file is missing (rule 1.5)" % e["n"])
        if not ident or ident.startswith("<") or ident.strip("`.").lower() in ("none", "n/a", "unknown", "tbd"):
            err("AUDIT-LOG.md: E-%d LAUNCH has no SUB-AGENT identifier (rule 1.5)" % e["n"])
        if not (field(b, "Commit") or field(b, "Commit under review")):
            err("AUDIT-LOG.md: E-%d LAUNCH names no commit and no `no git` (rule 1.5)" % e["n"])
        if not report or not (folder / report.group(1)).is_file():
            err("AUDIT-LOG.md: E-%d LAUNCH has no saved report (rule 1.7)" % e["n"])
            continue
        cited_reports.append(report.group(1))
        lines = (folder / report.group(1)).read_text(encoding="utf-8").splitlines()
        first = lines[0] if lines else ""
        # Devin prints a session identifier with or without its "devin-" prefix.
        bare = ident[len("devin-"):] if ident and ident.startswith("devin-") else ident
        if re.match(r"\W*DEGRADED\b", first):  # any separator after the word (rule 21.2)
            degraded_reports.append(report.group(1))
            if not any((field(c["body"], "Mode") or "").startswith("DEGRADED") for c in by_type.get("CAPABILITY", [])):
                err("%s: first line says DEGRADED, and no CAPABILITY entry states Mode: DEGRADED (rule 21.3)" % report.group(1))
        elif ident and not holds_identifier(first, bare):
            err("%s: first line does not hold the identifier of E-%d (rule 1.6)" % (report.group(1), e["n"]))
        if report.group(1).startswith(("audits/", "memos/")) and not re.search(r"(?<![A-Za-z0-9])E-%d(?!\d)" % e["n"], Path(report.group(1)).stem):
            err("%s: file name does not hold E-%d, the ID of its LAUNCH entry (rule 1.6)" % (report.group(1), e["n"]))
    for sub in ("audits", "memos"):
        d = folder / sub
        if d.is_dir():
            for p in sorted(x for x in d.rglob("*") if x.is_file()):
                rel = p.relative_to(folder).as_posix()
                if rel not in cited_reports:
                    err("%s: report matches no LAUNCH entry (rule 1.8)" % rel)

    # --- findings (rules 15.1, 15.4, 15.5, 15.6) ---
    findings = {}
    for e in by_type.get("FINDING", []):
        b = e["body"]
        fid = finding_id(b)
        if not fid:
            raw = field(b, "ID")
            if not raw:
                err("AUDIT-LOG.md: E-%d FINDING has no ID (rule 15.1)" % e["n"])
            else:
                err("AUDIT-LOG.md: E-%d FINDING ID %s is not F-<n> (rule 9.5)" % (e["n"], raw.split()[0]))
            continue
        # An AUDITOR's words are copied whole, so the class word may carry a full stop or a comma.
        cls = [w.strip(".,;:") for w in (field(b, "Class") or "").split()[0:1]]
        if not cls or cls[0] not in CLASSES:
            err("AUDIT-LOG.md: %s has no class (rule 15.1)" % fid)
        for name in ("Where", "Trigger", "Violates", "Raised by", "Lens"):
            if not field(b, name):
                err("AUDIT-LOG.md: %s lacks the field %s (rule 15.1)" % (fid, name))
        if fid in findings:
            err("AUDIT-LOG.md: %s is logged 2 times (rule 9.5)" % fid)
        findings[fid] = {"class": cls[0] if cls else "", "closed": 0, "n": e["n"]}
    for e in by_type.get("RESOLUTION", []) + by_type.get("OVERRULE", []):
        b = e["body"]
        fid = (field(b, "Finding") or "?").split()[0]
        if fid not in findings:
            err("AUDIT-LOG.md: E-%d closes %s, which has no FINDING entry (rule 15.4)" % (e["n"], fid))
            continue
        findings[fid]["closed"] += 1
        if e["type"] == "OVERRULE":
            if findings[fid]["class"] == "BLOCKER":
                err("AUDIT-LOG.md: E-%d overrules BLOCKER %s (rule 14.4)" % (e["n"], fid))
            elif findings[fid]["class"] in ("DEFECT", "FRAGILITY") and not re.search(r"USER\b[^\n]*" + QUOTE, b):
                err("AUDIT-LOG.md: E-%d overrules %s with no quoted USER message (rule 15.5)" % (e["n"], fid))
        else:
            result = (field(b, "Result") or "").split()[0:1]
            if not result or result[0] not in ("FIXED", "WITHDRAWN"):
                err("AUDIT-LOG.md: E-%d has no result FIXED or WITHDRAWN (rule 15.4)" % e["n"])
            if re.search(r"^- Record fault: yes", b, re.M) and findings[fid]["class"] != "DEFECT":
                err("AUDIT-LOG.md: E-%d closes %s %s as a record fault; rule 14.6 covers a DEFECT only"
                    % (e["n"], findings[fid]["class"], fid))
            elif re.search(r"^- Record fault: yes", b, re.M):
                rc = re.search(r"`(evidence/record-check-[^`]+)`", b)
                if not rc or not (folder / rc.group(1)).is_file():
                    err("AUDIT-LOG.md: E-%d cites no existing record-check output (rule 14.6)" % e["n"])
                elif "hinshitsu_check (record): 0 failure(s)." not in (folder / rc.group(1)).read_text(encoding="utf-8"):
                    err("AUDIT-LOG.md: E-%d cites %s, which does not show 0 failures (rule 14.6)" % (e["n"], rc.group(1)))
            else:
                ra = re.search(r"`(audits/[^`]+)`", b)
                if not ra or not (folder / ra.group(1)).is_file():
                    err("AUDIT-LOG.md: E-%d cites no existing re-audit report (rule 14.3)" % e["n"])
                elif (not ("-seed-" in ra.group(1) and result == ["WITHDRAWN"])  # rule 16.7: the planted defect
                      and not any(x["n"] > findings[fid]["n"] and ra.group(1) in (field(x["body"], "Report") or "")
                             for x in by_type.get("LAUNCH", []))):
                    err("AUDIT-LOG.md: E-%d cites %s, which matches no LAUNCH entry later than the FINDING (rule 14.3)"
                        % (e["n"], ra.group(1)))
    for fid, f in findings.items():
        if f["closed"] > 1:
            err("AUDIT-LOG.md: %s has %d closing entries (rule 15.4)" % (fid, f["closed"]))
    open_ids = sorted(fid for fid, f in findings.items() if f["closed"] == 0)

    # --- governed words (drafting rule) ---
    for name in ("AUDIT-LOG.md", "FRAMEWORK.md", "SESSION-STATE.md", "MINDMAP.md", "CONNECTIONS.md",
                 "COVERAGE-LEDGER.md", "DELIVERY-REPORT.md"):
        p = folder / name
        if p.is_file():
            text = p.read_text(encoding="utf-8")
            # Code spans may name a file or a function; a placeholder inside one is still a placeholder.
            for i, (line, with_code) in enumerate(zip(strip_quotes(text).splitlines(),
                                                      strip_quotes(text, code_spans=False).splitlines()), 1):
                for m in BANNED_RE.finditer(line):
                    err("%s:%d: banned word %r (banned-word rule of the conductor)" % (name, i, m.group(1)))
                if "<…>" in with_code or re.search(r"<[a-z][^<>|]*\|[^<>]*>", with_code):
                    err("%s:%d: template placeholder left in place" % (name, i))

    # --- connections (rule 9.3) ---
    p = folder / "CONNECTIONS.md"
    if p.is_file():
        text = p.read_text(encoding="utf-8")
        blocks = MERMAID_RE.findall(text)  # with no mermaid block, every line is read
        for m in EDGE_RE.finditer("\n".join(blocks) if blocks else text):
            src, before, arrow, dst = m.groups()
            kind = "=" if "=" in arrow else "." if "." in arrow else "-"
            labeled = LABEL_OPEN_RE[kind].search(NODE_TEXT_RE.sub("_", before))
            if not labeled and not arrow.startswith("."):  # a bare .-> closes a label; alone it is no link
                err("CONNECTIONS.md: edge %s %s %s has no label (rule 9.3)" % (src, arrow, dst))

    if stage == "plan":
        return errors

    # --- ledger (section 10) ---
    p = folder / "COVERAGE-LEDGER.md"
    if p.is_file():
        in_ledger = False  # the Totals table and any other table are not ledger rows
        ledger_rows = 0
        for i, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
            if not line.startswith("|"):
                in_ledger = False
                continue
            if re.match(r"\|\s*Row\s*\|", line):
                in_ledger = True
                continue
            if re.match(r"\|\s*-", line) or not in_ledger:
                continue
            ledger_rows += 1
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if len(cells) != 11:
                err("COVERAGE-LEDGER.md:%d: row has %d cells; 11 required (rule 10.2)" % (i, len(cells)))
                continue
            for c in cells[1:]:
                if not c:
                    if stage == "delivery":
                        err("COVERAGE-LEDGER.md:%d: empty cell (rule 10.6)" % i)
                    continue
                m = re.match(r"(`?)(PASS|FAIL|N/A|UNVERIFIED)\1(?![\w`])\s*(.*)$", c)
                if not m:
                    err("COVERAGE-LEDGER.md:%d: cell %r is not PASS, FAIL, N/A or UNVERIFIED (rule 10.3)" % (i, c))
                    continue
                kind, rest = m.group(2), m.group(3).strip(" —-")
                if kind == "PASS":
                    ev = re.search(r"`((?:audits|evidence)/[^`]+)`", rest)
                    if not ev:
                        err("COVERAGE-LEDGER.md:%d: PASS cites no report or evidence (rule 10.5)" % i)
                    elif not (folder / ev.group(1).split("#")[0]).is_file():
                        err("COVERAGE-LEDGER.md:%d: PASS cites %s, which does not exist (rule 17.4)" % (i, ev.group(1)))
                    elif ev.group(1).startswith("audits/") and ev.group(1).split("#")[0] not in cited_reports:
                        err("COVERAGE-LEDGER.md:%d: PASS cites %s, which matches no LAUNCH entry (rule 10.5)"
                            % (i, ev.group(1)))
                elif kind == "FAIL":
                    fm = re.search(r"F-\d+", rest)
                    if not fm or fm.group(0) not in findings:
                        err("COVERAGE-LEDGER.md:%d: FAIL names no logged FINDING (rule 10.3)" % i)
                elif not rest:
                    err("COVERAGE-LEDGER.md:%d: %s gives no reason (rule 10.3)" % (i, kind))
        if ledger_rows == 0:
            err("COVERAGE-LEDGER.md: the ledger has no row (rule 10.1)")

    if stage == "unit":
        return errors

    # --- delivery report (sections 17, 19, 20) ---
    p = folder / "DELIVERY-REPORT.md"
    if p.is_file():
        text = p.read_text(encoding="utf-8")
        heads = re.findall(r"^## (.+)$", text, re.M)
        if heads != REPORT_HEADINGS:
            err("DELIVERY-REPORT.md: headings %s; rule 19.1 requires %s" % (heads, REPORT_HEADINGS))
        sections = dict((h, b) for h, b in re.findall(r"^## ([^\n]+)\n(.*?)(?=^## |\Z)", text, re.M | re.S))
        summary = sections.get("Summary", "")
        words = len(re.findall(r"\S+", re.sub(r"\[[^\]]*\]", "", summary)))
        if words > 200:
            err("DELIVERY-REPORT.md: Summary has %d words; limit 200 (rule 19.3)" % words)
        for sub in ("What you got", "What was proven", "What was not proven", "What you need to decide next"):
            if "**%s" % sub not in summary:
                err("DELIVERY-REPORT.md: Summary lacks %r (rule 19.3)" % sub)
        checks = sections.get("Check it yourself in 5 minutes", "")
        if len(re.findall(r"^\d+\. ", checks, re.M)) != 3:
            err("DELIVERY-REPORT.md: the 5-minute section does not hold exactly 3 checks (rule 19.2)")
        status = sections.get("Status", "").strip()
        is_done = status.startswith("DONE")
        if not (is_done or status.startswith("DELIVERED — NOT DONE")):
            err("DELIVERY-REPORT.md: Status is neither DONE nor DELIVERED — NOT DONE (rule 19.4)")
        ledger = (folder / "COVERAGE-LEDGER.md")
        ledger_text = ledger.read_text(encoding="utf-8") if ledger.is_file() else ""
        unverified_criteria = [l for l in ledger_text.splitlines()
                               if re.match(r"\|[\s`*]*C\d+", l) and "UNVERIFIED" in l]
        criterion_rows = set(re.findall(r"^\|[\s`*]*(C\d+)\b", ledger_text, re.M))
        criteria_ids = criteria_ids_of(crit, by_type.get("CRITERIA-CHANGE", []))
        if is_done and not criteria_ids:
            err("DELIVERY-REPORT.md: Status DONE, and the newest CRITERIA entry lists no CRITERION (DONE, part 1)")
        if is_done and criteria_ids - criterion_rows:
            err("DELIVERY-REPORT.md: Status DONE, and the ledger has no row for %s (DONE, part 1)"
                % ", ".join(sorted(criteria_ids - criterion_rows, key=lambda c: int(c[1:]))))
        if is_done and degraded_reports:
            err("DELIVERY-REPORT.md: Status DONE with a DEGRADED report, %s (rule 21.6)" % degraded_reports[0])
        if is_done and open_ids:
            err("DELIVERY-REPORT.md: Status DONE with open FINDINGS %s (DONE, parts 2 and 3)" % ", ".join(open_ids))
        for l in ledger_text.splitlines():
            if is_done and re.match(r"\|[\s`*]*C\d+", l) and (re.search(r"\bFAIL\b", l) or not re.search(r"\bPASS\b", l)):
                err("DELIVERY-REPORT.md: Status DONE, and CRITERION row %s holds FAIL or holds no PASS (DONE, part 1)"
                    % l.split("|")[1].strip())
        if is_done and unverified_criteria:
            err("DELIVERY-REPORT.md: Status DONE with %d UNVERIFIED CRITERION rows (rule 22.4)" % len(unverified_criteria))
        if is_done and any((field(c["body"], "Mode") or "").startswith("DEGRADED") for c in by_type.get("CAPABILITY", [])):
            err("DELIVERY-REPORT.md: Status DONE in a DEGRADED run (rule 21.6)")
        for fid in open_ids:
            if not re.search(r"\b%s\b" % re.escape(fid), text):
                err("DELIVERY-REPORT.md: open FINDING %s is not listed (rule 15.6)" % fid)
        for path in sorted(set(re.findall(r"`((?:audits|memos|evidence|prompts)/[^`\s<>]+)`", text))):
            if not (folder / path.split("#")[0]).is_file():
                err("DELIVERY-REPORT.md: cites %s, which does not exist (rule 17.4)" % path)
        for ref in sorted(set(re.findall(r"\bE-(\d+)\b", text)), key=int):
            if int(ref) >= expected:
                err("DELIVERY-REPORT.md: cites E-%s, which is not in the log (rule 17.4)" % ref)
        for label in ("What you got", "What was proven"):
            m = re.search(r"\*\*%s[.:]?\*\*:?(.*?)(?=\n\*\*|\Z)" % label, summary, re.S)
            sentences = [x for x in re.split(r"(?<=[.!?\]])\s+(?=[A-Z])", m.group(1).strip()) if x] if m else []
            if not m or not sentences or any(not re.search(r"\[[^\]]+\]\.?$", x) for x in sentences):
                err("DELIVERY-REPORT.md: a sentence under %r ends with no citation; it is ASSERTED (rule 17.1)" % label)
        if not by_type.get("LESSON"):
            err("AUDIT-LOG.md: no LESSON entry (rule 20.4)")
        # F5: the state files must agree with the log before delivery (rule 14.6)
        for msg in check_record(folder):
            err(msg)
        final = [r for r in cited_reports if r.startswith("audits/final-audit-")]
        # Rule 17.4: the final audit runs again after a change, and rule 1.7 keeps the earlier report,
        # so only the newest final audit decides.
        if is_done and final and not PASSED_LINE.search(last_line(folder / final[-1])):
            err("%s: Status DONE, and the last line of the newest final audit does not read passed (DONE, part 6)"
                % final[-1])
        planned = planned_runs(entries)
        if is_done and planned is None:
            err("AUDIT-LOG.md: Status DONE, and no TIER entry states Planned SUB-AGENT runs (rule 0.9)")
        over = first_launch_over_budget(entries)
        if over:
            err("AUDIT-LOG.md: E-%d is LAUNCH %d; LAUNCH entries exceed the %d planned, and no ANSWER entry "
                "before it states a higher number (rule 0.9)" % over)
        if not final:
            err("audits/: no final-audit report matched to a LAUNCH entry (rule 17.4)")
    return errors


def check_record(folder):
    """Compare the state files with the log (rule 14.6). Returns a list of failures."""
    folder = Path(folder)
    errors = []
    err = errors.append
    log_path = folder / "AUDIT-LOG.md"
    if not log_path.is_file():
        return ["AUDIT-LOG.md: file is missing (rule 9.1)"]
    log = parse_log(log_path.read_text(encoding="utf-8"))
    state = {}
    for e in log:
        if e["type"] == "FINDING":
            fid = (field(e["body"], "ID") or "").split()[0:1]
            if fid and FINDING_ID.fullmatch(fid[0]):
                state[fid[0]] = "open"
        elif e["type"] in ("RESOLUTION", "OVERRULE"):
            fid = (field(e["body"], "Finding") or "").split()[0:1]
            if fid and fid[0] in state:
                state[fid[0]] = "closed"
    criteria = [e["n"] for e in log if e["type"] == "CRITERIA"]
    running = None
    for e in log:
        if e["type"] == "STAGE":
            sid = re.match(r"(S\d+)\b", field(e["body"], "Stage") or "")
            event = (field(e["body"], "Event") or "").split()[0:1]
            if sid and event and event[0] in ("start", "end", "skipped"):
                running = sid.group(1) if event[0] == "start" else None
    texts = {}
    for name in ("SESSION-STATE.md", "FRAMEWORK.md", "MINDMAP.md"):
        p = folder / name
        if p.is_file():
            texts[name] = p.read_text(encoding="utf-8")
    for name, text in texts.items():
        for i, line in enumerate(text.splitlines(), 1):
            for fid in re.findall(r"\bF-\d+\b", line):
                if fid not in state:
                    err("%s:%d: names %s, which has no FINDING entry (rule 14.6)" % (name, i, fid))
                    continue
                negated_open = re.search(r"\b(?:no longer|not|never) open\b", line)
                says_open = not negated_open and re.search(
                    r"\bopen\b|not re-audited|waits (for|until) %s\b" % fid, line)
                says_closed = negated_open or re.search(r"\bFIXED\b|\bWITHDRAWN\b|\bclosed\b|overruled", line)
                if len(set(re.findall(r"\bF-\d+\b", line))) > 1:
                    continue  # a line that names several FINDINGS is not tested
                if state[fid] == "closed" and says_open and not says_closed:
                    err("%s:%d: calls %s open; the log closed it (rule 14.6)" % (name, i, fid))
                if state[fid] == "open" and says_closed and not says_open:
                    err("%s:%d: calls %s closed; the log holds no closing entry (rule 14.6)" % (name, i, fid))
    if criteria:
        for name in ("SESSION-STATE.md", "FRAMEWORK.md"):
            if name in texts and not re.search(r"\bE-%d\b" % criteria[-1], texts[name]):
                err("%s: does not name E-%d, the newest CRITERIA entry (rule 14.6)" % (name, criteria[-1]))
    if running and "SESSION-STATE.md" in texts and not re.search(r"\b%s\b" % running, texts["SESSION-STATE.md"]):
        err("SESSION-STATE.md: does not name %s, the STAGE the log shows as started (rule 14.6)" % running)
    if "MINDMAP.md" in texts:
        listed = re.sub(r"```.*?```", "", texts["MINDMAP.md"], flags=re.S)  # the list, wherever the diagram stands
        for fid in sorted(state, key=lambda x: int(x[2:])):
            n = len(re.findall(r"\b%s\b" % fid, listed))
            if n != 1:
                err("MINDMAP.md: %s appears %d times in the list; rule 9.2 requires 1" % (fid, n))
    return errors


def main(argv):
    args = argv[1:]
    if args[:1] == ["--record"]:
        if len(args) != 2 or not Path(args[1]).is_dir():
            print(__doc__.strip(), file=sys.stderr)
            return 2
        errors = check_record(args[1])
        for e in errors:
            print("FAIL " + e)
        print("hinshitsu_check (record): %d failure(s)." % len(errors))
        print("This script compares the state files with the log. It does not prove that the log is true.")
        return 1 if errors else 0
    stage = "delivery"
    if "--stage" in args:
        i = args.index("--stage")
        if i + 1 >= len(args) or args[i + 1] not in STAGE_FILES:
            print(__doc__.strip(), file=sys.stderr)
            return 2
        stage = args[i + 1]
        del args[i:i + 2]
    if len(args) != 1 or not Path(args[0]).is_dir():
        print(__doc__.strip(), file=sys.stderr)
        return 2
    errors = check(args[0], stage)
    for e in errors:
        print("FAIL " + e)
    print("hinshitsu_check (%s): %d failure(s)." % (stage, len(errors)))
    print("This script tests the shape of the record. It does not prove that any check ran.")
    return 1 if errors else 0


if __name__ == "__main__":
    try:
        sys.exit(main(sys.argv))
    except (ValueError, UnicodeDecodeError, OSError) as exc:  # a verdict, not a traceback (rule 17.5)
        print("FAIL the record cannot be read: %s: %s" % (type(exc).__name__, exc))
        sys.exit(1)
