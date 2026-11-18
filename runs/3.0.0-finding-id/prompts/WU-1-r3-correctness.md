# Role scope — Correctness auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Test each CRITERION against the DELIVERABLE. Run every test the CRITERIA name. Read every function and every branch (each `if`, `else`, `case`, loop exit, error path and early return) and state for each whether it does what the CRITERIA require. Hunt for wrong results, missing behavior and behavior nobody asked for.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: repository `CatCorner22/devin` on GitHub, branch `devin/hinshitsu-run-3.0.0`. Files: `skills/hinshitsu-gauge/SKILL.md` (whole; the change is at lines 15 and 16), `skills/hinshitsu-gauge/scripts/gauge.py` (whole; the change is at lines 31 and 83 to 89), `tests/test_gauge.py` (whole; the added tests are at lines 59 to 93 and 165 to 191) and `scripts/hinshitsu_check.py` (lines 85 to 94 and 306 to 317; the change). The change is `git diff a3717b1 1ce96d3806ca886d4749660e07e94074c4cb87c7 -- skills tests scripts`. Files those files reference: `scripts/lint.py`, `tests/test_check.py`.
- Commit under review: 1ce96d3806ca886d4749660e07e94074c4cb87c7
- A FINDING to re-run, written by another AUDITOR on commit 894fd4fe3580bfeb9a0d9e66396444287d73bf0f. Run its trigger on the commit under review and report, with EVIDENCE, whether it still reproduces, that is, whether any statement of section 24 of `skills/hinshitsu-gauge/SKILL.md` is false of what the script does: "Where: `skills/hinshitsu-gauge/SKILL.md`, section 24, item 2 and item 3. Trigger: probe P1. Write a log with 1 S7 start entry and 3 FINDING entries of class BLOCKER with the IDs `F-1.`, `blocker one` and no ID line. Run `python3 skills/hinshitsu-gauge/scripts/gauge.py <folder>`. The text gauge and `GAUGE.svg` hold no `STOPPED`. At a3717b1 the same log gives `STOPPED — blocker open: 2: F-1., blocker one`. Violates: glossary, BLOCKER part (d) (a statement in the DELIVERABLE is false); rule 24.2 and rule 24.3 as written."
- CRITERIA, word for word from entry E-21:

A "refused ID" means: the entry has no `- ID:` line, or the line is empty, or the first word of the ID field does not fully match `F-<digits>`. This is the test in `scripts/hinshitsu_check.py`, lines 299 to 306.
- C1: `gauge.py` counts each FINDING entry with a refused ID, whatever its class, as 1 entry it could not read. Test: `python3 -m unittest tests.test_gauge -v` — tests in which a log with the IDs `F-1.` and `blocker one` (and 1 with no ID line) gives `unread` equal to the number of such entries, and the text gauge prints "<n> entries could not be read".
- C2: a FINDING entry with a refused ID does not appear in the `STOPPED — blocker open` line of the text gauge nor in `GAUGE.svg`, and a log whose only BLOCKERS have refused IDs prints no STOPPED line. Test: `python3 -m unittest tests.test_gauge -v` — tests that run the script on such a log and read both outputs.
- C3: the gauge and the checker agree: for each ID field in a list that holds at least `F-1`, `F-12`, `F-3 (local 2)`, `F-1.`, `blocker one`, `f-1`, `F-`, `F-1a` and ` F-2`, the gauge lists the BLOCKER when, and only when, `hinshitsu_check.FINDING_ID` fully matches the first word. Test: `python3 -m unittest tests.test_gauge -v` — 1 test that imports both modules and compares them on the list.
- C4: nothing else changes: a BLOCKER with an ID of the form `F-<n>` is shown and is cleared by its RESOLUTION as before; every test that passed at commit a3717b1 passes; `gauge.py` imports only the standard library. Test: `python3 -m unittest discover -s tests` exits 0 and `python3 scripts/lint.py` prints 0 failures; `git diff a3717b1 -- tests/test_gauge.py` removes or changes no existing test line.
- C5: `tests/test_gauge.py` holds the new tests named in C1 to C3, and each of them fails when run against `gauge.py` of commit a3717b1. Test: the correctness auditor checks out `gauge.py` of a3717b1 beside the new tests and saves the failing output under `evidence/`.
- C6: the change is on the branch `devin/hinshitsu-run-3.0.0` only; `main` on GitHub stays at a3717b1 and no pull request exists. Test: `git ls-remote origin main` and `gh pr list --head devin/hinshitsu-run-3.0.0 --state all`.

- Glossary: `skills/hinshitsu/GLOSSARY.md`

## Report

Write 1 report, in Markdown, in this order:

1. First line: the identifier that your runtime gave this run (session ID, task ID or agent ID). If you cannot read it, write `identifier: not visible to me`.
2. `## Scope received` — this scope, word for word.
3. `## Examined` — each file with line ranges, each command you ran with its complete output, each page you opened with what you did.
4. `## Findings` — number them 1, 2, 3. For each: **Class** (BLOCKER, DEFECT, FRAGILITY or STYLE, as `GLOSSARY.md` defines them); **Where** (file and line, or artifact and heading); **Trigger** (the exact steps, input or command that reproduce it, and what appears); **Violates** (the CRITERION ID or the rule number); **Proposed fix**.
5. `## Not examined` — what you did not examine, and why.

## Limits

- You did not build this work. Do not change the DELIVERABLE or any file in the RUN FOLDER; propose each fix in your report.
- Read only the files this scope names, and files those files reference.
- Report what you observed. Do not report a check that you did not run. A check that you cannot run is UNVERIFIED, with the reason.
- If you find nothing, say so, and list under `Examined` what you checked. Do not invent a finding and do not withhold one.

## How to return the report

Send the whole report as your final message in this session, and attach the same text as 1 Markdown file. Do not push to the repository and do not open a pull request.
