devin-dbc0b19012014182b0a55783957d9bfe

# Adversarial tester report — `review/index.html`

Verdict: 1 BLOCKER that fails C2 on a test the CRITERIA name (`0100.5` shows `100.05`), 1 more BLOCKER, 2 DEFECTS, 2 FRAGILITIES, 1 STYLE. SHA-256 confirmed before and after: `a615ada402bc8ebfc5884b0eb6b1e62a12d3335b92d4be6790b6c91846a5af45`. Commit `beef7f6e8ab19fc5198f7ef38ac4583f1f466f75`. I changed no file in the repository (`git status --short`: 0 lines).

## Scope received

You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: round 3 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Adversarial tester

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Break it. Build inputs and sequences that the BUILDER did not plan for: empty, huge, malformed, hostile, repeated, out of order, concurrent, interrupted. Run each one against the real DELIVERABLE and record what happened. For rules or instructions, find the cheapest way an AGENT could comply in form and not in substance.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: `skills/hinshitsu/example/run/review/index.html`, all lines (the copy under review), SHA-256 a615ada402bc8ebfc5884b0eb6b1e62a12d3335b92d4be6790b6c91846a5af45
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

Confirm the SHA-256 before you start. Also run each trigger below on the page and state for each 1 line: REPRODUCES or DOES NOT REPRODUCE, with what appeared. In each, tip is `18` and people is `4` unless stated. (1) Bill `5` followed by U+00B2; bill U+2460 U+2461; bill `12` U+2024 `50`; people U+2463 with bill `100.00`: before, each showed a result. (2) Bill `12.50` with U+200E before it; with U+200F after it; with U+061C before it; with U+00AD before it; inside U+2066 and U+2069; inside U+202A and U+202C; with U+180E after it: before, each showed a message and no result. (3) Type `12.` as the bill, press Tab, then return to the bill field: before, the message stayed while the field had keyboard focus. (4) Click the empty bill field, type nothing, bring another window to the front: before, a message showed. (5) Put `1`, then 100,000 spaces, then `x` in the tip field by script and fire 1 `input` event: before, the event took about 5 seconds. (6) With JavaScript off: before round 2, the guidance and 3 fields showed. (7) Bill `10.01`, tip `0`, people `3`: before round 2, the last line read "Your group decides who pays the extra cent." (8) Bill `abc`, press Tab, then type `18` as the tip while counting changes to the bill's message: before round 2, the message was written again on each key. (9) Bill `12,50`: before round 2, a message showed and no result. (10) In the console, list which of `splitBill`, `plain`, `readAmount`, `readWhole`, `money`, `payLine`, `showResult`, `update`, `MAX_BILL_CENTS` are properties of `window`: before, all were.

## Examined

### Files

- `skills/hinshitsu/example/run/review/index.html`, lines 1–219 (all).
- `skills/hinshitsu/GLOSSARY.md`, lines 52–59 and 88–97 (the 4 classes and their exits).
- `skills/hinshitsu/example/run/FRAMEWORK.md`, lines 17, 30, 31, 34 only (the file that line 68 of `index.html` references; the `splitBill` contract).

### Commands

The complete output of every script is in the attached `adversarial-evidence.zip` (13 logs, 9 scripts, 26 screenshots). The lines below quote it; where a line is cut, the log holds the rest.

1. `git clone --branch devin/hinshitsu-build --single-branch https://github.com/CatCorner22/devin.git`, then `git log` filtered for the message → `beef7f6e8ab19fc5198f7ef38ac4583f1f466f75 2026-11-18 17:49:23 +0000 example run: round 3 swarm scopes; the copy under review` (the only match). `git checkout -q beef7f6…`.
2. `sha256sum skills/hinshitsu/example/run/review/index.html` → `a615ada402bc8ebfc5884b0eb6b1e62a12d3335b92d4be6790b6c91846a5af45` (matches the scope). `wc -lc` → `219 9746`. Run again after all tests: same hash; `git status --short | wc -l` → `0`.
3. `node triggers.js` (headless Chrome 156.0.8078.47, `file://` path, real key events) → `triggers.log`. Results are in the trigger table below.
4. `node onedec.js` → bills with 1 decimal digit. Output, bill line only: `0100.5`/`007`/`02` → `Bill total: 100.05`, `Tip percent: 7`, `Number of people: 2`, `Tip amount: 7.00`, `Total with tip: 107.05`; `12.5` → `12.05`; `12,5` → `12.05`; `12.50` → `12.50`; `0.5` → `0.05`; `0.1` → `0.01`; `0.9` → `0.09`; `999999.9` → `999999.09`; `1000000.0` → `1000000.00`; `0.0` → message "Type an amount above 0."; full-width `１２．５` → `12.05`.
5. `node sweep.js A|B|C|D|E|F|S` (C3; values typed with key events into the page's fields; page text compared, line for line, with my own BigInt arithmetic) → `shard A: cases=5000 mismatches=0` (tip 0); `shard B: cases=5000 mismatches=0` (tip 15); `shard C: cases=5000 mismatches=0` (tip 18); `shard D: cases=5000 mismatches=0` (tip 20); `shard E: cases=3000 mismatches=0` (1–6 people); `shard F: cases=3000 mismatches=0` (7–12 people); `shard S: cases=3 mismatches=0` with `10.00,0,3` → "1 person pays 3.34", "2 people pay 3.33 each"; `1000000.00,100,100` → "100 people pay 20000.00 each"; `0.01,0,100` → "1 person pays 0.01", "99 people pay 0.00 each". Two sweeps of my own, outside C3's list: `comma bills: cases=500 mismatches=0`; `one-decimal bills: cases=500 mismatches=450` (every bill from `0.1` to `50.0` typed with 1 decimal digit, tip 18, 1 person; the 50 that match end in `.0`).
6. `node main.js` → `main.log` (594 lines; `main_compact.log` is the same with long messages shortened). In my log, a space between 2 printable characters of an input is not shown.
   - C1: `requests: 1 ["file:///…/review/index.html"]`; the source holds no `src=`, `href=`, `url(`, `@import`, `<link`, `<img`, `<iframe`.
   - C2: the 4 two-decimal tests give the stated values (`100.00,18,4` → 18.00, 118.00, "4 people pay 29.50 each"; `0.30,15,1` → 0.05; `10.10,15,1` → 1.52 and 11.62; `12.25,18,1` → 2.21). The 5th test fails (finding 1). The result's text holds only the stated lines.
   - C4: first open shows 3 empty fields, the guidance, no message, no result. 104 bill inputs, 32 tip inputs, 26 people inputs, each typed, read with the cursor in the field, then read after leaving. Every input that C4 lists gets a message and no result, and `10.` and `10,` get none until the field is left. The exceptions are in findings 1 to 4. Not accepted, as C4 requires or allows: Devanagari, Bengali, Thai and mathematical digits, `②`, `Ⅷ`, `½`, `0x10`, `1_000`, `1'000.00`, a no-break space as thousands separator, U+066C, `12。50`, `12·50`, a zero-width space inside the number, markup text.
   - Sequences: click and Tab through 3 empty fields → 3 messages, no result; fields filled in the order people, tip, bill → result on the first bill digit; delete to empty → "Type the bill total."; Ctrl+Z works; the result is recomputed on each key of `100.00`.
   - C5: at 320, 360, 768 and 1280 pixels, in 4 states each (first open, 2-line result, largest result, 3 messages with 64-character values): 0 elements wider than the window, `scrollWidth` equals the width, `scrollTo(1000,0)` leaves `scrollX` 0. 16 screenshots. Markup: 3 visible labels tied to their fields, bill label "Bill total, tax included", `inputmode` decimal/numeric/numeric, 3 × `role="alert"`, result `role="status"`. Changes counted by a MutationObserver: 0 in the bill and tip messages and the result while I typed and deleted in people; 0 in all 4 while the bill went `100.00` → `100.0` → `100.00` → `0100.00 `, the tip `18` → `018 `, and focus moved through all fields.
   - C7: tag present, exact; `autocomplete="off"` on 3 fields; source counts of `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`, `caches`: 0 each. `fetch('https://example.com')` → `TypeError: Failed to fetch`, console "Refused to connect because it violates the document's Content Security Policy"; `fetch` over http, XMLHttpRequest, WebSocket, an image and `eval` are blocked too. After full use: `localStorage` 0, `sessionStorage` 0, cookie empty. `page.reload()`, leaving and pressing Back, and a URL with `?bill=5#bill=5` each give 3 empty fields.
7. `node extra.js` → `extra.log`: network log of the C7 probes (`https://example.com/x.png … failed blockedReason=csp`; the fetch and `sendBeacon` created no request); paste of control characters; a scan of `12.50` + each code point (which are ignored at the end); a scan of `1` + code point + `5` (only the 33 code points of lines 75–79 read as digits or marks); the same bytes served with a response header `Content-Security-Policy: script-src 'self'`.
8. `node realfocus.js` → `realfocus.log`: a real Chrome window on the desktop, no Playwright and no focus emulation; mouse and keys from `xdotool`, windows switched with `wmctrl`, state read over the DevTools protocol. Triggers 3 and 4, F5, and `100.5` typed with real keys (`Bill total: 100.05`).
9. `node headed.js` → `headed.log`: F5, Ctrl+R and Ctrl+Shift+R with real keys each reload and give 3 empty fields; screenshots for findings 3 and 4. Its window-switch lines are void (Playwright emulates focus); `realfocus.js` replaces them.
10. `node vis.js` → 3 screenshots of the bill field for finding 3.

### Pages opened

Only `file:///home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html` (plus `about:blank`, a 1-line blank file for the Back test, and the same bytes at an intercepted `http://audit.test/index.html` for finding 6). I typed, pasted, tabbed, clicked, switched windows, resized and reloaded as listed above.

### The 10 triggers

| # | Verdict | What appeared |
|---|---|---|
| 1 | DOES NOT REPRODUCE | `5²`, `①②`, `12․50`: bill message "Type the amount in digits only, such as 12.50 or 12,50. Leave out currency signs and thousands separators.", no result. People `④`: "Type a whole number from 1 to 100, in digits only.", no result. |
| 2 | DOES NOT REPRODUCE | All 7 show no message and the result for 12.50: tip amount 2.25, total 14.75, "3 people pay 3.69 each", "1 person pays 3.68". |
| 3 | DOES NOT REPRODUCE | After Tab the bill message shows; on return (Shift+Tab, and by click) it clears and `aria-invalid` goes; no result. Same in the real window. |
| 4 | DOES NOT REPRODUCE | Real window: another Chrome window to the front (`document.hasFocus()` false, `blur` fired with the field still the active element) → no message. Back in front → no message. Same with `12.` in the bill and with Ctrl+L. A click on the tip field then shows "Type the bill total.", as C4 requires. |
| 5 | DOES NOT REPRODUCE | The event took 2.4 ms; tip message, no result. At 10,000,000 characters set by script, 1 event takes 0.2 to 0.5 s. |
| 6 | DOES NOT REPRODUCE | Body text: "Split the bill" and "This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page." Guidance, fields and labels have no box. |
| 7 | DOES NOT REPRODUCE | "2 people pay 3.34 each", "1 person pays 3.33", "Your group decides who pays the higher amount." |
| 8 | DOES NOT REPRODUCE | 0 changes in the bill message, the other 2 messages and the result. |
| 9 | DOES NOT REPRODUCE | No message; `Bill total: 12.50` and the result of trigger 2. |
| 10 | DOES NOT REPRODUCE | Only `splitBill` is a property of `window` (`FRAMEWORK.md` line 34 requires it). The other 8 are not. Overwriting `window.splitBill` in the console does not change the page's result. |

### CRITERIA, as I observed them

C1: request log passes; "the calculator works" fails with C2. C2: FAILS (finding 1). C3: the listed test passes, 26,003 of 26,003. C4: FAILS on 2 sentences (findings 1 and 2). C5: passes on desktop Chrome; phone and screen reader UNVERIFIED. C6: passes. C7: passes in Chrome; Firefox UNVERIFIED. C8: UNVERIFIED (see Not examined).

## Findings

### 1. A bill with 1 decimal digit is read as hundredths: `12.5` becomes 12.05

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION; it shows a wrong amount of money).
- **Where:** `review/index.html` line 107: `parseInt(m[2] || "0", 10)` adds the digits after the mark as cents, whatever their count.
- **Trigger:** Type bill `0100.5`, tip `007`, people `02`. The page shows `Bill total: 100.05`, `Tip percent: 7`, `Number of people: 2`, `Tip amount: 7.00`, `Total with tip: 107.05`, "1 person pays 53.53", "1 person pays 53.52". Also `12.5` → 12.05; `12,5` → 12.05; `0.5` → 0.05; `999999.9` → 999999.09. No message shows. 450 of the 500 one-decimal bills from `0.1` to `50.0` are wrong.
- **Violates:** C2 (its 5th test: `0100.5` must show 100.50); C4 ("an optional decimal mark followed by 1 or 2 digits"); C1 through C2.
- **Proposed fix:** Line 107: `var frac = m[2] || "0"; if (frac.length === 1) { frac += "0"; }` then `parseInt(whole, 10) * 100 + parseInt(frac, 10)`. Compliance in form: C3's sweep types every bill with 2 decimal digits, so it passes 26,003 cases while this stands; only C2's last test catches it. Add to C3's test every bill from `0.1` to `50.0` typed with 1 decimal digit, and whole bills with none.

### 2. Invisible control characters at an end are not ignored

- **Class:** BLOCKER (the DELIVERABLE fails a sentence of C4). If the ORCHESTRATOR reads "invisible characters" as leaving out control characters, the class is DEFECT.
- **Where:** line 84, `IGNORED_AT_ENDS`: it has `\s`, `\p{Cf}` and `\p{Default_Ignorable_Code_Point}`, and not `\p{Cc}`.
- **Trigger:** Copy `12.50` followed by U+0085 (also U+0000, U+0001, U+001F, U+007F, U+009F) and paste it into the bill field with Ctrl+V, tip `18`, people `4`. The field shows `12.50`; the page shows "Type the amount in digits only…" and no result. The scan finds 60 such code points: U+0000–0008, U+000E–001F, U+007F–009F.
- **Violates:** C4 ("Spaces and invisible characters at either end are ignored").
- **Proposed fix:** Add `\p{Cc}` to the class on line 84.

### 3. Visible characters at an end are ignored, and the result shows

- **Class:** DEFECT.
- **Where:** line 84: `\p{Cf}` holds visible marks and `\s` holds U+1680.
- **Trigger:** Bill `12.50` followed by U+1680: the field shows `12.50–` and the page shows the result for 12.50. Bill U+0600 then `12.50`: a mark shows before the number; result for 12.50. Bill `12.50` then U+06DD, or U+070F U+0890 then `12.50`: a box shows in the field; result for 12.50. The scan lists as ignored the visible format characters U+0600–0605, U+06DD, U+070F, U+0890–0891, U+08E2, U+110BD and U+110CD. I saw U+1680, U+0600, U+06DD and the U+070F U+0890 pair on screen; I did not view the others. The scan also lists 3,769 unassigned code points as ignored; the 2 that I viewed (U+FFF0, U+2065) drew nothing.
- **Violates:** C4 (only spaces and invisible characters are ignored; a value that fails the format gets a message and no result).
- **Proposed fix:** Subtract the visible ones: ignore `c` only when it matches line 84's class and is none of U+1680, U+0600–0605, U+06DD, U+070F, U+0890, U+0891, U+08E2, U+110BD, U+110CD; or list the ignored code points instead of using whole categories.

### 4. With U+202E in front, the field shows 12.50 and the page computes 5.21

- **Class:** DEFECT (the result is for another number than the field displays). C4 as written requires this behaviour, so the fix needs the USER's decision on C4.
- **Where:** line 84 (`\p{Cf}` holds the 2 override characters U+202D and U+202E).
- **Trigger:** Put U+202E then `05.21` in the bill field (paste), tip `18`, people `4`. The field displays `12.50`. The result reads `Bill total: 5.21`, `Tip amount: 0.94`. Screenshot `rlo.png`.
- **Violates:** C2 in substance (the result is not for the bill the person sees); no CRITERION by its letter.
- **Proposed fix:** Do not ignore U+202D and U+202E; show the bill message. Trigger 2 names U+202A and U+202C, which do not reorder digits and can stay ignored.

### 5. `maxlength="64"` cuts a paste without notice and the page computes on the cut text

- **Class:** FRAGILITY (a larger input).
- **Where:** lines 33, 38, 43.
- **Trigger:** Paste 62 zeros followed by `12345` into the bill field. The field keeps 64 characters and the page shows `Bill total: 12.00`, no message. Paste `12.50`, 59 spaces, `USD`: the page shows the result for 12.50. Paste 64 spaces then `12.50`: "Type the bill total."
- **Violates:** C4 in substance (a value the person gave that fails the format gets a result).
- **Proposed fix:** Remove `maxlength`. The reading code is linear: 10,000,000 characters take 0.2 to 0.5 s per event. Or keep a limit in the script and show a message when the text is longer.

### 6. When the script does not run and scripting is on, the page shows only its heading

- **Class:** FRAGILITY (another host or another browser).
- **Where:** lines 28–30 and 214–215: the JavaScript sentence is inside `<noscript>`, which shows only when scripting is off.
- **Trigger:** Serve the same bytes with the response header `Content-Security-Policy: script-src 'self'` (a common host setting). Body text: "Split the bill" and nothing else: no sentence, no guidance, no field. A browser that cannot parse line 84 (`\p{…}` with the `u` flag) would fail the same way; I did not run one.
- **Violates:** C6 in substance (no sentence tells the person why there is no calculator); C1's `file://` test is not affected.
- **Proposed fix:** Put the sentence in a plain `<p id="needs-js">` that shows by default and have the script hide it as its last statement, next to lines 214–215.

### 7. The bill message does not name the decimal rule

- **Class:** STYLE.
- **Where:** line 103.
- **Trigger:** Bill `12.505`, or `12.` then Tab. The message says "digits only" and "Leave out currency signs and thousands separators"; the person typed digits only.
- **Violates:** C4 is met by its letter ("such as 12.50"); no CRITERION.
- **Proposed fix:** "Type the amount in digits, with at most 2 digits after the decimal mark, such as 12.50 or 12,50. Leave out currency signs and thousands separators."

## Not examined

- C8 and the delivery report: the scope names no delivery report file, and I may read only the files it names. UNVERIFIED.
- `skills/hinshitsu/example/index.html` (the path C1 names): the scope gives the `review/` copy as the DELIVERABLE; I did not compare the 2 files.
- A real phone, a screen reader, Firefox, Safari, an older Chrome: not on this machine. UNVERIFIED.
- An input method editor (composition events), drag and drop, browser autofill, "reopen closed tab" and Chrome's session restore: not run.
- Trigger 4 variant "return by clicking straight into the tip field of the window behind": my click landed on the window in front; no result.
- Browser zoom and enlarged text at 360 pixels: not run (I ran 320 pixels instead).
- The rest of the RUN FOLDER and of `FRAMEWORK.md`: outside the scope.
