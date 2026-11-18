<!-- from the log: start -->
Rebuilt by `scripts/hinshitsu_log.py state`. Do not edit between the marks.
- Newest CRITERIA entry: E-72 (FROZEN)
- STAGE now running: S10
- Open FINDINGS: F-9 (BLOCKER)
<!-- from the log: end -->

# SESSION-STATE — gauge counts a FINDING whose ID is not F-<n> as unread

Last rewritten: at S10, with the entry E-70.

1. **Objective:** "The gauge counts a FINDING as an open blocker when its Class field starts with BLOCKER, and it never tests the ID.
   A FINDING whose ID is not of the form F-<n>, such as `F-1.` or `blocker one`, is shown in the STOPPED line. The checker refuses such an ID. Make `skills/hinshitsu-gauge/scripts/gauge.py` count such an entry among the entries it could not read, and leave it out of the STOPPED line, with tests."
2. **CRITERIA:** C1 to C6, FROZEN [E-21]; each passed its test in 3 correctness audits, the newest on commit 1ce96d3 (`audits/WU-1-r3-correctness_E-55.md`).
3. **Constraints and approvals in force:** Mode `SWARM` [E-2]; TIER `CORE`, kept by the WAIVER of E-50 where the numbers give FULL [E-54]; 5 planned SUB-AGENT runs [E-49], 4 used, the last is the final AUDITOR; branch `devin/hinshitsu-run-3.0.0`, no push to `main`, no pull request (the first message of the USER); CRITERIA approved [E-20]; the USER overruled 2 DEFECTS [E-35], then 1 DEFECT and 1 FRAGILITY [E-49], then 1 FRAGILITY, and ended the run [E-62]; no further card.
4. **Current STAGE and WORK UNIT:** see the block from the log above; WU-1 ended its audit by the decision of the USER [E-62, E-64].
5. **Open FINDINGS:** see the block from the log above.
6. **Artifacts that exist:** `AUDIT-LOG.md`, `FRAMEWORK.md`, `CONNECTIONS.md`, `MINDMAP.md`, `COVERAGE-LEDGER.md`, `FRICTION.md`, `GAUGE.svg`, the 4 scopes under `prompts/`, the 3 reports under `audits/`, the files under `evidence/`.
7. **Checks actually run:** `evidence/capability-commands.txt`, `evidence/existing-implementations.txt`, `evidence/premises.txt`; by the AUDITORS, inside the 3 reports under `audits/`.
8. **Single next action:** write the draft `DELIVERY-REPORT.md`, start the final AUDITOR, then S11 and S12.
