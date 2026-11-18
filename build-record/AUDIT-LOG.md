# AUDIT-LOG — build of the hinshitsu skill

Append-only. Nobody edits or deletes an entry. A later entry corrects an earlier one by naming its ID.
Entry heading: `### E-nnn · UTC time · TYPE · author role`. Times come from `date -u` on the build machine.

### E-001 · 2026-11-18T14:47Z · CAPABILITY · orchestrator

- Runtime: Devin, web session `7c9f3982f0c549e59a8da7919e3b6766`, Linux VM.
- Sub-agents: child Devin sessions through `devin_session_create`. Each child runs on its own VM, starts with only the prompt the orchestrator writes, and cannot read this conversation. The orchestrator reads each child's report and saves it under `build-record/`. Result: this runtime passes the 3 swarm conditions in D-004.
- Not available: an in-VM `run_subagent` tool (tool search returned only `read_subagent`).
- Artifacts: files in the git checkout `~/repos/devin`; shell; Chrome with Playwright for browser checks; `gh` for GitHub.
- Clock: `date -u`.
- Mode: SWARM.

### E-002 · 2026-11-18T14:48Z · VOC · planner

Source: `build-record/BRIEF.md` (messages 1 to 4) and the user's repositories.

**RECIPIENTS**
1. The user: a lawyer who directs AI coding assistants on several platforms and who wrote, in message 3, "Nor do I understand all technical aspects of my requests or directions."
2. Any AI coding assistant that loads `SKILL.md` and must follow it without the user present.
3. A third party "who was not in the room" and who tests whether a run followed the skill.

**Verbatim needs**
- V1. "forces any AI coding assistant to deliver stable, verified, end-user-ready work instead of self-graded output"
- V2. "draft it so it cannot be loopholed"
- V3. "Every rule must be testable by a third party who was not in the room. Nothing left to implication."
- V4. "This is how the user verifies the skill executes rather than performs."
- V5. "Verify each platform's current sub-agent capabilities online before finalizing the mapping table — do not guess."
- V6. "I don't know what gaps I left in a plan. Nor do I understand all technical aspects of my requests or directions. Baby bird me, bro."
- V7. "Please build the skill or plugin only for platforms that allow sub-agents."
- V8. "I need world-class work on this effort"

**Observed-workflow needs** (what the user's repositories show the user doing)
- O1. The user keeps skills as `SKILL.md` files with a 2-key frontmatter and numbered sections (`CatCorner22/precog/.claude/skills/precog-verify/SKILL.md`, `precog-personas/SKILL.md`).
- O2. The user bans vague words inside repository rules (`precog/CLAUDE.md`: no "should"; "for example", never "e.g.").
- O3. The user runs 4 read-only planning agents, one per lens, and has a lead reconcile them (`Dental_Mgmt/knowledge/reviews/design-lens-01` to `-04`).
- O4. The user keeps one skill pack per platform (`CatCorner22/Cursor_Skills`, `Claude_Skills`, `ChatGPT_Skills`, a Kimi pack), so the user installs the same idea in several runtimes.
- O5. The user's rules files demand evidence reports: each check, the command, its output (`Refined_Keep_Skills/CLAUDE.md`).

**Translation**

| Customer language | Technical requirement | Criterion |
|---|---|---|
| "cannot be loopholed" | Every rule names an actor, an action and an artifact or observable result; defined terms; `must` and `may` only; no banned word | C3, C4, C5 |
| "instead of self-graded output" | Builder, auditor and merger are different agents; reports saved word for word; claims cite artifacts | C2, C8 |
| "executes rather than performs" | The example holds real command output, real browser screenshots and real sub-agent reports | C7 |
| "do not guess" | Each adapter claim carries a source link and the date checked | C6 |
| "Baby bird me" | The agent finds the gaps, brings a recommended answer, explains terms in plain words | C11 |
| "only for platforms that allow sub-agents" | Adapters target surfaces that pass the swarm test; section 0 is a gate | C1, C6 |

**VOC-ASSUMED** (signal not obtained; each guess listed)
- VA1. The user reads the repository on GitHub in a browser. Guess from the web origin of this session.
- VA2. The user installs on Devin and Claude Code first. Guess from the repository name and O1.
- VA3. The user wants the skill to cover documents and plans as well as code. Guess from "anything a person will receive, run, read, or rely on".

### E-003 · 2026-11-18T14:49Z · GAP · planner

Gap list under section 23 (Baby Bird): what the brief leaves out, with the answer brought.

| ID | Gap | Recommended answer | Why, in plain words | Cost | Who decides | Status |
|---|---|---|---|---|---|---|
| G1 | The brief says 5 platforms never have sub-agents. Vendor documents checked on 2026-11-18 show Codex, ChatGPT Work, Gemini CLI, Kimi Code CLI and Muse Code have them. | Target the surfaces that have them. | A skill that tells a capable tool to skip the swarm throws away its main control. | None | User | User answered in message 4 |
| G2 | A prose skill has no enforcement. An agent can skip a rule and nobody sees it. | Ship `scripts/hinshitsu_check.py`: a third party points it at a run's artifact folder and it tests the structural rules. | The user gets a pass or fail without reading every artifact. | 1 script, Python standard library only | Agent (cheap to undo) | Assumed |
| G3 | Devin auto-loads at most 16 KiB of `AGENTS.md`. The skill is larger. | Install the skill as a skill file; put a short pointer block in `AGENTS.md`. | A cut-off rule file drops rules silently. | None | Agent | Assumed |
| G4 | The brief defines no unit of work, so "after each work unit" has no test. | Define WORK UNIT in the glossary. | A reviewer needs to count the units to check each one got its audits. | None | Agent | Assumed |
| G5 | The brief names roles (orchestrator, builder, auditor) but the term list does not define them. | Add role terms and artifact terms to the glossary. | An undefined role is a loophole. | None | Agent | Assumed |
| G6 | A full swarm on a 1-line change costs more than the change. The brief gives no way to scale down. | The user may waive named sections in writing; the agent logs the waiver and reports each waived check UNVERIFIED. The agent may never waive on its own. | The user controls cost; the report stays honest. | None | Agent proposes, user uses | Assumed |
| G7 | Audit logs can capture passwords and keys from command output. | Add a rule: no secret values in any artifact. | The user delivers these files to other people. | None | Agent | Assumed |
| G8 | A public repository with no license gives nobody else the right to reuse it. | Add the MIT license. | Others can then use the skill legally; without it they cannot. | 1 file | User (legal terms) | Open — ask in the delivery report; default is no license file |
| G9 | The skill has no version, so a kaizen amendment cannot name what it changes. | State a version in `SKILL.md` and keep `CHANGELOG.md`. | The user can tell which rules a run followed. | 1 file | Agent | Assumed |
| G10 | Some runtimes have no clock, so "timestamped" has no source. | The agent takes the time from a command; with no clock it numbers entries and writes `no clock`. | A made-up time is a false record. | None | Agent | Assumed |
| G11 | The brief asks the lint to cover banned words but the brief itself quotes them. | Save the brief word for word in `build-record/BRIEF.md`; the lint skips that file and the ban-list lines. | The record stays exact. | None | Agent | Assumed |

### E-004 · 2026-11-18T14:50Z · CRITERIA · planner

Sent to the user at 09:50 EST and frozen. Each criterion names its test.

- **C1.** The repository holds every file in the brief's layout at the stated path, less `adapters/perplexity.md` (see E-006). Test: `scripts/lint.py` file list.
- **C2.** `skills/hinshitsu/SKILL.md` has frontmatter with `name: hinshitsu` and a `description` that names every trigger in the brief; sections 0 to 22 appear in the brief's order under the brief's names; each section holds every element the brief lists for it. Test: lint for order and names; correctness auditor checks elements against `BRIEF.md` line by line.
- **C3.** `GLOSSARY.md` defines each of the 13 terms in the brief exactly once, and every other all-capitals term the skill uses. Test: lint.
- **C4.** None of the 12 banned words appears in the skill, glossary, example, templates, adapters, README or build record, except inside the ban list and `BRIEF.md`. Obligations use `must`; discretion uses `may`. Test: lint.
- **C5.** A third party can test every rule: each rule names an actor, an action and an artifact or observable result. Test: language auditor lists each rule that fails.
- **C6.** Each adapter references the canonical skill by path, copies no rule text, and holds a capability table in which every claim carries a source link and the date checked. Test: lint for links; best-practices auditor opens each link.
- **C7.** `EXAMPLE.md` shows a real single-page frontend taken through the full pipeline: VoC statement, frozen criteria, lens memos, red-cell attack, coverage ledger, findings with resolutions, delivery report. The outputs are real: command output, browser screenshots, sub-agent reports saved word for word. Test: every path `EXAMPLE.md` cites exists; `scripts/hinshitsu_check.py` passes on the example folder.
- **C8.** This build keeps its own audit log, framework, session state, mind map, connections graph and coverage ledger under `build-record/`, and independent sessions perform every audit. Test: `scripts/hinshitsu_check.py` passes on `build-record/`.
- **C9.** `precog-verify` and `precog-personas` are unchanged. Test: `git -C ~/repos/precog status --porcelain` prints nothing for those paths.
- **C10.** All work is on `main` of `CatCorner22/devin` under a clear commit message. Test: `gh api repos/CatCorner22/devin/commits/main`.
- **C11.** Added by E-005.

### E-005 · 2026-11-18T14:51Z · CRITERIA-CHANGE · planner

- Request: user message 3 ("Baby bird me, bro").
- Change: add **C11.** `SKILL.md` section 23, Baby Bird, makes the agent (a) write a gap list before criteria freeze, (b) bring each gap with a recommended answer, a plain-words reason and a cost, (c) decide choices that are cheap to undo and log them as assumed, (d) ask user-owned decisions in 1 batch, each with a default, (e) explain each technical term in 1 sentence, (f) challenge a direction that harms the user's goal before acting, (g) perform every step the agent can perform, (h) report what the user did not ask for and got, and what the user must decide next. Test: correctness auditor checks (a) to (h); the example and this build each hold a gap list.
- Approval: the user's message 3 is the request; the orchestrator's reply at 09:51 EST stated the 8 rules and the placement as section 23; no objection received. Reason logged: user-originated addition.
- Red-cell probe: queued for the plan-time red cell (trigger: criteria-change request).

### E-006 · 2026-11-18T14:52Z · CRITERIA-CHANGE · planner

- Request: user message 4 ("only for platforms that allow sub-agents").
- Change to C1: 15 files; no `adapters/perplexity.md`. Change to C2: section 0 is a gate; section 21 covers only a user-accepted degraded run and a sub-agent failure during a run. Change to C6: each adapter targets a surface that passes the swarm test in D-004.
- Approval: user message 4 is the instruction. Reason: the user narrowed the platforms.
- Red-cell probe: queued for the plan-time red cell.

### E-007 · 2026-11-18T14:53Z · ASSUMPTION · planner

Load-bearing assumptions, written before the decisions that rest on them. Socialized: A-001 to A-004 sent to the user at 09:50 and 09:52 EST; all 8 go to the 4 lens sub-agents and the red cell.

| ID | Assumption | Decision that rests on it | Evidence | If false |
|---|---|---|---|---|
| A-001 | The 7 target surfaces let the main agent write each sub-agent's prompt and get its report back. | D-004, adapters | Vendor documents, links in `adapters/*.md`, checked 2026-11-18 | The adapter for that surface is wrong; mark it DEGRADED |
| A-002 | Perplexity Computer gives the main agent no documented way to scope its sub-agents. | D-005 | perplexity.ai help center "What is Computer?", checked 2026-11-18 | Add the adapter back |
| A-003 | Agents on every target surface can read a Markdown file by path. | D-001 | Each surface's skill or rules feature | Adapter must inline the skill |
| A-004 | The user accepts `build-record/`, `scripts/` and `CHANGELOG.md` beside the brief's layout. | D-006, D-008 | Told to the user at 09:50 EST; no objection | Remove them in 1 commit |
| A-005 | A child Devin session is independent of the builder for audit purposes: it sees only its prompt and the pushed branch. | E-001, C8 | docs.devin.ai advanced capabilities page | Audits are DEGRADED |
| A-006 | Third parties run Python 3.8 or later. | D-006 | Not verified | Checker does not run for them; rules remain testable by reading |
| A-007 | The 2 precog skills and the 4 lens files are a fair model of what the user means by "conventions". | SKILL.md format | The brief names them | Restyle |
| A-008 | A skill of about 30 KiB loads in full on each target surface when installed as a skill file. | D-001, G3 | Not verified per surface | Split the skill or shorten it |

### E-008 · 2026-11-18T14:54Z · DECISION · planner

| ID | Decision | Reason | Alternatives rejected |
|---|---|---|---|
| D-001 | `skills/hinshitsu/SKILL.md` is the single source. Adapters point to it and copy no rule. | 2 copies of a rule drift apart. | Inline the full text in each adapter |
| D-002 | The glossary is its own file. | More than 13 terms; the brief allows either. | Embed in `SKILL.md` |
| D-003 | Sections 0 to 22 keep the brief's order and names. Baby Bird is section 23. | The brief fixes the order; an insert would renumber. | Insert after section 2 |
| D-004 | SWARM-CAPABLE test, 3 conditions: (1) the orchestrator writes each sub-agent's scope; (2) the sub-agent starts without the builder's conversation; (3) the sub-agent's report returns to the orchestrator, who saves it word for word. | Turns "has sub-agents" into something a third party can check. | A fixed list of platforms |
| D-005 | No Perplexity adapter. | A-002; user message 4. | A stub adapter |
| D-006 | Ship `scripts/lint.py` (tests this repository) and `scripts/hinshitsu_check.py` (tests any run's artifact folder). Python standard library only. | G2. | Prose only |
| D-007 | The example deliverable is a single-file bill-splitting page, built and audited for real, kept under `skills/hinshitsu/example/`. | Small; has inputs, an empty state, money rounding and layout to verify. | A to-do list (no numeric correctness to prove) |
| D-008 | This build's own artifacts live in `build-record/`. | C8; keeps them apart from the skill. | Mix them into `templates/` |
| D-009 | Work on branch `devin/hinshitsu-build`; auditors read that branch; fast-forward `main` to it after the gate passes. | Auditors need a pushed revision; `main` receives only audited work. | Commit to `main` first |
| D-010 | Stable IDs: C (criterion), A (assumption), D (decision), G (gap), F (finding), E (log entry), WU (work unit). An ID is assigned once and never reused. | Rule taken from the user's `living-reference` skill: "IDs are assigned once and never reused or renumbered". | Renumber on edit |
