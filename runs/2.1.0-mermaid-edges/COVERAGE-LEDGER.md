# COVERAGE-LEDGER — Mermaid edge forms in the CONNECTIONS.md label check

Form required by section 10 (`skills/hinshitsu-record/SKILL.md`). The rows for WU-1 are added before its audit starts (rule 10.1).

Column key: **COR** correctness · **FOR** forensic (5S) · **BP** best practices · **ADV** adversarial · **RX** recipient experience · **DRIFT** framework drift · **LANG** language · **RED** red cell · **RSV** recipient-side verification (section 11) · **STAB** stability (section 12).

Rows for WU-1 as built at commit 5099f2a, written before its re-audit (rule 10.1). The rows written for commit fe82be2 are in the git history of this file (commit f24cf3b); the report on that commit, `audits/WU-1-correctness-E-31.md`, is older than the change, so it supports no cell here (rule 10.5). The COR cells are filled from the round-2 report, `audits/WU-1-r2-correctness-E-44.md` (E-44), on commit 5099f2a. TIER `CORE` (2 files, 68 changed lines): only the correctness auditor and the final AUDITOR run, so the cells of every other audit read `N/A` — CORE (rule 0.5).

## CRITERIA

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 thick arrow with no label fails | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C2 dotted arrow with no label fails | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C3 label between the dashes passes | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C4 the 2 verdicts of commit 93311ab stay | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C5 the 4 labelled thick and dotted forms pass | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C6 the tests exist, pass, and fail against commit 93311ab | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C7 2 files changed, no new import, lint passes | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |

## Files

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `scripts/hinshitsu_check.py` (lines 28-36 and 292-302) | `FAIL` F-5, and F-4, F-6, F-7, F-8, F-9 — overruled by the USER (E-55) | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| `tests/test_check.py` (lines 105-108 and 219-261) | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |

## Functions

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `scripts/hinshitsu_check.py` `check()` connections block (lines 292-302) | `FAIL` F-5, and F-4, F-6, F-7, F-8 — overruled by the USER (E-55) | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `edge_run()` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_unlabeled_thick_edge_fails` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_unlabeled_dotted_edge_fails` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_edge_with_label_between_dashes_passes` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_labeled_thick_and_dotted_edges_pass` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_earlier_link_is_not_the_label_of_a_later_arrow` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_quoted_label_between_the_halves_passes` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_text_outside_the_mermaid_block_is_not_read` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_unlabeled_edge_in_a_file_with_no_mermaid_block_fails` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_bare_dot_arrow_is_not_an_edge` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_edge_forms_set_the_exit_code` | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |

## Branches

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `scripts/hinshitsu_check.py:294` `if p.is_file()`: file present | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:294` `if p.is_file()`: file absent | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:297` `blocks if blocks else text`: a mermaid block exists | `FAIL` F-8 — overruled by the USER (E-55) | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:297` `blocks if blocks else text`: no mermaid block | `FAIL` F-4 — overruled by the USER (E-55) | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:297` loop over matches: no match | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:297` loop over matches: 1 or more | `FAIL` F-5 — overruled by the USER (E-55) | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:299` kind: thick | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:299` kind: dotted | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:299` kind: arrow | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:301` labeled: no failure | `FAIL` F-6, and F-7 — overruled by the USER (E-55) | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:301` not labeled, arrow starts with a dot: no failure | `FAIL` F-5 — overruled by the USER (E-55) | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:301` not labeled, any other arrow: failure | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py:229` loop over the 4 labelled lines | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py:234` loop over the 3 lines with an earlier link | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py:239` loop over the 3 quoted labels | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py:254` loop over the 2 bare dot arrows | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py:259` loop over the 3 lines and exit codes | `PASS` `audits/WU-1-r2-correctness-E-44.md` | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |

## Totals

| PASS | FAIL | N/A | UNVERIFIED | Empty |
|---|---|---|---|---|
| 31 | 7 | 342 | 0 | 0 |

Each `FAIL` cell names a FINDING that the USER overruled (E-38, E-56 to E-61); none is open.
