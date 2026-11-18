# Changelog

Rule 20.3 requires 1 entry for each amendment of a skill. Newest first.

## 2.0.0 — 2026-11-18

First published version: 7 skills, 2 plugin manifests, 7 adapters, 2 scripts, templates, 1 worked example.

Amendments made after the independent review of the finished set (`build-record/audits/post-build-red-cell.md`, `post-build-auditor.md`, `cold-start.md`). No independent session has reviewed these amendments.

- Rule 0.1: the probe runs first; the `CAPABILITY` entry is the first log entry and the probe's `LAUNCH` entry the second. Part (g) now records what else the runtime showed the probe.
- Rule 0.2: the probe's scope also asks what else the runtime showed it; rule 1.6 does not apply to the probe file.
- Rule 0.3: a USER who refuses SUB-AGENT runs on a capable runtime gets a DEGRADED run.
- Rule 0.5: a change that cannot be counted is `FULL`; a `CORE` run has a path to DONE.
- Rule 0.9 (new): a budget of SUB-AGENT runs, stated on the S6 card; no run past it without the USER. The former rule 0.9 is rule 0.10.
- Rule 1.5: the scope is saved before the start; the `LAUNCH` entry is written 1 time, when the identifier returns; its 5 fields are named.
- Rule 14.3: an exit for a BLOCKER about an act of the run that no change can undo.
- Rule 14.6 (amended during the example run, on the USER's answer "A"): a wrong line in a record file is a DEFECT closed by a script check.
- Rule 16.7: the AUDITORS of the real WORK UNIT fill the ledger; extra AUDITORS inspect the copy with the planted defect.
- Each of the 6 other skills tells the reader to read sections 0 and 1 of the conductor and the glossary first.
- Glossary: AUDITOR includes the re-auditor and the final AUDITOR; STAGE points at the Run sequence table.
- Adapters: a copy of the skill folders alone is no longer described as an install; 3 claims that the cited pages do not state are marked UNVERIFIED.
- Checker: rejects the identifier `none`, a `DEGRADED` first line without a DEGRADED mode, a ledger with no row, and CRITERION rows written in code marks; the delivery stage runs the record check; paths no longer depend on the working directory; the `Totals` table is not read as ledger rows; an empty field counts as missing.
- Gauge: a later `start` re-opens a STAGE; the stop bar shows a count and the first 4 IDs.
- Manifests: version 2.0.0, the same as the conductor.
