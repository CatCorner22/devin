# Changelog

Rule 20.3 requires 1 entry for each amendment of a skill. Newest first.

## 3.1.0 — 2026-11-18

Answer to the proof run under 3.0.0 (`build-record/audits/round4-proof-run.md`): 5 SUB-AGENT runs and 4 cards for a change of 102 lines, no failed CRITERION in 3 audits, and the run still ended `DELIVERED — NOT DONE`, because each re-audit raised new faults and 2 AUDITORS classed as BLOCKER a fault the USER had set aside. The USER chose this version, with no further paid run. No independent session has reviewed it, and no run has been made under it.

- Glossary, BLOCKER (d): only a false statement in the `Summary` or the `Status` of the delivery report. A false statement elsewhere, or in a part of the DELIVERABLE that no CRITERION covers, is a DEFECT.
- Glossary, BLOCKER (f) (new, in the USER's words "unstable or improperly formatted code that is risky for the future"): 2 different results in 2 runs of 1 check; code that does not parse or that fails the project's own formatter, linter or type checker; an error that is caught and neither handled nor reported; an added dependency with no pinned version.
- Glossary, KNOWN LIMIT (new), and DONE part 3: a DEFECT or FRAGILITY that the USER accepted counts as closed; the `Status` line states the count.
- Rule 15.7 (new): each scope lists the KNOWN LIMITS, and no AUDITOR raises one again. The role texts say so.
- Rule 15.8 (new): a FINDING other than a BLOCKER that a re-audit raises for the first time is not repaired in the run; 1 card lists every open one, and `accept all` closes them.
- Rule 0.5: the TIER counts the DELIVERABLE only; the USER may hold a run at `CORE`.
- `scripts/hinshitsu_log.py`: an entry may hold its own number, as rule 1.6 requires of a report's file name. `scripts/hinshitsu_check.py`: an `ANSWER` that states a higher number of planned runs raises the budget whenever it is written. Merged from the proof run: the gauge leaves a FINDING with a refused ID out of the `STOPPED` line and counts it as unread. 165 tests.

- App-specific files: 2 single-assistant skills for ordinary Claude chat and ordinary ChatGPT (`chat/`), with a report checker and a paste-in form; `adapters/chatgpt.md` renamed `adapters/codex.md`; `INSTALL.md`; `scripts/package.py` and `dist/` with 3 zip files. 187 tests. None was run on its surface.
- `dist/hinshitsu-codex.zip` (the USER's request): the 7 skills in the layout Codex reads (`.agents/skills`), with `install.py` for 1 project or for the user's home folder. 9 tests (195 in all). Never run on Codex.

Open: the friction items of the 2 real runs that this list does not answer (`runs/*/FRICTION.md`).

## 3.0.0 — 2026-11-18

Answer to the first run on a real task (`build-record/audits/round3-real-run.md`): independent sessions found 9 faults the builder had missed, and the run still could not reach DONE, because each slip in the hand-kept record stopped it. The USER chose this version before the app-specific files. No independent session has reviewed it, and no run has been made under it.

- `scripts/hinshitsu_log.py` (new), `add`: writes each log entry with its number and the clock's time, and refuses an unknown type, a missing field, a FINDING ID out of order, a closing entry for a FINDING that is not open, an overrule of a BLOCKER, a STAGE event out of order, and a citation of an entry that does not exist yet. `state`: rebuilds from the log the parts of `SESSION-STATE.md`, `FRAMEWORK.md` and `MINDMAP.md` that rule 14.6 tests, and keeps every other line. 22 tests (156 in all).
- Rule 9.4: entries are written with the script. Rule 14.6: a record fault is corrected by `state`.
- Rule 17.4: a mismatch in the DELIVERABLE or in the report's `Summary` or `Status` is a BLOCKER; a mismatch elsewhere in the record is a DEFECT and does not change the verdict. The final audit runs 1 time, saves its commands, and runs the checker at the stage `unit` (code review bug 23).
- Rule 0.5: a `CORE` run plans 4 SUB-AGENT runs, so that 1 re-audit after a fix does not break the budget.

Open from the real run's list of 29 places where rules conflict (`runs/2.1.0-mermaid-edges/FRICTION.md`): items 1, 2, 5, 6, 8, 9, 11, 14, 16, 17, 20, 22, 24 to 27 and 29 are not yet answered.

## 2.2.0 — 2026-11-18

Answer to the independent line-by-line review of the scripts on commit `93311ab` (`build-record/audits/round3-code-review.md`, verdict "SCRIPTS UNSOUND", 41 bugs). Each fix was written test first: the test failed, the change was made, the test passed. 124 tests (71 before). No independent session has reviewed these changes.

- Checker, the DONE gate (bugs 1 to 4): the newest final audit must end in the verdict "passed" ("0 of 12 checks passed" no longer passes); a CRITERION row that holds `FAIL` or no `PASS` blocks DONE; an earlier final audit that did not pass no longer blocks a later one that did; the budget of rule 0.9 is tested at every delivery check and is raised only by an `ANSWER` entry that states the new number after the number was reached.
- Checker (bugs 5 to 9, 11 to 22, 25 to 29): a citation for each sentence under the first 2 Summary labels; a cell in code marks needs a reason; a FINDING ID must be `F-<n>`; `--record` reads the STAGE from the Event field and a state from a status word, with "no longer open" read as closed; true line numbers after a code block; a quoted approval or overrule may stand inside a sentence; criteria in a table and in `CRITERIA-CHANGE` entries are read; a reason that holds a colon is not read as an answer; a SHA-256 in capitals passes; a FIXED finding of any class needs a report from a `LAUNCH` later than the FINDING, and a seeder's report closes only a WITHDRAWN one; a record fault closes only on an output that shows 0 failures; every file under `audits/` and `memos/` needs a `LAUNCH` entry; the identifier is matched as a whole word and the report's file name must hold the `LAUNCH` ID; an artifact path cannot leave the repository; a PASS that cites `audits/` must cite a report with a `LAUNCH` entry; a sub-heading inside an entry is allowed; the mind map's list may stand below its diagram.
- Checker, added: entry times must not run backwards (rule 0.6); a skipped STAGE needs a reason (rule 0.7).
- `scripts/hinshitsu_text.py` (new): 1 list of banned words, with their inflected forms, shared by the checker and the lint script. Code spans are not read for banned words.
- Lint (bugs 32 to 37): requires the 3 further templates, the 15 role texts and the scripts; reads a skill saved with Windows line ends; gives a verdict where it gave a traceback; a folder that does not exist is a usage error; literal phrases are matched whole.
- Gauge (bugs 38 to 41; round-2 red cell 17): counts entries it cannot read; a mistyped option is a usage error; a BLOCKER logged 2 times is listed 1 time; the bar line itself says "the log's state, not proof of DONE"; `STOPPED — blocker open` uses the dash of rule 24.3.
- Rule 0.9: the USER's reply to the budget card is logged with the new number. Rule 24.3: the count and the first 4 IDs.
- `TESTING.md`: a section in plain words on what "0 failures" does and does not mean.

- Checker (bug 10): thick and dotted Mermaid arrows are tested for a label, and a label written between dashes passes. This fix was made by the first run under 2.1.0 and merged from commit `5099f2a`; its record is `runs/2.1.0-mermaid-edges/`, and its 6 known limits are listed there (only the first arrow on a line is tested). 134 tests.

Open from the code review: bug 23 (the final auditor cannot get 0 from `--stage delivery` before its own report exists; the fix changes a rule); bug 24 (placeholder forms); bugs 30 and 31 in part (wording, 1 doubled message).

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
