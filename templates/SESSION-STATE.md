# SESSION-STATE — <task name>

Form required by section 8 (`skills/hinshitsu-record/SKILL.md`). This file holds only the current state. Rewrite it after each WORK UNIT, before any compaction, handoff or pause, and when 25 tool calls have passed since the last rewrite. Log each rewrite as a `COMPACTION` entry. On resuming, read this file and `AUDIT-LOG.md` first and confirm that each artifact listed below exists.

Last rewritten: <UTC time> — log entry E-<n>

1. **Objective:** "<the USER's words>"
2. **CRITERIA:** <C1: VERIFIED | FAIL | UNVERIFIED | not yet audited; C2: …>
3. **Constraints and approvals in force:** <each with its entry ID>
4. **Current WORK UNIT:** <ID and status>
5. **Open FINDINGS:** <IDs with class, or `none`>
6. **Artifacts that exist:** <paths>
7. **Checks actually run:** <EVIDENCE paths>
8. **Single next action:** <1 action>
