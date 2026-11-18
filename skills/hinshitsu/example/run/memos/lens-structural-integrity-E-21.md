devin-73aa482497704fb3b2d044897c9a2e11

## What breaks

1. **Tip rounding has no rule. Breaks for the BUILDER and the correctness AUDITOR.** D-2 says "compute in integers" (AUDIT-LOG.md:134), but a percentage of whole cents is often not a whole cent. Reproduce: bill 0.50, tip 15 gives 7.5 cents. Tip 0.07 and tip 0.08 both pass C2 and C3 (lines 151-152). A-4 (line 118) is false as worded.
2. **C3's test calls a function that no contract names. Breaks for the AUDITOR.** C3 needs "the page's split function" run about 240,000 times (line 152). FRAMEWORK.md:22 says contracts: "None". Reproduce: wrap the script in a closure; the AUDITOR cannot run the test.
3. **The GAP → CRITERIA edge is broken by its own test. Breaks for the USER.** CONNECTIONS.md:21 says the edge breaks when "a gap has no CRITERION and no reason". Reproduce: search C1 to C7 (lines 150-156) for G2's first-open line, G4's number keypad, G10's license, G12's tip buttons and default 18, G13's "no currency symbol". None appears.
4. **First-open state contradicts the error state. Breaks for the BUILDER.** G2 (line 86): fields empty, 1 hint line. C4 (line 153): an empty field shows an error beside it. G12 (line 96): tip defaults to 18, so the tip field is not empty, against C7's "a reload clears every field" (line 156). Reproduce: open the page; 3 rules give 3 different first screens.
5. **Tip input is half specified. Breaks for the BUILDER.** C4 rejects a non-whole people count but says nothing about tip 12.5 or about "12,50" (G13, line 97, claims euros work). Reproduce: type each.
6. **FRAMEWORK.md is stale against its own words. Breaks for the framework-drift AUDITOR.** Line 7 promises the CRITERIA reference at S4; line 11 promises each decision "when logged". S4 ended at E-17; lines 7, 11 and 20 still say none. Reproduce: `grep "D-[123]" FRAMEWORK.md` prints nothing.
7. **CONNECTIONS.md has no node for a decision, an assumption or the USER's approval.** Rule 7.6's backward trace needs them. Reproduce: the same grep on CONNECTIONS.md prints 0 lines. The edge at CONNECTIONS.md:24 also calls every fix a break, with no re-audit edge back.
8. **`LAUNCH ID` (FRAMEWORK.md:16) is not in the glossary**, which GLOSSARY.md:3 makes a FINDING.

## What to cut

Tip buttons and the default 18 (G12), unless the USER picks them at S6. They cause point 4.

## What to add

- A tip rounding rule in D-2 and C2, with a test: bill 0.50, tip 15.
- A CRITERION, or a written reason, for each of G2, G4, G10, G12, G13.
- In C4: 3 named page states (first open, error, result) and the tip format.
- Nodes D-1 to D-3, A-1 to A-5 and "USER approval", and an edge FINDING → index.html → re-audit, in CONNECTIONS.md.

## The 1 change this lens insists on

Write FRAMEWORK.md part 4 before WU-1 starts: 1 pure, globally reachable function. Name it. State its inputs (bill in cents, tip percent, people), its output (tip cents, total cents, list of share cents) and its tip rounding rule. Cite it in C2 and C3. This closes points 1 and 2.

## Checked and found sound

- CONNECTIONS.md graph and table: 8 edges, 8 rows, all match (script run; rule 9.3).
- Each A-n names the decision that names it back (lines 115-119, 127, 135, 143).
- C2 ranges match C4 limits and G3 (lines 87, 151, 153).
- D-2's "first shares" matches C3's "larger shares first" (lines 134, 152).
- `evidence/capability-probe.md` and `prompts/capability-probe.md` exist, as E-1 and E-4 say.
