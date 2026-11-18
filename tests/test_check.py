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
    add("TIER", "- TIER: FULL")
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
