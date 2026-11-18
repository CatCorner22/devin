# COVERAGE-LEDGER — Mermaid edge forms in the CONNECTIONS.md label check

Form required by section 10 (`skills/hinshitsu-record/SKILL.md`). The rows for WU-1 are added before its audit starts (rule 10.1).

Column key: **COR** correctness · **FOR** forensic (5S) · **BP** best practices · **ADV** adversarial · **RX** recipient experience · **DRIFT** framework drift · **LANG** language · **RED** red cell · **RSV** recipient-side verification (section 11) · **STAB** stability (section 12).

Rows for WU-1, added before its audit (rule 10.1). TIER `CORE` (2 files, 42 changed lines): only the correctness auditor and the final AUDITOR run, so the cells of every other audit read `N/A` — CORE (rule 0.5).

## CRITERIA

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 thick arrow with no label fails | `UNVERIFIED` — audit not yet run | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C2 dotted arrow with no label fails | `UNVERIFIED` — audit not yet run | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C3 label between the dashes passes | `UNVERIFIED` — audit not yet run | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C4 the 2 verdicts of commit 93311ab stay | `UNVERIFIED` — audit not yet run | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C5 the 4 labelled thick and dotted forms pass | `UNVERIFIED` — audit not yet run | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C6 the tests exist, pass, and fail against commit 93311ab | `UNVERIFIED` — audit not yet run | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| C7 2 files changed, no new import, lint passes | `UNVERIFIED` — audit not yet run | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |

## Files

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `scripts/hinshitsu_check.py` (lines 27-37 and 293-301) | `UNVERIFIED` — audit not yet run | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |
| `tests/test_check.py` (lines 105-108 and 219-236) | `UNVERIFIED` — audit not yet run | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE | `N/A` — CORE |

## Functions

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `scripts/hinshitsu_check.py` `check()` connections block (lines 293-301) | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `edge_run()` | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_unlabeled_thick_edge_fails` | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_unlabeled_dotted_edge_fails` | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_edge_with_label_between_dashes_passes` | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_labeled_thick_and_dotted_edges_pass` | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py` `test_edge_forms_set_the_exit_code` | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |

## Branches

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `scripts/hinshitsu_check.py:295` `if p.is_file()`: file present | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:295` `if p.is_file()`: file absent | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:297` loop over matches: no match | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:297` loop over matches: 1 or more | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:299` kind: thick | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:299` kind: dotted | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:299` kind: arrow | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:300` label between the halves: found | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `scripts/hinshitsu_check.py:300` label between the halves: not found | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py:229` loop over the 4 labelled lines | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
| `tests/test_check.py:234` loop over the 3 lines and exit codes | `UNVERIFIED` — audit not yet run | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — CORE | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row | `N/A` — covered at file row |
