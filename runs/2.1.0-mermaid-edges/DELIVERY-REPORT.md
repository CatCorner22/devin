# DELIVERY REPORT — Mermaid edge forms in the CONNECTIONS.md label check

Form required by section 19 (`skills/hinshitsu-delivery/SKILL.md`). Every claim ends with a citation in square brackets to a file path, a command-output file or an `AUDIT-LOG.md` entry ID. Paths are relative to this folder unless they begin with `scripts/`, `tests/` or `skills/`.

**Read this first.** The status is `DELIVERED — NOT DONE`. The fix is on the branch `devin/hinshitsu-run-2.1.0`, in commit 5099f2a [E-42]. The 3 lines the USER named and all 7 CRITERIA passed in 2 independent audits [`audits/WU-1-correctness-E-31.md`; `audits/WU-1-r2-correctness-E-44.md`]. 7 faults that the audits found stay in the code as known limits, each accepted by the USER [E-38, E-56, E-57, E-58, E-59, E-60, E-61].

## Check it yourself in 5 minutes

3 checks, no terminal needed (rule 19.2).

1. Open https://github.com/CatCorner22/devin/blob/devin/hinshitsu-run-2.1.0/tests/test_check.py and search the page for `test_unlabeled_thick_edge_fails`. You see: a test that expects the message `CONNECTIONS.md: edge A ==> B has no label (rule 9.3)`, and below it the tests for `C -.-> D` and `A -- reads --> B` [`evidence/WU-1-r2-correctness-E-44/test_unlabeled_thick_edge_fails.txt`].
2. Open https://app.devin.ai/sessions/6b750018b2914b0a9b8d30fafc55d59d (the first correctness auditor's run, which raised the first DEFECT of the run; no finding of the run has a higher class) and compare its last message with `audits/WU-1-correctness-E-31.md`. You see: the same 4 findings in the same words; the message names each output file where the saved file prints its contents [`audits/final-audit-E-72.md`].
3. Open https://app.devin.ai/sessions/2c6f057a16be412f89e76ffa6a5a5a78 (the final AUDITOR's run) and compare its last message with `audits/final-audit-E-72.md`. You see: the same text, and the words `not passed` in its last line [E-72]. You see: the same text, and the word `passed` or `not passed` in its last line.

The checker script tests the shape of the record; it does not prove that any check ran.

## Summary

**What you got.** A change to the checker script and 10 new tests, on the branch `devin/hinshitsu-run-2.1.0` [`evidence/new-tests-count.txt`]. A thick or dotted arrow with no text on it now fails, and an arrow with its text written between the dashes now passes [E-42; `audits/WU-1-r2-correctness-E-44.md`].

**What was proven.** A separate session, which did not write the fix, ran each test that the 7 acceptance statements name; each gave the required result [`audits/WU-1-r2-correctness-E-44.md`]. It also confirmed that 2 faults found in my first version no longer occur [E-50, E-51].

**What was not proven.** Nobody used the checker as a later user would, and nobody ran the 4 stability checks: this small run had no session for them [E-68]. Nobody ran Mermaid itself. My 2 guesses about users (1 arrow on a line; 4 ways to write a label) have no proof [E-13]. 7 known wrong results remain, accepted by you [E-38, E-55].

**What you need to decide next.** (1) Open the final check's session and tell me that you saw its saved text; without that, the work stays "delivered, not done". (2) Approve or reject the 5 proposed changes to the skills; if you do nothing, no skill changes.

You may stop reading here.

## Status

DELIVERED — NOT DONE: part 6 (the audit of the audit has not yet reported; this is the draft that the final AUDITOR reads) and part 7 (no `ANSWER` entry quotes the USER's statement that the USER opened the final AUDITOR's run and saw the saved report's text there).
TIER: CORE [E-4, E-30, E-43]. Mode: SWARM [E-2]. SUB-AGENT runs: 3 at the time of this draft (E-1, E-31, E-44); the final AUDITOR's is the fourth; planned 3 [E-4], raised to 4 by the USER [E-37].

Parts of DONE that are met: part 1, with the limit that only the correctness role verified each CRITERION (`CORE`, rule 0.5) [`audits/WU-1-r2-correctness-E-44.md`]; part 2, no BLOCKER was raised [`audits/WU-1-correctness-E-31.md`; `audits/WU-1-r2-correctness-E-44.md`]; part 3 [E-38, E-50, E-51, E-56, E-57, E-58, E-59, E-60, E-61]; part 4 [`COVERAGE-LEDGER.md`].

### Open FINDINGS

None. 9 `FINDING` entries; 2 `RESOLUTION` entries and 7 `OVERRULE` entries; 0 open (rule 15.6) [E-32 to E-35, E-45 to E-49; E-50, E-51; E-38, E-56 to E-61].

### Known limits, each accepted by the USER

| ID | Class | What stays wrong | Example | Accepted |
|---|---|---|---|---|
| F-3 | DEFECT | Only the first arrow on a line is tested | `A -- reads --> B --> C` passes | "Decision 1: raise to 4. Decision 2: leave it." [E-37, E-38] |
| F-4 | FRAGILITY | A sentence that holds `==>` inside the mermaid block, or in a file with no mermaid block, is read as an edge | `note: see A ==> B for detail` fails | "accept" [E-55, E-56] |
| F-5 | DEFECT | The second arrow after a labelled thick, dotted or between-dashes link is not tested | `A == reads ==> B --> C` passes | "accept" [E-55, E-57] |
| F-6 | DEFECT | An earlier dotted link written `.-` counts as the label of a later dotted arrow | `A -. reads .- B -.-> C` passes | "accept" [E-55, E-58] |
| F-7 | DEFECT | A circle or cross end with no space, a flag-shaped node, a `]` inside quoted text and an empty quoted label count as a label | `A --oB --> C` passes | "accept" [E-55, E-59] |
| F-8 | FRAGILITY | A second diagram in a `~~~mermaid` fence, or a fence with a space before `mermaid`, is not read | — | "accept" [E-55, E-60] |
| F-9 | STYLE | The message shows the arrow as written | `edge A ---> B has no label` | "accept" [E-55, E-61] |

### Link forms the checker does not test (G8, G12)

Links with no arrowhead (`A --- B`), circle and cross ends (`--o`, `--x`), 2-way arrows (`<-->`), every link after the first on a line (`A --> B --> C`, `A & B --> C`), invisible links (`~~~`) and links with an ID (`A e1@--> B`) [E-10, E-22].

### Corrections made to the record

E-20 and E-21 (a card over the word limit, then a correction that was itself false; neither text was sent), E-65 (1 ledger cell read `PASS` where the report raised 2 findings) [E-20, E-21, E-65]. 3 entries are marked late: E-3, E-17 and E-72 [E-3, E-17, E-72].

## Voice of the Customer

| Need | Result | Citation |
|---|---|---|
| V1 "`A ==> B` and `C -.-> D` pass with no label" | met: each now fails with `has no label` | [`evidence/WU-1-r2-correctness-E-44/test_unlabeled_thick_edge_fails.txt`; `evidence/WU-1-r2-correctness-E-44/test_unlabeled_dotted_edge_fails.txt`] |
| V2 "`A -- reads --> B` fails though it has a label" | met: it passes | [`evidence/WU-1-r2-correctness-E-44/test_edge_with_label_between_dashes_passes.txt`] |
| V3 "Fix it in `scripts/hinshitsu_check.py`" | met | [`evidence/WU-1-r2-correctness-E-44/C7-stat.txt`] |
| V4 "with tests" | met: 81 tests pass; the 4 named tests fail on the old script | [`evidence/WU-1-r2-correctness-E-44/C6-suite.txt`; `evidence/WU-1-r2-correctness-E-44/C6-base.txt`] |
| V5 "Work on a new branch … Do not push to `main` and do not open a pull request." | UNVERIFIED: no AUDITOR tested it; the round-2 AUDITOR read the branch from GitHub at d22f5a6 | [`audits/WU-1-r2-correctness-E-44.md`] |
| O1 tests built from `good_run()` and `edit()` | met (C6) | [`audits/WU-1-r2-correctness-E-44.md`] |
| O2 the right exit code through the command line | met (C1, C2, C3) | [`evidence/WU-1-r2-correctness-E-44/test_edge_forms_set_the_exit_code.txt`] |
| O3 Python 3 only | met (C7) | [`evidence/WU-1-r2-correctness-E-44/C7-import.txt`] |
| O4 `A --> B` fails, `A -->|reads| B` passes | met (C4) | [`evidence/WU-1-r2-correctness-E-44/test_unlabeled_edge_fails.txt`; `evidence/WU-1-r2-correctness-E-44/test_good_run_passes_every_stage.txt`] |
| O5 the 2 existing records get the same failures | met (C4) | [`evidence/WU-1-r2-correctness-E-44/C4-same.txt`] |
| O6 no changelog line, no version change | met (C7) | [`evidence/WU-1-r2-correctness-E-44/C7-stat.txt`] |
| VA1 labels are written in 1 of 4 forms | VOC-ASSUMED; quoted labels in those forms also pass | [E-13, E-41] |
| VA2 at most 1 link on a line | VOC-ASSUMED; the USER accepted the limit | [E-13, E-38] |

## Gaps filled

| ID | Gap | What was done | Citation |
|---|---|---|---|
| G1, G3, G4, G5, G7, G10 | no gap | nothing | [E-10] |
| G2 | lines that are not edges, empty file, text outside the diagram | first: handled as before (AGENT). After F-4 the AGENT reversed this: when a mermaid block exists, only its lines are read; the USER was told on the card of E-36 | [E-10, E-40, E-41, E-36] |
| G6 | undo | the fix is in commits on the branch only; `git revert` removes it (AGENT) | [E-10, E-42] |
| G8 | upkeep | each tested form has a named test; this report lists the forms not tested (AGENT) | [E-10] |
| G9 | failure message | shows the arrow as written (AGENT, D-2); the USER accepted F-9 | [E-15, E-61] |
| G11 | how the RECIPIENT gets it | the branch, no pull request (USER) | [E-10] |
| G12 | forms the USER did not name | left out: "Decision 2: 3 forms only." (USER) | [E-22] |
| G13 | labelled thick and dotted links | they pass, with tests, C5 (AGENT) | [E-10, E-25] |
| G14 | changelog and version | none added (AGENT) | [E-10] |

## Lens reconciliation

No `RECONCILIATION` table: S5 was skipped in this `CORE` run, and no LENS memo exists (rule 0.5) [E-23, E-26]. The 4 LENSES are UNVERIFIED — not run.

## Red-cell verdict

- Plan-time attack: not run — `CORE` run, S5 skipped [E-23].
- Pre-delivery attack: not run — `CORE` run, S9 skipped [E-70].
- Premortem: not run [E-70].
- Probes: none; no `PROBE` entry exists [`AUDIT-LOG.md`].

## Swarm verdict

| WORK UNIT | Role | LAUNCH | BLOCKER | DEFECT | FRAGILITY | STYLE | How each ended | Report |
|---|---|---|---|---|---|---|---|---|
| WU-1, commit fe82be2 | Correctness auditor | E-31 | 0 | 3 | 1 | 0 | FIXED 2 (F-1, F-2), OVERRULED 2 by the USER (F-3, F-4) | `audits/WU-1-correctness-E-31.md` |
| WU-1, commit 5099f2a | Correctness auditor, round 2 | E-44 | 0 | 3 | 1 | 1 | OVERRULED 5 by the USER (F-5 to F-9); its finding 4 is F-4 again, in part [E-52] | `audits/WU-1-r2-correctness-E-44.md` |

Roles 2 to 8 of rule 13.1 did not run: UNVERIFIED — `CORE` run (rule 0.5) [E-43]. The capability probe is the run of E-1 [`evidence/capability-probe.md`].

Planted defect (rule 16.7): none; the rule applies to a `FULL` run [E-43].

## Coverage ledger

PASS 31 · FAIL 7 · N/A 342 · UNVERIFIED 0 · empty 0 [`COVERAGE-LEDGER.md`]

UNVERIFIED rows: none. Each `FAIL` cell names a FINDING that the USER overruled. The `N/A` cells of 7 of the 8 audit columns state `CORE`: those roles did not run, and the report counts them as not proven [E-43, E-68].

## Maps

`GAUGE.svg` · `MINDMAP.md` · `CONNECTIONS.md`

## Audit log

`AUDIT-LOG.md` — 71 entries at the time of this draft

## LESSONS

| What happened | Entry | Cost | Proposed amendment (rule, present text, new text) |
|---|---|---|---|
| The BUILDER's first fix passed all 7 CRITERIA and its own 76 tests, and still made 2 lines pass that failed before (`A --x B --> C`) and failed a quoted label. The independent correctness auditor found both; the BUILDER had tested only the lines the CRITERIA name | E-32, E-33 | 1 repair round, 1 more SUB-AGENT run, 1 card | Rule 3.1 (conductor), add: "For a change to a test or a pattern, 1 CRITERION must state that no input that failed before the change passes after it, other than the inputs the other CRITERIA name, with the set of inputs to compare." |
| AGENT error: a card with a decision over 120 words was logged, then a correction claimed "under 120" before any count; it was 133 | E-20, E-21 | 2 `CORRECTION` entries; no wrong card was sent | Rule 23.4: present "at most 120 words"; new "at most 120 words, counted by a command whose output is saved under `evidence/` before the `CARD` entry is written". |
| AGENT error: 1 ledger cell read `PASS` against a branch on which the report raised 2 findings; a script matched the wrong text and the count it printed was not compared | E-65 | 1 `CORRECTION` entry | Rule 10.5, add: "After filling cells from a report, state in a `CHECK` entry the count of `FAIL` cells and the count of rows the report's findings name; the 2 must agree." |
| A `CORE` run plans 3 SUB-AGENT runs, and rule 16.5 needs a new one after every fix; the first audit that finds a fault always breaks the budget. After 2 rounds, 6 non-BLOCKER FINDINGS were open and no rule says when to stop | E-36, E-54 | 2 cards to the USER | Rule 0.5: present "plans 3 SUB-AGENT runs"; new "plans 4: the probe, the correctness auditor, 1 re-audit, the final AUDITOR". Rule 14.5: present "if any BLOCKER is still open"; new "if any BLOCKER, DEFECT or FRAGILITY is still open". |
| In a `CORE` run nobody may perform sections 11 and 12 (an AUDITOR is required and none is planned), and the rule gives `N/A`, which reads as "does not apply" where the truth is "not run" | E-68 | recipient-side and stability checks not proven | Rule 0.5, add: "In a `CORE` run the final AUDITOR also performs the first RECIPIENT task of the `VOC` entry (rule 11.2); the cells of roles that did not run read `UNVERIFIED — CORE`, not `N/A`." |
