# AUDIT-LOG — <task name>

Form required by `skills/hinshitsu/SKILL.md` rule 9.4. Copy this file into the RUN FOLDER before any other action. Append-only: never edit or delete an entry; correct one with a new entry that names it. Entry numbers ascend with no gaps. Times are UTC from a clock command; with no clock, write `no clock`. No secret values (rule 9.6).

Heading of every entry: `### E-<n> · <UTC time> · <TYPE> · <role>`

TYPE is 1 of: `CAPABILITY`, `VOC`, `GAP`, `ASSUMPTION`, `CRITERIA`, `CRITERIA-CHANGE`, `RECONCILIATION`, `DECISION`, `TRACE`, `SWARM`, `FINDING`, `RESOLUTION`, `OVERRULE`, `PROBE`, `CHECK`, `COMPACTION`, `REVERSAL`, `ABANDONED`, `ROLLBACK`, `WAIVER`, `DELIVERY`, `LESSON`.

The entries below show the fields each type requires. Delete this paragraph and replace every `<…>`.

### E-1 · <UTC time> · CAPABILITY · orchestrator

- Runtime and surface: <name>
- RUN FOLDER: <path>
- Tool that starts a SUB-AGENT: <tool name>
- SWARM-CAPABLE part 1 (orchestrator writes each scope): <yes | no> — <reason>
- SWARM-CAPABLE part 2 (sub-agent starts without the builder's conversation): <yes | no> — probe: `evidence/capability-probe.md`
- SWARM-CAPABLE part 3 (report returns and is saved word for word): <yes | no> — <reason>
- Write files: <yes | no>. Run commands: <yes | no>. Open a browser: <yes | no>. Take screenshots: <yes | no>. Read a clock: <yes | no>.
- Mode: <SWARM | DEGRADED>

### E-2 · <UTC time> · VOC · orchestrator

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

### E-3 · <UTC time> · GAP · orchestrator

| ID | Gap | Recommended answer | Reason in plain words | Cost | Who decides | Status |
|---|---|---|---|---|---|---|
| G1 | <what the request leaves out> | <answer> | <reason> | <cost> | <USER | AGENT> | <Assumed | Asked | Answered: "<quote>"> |

### E-4 · <UTC time> · ASSUMPTION · orchestrator

| ID | PREMISE | Decision that rests on it | EVIDENCE | If false |
|---|---|---|---|---|
| A-001 | <premise> | D-<n> | <path, or `not verified`> | <what happens> |

Sent to: <each LENS, the RED CELL, the USER — with the message or prompt path>

### E-5 · <UTC time> · RECONCILIATION · orchestrator

| Point | LENS | Result | CRITERION or decision changed | Reason |
|---|---|---|---|---|
| <memo point, with memo path and number> | <lens> | <ACCEPTED | REJECTED> | <ID or `none`> | <reason> |

### E-6 · <UTC time> · CRITERIA · orchestrator

- C1. <what the DELIVERABLE does or contains>. Test: <command, browser step, or reading by a named AUDITOR role>.
- Approval: "<the USER's approving message, quoted>" (<time>) — or `approval: pending`

### E-7 · <UTC time> · DECISION · orchestrator

- ID: D-001
- Decision: <text>
- Rests on: <A-… IDs>
- Reason: <text>
- Alternatives rejected: <each, with why>

### E-8 · <UTC time> · TRACE · builder

- Change: <what will change>
- Forward: <each node this one points to in `CONNECTIONS.md`: breaks | does not break — why>
- Backward: <each assumption and decision it rests on: violated | not violated — why>
- Lateral: <each WORK UNIT that shares a provider: invalidated | not invalidated — why>

### E-9 · <UTC time> · SWARM · orchestrator

| WORK UNIT | Role | SUB-AGENT identifier | Scope | Report |
|---|---|---|---|---|
| WU-1 | <role> | <identifier> | `prompts/<file>` | `audits/<file>` |

### E-10 · <UTC time> · FINDING · auditor: <role>

- ID: F-001
- Class: <BLOCKER | DEFECT | FRAGILITY | STYLE>
- Where: <file:line, or artifact and heading>
- Trigger: <exact steps, input or command, and what appears>
- Violates: <C<n> | rule <n.m>>
- Raised by: <role>, <SUB-AGENT identifier>, `audits/<file>`
- Lens: <recipient experience | minimal viable sequence | structural integrity | trust and controls>
- Forward work stopped: <yes — BLOCKER | no>

### E-11 · <UTC time> · RESOLUTION · orchestrator

- Finding: F-001
- Result: <FIXED | NOT REPRODUCED>
- Change: <commit or file and lines>
- Re-audit: `audits/<file>` by <role>, <SUB-AGENT identifier>

### E-12 · <UTC time> · OVERRULE · orchestrator

- Finding: F-<n> (never a BLOCKER)
- Result: OVERRULED
- By: <USER — "<quoted message>" | ORCHESTRATOR (STYLE only)>
- Reason: <text>

### E-13 · <UTC time> · PROBE · red cell

- Trigger: <criteria-change request | contradiction | broken edge | 0-finding audit> — <entry ID>
- Result: <text> — `audits/<file>`

### E-14 · <UTC time> · ROLLBACK · orchestrator

- Action: <the destructive or hard-to-reverse action>
- Undo: <exact command or steps> — tested: <yes | no>
- Backup: <path, or `none needed`>
- USER approval (where no undo exists): "<quoted message>"

### E-15 · <UTC time> · COMPACTION · orchestrator

- Reason: <WORK UNIT complete | before compaction | 25 tool calls | handoff>
- `SESSION-STATE.md` rewritten: <yes>

### E-16 · <UTC time> · DELIVERY · orchestrator

- Report: `DELIVERY-REPORT.md`
- Status line: <DONE | DELIVERED — NOT DONE: …>
- Sent to the USER: <time and channel>

### E-17 · <UTC time> · LESSON · orchestrator

- What happened: <text> (<entry ID>)
- Cost: <text>
- Proposed amendment: rule <n.m> — present text: "<…>" — new text: "<…>"
