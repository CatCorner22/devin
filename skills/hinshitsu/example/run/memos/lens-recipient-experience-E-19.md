devin-b4adac765135408c8ce911cd79ecb0d1

LENS: recipient experience · Stage: plan · Commit a275dcf · All line numbers are in `skills/hinshitsu/example/run/AUDIT-LOG.md`.

## What breaks

1. **The USER cannot open the page.** G11 (line 95) delivers a repository file that "opens by double-click". O1 (line 67) says the USER has no terminal and reads results in a browser. Reproduce: open the file's github.com address in a browser; GitHub shows the source, not the calculator.
2. **The friends cannot get the page onto a phone.** The VOC puts each friend on a phone (line 61). G8 (line 92) rules out hosting. C1 (line 150) tests Chrome from disk only, and A-3 (line 117) names no phone browser. Reproduce: ask how friend 2 receives the file; the plan has no answer.
3. **First open looks broken.** G2 (line 86) wants empty fields and 1 line of guidance. C4 (line 153) requires an error beside every empty field. Reproduce: open the page and type nothing; under C4 the bill and people fields show errors. No CRITERION covers G2.
4. **The bill holder does not know which number to type.** A receipt shows subtotal, tax and total. A-5 (line 119) tips on whatever is entered. C5 (line 154) requires a label but not its words. Reproduce: read C1 to C7 for the label text; there is none.
5. **A comma decimal has no defined result.** G13 (line 97) says the page works for euros. C4 treats non-digits as "letters". Reproduce: type `45,50`; the plan does not say whether that is 45.50 or an error.
6. **Nobody knows who pays the extra cent, and 100 people give 100 rows.** C2 shows "each person's share" (line 151); C3 puts larger shares first (line 152). Unnamed rows do not say who pays more. On a 360-pixel phone 100 rows bury the answer, and C5's announced region reads them all aloud.

## What to cut

- The per-person list of shares (C2, line 151). Replace with 1 or 2 lines: "4 people pay 29.50", or "1 person pays 3.34; 2 people pay 3.33".
- The guess that every friend uses the page (VA1, line 79). Design for 1 phone, read aloud or passed round.

## What to add

- A CRITERION for G2: on first open, no error shows; errors appear only after the RECIPIENT types in or leaves a field.
- Label wording in C5: "Bill total, tax included", fixed by A-5.
- A rule for commas and currency signs in C4, with a test.
- A test for G4's number keypad (line 88); C5 does not check it.
- The tip rounding rule in C2 (line 151).
- The USER's 3 no-terminal checks (O1, line 67), written in plain words. C1, C6 and C7 need developer tools the USER does not use.

## The 1 change this lens insists on

Add a CRITERION that says how each RECIPIENT opens the page, and test it on a phone browser: "The USER and a friend each open the page from 1 link on a phone, with no terminal and no download." This reopens G8 and G11; the USER decides on free hosting.

## Checked and found sound

- C2's example: 100.00 plus 18 percent is 118.00; 4 shares of 29.50 (line 151). Recomputed by hand.
- C3's example: 3.34 + 3.33 + 3.33 = 10.00 (line 152). Recomputed by hand.
- G1 and C4 hide shares while any input is wrong (lines 85, 153); a wrong amount never reaches the table.
- Not run: any browser or phone check. The page does not exist yet; the 6 points above come from reading the plan.
