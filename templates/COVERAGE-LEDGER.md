# COVERAGE-LEDGER — <task name>

Form required by section 10 (`skills/hinshitsu-record/SKILL.md`). Copy this file into the RUN FOLDER. Add the rows for a WORK UNIT before its swarm starts.

Each cell holds exactly 1 of:

- `PASS` + the EVIDENCE path (an AUDITOR's report or the output of a command an AUDITOR ran);
- `FAIL` + the FINDING ID;
- `N/A` + the reason that audit cannot apply to that row;
- `UNVERIFIED` + the reason.

No cell is empty at delivery. In function rows and branch rows, only COR and ADV are audited; write `N/A — covered at file row` in the other 8 (rule 10.4). A cell that rests on a report older than the last change to its row is `UNVERIFIED` (rule 10.5).

Column key: **COR** correctness · **FOR** forensic (5S) · **BP** best practices · **ADV** adversarial · **RX** recipient experience · **DRIFT** framework drift · **LANG** language · **RED** red cell · **RSV** recipient-side verification (section 11) · **STAB** stability (section 12).

## CRITERIA

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 <text> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> |

## Files

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `<path>` | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> |

## Functions

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `<path>` `<function>` | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> |

## Branches

| Row | COR | FOR | BP | ADV | RX | DRIFT | LANG | RED | RSV | STAB |
|---|---|---|---|---|---|---|---|---|---|---|
| `<path>:<line>` <condition> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> | <cell> |

For a document, replace **Functions** and **Branches** with **Sections** and **Factual claims**.

## Totals

| PASS | FAIL | N/A | UNVERIFIED | Empty |
|---|---|---|---|---|
| <n> | <n> | <n> | <n> | 0 |

Every `UNVERIFIED` row is listed in the delivery report (rule 19.10).
