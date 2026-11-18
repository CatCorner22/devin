#!/usr/bin/env python3
"""Write the files a person uploads or installs. Usage: package.py <output folder>

Writes 4 zip files:
  hinshitsu-claude.zip   the skill for ordinary Claude chat; its root is the folder `hinshitsu-claude/`
  hinshitsu-chatgpt.zip  the skill for ordinary ChatGPT; its root is the folder `hinshitsu-chatgpt/`
  hinshitsu-plugin.zip   the 7 skills with scripts, templates, adapters and both manifests; its root is `hinshitsu/`
  hinshitsu-codex.zip    the 7 skills laid out for Codex (`.agents/skills`), with an installer; its root is
                         `hinshitsu-codex/`
The same files give the same bytes on every run. Exit 0 when the 4 files are written, 2 on a usage error.
Standard library only.
"""
import re
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHAT_SKILLS = ("chat/claude/hinshitsu-claude", "chat/chatgpt/hinshitsu-chatgpt")
PLUGIN_PARTS = (".claude-plugin", "adapters", "scripts", "skills", "templates",
                "plugin.json", "README.md", "TESTING.md", "CHANGELOG.md", "LICENSE")
SKIP_DIRS = {"__pycache__", "example"}  # the worked example is a record of 1 run, not a part of the skills
FIXED_TIME = (2026, 1, 1, 0, 0, 0)
# In the Codex layout the skills sit in `.agents/skills/` and the shared files in `.agents/hinshitsu/`.
SHARED_PATH = re.compile(r"(?<![\w./-])(scripts|templates|adapters)/")
SKILLS_PATH = re.compile(r"(?<![\w./-])skills/")
REPO_PATHS_NOTE = re.compile(r" The folders `scripts/`, `templates/` and `adapters/` named in the skills[^\n]*?in full\.")


def codex_text(text):
    """A SKILL.md with each path of the repository layout written as its path in the Codex layout."""
    text = REPO_PATHS_NOTE.sub("", text)  # the sentence describes the repository layout; these paths are whole
    return SKILLS_PATH.sub(".agents/skills/", SHARED_PATH.sub(r".agents/hinshitsu/\1/", text))


def codex_entries():
    """(content or file, name in the zip) for the Codex package."""
    adapter = codex_text((ROOT / "adapters/codex.md").read_text(encoding="utf-8")).encode("utf-8")
    entries = [(ROOT / "codex/README.md", "README.md"), (ROOT / "codex/install.py", "install.py"),
               (adapter, "agents/hinshitsu/adapters/codex.md"),
               (ROOT / "LICENSE", "agents/hinshitsu/LICENSE")]
    for part in ("scripts", "templates"):
        entries += [(p, "agents/hinshitsu/" + p.relative_to(ROOT).as_posix()) for p in files_under(ROOT / part)
                    if p.name not in ("lint.py", "package.py")]
    for p in files_under(ROOT / "skills"):
        name = "agents/" + p.relative_to(ROOT).as_posix()
        entries.append((codex_text(p.read_text(encoding="utf-8")).encode("utf-8") if p.name == "SKILL.md" else p, name))
    return [(content, "hinshitsu-codex/" + name) for content, name in entries]


def files_under(path):
    """Every file under the path, sorted, without caches and the worked example."""
    if path.is_file():
        return [path]
    return sorted(p for p in path.rglob("*")
                  if p.is_file() and not SKIP_DIRS & set(p.relative_to(path).parts) and p.suffix != ".pyc")


def write_zip(target, entries):
    """Write (file or bytes, name in the zip) pairs with a fixed time, so that the same files give the same bytes."""
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
        for path, name in entries:
            info = zipfile.ZipInfo(name, FIXED_TIME)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, path if isinstance(path, bytes) else path.read_bytes())


def main(argv):
    if len(argv) != 2:
        print(__doc__.strip(), file=sys.stderr)
        return 2
    out = Path(argv[1])
    out.mkdir(parents=True, exist_ok=True)
    written = []
    for rel in CHAT_SKILLS:
        folder = ROOT / rel
        write_zip(out / (folder.name + ".zip"),
                  [(p, "%s/%s" % (folder.name, p.relative_to(folder).as_posix())) for p in files_under(folder)])
        written.append(folder.name + ".zip")
    entries = []
    for part in PLUGIN_PARTS:
        entries += [(p, "hinshitsu/" + p.relative_to(ROOT).as_posix()) for p in files_under(ROOT / part)]
    write_zip(out / "hinshitsu-plugin.zip", entries)
    written.append("hinshitsu-plugin.zip")
    write_zip(out / "hinshitsu-codex.zip", codex_entries())
    written.append("hinshitsu-codex.zip")
    print("package: wrote %s in %s" % (", ".join(written), out))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
