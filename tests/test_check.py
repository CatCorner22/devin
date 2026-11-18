import importlib.util
import os
import re
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("hcheck", ROOT / "scripts/hinshitsu_check.py")
hcheck = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hcheck)

SHA = "a" * 64
ROW = "| %s | " + " | ".join(["`PASS` `audits/WU-1-correctness-E-19.md`"] * 10) + " |"



def sync_state(d):
    """Write the 3 state files so that they agree with the log, as rule 14.6 requires at delivery."""
    log = (d / "AUDIT-LOG.md").read_text(encoding="utf-8")
    crit = re.findall(r"### E-(\d+) · \S+ · CRITERIA ·", log)[-1]
    stage = re.findall(r"- Stage: (S\d+)", log)[-1]
    closed = set(re.findall(r"- Finding: (F-\d+)", log))
    ids = re.findall(r"- ID: (F-\d+)", log)
    (d / "SESSION-STATE.md").write_text("CRITERIA E-%s. STAGE %s.\n" % (crit, stage)
                                        + "".join("%s is open\n" % i for i in ids if i not in closed), encoding="utf-8")
    (d / "FRAMEWORK.md").write_text("CRITERIA: E-%s\n" % crit, encoding="utf-8")
    (d / "MINDMAP.md").write_text("".join("- %s a fault (DEFECT, %s)\n" % (i, "closed" if i in closed else "open")
                                          for i in ids), encoding="utf-8")

def good_run():
    """Build a run folder that passes at stage delivery. Tests then break 1 thing."""
    d = Path(tempfile.mkdtemp())
    for sub in ("prompts", "audits", "memos", "evidence"):
        (d / sub).mkdir()
    e = []

    def add(kind, body, role="orchestrator"):
        e.append("### E-%d · 2026-01-01T00:00Z · %s · %s\n\n%s\n" % (len(e) + 1, kind, role, body))

    add("CAPABILITY", "\n".join("- SWARM-CAPABLE part %d (x): yes — probe" % i for i in range(1, 6))
        + "\n- Mode: SWARM")
    add("TIER", "- TIER: FULL\n- Planned SUB-AGENT runs: 3")
    for i in range(1, 5):
        add("STAGE", "- Stage: S%d\n- Event: start\n- Skill read: `x`, 1 bytes, SHA-256 %s" % (i, SHA))
        if i == 3:
            add("VOC", "text")
            add("GAP", "text")
        if i == 4:
            add("ASSUMPTION", "text")
        add("STAGE", "- Stage: S%d\n- Event: end\n- Artifacts: `AUDIT-LOG.md`" % i)
    add("STAGE", "- Stage: S5\n- Event: skipped — fixture")
    add("STAGE", "- Stage: S6\n- Event: start\n- SHA-256 %s" % SHA)
    add("CRITERIA", '- C1. It works. Test: run it.\n- Status: FROZEN\n- Approval: "approve all" (t)')
    add("STAGE", "- Stage: S6\n- Event: end")
    add("STAGE", "- Stage: S7\n- Event: start\n- SHA-256 %s" % SHA)
    n = len(e) + 1
    assert n == 19, n
    add("LAUNCH", "- Role: correctness\n- Scope: `prompts/WU-1-correctness.md`\n- Commit under review: no git\n"
        "- SUB-AGENT identifier: run-abc\n- Report: `audits/WU-1-correctness-E-19.md`")
    add("FINDING", "- ID: F-1\n- Class: DEFECT\n- Where: a:1\n- Trigger: run\n- Violates: C1\n"
        "- Raised by: correctness, LAUNCH E-19\n- Lens: structural integrity", "auditor: correctness")
    add("LAUNCH", "- Role: correctness\n- Scope: `prompts/WU-1-correctness.md`\n- Commit under review: no git\n"
        "- SUB-AGENT identifier: run-def\n- Report: `audits/WU-1-reaudit-E-21.md`")
    add("RESOLUTION", "- Finding: F-1\n- Result: FIXED\n- Re-audit: `audits/WU-1-reaudit-E-21.md`")
    add("STAGE", "- Stage: S7\n- Event: end")
    for i in (8, 9):
        add("STAGE", "- Stage: S%d\n- Event: skipped — fixture" % i)
    add("STAGE", "- Stage: S10\n- Event: start\n- SHA-256 %s" % SHA)
    k = len(e) + 1
    add("LAUNCH", "- Role: final auditor\n- Scope: `prompts/WU-1-correctness.md`\n- Commit under review: no git\n"
        "- SUB-AGENT identifier: run-fin\n- Report: `audits/final-audit-E-%d.md`" % k)
    add("STAGE", "- Stage: S10\n- Event: end")
    add("STAGE", "- Stage: S11\n- Event: start\n- SHA-256 %s" % SHA)
    add("LESSON", "text")
    add("STAGE", "- Stage: S11\n- Event: end")
    (d / "AUDIT-LOG.md").write_text("# log\n\n" + "\n".join(e), encoding="utf-8")
    (d / "prompts/WU-1-correctness.md").write_text("scope", encoding="utf-8")
    (d / "evidence/capability-probe.md").write_text("run-probe\nNO RECORD", encoding="utf-8")
    (d / "audits/WU-1-correctness-E-19.md").write_text("run-abc\nreport", encoding="utf-8")
    (d / "audits/WU-1-reaudit-E-21.md").write_text("run-def\nreport", encoding="utf-8")
    (d / ("audits/final-audit-E-%d.md" % k)).write_text("run-fin\npassed", encoding="utf-8")
    (d / "GAUGE.svg").write_text("x", encoding="utf-8")
    sync_state(d)
    (d / "CONNECTIONS.md").write_text("```mermaid\ngraph LR\n  A -->|reads| B\n```\n", encoding="utf-8")
    (d / "COVERAGE-LEDGER.md").write_text(
        "| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |\n|---|---|---|---|---|---|---|---|---|---|---|\n"
        + ROW % "C1 works" + "\n", encoding="utf-8")
    heads = "\n\n".join("## %s\n\ntext" % h for h in hcheck.REPORT_HEADINGS[3:])
    (d / "DELIVERY-REPORT.md").write_text(
        "# report\n\n## Check it yourself in 5 minutes\n\n1. a\n2. b\n3. c\n\n## Summary\n\n"
        "**What you got.** A page. [E-17]\n\n**What was proven.** It runs. [`audits/WU-1-correctness-E-19.md`]\n\n"
        "**What was not proven.** Nothing\n\n**What you need to decide next.** Nothing\n\n"
        "## Status\n\nDONE\n\n" + heads + "\n", encoding="utf-8")
    return d


def next_entry_number(d):
    return len(re.findall(r"^### E-\d+ ", (d / "AUDIT-LOG.md").read_text(encoding="utf-8"), re.M)) + 1


def append_entry(d, kind, body, role="orchestrator"):
    """Append 1 entry to the log of a fixture and return its number."""
    n = next_entry_number(d)
    with (d / "AUDIT-LOG.md").open("a", encoding="utf-8") as f:
        f.write("\n### E-%d · 2026-01-01T00:00Z · %s · %s\n\n%s\n" % (n, kind, role, body))
    return n


def edit(d, name, old, new):
    p = d / name
    text = p.read_text(encoding="utf-8")
    assert old in text, old
    p.write_text(text.replace(old, new, 1), encoding="utf-8")


class Check(unittest.TestCase):
    def assertFails(self, d, fragment, stage="delivery"):
        errors = hcheck.check(d, stage)
        self.assertTrue(any(fragment in x for x in errors), "no failure with %r in %s" % (fragment, errors))

    def test_good_run_passes_every_stage(self):
        d = good_run()
        for stage in ("plan", "unit", "delivery"):
            self.assertEqual(hcheck.check(d, stage), [], stage)

    def test_frozen_without_quoted_approval_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", '- Approval: "approve all" (t)', "- Approval: no objection received")
        self.assertFails(d, "rule 3.3", "plan")

    def test_proposed_criteria_fail_at_unit(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- Status: FROZEN", "- Status: PROPOSED")
        self.assertEqual(hcheck.check(d, "plan"), [])
        self.assertFails(d, "not FROZEN", "unit")

    def test_entry_citing_later_entry_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- TIER: FULL", "- TIER: FULL, see E-9")
        self.assertFails(d, "cites later entry", "plan")

    def test_gap_in_entry_numbers_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "### E-2 ·", "### E-99 ·")
        self.assertFails(d, "rule 9.4", "plan")

    def test_launch_without_report_fails(self):
        d = good_run()
        (d / "audits/WU-1-correctness-E-19.md").unlink()
        self.assertFails(d, "rule 1.7", "plan")

    def test_report_without_identifier_line_fails(self):
        d = good_run()
        (d / "audits/WU-1-correctness-E-19.md").write_text("report with no id", encoding="utf-8")
        self.assertFails(d, "rule 1.6", "plan")

    def test_class_word_with_punctuation_passes(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- Class: DEFECT\n", "- Class: DEFECT. A note by the AUDITOR.\n")
        self.assertEqual(hcheck.check(d, "delivery"), [])

    def test_devin_identifier_without_prefix_passes(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "identifier: run-abc", "identifier: devin-0abc")
        edit(d, "audits/WU-1-correctness-E-19.md", "run-abc", "Devin session ID: 0abc")
        self.assertEqual(hcheck.check(d, "delivery"), [])

    def test_report_with_no_launch_fails(self):
        d = good_run()
        (d / "audits/extra.md").write_text("x", encoding="utf-8")
        self.assertFails(d, "matches no LAUNCH", "plan")

    def test_overruled_blocker_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- Class: DEFECT", "- Class: BLOCKER")
        edit(d, "AUDIT-LOG.md", "· RESOLUTION ·", "· OVERRULE ·")
        self.assertFails(d, "overrules BLOCKER", "plan")

    def test_done_with_open_finding_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- Finding: F-1\n", "- Finding: F-2\n")
        self.assertFails(d, "Status DONE with open FINDINGS")

    def test_empty_ledger_cell_fails_at_delivery(self):
        d = good_run()
        edit(d, "COVERAGE-LEDGER.md", "| `PASS` `audits/WU-1-correctness-E-19.md` |", "|  |")
        self.assertFails(d, "empty cell")

    def test_pass_with_missing_evidence_fails(self):
        d = good_run()
        edit(d, "COVERAGE-LEDGER.md", "audits/WU-1-correctness-E-19.md", "audits/none.md")
        self.assertFails(d, "does not exist", "unit")

    def test_pass_without_citation_fails(self):
        d = good_run()
        edit(d, "COVERAGE-LEDGER.md", "`PASS` `audits/WU-1-correctness-E-19.md`", "PASS builder says so")
        self.assertFails(d, "rule 10.5", "unit")

    def test_uncited_summary_claim_fails(self):
        d = good_run()
        edit(d, "DELIVERY-REPORT.md", "A page. [E-17]", "A page.")
        self.assertFails(d, "ASSERTED")

    def test_report_citing_absent_entry_fails(self):
        d = good_run()
        edit(d, "DELIVERY-REPORT.md", "[E-17]", "[E-999]")
        self.assertFails(d, "not in the log")

    def test_wrong_heading_order_fails(self):
        d = good_run()
        edit(d, "DELIVERY-REPORT.md", "## Maps", "## Charts")
        self.assertFails(d, "rule 19.1")

    def test_long_summary_fails(self):
        d = good_run()
        edit(d, "DELIVERY-REPORT.md", "It runs.", "It runs. " + "word " * 220)
        self.assertFails(d, "limit 200")

    def test_unlabeled_edge_fails(self):
        d = good_run()
        edit(d, "CONNECTIONS.md", "A -->|reads| B", "A --> B")
        self.assertFails(d, "no label", "plan")

    def test_banned_word_fails_and_quoted_one_passes(self):
        d = good_run()
        edit(d, "FRAMEWORK.md", "CRITERIA:", "It should work. CRITERIA:")
        self.assertFails(d, "banned word", "plan")
        (d / "FRAMEWORK.md").write_text('The USER wrote "it should work".', encoding="utf-8")
        self.assertEqual(hcheck.check(d, "plan"), [])

    def test_identifier_none_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- SUB-AGENT identifier: run-abc", "- SUB-AGENT identifier: none")
        self.assertFails(d, "has no SUB-AGENT identifier")

    def test_degraded_first_line_without_degraded_mode_fails(self):
        d = good_run()
        (d / "audits/WU-1-correctness-E-19.md").write_text("DEGRADED — single-agent audit\nreport", encoding="utf-8")
        self.assertFails(d, "no CAPABILITY entry states Mode: DEGRADED")

    def test_ledger_with_no_row_fails(self):
        d = good_run()
        (d / "COVERAGE-LEDGER.md").write_text(
            "| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |\n|---|---|---|---|---|---|---|---|---|---|---|\n",
            encoding="utf-8")
        self.assertFails(d, "the ledger has no row")

    def test_totals_table_is_not_a_ledger_row(self):
        d = good_run()
        p = d / "COVERAGE-LEDGER.md"
        p.write_text(p.read_text(encoding="utf-8") + "\n## Totals\n\n| PASS | FAIL | N/A | UNVERIFIED | Empty |\n|---|---|---|---|---|\n| 10 | 0 | 0 | 0 | 0 |\n",
                     encoding="utf-8")
        self.assertEqual(hcheck.check(d, "delivery"), [])

    def test_criterion_row_in_code_marks_cannot_hide_unverified(self):
        d = good_run()
        p = d / "COVERAGE-LEDGER.md"
        text = p.read_text(encoding="utf-8")
        row = [l for l in text.splitlines() if l.startswith("| C1")][0]
        cells = row.split(" | ")
        cells[1] = "UNVERIFIED — not run"
        p.write_text(text.replace(row, " | ".join(cells).replace("| C1 works", "| `C1` works")), encoding="utf-8")
        self.assertFails(d, "UNVERIFIED CRITERION rows")

    def test_delivery_stage_runs_the_record_check(self):
        d = good_run()
        (d / "MINDMAP.md").write_text("- nothing\n", encoding="utf-8")
        self.assertFails(d, "MINDMAP.md")

    def test_same_verdict_from_another_working_directory(self):
        d = good_run()
        here = os.getcwd()
        try:
            os.chdir(tempfile.gettempdir())
            self.assertEqual(hcheck.check(d, "delivery"), [])
        finally:
            os.chdir(here)

    def test_done_with_final_audit_not_passed_fails(self):
        d = good_run()
        f = [p for p in (d / "audits").iterdir() if p.name.startswith("final-audit-")][0]
        f.write_text("run-fin\nnot passed", encoding="utf-8")
        self.assertFails(d, "does not read passed")

    def test_done_without_planned_runs_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "\n- Planned SUB-AGENT runs: 3", "")
        self.assertFails(d, "Planned SUB-AGENT runs")

    def test_more_launches_than_planned_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "Planned SUB-AGENT runs: 3", "Planned SUB-AGENT runs: 1")
        self.assertFails(d, "exceed the 1 planned")

    def test_degraded_first_line_with_hyphen_fails(self):
        d = good_run()
        (d / "audits/WU-1-correctness-E-19.md").write_text("DEGRADED - single-agent audit\nreport", encoding="utf-8")
        self.assertFails(d, "no CAPABILITY entry states Mode: DEGRADED")

    def test_done_with_criteria_entry_that_lists_no_criterion_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- C1. It works.", "- It works.")
        self.assertFails(d, "lists no CRITERION")

    def test_criterion_listed_in_bold_is_counted(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- C1. It works.", "- **C1.** It works.")
        self.assertEqual(hcheck.check(d, "delivery"), [])

    def test_blocker_closed_as_record_fault_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- ID: F-1\n- Class: DEFECT", "- ID: F-1\n- Class: BLOCKER")
        (d / "evidence/record-check-E-22.txt").write_text("0 failures", encoding="utf-8")
        edit(d, "AUDIT-LOG.md", "- Re-audit: `audits/WU-1-reaudit-E-21.md`",
             "- Record fault: yes\n- Check: `evidence/record-check-E-22.txt`")
        self.assertFails(d, "as a record fault")

    def test_blocker_closed_by_a_report_older_than_the_finding_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- ID: F-1\n- Class: DEFECT", "- ID: F-1\n- Class: BLOCKER")
        edit(d, "AUDIT-LOG.md", "- Re-audit: `audits/WU-1-reaudit-E-21.md`", "- Re-audit: `audits/WU-1-correctness-E-19.md`")
        self.assertFails(d, "matches no LAUNCH entry later than the FINDING")

    def test_log_that_opens_with_the_probe_launch_passes(self):
        d = good_run()
        log = (d / "AUDIT-LOG.md").read_text(encoding="utf-8")
        head, rest = log.split("### E-1 ", 1)
        nums = re.sub(r"### E-(\d+) ", lambda m: "### E-%d " % (int(m.group(1)) + 1), "### E-1 " + rest)
        nums = re.sub(r"-E-(\d+)\.md", lambda m: "-E-%d.md" % (int(m.group(1)) + 1), nums)
        probe = ("### E-1 · 2026-01-01T00:00Z · LAUNCH · orchestrator\n\n- Role: capability probe\n"
                 "- Scope: `prompts/WU-1-correctness.md`\n- Commit under review: no git\n"
                 "- SUB-AGENT identifier: run-probe\n- Report: `evidence/capability-probe.md`\n\n")
        (d / "AUDIT-LOG.md").write_text(head + probe + nums.replace("Planned SUB-AGENT runs: 3", "Planned SUB-AGENT runs: 4"),
                                        encoding="utf-8")
        for f in list((d / "audits").iterdir()):
            m = re.search(r"-E-(\d+)\.md$", f.name)
            f.rename(f.with_name(f.name.replace("-E-%s.md" % m.group(1), "-E-%d.md" % (int(m.group(1)) + 1))))
        ledger = (d / "COVERAGE-LEDGER.md").read_text(encoding="utf-8")
        (d / "COVERAGE-LEDGER.md").write_text(ledger.replace("-E-19.md", "-E-20.md"), encoding="utf-8")
        report = (d / "DELIVERY-REPORT.md").read_text(encoding="utf-8")
        report = re.sub(r"-E-(\d+)\.md", lambda m: "-E-%d.md" % (int(m.group(1)) + 1), report)
        report = re.sub(r"\bE-(\d+)\b(?!\.md)", lambda m: "E-%d" % (int(m.group(1)) + 1), report)
        (d / "DELIVERY-REPORT.md").write_text(report, encoding="utf-8")
        sync_state(d)
        self.assertEqual(hcheck.check(d, "delivery"), [])

    # --- the DONE gate (round-3 code review, bugs 1 to 4) ---

    def final_audit(self, d):
        return [p for p in (d / "audits").iterdir() if p.name.startswith("final-audit-")][0]

    def test_done_with_final_audit_that_only_holds_the_word_passed_fails(self):
        d = good_run()
        self.final_audit(d).write_text("run-fin\nVerdict: failed. 0 of 12 checks passed", encoding="utf-8")
        self.assertFails(d, "does not read passed")

    def test_done_with_final_audit_verdict_forms_that_pass(self):
        for last in ("passed", "Commit abc; SHA-256 123 — passed", "Verdict: `passed`."):
            d = good_run()
            self.final_audit(d).write_text("run-fin\n" + last, encoding="utf-8")
            self.assertEqual(hcheck.check(d, "delivery"), [], last)

    def test_done_with_criterion_row_that_holds_fail_fails(self):
        d = good_run()
        edit(d, "COVERAGE-LEDGER.md", "`PASS` `audits/WU-1-correctness-E-19.md`", "FAIL F-1")
        self.assertFails(d, "holds FAIL or holds no PASS")

    def test_done_with_criterion_row_that_holds_no_pass_fails(self):
        d = good_run()
        p = d / "COVERAGE-LEDGER.md"
        p.write_text(p.read_text(encoding="utf-8").replace("`PASS` `audits/WU-1-correctness-E-19.md`", "N/A — not run"),
                     encoding="utf-8")
        self.assertFails(d, "holds FAIL or holds no PASS")

    def second_final_audit(self, d, first_last_line, second_last_line):
        """Add a later final audit; the earlier report is kept, as rule 1.7 requires."""
        self.final_audit(d).write_text("run-fin\n" + first_last_line, encoding="utf-8")
        n = next_entry_number(d)
        append_entry(d, "LAUNCH", "- Role: final auditor\n- Scope: `prompts/WU-1-correctness.md`\n"
                     "- Commit under review: no git\n- SUB-AGENT identifier: run-fin2\n"
                     "- Report: `audits/final-audit-E-%d.md`" % n)
        (d / ("audits/final-audit-E-%d.md" % n)).write_text("run-fin2\n" + second_last_line, encoding="utf-8")

    def test_done_after_a_second_final_audit_passes(self):
        d = good_run()
        append_entry(d, "ANSWER", '- USER — "1 more run"\n- Planned SUB-AGENT runs: 4')
        self.second_final_audit(d, "not passed", "passed")
        self.assertEqual(hcheck.check(d, "delivery"), [])

    def test_done_when_the_newest_final_audit_did_not_pass_fails(self):
        d = good_run()
        append_entry(d, "ANSWER", '- USER — "1 more run"\n- Planned SUB-AGENT runs: 4')
        self.second_final_audit(d, "passed", "not passed")
        self.assertFails(d, "does not read passed")

    def test_launch_past_the_budget_with_no_answer_after_the_last_planned_launch_fails(self):
        d = good_run()  # 3 runs planned, 3 used; an ANSWER entry exists nowhere after them
        self.second_final_audit(d, "not passed", "passed")
        self.assertFails(d, "exceed the 3 planned")

    def test_an_answer_before_the_budget_was_reached_does_not_raise_it(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "· VOC ·", "· ANSWER ·")  # an early ANSWER, as every run has for its criteria
        edit(d, "AUDIT-LOG.md", "Planned SUB-AGENT runs: 3", "Planned SUB-AGENT runs: 1")
        self.assertFails(d, "exceed the 1 planned")

    def test_missing_final_audit_fails(self):
        d = good_run()
        edit(d, "AUDIT-LOG.md", "- Role: final auditor", "- Role: correctness")
        for p in (d / "audits").glob("final-audit-*"):
            new = p.with_name("WU-1-other-E-30.md")
            p.rename(new)
            edit(d, "AUDIT-LOG.md", "audits/" + p.name, "audits/" + new.name)
        self.assertFails(d, "no final-audit report")

    def test_same_folder_same_verdict(self):
        d = good_run()
        edit(d, "CONNECTIONS.md", "A -->|reads| B", "A --> B")
        self.assertEqual(hcheck.check(d, "delivery"), hcheck.check(d, "delivery"))


def record_run(state="open", mind="open", closed=False):
    d = Path(tempfile.mkdtemp())
    e = ["### E-1 · 2026-01-01T00:00Z · STAGE · orchestrator\n\n- Stage: S5\n- Event: start\n",
         "### E-2 · 2026-01-01T00:00Z · CRITERIA · orchestrator\n\n- Status: PROPOSED\n",
         "### E-3 · 2026-01-01T00:00Z · FINDING · orchestrator\n\n- ID: F-1\n- Class: DEFECT\n"]
    if closed:
        e.append("### E-4 · 2026-01-01T00:00Z · RESOLUTION · orchestrator\n\n- Finding: F-1\n- Result: FIXED\n")
    (d / "AUDIT-LOG.md").write_text("# log\n\n" + "\n".join(e), encoding="utf-8")
    (d / "SESSION-STATE.md").write_text("CRITERIA E-2. STAGE S5.\nF-1 is %s\n" % state, encoding="utf-8")
    (d / "FRAMEWORK.md").write_text("CRITERIA: E-2\n", encoding="utf-8")
    (d / "MINDMAP.md").write_text("- F-1 a fault (DEFECT, %s)\n```mermaid\nF1[F-1]\n```\n" % mind, encoding="utf-8")
    return d


class Record(unittest.TestCase):
    def test_agreeing_files_pass(self):
        self.assertEqual(hcheck.check_record(record_run()), [])
        self.assertEqual(hcheck.check_record(record_run("closed", "FIXED", closed=True)), [])

    def test_closed_finding_called_open_fails(self):
        errs = hcheck.check_record(record_run("open", "FIXED", closed=True))
        self.assertTrue(any("calls F-1 open" in x for x in errs), errs)

    def test_open_finding_called_fixed_fails(self):
        errs = hcheck.check_record(record_run("open", "FIXED"))
        self.assertTrue(any("calls F-1 closed" in x for x in errs), errs)

    def test_stale_criteria_entry_fails(self):
        d = record_run()
        (d / "FRAMEWORK.md").write_text("CRITERIA: E-9\n", encoding="utf-8")
        self.assertTrue(any("newest CRITERIA entry" in x for x in hcheck.check_record(d)))

    def test_wrong_stage_fails(self):
        d = record_run()
        (d / "SESSION-STATE.md").write_text("CRITERIA E-2. STAGE S4.\nF-1 is open\n", encoding="utf-8")
        self.assertTrue(any("does not name S5" in x for x in hcheck.check_record(d)))

    def test_finding_missing_from_mind_map_fails(self):
        d = record_run()
        (d / "MINDMAP.md").write_text("- nothing\n", encoding="utf-8")
        self.assertTrue(any("F-1 appears 0 times" in x for x in hcheck.check_record(d)))

    def test_unknown_finding_fails(self):
        d = record_run()
        (d / "FRAMEWORK.md").write_text("CRITERIA: E-2. F-9 is open\n", encoding="utf-8")
        self.assertTrue(any("F-9, which has no FINDING entry" in x for x in hcheck.check_record(d)))

    def test_cli_exit_codes(self):
        self.assertEqual(hcheck.main(["x", "--record", str(record_run())]), 0)
        self.assertEqual(hcheck.main(["x", "--record", str(record_run("open", "FIXED"))]), 1)
        self.assertEqual(hcheck.main(["x", "--record"]), 2)

    def test_record_fault_resolution_needs_the_saved_output(self):
        d = good_run()
        log = (d / "AUDIT-LOG.md").read_text(encoding="utf-8")
        n = log.count("### E-")
        log += ("\n### E-%d · 2026-01-01T00:00Z · FINDING · orchestrator\n\n- ID: F-77\n- Class: DEFECT\n- Where: `SESSION-STATE.md`\n- Trigger: read it\n- Violates: rule 8.1\n- Raised by: x\n- Lens: trust and controls\n"
                "\n### E-%d · 2026-01-01T00:00Z · RESOLUTION · orchestrator\n\n- Finding: F-77\n- Result: FIXED\n- Record fault: yes\n- Evidence: `evidence/record-check-E-%d.txt`\n" % (n + 1, n + 2, n + 2))
        (d / "AUDIT-LOG.md").write_text(log, encoding="utf-8")
        self.assertTrue(any("record-check output (rule 14.6)" in x for x in hcheck.check(d, "plan")))
        (d / "evidence" / ("record-check-E-%d.txt" % (n + 2))).write_text("ok", encoding="utf-8")
        self.assertFalse(any("14.6" in x or "14.3" in x for x in hcheck.check(d, "plan")))


if __name__ == "__main__":
    unittest.main()
