import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("hlint", ROOT / "scripts/lint.py")
hlint = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hlint)


def copy_repo():
    d = Path(tempfile.mkdtemp()) / "repo"
    shutil.copytree(ROOT, d, ignore=shutil.ignore_patterns(".git", "__pycache__", "build-record"))
    return d


def edit(d, name, old, new):
    p = d / name
    text = p.read_text(encoding="utf-8")
    assert old in text, old
    p.write_text(text.replace(old, new, 1), encoding="utf-8")


class Lint(unittest.TestCase):
    def assertFails(self, d, fragment):
        errors = hlint.lint(d)
        self.assertTrue(any(fragment in x for x in errors), "no failure with %r in %s" % (fragment, errors))

    def test_banned_word_in_a_rule_fails(self):
        d = copy_repo()
        edit(d, "skills/hinshitsu-gauge/SKILL.md", "Do not pass the script a number.", "The agent should not pass a number.")
        self.assertFails(d, "banned word 'should'")

    def test_banned_word_inside_quotes_passes(self):
        d = copy_repo()
        before = len(hlint.lint(d))
        edit(d, "skills/hinshitsu-gauge/SKILL.md", "Do not pass the script a number.",
             'Do not pass the script a number, even when the USER writes "it should be 50".')
        self.assertEqual(len(hlint.lint(d)), before)

    def test_missing_section_fails(self):
        d = copy_repo()
        edit(d, "skills/hinshitsu-challenge/SKILL.md", "## 6. Standing Red Cell", "## Standing Red Cell")
        self.assertFails(d, "expected [5, 6]")

    def test_rule_number_gap_fails(self):
        d = copy_repo()
        edit(d, "skills/hinshitsu-gauge/SKILL.md", "\n2. **What it reads.**", "\n9. **What it reads.**")
        self.assertFails(d, "are not 1..n")

    def test_long_description_fails(self):
        d = copy_repo()
        edit(d, "skills/hinshitsu-gauge/SKILL.md", "description: ", "description: " + "x" * 1024)
        self.assertFails(d, "limit 1,024")

    def test_wrong_name_fails(self):
        d = copy_repo()
        edit(d, "skills/hinshitsu-gauge/SKILL.md", "name: hinshitsu-gauge", "name: gauge")
        self.assertFails(d, "is not the folder name")

    def test_undefined_capitalized_term_fails(self):
        d = copy_repo()
        edit(d, "skills/hinshitsu-gauge/SKILL.md", "Do not pass the script a number.", "The OVERSEER passes no number.")
        self.assertFails(d, "'OVERSEER' is not in the glossary")

    def test_duplicate_glossary_term_fails(self):
        d = copy_repo()
        p = d / "skills/hinshitsu/GLOSSARY.md"
        p.write_text(p.read_text(encoding="utf-8") + "\n**DONE** — again.\n", encoding="utf-8")
        self.assertFails(d, "term DONE defined 2 times")

    def test_perplexity_adapter_fails(self):
        d = copy_repo()
        (d / "adapters").mkdir(exist_ok=True)
        (d / "adapters/perplexity.md").write_text("x", encoding="utf-8")
        self.assertFails(d, "fails the swarm test")

    # --- round-3 code review, bugs 32 to 36 ---

    def test_inflected_banned_words_fail(self):
        for words in ("It ensures that no number is passed.", "The agent shouldn't pass a number.",
                      "The script is properly called."):
            d = copy_repo()
            edit(d, "skills/hinshitsu-gauge/SKILL.md", "Do not pass the script a number.", words)
            self.assertFails(d, "banned word")

    def test_banned_word_inside_a_code_span_passes(self):
        d = copy_repo()
        before = len(hlint.lint(d))
        edit(d, "skills/hinshitsu-gauge/SKILL.md", "Do not pass the script a number.",
             "Do not pass the script a number; `ensure_dir()` is a name, not a word.")
        self.assertEqual(len(hlint.lint(d)), before)

    def test_banned_word_line_number_after_a_code_block(self):
        d = copy_repo()
        (d / "TESTING.md").write_text("# t\n```\na\nb\n```\nIt should work.\n", encoding="utf-8")
        self.assertFails(d, "TESTING.md:6: banned word")

    def test_missing_template_or_script_fails(self):
        for rel in ("templates/DELIVERY-REPORT.md", "templates/roles/red-cell.md", "scripts/hinshitsu_check.py",
                    "skills/hinshitsu-gauge/scripts/gauge.py"):
            d = copy_repo()
            (d / rel).unlink()
            self.assertFails(d, "%s: required file is missing" % rel)

    def test_manifest_that_is_not_an_object_fails_without_a_traceback(self):
        d = copy_repo()
        (d / "plugin.json").write_text("[]", encoding="utf-8")
        self.assertFails(d, "plugin.json: the manifest is not a JSON object")

    def test_skill_with_windows_line_ends_is_read(self):
        d = copy_repo()
        p = d / "skills/hinshitsu-gauge/SKILL.md"
        p.write_bytes(p.read_bytes().replace(b"\n", b"\r\n"))
        self.assertFalse(any("frontmatter" in x for x in hlint.lint(d)))

    def test_file_that_is_not_utf8_gives_a_verdict_not_a_traceback(self):
        d = copy_repo()
        (d / "README.md").write_bytes(b"\xff\xfe bad")
        self.assertEqual(hlint.main(["lint.py", str(d)]), 1)

    def test_folder_that_does_not_exist_is_a_usage_error(self):
        self.assertEqual(hlint.main(["lint.py", "/no/such/folder"]), 2)

    def test_undefined_phrase_built_from_skipped_words_fails(self):
        d = copy_repo()
        edit(d, "skills/hinshitsu-gauge/SKILL.md", "Do not pass the script a number.",
             "Do not pass the script a number. The RECORD PLAN decides.")
        self.assertFails(d, "capitalized term")

    def test_repository_passes(self):
        self.assertEqual(hlint.lint(ROOT), [])


if __name__ == "__main__":
    unittest.main()
