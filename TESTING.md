# Testing

All commands run from the repository root and need Python 3 only.

| Command | What it tests | What it does not test |
|---|---|---|
| `python3 -m unittest discover -s tests` | the gauge, the run checker and the lint script, against fixtures | that any skill produces good work |
| `python3 scripts/hinshitsu_check.py --record <run-folder>` | that `SESSION-STATE.md`, `FRAMEWORK.md` and `MINDMAP.md` agree with the log on 4 things: the state of each FINDING, the newest `CRITERIA` entry, the STAGE that runs, and 1 line for each FINDING in the mind map | that the log is true, or any other fact in those files |
| `python3 scripts/hinshitsu_log.py add <run-folder> <TYPE> …` and `… state <run-folder>` | writes 1 log entry with its number and clock time, refusing an entry the rules forbid; rebuilds the tested parts of the state files from the log | that an entry is true |
| `python3 scripts/lint.py` | form: required files, frontmatter, size limits, section order, rule numbering, defined terms, banned words, adapter links, manifest keys | that any rule is sound |
| `python3 scripts/hinshitsu_check.py --stage plan\|unit\|delivery <run-folder>` | the form of a run's record at that stage | that any check in the record ran |
| `python3 skills/hinshitsu-gauge/scripts/gauge.py <run-folder>` | draws `GAUGE.svg` and prints the text gauge from `AUDIT-LOG.md` | that the logged stages did what they say |

A passing exit code from any of these is evidence of form only. Evidence that a run happened is in the run's `audits/` and `memos/` folders: each report opens with an identifier the platform issued for the sub-agent that wrote it.

## What "0 failures" means

`python3 scripts/hinshitsu_check.py --stage delivery <run-folder>` tests paperwork. It never opens the product.

**It tells you** that the record files exist; that the log's entries are numbered in order, with times that do not run backwards; that each planning entry exists and stages 1 to 11 each ended or were skipped with a reason; that the criteria carry a quoted approval; that each sub-agent launch has a scope file and a report whose first line holds the launch's identifier and whose file name holds the launch's entry number; that every file under `audits/` and `memos/` belongs to a launch; that each finding has its fields and at most 1 closing entry, and a fix was re-audited by a later sub-agent; that each PASS in the ledger cites a report with a launch entry or a file under `evidence/`; that each sentence under the first 2 labels of the report's Summary ends in a citation; and that the launches stayed inside the budget the USER approved. Where the report says `DONE`, it also tells you that no finding is open, that every criterion row holds a PASS and no FAIL or UNVERIFIED, that the run was not DEGRADED, and that the newest final audit ends in the verdict "passed".

**It does not tell you** that the product works; that any audit, test or sub-agent ran; that an approval in quotation marks is yours; or that a report says what the log says it says. A person or an agent can type every file by hand, with made-up identifiers, and get 0 failures. The guard against that is you: open the session links in the report's first section and compare. `DONE` needs your statement that you did (glossary, DONE part 7).

**Known limits of the script** (from the independent code review, `build-record/audits/round3-code-review.md`): the final auditor is told to run this command before its own report exists, when the command cannot print 0 (bug 23); the placeholder test finds 2 forms of placeholder only (bug 24); a PASS that cites a file under `evidence/` cannot be tied to an auditor by form (bug 25, in part).

