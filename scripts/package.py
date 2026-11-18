#!/usr/bin/env python3
"""Write the files a person uploads or installs. Usage: package.py <output folder>

Writes 3 zip files:
  hinshitsu-claude.zip   the skill for ordinary Claude chat; its root is the folder `hinshitsu-claude/`
  hinshitsu-chatgpt.zip  the skill for ordinary ChatGPT; its root is the folder `hinshitsu-chatgpt/`
  hinshitsu-plugin.zip   the 7 skills with scripts, templates, adapters and both manifests; its root is `hinshitsu/`
The same files give the same bytes on every run. Exit 0 when the 3 files are written, 2 on a usage error.
Standard library only.
"""
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHAT_SKILLS = ("chat/claude/hinshitsu-claude", "chat/chatgpt/hinshitsu-chatgpt")
PLUGIN_PARTS = (".claude-plugin", "adapters", "scripts", "skills", "templates",
                "plugin.json", "README.md", "TESTING.md", "CHANGELOG.md", "LICENSE")
SKIP_DIRS = {"__pycache__", "example"}  # the worked example is a record of 1 run, not a part of the skills
FIXED_TIME = (2026, 1, 1, 0, 0, 0)


def files_under(path):
    """Every file under the path, sorted, without caches and the worked example."""
    if path.is_file():
        return [path]
    return sorted(p for p in path.rglob("*")
                  if p.is_file() and not SKIP_DIRS & set(p.relative_to(path).parts) and p.suffix != ".pyc")


def write_zip(target, entries):
    """Write (file, name in the zip) pairs with a fixed time, so that the same files give the same bytes."""
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
        for path, name in entries:
            info = zipfile.ZipInfo(name, FIXED_TIME)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, path.read_bytes())


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
    print("package: wrote %s in %s" % (", ".join(written), out))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
