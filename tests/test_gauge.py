import importlib.util
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "skills/hinshitsu-gauge/scripts/gauge.py"
spec = importlib.util.spec_from_file_location("gauge", SCRIPT)
gauge = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gauge)


def stage(n, sid, event, extra=""):
    return "### E-%d · t · STAGE · orchestrator\n- Stage: %s\n- Event: %s\n%s\n" % (n, sid, event, extra)


class ReadState(unittest.TestCase):
    def test_empty_log_is_zero_and_names_s1_next(self):
        st = gauge.read_state("")
        self.assertEqual((st["percent"], st["complete"], st["current"][0]), (0, 0, "S1"))

    def test_start_alone_does_not_count_as_complete(self):
        st = gauge.read_state(stage(1, "S1", "start"))
        self.assertEqual((st["percent"], st["state"]["S1"]), (0, "running"))

    def test_end_and_skipped_count(self):
        st = gauge.read_state(stage(1, "S1", "start") + stage(2, "S1", "end") + stage(3, "S5", "skipped — CORE"))
        self.assertEqual((st["complete"], st["percent"]), (2, 17))

    def test_work_units_move_the_needle_inside_s7(self):
        log = "".join(stage(i, "S%d" % i, "end") for i in range(1, 7))
        log += stage(7, "S7", "start") + stage(8, "S7", "progress", "- Work units: 1 of 2")
        st = gauge.read_state(log)
        self.assertEqual(st["percent"], 54)
        self.assertEqual(st["current"][2], "hinshitsu-audit")

    def test_all_twelve_ends_give_100(self):
        st = gauge.read_state("".join(stage(i, "S%d" % i, "end") for i in range(1, 13)))
        self.assertEqual((st["percent"], st["current"]), (100, None))

    def test_open_blocker_stops_and_resolution_clears(self):
        finding = "### E-2 · t · FINDING · auditor\n- ID: F-1\n- Class: BLOCKER\n"
        st = gauge.read_state(stage(1, "S7", "start") + finding)
        self.assertEqual(st["blockers"], ["F-1"])
        st = gauge.read_state(stage(1, "S7", "start") + finding
                              + "### E-3 · t · RESOLUTION · orchestrator\n- Finding: F-1\n- Result: FIXED\n")
        self.assertEqual(st["blockers"], [])

    def test_defect_does_not_stop(self):
        st = gauge.read_state("### E-1 · t · FINDING · auditor\n- ID: F-1\n- Class: DEFECT\n")
        self.assertEqual(st["blockers"], [])

    def test_unknown_stage_and_prose_are_ignored(self):
        st = gauge.read_state(stage(1, "S99", "end") + "Stage: S1\nEvent: end\n")
        self.assertEqual(st["complete"], 0)


class Output(unittest.TestCase):
    def run_script(self, log):
        d = Path(tempfile.mkdtemp())
        (d / "AUDIT-LOG.md").write_text(log, encoding="utf-8")
        r = subprocess.run([sys.executable, str(SCRIPT), str(d)], capture_output=True, text=True)
        return d, r

    def test_writes_svg_and_text_that_agree(self):
        d, r = self.run_script(stage(1, "S1", "start") + stage(2, "S1", "end") + stage(3, "S2", "start"))
        self.assertEqual(r.returncode, 0)
        svg = (d / "GAUGE.svg").read_text(encoding="utf-8")
        self.assertIn("8%", r.stdout)
        self.assertIn(">8%<", svg)
        self.assertIn("Now: S2 Record set up", r.stdout)
        self.assertIn("Now: S2 Record set up (hinshitsu-record)", svg)

    def test_same_log_gives_same_bytes(self):
        d, _ = self.run_script(stage(1, "S1", "end"))
        first = (d / "GAUGE.svg").read_bytes()
        subprocess.run([sys.executable, str(SCRIPT), str(d)], capture_output=True)
        self.assertEqual(first, (d / "GAUGE.svg").read_bytes())

    def test_blocker_shows_stop_in_both(self):
        d, r = self.run_script("### E-1 · t · FINDING · a\n- ID: F-7\n- Class: BLOCKER\n")
        self.assertIn("STOPPED - blocker open: F-7", r.stdout)
        self.assertIn("STOPPED - blocker open: F-7", (d / "GAUGE.svg").read_text(encoding="utf-8"))

    def test_svg_is_well_formed_and_escapes(self):
        import xml.dom.minidom
        d, _ = self.run_script("### E-1 · t · FINDING · a\n- ID: F-1<&>\n- Class: BLOCKER\n")
        xml.dom.minidom.parse(str(d / "GAUGE.svg"))

    def test_missing_log_exits_2(self):
        r = subprocess.run([sys.executable, str(SCRIPT), tempfile.mkdtemp()], capture_output=True, text=True)
        self.assertEqual(r.returncode, 2)


if __name__ == "__main__":
    unittest.main()
