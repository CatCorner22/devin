# Changelog

Rule 20.3 requires 1 entry for each amendment of a skill. Newest first.

## 2.1.0 — 2026-11-18

Amendments made after round 2 of the independent review, on commit `874ffb2` (`build-record/audits/round2-red-cell.md`, verdict "SKILL SET FAILS"; `build-record/audits/round2-auditor.md`). No independent session has reviewed these.


- Glossary, DONE part 7: the checker's exit code is no longer enough. DONE also needs the USER's quoted statement that the USER opened the final AUDITOR's run by its link. Where no link exists, the state is `DELIVERED — NOT DONE`.
- Glossary, SWARM-CAPABLE part 2: "starts without the BUILDER's conversation"; what else the runtime shows a SUB-AGENT is disclosed under rule 0.1(g).
- Rule 0.1: the probe's `LAUNCH` entry is E-1; the `CAPABILITY` entry is E-2 and cites it. The template follows.
- Rule 0.3: the card states that a DEGRADED run never ends DONE.
- Rule 0.5: a `CORE` run has 2 AUDITORS (correctness and final) and plans 3 SUB-AGENT runs.
- Rule 1.5: the field is named `Commit under review`, as the checker and the template name it; a SUB-AGENT run with no `LAUNCH` entry is a BLOCKER.
- Rule 14.3: the exit for a past act needs the `CORRECTION` entry and a new SUB-AGENT; the final AUDITOR checks the `Summary`.
- Rule 16.7: 1 AUDITOR receives the WORK UNIT and the copy, unlabelled; a FINDING on the planted defect closes as `WITHDRAWN` and cites the seeder's report.
- The 6 other skills: without a conductor run a skill produces no verdict.
- Adapters for Gemini CLI, Kimi Code CLI and Muse Code: the same install line as the other 4.
- Checker: with Status `DONE`, fails when the final audit's last line does not read "passed", when no `TIER` entry states the planned SUB-AGENT runs, when `LAUNCH` entries exceed that number with no `ANSWER`, and when the newest `CRITERIA` entry lists no CRITERION; fails a BLOCKER closed as a record fault or by a report older than the FINDING; reads `DEGRADED` with any separator; reads CRITERION IDs written in bold or code marks. 8 tests added (70 in all).
- `EXAMPLE.md` states that the example predates the amendments and that the amended checker prints 1 failure on it.
- Rules made testable (auditor finding 1): 0.4 (a `yes` cites EVIDENCE), 0.6 (the clock command is named; times do not decrease), 0.7 (the start entry states the hash of the conductor and the glossary), 1.7 (a second run in a role needs a prior entry with the reason), 6.1, 7.3 (a `CHECK` entry before each WORK UNIT), 8.1 (`git cat-file -e`), 8.2 (25 log entries, not 25 tool calls), 16.4 (the limit is stated in the `CAPABILITY` entry), 16.7 (actor named), 17.3, 17.6, 21.2 (each DEGRADED pass has a scope and a `LAUNCH` entry).
- Rule 0.2: the identifier is on the first line of the probe file. Rule 0.3: a second `CAPABILITY` entry records a DEGRADED mode. Rule 21.1: a USER's refusal of SUB-AGENT runs starts a DEGRADED run (added in 2.0.0, not listed there).
- Rule 23.10: the budget card of rule 0.9 is among the cards allowed after S6.
- Rule 5 preamble (`hinshitsu-challenge`): the order of rule 1.5.
- Checker: reads a log that opens with the probe's `LAUNCH` entry; tests paths no higher than the root of the repository; prints 1 `FAIL` line where it printed a traceback. Gauge: prints 1 message where it printed a traceback. 71 tests.
- `adapters/cursor.md` and `README.md`: 1 install statement in all places. `adapters/devin.md`: the count of runs is the log's (33) and cites the log.
- `EXAMPLE.md`: 2 citations corrected; the cold-start transcript is copied to `example/cold-start-transcript.md`.
- `build-record/DELIVERY-REPORT.md`: rewritten; 3 statements in it were false after the USER's answer (auditor finding 17).

Not changed, still open from round 2: a record typed by hand with made-up identifiers still passes the script (finding 1; the amended DONE part 7 is the answer, and it depends on the USER); the gauge's text line does not say "not proof of DONE" (finding 17); the terms seeder, referee and round are not in the glossary. Auditor findings 2 (the build record itself, C8), 14 in part, 18 and 20 are open.

## 2.0.0 — 2026-11-18

First published version: 7 skills, 2 plugin manifests, 7 adapters, 2 scripts, templates, 1 worked example.

Amendments made after the independent review of the finished set (`build-record/audits/post-build-red-cell.md`, `post-build-auditor.md`, `cold-start.md`). No independent session has reviewed these amendments.

- Rule 0.1: the probe runs first; the `CAPABILITY` entry is the first log entry and the probe's `LAUNCH` entry the second. Part (g) now records what else the runtime showed the probe.
- Rule 0.2: the probe's scope also asks what else the runtime showed it; rule 1.6 does not apply to the probe file.
- Rule 0.3: a USER who refuses SUB-AGENT runs on a capable runtime gets a DEGRADED run.
- Rule 0.5: a change that cannot be counted is `FULL`; a `CORE` run has a path to DONE.
- Rule 0.9 (new): a budget of SUB-AGENT runs, stated on the S6 card; no run past it without the USER. The former rule 0.9 is rule 0.10.
- Rule 1.5: the scope is saved before the start; the `LAUNCH` entry is written 1 time, when the identifier returns; its 5 fields are named.
- Rule 14.3: an exit for a BLOCKER about an act of the run that no change can undo.
- Rule 14.6 (amended during the example run, on the USER's answer "A"): a wrong line in a record file is a DEFECT closed by a script check.
- Rule 16.7: the AUDITORS of the real WORK UNIT fill the ledger; extra AUDITORS inspect the copy with the planted defect.
- Each of the 6 other skills tells the reader to read sections 0 and 1 of the conductor and the glossary first.
- Glossary: AUDITOR includes the re-auditor and the final AUDITOR; STAGE points at the Run sequence table.
- Adapters: a copy of the skill folders alone is no longer described as an install; 3 claims that the cited pages do not state are marked UNVERIFIED.
- Checker: rejects the identifier `none`, a `DEGRADED` first line without a DEGRADED mode, a ledger with no row, and CRITERION rows written in code marks; the delivery stage runs the record check; paths no longer depend on the working directory; the `Totals` table is not read as ledger rows; an empty field counts as missing.
- Gauge: a later `start` re-opens a STAGE; the stop bar shows a count and the first 4 IDs.
- Manifests: version 2.0.0, the same as the conductor.
