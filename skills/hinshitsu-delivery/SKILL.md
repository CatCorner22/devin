---
name: hinshitsu-delivery
description: The delivery skill of hinshitsu - nothing is reported as finished on the agent's say-so. Every claim in the delivery report cites an existing artifact (a file path, a command output, a screenshot, a log entry) or is marked ASSERTED, which fails the gate. An independent final auditor opens every cited file and re-runs every cited command. The report opens with 3 checks the user can perform in 5 minutes, then a plain-language summary of what the user got, what was proven and what was not, then the Voice of the Customer, gaps filled, lens reconciliation, red-cell and swarm verdicts, coverage ledger, maps and audit log, and it closes with lessons that propose amendments to the skills for the user's approval. Use it before telling anyone that work is finished; when writing a completion message, status report, handoff note, pull-request description or release note; and when the user says "is this ready", "is it done", "ship it", "hand it off", "send it", "wrap it up", "prove it" or "final report".
---

# hinshitsu-delivery: evidence, the delivery report, lessons

Part of the hinshitsu contract. `../hinshitsu/GLOSSARY.md` defines every term in capitals. `../hinshitsu/SKILL.md` (the conductor) sets precedence, roles, custody of reports (rules 1.5 to 1.8) and the 12 STAGES. An imperative sentence binds the ORCHESTRATOR; `must` binds the actor named; `may` grants a discretion that nobody else has. Rules are cited by section and number. Section 17, with section 1, controls over every other section.

This skill holds sections 17, 19 and 20. It serves STAGES S10 (rule 17.4), S11 (section 19) and S12 (section 20); rules 17.1 to 17.3 and 17.6 apply to every message in every STAGE. Before acting, read sections 0 and 1 of the conductor (`hinshitsu`) and `GLOSSARY.md`; the `STAGE` start entry states the SHA-256 of each (rule 0.7). Without a conductor run this skill produces no verdict: say so to the USER and start the conductor.

## 17. Anti-pretend enforcement

1. **Cite or mark.** Every claim in the delivery report, and in any message that reports progress, must end with a citation in square brackets to EVIDENCE: a file path, a command-output file, a screenshot, or an `AUDIT-LOG.md` entry ID. A claim with no citation is ASSERTED. A statement about the BUILDER's or the ORCHESTRATOR's own work counts only with a source under rule 1.8.
2. **ASSERTED fails the gate.** 1 ASSERTED claim fails the gate: the DELIVERABLE is not DONE until the claim is cited or removed.
3. **Re-runnable checks.** Record each check as a command, or as a numbered list of steps, that another party can run again. Save the command and its complete output together in 1 file under `evidence/`. Do not trim output to its last lines. Do not retype output: the command itself writes the file under `evidence/` (a redirect, or the tool's saved output), and the entry that cites the file states the command.
4. **Audit of the audit.** After the last swarm round and the S9 attack, and before the delivery report goes out, start 1 SUB-AGENT that built nothing and audited nothing in the run: the final AUDITOR. Give it the RUN FOLDER, the DELIVERABLE and the draft report. It must:
   (a) open every path that the report and the ledger cite, and list each one that is missing;
   (b) for each cited file, state whether it shows what the citing claim says;
   (c) re-run every recorded command and compare the result with the saved output;
   (d) state whether `MINDMAP.md` and `CONNECTIONS.md` name only files and parts that exist in the DELIVERABLE, and miss none;
   (e) match every file under `audits/` and `memos/` to a `LAUNCH` entry and an identifier line, list each `LAUNCH` entry with no report, and check that no entry cites a later entry and that, where git exists, the history of `AUDIT-LOG.md` shows only added lines;
   (f) check the reason in every `N/A` cell that rule 10.4 does not cover;
   (g) record `counts` or `does not count` for each RED CELL attack on an unflagged PREMISE (rule 6.5);
   (h) run `scripts/hinshitsu_check.py --stage unit` on the RUN FOLDER where Python exists (the stage `delivery` cannot print 0 before this report and the STAGES after it exist; the ORCHESTRATOR runs it at S11);
   (i) save each command it ran, with its output, in its report or beside it;
   (j) name the commit, or the file hashes, that it examined, and state `passed` or `not passed` as the last word of its report.

   It writes `audits/final-audit-<LAUNCH ID>.md`. A mismatch in the DELIVERABLE, or in a claim of the `Summary` or the `Status` of the report, is a BLOCKER. A mismatch in any other file of the RUN FOLDER is a DEFECT under rule 14.6: the report lists it, and it does not change the verdict. The final AUDITOR states `passed` when it found no BLOCKER and each CRITERION test it ran gave the result the ledger states. The final audit runs 1 time; it runs again only after a change to the DELIVERABLE. The branch that RECIPIENTS use moves only to the commit that this report names as `passed` (rule 1.9). A change to the DELIVERABLE after this report makes the report stale; run it again.
5. **Idempotence.** A check that gives a different verdict on a second run is a FRAGILITY, and its ledger cell is UNVERIFIED until 2 runs in a row agree.
6. **No pretended action.** Do not describe an action as taken unless a log entry or a file under `evidence/` shows it. Do not report a SUB-AGENT's work unless its saved report exists.
7. **What the checker proves.** `scripts/hinshitsu_check.py` tests the form of the record: that entries, citations, cells and files exist and agree with each other. It does not prove that any check ran or that any report is true. Never cite its exit code as proof that the DELIVERABLE works.

## 19. Delivery report

1. **File.** Write `DELIVERY-REPORT.md` in the RUN FOLDER and send it to the USER with the DELIVERABLE. It has the headings of rules 19.2 to 19.13, in that order. `templates/DELIVERY-REPORT.md` holds the form.
2. **`## Check it yourself in 5 minutes`** — exactly 3 checks that the USER performs with no terminal. Each names 1 thing to open and 1 thing to see. Choose them by this rule, not by preference: (1) the DELIVERABLE itself, opened as a RECIPIENT opens it, and the first task of the `VOC` entry performed; (2) the SUB-AGENT run, by its identifier, that raised the highest-class FINDING of the run, compared with its saved report; (3) the final AUDITOR's run, by its identifier, compared with `audits/final-audit-<LAUNCH ID>.md`. Where the runtime gives no identifier that the USER can open, say so and name the file to read. End the section with this sentence: "The checker script tests the shape of the record; it does not prove that any check ran."
3. **`## Summary`** — at most 200 words, for a reader with no technical background, with 4 sub-headings: **What you got**; **What was proven** (and how, 1 sentence each); **What was not proven** (every UNVERIFIED and VOC-ASSUMED item, or `Nothing`); **What you need to decide next** (rule 23.9). No term in capitals from the glossary appears here without its meaning in the same sentence. End it with the line "You may stop reading here."
4. **`## Status`** — 1 line: `DONE` with the count of KNOWN LIMITS (each is listed under `Swarm verdict` with its `OVERRULE` entry), or `DELIVERED — NOT DONE` followed by each of the 8 parts of DONE that is not met. Then the TIER, and the mode: `SWARM`, or `DEGRADED — single-agent audit` with the roles that ran DEGRADED. Then the count of SUB-AGENT runs, from the `LAUNCH` entries.
5. **`## Voice of the Customer`** — the `VOC` entry, with each need marked met, not met or UNVERIFIED, each with a citation.
6. **`## Gaps filled`** — the gap list of rule 23.1 with what was done about each and who decided.
7. **`## Lens reconciliation`** — the `RECONCILIATION` table, and 1 line per later LENS memo with its path.
8. **`## Red-cell verdict`** — the verdict of each full attack, quoted word for word; the premortem's causes with the FINDING of each; each probe with its trigger and result.
9. **`## Swarm verdict`** — per WORK UNIT and role: the `LAUNCH` entry, the count of FINDINGS by class, how each ended, and the result of the planted defect (rule 16.7).
10. **`## Coverage ledger`** — the counts of `PASS`, `FAIL`, `N/A` and `UNVERIFIED`; every `UNVERIFIED` row; the path of the ledger. Do not paste the ledger into the report.
11. **`## Maps`** — the paths of `MINDMAP.md`, `CONNECTIONS.md` and `GAUGE.svg`.
12. **`## Audit log`** — the path of `AUDIT-LOG.md` and the count of entries.
13. **`## LESSONS`** — section 20.
14. **Before sending.** The language auditor audits the report (rule 13.3) and the final AUDITOR covers it (rule 17.4). Log a `DELIVERY` entry when the report is sent, with the status line and the channel.

## 20. Kaizen and hansei (improvement and honest self-review)

1. **Form.** Under `LESSONS`, state for each lesson: what happened in this run, with the entry ID; what it cost; and a proposed amendment to a skill, written as the rule number, the present text and the new text.
2. **The AGENT's own errors.** Include at least 1 lesson about something the AGENT did wrong in the run, with its entry ID. Every `CORRECTION` entry and every BLOCKER of class (d) is such a lesson. If the log shows none, write the range of entry IDs reviewed and the words `no agent error found in the log`.
3. **Approval.** Do not apply an amendment. The USER approves or rejects each one on a DECISION CARD. An approved amendment changes the skill's `SKILL.md`, raises its version and adds a line to `CHANGELOG.md`.
4. **Log.** Log each lesson as a `LESSON` entry.
