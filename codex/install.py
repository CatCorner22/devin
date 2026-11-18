#!/usr/bin/env python3
"""Install the hinshitsu skills where Codex reads them.

Usage: python3 install.py [project folder]     the skills go to <project folder>/.agents/ (default: this folder's parent)
       python3 install.py --home [home folder] the skills go to ~/.agents/, for every project of this user

Codex reads skills from `.agents/skills` in the project and from `~/.agents/skills` (developers.openai.com/codex/skills).
The installer copies `agents/` from beside this file. It replaces the hinshitsu files of an earlier install and
touches no other skill. Exit 0 when the files are copied, 2 on a usage error. Standard library only.
"""
import shutil
import sys
from pathlib import Path

SOURCE = Path(__file__).resolve().parent / "agents"


def install(target, whole_paths):
    """Copy agents/ to <target>/.agents/. With whole_paths, write each `.agents/` path in a SKILL.md in full."""
    dest = target / ".agents"
    copied = 0
    for path in sorted(SOURCE.rglob("*")):
        if not path.is_file():
            continue
        out = dest / path.relative_to(SOURCE)
        out.parent.mkdir(parents=True, exist_ok=True)
        if whole_paths and path.name == "SKILL.md":
            out.write_text(path.read_text(encoding="utf-8").replace(".agents/", dest.as_posix() + "/"), encoding="utf-8")
        else:
            shutil.copyfile(path, out)
        copied += 1
    return dest, copied


def main(argv):
    args = argv[1:]
    home = bool(args) and args[0] == "--home"
    if home:
        args = args[1:]
    if len(args) > 1 or (args and args[0].startswith("-")) or not SOURCE.is_dir():
        print(__doc__.strip(), file=sys.stderr)
        return 2
    target = Path(args[0]) if args else (Path.home() if home else Path(__file__).resolve().parent.parent)
    if not target.is_dir():
        print("install: %s is not a folder" % target, file=sys.stderr)
        return 2
    dest, copied = install(target.resolve(), home)
    print("install: copied %d files to %s" % (copied, dest))
    print("Next: start Codex %s, type $hinshitsu and your request. Restart Codex if the skill is not listed."
          % ("in any project" if home else "in " + str(target.resolve())))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
