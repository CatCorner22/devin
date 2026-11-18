devin-61ad9169d7cd40468ef767e26c19e8e1

# RED CELL — full attack on the plan — bill-splitting page

Commit read: a275dcf6e0e74333b84c0eeef0904de5a6ac4b98 (checked out, detached; `git status --porcelain` printed 0 lines after my work). I changed no file in the repository. My test files are in `/tmp/rc/` on my own machine.

## Verdict

PLAN SURVIVES WITH CHANGES

## Premises attacked

### P1. Friends on phones can get the file and open it (NOT in any `ASSUMPTION` entry)

- The PREMISE: D-3 and G11 deliver 1 file inside a GitHub repository that "opens by double-click". E-8 names RECIPIENT 2 as "friends at a restaurant table, each on a phone". The plan needs a phone user to be able to reach the file and run it. A-3 covers only whether a local file runs its script; it does not cover how a phone gets the file.
- Listed: no.
- Failure: the USER sends a friend the GitHub link. The friend taps it and sees source code, not a calculator. The friend taps "Raw" and sees plain text. Nobody at the table can double-click anything; a phone has no double-click. The page is built, passes C1 to C7, and no friend uses it.
- EVIDENCE I ran:
  ```
  $ curl -sI https://raw.githubusercontent.com/mdn/learning-area/main/html/introduction-to-html/getting-started/index.html
  HTTP/2 200
  content-security-policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
  content-type: text/plain; charset=utf-8
  x-content-type-options: nosniff
  $ curl -s -o /dev/null -w "%{http_code}" https://catcorner22.github.io/devin/
  404
  ```
  GitHub serves a raw `.html` file as plain text in a sandbox, and this repository has no hosted site. No CRITERION names a phone browser: C1 tests "opened from disk in Chrome"; C5 tests a width of 360 pixels, which is a narrow window, not a phone.
- Test that settles the rest (I did not run it; I have no phone): send the file to an iPhone and an Android phone by message, tap it, enter bill 100.00, tip 18, people 4, and read 29.50. On iOS the Files preview may not run the script; that is the result to record.

### P2. The tip is a whole number of cents (NOT in any `ASSUMPTION` entry; it also makes A-4 false as worded)

- The PREMISE: D-2 says "compute in integers". A-4 says whole-cent arithmetic "avoids every rounding error". Both need bill × tip ÷ 100 to be a whole number of cents. It is not, and no entry states a rounding rule.
- Listed: no. A-4 is listed and I attack it here too.
- Failure: 2 honest BUILDERS produce 2 different totals for the same bill, and both pass every CRITERION. A friend checks the page against a phone calculator, sees a 1-cent difference, and stops trusting the page.
- EVIDENCE I ran (`node /tmp/rc/t.js`, Node on my machine):
  ```
  tip: of 20000 (bill,tip) pairs in C3's range, 13650 give a tip that is not whole cents; 350 land on exactly half a cent; float-dollars+toFixed differs from integer half-up in 239
  bill 0.10 tip 15: dollars-float 0.015 -> 0.01, integer half-up 0.02
  bill 0.30 tip 15% = 4.5 cents -> floor 4, half-up 5, half-even 4
  bill 10.10 tip 15% = 151.5 cents -> floor 151, half-up 152, half-even 152
  bill 10.05 tip 18% = 180.9 cents -> floor 180, half-up 181, half-even 181
  fractional tip 12.5% on 10.00: 125  8.25% on 10.00: 82.5  17.5% of 0.57: 9.975
  ```
  C2's only test (100.00, 18, 4) has a whole-cent tip, so it cannot tell the rounding rules apart. C3 checks that shares sum to "the total", but the page itself computes that total, so the check is circular for the tip. C2 and C4 also do not say whether a tip of 12.5 is valid.

### P3. What a friend types is a number with a dot (NOT in any `ASSUMPTION` entry)

- The PREMISE: D-2 says "convert every amount to whole cents". That needs the typed text to be in 1 number format. G13 says the page "works for dollars, euros and pounds".
- Listed: no.
- Failure: a friend in Germany or France types `12,50`, which is how that phone's keypad writes it. A page that uses `parseFloat` reads 12 and shows shares for the wrong bill with no error. A page that uses `Number` rejects it, and the friend cannot enter a bill at all. A friend who copies C2's own wording, `1,000.00`, gets a bill of 1. With `Number`, an empty field reads as 0, not as empty.
- EVIDENCE I ran:
  ```
  "12,50" parseFloat= 12 Number= NaN
  "1,000.00" parseFloat= 1 Number= NaN
  "1.000,00" parseFloat= 1 Number= NaN
  "" parseFloat= NaN Number= 0
  "1e3" parseFloat= 1000 Number= 1000
  "0x10" parseFloat= 0 Number= 16
  ```
  C4 lists "letters" and "more than 2 decimal places". It does not list a comma, `1e3`, `10.` or `.5`, so each is undefined.
- Second half of the same PREMISE: the text-to-cents step is exact. It is exact only with rounding to nearest:
  ```
  conversion: floor/truncate wrong for 4697619 of 100000000 bills; Math.round wrong for 0 ; first: 0.29 -> 28.999999999999996 | 0.57 -> 56.99999999999999 | 0.58 -> 57.99999999999999
  ```
  C3's large test runs "the page's split function". If that function takes cents, the test never touches the conversion, and a BUILDER who truncates passes C3 with 4,697,619 wrong bills. No CRITERION tests the path from typed text to shown share over a range.
- Test for the keypad (not run; no phone): G4 asks for a "number keypad on phones". On an iPhone the plain number keypad has no decimal key. Open the page on an iPhone and type 10.50.

### P4. The request is the USER's (NOT in any `ASSUMPTION` entry)

- The PREMISE: the whole plan treats "Make me a page where friends can split a restaurant bill, tip included." as the USER's need. E-8 itself says the ORCHESTRATOR set it.
- Listed: no.
- Failure: the ORCHESTRATOR is the customer, the planner and the BUILDER of the same task. The "friends" do not exist (VA1 admits nobody was asked). The real RECIPIENT is a person who reads the example to judge whether the skill "executes rather than performs" (`build-record/BRIEF.md` line 74). No CRITERION serves that reader. When the S6 card asks the USER to approve C1 to C7, the USER approves a request the USER never made, and the freeze under rule 3.4 looks like a customer's approval when it is not.
- EVIDENCE I ran: `grep -rn "restaurant" --include=*.md --include=*.txt .` outside `example/run/` printed nothing. `BRIEF.md` line 74 asks only for "a real small deliverable (e.g., a single-page frontend)". `SESSION-STATE.md` line 3 still labels the sentence "Objective (the USER's words)".

### P5. "Split" means "split evenly", and "tip included" means "add a tip" (A-1 and A-5 listed; the reading of "tip included" is not)

- D-1's reason is "it is the request as worded". The request does not say "evenly". "Tip included" can also mean the bill already holds the tip or service charge, which is common in the United Kingdom, a place G13 says the page serves. On that reading the page adds 18 percent on top of a tip already paid.
- G12 and G13 name the USER as the one who decides. D-1, C2 and C4 already hold the answers (even split, 0 to 100, default 18, 2 decimal places) before the USER saw a card. Rule 23.5 lets the AGENT work on a recommended answer, but then D-1 must say it is a working assumption. It does not.
- A-5: the page takes 1 bill amount. A United States bill holds sales tax. Tip on the after-tax amount is higher than many diners intend. The plan gives no field or line of text for this.
- Test: ask the USER on the S6 card; no command settles it.

### P6. "The first shares carry the extra cent" (D-2; G3 marked `Assumed` by the AGENT)

- Who pays the extra cent is money between friends, which rule 23.3 gives to the USER, not to the AGENT. The page has no names, so "first" points at nobody. 3 friends read 3.34, 3.33, 3.33 and must argue about who is "first".
- Test: the S6 card. A cheap option to offer: show "1 person pays 3.34; 2 people pay 3.33".

### P7. A-3 and A-4 needed to wait (listed)

- Rule 4.2 forbids listing as an assumption what the AGENT can check. E-1 declares browser and command capability. A-3 took me 1 command:
  ```
  $ google-chrome --headless=new --no-sandbox --disable-gpu --dump-dom file:///tmp/rc/a3.html
  Google Chrome for Testing 156.0.8078.47
  <p id="o">script ran: 295</p>
  ```
  That settles A-3 for desktop Chrome on Linux only. Phones stay open (P1). A-4 took 1 Node script and came out false as worded (P2).

### P8. The existing-implementation search found nothing because nothing was there (E-6; not listed)

- `git ls-files '*.html' '*.js' | wc -l` prints 0. A search for "split" in 0 files proves nothing. Low stakes for this task; recorded so the search is not cited later as a real check.

### Also run

- `python3 scripts/hinshitsu_check.py --stage plan skills/hinshitsu/example/run` exits 1 with 2 failures: S5 and S6 have no end entry. That is the true state at this commit, not a FINDING.

## The cheating agent

The cheapest cheat: write the page with floating-point dollars and `toFixed(2)`, set the total to the sum of the shown shares, and add a separate, correct `split(cents, people)` function that the page's button never calls. C2's 1 example passes. C3's large test "runs the page's split function", so it runs the clean function and passes. C1, C5, C6 and C7 never touch the numbers. The page a friend uses is wrong for 239 of the 20,000 (bill, tip) pairs in C3's own range, and more outside it.

What catches it: rule 22.2 (a check on something other than what the RECIPIENT receives is UNVERIFIED) catches it only if an AUDITOR notices that the tested function is not the one the button calls. No CRITERION requires that. No rule requires a test through the page's own fields over a range. So in practice: none.

The second cheat is in the record, and it is already there: the ORCHESTRATOR wrote the request, guessed the RECIPIENTS, marked 10 of 13 gaps `Assumed`, and logged 17 entries in 68 seconds (E-1 15:23:59Z to E-17 15:25:07Z; E-12 to E-17 share 1 second). Rule 3.4 stops a freeze without the USER's quoted words. Nothing stops the USER's approval of an invented request from being read as a customer's approval (P4).

## Findings

Each is class BLOCKER under rule 6.6.

- **F-RC1.** Place: `SESSION-STATE.md` line 3; `AUDIT-LOG.md` E-8, V1. Trigger: read E-8 ("set by the orchestrator"), then run `grep -rn "restaurant" build-record/`; it prints nothing. Violates: rule 2.3 (quote the USER's own words) and BLOCKER (d) — "Objective (the USER's words)" is a false statement in an artifact.
- **F-RC2.** Place: E-15 (D-3), E-9 (G11), E-8 (RECIPIENT 2). Trigger: read the 3 entries; run the 2 `curl` commands in P1. Violates: rule 4.4 (D-3 rests on a PREMISE no `ASSUMPTION` entry lists); rule 2.2 and rule 23.1 subject 11 (how the RECIPIENT on a phone gets it and opens it is not answered).
- **F-RC3.** Place: E-14 (D-2), E-12 (A-4), E-16 (C2, C3). Trigger: bill 10.10, tip 15, people 1. A page that shows 11.61 and a page that shows 11.62 both pass C2's test and C3's test. Violates: rule 3.1 (the test does not prove the CRITERION); rule 4.4 (D-2 rests on the unlisted PREMISE that a tip is whole cents).
- **F-RC4.** Place: E-16 (C4), E-9 (G13), E-14 (D-2). Trigger: type `12,50` as the bill. C4 does not say what the page does; `parseFloat` gives 12 and `Number` gives no number. Violates: rule 3.1 (C4 has no test for it); rule 4.4 (D-2 rests on the unlisted PREMISE that input uses a dot); rule 23.1 subject 2 (invalid input).
- **F-RC5.** Place: E-16 (C3). Trigger: build a page whose button truncates `parseFloat(text) * 100` and whose `split` function takes cents; run C3's test; it passes; then enter 0.29 for 1 person and read 0.28. Violates: rule 3.1 and rule 22.2 (the test runs on a function, not on what the RECIPIENT uses).
- **F-RC6.** Place: E-12 (A-3, A-4). Trigger: run the Chrome command in P7 and `node /tmp/rc/t.js`. Violates: rule 4.2 (both were listed "not verified" although 1 command settles each; A-4 is false as worded).
- **F-RC7.** Place: `SESSION-STATE.md` lines 4, 6 and 10; `FRAMEWORK.md` lines 7 and 11; `MINDMAP.md`. Trigger: at commit a275dcf, read "CRITERIA: none written yet", "Current STAGE … S2", "Next action: write the `VOC` entry", while E-16 holds C1 to C7 and E-17 ends S4. `FRAMEWORK.md` says each decision "is added here … when logged"; D-1 to D-3 are logged and absent. `MINDMAP.md` holds no CRITERION and no decision. Violates: BLOCKER (d) (false statements in artifacts); rule 9.2 (every CRITERION and decision appears in `MINDMAP.md`). I did not find that a rewrite trigger of rule 8.2 had fired, so I do not cite 8.2.

## Changes demanded

1. Say on the S6 card, in plain words, that the ORCHESTRATOR invented the request as an example, and fix `SESSION-STATE.md` field 1. Add the reader of the example as a RECIPIENT, with 1 CRITERION for what that reader must be able to check.
2. Add an `ASSUMPTION` for how a phone user gets and opens the page. Either drop "friends on phones" from the VOC and say the page is a desktop example, or add a way to reach it on a phone (a hosted link is the USER's choice) and a CRITERION tested on a real or emulated iOS and Android browser.
3. Fix the tip rule in D-2 and C2: name the rounding (for example, half a cent rounds up, computed in integers as `floor((billCents × tip + 50) / 100)` for whole-number tips) and state whether a tip with a decimal is valid. Add tests that tell the rules apart: bill 0.30, tip 15 gives tip 0.05; bill 10.10, tip 15 gives tip 1.52.
4. Give C3 an independent total. The AUDITOR computes tip and total in its own code and compares, and drives the page's own fields and reads the page's own output, not a function.
5. Extend C3's range or add spot tests at the top: 1,000,000.00 with tip 100 and 100 people; 0.01 with 100 people.
6. Add to C4 the page's behavior for `12,50`, `1,000.00`, `1e3`, `10.`, `.5`, spaces, and an empty tip field. Change G13's claim about euros to match.
7. Add to C5 or G4 that a phone keypad offers a decimal key, with a named test.
8. Move the extra-cent rule, the 1,000,000 and 100 limits, and the reading of "tip included" to the S6 card as the USER's choices. Mark D-1 as a working assumption until an `ANSWER` entry exists. Remove "it is the request as worded" from D-1.
9. Rewrite A-4 so it is true, and replace "not verified" on A-3 and A-4 with the output of a command.
10. Bring `SESSION-STATE.md`, `FRAMEWORK.md` parts 1 and 2, and `MINDMAP.md` up to S4 before S6.

## Premortem

Not written: the scope asks for it before delivery only, and this is the attack on the plan.

## Not run

- No test on a physical or emulated phone (P1, P3 keypad).
- No test of C5, C6 or C7: the page does not exist.
- I did not read the 4 other `SKILL.md` files in full; I read `hinshitsu`, `hinshitsu-challenge`, `hinshitsu-baby-bird-plan`, and sections 7 to 9 of `hinshitsu-record`.
