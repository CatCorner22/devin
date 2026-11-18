# DELIVERY REPORT — <task name>

Form required by `skills/hinshitsu/SKILL.md` section 19. Every claim ends with a citation in square brackets to a file path, a command-output file, a screenshot or an `AUDIT-LOG.md` entry ID. A claim with no citation is ASSERTED and fails the gate (rule 17.2).

## Summary

At most 250 words, for a reader with no technical background.

**What you got.** <text> [<citation>]

**What was proven.** <each thing proven and how, 1 sentence each> [<citation>]

**What was not proven.** <every UNVERIFIED and VOC-ASSUMED item with what the USER can do to check it, or `Nothing`>

**What you need to decide next.** <each open decision that belongs to the USER, the recommendation, and what happens if the USER does nothing; or `Nothing`>

## Status

<DONE | DELIVERED — NOT DONE: <each of the 8 parts of DONE that is not met>>
Mode: <SWARM | DEGRADED — single-agent audit: <roles that ran DEGRADED>>

## Voice of the Customer

<the VOC entry, each need marked met, not met or UNVERIFIED, with citations>

## Gaps filled

| ID | Gap | What was done | Citation |
|---|---|---|---|
| G1 | <gap> | <done> | [<citation>] |

## Lens reconciliation

<the `RECONCILIATION` table, then 1 line per later LENS memo with its path>

## Red-cell verdict

- Plan-time attack: "<verdict, word for word>" [`audits/redcell-plan.md`]
- Pre-delivery attack: "<verdict, word for word>" [`audits/redcell-delivery.md`]
- Premortem: <the causes the story named and the FINDING ID of each>
- Probes: <each `PROBE` entry ID with trigger and result>

## Swarm verdict

| WORK UNIT | Role | BLOCKER | DEFECT | FRAGILITY | STYLE | How each ended | Report |
|---|---|---|---|---|---|---|---|
| WU-1 | <role> | <n> | <n> | <n> | <n> | <FIXED n, NOT REPRODUCED n, OVERRULED n, open n> | `audits/<file>` |

## Coverage ledger

PASS <n> · FAIL <n> · N/A <n> · UNVERIFIED <n> · empty 0 [`COVERAGE-LEDGER.md`]

UNVERIFIED rows: <each row and reason, or `none`>

## Maps

`MINDMAP.md` · `CONNECTIONS.md`

## Audit log

`AUDIT-LOG.md` — <n> entries

## LESSONS

| What happened | Entry | Cost | Proposed amendment (rule, present text, new text) |
|---|---|---|---|
| <text> | E-<n> | <text> | <text> |
