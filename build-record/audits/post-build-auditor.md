devin-93145814433943ac8fea4655abf6cee7

# AUDITOR report: hinshitsu skill set

## Examined

- Repository `CatCorner22/devin`, branch `devin/hinshitsu-build`, commit `18cbe7e1e78c415a857736fcb30259aa2cb9f2b9` ("build record: post-build scopes (red cell, auditor, cold start)"). The branch moved to `876e0dc` while I worked; I did not examine that commit.
- I changed no tracked file. `git status --short` printed nothing after every run. My scratch files are outside the repository.
- Read whole: the 7 `SKILL.md` files, `GLOSSARY.md`, `EXAMPLE.md`, `README.md`, `TESTING.md`, the 7 files in `templates/`, 8 of the 15 role files (correctness, adversarial by diff, language, red-cell, final-auditor, referee, seeder, lens-trust-controls), `adapters/devin.md` and the first 22 lines plus tool and install rows of the other 6 adapters, both manifests, `scripts/hinshitsu_check.py`, `scripts/lint.py`, `gauge.py`, the first 110 lines of `tests/test_check.py`, the criteria entries E-005, E-006, E-013, E-014 and the brief's section list in `build-record/BRIEF.md`.
- Sampled: `example/run/AUDIT-LOG.md` (373 entries): 26 entry headings that `EXAMPLE.md` cites, 9 entry bodies, and E-362 to E-373. `DELIVERY-REPORT.md` lines 1 to 40.
- Own scripts: a cross-reference script (every `rule n.m`, `section n` and backticked path in the skills, glossary, templates, adapters, README, TESTING and EXAMPLE), a banned-word script that also matches inflected forms and does not strip quotations, and a capitalized-term script.
- 22 web pages fetched with `curl` on 2026-11-18 (all returned HTTP 200).

### The 5 commands, complete output

```text
$ python3 -m unittest discover -s tests
........................hinshitsu check: test the form of a run's record.

Usage: hinshitsu_check.py [--stage plan|unit|delivery] <run-folder>
       hinshitsu_check.py --record <run-folder>   (state files against the log, rule 14.6)
Exit 0 when every check for the stage passes, 1 when any fails, 2 on a usage error.
Standard library only. Same folder in, same verdict out.

This script tests the shape of the record: that entries, citations, cells and
files exist and agree with each other. It does not prove that any check ran or
that any report is true (rule 17.7).
...............................
----------------------------------------------------------------------
Ran 55 tests in 1.369s

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
FAIL AUDIT-LOG.md: stage S10 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S11 has no end or skipped entry (rule 0.7)
FAIL audits/: no final-audit report matched to a LAUNCH entry (rule 17.4)
hinshitsu_check (delivery): 3 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
[exit 1]

$ python3 skills/hinshitsu-gauge/scripts/gauge.py skills/hinshitsu/example/run
hinshitsu gauge  [##################......] 75%  9 of 12 stages complete
Now: S10 Audit of the audit  -> skill: hinshitsu-delivery
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
  [>] S10 Audit of the audit             hinshitsu-delivery
  [ ] S11 Delivery report                hinshitsu-delivery
  [ ] S12 Lessons                        hinshitsu-delivery
  x done   - skipped   > running   (blank) pending
[exit 0]

```

## Result for each CRITERION

All criteria are `PROPOSED` in E-013 and E-014; no entry quotes the user's approval.

| CRITERION | Result | What I ran or opened |
|---|---|---|
| C1 | PASS | `git ls-files`; every file E-013 and E-014 list exists. |
| C2 | PASS | Own script: 7 `name` values equal folder names; sections 0 to 24 each 1 time. I read all 25 sections against the brief's list. 1 note: the brief says the delivery report "opens with a plain-language summary"; rule 19.1 puts `Check it yourself in 5 minutes` first. |
| C3 | PASS on the test as written; 2 DEFECTS on use | Own script: 33 definitions, 0 duplicates, the 13 named terms present, 0 undefined capitalized terms outside log-entry types and literal values. Findings 7 and 8: AUDITOR and BLOCKER are used outside their definitions. |
| C4 | PASS | Own regex with inflected forms, quotations kept: 0 hits in the skills, glossary, templates, adapters, README, TESTING, EXAMPLE and manifests outside the 2 quotations of the ban list; 0 hits in the orchestrator's files of the example run (8 top-level files, 34 scopes, 2 HTML files). 79 hits sit in sub-agent reports, which are other parties' words. STYLE: finding 24. |
| C5 | FAIL | I read every numbered rule of all 7 skills. 13 rules name no artifact or result a third party can test: finding 5. |
| C6 | FAIL | 7 adapters, each with a table and 1 date line. 3 claims are not on the page cited: finding 6. |
| C7 | FAIL at this commit | `hinshitsu_check.py --stage delivery` exits 1 with 3 failures. `EXAMPLE.md` states S10 to S12 as done; the log ends at "S10 start": finding 3. |
| C8 | FAIL | `python3 scripts/hinshitsu_check.py build-record` exits 1 with 37 failures; `build-record/` holds no `MINDMAP.md` and no `COVERAGE-LEDGER.md`: finding 2. |
| C9 | PASS, in my checkout only | `git -C ~/repos/precog status --porcelain -- .claude/skills/precog-verify .claude/skills/precog-personas` prints nothing; newest commit on those paths is 2026-10-10. I cannot see the builder's checkout. |
| C10 | FAIL | `git ls-remote origin main` gives `6c94e4c`; the audited commit is 8 commits ahead of it: finding 1. |
| C11 | PASS | Read rules 23.1 to 23.10 against (a) to (h) of E-005; `GAP` entries exist in both logs (example E-9, E-53; build E-003). |
| C12 | FAIL at this commit | No cold-start transcript exists under `skills/hinshitsu/example/`; only the scope `build-record/prompts/cold-start.txt`: finding 4. |
| C13 | PASS | Own script: largest file 13,216 bytes and 86 lines; longest description 1,016 characters. |
| C14 | PASS, with 2 DEFECTS | 55 unit tests pass; 2 runs leave `GAUGE.svg` byte-identical; rule 0.8 requires the run. I rendered the example's `GAUGE.svg` in Chrome: the red bar shows, the words "STOPPED - blocker open" do not. Findings 20 and 21. |
| C15 | UNVERIFIED | Both manifests parse. Root `plugin.json` meets the schema at agent-plugins.org, which I fetched. No install ran, and no file states the install as run or UNVERIFIED for Devin: finding 23. |

## Cross-references

Every rule number (0.1 to 24.6) and section number cited in the skills, glossary, templates, adapters, README, TESTING and EXAMPLE exists. Every script flag cited (`--stage plan|unit|delivery`, `--record`) exists. Misses:

1. `GLOSSARY.md`, STAGE: "the 12 steps … that rule 0.7 lists". Rule 0.7 lists none; the Run sequence table does.
2. Rule 0.9: "a runtime that this rule does not name". The names are in rule 0.1(a).
3. Rule 0.1(g): "counted from rule 0.5". Rule 0.5 gives no count of SUB-AGENT runs.
4. Rule 20.3 cites `CHANGELOG.md`. The file does not exist.
5. Rules 6.2 and 5.3 fix the names `audits/redcell-plan.md`, `audits/redcell-delivery.md`, `memos/lens-<name>.md`. Rule 1.6 requires each name to hold the `LAUNCH` entry ID. The example uses `redcell-plan-E-23.md` and `S9-red-cell-E-350.md`. `templates/DELIVERY-REPORT.md` lines 50 and 51 cite the names without the ID.
6. Rule 14.6 says the audit of the audit (rule 17.4) reads record-fault `RESOLUTION` entries. Rule 17.4 (a) to (i) and `templates/roles/final-auditor.md` hold no such duty.
7. `templates/roles/red-cell.md` line 17 lists 3 verdicts; rule 6.2 requires exactly 1 of 4 (`INSUFFICIENTLY ADVERSARIAL` is missing).
8. `templates/SESSION-STATE.md` field 4 is "Current WORK UNIT"; rule 8.1 requires "current STAGE and WORK UNIT".
9. `templates/DELIVERY-REPORT.md`, `Gaps filled`: no column for who decided (rules 19.6, 23.9).
10. `templates/AUDIT-LOG.md` says it shows "the fields each type requires". It has no sample for `CRITERIA-CHANGE`, `CHECK`, `REVERSAL`, `ABANDONED`, `WAIVER`; the `PROBE` sample lacks the `LAUNCH` entry (rule 6.3); the `RESOLUTION` sample lacks `Record fault: yes` (rule 14.6).
11. Rule 9.5 sets `D-<n>` and `F-<n>`; `templates/MINDMAP.md` and `templates/FRAMEWORK.md` use `D-001` and `F-001`.
12. `templates/roles/seeder.md`: the ORCHESTRATOR supplies the copy. Rule 16.7: the seeder "makes a copy".
13. `templates/COVERAGE-LEDGER.md` holds a `Totals` table of 5 cells; the checker fails any ledger that keeps it (T11).
14. Run sequence table, S6 "Reconcile": the skill to read is `hinshitsu-baby-bird-plan` (sections 3, 23), but the reconciliation rule is 5.4 in `hinshitsu-challenge`.
15. Conductor line 8 says "Version 2.0.0"; both manifests say `0.2.0`.
16. `EXAMPLE.md` line 24 cites `audits/final-audit-*.md`; no such file exists. Lines 24 to 26 state S10, S11, S12 as done.
17. Example log, E-267 and E-367 cite "rule 13.6"; section 13 has 4 rules (the planted defect is rule 16.7).

## Scripts

Setup for every trigger below, at the repository root (writes only under `/tmp`):

```bash
export PYTHONDONTWRITEBYTECODE=1
mk() { python3 -c "import sys;sys.path.insert(0,'tests');import test_check as T;print(T.good_run())"; }
C="python3 scripts/hinshitsu_check.py"; G="python3 skills/hinshitsu-gauge/scripts/gauge.py"
```

`mk` builds the passing fixture of `tests/test_check.py`. Each line is 1 trigger with the result I observed.

**Crashes**

- T14: `D=$(mk); sed -i 's/^- ID: F-1$/- ID: F-1./' $D/AUDIT-LOG.md; $C --record $D` gives `ValueError: invalid literal for int() with base 10: '1.'` (line 400). Rule 15.1 copies an AUDITOR's words whole; the main check tolerates the full stop, `--record` does not.
- T15: `D=$(mk); printf '\xff' >> $D/AUDIT-LOG.md; $C $D; $G $D` gives a `UnicodeDecodeError` traceback from both scripts. The same happens for a non-UTF-8 report under `audits/`.

**Checks made wrongly**

- T1: `D=$(mk); sed -i 's/^- Trigger: run$/- Trigger:/' $D/AUDIT-LOG.md; $C $D` exits 0. `field()` uses `\s*`, which crosses the line end, so an empty field takes the next line as its value.
- T2: `D=$(mk); sed -i 's/^- SUB-AGENT identifier: run-abc$/- SUB-AGENT identifier:/' $D/AUDIT-LOG.md; $C $D` exits 0. The identifier becomes "-", and "-" is in "run-abc".
- T3: `D=$(mk); sed -i 's/· RESOLUTION ·/· CHECK ·/' $D/AUDIT-LOG.md; sed -i 's/^DONE$/DELIVERED — NOT DONE: open F-10/' $D/DELIVERY-REPORT.md; $C $D` exits 0. F-1 is open and unlisted; the substring test finds "F-1" inside "F-10" (rule 15.6).
- T4: `D=$(mk); printf 'DEGRADED — single-agent audit\nwritten by the builder\n' > $D/audits/WU-1-correctness-E-19.md; $C $D` exits 0 in a `SWARM` run with Status `DONE`. That first line switches off the identifier test (rules 1.6, 21.6).
- T10: `D=$(mk); printf '```mermaid\ngraph LR\n  A -- reads --> B\n```\n' > $D/CONNECTIONS.md; $C $D` fails "edge A --> B has no label". The edge has a label in Mermaid's other form.
- T9: the same with `A ==> B` and `C -.-> D` exits 0. Both edges have no label (rule 9.3).
- T11: appending the `Totals` table of the template to the ledger gives "row has 5 cells; 11 required" 2 times.
- T12: an `end` entry that names `README.md` passes when run from the repository root and fails when run from `/`. Line 135 also accepts a path relative to the working directory. The docstring says "Same folder in, same verdict out".
- Messages: line 321 prints "(DONE, part 4)" for open FINDINGS, which are parts 2 and 3. Lines 151 and 154 cite rule 3.3 for the freeze; the freeze is rule 3.4.

**Checks the skills promise and the script does not make**

- T5: `D=$(mk); for f in $D/audits/final-audit-*; do printf 'run-fin\nnot passed\n' > $f; done; $C $D` exits 0 with Status `DONE` (DONE part 6, rule 17.4).
- T6: a CRITERION row with `FAIL F-1` and Status `DONE` exits 0 (DONE part 1).
- T7: `D=$(mk); echo 'The builder ensures the page is tested, tries to be fast and tried to help.' > $D/FRAMEWORK.md; $C $D` exits 0. The ban covers "their inflected forms"; `lint.py` lists them, the checker's `BANNED_RE` does not.
- T8: banned words and steering in `prompts/WU-1-correctness.md` exit 0. The checker reads 7 named files; `lint.py` reads `example/run/*.md` only. No script reads `prompts/` (ban list: "any artifact of a run"; rule 16.2).
- T13: `--record` exits 0 when `SESSION-STATE.md` lists a missing artifact, a CRITERION `C99` and `WU-7`, and `MINDMAP.md` holds an unlogged `D-77`. Rule 14.6(b) closes a record fault on that exit code. `--record` tests 4 things: FINDING open or closed on single-FINDING lines, the newest `CRITERIA` entry ID, the running STAGE, and FINDING count in the mind map.
- Not tested either: 2 `LAUNCH` entries that cite 1 report with 1 identifier line pass only by the identifier test; the order of STAGES; rule 0.1 parts (b), (c), (e), (g); the edge table against the graph (rule 9.3); `UNVERIFIED — stale` (rule 10.5).
- `lint.py`, C6: 1 link and 1 date anywhere in an adapter pass; it does not test a link per claim.

**Gauge**

- T16: `D=$(mk); printf '\n### E-32 · t · STAGE · orchestrator\n\n- Stage: S5\n- Event: start\n' >> $D/AUDIT-LOG.md; $G $D --no-svg` still shows `[-] S5` and "Next: S12". A `start` after `skipped` or `end` is ignored (line 62), yet rule 0.5 runs S5 after a skip and rule 5.7 returns to S4.
- Rendered `skills/hinshitsu/example/run/GAUGE.svg` in headless Chrome at 900 by 460: with 15 open BLOCKERS the stop text is wider than its 400-pixel red box; the words "STOPPED - blocker open:" fall outside it in white on white.
- T17: `$G --bogus $D --no-svg` exits 0; unknown flags are dropped without a message.
- With 1 stage skipped and 11 ended the text reads "All 12 stages have an end entry". Rule 24.3 writes `STOPPED — blocker open`; the script prints a hyphen.

## Adapters and manifests

Every adapter carries a capability table and the line "Read on 2026-11-18" above it. The date is 1 per table, not 1 per row. Rows marked UNVERIFIED carry no link.

| Adapter | Table, dated links | Page opened | Supports the claim |
|---|---|---|---|
| `devin.md` | yes; row 5 cites a local file | `docs.devin.ai/work-with-devin/advanced-capabilities`, `/cli/subagents`, `/cli/extensibility/plugins/overview.md`, `/onboard-devin/agents-md` | Rows 1 and 2: yes ("launch child sessions with specific prompts", "its own isolated VM", "does not inherit the parent's conversation"). Row 4: no; neither page holds "session ID" or "agent ID". Row 3, web: not stated; the page says the coordinator "compiles results". Plugin precedence and 16 KiB: yes. |
| `claude-code.md` | yes | `code.claude.com/docs/en/sub-agents`, `/tools`, `/plugins` | Yes: "Each subagent runs in its own context window"; "the Task tool was renamed to Agent"; `.claude-plugin/plugin.json`. The page also says "Claude receives its agent ID", so row 4 could be sourced. |
| `cursor.md` | yes | `cursor.com/docs/subagents`, `/help/ai-features/multi-agent`, `/docs/plugins` | Rows 1 and 2: yes. Row 3: no for "background subagents since version 2.5"; the page says "Since Cursor 2.5, subagents can launch child subagents". Agent Plugins: yes. |
| `chatgpt.md` | yes | `learn.chatgpt.com/docs/agent-configuration/subagents`, `developers.openai.com/codex/plugins/build.md` | Yes: "At most intelligence levels, ask for delegation explicitly"; `/subagents`; root `plugin.json`. |
| `gemini.md` | yes | `geminicli.com/docs/core/subagents/`, the Google blog post | Yes: `.gemini/agents/*.md`; "own separate context window"; "returning only the final result". |
| `kimi.md` | yes | `kimi.com/code/docs/en/kimi-code-cli/reference/tools.html`, `/customization/agents.html` | Yes. `explore` and `plan` are on the agents page, not on the tools page that row 1 cites. |
| `muse.md` | yes | `dev.meta.ai/docs/muse-code/agents`, `/workflows`, `/cookbook/subagent-fanout` | Rows 1 and 3: yes. The install line cites the agents page for where skills load; that page does not hold the word "skill". The line marks itself UNVERIFIED. |

Limit: I read the HTML that `curl` returned, as text. Text drawn only by script in a browser is UNVERIFIED.

Manifests: `plugin.json` and `.claude-plugin/plugin.json` both parse with `json.load`. Neither names a file path. The 2 URLs they name: the `$schema` URL returns the schema (HTTP 200), and root `plugin.json` meets it (required `$schema` and `name`; no extra key). The `repository` URL is this repository.

## Findings

1. **Class:** BLOCKER. **Where:** branch `main`. **Trigger:** `git ls-remote origin main devin/hinshitsu-build`, then `git rev-list --count origin/main..18cbe7e` prints 8. **Violates:** C10. **Proposed fix:** merge after the final audit names a commit as passed (rule 1.9), or change C10.
2. **Class:** BLOCKER. **Where:** `build-record/`. **Trigger:** `python3 scripts/hinshitsu_check.py build-record` exits 1, 37 failures; `ls build-record` shows no `MINDMAP.md`, `COVERAGE-LEDGER.md`, `SESSION-STATE.md`. **Violates:** C8. **Proposed fix:** write the missing files and entries, or report C8 as not met.
3. **Class:** BLOCKER. **Where:** `skills/hinshitsu/EXAMPLE.md` lines 24 to 26; `example/run/`. **Trigger:** `python3 scripts/hinshitsu_check.py --stage delivery skills/hinshitsu/example/run` exits 1; `ls skills/hinshitsu/example/run/audits/final-audit-*` finds nothing; the last log entry is E-373, "S10 start". **Violates:** C7; glossary BLOCKER (d), a false statement in the DELIVERABLE. **Proposed fix:** run S10 to S12, or word the 3 rows as not yet run.
4. **Class:** BLOCKER. **Where:** `skills/hinshitsu/example/`. **Trigger:** `grep -ril cold skills/` prints nothing. **Violates:** C12. **Proposed fix:** save the cold-start transcript with its identifier.
5. **Class:** BLOCKER. **Where:** rules 0.1(g), 0.4, 0.6, 1.7, 6.1, 7.3, 8.1 (last sentence), 8.2(c), 16.4, 16.7, 17.3 (last sentence), 17.6, 21.2. **Trigger:** read each rule and ask which file shows compliance. 0.4: no artifact shows a capability "used with success". 0.6: nothing shows a time came "from a clock command". 1.7: "to obtain a milder result" is intent. 6.1: "nobody resets its results" names no actor. 7.3: reading `FRAMEWORK.md` leaves no trace. 8.1 and 17.3: "from memory" cannot be seen. 8.2(c): no record counts tool calls. 16.4: "the runtime's stated limit" where none is stated. 16.7: no actor tests whether a finding on the copy reproduces on the WORK UNIT, and the rule does not say whether the named AUDITORS also audit the original. 17.6: no rule requires a record of tool calls. 21.2: 1 AGENT "reads only the files the scope names". 0.1(g): see cross-reference 3. **Violates:** C5. **Proposed fix:** name an artifact for each (an evidence file per capability; the clock command's output; a tool-call count in each `COMPACTION` entry), or delete the untestable clause.
6. **Class:** BLOCKER. **Where:** `adapters/devin.md` line 18 (and line 17, web half); `adapters/cursor.md` row 3. **Trigger:** fetch the cited pages and search for "session ID", "agent ID", "2.5". **Violates:** C6. **Proposed fix:** cite a page that states each claim, or mark the row UNVERIFIED.
7. **Class:** DEFECT. **Where:** `GLOSSARY.md` BLOCKER; rules 1.7, 9.8, 17.4, 18.4, 21.5. **Trigger:** compare. The definition lists 5 parts. Rule 1.7 (no saved report) and rule 9.8 (a secret in an artifact) fit none. Rules 17.4, 18.4 and 21.5 say "BLOCKER of class (d)" for faults that are not a false statement in the delivery report or the DELIVERABLE; rule 14.6 calls a false statement elsewhere a DEFECT. **Violates:** C3; rule 13.1 role 7 (conflict). **Proposed fix:** add part (f), "a rule of the skills names it a BLOCKER", and drop "of class (d)" where it does not fit.
8. **Class:** DEFECT. **Where:** `GLOSSARY.md` AUDITOR; rules 17.4, 14.3(b), 6.5; status table row INSUFFICIENTLY ADVERSARIAL. **Trigger:** the definition limits AUDITOR to "the 8 roles in section 13". The final AUDITOR and the referee are not among them, and rule 6.5 lets a LENS SUB-AGENT judge where the status table says "the AUDITOR". **Violates:** C3. **Proposed fix:** define AUDITOR to include the final AUDITOR and the referee; name the LENS in the table.
9. **Class:** DEFECT. **Where:** rules 6.2, 5.3 against rule 1.6. **Trigger:** cross-reference 5. **Violates:** rule 1.6. **Proposed fix:** write the names as `audits/redcell-plan-<LAUNCH ID>.md` and so on.
10. **Class:** DEFECT. **Where:** cross-references 1 to 4 and 6. **Trigger:** open each target. **Violates:** C5 (a cited target that does not say what is claimed). **Proposed fix:** point STAGE at the Run sequence table; point 0.9 at rule 0.1(a); give the count in 0.5 or drop 0.1(g); create `CHANGELOG.md`; add duty (j) to rule 17.4.
11. **Class:** DEFECT. **Where:** templates, cross-references 7 to 13. **Trigger:** compare each template line with the rule. **Violates:** rules 6.2, 8.1, 19.6, 6.3, 14.6, 9.5, 16.7, 10.2. **Proposed fix:** amend each template; make the checker skip the `Totals` table.
12. **Class:** DEFECT. **Where:** `scripts/hinshitsu_check.py` line 56; `gauge.py` line 46. **Trigger:** T1, T2. **Violates:** rules 15.1, 1.5. **Proposed fix:** use `[ \t]*` and treat an empty value as missing.
13. **Class:** DEFECT. **Where:** `hinshitsu_check.py` line 327. **Trigger:** T3. **Violates:** rule 15.6. **Proposed fix:** match `\bF-1\b`.
14. **Class:** DEFECT. **Where:** `hinshitsu_check.py` line 178. **Trigger:** T4. **Violates:** rules 1.6, 21.6. **Proposed fix:** accept that first line only when the log's mode is DEGRADED, and then fail Status `DONE`.
15. **Class:** DEFECT. **Where:** `hinshitsu_check.py` lines 313 to 343. **Trigger:** T5, T6. **Violates:** DONE parts 1 and 6. **Proposed fix:** with Status `DONE`, require the last line of the final-audit report to hold `passed` and no CRITERION row to hold `FAIL`.
16. **Class:** DEFECT. **Where:** `hinshitsu_check.py` lines 25 to 27 and 237. **Trigger:** T7, T8. **Violates:** the banned-word rule; C4's test. **Proposed fix:** share `lint.py`'s list; read `prompts/`.
17. **Class:** DEFECT. **Where:** `hinshitsu_check.py` line 252. **Trigger:** T9, T10. **Violates:** rule 9.3. **Proposed fix:** parse Mermaid's 3 arrow forms and both label forms.
18. **Class:** DEFECT. **Where:** `hinshitsu_check.py` `check_record`; rule 14.6(b). **Trigger:** T13. **Violates:** rule 14.6 as its own test. **Proposed fix:** state in rule 14.6 the 4 things `--record` tests, and send every other record fault to an AUDITOR.
19. **Class:** DEFECT. **Where:** `hinshitsu_check.py` line 135. **Trigger:** T12. **Violates:** the script's own contract, "Same folder in, same verdict out"; rule 17.5. **Proposed fix:** resolve paths against the run folder and the repository root found from it, never the working directory.
20. **Class:** DEFECT. **Where:** `gauge.py` line 62. **Trigger:** T16. **Violates:** rule 24.3 with rules 0.5 and 5.7. **Proposed fix:** let a later `start` set the stage to running.
21. **Class:** DEFECT. **Where:** `gauge.py` lines 173 to 177; `example/run/GAUGE.svg`. **Trigger:** open the file in a browser. **Violates:** rule 24.3 ("shows `STOPPED — blocker open` with the FINDING IDs"). **Proposed fix:** wrap the IDs, or show a count and the first 5.
22. **Class:** FRAGILITY. **Where:** `hinshitsu_check.py` line 400 and every `read_text`; `gauge.py` line 205. **Trigger:** T14, T15. **Violates:** rule 17.5 (a traceback, not a verdict). **Proposed fix:** catch the errors and print 1 `FAIL` line.
23. **Class:** DEFECT. **Where:** `adapters/devin.md` line 34. **Trigger:** read it; it states neither an install run nor UNVERIFIED. **Violates:** C15's test. **Proposed fix:** add the run's evidence or the word UNVERIFIED.
24. **Class:** STYLE. **Where:** rules 1.9, 14.2, 21.6, 6.1, 15.3 ("may" with a branch, work, a cell, a ruling as subject, against "a discretion that nobody else has"); rule 14.4 ("cannot overrule" for a prohibition); rule 13.1 ("start these 8 AUDITORS" while role 8 starts only on a trigger); rule 15.4 ("every FINDING ends in exactly 1 `RESOLUTION` or `OVERRULE`" against exit 14.3(c)). **Trigger:** read. **Violates:** the conductor's drafting bullets. **Proposed fix:** name the actor in each sentence; write "must not".
25. **Class:** STYLE. **Where:** conductor line 8 and the manifests (2.0.0 against 0.2.0); the Run sequence table, S6; gauge wording (T17, "All 12 stages have an end entry", hyphen for dash); checker messages "(DONE, part 4)" and "(rule 3.3)"; example log E-267 and E-367, "rule 13.6". **Trigger:** read or run. **Violates:** rules 20.3, 24.3, 9.6 by form. **Proposed fix:** 1 version number; correct each label.

## Not examined

- Commit `876e0dc` and anything pushed after `18cbe7e`.
- 7 of the 15 role templates; `tests/test_gauge.py`, `tests/test_lint.py` and the rest of `tests/test_check.py`.
- The example run beyond the sample above: 347 of 373 log entries, 28 reports, 4 memos, the ledger, the page itself. I did not open any sub-agent session link.
- `build-record/` beyond the criteria entries, the brief's section list and the checker run.
- Whether any vendor page showed different text on the date the adapters name.
- A plugin install on any surface. The builder's own precog checkout.
- Whether the "13 terms the brief names" in `lint.py` is complete: I matched it to line 38 of `BRIEF.md` only.
