<!-- from the log: start -->
Rebuilt by `scripts/hinshitsu_log.py state`. Do not edit between the marks.
- Newest CRITERIA entry: E-21 (FROZEN)
- STAGE now running: S7
- Open FINDINGS: F-1 (DEFECT), F-2 (DEFECT), F-3 (FRAGILITY), F-4 (STYLE)
<!-- from the log: end -->

# SESSION-STATE — gauge counts a FINDING whose ID is not F-<n> as unread

Last rewritten: at S2, with the entry that ends S2.

1. **Objective:** "The gauge counts a FINDING as an open blocker when its Class field starts with BLOCKER, and it never tests the ID. A FINDING whose ID is not of the form F-<n>, such as `F-1.` or `blocker one`, is shown in the STOPPED line. The checker refuses such an ID. Make `skills/hinshitsu-gauge/scripts/gauge.py` count such an entry among the entries it could not read, and leave it out of the STOPPED line, with tests."
2. **CRITERIA:** C1 to C6, FROZEN; none audited yet.
3. **Constraints and approvals in force:** Mode `SWARM` [E-2]; TIER `CORE`, 4 planned SUB-AGENT runs [E-4]; branch `devin/hinshitsu-run-3.0.0`, no push to `main`, no pull request (the USER's first message).
4. **Current STAGE and WORK UNIT:** see the block from the log above; WU-1 pending.
5. **Open FINDINGS:** see the block from the log above.
6. **Artifacts that exist:** `AUDIT-LOG.md`, `FRAMEWORK.md`, `CONNECTIONS.md`, `MINDMAP.md`, `COVERAGE-LEDGER.md`, `FRICTION.md`, `prompts/capability-probe.md`, `evidence/capability-probe.md`, `evidence/capability-commands.txt`, `evidence/existing-implementations.txt`.
7. **Checks actually run:** `evidence/capability-commands.txt`, `evidence/existing-implementations.txt`.
8. **Single next action:** build WU-1.
