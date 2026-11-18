# AUDIT-LOG — <task name>

Form required by rules 9.4 to 9.8 (`skills/hinshitsu-record/SKILL.md`). Copy this file into the RUN FOLDER before any other action. Append-only: never edit or delete an entry; correct one with a `CORRECTION` entry that names it. Entry numbers ascend by 1. Write each entry before the action it describes. Times are UTC from a clock command; with no clock, write `no clock`. No secret values (rule 9.8).

Heading of every entry: `### E-<n> · <UTC time> · <TYPE> · <role>`

TYPE is 1 of: `CAPABILITY`, `TIER`, `STAGE`, `VOC`, `GAP`, `ASSUMPTION`, `CRITERIA`, `CRITERIA-CHANGE`, `CARD`, `ANSWER`, `RECONCILIATION`, `DECISION`, `TRACE`, `LAUNCH`, `FINDING`, `RESOLUTION`, `OVERRULE`, `PROBE`, `CHECK`, `COMPACTION`, `REVERSAL`, `ABANDONED`, `ROLLBACK`, `WAIVER`, `CORRECTION`, `DELIVERY`, `LESSON`.

The entries below show the fields each type requires; the numbers are examples. Delete this paragraph and replace every `<…>`.

### E-1 · <UTC time> · LAUNCH · orchestrator

- Role: capability probe (rule 0.2)
- Scope: `prompts/capability-probe.md`
- Commit under review: <commit | no git>
- SUB-AGENT identifier: <the identifier as the runtime prints it> <link | not openable by the USER>
- Report: `evidence/capability-probe.md`

### E-2 · <UTC time> · CAPABILITY · orchestrator

- Probe: E-1

- Runtime and surface: <name>
- RUN FOLDER: <path>
- Tool that starts a SUB-AGENT: <tool name>
- SWARM-CAPABLE part 1 (the orchestrator writes the whole scope): <yes | no> — <reason>
- SWARM-CAPABLE part 2 (the sub-agent starts without the builder's conversation): <yes | no> — probe: `evidence/capability-probe.md`
- SWARM-CAPABLE part 3 (the report returns whole and is saved word for word): <yes | no> — <reason>
- SWARM-CAPABLE part 4 (the runtime gives each sub-agent run an identifier): <yes | no> — <the identifier of the probe>
- SWARM-CAPABLE part 5 (a test call in this run started a sub-agent): <yes | no> — <reason>
- Write files: <yes | no>. Run commands: <yes | no>. Use git: <yes | no>. Open a browser: <yes | no>. Take screenshots: <yes | no>. Read a clock: <yes | no>.
- Mode: <SWARM | DEGRADED>
- Shown to the probe besides its scope: <each instruction or file the probe reports>

### E-3 · <UTC time> · TIER · orchestrator

- Change measured: <output of `git diff --stat`, or file count and line count>
- Section-18 action in the change: <yes | no>
- TIER: <CORE | FULL>
- Planned SUB-AGENT runs: <n>

### E-3 · <UTC time> · STAGE · orchestrator

- Stage: S<n>
- Event: <start | end | progress | skipped — reason>
- Skill read: `<path of SKILL.md>`, <bytes> bytes, SHA-256 <hash>   (start entries)
- Artifacts: <paths>   (end entries)
- Work units: <complete> of <declared>   (S7 progress entries)

### E-4 · <UTC time> · VOC · orchestrator

**RECIPIENTS**
1. <who, what they will do with the DELIVERABLE, on what device or tool>

**Verbatim needs**
- V1. "<the USER's words>" (<message or source>)

**Observed-workflow needs**
- O1. <what the RECIPIENT did before> (<file, commit, message or record>)

**Translation**

| Customer language | Technical requirement | CRITERION |
|---|---|---|
| "<quoted>" | <requirement> | C<n> |

**VOC-ASSUMED**
- VA1. <statement with no source> — guess: <the guess made>

### E-5 · <UTC time> · GAP · orchestrator

| ID | Gap | Recommended answer | Reason in plain words | Cost | Who decides | Status |
|---|---|---|---|---|---|---|
| G1 | <what the request leaves out> | <answer> | <reason> | <cost> | <USER | AGENT> | <Assumed | Asked | Answered: "<quote>"> |

### E-6 · <UTC time> · ASSUMPTION · orchestrator

| ID | PREMISE | Decision that rests on it | EVIDENCE | If false |
|---|---|---|---|---|
| A-1 | <premise> | D-<n> | <path, or `not verified`> | <what happens> |

Sent to: <each LENS, the RED CELL, the USER — with the message or prompt path>

### E-7 · <UTC time> · RECONCILIATION · orchestrator

| Point | LENS | Result | CRITERION or decision changed | Reason |
|---|---|---|---|---|
| <memo point, with memo path and number> | <lens> | <ACCEPTED | REJECTED> | <ID or `none`> | <reason> |

### E-8 · <UTC time> · CRITERIA · orchestrator

- C1. <what the DELIVERABLE does or contains>. Test: <command, browser step, or reading by a named AUDITOR role>.
- Status: <PROPOSED | FROZEN>
- Approval: "<the USER's approving message, quoted>" (<time>) — or `approval: pending`

### E-9 · <UTC time> · DECISION · orchestrator

- ID: D-1
- Decision: <text>
- Rests on: <A-… IDs>
- Reason: <text>
- Alternatives rejected: <each, with why>

### E-10 · <UTC time> · TRACE · builder

- Change: <what will change>
- Forward: <each node this one points to in `CONNECTIONS.md`: breaks | does not break — why>
- Backward: <each assumption and decision it rests on: violated | not violated — why>
- Lateral: <each WORK UNIT that shares a provider: invalidated | not invalidated — why>

### E-11 · <UTC time> · LAUNCH · orchestrator

- Role: <role>
- WORK UNIT: <WU-<n> | plan | delivery>
- Scope: `prompts/<file>`
- Commit under review: <hash | no git>
- SUB-AGENT identifier: <identifier the runtime gave the run>
- Report: `audits/<file>` or `memos/<file>`

### E-12 · <UTC time> · CARD · orchestrator

<the DECISION CARD, word for word, as sent (rule 23.4)>

### E-13 · <UTC time> · ANSWER · orchestrator

- Card: E-<n>
- The USER's reply, word for word: "<reply>" (<time>)
- Effect: <what the reply decides>

### E-14 · <UTC time> · CORRECTION · orchestrator

- Corrects: E-<n>
- What was wrong: <text>
- What is true: <text, with EVIDENCE>

### E-15 · <UTC time> · FINDING · auditor: <role>

- ID: F-1
- Class: <BLOCKER | DEFECT | FRAGILITY | STYLE>
- Where: <file:line, or artifact and heading>
- Trigger: <exact steps, input or command, and what appears>
- Violates: <C<n> | rule <n.m>>
- Raised by: <role>, LAUNCH E-<n>, `audits/<file>`, finding <number in the report>
- Lens: <recipient experience | minimal viable sequence | structural integrity | trust and controls>
- Forward work stopped: <yes — BLOCKER | no>

### E-16 · <UTC time> · RESOLUTION · orchestrator

- Finding: F-1
- Result: <FIXED | WITHDRAWN>
- Change: <commit or file and lines>
- Re-audit: `audits/<file>` by <role>, <SUB-AGENT identifier>

### E-17 · <UTC time> · OVERRULE · orchestrator

- Finding: F-<n> (never a BLOCKER)
- Result: OVERRULED
- By: <USER — "<quoted message>" | ORCHESTRATOR (STYLE only)>
- Reason: <text>

### E-18 · <UTC time> · PROBE · red cell

- Trigger: <criteria-change request | contradiction | broken edge | 0-finding audit> — <entry ID>
- Result: <text> — `audits/<file>`

### E-19 · <UTC time> · ROLLBACK · orchestrator

- Action: <the destructive or hard-to-reverse action>
- Undo: <exact command or steps> — tested: <yes | no>
- Backup: <path, or `none needed`>
- USER approval (where no undo exists): "<quoted message>"

### E-20 · <UTC time> · COMPACTION · orchestrator

- Reason: <WORK UNIT complete | before compaction | 25 tool calls | handoff>
- `SESSION-STATE.md` rewritten: <yes>

### E-21 · <UTC time> · DELIVERY · orchestrator

- Report: `DELIVERY-REPORT.md`
- Status line: <DONE | DELIVERED — NOT DONE: …>
- Sent to the USER: <time and channel>

### E-22 · <UTC time> · LESSON · orchestrator

- What happened: <text> (<entry ID>)
- Cost: <text>
- Proposed amendment: rule <n.m> — present text: "<…>" — new text: "<…>"
