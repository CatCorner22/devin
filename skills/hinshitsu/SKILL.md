---
name: hinshitsu
description: hinshitsu (品質, "quality") is the conductor of 7 skills that make an AI coding agent deliver stable, verified, end-user-ready work instead of self-graded output. It gates the run on real sub-agents, keeps builder and auditor apart, sets the tier, runs the 12 stages in order, and calls hinshitsu-baby-bird-plan, hinshitsu-challenge, hinshitsu-record, hinshitsu-audit, hinshitsu-delivery and hinshitsu-gauge. Use it whenever a task produces anything a person will receive, run, read or rely on (code, a page, an app, a script, a document, a plan, a design, data, a migration), at the end of any build, plan or design phase, and before you tell anyone that work is finished, including when the request only says "is this ready", "is it done", "ship it", "hand it off", "send it", "wrap it up", "finalize", "good to go", "merge it", "make sure it works", "verify this", "QA this" or "hinshitsu". Read it before the first action of the task, not after the work is built.
---

# hinshitsu: the conductor

Version 2.0.0. The 7 hinshitsu skills are 1 contract between the USER and the AGENT. `GLOSSARY.md`, beside this file, defines every term in capitals; each has that 1 meaning in all 7 skills.

- A sentence in the imperative ("Write…", "Do not…") states an obligation of the ORCHESTRATOR.
- `must` states an obligation of the actor the sentence names; `must not`, a prohibition; `may`, a discretion that nobody else has.
- A rule is cited by section and number ("rule 13.2"). Section numbers are unique across the 7 skills.
- **Precedence.** Sections 1 and 17 control over every other section. After them, the lower-numbered section controls. No rule lets an AGENT audit its own work, decide a CRITERION for the USER, or treat no reply as an answer.
- **Evidence.** A run either has the artifact a rule requires or has broken the rule. Do not state that the DELIVERABLE meets DONE, in any words, before every part of DONE is met.
- **Re-read.** Hosts cut long skills from memory. At the start of each STAGE, read the `SKILL.md` that the table below names for it, whole, from the file.

## Run sequence

This skill holds sections 0, 1, 21 and 22. Perform the 12 STAGES in this order. The section numbers follow the brief's topics, not time; this table is the order in time.

| STAGE | What happens | Skill to read | Sections |
|---|---|---|---|
| S1 | Capability gate, TIER, roles | `hinshitsu` | 0, 1 |
| S2 | RUN FOLDER, framework, maps, session state | `hinshitsu-record` | 7, 8, 9, 10, 18 |
| S3 | Voice of the Customer; gap list | `hinshitsu-baby-bird-plan` | 2, 23 |
| S4 | Assumptions; CRITERIA written as `PROPOSED` | `hinshitsu-baby-bird-plan` | 4, 3 |
| S5 | 4 LENS memos and the RED CELL attack the plan | `hinshitsu-challenge` | 5, 6 |
| S6 | Reconcile; 1 DECISION CARD to the USER; CRITERIA `FROZEN` | `hinshitsu-baby-bird-plan` | 3, 23 |
| S7 | For each WORK UNIT: build, audit, stop on BLOCKER, fix, re-audit | `hinshitsu-audit` | 13, 14, 15, 16 |
| S8 | Checks on what the RECIPIENT receives; stability | `hinshitsu-audit` | 11, 12 |
| S9 | Pre-delivery RED CELL attack and premortem | `hinshitsu-challenge` | 6 |
| S10 | Audit of the audit | `hinshitsu-delivery` | 17 |
| S11 | Delivery report | `hinshitsu-delivery` | 19 |
| S12 | Lessons | `hinshitsu-delivery` | 20 |

`hinshitsu-gauge` (section 24) draws where the run stands after each STAGE entry. While the USER has not answered the S6 card, do only work that no pending answer can change (rule 23.5).

## 0. Capability declaration

1. **Entry.** Before any other action on the task, write a `CAPABILITY` entry as the first entry of `AUDIT-LOG.md` in the RUN FOLDER. It must state: (a) the runtime and surface by name (Claude Code, Cursor, Devin, Codex or ChatGPT Work, Gemini CLI, Kimi Code CLI, Muse Code, or the name of any other runtime); (b) the path of the RUN FOLDER; (c) the tool that starts a SUB-AGENT; (d) for each of the 5 parts of SWARM-CAPABLE, `yes` or `no` with the reason; (e) whether the AGENT can write files, run commands, use git, open a browser, take screenshots and read a clock, each `yes` or `no`; (f) the mode, `SWARM` or `DEGRADED`; (g) the number of SUB-AGENT runs the TIER requires, counted from rule 0.5.
2. **Live probe.** Test parts 2, 4 and 5 of SWARM-CAPABLE; do not assume them. Start 1 SUB-AGENT whose whole scope is: "State the task the user gave the orchestrator. If you have no record of it, reply NO RECORD." Save its reply, whole, with the identifier the runtime gave the run, as `evidence/capability-probe.md`. A reply other than `NO RECORD` means part 2 is `no`. No identifier means part 4 is `no`.
3. **Gate.** If any part of SWARM-CAPABLE is `no`, do not start S2. Send the USER a DECISION CARD that names the part that failed and what the run loses. If the USER answers that the USER accepts a DEGRADED run, log the answer and follow section 21. If the USER answers otherwise or does not answer, the run ends there and nothing is delivered as checked.
4. **No unused capability.** Do not write `yes` for a capability that the run has not used with success at least 1 time. A capability that fails later is handled under rule 21.4.
5. **TIER.** Write a `TIER` entry before S2 and again before each WORK UNIT's audit. It must hold the output of `git diff --stat` for the planned or finished change, or the file count and line count where no git exists, and the TIER that follows from them:
   - `CORE` — the change touches at most 3 files and at most 100 lines, and includes no action that section 18 covers.
   - `FULL` — every other change, and any run in which the USER wrote the word "full".

   In a `FULL` run every STAGE and every role runs. In a `CORE` run: S5 and S9 are logged as skipped; at S7 exactly 1 AUDITOR, the correctness auditor, runs every test the CRITERIA name and saves each output under `evidence/`; every role that did not run is listed UNVERIFIED in the delivery report with the TIER numbers. The AGENT must not choose a lower TIER than the numbers give and must not split a change to lower them. The USER may raise the TIER at any time. When a later `TIER` entry gives `FULL`, the run is `FULL` from that entry on and S5 runs before more building.
6. **Clock.** Take each time from a clock command. If the runtime has no clock, write `no clock` in place of each time and rely on entry numbers for order. Do not invent a time.
7. **STAGES.** Write a `STAGE` entry when each STAGE starts and when it ends. The start entry must state the STAGE (`S1` to `S12`), the event `start`, and the path, byte count and SHA-256 of the `SKILL.md` read for it under the re-read rule. The end entry must state the event `end` and the artifacts the STAGE produced, by path. During S7, write 1 more `STAGE` entry with the event `progress` each time a WORK UNIT ends its audit, stating `Work units: <complete> of <declared>`. A STAGE that a TIER or a WAIVER skips gets 1 entry with the event `skipped` and the reason. Do not write an `end` entry for a STAGE whose artifacts do not exist.
8. **Gauge.** After each `STAGE` entry, run `hinshitsu-gauge` (rule 24.1) and show the USER the result in the next message the USER receives.
9. **Unlisted runtime.** On a runtime that this rule does not name, apply rules 0.1 to 0.3 as written. The adapters under `adapters/` map tool names only; they add no rule and remove none.

## 1. Separation of duties

1. **3 duties.** For every WORK UNIT, 3 duties stay apart: building it, auditing it, and deciding that a FINDING against it is closed.
2. **BUILDER.** The BUILDER of a WORK UNIT must not audit it, must not write or edit a report on it, and must not classify, reclassify or close a FINDING against it.
3. **AUDITOR.** An AUDITOR must not change the DELIVERABLE. An AUDITOR proposes a fix in its report; the BUILDER applies it; a new SUB-AGENT that did not raise the FINDING re-audits it.
4. **Planner.** The AGENT instance that wrote the plan must not be the only grader of the result: every `PASS` in `COVERAGE-LEDGER.md` must cite an AUDITOR's report, or the output of a command that an AUDITOR ran. The ORCHESTRATOR may hold the BUILDER role. The ORCHESTRATOR must not hold an AUDITOR, LENS or RED CELL role in a `SWARM` run.
5. **Custody: launch.** Before starting any SUB-AGENT, write a `LAUNCH` entry that holds: the role; the path of the scope, saved word for word under `prompts/`; the commit under review, or `no git`; and, as soon as the runtime returns it, the identifier of the SUB-AGENT run. A scope must consist of the role's text from `templates/roles/`, the CRITERIA word for word, and file names; it must not tell the SUB-AGENT what to conclude.
6. **Custody: report.** Save every SUB-AGENT report whole under `audits/` or `memos/`, in a file whose first line is the runtime's identifier for the run and whose name holds the `LAUNCH` entry ID. Do not write, edit, shorten, reorder, rename or reclassify any part of a report, except to replace a secret value with `[REDACTED]` under rule 9.8. Where git exists, commit each report alone, before acting on it.
7. **Custody: every run counts.** Do not discard a report and do not start a second SUB-AGENT in the same role on the same commit to obtain a milder result. Where 2 reports on the same commit disagree, the harsher result controls. A `LAUNCH` entry with no saved report is a BLOCKER.
8. **Source of a verdict.** A verdict, a `PASS`, a FINDING class or an approval counts only when a third party can trace it to 1 of 2 sources: a saved report that matches a `LAUNCH` entry, or a quoted message from the USER. A statement by the BUILDER or the ORCHESTRATOR about its own work, with neither source, is ASSERTED.
9. **Merge.** The BUILDER must not move the branch that RECIPIENTS use (`main`, a release branch, production). That branch may move only to a commit that the final AUDITOR's report under rule 17.4 names as passed, or that the USER approves in a quoted message.
10. **DEGRADED run.** In a DEGRADED run, perform each role as a separate pass under rule 21.2.

## 21. Degradation

1. **When.** This section applies only (a) after the USER's answer under rule 0.3, or (b) when a SUB-AGENT call fails during a `SWARM` run and 2 more attempts also fail.
2. **Separate passes.** Run each AUDITOR role, each LENS and the RED CELL one after another. Each pass starts from its written scope alone, reads only the files the scope names, and writes its own report file whose first line is `DEGRADED — single-agent audit`.
3. **Marking.** Write `DEGRADED — single-agent audit` on the `Status` line of the delivery report, name each role that ran DEGRADED, and state in the `Summary`, in plain words, that the same AGENT built and checked the work.
4. **Mid-run failure.** When a capability fails mid-run, write a `CAPABILITY` entry with the failure and its EVIDENCE, then continue under this section for the affected roles only.
5. **No pretending.** Never write that a swarm, a SUB-AGENT, a LENS or the RED CELL ran when 1 AGENT instance performed the pass. Such a statement is a BLOCKER of class (d).
6. **Ledger.** In a DEGRADED run, every cell of `COVERAGE-LEDGER.md` that a DEGRADED pass fills is `UNVERIFIED` + `DEGRADED`, except a cell that cites a command output or a screenshot saved under `evidence/`, which may be `PASS`. A DEGRADED run is never DONE; deliver it as `DELIVERED — NOT DONE`.

## 22. UNVERIFIED

1. **Not run.** Report a check that did not run as UNVERIFIED with the reason. Never report it as passed, as "expected to pass", or as covered by another check.
2. **Wrong target.** A check that ran against something other than the DELIVERABLE the RECIPIENT receives (a mock, the development server, an earlier commit) is UNVERIFIED for the DELIVERABLE.
3. **Listing.** List every UNVERIFIED item in the `Summary` of the delivery report under **What was not proven**, with what the USER can do to check it.
4. **Effect.** A DELIVERABLE with an UNVERIFIED CRITERION is not DONE. Deliver it as `DELIVERED — NOT DONE`.
5. **WAIVER.** The USER may issue a WAIVER for a named section or rule. Log it in a `WAIVER` entry that quotes the USER's message. Every check the WAIVER skips is UNVERIFIED. The AGENT must not treat a deadline, a cost or the USER's silence as a WAIVER. The AGENT may tell the USER what a section costs in SUB-AGENT runs; the USER decides.

## Banned words

These words must not appear in a skill, the glossary, a template, an adapter or any artifact of a run, except in this list and in a quotation of someone else's words: "should", "shall", "appropriate", "reasonable", "proper", "adequate", "ensure", "try to", "as needed", "if possible", "generally", "typically", and their inflected forms. State the actor, the action and the test.
