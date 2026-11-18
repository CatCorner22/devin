# PLAN v2 — 7 skills, 1 plugin

Supersedes `PLAN.md` where they differ (E-012, E-013, E-014). Written before any skill is coded.

## Shared design (all skills)

- **Rule IDs.** Section numbers 0 to 23 are those of the brief and are unique across the 7 skills. A rule is cited "rule 13.2". The gauge skill holds section 24.
- **1 glossary** at `skills/hinshitsu/GLOSSARY.md`. It also holds the status table (what sets each status, who clears it, which entry records the clearing).
- **Size.** Each `SKILL.md`: at most 18 KiB, 500 lines; description at most 1,024 characters (Claude Code keeps the first 5,000 tokens of a skill after compaction; Agent Skills specification limits the description).
- **Standalone use.** Each skill opens with the same 6-line preamble: what the words `must` and `may` mean, where the glossary is, which sections it holds, which stage of the run it serves, and what it needs from the other skills. A skill used alone still writes its artifacts to the run folder.
- **Stages.** The conductor fixes 12 stages. A `STAGE` entry marks the start and the end of each; the start entry names the skill file read, its byte count and SHA-256. The gauge reads only these entries and the open BLOCKERs.

| Stage | Name | Skill | Sections |
|---|---|---|---|
| S1 | Capability and tier | `hinshitsu` | 0, 1 |
| S2 | Record set up | `hinshitsu-record` | 7, 8, 9 |
| S3 | Voice of the customer and gap list | `hinshitsu-baby-bird-plan` | 2, 23 |
| S4 | Assumptions and proposed criteria | `hinshitsu-baby-bird-plan` | 4, 3 |
| S5 | Challenge: 4 lenses and red cell | `hinshitsu-challenge` | 5, 6 |
| S6 | Reconcile, ask, freeze | `hinshitsu-baby-bird-plan` | 3, 23 |
| S7 | Build and audit, per work unit | `hinshitsu-audit` | 13, 14, 15, 16, 10, 18 |
| S8 | Recipient-side and stability checks | `hinshitsu-audit` | 11, 12 |
| S9 | Pre-delivery red cell and premortem | `hinshitsu-challenge` | 6 |
| S10 | Audit of the audit | `hinshitsu-delivery` | 17 |
| S11 | Delivery report | `hinshitsu-delivery` | 19 |
| S12 | Lessons | `hinshitsu-delivery` | 20 |

- **Tiers.** `CORE`: the change touches at most 3 files and at most 100 lines and includes no action that section 18 covers. `FULL`: anything else, or the user writes "full". CORE skips S5 and S9 and runs 1 auditor that runs every named test; every skipped role is reported UNVERIFIED. The agent never lowers a tier. (Pending the user's answer to decision 3.)
- **Log entry types.** CAPABILITY, TIER, STAGE, VOC, GAP, ASSUMPTION, CRITERIA, CRITERIA-CHANGE, CARD, ANSWER, RECONCILIATION, DECISION, TRACE, LAUNCH, FINDING, RESOLUTION, OVERRULE, PROBE, CHECK, COMPACTION, REVERSAL, ABANDONED, ROLLBACK, WAIVER, CORRECTION, DELIVERY, LESSON.
- **Finding results.** FIXED, WITHDRAWN, OVERRULED.
- **Custody.** LAUNCH entry before each sub-agent; report saved whole, first line the platform identifier; 1 commit per report; each log entry committed before its action where git exists.

## Per-skill plan

| Skill | Must contain | Inputs it reads | Artifacts it writes | Tested by |
|---|---|---|---|---|
| `hinshitsu` | precedence; run-sequence table; section 0 (capability entry, 5-part swarm test, live probe, tier, planned run count); section 1 (3 duties, custody rule, `main` moves only to an audited commit); DONE; section 21; section 22; stage and gauge rule; banned words | the task; the runtime | CAPABILITY, TIER, STAGE entries; `evidence/capability-probe.md` | lint; cold-start run (C12) |
| `hinshitsu-baby-bird-plan` | section 23 first (gap list, bring the answer, cheap-to-undo, decision card, silence rule, plain words, challenge, no handoffs, report); section 2; section 4; section 3 (PROPOSED, freeze after reconciliation, change rule) | the user's messages; repository history | VOC, GAP, ASSUMPTION, CRITERIA, CARD, ANSWER entries | lint; correctness auditor against brief |
| `hinshitsu-challenge` | section 5 (4 lenses, memo form, reconciliation, rotation per work unit, synthesis on request); section 6 (plan and pre-delivery attacks, probes with 1 per trigger, retroactive attack, unflagged-premise rule judged by a second sub-agent, premortem, BLOCKER class, attack versus finding) | run folder | `memos/`, `audits/redcell-*.md`, RECONCILIATION, PROBE entries | lint; this build's own lens and red-cell runs |
| `hinshitsu-record` | section 7 (framework, 3-way trace, existing implementations); section 8 (session state, compaction, contradiction check, loop limit); section 9 (4 artifacts, entry format, ID formats, append-only, secrets); section 10 (ledger rows by type, cells, no empty cell); section 18 (rollback) | everything | `FRAMEWORK.md`, `SESSION-STATE.md`, `MINDMAP.md`, `CONNECTIONS.md`, `AUDIT-LOG.md`, `COVERAGE-LEDGER.md` | `hinshitsu_check.py` |
| `hinshitsu-audit` | section 13 (8 roles, scopes from `templates/roles/`, seeded defect by a non-builder); 14 (stop the line, 3 exits, 2-round limit); 15 (finding form, class owner, results); 16 (scopes, no self-audit, 0-finding and all-STYLE rounds, re-run after fix, no discarded report); 11; 12 | work unit; criteria | `audits/`, FINDING, RESOLUTION, OVERRULE, CHECK entries; `evidence/` | seeded defect in the example |
| `hinshitsu-delivery` | section 17 (citation rule, ASSERTED fails, final auditor, idempotence, checker proves form only); 19 (5-minute check, 200-word summary, parts in order); 20 (lessons with rule text) | run folder | `DELIVERY-REPORT.md`, `audits/final-audit.md`, LESSON entries | `hinshitsu_check.py --stage delivery`; final auditor |
| `hinshitsu-gauge` | section 24: when to run, what the picture shows, what it does not prove; `scripts/gauge.py` | `AUDIT-LOG.md` | `GAUGE.svg`, text gauge | unit tests; browser screenshot |

## Plugin

`.claude-plugin/plugin.json` (Claude Code; Devin CLI falls back to it, per docs.devin.ai/cli/extensibility/plugins/overview, read 2026-11-18) and `.cursor-plugin/plugin.json` (cursor.com/docs/plugins, read 2026-11-18). Skills sit in `skills/<name>/SKILL.md`, the default location on all 3.

## Build order

1. `skills/hinshitsu/GLOSSARY.md`, then the 7 `SKILL.md` files and `gauge.py` with tests.
2. `scripts/lint.py`, `scripts/hinshitsu_check.py` with tests.
3. `templates/` and `templates/roles/`.
4. Plugin manifests; Devin adapter.
5. Example run (single-page bill splitter) with real sub-agents, browser and gauge.
6. Other 6 adapters; `README.md`; `TESTING.md`; `CHANGELOG.md`.
7. Per message 7: 4 lenses, red cell and the 8-role swarm over the finished set; fix; re-audit; final auditor; `main`.
