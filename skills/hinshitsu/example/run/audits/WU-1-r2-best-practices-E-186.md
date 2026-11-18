Devin session ID: c9a8fe2dcd2a4189ba729d48b325876c (https://app.devin.ai/sessions/c9a8fe2dcd2a4189ba729d48b325876c)

# Best-practices audit — `skills/hinshitsu/example/index.html`

Result: 4 findings (2 BLOCKER, 2 STYLE). Every check of C1 to C7 that I could run, I ran; each passed except the 2 C4 points in findings 1 and 2. C8 is UNVERIFIED.

## Scope received

> You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: round 2 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.
>
> # Role scope — Best-practices auditor
>
> You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.
>
> ## Your job
>
> Compare the WORK UNIT with (a) the conventions of the repository it lives in, taken from its existing files and its contributor documents, and (b) the documented practice of its language, framework and platform. Cite the convention or the document for each finding.
>
> ## Filled in by the ORCHESTRATOR
>
> - DELIVERABLE and files to examine: `skills/hinshitsu/example/index.html`, all lines, SHA-256 e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0
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
> Confirm the SHA-256 before you start. The repository holds no other HTML page; its conventions are in `README.md` and `TESTING.md`.

## Examined

### Commit and hash

- Checkout: `/home/ubuntu/repos/devin`, detached at `1b6cf7695510718d4b21836b0756749400da0c54`, "example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in" (2026-11-18 17:13:31 +0000). It is the newest of 3 commits on `origin/devin/hinshitsu-build` whose message begins with that text.
- `sha256sum skills/hinshitsu/example/index.html` → `e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0`. It matches the scope. I ran it before the checks and again after them.
- `git status --porcelain` after all checks → no output. I changed no file in the repository. My scripts and screenshots are in `/home/ubuntu/audit-out`, outside it.

### Files read

| File | Lines | Why |
|---|---|---|
| `skills/hinshitsu/example/index.html` | 1–195 (all) | the DELIVERABLE |
| `README.md` | 1–88 (all) | repository conventions |
| `TESTING.md` | 1–12 (all) | repository conventions |
| `skills/hinshitsu/GLOSSARY.md` | 1–97 (all) | finding classes |
| `skills/hinshitsu/example/run/FRAMEWORK.md` | headings, and lines 17, 30, 31, 52 (grep for `splitBill`) | `index.html` line 67 cites its part 4 |
| `scripts/lint.py` | lines 30–34 and 135–165 | `TESTING.md` names it; I checked whether it governs `index.html` (it does not; its file list has no HTML) |

### Browser

Google Chrome for Testing 156.0.8078.47 on Linux, driven by Playwright from Node 22. Page opened: `file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html`. C1, C2, C4, C5 counts, C6 and C7 ran in a headed window on the desktop. C2 and C4 values went in by key presses (non-ASCII text by `insertText`). C3 values went in by Playwright `fill`, which sets the field and fires the page's `input` event. The 9 screenshots came from the same binary in headless mode, because screenshot capture hung in the headed window. The scripts are attached as `audit-scripts.txt`.

### C1 and C2 — `node c1c2.js` (complete output)

```
UA Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
C1 playwright requests: 1 ["GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
C1 CDP requestWillBeSent: 1 ["file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
C1 performance resource entries: 0
console at load: []
first open: {"values":["","",""],"visibleText":"Split the bill\n\nType the bill total, the tip percent and the number of people.\n\nBill total, tax included\n\nTip percent\n\nNumber of people","guideHidden":false,"fieldsHidden":false,"active":"BODY"} {"result":[],"resultText":"","errors":["","",""],"invalid":[null,null,null]}
C2 typed ["100.00","18","4"] => ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"] errors ["","",""]
C2 typed ["0.30","15","1"] => ["Bill total: 0.30","Tip percent: 15","Number of people: 1","Tip amount: 0.05","Total with tip: 0.35","1 person pays 0.35"] errors ["","",""]
C2 typed ["10.10","15","1"] => ["Bill total: 10.10","Tip percent: 15","Number of people: 1","Tip amount: 1.52","Total with tip: 11.62","1 person pays 11.62"] errors ["","",""]
C2 typed ["12.25","18","1"] => ["Bill total: 12.25","Tip percent: 18","Number of people: 1","Tip amount: 2.21","Total with tip: 14.46","1 person pays 14.46"] errors ["","",""]
C2 typed ["0100.5","007","02"] => ["Bill total: 100.50","Tip percent: 7","Number of people: 2","Tip amount: 7.04","Total with tip: 107.54","2 people pay 53.77 each"] errors ["","",""]
C2 typed ["10.00","0","3"] => ["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."] errors ["","",""]
C2 typed ["1000000.00","100","100"] => ["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"] errors ["","",""]
C2 typed ["0.01","0","100"] => ["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."] errors ["","",""]
console at end: []
```

Read: 1 request, 0 console messages, first open shows 3 empty fields and the guidance. All 5 C2 tests give the stated values. PASS.

### C3 — `node c3.js` (complete output)

My own code used BigInt, rounded the tip by comparing the remainder with 50, and built the payments 1 person at a time. It compared every line of the page's result, and the whole result text, with its own.

```
sweep A (bills 0.01-50.00 x tips 0,15,18,20 x 1 person): cases 20000 mismatches 0
sweep B (bills 0.01-5.00 x 1-12 people x tip 18): cases 6000 mismatches 0
spot ["10.00","0","3"] ["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."]
spot ["1000000.00","100","100"] ["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"]
spot ["0.01","0","100"] ["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."]
spot cases 3 mismatches 0
total cases 26003 total mismatches 0 []
```

26,003 cases, 0 mismatches. PASS.

### C4 — `node c4.js` (complete output)

Each probe opens the page fresh, types valid values in the other 2 fields (100.00, 18, 4), types the probe, reads the page with the cursor still in the field ("focused"), then presses Tab and clicks the heading and reads again ("left"). `-` means no message. `M1` to `M5` are in the legend at the end. A result is shown as bill/tip/people, then its other lines.

```
== first open
{"result":[],"resultText":"","errors":["","",""],"invalid":[null,null,null]} "Split the bill\n\nType the bill total, the tip percent and the number of people.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"
== incomplete: bill typed, focus still in bill, tip and people untouched
{"result":[],"resultText":"","errors":["","",""],"invalid":[null,null,null]}
== tab into tip (bill left), nothing typed in tip
{"result":[],"resultText":"","errors":["","",""],"invalid":[null,null,null]}
== tab into people (tip left empty)
{"result":[],"resultText":"","errors":["","Enter the tip percent. Enter 0 for no tip.",""],"invalid":[null,"true",null]}
== tab out of people (people left empty)
{"result":[],"resultText":"","errors":["","Enter the tip percent. Enter 0 for no tip.","Enter the number of people."],"invalid":[null,"true","true"]}
== type then delete in bill, still focused
{"result":[],"resultText":"","errors":["Enter the bill total.","",""],"invalid":["true",null,null]}
== result recomputed on every change: 100.00/18/4 then people 4 -> 3 -> 30
["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"]
people empty: {"result":[],"resultText":"","errors":["","","Enter the number of people."],"invalid":[null,null,"true"]}
["Bill total: 100.00","Tip percent: 18","Number of people: 3","Tip amount: 18.00","Total with tip: 118.00","1 person pays 39.34","2 people pay 39.33 each","Your group decides who pays the higher amount."]
["Bill total: 100.00","Tip percent: 18","Number of people: 30","Tip amount: 18.00","Total with tip: 118.00","10 people pay 3.94 each","20 people pay 3.93 each","Your group decides who pays the higher amount."]
== C4 bill inputs
bill "12.50" | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "12,50" | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill " 12.50 " | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "\u200b12.50\ufeff" | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "\uff11\uff12\uff0e\uff15\uff10" | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "\uff11\uff12\uff0c\uff15\uff10" | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "\u0661\u0662\u066b\u0665\u0660" | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "\u06f1\u06f2.\u06f5\u06f0" | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "12." | focused: msg -, result none | left: msg M1, aria-invalid true, result same
bill "12," | focused: msg -, result none | left: msg M1, aria-invalid true, result same
bill "10." | focused: msg -, result none | left: msg M1, aria-invalid true, result same
bill "abc" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "12a" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "1,000.00" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "1.000,00" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "1e3" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill ".5" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill ",5" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "$12.50" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "12.50\u20ac" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "\u00a312" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "-5" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "-0.01" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "0" | focused: msg M2, result none | left: msg M2, aria-invalid true, result same
bill "0.00" | focused: msg M2, result none | left: msg M2, aria-invalid true, result same
bill "0,0" | focused: msg M2, result none | left: msg M2, aria-invalid true, result same
bill "1000000.00" | focused: msg -, result 1000000.00/18/4 => Tip amount: 180000.00; Total with tip: 1180000.00; 4 people pay 295000.00 each | left: msg -, aria-invalid null, result same
bill "1000000.01" | focused: msg M3, result none | left: msg M3, aria-invalid true, result same
bill "1000001" | focused: msg M3, result none | left: msg M3, aria-invalid true, result same
bill "99999999" | focused: msg M3, result none | left: msg M3, aria-invalid true, result same
bill "1.234" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "12,345" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "1 000" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "12.5.0" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "+5" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "0x10" | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "1000000" | focused: msg -, result 1000000.00/18/4 => Tip amount: 180000.00; Total with tip: 1180000.00; 4 people pay 295000.00 each | left: msg -, aria-invalid null, result same
bill "0.01" | focused: msg -, result 0.01/18/4 => Tip amount: 0.00; Total with tip: 0.01; 1 person pays 0.01; 3 people pay 0.00 each; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "00000001000000.00" | focused: msg -, result 1000000.00/18/4 => Tip amount: 180000.00; Total with tip: 1180000.00; 4 people pay 295000.00 each | left: msg -, aria-invalid null, result same
== C4 tip inputs
tip "0" | focused: msg -, result 100.00/0/4 => Tip amount: 0.00; Total with tip: 100.00; 4 people pay 25.00 each | left: msg -, aria-invalid null, result same
tip "100" | focused: msg -, result 100.00/100/4 => Tip amount: 100.00; Total with tip: 200.00; 4 people pay 50.00 each | left: msg -, aria-invalid null, result same
tip "007" | focused: msg -, result 100.00/7/4 => Tip amount: 7.00; Total with tip: 107.00; 4 people pay 26.75 each | left: msg -, aria-invalid null, result same
tip "\uff11\uff18" | focused: msg -, result 100.00/18/4 => Tip amount: 18.00; Total with tip: 118.00; 4 people pay 29.50 each | left: msg -, aria-invalid null, result same
tip "\u0661\u0668" | focused: msg -, result 100.00/18/4 => Tip amount: 18.00; Total with tip: 118.00; 4 people pay 29.50 each | left: msg -, aria-invalid null, result same
tip " 18 " | focused: msg -, result 100.00/18/4 => Tip amount: 18.00; Total with tip: 118.00; 4 people pay 29.50 each | left: msg -, aria-invalid null, result same
tip "101" | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "-1" | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "18.0" | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "18,5" | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "1e1" | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "+4" | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "4." | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "abc" | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "18%" | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "1000" | focused: msg M4, result none | left: msg M4, aria-invalid true, result same
tip "0000000000000000000018" | focused: msg -, result 100.00/18/4 => Tip amount: 18.00; Total with tip: 118.00; 4 people pay 29.50 each | left: msg -, aria-invalid null, result same
== C4 people inputs
people "1" | focused: msg -, result 100.00/18/1 => Tip amount: 18.00; Total with tip: 118.00; 1 person pays 118.00 | left: msg -, aria-invalid null, result same
people "100" | focused: msg -, result 100.00/18/100 => Tip amount: 18.00; Total with tip: 118.00; 100 people pay 1.18 each | left: msg -, aria-invalid null, result same
people "02" | focused: msg -, result 100.00/18/2 => Tip amount: 18.00; Total with tip: 118.00; 2 people pay 59.00 each | left: msg -, aria-invalid null, result same
people "\u0664" | focused: msg -, result 100.00/18/4 => Tip amount: 18.00; Total with tip: 118.00; 4 people pay 29.50 each | left: msg -, aria-invalid null, result same
people "\u06f4" | focused: msg -, result 100.00/18/4 => Tip amount: 18.00; Total with tip: 118.00; 4 people pay 29.50 each | left: msg -, aria-invalid null, result same
people "0" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "101" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "-1" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "18.0" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "18,5" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "1e1" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "+4" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "4." | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "1.5" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "four" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "00" | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
== extra probes: invisible characters at an end (C4: "ignored")
bill "\u200e12.50" [LRM U+200E at start] | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "12.50\u200f" [RLM U+200F at end] | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "\u061c\u0661\u0662" [ALM U+061C at start] | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "\u202a12.50\u202c" [LRE..PDF U+202A/U+202C] | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "\u206612.50\u2069" [LRI..PDI U+2066/U+2069] | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "\u00ad12.50" [soft hyphen U+00AD] | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "12.50\u180e" [MVS U+180E] | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "\u00a012.50\u00a0" [no-break space U+00A0] | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "\u300012.50" [ideographic space U+3000] | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "12.50\u200d" [ZWJ U+200D] | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "\u206012.50" [WJ U+2060] | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
== extra probes: characters that are neither plain, full-width nor Arabic-Indic digits or marks
people "\u2461" [circled digit two] | focused: msg -, result 100.00/18/2 => Tip amount: 18.00; Total with tip: 118.00; 2 people pay 59.00 each | left: msg -, aria-invalid null, result same
people "\u00b2" [superscript two] | focused: msg -, result 100.00/18/2 => Tip amount: 18.00; Total with tip: 118.00; 2 people pay 59.00 each | left: msg -, aria-invalid null, result same
people "\ud835\udfd2" [mathematical bold digit four] | focused: msg -, result 100.00/18/4 => Tip amount: 18.00; Total with tip: 118.00; 4 people pay 29.50 each | left: msg -, aria-invalid null, result same
tip "\u32bf" [circled number fifty] | focused: msg -, result 100.00/50/4 => Tip amount: 50.00; Total with tip: 150.00; 4 people pay 37.50 each | left: msg -, aria-invalid null, result same
tip "\u2081\u2085" [subscript one five] | focused: msg -, result 100.00/15/4 => Tip amount: 15.00; Total with tip: 115.00; 4 people pay 28.75 each | left: msg -, aria-invalid null, result same
people "\u246b" [circled number twelve] | focused: msg -, result 100.00/18/12 => Tip amount: 18.00; Total with tip: 118.00; 4 people pay 9.84 each; 8 people pay 9.83 each; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "12\u202450" [one dot leader U+2024 as mark] | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "12\ufe5250" [small full stop U+FE52] | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "12\ufe5050" [small comma U+FE50] | focused: msg -, result 12.50/18/4 => Tip amount: 2.25; Total with tip: 14.75; 3 people pay 3.69 each; 1 person pays 3.68; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
bill "\u2488" [digit one full stop U+2488] | focused: msg -, result none | left: msg M1, aria-invalid true, result same
bill "\u2488\u2075" [U+2488 then superscript five] | focused: msg -, result 1.50/18/4 => Tip amount: 0.27; Total with tip: 1.77; 1 person pays 0.45; 3 people pay 0.44 each; Your group decides who pays the higher amount. | left: msg -, aria-invalid null, result same
people "\u0967" [Devanagari digit one] | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
bill "1\u066c000" [Arabic thousands separator] | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
bill "12\u060c50" [Arabic comma U+060C] | focused: msg M1, result none | left: msg M1, aria-invalid true, result same
people "\u2163" [Roman numeral four] | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
people "\u3285" [circled ideograph six] | focused: msg M5, result none | left: msg M5, aria-invalid true, result same
== "12." in bill, then window loses focus (page.evaluate blur of window not possible); Enter key pressed in bill
{"result":[],"resultText":"","errors":["","",""],"invalid":[null,null,null]}
== message legend
M1 = Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50
M2 = Enter an amount above 0.
M3 = Enter 1000000.00 or less.
M4 = Enter a whole number from 0 to 100, in digits only.
M5 = Enter a whole number from 1 to 100, in digits only.
```

Every input that C4 lists behaves as C4 states. The 2 groups of extra probes give findings 1 and 2.

### C5, C6, C7 — `node c567.js`, headed (complete output)

```
C5 width 320 first open {"innerWidth":320,"scrollWidth":320,"clientWidth":320,"bodyScrollWidth":320,"scrollXAfterScrollTo1000":0,"tooWide":[]}
C5 width 320 errors    {"innerWidth":320,"scrollWidth":320,"clientWidth":320,"bodyScrollWidth":320,"scrollXAfterScrollTo1000":0,"tooWide":[]}
C5 width 320 result    {"innerWidth":320,"scrollWidth":305,"clientWidth":305,"bodyScrollWidth":305,"scrollXAfterScrollTo1000":0,"tooWide":[]} ["Bill total: 1000000.00","Tip percent: 100","Number of people: 99","Tip amount: 1000000.00","Total with tip: 2000000.00","2 people pay 20202.03 each","97 people pay 20202.02 each","Your group decides who pays the higher amount."]
C5 width 360 first open {"innerWidth":360,"scrollWidth":360,"clientWidth":360,"bodyScrollWidth":360,"scrollXAfterScrollTo1000":0,"tooWide":[]}
C5 width 360 errors    {"innerWidth":360,"scrollWidth":360,"clientWidth":360,"bodyScrollWidth":360,"scrollXAfterScrollTo1000":0,"tooWide":[]}
C5 width 360 result    {"innerWidth":360,"scrollWidth":345,"clientWidth":345,"bodyScrollWidth":345,"scrollXAfterScrollTo1000":0,"tooWide":[]} ["Bill total: 1000000.00","Tip percent: 100","Number of people: 99","Tip amount: 1000000.00","Total with tip: 2000000.00","2 people pay 20202.03 each","97 people pay 20202.02 each","Your group decides who pays the higher amount."]
C5 width 768 first open {"innerWidth":768,"scrollWidth":768,"clientWidth":768,"bodyScrollWidth":768,"scrollXAfterScrollTo1000":0,"tooWide":[]}
C5 width 768 errors    {"innerWidth":768,"scrollWidth":768,"clientWidth":768,"bodyScrollWidth":768,"scrollXAfterScrollTo1000":0,"tooWide":[]}
C5 width 768 result    {"innerWidth":768,"scrollWidth":768,"clientWidth":768,"bodyScrollWidth":768,"scrollXAfterScrollTo1000":0,"tooWide":[]} ["Bill total: 1000000.00","Tip percent: 100","Number of people: 99","Tip amount: 1000000.00","Total with tip: 2000000.00","2 people pay 20202.03 each","97 people pay 20202.02 each","Your group decides who pays the higher amount."]
C5 width 1280 first open {"innerWidth":1280,"scrollWidth":1280,"clientWidth":1280,"bodyScrollWidth":1280,"scrollXAfterScrollTo1000":0,"tooWide":[]}
C5 width 1280 errors    {"innerWidth":1280,"scrollWidth":1280,"clientWidth":1280,"bodyScrollWidth":1280,"scrollXAfterScrollTo1000":0,"tooWide":[]}
C5 width 1280 result    {"innerWidth":1280,"scrollWidth":1280,"clientWidth":1280,"bodyScrollWidth":1280,"scrollXAfterScrollTo1000":0,"tooWide":[]} ["Bill total: 1000000.00","Tip percent: 100","Number of people: 99","Tip amount: 1000000.00","Total with tip: 2000000.00","2 people pay 20202.03 each","97 people pay 20202.02 each","Your group decides who pays the higher amount."]
C5 markup {"labels":[{"for":"bill","text":"Bill total, tax included","visible":true,"accessibleLabelCount":1},{"for":"tip","text":"Tip percent","visible":true,"accessibleLabelCount":1},{"for":"people","text":"Number of people","visible":true,"accessibleLabelCount":1}],"inputs":[{"id":"bill","type":"text","inputmode":"decimal","autocomplete":"off","describedby":"bill-error","height":45.1875,"fontSize":"16px"},{"id":"tip","type":"text","inputmode":"numeric","autocomplete":"off","describedby":"tip-error","height":45.1875,"fontSize":"16px"},{"id":"people","type":"text","inputmode":"numeric","autocomplete":"off","describedby":"people-error","height":45.1875,"fontSize":"16px"}],"errorRoles":["alert","alert","alert"],"resultRole":"status","resultLive":"polite","lang":"en","title":"Split the bill","charset":"UTF-8","compat":"CSS1Compat","h1":1,"main":1}
C5 mutations setup: bill "abc" typed and left (bill-error written once expected) {"bill-error":1,"tip-error":0,"people-error":0,"result":0}
C5 mutations typing "18" in tip while the bill message shows (expected 0 everywhere) {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
C5 mutations typing "4" in people while the bill message shows (expected 0 everywhere) {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
C5 mutations setup: bill corrected to 100.00 (bill-error and result change expected) {"bill-error":1,"tip-error":0,"people-error":0,"result":7}
C5 mutations tip "18" -> "018": same result text (expected 0 everywhere) {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
C5 mutations people "4" -> "04": same result text (expected 0 everywhere) {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
C5 mutations bill "100.00" -> "100.0": same result text (expected 0 everywhere) {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
C5 mutations focus and blur with no change (expected 0 everywhere) {"bill-error":0,"tip-error":0,"people-error":0,"result":0}
state {"result":["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"],"resultText":"Bill total: 100.00Tip percent: 18Number of people: 4Tip amount: 18.00Total with tip: 118.004 people pay 29.50 each","errors":["","",""],"invalid":[null,null,null]}
colours {"body":"rgb(26, 26, 26)","bg":"rgb(255, 255, 255)","error":"rgb(164, 0, 0)","inputBorder":"rgb(85, 85, 85)","inputOutlineFocus":"rgb(16, 16, 16) auto 1px"}
C6 JS off h1 => box 480x36
C6 JS off noscript p => box 480x48
C6 JS off #guide => no box (not rendered)
C6 JS off #fields => no box (not rendered)
C6 JS off #bill => no box (not rendered)
C6 JS off #tip => no box (not rendered)
C6 JS off #people => no box (not rendered)
C6 JS off label[for=bill] => no box (not rendered)
C7 meta tag in DOM: <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">
C7 fetch: {"outcome":"rejected: TypeError: Failed to fetch","v":["connect-src blocked https://example.com/"]}
C7 console: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy."]
C7 requests seen: ["file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
C7 extra (img, sendBeacon) violations: ["connect-src blocked https://example.com/b","img-src blocked https://example.com/x.png"]
C7 storage after use: {"cookie":"","local":0,"session":0}
C7 before reload: ["100.00","18","4"]
C7 after reload: ["","",""] {"result":[],"resultText":"","errors":["","",""],"invalid":[null,null,null]}
C7 after away-and-back: ["","",""] {"result":[],"resultText":"","errors":["","",""],"invalid":[null,null,null]}
```

Read:

- C5: at 360, 768 and 1280 (and 320, which I added) no element is wider than the window and `scrollX` stays 0 in the first-open, error and result states. Labels, roles and `inputmode` are as stated. 0 changes in the error paragraphs and the result while typing in another field, and when the result text does not change. PASS. Real phone and screen reader: UNVERIFIED, not available to me.
- C6: with JavaScript off, the heading and the sentence have boxes; the guidance, the fields and the labels have none. PASS. I took no screenshot of this state.
- C7: the tag matches character for character; `fetch('https://example.com')` is rejected and Chrome logs the policy violation; no request beyond the file; fields are empty after a reload and after away-and-back. PASS. Firefox: UNVERIFIED, not installed here.

Source search, `grep -c` on `index.html`: `localStorage` 0, `sessionStorage` 0, `indexedDB` 0, `document.cookie` 0, `caches` 0. `grep -n 'http\|src=\|href=\|url(\|import\|@font'` returns only line 5, the policy tag.

### Screenshots — `HEADLESS=1 node shots.js`

Output: 9 lines `saved w{360,768,1280}-{first,errors,result}.png`. I opened `w360-errors.png`, `w360-result.png`, `w768-first.png` and `w1280-result.png`: no clipped text, no horizontal scrollbar, long messages and "2 people pay 20202.03 each" wrap inside the box. Attached: `w360-errors.png`, `w360-result.png`, `w768-first.png`, `w1280-result.png`.

### Practice checks with no finding

- W3C Nu HTML Checker, `curl --data-binary @index.html "https://validator.w3.org/nu/?out=json"` → `{"version":"26.11.17","messages":[]}`: no error, no warning.
- `file` → "HTML document, ASCII text"; 0 carriage returns; 0 lines with trailing spaces; file ends with a newline; `<meta charset>` is the first element in `<head>` (HTML Standard: within the first 1024 bytes).
- Contrast on white (WCAG 2.2, 1.4.3 and 1.4.11), computed from the page's colours: body text 17.40:1, error text and invalid border 8.14:1, field border 7.46:1.
- Fields are 45.2 px high with 16 px text (WCAG 2.2, 2.5.8 target size). Each field has 1 `<label for>`. `lang="en"`, 1 `<title>`, 1 `<h1>`, 1 `<main>`, standards mode. The default focus outline is kept.
- Errors are text, are tied to the field by `aria-describedby`, and set `aria-invalid` (WCAG 3.3.1; WAI-ARIA 1.2).
- The repository's banned-word list (`scripts/lint.py` lines 30–34) run over `index.html`: 0 hits.
- `script-src 'unsafe-inline'`: MDN and CSP Level 3 advise a hash or nonce instead. C7 fixes the tag word for word, so I raise no finding.

### Other commands (complete output)

`HEADLESS=1 node misc.js` (2 invisible characters in the output are written here as `\u200e` and `\u00ad`):

```
{"globals":["splitBill","plain","readAmount","readWhole","money","payLine","fields","resultBox","shownResult","showResult","update","MAX_BILL_CENTS","MAX_TIP_PERCENT","MAX_PEOPLE"],"splitBillDescriptor":{"writable":true,"configurable":false},"nfkc":["U+B2 -> \"2\"","U+2461 -> \"2\"","U+32BF -> \"50\"","U+2024 -> \".\"","U+FE52 -> \".\"","U+2488 -> \"1.\"","U+200E -> \"\u200e\"","U+AD -> \"\u00ad\""],"unicode":true}
contrast on #ffffff: body text #1a1a1a 17.40:1
contrast on #ffffff: error text and invalid border #a40000 8.14:1
contrast on #ffffff: input border #555555 7.46:1
```

## Findings

### 1. Invisible characters at an end of a value are not all ignored

- **Class:** BLOCKER, part (a): the DELIVERABLE fails a CRITERION. C4 does not list which characters are "invisible". If the ORCHESTRATOR reads the term as only the 5 that line 76 names, this is a FRAGILITY (a paste from another app fails).
- **Where:** `skills/hinshitsu/example/index.html` line 76, the character class `[\s\u200B-\u200D\u2060\uFEFF]`.
- **Trigger:** Open the page. Type `18` in tip and `4` in people. Put any of these in the bill field (paste, or `insertText`): U+200E then `12.50`; `12.50` then U+200F; U+061C then `١٢`; U+202A `12.50` U+202C; U+2066 `12.50` U+2069; U+00AD then `12.50`; `12.50` then U+180E. The field looks like `12.50`. The page shows "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" and no result. Evidence: the 7 probe lines under "invisible characters at an end" in the C4 output.
- **Violates:** C4, "Spaces and invisible characters at either end are ignored". Practice: all 7 are Unicode General_Category Cf (Format) characters, which have no visible glyph (UAX #9 defines the bidi marks among them). The page accepts Arabic-Indic digits, and right-to-left text is where U+200E, U+200F and U+061C occur. The message also tells the person to type what the field already appears to hold.
- **Proposed fix:** on line 76 strip by property, not by list: `.replace(/^[\s\p{Cf}]+|[\s\p{Cf}]+$/gu, "")`. Chrome 156 accepts `\p{Cf}` with the `u` flag (checked in `misc.js`: `"unicode":true`). Add the 7 inputs to the C4 test list.

### 2. `normalize("NFKC")` accepts characters that are not full-width or Arabic-Indic digits or marks

- **Class:** BLOCKER, part (a). C4 says a whole number "is digits only" and names 2 families that count as plain forms. If the ORCHESTRATOR reads C4 as allowing any compatibility form, this is a FRAGILITY: the set of accepted characters then depends on the Unicode version of the browser's NFKC tables.
- **Where:** `skills/hinshitsu/example/index.html` line 72, `text.normalize("NFKC")`.
- **Trigger:** Open the page. Type `100.00` in bill and `18` in tip. Put `②` (U+2461) in people: the result shows "Number of people: 2" and "2 people pay 59.00 each", with no message. Same outcome, each observed: `²` (U+00B2) → 2 people; `𝟒` (U+1D7D2) → 4 people; `⑫` (U+246B) → 12 people; tip `㊿` (U+32BF) → "Tip percent: 50"; tip `₁₅` → 15; bill `12․50` (U+2024), `12﹒50` (U+FE52), `12﹐50` (U+FE50) → "Bill total: 12.50"; bill `⒈⁵` (U+2488 U+2075) → "Bill total: 1.50". Bill `⒈` alone is treated as `1.`: no message while focused. Evidence: the probe lines under "characters that are neither plain, full-width nor Arabic-Indic" in the C4 output.
- **Violates:** C4, "A whole number is digits only", "a full-width or Arabic-Indic digit or decimal mark counts as its plain form", and "a value that fails the formats below shows a message … and no result shows". Practice: UAX #15, section 1.2, says the compatibility forms NFKC and NFKD "must not be blindly applied to arbitrary text" because they remove distinctions; the comment on line 70 states a narrower rule than the code applies.
- **Proposed fix:** drop `.normalize("NFKC")` and map only what C4 names: U+FF10–U+FF19 to `0`–`9` (`String(c.charCodeAt(0) - 0xFF10)`), U+FF0E to `.`, U+FF0C to `,`, and keep the Arabic-Indic lines 73–75. U+3000 is already covered by `\s`. Add the inputs above to the C4 test list, each expecting a message.

### 3. A comment in the DELIVERABLE cites a file the RECIPIENT does not receive, above a line that does nothing

- **Class:** STYLE.
- **Where:** `skills/hinshitsu/example/index.html` lines 67–68.
- **Trigger:** Read line 67: "The contract in FRAMEWORK.md, part 4, names window.splitBill". The RECIPIENT gets 1 file (C1), and no `FRAMEWORK.md` is beside it; the file is at `run/FRAMEWORK.md`. Line 68, `window.splitBill = splitBill;`, changes nothing: `misc.js` shows all 14 top-level names are already own properties of `window`, and `splitBill` has `configurable: false`, the mark of a property made by the declaration on line 57.
- **Violates:** no CRITERION. `GLOSSARY.md`, DELIVERABLE: "the exact form the RECIPIENT receives it". ECMAScript, GlobalDeclarationInstantiation: a top-level function declaration in a classic script creates the property on the global object.
- **Proposed fix:** replace lines 67–68 with 1 comment that needs no other file: `/* splitBill is reachable from the console as window.splitBill; the checks of C3 call it. */`. If finding 4 is fixed, keep the assignment, which then does the work.

### 4. 13 internal names are global

- **Class:** STYLE.
- **Where:** `skills/hinshitsu/example/index.html` lines 52–54, 71, 81, 97, 109, 114, 120, 125, 126, 129, 146.
- **Trigger:** Open the page and type `Object.keys(fields)` or `update` in the console: both resolve. `misc.js` lists `plain`, `readAmount`, `readWhole`, `money`, `payLine`, `fields`, `resultBox`, `shownResult`, `showResult`, `update`, `MAX_BILL_CENTS`, `MAX_TIP_PERCENT`, `MAX_PEOPLE` as own properties of `window`, beside `splitBill`.
- **Violates:** no CRITERION. `run/FRAMEWORK.md` part 4 names 1 public name, `window.splitBill`. Practice: MDN, "IIFE" glossary entry (avoid polluting the global namespace).
- **Proposed fix:** wrap lines 50–192 in `(function () { "use strict"; … }());` and keep `window.splitBill = splitBill;` as the 1 export. Re-run C3 after the change.

## Not examined

- **C8:** UNVERIFIED. The scope names no delivery report, and a listing of `skills/hinshitsu/example/run/` at this commit shows no file with "deliver" in its name.
- **Real phone, screen reader (C5):** UNVERIFIED. Neither is on this machine.
- **Firefox (C7):** UNVERIFIED. Not installed here.
- **JavaScript-off screenshot (C6):** not taken. I read the rendered boxes through the DevTools protocol instead.
- **Window loses focus while the bill holds `12.`:** not run. Playwright keeps a page focused, so I could not make Chrome blur the window. Line 121 decides "still typing" from `document.activeElement`, which stays on the field in that case.
- **Other files in `run/`** (`AUDIT-LOG.md`, `audits/`, `evidence/`, and the rest): not read. The scope does not name them, and `index.html` cites only `FRAMEWORK.md`.
- **`python3 -m unittest discover -s tests`, `hinshitsu_check.py`, `gauge.py`:** not run. They test the scripts and the run record, not the page, and `gauge.py` writes a file.
- **Outside the WORK UNIT, seen while reading the conventions:** `README.md` line 74 links `skills/hinshitsu/EXAMPLE.md`; that file does not exist at this commit (`ls` → "No such file or directory", and `python3 -B scripts/lint.py` prints "FAIL skills/hinshitsu/EXAMPLE.md: required file is missing (C1)"). I raise no finding, because it is not part of the DELIVERABLE.
