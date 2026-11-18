# COVERAGE-LEDGER — gauge counts a FINDING whose ID is not F-<n> as unread

Column key: **COR** correctness · **FOR** forensic (5S) · **BP** best practices · **ADV** adversarial · **RX** recipient experience · **DRIFT** framework drift · **LANG** language · **RED** red cell · **RSV** recipient-side verification · **STAB** stability.

Rows of WU-1, added before its audit (rule 10.1). The rows cover the change of WU-1: the function and the branches that the change touches, and the tests it adds (see `FRICTION.md` item 12).

## CRITERIA

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 a FINDING entry with a refused ID is counted as unread | UNVERIFIED — not audited | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C2 such an entry is left out of the STOPPED line and of GAUGE.svg | UNVERIFIED — not audited | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C3 the gauge and the checker agree on the ID | UNVERIFIED — not audited | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C4 nothing else changes | UNVERIFIED — not audited | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C5 the new tests fail on gauge.py of a3717b1 | UNVERIFIED — not audited | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| C6 the change is on the branch only | UNVERIFIED — not audited | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |

## Files

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `skills/hinshitsu-gauge/scripts/gauge.py` | UNVERIFIED — not audited | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| `tests/test_gauge.py` | UNVERIFIED — not audited | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |
| `scripts/hinshitsu_check.py` (lines 85 to 94 and 306 to 317, the fix of the third FINDING) | UNVERIFIED — not audited | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE | N/A — CORE |

## Functions

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `skills/hinshitsu-gauge/scripts/gauge.py` `read_state` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `ReadState.test_finding_with_a_refused_id_is_unread_and_not_a_blocker` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `ReadState.test_finding_with_a_refused_id_is_unread_whatever_its_class` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `ReadState.test_refused_ids_beside_a_good_blocker_leave_only_the_good_one` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `ReadState.test_gauge_and_checker_agree_on_the_finding_id` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `Output.test_refused_finding_ids_are_counted_and_not_shown_as_stopped` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `tests/test_gauge.py` `Output.test_stopped_line_lists_only_the_blocker_with_a_good_id` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `scripts/hinshitsu_check.py` `finding_id` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |

## Branches

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `skills/hinshitsu-gauge/scripts/gauge.py:83` `elif kind == "FINDING"` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `skills/hinshitsu-gauge/scripts/gauge.py:85` `if not fid or not FINDING_ID.fullmatch(…)`: refused ID, count and `continue` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `skills/hinshitsu-gauge/scripts/gauge.py:85` the same condition false: the entry is read | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `skills/hinshitsu-gauge/scripts/gauge.py:88` `if` class starts with BLOCKER and the ID is not listed yet: append | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `skills/hinshitsu-gauge/scripts/gauge.py:88` the same condition false: nothing is added | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `scripts/hinshitsu_check.py:94` `finding_id` returns the first word when it fully matches, else `None` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `scripts/hinshitsu_check.py:311` `if not fid`: 1 of the 2 messages, and `continue` | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |
| `scripts/hinshitsu_check.py:311` the same condition false: the entry is read | UNVERIFIED — not audited | N/A — covered at file row | N/A — covered at file row | N/A — CORE | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row | N/A — covered at file row |

## Totals

Counted at delivery.
