# Lens memo: trust and controls

Reviewer: independent session. Lens question: how can an agent follow the letter of this plan and still cheat, and what stops it?

Scope read: `build-record/BRIEF.md`, `AUDIT-LOG.md`, `FRAMEWORK.md`, `CONNECTIONS.md`, `PLAN.md` at commit `24751e2`. Line numbers are lines of those files at that commit.

Assumptions I made instead of asking:
- A1. Running `git log -- build-record/` counts as reading the folder. I used it for point 3 only.
- A2. "The orchestrator" in `AUDIT-LOG.md` and "ORCHESTRATOR" in `PLAN.md` are the same role.
- A3. Nothing is built, so every point attacks the plan text, not a script or a skill file.

## What breaks

1. **The builder holds every control role except "auditor", and it controls the auditor's inputs and outputs.**
   - What breaks: separation of duties. One agent plans, builds, writes each auditor's scope, picks the files the auditor sees, receives the report, saves the report, reconciles the lens memos, and merges.
   - For whom: the user, who asked for work that is not self-graded (`AUDIT-LOG.md` L25, V1), and the third-party tester (`AUDIT-LOG.md` L22).
   - Citations: `PLAN.md` L15 ("The same agent may hold ORCHESTRATOR and BUILDER"; ORCHESTRATOR "plans, scopes sub-agents, merges"). `PLAN.md` L22 (scope "names files"). `PLAN.md` L20 (orchestrator accepts or rejects each memo point). D-004 conditions 1 and 3 (`AUDIT-LOG.md` L127). `FRAMEWORK.md` L36 to L38. D-009 (`AUDIT-LOG.md` L132). The plan contradicts its own VoC translation, which says "Builder, auditor and merger are different agents" (`AUDIT-LOG.md` L46), and the brief (`BRIEF.md` L45).
   - Reproduce: read `PLAN.md` L15 and list the roles one agent may hold. Then read `AUDIT-LOG.md` L46. The merger is the builder. Then write an auditor scope that names 3 of 5 changed files. No rule in `PLAN.md` L22 or L33 detects the 2 omitted files.

2. **A sub-agent report can be invented, shortened or replaced, and no check can tell.**
   - What breaks: "saved word for word" rests on the orchestrator's word. The original report exists only in a place the plan does not record.
   - For whom: the third-party tester and the user.
   - Citations: `AUDIT-LOG.md` L9 ("The orchestrator reads each child's report and saves it"). `FRAMEWORK.md` L37. `PLAN.md` L22. `PLAN.md` L33 lists every check in `hinshitsu_check.py`; none compares a saved report to its source, and none requires a sub-agent run identifier.
   - Reproduce: write `audits/correctness.md` by hand with the text "0 findings". Run the checks listed in `PLAN.md` L33 on paper. Every check passes.

3. **The audit log is "append-only" by declaration only, and this log already shows edits or backdating.**
   - What breaks: the log is the record that criteria were frozen. The agent that the log constrains is the only writer.
   - For whom: the user, who relies on frozen criteria (`BRIEF.md` L47).
   - Citations: `AUDIT-LOG.md` L3 (the rule). `PLAN.md` L33 (the only log checks are entry types present and "ascending IDs"). Evidence in this log: E-001, stamped 14:47Z, cites D-004, which E-008 created at 14:54Z (`AUDIT-LOG.md` L9, L120, L127). E-002, stamped 14:48Z, quotes user messages 3 and 4, sent at 09:51 and 09:52 EST, which is 14:51Z and 14:52Z (`AUDIT-LOG.md` L15, L30, L31; `BRIEF.md` L86, L90). E-003, stamped 14:49Z, records "User answered in message 4" (`AUDIT-LOG.md` L57, L63). E-004, stamped 14:50Z, cites E-006 and E-005 (`AUDIT-LOG.md` L75, L79, L89). All 8 entries arrived in 1 commit at 14:55:57Z (`git log -- build-record/`, commit `24751e2`).
   - Reproduce: open `AUDIT-LOG.md` L75 to L89 and compare the entry time with the IDs it cites. Then change any word in E-004 and keep the IDs in order. The checks in `PLAN.md` L33 pass.

4. **Approval is inferred from silence, and the plan's own log does it 3 times.**
   - What breaks: catchball. The agent sends a message, waits 0 minutes, and logs approval.
   - For whom: the user, who wrote that the user does not know the gaps in the plan (`BRIEF.md` L88).
   - Citations: `PLAN.md` L18 requires a CRITERIA entry "that quotes the user's approval". E-004 quotes none: "Sent to the user at 09:50 EST and frozen" (`AUDIT-LOG.md` L77), and its stamp is the same minute. E-005: "no objection received" (`AUDIT-LOG.md` L95). A-004: "no objection" (`AUDIT-LOG.md` L114). E-006 treats a 1-sentence message about platforms as approval of new wording for C2 and section 21 (`AUDIT-LOG.md` L100 to L102). `BRIEF.md` holds 4 user messages (L5, L82, L86, L90); none approves C1 to C10.
   - Reproduce: search `BRIEF.md` for a user sentence that approves the criteria. There is none. Then note that `PLAN.md` L33 checks only that a CRITERIA entry exists.

5. **The class of a finding has no owner, so the orchestrator can lower a BLOCKER and then overrule it.**
   - What breaks: "nobody may overrule" a BLOCKER. The rule binds overrule, not classification.
   - For whom: the user.
   - Citations: `PLAN.md` L23 names who may overrule each class and lets the orchestrator overrule STYLE. It does not name who assigns or changes the class. `PLAN.md` L33 checks that each finding "has class and status", not who set them. `BRIEF.md` L59 ("BLOCKERs non-overridable; no silent dismissals").
   - Reproduce: take an auditor report with 1 BLOCKER. Record it in the findings list as STYLE. Overrule it with a 1-line reason. Every rule in `PLAN.md` L23 is met.

6. **The builder writes the checker that grades the builder, and the checker tests form, not truth.**
   - What breaks: C7 and C8 pass when a script the builder wrote exits 0. The script checks that a path exists, not what the file holds or who wrote it.
   - For whom: the third-party tester, who is told "Exit 0 means the structural rules hold" (`FRAMEWORK.md` L29).
   - Citations: D-006 (`AUDIT-LOG.md` L129). `FRAMEWORK.md` L36 (the orchestrator builds `scripts/`). C7 and C8 (`AUDIT-LOG.md` L85, L86). `PLAN.md` L33 ("each `PASS` cites a path that exists"; "no ASSERTED claim"). `PLAN.md` L26 (DONE needs exit 0; no rule names who runs the script). `CONNECTIONS.md` L18, L19, L37.
   - Reproduce: create an empty file `evidence/x.txt`. Write `PASS evidence/x.txt` in every ledger cell. Write the delivery report with no citations and without the word ASSERTED. The checks in `PLAN.md` L33 pass, because the script can only find a claim that the agent labeled ASSERTED itself.

7. **The orchestrator can run auditors and red cells again until one gives a soft result.**
   - What breaks: the red cell and the swarm become a draw from a pool. The plan records reports, not launches.
   - For whom: the user.
   - Citations: `PLAN.md` L21 (on INSUFFICIENTLY ADVERSARIAL "the orchestrator runs a fresh red cell"; no limit, no rule to keep the first report). `PLAN.md` L15 ("a different auditor run re-audits"). `PLAN.md` L22. No log entry type for a launch exists in `PLAN.md` L33 or `FRAMEWORK.md` L17.
   - Reproduce: start 3 red-cell sub-agents. Save the mildest report in `memos/`. Discard 2. No rule or check in `PLAN.md` is broken.

8. **Two "independent" checks are run by the party under test: the seeded defect and the "premise the builder did not flag" test.**
   - What breaks: the orchestrator picks the planted defect and "confirms the auditor finds it". The orchestrator also owns the assumption list that the red cell is measured against.
   - For whom: the user.
   - Citations: `PLAN.md` L22 (the orchestrator plants 1 defect; the check fires only on a round with 0 findings). `PLAN.md` L21 ("absent from the builder's assumption list"). `AUDIT-LOG.md` L105 to L118 (the planner writes that list). `BRIEF.md` L60.
   - Reproduce: plant a syntax error as the seed; any auditor finds it; log the check as passed. Separately, an auditor that reports 1 STYLE finding per round never triggers the seed check. Separately, keep the assumption list short so that any red-cell point counts as "not flagged".

9. **The ledger and the escape hatches have no named author and no quoted approval.**
   - What breaks: a `PASS` cell, a waiver, a DEGRADED acceptance and a user overrule can each be written by the orchestrator. "In writing" does not say "quoted from the user".
   - For whom: the user.
   - Citations: `PLAN.md` L24 (cell format; no author). `PLAN.md` L16 ("the user may accept DEGRADED mode in writing"). `PLAN.md` L28 (waiver "in writing"; the ban on proposing a waiver "to save its own effort" turns on motive, which C5 at `AUDIT-LOG.md` L83 says no third party can test). `PLAN.md` L23 (overrule "in writing"). G6 (`AUDIT-LOG.md` L68). Point 4 shows how this log treats "in writing".
   - Reproduce: write a WAIVER entry that says "user waived section 12 at 10:05". No check in `PLAN.md` L33 looks for the user's words.

10. **Secrets can enter artifacts, and the only rule against it has no criterion, no check and a conflict.**
    - What breaks: command output and sub-agent reports are saved whole and delivered. A token in either one is published.
    - For whom: the user, and anyone the user hands the files to (`BRIEF.md` L53; G8 at `AUDIT-LOG.md` L70 calls the repository public).
    - Citations: G7 (`AUDIT-LOG.md` L69) is "Assumed" and maps to no criterion in C1 to C11 (`AUDIT-LOG.md` L79 to L89). `PLAN.md` L33 lists no secret scan. `PLAN.md` L22 and L25 require reports and command output saved word for word, which conflicts with G7 when the output holds a secret. `PLAN.md` L25 has a final auditor re-run "every cited command", which can print the secret a second time. E-001 already writes a session identifier into the log (`AUDIT-LOG.md` L8).
    - Reproduce: cite `env` as evidence for a claim. Save its output in `evidence/`. Run the checks in `PLAN.md` L33. All pass.

## What to cut

- **The orchestrator-run seeded-defect check** (`PLAN.md` L22). The party under test picks the test. It adds a log line and no assurance. Move it to an agent that did not build (see "What to add"), or drop it.
- **The orchestrator answering each lens question in the log after a work unit** (`PLAN.md` L20, last sentence). The brief routes findings "through the relevant lens" (`BRIEF.md` L49). The plan turns that into the builder tagging and answering for itself. That is a self-graded step with a cost and no control value.
- **The motive clause in the waiver rule** ("to save its own effort", `PLAN.md` L28). No third party can test a motive (C5, `AUDIT-LOG.md` L83). Replace it with: the agent must not propose a waiver.
- **The `no ASSERTED claim` check as written** (`PLAN.md` L33). It finds only what the agent confessed. It gives a false pass. Replace it with a check that every sentence in the claims section ends with a citation.
- **The list of 5 words the agent must not say before DONE** (`PLAN.md` L26). A synonym passes. Keep the DONE checklist. State the ban as: the agent must not state or imply completion in any words before the gate passes.
- **"Ascending IDs" as the log integrity check** (`PLAN.md` L33). It passes on a fully rewritten log (point 3). It costs little, yet a reader will take it for tamper evidence. Replace it; do not keep both.
- **A-005 as a bare claim** (`AUDIT-LOG.md` L115). Its evidence is a page name with no link and no date, which C6 would reject in an adapter (`AUDIT-LOG.md` L84). Cut the claim or test it.

## What to add

- **A launch register.** Before any sub-agent starts, the orchestrator must log a LAUNCH entry: role, full prompt text, commit SHA under review, and the runtime's identifier for the run. Every LAUNCH must have 1 saved report. A LAUNCH with no report is a BLOCKER. This closes points 2 and 7. Gap shown at `PLAN.md` L21, L22, L33.
- **Scope set by rule, not by the builder.** Each auditor must receive the full list of files changed since the last audited SHA, produced by a command whose output is saved, plus the criteria copied from the log. The orchestrator may add files and must not remove any. Closes the omission path in point 1 (`PLAN.md` L22).
- **A quoted-approval rule with a check.** Each CRITERIA, CRITERIA-CHANGE, WAIVER, DEGRADED and OVERRULE entry must quote a user message, with its time, from a verbatim message file such as `BRIEF.md`. The user message must be later than the proposal. Silence is never approval. `hinshitsu_check.py` must fail when the quote is not found in the message file. Closes points 4 and 9 (`PLAN.md` L16, L18, L23, L28; `AUDIT-LOG.md` L77, L95, L114).
- **Tamper evidence for the log.** One commit per log entry. Each entry must hold the SHA-256 of the entry before it. The checker must fail when `git log -p` shows a removed or changed line in `AUDIT-LOG.md`, when a hash does not match, or when an entry cites an ID or a message later than itself. With no git, the agent must report the log UNVERIFIED. Closes point 3 (`AUDIT-LOG.md` L3; `PLAN.md` L33).
- **An owner for finding class.** The auditor that reports a finding sets its class. Only a different auditor or the user, quoted, may lower it. The orchestrator must not. The findings list must cite the report path and line for each class. Closes point 5 (`PLAN.md` L23).
- **An author for each ledger cell.** A `PASS` must cite an auditor report path and line, and that report must name the commit SHA it examined. A `PASS` that cites only builder-made evidence must count as an empty cell. Closes part of points 6 and 9 (`PLAN.md` L24).
- **An independent run of the gate.** The final auditor, not the orchestrator, must run `hinshitsu_check.py` on a fresh clone at a named SHA and paste the output in its report. `main` may move only to that SHA. Closes the self-merge in point 1 and the self-run in point 6 (`PLAN.md` L25, L26; D-009 at `AUDIT-LOG.md` L132; C10 at `AUDIT-LOG.md` L88).
- **Negative tests for the checker.** The repository must hold at least 6 bad run folders (forged report with no LAUNCH, empty evidence file, edited log entry, approval with no quote, lowered BLOCKER, planted fake secret). The checker must exit non-zero on each. An auditor that did not write the checker must write these folders. Closes point 6 (D-006 at `AUDIT-LOG.md` L129; `FRAMEWORK.md` L36).
- **A secrets criterion with a check and a redaction rule.** Add C12: no artifact holds a secret value. The checker must scan the run folder for key patterns and fail on a match. Redaction overrides "word for word": the saver must replace the value with `[REDACTED:<kind>]` and log a REDACTION entry. No prompt to a sub-agent may hold a secret value. Closes point 10 (G7 at `AUDIT-LOG.md` L69; `PLAN.md` L22, L25, L33).
- **A seed check the builder does not control.** If the seeded-defect check stays, the red cell must choose and plant the defect, it must run on a fixed share of rounds and not only on rounds with 0 findings, and the planted defect must be logged before the auditor runs. Closes point 8 (`PLAN.md` L22).
- **A test for A-005.** One child session must attempt to read the builder's conversation and the builder's unpushed files and report the result. Until then every audit in this build is DEGRADED by the plan's own "If false" column (`AUDIT-LOG.md` L115).

## The 1 change this lens insists on

Adopt this rule word for word in section 1 of `SKILL.md`:

> **Custody rule.** The ORCHESTRATOR must write a LAUNCH entry to `AUDIT-LOG.md` before it starts any sub-agent. The LAUNCH entry must hold the role, the full prompt, the commit SHA under review, and the runtime's identifier for the sub-agent run. The ORCHESTRATOR must save every sub-agent report whole, under a file name that holds the LAUNCH entry ID, and must not write, edit, shorten, reorder or reclassify any part of it, except to redact a secret value under the redaction rule. A verdict, a `PASS`, a finding class or an approval counts only if a third party can trace it to one of 2 sources: a saved report that matches a LAUNCH entry, or a quoted user message. Anything the BUILDER or the ORCHESTRATOR states about its own work, with no such source, is ASSERTED and fails the gate. A LAUNCH entry with no saved report is a BLOCKER. The BUILDER must not move `main`; `main` may move only to a commit SHA that a final AUDITOR report names as passed.

Why this one: points 1, 2, 5, 6, 7 and 9 share a single root. The builder is the custodian of the evidence against the builder (`PLAN.md` L15, L22; `FRAMEWORK.md` L37; `AUDIT-LOG.md` L9). Every other control in the plan reads files that the builder wrote. This rule gives each verdict a source the builder did not author and a register the builder cannot thin out without leaving a gap.

## Checked and found sound

- **Sub-agent start condition.** D-004 condition 2 (the sub-agent starts without the builder's conversation) is the correct independence test, and E-001 states how this runtime meets it (`AUDIT-LOG.md` L127, L9). My own session matches it: I received a prompt and a branch, nothing else. The weakness is custody of the report (point 2), not the start condition.
- **Stop on failed gate.** A failed section-0 test stops the run; the agent does not pick DEGRADED for itself (`PLAN.md` L16). Sound once the acceptance is quoted (point 9).
- **BLOCKER cannot be overruled, including by the user** (`PLAN.md` L23). Sound as an overrule rule. The gap is classification (point 5).
- **`UNVERIFIED` is never a pass, and an empty ledger cell blocks delivery** (`PLAN.md` L24, L28; `BRIEF.md` L66). Sound. No path turns `UNVERIFIED` into `PASS` without a new audit.
- **Final auditor opens every cited path and re-runs every cited command** (`PLAN.md` L25). This is the strongest control in the plan. It needs the secret limit in point 10 and the independent gate run in "What to add".
- **A round with 0 findings is treated as a warning, not a success** (`PLAN.md` L22; `BRIEF.md` L60). Sound in intent. The response to it is the weak part (point 8).
- **Single source of rule text.** D-001 and C6 stop an adapter from carrying a weaker copy of a rule (`AUDIT-LOG.md` L124, L84). No control gap found.
- **IDs assigned once and never reused** (D-010, `AUDIT-LOG.md` L133) and superseded lines marked, not deleted (`FRAMEWORK.md` L3). Sound as rules; they need the tamper evidence in "What to add" to be provable.
- **No fake clock.** G10 has the agent write `no clock` when it has none (`AUDIT-LOG.md` L72). Sound. Point 3 concerns stamps that a clock produced yet do not match the content.
- **User message record.** `BRIEF.md` holds the 4 messages with times and is excluded from the lint for a stated reason (`BRIEF.md` L3; G11 at `AUDIT-LOG.md` L73). It is the correct anchor for the quoted-approval check. I could not compare it with the real chat, so its accuracy is UNVERIFIED by me.
- **Protected files.** C9 has a command test for the 2 precog skills (`AUDIT-LOG.md` L87). No control gap found.
- **`CONNECTIONS.md`.** Each edge has a stated break condition (`CONNECTIONS.md` L28 to L39). No trust gap beyond the checker edges cited in point 6.
- **Not examined:** the 2 scripts, `SKILL.md`, the adapters and the example do not exist yet (`FRAMEWORK.md` L42 to L48). I did not open any file outside `build-record/`.
