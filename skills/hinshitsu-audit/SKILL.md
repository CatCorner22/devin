---
name: hinshitsu-audit
description: The audit skill of hinshitsu - after every work unit, 8 independent auditor sub-agents that did not build the work examine it (correctness, forensic 5S sloppiness hunt, best practices, adversarial testing, recipient experience, framework drift, contract-language ambiguity, red cell), with a planted defect to prove the auditors can find one. A blocker stops the line (jidoka) until it is fixed and re-audited by a different auditor. Every finding is reproducible, classed BLOCKER, DEFECT, FRAGILITY or STYLE, and ends fixed, withdrawn or overruled in writing. The skill also checks the deliverable as the recipient receives it (the built page in a real browser, the document opened) and tests stability (fresh install, production build, refresh, resize, empty data, dependency drift). Use it after any unit of code, page, script or document is built or changed; before a merge, release or handoff; and when the user says "audit this", "review this", "test this", "QA this", "find bugs", "code review" or "break it".
---

# hinshitsu-audit: find, stop, fix, re-audit

Part of the hinshitsu contract. `../hinshitsu/GLOSSARY.md` defines every term in capitals. `../hinshitsu/SKILL.md` (the conductor) sets precedence, roles, custody of reports (rules 1.5 to 1.8) and the 12 STAGES. An imperative sentence binds the ORCHESTRATOR; `must` binds the actor named; `may` grants a discretion that nobody else has. Rules are cited by section and number.

This skill holds sections 11 to 16. It serves STAGE S7 (sections 13 to 16, for each WORK UNIT) and S8 (sections 11 and 12). Before acting, read sections 0 and 1 of the conductor (`hinshitsu`) and `GLOSSARY.md`; the `STAGE` start entry states the SHA-256 of each (rule 0.7). Without a conductor run this skill produces no verdict: say so to the USER and start the conductor.

**The loop for 1 WORK UNIT.** `TIER` entry (rule 0.5) → ledger rows (rule 10.1) → planted defect (rule 16.7) → swarm (13.1) → `FINDING` entries (15.1) → stop on BLOCKER (14.1) → fix → re-audit by new SUB-AGENTS (16.5) → LENS memo (5.5) → `STAGE` progress entry (0.7). In a `CORE` run only the correctness auditor runs (rule 0.5); every other role is UNVERIFIED.

## 11. Recipient-side verification

1. **The real thing.** Verify the DELIVERABLE in the form and place the RECIPIENT receives it: the built page served and opened in a real browser; the installed package run from a clean directory; the document exported and opened in the viewer the RECIPIENT uses; the deployed URL, not the development server.
2. **Each task.** From the `VOC` entry, list each task a RECIPIENT will perform. An AUDITOR, never the BUILDER, performs each task from start to end and saves EVIDENCE for each: a screenshot or recording for anything seen, the full command and output for anything run.
3. **Self-reports do not count.** A statement by any AGENT that the DELIVERABLE works is not EVIDENCE. A passing unit test is not recipient-side verification.
4. **Cannot perform.** A task the AUDITOR cannot perform as the RECIPIENT (no device, no account, no access) is UNVERIFIED with the reason. Tell the USER, in steps a reader with no technical background can follow, what the USER can do to check it.

## 12. Stability testing

1. **4 checks.** Run each of the checks in rules 12.2 to 12.5 before delivery, each by an AUDITOR, each with EVIDENCE. Where a check cannot apply to the kind of DELIVERABLE, write `N/A` with the reason in the ledger.
2. **Fresh install.** In an empty directory or on a clean machine, obtain the DELIVERABLE and follow only the instructions the RECIPIENT receives. It must reach a working state with no step that the instructions omit.
3. **Production build.** Build and run the form that ships, not the development mode. Record the build command, its exit code and its warnings.
4. **Refresh, resize, empty data.** Reload in the middle of a task; view at widths of 360, 768 and 1280 pixels; run with no data, with 1 item, and with the largest input the CRITERIA allow; enter invalid input in every field. Record what happened in each case.
5. **Dependency drift.** List every dependency and whether its version is pinned. Install from the lock file alone. Report each unpinned dependency as a FRAGILITY. For a DELIVERABLE with no dependencies, state that, with the command that shows it.
6. **2 runs.** Run each check 2 times. 2 different results are a FRAGILITY, not a pass.

## 13. Forensic Swarm

1. **8 roles.** After each WORK UNIT, and before the next one starts, start these 8 AUDITORS as separate SUB-AGENTS, in parallel where the runtime allows. Roles 1 to 7 are the brief's; role 8 is the RED CELL.

   | # | Role | What it hunts |
   |---|---|---|
   | 1 | Correctness auditor | Each CRITERION against the DELIVERABLE: wrong results, missing behavior, every function and branch; runs every test the CRITERIA name |
   | 2 | Forensic (5S) auditor | Dead code, unused imports, TODO and FIXME notes, placeholders, sample data, copy-paste drift, hardcoded values, leftover debug output, files nobody references |
   | 3 | Best-practices auditor | The WORK UNIT against the conventions of the repository it lives in and the documented practice of its language and framework |
   | 4 | Adversarial tester | Inputs and sequences built to break it: empty, huge, malformed, hostile, repeated, out of order, concurrent |
   | 5 | Recipient-experience auditor | Section 11: performs each RECIPIENT task on the real DELIVERABLE |
   | 6 | Framework-drift auditor | The WORK UNIT against `FRAMEWORK.md` and `CONNECTIONS.md`: names, contracts, ownership, edges, duplicates |
   | 7 | Language auditor | The CRITERIA, the `VOC` entry, the words a RECIPIENT reads and the delivery report, against the categories of ambiguity in Adams, *A Manual of Style for Contract Drafting*: lexical ambiguity, syntactic ambiguity (modifiers, "and" and "or", plurals), vagueness, undue generality, inconsistency, conflict, missing actor, missing test; and every banned word |
   | 8 | RED CELL | Section 6: a probe on the WORK UNIT's PREMISES when a trigger of rule 6.3 fired; otherwise its cell is `N/A — no trigger` until S9 |

2. **Report form.** Each AUDITOR writes `audits/<WU>-<role>-<LAUNCH ID>.md` with, after the identifier line of rule 1.6: the scope it received; what it examined (files, line ranges, commands run, with output); each finding with class, place, trigger and the CRITERION or rule violated; and what it did not examine.
3. **Which roles, when.** Roles 1 to 6 audit every WORK UNIT. Role 7 audits the planning entries when the CRITERIA are `PROPOSED`, each WORK UNIT that holds words a RECIPIENT reads, and the delivery report.
4. **Real time.** A WORK UNIT's reports must exist before the next WORK UNIT starts. Do not batch the audits of several WORK UNITS into 1 round at the end, unless the USER directs 1 round over a finished set in a quoted message; in that case the set is 1 WORK UNIT for the TIER count.

## 14. Jidoka (stop the line)

1. **Stop.** When any role reports a BLOCKER, stop all forward work on the DELIVERABLE at once: start no new WORK UNIT and extend no existing one. State the stop in the `FINDING` entry.
2. **What may continue.** While a BLOCKER is open, only 3 kinds of work may continue: fixing it, re-auditing it, and keeping the record.
3. **3 exits.** A BLOCKER closes in exactly 1 of 3 ways: (a) `FIXED` — the BUILDER changed the DELIVERABLE or the artifact, and a new SUB-AGENT that did not raise the BLOCKER re-ran the trigger and reports, with EVIDENCE, that it no longer reproduces; (b) `WITHDRAWN` — a second AUDITOR, given only the written trigger and the DELIVERABLE, did not reproduce it, and its report lists the steps it ran; (c) the USER ends the run, and the delivery report lists the BLOCKER as open. A `RESOLUTION` entry cites the report for (a) or (b). A BLOCKER about an act of the run that no change can undo (an entry written late, a card not sent) closes as `FIXED` when a `CORRECTION` entry states the act and a new SUB-AGENT reports that the entry is true; the final AUDITOR then checks that the `Summary` of the delivery report states the act.
4. **Nobody overrules a BLOCKER.** The BUILDER, the ORCHESTRATOR and the USER cannot overrule a BLOCKER. The USER's ways out are exit (c) and a change to a CRITERION under rule 3.5.
5. **2-round limit.** After 2 fix-and-re-audit rounds on the same WORK UNIT, if any BLOCKER is still open, stop and send the USER a DECISION CARD with 3 choices: end the run and receive the work as `DELIVERED — NOT DONE`; change a CRITERION; or approve 1 more round, with its cost in SUB-AGENT runs. Do not start a third round without the USER's answer.
6. **Record faults.** A false or out-of-date statement in a file of the RUN FOLDER other than the delivery report is a DEFECT, not a BLOCKER, and does not stop forward work. The ORCHESTRATOR closes it in 3 steps: (a) run `python3 scripts/hinshitsu_log.py state <run folder>`, which rebuilds from the log the parts of the state files this rule tests; correct by hand a line outside those parts; log a `CORRECTION` entry when the statement is in `AUDIT-LOG.md`; (b) run `python3 scripts/hinshitsu_check.py --record <run folder>` and save the command and its output as `evidence/record-check-E-<n>.txt`; the command must exit 0; (c) log a `RESOLUTION` entry with the result `FIXED`, the line `Record fault: yes` and the path of that file. The framework-drift auditor of the next WORK UNIT reads every such `RESOLUTION` entry made since the last audit and reports each correction that is itself false; when no WORK UNIT follows, the audit of the audit (rule 17.4) does so.

## 15. Finding protocol

1. **Entry.** Every finding in a report gets a `FINDING` entry in `AUDIT-LOG.md` with these 7 fields: `ID` (`F-<n>`); `Class`; `Where` (file and line, or artifact and heading); `Trigger` (the exact steps, input or command that reproduce it, and what appears); `Violates` (the CRITERION ID or the rule number); `Raised by` (role, `LAUNCH` entry, report path and the finding's number in the report); `Lens`. Copy class, place and trigger from the report without change.
2. **Reproducible.** A finding that a third party cannot reproduce from its `Trigger` field goes back to an AUDITOR in the same role, 1 time, to restate the trigger. If the second report gives no repeatable trigger, close the FINDING `WITHDRAWN` and cite both reports. It is never dropped without an entry.
3. **Who owns the class.** The AUDITOR sets the class. The BUILDER and the ORCHESTRATOR must not lower it. Where the ORCHESTRATOR disputes a class or a FINDING, start a new SUB-AGENT as referee with the FINDING, the EVIDENCE and the glossary; its written ruling controls, may raise or lower the class, and is saved under `audits/`.
4. **3 results.** Every FINDING ends in exactly 1 `RESOLUTION` or `OVERRULE` entry: `FIXED` (the change, and the re-audit report that confirms it); `WITHDRAWN` (the report showing that the trigger does not produce the result); or `OVERRULED` (the written reason, and who overruled).
5. **Who may overrule.** Only the USER may overrule a DEFECT or a FRAGILITY, in a message that the entry quotes. The ORCHESTRATOR may overrule a STYLE FINDING with a written reason. Nobody overrules a BLOCKER (rule 14.4).
6. **No silent dismissals.** At delivery, the count of `FINDING` entries equals the count of FINDINGS with a `RESOLUTION` or `OVERRULE` entry plus the count of open FINDINGS listed in the delivery report.
7. **A KNOWN LIMIT is not raised again.** Every scope written after an `OVERRULE` entry lists each KNOWN LIMIT: its place and its trigger, word for word from its `FINDING` entry, under the heading `Accepted by the USER — do not report`. Where a report repeats a KNOWN LIMIT, log 1 `CHECK` entry that cites the `OVERRULE` entry, and log no `FINDING` entry. Rule 16.2 does not forbid this list.
8. **1 card ends the repairs.** A FINDING other than a BLOCKER that a re-audit raises for the first time is not repaired in this run. After the re-audit of a WORK UNIT, send the USER 1 DECISION CARD that lists every open DEFECT, FRAGILITY and STYLE FINDING in 1 line each, with the reply `accept all` and the reply `fix <IDs>`. Log `accept all` as 1 `OVERRULE` entry for each FINDING, each quoting the USER. A `fix` reply costs 1 more re-audit, and the card states that cost in SUB-AGENT runs.

## 16. Swarm management

1. **Narrow scopes.** Give each AUDITOR a written scope that holds: its 1 role, as written in `templates/roles/`; the exact files, lines or URL to examine; the CRITERIA that apply, word for word from the controlling `CRITERIA` entry; the report form of rule 13.2; and the path of the glossary. Save each scope under `prompts/` (rule 1.5).
2. **No steering.** Do not tell an AUDITOR what the BUILDER believes about the work, that earlier rounds passed, or what result is hoped for.
3. **No self-auditing.** A SUB-AGENT that built or fixed any part of a WORK UNIT must not audit that WORK UNIT. An AUDITOR must not review its own earlier report.
4. **Limits.** State the runtime's limit on SUB-AGENTS at 1 time, with its source, in the `CAPABILITY` entry (`no stated limit` where the runtime states none). Do not start more at 1 time: the times of the `LAUNCH` entries show each batch. Roles that do not fit run in a second batch within the same WORK UNIT.
5. **Re-run after a fix.** After every fix, re-run each AUDITOR role whose scope covers a file the fix touched, with new SUB-AGENTS, and update the ledger cells from the new reports (rule 10.5).
6. **A finding-free report is a red flag, not a success.** On each report with 0 findings: confirm that it lists what it examined under rule 13.2; if it does not, the report fills no ledger cell and the role runs again 1 time. When every report in a round has 0 findings, or every finding in the round is STYLE, start the probe of rule 6.3(d).
7. **Planted defect.** Before each audit round in a `FULL` run, start 1 SUB-AGENT that is not the BUILDER, the "seeder". It makes a copy of the WORK UNIT, plants exactly 1 defect that breaks a CRITERION, and writes `audits/<WU>-seed-<LAUNCH ID>.md`: the file and line, the defect, and the 1 or more roles of rule 13.1 that must find it. The AUDITOR of each named role receives the WORK UNIT and the copy in 1 scope, as 2 versions with no label that tells which holds a planted defect. Its report fills the ledger for the WORK UNIT only when it found the planted defect in the copy. The ORCHESTRATOR must not choose the defect. Log a `CHECK` entry with which named AUDITORS found it. A named AUDITOR that misses it is void: its report fills no ledger cell, and the role runs again 1 time with a new SUB-AGENT and a new seed. A second miss makes that role's cells UNVERIFIED. The ORCHESTRATOR writes no `FINDING` entry for a finding that reports the planted defect; where one was written before the seeder's report was read, it closes as `WITHDRAWN` and cites that report. The ORCHESTRATOR logs a finding on the copy that also reproduces on the WORK UNIT against the WORK UNIT.
