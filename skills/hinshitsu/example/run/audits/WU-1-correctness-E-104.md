Devin session ID: c45d189cffec438da2ac8b7d29af6d8f (devin-c45d189cffec438da2ac8b7d29af6d8f)

# Correctness audit — `skills/hinshitsu/example/run/review/index.html`

Verdict: 1 BLOCKER against C4 (`10.` is accepted as a bill), 1 BLOCKER under glossary item (d), 2 DEFECTS, 1 FRAGILITY, 1 STYLE. C1, C2, C3, C6 and C7 passed every test I ran. C8 is UNVERIFIED.

## Scope received

> You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: WU-1 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.
>
> # Role scope — Correctness auditor
>
> You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.
>
> ## Your job
>
> Test each CRITERION against the DELIVERABLE. Run every test the CRITERIA name. Read every function and every branch (each `if`, `else`, `case`, loop exit, error path and early return) and state for each whether it does what the CRITERIA require. Hunt for wrong results, missing behavior and behavior nobody asked for.
>
> ## Filled in by the ORCHESTRATOR
>
> - DELIVERABLE and files to examine: `skills/hinshitsu/example/run/review/index.html`, all lines (the copy under review)
> - Commit under review: the commit named in the first paragraph
> - CRITERIA, word for word from entry E-98:
>
> - C1. `skills/hinshitsu/example/index.html` is 1 file that loads no other file, and its calculator works when the file is opened from disk in desktop Chrome. Test: open the file by its `file://` path; the browser's request log shows 1 request; C2's first test passes. Covers G8, G11.
> - C2. Given a bill from 0.01 to 1,000,000.00, a whole-number tip from 0 to 100 percent and 1 to 100 people, the page shows: the bill, tip percent and people as read; the tip amount; the total; and what each person pays, as 1 line ("4 people pay 29.50 each") or 2 lines ("1 person pays 3.34" and "2 people pay 3.33 each"). Half a cent of tip rounds up. Tests, typed into the page: 100.00, 18, 4 gives tip 18.00, total 118.00, "4 people pay 29.50 each"; 0.30, 15, 1 gives tip 0.05; 10.10, 15, 1 gives tip 1.52 and total 11.62; 12.25, 18, 1 gives tip 2.21. Covers T1, G12.
> - C3. The payments sum to the total, to the cent, and no 2 payments differ by more than 0.01. Test: an AUDITOR types values into the page's own fields in a browser driven by a script, reads the page's own output, and compares it with a tip, total and payments computed by the AUDITOR's own code: every bill from 0.01 to 50.00 with tips 0, 15, 18 and 20 for 1 person; every bill from 0.01 to 5.00 with 1 to 12 people at tip 18; and the spot cases, as typed, `10.00`, `0`, `3` (3.34 and 3.33); `1000000.00`, `100`, `100`; and `0.01`, `0`, `100`. Covers G3.
> - C4. The page has 3 states. First open: 3 empty fields, 1 line of guidance, no error text, no result. Error: after a person types in a field or leaves it, a value that fails the rules below shows a message in plain words beside that field, and no result shows. Result: when all 3 fields are valid, the result shows and is recomputed on every change. An amount is digits, with an optional dot followed by 1 or 2 digits. A whole number is digits only. Spaces at either end are ignored. Each of these gets a message and no result: an empty field once left; letters; a comma (`12,50`, `1,000.00`); `1e3`; `10.`; `.5`; a currency sign; a negative or 0 bill; a bill above 1,000,000; 3 or more decimal places; a tip that is not a whole number from 0 to 100; people not a whole number from 1 to 100; `18.0`, `1e1`, `+4` or `4.` as tip or people. The message for a comma says to use a dot. Test: each input, in the browser. Covers G1, G2, G13.
> - C5. At widths of 360, 768 and 1280 pixels nothing is cut off and nothing scrolls sideways. Every field has a visible label; the bill's label reads "Bill total, tax included". Error text and the result sit in regions that screen readers announce. The bill field carries `inputmode="decimal"` and the other 2 fields `inputmode="numeric"`. Test: screenshots at the 3 widths; reading of the markup. A real phone is not tested and is reported UNVERIFIED. Covers G4, G5.
> - C6. With JavaScript off, the page shows a sentence saying that the calculator needs JavaScript. Test: load with JavaScript disabled. Covers G9.
> - C7. The page stores nothing and sends nothing. The file carries the tag `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`, and each field carries `autocomplete="off"`. Test: with the page open, `fetch('https://example.com')` run in the browser is blocked; the source holds no storage call; a reload in Chrome clears every field. Firefox is not tested and is reported UNVERIFIED. Covers G6, G7.
> - C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a browser, with no terminal: each names what to open, what to do, and what to see. The report states the SHA-256 of `index.html` as audited. Test: an AUDITOR who did not build the page follows the 3 checks as written. Covers V1, V2.
>
> - Glossary: `skills/hinshitsu/GLOSSARY.md`
>
> ## Report
>
> Write 1 report, in Markdown, in this order:
>
> 1. First line: the identifier that your runtime gave this run (session ID, task ID or agent ID). If you cannot read it, write `identifier: not visible to me`.
> 2. `## Scope received` — this scope, word for word.
> 3. `## Examined` — each file with line ranges, each command you ran with its complete output, each page you opened with what you did.
> 4. `## Findings` — number them 1, 2, 3. For each: **Class** (BLOCKER, DEFECT, FRAGILITY or STYLE, as `GLOSSARY.md` defines them); **Where** (file and line, or artifact and heading); **Trigger** (the exact steps, input or command that reproduce it, and what appears); **Violates** (the CRITERION ID or the rule number); **Proposed fix**.
> 5. `## Not examined` — what you did not examine, and why.
>
> ## Limits
>
> - You did not build this work. Do not change the DELIVERABLE or any file in the RUN FOLDER; propose each fix in your report.
> - Read only the files this scope names, and files those files reference.
> - Report what you observed. Do not report a check that you did not run. A check that you cannot run is UNVERIFIED, with the reason.
> - If you find nothing, say so, and list under `Examined` what you checked. Do not invent a finding and do not withhold one.
>
> Also report, for each function and each branch of the script, 1 line: what you tested and what appeared.

## Examined

### Files

- `skills/hinshitsu/example/run/review/index.html`, lines 1–167 (all), at commit `d125232c69fc9c85fae844443dc5053e7e6fa30d` ("example run: WU-1 swarm scopes; the copy under review"). 167 lines, 7123 bytes, SHA-256 `68a527cccb35991429c8bbee059448a042af80b62eeb6c91a8ce146fc54d57e5`.
- `skills/hinshitsu/GLOSSARY.md`, lines 53–67 and 91–96 (the 4 classes and UNVERIFIED), found with `grep`.
- `skills/hinshitsu/example/index.html` (the file C1 names): hash and a diff against the copy under review only. I ran no test on it.

### Commands

The raw logs and my scripts are attached (`checks.log`, `sweep-run1.log`, `sweep2.log`, `common.js`, `checks.js`, `sweep.js`, `sweep2.js`). They hold every line of output. The excerpts below are copied from them.

1. `git clone --branch devin/hinshitsu-build https://github.com/CatCorner22/devin.git`, then `git log --format='%H %cI %s' | grep -n 'example run: WU-1 swarm scopes'` → `1:d125232c69fc9c85fae844443dc5053e7e6fa30d 2026-11-18T16:32:19Z example run: WU-1 swarm scopes; the copy under review`. Then `git checkout -q d125232…`. At the end, `git status --short | wc -l` → `0`.
2. `wc -lc`, `sha256sum`, `cmp`, `cat -n` on the files:
   ```
   167 7123 skills/hinshitsu/example/run/review/index.html
   68a527cccb35991429c8bbee059448a042af80b62eeb6c91a8ce146fc54d57e5  skills/hinshitsu/example/run/review/index.html
   11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184  skills/hinshitsu/example/index.html
   skills/hinshitsu/example/run/review/index.html skills/hinshitsu/example/index.html differ: byte 3336, line 74
   ```
   `cat -n` printed the 167 lines of the file; I do not repeat them.
3. `git diff --no-index skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html` → 1 line differs:
   ```
   -  var m = /^(\d+)(?:\.(\d{1,2}))?$/.exec(s);
   +  var m = /^(\d+)(?:\.(\d{0,2}))?$/.exec(s);
   ```
4. `node checks.js` (Playwright attached to the desktop Chrome 156.0.8078.47 on this machine through its DevTools port; keys typed with `keyboard.type`). Output by criterion:
   - **C1**: `request log on file:// open: 1 request(s)` — `file:///home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html [Document]`.
   - **C2** (typed; my own BigInt code computed the expected lines):
     ```
     ["100.00","18","4"] MATCH ["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]
     ["0.30","15","1"] MATCH ["Bill: 0.30","Tip: 15 percent","People: 1","Tip amount: 0.05","Total: 0.35","1 person pays 0.35"]
     ["10.10","15","1"] MATCH ["Bill: 10.10","Tip: 15 percent","People: 1","Tip amount: 1.52","Total: 11.62","1 person pays 11.62"]
     ["12.25","18","1"] MATCH ["Bill: 12.25","Tip: 18 percent","People: 1","Tip amount: 2.21","Total: 14.46","1 person pays 14.46"]
     ```
     11 more cases of my own (`10.00/0/3`, `10.02/0/4`, `0.01/0/1`, `1000000.00/100/100`, `1000000/0/1`, `12.5/18/2`, ` 007.10 / 018 / 02 `, `0.05/50/1`, `0.10/5/1`, `0.09/5/1`, `999999.99/99/97`) gave the tip, total and pay lines that I computed. The 4 with unequal payments also showed the sentence in finding 3; the log marks those 4 `MISMATCH` for that sentence only.
   - **C4 first open**: `{"vals":["","",""],"errs":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]}`; visible text is the heading, 1 line of guidance and 3 labels. Focus alone on the bill showed no error.
   - **C4 inputs**, each typed with the other 2 fields valid (100.00, 18, 4). `C4 input failures: 1`.
     - Bill, 41 invalid inputs: `""` (left), `abc`, `12a`, `12,50`, `1,000.00`, `1e3`, `10.`, `0.`, `.5`, `.`, `$12.50`, `12.50$`, `€5`, `£5`, `¥5`, `-5`, `-0.01`, `0`, `0.0`, `0.00`, `00`, `1000000.01`, `1000001`, `9999999`, `10000000`, `99999999999999999999999`, `1.234`, `0.001`, `1.000`, `1..2`, `1.2.3`, `1 2`, `+5`, `１２`, `١٢`, `Infinity`, `NaN`, `0x10`, `1_000`, `5%`, 3 spaces. 40 showed a message and no result. **`10.` showed no message and a result** (`bill bad "10." -> error "" | result shown true ["Bill: 10.00","Tip: 18 percent","People: 4","Tip amount: 1.80","Total: 11.80"] | FAIL`). Both comma inputs showed "Use a dot, not a comma. Example: 12.50".
     - Bill, 9 valid inputs (`0.01`, `1000000`, `1000000.00`, `1000000.0`, `  12.50  `, `12.5`, `007`, `0.10`, `0000001000000.00`): no message, result shown. A bill with a no-break space, a tab and an ideographic space at its ends was also accepted.
     - Tip, 15 invalid (`""`, `abc`, `18.0`, `1e1`, `+4`, `4.`, `-1`, `101`, `1000`, `18%`, `1,5`, `1 8`, `.5`, `１８`, 23 nines): each showed a message and no result. 5 valid (`0`, `100`, `018`, ` 18 `, `00`): result shown.
     - People, 15 invalid (`""`, `0`, `00`, `101`, `abc`, `18.0`, `1e1`, `+4`, `4.`, `-1`, `1.5`, `4 people`, `1,0`, `1000`, 23 nines): each showed a message and no result. 4 valid (`1`, `100`, `004`, ` 4 `): result shown.
     - Note: a comma in the tip or people field (`1,5`, `1,0`) gets "Enter a whole number from … in digits only.", not "use a dot". C4's comma examples are amounts, so I do not count this as a failure.
   - **C4 transitions**: focus bill then Tab → `errs ["Enter the bill total.","",""]`, no result; each message sits in the same `.field` block, 4 px under its input; with bill and tip valid and people untouched → no error, no result; people `4` → result; append `0` → "40 people pay 2.95 each"; append `0` (`400`) → error, result hidden and emptied; people `3` → 2 pay lines; tip `18` → `1` → result recomputed.
   - **C5**: at 360, 768 and 1280, in 4 states each (first open, 2 error sets, largest result): `scrollWidth` = `innerWidth`, `scrollX` after `scrollTo(1000,0)` = 0, no element outside the viewport, no element with overflow. 12 screenshots taken; I looked at 6 (360 error ×2, 360 result, 768 result, 1280 error, 360 with JavaScript off) and saw nothing cut off. Markup: 3 visible labels ("Bill total, tax included", "Tip percent", "Number of people"); `inputmode` = `decimal`, `numeric`, `numeric`; the 3 error paragraphs carry `role="alert"`; the result carries `role="status" aria-live="polite"`. Chrome's accessibility tree lists 3 `alert` nodes and 1 `status` node.
   - **C7**: `fetch('https://example.com'): {"outcome":"REJECTED TypeError: Failed to fetch","v":[{"blockedURI":"https://example.com/","violatedDirective":"connect-src"…}]}` and the console error `Refused to connect because it violates the document's Content Security Policy`. An image and a `sendBeacon` probe were blocked the same way. After use: `{"localStorage":0,"sessionStorage":0,"cookie":"","indexedDB":0,"caches":0}`. Source search for storage calls: `null`. Source search for network or loading terms (`fetch(`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `<img`, `<link`, `src=`, `href=`, `url(`, `@import`, `action=`…): 1 hit, the text `name=` in `<meta name="viewport"` on line 6; nothing that loads or sends. `CSP tag exact match: true`. All 3 inputs and the form carry `autocomplete="off"`. `after page.reload(): ["","",""]`, no error, no result. After `about:blank` then Back: `["","",""]`.
     - The line `after F5 key: ["100.00","18","4"]` in the log is not a failure: a key sent through DevTools does not reach Chrome's reload shortcut, so no reload happened. I repeated F5 by hand (page 2 below) and the fields cleared.
   - **C6**: with script execution disabled through DevTools, the page text reads: "Split the bill / This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page. / Type the bill, the tip and the number of people. The split shows below. / Bill total, tax included / Tip percent / Number of people".
5. `node sweep.js` then `node sweep2.js` (C3). Every key typed into the page's fields; the page's result lines read back and compared with my own code; payments parsed from the page's lines, summed and compared with the total; spread checked.
   ```
   pass A tip 0: cumulative cases 5000, fails 0, 53s
   pass A tip 15: cumulative cases 10000, fails 0, 124s
   pass A tip 18: cumulative cases 15000, fails 0, 190s
   pass A tip 20: cumulative cases 20000, fails 0, 253s
   ```
   The first run's pass B reported 4453 "fails". The cause was my script: it treated the sentence "Your group decides who pays the extra cent." as a pay line. I corrected the script and ran pass B and the spot cases again:
   ```
   pass B: cases 6000, cumulative fails 0, 50s
   spot 10.00 0 3: MATCH page lines ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."]
   spot 1000000.00 100 100: MATCH page lines ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"]
   spot 0.01 0 100: MATCH page lines ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."]
   extra-sentence cases where more than 1 person pays the higher amount: 3395
   TOTAL cases 6003, mismatches 0
   cases with a result line that is not a header or pay line: 4455 {"Your group decides who pays the extra cent.":4455}
   ```
   Total: 26,003 cases, 0 mismatches in tip, total or payments.

### Pages opened

1. `file:///home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html` under script control, as in commands 4 and 5.
2. The same URL in the desktop Chrome window, by hand (mouse and keyboard). Typed `10.`, Tab, `18`, Tab, `4`: the page showed no error and "Bill: 10.00 … Tip amount: 1.80, Total: 11.80, 4 people pay 2.95 each". Pressed F5: all 3 fields were empty, no error, no result.
3. By mistake, my first attempt to type the URL lost its colon, and Chrome sent the text `file///home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html` to Google as a search. It holds a local path and nothing else.

### Each function and branch

| Code | What I tested | What appeared |
|---|---|---|
| `splitBill`, tip line 58 | 26,003 typed cases; `splitBill(30,15,1)` | Half a cent rounds up (0.30 at 15 → 0.05). Correct. |
| `splitBill`, `extra > 0` true | `10.00/0/3` | 2 shares: 1 × 3.34, 2 × 3.33. Correct. |
| `splitBill`, `extra > 0` false | `100.00/18/4` | 1 share: 4 × 29.50. Correct. |
| `splitBill`, largest input | `1000000.00/100/100` | Total 2000000.00, 100 × 20000.00. Correct. |
| `readAmount`, empty | `""` left; 3 spaces | "Enter the bill total." Correct. |
| `readAmount`, comma | `12,50`; `1,000.00` | "Use a dot, not a comma. Example: 12.50". Correct. |
| `readAmount`, pattern fails | Letters, `1e3`, `.5`, signs, 3 decimals and the other inputs listed above | Message, no result. Correct. |
| `readAmount`, pattern line 74 | `10.` | **Accepted as 10.00. Wrong (finding 1).** |
| `readAmount`, `whole.length > 7` | `12345678`; 23 nines | "Enter 1000000.00 or less." Correct. |
| `readAmount`, leading zeros | `007`; `0000001000000.00` | 7.00; 1000000.00. Correct. |
| `readAmount`, cents with 0, 1, 2 decimals | `10`; `10.5`; `10.50` | 1000; 1050; 1050 cents. Correct. |
| `readAmount`, `cents === 0` | `0`; `0.0`; `0.00`; `00` | "Enter an amount above 0." Correct. |
| `readAmount`, `cents > MAX_BILL_CENTS` | `1000000.01`; `9999999` | "Enter 1000000.00 or less." Correct. |
| `readAmount`, valid return | `1000000.00`; `0.01` | Result shown. Correct. |
| `readWhole`, empty | tip and people left empty | "Enter the tip percent. Enter 0 for no tip."; "Enter the number of people." Correct. |
| `readWhole`, not digits | `18.0`, `1e1`, `+4`, `4.`, `-1`, `abc`, `１８` | Range message, no result. Correct. |
| `readWhole`, too many digits | `1000`; 23 nines | Range message. Correct. |
| `readWhole`, `value < min` | people `0`, `00` | Range message. Correct. |
| `readWhole`, `value > max` | `101` in each field | Range message. Correct. |
| `readWhole`, valid return | `0`, `100`, `018`, ` 18 `, `004` | Value read; result shown. Correct. |
| `money`, `rest < 10` true and false | `money(5)`, `money(105)`, `money(10)`, `money(99)` | `0.05`, `1.05`, `0.10`, `0.99`. Correct. |
| `payLine`, `count === 1` true | `10.00/0/3` | "1 person pays 3.34". Correct. |
| `payLine`, `count === 1` false | `100.00/18/4` | "4 people pay 29.50 each". Correct. |
| `fields.*.read` (3 wrappers) | Every typed case | Bill uses `readAmount`; tip 0–100; people 1–100. Correct. |
| `addLine`, with and without class | Any result | 5 plain lines and the pay lines in bold. Correct. |
| `update`, error and touched | Invalid typed value | Message shown, `aria-invalid="true"`. Correct. |
| `update`, error and not touched | First open; people untouched | No message, no result. Correct. |
| `update`, no error | Valid value after an invalid one | Message cleared, `aria-invalid` removed. Correct. |
| `update`, `!allValid` early return | `400` people | Result hidden and emptied. Correct. |
| `update`, all valid | Every sweep case | Result rebuilt on every keystroke. Correct. |
| `update`, `shares.length === 2` | `10.00/0/3`; `10.02/0/4` | Extra sentence shown. **Not asked for (finding 3).** |
| `input` listener | Typing | Field marked touched; page updated. Correct. |
| `blur` listener | Focus then Tab on an empty bill | "Enter the bill total." Correct. |
| `pageshow` listener | Reload (script and F5 by hand); Back | 3 empty fields, no error, no result. Correct. |
| `submit` listener | Enter in the bill; `form.requestSubmit()` | `defaultPrevented true`; URL and values unchanged. Correct. |
| `window.splitBill = splitBill` | `typeof window.splitBill` | `function`. Not asked for (finding 6). |

## Findings

### 1. The bill field accepts `10.`

- **Class:** BLOCKER (glossary (a): the DELIVERABLE fails a CRITERION).
- **Where:** `skills/hinshitsu/example/run/review/index.html`, line 74: `var m = /^(\d+)(?:\.(\d{0,2}))?$/.exec(s);`
- **Trigger:** Open the file in Chrome. Type `10.` as the bill, `18` as the tip, `4` as people. No message shows beside the bill. The result shows "Bill: 10.00", "Tip amount: 1.80", "Total: 11.80", "4 people pay 2.95 each". Any digits followed by a bare dot do the same (`0.` is refused only because it is 0). Seen under script control and by hand.
- **Violates:** C4 ("An amount is digits, with an optional dot followed by 1 or 2 digits"; `10.` "gets a message and no result").
- **Proposed fix:** Change `\d{0,2}` to `\d{1,2}` on line 74. `skills/hinshitsu/example/index.html` at this commit already has `\d{1,2}`; that 1 character is the only difference between the 2 files.

### 2. With JavaScript off, the page still says "The split shows below" and shows 3 fields that do nothing

- **Class:** BLOCKER under glossary (d) (a statement in the DELIVERABLE is false). This is my reading of (d); C6 itself passes, so the ORCHESTRATOR may class it lower.
- **Where:** line 29 (`<p id="guide">`) and lines 30–46 (the form), which are outside `<noscript>`.
- **Trigger:** Load the file with JavaScript disabled. The needs-JavaScript sentence shows. Under it the guidance "Type the bill, the tip and the number of people. The split shows below." and the 3 fields still show. Type `100.00`, `18`, `4`: no result and no error appear.
- **Violates:** Glossary BLOCKER (d). No CRITERION.
- **Proposed fix:** Mark the guidance and the form `hidden` in the markup and have the script remove `hidden` when it starts; or wrap them so that only the `<noscript>` sentence shows without JavaScript.

### 3. The result adds a sentence that no CRITERION asks for, and its wording is wrong for most uneven splits

- **Class:** DEFECT.
- **Where:** line 143: `if (out.shares.length === 2) { addLine("Your group decides who pays the extra cent."); }`
- **Trigger:** Type `10.02`, `0`, `4`. The result shows "2 people pay 2.51 each", "2 people pay 2.50 each", "Your group decides who pays the extra cent." There are 2 extra cents, not 1. In my sweep the sentence showed in 4,455 of 6,000 cases, and in 3,395 of those more than 1 person pays the higher amount. `999999.99`, `99`, `97` shows it with 36 extra cents.
- **Violates:** C2 lists what the page shows (inputs as read, tip amount, total, and the payments "as 1 line … or 2 lines"); this is a 3rd line that C2 does not list. Scope: "behavior nobody asked for".
- **Proposed fix:** Delete line 143. If the USER wants the sentence, add it to C2 and word it for 1 and for many: "Your group decides who pays 1 cent more."

### 4. The copy under review is not the file that C1 and C8 name

- **Class:** FRAGILITY (the audit result holds for this copy only; it fails to carry over if the delivery report hashes or ships the other file).
- **Where:** `skills/hinshitsu/example/run/review/index.html` (SHA-256 `68a527cc…d57e5`) against `skills/hinshitsu/example/index.html` (SHA-256 `11570cbe…b8184`).
- **Trigger:** `cmp` the 2 files: `differ: byte 3336, line 74`.
- **Violates:** C8 ("The report states the SHA-256 of `index.html` as audited"), if the report states any hash other than `68a527cccb35991429c8bbee059448a042af80b62eeb6c91a8ce146fc54d57e5` for this audit. C1 names `skills/hinshitsu/example/index.html`; I did not test that file.
- **Proposed fix:** After fixing finding 1, make the 2 files byte-identical, re-audit that 1 file, and state its hash.

### 5. Screen-reader announcements depend on how the result region is shown and how errors are rewritten

- **Class:** FRAGILITY (another browser or screen reader). I did not run a screen reader; C5's test is a reading of the markup, and the markup has the roles.
- **Where:** line 47 (`<div id="result" role="status" aria-live="polite" hidden>`), lines 134–144 and line 130.
- **Trigger (by reading the code):** When the result first appears, the script fills the region while it is `hidden` and then removes `hidden`. Some screen readers do not announce text that was added while a live region was hidden. Line 130 rewrites all 3 `role="alert"` paragraphs on every keystroke in any field, so a screen reader may repeat an unchanged error on each key.
- **Violates:** C5 ("Error text and the result sit in regions that screen readers announce") — at risk, not shown to fail.
- **Proposed fix:** Keep the result region always rendered (empty when there is no result) and do not use `hidden` on it. On line 130, set `textContent` only when the text changes. Test with 1 screen reader.

### 6. `window.splitBill = splitBill` is a hook that no CRITERION asks for

- **Class:** STYLE.
- **Where:** line 67.
- **Trigger:** Read line 67. In this classic script every function declaration is already a property of `window` (12 names, listed in `checks.log`), so the line changes nothing.
- **Violates:** No CRITERION. Scope: "behavior nobody asked for".
- **Proposed fix:** Delete line 67, or wrap the script in a function so that it adds no global name.

## Not examined

- **C8 — UNVERIFIED.** The scope names no delivery report and no path to one, and limits me to the files it names. I did not open a delivery report or follow its 3 checks. I state the SHA-256 of the copy I audited above.
- **C5, real phone — UNVERIFIED.** No phone on this machine. The 3 widths were set as emulated viewports in desktop Chrome through DevTools, not by resizing the window.
- **C7, Firefox — UNVERIFIED.** Not tested, as C7 says.
- **C6 by Chrome's own site setting.** I disabled JavaScript through DevTools (`Emulation.setScriptExecutionDisabled`), not through Chrome's settings page.
- **Screen readers.** None run (finding 5).
- **`skills/hinshitsu/example/index.html`.** Hash and diff only. No test run on it, because the scope names the review copy as the DELIVERABLE.
- **Other files in the RUN FOLDER and the rest of the skill** (rules, coverage ledger, entry E-98 itself). Outside this scope. I took the CRITERIA from the scope text and did not compare them with E-98.
- **Other browsers, other Chrome versions, Chrome's restore-tabs and duplicate-tab paths, autofill from a signed-in profile.** Not tested.
- **Bills above 50.00 for 1 person and above 5.00 for 2 to 12 people**, beyond the spot cases and my 11 extra cases. C3 does not ask for them.
- **Pasting, drag-and-drop and input-method (IME) entry.** I tested typing, plus 1 insert of text with no-break and ideographic spaces.
