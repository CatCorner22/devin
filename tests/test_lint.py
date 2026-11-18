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

    def test_repository_passes(self):
        self.assertEqual(hlint.lint(ROOT), [])


if __name__ == "__main__":
    unittest.main()
