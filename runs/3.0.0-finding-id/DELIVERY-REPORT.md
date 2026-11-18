# DELIVERY REPORT — gauge counts a FINDING whose ID is not F-<n> as unread

Run `3.0.0-finding-id`. Branch `devin/hinshitsu-run-3.0.0` of `CatCorner22/devin`. Commit of the DELIVERABLE: `1ce96d3806ca886d4749660e07e94074c4cb87c7` [`evidence/delivery-branch.txt`]. Every claim ends with a citation in square brackets; a path is relative to the RUN FOLDER unless it starts with `skills/`, `scripts/` or `tests/`.

## Check it yourself in 5 minutes

3 checks, no terminal needed.

1. Open https://github.com/CatCorner22/devin/blob/1ce96d3806ca886d4749660e07e94074c4cb87c7/skills/hinshitsu-gauge/scripts/gauge.py at lines 83 to 89, then open `evidence/delivery-gauge-demo.txt` in this folder on the same branch. You see: the test of the ID before the test of the class, and, for 1 log with the IDs `F-1.`, `blocker one` and `F-2`, the new line `STOPPED — blocker open: 1: F-2` with `2 entries could not be read`, above the old line `STOPPED — blocker open: 3: F-1., blocker one, F-2`.
2. Open https://app.devin.ai/sessions/c3ed7b8eb9e24df1a073282ebb7e2b1f (the run that raised F-9, the open BLOCKER; the run https://app.devin.ai/sessions/5c654de1b2de42d4acc3c2d029445796 raised the other BLOCKER, F-5) and compare its last message with `audits/WU-1-r3-correctness_E-55.md`. You see: the same text, with 3 findings, the first classed BLOCKER.
3. Open FINAL-AUDITOR-LINK (the final AUDITOR's run) and compare its last message with FINAL-AUDIT-FILE. You see: the same text, and the word `passed` or `not passed` at its end.

The checker script tests the shape of the record; it does not prove that any check ran.

## Summary

**What you got.** The gauge script now counts a logged fault whose ID is not `F-<number>`, or is missing, as an entry it could not read, and leaves it out of the STOPPED line and the picture [`evidence/delivery-gauge-demo.txt`]. Six new tests cover this [`evidence/delivery-tests.txt`]. Two sentences of the gauge skill's rule text and 1 helper function in the checker changed as well [`evidence/delivery-branch.txt`].

**What was proven.** Three separate sessions each ran the 6 acceptance tests, and all passed each time [`audits/WU-1-correctness_E-29.md`; `audits/WU-1-r2-correctness_E-41.md`; `audits/WU-1-r3-correctness_E-55.md`]. The new tests fail on the old script [`audits/WU-1-r3-correctness_E-55.md`]. The branch `main` did not move and no pull request exists [`evidence/delivery-branch.txt`].

**What was not proven.** The work is not finished: 1 blocker (a fault that stops the run), F-9, is open. Every check of the long form was skipped on your word. Nobody checked it as a recipient, nor its stability.

**What you need to decide next.** (1) F-9: reword 1 rule sentence, or let the gauge show only the first word of an ID; I recommend the second. If you do nothing, the sentence stays false. (2) Approve or reject the 6 proposed rule changes below; none is applied.

You may stop reading here.

## Status

DELIVERED — NOT DONE: part 2 (the BLOCKER F-9 is open; the USER ended the run [E-62]); part 6 (FINAL-AUDIT-RESULT); part 7 (no `ANSWER` entry quotes the USER's statement that the USER opened the final AUDITOR's run [`AUDIT-LOG.md`]).
TIER: CORE, kept by the USER's WAIVER where the numbers of the change give FULL (4 files, 102 changed lines) [E-50, E-54; `evidence/delivery-tests.txt`]. Mode: SWARM [E-2]. SUB-AGENT runs: 5 of 5 planned [E-1, E-29, E-41, E-55, FINAL-LAUNCH; E-49].

Parts of DONE that are met: part 1, with 1 limit: C1 to C6 each hold `PASS` in the COR column [`COVERAGE-LEDGER.md`], and the failing output that C5 asks for is inside the reports, not in a file under `evidence/` [`audits/WU-1-r3-correctness_E-55.md`; `FRICTION.md` item 13]. Part 3: each DEFECT and FRAGILITY is FIXED or carries the USER's overrule [E-36, E-37, E-42, E-51, E-52, E-63]. Part 4: no empty cell [`COVERAGE-LEDGER.md`]. Part 5 and part 8: see the `DELIVERY` entry [`AUDIT-LOG.md`].

### Open FINDINGS

| ID | Class | Entry | What |
|---|---|---|---|
| F-9 | BLOCKER | E-57 | Rule 24.3 of `skills/hinshitsu-gauge/SKILL.md` (line 16) says the gauge shows "the first 4 FINDING IDs"; for the ID fields `F-7` and `F-7 (local 2)` the gauge counts 2 BLOCKERS and prints the whole field. The behavior is that of a3717b1; the sentence is the one the fix of F-5 rewrote [`audits/WU-1-r3-correctness_E-55.md`, finding 1]. |

### Overruled by the USER (the fault remains in the DELIVERABLE)

| ID | Class | Entry | What | The USER's words |
|---|---|---|---|---|
| F-1 | DEFECT | E-30, E-36 | rules 24.2 and 24.3 false for a refused ID; `GAUGE.svg` shows no unread count. The rule text was later corrected under F-5; the picture was not. | "Decision 1: set aside." [E-35] |
| F-2 | DEFECT | E-31, E-37 | `F-7` and `F-7 (local 1)` listed as 2 BLOCKERS (`gauge.py` lines 88 to 89); the behavior under F-9 | "Decision 2: set aside." [E-35] |
| F-6 | DEFECT | E-44, E-51 | `svg_gauge` (`gauge.py` lines 153 to 210) prints no unread count | "Decision 2: set aside." [E-49] |
| F-7 | FRAGILITY | E-45, E-52 | `scripts/hinshitsu_check.py` line 310 and lines 540 to 541 can drift from `finding_id` unseen | "Decision 3: set aside." [E-49] |
| F-10 | FRAGILITY | E-58, E-63 | `tests/test_gauge.py` lines 156 to 159: the old escaping test uses the ID `F-1<&>`, now refused, so it no longer tests `esc` | "Decision 2: set aside." [E-62] |

### Overruled by the ORCHESTRATOR (STYLE)

F-4 [E-33, E-38], F-8 [E-46, E-47], F-11 [E-59, E-60]: 1 fault raised 3 times, `gauge.py` line 137 cites rule 9.4 and rule 0.7 for an entry that breaks rule 9.5 or rule 15.1, and prints "1 entries".

### UNVERIFIED (rule 0.5 and the WAIVER of E-50)

- AUDITOR roles 2 to 8 of rule 13.1 (forensic, best practices, adversarial, recipient experience, framework drift, language, RED CELL): did not run; CORE, 4 files and 102 lines against the limit of 3 files and 100 lines [E-50, E-54].
- S5 (4 LENS memos, plan-time RED CELL attack) and S9 (pre-delivery RED CELL attack, premortem): skipped [E-18, E-69].
- The planted defect of rule 16.7: not run [E-50].
- Recipient-side verification (section 11) and the 4 stability checks (section 12): no AUDITOR performed them [E-67].
- The language audit of this report by a language auditor (rule 19.14): not run; the final AUDITOR's scope covers rule 19.14 [E-50].
- VA1 and VA2 are not VOC-ASSUMED any more: the USER answered both [E-20].

## Voice of the Customer

The `VOC` entry is E-9. RECIPIENTS: R1 the owner of the repository; R2 an AGENT that runs the gauge; R3 a maintainer who runs the tests [E-9].

| Need | Mark | Citation |
|---|---|---|
| V1 "count such an entry among the entries it could not read" | met | C1 [`audits/WU-1-r3-correctness_E-55.md`] |
| V2 "leave it out of the STOPPED line" | met | C2 [`audits/WU-1-r3-correctness_E-55.md`] |
| V3 "with tests" | met | C5 [`audits/WU-1-r3-correctness_E-55.md`] |
| V4 "not of the form F-<n>, such as `F-1.` or `blocker one`" | met | C1, C2 [`evidence/delivery-gauge-demo.txt`] |
| V5 "The checker refuses such an ID." | met | C3 [`audits/WU-1-r3-correctness_E-55.md`] |
| V6 branch, no push to `main`, no pull request | met | C6 [`evidence/delivery-branch.txt`] |
| O1 tests with each gauge change | met, with the limit of F-10 | [E-58] |
| O2 gauge and checker agree | met for the ID test; F-7 names a way to drift | C3 [E-45] |
| O3 unreadable entries are counted | met in the text gauge; not shown in the picture (F-6) | C1 [E-44] |
| O4 standard library, 1 input file | met | C4 [`audits/WU-1-r3-correctness_E-55.md`] |
| Performed as a RECIPIENT by an AUDITOR (section 11) | UNVERIFIED | [E-67] |

## Gaps filled

| ID | Gap | What was done | Who decided | Citation |
|---|---|---|---|---|
| G1 | a FINDING with no ID line | counted as unread | USER, "Decision 3: yes" | [E-10, E-20] |
| G2 | a refused ID on a class other than BLOCKER | counted as unread | USER, "Decision 2: yes" | [E-10, E-20] |
| G3 | an ID field with words after the ID | accepted, as the checker accepts it; the whole field is kept (the behavior under F-2 and F-9) | AGENT — Assumed; listed on the card | [E-10, E-16] |
| G4 | the form `F-\d+` in 2 files | copy in `gauge.py` and an agreement test; after F-3 the test calls `hinshitsu_check.finding_id` | AGENT — Assumed; listed on the card | [E-10, E-39] |
| G5 | the unread line states a count only | left | AGENT — Assumed; listed on the card | [E-10] |
| G6 | a RESOLUTION that names a refused ID | left | AGENT — Assumed; listed on the card | [E-10] |

## Lens reconciliation

No `RECONCILIATION` entry and no LENS memo exist: S5 was skipped in this CORE run [E-18]. UNVERIFIED.

## Red-cell verdict

- Plan-time attack: not run; S5 skipped [E-18]. UNVERIFIED.
- Pre-delivery attack: not run; S9 skipped [E-69]. UNVERIFIED.
- Premortem: not run [E-69].
- Probes: none. The capability probe of rule 0.2 is E-1; its reply was `NO RECORD` [`evidence/capability-probe.md`].

## Swarm verdict

| WORK UNIT | Role | LAUNCH | BLOCKER | DEFECT | FRAGILITY | STYLE | How each ended | Report |
|---|---|---|---|---|---|---|---|---|
| WU-1, commit eda8e66 | correctness | E-29 | 0 | 2 | 1 | 1 | FIXED 1 (F-3), OVERRULED 3 (F-1 and F-2 by the USER, F-4 by the ORCHESTRATOR) | `audits/WU-1-correctness_E-29.md` |
| WU-1, commit 894fd4f | correctness, after the fix of F-3 | E-41 | 1 | 1 | 1 | 1 | FIXED 1 (F-5), OVERRULED 3 (F-6 and F-7 by the USER, F-8 by the ORCHESTRATOR) | `audits/WU-1-r2-correctness_E-41.md` |
| WU-1, commit 1ce96d3 | correctness, after the fix of F-5 | E-55 | 1 | 0 | 1 | 1 | open 1 (F-9), OVERRULED 2 (F-10 by the USER, F-11 by the ORCHESTRATOR) | `audits/WU-1-r3-correctness_E-55.md` |
| the record and this report | final AUDITOR | FINAL-LAUNCH | FINAL-COUNTS | | | | | FINAL-AUDIT-FILE |

11 `FINDING` entries: 2 FIXED, 8 OVERRULED, 1 open and listed above [`AUDIT-LOG.md`]. Each of the 3 correctness reports states C1 to C6 as passed [`audits/WU-1-correctness_E-29.md`; `audits/WU-1-r2-correctness_E-41.md`; `audits/WU-1-r3-correctness_E-55.md`].

Planted defect (rule 16.7): not run; it belongs to a `FULL` run [E-50]. UNVERIFIED.

## Coverage ledger

PASS 23 · FAIL 3 · N/A 234 · UNVERIFIED 0 · empty 0 [`COVERAGE-LEDGER.md`]

UNVERIFIED rows: none holds the word; the 9 columns other than COR read `N/A — CORE` or `N/A — covered at file row` in every row, and the roles behind them are UNVERIFIED as listed under `Status`. The 3 `FAIL` cells name F-9: the rows `skills/hinshitsu-gauge/scripts/gauge.py`, `skills/hinshitsu-gauge/SKILL.md` and the branch `gauge.py:88` (append) [`COVERAGE-LEDGER.md`].

## Maps

`GAUGE.svg` · `MINDMAP.md` · `CONNECTIONS.md`

Text gauge when this report was written: `hinshitsu gauge  [##################......] 75%  9 of 12 stages complete (the log's state, not proof of DONE)`, `STOPPED — blocker open: 1: F-9` [E-70].

## Audit log

`AUDIT-LOG.md` — LOG-COUNT entries

## LESSONS

Entries reviewed for the AGENT's own errors: E-1 to E-72. `CORRECTION` entries: E-15, E-71. No amendment is applied; each needs the USER's approval (rule 20.3).

| # | What happened | Entry | Cost | Proposed amendment (rule, present text, new text) |
|---|---|---|---|---|
| 1 | AGENT's error. The `FROZEN` CRITERIA entry lacked the field line `- Approval:`; the stage `unit` check was first run at S10 and failed. E-14 also named a lint script that does not exist. | E-21, E-71, E-72; E-14, E-15 | 2 `CORRECTION` entries and 1 repeated CRITERIA entry; 3 audit scopes cite the earlier entry | Rule 9.4. Present: "After each entry that changes a FINDING, a STAGE or the CRITERIA, run `python3 scripts/hinshitsu_log.py state <run folder>`." New: add "Before each `LAUNCH` entry of an AUDITOR, run `python3 scripts/hinshitsu_check.py --stage unit <run folder>`; it must print 0 failures." |
| 2 | AGENT's error. The `TRACE` of the change followed the script to its callers and tests, not to the rule text that describes the script; rules 24.2 and 24.3 became false. The fix then wrote "FINDING IDs" into rule 24.3 without testing the sentence against an ID field of 2 words. | E-26, E-30, E-43, E-53, E-57 | 2 BLOCKERS, 2 DECISION CARDS, 1 SUB-AGENT run, and the run ends with F-9 open | Rule 24.3. Present: "and the first 4 FINDING IDs while any BLOCKER with an ID of the form `F-<n>` is open". New: "and the first 4 ID fields of open BLOCKERS, as written in the log, while any BLOCKER whose ID field starts with the form `F-<n>` is open; the count is the number of distinct ID fields". (Or change `gauge.py` to keep the first word; that needs a CRITERIA-CHANGE of C3 and C4.) |
| 3 | The builder and 2 AUDITORS missed that an old test lost its force: `test_svg_is_well_formed_and_escapes` uses an ID that the change now refuses. The third AUDITOR found it. | E-58 | 1 FRAGILITY left in the DELIVERABLE | Rule 10.1. Present: "For code: every CRITERION; every file in the DELIVERABLE; every function; every branch (each `if`, `else`, `case`, loop exit, error path and early return)." New: add "; every existing test whose input the change treats in a new way; and every sentence of a shipped text (a `SKILL.md`, a README, a docstring) that describes the changed behavior". |
| 4 | 2 AUDITORS classed 1 fault differently (DEFECT in E-30, BLOCKER in E-43), and 2 AUDITORS wrote a class with a condition ("if the ORCHESTRATOR holds … the class is DEFECT"). The USER's overrule of the DEFECT did not carry to the same fault raised again. | E-30, E-36, E-43, E-57 | 1 DECISION CARD, 1 WAIVER, `FRICTION.md` item 17 | Rule 15.3. Present: "The AUDITOR sets the class. The BUILDER and the ORCHESTRATOR must not lower it." New: add "The AUDITOR writes exactly 1 class, with no condition. The scope lists the files of the DELIVERABLE. Where a finding has the place and the trigger of a FINDING that already has an `OVERRULE` entry, the `FINDING` entry adds the line `Repeats: F-<n>`, and a higher class takes effect only by a referee's ruling." |
| 5 | Each re-audit after a fix audited the whole WORK UNIT again with a new AUDITOR, and each raised new findings on lines the fix did not touch (F-6, F-7, F-9, F-10). 3 rounds did not converge. | E-41, E-55 | 2 SUB-AGENT runs beyond the plan of 4 were asked for (1 granted), 2 DECISION CARDS | Rule 16.5. Present: "After every fix, re-run each AUDITOR role whose scope covers a file the fix touched, with new SUB-AGENTS, and update the ledger cells from the new reports (rule 10.5)." New: add "The scope of the re-run names the lines the fix changed and the trigger of each FINDING the fix closes. A finding on other lines is logged; it opens a new round only when it is a failed CRITERION." |
| 6 | The fix of a BLOCKER touched a 4th file and put the change over the CORE numbers; the rules gave no stated way to stay in CORE, and S8 has no AUDITOR in a CORE run. | E-50, E-54, E-67 | `FRICTION.md` items 18 and 19; every `FULL` check UNVERIFIED | Rule 0.5. Present: "The AGENT must not choose a lower TIER than the numbers give and must not split a change to lower them. The USER may raise the TIER at any time." New: add "The USER may keep a run in `CORE` by a WAIVER that names this rule or the words 'short form'; each check that a `FULL` run adds is then UNVERIFIED. In a `CORE` run the correctness auditor also performs rule 11.2 and rule 12.2 from a fresh clone." |

Follow-up work that the USER set aside and that no amendment covers: show the unread count in `GAUGE.svg` (F-6); make `check_record` call `finding_id` and test `check()` on the list of C3 (F-7); add 1 test that an accepted ID with `<` and `&` is escaped in the picture (F-10); cite rules 9.5 and 15.1 in the unread line (F-4) [E-44, E-45, E-58, E-33].
