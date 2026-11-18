devin-c07bd37839ac4476be2059876bee8216

Stage: plan. Commit read: a275dcf6e0e74333b84c0eeef0904de5a6ac4b98. Line numbers are in `skills/hinshitsu/example/run/`.

## What breaks

- **Tip rounding has no rule (C2, C3, D-2).** For the BUILDER and every AUDITOR: D-2 says "compute in integers" (AUDIT-LOG.md:134), but 18 percent of 12.25 is 220.5 cents. Nothing says 2.20 or 2.21, so the total that C3's shares must sum to is undefined. Reproduce: I counted C3's own grid (bills 0.01 to 50.00; tips 0, 15, 18, 20). 13,650 of 20,000 bill-tip pairs give a fractional-cent tip; 350 land on exactly half a cent.
- **G2, G12, C4 and C7 cannot all hold.** For the BUILDER: G2 says "fields empty" on first open (AUDIT-LOG.md:86); G12 says tip "default 18" (:96); C4 says an empty field shows a message (:153); C7 says "a reload clears every field" (:156). Reproduce: read the 4 lines. Either 3 error messages show before the friend types, or the tip field holds 18 and C7's reload test fails.
- **C3's test needs a contract that does not exist.** For the correctness AUDITOR: C3 says the AUDITOR "runs the page's split function" (AUDIT-LOG.md:152), which sits in an inline script (D-3, :142). FRAMEWORK.md:20 says "None at S2". Reproduce: try to write the AUDITOR's scope; no function name, inputs or units exist to cite.
- **FRAMEWORK.md is behind the log.** For any SUB-AGENT that reads it: lines 7 and 11 promise an update at S4; D-1 to D-3 were logged at E-13 to E-15, and the S4 end entry (AUDIT-LOG.md:163) lists only AUDIT-LOG.md.

## What to cut

- **Tip buttons and the default of 18 (G12, AUDIT-LOG.md:96).** No CRITERION asks for them; C2 needs 1 tip field. This saves 10 lines and half of a USER question, and it ends the G2/C7 conflict.

## What to add

- **1 sentence in D-2 and C2:** the tip rounds half up to a whole cent before the split. Plus 1 test: bill 12.25, tip 18 gives tip 2.21.
- **1 line in FRAMEWORK.md section 4:** the split function's name, its inputs in whole cents, and that the page exposes it.
- **2 boundary tests in C3.** A-4 claims 1,000,000 (AUDIT-LOG.md:118); the grid stops at 50.00 and 12 people. Add 1,000,000.00 at 100 percent for 100 people, and 0.01 for 3 people, which gives 0.01, 0.00, 0.00.
- **Build order inside WU-1 (FRAMEWORK.md:34):** split function, then form and validation, then layout, then the no-JavaScript line. C3 can then fail before layout work starts.
- **The count behind E-3's "more than 100 lines" (AUDIT-LOG.md:28).** That number sets TIER FULL and about 24 SUB-AGENT runs (:17). The gap costs listed sum to about 55 lines (:85-96); the rest is unstated.

## The 1 change this lens insists on

State the tip rounding rule in D-2 and C2 before the CRITERIA freeze at S6. Without it, C3 has no defined total.

## Checked and found sound

- **1 WORK UNIT is the right size.** 1 page is 1 component (GLOSSARY.md:31; FRAMEWORK.md:34).
- **D-3 is the smallest form.** 1 file, no build step (AUDIT-LOG.md:142-145).
- **Uneven splits are correctly left out** (D-1, AUDIT-LOG.md:129).
- **C3's grid is cheap, and D-2's method holds on it.** I ran a whole-cent split with half-up tip rounding over the grid in Node: 240,000 cases, 0 sums off. This checks the method, not the page.
- **USER questions come in order.** G12 and G13 go on the S6 card, before the build at S7 (AUDIT-LOG.md:96-97; `skills/hinshitsu/SKILL.md`:28-29).
- **Every CRITERION traces to a need or a gap** (AUDIT-LOG.md:71-76, :85-95, :150-156).
