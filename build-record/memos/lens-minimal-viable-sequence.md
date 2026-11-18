# Lens memo: minimal viable sequence

Reviewer: independent child session. Target: `build-record/` on branch `devin/hinshitsu-build`, commit `24751e2`. Line numbers refer to that commit. I read only the 5 files in `build-record/`. I changed nothing.

Assumptions I made instead of asking:
- A "sub-agent run" is 1 child session (E-001, `AUDIT-LOG.md:9`).
- November EST is UTC-5, so 09:51 EST is 14:51Z.
- The numbers in my proposed rule (3 files, 100 lines) are my starting values. The user owns them.

## What breaks

1. **The smallest run is 15 sub-agent runs, and the only way down is a waiver the agent must not suggest.** Who: the user, and every agent that loads the skill. The skill triggers on "any task producing something a person will receive" (`BRIEF.md:33`). A 1-work-unit run needs 4 lens runs (`PLAN.md:20`), 2 full red-cell runs (`PLAN.md:21`), 8 swarm runs (`PLAN.md:22`) and 1 final auditor (`PLAN.md:25`). It also needs 7 files and 3 folders (`PLAN.md:17`). The scale-down is the waiver (G6, `AUDIT-LOG.md:68`; `PLAN.md:28`). The agent "must not propose a waiver". The user wrote "Nor do I understand all technical aspects" (`BRIEF.md:88`), so the user cannot pick which sections to waive. This also collides with C11 (b), which makes the agent bring a recommended answer and a cost (E-005, `AUDIT-LOG.md:94`). Result: the agent skips the skill on small tasks, or the user stops calling it. Reproduce: add the counts on `PLAN.md:20` to `PLAN.md:25` for a 1-line fix, then look for any rule that lowers the count without the user naming sections. There is none.

2. **WU-1 cannot be audited with its own named tests, because the tests are built in WU-2.** Who: the builder and the WU-1 auditors. C1 to C4 name `scripts/lint.py` as the test (`AUDIT-LOG.md:79` to `:82`). DONE needs `hinshitsu_check.py` to exit 0 (`PLAN.md:26`). Both scripts are in WU-2 (`FRAMEWORK.md:45`). The swarm runs after each work unit (`PLAN.md:45`), so the WU-1 swarm runs before either script exists. Reproduce: read `PLAN.md:45`, then find the test for C2 at `AUDIT-LOG.md:80` and the work unit that creates it at `FRAMEWORK.md:45`.

3. **The only proof that the skill works is the 4th of 5 steps.** Who: the user. V4 says the example "is how the user verifies the skill executes rather than performs" (`AUDIT-LOG.md:28`, `BRIEF.md:74`). The plan writes 24 sections and 30 to 40 KiB (`PLAN.md:7`, `PLAN.md:9`), then templates, scripts and 7 adapters, and only then runs a rule for the first time in WU-4 (`PLAN.md:45`). Each skill defect the example exposes travels back along 4 edges (`CONNECTIONS.md:11` to `:14`) and forces re-audit of WU-1 to WU-3 ("re-run affected auditors after every fix", `BRIEF.md:60`). Reproduce: in `CONNECTIONS.md`, start at SKILL and follow every arrow. EX is last. No arrow returns from EX to SKILL.

4. **The red cell has no exit: a clean round forces a stop.** Who: the agent and the user. A round with 0 findings triggers a red-cell probe (`PLAN.md:22`). The red cell must attack at least 1 unflagged premise, and "its findings are BLOCKER" (`PLAN.md:21`). A BLOCKER stops all forward work (`BRIEF.md:58`). Nobody may overrule it, "including the user" (`PLAN.md:23`). The plan does not say whether an attack that fails to land is a finding. It names no one who decides that. It sets no limit on probes per work unit. Reproduce: trace fix → re-audit → 0 findings → probe → BLOCKER → fix, using `PLAN.md:22`, `:21`, `:23` in that order. No line ends the loop.

5. **Criteria were frozen before the step that feeds them, and without the approval the plan itself demands.** Who: the user. The brief says lens memos are reconciled "into frozen criteria" (`BRIEF.md:49`). E-004 was "sent to the user at 09:50 EST and frozen" (`AUDIT-LOG.md:77`), before any lens memo. The plan says a freeze quotes the user's approval (`PLAN.md:18`). E-004 quotes none. E-005 relies on "no objection received" (`AUDIT-LOG.md:95`). Now every lens point the orchestrator accepts ("criterion or decision changed", `PLAN.md:20`) needs a CRITERIA-CHANGE with a new user quote (`PLAN.md:18`). So 4 memos each block on the user. Reproduce: search E-004 for a quoted user sentence. Then count how many accepted memo points touch C1 to C11.

6. **The log records steps in an order that cannot have happened.** Who: the third party in RECIPIENT 3 (`AUDIT-LOG.md:22`). E-002 is stamped 14:48Z (`AUDIT-LOG.md:15`) and quotes messages 3 and 4 (`AUDIT-LOG.md:30`, `:31`), which arrived at 09:51 and 09:52 EST (`BRIEF.md:86`, `:90`). E-001 at 14:47Z cites D-004 (`AUDIT-LOG.md:9`), logged at 14:54Z (`AUDIT-LOG.md:120`, `:127`). E-004 cites E-005 and E-006 (`AUDIT-LOG.md:79`, `:89`). The file says nobody edits an entry and times come from `date -u` (`AUDIT-LOG.md:3`, `:4`). A reader cannot tell which step came first, so no sequence rule in the skill can be tested on this build. Reproduce: convert the 2 EST times to UTC and compare with the E-002 heading.

7. **Decisions were taken before the assumptions under them were written.** Who: the reviewer of section 4. The brief wants assumptions "written and socialized before decisions" (`BRIEF.md:48`). E-006 drops the Perplexity adapter at 14:52Z (`AUDIT-LOG.md:98`, `:101`). A-002, which carries that choice, is written at 14:53Z (`AUDIT-LOG.md:105`, `:112`). D-005 follows at 14:54Z (`AUDIT-LOG.md:128`). Reproduce: order E-006, E-007, E-008 by heading time.

8. **Two assumptions that can void WU-1 are tested after WU-1.** Who: the builder. A-008 says about 30 KiB loads in full on each surface; evidence: "Not verified per surface"; if false: "Split the skill or shorten it" (`AUDIT-LOG.md:118`). The plan already targets 30 to 40 KiB (`PLAN.md:9`), above the assumed size. G3 already found 1 surface with a 16 KiB limit (`AUDIT-LOG.md:65`). A-001 cites "links in `adapters/*.md`" as evidence (`AUDIT-LOG.md:111`). Those files do not exist until WU-3 (`FRAMEWORK.md:46`). Reproduce: list the repository tree. No `adapters/` folder exists. Then read the "If false" cell of A-008.

9. **The plan's own work units break the plan's definition of a work unit.** Who: the auditor who counts units (G4, `AUDIT-LOG.md:66`). A WORK UNIT is "at most 1 component or 1 document section group" (`PLAN.md:19`). WU-1 is 2 files and 24 sections (`FRAMEWORK.md:44`, `PLAN.md:7`). WU-2 is 6 components (`FRAMEWORK.md:45`). WU-3 is 7 files (`FRAMEWORK.md:46`). "Section group" has no size. Large units delay the first audit and widen each re-audit. Reproduce: count the components in each row of `FRAMEWORK.md:44` to `:48`.

10. **The coverage ledger costs more than it proves.** Who: the agent that fills it and the user who reads it. Rows are every file, function, branch and criterion. Columns are 8 roles plus 2 checks (`PLAN.md:24`). A page with 20 branches gives 200 cells for branches alone. Most are `N/A` + a typed reason, for example the language auditor against a code branch. The checker tests only that a cell is filled and that a `PASS` path exists (`PLAN.md:33`). A path that exists does not show the check ran. Also, the plan has 8 swarm roles (`PLAN.md:22`); the brief names 7 (`BRIEF.md:57`). The 8th role has no name and no source. Reproduce: count the roles in `BRIEF.md:57`. Then draft the ledger for a 1-function file and count the `N/A` cells.

## What to cut

- **The 8th swarm role.** The brief lists 7 (`BRIEF.md:57`). The plan says 8 and names none (`PLAN.md:22`). Cut it or name it and cite its source.
- **Function and branch rows for roles that do not read code.** Keep criterion rows and file rows for all columns. Keep function and branch rows for the correctness auditor and adversarial tester only (`PLAN.md:24`). This departs from `BRIEF.md:52`, so it must go to the user as a gap under C11 (f) (`AUDIT-LOG.md:94`).
- **The per-finding lens tag.** "Each finding is tagged with 1 lens and that lens's question is answered in the log" (`PLAN.md:20`). No actor is named. If the orchestrator answers, the builder grades itself (`PLAN.md:15`). Replace with 1 lens pass per work unit by a non-builder, which is all `BRIEF.md:49` asks for.
- **The fixed length target of 30 to 40 KiB** (`PLAN.md:9`). It conflicts with A-008 and G3 (`AUDIT-LOG.md:118`, `:65`). Set the size after the load limits are measured.
- **5 of the 7 adapters from the first pass.** VA2 guesses the user installs on Devin and Claude Code first (`AUDIT-LOG.md:55`). Write those 2 before the example. Defer the other 5 (`PLAN.md:37`) until the example passes. C1 still holds at delivery (`AUDIT-LOG.md:79`).
- **Hand upkeep of `MINDMAP.md`.** Its content (goal → criterion → component → decision → finding, `BRIEF.md:51`) already sits in the log by ID (D-010, `AUDIT-LOG.md:133`). The plan names the file (`PLAN.md:17`) and no upkeep method. Generate it from the log with the checker script.
- **The waiver as the scale-down tool** (`PLAN.md:28`, G6). Keep the waiver for user use. Replace its scale-down job with the rule in section 4 of this memo.

## What to add

- **A build order that proves a thin slice first.** Replace `PLAN.md:45` with:
  1. Measure the skill-file load limit on Devin and Claude Code; save the source links (closes A-008 and part of A-001, `AUDIT-LOG.md:118`, `:111`).
  2. Write the artifact formats, the 4 templates and `hinshitsu_check.py` (the contract at `FRAMEWORK.md:27` to `:29`).
  3. Write the glossary and the CORE rules only (sections 0, 1, 3, 15, 17, 22 from `BRIEF.md:44` to `:66`).
  4. Run the example on those rules (`PLAN.md:41`). Fix the rules from what the run finds.
  5. Write the remaining sections, then `lint.py`.
  6. Write the remaining adapters, then README and changelog.
  Each step is 1 work unit under `PLAN.md:19`.
- **A stage flag on the checker.** `hinshitsu_check.py <run-folder> --stage plan|unit|delivery`. The current check needs a delivery report (`PLAN.md:33`), so C8 (`AUDIT-LOG.md:86`) cannot be tested until the last minute. `--stage plan` must pass before WU-1 starts.
- **A run-order table at the top of `SKILL.md`.** Section numbers follow the brief's topic order (D-003, `AUDIT-LOG.md:126`), not time order. Section 23 (a) acts "before criteria freeze" (`AUDIT-LOG.md:94`), yet freeze is section 3 (`BRIEF.md:47`). Section 7 acts "at session start" (`BRIEF.md:51`). An agent that reads 0 to 23 in order meets the gap-list rule too late. The table lists each step once, in time order, with its rule ID (`PLAN.md:8`).
- **A rule that separates an attack from a finding.** "A red-cell attack becomes a finding only when it states a trigger a third party can repeat and names the criterion or rule that fails. The ORCHESTRATOR must log every other attack as an ASSUMPTION entry with an answer." Add: "The ORCHESTRATOR must run at most 1 probe per work unit per trigger." This closes point 4 (`PLAN.md:21`, `:22`).
- **A rule that puts criteria freeze after lens reconciliation.** Order: gap list → draft criteria → lens memos and red cell → reconciliation → 1 batch to the user → quoted approval → freeze. This satisfies `BRIEF.md:49`, `PLAN.md:18` and C11 (d) (`AUDIT-LOG.md:94`) with 1 user round trip. For this build, log a correcting entry that names E-004 (`AUDIT-LOG.md:3`), and get the quote.
- **A correcting log entry for the time order.** It must name E-001, E-002 and E-004 and state when each was edited (`AUDIT-LOG.md:3`, point 6).
- **A size for "section group"** in the WORK UNIT definition (`PLAN.md:19`), as a number of sections or a number of KiB.

## The 1 change this lens insists on

Add this rule to section 0, and delete scale-down from the waiver rule (`PLAN.md:28`):

> 0.x The ORCHESTRATOR must write a TIER entry in `AUDIT-LOG.md` before each WORK UNIT and again before its audit. The entry must hold the output of `git diff --stat` for the WORK UNIT, or the file count and line count when no git exists.
>
> 0.y Every run is at least CORE. In a CORE run: (1) the ORCHESTRATOR must log a CAPABILITY entry; (2) the ORCHESTRATOR must log each criterion with a named test and must quote the user message that approves it; (3) 1 AUDITOR that is not the BUILDER must run every named test and must save the output word for word in `evidence/`; (4) the delivery report must cite a file in `evidence/` for each claim; (5) `hinshitsu_check.py` must exit 0.
>
> 0.z The run is FULL when any 1 of these is true: the WORK UNIT changes more than 3 files; the WORK UNIT changes more than 100 lines; the WORK UNIT includes an action that section 18 covers; the user wrote the word "full". In a FULL run the ORCHESTRATOR must also run sections 5, 6, 10 and 13 in full.
>
> 0.w The agent must not lower a tier. The user may raise a tier at any time. In a CORE run, the delivery report must list each FULL-only check as UNVERIFIED and must state the TIER numbers.

Why this one: it gives a third party a number to check (`BRIEF.md:40`). It keeps the report honest under section 22 (`BRIEF.md:66`). It removes the conflict between G6 and C11 (b) in point 1. It makes the CORE the first thing to build and prove, which sets the build order in "What to add".

## Checked and found sound

- **D-001, single source, adapters copy no rule** (`AUDIT-LOG.md:124`, `PLAN.md:37`). Fewest files that can drift.
- **D-004, the 3-condition swarm test** (`AUDIT-LOG.md:127`). Cheap to run and a third party can check it.
- **The section 0 gate comes first and stops on fail** (`PLAN.md:16`). Correct position.
- **D-005, no Perplexity adapter** (`AUDIT-LOG.md:128`). Lowers scope on the user's word (`BRIEF.md:92`). Only the timing is wrong (point 7).
- **D-007, a single-file bill-splitting page** (`AUDIT-LOG.md:130`). Small, with numeric results to test.
- **D-009, build on a branch, then fast-forward `main`** (`AUDIT-LOG.md:132`). Auditors get a fixed revision.
- **D-010, IDs assigned once** (`AUDIT-LOG.md:133`). Makes every citation in this memo possible.
- **The seeded-defect check on a 0-finding round** (`PLAN.md:22`). It proves the auditor can find a defect for the cost of 1 run. Keep it; drop the probe loop beside it (point 4).
- **Rule shape: actor + `must` + action + artifact, with rule IDs** (`PLAN.md:8`). Needed for any checker.
- **G2 and D-006, a standard-library checker** (`AUDIT-LOG.md:64`, `:129`). The idea is sound. Only its place in the order is wrong (point 2).
- **G8, the license question held for the user with a stated default** (`AUDIT-LOG.md:70`). It blocks no earlier step.
- **`CONNECTIONS.md` edge directions** (`CONNECTIONS.md:7` to `:23`). I traced each edge against `FRAMEWORK.md:25` to `:30`. Directions agree. The missing return edge from the example to the skill is in point 3.
- **WU-5, README last** (`FRAMEWORK.md:48`, `CONNECTIONS.md:21` to `:23`). It depends on everything else. Correct position.

Not covered: wording quality, trust controls, recipient experience and graph completeness belong to the other 3 lenses.
