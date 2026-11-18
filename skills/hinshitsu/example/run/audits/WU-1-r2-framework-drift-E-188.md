devin-ba82b5e836ad44418c1fc69eff0239f9

## Scope received

The text below is `prompts/WU-1-r2-framework-drift.md` at the commit under review. I compared it with the message I received by reading and found the same words (see `Not examined` for the limit of that comparison).

~~~~text
You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: round 2 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Framework-drift auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Compare the WORK UNIT with `FRAMEWORK.md` and `CONNECTIONS.md`: names, contracts between parts, file ownership, each edge, duplicates of things that already exist, decisions marked superseded that the work still follows, and parts of the work that the framework does not record.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: `skills/hinshitsu/example/index.html`, all lines, SHA-256 e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0; with `skills/hinshitsu/example/run/FRAMEWORK.md` and `skills/hinshitsu/example/run/CONNECTIONS.md`
- Commit under review: the commit named in the first paragraph
- CRITERIA, word for word from entry E-175:

- C1. `skills/hinshitsu/example/index.html` is 1 file that loads no other file, and its calculator works when the file is opened from disk in desktop Chrome. Test: open the file by its `file://` path; the browser's request log shows 1 request; C2's first test passes. Covers G8, G11.
- C2. Given a bill from 0.01 to 1000000.00, a tip that is a whole number from 0 to 100 percent, and a number of people that is a whole number from 1 to 100, the result shows, in this order: the bill total with 2 decimal places, the tip percent and the number of people, each as a number without leading zeros; the tip amount; the total with tip; and the payments, as 1 line ("4 people pay 29.50 each") or as 2 lines with the larger payment first ("1 person pays 3.34" and "2 people pay 3.33 each"). Under 2 lines, 1 sentence follows: "Your group decides who pays the higher amount." The result shows no other text. Half a cent of tip rounds up. Tests, typed into the page: 100.00, 18, 4 gives tip amount 18.00, total with tip 118.00, "4 people pay 29.50 each"; 0.30, 15, 1 gives tip amount 0.05; 10.10, 15, 1 gives tip amount 1.52 and total with tip 11.62; 12.25, 18, 1 gives tip amount 2.21; 0100.5, 007, 02 shows 100.50, 7 and 2. Covers T1, G12.
- C3. The payments sum to the total with tip, to the cent, and no 2 payments differ by more than 0.01. Test: an AUDITOR types values into the page's own fields in a browser driven by a script, reads the page's own output, and compares it with a tip amount, total and payments computed by the AUDITOR's own code: every bill from 0.01 to 50.00, in steps of 0.01, with tips 0, 15, 18 and 20 for 1 person; every bill from 0.01 to 5.00, in steps of 0.01, with 1 to 12 people at tip 18; and the spot cases, as typed, `10.00`, `0`, `3` (3.34 and 3.33); `1000000.00`, `100`, `100`; and `0.01`, `0`, `100`. Covers G3.
- C4. The page has 4 states. First open: 3 empty fields, 1 sentence of guidance, no error text, no result. Incomplete: 1 or more fields are empty, the person has neither typed in nor left them, and no field shows a message; no result shows. Error: after a person types in a field or leaves it, a value that fails the formats below shows a message below that field, the message names what to type, and no result shows. Result: when all 3 fields are valid, the result shows and is recomputed on every change. The bill is digits, with an optional decimal mark followed by 1 or 2 digits; the decimal mark is a dot or a comma, so `12.50` and `12,50` are the same amount. A whole number is digits only. Spaces and invisible characters at either end are ignored; a full-width or Arabic-Indic digit or decimal mark counts as its plain form. While the bill field has the cursor, digits followed by a decimal mark and nothing else (`12.`) show no message and no result; the message shows when the person leaves the field. Each of these gets a message and no result: an empty field that the person has typed in or left; letters; a thousands separator (`1,000.00`, `1.000,00`); `1e3`; `10.` once the person has left the field; `.5`; a currency sign; a negative or 0 bill; a bill above 1000000.00; 3 or more decimal places; a tip that is not a whole number from 0 to 100; a number of people that is not a whole number from 1 to 100; `18.0`, `18,5`, `1e1`, `+4` or `4.` as tip or people. Test: each input, in the browser. Covers G1, G2, G13.
- C5. At widths of 360, 768 and 1280 pixels no element is wider than the window and nothing scrolls sideways. Every field has a visible label; the bill's label reads "Bill total, tax included". Each error paragraph carries `role="alert"` and the result carries `role="status"`; the page does not write a message or a result again when its text has not changed. The bill field carries `inputmode="decimal"` and the other 2 fields `inputmode="numeric"`. Test: screenshots at the 3 widths; reading of the markup; a count of the changes inside the error paragraphs and the result while a person types in another field (0 changes). A real phone and a screen reader are not tested and are reported UNVERIFIED. Covers G4, G5.
- C6. With JavaScript off, the page shows a sentence saying that the calculator needs JavaScript, and shows no guidance and no field. Test: load with JavaScript disabled. Covers G9.
- C7. The page stores nothing and sends nothing. The file carries the tag `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`, and each field carries `autocomplete="off"`. Test: with the page open, `fetch('https://example.com')` run in the browser is blocked; the source holds none of `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie` and `caches`; a reload in Chrome clears every field. Firefox is not tested and is reported UNVERIFIED. Covers G6, G7.
- C8. The delivery report opens with 3 checks. The USER can do all 3 within 5 minutes in total, in a browser, with no terminal: each check names what to open, what to do and what to see. The report states the SHA-256 of `index.html` at the last audit round. Test: an AUDITOR who did not build the page follows the 3 checks as written and records the time taken. Covers V1, V2.

- Glossary: `skills/hinshitsu/GLOSSARY.md`

## Report

Write 1 report, in Markdown, in this order:

1. First line: the identifier that your runtime gave this run (session ID, task ID or agent ID). If you cannot read it, write `identifier: not visible to me`.
2. `## Scope received` — this scope, word for word.
3. `## Examined` — each file with line ranges, each command you ran with its complete output, each page you opened with what you did.
4. `## Findings` — number them 1, 2, 3. For each: **Class** (BLOCKER, DEFECT, FRAGILITY or STYLE, as `GLOSSARY.md` defines them); **Where** (file and line, or artifact and heading); **Trigger** (the exact steps, input or command that reproduce it, and what appears); **Violates** (the CRITERION ID or the rule number); **Proposed fix**.
5. `## Not examined` — what you did not examine, and why.

## Limits

- You did not build this work. Do not change the DELIVERABLE or any file in the RUN FOLDER; propose each fix in your report.
- Read only the files this scope names, and files those files reference.
- Report what you observed. Do not report a check that you did not run. A check that you cannot run is UNVERIFIED, with the reason.
- If you find nothing, say so, and list under `Examined` what you checked. Do not invent a finding and do not withhold one.

Confirm the SHA-256 before you start. The RUN FOLDER is `skills/hinshitsu/example/run/`. Under rule 14.6 of `skills/hinshitsu-audit/SKILL.md`, also read the `CORRECTION` entries E-180 and E-181 in its `AUDIT-LOG.md` and report each correction that is itself false. Also test 2 earlier FINDINGS and state for each `FIXED` or `STILL OPEN` with the reason: F-16 (E-75) against the card in E-88, and F-19 (E-85) against the corrections in E-87 and E-88.
~~~~

## Examined

Commit under review: `1b6cf7695510718d4b21836b0756749400da0c54`, the newest commit of `devin/hinshitsu-build` whose message begins "example run: round 2 swarm scopes". Clone at `/home/ubuntu/audit/devin`. I changed no file (`git status --porcelain | wc -l` prints 0, below).

SHA-256 confirmed before any other check: `skills/hinshitsu/example/index.html` is e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0, as the scope states.

### Files read

| File | Lines |
|---|---|
| `skills/hinshitsu/example/index.html` | 1 to 195 (all) |
| `skills/hinshitsu/example/run/FRAMEWORK.md` | 1 to 61 (all) |
| `skills/hinshitsu/example/run/CONNECTIONS.md` | 1 to 58 (all) |
| `skills/hinshitsu/GLOSSARY.md` | the definitions of FRAMEWORK, CONNECTIONS, WORK UNIT, AUDITOR, DELIVERABLE, CRITERION, FINDING, BLOCKER, DEFECT, FRAGILITY, STYLE (lines 53 to 59), VERIFIED, ASSERTED, UNVERIFIED, and the status table (lines 91 and 92) |
| `skills/hinshitsu-audit/SKILL.md` | lines 14 to 67 (sections 11 to 15 and the head of 16), with rules 13.1, 13.2, 14.3 to 14.6 and 15.4 |
| `skills/hinshitsu-delivery/SKILL.md` | section 20 (rule 20.3), which E-88 cites |
| `skills/hinshitsu/example/run/AUDIT-LOG.md` | E-69 (744 to 756), E-75 (799 to 807), E-77 (819 to 823), E-79 (832 to 844), E-80 (846 to 852), E-84 and E-85 (878 to 896), E-87 to E-90 (908 to 946), E-92 to E-94 (953 to 975); in E-111 to E-170 (1140 to 1750) the lines `ID`, `Class`, `Where`, `Violates`, `Raised by`, `Same fault as`; E-160 to E-162 and E-170 in full; E-171 to E-182 (1750 to 1892) |
| `skills/hinshitsu/example/run/SESSION-STATE.md` | fields 1 to 8 |
| `skills/hinshitsu/example/run/prompts/WU-1-r2-*.md` (9 files) | the criterion lines and the line that names the file and its SHA-256; `WU-1-r2-framework-drift.md` and lines 1 to 30 of `WU-1-r2-red-cell-probe.md` in full |
| `skills/hinshitsu/example/run/review/index.html` | compared with the page by `sha256sum`, `cmp` and `diff` |
| `skills/hinshitsu/example/run/evidence/record-check-E-92.txt` | all |
| `skills/hinshitsu/example/run/audits/plan-reaudit-E-81.md` | lines 16 to 22 (N-2, which F-19 cites) |
| `skills/hinshitsu/example/run/COVERAGE-LEDGER.md` | line 5 |

I read these files with `sed -n`, `cat -n`, `grep -n` and `awk`; the output of those commands is the text of the files at the lines listed, and I do not paste it again. The commands whose output is a result are below, complete.

### Commands, with complete output

Run in `/home/ubuntu/audit/devin`:

~~~~text
$ git remote get-url origin
https://git-manager.devin.ai/proxy/github.com/CatCorner22/devin.git
exit: 0

$ git log origin/devin/hinshitsu-build --format='%H %cI %s' --grep='^example run: round 2 swarm scopes' | cut -c1-160
1b6cf7695510718d4b21836b0756749400da0c54 2026-11-18T17:13:31Z example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in
d3fecb7bb267d611c64368b1c9b91402f5544c6e 2026-11-18T17:13:24Z example run: round 2 swarm scopes; the copy under review; the probe's trigger filled in
9783ee2a7133facb2130f65a7f5e57c134df9f7d 2026-11-18T17:13:16Z example run: round 2 swarm scopes; the copy under review
exit: 0

$ git rev-parse HEAD
1b6cf7695510718d4b21836b0756749400da0c54
exit: 0

$ git status --porcelain | wc -l
0
exit: 0

$ sha256sum skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html
e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0  skills/hinshitsu/example/index.html
dc993923bda99787251fe78c9ba3a07eab64e987506cb7eb36700b26c75dad55  skills/hinshitsu/example/run/review/index.html
exit: 0

$ wc -l skills/hinshitsu/example/index.html skills/hinshitsu/example/run/FRAMEWORK.md skills/hinshitsu/example/run/CONNECTIONS.md skills/hinshitsu/example/run/AUDIT-LOG.md
   195 skills/hinshitsu/example/index.html
    61 skills/hinshitsu/example/run/FRAMEWORK.md
    58 skills/hinshitsu/example/run/CONNECTIONS.md
  1892 skills/hinshitsu/example/run/AUDIT-LOG.md
  2206 total
exit: 0

$ cmp skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html
skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html differ: byte 4684, line 92
exit: 1

$ diff skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html
92c92
<   if (cents > MAX_BILL_CENTS) { return { error: tooMuch }; }
---
>   if (cents >= MAX_BILL_CENTS) { return { error: tooMuch }; }
exit: 1

$ for c in 7518431 f3578b9 9783ee2; do echo $c $(git show $c:skills/hinshitsu/example/index.html | sha256sum | cut -c1-16) $(git show $c:skills/hinshitsu/example/run/review/index.html | sha256sum | cut -c1-16); done
7518431 e866bfe5aee8c649 e866bfe5aee8c649
f3578b9 e866bfe5aee8c649 e866bfe5aee8c649
9783ee2 e866bfe5aee8c649 dc993923bda99787
exit: 0

$ ls skills/hinshitsu/example/run/audits | grep -c r2
0
exit: 1

$ grep -c -- '-->' skills/hinshitsu/example/run/CONNECTIONS.md; sed -n '35,58p' skills/hinshitsu/example/run/CONNECTIONS.md | wc -l
25
24
exit: 0

$ grep -n -i 'red.cell\|probe\|evidence/' skills/hinshitsu/example/run/FRAMEWORK.md skills/hinshitsu/example/run/CONNECTIONS.md
exit: 1

$ grep -n 'C3\|3 states\|form' skills/hinshitsu/example/index.html skills/hinshitsu/example/run/FRAMEWORK.md | cut -c1-220
skills/hinshitsu/example/index.html:67:/* The contract in FRAMEWORK.md, part 4, names window.splitBill; the checks of C3 compare the page with it. */
skills/hinshitsu/example/index.html:70:/* Full-width and Arabic-Indic digits and decimal marks become their plain forms. Spaces and invisible characters at the ends go. */
skills/hinshitsu/example/run/FRAMEWORK.md:33:- **Decimal mark.** A dot or a comma (D-9). `plain` turns full-width and Arabic-Indic digits and decimal marks into their plain forms before any check.
skills/hinshitsu/example/run/FRAMEWORK.md:52:Build order inside WU-1: (1) `splitBill` and the text-to-cents step; (2) form, the 3 states and validation; (3) layout at the 3 widths; (4) the no-JavaScript sentence and the 
exit: 0

$ grep -c '<form' skills/hinshitsu/example/index.html
0
exit: 1

$ cd skills/hinshitsu/example/run && for f in prompts/WU-1-r2-*.md; do printf '%s: ' $f; diff <(grep -E '^- C[1-8]\. ' $f) <(sed -n '1819,1834p' AUDIT-LOG.md | grep -E '^- C[1-8]\. ') >/dev/null && echo 'C1-C8 identical to E-175' || echo "differs or absent ($(grep -cE '^- C[1-8]\. ' $f) criterion lines)"; done
prompts/WU-1-r2-adversarial.md: C1-C8 identical to E-175
prompts/WU-1-r2-best-practices.md: C1-C8 identical to E-175
prompts/WU-1-r2-correctness.md: C1-C8 identical to E-175
prompts/WU-1-r2-forensic-5s.md: C1-C8 identical to E-175
prompts/WU-1-r2-framework-drift.md: C1-C8 identical to E-175
prompts/WU-1-r2-language.md: C1-C8 identical to E-175
prompts/WU-1-r2-recipient-experience.md: C1-C8 identical to E-175
prompts/WU-1-r2-red-cell-probe.md: differs or absent (0 criterion lines)
prompts/WU-1-r2-seeder.md: C1-C8 identical to E-175
exit: 0

~~~~

Note on the count of edges: `grep -c -- '-->'` prints 25 because line 3 of `CONNECTIONS.md` holds the sample `A -->|label| B`; the diagram holds 24 edges (lines 7 to 30) and the table holds 24 rows (lines 35 to 58). I matched each edge to its row by reading.

Further commands, run in `skills/hinshitsu/example`:

~~~~text
$ grep -c splitBill run/prompts/WU-1-r2-*.md
run/prompts/WU-1-r2-adversarial.md:0
run/prompts/WU-1-r2-best-practices.md:0
run/prompts/WU-1-r2-correctness.md:0
run/prompts/WU-1-r2-forensic-5s.md:0
run/prompts/WU-1-r2-framework-drift.md:0
run/prompts/WU-1-r2-language.md:0
run/prompts/WU-1-r2-recipient-experience.md:0
run/prompts/WU-1-r2-red-cell-probe.md:0
run/prompts/WU-1-r2-seeder.md:0
$ git log --format='%h %an %s' -3 -- run/review/index.html | cut -c1-120
9783ee2 blakereaganlaw example run: round 2 swarm scopes; the copy under review
7518431 blakereaganlaw example: page changed to the CRITERIA of E-175 after audit round 1 (E-178); TIER measured (E-179)
d125232 blakereaganlaw example run: WU-1 swarm scopes; the copy under review
~~~~

### Page opened

`file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html`, in Chrome for Testing 156.0.8078.47 (`/opt/.devin/chrome/chrome/linux-156.0.8078.47/chrome-linux64/chrome`), headless, driven by Playwright from 2 scripts that I wrote (`a.js` for C1, C2, C4 to C7 and the contract; `c3.js` for C3). No file in the repository was written; scripts, output and screenshots are in `/home/ubuntu/audit/work`, outside the clone.

What `a.js` did: opened the page and counted requests (C1); for each case reloaded the page, clicked each field, typed the value with key events and pressed Tab, then read the 3 error paragraphs and the `<p>` lines of `#result` (C2, C4); set a `MutationObserver` on the 3 error paragraphs and the result and typed in another field (C5); read the labels and attributes (C5); set the window to 360, 768 and 1280 pixels, measured every element against the window and took 6 full-page screenshots (`w360-result.png`, `w360-error.png`, `w768-…`, `w1280-…`), of which I looked at `w360-error.png` (C5); ran `fetch('https://example.com')` in the page (C7); counted the 5 storage words in the source (C7); reloaded and went back (C7); called `window.splitBill` from the page context (contract); opened the page in a second context with JavaScript disabled, took `js-off.png` and looked at it (C6).

Complete output of `node a.js`:

~~~~text
browser 156.0.8078.47
## C1 requests on first load: 1 ["file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html"]
first open: {"bill":"","tip":"","people":"","be":"","te":"","pe":"","res":[],"guideShown":true,"fieldsShown":true}
## C2
["100.00","18","4"] => ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"] errs ["","",""]
["0.30","15","1"] => ["Bill total: 0.30","Tip percent: 15","Number of people: 1","Tip amount: 0.05","Total with tip: 0.35","1 person pays 0.35"] errs ["","",""]
["10.10","15","1"] => ["Bill total: 10.10","Tip percent: 15","Number of people: 1","Tip amount: 1.52","Total with tip: 11.62","1 person pays 11.62"] errs ["","",""]
["12.25","18","1"] => ["Bill total: 12.25","Tip percent: 18","Number of people: 1","Tip amount: 2.21","Total with tip: 14.46","1 person pays 14.46"] errs ["","",""]
["0100.5","007","02"] => ["Bill total: 100.50","Tip percent: 7","Number of people: 2","Tip amount: 7.04","Total with tip: 107.54","2 people pay 53.77 each"] errs ["","",""]
["10.00","0","3"] => ["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."] errs ["","",""]
["1000000.00","100","100"] => ["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"] errs ["","",""]
["0.01","0","100"] => ["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."] errs ["","",""]
["12,50","18","2"] => ["Bill total: 12.50","Tip percent: 18","Number of people: 2","Tip amount: 2.25","Total with tip: 14.75","1 person pays 7.38","1 person pays 7.37","Your group decides who pays the higher amount."] errs ["","",""]
result full textContent: "Bill total: 12.50\n\nTip percent: 18\n\nNumber of people: 2\n\nTip amount: 2.25\n\nTotal with tip: 14.75\n\n1 person pays 7.38\n\n1 person pays 7.37\n\nYour group decides who pays the higher amount."
## C4 states
reload/first open: {"bill":"","tip":"","people":"","be":"","te":"","pe":"","res":[],"guideShown":true,"fieldsShown":true}
incomplete (bill=1, others untouched): {"bill":"1","tip":"","people":"","be":"","te":"","pe":"","res":[],"guideShown":true,"fieldsShown":true}
typing 12. with cursor in bill: {"bill":"12.","tip":"","people":"","be":"","te":"","pe":"","res":[],"guideShown":true,"fieldsShown":true}
after leaving bill with 12.: {"bill":"12.","tip":"","people":"","be":"Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50","te":"","pe":"","res":[],"guideShown":true,"fieldsShown":true}
tip left empty: {"bill":"","tip":"","people":"","be":"","te":"Enter the tip percent. Enter 0 for no tip.","pe":"","res":[],"guideShown":true,"fieldsShown":true}
tip typed then emptied, not left: {"bill":"","tip":"","people":"","be":"","te":"Enter the tip percent. Enter 0 for no tip.","pe":"","res":[],"guideShown":true,"fieldsShown":true}
## C4 bill inputs (tip 18, people 4): input => bill message | result lines
"abc" U+61 U+62 U+63 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"12a" U+31 U+32 U+61 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"1,000.00" U+31 U+2C U+30 U+30 U+30 U+2E U+30 U+30 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"1.000,00" U+31 U+2E U+30 U+30 U+30 U+2C U+30 U+30 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"1e3" U+31 U+65 U+33 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"10." U+31 U+30 U+2E => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
".5" U+2E U+35 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
",5" U+2C U+35 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"$10" U+24 U+31 U+30 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"10$" U+31 U+30 U+24 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"€10" U+20AC U+31 U+30 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"-5" U+2D U+35 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"0" U+30 => "Enter an amount above 0." | []
"0.00" U+30 U+2E U+30 U+30 => "Enter an amount above 0." | []
"0,0" U+30 U+2C U+30 => "Enter an amount above 0." | []
"1000000.01" U+31 U+30 U+30 U+30 U+30 U+30 U+30 U+2E U+30 U+31 => "Enter 1000000.00 or less." | []
"1000001" U+31 U+30 U+30 U+30 U+30 U+30 U+31 => "Enter 1000000.00 or less." | []
"10000000" U+31 U+30 U+30 U+30 U+30 U+30 U+30 U+30 => "Enter 1000000.00 or less." | []
"1.234" U+31 U+2E U+32 U+33 U+34 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"1,234" U+31 U+2C U+32 U+33 U+34 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"12.50" U+31 U+32 U+2E U+35 U+30 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"12,50" U+31 U+32 U+2C U+35 U+30 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
" 12.50 " U+20 U+31 U+32 U+2E U+35 U+30 U+20 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"​12.50​" U+200B U+31 U+32 U+2E U+35 U+30 U+200B => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"﻿12.50" U+FEFF U+31 U+32 U+2E U+35 U+30 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"１２．５０" U+FF11 U+FF12 U+FF0E U+FF15 U+FF10 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"１２，５０" U+FF11 U+FF12 U+FF0C U+FF15 U+FF10 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"١٢٫٥٠" U+661 U+662 U+66B U+665 U+660 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"١٢.٥٠" U+661 U+662 U+2E U+665 U+660 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"۱۲٫۵۰" U+6F1 U+6F2 U+66B U+6F5 U+6F0 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"12٫5" U+31 U+32 U+66B U+35 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"1000000.00" U+31 U+30 U+30 U+30 U+30 U+30 U+30 U+2E U+30 U+30 => "" | ["Bill total: 1000000.00","Tip percent: 18","Number of people: 4","Tip amount: 180000.00","Total with tip: 1180000.00","4 people pay 295000.00 each"]
"1000000,00" U+31 U+30 U+30 U+30 U+30 U+30 U+30 U+2C U+30 U+30 => "" | ["Bill total: 1000000.00","Tip percent: 18","Number of people: 4","Tip amount: 180000.00","Total with tip: 1180000.00","4 people pay 295000.00 each"]
"0.01" U+30 U+2E U+30 U+31 => "" | ["Bill total: 0.01","Tip percent: 18","Number of people: 4","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","3 people pay 0.00 each","Your group decides who pays the higher amount."]
"00000000001" U+30 U+30 U+30 U+30 U+30 U+30 U+30 U+30 U+30 U+30 U+31 => "" | ["Bill total: 1.00","Tip percent: 18","Number of people: 4","Tip amount: 0.18","Total with tip: 1.18","2 people pay 0.30 each","2 people pay 0.29 each","Your group decides who pays the higher amount."]
"+5" U+2B U+35 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"5 0" U+35 U+20 U+30 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"12..5" U+31 U+32 U+2E U+2E U+35 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"12.,5" U+31 U+32 U+2E U+2C U+35 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"1²" U+31 U+B2 => "" | ["Bill total: 12.00","Tip percent: 18","Number of people: 4","Tip amount: 2.16","Total with tip: 14.16","4 people pay 3.54 each"]
"①" U+2460 => "" | ["Bill total: 1.00","Tip percent: 18","Number of people: 4","Tip amount: 0.18","Total with tip: 1.18","2 people pay 0.30 each","2 people pay 0.29 each","Your group decides who pays the higher amount."]
"𝟏𝟐.𝟓𝟎" U+1D7CF U+1D7D0 U+2E U+1D7D3 U+1D7CE => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"12․50" U+31 U+32 U+2024 U+35 U+30 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"12.50‎" U+31 U+32 U+2E U+35 U+30 U+200E => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"‪12.50‬" U+202A U+31 U+32 U+2E U+35 U+30 U+202C => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"⁦12.50⁩" U+2066 U+31 U+32 U+2E U+35 U+30 U+2069 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"12.50­" U+31 U+32 U+2E U+35 U+30 U+AD => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"؜12.50" U+61C U+31 U+32 U+2E U+35 U+30 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"12،50" U+31 U+32 U+60C U+35 U+30 => "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" | []
"12.5٠" U+31 U+32 U+2E U+35 U+660 => "" | ["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
"１２" U+FF11 U+FF12 => "" | ["Bill total: 12.00","Tip percent: 18","Number of people: 4","Tip amount: 2.16","Total with tip: 14.16","4 people pay 3.54 each"]
## C4 tip inputs (bill 10.00, people 2): input => tip message | result
"18.0" => "Enter a whole number from 0 to 100, in digits only." | []
"18,5" => "Enter a whole number from 0 to 100, in digits only." | []
"1e1" => "Enter a whole number from 0 to 100, in digits only." | []
"+4" => "Enter a whole number from 0 to 100, in digits only." | []
"4." => "Enter a whole number from 0 to 100, in digits only." | []
"101" => "Enter a whole number from 0 to 100, in digits only." | []
"100" => "" | ["Bill total: 10.00","Tip percent: 100","Number of people: 2","Tip amount: 10.00","Total with tip: 20.00","2 people pay 10.00 each"]
"0" => "" | ["Bill total: 10.00","Tip percent: 0","Number of people: 2","Tip amount: 0.00","Total with tip: 10.00","2 people pay 5.00 each"]
"000" => "" | ["Bill total: 10.00","Tip percent: 0","Number of people: 2","Tip amount: 0.00","Total with tip: 10.00","2 people pay 5.00 each"]
"-1" => "Enter a whole number from 0 to 100, in digits only." | []
"abc" => "Enter a whole number from 0 to 100, in digits only." | []
"１８" => "" | ["Bill total: 10.00","Tip percent: 18","Number of people: 2","Tip amount: 1.80","Total with tip: 11.80","2 people pay 5.90 each"]
"١٨" => "" | ["Bill total: 10.00","Tip percent: 18","Number of people: 2","Tip amount: 1.80","Total with tip: 11.80","2 people pay 5.90 each"]
"²" => "" | ["Bill total: 10.00","Tip percent: 2","Number of people: 2","Tip amount: 0.20","Total with tip: 10.20","2 people pay 5.10 each"]
"18‎" => "Enter a whole number from 0 to 100, in digits only." | []
" 18 " => "" | ["Bill total: 10.00","Tip percent: 18","Number of people: 2","Tip amount: 1.80","Total with tip: 11.80","2 people pay 5.90 each"]
"1 8" => "Enter a whole number from 0 to 100, in digits only." | []
"0100" => "" | ["Bill total: 10.00","Tip percent: 100","Number of people: 2","Tip amount: 10.00","Total with tip: 20.00","2 people pay 10.00 each"]
"00100" => "" | ["Bill total: 10.00","Tip percent: 100","Number of people: 2","Tip amount: 10.00","Total with tip: 20.00","2 people pay 10.00 each"]
## C4 people inputs (bill 10.00, tip 18): input => people message | result
"18.0" => "Enter a whole number from 1 to 100, in digits only." | []
"18,5" => "Enter a whole number from 1 to 100, in digits only." | []
"1e1" => "Enter a whole number from 1 to 100, in digits only." | []
"+4" => "Enter a whole number from 1 to 100, in digits only." | []
"4." => "Enter a whole number from 1 to 100, in digits only." | []
"0" => "Enter a whole number from 1 to 100, in digits only." | []
"101" => "Enter a whole number from 1 to 100, in digits only." | []
"100" => "" | ["Bill total: 10.00","Tip percent: 18","Number of people: 100","Tip amount: 1.80","Total with tip: 11.80","80 people pay 0.12 each","20 people pay 0.11 each","Your group decides who pays the higher amount."]
"1" => "" | ["Bill total: 10.00","Tip percent: 18","Number of people: 1","Tip amount: 1.80","Total with tip: 11.80","1 person pays 11.80"]
"abc" => "Enter a whole number from 1 to 100, in digits only." | []
"４" => "" | ["Bill total: 10.00","Tip percent: 18","Number of people: 4","Tip amount: 1.80","Total with tip: 11.80","4 people pay 2.95 each"]
"٤" => "" | ["Bill total: 10.00","Tip percent: 18","Number of people: 4","Tip amount: 1.80","Total with tip: 11.80","4 people pay 2.95 each"]
"③" => "" | ["Bill total: 10.00","Tip percent: 18","Number of people: 3","Tip amount: 1.80","Total with tip: 11.80","1 person pays 3.94","2 people pay 3.93 each","Your group decides who pays the higher amount."]
"00" => "Enter a whole number from 1 to 100, in digits only." | []
## C5 mutation counts while typing in another field
bill in error, typed in tip (18 -> 1 -> 15), left it: mutations {"bill":0,"tip":0,"people":0,"result":0} {"bill":"abc","tip":"15","people":"4","be":"Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50","te":"","pe":"","res":[],"guideShown":true,"fieldsShown":true}
valid result, tabbed through all fields with no change: mutations {"bill":0,"tip":0,"people":0,"result":0}
retyped last 0 of 100.00 (100.0 then 100.00): mutations {"bill":0,"tip":0,"people":0,"result":0}
## C5 markup
[{"id":"bill","label":"Bill total, tax included","labelVisible":true,"inputmode":"decimal","autocomplete":"off","errRole":"alert"},{"id":"tip","label":"Tip percent","labelVisible":true,"inputmode":"numeric","autocomplete":"off","errRole":"alert"},{"id":"people","label":"Number of people","labelVisible":true,"inputmode":"numeric","autocomplete":"off","errRole":"alert"},{"resultRole":"status"}]
## C5 widths
360 result {"clientWidth":360,"innerWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"elementsWiderThanWindow":0,"tipTop":277.1875,"peopleTop":394.375,"billErrH":24}
360 error {"clientWidth":360,"innerWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"elementsWiderThanWindow":0,"tipTop":349.1875,"peopleTop":490.375,"billErrH":96}
360 empty {"tipTop":277.1875,"peopleTop":394.375,"billErrH":24}
768 result {"clientWidth":768,"innerWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"elementsWiderThanWindow":0,"tipTop":277.1875,"peopleTop":394.375,"billErrH":24}
768 error {"clientWidth":768,"innerWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"elementsWiderThanWindow":0,"tipTop":325.1875,"peopleTop":442.375,"billErrH":72}
768 empty {"tipTop":277.1875,"peopleTop":394.375,"billErrH":24}
1280 result {"clientWidth":1280,"innerWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"elementsWiderThanWindow":0,"tipTop":277.1875,"peopleTop":394.375,"billErrH":24}
1280 error {"clientWidth":1280,"innerWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"elementsWiderThanWindow":0,"tipTop":325.1875,"peopleTop":442.375,"billErrH":72}
1280 empty {"tipTop":277.1875,"peopleTop":394.375,"billErrH":24}
## C7
fetch('https://example.com') => BLOCKED: Failed to fetch
console: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy."]
source count of localStorage : 0
source count of sessionStorage : 0
source count of indexedDB : 0
source count of document.cookie : 0
source count of caches : 0
CSP tag exact: true
after reload: {"bill":"","tip":"","people":"","be":"","te":"","pe":"","res":[],"guideShown":true,"fieldsShown":true}
after back button: {"bill":"","tip":"","people":"","be":"","te":"","pe":"","res":[],"guideShown":true,"fieldsShown":true}
total requests seen by this page (all loads): 113 distinct: ["file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html"]
## contract: window.splitBill
{"type":"function","a":{"tipCents":0,"totalCents":1000,"shares":[{"count":1,"cents":334},{"count":2,"cents":333}]},"b":{"tipCents":1800,"totalCents":11800,"shares":[{"count":4,"cents":2950}]},"c":{"tipCents":100000000,"totalCents":200000000,"shares":[{"count":100,"cents":2000000}]},"d":{"tipCents":5,"totalCents":35,"shares":[{"count":1,"cents":35}]},"again":true,"ownProps":["splitBill","plain","readAmount","readWhole","money","payLine","showResult","update","fields","MAX_BILL_CENTS","resultBox","shownResult"]}
after console sets window.splitBill to a stub, page shows: []
## C6 JavaScript off
visible text: "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page."
#guide visible: false
#fields visible: false
#bill visible: false
#tip visible: false
#people visible: false
noscript p visible: true
~~~~

1 line of that output is not a valid check and supports nothing: "after console sets window.splitBill to a stub, page shows: []". My script typed `5` after `100.00`, which made the bill `100.005`, so the empty result shows only the bill's error.

Results read from that output: C1 PASS (1 request; C2's first test passes). C2 PASS (the 5 typed tests). C4: the 4 states and every input that C4 names PASS; findings 1 and 2 are inputs that C4 covers by rule and does not name. C5 PASS for the 3 widths (0 elements wider than the window, `scrollWidth` equal to the width), the labels, the roles, the input modes and 0 changes while typing in another field. C6 PASS. C7 PASS in Chrome (fetch blocked by the policy; 0 storage words; exact tag present; reload and back button clear the fields).

What `c3.js` did (C3): opened the page 1 time and, for each case, filled the 3 fields with Playwright's `fill` (which fires the `input` event), read the result lines, and compared the tip amount, the total, the list of payments, their sum, their spread and their order with values computed by my own function in the script, which does not call `window.splitBill`.

Complete output of `node c3.js`:

~~~~text
sweep 1 (bills 0.01-50.00, tips 0/15/18/20, 1 person): cases so far 20000 mismatches 0
sweep 2 (bills 0.01-5.00, 1-12 people, tip 18): cases so far 26000 mismatches 0
spot ["10.00","0","3"] ["Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."]
spot ["1000000.00","100","100"] ["Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"]
spot ["0.01","0","100"] ["Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."]
total cases 26003 mismatches 0 seconds 370
~~~~

C3 PASS: 26,003 cases, 0 mismatches.

## Findings

Verdicts asked for in the scope, before the numbered findings:

- **F-16 (E-75): FIXED.** F-16's trigger is "count the choices: the card offers 2; 'change a CRITERION' is absent" (rule 14.5). I ran that trigger on the card in E-88 (`AUDIT-LOG.md` lines 921 to 927). It offers 4 choices. Choice C reads "change one of the 8 page rules. Say which.", which is the change to a CRITERION; choice D is the end of the run ("delivered, not done"); choice B is 1 more round. The trigger no longer reproduces. E-87 item 2 and E-77 item 2 state in the log what the card of E-69 lacked. The card of E-69 was sent and cannot change, so the later card is the only possible remedy. 1 part of rule 14.5 is still missing from E-88; it is not what F-16 raised, so I report it as finding 6.
- **F-19 (E-85): STILL OPEN.** F-19's trigger is "read choice B against rule 14.4: it offers the USER a way to let an open BLOCKER stop halting the run without a re-audit". E-87 item 1 withdraws choice B of E-79, and E-80 shows that the USER chose A, so that 1 choice is gone. I then ran the same trigger on the card of E-88, as the scope asks. Choice A of E-88 reads: "amend the skill. A wrong record line must be corrected in the log, and a script checks the files against the log. Only a wrong line in the product or final report stops work. You get the page today." E-88 was sent while F-18, a BLOCKER, was open (line 917). Choice A lets that open BLOCKER stop halting the run with no re-audit: E-92 then closed F-18 with `Record fault: yes` and no AUDITOR's report, and E-90 records "What the USER gave up … a new SUB-AGENT no longer re-checks each record correction on its own". That is choice B of E-79 ("a wrong ID in the log, once corrected in the log, no longer stops the line") in a wider form. Rule 14.4 names 2 ways out for the USER, exit (c) and a change to a CRITERION; an amendment to the skills is neither. The other reading: rule 20.3 lets the USER approve an amendment on a DECISION CARD, and the USER did so in E-89. Rule 20.3 does not say that an amendment may close a BLOCKER that is already open, and rule 14.4 was not amended to name that way out, so on the rules as written the fault that F-19 names came back in E-88. See finding 5.

### 1

- **Class:** BLOCKER (a): the DELIVERABLE fails a CRITERION. It is also drift: the page does more than the contract records.
- **Where:** `skills/hinshitsu/example/index.html` line 72 (`text.normalize("NFKC")` in `plain`), with lines 84 and 100 (`\d` tests after `plain`); `FRAMEWORK.md` line 33 (part 4, "Decimal mark").
- **Trigger:** open the file in Chrome. Type `1²` (U+0031 U+00B2) as the bill, `18` as the tip, `4` as the people. No message shows; the result shows "Bill total: 12.00", "Tip amount: 2.16", "Total with tip: 14.16", "4 people pay 3.54 each". Also: bill `①` (U+2460) gives "Bill total: 1.00"; bill `𝟏𝟐.𝟓𝟎` (U+1D7CF …) gives "Bill total: 12.50"; bill `12․50` (U+2024, one dot leader) gives "Bill total: 12.50"; tip `²` with bill `10.00`, people `2` gives "Tip percent: 2"; people `③` gives "Number of people: 3". Each line is in the script output under `## C4`.
- **Violates:** C4: "The bill is digits …", "A whole number is digits only", and "a full-width or Arabic-Indic digit or decimal mark counts as its plain form". A superscript, a circled digit, a mathematical bold digit and U+2024 are none of these, so each is "a value that fails the formats below" and must show a message and no result. `FRAMEWORK.md` part 4 records only "full-width and Arabic-Indic digits and decimal marks"; the comment on line 70 of the page says the same. The page also turns Extended Arabic-Indic digits (U+06F0 to U+06F9, line 74) into plain digits; C4 and the framework say "Arabic-Indic" and do not say whether that range is meant.
- **Proposed fix:** replace `normalize("NFKC")` with a mapping of exactly the characters C4 names: U+FF10 to U+FF19, U+FF0E, U+FF0C, U+0660 to U+0669, U+066B, and U+06F0 to U+06F9 if the USER means them. Then state the exact set in `FRAMEWORK.md` part 4. If the USER wants the wider set, that is a change to C4 (rule 3.5).

### 2

- **Class:** BLOCKER (a): the DELIVERABLE fails a CRITERION as C4 is worded.
- **Where:** `skills/hinshitsu/example/index.html` line 76 (the character class `[\s\u200B-\u200D\u2060\uFEFF]` in `plain`); `FRAMEWORK.md` part 4, which records no rule for the characters removed at the ends.
- **Trigger:** type `12.50` followed by U+200E (left-to-right mark) as the bill, `18`, `4`, and press Tab. The bill shows "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" and no result shows, though the field looks like `12.50`. The same happens with U+202A … U+202C around the value, U+2066 … U+2069 around it, U+00AD after it, and U+061C before it. As tip, `18` followed by U+200E gives "Enter a whole number from 0 to 100, in digits only." U+200B and U+FEFF at the ends are ignored, as C4 asks.
- **Violates:** C4: "Spaces and invisible characters at either end are ignored". C4 does not list which characters are invisible; these 5 kinds are invisible and are not ignored. The message tells the person to type what the field already appears to hold.
- **Proposed fix:** strip the Unicode format characters at both ends, for example `/^[\s\p{Cf}]+|[\s\p{Cf}]+$/gu`, and record the set in `FRAMEWORK.md` part 4. Or ask the USER to name the characters in C4.

### 3

- **Class:** BLOCKER (d), on the words of the glossary: "a statement … in the DELIVERABLE is false". No number on the page is wrong and no RECIPIENT sees the comment, so the ORCHESTRATOR may class it lower.
- **Where:** `skills/hinshitsu/example/index.html` line 67: `/* The contract in FRAMEWORK.md, part 4, names window.splitBill; the checks of C3 compare the page with it. */`
- **Trigger:** read line 67 against C3 of E-175: the AUDITOR "reads the page's own output, and compares it with a tip amount, total and payments computed by the AUDITOR's own code". C3 does not compare the page with `window.splitBill`. `grep -c splitBill prompts/WU-1-r2-*.md` prints 0 for each of the 9 round-2 scopes, so no scope of round 2 names a use of `window.splitBill`. `FRAMEWORK.md` line 30 says only "reachable from the browser console" and names no user of it either. So the reason the page gives for the line is false, and F-44 to F-46 (a line with no stated use) are answered with a use that does not exist.
- **Violates:** `GLOSSARY.md` BLOCKER (d); C3 as worded; `FRAMEWORK.md` part 4, which records no consumer of `window.splitBill`.
- **Proposed fix:** change the comment to what is true, for example "FRAMEWORK.md, part 4, makes splitBill reachable from the console.", and state in `FRAMEWORK.md` part 4 who calls it. Or remove the line and the contract's words "reachable from the browser console" (a change to D-5).

### 4

- **Class:** DEFECT (rule 14.6: a correction that is itself false).
- **Where:** `AUDIT-LOG.md` E-181, lines 1876 ("Wording of the CRITERIA that reads 2 ways: F-36 and F-70 to F-78 … F-79 and F-80 concern E-25 and the glossary, not the CRITERIA.").
- **Trigger:** read the `Where` lines of E-160, E-161, E-162 and E-170. F-70 is at "`index.html` line 29 (guide), line 37 (label), lines 138 and 140 (result)"; F-71 is at "`index.html` line 75"; F-72 is at "`index.html` lines 7, 27, 29, 32, 72, 137, 139, 141". These 3 are faults in the page's words, not in the wording of the CRITERIA; E-178 itself answers them as page changes ("the language auditor's findings 3 to 5"). The FINDINGS whose `Where` is the CRITERIA entry are F-36, F-47 and F-73 to F-78. Also, F-80's `Where` holds "E-98 line 1010" and its trigger holds "C4 uses 'the rules below' for input formats", so F-80 does concern the CRITERIA entry; C4 of E-175 now reads "the formats below".
- **Violates:** rule 14.6; rule 8.1 (an ID copied from the entry, not written from memory).
- **Proposed fix:** log a `CORRECTION` to E-181: wording of the CRITERIA is F-36, F-47 and F-73 to F-78, and in part F-80; F-70 to F-72 are faults in the page's words, answered by the page change of E-178. Run the record check and log the `RESOLUTION`.
- The other lines of E-181 are true against E-111 to E-170: F-30 to F-37 (each `Same fault as: F-30`); F-23 to F-29; F-47 and F-48; F-52; F-53; F-63; F-38 to F-43; F-44 to F-46; F-49 and F-50; F-65, F-67, F-68 and F-69. The 5 lines that E-181 corrects are at `AUDIT-LOG.md` lines 1763, 1798, 1841, 1848 and 1854, and I found no wrong ID there that E-181 leaves out.

### 5

- **Class:** DEFECT (rule 14.6: a correction that is itself false, in 1 clause).
- **Where:** `AUDIT-LOG.md` E-180, line 1866, last clause: "the card of E-88 … drops the choice that F-19 found unlawful".
- **Trigger:** read choice A of E-88 (line 923) with the trigger of F-19 (line 893), as set out under "F-19: STILL OPEN" above. The card of E-88 does not hold the words of E-79's choice B, but its choice A offers the same thing for every record fault, while the BLOCKER F-18 was open.
- **Violates:** rule 14.6; rule 14.4.
- **Proposed fix:** the ORCHESTRATOR cannot settle this alone. Put it to the USER on a DECISION CARD: either amend rule 14.4 to name an approved amendment under rule 20.3 as a third way out, and say whether it may apply to a BLOCKER already open; or record F-19 as open in the delivery report. Then correct the clause in E-180.
- The rest of E-180 is true: E-84 (line 882) and E-92 (line 958) name "`FRAMEWORK.md` part 5", and the WU-1 row is in part 6 (`FRAMEWORK.md` line 50), which no longer names F-7; E-93 and E-94 each hold `Record fault: yes` and `FIXED` and cite no AUDITOR's report; the card of E-88 offers the choice that F-16 found missing.

### 6

- **Class:** DEFECT.
- **Where:** `AUDIT-LOG.md` E-88, the card, choice B (line 924): "1 more round, same rules. May repeat."
- **Trigger:** read choice B against rule 14.5: "approve 1 more round, with its cost in SUB-AGENT runs". The choice states no cost. The cards of E-69 and E-79 stated "1 more independent session … About 5 minutes".
- **Violates:** rule 14.5.
- **Proposed fix:** the card was sent and answered (E-89), so log a `CORRECTION` that states the missing cost (1 SUB-AGENT run); put the cost on every later card of this kind.

### 7

- **Class:** DEFECT (rule 14.6: a false statement in a file of the RUN FOLDER).
- **Where:** `AUDIT-LOG.md` E-178, line 1854: "no layout shift on an error". `index.html` line 17 (`.error { min-height: 1.5rem; … }`).
- **Trigger:** at a width of 360 pixels, type `abc` as the bill and press Tab. The bill's message takes 4 lines: its paragraph grows from 24 to 96 pixels, and the tip field moves down from 277.19 to 349.19 pixels (72 pixels). At 768 and 1280 pixels the paragraph grows from 24 to 72 pixels and the tip field moves 48 pixels. Script output under `## C5 widths`; screenshot `w360-error.png`.
- **Violates:** rule 14.6. No CRITERION: C5 does not forbid the shift. F-61 (STYLE) is not answered by the change that E-178 claims.
- **Proposed fix:** correct E-178 by a `CORRECTION` entry ("the 1-line messages cause no shift; the bill's format message does"), or shorten that message, or hold room for it.

### 8

- **Class:** DEFECT (rule 14.6: out-of-date statements in a file of the RUN FOLDER).
- **Where:** `FRAMEWORK.md` line 52 (part 6, build order): "(2) form, the 3 states and validation"; `FRAMEWORK.md` line 50 and `SESSION-STATE.md` fields 4 and 8: "audit round 2 not yet run".
- **Trigger:** (a) C4 of E-175 reads "The page has 4 states", and `grep -c '<form' index.html` prints 0: the fields sit in `<div id="fields">` (line 30), so the page has no form. (b) E-182 (line 1882) records the LAUNCH of the round-2 seeder at commit f3578b9, and at the commit under review `review/index.html` already holds the seeder's change (SHA-256 dc993923…), so round 2 has started; rule 8.1, as E-90 words it, asks that the state files change in the same commit as the entry that changes a fact.
- **Violates:** rule 14.6; rule 8.1.
- **Proposed fix:** write "(2) the fields, the 4 states and validation" and "audit round 2 started (E-182)" in the same commit as the next entry.

### 9

- **Class:** DEFECT (rules 7.2 and 9.3, as `CONNECTIONS.md` line 3 cites them: each part and each edge is recorded).
- **Where:** `CONNECTIONS.md`, the diagram (lines 7 to 30) and the table (lines 35 to 58); `FRAMEWORK.md` part 5.
- **Trigger:** `grep -n -i 'red.cell\|probe\|evidence/' FRAMEWORK.md CONNECTIONS.md` prints nothing. Round 2 holds a RED CELL probe (`prompts/WU-1-r2-red-cell-probe.md`; E-174, line 1817: "This entry triggers a RED CELL probe"). Its scope takes the `CRITERIA-CHANGE` entry E-174 and decision D-9 as input, not the CRITERIA entry, and quotes no CRITERION (0 criterion lines), so the edge "CRITERIA entry → AUDITOR reports: is quoted in each scope" does not describe it, and no edge runs from a `CRITERIA-CHANGE` entry to anything. The graph also has no node for a `CRITERIA-CHANGE` entry, though E-174 is what changed C2 to C8 and so what the page was rebuilt from. `evidence/` holds the BUILDER's run that E-178 cites (`evidence/builder-smoke-E-178.txt`) and has no row of its own in part 5 beyond "every other file".
- **Violates:** rules 7.2 and 9.3; the same kind of gap as F-66 in round 1.
- **Proposed fix:** add nodes "CRITERIA-CHANGE entry" and "RED CELL probe report", with the edges `USER approval → CRITERIA-CHANGE entry`, `CRITERIA-CHANGE entry → CRITERIA entry` ("replaces the text of"), `CRITERIA-CHANGE entry → RED CELL probe report` ("triggers") and `RED CELL probe report → FINDING entries` ("raises"), each with its row and its "broken when".

### 10

- **Class:** STYLE.
- **Where:** `FRAMEWORK.md` part 3, line 26 (report files are `audits/<WU>-<role>-E-<n>.md`); `AUDIT-LOG.md` E-182, line 1889 (`audits/WU-1-r2-seed-E-182.md`); `prompts/WU-1-r2-*.md` (9 files).
- **Trigger:** read the name in E-182 against the pattern: it holds a part `r2` that the convention does not record. The 8 report files of round 1 follow the pattern with no round part.
- **Violates:** `FRAMEWORK.md` part 3. No result changes.
- **Proposed fix:** record the round part in part 3 (`audits/<WU>-r<round>-<role>-E-<n>.md` from round 2 on), or drop it: the `E-<n>` already tells the rounds apart.

### 11

- **Class:** STYLE.
- **Where:** `skills/hinshitsu/example/index.html` lines 50 to 193 (the script is not wrapped in a function); `FRAMEWORK.md` line 30.
- **Trigger:** in the console of the open page, `['plain','readAmount','readWhole','money','payLine','showResult','update','fields','MAX_BILL_CENTS','resultBox','shownResult'].filter(n => n in window)` returns all 11 names. The contract records 1 name as reachable from the console, `splitBill`; 11 more are reachable, and line 68 (`window.splitBill = splitBill;`) adds nothing that the top-level `function splitBill` does not already give.
- **Violates:** `FRAMEWORK.md` part 4 as worded (1 name recorded, 12 exposed). No CRITERION; no result changes.
- **Proposed fix:** wrap the script in a function so that line 68 is what exposes `splitBill`, or record in part 4 that every top-level name is global.

### What I found in agreement

- `window.splitBill` matches the contract of `FRAMEWORK.md` line 30: name, 3 inputs, output `{ tipCents, totalCents, shares }`, 1 or 2 groups with the larger payment first, the tip formula and the split (console calls under `## contract`).
- Only `splitBill` (lines 57 to 66) computes the tip, the total and the payments; `update` (lines 146 to 170) calls it 1 time and `money` only writes cents as text. I found no second implementation in the page. The 1 other copy of the page is `run/review/index.html`, which part 7 records.
- D-9 is followed (dot or comma; `1,000.00` and `1.000,00` refused). I found no behavior that follows a superseded decision: the dot-only rule of D-4 is gone, and the sentence under 2 payment lines is the one of E-175.
- Edges: the 24 edges of the diagram each have 1 row, and no row lacks an edge. The 7 role scopes of round 2 and the seeder's scope quote C1 to C8 with the words of E-175. Each of the 9 scopes states a SHA-256 for the page file it names. For 8 of them the stated SHA-256 matches that file at the commit under review (the adversarial and correctness scopes name `review/index.html`, dc993923…). The seeder's scope states e866bfe5… for both files; that was true at f3578b9, the commit E-182 names for it. `review/index.html` was identical to the page at 7518431 and f3578b9 and differs at 9783ee2 by 1 line (line 92).
- File ownership: `git log` shows `review/index.html` changed in commit 9783ee2 after the seeder's LAUNCH (E-182). Who made that change, the seeder or the ORCHESTRATOR, is UNVERIFIED: the seed report is not in the RUN FOLDER at this commit (E-182 says it is saved later).
- C1, C2, C3, C5, C6 and C7: every test I ran passed (output under `Examined`). C4: every input that C4 lists by name behaved as C4 says; the failures are in findings 1 and 2.

## Not examined

- A real phone and a screen reader (C5): UNVERIFIED. Neither is on this machine. The live-region check is a count of DOM changes, not speech.
- Firefox (C7): UNVERIFIED. C7 says it is not tested, and I did not look for it.
- C8: UNVERIFIED. `DELIVERY-REPORT.md` does not exist at the commit under review, so there are no 3 checks to follow and no time to record.
- The published page (D-8; edges into "published page"): not examined. The scope names the file at a commit, not a served address.
- Headed Chrome with a person at the keyboard: not run. Every browser check ran in Chrome for Testing 156.0.8078.47, headless, driven by Playwright; keys were sent as key events (`keyboard.type`) in the checks and by `fill` in the C3 sweep.
- The round-2 seed report (`audits/WU-1-r2-seed-E-182.md`): not in the RUN FOLDER at this commit. The edge "review copy → seed report" (the copy differs from the page by no more than the seed report states) is UNVERIFIED. I observed a difference of 1 line (line 92).
- The edge "scopes in prompts/ → AUDITOR reports" for my own scope: I compared the scope I received with `prompts/WU-1-r2-framework-drift.md` by reading, and its C1 to C8 by `diff` against E-175. I ran no byte comparison of the whole message, because the message is not a file on my machine. For the other 8 scopes the edge is UNVERIFIED: I did not see what was sent.
- Edges from the USER brief, the VOC entry, the GAP entry and the ASSUMPTION entries (rows 1 to 6 of the table): I checked that each edge has a row. I did not test each "broken when" against the log entries; those entries are plan-stage records that the scope does not name, and round 1's framework-drift auditor covered them.
- The other reports under `audits/`, the 4 memos, `MINDMAP.md`, `GAUGE.svg`, `COVERAGE-LEDGER.md` beyond line 5, and the files under `evidence/` other than `record-check-E-92.txt`: not read, except the lines of `audits/plan-reaudit-E-81.md` that state N-2. They are outside this role's scope.
- `scripts/hinshitsu_check.py --record`: not run. Rule 14.6 gives that step to the ORCHESTRATOR.
- `AUDIT-LOG.md` entries other than E-69, E-75, E-77, E-79, E-80, E-84, E-85, E-87 to E-90, E-92 to E-94, the `ID`, `Class`, `Where`, `Violates`, `Raised by` and `Same fault as` lines of E-111 to E-170, the full text of E-160 to E-162 and E-170, and E-171 to E-182: not read in full.
- Whether choice A of E-88 was lawful under rule 20.3 is a reading of the rules; I state both readings under F-19 and did not test it by any command.
