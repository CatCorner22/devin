# FRAMEWORK — Mermaid edge forms in the CONNECTIONS.md label check

Form required by section 7 (`skills/hinshitsu-record/SKILL.md`). A superseded line is marked `(superseded <date> → <ID>)` and stays. IDs are assigned once and never reused.

## 1. CRITERIA

No `CRITERIA` entry exists yet (S2). (superseded 2026-11-18 → E-16)

See `AUDIT-LOG.md` entry E-16 (`CRITERIA`, `PROPOSED`: C1 to C7) and each later `CRITERIA` or `CRITERIA-CHANGE` entry. Those entries control.

## 2. Architecture decisions

| ID | Decision | Log entry |
|---|---|---|
| — | none yet (superseded 2026-11-18 → D-1) | — |
| D-1 | Test the first arrow link on each line that starts with a node name; arrow, thick arrow and dotted arrow; a label is `|text|` after the link or text between the 2 halves of the link | E-14 |
| D-2 | The failure message names the arrow as written | E-15 |

## 3. Naming conventions

- Python 3, standard library only (`TESTING.md`). Tests are `unittest` methods named `test_<what>_<passes or fails>` in the class `Check` of `tests/test_check.py`.
- A checker failure is 1 string added through `err(...)`, starting with the file name and ending with the rule in brackets, for example `CONNECTIONS.md: edge A --> B has no label (rule 9.3)`.
- The spelling in existing code and tests is "unlabeled"; the USER's message writes "unlabelled". New test names follow the existing code.

## 4. Contracts

| Provider | Consumer | What is promised |
|---|---|---|
| `scripts/hinshitsu_check.py` `check(folder, stage)` | `tests/test_check.py` | returns a list of failure strings; an unlabeled edge in `CONNECTIONS.md` gives a string that holds `no label` |
| `scripts/hinshitsu_check.py` `main(argv)` | a run's ORCHESTRATOR and final AUDITOR | exit code 0 when `check` returns no failure, 1 when it returns any, 2 on a usage or read error |
| Mermaid flowchart syntax | `scripts/hinshitsu_check.py` | the link forms and label forms recorded in `evidence/mermaid-flowchart-links.txt` |

## 5. File ownership

| Path | BUILDER | AUDITORS |
|---|---|---|
| `scripts/hinshitsu_check.py` | ORCHESTRATOR | correctness auditor; final AUDITOR |
| `tests/test_check.py` | ORCHESTRATOR | correctness auditor; final AUDITOR |
| `runs/2.1.0-mermaid-edges/` | ORCHESTRATOR (record); each SUB-AGENT (its report, saved by the ORCHESTRATOR) | final AUDITOR |

## 6. WORK UNITS

| ID | Content | Status | LENS memo | Swarm reports |
|---|---|---|---|---|
| WU-1 | the unlabeled-edge test in `scripts/hinshitsu_check.py` and its tests in `tests/test_check.py` | pending | none — `CORE` run (rule 0.5) | `audits/WU-1-*.md` |

## 7. Existing implementations checked

| Looked for | Where | Result |
|---|---|---|
| any other code that parses Mermaid edges or tests edge labels | `scripts`, `skills`, `tests`; command and output in `evidence/existing-implementations.txt` | found only at `scripts/hinshitsu_check.py:287-288` (the code to fix) and its test `tests/test_check.py:208`; no second implementation |
