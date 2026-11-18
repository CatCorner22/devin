#!/usr/bin/env python3
"""hinshitsu lint: check the form of the skills, glossary, templates and adapters.

Usage: lint.py [repo-root]
Exit 0 when every check passes, 1 when any fails, 2 on a usage error. Standard library only.
This script tests form. It does not prove that any rule is sound.
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hinshitsu_text import BANNED_RE, strip_quotes  # noqa: E402

SKILLS = {
    "hinshitsu": [0, 1, 21, 22],
    "hinshitsu-baby-bird-plan": [2, 3, 4, 23],
    "hinshitsu-challenge": [5, 6],
    "hinshitsu-record": [7, 8, 9, 10, 18],
    "hinshitsu-audit": [11, 12, 13, 14, 15, 16],
    "hinshitsu-delivery": [17, 19, 20],
    "hinshitsu-gauge": [24],
}
REQUIRED_FILES = [
    "README.md", "plugin.json", ".claude-plugin/plugin.json",
    "skills/hinshitsu/GLOSSARY.md", "skills/hinshitsu/EXAMPLE.md",
    "templates/MINDMAP.md", "templates/CONNECTIONS.md",
    "templates/AUDIT-LOG.md", "templates/COVERAGE-LEDGER.md", "templates/DELIVERY-REPORT.md",
    "templates/FRAMEWORK.md", "templates/SESSION-STATE.md",
    "INSTALL.md", "chat/claude/hinshitsu-claude/SKILL.md", "chat/chatgpt/hinshitsu-chatgpt/SKILL.md",
    "chat/chatgpt/PASTE-IN.md", "codex/README.md", "codex/install.py", "scripts/package.py", "scripts/hinshitsu_check.py", "scripts/hinshitsu_log.py", "scripts/hinshitsu_text.py", "scripts/lint.py",
    "skills/hinshitsu-gauge/scripts/gauge.py",
    "adapters/claude-code.md", "adapters/cursor.md", "adapters/devin.md",
    "adapters/codex.md", "adapters/gemini.md", "adapters/kimi.md", "adapters/muse.md",
]
REQUIRED_FILES += ["templates/roles/%s.md" % role for role in (
    "auditor-adversarial", "auditor-best-practices", "auditor-correctness", "auditor-forensic-5s",
    "auditor-framework-drift", "auditor-language", "auditor-recipient-experience", "final-auditor",
    "lens-minimal-viable-sequence", "lens-recipient-experience", "lens-structural-integrity",
    "lens-trust-controls", "red-cell", "referee", "seeder")]
REQUIRED_TERMS = ["DELIVERABLE", "RECIPIENT", "DONE", "BLOCKER", "DEFECT", "FRAGILITY", "STYLE",
                  "VERIFIED", "ASSERTED", "UNVERIFIED", "DEGRADED", "VOC-ASSUMED",
                  "INSUFFICIENTLY ADVERSARIAL"]
# Capitalized words that are not defined terms: log entry types, literals, acronyms.
NOT_TERMS = set("""CAPABILITY TIER STAGE VOC GAP ASSUMPTION CRITERIA CRITERIA-CHANGE CARD ANSWER
RECONCILIATION DECISION TRACE LAUNCH FINDING RESOLUTION OVERRULE PROBE CHECK COMPACTION REVERSAL
ABANDONED ROLLBACK WAIVER CORRECTION DELIVERY LESSON LESSONS PASS FAIL FIXED WITHDRAWN OVERRULED
PROPOSED FROZEN CORE FULL SWARM ACCEPTED REJECTED REDACTED
TODO FIXME SKILL GLOSSARY MINDMAP CONNECTIONS AUDIT-LOG COVERAGE-LEDGER FRAMEWORK
SESSION-STATE DELIVERY-REPORT GAUGE EXAMPLE README TESTING CHANGELOG LICENSE AGENTS CLAUDE GEMINI
YAML JSON SVG URL UTC SHA-256 SHA CLI IDE API SDK MCP MIT USNG ID IDS OK N/A STOPPED COR FOR BP
ADV RX DRIFT LANG RED RSV STAB DELIVERED ASSUMED TYPE AI VA""".split())
# Literal values of more than 1 word. Each is matched whole, so that its words alone define nothing.
LITERAL_PHRASES = ("PLAN SURVIVES WITH CHANGES", "PLAN SURVIVES", "PLAN KILLED", "NO RECORD",
                   "DELIVERED — NOT DONE", "NOT DONE")
CAP_RE = re.compile(r"(?<![A-Za-z`/_.-])([A-Z][A-Z]+(?:[ -][A-Z][A-Z]+)*)(?![A-Za-z_/.-])")


def singulars(word):
    """Return the forms a plural defined term may come from (LENSES, PREMISES, FINDINGS)."""
    out = {word}
    for end, rep in (("SES", "S"), ("ES", "E"), ("ES", ""), ("S", "")):
        if word.endswith(end):
            out.add(word[: -len(end)] + rep)
    return out


def frontmatter(text):
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        return None
    out = {}
    for line in m.group(1).splitlines():
        k, _, v = line.partition(":")
        out[k.strip()] = v.strip()
    return out


def glossary_terms(text):
    return re.findall(r"^\*\*([A-Z][A-Z —-]*[A-Z])\*\* —", text, re.M)


def lint(root):
    root = Path(root)
    errors = []

    def err(path, msg):
        errors.append("%s: %s" % (path, msg))

    for rel in REQUIRED_FILES:
        if not (root / rel).is_file():
            err(rel, "required file is missing (C1)")
    if (root / "adapters/perplexity.md").exists():
        err("adapters/perplexity.md", "adapter for a surface that fails the swarm test (E-006)")

    gpath = root / "skills/hinshitsu/GLOSSARY.md"
    terms = glossary_terms(gpath.read_text(encoding="utf-8")) if gpath.is_file() else []
    for t in sorted(set(terms)):
        if terms.count(t) > 1:
            err("skills/hinshitsu/GLOSSARY.md", "term %s defined %d times (C3)" % (t, terms.count(t)))
    for t in REQUIRED_TERMS:
        if t not in terms:
            err("skills/hinshitsu/GLOSSARY.md", "required term %s is not defined (C3)" % t)
    known = set(terms) | NOT_TERMS
    for t in list(terms):
        known.update(t.replace("—", " ").split())

    seen_sections = []
    for name, sections in SKILLS.items():
        rel = "skills/%s/SKILL.md" % name
        p = root / rel
        if not p.is_file():
            err(rel, "required file is missing (C1)")
            continue
        raw = p.read_bytes()
        text = raw.decode("utf-8").replace("\r\n", "\n")
        fm = frontmatter(text)
        if fm is None:
            err(rel, "no YAML frontmatter (C2)")
            fm = {}
        if fm.get("name") != name:
            err(rel, "frontmatter name %r is not the folder name (C2)" % fm.get("name"))
        desc = fm.get("description", "")
        if not desc:
            err(rel, "no description (C2)")
        if len(desc) > 1024:
            err(rel, "description is %d characters; limit 1,024 (C13)" % len(desc))
        if len(raw) > 18 * 1024:
            err(rel, "file is %d bytes; limit 18 KiB (C13)" % len(raw))
        if text.count("\n") > 500:
            err(rel, "file is %d lines; limit 500 (C13)" % text.count("\n"))
        found = [int(n) for n in re.findall(r"^## (\d+)\. ", text, re.M)]
        if found != sections:
            err(rel, "sections %s; expected %s in that order (C2)" % (found, sections))
        seen_sections += found
        for num in found:
            section = re.search(r"^## %d\. .*?\n(.*?)(?=^## |\Z)" % num, text, re.M | re.S)
            body = section.group(1) if section else ""
            rules = [int(n) for n in re.findall(r"^(\d+)\. ", body, re.M)]
            if rules != list(range(1, len(rules) + 1)) or not rules:
                err(rel, "section %d: rule numbers %s are not 1..n (C5)" % (num, rules))
    if sorted(seen_sections) != list(range(0, 25)):
        err("skills/", "sections found %s; expected 0 to 24, each 1 time (C2)" % sorted(seen_sections))

    governed = [p for pat in ("skills/*/SKILL.md", "skills/hinshitsu/GLOSSARY.md", "templates/**/*.md",
                              "adapters/*.md", "README.md", "TESTING.md", "CHANGELOG.md",
                              "skills/hinshitsu/EXAMPLE.md", "skills/hinshitsu/example/run/*.md")
                for p in sorted(root.glob(pat))]
    for p in governed:
        rel = str(p.relative_to(root))
        text = p.read_text(encoding="utf-8")
        body = strip_quotes(text)
        for i, line in enumerate(body.splitlines(), 1):
            for m in BANNED_RE.finditer(line):
                err("%s:%d" % (rel, i), "banned word %r (C4)" % m.group(1))
        if rel.startswith(("skills/", "templates/", "adapters/")) and "example/" not in rel:
            plain = re.sub(r"^---\n.*?\n---\n", lambda m: "\n" * m.group(0).count("\n"), body, flags=re.S)
            for phrase in LITERAL_PHRASES:
                plain = plain.replace(phrase, " ")
            for i, line in enumerate(plain.splitlines(), 1):
                if line.startswith("#"):
                    continue
                for m in CAP_RE.finditer(line):
                    words = m.group(1)
                    if singulars(words) & known or all(
                            singulars(w) & known or all(singulars(x) & known for x in w.split("-"))
                            for w in words.split(" ")):
                        continue
                    err("%s:%d" % (rel, i), "capitalized term %r is not in the glossary (C3)" % words)

    for p in sorted(root.glob("adapters/*.md")):
        rel = str(p.relative_to(root))
        text = p.read_text(encoding="utf-8")
        if "skills/hinshitsu/SKILL.md" not in text:
            err(rel, "does not reference skills/hinshitsu/SKILL.md (C6)")
        if not re.search(r"https://\S+", text) or not re.search(r"20\d\d-\d\d-\d\d", text):
            err(rel, "no dated source link (C6)")
        if not (text.startswith("UNVERIFIED — never run on this surface") or "Smoke run:" in text):
            err(rel, "no smoke run cited and no UNVERIFIED first line (C6)")
        if re.search(r"^\d+\. .*\bmust\b", text, re.M):
            err(rel, "holds a numbered rule; adapters map tools and copy no rule (C6)")

    for rel in ("plugin.json", ".claude-plugin/plugin.json"):
        p = root / rel
        if p.is_file():
            try:
                data = json.loads(p.read_text(encoding="utf-8"))
                if not isinstance(data, dict):
                    err(rel, "the manifest is not a JSON object (C15)")
                    continue
                if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", str(data.get("name", ""))):
                    err(rel, "name is missing or not kebab-case (C15)")
                allowed = {"$schema", "name", "version", "description", "author", "homepage",
                           "repository", "license", "keywords", "extensions"}
                for key in sorted(set(data) - allowed):
                    err(rel, "key %r is not in the Agent Plugins 1.0.0 schema (C15)" % key)
                if rel == "plugin.json" and "$schema" not in data:
                    err(rel, "no $schema, which the Agent Plugins 1.0.0 schema requires (C15)")
            except ValueError as e:
                err(rel, "not valid JSON: %s (C15)" % e)
    return errors


def main(argv):
    root = Path(argv[1]) if len(argv) > 1 else Path(__file__).resolve().parent.parent
    if not root.is_dir():
        print(__doc__.strip(), file=sys.stderr)
        return 2
    try:
        errors = lint(root)
    except (ValueError, UnicodeDecodeError, OSError) as exc:  # a verdict, not a traceback
        errors = ["the files cannot be read: %s: %s" % (type(exc).__name__, exc)]
    for e in errors:
        print("FAIL " + e)
    print("lint: %d failure(s). This script tests form; it does not prove that any rule is sound." % len(errors))
    if errors:
        print("C<n> names a CRITERION and E-<n> an entry of build-record/AUDIT-LOG.md.")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
