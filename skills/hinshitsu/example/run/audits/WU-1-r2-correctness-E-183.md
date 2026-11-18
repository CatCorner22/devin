devin-18556593d164493783772bcf4f7d9891

# Correctness audit — `skills/hinshitsu/example/run/review/index.html`

5 findings: 4 BLOCKER, 1 DEFECT. C8 is UNVERIFIED.

## Scope received

> You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: round 2 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.
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
> - DELIVERABLE and files to examine: `skills/hinshitsu/example/run/review/index.html`, all lines (the copy under review), SHA-256 dc993923bda99787251fe78c9ba3a07eab64e987506cb7eb36700b26c75dad55
> - Commit under review: the commit named in the first paragraph
> - CRITERIA, word for word from entry E-175:
>
> - C1. `skills/hinshitsu/example/index.html` is 1 file that loads no other file, and its calculator works when the file is opened from disk in desktop Chrome. Test: open the file by its `file://` path; the browser's request log shows 1 request; C2's first test passes. Covers G8, G11.
> - C2. Given a bill from 0.01 to 1000000.00, a tip that is a whole number from 0 to 100 percent, and a number of people that is a whole number from 1 to 100, the result shows, in this order: the bill total with 2 decimal places, the tip percent and the number of people, each as a number without leading zeros; the tip amount; the total with tip; and the payments, as 1 line ("4 people pay 29.50 each") or as 2 lines with the larger payment first ("1 person pays 3.34" and "2 people pay 3.33 each"). Under 2 lines, 1 sentence follows: "Your group decides who pays the higher amount." The result shows no other text. Half a cent of tip rounds up. Tests, typed into the page: 100.00, 18, 4 gives tip amount 18.00, total with tip 118.00, "4 people pay 29.50 each"; 0.30, 15, 1 gives tip amount 0.05; 10.10, 15, 1 gives tip amount 1.52 and total with tip 11.62; 12.25, 18, 1 gives tip amount 2.21; 0100.5, 007, 02 shows 100.50, 7 and 2. Covers T1, G12.
> - C3. The payments sum to the total with tip, to the cent, and no 2 payments differ by more than 0.01. Test: an AUDITOR types values into the page's own fields in a browser driven by a script, reads the page's own output, and compares it with a tip amount, total and payments computed by the AUDITOR's own code: every bill from 0.01 to 50.00, in steps of 0.01, with tips 0, 15, 18 and 20 for 1 person; every bill from 0.01 to 5.00, in steps of 0.01, with 1 to 12 people at tip 18; and the spot cases, as typed, `10.00`, `0`, `3` (3.34 and 3.33); `1000000.00`, `100`, `100`; and `0.01`, `0`, `100`. Covers G3.
> - C4. The page has 4 states. First open: 3 empty fields, 1 sentence of guidance, no error text, no result. Incomplete: 1 or more fields are empty, the person has neither typed in nor left them, and no field shows a message; no result shows. Error: after a person types in a field or leaves it, a value that fails the formats below shows a message below that field, the message names what to type, and no result shows. Result: when all 3 fields are valid, the result shows and is recomputed on every change. The bill is digits, with an optional decimal mark followed by 1 or 2 digits; the decimal mark is a dot or a comma, so `12.50` and `12,50` are the same amount. A whole number is digits only. Spaces and invisible characters at either end are ignored; a full-width or Arabic-Indic digit or decimal mark counts as its plain form. While the bill field has the cursor, digits followed by a decimal mark and nothing else (`12.`) show no message and no result; the message shows when the person leaves the field. Each of these gets a message and no result: an empty field that the person has typed in or left; letters; a thousands separator (`1,000.00`, `1.000,00`); `1e3`; `10.` once the person has left the field; `.5`; a currency sign; a negative or 0 bill; a bill above 1000000.00; 3 or more decimal places; a tip that is not a whole number from 0 to 100; a number of people that is not a whole number from 1 to 100; `18.0`, `18,5`, `1e1`, `+4` or `4.` as tip or people. Test: each input, in the browser. Covers G1, G2, G13.
> - C5. At widths of 360, 768 and 1280 pixels no element is wider than the window and nothing scrolls sideways. Every field has a visible label; the bill's label reads "Bill total, tax included". Each error paragraph carries `role="alert"` and the result carries `role="status"`; the page does not write a message or a result again when its text has not changed. The bill field carries `inputmode="decimal"` and the other 2 fields `inputmode="numeric"`. Test: screenshots at the 3 widths; reading of the markup; a count of the changes inside the error paragraphs and the result while a person types in another field (0 changes). A real phone and a screen reader are not tested and are reported UNVERIFIED. Covers G4, G5.
> - C6. With JavaScript off, the page shows a sentence saying that the calculator needs JavaScript, and shows no guidance and no field. Test: load with JavaScript disabled. Covers G9.
> - C7. The page stores nothing and sends nothing. The file carries the tag `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`, and each field carries `autocomplete="off"`. Test: with the page open, `fetch('https://example.com')` run in the browser is blocked; the source holds none of `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie` and `caches`; a reload in Chrome clears every field. Firefox is not tested and is reported UNVERIFIED. Covers G6, G7.
> - C8. The delivery report opens with 3 checks. The USER can do all 3 within 5 minutes in total, in a browser, with no terminal: each check names what to open, what to do and what to see. The report states the SHA-256 of `index.html` at the last audit round. Test: an AUDITOR who did not build the page follows the 3 checks as written and records the time taken. Covers V1, V2.
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
> Confirm the SHA-256 before you start. Also report, for each function and each branch of the script, 1 line: what you tested and what appeared.

## Examined

### Result by CRITERION

| CRITERION | Result | Basis |
|---|---|---|
| C1 | PASS for the test the CRITERION names, run on the copy under review | 1 request in headless Chrome and in desktop Chrome; `100.00`, `18`, `4` gives the required result |
| C2 | FAIL | The 5 typed tests pass. A bill of `1000000.00` or `1000000` gets a message and no result (finding 1) |
| C3 | FAIL | 26,000 sweep cases match my own arithmetic with 0 mismatches. Spot case `1000000.00`, `100`, `100` shows no result (finding 1). The other 2 spot cases match |
| C4 | FAIL | Every input the CRITERION lists gets the required message or result. 3 behaviors fail the CRITERION's text (findings 2, 3, 4); finding 5 is a wrong message on an untouched field |
| C5 | PASS for what the test names | 15 width checks, 5 screenshots viewed, markup read, 0 changes counted. A real phone and a screen reader: UNVERIFIED, not available on this machine |
| C6 | PASS | JavaScript off: heading and the sentence; no guidance, no field, no label |
| C7 | PASS in Chrome | Tag present word for word, `fetch` blocked by the policy, 0 hits for the 5 storage words, reload clears every field. Firefox: UNVERIFIED, the scope excludes it and it is not installed |
| C8 | UNVERIFIED | The scope names no delivery report, and limits me to the files it names |

### Files

- `skills/hinshitsu/example/run/review/index.html`, lines 1-195 (all lines; 8,770 bytes). SHA-256 confirmed before any test and again after the last test: `dc993923bda99787251fe78c9ba3a07eab64e987506cb7eb36700b26c75dad55`.
- `skills/hinshitsu/GLOSSARY.md`, all lines (finding classes and states).
- `skills/hinshitsu/example/index.html` (C1 names it): SHA-256 and a `diff` against the copy under review only. It differs from the copy in 1 line, line 92.
- `skills/hinshitsu/example/run/FRAMEWORK.md` (line 67 of the DELIVERABLE references it): the lines that `grep -n -i splitBill` returned (17, 30, 31, 52) and the heading list. The comment on line 67 of the DELIVERABLE is true: part 4 names `window.splitBill`, with `billCents` from 1 to 100,000,000.
- Directory listings only (file names, no content) of `skills/hinshitsu/example/run/` and its sub-folders.

I changed, committed and pushed no file. `git status --short` in my clone printed 0 lines after the last test. My scripts and their output are in `~/audit/`, outside the clone.

### Pages opened

- `file:///home/ubuntu/audit/wt/skills/hinshitsu/example/run/review/index.html` in headless Chrome for Testing 156.0.8078.47, launched by Playwright 1.63.0 from the machine's `google-chrome` binary. Scripts `t1.js` to `t4.js` drove it: they clicked each field, typed with the keyboard (`t3.js` used Playwright `fill()`, which sets the field's value and fires the page's own `input` event), left fields with Tab or a click on the heading, and read the page's own text.
- The same `file://` path in the desktop Chrome 156.0.8078.47 on display `:0`, over its debugging port (`t5.js`, `t6.js`): request log, the first C2 test, a reload, and a real window switch made with `xdotool windowactivate`.
- The same path with JavaScript disabled (Playwright context `javaScriptEnabled: false`).
- Screenshots taken at 360, 768 and 1280 pixels in 5 states each (15 files). I viewed `w360-errors.png`, `w360-result.png`, `w768-result.png`, `w1280-long.png` and `nojs.png`: no clipped or overflowing element in any of them.

### Each function and each branch of the script

| Line | Function or branch | What I tested | What appeared | Meets the CRITERIA |
|---|---|---|---|---|
| 52-54 | 3 limits | Read | 100000000 cents, 100, 100 | Yes |
| 58 | `splitBill`: tip, half a cent rounds up | Typed `0.30`,`15`,`1`; `10.10`,`15`,`1`; `12.25`,`18`,`1`; `0.04`,`10`,`1`; 26,000 sweep cases | 0.05; 1.52; 2.21; 0.00; 0 mismatches | Yes |
| 59-61 | total, base payment, remainder | Sweep 2 (1 to 12 people) | 0 sum failures, 0 spread failures | Yes |
| 63 | `if (payOneMore > 0)` true | Typed `10.00`,`0`,`3` | "1 person pays 3.34" then "2 people pay 3.33 each" | Yes |
| 63 | `if (payOneMore > 0)` false | Typed `100.00`,`18`,`4` | 1 line, "4 people pay 29.50 each" | Yes |
| 64-65 | lower share, return | Typed `0.01`,`0`,`100` | "1 person pays 0.01", "99 people pay 0.00 each" | Yes |
| 68 | `window.splitBill` | Compared in the page | `window.splitBill === splitBill` is true | Yes (FRAMEWORK.md part 4) |
| 72 | `plain`: NFKC | Full-width `１２．５０`, `１２，５０`; also `①`, `1²`, `⒈⑤`, `㊿`, `𝟏𝟐`, `12․50` | Full-width read as 12.50. The other 6 also accepted as 1.00, 12.00, 1.50, 50.00, 12.00, 12.50 | No: finding 3 |
| 73 | Arabic-Indic digits | `١٢٫٥٠`, `١٨`, `٤` | 12.50, 18, 4 | Yes |
| 74 | Extended Arabic-Indic digits | `۱۲.۵۰`, `۱۸`, `۴` | 12.50, 18, 4 | Yes |
| 75 | U+066B to comma | `١٢٫٥٠` | 12.50 | Yes |
| 76 | trim both ends | Spaces, tab, U+00A0, U+3000, U+2003, U+200B, U+200D, U+2060, U+FEFF; then U+200E, U+200F, U+061C, U+202A/202C, U+2066/2069, U+00AD, U+2063, U+180E, U+FE0F | First group ignored. Second group: message, no result | No: finding 2 |
| 83 | `readAmount`: empty | Typed `1`, Backspace in the bill | "Enter the bill total." | Yes |
| 84 | format match | `7`, `7.5`, `12,50`, `100.00` | 7.00, 7.50, 12.50, 100.00 | Yes |
| 85 | waiting, `typing` true | `12.`, `0.`, `１２．` with the cursor in the bill | No message, no result | Yes |
| 85 | waiting, `typing` false | `10.` and `10,`, then Tab | Message, no result | Yes |
| 85 | cursor returns to a bill that holds `12.` | Tab away, Shift+Tab back | Message stays while the bill has the cursor | No: finding 4 |
| 86 | no match | 29 inputs: `abc`, `1,000.00`, `1.000,00`, `1e3`, `.5`, `$12`, `-5`, `1.234`, `+5`, and others | Message "Enter an amount above 0, in digits. …", no result, each one | Yes |
| 87 | leading zeros | `0100.5`; `00` | 100.50; "Enter an amount above 0." | Yes |
| 89 | whole part longer than 7 digits | `10000000`, 23 digits, 300 digits | "Enter 1000000.00 or less." | Yes |
| 90 | cents from 0, 1 or 2 decimals | `7`, `7.5`, `7,05` (called), `0100.5` (typed) | 700, 750, 705, 10050 | Yes |
| 91 | `cents === 0` | `0`, `0.0`, `0.00`, `00` | "Enter an amount above 0." | Yes |
| 92 | `cents >= MAX_BILL_CENTS` | `1000000.00`, `1000000`, `1000000.01`, `1000001`, `999999.99` | First 2: "Enter 1000000.00 or less.", no result. Next 2: same message. Last: result | No: finding 1 |
| 93 | return cents | Sweeps | 0 mismatches | Yes |
| 100 | `readWhole`: empty | Typed and cleared the tip, the people | "Enter the tip percent. Enter 0 for no tip."; "Enter the number of people." | Yes |
| 101 | not digits only | `abc`, `18.0`, `18,5`, `1e1`, `+4`, `4.`, `-1`, `18%`, `1 8` in tip and people | Message, no result, each one | Yes |
| 102 | leading zeros | `007`, `02` | 7, 2 | Yes |
| 103 | too many digits | `1000`, 20 digits | Message, no result | Yes |
| 105 | below min, above max | People `0`, `00`, `101`; tip `101`, `00101` | Message, no result | Yes |
| 106 | return value | Tip `0` and `100`; people `1` and `100` | Result shows | Yes |
| 110-111 | `money`: `rest < 10` true and false | Called with 0, 5, 10, 99, 100, 123456, 200000000 | 0.00, 0.05, 0.10, 0.99, 1.00, 1234.56, 2000000.00 | Yes |
| 115-117 | `payLine`: count 1; count above 1 | `10.00`,`0`,`3`; `10.01`,`0`,`3` | "1 person pays 3.34" / "2 people pay 3.33 each"; "2 people pay 3.34 each" / "1 person pays 3.33" | Yes |
| 121 | bill reader passes "has the cursor" | Tab; real window switch | After Tab: not typing, message. After window switch: cursor stays, `12.` shows no message | Yes |
| 122-123 | tip and people readers | The C4 inputs | Ranges 0 to 100 and 1 to 100 in the messages | Yes |
| 131 | `showResult`: same text, return | Changed people `4` to `04` and bill `100.00` to `100.0` under a MutationObserver | 0 changes | Yes |
| 133-134 | clear; empty list, return | Typed `x` in the tip under a result | Result removed, 1 change | Yes |
| 137-143 | build lines; `if (line.className)` | Read the result | 6 or 8 paragraphs in the required order, no other text | Yes |
| 153-155 | error shown only if touched; write only if changed | First open; typed in other fields under a MutationObserver | No message on untouched fields; 0 changes in the other error paragraphs | Yes |
| 156 | `aria-invalid` set and removed | `abc` then `20` | Set, then removed | Yes |
| 157, 159 | any error or waiting: no result | Every C4 input | No result, each one | Yes |
| 160-168 | compute and list | C2 tests | Required text | Yes |
| 169 | `shares.length === 2` true and false | `10.00`,`0`,`3`; `100.00`,`18`,`4` | Sentence present; sentence absent | Yes |
| 178 | `input` listener | Typed key by key in the people field | Result recomputed on each key | Yes |
| 179 | `blur` listener | Tab out of each empty field; real window switch with the cursor in the empty bill | Tab: message, as required. Window switch: "Enter the bill total." although the cursor is still in the field | Tab: yes. Window switch: finding 5 |
| 183-189 | `pageshow` | Reload from a result, reload from 2 errors, back button, desktop reload | 3 empty fields, no message, no result, each time | Yes |
| 191-192 | unhide | First open; JavaScript off | Guidance and fields shown; with JavaScript off, neither | Yes |

One observation that is not a finding, because C4 requires it: typing `0.05` key by key shows "Enter an amount above 0." at `0`, hides it at `0.`, shows it again at `0.0`, and shows the result at `0.05`.

### Commands and complete output

All commands ran in `~/audit/wt`, my clone of the branch, unless a line says otherwise.

```
$ git ls-remote origin devin/hinshitsu-build   # in ~/repos/devin, the machine's checkout of github.com/CatCorner22/devin
1b6cf7695510718d4b21836b0756749400da0c54	refs/heads/devin/hinshitsu-build
```

```
$ git clone -q --branch devin/hinshitsu-build ~/repos/devin ~/audit/wt && cd ~/audit/wt && git log --format='%H %ci %s' | grep -n 'example run: round 2 swarm scopes'
1:1b6cf7695510718d4b21836b0756749400da0c54 2026-11-18 17:13:31 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in
2:d3fecb7bb267d611c64368b1c9b91402f5544c6e 2026-11-18 17:13:24 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger filled in
3:9783ee2a7133facb2130f65a7f5e57c134df9f7d 2026-11-18 17:13:16 +0000 example run: round 2 swarm scopes; the copy under review
```

```
$ git checkout -q 1b6cf7695510718d4b21836b0756749400da0c54 && git rev-parse HEAD && sha256sum skills/hinshitsu/example/run/review/index.html && wc -lc skills/hinshitsu/example/run/review/index.html
1b6cf7695510718d4b21836b0756749400da0c54
dc993923bda99787251fe78c9ba3a07eab64e987506cb7eb36700b26c75dad55  skills/hinshitsu/example/run/review/index.html
 195 8770 skills/hinshitsu/example/run/review/index.html
```

```
$ sha256sum skills/hinshitsu/example/index.html; diff skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html
e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0  skills/hinshitsu/example/index.html
92c92
<   if (cents > MAX_BILL_CENTS) { return { error: tooMuch }; }
---
>   if (cents >= MAX_BILL_CENTS) { return { error: tooMuch }; }
```

```
$ grep -c -F "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'\">" skills/hinshitsu/example/run/review/index.html; for w in localStorage sessionStorage indexedDB document.cookie caches; do echo "$w: $(grep -c -F "$w" skills/hinshitsu/example/run/review/index.html)"; done; grep -n -i -E 'src=|href=|url\(|@import|<link|<img|<iframe|fetch|XMLHttp|sendBeacon|WebSocket|import\(' skills/hinshitsu/example/run/review/index.html; echo "grep exit $?"
1
localStorage: 0
sessionStorage: 0
indexedDB: 0
document.cookie: 0
caches: 0
grep exit 1
```

```
$ grep -n -i 'splitBill' skills/hinshitsu/example/run/FRAMEWORK.md | cut -c1-200
17:| D-5 | 1 pure function `window.splitBill`; half a cent of tip rounds up; text converted to cents from its digits | E-36 | in force |
30:- **`window.splitBill(billCents, tipPercent, people)`** — pure; reachable from the browser console. Inputs: `billCents` a whole number from 1 to 100,000,000; `tipPercent` a whole number from 0 to
31:- **The page's fields call `splitBill` and no other code computes the tip amount, the total with tip or a payment.** `readAmount` turns the bill's text into cents and `money` writes cents as text.
52:Build order inside WU-1: (1) `splitBill` and the text-to-cents step; (2) form, the 3 states and validation; (3) layout at the 3 widths; (4) the no-JavaScript sentence and the policy tag.
```

```
$ google-chrome --version
Google Chrome for Testing 156.0.8078.47 
```

C1, first open, C2 tests, C4 inputs, probes of `plain`. The script groups the 72 invalid C4 inputs by field and by the message that appeared.

```
$ cd ~/audit && node t1.js
browser version 156.0.8078.47
C1 playwright requests ["file:///home/ubuntu/audit/wt/skills/hinshitsu/example/run/review/index.html"]
C1 CDP requestWillBeSent ["file:///home/ubuntu/audit/wt/skills/hinshitsu/example/run/review/index.html"]
C1 console []
PASS C1 one request (playwright) :: 1
PASS C1 one request (CDP) :: 1
PASS C1 no resource timing entries :: []
first open {"result":[],"resultText":"","err":{"bill":"","tip":"","people":""},"val":{"bill":"","tip":"","people":""},"invalid":[],"active":"BODY"} "Split the bill\n\nType the bill total, the tip percent and the number of people.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"
PASS C4 first open: 3 empty fields, guidance, no error, no result
PASS C2/C3 typed ["100.00","18","4"] :: Bill total: 100.00 | Tip percent: 18 | Number of people: 4 | Tip amount: 18.00 | Total with tip: 118.00 | 4 people pay 29.50 each
PASS C2/C3 typed ["0.30","15","1"] :: Bill total: 0.30 | Tip percent: 15 | Number of people: 1 | Tip amount: 0.05 | Total with tip: 0.35 | 1 person pays 0.35
PASS C2/C3 typed ["10.10","15","1"] :: Bill total: 10.10 | Tip percent: 15 | Number of people: 1 | Tip amount: 1.52 | Total with tip: 11.62 | 1 person pays 11.62
PASS C2/C3 typed ["12.25","18","1"] :: Bill total: 12.25 | Tip percent: 18 | Number of people: 1 | Tip amount: 2.21 | Total with tip: 14.46 | 1 person pays 14.46
PASS C2/C3 typed ["0100.5","007","02"] :: Bill total: 100.50 | Tip percent: 7 | Number of people: 2 | Tip amount: 7.04 | Total with tip: 107.54 | 2 people pay 53.77 each
PASS C2/C3 typed ["10.00","0","3"] :: Bill total: 10.00 | Tip percent: 0 | Number of people: 3 | Tip amount: 0.00 | Total with tip: 10.00 | 1 person pays 3.34 | 2 people pay 3.33 each | Your group decides who pays the higher amount.
PASS C2/C3 typed ["10.01","0","3"] :: Bill total: 10.01 | Tip percent: 0 | Number of people: 3 | Tip amount: 0.00 | Total with tip: 10.01 | 2 people pay 3.34 each | 1 person pays 3.33 | Your group decides who pays the higher amount.
FAIL C2/C3 typed ["1000000.00","100","100"] :: {"got":[],"err":{"bill":"Enter 1000000.00 or less.","tip":"","people":""}}
FAIL C2/C3 typed ["1000000","0","1"] :: {"got":[],"err":{"bill":"Enter 1000000.00 or less.","tip":"","people":""}}
PASS C2/C3 typed ["999999.99","100","100"] :: Bill total: 999999.99 | Tip percent: 100 | Number of people: 100 | Tip amount: 999999.99 | Total with tip: 1999999.98 | 98 people pay 20000.00 each | 2 people pay 19999.99 each | Your group decides who pays the higher amount.
PASS C2/C3 typed ["0.01","0","100"] :: Bill total: 0.01 | Tip percent: 0 | Number of people: 100 | Tip amount: 0.00 | Total with tip: 0.01 | 1 person pays 0.01 | 99 people pay 0.00 each | Your group decides who pays the higher amount.
PASS C2/C3 typed ["12,50","20","2"] :: Bill total: 12.50 | Tip percent: 20 | Number of people: 2 | Tip amount: 2.50 | Total with tip: 15.00 | 2 people pay 7.50 each
PASS C2/C3 typed ["7","10","1"] :: Bill total: 7.00 | Tip percent: 10 | Number of people: 1 | Tip amount: 0.70 | Total with tip: 7.70 | 1 person pays 7.70
PASS C2/C3 typed ["0.05","10","1"] :: Bill total: 0.05 | Tip percent: 10 | Number of people: 1 | Tip amount: 0.01 | Total with tip: 0.06 | 1 person pays 0.06
PASS C2/C3 typed ["0.04","10","1"] :: Bill total: 0.04 | Tip percent: 10 | Number of people: 1 | Tip amount: 0.00 | Total with tip: 0.04 | 1 person pays 0.04
PASS C2/C3 typed ["  12.50  "," 18​","﻿4 "] :: Bill total: 12.50 | Tip percent: 18 | Number of people: 4 | Tip amount: 2.25 | Total with tip: 14.75 | 3 people pay 3.69 each | 1 person pays 3.68 | Your group decides who pays the higher amount.
PASS C2/C3 typed ["１２．５０","１８","４"] :: Bill total: 12.50 | Tip percent: 18 | Number of people: 4 | Tip amount: 2.25 | Total with tip: 14.75 | 3 people pay 3.69 each | 1 person pays 3.68 | Your group decides who pays the higher amount.
PASS C2/C3 typed ["１２，５０","18","4"] :: Bill total: 12.50 | Tip percent: 18 | Number of people: 4 | Tip amount: 2.25 | Total with tip: 14.75 | 3 people pay 3.69 each | 1 person pays 3.68 | Your group decides who pays the higher amount.
PASS C2/C3 typed ["١٢٫٥٠","١٨","٤"] :: Bill total: 12.50 | Tip percent: 18 | Number of people: 4 | Tip amount: 2.25 | Total with tip: 14.75 | 3 people pay 3.69 each | 1 person pays 3.68 | Your group decides who pays the higher amount.
PASS C2/C3 typed ["۱۲.۵۰","۱۸","۴"] :: Bill total: 12.50 | Tip percent: 18 | Number of people: 4 | Tip amount: 2.25 | Total with tip: 14.75 | 3 people pay 3.69 each | 1 person pays 3.68 | Your group decides who pays the higher amount.
recompute on each key in people: [["4","4",["4 people pay 29.50 each"],""],["0","40",["40 people pay 2.95 each"],""],["Backspace","4",["4 people pay 29.50 each"],""],["Backspace","",[],"Enter the number of people."],["3","3",["1 person pays 39.34","2 people pay 39.33 each","Your group decides who pays the higher amount."],""]]
C4 bill :: with the cursor in the field: "Enter the bill total." :: after leaving: "Enter the bill total." :: result: none :: 1 inputs: [""]
C4 bill :: with the cursor in the field: "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" :: after leaving: "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" :: result: none :: 29 inputs: ["abc","12a","1,000.00","1.000,00","1e3",".5",",5","$12","12$","€12.50","12.50 USD","-5","-0.01","1.234","1,234","0.001","1..2","1.2.3","1 000","+5","12.5.","1/2","0x10","Infinity","NaN","1_000","1'000","12 .50","12. 50"]
C4 bill :: with the cursor in the field: no message :: after leaving: "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" :: result: none :: 2 inputs: ["10.","10,"]
C4 bill :: with the cursor in the field: "Enter an amount above 0." :: after leaving: "Enter an amount above 0." :: result: none :: 4 inputs: ["0","0.0","0.00","00"]
C4 bill :: with the cursor in the field: "Enter 1000000.00 or less." :: after leaving: "Enter 1000000.00 or less." :: result: none :: 4 inputs: ["1000000.01","1000001","10000000","99999999999999999999999"]
C4 tip :: with the cursor in the field: "Enter the tip percent. Enter 0 for no tip." :: after leaving: "Enter the tip percent. Enter 0 for no tip." :: result: none :: 1 inputs: [""]
C4 tip :: with the cursor in the field: "Enter a whole number from 0 to 100, in digits only." :: after leaving: "Enter a whole number from 0 to 100, in digits only." :: result: none :: 15 inputs: ["abc","101","1000","-1","18.0","18,5","1e1","+4","4.","18%","1 8","0x1",".5","00101","99999999999999999999"]
C4 people :: with the cursor in the field: "Enter the number of people." :: after leaving: "Enter the number of people." :: result: none :: 1 inputs: [""]
C4 people :: with the cursor in the field: "Enter a whole number from 1 to 100, in digits only." :: after leaving: "Enter a whole number from 1 to 100, in digits only." :: result: none :: 15 inputs: ["abc","0","00","101","1000","-1","18.0","18,5","1e1","+4","4.","4,","2 people","1 0","99999999999999999999"]
PASS C4 invalid inputs: 72 typed, each got a message below its own field, no result, no message on another field :: 0 failures
PASS C4 bill focused only: no message; left empty with Tab: message :: Enter the bill total.
PASS C4 tip focused only: no message; left empty with Tab: message :: Enter the tip percent. Enter 0 for no tip.
PASS C4 people focused only: no message; left empty with Tab: message :: Enter the number of people.
PASS C4 incomplete: bill valid, others untouched: no message, no result :: {"err":{"bill":"","tip":"","people":""},"lines":0,"invalid":[],"active":"bill"}
typing 12.50 key by key [value, bill error, result lines]: [["1","",8],["12","",6],["12.","",0],["12.5","",8],["12.50","",8]]
PASS C4 "12." focused: no message, no result :: {"err":{"bill":"","tip":"","people":""},"lines":0,"invalid":[],"active":"bill"}
PASS C4 "12." after Tab away: message, no result :: {"err":{"bill":"Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50","tip":"","people":""},"lines":0,"invalid":["bill"],"active":"tip"}
"12." after clicking back into bill (cursor in bill, no key pressed): bill message "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50", invalid ["bill"], active bill
PASS C4 "12.5" after return: result :: {"err":{"bill":"","tip":"","people":""},"lines":8,"invalid":[],"active":"bill"}
PASS C4 full-width "12." focused: no message, no result :: {"err":{"bill":"","tip":"","people":""},"lines":0,"invalid":[],"active":"bill"}
"0." focused: bill message "", result lines 0
typing 0.05 key by key: [["0","Enter an amount above 0.",0],["0.","",0],["0.0","Enter an amount above 0.",0],["0.05","",8]]
PASS C4 error then valid: message cleared, result shows :: {"err":{"bill":"","tip":"","people":""},"lines":6,"invalid":[],"active":"bill"}
PASS C4 result then error: result cleared :: {"err":{"bill":"","tip":"Enter a whole number from 0 to 100, in digits only.","people":""},"lines":0,"invalid":["tip"],"active":"tip"}
PASS insertText (paste-like) 45,5 recomputes :: ["Bill total: 45.50","Tip percent: 15","Number of people: 4","Tip amount: 6.83","Total with tip: 52.33","1 person pays 13.09","3 people pay 13.08 each","Your group decides who pays the higher amount."]
PROBE bill [U+200E U+0031 U+0032 U+002E U+0035 U+0030] -> REJECTED with a message
PROBE bill [U+0031 U+0032 U+002E U+0035 U+0030 U+200F] -> REJECTED with a message
PROBE bill [U+202A U+0031 U+0032 U+002E U+0035 U+0030 U+202C] -> REJECTED with a message
PROBE bill [U+2066 U+0031 U+0032 U+002E U+0035 U+0030 U+2069] -> REJECTED with a message
PROBE bill [U+0031 U+0032 U+002E U+0035 U+0030 U+00AD] -> REJECTED with a message
PROBE bill [U+061C U+0031 U+0032 U+002E U+0035 U+0030] -> REJECTED with a message
PROBE bill [U+0031 U+0032 U+002E U+0035 U+0030 U+2063] -> REJECTED with a message
PROBE bill [U+180E U+0031 U+0032 U+002E U+0035 U+0030] -> REJECTED with a message
PROBE bill [U+FE0F U+0031 U+0032 U+002E U+0035 U+0030] -> REJECTED with a message
PROBE bill [U+200B U+0031 U+0032 U+002E U+0035 U+0030 U+200D] -> ACCEPTED, shows "Bill total: 12.50"
PROBE bill [U+2060 U+0031 U+0032 U+002E U+0035 U+0030 U+FEFF] -> ACCEPTED, shows "Bill total: 12.50"
PROBE bill [U+3000 U+0031 U+0032 U+002E U+0035 U+0030 U+2003] -> ACCEPTED, shows "Bill total: 12.50"
PROBE bill [U+0009 U+0031 U+0032 U+002E U+0035 U+0030 U+0009] -> ACCEPTED, shows "Bill total: 12.50"
PROBE tip [U+200E U+0031 U+0038] -> REJECTED with a message
PROBE people [U+0034 U+200F] -> REJECTED with a message
PROBE bill [U+2460] -> ACCEPTED, shows "Bill total: 1.00"
PROBE bill [U+0031 U+00B2] -> ACCEPTED, shows "Bill total: 12.00"
PROBE bill [U+2488 U+2464] -> ACCEPTED, shows "Bill total: 1.50"
PROBE bill [U+0031 U+0032 U+2024 U+0035 U+0030] -> ACCEPTED, shows "Bill total: 12.50"
PROBE bill [U+0031 U+0032 U+FE52 U+0035 U+0030] -> ACCEPTED, shows "Bill total: 12.50"
PROBE bill [U+1D7CF U+1D7D0] -> ACCEPTED, shows "Bill total: 12.00"
PROBE bill [U+32BF] -> ACCEPTED, shows "Bill total: 50.00"
PROBE bill [U+0967 U+0968] -> REJECTED with a message
PROBE tip [U+00B2] -> ACCEPTED, shows "Tip percent: 2"
PROBE tip [U+2473] -> ACCEPTED, shows "Tip percent: 20"
PROBE tip [U+2075] -> ACCEPTED, shows "Tip percent: 5"
PROBE people [U+2462] -> ACCEPTED, shows "Number of people: 3"
PROBE people [U+2082] -> ACCEPTED, shows "Number of people: 2"
PROBE people [U+0969] -> REJECTED with a message
PROBE tip [U+00BD] -> REJECTED with a message
PROBE tip [U+2167] -> REJECTED with a message
PROBE bill [U+0031 U+0032 U+066C U+0035 U+0030 U+0030] -> REJECTED with a message
PROBE bill [U+0661 U+0662 U+002E U+0665] -> ACCEPTED, shows "Bill total: 12.50"
PROBE bill [U+0031 U+06F2 U+002C U+0035] -> ACCEPTED, shows "Bill total: 12.50"
PROBE bill [U+0031 U+0032 U+3002 U+0035 U+0030] -> REJECTED with a message
PROBE bill [U+0031 U+0032 U+FF61 U+0035 U+0030] -> REJECTED with a message
FAILS 2
```

C5, C6, C7 and direct calls of the page's functions.

```
$ cd ~/audit && node t2.js
PASS C5 width 360 first open :: page width 360, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 360 3 errors :: page width 360, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 360 2-line result, largest values :: page width 360, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 360 1-line result :: page width 360, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 360 300-character values in each field :: page width 360, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 768 first open :: page width 768, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 768 3 errors :: page width 768, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 768 2-line result, largest values :: page width 768, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 768 1-line result :: page width 768, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 768 300-character values in each field :: page width 768, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 1280 first open :: page width 1280, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 1280 3 errors :: page width 1280, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 1280 2-line result, largest values :: page width 1280, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 1280 1-line result :: page width 1280, scrollX after scrolling right 0, elements past the window 0
PASS C5 width 1280 300-character values in each field :: page width 1280, scrollX after scrolling right 0, elements past the window 0
markup [{"id":"bill","label":"Bill total, tax included","labelVisible":true,"labelsProp":1,"type":"text","inputmode":"decimal","autocomplete":"off","describedby":"bill-error","errRole":"alert","errTag":"P"},{"id":"tip","label":"Tip percent","labelVisible":true,"labelsProp":1,"type":"text","inputmode":"numeric","autocomplete":"off","describedby":"tip-error","errRole":"alert","errTag":"P"},{"id":"people","label":"Number of people","labelVisible":true,"labelsProp":1,"type":"text","inputmode":"numeric","autocomplete":"off","describedby":"people-error","errRole":"alert","errTag":"P"}]
result/alerts {"role":"status","live":"polite","alerts":3,"errors":3}
PASS C5 labels :: ["Bill total, tax included","Tip percent","Number of people"]
PASS C5 inputmode
PASS C5 roles
PASS C7 autocomplete off on each field
mutations after typing "abc" in bill and leaving {"bill-error":1,"tip-error":0,"people-error":0,"result":0}
PASS C5 bill error shown; type "18" in tip: 0 changes in bill-error and result :: {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
PASS C5 bill error shown; type "4" in people and leave: 0 changes in bill-error, tip-error, result :: {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
PASS C5 bill and tip errors shown; type "12" in people: 0 changes in both error paragraphs and result :: {"bill-error":0,"tip-error":0,"people-error":2,"result":0}
PASS C5 result shown; people "4" -> "04" (same result text): 0 changes anywhere :: {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
PASS C5 result shown; bill "100.00" -> "100.0" (same result text): 0 changes anywhere :: {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
PASS C5 focus and blur with no edit: 0 changes anywhere :: {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
result changes when tip 18 -> 180 (expected: result cleared, tip error written) {"bill-error":0,"tip-error":1,"people-error":0,"result":1} {"bill":"","tip":"Enter a whole number from 0 to 100, in digits only.","people":""}
C6 body innerText "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page." {"guide":false,"fields":false,"bill":false,"tip":false,"people":false,"labels":0,"noscript":true}
PASS C6 JavaScript off: sentence shown, no guidance, no field :: {"guide":false,"fields":false,"bill":false,"tip":false,"people":false,"labels":0,"noscript":true}
C7 fetch result: REJECTED TypeError: Failed to fetch
C7 securitypolicyviolation events: [{"blockedURI":"https://example.com/","violatedDirective":"connect-src","effectiveDirective":"connect-src"}]
C7 console: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy."]
C7 requests seen: ["file:///home/ubuntu/audit/wt/skills/hinshitsu/example/run/review/index.html"]
PASS C7 fetch blocked by the policy :: REJECTED TypeError: Failed to fetch
C7 other channels (XHR, image, beacon, WebSocket): {"xhr":"error","img":"error","beacon":true,"ws":"error","violations":5} requests seen: ["file:///home/ubuntu/audit/wt/skills/hinshitsu/example/run/review/index.html","https://example.com/","https://example.com/x.png"]
C7 storage after use: {"localStorage":0,"sessionStorage":0,"cookie":""}
before reload {"bill":"100.00","tip":"18","people":"4"} 6 result lines
PASS C7 reload clears every field (and result, errors) :: {"bill":"","tip":"","people":""}
PASS C7 reload from the error state clears fields and messages :: {"val":{"bill":"","tip":"","people":""},"err":{"bill":"","tip":"","people":""}}
PASS C7 back button returns to 3 empty fields :: {"bill":"","tip":"","people":""}
FN split_exact {"tipCents":1800,"totalCents":11800,"shares":[{"count":4,"cents":2950}]}
FN split_remainder {"tipCents":0,"totalCents":1000,"shares":[{"count":1,"cents":334},{"count":2,"cents":333}]}
FN split_half {"tipCents":5,"totalCents":35,"shares":[{"count":1,"cents":35}]}
FN split_below_half {"tipCents":4,"totalCents":33,"shares":[{"count":1,"cents":33}]}
FN split_max {"tipCents":100000000,"totalCents":200000000,"shares":[{"count":100,"cents":2000000}]}
FN split_min {"tipCents":0,"totalCents":1,"shares":[{"count":1,"cents":1},{"count":99,"cents":0}]}
FN plain ["12|2","12.5|4","1,5|3","7|1","7|1","|0"]
FN amt {"empty":{"error":"Enter the bill total."},"ok0":{"cents":700},"ok1":{"cents":750},"ok2":{"cents":705},"waitT":{"waiting":true},"waitF":{"error":"Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50"},"bad":{"error":"Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50"},"lead":{"cents":710},"long":{"error":"Enter 1000000.00 or less."},"zero":{"error":"Enter an amount above 0."},"max":{"error":"Enter 1000000.00 or less."},"maxm1":{"cents":99999999},"over":{"error":"Enter 1000000.00 or less."}}
FN whole {"empty":{"error":"E"},"bad":{"error":"Enter a whole number from 0 to 100, in digits only."},"long":{"error":"Enter a whole number from 0 to 100, in digits only."},"lead":{"value":7},"lo":{"error":"Enter a whole number from 1 to 100, in digits only."},"hi":{"error":"Enter a whole number from 0 to 100, in digits only."},"min":{"value":0},"max":{"value":100}}
FN money ["0.00","0.05","0.10","0.99","1.00","1234.56","2000000.00"]
FN payLine ["1 person pays 3.34","2 people pay 3.33 each"]
FN windowSplit true
FAILS 0
```

C3: both sweeps and the 3 spot cases, against my own arithmetic. The 1 "sum failure" is the spot case that shows no result.

```
$ cd ~/audit && node t3.js
sweep 1 (bills 0.01-50.00 step 0.01; tips 0, 15, 18, 20; 1 person): cases so far 20000 mismatches 0 sum failures 0 spread failures 0
sweep 2 (bills 0.01-5.00 step 0.01; 1-12 people; tip 18): cases so far 26000 mismatches 0 sum failures 0 spread failures 0
spot ["10.00","0","3"]: MATCH page=["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."] auditor=["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."]
spot ["1000000.00","100","100"]: MISMATCH page=[] auditor=["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"]
spot ["0.01","0","100"]: MATCH page=["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."] auditor=["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."]
TOTAL cases 26003 mismatches 1 sum failures 1 spread failures 0 seconds 156
first mismatches: [
 {
  "typed": [
   "1000000.00",
   "100",
   "100"
  ],
  "page": [],
  "pageErrors": [
   "Enter 1000000.00 or less.",
   "",
   ""
  ],
  "auditor": [
   "Bill total: 1000000.00",
   "Tip percent: 100",
   "Number of people: 100",
   "Tip amount: 1000000.00",
   "Total with tip: 2000000.00",
   "100 people pay 20000.00 each"
  ]
 }
]
```

Reload from the error state.

```
$ cd ~/audit && node t4.js
error state before reload {"bill":"abc","tip":"","people":"4"} {"bill":"Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50","tip":"Enter the tip percent. Enter 0 for no tip.","people":""}
after page.reload(): marker undefined {"result":[],"resultText":"","err":{"bill":"","tip":"","people":""},"val":{"bill":"","tip":"","people":""},"invalid":[],"active":"BODY"}
readyState right after commit: complete
```

Desktop Chrome: request log, first C2 test, reload, `12.` after the cursor returns. The tab switch in this script did not take focus from the page (`hasFocus=true`), so I repeated the switch with a real window in `t6`.

```
$ cd ~/audit && node t5.js
desktop browser 156.0.8078.47
requests ["file:///home/ubuntu/audit/wt/skills/hinshitsu/example/run/review/index.html"] visibility visible hasFocus=true
typed 100.00, 18, 4 -> ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"]
after reload {"bill":"","tip":"","people":""} [] {"bill":"","tip":"","people":""}
clicked empty bill field: {"bill":"","tip":"","people":""} active bill
after switching to another tab, nothing typed: {"bill":"","tip":"","people":""} active bill visible hasFocus=true
back on the page: {"bill":"","tip":"","people":""} active bill
"12." with cursor in bill: "" 0
"12." after switching tab (cursor stays in bill): "" active bill
"12." after Tab to tip: "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50"
"12." after Shift+Tab back into bill (cursor in bill): "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" active bill result lines 0
```

Desktop Chrome, a real window switch: `node t6.js setup [bill text]`; `xdotool windowactivate <desktop window>`; `node t6.js read`; `xdotool windowactivate <Chrome window>`; `node t6.js close`. First with an empty bill, then with `12.`.

```
$ cd ~/audit && (the sequence above, twice)
setup {"result":[],"resultText":"","err":{"bill":"","tip":"","people":""},"val":{"bill":"","tip":"","people":""},"invalid":[],"active":"bill"}
active window: Desktop — Plasma
read {"ev":["bill blur, activeElement=bill","window blur"],"hasFocus":true,"billError":"Enter the bill total.","active":"bill","value":"","invalid":"true"}
read {"ev":["bill blur, activeElement=bill","window blur","bill blur, activeElement=bill","window blur"],"hasFocus":true,"billError":"Enter the bill total.","active":"bill","value":"","invalid":"true"}
setup {"result":[],"resultText":"","err":{"bill":"","tip":"","people":""},"val":{"bill":"12.","tip":"18","people":"4"},"invalid":[],"active":"bill"}
active window: Desktop — Plasma
read {"ev":["bill blur, activeElement=bill","window blur"],"hasFocus":true,"billError":"","active":"bill","value":"12.","invalid":null}
read {"ev":["bill blur, activeElement=bill","window blur","bill blur, activeElement=bill","window blur"],"hasFocus":true,"billError":"","active":"bill","value":"12.","invalid":null}
```

```
$ git status --short | wc -l; git rev-parse HEAD; sha256sum skills/hinshitsu/example/run/review/index.html   # after the last test
0
1b6cf7695510718d4b21836b0756749400da0c54
dc993923bda99787251fe78c9ba3a07eab64e987506cb7eb36700b26c75dad55  skills/hinshitsu/example/run/review/index.html
```

## Findings

### 1. The page rejects a bill of exactly 1000000.00

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION; the message it shows is also false).
- **Where:** `skills/hinshitsu/example/run/review/index.html`, line 92: `if (cents >= MAX_BILL_CENTS) { return { error: tooMuch }; }`
- **Trigger:** Open the file. Type `1000000.00` in "Bill total, tax included", `100` in "Tip percent", `100` in "Number of people". The message "Enter 1000000.00 or less." shows below the bill and no result shows. `1000000`, `0`, `1` does the same. Required: bill total 1000000.00, tip amount 1000000.00, total with tip 2000000.00, "100 people pay 20000.00 each".
- **Violates:** C2 (a bill from 0.01 to 1000000.00), C3 (spot case `1000000.00`, `100`, `100`), C4 (only a bill above 1000000.00 gets a message).
- **Proposed fix:** Line 92: change `>=` to `>`. `skills/hinshitsu/example/index.html` already has `>` on that line; it is the only line in which the 2 files differ.

### 2. Invisible characters at the ends of a value are not all ignored

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION).
- **Where:** `index.html`, line 76 (the character class in `plain`).
- **Trigger:** With `18` and `4` in the other fields, paste `12.50` with U+200E (left-to-right mark) before it into the bill, then leave the field. The message "Enter an amount above 0, in digits. …" shows and no result shows; the field looks the same as `12.50`. The same happens with U+200F after the value, U+061C before it, U+202A…U+202C and U+2066…U+2069 around it, and U+00AD, U+2063, U+180E or U+FE0F at an end. U+200E before a tip of `18` and U+200F after `4` people are rejected in the same way. The page ignores only white space, U+200B to U+200D, U+2060 and U+FEFF.
- **Violates:** C4 ("Spaces and invisible characters at either end are ignored").
- **Proposed fix:** In line 76, widen both character classes to `[\s\u00AD\u034F\u061C\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFE00-\uFE0F\uFEFF]`.

### 3. The page accepts characters that are not plain, full-width or Arabic-Indic digits or decimal marks

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION: a value outside the formats shows a result and no message).
- **Where:** `index.html`, line 72: `text.normalize("NFKC")`.
- **Trigger:** With valid values in the other 2 fields, paste each of these and read the result. Bill `①` shows "Bill total: 1.00". Bill `1²` shows 12.00. Bill `⒈⑤` (U+2488 U+2464) shows 1.50. Bill `㊿` shows 50.00. Bill `𝟏𝟐` (U+1D7CF U+1D7D0) shows 12.00. Bill `12․50` (U+2024) and `12﹒50` (U+FE52) show 12.50. Tip `²` shows "Tip percent: 2", tip `⑳` shows 20, tip `⁵` shows 5. People `③` shows 3, people `₂` shows 2. None shows a message.
- **Violates:** C4 ("The bill is digits, with an optional decimal mark…", "A whole number is digits only", "a full-width or Arabic-Indic digit or decimal mark counts as its plain form"; no other form is named).
- **Proposed fix:** Remove `.normalize("NFKC")`. Map only the named forms: `.replace(/[\uFF10-\uFF19]/g, function (c) { return String(c.charCodeAt(0) - 0xFF10); }).replace(/\uFF0E/g, ".").replace(/\uFF0C/g, ",")`, and keep lines 73 to 76. `\s` on line 76 already covers the full-width space U+3000.

### 4. A bill of `12.` shows its message while the bill field has the cursor, after the person returns to the field

- **Class:** BLOCKER (the DELIVERABLE fails a CRITERION as written).
- **Where:** `index.html`, lines 178-179: the page recomputes on `input` and `blur` only, not when the field gets the cursor.
- **Trigger:** Type `18` and `4` in the tip and the people. Type `12.` in the bill: no message. Press Tab: the message shows (required). Press Shift+Tab, or click the bill: the cursor is in the bill, the value is `12.`, and the message and the red border stay until the next key. Observed in headless Chrome and in desktop Chrome.
- **Violates:** C4 ("While the bill field has the cursor, digits followed by a decimal mark and nothing else (`12.`) show no message and no result").
- **Proposed fix:** After line 179 add `f.input.addEventListener("focus", update);`. If the ORCHESTRATOR prefers the message to stay, the fix is a CRITERIA change to C4 that the USER approves.

### 5. A window switch puts a message on an empty field that the person has not typed in or left

- **Class:** DEFECT (a wrong message; I do not class it BLOCKER because C4 does not say whether a window switch counts as leaving the field).
- **Where:** `index.html`, line 179: `f.input.addEventListener("blur", function () { f.touched = true; update(); });`
- **Trigger:** In desktop Chrome, open the file and click the empty bill field. Type nothing. Switch to another window (I ran `xdotool windowactivate` on the desktop window). Chrome fires `blur` on the field while `document.activeElement` stays the bill. "Enter the bill total." shows with a red border, and is still there when the person comes back; the cursor is still in the bill. With `12.` in the bill the same switch shows no message, because line 121 treats the field as still having the cursor: the 2 lines disagree on what "left" means.
- **Violates:** C4, Incomplete state ("the person has neither typed in nor left them, and no field shows a message").
- **Proposed fix:** Line 179: `f.input.addEventListener("blur", function () { if (document.activeElement === f.input) { return; } f.touched = true; update(); });`

## Not examined

- **C8, the delivery report:** UNVERIFIED. The scope names no delivery report and no path to one, and limits me to the files it names. I did not follow the 3 checks and recorded no time.
- **A real phone and a screen reader (C5):** UNVERIFIED. Neither is on this machine. I read the roles and counted DOM changes; I did not hear any announcement.
- **Firefox (C7):** UNVERIFIED. The CRITERION excludes it and it is not installed.
- **Browsers other than Chrome for Testing 156.0.8078.47 on Linux,** including Chrome on Windows, macOS and Android: not available here.
- **`skills/hinshitsu/example/index.html`:** I compared it with the copy under review (1 line differs, line 92) and ran no test against it. Every test above ran against the copy under review, as the scope directs.
- **The other files of the RUN FOLDER** (`AUDIT-LOG.md`, `audits/`, `evidence/`, `prompts/`, `memos/`, and the parts of `FRAMEWORK.md` outside the lines listed): outside this scope. I did not read entry E-175; I used the CRITERIA as the scope quotes them.
- **Bills from 50.01 to 999999.99 outside the cases listed,** and tips other than 0, 15, 18 and 20 in the sweeps: C3 does not name them. I tested the limits by hand (`999999.99`, `100`, `100`) and read the arithmetic: the largest intermediate value is 10,000,000,050, far below 2^53.
- **Input by an on-screen keyboard, an input-method editor, drag and drop, and browser autofill:** not tested. Paste-like input was tested with Playwright `insertText`.
- **Whether the back-button test restored the page from Chrome's back/forward cache or loaded it again:** not determined. The fields were empty in the test.
- **A press of F5 in headless Chrome:** my first run of `t2.js` used it and the page did not reload (the test showed the old values, a fault of my test, not of the page). I replaced it with a scripted reload, which passed in headless and in desktop Chrome.

## Appendix — scripts

The 7 scripts behind the commands (`lib.js`, `t1.js` to `t6.js`) are attached beside this report as `audit-scripts.tar.gz`. `t3.js` holds my own arithmetic for C3 (function `expected`): the tip is the whole part of bill × percent ÷ 100 plus 1 cent when the remainder is 50 or more; the payments are dealt out 1 cent at a time, then grouped and listed larger first.
