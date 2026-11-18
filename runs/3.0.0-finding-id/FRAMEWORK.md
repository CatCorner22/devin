# FRAMEWORK — gauge counts a FINDING whose ID is not F-<n> as unread

Form required by section 7. IDs are assigned once and never reused.

## 1. CRITERIA

See the newest `CRITERIA` entry of `AUDIT-LOG.md`, named in the block at the end of this file, and each later `CRITERIA-CHANGE` entry. Those entries control.

## 2. Architecture decisions

| ID | Decision | Log entry |
|---|---|---|
| (none yet) | | |

## 3. Naming conventions

- FINDING ID: `F-<n>` (rule 9.5). Entry: `E-<n>`. Tests in `tests/test_gauge.py`: methods `test_<what_is_true>` in the classes `ReadState` (calls `gauge.read_state`) and `Output` (runs the script).
- `gauge.py` uses the standard library only and reads only `AUDIT-LOG.md` (its docstring; rule 24.2).

## 4. Contracts

| Provider | Consumer | What is promised |
|---|---|---|
| `AUDIT-LOG.md` `FINDING` entry | `gauge.py` `read_state` | lines `- ID: F-<n>` and `- Class: <class>` |
| `gauge.py` `read_state` | `text_gauge`, `svg_gauge` | a dict with `blockers` (IDs of open BLOCKERS) and `unread` (count of entries not read) |
| `scripts/hinshitsu_check.py` (line 85 and lines 299 to 306) | `gauge.py` | the test of a FINDING ID that the gauge must agree with: the first word of the ID field fully matches `F-\d+` |
| `gauge.py` | `tests/test_gauge.py` | `read_state(text)`, the printed text gauge, `GAUGE.svg` |

## 5. File ownership

| Path | BUILDER | AUDITORS |
|---|---|---|
| `skills/hinshitsu-gauge/scripts/gauge.py` | ORCHESTRATOR as BUILDER (rule 1.4) | correctness auditor; final AUDITOR |
| `tests/test_gauge.py` | ORCHESTRATOR as BUILDER | correctness auditor; final AUDITOR |
| `runs/3.0.0-finding-id/**` | ORCHESTRATOR | final AUDITOR |

## 6. WORK UNITS

| ID | Content | Status | LENS memo | Swarm reports |
|---|---|---|---|---|
| WU-1 | `gauge.py`: the FINDING branch of `read_state`, with its tests in `tests/test_gauge.py` | pending | N/A — CORE | `audits/WU-1-*.md` |

## 7. Existing implementations checked

Command and output: `evidence/existing-implementations.txt`.

| Looked for | Where | Result |
|---|---|---|
| a test of the form of a FINDING ID | `scripts/*.py`, `gauge.py`: `grep -n 'FINDING_ID\|F-\\d'` | found at `scripts/hinshitsu_check.py:85` (`FINDING_ID = re.compile(r"F-\d+")`), used at lines 299 to 306 on the first word of the ID field |
| whether `gauge.py` imports from `scripts/` | `grep -n 'import\|^def '` | it does not: it imports `math`, `re`, `sys`, `pathlib` only and holds its own `field` and `entries` |
| a count of unread entries | `grep -n 'unread\|could not be read'` | found: `read_state` keeps `unread`; `text_gauge` prints it; 1 test covers it |

<!-- from the log: start -->
Rebuilt by `scripts/hinshitsu_log.py state`. Do not edit between the marks.
- Newest CRITERIA entry: none
<!-- from the log: end -->
