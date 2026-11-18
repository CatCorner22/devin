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
