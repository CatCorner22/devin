# Lens memo: recipient experience

Reviewer: independent session. Scope: `build-record/` on `devin/hinshitsu-build` at commit `24751e2`. Line numbers are per file at that commit.
Assumption 1: the 3 recipients are those named at `AUDIT-LOG.md` lines 20 to 22 (E-002).
Assumption 2: where the plan is silent on a step, the recipient gets no instruction for it.

## What breaks

1. **The user must make 5 kinds of decision and the plan never says how the agent asks.**
   - For whom: the user.
   - Citation: `PLAN.md` line 16 (accept DEGRADED "in writing"), line 18 (approve criteria), line 23 (the user alone overrules DEFECT and FRAGILITY), line 28 (waive "a named section"); G8 (license). The user said he does not understand all technical aspects (`BRIEF.md` line 88).
   - Gap: E-005 (d) and (e) require a default and a 1-sentence term explanation, but only for "user-owned decisions" in 1 batch before freeze (`AUDIT-LOG.md` line 94). No rule covers a decision that arises mid-run. No rule states the words the user replies with.
   - Reproduce: read `PLAN.md` line 23 as the user. A FRAGILITY finding arrives. Write your reply. The plan gives no question format, no recommendation, no consequence and no reply words.

2. **The build's own record treats silence as approval, and the plan has no rule for a user who does not answer.**
   - For whom: the user (gets criteria he never approved); the agent (no instruction while waiting); the third party (cannot find the approval).
   - Citation: `PLAN.md` line 18 requires a CRITERIA entry "that quotes the user's approval". E-004 says "Sent to the user at 09:50 EST and frozen" (`AUDIT-LOG.md` line 77) and quotes no approval. E-005 says "no objection received" (`AUDIT-LOG.md` line 95). A-004 says "no objection" (`AUDIT-LOG.md` line 114). The agent "must follow it without the user present" (`AUDIT-LOG.md` line 21).
   - Reproduce: search E-004 for quoted user words that approve C1 to C10. There are none. The brief arrived at 09:47 and the freeze happened at 09:50 (`BRIEF.md` line 5; `AUDIT-LOG.md` line 75).

3. **The red-cell rules can loop with no exit, and the user's only exits use words he was never taught.**
   - For whom: the agent and the user.
   - Citation: `PLAN.md` line 21 (the red cell must attack at least 1 unlisted premise; its findings are BLOCKER); line 22 (a round with 0 findings triggers a red-cell probe); line 23 (nobody may overrule a BLOCKER, including the user; the user may "end the run or change criteria through catchball").
   - Reproduce: trace 1 work unit. Fix all findings. The re-audit returns 0 findings. Line 22 fires a probe. Line 21 obliges the probe to return a finding or be re-run. Line 23 makes it a BLOCKER. Repeat. No line states a round limit or what the agent tells the user at the limit. "Catchball" has no plain-word step in the plan.

4. **The delivery report has no size limit and the user cannot read it.**
   - For whom: the user.
   - Citation: `BRIEF.md` line 63 lists 7 parts after the summary. `PLAN.md` line 24 sets ledger rows as "every file, function, branch and criterion" and columns as every audit role plus 2. `PLAN.md` line 33 tests only "required headings in order".
   - Reproduce: count the example. 1 file, about 10 functions, about 20 branches, 11 criteria is about 42 rows. 8 roles plus 2 is 10 columns. That is about 420 cells for a 1-file page (`PLAN.md` lines 22, 24, 41). No line caps the summary, bans defined terms in it, or says which parts the user must read and which he may skip.

5. **Exit 0 from the checker reads as "verified" and it proves only structure. The third party cannot test the main control.**
   - For whom: the user and the third party.
   - Citation: G2 says "The user gets a pass or fail without reading every artifact" (`AUDIT-LOG.md` line 64). `FRAMEWORK.md` line 29 says exit 0 means "the structural rules hold". `PLAN.md` line 26 puts exit 0 inside DONE. `PLAN.md` line 33 checks that a `PASS` "cites a path that exists". D-004 condition 2 needs a sub-agent that "starts without the builder's conversation" (`AUDIT-LOG.md` line 127). The run folder at `PLAN.md` line 17 holds reports, and holds no sub-agent prompt and no session ID.
   - Reproduce: make a folder with the files at `PLAN.md` line 17, empty evidence files, and a ledger whose `PASS` cells cite them. Each check at line 33 passes. Then open any file in `audits/` and look for proof that a separate sub-agent wrote it. The folder holds none.
   - Also: `PLAN.md` line 22 says "8 roles"; `BRIEF.md` line 57 lists 7. A third party who counts columns cannot tell which number controls.

6. **Nothing tests a fresh agent that receives only the skill, and nothing tests an install.**
   - For whom: the agent and the user.
   - Citation: `PLAN.md` line 41: the orchestrator session that writes the skill also runs the example, on Devin. C6 tests links and claims (`AUDIT-LOG.md` line 84). C7 tests paths and the checker (`AUDIT-LOG.md` line 85). `PLAN.md` line 37 promises "install steps" for 7 surfaces. V4 says the example is how the user verifies the skill executes (`AUDIT-LOG.md` line 28).
   - Reproduce: read C1 to C11 (`AUDIT-LOG.md` lines 79 to 89). No test installs the skill on any surface. No test gives `SKILL.md` to an agent with no build context and checks what it does first. The example proves the author can follow the author's own rules.

7. **Section order is not run order, and the plan has no run sequence.**
   - For whom: the agent.
   - Citation: D-003 puts Baby Bird at section 23 (`AUDIT-LOG.md` line 126). E-005 (a) requires the gap list "before criteria freeze", which is section 3 (`AUDIT-LOG.md` line 94; `BRIEF.md` line 47). The skill is 30 to 40 KiB (`PLAN.md` line 9). A-008 says full loading is "Not verified per surface" (`AUDIT-LOG.md` line 118). G3 records a 16 KiB limit on 1 surface (`AUDIT-LOG.md` line 65).
   - Reproduce: read sections 0 to 23 in order as an agent. You freeze criteria at section 3 and meet the gap-list rule 20 sections later. If the surface cuts the file at 16 KiB, you never meet it.

8. **The user cannot scale a small job down, and the record contradicts the plan on who may suggest it.**
   - For whom: the user.
   - Citation: `PLAN.md` line 28: the user waives "a named section"; "The agent must not propose a waiver to save its own effort." G6 says "Agent proposes, user uses" (`AUDIT-LOG.md` line 68).
   - Reproduce: as the user, ask for a 1-word fix in a README. To avoid 4 lens memos, a red cell and 8 auditors (`PLAN.md` lines 20 to 22) you must name section numbers you have not read. The agent cannot tell from line 28 whether offering the smaller run breaks the rule, because no third party can test "to save its own effort".

9. **The user will meet words nobody explains to him.**
   - For whom: the user.
   - Citation: section names "Hoshin kanri catchball", "Nemawashi", "Jidoka", "Kaizen/hansei" (`BRIEF.md` lines 47, 48, 58, 64) stay fixed under D-003. Labels DEGRADED, VOC-ASSUMED, INSUFFICIENTLY ADVERSARIAL, FRAGILITY reach the report (`BRIEF.md` line 38; `PLAN.md` lines 16, 21, 23). The glossary serves the contract (`PLAN.md` line 7), not a lay reader. E-005 (e) does not say where the 1-sentence explanation appears (`AUDIT-LOG.md` line 94). Maps use Mermaid (`BRIEF.md` line 53), and VA1 only guesses the user reads on GitHub (`AUDIT-LOG.md` line 53).
   - Reproduce: give a non-programmer this sentence built from `PLAN.md` lines 16 and 23: "Run is DEGRADED; 1 FRAGILITY open; jidoka stop." Ask what he must do next.

10. **Two rules the agent cannot perform as written.**
    - For whom: the agent and the third party.
    - Citation (a): `PLAN.md` line 24 requires rows for every "function, branch". VA3 extends the skill to documents and plans (`AUDIT-LOG.md` line 55). A memo has no function and no branch.
    - Citation (b): `PLAN.md` line 26 bans the words "done", "ready", "complete", "finished", "shipped" before DONE. An honest status line such as "WU-1 is not complete" breaks it.
    - Reproduce (a): fill the ledger for a 2-page contract memo. Reproduce (b): search any mid-run status message for the 5 words.

## What to cut

- **The full ledger, maps and audit log inside the delivery report body.** Keep them as files. Put 1 line of counts and 1 link each in the report. `BRIEF.md` line 63 lists them in the report, so this cut needs the user's approval (`PLAN.md` line 18).
- **The 5-word ban at `PLAN.md` line 26.** Replace it with: the agent must not state that the deliverable meets DONE before the DONE checklist passes. The word list costs false findings and buys nothing a reader can use.
- **The per-finding lens answer in the log (`PLAN.md` line 20, last sentence).** Keep the lens tag. No recipient reads the answer, and the reconciliation table already carries the lens view.
- **A seeded-defect check on every 0-finding round (`PLAN.md` line 22).** Run it 1 time per auditor role per run. The brief does not ask for it (`BRIEF.md` line 60), and each repeat delays the user.
- **Adapters with no install evidence presented as working (`PLAN.md` line 37).** Ship each adapter that nobody installed with the label UNVERIFIED at the top (`BRIEF.md` line 66).
- **The G2 sentence "The user gets a pass or fail without reading every artifact" (`AUDIT-LOG.md` line 64).** A later log entry must correct it. The script reports structure only (`FRAMEWORK.md` line 29).

## What to add

- **A decision card rule.** See the next heading. It answers points 1, 2, 8 and 9.
- **A silence rule.** While the agent waits for the user, it must do only work that no pending answer can change, and it must log the wait. Cite: `AUDIT-LOG.md` lines 77, 95.
- **A stop rule for the red-cell loop.** After 2 fix rounds on the same work unit, the agent must stop and send the user a decision card: end the run, change a criterion, or pay for 1 more round. Cite: `PLAN.md` lines 21 to 23.
- **A run sequence at the top of `SKILL.md`.** 1 table, in execution order, each row naming the section it comes from. The gap list sits before the freeze. Cite: D-003; `AUDIT-LOG.md` line 94.
- **A first-screen core.** The rules an agent needs before its first action (gate, run sequence, decision card, DONE) must fit in the first 8 KiB of `SKILL.md`. Cite: G3; A-008.
- **A cold-start criterion.** A sub-agent that receives only `SKILL.md`, the glossary and a 1-line task must write a CAPABILITY entry and a gap list before any other output. Save its transcript in the example folder. Cite: `PLAN.md` line 41; C7.
- **An install test per adapter.** Either a saved transcript of the install steps followed on that surface, or the label UNVERIFIED. Cite: C6; `PLAN.md` line 37.
- **A summary limit for the delivery report.** At most 200 words; 3 fixed headings ("What you got", "What was proven", "What was not proven"); no capitalized defined term without its plain-word meaning in the same sentence; then 1 line: "You may stop reading here." Cite: `BRIEF.md` line 63.
- **A user page in the README: "What you will be asked and what to answer".** It lists each moment the agent stops for the user and a sample reply. Cite: `PLAN.md` lines 16, 18, 23, 28.
- **A third-party test procedure (`TESTING.md`).** Inputs, steps, expected result, and a plain statement of what exit 0 does not prove. The script must print that statement on exit 0. Cite: `PLAN.md` line 33; `FRAMEWORK.md` line 29; A-006.
- **Sub-agent proof in the run folder.** For each report in `memos/` and `audits/`: the prompt word for word and the session or task ID. Cite: D-004; `PLAN.md` line 17.
- **Run sizes the agent may offer.** Define 2 named sizes (full; small change) in the skill. The agent may state which size fits and why; the user picks. This removes the conflict between G6 and `PLAN.md` line 28.
- **Ledger rows by deliverable type.** Code: file, function, branch, criterion. Document: file, heading, criterion. Cite: `PLAN.md` line 24; VA3.
- **A plain-word name beside each Japanese section name on first use in anything the user reads.** For example "Jidoka (stop the line)". Cite: `BRIEF.md` lines 47, 48, 58, 64.
- **Fix the role count.** State 7 or name the 8th role. Cite: `PLAN.md` line 22; `BRIEF.md` line 57.

## The 1 change this lens insists on

Adopt this rule word for word:

> **Decision card.** Each time the agent needs the user to approve, choose, overrule, waive or accept anything, the agent must send the user a decision card and must stop the work that depends on the answer. The card must hold at most 120 words and exactly 4 parts: (1) the question in 1 sentence; (2) the answer the agent recommends and the reason in 1 sentence; (3) for each possible answer, what the user gets and what the user gives up; (4) the exact words the user may reply with. The card must not use a section number, and must not use a capitalized defined term unless the same sentence states its meaning in plain words. The agent must not treat silence, or a reply on another subject, as an answer. The agent must copy the card and the user's reply word for word into `AUDIT-LOG.md` before it acts on the reply.

Basis: `PLAN.md` lines 16, 18, 23, 28; `AUDIT-LOG.md` lines 77, 95, 114; `BRIEF.md` line 88. A third party tests it by counting words and parts on each card in the log and matching each acted-on decision to a quoted reply.

## Checked and found sound

- **Recipient identification.** E-002 names all 3 recipients and quotes the user's own words (`AUDIT-LOG.md` lines 20 to 22, 24 to 32).
- **Translation table.** Each customer phrase maps to a criterion (`AUDIT-LOG.md` lines 43 to 50).
- **Single source of rule text (D-001).** The agent reads 1 text; adapters copy no rule (`AUDIT-LOG.md` line 124).
- **Rule shape and rule IDs.** Actor, verb, action, proof, and IDs of the form `section.rule` let a third party cite a rule (`PLAN.md` line 8).
- **Finding format.** File, line, trigger, class, rule, status give a third party what it needs to reproduce a finding (`PLAN.md` line 23).
- **Evidence rule.** A final auditor opens each cited path and re-runs each cited command (`PLAN.md` line 25). The step is concrete.
- **Ledger cell values.** 4 fixed values, each with a path, ID or reason (`PLAN.md` line 24). The cell format is clear; only the row count and placement fail (points 4, 10).
- **Stable IDs (D-010).** A reader can follow a reference across files (`AUDIT-LOG.md` line 133).
- **Clock rule (G10) and secrets rule (G7).** Both are steps an agent can perform and a third party can check (`AUDIT-LOG.md` lines 69, 72).
- **Baby Bird content, rules (a) to (h).** The 8 rules match the user's request in message 3 (`AUDIT-LOG.md` line 94; `BRIEF.md` line 88). Only their position and reach fail (points 1, 7).
- **Gap table format in E-003.** The columns "Recommended answer", "Why, in plain words", "Cost", "Who decides" are readable by the user (`AUDIT-LOG.md` line 61).
- **Dropping the Perplexity adapter (D-005).** It follows user message 4 (`BRIEF.md` line 92; `AUDIT-LOG.md` line 128).
- **`CONNECTIONS.md` edge list.** Each edge has a "Broken when" test a third party can apply (`CONNECTIONS.md` lines 28 to 39).
- **Append-only log header.** Entry format and time source are stated in 2 lines (`AUDIT-LOG.md` lines 3 to 4).
