# Testing

All commands run from the repository root and need Python 3 only.

| Command | What it tests | What it does not test |
|---|---|---|
| `python3 -m unittest discover -s tests` | the gauge, the run checker and the lint script, against fixtures | that any skill produces good work |
| `python3 scripts/lint.py` | form: required files, frontmatter, size limits, section order, rule numbering, defined terms, banned words, adapter links, manifest keys | that any rule is sound |
| `python3 scripts/hinshitsu_check.py --stage plan\|unit\|delivery <run-folder>` | the form of a run's record at that stage | that any check in the record ran |
| `python3 skills/hinshitsu-gauge/scripts/gauge.py <run-folder>` | draws `GAUGE.svg` and prints the text gauge from `AUDIT-LOG.md` | that the logged stages did what they say |

A passing exit code from any of these is evidence of form only. Evidence that a run happened is in the run's `audits/` and `memos/` folders: each report opens with an identifier the platform issued for the sub-agent that wrote it.
