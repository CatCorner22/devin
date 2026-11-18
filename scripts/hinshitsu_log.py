#!/usr/bin/env python3
"""hinshitsu log: write 1 entry to a run's AUDIT-LOG.md, so that the AGENT does not keep the log by hand.

Usage: hinshitsu_log.py add <run-folder> <TYPE> [--role ROLE] [--set "Name=value"]... [--text TEXT | --text -]
       (--text - reads the text from standard input)
       hinshitsu_log.py state <run-folder>
`add` prints the number of the new entry, as E-<n>. `state` rebuilds, from the log, the part of
SESSION-STATE.md, FRAMEWORK.md and MINDMAP.md that rule 14.6 tests, and leaves every other line as it is.
Exit 0 when the work is done, 1 when it is refused, 2 on a usage error. Standard library only.

The script numbers the entry, takes the time from the clock, and refuses an entry that the rules forbid:
an unknown type, a missing field, a FINDING ID out of order, a closing entry for a FINDING that is not open,
an overrule of a BLOCKER, a STAGE event out of order, a citation of an entry that does not exist yet.
It appends; it never changes an entry that exists (rule 9.6). It does not prove that an entry is true.
"""
import datetime
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hinshitsu_check import CLASSES, TYPES, check_record, field, parse_log  # noqa: E402

REQUIRED_FIELDS = {
    "STAGE": ("Stage", "Event"),
    "TIER": ("TIER",),
    "LAUNCH": ("Role", "Scope", "Commit under review", "SUB-AGENT identifier", "Report"),
    "FINDING": ("ID", "Class", "Where", "Trigger", "Violates", "Raised by", "Lens"),
    "RESOLUTION": ("Finding", "Result"),
    "OVERRULE": ("Finding",),
}
STAGE_EVENTS = ("start", "end", "progress", "skipped")
LOG_HEAD = "# AUDIT-LOG\n\nAppend-only (rule 9.6). Written by `scripts/hinshitsu_log.py`.\n"


def read_entries(folder):
    path = Path(folder) / "AUDIT-LOG.md"
    return [e for e in parse_log(path.read_text(encoding="utf-8")) if e["n"] is not None] if path.is_file() else []


def finding_states(entries):
    """Map each FINDING ID to its class and to the number of the entry that closed it, or None."""
    states = {}
    for e in entries:
        if e["type"] == "FINDING":
            fid = (field(e["body"], "ID") or "").split()[0:1]
            if fid:
                states[fid[0]] = {"class": (field(e["body"], "Class") or "").split()[0:1], "closed_by": None}
        elif e["type"] in ("RESOLUTION", "OVERRULE"):
            fid = (field(e["body"], "Finding") or "").split()[0:1]
            if fid and fid[0] in states:
                states[fid[0]]["closed_by"] = e["n"]
    return states


def check_finding(fields, entries):
    next_id = "F-%d" % (sum(1 for e in entries if e["type"] == "FINDING") + 1)
    fields.setdefault("ID", next_id)
    if fields["ID"] != next_id:
        raise ValueError("the next FINDING ID is %s, not %s (rule 9.5)" % (next_id, fields["ID"]))
    if fields.get("Class", "").split()[0:1] not in ([c] for c in CLASSES):
        raise ValueError("Class must be 1 of %s (rule 15.1)" % ", ".join(CLASSES))


def check_closing(kind, fields, entries):
    fid = fields.get("Finding", "").split()[0:1]
    state = finding_states(entries).get(fid[0]) if fid else None
    if state is None:
        raise ValueError("%s has no FINDING entry (rule 15.4)" % (fid[0] if fid else "the Finding field"))
    if state["closed_by"] is not None:
        raise ValueError("%s is closed by E-%d; a FINDING has 1 closing entry (rule 15.4)" % (fid[0], state["closed_by"]))
    if kind == "OVERRULE" and state["class"] == ["BLOCKER"]:
        raise ValueError("%s is a BLOCKER; nobody overrules a BLOCKER (rule 14.4)" % fid[0])
    if kind == "RESOLUTION" and fields.get("Result", "").split()[0:1] not in (["FIXED"], ["WITHDRAWN"]):
        raise ValueError("Result must be FIXED or WITHDRAWN (rule 15.4)")


def check_stage(fields, entries):
    sid = re.fullmatch(r"S([1-9]|1[0-2])", fields.get("Stage", "").split()[0:1][0] if fields.get("Stage", "").split() else "")
    event = fields.get("Event", "").split()[0:1]
    if not sid or not event or event[0] not in STAGE_EVENTS:
        raise ValueError("Stage must be S1 to S12 and Event 1 of %s (rule 0.7)" % ", ".join(STAGE_EVENTS))
    last = None
    for e in entries:
        if e["type"] == "STAGE" and (field(e["body"], "Stage") or "").split()[0:1] == [sid.group(0)]:
            ev = (field(e["body"], "Event") or "").split()[0:1]
            last = ev[0] if ev and ev[0] != "progress" else last
    if event[0] in ("end", "progress") and last != "start":
        raise ValueError("%s has no start entry to %s (rule 0.7)" % (sid.group(0), event[0]))
    if event[0] == "skipped" and not re.search(r"\w", fields["Event"][len("skipped"):]):
        raise ValueError("skipped needs a reason, as in `skipped — CORE` (rule 0.7)")


def add_entry(folder, kind, fields=None, text="", role="orchestrator", now=None):
    """Append 1 entry and return its number. Raise ValueError, and write nothing, when the rules forbid it."""
    folder = Path(folder)
    fields = {k: str(v).strip() for k, v in (fields or {}).items()}
    entries = read_entries(folder)
    number = len(entries) + 1
    if kind not in TYPES:
        raise ValueError("unknown type %s (rule 9.4); the types are %s" % (kind, ", ".join(sorted(TYPES))))
    if kind == "FINDING":
        check_finding(fields, entries)
    for name in REQUIRED_FIELDS.get(kind, ()):
        if not fields.get(name):
            raise ValueError("%s needs the field %s" % (kind, name))
    if kind in ("RESOLUTION", "OVERRULE"):
        check_closing(kind, fields, entries)
    if kind == "STAGE":
        check_stage(fields, entries)
    body = "\n".join("- %s: %s" % item for item in fields.items())
    body = "\n\n".join(part for part in (body, text.strip()) if part)
    for ref in re.findall(r"\bE-(\d+)\b", body):
        if int(ref) > number:  # an entry may hold its own number, as in the name of its report (rule 1.6)
            raise ValueError("the entry cites E-%s, which does not exist yet (rule 9.6)" % ref)
    stamp = (now or datetime.datetime.now(datetime.timezone.utc)).strftime("%Y-%m-%dT%H:%M:%SZ")
    path = folder / "AUDIT-LOG.md"
    folder.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as log:
        if not entries and path.stat().st_size == 0:
            log.write(LOG_HEAD)
        log.write("\n### E-%d · %s · %s · %s\n\n%s\n" % (number, stamp, kind, role, body))
    return number


START, END = "<!-- from the log: start -->", "<!-- from the log: end -->"


def replace_block(path, lines):
    """Write the lines between the 2 marks of the file, and keep every line outside them."""
    block = "\n".join([START, "Rebuilt by `scripts/hinshitsu_log.py state`. Do not edit between the marks."] + lines + [END])
    old = path.read_text(encoding="utf-8") if path.is_file() else ""
    if START in old and END in old:
        new = old[:old.index(START)] + block + old[old.index(END) + len(END):]
    else:
        new = (old.rstrip("\n") + "\n\n" if old.strip() else "") + block + "\n"
    path.write_text(new, encoding="utf-8")


def write_state(folder):
    """Rebuild from the log what rule 14.6 tests: the newest CRITERIA entry, the STAGE that runs, and
    the state of each FINDING. Return the names of the files written."""
    folder = Path(folder)
    entries = read_entries(folder)
    criteria = [e for e in entries if e["type"] == "CRITERIA"]
    running = None
    for e in entries:
        if e["type"] == "STAGE":
            sid = (field(e["body"], "Stage") or "").split()[0:1]
            event = (field(e["body"], "Event") or "").split()[0:1]
            if sid and event and event[0] in ("start", "end", "skipped"):
                running = sid[0] if event[0] == "start" else None
    states = finding_states(entries)
    open_ids = ["%s (%s)" % (fid, "".join(st["class"])) for fid, st in states.items() if st["closed_by"] is None]
    newest = "none"
    if criteria:
        status = field(criteria[-1]["body"], "Status") or field(criteria[-1]["body"], "State") or "no status"
        newest = "E-%d (%s)" % (criteria[-1]["n"], status.split()[0])
    summary = ["- Newest CRITERIA entry: %s" % newest,
               "- STAGE now running: %s" % (running or "none"),
               "- Open FINDINGS: %s" % (", ".join(open_ids) or "none")]
    written = []
    for name in ("SESSION-STATE.md", "FRAMEWORK.md"):
        if name == "SESSION-STATE.md" or (folder / name).is_file():
            replace_block(folder / name, summary if name == "SESSION-STATE.md" else summary[:1])
            written.append(name)
    listed = []
    for e in entries:
        if e["type"] == "FINDING":
            fid = (field(e["body"], "ID") or "").split()[0:1]
            if not fid or fid[0] not in states:
                continue
            state = states[fid[0]]
            closing = next((x for x in entries if x["n"] == state["closed_by"]), None)
            how = "open"
            if closing is not None:
                result = (field(closing["body"], "Result") or "overruled").split()[0]
                how = "%s by E-%d" % (result, closing["n"])
            title = field(e["body"], "Title") or field(e["body"], "Where") or ""
            title = re.sub(r"\b[EF]-\d+\b", "", title).strip()  # 1 ID on a line, so that the line names 1 FINDING
            listed.append("- %s %s (%s, %s)" % (fid[0], title, "".join(state["class"]), how))
    replace_block(folder / "MINDMAP.md", listed or ["- no FINDING is logged"])
    written.append("MINDMAP.md")
    return written


def main(argv):
    args = argv[1:]
    if len(args) == 2 and args[0] == "state" and (Path(args[1]) / "AUDIT-LOG.md").is_file():
        written = write_state(args[1])
        failures = check_record(args[1])
        for failure in failures:
            print("FAIL " + failure)
        print("hinshitsu_log: rebuilt %s from the log; %d failure(s) of the record check remain."
              % (", ".join(written), len(failures)))
        return 1 if failures else 0
    if len(args) < 3 or args[0] != "add":
        print(__doc__.strip(), file=sys.stderr)
        return 2
    folder, kind, rest = args[1], args[2], args[3:]
    fields, text, role = {}, "", "orchestrator"
    while rest:
        option = rest.pop(0)
        if not rest or option not in ("--role", "--set", "--text"):
            print(__doc__.strip(), file=sys.stderr)
            return 2
        value = rest.pop(0)
        if option == "--role":
            role = value
        elif option == "--text":
            text = sys.stdin.read() if value == "-" else value
        else:
            name, sep, val = value.partition("=")
            if not sep:
                print(__doc__.strip(), file=sys.stderr)
                return 2
            fields[name.strip()] = val
    try:
        print("E-%d" % add_entry(folder, kind, fields, text, role))
    except (ValueError, OSError) as exc:
        print("hinshitsu_log: refused: %s" % exc, file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
