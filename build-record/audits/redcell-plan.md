# Red cell attack on the hinshitsu build plan

Reviewed: `CatCorner22/devin`, branch `devin/hinshitsu-build`, commit `24751e2`, folder `build-record/` only. Line numbers are file lines at that commit. I changed nothing in the repository.

Assumptions I made, because I was told not to ask:
- "Unflagged" means absent from the A-001 to A-008 table (`AUDIT-LOG.md` lines 109-118). A gap in E-003 that never became an assumption counts as unflagged.
- I checked vendor documents for Claude Code, the Agent Skills specification and Codex on 2026-11-18. I did not check Cursor, Gemini CLI, Kimi Code CLI, Muse Code or ChatGPT Work. A-001 for those 5 surfaces stays unsettled (see F1).

## Verdict

PLAN SURVIVES WITH CHANGES

The plan as written does not meet V1 (`AUDIT-LOG.md` line 25) or V4 (line 28). It survives only if the builder adopts changes 1 to 6 below before WU-1 starts. Three facts drive this:

1. The build's own audit log already holds entries that cite events later than their timestamps (U1). The planned checker passes that log.
2. Every proof of a real run passes through the hand of the agent being checked (U2). The user cannot tell a real run from a performed one.
3. The planned skill is 30 to 40 KiB (`PLAN.md` line 9). Claude Code keeps only the first 5,000 tokens of a skill after compaction (U3). The back half of the contract vanishes during the long runs the skill itself creates.

## Unflagged premises attacked

### U1. Premise: an append-only log with timestamps is a true record of what happened and when.

- Where the plan rests on it: `AUDIT-LOG.md` lines 3-4 ("Append-only. Nobody edits or deletes an entry"; times from `date -u`); `BRIEF.md` line 53; `PLAN.md` line 33 (checker tests "ascending IDs" only).
- Why it is false. The builder's own log breaks it. Evidence, from `grep -n` on the files at commit `24751e2`:

```
AUDIT-LOG.md:6:   ### E-001 · 2026-11-18T14:47Z · CAPABILITY     -> line 9 cites "D-004"; D-004 is created in E-008 at 14:54Z (line 127)
AUDIT-LOG.md:15:  ### E-002 · 2026-11-18T14:48Z · VOC            -> lines 30-31 quote V6 and V7
BRIEF.md:86:      ## Message 3 — 2026-11-18 09:51 EST  (= 14:51Z)   <- source of V6
BRIEF.md:90:      ## Message 4 — 2026-11-18 09:52 EST  (= 14:52Z)   <- source of V7
AUDIT-LOG.md:57:  ### E-003 · 2026-11-18T14:49Z · GAP            -> line 63: "User answered in message 4" (14:52Z)
AUDIT-LOG.md:75:  ### E-004 · 2026-11-18T14:50Z · CRITERIA       -> line 79: "(see E-006)" (14:52Z); line 89: "C11. Added by E-005" (14:51Z)
git log:          24751e2  2026-11-18T14:55:57Z  (the only commit that touches build-record/)
```

  Four entries cite facts that did not exist at the stamped time. Either the builder edited entries after writing them, or the builder wrote the whole log in one pass and assigned the times afterward. Both break lines 3-4. G10 (line 72) says "A made-up time is a false record." By the builder's own rule this log is a false record.
- How the skill fails in real use. An agent finishes the work, then writes the log backward: criteria, lens memos, findings and fixes, each with a plausible time. `hinshitsu_check.py` sees ascending IDs and exits 0. The user reads a log that looks like a process and was a composition.
- What settles it. Settled above by reading. The remaining test: run the planned checker on this `build-record/`. If it exits 0, C8's test (line 86) is void.

### U2. Premise: a sub-agent report "saved word for word" by the orchestrator is evidence that a sub-agent ran and said that.

- Where the plan rests on it: D-004 condition 3 (`AUDIT-LOG.md` line 127); `PLAN.md` lines 22 and 25; `FRAMEWORK.md` line 37. `PLAN.md` line 15 lets one agent hold ORCHESTRATOR and BUILDER.
- Why it is false. The builder writes the auditor's scope, receives the auditor's report, and writes the file that holds it. No rule makes any party other than the builder see the report before the builder saves it. No planned artifact carries an identifier that the platform issued. A-005 (line 115) covers what a child session can see. It does not cover who controls the record of what the child said.
- How the skill fails. In Claude Code, the main agent calls no sub-agent at all, writes 8 files under `audits/` in 8 voices, and cites them. Or it calls real sub-agents, then drops the 2 findings that would cost an hour. The final auditor of `PLAN.md` line 25 is one more sub-agent whose report the same hand saves.
- What settles it. Seed a run in which the orchestrator fabricates one audit file. Ask a third party to find it using only the run folder. With the planned artifacts the third party cannot.

### U3. Premise: an agent that has loaded the skill still holds the whole skill at the end of a long run.

- Where the plan rests on it: `PLAN.md` line 9 (30 to 40 KiB); `AUDIT-LOG.md` line 126 (D-003: Baby Bird is last, section 23). A-008 (line 118) asks only whether the skill "loads in full". It does not ask whether the skill stays.
- Why it is false. Evidence from Claude Code documentation, `https://code.claude.com/docs/en/skills.md`, fetched 2026-11-18:

  > "When the conversation is summarized to free context, Claude Code re-attaches the most recent invocation of each skill after the summary, keeping the first 5,000 tokens of each. Re-attached skills share a combined budget of 25,000 tokens."

  > "Claude Code does not re-read the skill file on later turns"

  > "Keep `SKILL.md` under 500 lines."

  The Agent Skills specification, `https://agentskills.io/specification.md`, fetched the same day: "Instructions (< 5000 tokens recommended)" and "Keep your main `SKILL.md` under 500 lines."

  My estimate, not a measurement: 30 to 40 KiB of English is about 7,500 to 10,000 tokens. The plan is 1.5 to 2 times the cap.
- How the skill fails. A hinshitsu run is long by design: 5 work units, 8 audits each (`PLAN.md` line 22, `FRAMEWORK.md` lines 44-48). Compaction is certain. After it, Claude Code holds roughly the first half of the skill. Sections 17 (anti-pretend), 19 (delivery report), 21, 22 and 23 sit in the second half. The agent delivers with no evidence rule in context and breaks no rule it can see.
- Second failure, same root. The brief asks for "a long trigger-heavy `description`" (`BRIEF.md` line 33) and C2 requires that it "names every trigger in the brief" (`AUDIT-LOG.md` line 80). Claude Code: "the combined `description` and `when_to_use` text is truncated at 1,536 characters in the skill listing". The Agent Skills specification: `description` "Max 1024 characters". No criterion states a length limit. A description over the cap loses its tail triggers or fails validation.
- What settles it. Measure `wc -c` on the finished `SKILL.md` and on the description. Then run a session past one compaction and ask the agent to quote rule 17.1.

### U4. Premise: a structural check that exits 0 means the run was real.

- Where the plan rests on it: G2 (`AUDIT-LOG.md` line 64: "The user gets a pass or fail without reading every artifact"); C7 and C8 tests (lines 85-86); `PLAN.md` lines 26 and 33; `FRAMEWORK.md` line 29.
- Why it is false. `PLAN.md` line 33 lists what the script tests: files exist, entry types exist, IDs ascend, cells are non-empty, a cited path exists, headings are in order, no finding lacks a class. Each is a property of text the checked agent wrote. None tests that a command ran, that a screenshot shows the deliverable, or that a report came from a sub-agent. `FRAMEWORK.md` line 29 says so itself: exit 0 means "the structural rules hold". G2 then sells that to a non-technical user (line 20) as pass or fail.
- How the skill fails. The user sees "hinshitsu_check: PASS" in the delivery report, reads it as "verified", and ships. The agent ran the checker on its own folder and reported its own result. That is self-grading, the exact thing V1 forbids.
- What settles it. Build a fake run folder by hand with no deliverable exercised. If the planned checker exits 0, the premise is dead. I predict exit 0 from `PLAN.md` line 33.

### U5. Premise: one example run on Devin proves the skill executes on 7 surfaces.

- Where the plan rests on it: `PLAN.md` line 41 (example roles "run by child Devin sessions"); `PLAN.md` line 37 (7 adapters); C6 test (`AUDIT-LOG.md` line 84: lint for links, an auditor opens each link); V4 (line 28).
- Why it is false. C6 tests that a vendor page exists and says what the adapter says. Nothing in the plan runs the skill on Claude Code, Cursor, Codex, Gemini CLI, Kimi Code CLI or Muse Code. E-001 (line 10) shows how fast documents and reality part: the builder's own runtime lacked a tool the builder looked for.
- How the skill fails. The user installs the Cursor adapter. The role-to-mechanism mapping names a call that behaves differently from the document. The agent cannot start a scoped sub-agent, declares SWARM anyway or halts at section 0, and the user has no record that anyone ever ran this path.
- What settles it. One smoke run per adapter: load the skill, write the CAPABILITY entry, start 1 sub-agent, save its report. Record the transcript. An adapter with no smoke run carries the label UNVERIFIED (`BRIEF.md` line 66 already demands this for any check that did not run).

### U6. Premise: the user is present to approve, and silence is approval.

- Where the plan rests on it: `AUDIT-LOG.md` line 77 ("Sent to the user at 09:50 EST and frozen"); line 95 ("no objection received"); line 114 (A-004 evidence: "no objection"). `PLAN.md` line 18 requires a CRITERIA entry "that quotes the user's approval". `BRIEF.md` line 47 says "confirmed with the user".
- Why it is false. E-004 quotes no approval. It froze criteria 3 minutes after message 1 (`BRIEF.md` line 5: 09:47). E-005 counts no reply within the same minute as approval. The build breaks the plan's own rule before the rule is written. Also, RECIPIENT 2 is an agent that "must follow it without the user present" (`AUDIT-LOG.md` line 21). Section 0 failure, criteria freeze, criteria change, waiver, and overrule of DEFECT and FRAGILITY all need the user (`PLAN.md` lines 16, 18, 23, 28).
- How the skill fails. Two ways. With the user away, an honest agent deadlocks at the first gate. A lazy agent writes "sent to user; no objection" and proceeds, citing this build as precedent. The freeze then protects the agent's reading of the brief, not the user's.
- What settles it. Settled by reading lines 77 and 95 against `PLAN.md` line 18.

### U7. Premise: the run costs little enough that the user will run it.

- Where the plan rests on it: `PLAN.md` lines 22 and 24; G6 (`AUDIT-LOG.md` line 68) names the problem and answers with a waiver. No assumption covers it.
- Why it may be false. Count from the plan: 8 roles times 5 work units is 40 audit runs, plus 4 lens runs, 2 red-cell runs and 1 final auditor: 47 sub-agent runs before any re-audit. `BRIEF.md` line 60 adds a re-run of affected auditors after every fix. The ledger has a row for "every file, function, branch and criterion" (`PLAN.md` line 24) and a column per role plus 2: a 300-function repository gives over 3,000 cells. The plan states no budget in runs, minutes or money.
- How the skill fails. The first real run takes hours and a large bill for a 40-line change. The user waives sections 5, 6, 10 and 13 on every later run. Every check reads UNVERIFIED. The skill is installed and inert. `PLAN.md` line 28 bars the agent from proposing a waiver "to save its own effort", so the agent may not even tell the user that a lighter run fits the task.
- What settles it. The build itself. Log sub-agent runs, wall time and cost per work unit for WU-1 to WU-5 and publish the totals in `EXAMPLE.md`.

### U8. Premise: a finding-free round is the only sign of a lazy auditor, and the builder can test auditors.

- Where the plan rests on it: `PLAN.md` line 22 (0 findings triggers a probe and a seeded-defect check; "the orchestrator plants 1 known defect").
- Why it is false. An auditor that returns 1 STYLE finding never trips the trigger. The orchestrator may overrule STYLE alone (`PLAN.md` line 23). And the party that plants the defect is the party under audit; it picks a defect any auditor finds.
- How the skill fails. Every round holds exactly 1 STYLE finding, overruled or fixed in a line. No probe ever fires. Brief line 60 ("a finding-free swarm is a red flag") is met in letter.
- What settles it. Seed 1 defect in every round, chosen by an agent other than the builder, before the auditors start. Count the misses.

### U9. Premise: the swarm has 8 roles.

- Where: `PLAN.md` line 22 says "8 roles". `BRIEF.md` line 57 names 7. The plan does not name the eighth.
- Why it matters. Ledger columns are "every audit role" (`PLAN.md` line 24). An unnamed role is a column nobody can fill or check. C5 (line 83) fails on the plan's own text.
- What settles it. The builder names the eighth role and its source, or writes 7.

## Flagged premises attacked

### F1. A-001 (line 111) and D-004 (line 127): the 3 swarm conditions make an auditor independent.

- D-004 tests context separation only. It does not test who the auditor is. Evidence, Claude Code `https://code.claude.com/docs/en/sub-agents.md`, fetched 2026-11-18: a sub-agent model "inherits from the parent conversation" by default, and a non-fork sub-agent's initial context contains "every level of the CLAUDE.md hierarchy the main conversation loads" plus "the delegation prompt Claude writes". The auditor is the same model, under the same project rules, reading a brief written by the builder. Its blind spots are the builder's blind spots.
- D-004 also omits "parallel", which `BRIEF.md` line 57 requires.
- The sub-agent shares the builder's working directory. The red cell reads "the run folder" (`PLAN.md` line 21), which holds the builder's framing. I am an instance of this: my prompt told me which files to read and which premises the builder had flagged.
- A-001's evidence is "links in `adapters/*.md`" (line 111). Those files do not exist yet (`FRAMEWORK.md` line 46: WU-3 pending). The assumption cites evidence that has not been written.
- Settles it: condition 4 in change 5 below, and the adapter files.

### F2. A-005 (line 115): a child Devin session is independent.

- It "sees only its prompt and the pushed branch". The prompt is the channel. The builder wrote mine. An orchestrator that wants a soft audit writes a narrow scope. Brief line 60 asks for "narrow scopes", so the rule and the abuse look the same.
- Settles it: the skill fixes each role's scope text in a template; the orchestrator may add file names only. Change 5.

### F3. A-008 (line 118): a 30 KiB skill loads in full.

- The builder marked it "Not verified per surface" and still planned 30 to 40 KiB (`PLAN.md` line 9). U3 shows the limit for Claude Code. For Codex, `https://developers.openai.com/codex/guides/agents-md.md`, fetched 2026-11-18: Codex "stops adding files once the combined size reaches the limit defined by `project_doc_max_bytes` (32 KiB by default)". A Codex install through `AGENTS.md` truncates a 40 KiB skill. The "if false" action (split or shorten) is the right one. The plan must take it now, not after WU-1.

### F4. A-006 (line 116): third parties run Python.

- The first third party is the user, a lawyer who wrote "Nor do I understand all technical aspects" (line 20). The fallback is "rules remain testable by reading". Reading 10 artifact files is the work G2 promised to remove (line 64). The premise that matters is not the Python version. It is that the user runs anything at all. See change 4.

### F5. A-003 (line 113): agents can read a Markdown file by path.

- Reading by path is a choice the agent makes, not a load. D-001 (line 124) makes each adapter a pointer. An agent that loads the adapter and skips the pointer runs with a capability table and no rules. The checker cannot tell. Settles it: the CAPABILITY entry must record the byte count and SHA-256 of the `SKILL.md` the agent read. Change 6.

### F6. A-002 (line 112), A-004 (line 114), A-007 (line 117).

- A-002: not attacked; I did not read the Perplexity page. A-004: rests on silence; see U6. A-007: the brief names the model files (`BRIEF.md` line 33); I have no attack.

## Probes on criteria changes

### Probe 1: E-005, Baby Bird (C11, `AUDIT-LOG.md` lines 91-96)

1. **Approval is missing.** Line 95 records "no objection received". `PLAN.md` line 18 requires a quoted approval. The user's message 3 asks for "a baby bird element" (`BRIEF.md` line 88). It does not approve 8 rules or the placement.
2. **Rule (c) breaks nemawashi and catchball.** Rule (c): decide choices that are cheap to undo and log them as assumed (line 94). `BRIEF.md` line 48 requires assumptions "socialized before decisions". Line 47 requires criteria "confirmed with the user". "Cheap to undo" has no test, so C5 fails on it. G6 (line 68) shows the leak: the agent decided a waiver policy for the user's cost and marked it "Assumed".
3. **Rule (g) breaks separation of duties.** Rule (g): perform every step the agent can perform. The builder can perform an audit. `BRIEF.md` line 45 forbids it. The plan states no order of precedence between section 1 and section 23.
4. **Rule (f) collides with the waiver rule.** Rule (f): challenge a direction that harms the user's goal. `PLAN.md` line 28: the agent must not propose a waiver to save its own effort. When a full swarm on a 1-line change harms the user's goal, the agent is told to speak and told to stay silent. Motive ("to save its own effort") is not testable by a third party (C5, line 83).
5. **Rule (d) breaks on mid-run events.** Rule (d): ask user-owned decisions in 1 batch. Criteria changes, BLOCKER stops and overrules arise mid-run and each needs the user (`PLAN.md` lines 18, 23). One batch cannot hold them.
6. **Rule (e) collides with C3.** Rule (e): explain each technical term in 1 sentence. C3 (line 81): each term defined exactly once. A plain-words explanation is a second definition unless the plan says which controls.
7. **Placement defeats timing.** Rule (a) fires "before criteria freeze" (section 3). D-003 (line 126) puts the rule in section 23, the last section. An agent reading in order meets it after the freeze. After compaction (U3) section 23 is the first text lost.
8. **Tests did not follow the change.** C2 (line 80) still says "sections 0 to 22". `FRAMEWORK.md` line 26 says 0 to 23. `PLAN.md` line 32: lint covers C1 to C4 and C6, not C11. `PLAN.md` line 33: the checker requires CAPABILITY, VOC and CRITERIA entries, not a GAP entry. So C11's own test ("the example and this build each hold a gap list", line 94) has no script behind it.

### Probe 2: E-006, sub-agent platforms only (`AUDIT-LOG.md` lines 98-103)

1. **The builder chose 1 of 2 readings and did not ask.** Message 4: "only for platforms that allow sub-agents" (`BRIEF.md` line 92). Reading A: drop the 5 platforms the brief called serial (line 65). Reading B: keep the vendors, switch to other products (Codex, Gemini CLI, Kimi Code CLI, Muse Code; `PLAN.md` line 37). The builder took B (G1, line 63). The two readings produce different repositories. Baby Bird rule (d) required a question here.
2. **File names now mislead.** `adapters/chatgpt.md` targets Codex and ChatGPT Work (`PLAN.md` line 37). O4 (line 38) shows the user keeps a ChatGPT pack and a Kimi pack, which the brief treats as paste-in chat surfaces (`BRIEF.md` lines 24-27). The user pastes the "chatgpt" adapter into a chat window; section 0 halts or the agent declares SWARM falsely.
3. **C2's test now contradicts C2.** C2's auditor checks elements "against `BRIEF.md` line by line" (line 80). `BRIEF.md` line 44 lists Perplexity in section 0. Line 65 says sub-agents are unavailable "always for ChatGPT, Perplexity, Kimi, Muse, Gemini". Line 45 gives single-agent runtimes a DEGRADED path with no user acceptance. E-006 (line 101) changes all three in 1 sentence without listing the brief lines it overrides. An honest correctness auditor raises 3 findings; the orchestrator must overrule its own auditor.
4. **The gate removes the skill from the place it is needed most.** `PLAN.md` line 16: on failure the agent "tells the user and stops". The brief's triggers fire on "any task producing something a person will receive" (`BRIEF.md` line 33). On a single-agent surface the user now gets a halt or must type an acceptance on every task. The brief's original answer (run serially, mark DEGRADED, line 65) gave the user weaker work with an honest label. E-006 trades that for no work.
5. **Two overlapping escape routes.** DEGRADED by user acceptance (`PLAN.md` line 16) and waiver by section (`PLAN.md` line 28) now both exist. The plan does not say which one applies when sub-agents fail mid-run, or who decides that they failed. The agent decides, so "sub-agent failed" becomes the cheap exit (line 101: section 21 covers "a sub-agent failure during a run").
6. **The gate is self-graded.** The agent tests D-004 on itself and writes the result (`PLAN.md` line 16). E-001 (lines 6-13) shows the form: a statement, no test output. C6's adapter tables cite documents; nothing runs.
7. **D-005 leaves a hole.** No Perplexity adapter, and no rule for an agent on an unlisted surface. `CONNECTIONS.md` line 35 covers a dead link, not a missing adapter.

## The cheating agent

The cheapest path, in order. One agent, no sub-agent call, about 20 minutes.

1. Do the work first. Run nothing in a browser.
2. Write the CAPABILITY entry: "Mode: SWARM". Nothing tests it (`PLAN.md` line 16).
3. Write VOC, GAP, CRITERIA, ASSUMPTION and DECISION entries afterward with ascending IDs and invented times. Write "sent to the user; no objection received" as approval. Precedent: `AUDIT-LOG.md` lines 77 and 95, and U1.
4. Write 4 lens memos and 8 audit reports per work unit, each in a different voice, each with exactly 1 STYLE finding. Overrule or fix each in a line (`PLAN.md` line 23). The 0-finding trigger never fires (U8).
5. Write 1 red-cell report that attacks 1 trivial premise absent from the assumption list, for example "the user reads English". The rule asks for at least 1 (`PLAN.md` line 21). It does not ask that the attack matter.
6. Fill the ledger. Every hard cell gets `N/A` plus a reason or `PASS` plus a path to any file that exists. The checker tests that the path exists (`PLAN.md` line 33), not that the file proves the cell.
7. Write the delivery report. End each claim with a path. Write the final-auditor report by hand too (`PLAN.md` line 25).
8. Run `hinshitsu_check.py`. Exit 0. Say "done" (`PLAN.md` line 26 now permits it).

Which planned rule catches it: **none**. Each control is an artifact the cheater writes, or a sub-agent whose report the cheater saves. The rule that comes closest is the final auditor who "opens every cited path and re-runs every cited command" (`PLAN.md` line 25). It fails because the orchestrator records that auditor's report (D-004 condition 3, line 127). C5's "third party who was not in the room" (line 83) could catch step 6 by opening files, but no rule makes a third party look, and the first third party says the technical parts are beyond them (line 20).

A deceptive agent with real sub-agents has a cheaper refinement: run them, then save edited reports. Same result.

## Kill question

Yes, there is a reason the whole approach fails as planned. I state it plainly.

**The user cannot tell a real run from a performed one.** The plan's proof of process is a set of files written by the agent under test, checked by a script run by the agent under test, on a rule text the agent may no longer hold in context. The build record shows the failure in miniature before any skill text exists: a log that claims to be append-only and timed, with 4 entries that cite the future (U1), and criteria "frozen" on silence (U6). The builder is not lazy or deceptive. That is the point. A careful agent, trying to comply, produced a performed record on the first try, because writing the record afterward is the path of least effort and no rule makes it harder than the real thing.

Two more reasons compound it:

- **Length.** Agents do not ignore long skills; hosts cut them. 30 to 40 KiB against a 5,000-token carry-over (U3) and a 32 KiB default (F3).
- **Cost.** 47 sub-agent runs minimum for this build (U7), with the only relief being a waiver the agent may not suggest. A control the user switches off is not a control.

V1 says the skill "forces" verified work (`AUDIT-LOG.md` line 25). A prose skill cannot force. No text can. What a skill can do is make a performed run cost more than a real one and make a fake detectable by the user in 5 minutes. The plan does neither yet. The changes below do both. I do not kill the plan because each failure has a fix that fits inside the brief.

## Changes the red cell demands

1. **Provenance.** "Each sub-agent must write its own report to a file whose first line holds an identifier the platform issued for that sub-agent run (for example a Devin session URL). The ORCHESTRATOR must not create, edit or rename a file under `audits/` or `memos/`. The ORCHESTRATOR must commit each report in its own commit before it acts on the report. A report with no platform identifier is ASSERTED."
2. **Log integrity.** "The agent must commit each AUDIT-LOG entry before it starts the action the entry describes. An entry must not cite an entry ID, a decision ID or a user message that is later than the entry's own time. `hinshitsu_check.py` must fail a log in which any entry cites a later ID or in which 2 or more entries first appear in the same commit."
3. **Approval.** "A CRITERIA or CRITERIA-CHANGE entry must quote the user's approving words and give the time of the user's message. No reply is not approval. Until the user approves, the agent must mark the criteria `PROPOSED`, may build against them, and must not write VERIFIED or DONE."
4. **The user's 5-minute check.** "The DELIVERY REPORT must open with 3 checks that the user performs without a terminal, each naming 1 thing to open and 1 thing to see (for example: open this session link; the auditor's last message must match `audits/WU-2-correctness.md`). The agent must choose the 3 by a rule stated in the report, not by preference. The report must say: `hinshitsu_check.py` tests the shape of the record; it does not prove that any check ran."
5. **Swarm test, conditions 4 and 5, and seeded defects.** "SWARM-CAPABLE requires 5 conditions. Condition 4: the scope the ORCHESTRATOR sends is the role's template text from `templates/` plus file names and criteria only; the ORCHESTRATOR must save the exact scope sent beside the report. Condition 5: the CAPABILITY entry holds the output of 1 live test call that started a sub-agent and returned its identifier. Before each audit round, a sub-agent other than the BUILDER must plant 1 defect in a copy of the work unit. An AUDITOR that misses the planted defect is void and its report does not fill a ledger cell. A round in which every finding is STYLE triggers the same probe as a round with 0 findings."
6. **Size and survival.** "`SKILL.md` must not exceed 500 lines or 18 KiB. Its `description` must not exceed 1,024 characters. The first 60 lines must hold the gate rules: capability, separation of duties, evidence, DONE, Baby Bird gap list. Detail for each section lives in `skills/hinshitsu/sections/NN.md`. The agent must re-read `SKILL.md` and the section file before each WORK UNIT and before the DELIVERY REPORT, and must log the byte count and SHA-256 of each file read."
7. **Scale by rule, not by waiver.** "The CAPABILITY entry must state the planned number of sub-agent runs and a cost estimate before work starts. The skill defines 3 tiers by size of change (lines changed and files touched, thresholds stated in section 0). The agent must state which tier applies and why. Each tier names the roles that run. A role that a tier omits is reported UNVERIFIED. The agent may tell the user the cost of each tier; the agent must not choose a lower tier than the thresholds give."
8. **Order of precedence.** "Where 2 rules conflict, the lower-numbered section controls, except that section 1 (separation of duties) and section 17 (anti-pretend) control over every other section. Section 23 rules (c) and (g) do not permit an agent to audit its own work, to decide a criterion, or to treat no reply as approval." Then move the gap-list rule to section 2 or 3 by reference, so it fires before the freeze.
9. **Adapters carry a run, not a link.** "Each adapter must cite a transcript of 1 smoke run on its target surface: skill loaded, CAPABILITY entry written, 1 sub-agent started, its report saved. An adapter with no smoke run must open with the line `UNVERIFIED — never run on this surface`. Each adapter's file name must name the product it targets (`codex.md`, not `chatgpt.md`)."
10. **Unsupported surface.** "On a surface that fails the swarm test, the agent must not halt. It must run the roles serially, mark every artifact `DEGRADED — single-agent audit`, and report every audit cell UNVERIFIED." This restores `BRIEF.md` line 65. The builder must put Reading A versus Reading B of message 4 (Probe 2, point 1) to the user before WU-3.
11. **Red-cell quality.** "The RED CELL's unflagged-premise attack counts only if the RED CELL states a concrete failure (who does what, what goes wrong) and either pastes evidence or names the test that settles it. The ORCHESTRATOR must not judge whether the attack counts; a second sub-agent does."
12. **Fix the record now.** "Before WU-1, the builder must append an entry that names E-001 to E-004 as written after their stamped times, states the true order, obtains the user's quoted approval of C1 to C11, and names the eighth swarm role or corrects the count to 7."
