# hinshitsu glossary

Each term below has 1 meaning everywhere in the 7 hinshitsu skills, the templates, the adapters and every artifact of a run. "The skills" means the 7 `SKILL.md` files under `skills/`. A term in capitals that this file does not define is a FINDING against the file that uses it.

## Parties and roles

**USER** — the person who gave the task and who alone approves each CRITERION.

**AGENT** — the AI system that follows the skills, including every SUB-AGENT it starts.

**RECIPIENT** — each person or system that will receive, run, read or rely on the DELIVERABLE. The USER is a RECIPIENT unless the Voice of the Customer statement says otherwise.

**ORCHESTRATOR** — the AGENT instance that talks to the USER, writes each SUB-AGENT's scope, keeps the RUN FOLDER and sends the delivery report.

**BUILDER** — the AGENT instance that creates or changes a part of the DELIVERABLE. For that part it stays the BUILDER until the run ends.

**AUDITOR** — a SUB-AGENT that examines a WORK UNIT in 1 of the 8 roles in section 13, or that re-audits under rule 14.3, or that performs the final audit of rule 17.4, and that did not build any part of it. An AUDITOR reads and runs; it does not change the DELIVERABLE.

**RED CELL** — the AUDITOR role that attacks premises under section 6.

**LENS** — 1 of the 4 viewpoints in section 5: recipient experience, minimal viable sequence, structural integrity, trust and controls.

**SUB-AGENT** — an AGENT instance that the ORCHESTRATOR starts with a written scope and that returns a written report.

## Things

**DELIVERABLE** — what the task produces, in the exact form the RECIPIENT receives it: the built page and not the source tree; the exported document and not the draft.

**CRITERION** — a numbered statement of what the DELIVERABLE does or contains, with a named test. It is `PROPOSED` until an `AUDIT-LOG.md` entry quotes the USER's approval, and `FROZEN` from that entry on. Plural: CRITERIA.

**WORK UNIT** — the set of changes the BUILDER completes before an audit: at most 1 component of the DELIVERABLE (1 page, 1 module, 1 script, 1 document), declared with an ID in `FRAMEWORK.md` before work on it starts.

**STAGE** — 1 of the 12 steps of a run that the Run sequence table of the conductor lists, `S1` to `S12`.

**TIER** — the size of a run under rule 0.5: `CORE` or `FULL`.

**DECISION CARD** — the message, in the form rule 23.4 requires, by which the AGENT asks the USER to approve, choose, overrule, waive or accept anything.

**RUN FOLDER** — the 1 folder that holds every artifact of a run, named in the CAPABILITY entry. Default: `hinshitsu/` at the root of the repository or workspace.

**EVIDENCE** — a file in the RUN FOLDER that a third party can open and that records what happened: a command with its full output, a screenshot, a recording, a SUB-AGENT report saved word for word, or an `AUDIT-LOG.md` entry cited by its ID.

**PREMISE** — a statement that a plan or decision needs to be true and that the plan does not prove.

**FINDING** — a written report, in the form section 15 requires, that the DELIVERABLE or the run fails a CRITERION or a rule of the skills.

**WAIVER** — the USER's written instruction to skip a named section or rule of the skills for the current run.

## Finding classes

A FINDING has exactly 1 class. When 2 classes fit, the class listed first below applies.

**BLOCKER** — a FINDING in which any 1 of these is true: (a) the DELIVERABLE fails a CRITERION; (b) a RECIPIENT cannot complete a task that the Voice of the Customer statement lists; (c) the DELIVERABLE loses or corrupts data, exposes a secret or exposes data to a person the CRITERIA do not authorize; (d) a statement in the `Summary` or the `Status` of the delivery report is false (a false statement elsewhere, or in a part of the DELIVERABLE that no CRITERION covers, is a DEFECT); (e) the RED CELL raised it under section 6 in the form rule 6.6 requires; (f) code in the DELIVERABLE is unstable or ill-formed, which means 1 of these 4: the same check gives 2 different results in 2 runs; the code does not parse, or the project's own formatter, linter or type checker exits with a failure on it; the code catches an error and neither handles nor reports it; a dependency that the DELIVERABLE adds has no pinned version.

**DEFECT** — a FINDING that the DELIVERABLE gives a wrong result or breaks a rule of the skills, and that is not a BLOCKER. A false or out-of-date statement in a file of the RUN FOLDER other than the delivery report is a DEFECT (rule 14.6).

**FRAGILITY** — a FINDING that the DELIVERABLE works today and will fail under a change the FINDING names: a dependency update, a larger input, another browser, another machine, a later date.

**STYLE** — a FINDING about form only: it changes no result, no CRITERION and nothing a RECIPIENT can do.

## States of a claim or check

**VERIFIED** — a check that (a) ran against the DELIVERABLE in the form the RECIPIENT receives it, (b) was run or re-run by an AGENT instance that is not the BUILDER of the part checked, and (c) has EVIDENCE cited beside it.

**ASSERTED** — a claim with no EVIDENCE cited, or whose cited EVIDENCE does not exist or does not show what the claim says.

**UNVERIFIED** — a check that did not run, or that ran without meeting all 3 parts of VERIFIED, reported with the reason.

**DONE** — the state in which all 8 of these are true: (1) every CRITERION is VERIFIED; (2) no BLOCKER is open; (3) every DEFECT and every FRAGILITY is FIXED, WITHDRAWN or a KNOWN LIMIT; (4) `COVERAGE-LEDGER.md` has no empty cell; (5) the delivery report has no ASSERTED claim; (6) the audit of the audit in section 17 passed; (7) `scripts/hinshitsu_check.py` exits 0 on the RUN FOLDER, and an `ANSWER` entry quotes the USER's statement that the USER opened the final AUDITOR's run by its link and saw the saved report's text there; the script alone proves nothing, and where no link exists the state is `DELIVERED — NOT DONE`;  (8) the ORCHESTRATOR sent the delivery report to the USER.

**KNOWN LIMIT** — a DEFECT, a FRAGILITY or a STYLE FINDING that the USER accepted without a fix, in a message that an `OVERRULE` entry quotes. The delivery report lists each one, and the `Status` line states their count. No AUDITOR raises a KNOWN LIMIT again (rule 15.7).

**DELIVERED — NOT DONE** — the state of a run whose delivery report went to the USER while 1 or more of the 8 parts of DONE is not met. The report names each such part.

## States of a run

**SWARM-CAPABLE** — a runtime in which all 5 of these are true: (1) the ORCHESTRATOR writes the full scope of each SUB-AGENT; (2) each SUB-AGENT starts without the BUILDER's conversation (what else the runtime shows it is disclosed under rule 0.1(g)); (3) each SUB-AGENT's report returns whole and is saved word for word; (4) the runtime gives each SUB-AGENT run an identifier that the ORCHESTRATOR did not write; (5) 1 live test call in the current run started a SUB-AGENT and returned its identifier.

**DEGRADED** — a run, or a step of a run, in which 1 AGENT instance performed 2 roles that section 1 separates, or in which a SUB-AGENT failed any part of SWARM-CAPABLE.

**VOC-ASSUMED** — a statement about a RECIPIENT that the AGENT wrote without a source in the USER's words or in a record of what the RECIPIENT did. Each one lists the guess made.

**INSUFFICIENTLY ADVERSARIAL** — the verdict the RED CELL reports when it attacked no PREMISE outside the BUILDER's written list of assumptions.

## Status table

Every status has a named exit. A role must not clear a status that it set.

| Status | Set by | Cleared by | Entry that records the clearing |
|---|---|---|---|
| `PROPOSED` (CRITERION) | the ORCHESTRATOR, when it writes the CRITERION | the USER's approval, quoted | `CRITERIA` |
| `FROZEN` (CRITERION) | the `CRITERIA` entry | the USER's approval of a change, quoted | `CRITERIA-CHANGE` |
| BLOCKER | an AUDITOR or the RED CELL | 1 of 3 exits: the BUILDER fixes it and an AUDITOR that did not raise it re-audits and records `PASS`; a second AUDITOR, given only the written trigger, does not reproduce it; the USER ends the run | `RESOLUTION` (`FIXED` or `WITHDRAWN`), or `DELIVERY` with the BLOCKER listed open |
| DEFECT, FRAGILITY | an AUDITOR | the same 2 AUDITOR exits, or the USER's overrule, quoted | `RESOLUTION` or `OVERRULE` |
| STYLE | an AUDITOR | the BUILDER's fix, or the ORCHESTRATOR's or the USER's overrule with a reason | `RESOLUTION` or `OVERRULE` |
| UNVERIFIED | the ORCHESTRATOR or an AUDITOR | a check that meets all 3 parts of VERIFIED | `CHECK` |
| DEGRADED | the ORCHESTRATOR, under section 21 | nothing: it stays on the run and on the delivery report | none |
| INSUFFICIENTLY ADVERSARIAL | the RED CELL, or the AUDITOR that judges its attack under rule 6.5 | 1 new RED CELL run; if that run also earns the verdict, the item is reported UNVERIFIED | `PROBE` |
| VOC-ASSUMED | the ORCHESTRATOR | a source in the USER's words or in a record | `VOC` correction |
