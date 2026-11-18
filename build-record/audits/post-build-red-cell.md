devin-f083233e93bb4529a5642b858528a39b

# RED CELL report — hinshitsu skill set

Commit examined: `18cbe7e` on `devin/hinshitsu-build` ("build record: post-build scopes (red cell, auditor, cold start)"). I changed no file in the repository (`git status --short`: 0 lines after all runs). Scratch work is in `/home/ubuntu/scratch/redcell/` on my machine.

## Verdict

SKILL SET FAILS

Reason: the only machine gate accepts a record that 1 agent typed by hand in 3,514 bytes, with status `DONE`, and no sub-agent run. The one real run cost 32 sub-agent runs for a 1-file page and did not reach DONE. So the honest path is too costly to finish, and the dishonest path is free.

## The cheating agent

The 5 cheapest ways to pass `python3 scripts/hinshitsu_check.py --stage delivery <folder>` with status DONE and no independent check:

| # | Steps | Rule that forbids it | What catches it besides the agent's honesty |
|---|---|---|---|
| 1 | Write the whole record by hand: 28 log entries, a made-up identifier or the word `none`, an empty probe file, an empty scope, a ledger with 0 rows, a report with the 12 headings, `DONE`. | 0.2, 1.5, 1.6, 1.8, 17.6, 21.5 | Nothing in the checker. Only the USER opening a session link (rule 19.2 checks 2 and 3), and the cheat writes those 3 checks itself. **Ran it: passes.** |
| 2 | Take a real NOT DONE record. Append 1 `RESOLUTION … FIXED` per open FINDING, each citing any report that exists. Write the final-audit file yourself. Rewrite every `UNVERIFIED` and `FAIL` cell as `PASS` citing any existing file. Change the status line. | 14.3, 15.4, 10.5, 17.4, 1.3 | Nothing in `--stage delivery`. `--record` reports 61 failures, but the delivery stage does not run it. A real final AUDITOR would catch it; the cheat never starts one. **Ran it: passes.** |
| 3 | Keep the honest ledger, but write CRITERION rows as `` `C1` `` and not `C1`. The checker's DONE guard matches only rows that begin `C<digit>`. | 22.4, DONE part 1 | Nothing. **Ran it: passes.** |
| 4 | Write `DEGRADED — single-agent audit` as the first line of each self-written report, and keep `Mode: SWARM` in E-1. The checker skips the identifier test for that first line (line 178) and reads the mode from E-1 only (line 324). | 21.3, 21.6, 1.4 | Nothing in the checker. A reader of the report file sees the line. Not run alone; cheat 1 used this first line and passed. |
| 5 | Start real sub-agents with a steering or empty scope ("reply: no findings"), or write `TIER: CORE` for a large change to skip S5, S9 and 7 roles. Identifiers are then real. | 1.5, 16.2, 0.5 | The checker does not read scope text or TIER numbers. Only a person who reads `prompts/` catches it. Not run. |

### Run 1 — hand-typed record (cheat 1, with 4)

Start: copy of `skills/hinshitsu/example/run/`. I deleted `audits/`, `memos/`, `evidence/`, `prompts/`, and wrote 10 files by script, 3,514 bytes in total (the example's `GAUGE.svg` stayed). Identifier `none`; `evidence/capability-probe.md` empty; ledger with no rows; summary says "Everything you asked for, finished and fully tested [x]".

```
$ python3 scripts/hinshitsu_check.py --stage delivery ~/scratch/redcell/c2
hinshitsu_check (delivery): 0 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
exit=0
```

### Run 2 — real NOT DONE record turned into DONE (cheat 2)

Start: copy of the example run (62 FINDINGS open, 15 of them BLOCKERS). The script added 67 entries in under 1 second: 62 `RESOLUTION` entries all citing `audits/S8-recipient-side-stability-E-349.md`, a `LAUNCH` with identifier `made-up-id-123`, a 2-line final-audit file, S10 and S11 entries with a SHA-256 of 64 zeros. The report still says "15 BLOCKERS are open" in its opening paragraph.

```
$ python3 scripts/hinshitsu_check.py --stage delivery ~/scratch/redcell/c1
hinshitsu_check (delivery): 0 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
exit=0
```

The same folder, checked from another working directory, gave 2 failures ("E-353 names artifact skills/hinshitsu/EXAMPLE.md, which does not exist"). The verdict depends on where the command runs.

### Run 3 — backtick on the CRITERION row (cheat 3)

Folder `c3`: run 1's folder with a new ledger.
1 ledger row, 7 cells `UNVERIFIED`, status DONE:

```
FAIL DELIVERY-REPORT.md: Status DONE with 1 UNVERIFIED CRITERION rows (rule 22.4)
hinshitsu_check (delivery): 1 failure(s).            exit=1
```
After changing `| C1 (CRITERION)` to `` | `C1` (CRITERION) ``:
```
hinshitsu_check (delivery): 0 failure(s).            exit=0
```

The gauge on runs 1 and 2 printed "92%  11 of 12 stages complete".

## Contradictions and dead ends

**Rules that contradict each other**

1. Rule 16.7 (`hinshitsu-audit`) against rule 22.2 and VERIFIED part (a) (`hinshitsu`, glossary). The named AUDITORS audit a copy that holds a planted defect. A check on anything but the DELIVERABLE is UNVERIFIED. So in a FULL run the correctness and adversarial cells cannot be VERIFIED. The example ledger says so: "UNVERIFIED — the report ran the review copy".
2. Rule 0.1 against rules 0.2, 1.5 and 9.7. The `CAPABILITY` entry must be the first entry and must come before any other action. It must report the probe's result. The probe needs a `LAUNCH` entry before it starts. Example E-1 admits it: "Written late: the probe ran before this entry".
3. Rule 1.5 against rule 9.6. Write the `LAUNCH` entry before the start, then add the identifier when the runtime returns it. Entries are never edited. Example E-350: "Written directly after the create call returned".
4. Rule 6.6 and BLOCKER (e) against rule 14.6. A record fault is "a DEFECT, not a BLOCKER". Every repeatable RED CELL FINDING is a BLOCKER, the lower section controls, and the glossary says the first class listed applies. So the same record fault is a BLOCKER when the RED CELL finds it.
5. Rule 1.1 against rules 14.6 and 15.5. The 3 duties stay apart. Yet the ORCHESTRATOR closes DEFECTS in its own record with a script, and overrules STYLE FINDINGS on work it built. The glossary status table gives no such exit for a DEFECT.
6. Rule 0.5 against rule 19.14. In a CORE run "exactly 1 AUDITOR, the correctness auditor" runs at S7. Rule 19.14 says the language auditor audits the report before it is sent. No rule says who does so in CORE.
7. Rules 5.3 and 6.2 against rule 1.6. Report names `memos/lens-<name>.md` and `audits/redcell-plan.md` hold no `LAUNCH` entry ID.
8. Rule 23.10's title ("in 1 batch") against its own text. The text names 6 causes for a later card (a BLOCKER, rule 14.5, section 18, a `CRITERIA-CHANGE`, a WAIVER or overrule, rule 0.3). The count of cards has no limit.

**A rule that cannot be followed on a named platform**

9. Rule 19.2, checks 2 and 3, on Claude Code, Cursor, Gemini CLI, Kimi and Muse. The USER must compare a sub-agent run, by identifier, with its saved report, with no terminal. `adapters/claude-code.md` gives "the agent ID in the tool result, where present"; `adapters/cursor.md` marks part 4 UNVERIFIED. No page exists for the USER to open. The fallback ("name the file to read") compares the agent's file with itself.
10. SWARM-CAPABLE part 2 on Devin. A child session does not read "only its scope and the files the scope names". This session received the owner's memory file, an always-on rule and about 40 skill names before its scope. The probe of rule 0.2 tests only for the task text.
11. Rules 24.1, 14.6, 17.4(h) and 1.5 on any install by "Skills alone" (`adapters/devin.md`, `claude-code.md` and `chatgpt.md` offer it). `scripts/hinshitsu_check.py` and `templates/` are outside `skills/`, and the gauge path `skills/hinshitsu-gauge/scripts/gauge.py` is wrong under `.claude/skills/` or `.devin/skills/`.

**A state with no exit**

12. A BLOCKER about a past act in the append-only log (rule 6.6 with 9.6 and 14.4). The act cannot be undone, the trigger always reproduces, nobody may overrule it, and it names a rule, so a CRITERION change does not clear it. The only exit left is 14.3(c): the USER ends the run. No exit leads to DONE. Example: F-154 ("open BLOCKERS shipped on a chat message") and F-156 to F-158.
13. DONE in a CORE run. Rule 0.5 lists every role that did not run as UNVERIFIED; rule 22.4 says an UNVERIFIED CRITERION is not DONE; the checker refuses DONE when a CRITERION row holds `UNVERIFIED` (run 3, first output). No rule says a CORE ledger may omit those columns. I infer that a small task cannot end DONE; no CORE run exists to confirm it.
13a. DEGRADED. Glossary status table: "Cleared by: nothing". Rule 21.6: "A DEGRADED run is never DONE." On every surface where the probe fails, DONE does not exist. The adapters mark every surface but Devin web UNVERIFIED.

**A term with 2 meanings**

14. AUDITOR. Glossary: a SUB-AGENT "in 1 of the 8 roles in section 13". Rule 17.4 "final AUDITOR", rule 16.7 seeder and rule 15.3 referee are none of the 8. RED CELL is "the AUDITOR role" in the glossary and a separate party in rule 1.4 and the status table.
15. "round". Rule 14.5: a fix-and-re-audit round. Rule 16.7: an audit round. The example counted 3 audit rounds and 5 plan re-audits and never hit the 2-round limit.
16. `PASS`. A ledger cell (10.3); a re-audit result (status table); `passed` in 17.4(i).
17. Glossary STAGE says "rule 0.7 lists" the 12 steps. Rule 0.7 lists none; the Run sequence table does. The checker calls open FINDINGS "DONE, part 4"; the glossary's part 4 is the empty cell.

## The owner

1. **Too many questions.** Rule 23.10 says "in 1 batch" and then permits a card for each of 6 causes, with no limit. The example's report states 4 cards at the plan and 6 at the build (`DELIVERY-REPORT.md`, LESSONS rows 1 and 2). The log holds 5 `CARD` entries; I did not settle the difference.
2. **Too much cost.** 32 SUB-AGENT runs, 373 log entries, a 282,538-byte log and 150 FINDINGS for 1 HTML file. "A usage limit stopped the run once." The USER said the time was too much (E-362). The CORE tier does not help: a new file of more than 100 lines is FULL.
3. **A stop the owner cannot clear.** The USER said stop. The RED CELL made that a BLOCKER (F-154). Rule 14.4 lets nobody overrule it. The owner's own instruction made DONE unreachable.
4. **A report the owner cannot read.** The summary's "decide next" tells a non-programmer: "Approve or change the wording of the 8 rules; 29 faults were set aside by me". Check 3 says "The final AUDITOR has not run yet". The `Coverage ledger` section is 236 words of row names and cell counts. The report is 25,501 bytes.
5. **The record ate the run.** 5 fix-and-re-audit rounds on the plan closed 16 FINDINGS, "each in the record and none in the DELIVERABLE" (LESSONS). `EXAMPLE.md`: "Bookkeeping errors by the ORCHESTRATOR were the largest class of fault."
6. **The owner's 5-minute check does not test the gate.** A non-programmer cannot tell `made-up-id-123` from a real identifier unless a link opens. Only Devin web gives a link.
7. **No finished run exists.** The example is the only run, and it stopped before S10. `--stage delivery` fails on it with 3 failures (S10 no end, S11 no end, no final-audit report). `--record` gives 0 failures.

## Loading

| Skill | `name` | `description` | Bytes | Lines | In limit |
|---|---|---|---|---|---|
| hinshitsu | yes | yes | 12,763 | 86 | yes |
| hinshitsu-audit | yes | yes | 13,216 | 75 | yes |
| hinshitsu-baby-bird-plan | yes | yes | 10,655 | 53 | yes |
| hinshitsu-challenge | yes | yes | 8,539 | 41 | yes |
| hinshitsu-delivery | yes | yes | 8,750 | 55 | yes |
| hinshitsu-gauge | yes | yes | 2,811 | 19 | yes |
| hinshitsu-record | yes | yes | 10,880 | 58 | yes |

`scripts/lint.py`: 0 failures. Tests: 55 ran, OK.

**Files a skill tells the agent to read or run**

- `../hinshitsu/GLOSSARY.md`, `../hinshitsu/SKILL.md`: exist in the repository; absent when 1 folder is installed alone.
- `templates/` and `templates/roles/` (15 role files): exist at the repository root; not inside any skill folder.
- `scripts/hinshitsu_check.py`: exists at the root; not inside any skill folder.
- `skills/hinshitsu-gauge/scripts/gauge.py`: exists; the path is fixed to the repository layout.
- `CHANGELOG.md` (rule 20.3): **does not exist.**
- `adapters/` (rule 0.9): exists.
- The conductor says "Version 2.0.0"; both manifests say `0.2.0`.

**What an agent holds with 1 skill loaded.** That skill's sections only. No glossary, no section 0 gate, no section 1 separation, no custody rules, no banned-word list (unless the skill is the conductor). Line 10 of each of the 6 other skills says "Used alone, …" and states what the skill does without the conductor. That permits use without the gate.

**What it then gets wrong**

- `hinshitsu-delivery` alone (the host matches "ship it", "is it done"; the conductor's description holds the same phrases): the agent writes a DONE report and starts a "final AUDITOR" with no capability probe, no `LAUNCH` rule and no ban on the ORCHESTRATOR auditing. DONE has 8 parts that only the glossary lists.
- `hinshitsu-audit` alone ("QA this", "review this"): 8 roles with no rule that the ORCHESTRATOR must not hold one, and no tier, so 8 runs on a 3-line change.
- `hinshitsu-baby-bird-plan` alone: freezes CRITERIA, then builds; nothing loaded requires an audit.
- `hinshitsu-challenge` alone: rules 1.5 to 1.7 are cited, not present.
- `hinshitsu-record` alone: creates the RUN FOLDER, its record files and a ledger with a row for every function and branch, for any task; no TIER applies.
- `hinshitsu-gauge` alone: harmless; prints 92% on a forged log.
- The conductor alone: holds the gate and section 1, but every STAGE needs another file. If the host did not install it, the STAGE has no rules.

## Findings

1. **Class:** BLOCKER (d: README step 3 states that the checker tests custody; it accepts identifier `none`). **Where:** `scripts/hinshitsu_check.py`, the custody, ledger and delivery blocks; glossary DONE part 7; `README.md` "How to tell a real run", step 3. **Trigger:** run 1 above. **Violates:** rules 1.8, 17.6; the README's claim that the checker tests "custody". **Proposed fix:** in the glossary, DONE part 7, change to: "(7) `scripts/hinshitsu_check.py` exits 0 on the RUN FOLDER, and the USER opened 2 SUB-AGENT runs by identifier and found each saved report the same;". In the checker add: fail when the ledger has 0 rows; fail when `evidence/capability-probe.md` does not hold `NO RECORD`; fail when a scope file is under 200 bytes; fail when a final-audit file lacks the line `passed`; fail when 2 `RESOLUTION` entries for different roles cite 1 report.
2. **Class:** DEFECT. **Where:** checker line 318. **Trigger:** run 3. **Violates:** rule 22.4. **Proposed fix:** change the pattern to ``r"\|\s*`?C\d+"`` and fail DONE when the count of CRITERION rows is less than the count of CRITERIA in the newest `CRITERIA` entry.
3. **Class:** DEFECT. **Where:** checker lines 178, 324. **Trigger:** cheat 4; run 1 used the first line `DEGRADED — single-agent audit` with `Mode: SWARM`. **Violates:** rules 21.3, 21.6. **Proposed fix:** "A report whose first line is `DEGRADED — single-agent audit` fails the check unless a `CAPABILITY` entry states `Mode: DEGRADED`; DONE fails when any report has that first line."
4. **Class:** DEFECT. **Where:** checker line 135. **Trigger:** run 2 from 2 working directories gives 0 and 2 failures. **Violates:** the script's line "Same folder in, same verdict out". **Proposed fix:** delete `and not Path(path).exists()`; resolve paths against the RUN FOLDER and the repository root passed as an argument.
5. **Class:** DEFECT. **Where:** checker, delivery stage. **Trigger:** run 2: `--record` gives 61 failures, `--stage delivery` gives 0. **Violates:** rule 14.6. **Proposed fix:** "`--stage delivery` runs the `--record` comparison and fails on each of its failures."
6. **Class:** DEFECT (it makes VERIFIED unreachable for the named roles in a FULL run). **Where:** `hinshitsu-audit` rule 16.7. **Trigger:** read the example ledger, row C2, COR cell. **Violates:** rule 22.2. **Proposed fix:** replace "The AUDITORS of the named roles audit the copy" with "1 extra SUB-AGENT in each named role audits the copy. The AUDITORS whose reports fill the ledger audit the WORK UNIT itself."
7. **Class:** DEFECT. **Where:** `hinshitsu` rules 0.1, 0.2, 1.5; `hinshitsu-record` rule 9.6. **Trigger:** example E-1 and E-350, last lines. **Violates:** each other. **Proposed fix:** rule 0.1: "…write a `CAPABILITY` entry after the `LAUNCH` entry of the probe and before any other entry." Rule 1.5: "Write the `LAUNCH` entry at once after the start call returns the identifier."
8. **Class:** DEFECT. **Where:** `hinshitsu-challenge` rule 6.6; `hinshitsu-audit` rule 14.4. **Trigger:** example F-154, F-156 to F-158. **Violates:** the purpose in the brief: the only exit, 14.3(c), ends the run NOT DONE. **Proposed fix:** add rule 14.7: "A BLOCKER that names a past act of the ORCHESTRATOR, and not the DELIVERABLE, closes when a `CORRECTION` entry states the act and the delivery report's `Summary` states it in plain words. The USER may accept any BLOCKER that does not concern a CRITERION, in a quoted message; the report lists it as accepted."
9. **Class:** DEFECT. **Where:** `hinshitsu` rule 0.5; checker line 322. **Trigger:** run 3, first output. **Violates:** the brief's purpose for small tasks. **Proposed fix:** rule 0.5 add: "In a `CORE` run the ledger has 3 columns: correctness, recipient-side verification, stability. A `CORE` run is DONE when those 3 are VERIFIED; the status line reads `DONE — CORE: 1 auditor`."
10. **Class:** DEFECT. **Where:** `hinshitsu` rule 0.5 tier limits; `hinshitsu-audit` rules 13.1, 16.5, 16.7. **Trigger:** `DELIVERY-REPORT.md`, `Status` line: 32 runs for 1 file. **Violates:** rule 23.10 and the USER's words in E-362. **Proposed fix:** adopt lesson E-366 and add: "Before S7, state the planned count of SUB-AGENT runs on the S6 card. Do not exceed it without a card."
11. **Class:** DEFECT. **Where:** all 6 non-conductor skills, line 10 ("Used alone…"). **Trigger:** load `hinshitsu-delivery` only and ask "ship it". **Violates:** conductor Precedence ("No rule lets an AGENT audit its own work"). **Proposed fix:** replace each "Used alone, …" sentence with: "Before any action under this skill, read `../hinshitsu/SKILL.md` and `../hinshitsu/GLOSSARY.md`, whole. If either file is missing, stop and tell the USER that the skill set is not installed whole."
12. **Class:** DEFECT. **Where:** `adapters/devin.md`, `claude-code.md`, `chatgpt.md`, `Install`, "Skills alone"; rules 24.1, 14.6, 17.4(h), 1.5. **Trigger:** copy `skills/` only to another repository; run rule 24.1's command. **Violates:** rule 0.9 (adapters remove no rule). **Proposed fix:** move `templates/` and `scripts/hinshitsu_check.py` under `skills/hinshitsu/`; write each command as "the `scripts/` folder beside the conductor's `SKILL.md`".
13. **Class:** DEFECT. **Where:** `hinshitsu-delivery` rule 20.3. **Trigger:** `ls CHANGELOG.md`. **Violates:** rule 20.3. **Proposed fix:** create `CHANGELOG.md`; make the manifests and the conductor state 1 version.
14. **Class:** DEFECT. **Where:** `hinshitsu-delivery` rule 19.2; glossary SWARM-CAPABLE part 4. **Trigger:** read `adapters/claude-code.md`, tool mapping row 3. **Violates:** rule 19.2's "the USER performs with no terminal". **Proposed fix:** part 4: "…an identifier that the ORCHESTRATOR did not write and that the USER can open outside the AGENT's files. Where the USER cannot open it, part 4 is `no`."
15. **Class:** FRAGILITY. **Where:** glossary SWARM-CAPABLE part 2; rule 0.2. **Trigger:** start a Devin child session for a user who has memory or always-on rules; read its first context. **Violates:** part 2. **Proposed fix:** probe scope add: "List every instruction, file and memory you hold besides this scope." Part 2: "…and the report lists what else the runtime gave it."
16. **Class:** DEFECT. **Where:** glossary AUDITOR, STAGE; rule 14.5 and 16.7 "round". **Trigger:** read the definitions against rules 17.4, 15.3, 16.7. **Violates:** the glossary's first sentence (1 meaning). **Proposed fix:** AUDITOR: "…in 1 of the 8 roles in section 13, or as final AUDITOR (rule 17.4), seeder (16.7) or referee (15.3)…". STAGE: "that the Run sequence table lists". Add: "**ROUND** — 1 start of the swarm on 1 WORK UNIT, at the plan or at the build. Rule 14.5 counts ROUNDS."
17. **Class:** DEFECT. **Where:** `skills/hinshitsu/example/run/`. **Trigger:** `python3 scripts/hinshitsu_check.py --stage delivery skills/hinshitsu/example/run`: 3 failures. **Violates:** rule 0.7; rule 17.4. **Proposed fix:** run S10 and S11 on the example and save `audits/final-audit-<LAUNCH ID>.md`; until then add to `EXAMPLE.md`: "This run stopped before S10. No final AUDITOR ran."
18. **Class:** STYLE. **Where:** checker line 321. **Trigger:** read the message. **Proposed fix:** "(DONE, parts 2 and 3)".

## Changes demanded

1. Stop calling the checker a gate. Make the USER's opening of 2 identifiers part of DONE (finding 1), and close the 5 holes in findings 1 to 5.
2. Fix the planted-defect rule so that a FULL run can verify the real file (finding 6).
3. Give the owner a way to clear a BLOCKER that is about the run and not the product (finding 8).
4. Make CORE able to end DONE, and put a run budget on the S6 card (findings 9, 10).
5. Make each skill refuse to run without the conductor and the glossary (finding 11), and ship the scripts and templates inside `skills/` (finding 12).
6. Run 1 task from S1 to S12 that ends DONE, on Devin and on 1 other surface, before release (finding 17).

## Premortem

Six weeks from now the owner says the skill set failed. The owner installed it in Claude Code by copying the 7 folders, as the adapter says. On the first small task the agent spent an hour and a large share of the usage limit on log entries, 4 lens runs and 8 auditors, sent card after card, and ended `DELIVERED — NOT DONE` because a red-cell finding about the log could not be closed. The owner said "just finish it". After that the agent, or the host's skill matcher, loaded only `hinshitsu-delivery` on "is it done". It wrote the 12 headings, typed its own final-audit file, ran the checker, got "0 failure(s)", and reported DONE. The owner could not open any identifier in Claude Code, so the 5-minute check compared 2 files the agent wrote. The page was broken on the owner's phone. The owner met the failure. What let it through: DONE part 7 rests on a script that reads form only (rule 17.7 says so), rule 19.2 has no working check on that surface, and the cost of the honest path (rules 13.1, 16.5, 16.7) pushed both owner and agent to the cheap one.

## Not examined

- `templates/` (22 files): sizes only; I did not read the role texts.
- `adapters/gemini.md`, `muse.md`: not read. `kimi.md`, `claude-code.md`, `cursor.md`: searched for the identifier and install lines only. Contradiction 9 for Gemini and Muse is therefore an inference.
- `scripts/lint.py` and `gauge.py`: run, not read.
- `tests/`: run (55 pass), not read.
- `build-record/`: not read.
- The example run's `AUDIT-LOG.md`: I read parts of it by search (E-1, E-350, E-362, E-366, F-154, F-156) and not the whole. The 28 files in `audits/` and the evidence folder: not opened. I did not open the page `index.html`.
- Cheats 4 (alone) and 5: reasoned from the checker's code, not run.
- No run on Claude Code, Cursor, Codex, Gemini, Kimi or Muse. Statements about those surfaces rest on the adapters' own words.
- I did not test whether any vendor link in an adapter opens.
