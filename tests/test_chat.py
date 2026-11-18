"""Tests of the single-assistant skills for ordinary Claude chat and ordinary ChatGPT, and of their packaging."""
import importlib.util
import re
import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from hinshitsu_text import BANNED_RE, strip_quotes  # noqa: E402

SKILLS = {"claude": ROOT / "chat/claude/hinshitsu-claude", "chatgpt": ROOT / "chat/chatgpt/hinshitsu-chatgpt"}


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


report_check = load(SKILLS["claude"] / "scripts/report_check.py", "report_check")

GOOD = """# Report

## Status
DELIVERED — SELF-CHECKED
One assistant built and checked this work; no independent checker reviewed it.

## Requirements
- R1: CHECKED — the output of `python3 split.py 10 3` above shows 3.34, 3.33, 3.33.
- R2: CHECKED — the test ran 2 times; both outputs above show "OK".

## Known limits and open faults
Nothing

## What you did not ask for and got anyway
- Assumed: amounts use a dot as the decimal mark.

## Check it yourself
1. Open the file split.py; see the line that starts `def split`.
2. Open the output above; see "OK".
3. Open the page; see 3 amounts.

## What you need to decide next
Nothing
"""


class ReportCheck(unittest.TestCase):
    def fails(self, text, needle):
        failures = report_check.check(text)
        self.assertTrue(any(needle in f for f in failures), failures)

    def test_good_report_passes(self):
        self.assertEqual(report_check.check(GOOD), [])

    def test_missing_heading_fails(self):
        self.fails(GOOD.replace("## Check it yourself", "## Checks"), "`## Check it yourself` is missing")

    def test_headings_out_of_order_fail(self):
        head, tail = GOOD.split("## Requirements")
        req, rest = tail.split("## Known limits and open faults")
        self.fails(head + "## Known limits and open faults" + rest + "\n## Requirements" + req, "out of order")

    def test_status_that_is_neither_of_the_2_fails(self):
        self.fails(GOOD.replace("DELIVERED — SELF-CHECKED", "Complete"), "starts with neither")

    def test_status_without_the_solo_sentence_fails(self):
        self.fails(GOOD.replace("One assistant built and checked this work; no independent checker reviewed it.", ""),
                   "lacks the sentence")

    def test_self_checked_with_a_requirement_not_checked_fails(self):
        self.fails(GOOD.replace("R2: CHECKED — the test ran 2 times; both outputs above show \"OK\".",
                                "R2: NOT CHECKED — no code can run in this chat."), "read NOT CHECKED")

    def test_not_finished_with_a_requirement_not_checked_passes(self):
        text = GOOD.replace("DELIVERED — SELF-CHECKED", "DELIVERED — NOT FINISHED: R2 is NOT CHECKED").replace(
            "R2: CHECKED — the test ran 2 times; both outputs above show \"OK\".",
            "R2: NOT CHECKED — no code can run in this chat.")
        self.assertEqual(report_check.check(text), [])

    def test_requirement_line_with_no_evidence_fails(self):
        self.fails(GOOD.replace("- R1: CHECKED — the output of `python3 split.py 10 3` above shows 3.34, 3.33, 3.33.",
                                "- R1: CHECKED"), "no evidence and no reason")

    def test_requirement_line_with_no_state_fails(self):
        self.fails(GOOD.replace("R1: CHECKED —", "R1: works —"), "neither CHECKED nor NOT CHECKED")

    def test_2_checks_fail(self):
        self.fails(GOOD.replace("3. Open the page; see 3 amounts.\n", ""), "holds 2 checks")

    def test_empty_section_fails(self):
        self.fails(GOOD.replace("## Known limits and open faults\nNothing", "## Known limits and open faults\n"), "is empty")

    def test_claim_of_an_independent_check_fails(self):
        self.fails(GOOD.replace("Nothing\n\n## What you did", "This was independently verified.\n\n## What you did"),
                   "cannot claim it")

    def test_command_line_exit_codes(self):
        with tempfile.TemporaryDirectory() as d:
            good, bad = Path(d) / "good.md", Path(d) / "bad.md"
            good.write_text(GOOD.replace("\n", "\r\n"), encoding="utf-8")
            bad.write_text("# nothing", encoding="utf-8")
            script = str(SKILLS["claude"] / "scripts/report_check.py")
            run = lambda *a: subprocess.run([sys.executable, script, *a], capture_output=True, text=True)
            self.assertEqual(run(str(good)).returncode, 0)
            self.assertEqual(run(str(bad)).returncode, 1)
            self.assertEqual(run().returncode, 2)
            self.assertEqual(run(str(Path(d) / "none.md")).returncode, 2)


class SkillForm(unittest.TestCase):
    def test_each_skill_has_frontmatter_that_the_2_vendors_accept(self):
        for key, folder in SKILLS.items():
            text = (folder / "SKILL.md").read_text(encoding="utf-8")
            m = re.match(r"---\nname: (.+)\ndescription: (.+)\n---\n", text)
            self.assertIsNotNone(m, key)
            self.assertEqual(m.group(1), folder.name)
            self.assertRegex(m.group(1), r"^[a-z0-9-]{1,64}$")
            self.assertLessEqual(len(m.group(2)), 1024, key)
            self.assertNotRegex(m.group(2), r"[<>]")
            self.assertLessEqual(len(text.splitlines()), 500)

    def test_each_skill_says_that_nothing_is_independent_and_keeps_the_core(self):
        for key, folder in SKILLS.items():
            text = (folder / "SKILL.md").read_text(encoding="utf-8")
            for needle in ("no independent checker reviewed it", "Baby bird", "Do not start the work before the user approves",
                           "DELIVERED — SELF-CHECKED", "## Check it yourself", "unstable or ill-formed"):
                self.assertIn(needle, text, "%s: %s" % (key, needle))

    def test_no_banned_word_outside_quotes(self):
        for key, folder in SKILLS.items():
            for n, line in enumerate((folder / "SKILL.md").read_text(encoding="utf-8").splitlines(), 1):
                self.assertIsNone(BANNED_RE.search(strip_quotes(line)), "%s line %d: %s" % (key, n, line[:80]))

    def test_the_2_skills_carry_the_same_report_checker(self):
        self.assertEqual((SKILLS["claude"] / "scripts/report_check.py").read_bytes(),
                         (SKILLS["chatgpt"] / "scripts/report_check.py").read_bytes())

    def test_chatgpt_has_a_paste_in_form_for_accounts_without_skills(self):
        text = (ROOT / "chat/chatgpt/PASTE-IN.md").read_text(encoding="utf-8")
        self.assertIn("no independent checker reviewed it", text)
        self.assertLessEqual(len(text.split("```")[1]), 8000)  # the block to paste


class Package(unittest.TestCase):
    def test_package_writes_1_zip_per_chat_skill_with_the_skill_folder_as_its_root(self):
        with tempfile.TemporaryDirectory() as d:
            r = subprocess.run([sys.executable, str(ROOT / "scripts/package.py"), d], capture_output=True, text=True)
            self.assertEqual(r.returncode, 0, r.stderr)
            for folder in SKILLS.values():
                with zipfile.ZipFile(Path(d) / (folder.name + ".zip")) as z:
                    names = z.namelist()
                self.assertIn(folder.name + "/SKILL.md", names)
                self.assertIn(folder.name + "/scripts/report_check.py", names)
                self.assertTrue(all(n.startswith(folder.name + "/") for n in names), names)
                self.assertFalse(any("__pycache__" in n for n in names))

    def test_package_writes_the_whole_plugin_as_1_zip(self):
        with tempfile.TemporaryDirectory() as d:
            subprocess.run([sys.executable, str(ROOT / "scripts/package.py"), d], capture_output=True, text=True)
            with zipfile.ZipFile(Path(d) / "hinshitsu-plugin.zip") as z:
                names = z.namelist()
            for needle in ("hinshitsu/plugin.json", "hinshitsu/.claude-plugin/plugin.json", "hinshitsu/skills/hinshitsu/SKILL.md",
                           "hinshitsu/scripts/hinshitsu_check.py", "hinshitsu/templates/roles/final-auditor.md"):
                self.assertIn(needle, names)
            self.assertFalse(any(n.startswith(("hinshitsu/runs/", "hinshitsu/build-record/", "hinshitsu/tests/")) for n in names))

    def test_package_is_the_same_bytes_on_a_second_run(self):
        with tempfile.TemporaryDirectory() as a, tempfile.TemporaryDirectory() as b:
            for d in (a, b):
                subprocess.run([sys.executable, str(ROOT / "scripts/package.py"), d], capture_output=True, text=True)
            for name in ("hinshitsu-claude.zip", "hinshitsu-chatgpt.zip", "hinshitsu-plugin.zip"):
                self.assertEqual((Path(a) / name).read_bytes(), (Path(b) / name).read_bytes(), name)


if __name__ == "__main__":
    unittest.main()
