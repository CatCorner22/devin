devin-5e9928fcfb9c4780ba24df9cb44daff2

# Correctness audit, round 3 — `skills/hinshitsu/example/run/review/index.html`

Verdict: 1 BLOCKER that fails a named test of C2 (a bill with 1 digit after the decimal mark is read as hundredths: `0100.5` shows 100.05), 1 more BLOCKER, 1 DEFECT, 1 FRAGILITY, 1 STYLE. C1, C3, C5, C6 and C7 pass their named tests. C8 is UNVERIFIED.

## Scope received

You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: round 3 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Correctness auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Test each CRITERION against the DELIVERABLE. Run every test the CRITERIA name. Read every function and every branch (each `if`, `else`, `case`, loop exit, error path and early return) and state for each whether it does what the CRITERIA require. Hunt for wrong results, missing behavior and behavior nobody asked for.

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

Confirm the SHA-256 before you start. Also run each trigger below on the page and state for each 1 line: REPRODUCES or DOES NOT REPRODUCE, with what appeared. In each, tip is `18` and people is `4` unless stated. (1) Bill `5` followed by U+00B2; bill U+2460 U+2461; bill `12` U+2024 `50`; people U+2463 with bill `100.00`: before, each showed a result. (2) Bill `12.50` with U+200E before it; with U+200F after it; with U+061C before it; with U+00AD before it; inside U+2066 and U+2069; inside U+202A and U+202C; with U+180E after it: before, each showed a message and no result. (3) Type `12.` as the bill, press Tab, then return to the bill field: before, the message stayed while the field had keyboard focus. (4) Click the empty bill field, type nothing, bring another window to the front: before, a message showed. (5) Put `1`, then 100,000 spaces, then `x` in the tip field by script and fire 1 `input` event: before, the event took about 5 seconds. (6) With JavaScript off: before round 2, the guidance and 3 fields showed. (7) Bill `10.01`, tip `0`, people `3`: before round 2, the last line read "Your group decides who pays the extra cent." (8) Bill `abc`, press Tab, then type `18` as the tip while counting changes to the bill's message: before round 2, the message was written again on each key. (9) Bill `12,50`: before round 2, a message showed and no result. (10) In the console, list which of `splitBill`, `plain`, `readAmount`, `readWhole`, `money`, `payLine`, `showResult`, `update`, `MAX_BILL_CENTS` are properties of `window`: before, all were. Also report, for each function and each branch of the script, 1 line: what you tested and what appeared.

## Examined

### Files

- `skills/hinshitsu/example/run/review/index.html`, lines 1 to 219 (all), at commit `beef7f6e8ab19fc5198f7ef38ac4583f1f466f75`.
- `skills/hinshitsu/GLOSSARY.md`: the lines that define AUDITOR, DELIVERABLE, CRITERION, RUN FOLDER, FINDING, BLOCKER, DEFECT, FRAGILITY, STYLE, VERIFIED, UNVERIFIED (lines 17 to 67, by search).
- `skills/hinshitsu/example/run/FRAMEWORK.md`, lines 28 to 37 (part 4), because line 68 of the page refers to it.
- `skills/hinshitsu/example/index.html` (C1 names it): hashed and compared with the review copy by `diff`. I read no other line of it.

### Commands and output

Output marked "condensed" is shortened here; the complete output is in the attached `.out` file of the same name. All other output is complete.

1. Clone and checkout (a fresh clone in `~/audit/devin`):

```
$ git clone -q --branch devin/hinshitsu-build https://git-manager.devin.ai/proxy/github.com/CatCorner22/devin devin
$ git log --format='%H %cI %s' | grep -n 'example run: round 3 swarm scopes'
2:beef7f6e8ab19fc5198f7ef38ac4583f1f466f75 2026-11-18T17:49:23Z example run: round 3 swarm scopes; the copy under review
$ git checkout -q beef7f6e8ab19fc5198f7ef38ac4583f1f466f75 && git log --format='%H %s' | grep -c 'example run: round 3 swarm scopes'
1
$ sha256sum skills/hinshitsu/example/run/review/index.html skills/hinshitsu/example/index.html
a615ada402bc8ebfc5884b0eb6b1e62a12d3335b92d4be6790b6c91846a5af45  skills/hinshitsu/example/run/review/index.html
d5e4f980b2fcf0f7a883101d5d648ca48c264f246514aeb3816b671a0b6587b6  skills/hinshitsu/example/index.html
$ wc -lc skills/hinshitsu/example/run/review/index.html
 219 9746 skills/hinshitsu/example/run/review/index.html
```

The SHA-256 of the copy under review matches the scope. After all tests: `git status --porcelain | wc -l` printed `0`, and the hash was unchanged.

2. `diff example/index.html example/run/review/index.html`:

```
107c107
<   var cents = parseInt(whole, 10) * 100 + parseInt(((m[2] || "") + "00").slice(0, 2), 10);
---
>   var cents = parseInt(whole, 10) * 100 + parseInt(m[2] || "0", 10);
```

3. Source searches on the review copy: `grep -c -E 'localStorage|sessionStorage|indexedDB|document\.cookie|caches'` printed `0`; the count of the exact CSP tag of C7 printed `1`; `cat -A … | grep 'M-'` (non-ASCII bytes) printed nothing.

4. Browser. Google Chrome for Testing 156.0.8078.47 on Linux, headed, on the machine's desktop, driven by Playwright 1.63 (`a1.js`, `a2.js`, `a3.js`, `a5.js`, `a6.js`) and, for the window-switch test, by the raw DevTools protocol against the desktop Chrome with `wmctrl` moving real windows (`a4.js`). Page opened in every run: `file:///home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html`. "Typed" means: click the field, Ctrl+A, Backspace, then 1 key event per character.

`node a1.js` (condensed; complete in `a1.out`, 197 lines):

```
== C1 ==
playwright request log (1): [ 'GET file:///home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html' ]
CDP Network.requestWillBeSent (1): [ 'file:///…/review/index.html' ]
performance entries: [ 'navigation file:///…/review/index.html', 'visibility-state visible' ]
elements with src/href, link, script[src], img, iframe: 0
== C4 first open ==
{"billErr":"","tipErr":"","peopleErr":"","lines":[],"resultText":"","active":"BODY","invalid":"","values":["","",""]}
guide: { hidden: false, text: 'Type the bill total, the tip percent and the number of people.', sentences: 1 }
visible body text: "Split the bill\n\nType the bill total, the tip percent and the number of people.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"
== C2 tests ==
100.00 | 18 | 4 => ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"]
0.30 | 15 | 1 => ["Bill total: 0.30","Tip percent: 15","Number of people: 1","Tip amount: 0.05","Total with tip: 0.35","1 person pays 0.35"]
10.10 | 15 | 1 => ["Bill total: 10.10","Tip percent: 15","Number of people: 1","Tip amount: 1.52","Total with tip: 11.62","1 person pays 11.62"]
12.25 | 18 | 1 => ["Bill total: 12.25","Tip percent: 18","Number of people: 1","Tip amount: 2.21","Total with tip: 14.46","1 person pays 14.46"]
0100.5 | 007 | 02 => ["Bill total: 100.05","Tip percent: 7","Number of people: 2","Tip amount: 7.00","Total with tip: 107.05","1 person pays 53.53","1 person pays 53.52","Your group decides who pays the higher amount."]
10.00 | 0 | 3 => […,"Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."]
10.01 | 0 | 3 => […,"Total with tip: 10.01","2 people pay 3.34 each","1 person pays 3.33","Your group decides who pays the higher amount."]
(no message in any of the 7)
== C4 incomplete ==
bill+tip typed, people untouched: no message, no result
people clicked, nothing typed, still focused: no message, no result
fresh page, bill clicked only: no message, no result
then Tab (left bill empty): billErr "Type the bill total.", aria-invalid on bill, no result
fresh page, only tip typed: no message, no result
bill typed 5 then deleted, still focused: billErr "Type the bill total.", no result
== C4 error inputs (other 2 fields valid: bill 100.00, tip 18, people 4) ==
error inputs: 71 not conforming: 0
  Each of the 71 showed a message under its own field while focused and after Tab, 0 result lines, and no message under the other 2 fields.
  bill, message "Type the amount in digits only, such as 12.50 or 12,50. Leave out currency signs and thousands separators.":
    abc  1,000.00  1.000,00  1e3  .5  ,5  $12.50  12.50$  U+20AC 12,50  U+00A3 5  -5  -0.01  U+2212 5  12.345  12,345  1.000  0.001  "1 000"  "12 .50"  12..5  12.5.0  12.,5  +5  12.50x  Infinity  NaN  0x10  1_000  1'000  12/5  5%  1e-2  12.5e1
  bill, message "Type an amount above 0.":  0  0.00  0,0  000
  bill, message "Type 1000000.00 or less.":  1000000.01  1000001  1000000,01  99999999
  tip, message "Type a whole number from 0 to 100, in digits only.":  abc  101  -1  18.0  18,5  1e1  +4  4.  18%  "1 8"  100.0  1000  0.5  .5  4,
  people, message "Type a whole number from 1 to 100, in digits only.":  0  00  101  -1  18.0  18,5  1e1  +4  4.  abc  1.0  "2 0"  1000  4,  four
== C4 empty after typed/left ==
bill | typed then emptied: "Type the bill total." lines 0 | focused then left: "Type the bill total." lines 0
tip | typed then emptied: "Type the tip percent. Type 0 for no tip." lines 0 | focused then left: the same, lines 0
people | typed then emptied: "Type the number of people." lines 0 | focused then left: the same, lines 0
== C4 trailing decimal mark ==
For each of "12."  "12,"  "10."  U+FF11 U+FF12 U+FF0E  U+0661 U+0662 U+066B  "0."  " 12. ":
  focused: no message, 0 lines, no aria-invalid | after Tab: the "digits only" message, 0 lines | back with Shift+Tab: no message, 0 lines
tip "4." while focused: msg "Type a whole number from 0 to 100, in digits only." lines 0
people "4." while focused: msg "Type a whole number from 1 to 100, in digits only." lines 0
== C4 valid inputs (result must show; other 2 fields 18 and 4, or 100.00) ==
Bill total 12.50, no message:  12.50  12,50  "  12.50  "  U+00A0 12.50 U+200B  TAB 12.50 U+FEFF  full-width 12.50 with U+FF0E  full-width with U+FF0C  Arabic-Indic with U+066B  Arabic-Indic with "."  Extended Arabic-Indic with U+066B  "1" U+FF12 "." U+0665 U+06F0  56 zeros + 12.50
bill "0.01" => 0.01 | "0,01" => 0.01 | "1000000.00", "1000000", "1000000,0", "1000000.0" => 1000000.00 | "999999.99" => 999999.99 | "007" => 7.00 | "5" => 5.00 | "0.10" => 0.10 | "1.05" => 1.05 | "1.50" => 1.50
bill "12.5" => "Bill total: 12.05"      bill "12,5" => "Bill total: 12.05"
bill "0.5"  => "Bill total: 0.05"       bill "0.1"  => "Bill total: 0.01"
bill "100.5" => "Bill total: 100.05"    bill "1.5"  => "Bill total: 1.05"
tip "0" => 0 | "100" => 100 | "00" => 0 | "018" => 18 | full-width 18, Arabic-Indic 18, Extended Arabic-Indic 18, " 18 ", U+200B 18 U+00A0 => 18 | 60 zeros + 100 => 100
people "1" => 1 | "100" => 100 | "001" => 1 | U+FF14, U+0664, U+06F4, " 4 ", U+200E 4 U+200F => 4
== C4 result recomputed on every change ==
100.00/18/4: […,"4 people pay 29.50 each"]
people emptied: peopleErr "Type the number of people.", no result
people 3: […,"Total with tip: 118.00","1 person pays 39.34","2 people pay 39.33 each","Your group decides who pays the higher amount."]
tip 1: […,"Tip amount: 1.00","Total with tip: 101.00","2 people pay 33.67 each","1 person pays 33.66","Your group decides who pays the higher amount."]
tip 1x: tipErr "Type a whole number from 0 to 100, in digits only.", no result
tip 15: […,"Tip amount: 15.00","Total with tip: 115.00","1 person pays 38.34","2 people pay 38.33 each",…]
bill 100.0: the same result | bill "100." (focused): no message, no result | bill 100: the same result
final request counts: playwright 147 cdp 147 distinct urls [ 'file:///…/review/index.html' ]   (147 page loads, 1 request each)
```

`node a2.js` (condensed only where marked; complete in `a2.out`):

```
== Trigger 1 ==
bill "5\u{B2}" => msgs[Y--] lines 0 billMsg "Type the amount in digits only, su"
bill "\u{2460}\u{2461}" => msgs[Y--] lines 0 billMsg "Type the amount in digits only, su"
bill "12\u{2024}50" => msgs[Y--] lines 0 billMsg "Type the amount in digits only, su"
people "\u{2463}" bill 100.00 => msgs[--Y] lines 0 peopleMsg "Type a whole number from 1 to "
== Trigger 2 ==
bill "\u{200E}12.50" => msgs[---] lines 8 "Bill total: 12.50" | pay "3 people pay 3.69 each"
bill "12.50\u{200F}", "\u{61C}12.50", "\u{AD}12.50", "\u{2066}12.50\u{2069}", "\u{202A}12.50\u{202C}", "12.50\u{180E}" => each the same: msgs[---] lines 8 "Bill total: 12.50"   (condensed: 6 lines)
== Trigger 5 ==
tip = 1 + 100000 spaces + x, 1 input event: {"length":100002,"ms":3.2,"msg":"Type a whole number from 0 to 100, in digits only."}
other long values, 1 input event each: {"bill 1 .. len 100002":"5 ms","bill   .. len 100001":"6 ms","bill 11.. len 100001":"4.2 ms","bill 1ZWSP.. len 100002":"10.5 ms","people 00.. len 100001":"9.1 ms","bill 00.. len 1000000":"31.5 ms"}
== Trigger 7 ==
["Bill total: 10.01","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.01","2 people pay 3.34 each","1 person pays 3.33","Your group decides who pays the higher amount."]
== Trigger 9 ==
["Bill total: 12.50","Tip percent: 18","Number of people: 4","Tip amount: 2.25","Total with tip: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the higher amount."]
12.50: the same 8 lines
== Trigger 8 / C5 change counts ==
a) bill abc, Tab, type 18 in tip: {"bill":0,"tip":0,"people":0,"result":0} | bill msg "Type the amount in digits only"
b) then Tab, type 4 in people: {"bill":0,"tip":0,"people":0,"result":0}
c) 3 messages showing; type more letters in each field, click away: {"bill":0,"tip":0,"people":0,"result":0}
d) result showing; type a space after people, a space after bill, Tab x3, a leading 0 in tip: {"bill":0,"tip":0,"people":0,"result":0} | result still "4 people pay 29.50 each"
e) people changed 4 -> empty -> 5 (a real change; 3 keys): {"bill":0,"tip":0,"people":2,"result":2} | result "5 people pay 23.60 each"
== Trigger 10 ==
{"splitBill":true,"plain":false,"plainChar":false,"readAmount":false,"readWhole":false,"money":false,"payLine":false,"showResult":false,"update":false,"MAX_BILL_CENTS":false,"MAX_TIP_PERCENT":false,"MAX_PEOPLE":false,"IGNORED_AT_ENDS":false,"fields":true,"resultBox":false,"shownResult":false}
window.splitBill(10000,18,4) = {"tipCents":1800,"totalCents":11800,"shares":[{"count":4,"cents":2950}]} | splitBill(1000,0,3) = {"tipCents":0,"totalCents":1000,"shares":[{"count":1,"cents":334},{"count":2,"cents":333}]}
splitBill vs auditor formula, bills 1..3000 and 99997001..100000000, tips 0..100, people 1..100: {"calls":60600000,"mismatches":0,"first":null}
== C5 markup ==
{"labels":[{"text":"Bill total, tax included","for":"bill","visible":true,"labelsInput":true},{"text":"Tip percent","for":"tip","visible":true,"labelsInput":true},{"text":"Number of people","for":"people","visible":true,"labelsInput":true}],"inputs":[{"id":"bill","type":"text","inputmode":"decimal","autocomplete":"off","maxlength":"64","describedby":"bill-error"},{"id":"tip","type":"text","inputmode":"numeric","autocomplete":"off","maxlength":"64","describedby":"tip-error"},{"id":"people","type":"text","inputmode":"numeric","autocomplete":"off","maxlength":"64","describedby":"people-error"}],"errors":[{"id":"bill-error","role":"alert"},{"id":"tip-error","role":"alert"},{"id":"people-error","role":"alert"}],"result":{"role":"status","live":"polite"},"inputCount":3}
== C5 widths ==   (condensed: 12 lines; 4 states at each of 360, 768, 1280: first open, 3 messages, largest 2-line result, 64-character values)
All 12: elementsOutside [], docScrollWidth = clientWidth, scrollXAfterScrollTo500 0, widestElement = clientWidth.
clientWidth was 360, 768 and 1280, except "360 largest 2-line result": clientWidth 345 (a vertical scroll bar showed), widest element 345.
Largest result: ["2 people pay 20202.03 each","97 people pay 20202.02 each","Your group decides who pays the higher amount."]
== C7 ==
fetch: rejected: TypeError: Failed to fetch | violations: connect-src blocked https://example.com/
other channels: {"sendBeaconReturned":true,"xhr":"threw NetworkError","ws":"constructed","violations":["connect-src","connect-src","connect-src","img-src"]}
storage after use: {"cookie":"","localStorage":0,"sessionStorage":0,"indexedDB":0,"caches":0}
before reload: values ["100.00","18","4"], 6 result lines
after reload: {"billErr":"","tipErr":"","peopleErr":"","lines":[],"resultText":"","active":"BODY","invalid":"","values":["","",""]}
after reload from an error state: the same empty state
after about:blank then Back: the same empty state
source search: {"localStorage":0,"sessionStorage":0,"indexedDB":0,"document.cookie":0,"caches":0,"fetch":0,"XMLHttpRequest":0,"sendBeacon":0,"WebSocket":0,"http:":0,"https:":0,"src=":0,"href=":0,"<form":0,"eval(":0,"innerHTML":0}
CSP tag exact match count: 1 | non-ASCII bytes in file: 0
== C6 / Trigger 6: JavaScript off ==
visible text: "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page."
guide visible: false | fields div visible: false | visible inputs: 0 | visible labels: 0 | noscript sentence visible: false
```

The last `false` is Playwright's text locator not matching inside `<noscript>`; the visible-text line and the screenshot `js-off.png` both show the sentence.

`node a3.js` (complete except the 2 sample mismatches, shortened):

```
bills 0.01-50.00, tip 0, 1 person: cases 5000, mismatches 0
bills 0.01-50.00, tip 15, 1 person: cases 5000, mismatches 0
bills 0.01-50.00, tip 18, 1 person: cases 5000, mismatches 0
bills 0.01-50.00, tip 20, 1 person: cases 5000, mismatches 0
bills 0.01-5.00, tip 18, people 1,2,3,4: cases 2000, mismatches 0
bills 0.01-5.00, tip 18, people 5,6,7,8: cases 2000, mismatches 0
bills 0.01-5.00, tip 18, people 9,10,11,12: cases 2000, mismatches 0
spot cases: cases 3, mismatches 0
EXTRA (not named in C3): bills 0.1-50.0 typed with 1 decimal place, tip 18, 1 person: cases 500, mismatches 450
   typed ["0.1","18","1"] page ["Bill total: 0.01",…,"Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01"] auditor ["Bill total: 0.10",…,"Tip amount: 0.02","Total with tip: 0.12","1 person pays 0.12"]
   typed ["0.2","18","1"] page ["Bill total: 0.02",…] auditor ["Bill total: 0.20",…]
spot 10.00 0 3 => ["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."]
spot 1000000.00 100 100 => ["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"]
spot 0.01 0 100 => ["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."]
C3 cases compared (without EXTRA): 26003 | seconds: 88
```

Each case compared all of the page's result lines with lines built by my own code (BigInt, tip in 1/200 of a cent), and checked on the page's own text that the payments sum to the total, differ by at most 0.01 and list the larger first. The 50 EXTRA cases that matched are the bills ending in `.0`.

`node a4.js` (real window switch; complete). The first run of this script was void: it failed to find the second window and sent a key to the page instead; I fixed the script and ran it again. This is the second run:

```
chrome window 0x02800002 | other window 0x03600024 | windows: … Split the bill - Google Chrome for Testing ;; … auditwin
page: file:///home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html | Chrome Chrome/156.0.8078.47
T4 step 0, page open: {"windowHasFocus":true,"active":"BODY","billValue":"","billMsg":"","tipMsg":"","result":"","events":"window:focus"}
T4 step 1, empty bill field clicked, nothing typed: {"windowHasFocus":true,"active":"bill","billValue":"","billMsg":"","tipMsg":"","result":"","events":"bill:focus"}
T4 step 2, another window brought to the front: {"windowHasFocus":false,"active":"bill","billValue":"","billMsg":"","tipMsg":"","result":"","events":"bill:blur,window:blur"} | active X window: auditwin
T4 step 3, Chrome brought back: {"windowHasFocus":true,"active":"bill","billValue":"","billMsg":"","tipMsg":"","result":"","events":"window:focus,bill:focus"}
T4 step 4, then Tab (the person leaves the field): {"windowHasFocus":true,"active":"tip","billValue":"","billMsg":"Type the bill total.","tipMsg":"","result":"","events":"bill:blur,tip:focus"}
T3 real keys, step 1, bill 12. typed, field focused: {"windowHasFocus":true,"active":"bill","billValue":"12.","billMsg":"","tipMsg":"","result":"","events":"…,bill:focus,bill:input,bill:input,bill:input"}
T3 step 2, another window in front: {"windowHasFocus":false,"active":"bill","billValue":"12.","billMsg":"","tipMsg":"","result":"","events":"bill:blur,window:blur"}
T3 step 3, Chrome back: {"windowHasFocus":true,"active":"bill","billValue":"12.","billMsg":"","tipMsg":"","result":"","events":"window:focus,bill:focus"}
T3 step 4, Tab pressed: {"windowHasFocus":true,"active":"tip","billValue":"12.","billMsg":"Type the amount in digits only, such as 12.50 or 12,50. Leave out currency signs and thousands separators.","tipMsg":"","result":"","events":"bill:blur,tip:focus"}
T3 step 5, bill field clicked again: {"windowHasFocus":true,"active":"bill","billValue":"12.","billMsg":"","tipMsg":"","result":"","events":"tip:blur,bill:focus"}
T3 step 6, 5 typed (bill 12.5): {"windowHasFocus":true,"active":"bill","billValue":"12.5","billMsg":"","tipMsg":"","result":"Bill total: 12.05Tip percent: 18Number of people: 4Tip amount: 2.17Total with tip: 14.222 people pay 3.56 each2 people pay 3.55 eachYour group decides who pays the higher amount.","events":"bill:input"}
extra: bill abc typed, another window in front: {"windowHasFocus":false,"active":"bill","billValue":"abc","billMsg":"Type the amount in digits only, …","tipMsg":"","result":"","events":"…,bill:blur,window:blur"}
```

`node a5.js` (complete):

```
== visible format characters at an end (tip 18, people 4) ==
bill "\u{600}12.50" => msgs[---] result "Bill total: 12.50"
bill "12.50\u{6DD}" => msgs[---] result "Bill total: 12.50"
bill "\u{70F}12.50" => msgs[---] result "Bill total: 12.50"
bill "\u{8E2}12.50" => msgs[---] result "Bill total: 12.50"
bill "\u{1680}12.50" => msgs[---] result "Bill total: 12.50"
bill "12.50\u{301}" => msgs[Y--] result none
bill "12.50\u{20E3}" => msgs[Y--] result none
== invisible characters inside the number ==
bill "12\u{200B}.50" => msgs[Y--] result none | "Type the amount in digits only, such as 12.5"
bill "1\u{AD}2.50" => msgs[Y--] result none | "Type the amount in digits only, such as 12.5"
bill "12.\u{200E}50" => msgs[Y--] result none | "Type the amount in digits only, such as 12.5"
bill "1 2.50" => msgs[Y--] result none | "Type the amount in digits only, such as 12.5"
bill "12.5\u{FE0F}0" => msgs[Y--] result none | "Type the amount in digits only, such as 12.5"
== maxlength 64 ==
pasted into bill "<60 spaces>1234.56" (67 chars) | field holds 64 chars ending "    1234" | msgs "" | result ["Bill total: 1234.00","Tip percent: 18"]
pasted into bill "<60 zeros>1234.56" (67 chars) | field holds 64 chars ending "00001234" | msgs "" | result ["Bill total: 1234.00","Tip percent: 18"]
pasted into bill "<57 spaces>12.50<10 spaces>" (72 chars) | field holds 64 chars ending " 12.50  " | msgs "" | result ["Bill total: 12.50","Tip percent: 18"]
pasted into tip "<62 spaces>15" (64 chars) | field holds 64 chars ending "      15" | msgs "" | result []
typed key by key: 60 spaces + 1234.56 | field holds 64 chars ending "    1234" | msgs "" | result ["Bill total: 1234.00"]
== simulation: an engine that rejects the script (copy outside the repository, 1 property name changed) ==
page errors: [ 'SyntaxError: Invalid regular expression: /[\\s\\p{Cf}\\p{No_Such_Property}\\u2800]/u: Invalid ' ] | visible text: "Split the bill" | visible inputs: 0
```

(The 4th paste line shows no result only because that sub-test left the bill empty; it is not a finding.)

`node a6.js` (complete):

```
bill "   " => msg "Type the bill total." | result lines 0
bill "\u{200B}\u{A0}\u{FEFF}" => msg "Type the bill total." | result lines 0
tip "   " => msg "Type the tip percent. Type 0 for no tip." | result lines 0
tip "\u{200B}\u{A0}\u{FEFF}" => msg "Type the tip percent. Type 0 for no tip." | result lines 0
people "   " => msg "Type the number of people." | result lines 0
people "\u{200B}\u{A0}\u{FEFF}" => msg "Type the number of people." | result lines 0
bill "12345678.00" => msg "Type 1000000.00 or less." | result lines 0
bill "10000000" => msg "Type 1000000.00 or less." | result lines 0
bill "1000000.01" => msg "Type 1000000.00 or less." | result lines 0
bill "0" => msg "Type an amount above 0." | result lines 0
bill "0.0" => msg "Type an amount above 0." | result lines 0
bill "00.00" => msg "Type an amount above 0." | result lines 0
markup of a 2-line result: <div class="box"><p>Bill total: 10.00</p><p>Tip percent: 0</p><p>Number of people: 3</p><p class="gap-above">Tip amount: 0.00</p><p>Total with tip: 10.00</p><p class="pay gap-above">1 person pays 3.34</p><p class="pay">2 people pay 3.33 each</p><p>Your group decides who pays the higher amount.</p></div>
markup of a 1-line result: <div class="box"><p>Bill total: 10.00</p><p>Tip percent: 0</p><p>Number of people: 2</p><p class="gap-above">Tip amount: 0.00</p><p>Total with tip: 10.00</p><p class="pay gap-above">2 people pay 5.00 each</p></div>
markup after an error: "" | aria-invalid on people: true
aria-invalid on people after a valid value: null
```

5. Screenshots I opened and looked at: `w360-2-errors.png`, `w360-3-result.png`, `w360-4-long.png`, `w768-3-result.png`, `w1280-2-errors.png`, `js-off.png`, `x-600.png`, `x-6dd.png`, `x-1680.png`. In the first 5, every label, field, message and result line sits inside the window and long lines wrap. `js-off.png` shows the title and the JavaScript sentence only. The other 9 width screenshots were taken and measured by script but I did not look at them.

### Result for each CRITERION

| ID | Result | Basis |
|---|---|---|
| C1 | Passes on the review copy | 1 request per load in 147 loads; C2's first test passes. I did not run `example/index.html` itself. |
| C2 | FAILS | 4 of the 5 named tests pass; `0100.5`, `007`, `02` shows 100.05, 7 and 2 (finding 1). Order, wording, 1-line and 2-line forms, the sentence and half-cent rounding are right. |
| C3 | Passes its named test | 26,003 cases, 0 mismatches. The named test types 2 decimal places in every case, so it cannot see finding 1. |
| C4 | FAILS | 4 states, focus rule for `12.`, and all 71 listed error inputs behave as written. Fails on a bill with 1 digit after the mark (finding 1) and on visible signs ignored at the ends (finding 2). |
| C5 | Passes; real phone and screen reader UNVERIFIED | Widths, labels, roles, inputmode, 0 changes. |
| C6 | Passes | JavaScript off: title and the sentence; no guidance, no field. |
| C7 | Passes in Chrome; Firefox UNVERIFIED | fetch blocked by `connect-src`; exact tag present once; 5 words absent; reload and Back clear the fields. |
| C8 | UNVERIFIED | The scope names no delivery report and limits me to the files it names. |

### The 10 triggers

1. DOES NOT REPRODUCE. `5` U+00B2, U+2460 U+2461 and `12` U+2024 `50` each showed the "digits only" message under the bill and no result; people U+2463 showed "Type a whole number from 1 to 100, in digits only." and no result.
2. DOES NOT REPRODUCE. All 7 showed no message and a result with "Bill total: 12.50" and "3 people pay 3.69 each".
3. DOES NOT REPRODUCE. After Tab the message showed; on return to the bill field (Shift+Tab, and a click in the real-window run) the message was gone and no result showed.
4. DOES NOT REPRODUCE. With a real second window in front (`document.hasFocus()` false, blur fired), no message showed; none showed when Chrome came back; Tab then showed "Type the bill total."
5. DOES NOT REPRODUCE. The event took 3.2 ms and showed the whole-number message. 1,000,000 characters took 31.5 ms.
6. DOES NOT REPRODUCE. Only the title and "This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page." showed; 0 visible fields.
7. DOES NOT REPRODUCE. The last line read "Your group decides who pays the higher amount."
8. DOES NOT REPRODUCE. 0 changes in the bill's message, and 0 in the other 2 messages and the result, while I typed `18`.
9. DOES NOT REPRODUCE. `12,50` showed no message and the same 8 lines as `12.50`.
10. DOES NOT REPRODUCE as "all". Of the 9 names, only `splitBill` is a property of `window`; `FRAMEWORK.md` part 4 says that is intended. (`window.fields` is `true` only because Chrome exposes the element with `id="fields"`; it is not the script's variable.)

### Each function and branch of the script

Line numbers are those of the review copy. "OK" means it does what the CRITERIA require.

- L53–55 constants: bill 1000000.00, tip 100, people 100 accepted; 1000000.01, 101, 101 refused. OK.
- `splitBill` L59 tip: 0.30 at 15 gave 0.05; 10.10 at 15 gave 1.52; 12.25 at 18 gave 2.21; 60,600,000 console calls matched my formula. OK.
- `splitBill` L64 `if (payOneMore > 0)`: true for 10.00, 0, 3 (larger line first); false for 100.00, 18, 4 (1 line). L65 always adds the base group. OK.
- L69 `window.splitBill`: present; returns the contract's shape. OK (FRAMEWORK part 4).
- `plainChar` L75 full-width digits, L76 Arabic-Indic, L77 Extended Arabic-Indic: each typed as 12.50, 18 and 4 and read as the plain number. OK. (C4 does not name Extended Arabic-Indic; FRAMEWORK part 4 does.)
- `plainChar` L78 U+FF0E, L79 U+FF0C and U+066B: read as dot and comma. L80 any other character unchanged: U+2460, U+00B2, U+2024 got a message. OK.
- `plain` L91 and L92 loops: spaces, TAB, U+00A0, U+200B, U+FEFF, U+200E/F, U+061C, U+00AD, U+2066/9, U+202A/C, U+180E removed at the ends; loop exit on an all-ignored value gave the "empty" message; the same characters inside the number got a message. OK for invisible characters; NOT OK for visible Cf signs (finding 2).
- `readAmount` L100 empty: "Type the bill total." OK.
- L101 pattern: accepted and refused forms as listed under `a1.js`. OK.
- L102 waiting: `12.` and `12,` with focus gave no message and no result; without focus fell to L103. OK.
- L103 format error: 33 inputs got the message. OK.
- L104 leading zeros: `007` gave 7.00; 56 zeros + 12.50 gave 12.50. OK.
- L106 length guard: `99999999`, `10000000`, `12345678.00` gave "Type 1000000.00 or less." OK.
- L107 cents: NOT OK. `m[2]` of 1 digit is read as hundredths: `12.5` gave 12.05 (finding 1). 2 digits and no digits are right.
- L108 zero: `0`, `0.00`, `0,0`, `000` gave "Type an amount above 0." OK.
- L109 above the maximum: `1000000.01`, `1000001` gave the "or less" message. L110 return: OK.
- `readWhole` L117 empty; L118 non-digits (15 inputs each for tip and people); L119 leading zeros (`007`, `02`, `00`); L120 length (`1000`); L122 below minimum (people `0`, `00`) and above maximum (`101`); L123 return (`0`, `100`, `1`, `100`). All OK.
- `money` L127–128: `rest < 10` true (0.05, 100.05) and false (3.34, 29.50); whole part 0 (0.05) and 2000000 (2000000.00). OK.
- `payLine` L132: count 1 gave "1 person pays 3.34"; other counts gave "2 people pay 3.33 each". OK.
- `fields.*.read` L138–140: the bill passes the focus state; tip range 0 to 100, people 1 to 100; the 3 empty-field messages differ and name what to type. OK.
- `showResult` L148 same text, early return: 0 changes in cases a to d. L151 empty list: result emptied on any error. L157 class: `gap-above` and `pay` set as in the markup above. OK.
- `update` L170–173: message only when the field is touched; text written only when it differs (0 changes); `aria-invalid` set and removed. OK.
- `update` L174, L176: an error or a waiting bill gives no result. OK.
- `update` L178–186: 5 lines in the order C2 gives, then the payments, then the sentence only under 2 lines. OK.
- Listeners L195 `input` (marks touched), L196 `focus` (clears the `12.` message on return), L198–202 `blur` (early return when the field keeps focus on a window switch; otherwise marks touched). OK.
- `pageshow` L206–212: reload and Back gave 3 empty fields, no message, no result. OK.
- L214–215: guidance and fields show only when the script runs; with JavaScript off neither shows. OK. See finding 4 for a script that fails to parse.

## Findings

### 1

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION).
- **Where:** `skills/hinshitsu/example/run/review/index.html`, line 107: `var cents = parseInt(whole, 10) * 100 + parseInt(m[2] || "0", 10);`
- **Trigger:** Open the page. Type `0100.5` as the bill, `007` as the tip, `02` as the people. The result shows "Bill total: 100.05", "Tip amount: 7.00", "Total with tip: 107.05", "1 person pays 53.53", "1 person pays 53.52". C2 requires 100.50. Also: `12.5` and `12,5` show 12.05; `0.5` shows 0.05; `0.1` shows 0.01. With tip 18 and 1 person, 450 of the 500 bills from `0.1` to `50.0` typed with 1 decimal place gave a wrong bill, tip, total and payment. No message shows.
- **Violates:** C2 (its 5th named test, and "the bill total with 2 decimal places"); C4 ("an optional decimal mark followed by 1 or 2 digits"); FRAMEWORK part 4, "Text to cents".
- **Proposed fix:** Read 1 digit as tenths: `parseInt(((m[2] || "") + "00").slice(0, 2), 10)`. `skills/hinshitsu/example/index.html` at this commit already holds that line and differs from the review copy in this line only. Add bills typed with 1 decimal place to the test of C3, which now types 2 decimal places in every case.

### 2

- **Class:** BLOCKER, by the glossary's part (a), if C4's "a value that fails the formats below shows a message" covers a visible sign; the practical harm is small, because the amount used equals the digits shown.
- **Where:** `review/index.html`, line 84 (`\p{Cf}` and `\s` in `IGNORED_AT_ENDS`) and lines 91–92.
- **Trigger:** Tip `18`, people `4`. Type U+0600 then `12.50` as the bill: Chrome draws a mark before the number, and the page shows "Bill total: 12.50" and no message. The same with `12.50` then U+06DD (drawn as a box-shaped sign), U+070F then `12.50`, U+08E2 then `12.50`. Type U+1680 then `12.50`: Chrome draws a dash, so the field reads "–12.50", and the page shows a result for 12.50.
- **Violates:** C4: only "spaces and invisible characters" at the ends are ignored, and "a negative … bill" gets a message. U+0600 to U+0605, U+06DD, U+070F, U+0890, U+0891, U+08E2, U+110BD and U+110CD are format characters that are visible (I typed 4 of them: U+0600, U+06DD, U+070F, U+08E2). U+1680 is a space in Unicode, so C4's words allow it, but on screen it is a minus sign.
- **Proposed fix:** Take those 13 code points and U+1680 out of the ignored set, for example `function ignored(c) { return IGNORED_AT_ENDS.test(c) && !/[\u0600-\u0605\u06DD\u070F\u0890\u0891\u08E2\u1680\u{110BD}\u{110CD}]/u.test(c); }`, and state the exception in FRAMEWORK part 4.

### 3

- **Class:** DEFECT (a wrong result with no message).
- **Where:** `review/index.html`, lines 33, 38 and 43: `maxlength="64"`.
- **Trigger:** Tip `18`, people `1`. Paste 60 spaces followed by `1234.56` into the bill field (or type it). Chrome keeps 64 characters, so the field ends in `1234`; the page shows "Bill total: 1234.00" and no message. The same with 60 zeros followed by `1234.56`.
- **Violates:** C2 (the result does not show the bill given) and C4 (spaces at either end are ignored; here they change the amount).
- **Proposed fix:** Remove `maxlength`. The reason for a limit is gone: 1 `input` event on 1,000,000 characters took 31.5 ms. If a limit must stay, keep the whole text and show a message when it is longer than the limit, instead of letting the browser cut it.

### 4

- **Class:** FRAGILITY (another browser).
- **Where:** `review/index.html`, line 84 (`\p{…}` with the `u` flag), with lines 28–30 and 214–215.
- **Trigger:** A browser whose engine does not know `\p{Default_Ignorable_Code_Point}` or `\p{Cf}` (from memory, unchecked: Chrome before 64, Firefox before 78, Safari before 11.1; I did not run them) refuses the whole script. I simulated that in Chrome 156 with a copy outside the repository in which that 1 property name is unknown: the page showed the title "Split the bill" and nothing else — no fields, no guidance and no sentence, because `<noscript>` does not show when JavaScript is on.
- **Violates:** No CRITERION in desktop Chrome today; it will fail C1's "its calculator works" and the purpose of C6 on such a browser.
- **Proposed fix:** Put the sentence in a normal paragraph that shows by default and let the last lines of the script hide it (`id="needs-js"`, then `document.getElementById("needs-js").hidden = true;` beside lines 214–215), or build the regular expression with `new RegExp(…)` inside `try` and fall back to `/[\s\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u2800]/`.

### 5

- **Class:** STYLE.
- **Where:** `review/index.html`, line 103.
- **Trigger:** Type `12.345`, `.5` or (then Tab) `10.` as the bill. Each shows "Type the amount in digits only, such as 12.50 or 12,50. Leave out currency signs and thousands separators." The person typed digits only and no sign or separator; the message does not say "at most 2 digits after the decimal mark" or "a digit before the decimal mark".
- **Violates:** Nothing outright; it bears on C4's "the message names what to type", which the example `12.50` meets.
- **Proposed fix:** Add 1 sentence to the message: "Use at most 2 digits after the decimal mark and at least 1 before it."

## Not examined

- C8: the delivery report. The scope names no such file and limits me to the files it names. UNVERIFIED.
- `skills/hinshitsu/example/index.html` as a running page. I hashed it and diffed it against the review copy; every browser test ran on the review copy, as the scope directs.
- A real phone, a touch keyboard (the effect of `inputmode`) and a screen reader: none on this machine. UNVERIFIED, as C5 says.
- Firefox, Safari, Edge, and Chrome on Windows or macOS: only Chrome for Testing 156 on Linux is here. UNVERIFIED. Finding 4's browser versions come from memory and its behavior from a simulation, not from those browsers.
- Typing through an input method editor (composition events), drag-and-drop of text, and browser autofill: not run.
- Widths other than 360, 768 and 1280, and browser zoom: not run. Of the 15 screenshots at the 3 widths I looked at 5; all 12 width states were measured by script.
- Every other file of the RUN FOLDER, including earlier audits and the round-3 seeder's files: outside this scope. I opened only `FRAMEWORK.md` lines 28 to 37.
- The values not typed: C4 was tested with 71 error inputs and 50 valid inputs, not with every Unicode character; the `splitBill` console sweep covered bills 0.01 to 30.00 and 999970.01 to 1000000.00, not every bill.
