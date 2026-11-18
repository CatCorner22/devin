import importlib.util
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "scripts/hinshitsu_log.py"
spec = importlib.util.spec_from_file_location("hlog", SCRIPT)
hlog = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hlog)

FINDING = {"ID": "F-1", "Class": "DEFECT", "Where": "a.py:1", "Trigger": "run it", "Violates": "C1",
           "Raised by": "the correctness auditor", "Lens": "structural integrity"}


def run_folder():
    return Path(tempfile.mkdtemp())


def log_text(d):
    return (d / "AUDIT-LOG.md").read_text(encoding="utf-8")


class Add(unittest.TestCase):
    def test_first_entry_is_e_1_with_a_utc_time_from_the_clock(self):
        d = run_folder()
        n = hlog.add_entry(d, "VOC", text="The USER's words.")
        self.assertEqual(n, 1)
        self.assertRegex(log_text(d), r"### E-1 · \d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ · VOC · orchestrator\n\nThe USER's words.\n")

    def test_numbers_ascend_by_1(self):
        d = run_folder()
        self.assertEqual([hlog.add_entry(d, "VOC", text="a"), hlog.add_entry(d, "GAP", text="b")], [1, 2])

    def test_unknown_type_is_refused_and_nothing_is_written(self):
        d = run_folder()
        with self.assertRaisesRegex(ValueError, "unknown type"):
            hlog.add_entry(d, "NOTE", text="a")
        self.assertFalse((d / "AUDIT-LOG.md").exists())

    def test_missing_required_field_is_refused(self):
        d = run_folder()
        fields = dict(FINDING)
        del fields["Trigger"]
        with self.assertRaisesRegex(ValueError, "FINDING needs the field Trigger"):
            hlog.add_entry(d, "FINDING", fields=fields)

    def test_empty_required_field_is_refused(self):
        d = run_folder()
        with self.assertRaisesRegex(ValueError, "FINDING needs the field Trigger"):
            hlog.add_entry(d, "FINDING", fields=dict(FINDING, Trigger=" "))

    def test_finding_id_must_be_the_next_unused_number(self):
        d = run_folder()
        hlog.add_entry(d, "FINDING", fields=FINDING)
        with self.assertRaisesRegex(ValueError, "the next FINDING ID is F-2"):
            hlog.add_entry(d, "FINDING", fields=FINDING)
        with self.assertRaisesRegex(ValueError, "the next FINDING ID is F-2"):
            hlog.add_entry(d, "FINDING", fields=dict(FINDING, ID="F-7"))

    def test_finding_id_is_assigned_when_left_out(self):
        d = run_folder()
        fields = dict(FINDING)
        del fields["ID"]
        hlog.add_entry(d, "FINDING", fields=fields)
        self.assertIn("- ID: F-1\n", log_text(d))

    def test_finding_class_must_be_1_of_the_4(self):
        d = run_folder()
        with self.assertRaisesRegex(ValueError, "Class must be 1 of"):
            hlog.add_entry(d, "FINDING", fields=dict(FINDING, Class="MINOR"))

    def test_resolution_of_an_unknown_or_closed_finding_is_refused(self):
        d = run_folder()
        with self.assertRaisesRegex(ValueError, "F-1 has no FINDING entry"):
            hlog.add_entry(d, "RESOLUTION", fields={"Finding": "F-1", "Result": "FIXED"})
        hlog.add_entry(d, "FINDING", fields=FINDING)
        hlog.add_entry(d, "RESOLUTION", fields={"Finding": "F-1", "Result": "FIXED"})
        with self.assertRaisesRegex(ValueError, "F-1 is closed by E-2"):
            hlog.add_entry(d, "RESOLUTION", fields={"Finding": "F-1", "Result": "FIXED"})

    def test_overrule_of_a_blocker_is_refused(self):
        d = run_folder()
        hlog.add_entry(d, "FINDING", fields=dict(FINDING, Class="BLOCKER"))
        with self.assertRaisesRegex(ValueError, "rule 14.4"):
            hlog.add_entry(d, "OVERRULE", fields={"Finding": "F-1"}, text='USER — "leave it"')

    def test_citation_of_a_later_entry_is_refused(self):
        d = run_folder()
        with self.assertRaisesRegex(ValueError, "cites E-5, which does not exist yet"):
            hlog.add_entry(d, "DECISION", text="As E-5 says.")

    def test_stage_entries_must_follow_the_order_start_then_end(self):
        d = run_folder()
        with self.assertRaisesRegex(ValueError, "S1 has no start entry"):
            hlog.add_entry(d, "STAGE", fields={"Stage": "S1", "Event": "end"})
        with self.assertRaisesRegex(ValueError, "skipped needs a reason"):
            hlog.add_entry(d, "STAGE", fields={"Stage": "S5", "Event": "skipped"})
        hlog.add_entry(d, "STAGE", fields={"Stage": "S5", "Event": "skipped — CORE"})

    def test_field_order_is_the_order_given_and_text_follows(self):
        d = run_folder()
        hlog.add_entry(d, "TIER", fields={"TIER": "CORE", "Planned SUB-AGENT runs": "4"}, text="note")
        self.assertIn("- TIER: CORE\n- Planned SUB-AGENT runs: 4\n\nnote\n", log_text(d))

    def test_existing_log_is_never_rewritten(self):
        d = run_folder()
        hlog.add_entry(d, "VOC", text="a")
        before = log_text(d)
        hlog.add_entry(d, "GAP", text="b")
        self.assertTrue(log_text(d).startswith(before))


class CommandLine(unittest.TestCase):
    def run_cli(self, *args, stdin=None):
        return subprocess.run([sys.executable, str(SCRIPT)] + list(args), capture_output=True, text=True, input=stdin)

    def test_add_prints_the_entry_number(self):
        d = run_folder()
        r = self.run_cli("add", str(d), "VOC", "--text", "words")
        self.assertEqual((r.returncode, r.stdout.strip()), (0, "E-1"))

    def test_add_reads_fields_and_text_from_standard_input(self):
        d = run_folder()
        r = self.run_cli("add", str(d), "TIER", "--set", "TIER=CORE", "--text", "-", stdin="from stdin\n")
        self.assertEqual(r.returncode, 0)
        self.assertIn("- TIER: CORE\n\nfrom stdin\n", log_text(d))

    def test_a_refused_entry_exits_1_with_1_line(self):
        d = run_folder()
        r = self.run_cli("add", str(d), "NOTE", "--text", "x")
        self.assertEqual(r.returncode, 1)
        self.assertRegex(r.stderr.strip(), r"^hinshitsu_log: refused: .*unknown type")

    def test_usage_error_exits_2(self):
        self.assertEqual(self.run_cli("add").returncode, 2)


if __name__ == "__main__":
    unittest.main()
