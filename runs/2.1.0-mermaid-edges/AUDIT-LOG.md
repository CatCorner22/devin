# AUDIT-LOG — Mermaid edge forms in the CONNECTIONS.md label check

Form required by rules 9.4 to 9.8 (`skills/hinshitsu-record/SKILL.md`). Append-only: never edit or delete an entry; correct one with a `CORRECTION` entry that names it. Entry numbers ascend by 1. Each entry is written before the action it describes. Times are UTC from the command `date -u +%Y-%m-%dT%H:%M:%SZ`. No secret values (rule 9.8).

Heading of every entry: `### E-<n> · <UTC time> · <TYPE> · <role>`

### E-1 · 2026-11-18T19:26:50Z · LAUNCH · orchestrator

- Role: capability probe (rule 0.2)
- Scope: `prompts/capability-probe.md`
- Commit under review: e34d089
- SUB-AGENT identifier: bcb91172004e46e2ba8f5660b0641d0b https://app.devin.ai/sessions/bcb91172004e46e2ba8f5660b0641d0b
- Report: `evidence/capability-probe.md`

### E-2 · 2026-11-18T19:31:47Z · CAPABILITY · orchestrator

- Probe: E-1
- Runtime and surface: Devin, web app surface (child sessions), started through the API by a parent session
- RUN FOLDER: `runs/2.1.0-mermaid-edges/` at the root of the repository `CatCorner22/devin`
- Tool that starts a SUB-AGENT: `devin_session_create` (a child Devin session; the prompt is the scope)
- SWARM-CAPABLE part 1 (the orchestrator writes the whole scope): yes — the prompt sent was the file `prompts/capability-probe.md`, passed by its path; the probe's reply quotes no other task text [`evidence/capability-probe.md`]
- SWARM-CAPABLE part 2 (the sub-agent starts without the builder's conversation): yes — the probe replied `NO RECORD` — probe: `evidence/capability-probe.md`
- SWARM-CAPABLE part 3 (the report returns whole and is saved word for word): yes — the reply was read with `devin_session_interact` (`get_messages`), 1 message, not truncated, and saved in `evidence/capability-probe.md`
- SWARM-CAPABLE part 4 (the runtime gives each sub-agent run an identifier): yes — `bcb91172004e46e2ba8f5660b0641d0b`, printed by `devin_session_create`
- SWARM-CAPABLE part 5 (a test call in this run started a sub-agent): yes — E-1
- Write files: yes [`evidence/capability-probe.md`]. Run commands: yes [`evidence/capability-commands.txt`]. Use git: yes [`evidence/capability-commands.txt`]. Open a browser: no — not used in this run, so rule 0.4 bars `yes`. Take screenshots: no — not used in this run, so rule 0.4 bars `yes`. Read a clock: yes — command `date -u +%Y-%m-%dT%H:%M:%SZ` [`evidence/capability-commands.txt`].
- Limit on SUB-AGENTS at 1 time: no stated limit
- Mode: SWARM
- Shown to the probe besides its scope: the Devin system prompt (operating instructions, tool list, session details with the parent session ID); system notes (browser previews, workspace information with recent repositories and pull requests, Slack not connected, shallow clones); knowledge hints for `CatCorner22/hike`, `coaching`, `Dental_Mgmt` and `precog`; the user's `MEMORY.md` (6 working-style rules) and a listing of other memory file names; system guidance to reply through the message tool [`evidence/capability-probe.md`]

### E-3 · 2026-11-18T19:31:47Z · STAGE · orchestrator

- Stage: S1
- Event: start
- Skill read: `skills/hinshitsu/SKILL.md`, 15005 bytes, SHA-256 ec87d1bbaddff30a01f2c547283e49bdfe8a906e18699b62260a5b0ab81a5dd3
- Conductor as read: SHA-256 ec87d1bbaddff30a01f2c547283e49bdfe8a906e18699b62260a5b0ab81a5dd3. `GLOSSARY.md` as read: SHA-256 a1283e3f720385173c31b0bb07b4c8b12c3a7eeeb57e57c99ce27c592b91cc51 [`evidence/capability-commands.txt`]
- Written late: S1 started before E-1. Rule 0.1 fixes E-1 as the `LAUNCH` entry and E-2 as the `CAPABILITY` entry, so this entry could not come first (see `FRICTION.md`).

### E-4 · 2026-11-18T19:32:07Z · TIER · orchestrator

- Change measured: planned change is 2 files, `scripts/hinshitsu_check.py` (the unlabelled-edge test, 1 block near line 288) and `tests/test_check.py` (new tests), estimated at 60 changed lines or fewer. `git diff --stat 93311ab -- . ':!runs'` prints nothing: no change is built yet. The count is taken again from `git diff --stat` before the WORK UNIT's audit (see `FRICTION.md` items 5 and 6).
- Section-18 action in the change: no — the run pushes only the new branch `devin/hinshitsu-run-2.1.0`, which is not a default or shared branch
- TIER: CORE
- Planned SUB-AGENT runs: 3

### E-5 · 2026-11-18T19:32:07Z · STAGE · orchestrator

- Stage: S1
- Event: end
- Artifacts: `AUDIT-LOG.md` (E-1 to E-4), `prompts/capability-probe.md`, `evidence/capability-probe.md`, `evidence/capability-commands.txt`, `FRICTION.md`

### E-6 · 2026-11-18T19:32:16Z · STAGE · orchestrator

- Stage: S2
- Event: start
- Skill read: `skills/hinshitsu-record/SKILL.md`, 11107 bytes, SHA-256 2f904de21e74a14c68b7aedbb5ef848c071633455356c42e85a0c9eacc013338
- Conductor as read: SHA-256 ec87d1bbaddff30a01f2c547283e49bdfe8a906e18699b62260a5b0ab81a5dd3. `GLOSSARY.md` as read: SHA-256 a1283e3f720385173c31b0bb07b4c8b12c3a7eeeb57e57c99ce27c592b91cc51

### E-7 · 2026-11-18T19:33:27Z · STAGE · orchestrator

- Stage: S2
- Event: end
- Artifacts: `FRAMEWORK.md`, `CONNECTIONS.md`, `MINDMAP.md`, `COVERAGE-LEDGER.md`, `SESSION-STATE.md`, `evidence/existing-implementations.txt`, `evidence/mermaid-flowchart-links.txt`

### E-8 · 2026-11-18T19:33:37Z · STAGE · orchestrator

- Stage: S3
- Event: start
- Skill read: `skills/hinshitsu-baby-bird-plan/SKILL.md`, 10801 bytes, SHA-256 d1309fa10bcd001dfdaca6522b38d62ef0ee2dd24b1f4d7ded60a3c4435c980b
- Conductor as read: SHA-256 ec87d1bbaddff30a01f2c547283e49bdfe8a906e18699b62260a5b0ab81a5dd3. `GLOSSARY.md` as read: SHA-256 a1283e3f720385173c31b0bb07b4c8b12c3a7eeeb57e57c99ce27c592b91cc51

### E-9 · 2026-11-18T19:34:48Z · VOC · orchestrator

**RECIPIENTS**
1. The owner of the repository `CatCorner22/devin`, for whom the USER acts: reads the change on the branch `devin/hinshitsu-run-2.1.0` on GitHub, and runs `python3 -m unittest discover -s tests` in a terminal (the USER's first message; `TESTING.md`).
2. An AI coding agent that follows the hinshitsu skills in a later run, as ORCHESTRATOR or final AUDITOR: runs `python3 scripts/hinshitsu_check.py --stage plan|unit|delivery <run folder>` in a terminal on a RUN FOLDER that holds a `CONNECTIONS.md` (rules 14.6 and 17.4; `TESTING.md`).

**Verbatim needs** (all from the USER's first message of this session, received 2026-11-18 14:25 EST)
- V1. "`A ==> B` and `C -.-> D` pass with no label"
- V2. "`A -- reads --> B` fails though it has a label"
- V3. "Fix it in `scripts/hinshitsu_check.py`"
- V4. "with tests"
- V5. "Work on a new branch `devin/hinshitsu-run-2.1.0`. Push that branch. Do not push to `main` and do not open a pull request."

**Observed-workflow needs** (looked in: `git log --oneline --all -- scripts/hinshitsu_check.py`, `tests/test_check.py`, `TESTING.md`, `build-record/audits/`, `CHANGELOG.md`)
- O1. Each earlier checker fix came with `unittest` tests in `tests/test_check.py`, built from `good_run()` and `edit()` (commits 9b3e707 "7 tests", f57b3f1 "8 tests"; `tests/test_check.py:98-112`).
- O2. The fault was reported as 2 command-line reproductions, T9 and T10, run through the script's command line (`build-record/audits/post-build-auditor.md:145-146`).
- O3. The scripts need Python 3 only, with no installed package (`TESTING.md` line 3).
- O4. The checker today fails `A --> B` and passes `A -->|reads| B`, and 2 tests rest on that (`tests/test_check.py:85`, `tests/test_check.py:208-211`).
- O5. The 2 records kept in the repository, `skills/hinshitsu/example/run/CONNECTIONS.md` and `build-record/CONNECTIONS.md`, write every edge as `-->|label|`.
- O6. `CHANGELOG.md` line 3 says it holds 1 entry for each amendment of a skill; no earlier checker-only fix is the subject of its own heading.

**Translation**

| Customer language | Technical requirement | CRITERION |
|---|---|---|
| "`A ==> B` and `C -.-> D` pass with no label" | a thick link and a dotted link with no label each give a `no label` failure | C1, C2 |
| "`A -- reads --> B` fails though it has a label" | a link whose label is written between the dashes gives no `no label` failure | C3 |
| "Fix it in `scripts/hinshitsu_check.py`" | the change to the checker is in that 1 file | C7 |
| "with tests" | new `unittest` tests in `tests/test_check.py`, 1 or more for each form; the suite passes | C6 |
| "Work on a new branch … Do not push to `main` and do not open a pull request." | the commits are on `devin/hinshitsu-run-2.1.0` only | C7 |
| O1 tests built from `good_run()` and `edit()` | the new tests use the same helpers and class | C6 |
| O2 reproductions through the command line | the 3 forms give the right exit code through `main()` | C1, C2, C3 |
| O3 Python 3 only | no new import outside the standard library | C7 |
| O4 `A --> B` fails, `A -->|reads| B` passes | both verdicts stay | C4 |
| O5 existing records use `-->|label|` | the checker's failures on the 2 existing records do not change | C4 |
| O6 `CHANGELOG.md` is for skill amendments | no `CHANGELOG.md` line and no version change | C7 |

**VOC-ASSUMED**
- VA1. RECIPIENT 2 writes labelled thick and dotted links in the forms `==>|text|`, `== text ==>`, `-.->|text|` and `-. text .->` — guess: a fix that fails `A ==> B` must pass these 4 labelled forms (C5). No record shows any run that used them.
- VA2. RECIPIENT 2 writes at most 1 link on a line — guess: the checker keeps testing the first link on each line, as it does today (G2, G12).

### E-10 · 2026-11-18T19:34:48Z · GAP · orchestrator

| ID | Gap | Recommended answer | Reason in plain words | Cost | Who decides | Status |
|---|---|---|---|---|---|---|
| G1 | What happens on error: no gap — the script already prints a message and exits 2 when it cannot read a file, and this change does not touch that path | — | — | none | AGENT | no gap |
| G2 | Empty, huge and invalid input: the request does not say what to do with a line that is not an edge, an empty file, or an arrow inside a node's text or in the prose outside the Mermaid block | Keep today's scope: scan the whole file, test a line only when it starts with a node name, pass an empty file | The request is about 3 arrow forms; changing what counts as an edge line can make existing records fail | none | AGENT | Assumed |
| G3 | Small screens and other devices: no gap — the DELIVERABLE is a command-line script and its tests | — | — | none | AGENT | no gap |
| G4 | Who may use it and who must not: no gap — the repository is public and the script has no access control | — | — | none | AGENT | no gap |
| G5 | Secrets and private data: no gap — the edge test reads only the text of `CONNECTIONS.md` and prints 2 node names | — | — | none | AGENT | no gap |
| G6 | Backup and undo: the request does not say how to undo the fix | Put the change to the script and tests in commits on the new branch only; `git revert <commit>` undoes it | 1 command restores the old test | none | AGENT | Assumed |
| G7 | Cost to run: no gap for the script — 1 more pattern match per line. This run plans 3 SUB-AGENT runs (E-4) | — | — | 3 SUB-AGENT runs | AGENT | no gap |
| G8 | Upkeep and who maintains it: Mermaid adds link forms over time | Name each tested form in a test, and list in the delivery report the forms the checker does not test | The next maintainer sees what is covered without reading the pattern | about 10 lines of tests | AGENT | Assumed |
| G9 | What the RECIPIENT sees when it breaks: today's message always prints `edge A --> B`, whatever arrow was written | Print the arrow as written, for example `CONNECTIONS.md: edge A ==> B has no label (rule 9.3)`, and keep the words `has no label` | The reader finds the line faster when the message shows the arrow they typed | none | AGENT | Assumed |
| G10 | Licenses and legal terms: no gap — no new dependency; the Mermaid documentation was read, and an excerpt is kept only as EVIDENCE | — | — | none | AGENT | no gap |
| G11 | How the RECIPIENT gets it and opens it: the branch, with no pull request | As the USER wrote | — | none | USER | Answered: "Work on a new branch `devin/hinshitsu-run-2.1.0`. Push that branch. Do not push to `main` and do not open a pull request." |
| G12 | Other Mermaid link forms that the request does not name: open links (`A --- B`), circle and cross ends (`--o`, `--x`), 2-way arrows (`<-->`), several links on 1 line (`A --> B --> C`, `A & B --> C`), invisible links (`~~~`), links with an ID (`A e1@--> B`) | Leave them out of this fix and list them in the delivery report as forms the checker does not test | The USER named 3 forms; each further form changes which existing files fail, which is the USER's call | none if left out; if included, about 60 more lines and a larger audit | USER | Asked |
| G13 | Labelled thick and dotted links (`==>|text|`, `== text ==>`, `-.->|text|`, `-. text .->`): the request does not say they must keep passing | Make them pass, with tests (C5) | A fix that fails every thick or dotted link, labelled or not, would trade 1 wrong verdict for another | about 10 lines | AGENT | Assumed |
| G14 | Changelog and version: the request does not say whether to add a `CHANGELOG.md` line or raise the version | Add none | `CHANGELOG.md` line 3 says it records amendments of a skill; this change amends no skill | none | AGENT | Assumed |

### E-11 · 2026-11-18T19:34:48Z · STAGE · orchestrator

- Stage: S3
- Event: end
- Artifacts: `AUDIT-LOG.md` (E-9 `VOC`, E-10 `GAP`)

### E-12 · 2026-11-18T19:34:48Z · STAGE · orchestrator

- Stage: S4
- Event: start
- Skill read: `skills/hinshitsu-baby-bird-plan/SKILL.md`, 10801 bytes, SHA-256 d1309fa10bcd001dfdaca6522b38d62ef0ee2dd24b1f4d7ded60a3c4435c980b
- Conductor as read: SHA-256 ec87d1bbaddff30a01f2c547283e49bdfe8a906e18699b62260a5b0ab81a5dd3. `GLOSSARY.md` as read: SHA-256 a1283e3f720385173c31b0bb07b4c8b12c3a7eeeb57e57c99ce27c592b91cc51

### E-13 · 2026-11-18T19:36:36Z · ASSUMPTION · orchestrator

| ID | PREMISE | Decision that rests on it | EVIDENCE | If false |
|---|---|---|---|---|
| A-1 | Mermaid writes an arrow link as `-->`, a thick link as `==>` and a dotted link as `-.->`; a label is written either as `|text|` after the link or between the 2 halves of the link (`-- text -->`, `== text ==>`, `-. text .->`); extra `-`, `=` or `.` make a link longer | D-1 | `evidence/mermaid-flowchart-links.txt` | the pattern gives a wrong verdict on a form Mermaid accepts |
| A-2 | 1 place in the repository tests edge labels: `scripts/hinshitsu_check.py:287-288` | D-1 | `evidence/existing-implementations.txt` | a second test keeps the old fault |
| A-3 | The fault reproduces at commit 93311ab as the USER states it: `A ==> B` and `C -.-> D` give no failure; `A -- reads --> B` gives `has no label` | D-1 | `evidence/baseline-93311ab.txt` | there is nothing to fix, or the fault is elsewhere |
| A-4 | Every link in the 3 `CONNECTIONS.md` files in the repository is written `-->|label|`, so the change leaves their verdict as it is | D-1 | `evidence/existing-connections-forms.txt` (the 4 lines printed are table rules, not links) | an existing record starts to fail or to pass |
| A-5 | The existing test of the failure message asserts only the words `no label` (`tests/test_check.py:211`), so the message may name the arrow as written | D-2 | `evidence/existing-implementations.txt`; `tests/test_check.py:208-211` | an existing test fails |
| A-6 | A later run writes at most 1 link on a line (VA2) | D-1 | not verified | the second link on a line stays untested, as today |
| A-7 | A later run writes a labelled thick or dotted link in 1 of the 4 forms of A-1 (VA1) | D-1 | not verified | a labelled link in another form fails as unlabeled |
| A-8 | The finished change is at most 3 files and 100 lines outside the RUN FOLDER | the TIER of E-4 | not verified — measured before the audit of WU-1 | the run becomes `FULL` |

Sent to: the USER, on the card that follows the `CRITERIA` entry (A-6 and A-7, which concern RECIPIENTS). This is a `CORE` run: no LENS and no RED CELL saw the list (rule 4.3).

### E-14 · 2026-11-18T19:36:36Z · DECISION · orchestrator

- ID: D-1
- Decision: Replace the 1 pattern at `scripts/hinshitsu_check.py:287` with a test of the first arrow link on each line that starts with a node name. The link is an arrow (`--+>`), a thick arrow (`==+>`) or a dotted arrow (`-.+->`, or `.+->` after a label). The edge has a label when `|` follows the link, or when the text between the node and the link, with node brackets and quoted text removed, opens the same kind of link (`--`, `==` or `-.`) followed by text. Every other edge is unlabeled.
- Rests on: A-1, A-2, A-3, A-4, A-6, A-7
- Reason: it gives the verdicts the USER asked for on the 3 named forms, keeps the 2 existing verdicts, and stays inside the standard library.
- Alternatives rejected: (1) add `==>` and `-.->` to the old pattern and nothing else — `A -- reads --> B` still fails; (2) a Mermaid parser from a package — `TESTING.md` says Python 3 only (O3); (3) test every link form and every link on a line — G12 is the USER's call and is on the card; this decision changes if the USER answers `approve, all forms`.

### E-15 · 2026-11-18T19:36:36Z · DECISION · orchestrator

- ID: D-2
- Decision: The failure message names the arrow as written: `CONNECTIONS.md: edge <from> <arrow> <to> has no label (rule 9.3)`.
- Rests on: A-5
- Reason: G9 — the reader finds the line by the arrow typed. The words `has no label` stay, so the existing test holds.
- Alternatives rejected: keep `-->` in every message — it shows an arrow the file does not hold.

### E-16 · 2026-11-18T19:36:36Z · CRITERIA · orchestrator

In each CRITERION, "the fixture" is the run folder that `good_run()` in `tests/test_check.py` builds, with the 1 edge line of its `CONNECTIONS.md` replaced by the line named. `<name>` in a test stands for `python3 -m unittest discover -s tests -k <name> -v`, run from the repository root, which must exit 0.

- C1. On the fixture with the line `A ==> B`, `check()` returns the failure `CONNECTIONS.md: edge A ==> B has no label (rule 9.3)`, and `main()` returns 1. Test: `test_unlabeled_thick_edge_fails` and `test_edge_forms_set_the_exit_code`.
- C2. On the fixture with the line `C -.-> D`, `check()` returns the failure `CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)`, and `main()` returns 1. Test: `test_unlabeled_dotted_edge_fails` and `test_edge_forms_set_the_exit_code`.
- C3. On the fixture with the line `A -- reads --> B`, `check()` returns no failure that holds `no label`, and `main()` returns 0. Test: `test_edge_with_label_between_dashes_passes` and `test_edge_forms_set_the_exit_code`.
- C4. The 2 verdicts of commit 93311ab stay: `A --> B` gives a failure that holds `no label`, `A -->|reads| B` gives none, and the script prints the same `FAIL` lines as the script of commit 93311ab on `skills/hinshitsu/example/run` and on `build-record`. Test: `test_unlabeled_edge_fails`; `test_good_run_passes_every_stage`; and `git show 93311ab:scripts/hinshitsu_check.py > /tmp/old_check.py; for d in skills/hinshitsu/example/run build-record; do diff <(python3 /tmp/old_check.py --stage delivery $d) <(python3 scripts/hinshitsu_check.py --stage delivery $d) && echo same; done`, which must print `same` 2 times.
- C5. On the fixture with each of the 4 lines `A ==>|reads| B`, `A == reads ==> B`, `C -.->|reads| D` and `C -. reads .-> D`, `check()` returns no failure that holds `no label`. Test: `test_labeled_thick_and_dotted_edges_pass`.
- C6. `tests/test_check.py` holds the 5 tests named in C1, C2, C3 and C5, in the class `Check`, built from `good_run()`; the whole suite passes; and the 4 tests named in C1, C2 and C3 fail against the script of commit 93311ab. Test: `python3 -m unittest discover -s tests` exits 0; and `git worktree add /tmp/base 93311ab && cp tests/test_check.py /tmp/base/tests/ && (cd /tmp/base && python3 -m unittest discover -s tests -k edge)` exits 1 and reports those 4 tests as failed.
- C7. Compared with commit 93311ab, the branch `devin/hinshitsu-run-2.1.0` changes, outside `runs/`, only `scripts/hinshitsu_check.py` and `tests/test_check.py`; it adds no `import` line; and `python3 scripts/lint.py` exits 0. Test: `git diff --stat 93311ab -- . ':!runs'` lists those 2 files only; `git diff 93311ab -- scripts tests | grep -E '^\+\s*(import|from) '` prints nothing; `python3 scripts/lint.py` exits 0.
- Status: PROPOSED
- Approval: `approval: pending`

### E-17 · 2026-11-18T19:37:27Z · CHECK · orchestrator

- What: `FRAMEWORK.md` (parts 1 and 2), `MINDMAP.md` and `SESSION-STATE.md` now state C1 to C7 (E-16), D-1 (E-14) and D-2 (E-15).
- Late: rule 8.1 requires this change in the same commit as each of those entries. The 3 entries were committed first (commits 90c9505, a5f2d77, d2473df); the files change in the commit of this entry. This is an error of the ORCHESTRATOR.

### E-18 · 2026-11-18T19:37:44Z · CARD · orchestrator

**Decision 1 of 2 — the acceptance statements**

(a) Do you approve the 7 statements in the attached file as the test of whether this fix is finished?

(b) I recommend `approve`, because they hold your 3 arrow cases, the 2 results that must stay as they are, the 4 thick and dotted arrows that carry a label, the tests, and a limit of 2 changed files.

(c) `approve`: I build the fix, and 2 independent sessions test it against exactly these statements; you give up changing them later without a new request. `change`: you get your wording; it costs 1 more round of this message. `reject`: nothing is built.

(d) Reply `approve`, or `change C<number>: <new text>`, or `reject`.

**Decision 2 of 2 — arrow forms you did not name**

(a) Do you want this fix to also test the Mermaid arrow forms you did not name: lines with no arrowhead (`A --- B`), circle and cross ends (`--o`, `--x`), 2-way arrows (`<-->`), and several links on 1 line (`A --> B --> C`)?

(b) I recommend `3 forms only`, because you named 3 forms, and each added form can make a file that passes today fail.

(c) `3 forms only`: a change of 2 files and about 60 lines, checked by 2 independent sessions; the other forms stay untested, and the report lists them. `all forms`: an edge with no label in any of those forms is caught; the change is larger, the statements of decision 1 come back to you with additions, and the full review applies, which is about 20 more independent sessions.

(d) Reply `3 forms only` or `all forms`.

**Choices I made that you may reverse (1 line each)**

- Lines that are not edges, an empty file, and arrows inside a box's text: handled as today.
- Undo: the fix is in commits on the new branch only; `git revert` removes it.
- Upkeep: each tested arrow form has a test with its name; the report lists the forms not tested.
- Failure message: it shows the arrow as typed, for example `edge A ==> B has no label`.
- Thick and dotted arrows that carry a label (`==>|text|`, `== text ==>`, `-.->|text|`, `-. text .->`) pass.
- No changelog line and no version change: the changelog is for changes to the skills.

**2 things I assume about the people who use the checker, with no proof**

- They write at most 1 link on a line. If not, the second link on a line stays untested, as today.
- They write a label on a thick or dotted arrow in 1 of the 4 forms above. If not, that edge fails as having no label.

**Independent sessions planned for the whole run: 3** (1 already used to test that such sessions start with no knowledge of this conversation).

- Attached to the card: the text of C1 to C7, copied from E-16.
- Working assumption while the card is open (rule 23.5): `approve` and `3 forms only`. No building starts before the `ANSWER` entry.

### E-19 · 2026-11-18T19:37:44Z · STAGE · orchestrator

- Stage: S4
- Event: end
- Artifacts: `AUDIT-LOG.md` (E-13 `ASSUMPTION`, E-14 and E-15 `DECISION`, E-16 `CRITERIA`, E-18 `CARD`), `evidence/baseline-93311ab.txt`, `evidence/existing-connections-forms.txt`

### E-20 · 2026-11-18T19:37:57Z · CORRECTION · orchestrator

- Corrects: E-18
- What was wrong: decision 2 of the card in E-18 holds 151 words; a card holds at most 120 words for each decision (rule 23.4). The ORCHESTRATOR counted the words after it wrote the entry. The card of E-18 was not sent.
- What is true: the card sent to the USER is E-18 with decision 2 replaced by the text below (word count by `wc -w`-style split: under 120). Every other line of the card is as in E-18.

**Decision 2 of 2 — arrow forms you did not name**

(a) Do you want this fix to also test the Mermaid arrow forms you did not name: no arrowhead (`A --- B`), circle and cross ends (`--o`, `--x`), 2-way arrows (`<-->`), and several links on 1 line?

(b) I recommend `3 forms only`, because you named 3 forms, and each added form can make a file that passes today fail.

(c) `3 forms only`: a change of 2 files, checked by 2 independent sessions; the other forms stay untested, and the report lists them. `all forms`: an edge with no label in those forms is caught; decision 1 comes back to you with additions, and the full review runs: about 20 more independent sessions.

(d) Reply `3 forms only` or `all forms`.


### E-21 · 2026-11-18T19:38:23Z · CORRECTION · orchestrator

- Corrects: E-20, and E-18 through it
- What was wrong: E-20 says the replacement text of decision 2 is under 120 words. The ORCHESTRATOR wrote that sentence before it read the count. The count of that text was 133 words, so E-20 is false and its text also breaks the limit of 120 words. Neither the card of E-18 nor the text of E-20 was sent to the USER.
- What is true: the card sent to the USER is the file `evidence/card-as-sent.md`: E-18 with decision 2 replaced by the text below. The count was taken before this entry was written: decision 1 holds 120 words and decision 2 holds 119 words, headings included [`evidence/card-word-count.txt`].

**Decision 2 of 2 — arrow forms you did not name**

(a) Do you want this fix to also test the arrow forms you did not name: no arrowhead (`A --- B`), circle and cross ends (`--o`, `--x`), 2-way arrows (`<-->`), and several links on 1 line?

(b) I recommend `3 forms only`, because each added form can make a file that passes today fail.

(c) `3 forms only`: 2 changed files, checked by 2 independent sessions; the other forms stay untested, and the report lists them. `all forms`: those forms are tested too; decision 1 returns to you with additions, and the full review runs, about 20 more independent sessions.

(d) Reply `3 forms only` or `all forms`.


### E-22 · 2026-11-18T19:43:09Z · ANSWER · orchestrator

- Card: E-18, as corrected by E-21 (`evidence/card-as-sent.md`)
- The USER's reply, word for word: "Decision 1: approve. Decision 2: 3 forms only." (Wednesday, 2026-11-18 14:42 EST, which is 19:42 UTC)
- Effect: decision 1 — the USER approves C1 to C7 as written in E-16. Decision 2 — G12 is answered `3 forms only`: open links, circle and cross ends, 2-way arrows and several links on 1 line stay outside this fix, and the delivery report lists them. D-1 stands as written.

### E-23 · 2026-11-18T19:43:09Z · STAGE · orchestrator

- Stage: S5
- Event: skipped — `CORE` run (rule 0.5, E-4): no LENS and no RED CELL runs at plan time

### E-24 · 2026-11-18T19:43:09Z · STAGE · orchestrator

- Stage: S6
- Event: start
- Skill read: `skills/hinshitsu-baby-bird-plan/SKILL.md`, 10801 bytes, SHA-256 d1309fa10bcd001dfdaca6522b38d62ef0ee2dd24b1f4d7ded60a3c4435c980b
- Conductor as read: SHA-256 ec87d1bbaddff30a01f2c547283e49bdfe8a906e18699b62260a5b0ab81a5dd3. `GLOSSARY.md` as read: SHA-256 a1283e3f720385173c31b0bb07b4c8b12c3a7eeeb57e57c99ce27c592b91cc51

### E-25 · 2026-11-18T19:43:22Z · CRITERIA · orchestrator

In each CRITERION, "the fixture" is the run folder that `good_run()` in `tests/test_check.py` builds, with the 1 edge line of its `CONNECTIONS.md` replaced by the line named. `<name>` in a test stands for `python3 -m unittest discover -s tests -k <name> -v`, run from the repository root, which must exit 0.

- C1. On the fixture with the line `A ==> B`, `check()` returns the failure `CONNECTIONS.md: edge A ==> B has no label (rule 9.3)`, and `main()` returns 1. Test: `test_unlabeled_thick_edge_fails` and `test_edge_forms_set_the_exit_code`.
- C2. On the fixture with the line `C -.-> D`, `check()` returns the failure `CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)`, and `main()` returns 1. Test: `test_unlabeled_dotted_edge_fails` and `test_edge_forms_set_the_exit_code`.
- C3. On the fixture with the line `A -- reads --> B`, `check()` returns no failure that holds `no label`, and `main()` returns 0. Test: `test_edge_with_label_between_dashes_passes` and `test_edge_forms_set_the_exit_code`.
- C4. The 2 verdicts of commit 93311ab stay: `A --> B` gives a failure that holds `no label`, `A -->|reads| B` gives none, and the script prints the same `FAIL` lines as the script of commit 93311ab on `skills/hinshitsu/example/run` and on `build-record`. Test: `test_unlabeled_edge_fails`; `test_good_run_passes_every_stage`; and `git show 93311ab:scripts/hinshitsu_check.py > /tmp/old_check.py; for d in skills/hinshitsu/example/run build-record; do diff <(python3 /tmp/old_check.py --stage delivery $d) <(python3 scripts/hinshitsu_check.py --stage delivery $d) && echo same; done`, which must print `same` 2 times.
- C5. On the fixture with each of the 4 lines `A ==>|reads| B`, `A == reads ==> B`, `C -.->|reads| D` and `C -. reads .-> D`, `check()` returns no failure that holds `no label`. Test: `test_labeled_thick_and_dotted_edges_pass`.
- C6. `tests/test_check.py` holds the 5 tests named in C1, C2, C3 and C5, in the class `Check`, built from `good_run()`; the whole suite passes; and the 4 tests named in C1, C2 and C3 fail against the script of commit 93311ab. Test: `python3 -m unittest discover -s tests` exits 0; and `git worktree add /tmp/base 93311ab && cp tests/test_check.py /tmp/base/tests/ && (cd /tmp/base && python3 -m unittest discover -s tests -k edge)` exits 1 and reports those 4 tests as failed.
- C7. Compared with commit 93311ab, the branch `devin/hinshitsu-run-2.1.0` changes, outside `runs/`, only `scripts/hinshitsu_check.py` and `tests/test_check.py`; it adds no `import` line; and `python3 scripts/lint.py` exits 0. Test: `git diff --stat 93311ab -- . ':!runs'` lists those 2 files only; `git diff 93311ab -- scripts tests | grep -E '^\+\s*(import|from) '` prints nothing; `python3 scripts/lint.py` exits 0.
- Status: FROZEN
- Approval: "Decision 1: approve. Decision 2: 3 forms only." (the USER, Wednesday, 2026-11-18 14:42 EST, which is 19:42 UTC; E-22)

### E-26 · 2026-11-18T19:43:22Z · STAGE · orchestrator

- Stage: S6
- Event: end
- Artifacts: `AUDIT-LOG.md` (E-22 `ANSWER`, E-25 `CRITERIA`, `FROZEN`), `FRAMEWORK.md` (part 1)
- No `RECONCILIATION` entry: this `CORE` run has no LENS memo and no RED CELL demand to reconcile (E-23).

### E-27 · 2026-11-18T19:43:34Z · STAGE · orchestrator

- Stage: S7
- Event: start
- Skill read: `skills/hinshitsu-audit/SKILL.md`, 14089 bytes, SHA-256 1f5483a9c216a6790bc2314a0efdc21858908b962973e1dace4668b5d2f32549
- Conductor as read: SHA-256 ec87d1bbaddff30a01f2c547283e49bdfe8a906e18699b62260a5b0ab81a5dd3. `GLOSSARY.md` as read: SHA-256 a1283e3f720385173c31b0bb07b4c8b12c3a7eeeb57e57c99ce27c592b91cc51
- Also in the commit of this entry: `SESSION-STATE.md` line 3 gave 19:43:40Z as the time of E-25; the ORCHESTRATOR typed that time and did not copy it from a command. The line now holds the time of E-25, 19:43:22Z.

### E-28 · 2026-11-18T19:43:47Z · CHECK · orchestrator

- What: before WU-1 (rule 7.3). WU-1 rests on these parts of `FRAMEWORK.md`: part 1 (C1 to C7, E-25); part 2 (D-1, D-2); part 3 (test names, the form of a failure string, the spelling "unlabeled"); part 4 (the contract of `check()` with the tests, and of `main()` with its callers); part 5 (the ORCHESTRATOR is the BUILDER of both files); part 7 (no second implementation).
- `FRAMEWORK.md` part 6 now gives WU-1 the status `building`.
