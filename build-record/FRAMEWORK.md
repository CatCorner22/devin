# FRAMEWORK — living reference for the hinshitsu build

Read before every work unit. Update after every work unit. Mark a superseded line `(superseded <date> → <ID>)`; never delete it.

## 1. Criteria

C1 to C11: `AUDIT-LOG.md` E-004, E-005, E-006. Those entries control; this file does not restate them.

## 2. Architecture decisions

D-001 to D-010: `AUDIT-LOG.md` E-008.

## 3. Naming conventions

- Defined terms: all capitals, defined once in `skills/hinshitsu/GLOSSARY.md`.
- Section references: "section N" with the number in `SKILL.md`.
- IDs: C, A, D, G, F, E, WU plus a number (D-010).
- Files: artifact names in capitals (`AUDIT-LOG.md`); adapters in lower case by product name.
- Words: `must`, `must not`, `may`. Digits for numbers. Active voice. No banned word (C4).

## 4. Contracts

| Provider | Consumer | Contract |
|---|---|---|
| `GLOSSARY.md` | `SKILL.md`, templates, adapters, example | Term names and meanings |
| `SKILL.md` section numbers and names | adapters, templates, README, `scripts/lint.py`, example | Sections 0 to 23 keep number and name |
| `SKILL.md` artifact rules (sections 7 to 10, 15, 19) | templates, `scripts/hinshitsu_check.py`, example, `build-record/` | File names, headings, entry format, verdict words |
| templates | example, `build-record/` | Same headings and columns |
| `scripts/hinshitsu_check.py` | example, `build-record/`, README | Exit 0 means the structural rules hold |
| vendor documents | adapters | Capability claims, each with link and date |

## 5. File ownership

| Path | Builder | Auditors |
|---|---|---|
| everything under `skills/`, `templates/`, `adapters/`, `scripts/`, `README.md` | orchestrator session (builder role) | child sessions (never the builder) |
| `build-record/memos/`, `build-record/audits/` | child sessions write; orchestrator saves word for word | — |
| `skills/hinshitsu/example/` deliverable | orchestrator session (builder role) | child sessions |

## 6. Work units

| WU | Content | Status |
|---|---|---|
| WU-1 | `GLOSSARY.md`, `SKILL.md` | pending |
| WU-2 | 4 templates, 2 scripts | pending |
| WU-3 | 7 adapters | pending |
| WU-4 | example deliverable and `EXAMPLE.md` | pending |
| WU-5 | `README.md`, `CHANGELOG.md` | pending |

## 7. Dependency graph

See `CONNECTIONS.md`.

## 8. Existing implementations checked before creating

| Looked for | Where | Result |
|---|---|---|
| A skill named long-session-hygiene (Kimi) | CatCorner22 repositories, GitHub code search, local plugin cache | Not found. Relative found: `muse-long-session-hygiene` (plugin muse-guardrails 1.0.0) |
| A skill named living-reference (Kimi) | same | Found for Claude and ChatGPT, not Kimi: `Refined_Keep_Skills/.claude/skills/living-reference/SKILL.md`. It governs a legal outline file, a different job from section 7 |
| An existing hinshitsu skill | `CatCorner22/devin` (empty), GitHub code search | Not found |
| Related user skills | `Refined_Keep_Skills`: completion-evidence-gate, backward-review-gate, context-budget-governor | Read for conventions; not imported |
