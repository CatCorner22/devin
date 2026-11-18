---
name: hinshitsu-gauge
description: The progress gauge of hinshitsu - a speedometer picture that shows where a run stands among its 12 stages, drawn from the audit log and not from the agent's opinion. A small script reads the STAGE entries, counts the stages that are complete, finds the stage now running and the skill it uses, and writes GAUGE.svg plus a text version for chat; the needle sits in a red stop zone while a blocker has stopped the line. Use it after every stage starts or ends in a hinshitsu run, in every progress message to the user, and when the user says "where are we", "how far along", "progress", "status", "show the gauge", "speedometer", "what stage is this" or "what is left".
---

# hinshitsu-gauge: where the run stands

Part of the hinshitsu contract. `../hinshitsu/GLOSSARY.md` defines every term in capitals. `../hinshitsu/SKILL.md` (the conductor) sets the 12 STAGES and requires the `STAGE` entries (rule 0.7). An imperative sentence binds the ORCHESTRATOR; `must` binds the actor named; `may` grants a discretion that nobody else has.

This skill holds section 24. It serves every STAGE. Before acting, read sections 0 and 1 of the conductor (`hinshitsu`) and `GLOSSARY.md`; the `STAGE` start entry states the SHA-256 of each (rule 0.7). Without a conductor run this skill produces no verdict: say so to the USER and start the conductor.

## 24. Gauge

1. **When.** After each `STAGE` entry, run `python3 skills/hinshitsu-gauge/scripts/gauge.py <RUN FOLDER>`. It writes `GAUGE.svg` in the RUN FOLDER and prints a text gauge. Include the text gauge, or the picture, in the next message the USER receives, and at the top of the delivery report's `Maps` section by path.
2. **What it reads.** The script reads only `AUDIT-LOG.md`: each `STAGE` entry's lines `- Stage: S<n>`, `- Event: start`, `end`, `progress` or `skipped`, and `- Work units: <complete> of <declared>`; and each `FINDING` entry whose ID has the form `F-<n>`, of which it lists those with `- Class: BLOCKER` that no `RESOLUTION` entry names, and it counts every other `FINDING` entry as an entry it could not read. Do not pass the script a number. Do not edit `GAUGE.svg` by hand.
3. **What it shows.** The needle shows the share of the 12 STAGES that have an `end` or `skipped` entry; within S7 it adds the share of WORK UNITS complete. The picture names the STAGE now running and the skill that serves it, lists the 12 STAGES with a mark for each state, and shows `STOPPED — blocker open` with the count of open BLOCKERS and the first 4 FINDING IDs while any BLOCKER with an ID of the form `F-<n>` is open; a BLOCKER with any other ID is not shown as STOPPED and is counted among the entries that the script could not read. The text gauge also states the number of entries that the script could not read.
4. **What it does not prove.** The gauge shows what the log says. It is not EVIDENCE that any STAGE's work is sound, and 100 percent does not mean DONE. Never cite the gauge as proof of anything but the log's state.
5. **Same log, same picture.** The script takes no time from a clock and no input but the log; 2 runs on the same log write the same file, byte for byte. A difference is a FINDING against the script.
6. **No Python.** Where the runtime cannot run Python, write the text gauge by hand from the same entries, in the form the script prints, and mark it `hand-drawn`.
