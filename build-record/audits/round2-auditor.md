devin-b2f609ee7df940a2911efd2d9cbe6ce5

# AUDITOR report: hinshitsu skill set, after amendments

## Examined

- Repository `CatCorner22/devin`, commit `874ffb27d26f9eac7eaabf6b580dbed37e6080a1`, in a detached git worktree. `git ls-remote origin main` gives the same commit.
- I changed no tracked file. `git status --short` printed nothing after the last run. The unit-test command wrote 3 `__pycache__` folders (git-ignored); I deleted them. My scratch files are outside the repository.
- Read whole: the 7 `SKILL.md` files, `GLOSSARY.md`, `EXAMPLE.md`, `CHANGELOG.md`, `README.md`, `TESTING.md`, `build-record/AUDIT-LOG.md` (E-001 to E-019), `build-record/DELIVERY-REPORT.md`, `build-record/BRIEF.md`, `build-record/audits/post-build-auditor.md`, `scripts/hinshitsu_check.py`, `scripts/lint.py`, `gauge.py`, `adapters/devin.md`, both manifests, `templates/SESSION-STATE.md`, `templates/roles/seeder.md`, `templates/roles/final-auditor.md`.
- Read in part: `templates/AUDIT-LOG.md` (lines 1 to 40, 98 to 110), the other 6 adapters (capability table of `cursor.md`; every `Install` section; every line with `UNVERIFIED`), `tests/test_check.py` (lines 1 to 125), `build-record/audits/cold-start.md` (first 30 lines and all headings), the example log (parsed whole by script; 12 entry bodies and E-380 to E-387 read), the example `DELIVERY-REPORT.md` (lines 1 to 40).
- Own scripts: frontmatter, size and section count (C2, C13); glossary definitions and capitalized terms (C3); banned words with inflected forms, quotations kept (C4); every `rule n.m`, `section n` and backticked path (381 references); a rule-by-rule diff of the 7 skills between `18cbe7e` and `874ffb2`; a parser of the example log (entries, FINDINGS, closings, `LAUNCH` entries).
- 22 URLs from the adapters and manifests fetched with `curl` on 2026-11-18: all HTTP 200. I searched each page for the key words of the claims; I did not read each page whole.
- `skills/hinshitsu/example/run/GAUGE.svg` rendered in headless Chrome at 900 by 460 and viewed.

### The 5 commands, complete output

```text
$ python3 -m unittest discover -s tests
...............................hinshitsu check: test the form of a run's record.

Usage: hinshitsu_check.py [--stage plan|unit|delivery] <run-folder>
       hinshitsu_check.py --record <run-folder>   (state files against the log, rule 14.6)
Exit 0 when every check for the stage passes, 1 when any fails, 2 on a usage error.
Standard library only. Same folder in, same verdict out.

This script tests the shape of the record: that entries, citations, cells and
files exist and agree with each other. It does not prove that any check ran or
that any report is true (rule 17.7).
...............................
----------------------------------------------------------------------
Ran 62 tests in 1.183s

OK
hinshitsu_check (record): 0 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
FAIL MINDMAP.md:1: calls F-1 closed; the log holds no closing entry (rule 14.6)
hinshitsu_check (record): 1 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
[exit 0]

$ python3 scripts/lint.py
lint: 0 failure(s). This script tests form; it does not prove that any rule is sound.
[exit 0]

$ python3 scripts/hinshitsu_check.py --record skills/hinshitsu/example/run
hinshitsu_check (record): 0 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
[exit 0]

$ python3 scripts/hinshitsu_check.py --stage delivery skills/hinshitsu/example/run
hinshitsu_check (delivery): 0 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
[exit 0]

$ python3 skills/hinshitsu-gauge/scripts/gauge.py /home/ubuntu/audit/runcopy   (a copy of skills/hinshitsu/example/run outside the repository)
hinshitsu gauge  [########################] 100%  12 of 12 stages complete
All 12 stages have an end entry. This is the log's state, not proof of DONE.
STOPPED - blocker open: F-90, F-98, F-102, F-103, F-137, F-138, F-141, F-149, F-153, F-154, F-155, F-156, F-157, F-158, F-159
  [x] S1  Capability and tier            hinshitsu
  [x] S2  Record set up                  hinshitsu-record
  [x] S3  Customer voice and gap list    hinshitsu-baby-bird-plan
  [x] S4  Assumptions and criteria       hinshitsu-baby-bird-plan
  [x] S5  Lenses and red cell            hinshitsu-challenge
  [x] S6  Reconcile and freeze           hinshitsu-baby-bird-plan
  [x] S7  Build and audit                hinshitsu-audit
  [x] S8  Recipient and stability checks hinshitsu-audit
  [x] S9  Pre-delivery red cell          hinshitsu-challenge
  [x] S10 Audit of the audit             hinshitsu-delivery
  [x] S11 Delivery report                hinshitsu-delivery
  [x] S12 Lessons                        hinshitsu-delivery
  x done   - skipped   > running   (blank) pending
[exit 0]

```

The usage text and the 3 `hinshitsu_check (record)` lines inside the unit-test output are printed by the tests themselves. The gauge run left `GAUGE.svg` in the copy byte-identical to the committed file (same SHA-256, `51ba1be2…`).

## Result for each CRITERION

E-019 quotes the USER's approval, so C1 to C15 are frozen as E-005 to E-014 state them.

| CRITERION | Result | What I ran or opened |
|---|---|---|
| C1 | PASS | `git ls-files`: every file E-013 and E-014 list exists, with the 7th skill and both manifests. |
| C2 | PASS | Own script: 7 `name` values equal the folder names, 2 frontmatter keys each, sections 0 to 24 each 1 time, rule numbers 1..n in every section. I read all 25 sections against the section list in `BRIEF.md`. 1 note carried over: the brief says the report "opens with a plain-language summary"; rule 19.2 puts `Check it yourself in 5 minutes` first. |
| C3 | PASS on the test as written; DEFECTS on use | Own script: 33 definitions, 0 duplicates, the 13 named terms present. Every other capitalized token in the skills is a plural of a defined term, a log-entry type, a literal value or an acronym. Findings 18 and 20. |
| C4 | PASS | Own regex with inflected forms, quotations kept. Skills, glossary, `EXAMPLE.md`: 12 hits, all in the ban list. Templates: 12 hits, all in the ban list quoted in `roles/auditor-language.md`. Adapters, README, TESTING, CHANGELOG, manifests, 7 top-level example files, 2 HTML files: 0 hits. Example scopes: 24 hits, all in 2 copies of that quoted list. `LICENSE`: 2 hits ("shall"), the standard MIT text. 53 hits sit in 4 SUB-AGENT reports, which are other parties' words. "must" and "may": finding 20. |
| C5 | FAIL | My diff shows 10 rules changed since `18cbe7e` (0.1, 0.2, 0.3, 0.5, 0.9, 0.10, 1.5, 14.3, 16.7, 21.1). 12 of the 13 rules the earlier AUDITOR listed keep their untestable text. The amendments add more. Findings 1, 8, 9. |
| C6 | PASS, with 2 DEFECTS | All 7 adapters name `skills/hinshitsu/SKILL.md`, hold a table and a date line, and hold no numbered rule; 6 open with the UNVERIFIED line and `devin.md` cites a smoke run. The 3 claims of the earlier finding 6 are now marked UNVERIFIED. 22 URLs return 200 and hold the key words I searched for. Findings 11 and 19. Limit: I did not read every cited page whole. |
| C7 | PASS on the checker test; identifiers UNVERIFIED | `hinshitsu_check.py --stage delivery` exits 0. The log ends at E-387 (S12 end). `audits/final-audit-E-374.md` exists and ends "not passed"; `EXAMPLE.md` says so. Every path `EXAMPLE.md` cites exists. 2 of its citations point at the wrong report: finding 16. I opened no session link. |
| C8 | FAIL | `python3 scripts/hinshitsu_check.py build-record` exits 1 with 54 failures. `ls build-record` shows no `MINDMAP.md`, `COVERAGE-LEDGER.md` or `SESSION-STATE.md`. Finding 2. |
| C9 | PASS, in my checkout only | `git -C ~/repos/precog status --porcelain -- .claude/skills/precog-verify .claude/skills/precog-personas` prints nothing; the newest commit on those paths is `49301be8`, 2026-11-09, before this build. |
| C10 | PASS at this commit | `git ls-remote origin main` gives `874ffb2`. Branch `devin/hinshitsu-build` is at `7ba8155`, ahead of `main`; I did not examine those commits. |
| C11 | PASS | Rules 23.1 to 23.10 against (a) to (h) of E-005. `GAP` entries exist in both logs (example E-9 and E-53; build E-003). |
| C12 | FAIL on the test as written; substance UNVERIFIED at this commit | The test names a "saved transcript in the example folder". `find skills/hinshitsu/example -iname '*cold*'` finds nothing; the transcript is `build-record/audits/cold-start.md`. It records a run on `18cbe7e`, before rules 0.1 and 0.2 changed. In it the `CAPABILITY` entry is E-1 and the `GAP` entry is E-13, before any build. The scope gave the agent the whole repository, not "only the skills, the glossary and a 1-line task". |
| C13 | PASS | Own script: largest `SKILL.md` 14,307 bytes and 87 lines; longest `description` 1,016 characters. |
| C14 | PASS | 62 unit tests pass. 2 gauge runs on the same log write the same bytes. Rules 0.8 and 24.1 require the run. In Chrome the red bar now shows its words inside the box: "STOPPED - blocker open: 15: F-90, F-98, F-102, F-103 ...". STYLE points in finding 20. |
| C15 | UNVERIFIED | Both manifests parse. Root `plugin.json` meets the schema I fetched from agent-plugins.org (required `$schema` and `name`; no extra key). No install ran on any surface; `adapters/devin.md` now says so. |

## Re-run of earlier findings

Setup for each T trigger: the fixture `good_run()` of `tests/test_check.py`, built under `/tmp`, with `PYTHONDONTWRITEBYTECODE=1`.

| # | Earlier finding | Result | What I ran |
|---|---|---|---|
| 1 | `main` behind the work (C10) | NO LONGER REPRODUCES | `git ls-remote origin main` = `874ffb2`. |
| 2 | `build-record/` fails the checker (C8) | REPRODUCES | Checker exits 1, 54 failures (37 before); the 3 files are still absent. |
| 3 | Example S10 to S12 stated as done, not run | NO LONGER REPRODUCES | Delivery check exits 0; `audits/final-audit-E-374.md` exists; last entry E-387. |
| 4 | No cold-start transcript | REPRODUCES IN PART | The transcript exists under `build-record/audits/`, not under the example folder that C12 names. |
| 5 | 13 untestable rules (C5) | REPRODUCES for 12 | Rule diff: only 0.1(g) of the 13 was replaced. Rule 16.7 changed, yet its last sentence still names no actor. |
| 6 | 3 adapter claims not on the cited page | NO LONGER REPRODUCES | `devin.md` rows 3 and 4 and `cursor.md` row 3 now read UNVERIFIED. |
| 7 | BLOCKER classes | REPRODUCES | The glossary still lists 5 parts. Rules 1.7 and 9.8 fit none; rules 17.4, 18.4 and 21.5 still say "class (d)". |
| 8 | AUDITOR used outside its definition | REPRODUCES IN PART | The definition now covers the re-auditor and the final AUDITOR. The status table still says "the AUDITOR that judges its attack under rule 6.5"; rule 6.5 lets a LENS SUB-AGENT judge. |
| 9 | Report names in rules 5.3 and 6.2 lack the `LAUNCH` ID | REPRODUCES | Both rules and `templates/DELIVERY-REPORT.md` lines 50 and 51 are unchanged. |
| 10 | Cross-references 1 to 4 and 6 | REPRODUCES for 2 of 5 | Fixed: STAGE, the count in 0.1(g), `CHANGELOG.md`. Open: rule 0.10 says "a runtime that this rule does not name" (the names are in rule 0.1(a)); rule 17.4 and the final-auditor role hold no duty to read record-fault `RESOLUTION` entries (rule 14.6). |
| 11 | Template lines, cross-references 7 to 13 | REPRODUCES for 6 of 7 | `git diff --stat 18cbe7e 874ffb2` lists no file under `templates/`. Open: 3 verdicts in `red-cell.md`; "Current WORK UNIT" without the STAGE; no who-decided column; 5 entry types without a sample; `D-001` and `F-001`; the seeder receives the copy. Fixed in the checker: the `Totals` table. |
| 12 | T1, T2: empty field takes the next line | NO LONGER REPRODUCES | Both exit 1 with the right message. |
| 13 | T3: `F-1` found inside `F-10` | NO LONGER REPRODUCES | Exit 1: "open FINDING F-1 is not listed". |
| 14 | T4: `DEGRADED` first line in a `SWARM` run | NO LONGER REPRODUCES | Exit 1, 2 failures. The fix created finding 10. |
| 15 | T5, T6: `not passed`, or a `FAIL` row, with Status `DONE` | REPRODUCES | Both exit 0. |
| 16 | T7, T8: inflected banned words; `prompts/` unread | REPRODUCES | "ensures", "tries to", "tried to" in `FRAMEWORK.md` exit 0 (control with "should" exits 1). Banned words and steering in a scope exit 0. |
| 17 | T9, T10: Mermaid arrow forms | REPRODUCES | `A ==> B` and `C -.-> D` exit 0; `A -- reads --> B` fails as unlabeled. |
| 18 | T13: `--record` tests 4 things | REPRODUCES | A missing artifact, `C99`, `WU-7` and an unlogged `D-77` exit 0. |
| 19 | T12: verdict depends on the working directory | NO LONGER REPRODUCES | Same failure from the repository root and from `/tmp`. The fix created finding 15. |
| 20 | T16: gauge ignores a later `start` | NO LONGER REPRODUCES | S5 shows `[>]` and "Now: S5". |
| 21 | Stop text outside its box | NO LONGER REPRODUCES | Rendered and viewed. |
| 22 | T14, T15: tracebacks | REPRODUCES | `- ID: F-1.` gives `ValueError` (line 435); a `0xff` byte gives `UnicodeDecodeError` in both scripts. |
| 23 | Devin install line states neither a run nor UNVERIFIED | NO LONGER REPRODUCES | Line 34: "UNVERIFIED — no install was run." |
| 24 | STYLE: "may" with a thing as subject; "cannot overrule"; "8 AUDITORS"; rule 15.4 | REPRODUCES | Rules 1.9, 6.1, 13.1, 14.2, 14.4, 15.3, 15.4 and 21.6 are unchanged in the diff. |
| 25 | STYLE: versions, labels | REPRODUCES IN PART | Fixed: the version numbers; "(DONE, parts 2 and 3)". Open: S6 names `hinshitsu-baby-bird-plan` for the reconciliation of rule 5.4; `gauge.py --bogus` exits 0; "All 12 stages have an end entry" with a skipped STAGE; a hyphen where rule 24.3 writes a dash; the checker cites rule 3.3 for the freeze (rule 3.4); example E-267 cites "rule 13.6". |

## The amendments

"Shown" means the files at `874ffb2` hold the change. The templates did not change with the rules (finding 6).

| CHANGELOG item | Shown | New contradiction, broken reference or untestable rule |
|---|---|---|
| Rule 0.1 | Yes | Contradiction with rule 1.5: finding 3. "It must state" follows a sentence about 2 entries. The example log does not follow the new order, and the checker does not test it: finding 12. |
| Rule 0.2 | Yes | The checker applies rule 1.6 to the probe file: finding 5. |
| Rule 0.3 | Yes; rule 21.1 changed with it and has no CHANGELOG line | A run that follows it fails the checker: finding 10. |
| Rule 0.5 | Yes | `DONE — CORE, 1 AUDITOR` is not a form rule 19.4 lists, and the glossary now counts the final AUDITOR as an AUDITOR, so a `CORE` run has 2: finding 20. |
| Rule 0.9 (new); former 0.9 is 0.10 | Yes; all 7 adapters cite rule 0.10; no stale citation of 0.9 | Rule 23.10 does not list the budget card. No rule says what the USER's answer permits or where the new number is recorded. No script tests it. Finding 9. |
| Rule 1.5 | Yes | The field is `Commit` in the rule and `Commit under review` in the checker, the template and the example: finding 4. `hinshitsu-challenge` line 12 still says "a `LAUNCH` entry first": finding 7. |
| Rule 14.3 | Yes | The exit needs the `Summary` of the delivery report, which S11 writes; rules 14.1 and 14.2 stop forward work until the BLOCKER closes: finding 13. |
| Rule 14.6 | Yes (unchanged since `18cbe7e`) | `--record` still tests 4 things (earlier finding 18). Rule 17.4 still holds no matching duty. |
| Rule 16.7 | Yes | The "void" clause has no effect on the report that fills the ledger: finding 8. |
| 6 skills: read sections 0 and 1 and the glossary first | Yes, in all 6 | The read leaves no artifact (untestable). README still says each skill "works alone". The baby-bird line reads "Used without a conductor run, without the conductor, it still writes". Findings 1, 11, 20. |
| Glossary: AUDITOR, STAGE | Yes | Status table row unchanged (earlier finding 8). "did not build any part of it": "it" now has 3 possible antecedents. |
| Adapters | In part | `devin.md`, `chatgpt.md`, `claude-code.md` say a copy of the skill folders alone is not a supported install. `gemini.md`, `kimi.md` and `muse.md` still give "Copy the 7 folders under `skills/`" as the install. `cursor.md` has no whole-repository line. Finding 11. The 3 claims are marked UNVERIFIED. |
| Checker | Yes, each of the 8 parts (tests A1, A2, N6, T4, T11, T12, T1; delivery runs `check_record`) | `none` is rejected; `null`, `-`, `not available`, `no identifier` and `E-19` pass. Bold CRITERION IDs skip the DONE part 1 test (A4). The ancestor search: finding 15. A `--record` crash now also crashes the delivery stage: finding 14. |
| Gauge | Yes | The text gauge still prints all 15 IDs; the picture prints 4 of 15, where rule 24.3 says "with the FINDING IDs". |
| Manifests | Yes: both `2.0.0` | The conductor read "Version 2.0.0" at `18cbe7e` too. 10 rules changed and the version did not rise (rule 20.3). |

## Scripts

Each line is 1 trigger on the fixture, with the result I observed.

**Crashes (traceback, exit 1)**

- `- ID: F-1.` in a `FINDING` entry: `ValueError` at line 435, in `--record` and now in `--stage delivery`.
- `- ID: F-x`: the same `ValueError`.
- A `0xff` byte in `AUDIT-LOG.md` or in a report under `audits/`: `UnicodeDecodeError` (checker); the same in `gauge.py`.
- A `LAUNCH` entry whose `Report` path holds a 300-character file name: `OSError: [Errno 36] File name too long`.
- `chmod 000 FRAMEWORK.md`: `PermissionError`.
- `GAUGE.svg` is a folder: `gauge.py` raises `IsADirectoryError`.
- No crash: an empty log; `E-99999999999999999999999`; `Work units: 5 of 0`; `Stage: S99`; a file in place of the folder; no argument (exit 2).

**Checks the skills promise and the script does not make** (each exits 0)

- Rule 0.1: the probe's `LAUNCH` entry as the second entry. The fixture and the example have none.
- Rule 0.9: the line `Planned SUB-AGENT runs`, and the count of `LAUNCH` entries against it.
- Rule 1.5: a `LAUNCH` entry with no `Role` field.
- Rule 14.3(a): a `RESOLUTION` that cites the report that raised the FINDING as its re-audit; 2 `LAUNCH` entries that cite 1 report.
- Rule 0.7: STAGES out of order (S4 before S1); S12 is not required at the delivery stage.
- Rule 19.4: Status `DONENESS unknown` is read as `DONE`.
- DONE part 1: CRITERIA written as `- **C1.**` in the `CRITERIA` entry with no CRITERION row in the ledger.
- Rule 21.3: a `DEGRADED` run whose Status line lacks the words `DEGRADED — single-agent audit`.
- Carried over: T5, T6, T7, T8, T9, T13.

**Checks made wrongly**

- An `end` entry that names `ZZ-outside.md` fails; after `touch /tmp/ZZ-outside.md` the same folder passes. The script searches every folder above the RUN FOLDER up to `/`.
- `A -- reads --> B` fails as unlabeled (T10).
- Gauge: a BLOCKER logged as `F-1.` and closed as `F-1` stays "STOPPED - blocker open: F-1.".

## Reports

**`skills/hinshitsu/EXAMPLE.md`.** I tested its counts against the log with my parser: 387 entries, 165 FINDINGS, 68 open, 15 open BLOCKERS, 7 BLOCKERS from the plan RED CELL, 5 plan re-audits, 60 FINDINGS from 7 AUDITORS in round 1, 6 from the final AUDITOR, 3 seeds (E-171, E-249, E-267), E-268, E-348, E-89, E-90. All match. Every cited path exists. 2 citations do not show what the sentence says (finding 16). The Cold start paragraph matches `build-record/audits/cold-start.md`. The file does not say that the run predates rules 0.1, 0.9 and 16.7 as amended.

**`build-record/DELIVERY-REPORT.md`.** Matches the files: 62 tests; "SKILL SET FAILS"; 6 CRITERIA not met in the earlier report; 14,307 bytes; the 3 "Check it yourself" items (I opened items 2 and 3; I did not open the session link of item 1); C5, C8 and C15 states. Does not match: finding 17.

## Findings

1. **Class:** BLOCKER. **Where:** rules 0.4, 0.6, 1.7, 6.1, 7.3, 8.1 (last sentence), 8.2(c), 16.4, 16.7 (last sentence), 17.3 (last sentence), 17.6, 21.2; the sentence "Before acting, read sections 0 and 1 of the conductor (`hinshitsu`) and `GLOSSARY.md`" in 6 skills. **Trigger:** rule diff `18cbe7e`..`874ffb2`; then ask of each rule which file shows compliance. The new read sentence leaves no trace: rule 0.7 records a hash only for the STAGE's own skill. **Violates:** C5. **Proposed fix:** name an artifact for each, or delete the clause; for the read, add the conductor's and glossary's hashes to the first `STAGE` entry of a standalone use.
2. **Class:** BLOCKER. **Where:** `build-record/`. **Trigger:** `python3 scripts/hinshitsu_check.py build-record` exits 1, 54 failures; 3 files absent. **Violates:** C8. **Proposed fix:** write the files, or ask the USER to change C8.
3. **Class:** DEFECT. **Where:** rule 0.1 against rule 1.5. **Trigger:** read both. Rule 1.5: write the `LAUNCH` entry "before reading the report". Rule 0.1: the `CAPABILITY` entry is first and the probe's `LAUNCH` entry second, and the `CAPABILITY` entry states what the probe replied. Both cannot hold. Section 1 controls, so a compliant log opens with `LAUNCH`; with a `LAUNCH` entry placed first the checker prints "first entry is not CAPABILITY (rule 0.1)". **Violates:** C5; the precedence bullet. **Proposed fix:** in rule 1.5 except the probe, or make the probe's `LAUNCH` entry E-1 and change the checker.
4. **Class:** DEFECT. **Where:** rule 1.5; `hinshitsu_check.py` line 173; `templates/AUDIT-LOG.md` line 105. **Trigger:** in the fixture replace `- Commit under review: no git` with `- Commit: no git`: 3 failures, "LAUNCH names no commit". **Violates:** rule 1.5 as its own test. **Proposed fix:** 1 field name in the rule, the template and the script.
5. **Class:** DEFECT. **Where:** rule 0.2 ("Rule 1.6 does not apply to this file"); `hinshitsu_check.py` lines 166 to 188. **Trigger:** append a `LAUNCH` entry whose `Report` is `evidence/capability-probe.md`; put the identifier on the last line of that file: "first line does not hold the identifier of E-32 (rule 1.6)". **Violates:** rule 0.2. **Proposed fix:** require the identifier on line 1 of the probe file, or exempt that path in the script.
6. **Class:** DEFECT. **Where:** `templates/AUDIT-LOG.md` (E-1 to E-3, E-11); the 6 template lines of the earlier finding 11. **Trigger:** read. E-2 is `TIER`, not the probe's `LAUNCH`; the `CAPABILITY` sample has no line for part (g) and keeps "SUB-AGENT runs the TIER requires", the former part (g); the `TIER` sample has no `Planned SUB-AGENT runs` line. **Violates:** rules 0.1, 0.9, 9.1. **Proposed fix:** amend the template with the rules.
7. **Class:** DEFECT. **Where:** `skills/hinshitsu-challenge/SKILL.md` line 12. **Trigger:** read: "a `LAUNCH` entry first, a scope saved under `prompts/`". Rule 1.5 now saves the scope first and writes the entry when the identifier returns. **Violates:** rule 1.5. **Proposed fix:** restate the order of rule 1.5.
8. **Class:** DEFECT. **Where:** rule 16.7. **Trigger:** read. For each named role 2 AUDITORS run: 1 on the WORK UNIT, which fills the ledger, and 1 on the copy, whose report "fills no ledger cell". Only the second can miss the planted defect. "A named AUDITOR that misses it is void: its report fills no ledger cell" then changes nothing, and the rule does not say what happens to the cells the first AUDITOR filled before "a second miss makes that role's cells UNVERIFIED". The SUB-AGENT that is tested is not the one whose report is relied on. The last sentence names no actor. **Violates:** C5. **Proposed fix:** state that a miss voids the cells of that role's WORK UNIT report, and name who tests whether a copy finding reproduces.
9. **Class:** DEFECT. **Where:** rule 0.9; rule 23.10. **Trigger:** read. Rule 23.10 lists the only cards allowed after the S6 card; the budget card is not among them. Rule 0.9 says "start no further SUB-AGENT" and names no entry or number that lets a later `LAUNCH` pass, so a third party cannot test run n+1. Nothing limits the number the AGENT writes. **Violates:** C5. **Proposed fix:** add the budget card to rule 23.10; require an `ANSWER` entry with the new number; add the count test to the checker.
10. **Class:** DEFECT. **Where:** rule 0.3 (last sentence), rule 21.2; `hinshitsu_check.py` lines 183 to 186. **Trigger:** fixture with every part `yes`, `Mode: SWARM`, each report opening `DEGRADED — single-agent audit`, Status `DELIVERED — NOT DONE`: "no CAPABILITY entry states Mode: DEGRADED (rule 21.3)". No rule requires a second `CAPABILITY` entry after the USER refuses; rule 21.4 covers a failure only. The message cites rule 21.3 for a rule 21.2 line. **Violates:** rule 0.3 as its own test. **Proposed fix:** require a `CAPABILITY` entry with `Mode: DEGRADED` after the refusal.
11. **Class:** DEFECT. **Where:** `adapters/gemini.md`, `kimi.md`, `muse.md` line 36; `adapters/cursor.md` `Install`; `README.md` ("Each skill stands in its own folder and works alone"; "installs a plugin or a skill folder"). **Trigger:** read against `adapters/devin.md` line 35 and the CHANGELOG item. **Violates:** the CHANGELOG's own statement; conflict between adapters. **Proposed fix:** 1 install line in all 7; reword the README.
12. **Class:** DEFECT. **Where:** `skills/hinshitsu/example/run/AUDIT-LOG.md` E-1 to E-3; `hinshitsu_check.py`. **Trigger:** E-2 is `STAGE`; no `LAUNCH` entry names the probe (33 `LAUNCH` entries, none for `evidence/capability-probe.md`); E-3 has no `Planned SUB-AGENT runs` line; the delivery check exits 0. **Violates:** rules 0.1 and 0.9 as amended; C7's test passes a run that the current rules fail. **Proposed fix:** add both tests to the checker; state in `EXAMPLE.md` which version of the rules the run followed.
13. **Class:** DEFECT. **Where:** rule 14.3, last sentence, against rules 14.1 and 14.2. **Trigger:** read. A BLOCKER about a card not sent at S5 closes only when the `Summary` of the delivery report states the act. The report is written at S11. Until then rule 14.1 stops every WORK UNIT. **Violates:** C5 (the exit cannot be reached in the order the Run sequence gives). **Proposed fix:** let the `CORRECTION` entry and the re-audit close it, and require the `Summary` line as a separate delivery test.
14. **Class:** FRAGILITY. **Where:** `hinshitsu_check.py` line 435, every `read_text`, lines 169 to 179; `gauge.py` lines 206 and 208. **Trigger:** the 6 crashes under Scripts. **Violates:** rule 17.5; the script's "Exit 0 … 1 … 2" contract (a traceback is not a verdict). **Proposed fix:** catch the errors; print 1 `FAIL` line each.
15. **Class:** FRAGILITY. **Where:** `hinshitsu_check.py` lines 137 to 140. **Trigger:** the `ZZ-outside.md` trigger under Scripts. **Violates:** "Same folder in, same verdict out". **Proposed fix:** test against the RUN FOLDER and the repository root found by walking up to `.git`, no further.
16. **Class:** DEFECT. **Where:** `skills/hinshitsu/EXAMPLE.md`, Round 1 and Round 2. **Trigger:** `grep -c '29,339' audits/WU-1-correctness-E-104.md` prints 0; the number is in `audits/WU-1-adversarial-E-105.md` (lines 77, 865). `grep '5²' audits/WU-1-r2-correctness-E-183.md` prints nothing; `5²` read as 52 is in `audits/WU-1-r2-adversarial-E-184.md` line 174 (E-183 shows `1²` read as 12). **Violates:** rule 17.1 (the cited file does not show the claim). **Proposed fix:** cite E-105 and E-184.
17. **Class:** BLOCKER (glossary part (d): a statement in a delivery report is false). **Where:** `build-record/DELIVERY-REPORT.md`. **Trigger:** read it against itself and the log. (a) "The USER has not approved C1 to C15 in a quoted message, so … no CRITERION is frozen" against its own last section and E-019 ("approves C1 to C15"; "C1 to C15 are frozen"). (b) C10 "NOT MET until the USER approves the move" against the same section and `git ls-remote origin main` = this commit. (c) "The example used 32 sub-agent runs" against 33 `LAUNCH` entries and "SUB-AGENT runs: 33" in the example's own report; the probe makes 34. (d) "it has caught real faults in every run made with it" cites nothing. **Violates:** rules 17.1 and 17.2. **Proposed fix:** correct (a) to (c); cite or remove (d).
18. **Class:** DEFECT. **Where:** carried over: glossary BLOCKER (earlier 7); status table row INSUFFICIENTLY ADVERSARIAL (earlier 8); rules 5.3 and 6.2 (earlier 9); rule 0.10; rules 14.6 and 17.4 (earlier 10); `--record` (earlier 18); the checker gaps T5 to T10 (earlier 15 to 17). **Trigger:** the table above. **Violates:** as the earlier report states. **Proposed fix:** as the earlier report states.
19. **Class:** DEFECT. **Where:** `adapters/devin.md` row 3: "42 child sessions", source `skills/hinshitsu/EXAMPLE.md`. **Trigger:** `grep -n '\b42\b' skills/hinshitsu/EXAMPLE.md` prints nothing; the example log holds 33 `LAUNCH` entries and 34 distinct session links. **Violates:** C6 (a claim its source does not state). **Proposed fix:** state the number the log shows and cite the log.
20. **Class:** STYLE. **Where:** rules 1.9, 6.1, 13.1, 14.2, 14.4, 15.3, 15.4, 21.6 (earlier 24); rule 0.5 `DONE — CORE, 1 AUDITOR` against rule 19.4 and the glossary's AUDITOR; glossary AUDITOR ("it"); `hinshitsu-baby-bird-plan` line 10 (doubled phrase); `CHANGELOG.md` (no line for rule 21.1; version not raised, rule 20.3; 6 skills state no version); `TESTING.md` (no `--record` row); gauge wording and `--bogus` (earlier 25); checker "(rule 3.3)"; example E-267 "rule 13.6". **Trigger:** read or run. **Violates:** the conductor's drafting bullets; rules 19.4, 20.3, 24.3 by form. **Proposed fix:** name the actor in each sentence; correct each label.

## Not examined

- Any commit after `874ffb2`, including `7ba8155` on `devin/hinshitsu-build`.
- Any session link. I cannot say from the files that a saved report matches its session.
- 13 of the 15 role templates beyond 1 `grep`; `templates/FRAMEWORK.md`, `MINDMAP.md`, `CONNECTIONS.md`, `COVERAGE-LEDGER.md`, `DELIVERY-REPORT.md` beyond the lines cited; `tests/test_gauge.py`, `tests/test_lint.py` and `tests/test_check.py` after line 125.
- The example run beyond what my parser counted and the entries named above: the reports, memos, ledger, evidence files and the page itself.
- `build-record/` plans, memos, the red-cell reports and the body of the cold-start transcript.
- Each vendor page read whole; text a browser draws by script. A plugin install on any surface.
- The other 6 adapters' tool-mapping tables.
- A run of the amended rules by a fresh agent (C12 at this commit).
