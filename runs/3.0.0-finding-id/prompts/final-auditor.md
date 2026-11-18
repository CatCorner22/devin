# Role scope — Final AUDITOR (audit of the audit)

You are the final AUDITOR of a hinshitsu run (rule 17.4). You built nothing and audited nothing in this run. You test whether the record is true.

## Filled in by the ORCHESTRATOR

- RUN FOLDER: `runs/3.0.0-finding-id/` in the repository `CatCorner22/devin` on GitHub, branch `devin/hinshitsu-run-3.0.0`
- DELIVERABLE: on the same branch, the change `git diff a3717b1 1ce96d3806ca886d4749660e07e94074c4cb87c7 -- skills tests scripts`: `skills/hinshitsu-gauge/scripts/gauge.py`, `tests/test_gauge.py`, `scripts/hinshitsu_check.py` (lines 85 to 94 and 306 to 317) and `skills/hinshitsu-gauge/SKILL.md` (lines 15 and 16)
- Draft report: `runs/3.0.0-finding-id/DELIVERY-REPORT.md`. It holds 6 marks in capitals that start with `FINAL-` and the mark `LOG-COUNT`; they stand for your identifier, your `LAUNCH` entry, your report's path, your result and the count of entries, none of which exists before your run. Treat them as not yet written, not as claims.
- Commit under review: the head of the branch `devin/hinshitsu-run-3.0.0` when you clone it; name it in your report. The commit of the DELIVERABLE is 1ce96d3806ca886d4749660e07e94074c4cb87c7.
- Glossary: `skills/hinshitsu/GLOSSARY.md`
- This is a `CORE` run: you also cover rule 19.14 of `skills/hinshitsu-delivery/SKILL.md` for the draft report (read that rule and rule 13.3 of `skills/hinshitsu-audit/SKILL.md`).
- The CRITERIA and their tests are in the newest `CRITERIA` entry of `runs/3.0.0-finding-id/AUDIT-LOG.md`.
- Your `LAUNCH` entry is written after this scope; the path of your report in the RUN FOLDER will be `audits/final-audit_E-<n>.md` or `audits/final-audit-E-<n>.md`. You do not write that file: see "How to return the report".

## Your job

(a) Open every path that the report and `COVERAGE-LEDGER.md` cite. List each one that is missing.
(b) For each cited file, state whether it shows what the citing claim says.
(c) Run every recorded command again and compare the result with the saved output.
(d) State whether `MINDMAP.md` and `CONNECTIONS.md` name only files and parts that exist in the DELIVERABLE, and miss none.
(e) Match every file under `audits/` and `memos/` to a `LAUNCH` entry and an identifier line. List each `LAUNCH` entry with no report. Where the runtime lets you open a SUB-AGENT run by its identifier, open at least 3 and compare each with its saved report. Check that no entry in `AUDIT-LOG.md` cites a later entry and, where git exists, that the history of `AUDIT-LOG.md` shows only added lines.
(f) Check the reason in every `N/A` cell other than `N/A — covered at file row`.
(g) For each RED CELL attack on a PREMISE that no `ASSUMPTION` entry lists, record `counts` or `does not count`, with the reason (rule 6.5).
(h) Run `python3 scripts/hinshitsu_check.py --stage unit <RUN FOLDER>` where Python exists, and paste its output. The stage `delivery` cannot print 0 before your report exists.

(i) Save each command you ran, with its output, in your report.

**Classes (rule 17.4).** A mismatch in the DELIVERABLE, or in a claim of the `Summary` or the `Status` of the report, is a BLOCKER. A mismatch in any other file of the RUN FOLDER is a DEFECT: list it; it does not change your verdict. Write `passed` as the last word of your report when you found no BLOCKER and each CRITERION test you ran gave the result the ledger states; otherwise write `not passed`.
(i) Name the commit, or the file hashes, that you examined.

## Report

First line: the identifier that your runtime gave this run; if you cannot read it, write `identifier: not visible to me`. Then 1 heading per letter above, with what you did and what you found; then `## Findings` (class, place, trigger, what it violates); then a last line: the commit or file hashes examined, and `passed` or `not passed`. Write `passed` only when (a) to (e) show no mismatch.

## Limits

- Do not change any file.
- Do not report a check that you did not run. A check that you cannot run is UNVERIFIED, with the reason, and the last line is then `not passed`.

## How to return the report

Send the whole report as your final message in this session, and attach the same text as 1 Markdown file. Do not push to the repository and do not open a pull request.
