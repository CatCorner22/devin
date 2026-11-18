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

    def test_finding_with_a_refused_id_is_unread_and_not_a_blocker(self):
        for bad in ("- ID: F-1.\n", "- ID: blocker one\n", "- ID:\n", ""):
            log = stage(1, "S7", "start") + "### E-2 · t · FINDING · auditor\n" + bad + "- Class: BLOCKER\n"
            st = gauge.read_state(log)
            self.assertEqual((st["blockers"], st["unread"]), ([], 1), bad)

    def test_finding_with_a_refused_id_is_unread_whatever_its_class(self):
        log = stage(1, "S7", "start")
        log += "### E-2 · t · FINDING · auditor\n- ID: F-1.\n- Class: DEFECT\n"
        log += "### E-3 · t · FINDING · auditor\n- Class: STYLE\n"
        log += "### E-4 · t · FINDING · auditor\n- ID: F-1\n- Class: DEFECT\n"
        st = gauge.read_state(log)
        self.assertEqual((st["blockers"], st["unread"]), ([], 2))

    def test_refused_ids_beside_a_good_blocker_leave_only_the_good_one(self):
        log = stage(1, "S7", "start")
        log += "### E-2 · t · FINDING · auditor\n- ID: F-1.\n- Class: BLOCKER\n"
        log += "### E-3 · t · FINDING · auditor\n- ID: F-2\n- Class: BLOCKER\n"
        log += "### E-4 · t · FINDING · auditor\n- ID: blocker one\n- Class: BLOCKER (d)\n"
        st = gauge.read_state(log)
        self.assertEqual((st["blockers"], st["unread"]), (["F-2"], 2))
        st = gauge.read_state(log + "### E-5 · t · RESOLUTION · orchestrator\n- Finding: F-2\n- Result: FIXED\n")
        self.assertEqual((st["blockers"], st["unread"]), ([], 2))

    def test_gauge_and_checker_agree_on_the_finding_id(self):
        sys.path.insert(0, str(ROOT / "scripts"))
        import hinshitsu_check
        for raw in ("F-1", "F-12", "F-3 (local 2)", "F-1.", "blocker one", "f-1", "F-", "F-1a", " F-2",
                    "F-0", "F-1,", "F- 1", "-F-1", "F-1 F-2", "F--1", "E-1", "F-٣"):
            log = "### E-1 · t · FINDING · auditor\n- ID: %s\n- Class: BLOCKER\n" % raw
            accepted = bool(hinshitsu_check.FINDING_ID.fullmatch(raw.split()[0]))
            self.assertEqual(hinshitsu_check.finding_id(log.split("\n", 1)[1]) is not None, accepted, raw)
            st = gauge.read_state(log)
            self.assertEqual(st["blockers"], [raw.strip()] if accepted else [], raw)
            self.assertEqual(st["unread"], 0 if accepted else 1, raw)


class Output(unittest.TestCase):
    def run_script(self, log, *options):
        d = Path(tempfile.mkdtemp())
        (d / "AUDIT-LOG.md").write_text(log, encoding="utf-8")
        r = subprocess.run([sys.executable, str(SCRIPT), str(d)] + list(options), capture_output=True, text=True)
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
        self.assertIn("STOPPED — blocker open: 1: F-7", r.stdout)
        self.assertIn("STOPPED — blocker open: 1: F-7", (d / "GAUGE.svg").read_text(encoding="utf-8"))

    # --- round-3 code review, bugs 38 to 41; round-2 red cell, finding 17 ---

    def test_entries_that_cannot_be_read_are_counted(self):
        log = ("### E-1 - t - STAGE - orchestrator\n- Stage: S1\n- Event: end\n"   # wrong separator
               + stage(2, "S2", "ended") + stage(3, "S13", "end") + stage(4, "S3", "end"))
        d, r = self.run_script(log)
        self.assertIn("3 entries could not be read", r.stdout)
        self.assertIn("1 of 12 stages complete", r.stdout)

    def test_mistyped_option_is_a_usage_error(self):
        d, r = self.run_script(stage(1, "S1", "end"), "--nosvg")
        self.assertEqual(r.returncode, 2)
        self.assertFalse((d / "GAUGE.svg").exists())

    def test_all_skipped_is_not_called_an_end_entry(self):
        d, r = self.run_script("".join(stage(i, "S%d" % i, "skipped") for i in range(1, 13)))
        self.assertIn("All 12 stages have an end or skipped entry", r.stdout)
        self.assertNotIn("have an end entry", (d / "GAUGE.svg").read_text(encoding="utf-8"))

    def test_bar_line_says_it_is_not_proof_of_done(self):
        d, r = self.run_script(stage(1, "S1", "end"))
        self.assertIn("not proof of DONE", r.stdout.splitlines()[0])

    def test_blocker_logged_2_times_is_listed_1_time(self):
        finding = "### E-%d · t · FINDING · a\n- ID: F-7\n- Class: BLOCKER\n"
        d, r = self.run_script(finding % 1 + finding % 2)
        self.assertIn("STOPPED — blocker open: 1: F-7", r.stdout)

    def test_overruled_blocker_stays_open(self):
        d, r = self.run_script("### E-1 · t · FINDING · a\n- ID: F-7\n- Class: BLOCKER\n"
                               "### E-2 · t · OVERRULE · a\n- Finding: F-7\n")
        self.assertIn("STOPPED — blocker open: 1: F-7", r.stdout)

    def test_svg_is_well_formed_and_escapes(self):
        import xml.dom.minidom
        d, _ = self.run_script("### E-1 · t · FINDING · a\n- ID: F-1<&>\n- Class: BLOCKER\n")
        xml.dom.minidom.parse(str(d / "GAUGE.svg"))

    def test_missing_log_exits_2(self):
        r = subprocess.run([sys.executable, str(SCRIPT), tempfile.mkdtemp()], capture_output=True, text=True)
        self.assertEqual(r.returncode, 2)

    def test_refused_finding_ids_are_counted_and_not_shown_as_stopped(self):
        log = stage(1, "S7", "start")
        log += "### E-2 · t · FINDING · auditor\n- ID: F-1.\n- Class: BLOCKER\n"
        log += "### E-3 · t · FINDING · auditor\n- ID: blocker one\n- Class: BLOCKER\n"
        log += "### E-4 · t · FINDING · auditor\n- Class: BLOCKER\n"
        d, r = self.run_script(log)
        svg = (d / "GAUGE.svg").read_text(encoding="utf-8")
        self.assertEqual(r.returncode, 0)
        self.assertIn("3 entries could not be read", r.stdout)
        for shown in (r.stdout, svg):
            self.assertNotIn("STOPPED", shown)
            self.assertNotIn("F-1.", shown)
            self.assertNotIn("blocker one", shown)

    def test_stopped_line_lists_only_the_blocker_with_a_good_id(self):
        log = stage(1, "S7", "start")
        log += "### E-2 · t · FINDING · auditor\n- ID: F-1.\n- Class: BLOCKER\n"
        log += "### E-3 · t · FINDING · auditor\n- ID: F-2\n- Class: BLOCKER\n"
        log += "### E-4 · t · FINDING · auditor\n- ID: blocker one\n- Class: BLOCKER\n"
        d, r = self.run_script(log)
        svg = (d / "GAUGE.svg").read_text(encoding="utf-8")
        self.assertIn("STOPPED — blocker open: 1: F-2\n", r.stdout)
        self.assertIn("2 entries could not be read", r.stdout)
        self.assertIn("STOPPED — blocker open: 1: F-2<", svg)
        for shown in (r.stdout, svg):
            self.assertNotIn("F-1.", shown)
            self.assertNotIn("blocker one", shown)


if __name__ == "__main__":
    unittest.main()
