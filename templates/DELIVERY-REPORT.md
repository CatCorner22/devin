# DELIVERY REPORT — <task name>

Form required by section 19 (`skills/hinshitsu-delivery/SKILL.md`). Every claim ends with a citation in square brackets to a file path, a command-output file, a screenshot or an `AUDIT-LOG.md` entry ID. A claim with no citation is ASSERTED and fails the gate (rule 17.2).

## Check it yourself in 5 minutes

3 checks, no terminal needed (rule 19.2).

1. Open <the DELIVERABLE, as a RECIPIENT opens it> and <perform the first task of the `VOC` entry>. You see: <what appears>.
2. Open <the SUB-AGENT run that raised the highest-class FINDING, by its identifier or link> and compare it with `audits/<file>`. You see: the same text.
3. Open <the final AUDITOR's run, by its identifier or link> and compare it with `audits/final-audit-<LAUNCH ID>.md`. You see: the same text, and the word `passed` or `not passed`.

The checker script tests the shape of the record; it does not prove that any check ran.

## Summary

At most 200 words, for a reader with no technical background.

**What you got.** <text> [<citation>]

**What was proven.** <each thing proven and how, 1 sentence each> [<citation>]

**What was not proven.** <every UNVERIFIED and VOC-ASSUMED item with what the USER can do to check it, or `Nothing`>

**What you need to decide next.** <each open decision that belongs to the USER, the recommendation, and what happens if the USER does nothing; or `Nothing`>

You may stop reading here.

## Status

<DONE | DELIVERED — NOT DONE: <each of the 8 parts of DONE that is not met>>
TIER: <CORE | FULL>. Mode: <SWARM | DEGRADED — single-agent audit: <roles that ran DEGRADED>>. SUB-AGENT runs: <count of `LAUNCH` entries>.

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

| WORK UNIT | Role | LAUNCH | BLOCKER | DEFECT | FRAGILITY | STYLE | How each ended | Report |
|---|---|---|---|---|---|---|---|---|
| WU-1 | <role> | E-<n> | <n> | <n> | <n> | <n> | <FIXED n, WITHDRAWN n, OVERRULED n, open n> | `audits/<file>` |

Planted defect (rule 16.7): <per WORK UNIT: the seed report, the roles named, which found it>

## Coverage ledger

PASS <n> · FAIL <n> · N/A <n> · UNVERIFIED <n> · empty 0 [`COVERAGE-LEDGER.md`]

UNVERIFIED rows: <each row and reason, or `none`>

## Maps

`GAUGE.svg` · `MINDMAP.md` · `CONNECTIONS.md`

## Audit log

`AUDIT-LOG.md` — <n> entries

## LESSONS

| What happened | Entry | Cost | Proposed amendment (rule, present text, new text) |
|---|---|---|---|
| <text> | E-<n> | <text> | <text> |
