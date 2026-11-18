devin-23fe3a580f9c41c085519194b0b3a47c

# Language audit — round 2 — `skills/hinshitsu/example/index.html`

## Scope received

You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: round 2 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Language auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Read the CRITERIA, the `VOC` entry, every word a RECIPIENT reads, and the delivery report where it exists. Apply the categories of ambiguity in Kenneth A. Adams, *A Manual of Style for Contract Drafting*: lexical ambiguity; syntactic ambiguity (modifiers, "and" and "or", plurals); vagueness; undue generality; inconsistency (1 thing with 2 names, 1 name for 2 things); conflict between 2 statements; a rule with no actor; a rule that a third party cannot test. Report every banned word: "should", "shall", "appropriate", "reasonable", "proper", "adequate", "ensure", "try to", "as needed", "if possible", "generally", "typically".

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: `skills/hinshitsu/example/index.html`, all lines, SHA-256 e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0 (every word a RECIPIENT reads); the `VOC` entry E-25 and the `CRITERIA` entry E-175 in `skills/hinshitsu/example/run/AUDIT-LOG.md`. No delivery report exists yet
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

Confirm the SHA-256 before you start.

## Examined

### Commit and SHA-256

The repository was already on the machine at `/home/ubuntu/repos/devin`. I fetched the branch and checked out the commit, detached. 3 commits on the branch begin "example run: round 2 swarm scopes" (9783ee2, d3fecb7, 1b6cf76); the newest is 1b6cf76.

```
$ git fetch origin devin/hinshitsu-build; git log origin/devin/hinshitsu-build --format='%H %ad %s' --date=iso | head -4
40ed06a4fb8912fbce1c68f4e07305ec70c7aec8 2026-11-18 17:14:02 +0000 example run: LAUNCH E-183 to E-190 (round 2: 7 auditors and the red-cell probe); the round-2 seeder's report, saved whole after the auditors started
1b6cf7695510718d4b21836b0756749400da0c54 2026-11-18 17:13:31 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in
d3fecb7bb267d611c64368b1c9b91402f5544c6e 2026-11-18 17:13:24 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger filled in
9783ee2a7133facb2130f65a7f5e57c134df9f7d 2026-11-18 17:13:16 +0000 example run: round 2 swarm scopes; the copy under review
$ git checkout -q --detach 1b6cf7695510718d4b21836b0756749400da0c54 && git rev-parse HEAD && sha256sum skills/hinshitsu/example/index.html
1b6cf7695510718d4b21836b0756749400da0c54
e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0  skills/hinshitsu/example/index.html
```

The SHA-256 matches the scope. After all checks, `git status --short` printed nothing and the SHA-256 was the same.

### Files read

- `skills/hinshitsu/example/index.html`, lines 1 to 195.
- `skills/hinshitsu/example/run/AUDIT-LOG.md`: E-25, lines 230 to 258; E-175, lines 1819 to 1833. I also read lines 221 to 229 (the end of E-24, which E-25 cites), lines 1809 to 1816 (C2 to C8 in E-174, which E-175 cites) and lines 1835 to 1848 (E-176 and E-177, which E-175 cites as D-9). A `grep` for E-25 and E-175 showed lines 1725 to 1744 and 1878 of earlier findings; I did not rely on them.
- `skills/hinshitsu/GLOSSARY.md`, lines 1 to 97.
- `skills/hinshitsu/SKILL.md`: only the lines a `grep` returned, to cite the banned-words rule (line 86: "State the actor, the action and the test.").

### Commands on the text

```
$ grep -n -i -w -E 'should|shall|appropriate|reasonable|proper|adequate|ensure|try to|as needed|if possible|generally|typically' example/index.html            → no output, exit 1
$ sed -n '230,258p' AUDIT-LOG.md | grep (same pattern)                                                                                                           → no output, exit 1
$ sed -n '1819,1833p' AUDIT-LOG.md | grep (same pattern)                                                                                                         → no output, exit 1
$ (same 3 texts) grep -o -i -E '\w*(should|shall|appropriat|reasonabl|proper|adequa|ensur|general|typical)\w*'                                                   → no output
$ diff <(C2..C8 lines of E-174, lines 1809-1816) <(lines 1824-1830 of E-175)                                                                                     → IDENTICAL (7 lines compared)
$ diff <(C1 line of E-98) <(line 1823 of E-175)                                                                                                                  → IDENTICAL
$ for w in localStorage sessionStorage indexedDB document.cookie caches; do grep -c -F "$w" example/index.html; done                                             → 0 0 0 0 0
$ grep -c -F "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'\">" index.html   → 1
$ grep -c 'autocomplete="off"' example/index.html                                                                                                                → 3
$ grep -n -E -i 'src=|href=|url\(|@import|<link|<img|<iframe' example/index.html                                                                                 → no output, exit 1
$ grep -n -E '^### E-[0-9]+ .* (VOC|CRITERIA|CRITERIA-CHANGE|CORRECTION)' AUDIT-LOG.md → VOC entries: E-8 (line 57), E-25 (line 230). No VOC entry follows E-25.
```

No banned word and no inflected form of one is in the page, in E-25 or in E-175.

### Pages opened

Chrome for Testing 156.0.8078.47, driven by Playwright from 3 scripts that I wrote outside the repository (`a.js`, `sweep.js`, `blur2.js`, attached with their raw outputs). Each opened `file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html`. In `a.js` the C2 values were typed key by key; the C4 input lists were put in with 1 insert per value (1 `input` event), because several characters have no key. In `sweep.js` the 26000 sweep values were set with Playwright `fill` (sets the value and fires `input`); the 3 spot cases were typed key by key.

`$ node a.js` — complete output in the attached `a.out` (159 lines). Below: every line word for word, except that the 2 C4 input lists are grouped by outcome with no input left out, and the 9 lines of widths are stated as 1 line. `<A>` = "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50". `<T>` / `<P>` = "Enter a whole number from 0 to 100, in digits only." / "… from 1 to 100, in digits only." `<R1>` = the 6 result lines of 100.00, 18, 4.

```
browser 156.0.8078.47
## C1 requests after load: 1 ["GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
first open: {"bill":"","tip":"","people":"","be":"","te":"","pe":"","result":[],"active":"BODY"}
visible text: "Split the bill\n\nType the bill total, the tip percent and the number of people.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"
## C2 tests
["100.00","18","4"] => ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"] errors ["","",""]
["0.30","15","1"] => ["Bill total: 0.30","Tip percent: 15","Number of people: 1","Tip amount: 0.05","Total with tip: 0.35","1 person pays 0.35"] errors ["","",""]
["10.10","15","1"] => ["Bill total: 10.10","Tip percent: 15","Number of people: 1","Tip amount: 1.52","Total with tip: 11.62","1 person pays 11.62"] errors ["","",""]
["12.25","18","1"] => ["Bill total: 12.25","Tip percent: 18","Number of people: 1","Tip amount: 2.21","Total with tip: 14.46","1 person pays 14.46"] errors ["","",""]
["0100.5","007","02"] => ["Bill total: 100.50","Tip percent: 7","Number of people: 2","Tip amount: 7.04","Total with tip: 107.54","2 people pay 53.77 each"] errors ["","",""]
["10.00","0","3"] => ["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."] errors ["","",""]
["1000000.00","100","100"] => ["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"] errors ["","",""]
["0.01","0","100"] => ["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."] errors ["","",""]
["0.50","0","1"] => ["Bill total: 0.50","Tip percent: 0","Number of people: 1","Tip amount: 0.00","Total with tip: 0.50","1 person pays 0.50"] errors ["","",""]
## C1 requests after C2 tests (reloads included): 10
## C4 states
incomplete (tip, people typed; bill untouched): {"bill":"","tip":"18","people":"4","be":"","te":"","pe":"","result":[],"active":"people"}
bill abc, cursor still in bill; tip and people untouched: {"bill":"abc","tip":"","people":"","be":"<A>","te":"","pe":"","result":[],"active":"bill"}
bill focused then Tab (left empty): {"bill":"","tip":"","people":"","be":"Enter the bill total.","te":"","pe":"","result":[],"active":"tip"}
bill typed 1 then Backspace: {"bill":"","tip":"","people":"","be":"Enter the bill total.","te":"","pe":"","result":[],"active":"bill"}
## C4 inputs: bill (tip 18, people 4 typed first; then bill typed; state read with cursor in bill, then after Tab)
[bill] no message, result shows, in the field and after Tab (19 inputs → bill total shown):
    "12.50"→12.50  "12,50"→12.50  "12.5"→12.50  "12"→12.00  "  12.50  "→12.50  "U+200B12.50U+FEFF"→12.50  "U+FF11U+FF12U+FF0EU+FF15U+FF10"→12.50  "U+FF11U+FF12U+FF0CU+FF15U+FF10"→12.50  "U+0661U+0662U+066BU+0665U+0660"→12.50  "U+0661U+0662.U+0665U+0660"→12.50  "U+00A012.50"→12.50  "U+000912.50"→12.50  "1000000.00"→1000000.00  "1000000"→1000000.00  "U+2460U+2461"→12.00  "U+00B9U+00B2"→12.00  "U+06F1U+06F2"→12.00  "U+1D7CFU+1D7D0"→12.00  "U+3251"→21.00
[bill] in the field: no message, no result | after Tab: <A>, no result (3 inputs):
    "12."  "12,"  "10."
[bill] <A>, no result, in the field and after Tab (29 inputs):
    "abc"  "12a"  "1,000.00"  "1.000,00"  "1,000"  "1e3"  ".5"  ",5"  "$12"  "12$"  "U+20AC12"  "12 U+20AC"  "-5"  "-0"  "12.345"  "12,345"  "1 000"  "12 .50"  "+12"  "U+200E12.50"  "12.50U+200F"  "U+202D12.50U+202C"  "U+00AD12.50"  "U+206612.50U+2069"  "U+0967U+0968"  "12U+066C345"  "12U+060C50"  "12U+00B750"  "12U+239650"
[bill] "Enter an amount above 0.", no result (3 inputs):  "0"  "0.00"  "00"
[bill] "Enter 1000000.00 or less.", no result (2 inputs):  "1000000.01"  "1000001"
## C4 inputs: tip and people (bill 100.00 typed first, other whole-number field valid)
[tip] no message, result shows (9 inputs → tip percent shown):  "18"→18  "0"→0  "100"→100  "007"→7  "0100"→100  " 18 "→18  "U+FF11U+FF18"→18  "U+0661U+0668"→18  "U+2460"→1
[tip] <T>, no result (11 inputs):  "101"  "18.0"  "18,5"  "1e1"  "+4"  "4."  "-1"  "abc"  "18%"  "1 8"  "1000"
[tip] "" : in the field no message, no result | after Tab: "Enter the tip percent. Enter 0 for no tip.", no result
[people] no message, result shows (8 inputs → number of people shown):  "18"→18  "100"→100  "007"→7  "0100"→100  " 18 "→18  "U+FF11U+FF18"→18  "U+0661U+0668"→18  "U+2460"→1
[people] <P>, no result (12 inputs):  "0"  "101"  "18.0"  "18,5"  "1e1"  "+4"  "4."  "-1"  "abc"  "18%"  "1 8"  "1000"
[people] "" : in the field no message, no result | after Tab: "Enter the number of people.", no result
## C4 wording probes: "has the cursor" and "leaves the field"
12. typed, text cursor in bill: {"bill":"12.","tip":"18","people":"4","be":"","te":"","pe":"","result":[],"active":"bill"}
mouse pointer moved off the bill field, text cursor still in bill: {"bill":"12.","tip":"18","people":"4","be":"","te":"","pe":"","result":[],"active":"bill"}
clicked tip (text cursor left bill): {"bill":"12.","tip":"18","people":"4","be":"<A>","te":"","pe":"","result":[],"active":"tip"}
mouse pointer over the bill field, text cursor in tip: {"bill":"12.","tip":"18","people":"4","be":"<A>","te":"","pe":"","result":[],"active":"tip"}
bill clicked, nothing typed, then another tab brought to front: events=["bill focus"] hasFocus=true state={"bill":"","tip":"","people":"","be":"","te":"","pe":"","result":[],"active":"bill"}
## C5 mutation counts
bill shows a message; person types 18 in tip: {"bill-error":0,"tip-error":0,"people-error":0,"result":0} {"bill":"abc","tip":"18","people":"","be":"<A>","te":"","pe":"","result":[],"active":"tip"}
result shows; person types .00 after 100 in bill (result text ends the same; passes through "100."): {"bill-error":0,"tip-error":0,"people-error":0,"result":2} [<R1>]
result shows; person types 00 before 18 in tip (0018): {"bill-error":0,"tip-error":0,"people-error":0,"result":0} [<R1>]
result shows; person types 0 after 4 in people (40): {"bill-error":0,"tip-error":0,"people-error":0,"result":2} ["Bill total: 100.00","Tip percent: 18","Number of people: 40","Tip amount: 18.00","Total with tip: 118.00","40 people pay 2.95 each"]
## C5 markup
{"labels":[{"for":"bill","text":"Bill total, tax included","visible":true},{"for":"tip","text":"Tip percent","visible":true},{"for":"people","text":"Number of people","visible":true}],"inputs":[{"id":"bill","inputmode":"decimal","autocomplete":"off"},{"id":"tip","inputmode":"numeric","autocomplete":"off"},{"id":"people","inputmode":"numeric","autocomplete":"off"}],"errorRoles":["bill-error:alert","tip-error:alert","people-error:alert"],"resultRole":"status"}
## C5 widths
(9 lines: widths 360, 768, 1280 × states first-open, errors, result-max. Each line: innerWidth = scrollWidth = clientWidth = the width; "widerThanWindow":[]; "scrollXAfterScrollTo1000":0)
## C7
  [console.error] Connecting to 'https://example.com/' violates the following Content Security Policy directive: "default-src 'none'". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.
  [console.error] Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy.
fetch('https://example.com') => rejected: TypeError: Failed to fetch
before reload: {"bill":"100.00","tip":"18","people":"4","be":"","te":"","pe":"","result":[<R1>],"active":"people"}
after reload: {"bill":"","tip":"","people":"","be":"","te":"","pe":"","result":[],"active":"BODY"}
storage after use: {"cookie":"","ls":0,"ss":0}
## C1 total requests seen on this page in the whole run: 129 ["GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
## C6 JavaScript disabled
visible text: "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page."
guide visible: false | fields visible: false | inputs visible: [false,false,false]
exit 0
```

The 129 requests are 129 loads of the 1 file (1 per reload); each load made 1 request. I viewed 1 of the 9 screenshots (360 pixels, 3 messages showing): no text is cut off.

`$ node sweep.js` (C3; expected values from my own BigInt code, nearest cent with half up) — complete output:

```
sweep 1 cases 20000 mismatches 0 seconds 131
sweep 2 cases 6000 mismatches so far 0 seconds 170
spot 10.00 0 3 MATCH "Bill total: 10.00\nTip percent: 0\nNumber of people: 3\nTip amount: 0.00\nTotal with tip: 10.00\n1 person pays 3.34\n2 people pay 3.33 each\nYour group decides who pays the higher amount."
spot 1000000.00 100 100 MATCH "Bill total: 1000000.00\nTip percent: 100\nNumber of people: 100\nTip amount: 1000000.00\nTotal with tip: 2000000.00\n100 people pay 20000.00 each"
spot 0.01 0 100 MATCH "Bill total: 0.01\nTip percent: 0\nNumber of people: 100\nTip amount: 0.00\nTotal with tip: 0.01\n1 person pays 0.01\n99 people pay 0.00 each\nYour group decides who pays the higher amount."
TOTAL cases 26003 mismatches 0
exit 0
```

`$ DISPLAY=:0 node blur2.js` (headed Chrome, focus emulation off, 2 tabs) — complete output:

```
1. bill clicked, nothing typed: {"bill":"","be":"","active":"bill","hasFocus":true,"ev":["bill focus"],"lines":0}
1. after another tab of the same window came to the front: {"bill":"","be":"Enter the bill total.","active":"bill","hasFocus":false,"ev":["bill focus","bill blur","window blur"],"lines":0}
2. 12. typed in bill: {"bill":"12.","be":"","active":"bill","hasFocus":true,"ev":["bill focus"],"lines":0}
2. after another tab of the same window came to the front: {"bill":"12.","be":"","active":"bill","hasFocus":true,"ev":["bill focus"],"lines":0}
2. after the person came back to the tab: {"bill":"12.","be":"","active":"bill","hasFocus":true,"ev":["bill focus"],"lines":0}
2. after the person then clicked the tip field: {"bill":"12.","be":"<A>","active":"tip","hasFocus":true,"ev":["bill focus","bill blur"],"lines":0}
```

In part 2 the tab change did not register after the reload (`hasFocus` stayed true, no blur event), so part 2 shows nothing about a tab change. An earlier headless try (`a.js`, line "bill clicked, nothing typed, then another tab brought to front") and a first headed script (`blur.js`, 2 Chrome windows) also registered no focus loss; I do not rely on either.

### What the checks named in the CRITERIA showed

| CRITERION | Check run | Observed |
|---|---|---|
| C1 | `file://` open, request log, C2's first test | 1 request per load; first test matches |
| C2 | the 5 tests, typed | all 5 match |
| C3 | 26000 sweep cases and 3 spot cases against my own code | 0 mismatches |
| C4 | every listed input, plus probes of the wording | every listed input behaves as C4 says; findings 1 to 4 are about inputs and states that the wording leaves open |
| C5 | 3 widths × 3 states, markup, change counts | no sideways scroll, no element wider than the window; markup as stated; counts in finding 10 |
| C6 | JavaScript disabled | 2 sentences, no guidance, no field (finding 12) |
| C7 | `fetch`, source search, reload | blocked; 0 hits; fields empty after reload |
| C8 | — | UNVERIFIED: no delivery report exists |

Real phone, screen reader and Firefox: not run, UNVERIFIED, as C5 and C7 say.

## Findings

Findings 1 and 2 are BLOCKERS only on the reading of C4 that I state; on the other reading the page passes and the fault is in the wording. Either way 2 AUDITORS can reach opposite verdicts from the same words. A change to a FROZEN CRITERION needs the USER's approval (glossary, status table).

**1. "invisible characters" has no list; the page ignores some and refuses others**
- **Class:** BLOCKER (glossary (a)), on the reading that "invisible characters" includes the direction marks.
- **Where:** C4, "Spaces and invisible characters at either end are ignored"; `index.html` line 76.
- **Trigger:** type 18 in Tip percent and 4 in Number of people; paste into the bill field `U+200E 12.50`, or `12.50 U+200F`, or `U+202D 12.50 U+202C`, or `U+2066 12.50 U+2069`, or `U+00AD 12.50`. Message `<A>` shows and no result shows. With `U+200B 12.50 U+FEFF` or `U+00A0 12.50` the result shows. The person sees `12.50` in the field in every case.
- **Violates:** C4. Adams: vagueness.
- **Proposed fix:** in C4, replace "invisible characters" with the list of code points. In line 76, strip that list at both ends; I propose adding U+200E, U+200F, U+061C, U+202A to U+202E, U+2066 to U+2069 and U+00AD to the present set (white space, U+200B to U+200D, U+2060, U+FEFF).

**2. "digits" is not defined; the page accepts characters that C4 does not name**
- **Class:** BLOCKER (glossary (a)), on the reading that a circled or superscript number is not "digits".
- **Where:** C4, "The bill is digits", "A whole number is digits only", "a full-width or Arabic-Indic digit or decimal mark counts as its plain form"; `index.html` lines 72 to 75 (`normalize("NFKC")`).
- **Trigger:** bill `①②` (U+2460 U+2461) gives "Bill total: 12.00"; `¹²` gives 12.00; `𝟏𝟐` (U+1D7CF U+1D7D0) gives 12.00; `㉑` (U+3251, 1 character) gives 21.00; `①` in Tip percent gives "Tip percent: 1", and in Number of people gives "Number of people: 1". No message shows. `۱۲` (U+06F1 U+06F2, Extended Arabic-Indic) gives 12.00; `१२` (Devanagari) gives `<A>`.
- **Violates:** C4 ("a value that fails the formats below shows a message"). Adams: lexical ambiguity ("Arabic-Indic": U+0660 to U+0669 only, or also U+06F0 to U+06F9); syntactic ambiguity ("full-width or Arabic-Indic" may modify "digit" alone or "digit or decimal mark"); vagueness ("plain form").
- **Proposed fix:** C4: "A digit is 0 to 9. The page reads each of these as the digit of the same value: U+FF10 to U+FF19, U+0660 to U+0669, U+06F0 to U+06F9. The page reads U+FF0E as a dot, and U+FF0C and U+066B as a comma. Every other character gets a message." Page: replace `normalize("NFKC")` with a mapping of exactly those characters. The USER decides whether U+06F0 to U+06F9 stays in.

**3. The 4 states overlap, and a fifth state exists**
- **Class:** DEFECT.
- **Where:** C4, sentences 1 to 5 and "While the bill field has the cursor…".
- **Trigger:** (a) open the page, type `abc` in the bill field and touch nothing else: message `<A>` shows while 2 fields are empty and untouched. That is "Error", and it also meets the first 2 clauses of "Incomplete", whose third clause says "no field shows a message". The text does not mark which clauses of "Incomplete" are conditions and which are results. (b) "First open" meets every clause of "Incomplete". (c) Type 18, 4 and then `12.` in the bill field: no message and no result, with no field empty. That is none of the 4 states. (d) "Error" says a failing value "shows a message" once the person types; `12.` fails the format and shows none. C4 states the exception later, without "except".
- **Violates:** C4 (conflict between 2 statements; syntactic ambiguity). SKILL.md line 86.
- **Proposed fix:** "The page shows no result unless all 3 fields hold a valid value. Each field shows its message when (1) the person has typed in it or left it and (2) its value is not valid, except as the `12.` rule states. A field that the person has not touched shows no message." Drop the count of states, or name `12.` as a fifth.

**4. "has the cursor" and "leaves" each read 2 ways**
- **Class:** DEFECT.
- **Where:** C4, "While the bill field has the cursor", "leaves it", "has neither typed in nor left them", "once the person has left the field".
- **Trigger:** "cursor" names the mouse pointer and the text cursor. Observed: the page follows the text cursor (keyboard focus) and ignores the pointer (`a.js`, wording probes). "Leaves": click the bill field, type nothing, bring another tab to the front. "Enter the bill total." shows (`blur2.js`, part 1), although the person typed nothing and moved to no other field. C4 does not say whether a change of tab or window is "leaving". I could not make the same test register with `12.` in the field: UNVERIFIED.
- **Violates:** C4 (lexical ambiguity). On the reading that a tab change is not "leaving", the trigger is a failure of "Incomplete".
- **Proposed fix:** write "has keyboard focus" and "loses keyboard focus". Add 1 sentence: "A change of tab or window [counts / does not count] as losing keyboard focus." If it does not count, the page skips the blur handler when `document.hasFocus()` is false.

**5. "Under 2 lines" reads 3 ways**
- **Class:** DEFECT.
- **Where:** C2, "Under 2 lines, 1 sentence follows".
- **Trigger:** reading. (a) below the 2 lines; (b) when the payments take 2 lines; (c) when the payments take fewer than 2 lines. On (c) the page fails: `100.00, 18, 4` shows 1 payment line and no sentence.
- **Violates:** C2 (lexical ambiguity).
- **Proposed fix:** "When the payments take 2 lines, the next line reads: …".

**6. "The result shows no other text", yet C2 names no label**
- **Class:** DEFECT.
- **Where:** C2; `index.html` lines 162 to 166.
- **Trigger:** `100.00, 18, 4`: the result reads "Bill total: 100.00", "Tip percent: 18", "Number of people: 4", "Tip amount: 18.00", "Total with tip: 118.00". C2 lists the values and gives no label text, so an AUDITOR cannot say whether "Tip percent: " is permitted text or "other text", or whether "18%" would pass.
- **Violates:** C2 (a rule that a third party cannot test).
- **Proposed fix:** state the 5 lines in C2 word for word, with `<amount>` and `<number>` in place of the values.

**7. "each as a number without leading zeros" has an unclear reach; 3 formats are unstated**
- **Class:** DEFECT.
- **Where:** C2, first sentence.
- **Trigger:** reading, and `0.50, 0, 1`, which shows "Bill total: 0.50". "each" may cover 2 items (tip percent, number of people) or 3 (with the bill total). On 3, "0.50" begins with a zero. C2 gives "2 decimal places" for the bill total only; the format of the tip amount, the total with tip and the payments appears only in examples. C2 gives the 1-line form for 2 or more people only; "1 person pays 11.62" as the only line is inferred.
- **Violates:** C2 (syntactic ambiguity; vagueness).
- **Proposed fix:** "Each amount shows 2 decimal places and no zero before its first digit, except a single 0 before the decimal mark. The tip percent and the number of people show as whole numbers with no zero before the first digit, except 0 itself." Add the 1-person line to the examples.

**8. The rounding rule covers half a cent only**
- **Class:** DEFECT.
- **Where:** C2, "Half a cent of tip rounds up"; C3, "computed by the AUDITOR's own code".
- **Trigger:** reading. C2 does not say what 0.2 or 0.7 of a cent does. C3 makes each AUDITOR write the rule in code; "rounds up" also fits code that rounds every fraction up. I coded nearest cent, half up, and got 0 mismatches in 26003 cases, so the page does that.
- **Violates:** C2, C3 (vagueness).
- **Proposed fix:** "The tip amount is the bill total times the tip percent, divided by 100, rounded to the nearest cent; exactly half a cent rounds up."

**9. 1 thing with 2 names, and 1 name for 2 things**
- **Class:** DEFECT.
- **Where and trigger (reading):**
  - "bill" (C2, C3, C4) and "bill total" (C2, C5, the page). In C4 "the bill" is also the typed text ("The bill is digits") and "a negative or 0 bill" is its value.
  - "total with tip" (C2, the page) and "total" (C3 test; E-25 row 4). "Bill total" is also a total.
  - "message" (C4, C5), "error text" (C4, First open), "error paragraph" (C5).
  - "payments" (C2, C3), "the larger payment" (C2), "the higher amount" (C2 sentence, the page), "what each person pays" (E-25 row 4).
  - "person": the one who types ("the person leaves the field", C4; "a person types", C5) and a diner ("1 person pays 3.34", C2; "for 1 person", C3).
  - "tip": a percent in and an amount out (E-25 row 4: "tip percent … in; tip, total … out"). C2: "a tip that is a whole number".
  - "valid" (C4, Result) is not defined; C4 elsewhere says "fails the formats" and "gets a message". A bill of 0 or above 1000000.00 fails no format and still gets a message.
  - "the formats below" (later in the text) and "a message below that field" (position), in 1 sentence of C4.
  - "page", "file" and "calculator" (C1, C6).
- **Violates:** SKILL.md line 8 and the glossary's rule of 1 meaning for each term, applied by rule 13.1 (inconsistency).
- **Proposed fix:** fix 1 name each: "bill total" (the amount), "bill field" (the box), "tip percent", "tip amount", "total with tip", "payment", "message", "the person" (who types), "people" (who pay), "valid value" (defined once as: a value that gets no message). Use the page's words in the CRITERIA.

**10. Tests that name no actor, no input, or no pass condition**
- **Class:** DEFECT.
- **Where and trigger (reading, and the counts I took):**
  - C1, C2, C4, C5, C6, C7: the test names no actor. Only C3 and C8 name an AUDITOR. The glossary makes VERIFIED depend on who ran the check.
  - C4: "Test: each input, in the browser." Several "inputs" are classes ("letters", "a currency sign", "a tip that is not a whole number from 0 to 100"); each AUDITOR picks different instances. The test names no input for the accepted forms or for the 4 states.
  - C5: "a count of the changes … while a person types in another field (0 changes)". "another" has nothing to refer to. Observed: 0 changes when the bill shows a message and the person types 18 in Tip percent; 2 changes when a result shows and the person types `0` after `4` in Number of people, which is a correct change. The test passes or fails by the AUDITOR's choice of setup.
  - C4: "is recomputed on every change" cannot be observed when the text stays the same, and C5 forbids writing it again. Observed: typing `.00` after `100` in the bill field gives 2 changes in the result (removed at `100.`, written again with the same text at `100.0`).
  - C3: "compares it with" states no pass condition.
  - C5 and C7: "are reported UNVERIFIED" names no reporter.
  - C8: the test records a time and states no limit; it times an AUDITOR, and the rule is about the USER. "an AUDITOR who did not build the page" repeats the glossary's definition of AUDITOR.
- **Violates:** SKILL.md line 86 ("State the actor, the action and the test"); glossary, CRITERION ("with a named test").
- **Proposed fix:** begin each test "An AUDITOR …". C4: list the exact strings, as C2 does. C5: "Setup: type `abc` in the bill field and press Tab. Then type `18` in Tip percent. The bill's message changes 0 times." C4: replace "is recomputed on every change" with "after each change the result matches the 3 values in the fields". C3: "and every value matches". C5, C7: "the delivery report states UNVERIFIED for …". C8: "The check passes when the AUDITOR finishes all 3 within 5 minutes."

**11. Statements wider than their tests**
- **Class:** DEFECT.
- **Where and trigger (reading):**
  - C7: "The page stores nothing and sends nothing." The test covers 5 names in the source, 1 `fetch` and 1 reload. The policy in the tag does not cover a link, a form or a change of address, so "sends nothing" is wider than the test. The page has none of these today (source search: no `href`, no `<form>`).
  - C1: "its calculator works" is defined only by "C2's first test passes".
  - C5: "no element is wider than the window" names no state of the page and no height; "window" may mean the browser window or the viewport. I tested 3 states; the longest message wraps at 360 pixels.
  - C4: "the message names what to type" has no test. "Enter the bill total." names a thing and no format.
- **Violates:** rule 13.1 (undue generality; a rule that a third party cannot test).
- **Proposed fix:** C7: "The page's code calls no storage interface and makes no network request." C1: "…and C2's first test passes when the file is opened from disk". C5: "the viewport", and name the states: first open, 3 messages showing, and a result for 999999.99, 100, 99. C4: state the messages word for word.

**12. C6 says "a sentence"; the page shows 2**
- **Class:** DEFECT.
- **Where:** C6; `index.html` line 28.
- **Trigger:** load with JavaScript disabled. The page shows "This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page." C4 writes "1 sentence of guidance" where it means exactly 1; "a sentence" in C6 may mean exactly 1 or at least 1.
- **Violates:** C6 (lexical ambiguity).
- **Proposed fix:** C6: "the page shows these 2 sentences: …", word for word.

**13. C8: "the last audit round" and "what to open"**
- **Class:** DEFECT.
- **Where:** C8.
- **Trigger:** reading. "Last" may mean the latest round before the report or the final round of the run; "at" does not say whether the hash is of the file the round received or of the file after the fixes that the round caused. "What to open" does not say whether the USER opens the file or the published link (E-175, last line, puts hosting outside the CRITERIA). No delivery report exists, so whether the report meets C8 is UNVERIFIED.
- **Violates:** C8 (lexical ambiguity).
- **Proposed fix:** "The report states the SHA-256 of the `index.html` that the AUDITORS of the latest round examined, and the SHA-256 of the file delivered." Name the address or path in C8.

**14. E-25 is out of step with E-175**
- **Class:** DEFECT (glossary, DEFECT, second sentence).
- **Where:** `AUDIT-LOG.md` lines 250 to 258.
- **Trigger:** reading E-25 beside E-175. No VOC entry follows E-25.
  - VA1: "they type amounts with a dot". C4 now accepts a comma (E-176 gives the reason: some people cannot type a dot).
  - Row 2: "each naming what to open and what to see". C8 adds "what to do" and "within 5 minutes in total".
  - Row 3: "messages and labels on the page in plain words" → C4, C5. Neither holds a test of plain words; C5 fixes 1 label only. "Plain words" is itself vague.
  - Row 4: T1 sits under the heading "Customer language"; line 248 says the ORCHESTRATOR chose T1.
  - Row 4: "what each person pays out" reads as "pays out"; "in" and "out" are meant as input and output.
  - Line 240: "the skill set"; the glossary's term is "the skills".
- **Violates:** rule 14.6 as the glossary cites it; rule 13.1 (inconsistency).
- **Proposed fix:** a `VOC` correction entry: VA1 "they type amounts with a dot or a comma"; row 2 in C8's words; row 3 with a test ("each message and label uses only words in the list that C4 states", or drop "plain words" and cite finding 15); head column 1 "Need (USER's words, or T1)"; "inputs: … ; outputs: …".

**15. The bill's format message uses a term the page never explains**
- **Class:** STYLE.
- **Where:** `index.html` line 86.
- **Trigger:** type `1,000` or `$12` or `abc` in the bill field. The page shows "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50". "Decimal mark" is not a common word (E-25 row 3 asks for plain words). The message does not say that the mark is a dot or a comma, and does not tell the person who typed `1,000` or `$12` what to remove. "above 0" answers a fault that these inputs do not have.
- **Violates:** E-25, translation row 3 (V2). No CRITERION tests it (finding 14).
- **Proposed fix:** "Type the amount in digits only, such as 12.50 or 12,50. Leave out currency signs and thousands separators."

**16. "Type" and "Enter"; "Number of people"**
- **Class:** STYLE.
- **Where:** `index.html` lines 29, 42, 83, 86, 88, 91, 99, 122, 123.
- **Trigger:** reading. The guidance says "Type …"; all 7 messages say "Enter …"; C4 says "what to type". 1 act has 2 verbs. "Number of people" does not say which people; the result says "people pay".
- **Violates:** rule 13.1 (inconsistency; vagueness).
- **Proposed fix:** use "Type" in every message. Label: "Number of people paying".

**17. E-175 cites G1 to G13 and gives no place to find them**
- **Class:** STYLE.
- **Where:** `AUDIT-LOG.md` lines 1823 to 1831 ("Covers G8, G11" and the like).
- **Trigger:** reading. E-25 defines V1, V2 and T1. Neither E-175 nor E-25 defines a G item or names the entry or file that does. I did not search the rest of the RUN FOLDER for the definitions.
- **Violates:** SKILL.md line 63 (a third party traces a statement to its source).
- **Proposed fix:** add to E-175: "G1 to G13 are defined in <entry ID or file>."

Banned words: none found in the page, E-25 or E-175.

## Not examined

- The delivery report: none exists. C8 is UNVERIFIED.
- A real phone, a screen reader, Firefox: not run; C5 and C7 exclude them; UNVERIFIED.
- A change of window or tab while `12.` is in the bill field: my script did not register the focus loss; UNVERIFIED (finding 4).
- `AUDIT-LOG.md` outside the lines listed under `Examined`; `FRAMEWORK.md`, `COVERAGE-LEDGER.md`, the earlier audit reports and every other file of the RUN FOLDER: outside this scope. I did not check whether an earlier round already raised any finding above.
- `SKILL.md` beyond the lines a `grep` returned: I cite line numbers of that file, and "rule 13.1" and "rule 14.6" only as the scope and the glossary cite them.
- The 8 screenshots that I did not open: I relied on the measured widths.
- Whether the page's arithmetic is right outside the C3 sweep, and every matter of security, accessibility and code quality: other roles hold them.
