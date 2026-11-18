#!/usr/bin/env python3
"""hinshitsu gauge: draw a speedometer of run progress from AUDIT-LOG.md.

Usage: gauge.py <run-folder> [--no-svg]
Reads <run-folder>/AUDIT-LOG.md, writes <run-folder>/GAUGE.svg, prints a text gauge.
Standard library only. Same log in, same bytes out.
"""
import math
import re
import sys
from pathlib import Path

STAGES = [
    ("S1", "Capability and tier", "hinshitsu"),
    ("S2", "Record set up", "hinshitsu-record"),
    ("S3", "Customer voice and gap list", "hinshitsu-baby-bird-plan"),
    ("S4", "Assumptions and criteria", "hinshitsu-baby-bird-plan"),
    ("S5", "Lenses and red cell", "hinshitsu-challenge"),
    ("S6", "Reconcile and freeze", "hinshitsu-baby-bird-plan"),
    ("S7", "Build and audit", "hinshitsu-audit"),
    ("S8", "Recipient and stability checks", "hinshitsu-audit"),
    ("S9", "Pre-delivery red cell", "hinshitsu-challenge"),
    ("S10", "Audit of the audit", "hinshitsu-delivery"),
    ("S11", "Delivery report", "hinshitsu-delivery"),
    ("S12", "Lessons", "hinshitsu-delivery"),
]
EVENTS = ("start", "end", "skipped", "progress")
STOP = "STOPPED — blocker open"
NOT_PROOF = "the log's state, not proof of DONE"
HEADING = re.compile(r"^### E-(\d+) · ([^·]*) · ([A-Z-]+) · (.*)$")
FINDING_ID = re.compile(r"F-\d+")  # the same form as in scripts/hinshitsu_check.py (rule 9.5)


def entries(text):
    """Yield (number, type, body) for each log entry. A heading that does not have the form of
    rule 9.4 yields (None, None, heading), so that the caller can count it."""
    current = None
    for line in text.splitlines():
        m = HEADING.match(line)
        if m or line.startswith("### E-"):
            if current:
                yield current[0], current[1], "\n".join(current[2])
            current = (int(m.group(1)), m.group(3), []) if m else (None, None, [line])
        elif current:
            current[2].append(line)
    if current:
        yield current[0], current[1], "\n".join(current[2])


def field(body, name):
    # [ \t]* and not \s*: an empty field must not take the next line as its value.
    m = re.search(r"^- %s:[ \t]*(.*)$" % re.escape(name), body, re.M)
    return (m.group(1).strip() or None) if m else None


def read_state(text):
    """Return the run state the log records."""
    state = {s[0]: "pending" for s in STAGES}
    units = None
    blockers, closed = [], set()
    unread = 0
    for number, kind, body in entries(text):
        if number is None:
            unread += 1
        elif kind == "STAGE":
            m = re.match(r"(S\d+)\b", field(body, "Stage") or "")
            event = (field(body, "Event") or "").split()[0:1]
            if not m or m.group(1) not in state or not event or event[0] not in EVENTS:
                unread += 1
                continue
            sid, event = m.group(1), event[0]
            if event == "start":  # a later start re-opens a stage (rules 0.5 and 5.7)
                state[sid] = "running"
            elif event == "end":
                state[sid] = "done"
            elif event == "skipped":
                state[sid] = "skipped"
            elif event == "progress" and state[sid] == "pending":
                state[sid] = "running"
            u = re.match(r"(\d+) of (\d+)", field(body, "Work units") or "")
            if sid == "S7" and u and int(u.group(2)) > 0:
                units = (min(int(u.group(1)), int(u.group(2))), int(u.group(2)))
        elif kind == "FINDING":
            fid = field(body, "ID")
            if not fid or not FINDING_ID.fullmatch(fid.split()[0]):  # the checker refuses it too
                unread += 1
                continue
            if (field(body, "Class") or "").startswith("BLOCKER") and fid not in blockers:
                blockers.append(fid)
        elif kind == "RESOLUTION":
            fid = field(body, "Finding")
            if fid:
                closed.add(fid.split()[0])
    open_blockers = [b for b in blockers if b.split()[0] not in closed]
    complete = sum(1 for v in state.values() if v in ("done", "skipped"))
    share = float(complete)
    if state["S7"] == "running" and units:
        share += units[0] / units[1]
    running = [s for s in STAGES if state[s[0]] == "running"]
    current = running[-1] if running else None
    if current is None and complete < len(STAGES):
        current = next(s for s in STAGES if state[s[0]] == "pending")
    return {
        "state": state,
        "units": units,
        "blockers": open_blockers,
        "complete": complete,
        "percent": int(round(100 * share / len(STAGES))),
        "current": current,
        "unread": unread,
    }


def blocker_list(blockers, shown=4):
    """The count, then the first IDs: the whole list does not fit the picture."""
    return "%d: %s%s" % (len(blockers), ", ".join(blockers[:shown]), " ..." if len(blockers) > shown else "")


def text_gauge(st):
    width = 24
    filled = int(round(width * st["percent"] / 100))
    marks = {"done": "x", "skipped": "-", "running": ">", "pending": " "}
    lines = ["hinshitsu gauge  [%s%s] %d%%  %d of %d stages complete (%s)" % (
        "#" * filled, "." * (width - filled), st["percent"], st["complete"], len(STAGES), NOT_PROOF)]
    cur = st["current"]
    if cur is None:
        lines.append("All 12 stages have an end or skipped entry.")
    else:
        verb = "Now" if st["state"][cur[0]] == "running" else "Next"
        extra = ""
        if cur[0] == "S7" and st["units"]:
            extra = "  (work units: %d of %d)" % st["units"]
        lines.append("%s: %s %s  -> skill: %s%s" % (verb, cur[0], cur[1], cur[2], extra))
    if st["blockers"]:
        lines.append("%s: %s" % (STOP, blocker_list(st["blockers"])))
    if st["unread"]:
        lines.append("%d entries could not be read (rule 9.4, rule 0.7); the gauge leaves them out." % st["unread"])
    for sid, name, skill in STAGES:
        lines.append("  [%s] %-3s %-30s %s" % (marks[st["state"][sid]], sid, name, skill))
    lines.append("  x done   - skipped   > running   (blank) pending")
    return "\n".join(lines)


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def polar(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.cos(a), cy - r * math.sin(a)


def svg_gauge(st):
    cx, cy, r = 260.0, 250.0, 180.0
    n = len(STAGES)
    colors = {"done": "#2e7d32", "skipped": "#9e9e9e", "running": "#f9a825", "pending": "#e0e0e0"}
    out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 420" width="860" height="420" '
           'role="img" aria-label="hinshitsu gauge: %d percent, %d of %d stages complete">' % (
               st["percent"], st["complete"], n),
           '<rect width="860" height="420" fill="#ffffff"/>',
           '<text x="20" y="30" font-family="sans-serif" font-size="18" font-weight="bold" '
           'fill="#212121">hinshitsu gauge</text>']
    for i, (sid, _, _) in enumerate(STAGES):
        a0 = 180.0 - 180.0 * i / n - 1.0
        a1 = 180.0 - 180.0 * (i + 1) / n + 1.0
        x0, y0 = polar(cx, cy, r, a0)
        x1, y1 = polar(cx, cy, r, a1)
        out.append('<path d="M %.1f %.1f A %.0f %.0f 0 0 1 %.1f %.1f" fill="none" stroke="%s" '
                   'stroke-width="30"/>' % (x0, y0, r, r, x1, y1, colors[st["state"][sid]]))
        lx, ly = polar(cx, cy, r + 32, (a0 + a1) / 2)
        out.append('<text x="%.1f" y="%.1f" font-family="sans-serif" font-size="12" '
                   'text-anchor="middle" fill="#424242">%s</text>' % (lx, ly + 4, sid))
    needle = "#c62828" if st["blockers"] else "#212121"
    nx, ny = polar(cx, cy, r - 30, 180.0 - 180.0 * st["percent"] / 100)
    out.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="6" '
               'stroke-linecap="round"/>' % (cx, cy, nx, ny, needle))
    out.append('<circle cx="%.1f" cy="%.1f" r="12" fill="%s"/>' % (cx, cy, needle))
    out.append('<text x="%.1f" y="%.1f" font-family="sans-serif" font-size="40" font-weight="bold" '
               'text-anchor="middle" fill="#212121">%d%%</text>' % (cx, cy + 60, st["percent"]))
    out.append('<text x="%.1f" y="%.1f" font-family="sans-serif" font-size="14" text-anchor="middle" '
               'fill="#424242">%d of %d stages complete</text>' % (cx, cy + 84, st["complete"], n))
    cur = st["current"]
    if cur is None:
        line = "All 12 stages have an end or skipped entry"
    else:
        verb = "Now" if st["state"][cur[0]] == "running" else "Next"
        line = "%s: %s %s (%s)" % (verb, cur[0], cur[1], cur[2])
        if cur[0] == "S7" and st["units"]:
            line += " - work units %d of %d" % st["units"]
    out.append('<text x="%.1f" y="%.1f" font-family="sans-serif" font-size="14" font-weight="bold" '
               'text-anchor="middle" fill="#212121">%s</text>' % (cx, cy + 110, esc(line)))
    if st["blockers"]:
        out.append('<rect x="60" y="%.1f" width="400" height="30" rx="4" fill="#c62828"/>' % (cy + 118))
        out.append('<text x="%.1f" y="%.1f" font-family="sans-serif" font-size="14" font-weight="bold" '
                   'text-anchor="middle" fill="#ffffff">%s: %s</text>' % (
                       cx, cy + 138, esc(STOP), esc(blocker_list(st["blockers"]))))
    y = 60
    for sid, name, skill in STAGES:
        s = st["state"][sid]
        out.append('<rect x="520" y="%d" width="14" height="14" fill="%s" stroke="#757575"/>' % (y - 12, colors[s]))
        weight = "bold" if s == "running" else "normal"
        out.append('<text x="542" y="%d" font-family="sans-serif" font-size="13" font-weight="%s" '
                   'fill="#212121">%s %s</text>' % (y, weight, sid, esc(name)))
        out.append('<text x="542" y="%d" font-family="sans-serif" font-size="10" fill="#616161">%s - %s</text>' % (
            y + 12, esc(skill), s))
        y += 28
    out.append('<text x="20" y="408" font-family="sans-serif" font-size="11" fill="#616161">'
               'Drawn from the STAGE entries in AUDIT-LOG.md. It shows the log, not proof that the work is sound.</text>')
    out.append("</svg>")
    return "\n".join(out) + "\n"


def main(argv):
    args = [a for a in argv[1:] if not a.startswith("--")]
    options = [a for a in argv[1:] if a.startswith("--")]
    if len(args) != 1 or any(o != "--no-svg" for o in options):
        print(__doc__.strip(), file=sys.stderr)
        return 2
    folder = Path(args[0])
    log = folder / "AUDIT-LOG.md"
    if not log.is_file():
        print("gauge: no AUDIT-LOG.md in %s" % folder, file=sys.stderr)
        return 2
    st = read_state(log.read_text(encoding="utf-8"))
    if not options:
        (folder / "GAUGE.svg").write_text(svg_gauge(st), encoding="utf-8")
    print(text_gauge(st))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main(sys.argv))
    except (ValueError, UnicodeDecodeError, OSError) as exc:  # a message, not a traceback
        print("hinshitsu gauge: cannot read the log or write the picture: %s: %s" % (type(exc).__name__, exc),
              file=sys.stderr)
        sys.exit(2)
