#!/usr/bin/env python3
"""Check the form of a hinshitsu single-assistant report. Usage: report_check.py <report file>

Exit 0 when the form holds, 1 when it does not, 2 on a usage error. Standard library only.
This script tests form. It does not prove that the work is right or that any check ran.
"""
import re
import sys

HEADINGS = ["Status", "Requirements", "Known limits and open faults", "What you did not ask for and got anyway",
            "Check it yourself", "What you need to decide next"]
STATUSES = ("DELIVERED — SELF-CHECKED", "DELIVERED — NOT FINISHED")
SOLO_LINE = "One assistant built and checked this work; no independent checker reviewed it."
OVERCLAIM = re.compile(r"\b(independently (?:checked|verified|reviewed|audited)|DONE)\b")


def sections(text):
    """Map each `## ` heading to the text under it, in order."""
    found, name = {}, None
    for line in text.splitlines():
        if line.startswith("## "):
            name = line[3:].strip()
            found[name] = []
        elif name is not None:
            found[name].append(line)
    return {k: "\n".join(v).strip() for k, v in found.items()}


def check(text):
    """Return the list of failures of form, 1 line each."""
    failures = []
    parts = sections(text)
    names = [n for n in parts if n in HEADINGS]
    for heading in HEADINGS:
        if heading not in parts:
            failures.append("the heading `## %s` is missing" % heading)
    if names != [h for h in HEADINGS if h in parts]:
        failures.append("the headings are out of order; the order is: %s" % ", ".join(HEADINGS))
    status = parts.get("Status", "")
    first = status.splitlines()[0].strip() if status else ""
    state = next((s for s in STATUSES if first.startswith(s)), None)
    if "Status" in parts and state is None:
        failures.append("the first line under `## Status` starts with neither of: %s" % " | ".join(STATUSES))
    if "Status" in parts and SOLO_LINE not in status:
        failures.append("`## Status` lacks the sentence: %s" % SOLO_LINE)
    rows = [l.strip() for l in parts.get("Requirements", "").splitlines() if l.strip()]
    if "Requirements" in parts and not rows:
        failures.append("`## Requirements` has no line")
    unchecked = 0
    for row in rows:
        if "NOT CHECKED" in row:
            unchecked += 1
        elif "CHECKED" not in row:
            failures.append("requirement line states neither CHECKED nor NOT CHECKED: %s" % row[:80])
        if len(re.sub(r"NOT CHECKED|CHECKED", "", row).strip(" -*|.:0123456789RC")) < 8:
            failures.append("requirement line gives no evidence and no reason: %s" % row[:80])
    if state == STATUSES[0] and unchecked:
        failures.append("the status is SELF-CHECKED, and %d requirement line(s) read NOT CHECKED" % unchecked)
    checks = [l for l in parts.get("Check it yourself", "").splitlines() if re.match(r"\s*(?:[-*]|\d+[.)])\s+\S", l)]
    if "Check it yourself" in parts and len(checks) != 3:
        failures.append("`## Check it yourself` holds %d checks; it must hold 3" % len(checks))
    for heading in HEADINGS:
        if heading in parts and not parts[heading]:
            failures.append("`## %s` is empty; write `Nothing` where nothing applies" % heading)
    for m in OVERCLAIM.finditer(text.replace(SOLO_LINE, "")):
        failures.append("the report says `%s`; 1 assistant working alone cannot claim it" % m.group(0))
    return failures


def main(argv):
    if len(argv) != 2:
        print(__doc__.strip(), file=sys.stderr)
        return 2
    try:
        with open(argv[1], encoding="utf-8") as handle:
            text = handle.read().replace("\r\n", "\n")
    except (OSError, UnicodeDecodeError) as exc:
        print("report_check: cannot read %s: %s" % (argv[1], exc), file=sys.stderr)
        return 2
    failures = check(text)
    for failure in failures:
        print("FAIL " + failure)
    print("report_check: %d failure(s). This script tests form; it does not prove that the work is right." % len(failures))
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
