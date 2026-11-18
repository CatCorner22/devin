devin-5eb591ba8bdf4840b287c71b4753089d

## Scope received

You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: round 2 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Adversarial tester

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Break it. Build inputs and sequences that the BUILDER did not plan for: empty, huge, malformed, hostile, repeated, out of order, concurrent, interrupted. Run each one against the real DELIVERABLE and record what happened. For rules or instructions, find the cheapest way an AGENT could comply in form and not in substance.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: `skills/hinshitsu/example/run/review/index.html`, all lines (the copy under review), SHA-256 dc993923bda99787251fe78c9ba3a07eab64e987506cb7eb36700b26c75dad55
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

The complete output of the 3 test scripts is 259 lines. It is in the attached `t1.log`, `t2.log` and `t3.log`, with the scripts. This section gives every command, the complete output of each short command, and the result of every check the scripts ran.

### Result by CRITERION

| CRITERION | Result on the copy under review | Evidence |
|---|---|---|
| C1 | 1 request in Chrome's request log; C2's first test passes. I tested the copy under review, not `skills/hinshitsu/example/index.html`: see Finding 1. | `t1.log` |
| C2 | FAILS at the top of the range: `1000000.00` gets a message. The 5 typed tests pass. | Finding 1 |
| C3 | FAILS: 26,000 sweep cases match my arithmetic; spot case `1000000.00`, `100`, `100` does not. | Finding 1, `t3.log` |
| C4 | FAILS in 4 ways. Every input that C4 lists gave the result C4 states, except a bill of exactly 1000000.00. | Findings 1 to 4 |
| C5 | Passes what I could run. A real phone and a screen reader: UNVERIFIED, I have neither. | `t2.log` G, H, J |
| C6 | Passes. | `t2.log` K |
| C7 | Passes in Chrome. Firefox: UNVERIFIED, not on this machine. | `t2.log` I |
| C8 | UNVERIFIED: the scope names no delivery report, and I may read only the files the scope names. | — |

### Files

- `skills/hinshitsu/example/run/review/index.html`, lines 1 to 195 (all).
- `skills/hinshitsu/GLOSSARY.md`, lines 53 to 69 and 91 to 96 (BLOCKER, DEFECT, FRAGILITY, STYLE, UNVERIFIED). I did not read the other lines.
- `skills/hinshitsu/example/index.html`: I did not open it. I ran `sha256sum` and `diff` on it, because C1 names it.
- I listed the names in `skills/hinshitsu`, `example`, `example/run` and `example/run/review` with `ls`. I opened no other file.

### Commands and output

```
$ git clone --branch devin/hinshitsu-build https://github.com/CatCorner22/devin.git ~/audit/devin
Cloning into '/home/ubuntu/audit/devin'...
$ git log --format='%H %ci %s' | grep -n 'example run: round 2 swarm scopes'
1:1b6cf7695510718d4b21836b0756749400da0c54 2026-11-18 17:13:31 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in
2:d3fecb7bb267d611c64368b1c9b91402f5544c6e 2026-11-18 17:13:24 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger filled in
3:9783ee2a7133facb2130f65a7f5e57c134df9f7d 2026-11-18 17:13:16 +0000 example run: round 2 swarm scopes; the copy under review
$ git checkout -q 1b6cf7695510718d4b21836b0756749400da0c54 && git log -1 --format='%H %s'
1b6cf7695510718d4b21836b0756749400da0c54 example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in
$ sha256sum skills/hinshitsu/example/run/review/index.html skills/hinshitsu/example/index.html
dc993923bda99787251fe78c9ba3a07eab64e987506cb7eb36700b26c75dad55  skills/hinshitsu/example/run/review/index.html
e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0  skills/hinshitsu/example/index.html
$ diff example/index.html example/run/review/index.html
92c92
<   if (cents > MAX_BILL_CENTS) { return { error: tooMuch }; }
---
>   if (cents >= MAX_BILL_CENTS) { return { error: tooMuch }; }
$ for w in localStorage sessionStorage indexedDB document.cookie caches; do echo "$w: $(grep -c -F "$w" index.html)"; done
localStorage: 0
sessionStorage: 0
indexedDB: 0
document.cookie: 0
caches: 0
$ grep -n -o -E 'https?://[^" ]*|src=|href=|@import|url\(|<link|<form|XMLHttpRequest|WebSocket|sendBeacon|fetch\(' index.html
(no output, exit 1)
```

The SHA-256 of the copy under review matches the scope. 3 commits begin with the named words; I took the newest, `1b6cf76`. After all tests, `sha256sum` gave the same hash and `git status --short` printed nothing.

### Page opened

1 page: `file:///home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html`, in the desktop Chrome on this machine (156.0.8078.47), driven by Playwright over Chrome's remote-debugging port. The scripts typed or filled values in the page's own 3 fields and read the page's own error paragraphs and result. "Fill" fires the page's `input` event; after 3 fills the script takes the cursor out of the last field. `<M-BILL>` below stands for the bill's format message: "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50".

`node t1.js` (91 lines of output):

- C1: Playwright's request log and Chrome's own network log each show 1 request, the file itself. No page error, no console message.
- First open: 3 empty fields, the guidance sentence, no error text, no result.
- C2 typed tests: `100.00`, `18`, `4` gives 18.00, 118.00, "4 people pay 29.50 each". `0.30`, `15`, `1` gives 0.05. `10.10`, `15`, `1` gives 1.52 and 11.62. `12.25`, `18`, `1` gives 2.21. `0100.5`, `007`, `02` shows 100.50, 7 and 2. The result held the 6 or 8 lines C2 names and no other text.
- More results: `10.00`, `0`, `3` gives "1 person pays 3.34", "2 people pay 3.33 each" and the sentence. `0.01`, `0`, `100` gives "1 person pays 0.01", "99 people pay 0.00 each". `999999.99`, `100`, `100` gives "98 people pay 20000.00 each", "2 people pay 19999.99 each". `0.03`, `50`, `2` gives "1 person pays 0.03", "1 person pays 0.02".
- `1000000.00`, `100`, `100` and `1000000`, `0`, `1`: "Enter 1000000.00 or less." and no result (Finding 1).
- Bill, message and no result: empty, `abc`, `1,000.00`, `1.000,00`, `1e3`, `10.`, `.5`, `$5`, `5€`, `-5`, `0`, `0.00`, `0,0`, `1000000.01`, `1.234`, `+5`, `1 2`, `12..5`, `12.,5`, `0x10`, `Infinity`, `NaN`, `1_000`, `1'000`, `1 000`, full-width `１,０００`.
- Bill, read as 12.50: `12,50`, `12.5`, ` 12.50 `, `12.50` between U+200B and U+FEFF, `１２．５０`, `١٢٫٥٠`, `۱۲٫۵۰`, `１２，５０`.
- Tip, message and no result: empty, `18.0`, `18,5`, `1e1`, `+4`, `4.`, `-1`, `101`, `a`, `18%`, `1 8`. Tip, result: `100`, `0`, `000`, `00100`, `１８`, `١٨`, `۱۸`, ` 18 `.
- People, message and no result: empty, `0`, `00`, `101`, `18.0`, `18,5`, `1e1`, `+4`, `4.`, `-1`, `two`. People, result: `100`, `1`, `４`, `٤`.

`node t2.js` (133 lines of output), by section:

- A. `12.50` with 1 character before it, then after it. Ignored (result): U+00A0, tab, U+3000, U+200B, U+200D, U+2060, U+FEFF. Not ignored (`<M-BILL>`): 16 characters, listed in Finding 2.
- B. Characters that NFKC turns into digits or marks: Finding 3. Message, as expected: `⒙`, `㈩`, `Ⅳ`, `½`, `12。50`, `12٬50`, Devanagari `१२.५०`, N'Ko digits, `12·50`, `12⁄50`.
- C. Real keys. Click bill: no message. Type `12`: no message. Type `.`: no message, no result. Tab: `<M-BILL>`. Shift+Tab: Finding 4. With tip `18` and people `4`: bill `12.5` gives a result, `12.` no result and no message, `12` a result, `12,` no result and no message. 4 Tabs through 3 empty fields: 3 messages. Bill `10`, tip `10`, people untouched: no message, no result. Values set by script with no event: no message, no result.
- C5. Inserted text `12\n50` becomes `12 50` in the field and gets `<M-BILL>`; `12\t50` and `12\r\n.50` get `<M-BILL>`; `100\n` becomes `100`.
- D. Time for 1 `input` event in the tip field: Finding 5.
- E. `<img src=x onerror=alert(1)>`, `<script>alert(1)</script>`, `"><b>x` in the 3 fields: 3 messages, 0 elements built from the input.
- F. 301 tip changes in a row: the result matches the last value, 98.
- G. Changes counted by a MutationObserver on each error paragraph and on the result. Bill error showing, type `18` in tip: 0 changes in all 4. Type `12` in people: 0. Same message again (`x` to `xyz`, `185` to `1855`): 0. Same result text again (`100.0` to `100.00`, a trailing space, tip `18` to `018`, moving the cursor): 0. A changed message or result: 1 change.
- H. Markup: bill `inputmode="decimal"`, tip and people `inputmode="numeric"`, all 3 `autocomplete="off"`, 3 visible labels ("Bill total, tax included", "Tip percent", "Number of people"), 3 error paragraphs with `role="alert"`, result with `role="status"`, the CSP tag word for word as C7 gives it.
- I. `fetch('https://example.com')`: "TypeError: Failed to fetch", and the console names the CSP. An image request and `sendBeacon` to the same host: blocked (`sendBeacon` returns `true` because Chrome queues it; the console shows the block). After a reload: 3 empty fields. After leaving the page and pressing Back: 3 empty fields. `document.cookie` empty, `localStorage` and `sessionStorage` length 0.
- J. At 360, 768 and 1280 pixels, in 4 states (first open, 3 errors, 2-line result at 999999.99, 300-character input): `scrollWidth` equals the window width, 0 elements wider than the window, `scrollX` stays 0 after `scrollTo(1000, 0)`. 12 screenshots saved. I looked at 3, all at 360 pixels: nothing was cut off. For the other 9 I rely on the measurements.
- K. JavaScript off: the visible text is "Split the bill" and "This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page."; guidance not visible, 0 fields, 0 labels. 1 screenshot saved; I did not look at it.

`node t3.js` — C3. My reference arithmetic uses BigInt and shares no code with the page. A second check parses the page's payment lines and confirms that they sum to the page's total, that the head count equals the number of people, and that 2 payments differ by 0.01 at most. Output, with the 2 matching `spot` lines shortened after the verdict and the 23-line JSON repeat of the mismatch left out:

```
sweep 1: bills 0.01-50.00 step 0.01, tips 0/15/18/20, 1 person: cases 20000 mismatches 0 invariant failures 0
sweep 2: bills 0.01-5.00 step 0.01, 1-12 people, tip 18: cases 6000 mismatches 0 invariant failures 0
spot ["10.00","0","3"] MATCH
spot ["1000000.00","100","100"] MISMATCH | page: {"r":[],"e":["Enter 1000000.00 or less."]} | auditor: ["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"]
spot ["0.01","0","100"] MATCH
extra, beyond C3: top of the range
extra ["999999.99","100","100"] MATCH
extra ["999999.99","99","97"] MATCH
extra ["999999.99","1","7"] MATCH
extra ["500000.00","100","3"] MATCH
extra ["999999.50","15","99"] MATCH
total cases 26008 mismatches 1 seconds 406
```

## Findings

### 1. A bill of exactly 1000000.00 gets an error

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION).
- **Where:** `skills/hinshitsu/example/run/review/index.html`, line 92: `if (cents >= MAX_BILL_CENTS) { return { error: tooMuch }; }`.
- **Trigger:** Open the file. Type `1000000.00` in the bill, `100` in the tip, `100` in people. The bill shows "Enter 1000000.00 or less." and no result shows. `1000000` with tip `0` and 1 person does the same. `999999.99` gives a result. My code expects: tip amount 1000000.00, total with tip 2000000.00, "100 people pay 20000.00 each". The message also tells the person to enter the value they entered.
- **Violates:** C2 (bill from 0.01 to 1000000.00), C3 (spot case `1000000.00`, `100`, `100`), C4 (only a bill above 1000000.00 gets a message).
- **Proposed fix:** Line 92: change `>=` to `>`. `skills/hinshitsu/example/index.html`, the file C1 names, already has `>` on line 92, and that is the only line where the 2 files differ. I did not test that file: it is not the copy this scope names.

### 2. Invisible characters at the ends of a value are not ignored

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION).
- **Where:** line 76, the character list `[\s\u200B-\u200D\u2060\uFEFF]`.
- **Trigger:** Fill the bill with `12.50` with 1 of these characters before or after it, tip `18`, people `4`. Each one gives the bill's format message and no result: U+200E (left-to-right mark), U+200F (right-to-left mark), U+061C (Arabic letter mark), U+00AD (soft hyphen), U+202A, U+202C, U+2066, U+2069 (direction controls), U+180E, U+034F, U+2062, U+3164, U+FE0F, U+2800, U+0000, U+007F. The page ignores only spaces and U+200B, U+200C, U+200D, U+2060, U+FEFF. The case most likely in use: `١٢٫٥٠` with U+200F at the start, `١٨` with U+200F at the end and `٤` with U+200F at the start give 3 messages. A person cannot see what to correct.
- **Violates:** C4, "Spaces and invisible characters at either end are ignored". C4's test list holds no invisible character, so the listed tests pass while the sentence fails.
- **Proposed fix:** In line 76, strip the Unicode class instead of 5 code points: `/^[\s\p{Cc}\p{Default_Ignorable_Code_Point}\u2800]+|[\s\p{Cc}\p{Default_Ignorable_Code_Point}\u2800]+$/gu`, written so that Finding 5 does not return. I ran that class against the 16 characters in Node 22: it matched all 16. I did not run it in the page. Add U+200F and U+00AD cases to C4's test list, or list in C4 the exact characters the page must ignore.

### 3. Characters that are neither full-width nor Arabic-Indic are read as digits and decimal marks

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION). If the ORCHESTRATOR reads a superscript or circled number as "digits", the class is DEFECT: the page still reads `5²` as 52.
- **Where:** line 72, `text.normalize("NFKC")`.
- **Trigger:** Bill `100`, people `4`, tip `5²` (5 then U+00B2): the result shows "Tip percent: 52" and "4 people pay 38.00 each". Also accepted: tip `1⁰` as 10, `①` as 1, `⑱` as 18, `㊿` as 50, `₁₈` as 18, `𝟏𝟖` as 18; people `２²` as 22, `④` as 4, `٤²` as 42; bill `1²` as 12.00, `³.⁵` as 3.50, `⒓50` (U+2493 then 50) as 12.50, and `12․50` (U+2024), `12﹒50` (U+FE52), `12﹐50` (U+FE50) as 12.50. None shows a message.
- **Violates:** C4: "A whole number is digits only", "The bill is digits", and a value that fails the formats shows a message and no result. C4 grants the plain form only to a full-width or Arabic-Indic digit or decimal mark.
- **Proposed fix:** Remove `normalize("NFKC")`. Map only what C4 names: U+FF10 to U+FF19 to `0` to `9`, U+FF0E to `.`, U+FF0C to `,`, U+3000 to a space, and keep the 3 Arabic replacements on lines 73 to 75. Add `5²` as a tip to C4's test list.

### 4. The bill's message stays while the cursor is in the bill field with `12.`

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION as written). The effect is small: a stale message, and no wrong number.
- **Where:** lines 178 to 179: the page updates on `input` and `blur` and not on `focus`. Line 121 reads the cursor's place only when an update runs.
- **Trigger:** Real keys. Click the bill, type `12.`, press Tab: the bill's format message shows, as C4 states. Press Shift+Tab: the cursor is back in the bill, the field holds `12.`, and the message still shows (`t2.log`, section C, line "Shift+Tab back to bill"). The same happens on a click back into the bill with `12,` in it. The message goes on the next key.
- **Violates:** C4, "While the bill field has the cursor, digits followed by a decimal mark and nothing else (`12.`) show no message and no result".
- **Proposed fix:** Add `f.input.addEventListener("focus", update);` beside line 179. Or narrow C4 to "while the person types".

### 5. A long run of spaces inside a value freezes the page

- **Class:** FRAGILITY (works today; fails under a larger input).
- **Where:** line 76: the alternative `[\s\u200B-\u200D\u2060\uFEFF]+$` retries from every space when the run does not reach the end, so the time grows with the square of the length. No field has a length limit (lines 33, 38, 43), and line 149 reads all 3 fields on every event in any field.
- **Trigger:** Put `1`, then 100,000 spaces, then `x` in the tip field and fire 1 `input` event: the event takes 5,127 ms. With 100,000 U+200B characters: 9,221 ms. 50,000 spaces: 1,310 ms. 20,000 spaces: 105 ms. 1,000,000 digits: 3 ms. I set the value by script and tested the tip field only; I did not paste from the clipboard. While that value stays in the field, each key in any field costs the same time again.
- **Violates:** no CRITERION by its listed tests. It bears on C4, "recomputed on every change".
- **Proposed fix:** Add `maxlength="64"` to each field, and trim without backtracking: remove the leading run with `^[…]+`, then walk back from the last character in a loop.

## Not examined

- C8, the delivery report and its 3 checks: the scope names no delivery report file, and I may read only the files the scope names. UNVERIFIED.
- `skills/hinshitsu/example/index.html` in a browser: C1 names it, and the scope names the review copy as the copy under review. I ran only `sha256sum` and `diff` on it.
- A real phone, a screen reader, Firefox, Safari: not on this machine. UNVERIFIED, as C5 and C7 state.
- Chrome on Windows or macOS, and any Chrome version other than 156.0.8078.47.
- A paste from the system clipboard, drag and drop, an input method editor, a phone keyboard, a password manager or form-filling extension. I used key presses, Playwright `fill`, `execCommand('insertText')` and script-set values.
- The `12.` rule when the whole Chrome window loses focus while the cursor stays in the bill field. I did not try it.
- Zoom levels, large-text settings, dark mode, print, and widths other than 360, 768 and 1280.
- 10 of the 13 screenshots by eye; I relied on the measurements and the page text.
- `SKILL.md`, `FRAMEWORK.md`, `AUDIT-LOG.md` and the other files in the RUN FOLDER, and the lines of `GLOSSARY.md` outside 53 to 69 and 91 to 96: the scope does not name them, or I did not need them.
- "The cheapest way to comply in form and not in substance" for rules or instructions: this DELIVERABLE is a page, not a rule. I noted where C3's and C4's listed tests pass while the criterion's sentence fails (Findings 1 to 3).
