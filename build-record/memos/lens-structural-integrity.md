# Lens memo: structural integrity

Reviewer: independent session. Scope: `build-record/` on branch `devin/hinshitsu-build`, 5 files, read at commit `24751e2`. Line numbers are per file. Times: EST is UTC minus 5 hours.

Assumptions I made, since I may not ask:
- A1. `build-record/` is the run folder for this build (C8, D-008), so every run-folder rule in `PLAN.md` line 17 applies to it.
- A2. A rule in `PLAN.md` section 2 is the rule the skill will state, unless a criterion says otherwise.
- A3. Where the brief and a later user message conflict, the later message wins only for the words it uses.

## What breaks

1. **A BLOCKER has no exit, and the red cell must keep making them.** For: every agent that runs the skill, and the user who waits on it.
   - `PLAN.md` line 23: nobody may overrule a BLOCKER, the user included. The 2 exits are "fix, re-audit" or the user ends the run or changes criteria.
   - `PLAN.md` line 21: every red-cell finding is a BLOCKER, and the red cell must attack at least 1 premise or the orchestrator runs a fresh red cell. No limit on fresh runs is stated.
   - `PLAN.md` line 22: a round with 0 findings triggers a red-cell probe. So a clean round always calls the one role whose every finding stops the run (`BRIEF.md` line 58).
   - No rule names who closes a BLOCKER that is wrong, a duplicate, or not reproducible. No rule names who decides that a premise attack is "fixed". A premise is not a criterion, so the catchball exit in line 23 does not reach it.
   - Reproduce: take the plan-time red cell for this build. It returns 1 premise attack, for example "A-008 is not verified" (`AUDIT-LOG.md` line 118). That is a BLOCKER. Fix it, re-audit, get a clean round, which fires a probe, which must return another BLOCKER or be replaced. Find the line in `PLAN.md` that lets the loop end. There is none.
   - Same shape, smaller: `BRIEF.md` line 49 says no work unit ships without at least 1 lens pass; `PLAN.md` line 20 creates a lens pass only by tagging a finding. A work unit with 0 findings has no lens pass and cannot ship.

2. **The audit log is not append-only, or its times are false.** For: the third party in `AUDIT-LOG.md` line 22, who relies on the log as the record.
   - `AUDIT-LOG.md` line 3: nobody edits an entry. Line 4: times come from `date -u`.
   - E-001 is stamped 14:47Z and cites D-004 (line 9). D-004 is created in E-008 at 14:54Z (line 127).
   - E-002 is stamped 14:48Z and quotes user messages 3 and 4 (lines 17, 30, 31). Those arrived at 09:51 and 09:52 EST, which is 14:51Z and 14:52Z (`BRIEF.md` lines 86, 90).
   - E-003 is stamped 14:49Z, names "section 23 (Baby Bird)" (line 59) and records "User answered in message 4" (line 63).
   - E-004 is stamped 14:50Z and cites E-006 (line 79) and E-005 (line 89), stamped 14:52Z and 14:51Z.
   - Reproduce: convert each time to UTC and read the 4 entries in order. Each one holds content that did not exist at its stamp. Either the entries were edited later or the stamps were written by hand. G10 (line 72) calls a made-up time "a false record".
   - Structural cause: no rule and no check in `PLAN.md` line 33 tests append-only. "Ascending IDs" passes an edited log.

3. **The build record cannot pass its own checker, and the append-only rule blocks the repair.** For: the builder at delivery, and C8.
   - C8 (`AUDIT-LOG.md` line 86) needs `hinshitsu_check.py` to exit 0 on `build-record/`.
   - `FRAMEWORK.md` line 28 and `CONNECTIONS.md` lines 17, 36: `build-record/` must have the template headings and columns. Templates are WU-2 (`FRAMEWORK.md` line 45). The log, framework and connections files already exist with headings chosen before any template.
   - The log may not be edited (`AUDIT-LOG.md` line 3), so it cannot be changed to match a template written later. The only way to pass is to write the template and the checker to fit the build record. That reverses the edge `TPL --> BR` (`CONNECTIONS.md` line 17).
   - C8 also names session state, mind map and coverage ledger. `build-record/` holds 5 files and none of those 3. `BRIEF.md` line 53 says "maintained in real time".
   - Reproduce: list `build-record/`; compare with `PLAN.md` line 17 and line 33 ("required files exist").

4. **Silence is recorded as approval, and the freeze entry quotes no approval.** For: the user, whose criteria are the contract.
   - `BRIEF.md` line 47: criteria "confirmed with the user"; a change needs "explicit user re-approval logged with reason". `PLAN.md` line 18: the CRITERIA entry "quotes the user's approval".
   - E-004 (`AUDIT-LOG.md` line 77): "Sent to the user at 09:50 EST and frozen." No approval is quoted. Sent and frozen share 1 minute.
   - E-005 (line 95): "no objection received". A-004 (line 114): "no objection".
   - Reproduce: search E-004 to E-006 for a quoted user sentence that approves C1 to C10 or the 8 Baby Bird rules. Messages 3 and 4 are requests; neither approves the wording the planner wrote.
   - Effect: the build breaks the rule it plans to write, and line 33 lists no check for a quoted approval, so the checker will not see it.

5. **A criterion has no single current text; C2 now contradicts itself.** For: the correctness auditor who tests C2 "line by line" (`AUDIT-LOG.md` line 80).
   - C2 says each section holds "every element the brief lists for it" and names sections 0 to 22.
   - E-006 (line 101) changes C2 by a prose delta: section 0 is a gate; section 21 covers only 2 cases. `BRIEF.md` line 65 lists for section 21 "always for ChatGPT, Perplexity, Kimi, Muse, Gemini" and "run auditor roles serially". `BRIEF.md` line 45 lists for section 1 the single-agent passes. `PLAN.md` line 16 makes the agent stop instead.
   - `FRAMEWORK.md` line 26 says "Sections 0 to 23". C2 says 0 to 22. C11 (line 94) adds 23. `PLAN.md` line 32 has lint test C1 to C4 and C6, so no script tests that section 23 exists.
   - `FRAMEWORK.md` line 9 says the 3 entries control and declines to restate them. A reader must merge E-004, E-005 and E-006 by hand, and E-004 already holds 2 forward patches (lines 79, 89).
   - Reproduce: give 2 auditors C2 and `BRIEF.md` line 65. One fails the skill for dropping the 5 named platforms; the other passes it under E-006. Both follow the text.

6. **Builder, orchestrator and merger are 1 agent, and that agent holds the auditors' scope and record.** For: the user, who asked for work that is not self-graded (`BRIEF.md` line 7).
   - E-002 (`AUDIT-LOG.md` line 46) translates the need as "Builder, auditor and merger are different agents".
   - `PLAN.md` line 15: the ORCHESTRATOR merges, and "The same agent may hold ORCHESTRATOR and BUILDER". `FRAMEWORK.md` line 36: the orchestrator session is the builder. So builder equals merger.
   - The same agent writes each auditor's scope (D-004, line 127), saves each report (`FRAMEWORK.md` line 37), accepts or rejects each lens point (`PLAN.md` line 20), overrules STYLE (line 23), plants the seeded defect (line 22) and picks the fresh red cell (line 21).
   - `BRIEF.md` line 45: "the agent that plans never solely grades". Rejecting a lens point with a reason is grading the plan, done by the planner alone.
   - Term in 2 forms: the log's author role is "planner" in 7 entries (lines 15, 57, 75, 91, 98, 105, 120) and "orchestrator" in 1 (line 6). `PLAN.md` line 15 lists 5 roles and "planner" is not among them. Line 4 of the log makes "author role" part of the entry heading, so a script has no closed list to match.
   - Reproduce: draw 1 box per role in `PLAN.md` line 15 and put the Devin session `7c9f…` in each box it holds. It lands in plan, build, scope, reconcile, record and merge.

7. **DONE cannot be reached after any UNVERIFIED result, and no other end state exists.** For: the agent at delivery; the user who waived a section to save cost (G6).
   - `PLAN.md` line 26: DONE needs "every criterion VERIFIED", and the agent must not say 5 listed words before DONE.
   - `PLAN.md` line 28: a waived check is reported UNVERIFIED. `BRIEF.md` line 66: a check that cannot run is UNVERIFIED. `PLAN.md` line 16: a DEGRADED run is allowed.
   - `PLAN.md` line 24 allows a ledger cell `UNVERIFIED` + reason and blocks only an empty cell. So the ledger gate passes and the DONE gate fails on the same fact.
   - Reproduce: the user waives section 12. The agent finishes everything else. It may not say the work is finished, and no defined term names "delivered with gaps". A-006 and A-008 are "Not verified" today (`AUDIT-LOG.md` lines 116, 118), so this build is on that path.
   - Second sense: criteria are VERIFIED (line 26); cells are `PASS` (line 24). No line maps one word to the other. "N/A" has no glossary entry in the brief's 13 terms (`BRIEF.md` line 38).

8. **`CONNECTIONS.md` disagrees with itself and with `FRAMEWORK.md` section 4.** For: any agent that traces before a change (`CONNECTIONS.md` line 3).
   - Inside the file: the Mermaid block has 17 edges (lines 7 to 23); the edge list expands to 19 (lines 30 to 39). Row at line 32 sends GLOSSARY to adapters and example; the diagram has only `GLOSS --> SKILL` and `GLOSS --> TPL` (lines 9, 10).
   - Against `FRAMEWORK.md` line 26: section numbers feed adapters, templates, README, lint and example. The graph has only adapters and lint (lines 12, 13, 33).
   - Against `FRAMEWORK.md` line 27: artifact rules feed templates, the checker, the example and `build-record/`. The graph has no `SKILL --> EX` and no `SKILL --> BR`; the checker edge is labeled "structural rules" (line 14), a different name for the same contract.
   - Against `FRAMEWORK.md` line 29: the checker feeds README. The graph has `LINT --> README` instead (line 23), and lint is not a provider in section 4 at all.
   - Missing nodes: `FRAMEWORK.md`, `CONNECTIONS.md` and `PLAN.md` themselves; `CHANGELOG.md` (WU-5, `FRAMEWORK.md` line 48); the 2 precog skills that set the format (A-007); the ban list and the 13-term list that lint reads from the brief (`PLAN.md` line 32).
   - Missing contract: the run folder has 7 files (`PLAN.md` line 17) and the brief has 4 templates (`BRIEF.md` lines 17 to 20). `FRAMEWORK.md`, `SESSION-STATE.md` and `DELIVERY-REPORT.md` have no template, yet line 33 checks report headings "in order". The heading order then lives in `SKILL.md` and in the script, with no edge that says which controls.
   - Reproduce: plan a rename of section 13. Trace forward on the diagram: 2 nodes. Trace on `FRAMEWORK.md` line 26: 5 consumers.

9. **IDs can collide, and 3 formats are in use.** For: `hinshitsu_check.py` and anyone who cites a finding.
   - Parallel writers: `PLAN.md` line 22 runs 8 sub-agents at once; each starts blind (D-004). Line 23 gives each finding an ID. Reports are saved word for word (line 22), so the orchestrator may not renumber. 2 auditors will both issue F-001.
   - Per-run scope: the example run and this build each have C1, E-001 and so on (`PLAN.md` line 41, C8). `EXAMPLE.md` and README cite both. D-010 (line 133) says an ID is "assigned once" and names no scope.
   - Formats: `C1`, `G1` (no hyphen); `A-001`, `D-001`, `E-001` (3 digits); `WU-1` (1 digit). `FRAMEWORK.md` line 17 states 1 form, "(D-010)".
   - Unlisted prefixes: V, O, VA (`AUDIT-LOG.md` lines 25, 35, 53) are not in D-010 or `FRAMEWORK.md` line 17. A pattern for `A` plus digits matches inside `VA1`.
   - Rule IDs: `PLAN.md` line 8 uses `section.rule` (6.4). They are not in D-010. Inserting a rule renumbers the rest, which D-010 forbids. `6.4` also reads as a version number (G9).
   - Lens memo points have no ID, yet `PLAN.md` line 20 needs "each memo point" in a reconciliation table.

10. **Several formats cannot be parsed, and 1 rule conflicts with the ban list.** For: `scripts/lint.py`, `scripts/hinshitsu_check.py`, and C4.
    - Verbatim quotes against the ban: `BRIEF.md` line 46 needs verbatim needs; line 63 puts the VoC statement in the delivery report; `PLAN.md` line 33 fails a report with a banned word; C4 exempts only the ban list and `BRIEF.md` (`AUDIT-LOG.md` line 82). The build record already holds a banned word inside a quote at `AUDIT-LOG.md` line 36. Reproduce: `grep -n -i -w` for the 12 words across the 4 non-brief files returns that line.
    - Word matching: no rule says whole word or stem. The 5-letter and 6-letter entries occur inside common longer words, and 3 entries are phrases (`BRIEF.md` line 39).
    - "8 roles" (`PLAN.md` line 22): `BRIEF.md` line 57 lists 7. The 8th is not named, so the ledger's column count (line 24) is open.
    - "branch": a code branch in `BRIEF.md` line 54 and `PLAN.md` line 24; a git branch in D-009 (`AUDIT-LOG.md` line 132). For a document deliverable (VA3, line 55) "function" and "branch" rows have no meaning and no `N/A` rule covers a whole row class.
    - Ledger cell: "`PASS` + evidence path" (`PLAN.md` line 24) states no separator and no escape for `|` inside a reason.
    - "claim" (`PLAN.md` line 25): no unit is defined (sentence, bullet, table row), so "no ASSERTED claim" (line 33) has nothing to count.
    - "open BLOCKER" (line 33): finding status changes over time, the log is append-only, and reports in `audits/` are free text. No line says where status lives or how a later entry closes an earlier one.
    - C7 passes the checker "on the example folder" (`AUDIT-LOG.md` line 85); the run folder is `skills/hinshitsu/example/run/` (`PLAN.md` line 41) and the checker takes a run folder (line 33).
    - Clocks: user messages in EST (`BRIEF.md` lines 5, 82, 86, 90), entry stamps in UTC, entry bodies in EST (`AUDIT-LOG.md` lines 77, 95, 107, 114).

## What to cut

- **The hand-drawn Mermaid block in `CONNECTIONS.md`** (lines 5 to 24). It is a second copy of the edge list and already differs by 2 edges (point 8). Keep 1 table with 1 row per edge; a script may print the diagram from it.
- **The contracts table in `FRAMEWORK.md` section 4 as a separate list** (lines 21 to 30). It is a third copy of the same edges. Add a "Contract" column to the edge table and point section 4 at it, as lines 9 and 13 already do for criteria and decisions.
- **The Status column in `FRAMEWORK.md` section 6** (lines 42 to 48). `SESSION-STATE.md` holds running state (`BRIEF.md` line 52). 2 homes for work-unit status will drift, and line 3 forbids deleting a superseded line, so each status change adds a line.
- **The seeded-defect check as written** (`PLAN.md` line 22). It makes a second copy of the deliverable with no folder, no ID and no rule for deleting it, and the audited party runs it (point 6). Keep it only with a home in `evidence/` and a role other than the builder.
- **"planner" as an author role** (`AUDIT-LOG.md`, 7 headings). It is not in the role list (`PLAN.md` line 15). Use 1 name.
- **The waiver as a fourth way to skip a check** (`PLAN.md` line 28). DEGRADED, UNVERIFIED and overrule already exist. Record a waiver as a user overrule with result UNVERIFIED, so 1 mechanism and 1 entry type cover it.
- **The `LINT --> README` edge** (`CONNECTIONS.md` line 23). No contract backs it (point 8).

## What to add

- **Exits for every status** (point 1): for BLOCKER, a withdrawal path run by an auditor other than the one that raised it; a cap on fresh red-cell runs; a rule that ends the 0-finding loop; a lens pass that does not need a finding.
- **A defined end state for a run with gaps** (point 7): for example DONE-WITH-GAPS, with the words the agent may say, and a line that maps `PASS` to VERIFIED.
- **1 entry type that restates a changed criterion in full** (point 5). The current text of C2 is then the latest entry that names C2. E-006 style deltas stop.
- **A correction entry for points 2 and 4**: a new entry that names E-001 to E-005, states which were edited after their stamp, and records that no approval was received. Line 3 of the log already allows this form.
- **A finding register** (points 9, 10): a role other than the builder assigns `F-` IDs on receipt, and maps each to the report file and the auditor's own number. Status is the latest log entry that names the ID. Closed list of status words.
- **1 ID grammar** (point 9): `PREFIX-digits`, a closed prefix list that includes V, O, VA, a memo-point prefix and a rule prefix (for example `R-6.4`), and a run prefix when 2 runs share a repository.
- **A place for the "superseded" mark** (`BRIEF.md` line 51, `FRAMEWORK.md` line 3). Decisions live only in the append-only log (`FRAMEWORK.md` line 13), so nothing can be marked. State that a later DECISION entry naming the old ID is the mark.
- **A quote rule for the ban list** (point 10): text inside quotation marks that cites a source is exempt, and the matcher is whole-word, case-blind, on a stated list of forms.
- **A closed list of entry types and author roles** for the log heading (`AUDIT-LOG.md` line 4). 7 types are in use; `PLAN.md` line 33 names 3.
- **An append-only test** in `hinshitsu_check.py`: no entry may cite an ID or a user message later than its own stamp; with git, no commit may change a line of an earlier entry.
- **1 clock rule**: UTC in every artifact, the user's local time in brackets if quoted.
- **Missing edges and nodes** from point 8, and a contract for the 3 run-folder files that have no template.
- **The 8th swarm role by name**, or the number 7 (`PLAN.md` line 22).
- **Row rules for the ledger by deliverable type**: which row classes exist for code and which for a document (point 10).

## The 1 change this lens insists on

Adopt this rule word for word:

> **Every status has a named exit.** For each status word the skill defines (BLOCKER, DEFECT, FRAGILITY, STYLE, UNVERIFIED, DEGRADED, INSUFFICIENTLY ADVERSARIAL, frozen), the GLOSSARY must state 3 things: the event that sets the status, the role that may clear it, and the log entry type that records the clearing. A role must not clear a status it set. A BLOCKER has exactly 3 exits: (1) the BUILDER fixes it and an AUDITOR that did not raise it re-audits and records PASS; (2) a second AUDITOR, given only the written trigger, fails to reproduce it and records WITHDRAWN with the steps it ran; (3) the user ends the run. A loop that re-runs a role must state a maximum count; at the maximum the agent must stop and report the status to the user as UNVERIFIED. `hinshitsu_check.py` must fail a run in which any status has no clearing entry and the run is reported as delivered.

Assumption: exit (2) is not an overrule under `BRIEF.md` line 59, because that line makes "reproducible" part of what a finding is.

## Checked and found sound

- **Single source for rule text.** D-001 (`AUDIT-LOG.md` line 124), C6 (line 84) and `PLAN.md` line 37 agree: adapters point to `SKILL.md` and copy no rule. This fits `BRIEF.md` line 70 ("or references it").
- **Criteria and decisions are not restated in `FRAMEWORK.md`** (lines 9, 13). 1 home each; the defect in point 5 is inside the log, not between the 2 files.
- **Section numbering.** D-003 (line 126) appends Baby Bird as 23 and leaves 0 to 22 in the brief's order (`BRIEF.md` lines 44 to 66). No renumbering.
- **Counts.** 13 glossary terms (`BRIEF.md` line 38, C3). 12 banned entries (`BRIEF.md` line 39, C4). 16 files in the layout less 1 is 15 (`BRIEF.md` lines 13 to 28, E-006). 7 adapters in `PLAN.md` line 37, `FRAMEWORK.md` line 46 and A-001. 4 red-cell triggers in `PLAN.md` line 21 and `BRIEF.md` line 50. 8 Baby Bird rules, (a) to (h), in C11 and `PLAN.md` line 27. 8 assumptions in E-007 (line 107).
- **The swarm test.** D-004's 3 conditions (line 127) are cited the same way in E-001 (line 9), `PLAN.md` lines 16 and 37, and E-006 (line 101).
- **Work order against edge direction.** `PLAN.md` line 45 builds each provider before its consumer in `CONNECTIONS.md` lines 9 to 23. No cycle in the diagram.
- **Edge direction rule.** `CONNECTIONS.md` line 3 defines the arrow once, and all 10 rows of the edge list follow it.
- **Branch and `main`.** D-009 (line 132), `PLAN.md` line 45 and C10 (line 88) agree, and end where `BRIEF.md` line 80 asks.
- **Example paths.** `PLAN.md` line 41, D-007 (line 130) and `FRAMEWORK.md` line 38 name the same folder.
- **Perplexity removal.** A-002, D-005, C1 and E-006 agree, and A-002 states what happens if it is false (line 112).
- **Banned words in the 4 non-brief files.** 1 hit, at `AUDIT-LOG.md` line 36, reported in point 10. `FRAMEWORK.md`, `CONNECTIONS.md` and `PLAN.md` have 0.
- **Not examined:** anything outside `build-record/`, by instruction. I did not open the precog skills, the Dental_Mgmt lens files, any vendor page, or the git history.
