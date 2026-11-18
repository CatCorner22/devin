# COVERAGE-LEDGER — gauge counts a FINDING whose ID is not F-<n> as unread

Column key: **COR** correctness · **FOR** forensic (5S) · **BP** best practices · **ADV** adversarial · **RX** recipient experience · **DRIFT** framework drift · **LANG** language · **RED** red cell · **RSV** recipient-side verification · **STAB** stability.

Rows of WU-1, added before its audit (rule 10.1). The rows cover the change of WU-1: the function and the branches that the change touches, and the tests it adds (see `FRICTION.md` item 12).

## CRITERIA

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 a FINDING entry with a refused ID is counted as unread | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C2 such an entry is left out of the STOPPED line and of GAUGE.svg | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C3 the gauge and the checker agree on the ID | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C4 nothing else changes | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C5 the new tests fail on gauge.py of a3717b1 | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C6 the change is on the branch only | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |

## Files

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `skills/hinshitsu-gauge/scripts/gauge.py` | `FAIL` F-9 (`audits/WU-1-r3-correctness_E-55.md`, finding 1) | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| `tests/test_gauge.py` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| `scripts/hinshitsu_check.py` (lines 85 to 94 and 306 to 317, the fix of the third FINDING) | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| `skills/hinshitsu-gauge/SKILL.md` (lines 15 and 16, the fix of the fifth FINDING) | `FAIL` F-9 (`audits/WU-1-r3-correctness_E-55.md`, finding 1) | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |

## Functions

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `skills/hinshitsu-gauge/scripts/gauge.py` `read_state` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `ReadState.test_finding_with_a_refused_id_is_unread_and_not_a_blocker` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `ReadState.test_finding_with_a_refused_id_is_unread_whatever_its_class` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `ReadState.test_refused_ids_beside_a_good_blocker_leave_only_the_good_one` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `ReadState.test_gauge_and_checker_agree_on_the_finding_id` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `Output.test_refused_finding_ids_are_counted_and_not_shown_as_stopped` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `Output.test_stopped_line_lists_only_the_blocker_with_a_good_id` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `scripts/hinshitsu_check.py` `finding_id` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |

## Branches

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `skills/hinshitsu-gauge/scripts/gauge.py:83` `elif kind == "FINDING"` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `skills/hinshitsu-gauge/scripts/gauge.py:85` `if not fid or not FINDING_ID.fullmatch(…)`: refused ID, count and `continue` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `skills/hinshitsu-gauge/scripts/gauge.py:85` the same condition false: the entry is read | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `skills/hinshitsu-gauge/scripts/gauge.py:88` `if` class starts with BLOCKER and the ID is not listed yet: append | `FAIL` F-9 (`audits/WU-1-r3-correctness_E-55.md`, finding 1) | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `skills/hinshitsu-gauge/scripts/gauge.py:88` the same condition false: nothing is added | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `scripts/hinshitsu_check.py:94` `finding_id` returns the first word when it fully matches, else `None` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `scripts/hinshitsu_check.py:311` `if not fid`: 1 of the 2 messages, and `continue` | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `scripts/hinshitsu_check.py:311` the same condition false: the entry is read | `PASS` `audits/WU-1-r3-correctness_E-55.md` | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |

## Totals

Counted at delivery (E-63 is the last entry before the count): PASS 23 · FAIL 3 · N/A 234 · UNVERIFIED 0 · empty 0, in 260 cells of 26 rows. The COR cells rest on the newest correctness report, `audits/WU-1-r3-correctness_E-55.md`, on commit 1ce96d3806ca886d4749660e07e94074c4cb87c7; no row changed after it. C5: the report holds the failing output; no file under `evidence/` holds it (`FRICTION.md` item 13).
