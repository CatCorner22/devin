devin-8a12c58416264769ab7ebff932a0757d

# Recipient-experience audit — WU-1, round 2 — `skills/hinshitsu/example/index.html`

Result: C1, C2, C3, C5, C6 and C7 passed every check I ran. C4 fails in 3 places (FINDINGS 1 to 3). C8 is UNVERIFIED: the RUN FOLDER holds no delivery report at this commit. The RECIPIENT task T1 (split a bill with a tip) completes from start to end in desktop Chrome.

## Scope received

```text
You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: round 2 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Recipient-experience auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Act as each RECIPIENT that the `VOC` entry names. Obtain the DELIVERABLE in the form and place the RECIPIENT receives it (the built page in a real browser, the document opened in its viewer, the package installed in a clean directory). Perform each RECIPIENT task from start to end. Save a screenshot or the full command output for each step.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: `skills/hinshitsu/example/index.html`, all lines, SHA-256 e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0. The page is not yet hosted; open it from your clone by its `file://` path in Chrome
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

Confirm the SHA-256 before you start. The RUN FOLDER is `skills/hinshitsu/example/run/`. The `VOC` entry is E-25 in its `AUDIT-LOG.md`; the task chosen is T1 in that entry. Attach your screenshots.
```

## Examined

### Files

- `skills/hinshitsu/example/index.html`, lines 1 to 195 (all). SHA-256 before the first check and after the last: `e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0`. It matches the scope.
- `skills/hinshitsu/example/run/AUDIT-LOG.md`, lines 225 to 262 (E-25, the `VOC` entry, and the lines around it). I ran `grep` on the same file for the entry headings E-150 to E-182 and for the word `DELIVERY` (0 matches).
- `skills/hinshitsu/GLOSSARY.md`, lines 11 to 97 (RECIPIENT, DELIVERABLE, BLOCKER, DEFECT, FRAGILITY, STYLE, VERIFIED, UNVERIFIED, the status table).
- `skills/hinshitsu/example/run/SESSION-STATE.md`, lines 1 to 9, to learn whether a delivery report exists. It names none.
- Directory listings of `skills/hinshitsu/example/` and `skills/hinshitsu/example/run/`. I opened no file under `audits/`, `evidence/`, `memos/`, `prompts/` or `review/`.

### Setup

- Fresh clone of `https://github.com/CatCorner22/devin.git`, branch `devin/hinshitsu-build`, in `/home/ubuntu/audit/devin`. 3 commits begin "example run: round 2 swarm scopes". The newest is `1b6cf7695510718d4b21836b0756749400da0c54` (2026-11-18 17:13:31 +0000). I checked out that commit.
- `git status --short` after the last check: 0 lines. I changed, committed and pushed nothing.
- Browser: the Chrome on this machine, `Chrome/156.0.8078.47` (Google Chrome for Testing, Linux, with a visible window). My scripts drove it through its DevTools port with Playwright 1.63. Each script opened a new browser context. The page was opened as `file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html`.
- Attached: my scripts `lib.js` (helpers and my own BigInt arithmetic), `c1c2.js`, `c3.js`, `c4.js`, `c5.js`, `c7b.js`; their output files; and all 76 screenshots in `screenshots.zip`.

### RECIPIENT 2 (a friend), task T1, by hand in the visible Chrome window

1. I opened a new tab and typed the `file://` path. The page showed the heading, 1 sentence of guidance and 3 empty labelled fields. Screenshot `t1-1-opened-in-visible-chrome.png`.
2. I clicked the bill field, typed `86.40`, pressed Tab, typed `18`, pressed Tab, typed `3`. The result showed: "Bill total: 86.40", "Tip percent: 18", "Number of people: 3", "Tip amount: 15.55", "Total with tip: 101.95", "1 person pays 33.99", "2 people pay 33.98 each", "Your group decides who pays the higher amount." My arithmetic: 86.40 × 18 % = 15.552, so 15.55; 33.99 + 2 × 33.98 = 101.95. Screenshot `t1-2-typed-86.40-18-3-result.png`.
3. I clicked Chrome's reload button. All 3 fields were empty and no result showed. Screenshot `t1-3-after-reload-button.png`.

RECIPIENT 1 (the USER, as reader of the worked example) receives the delivery report with its 3 checks. That report does not exist yet, so I could not act as RECIPIENT 1 (see `Not examined`).

### Command 1 — `node c1c2.js` (C1; the typed tests of C2; the spot cases of C3)

Each case was typed key by key after a reload. "mine" is the output of my own code. Screenshots `c1-first-open-1280.png` and `c2-case-1.png` to `c2-case-12.png`.

```text
C1 URL file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html
C1 playwright request log (1): ["GET file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html"]
C1 CDP Network.requestWillBeSent (1): ["file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html"]
C1 performance resource entries: 0
C1 first-open state: {"guide":"Type the bill total, the tip percent and the number of people.","fieldsVisible":true,"values":["","",""],"errors":["","",""],"invalid":[null,null,null],"lines":[],"resultText":"","active":""}
C2/C3 typed 100.00 | 18 | 4 -> MATCH
   page: ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"]
   mine: ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"]
   errors: ["","",""]
C2/C3 typed 0.30 | 15 | 1 -> MATCH
   page: ["Bill total: 0.30","Tip percent: 15","Number of people: 1","Tip amount: 0.05","Total with tip: 0.35","1 person pays 0.35"]
   mine: ["Bill total: 0.30","Tip percent: 15","Number of people: 1","Tip amount: 0.05","Total with tip: 0.35","1 person pays 0.35"]
   errors: ["","",""]
C2/C3 typed 10.10 | 15 | 1 -> MATCH
   page: ["Bill total: 10.10","Tip percent: 15","Number of people: 1","Tip amount: 1.52","Total with tip: 11.62","1 person pays 11.62"]
   mine: ["Bill total: 10.10","Tip percent: 15","Number of people: 1","Tip amount: 1.52","Total with tip: 11.62","1 person pays 11.62"]
   errors: ["","",""]
C2/C3 typed 12.25 | 18 | 1 -> MATCH
   page: ["Bill total: 12.25","Tip percent: 18","Number of people: 1","Tip amount: 2.21","Total with tip: 14.46","1 person pays 14.46"]
   mine: ["Bill total: 12.25","Tip percent: 18","Number of people: 1","Tip amount: 2.21","Total with tip: 14.46","1 person pays 14.46"]
   errors: ["","",""]
C2/C3 typed 0100.5 | 007 | 02 -> MATCH
   page: ["Bill total: 100.50","Tip percent: 7","Number of people: 2","Tip amount: 7.04","Total with tip: 107.54","2 people pay 53.77 each"]
   mine: ["Bill total: 100.50","Tip percent: 7","Number of people: 2","Tip amount: 7.04","Total with tip: 107.54","2 people pay 53.77 each"]
   errors: ["","",""]
C2/C3 typed 10.00 | 0 | 3 -> MATCH
   page: ["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."]
   mine: ["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."]
   errors: ["","",""]
C2/C3 typed 1000000.00 | 100 | 100 -> MATCH
   page: ["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"]
   mine: ["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"]
   errors: ["","",""]
C2/C3 typed 0.01 | 0 | 100 -> MATCH
   page: ["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."]
   mine: ["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."]
   errors: ["","",""]
C2/C3 typed 12,50 | 20 | 3 -> MATCH
   page: ["Bill total: 12.50","Tip percent: 20","Number of people: 3","Tip amount: 2.50","Total with tip: 15.00","3 people pay 5.00 each"]
   mine: ["Bill total: 12.50","Tip percent: 20","Number of people: 3","Tip amount: 2.50","Total with tip: 15.00","3 people pay 5.00 each"]
   errors: ["","",""]
C2/C3 typed 0.01 | 100 | 1 -> MATCH
   page: ["Bill total: 0.01","Tip percent: 100","Number of people: 1","Tip amount: 0.01","Total with tip: 0.02","1 person pays 0.02"]
   mine: ["Bill total: 0.01","Tip percent: 100","Number of people: 1","Tip amount: 0.01","Total with tip: 0.02","1 person pays 0.02"]
   errors: ["","",""]
C2/C3 typed 0.01 | 50 | 1 -> MATCH
   page: ["Bill total: 0.01","Tip percent: 50","Number of people: 1","Tip amount: 0.01","Total with tip: 0.02","1 person pays 0.02"]
   mine: ["Bill total: 0.01","Tip percent: 50","Number of people: 1","Tip amount: 0.01","Total with tip: 0.02","1 person pays 0.02"]
   errors: ["","",""]
C2/C3 typed 0.03 | 50 | 2 -> MATCH
   page: ["Bill total: 0.03","Tip percent: 50","Number of people: 2","Tip amount: 0.02","Total with tip: 0.05","1 person pays 0.03","1 person pays 0.02","Your group decides who pays the higher amount."]
   mine: ["Bill total: 0.03","Tip percent: 50","Number of people: 2","Tip amount: 0.02","Total with tip: 0.05","1 person pays 0.03","1 person pays 0.02","Your group decides who pays the higher amount."]
   errors: ["","",""]
console/page errors: []
requests after all cases (playwright): 13 distinct: ["GET file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html"]
```

- C1: 1 request in both request logs; the first test of C2 passes. PASS.
- C2: all 5 named tests match, in the order C2 gives, with no other text in the result. PASS.

### Command 2 — `node c3.js` (C3 sweeps)

The script typed into the page's own fields and read the page's own result. It compared every line with my code. It also summed the payments read from the page and checked their spread and order. The sweeps set each field with Playwright `fill()` (focus, then 1 `input` event). A sample of 136 cases was typed key by key. The label "1 people" in the output is my script's wording, not the page's.

My first run stopped after 20,500 cases on an error in my own script: my filter took the sentence "Your group decides who pays the higher amount." for a payment line. I fixed my filter and ran the whole sweep again. The output of the stopped run is attached as `c3-first-run-stopped-by-auditor-script-error.txt`. Complete output of the full run:

```text
sweep A tip 0, 1 person, bills 0.01..50.00: 5000 cases; running mismatches 0, invariant failures 0
sweep A tip 15, 1 person, bills 0.01..50.00: 5000 cases; running mismatches 0, invariant failures 0
sweep A tip 18, 1 person, bills 0.01..50.00: 5000 cases; running mismatches 0, invariant failures 0
sweep A tip 20, 1 person, bills 0.01..50.00: 5000 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 1 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 2 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 3 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 4 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 5 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 6 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 7 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 8 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 9 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 10 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 11 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
sweep B tip 18, 12 people, bills 0.01..5.00: 500 cases; running mismatches 0, invariant failures 0
key-by-key sample: 136 cases
TOTAL cases 26136; mismatches against auditor's code 0; sum/spread/order invariant failures 0; seconds 1027
```

- C3: 26,000 sweep cases, 136 key-by-key cases and the 3 spot cases (in command 1): 0 mismatches. PASS.

### Command 3 — `node c4.js` (C4, each input, in the browser)

For each input: reload; type valid values in the other 2 fields (bill `20.00`, tip `10`, people `2`); click the field under test; type the value; read the page; leave the field; read the page again. Characters outside ASCII print as `U+XXXX`. My printer trims plain spaces at the ends of a value: the second bill `12.50`, the second tip `18` and the people `4` that follows `02` were typed with 1 space before and 1 after. A screenshot was saved for each line marked NOT AS C4 (`c4-<n>-<field>.png`).

```text
Each line: verdict | field and typed value | message/result while the cursor is in the field | message/result after leaving the field | bill, tip, people shown in the result. M1, M2 ... are the messages listed at the end.
--- must get a message and no result
as C4 | bill "" | in field none/none | left M1/none
as C4 | bill "abc" | in field M2/none | left M2/none
as C4 | bill "12a" | in field M2/none | left M2/none
as C4 | bill "1,000.00" | in field M2/none | left M2/none
as C4 | bill "1.000,00" | in field M2/none | left M2/none
as C4 | bill "1e3" | in field M2/none | left M2/none
as C4 | bill "10." | in field none/none | left M2/none
as C4 | bill "10," | in field none/none | left M2/none
as C4 | bill ".5" | in field M2/none | left M2/none
as C4 | bill ",5" | in field M2/none | left M2/none
as C4 | bill "$12" | in field M2/none | left M2/none
as C4 | bill "12$" | in field M2/none | left M2/none
as C4 | bill "U+20AC 12" | in field M2/none | left M2/none
as C4 | bill "U+00A3 12.50" | in field M2/none | left M2/none
as C4 | bill "12 U+20AC" | in field M2/none | left M2/none
as C4 | bill "-5" | in field M2/none | left M2/none
as C4 | bill "-0.01" | in field M2/none | left M2/none
as C4 | bill "0" | in field M3/none | left M3/none
as C4 | bill "0.00" | in field M3/none | left M3/none
as C4 | bill "0,0" | in field M3/none | left M3/none
as C4 | bill "000" | in field M3/none | left M3/none
as C4 | bill "1000000.01" | in field M4/none | left M4/none
as C4 | bill "1000001" | in field M4/none | left M4/none
as C4 | bill "99999999999999999999" | in field M4/none | left M4/none
as C4 | bill "1.234" | in field M2/none | left M2/none
as C4 | bill "12,345" | in field M2/none | left M2/none
as C4 | bill "0.001" | in field M2/none | left M2/none
as C4 | bill "1 000" | in field M2/none | left M2/none
as C4 | bill "1 2" | in field M2/none | left M2/none
as C4 | bill "12..5" | in field M2/none | left M2/none
as C4 | bill "1.2.3" | in field M2/none | left M2/none
as C4 | bill "+12" | in field M2/none | left M2/none
as C4 | bill "12%" | in field M2/none | left M2/none
as C4 | bill "0x10" | in field M2/none | left M2/none
as C4 | bill "Infinity" | in field M2/none | left M2/none
as C4 | bill "NaN" | in field M2/none | left M2/none
as C4 | bill "U+0661 U+0662 U+0663 abc" | in field M2/none | left M2/none
as C4 | tip "" | in field none/none | left M5/none
as C4 | tip "101" | in field M6/none | left M6/none
as C4 | tip "-1" | in field M6/none | left M6/none
as C4 | tip "18.0" | in field M6/none | left M6/none
as C4 | tip "18,5" | in field M6/none | left M6/none
as C4 | tip "1e1" | in field M6/none | left M6/none
as C4 | tip "+4" | in field M6/none | left M6/none
as C4 | tip "4." | in field M6/none | left M6/none
as C4 | tip "abc" | in field M6/none | left M6/none
as C4 | tip "18%" | in field M6/none | left M6/none
as C4 | tip "1 8" | in field M6/none | left M6/none
as C4 | tip "100.0" | in field M6/none | left M6/none
as C4 | tip "1000" | in field M6/none | left M6/none
as C4 | tip "0.5" | in field M6/none | left M6/none
as C4 | tip "00101" | in field M6/none | left M6/none
as C4 | tip "99999999999999999999" | in field M6/none | left M6/none
as C4 | people "" | in field none/none | left M7/none
as C4 | people "0" | in field M8/none | left M8/none
as C4 | people "00" | in field M8/none | left M8/none
as C4 | people "101" | in field M8/none | left M8/none
as C4 | people "-1" | in field M8/none | left M8/none
as C4 | people "18.0" | in field M8/none | left M8/none
as C4 | people "18,5" | in field M8/none | left M8/none
as C4 | people "1e1" | in field M8/none | left M8/none
as C4 | people "+4" | in field M8/none | left M8/none
as C4 | people "4." | in field M8/none | left M8/none
as C4 | people "abc" | in field M8/none | left M8/none
as C4 | people "2.0" | in field M8/none | left M8/none
as C4 | people "1.5" | in field M8/none | left M8/none
as C4 | people "two" | in field M8/none | left M8/none
as C4 | people "1000" | in field M8/none | left M8/none
--- must give a result
as C4 | bill "12.50" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "12,50" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "12.5" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "12" | in field none/RESULT | left none/RESULT | 12.00, 10, 2
as C4 | bill "0.01" | in field none/RESULT | left none/RESULT | 0.01, 10, 2
as C4 | bill "1000000.00" | in field none/RESULT | left none/RESULT | 1000000.00, 10, 2
as C4 | bill "1000000" | in field none/RESULT | left none/RESULT | 1000000.00, 10, 2
as C4 | bill "0012.50" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "12.50" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+0009 12.50" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+00A0 12.50U+00A0" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+200B 12.50U+200B" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+FEFF 12.50" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+2060 12.50U+200D" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+FF11 U+FF12 U+FF0E U+FF15 U+FF10" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+FF11 U+FF12 U+FF0C U+FF15 U+FF10" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+0661 U+0662 .U+0665 U+0660" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+0661 U+0662 U+066B U+0665 U+0660" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+06F1 U+06F2 .U+06F5 U+06F0" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+06F1 U+06F2 U+066B U+06F5 U+06F0" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | bill "U+FF11 U+FF12 U+FF0E U+FF15" | in field none/RESULT | left none/RESULT | 12.50, 10, 2
as C4 | tip "0" | in field none/RESULT | left none/RESULT | 20.00, 0, 2
as C4 | tip "100" | in field none/RESULT | left none/RESULT | 20.00, 100, 2
as C4 | tip "18" | in field none/RESULT | left none/RESULT | 20.00, 18, 2
as C4 | tip "007" | in field none/RESULT | left none/RESULT | 20.00, 7, 2
as C4 | tip "18" | in field none/RESULT | left none/RESULT | 20.00, 18, 2
as C4 | tip "U+FF11 U+FF18" | in field none/RESULT | left none/RESULT | 20.00, 18, 2
as C4 | tip "U+0661 U+0668" | in field none/RESULT | left none/RESULT | 20.00, 18, 2
as C4 | tip "U+06F1 U+06F8" | in field none/RESULT | left none/RESULT | 20.00, 18, 2
as C4 | tip "U+200B 18U+200B" | in field none/RESULT | left none/RESULT | 20.00, 18, 2
as C4 | people "1" | in field none/RESULT | left none/RESULT | 20.00, 10, 1
as C4 | people "100" | in field none/RESULT | left none/RESULT | 20.00, 10, 100
as C4 | people "02" | in field none/RESULT | left none/RESULT | 20.00, 10, 2
as C4 | people "4" | in field none/RESULT | left none/RESULT | 20.00, 10, 4
as C4 | people "U+FF14" | in field none/RESULT | left none/RESULT | 20.00, 10, 4
as C4 | people "U+0664" | in field none/RESULT | left none/RESULT | 20.00, 10, 4
as C4 | people "U+06F4" | in field none/RESULT | left none/RESULT | 20.00, 10, 4
as C4 | people "U+200B 4U+FEFF" | in field none/RESULT | left none/RESULT | 20.00, 10, 4
--- invisible characters at either end beyond the 5 the script names (C4: "Spaces and invisible characters at either end are ignored")
NOT AS C4 | bill "12.50U+200E" (LEFT-TO-RIGHT MARK after) | in field M2/none | left M2/none
NOT AS C4 | bill "U+200F 12.50" (RIGHT-TO-LEFT MARK before) | in field M2/none | left M2/none
NOT AS C4 | bill "U+202A 12.50U+202C" (LRE ... PDF) | in field M2/none | left M2/none
NOT AS C4 | bill "U+202B U+0661 U+0662 U+066B U+0665 U+0660 U+202C" (RLE ... PDF, Arabic-Indic) | in field M2/none | left M2/none
NOT AS C4 | bill "U+2066 12.50U+2069" (LRI ... PDI) | in field M2/none | left M2/none
NOT AS C4 | bill "U+061C 12.50" (ARABIC LETTER MARK before) | in field M2/none | left M2/none
NOT AS C4 | bill "12.50U+00AD" (SOFT HYPHEN after) | in field M2/none | left M2/none
NOT AS C4 | bill "U+180E 12.50" (MONGOLIAN VOWEL SEPARATOR before) | in field M2/none | left M2/none
NOT AS C4 | bill "12.50U+2063" (INVISIBLE SEPARATOR after) | in field M2/none | left M2/none
NOT AS C4 | bill "12.50U+2061" (FUNCTION APPLICATION after) | in field M2/none | left M2/none
NOT AS C4 | bill "U+034F 12.50" (COMBINING GRAPHEME JOINER before) | in field M2/none | left M2/none
NOT AS C4 | bill "12.50U+FE0F" (VARIATION SELECTOR-16 after) | in field M2/none | left M2/none
NOT AS C4 | bill "12.50U+115F" (HANGUL CHOSEONG FILLER after) | in field M2/none | left M2/none
NOT AS C4 | bill "12.50U+3164" (HANGUL FILLER after) | in field M2/none | left M2/none
NOT AS C4 | bill "12.50U+2800" (BRAILLE BLANK after) | in field M2/none | left M2/none
NOT AS C4 | tip "18U+200E" (LRM after) | in field M6/none | left M6/none
NOT AS C4 | tip "U+200F U+0661 U+0668" (RLM before Arabic-Indic) | in field M6/none | left M6/none
NOT AS C4 | people "4U+200E" (LRM after) | in field M8/none | left M8/none
NOT AS C4 | people "U+200F U+0664 U+200F" (RLM both ends, Arabic-Indic) | in field M8/none | left M8/none
--- characters that are neither full-width nor Arabic-Indic (C4 lists only those 2 kinds as counting as the plain form)
NOT AS C4 | bill "U+00B2" (SUPERSCRIPT TWO) | in field none/RESULT | left none/RESULT | 2.00, 10, 2
NOT AS C4 | bill "U+2460" (CIRCLED DIGIT ONE) | in field none/RESULT | left none/RESULT | 1.00, 10, 2
NOT AS C4 | bill "U+2473" (CIRCLED NUMBER TWENTY) | in field none/RESULT | left none/RESULT | 20.00, 10, 2
NOT AS C4 | bill "U+D835 U+DFCF U+D835 U+DFD0" (MATHEMATICAL BOLD DIGITS) | in field none/RESULT | left none/RESULT | 12.00, 10, 2
NOT AS C4 | bill "12U+2024 50" (ONE DOT LEADER as mark) | in field none/RESULT | left none/RESULT | 12.50, 10, 2
NOT AS C4 | bill "12U+FE52 50" (SMALL FULL STOP as mark) | in field none/RESULT | left none/RESULT | 12.50, 10, 2
NOT AS C4 | bill "12U+FE50 50" (SMALL COMMA as mark) | in field none/RESULT | left none/RESULT | 12.50, 10, 2
NOT AS C4 | bill "U+2488 5" (DIGIT ONE FULL STOP) | in field none/RESULT | left none/RESULT | 1.50, 10, 2
NOT AS C4 | bill "U+32BF" (CIRCLED NUMBER FIFTY) | in field none/RESULT | left none/RESULT | 50.00, 10, 2
as C4 | bill "U+0967 U+0968" (DEVANAGARI digits) | in field M2/none | left M2/none
as C4 | bill "U+FF11 U+FF12 U+3002 U+FF15 U+FF10" (IDEOGRAPHIC FULL STOP as mark) | in field M2/none | left M2/none
as C4 | bill "12U+060C 50" (ARABIC COMMA as mark) | in field M2/none | left M2/none
as C4 | bill "U+0661 U+066C U+0660 U+0660 U+0660" (ARABIC THOUSANDS SEPARATOR) | in field M2/none | left M2/none
as C4 | bill "U+FF11 U+FF0C U+FF10 U+FF10 U+FF10 U+FF0E U+FF10 U+FF10" (full-width thousands) | in field M2/none | left M2/none
NOT AS C4 | bill "U+2081 U+2082" (SUBSCRIPT digits) | in field none/RESULT | left none/RESULT | 12.00, 10, 2
as C4 | bill "U+3359" (SQUARE 1 O CLOCK) | in field M2/none | left M2/none
as C4 | bill "U+FF11 U+FF45 U+FF13" (full-width 1e3) | in field M2/none | left M2/none
as C4 | bill "U+FF04 U+FF11 U+FF12" (full-width dollar) | in field M2/none | left M2/none
as C4 | bill "U+FF0D U+FF15" (full-width minus) | in field M2/none | left M2/none
as C4 | bill "U+FF0B U+FF14" (full-width plus) | in field M2/none | left M2/none
NOT AS C4 | tip "U+00B2" (SUPERSCRIPT TWO) | in field none/RESULT | left none/RESULT | 20.00, 2, 2
NOT AS C4 | tip "U+2460 U+2467" (CIRCLED DIGITS) | in field none/RESULT | left none/RESULT | 20.00, 18, 2
NOT AS C4 | tip "U+2471" (CIRCLED NUMBER EIGHTEEN) | in field none/RESULT | left none/RESULT | 20.00, 18, 2
as C4 | tip "U+FF0B U+FF14" (full-width plus) | in field M6/none | left M6/none
as C4 | tip "U+FF14 U+FF0E" (full-width 4.) | in field M6/none | left M6/none
as C4 | tip "U+FF11 U+FF18 U+FF0E U+FF10" (full-width 18.0) | in field M6/none | left M6/none
as C4 | tip "U+0661 U+0668 U+066B U+0665" (Arabic 18,5) | in field M6/none | left M6/none
NOT AS C4 | people "U+2463" (CIRCLED DIGIT FOUR) | in field none/RESULT | left none/RESULT | 20.00, 10, 4
NOT AS C4 | people "U+2074" (SUPERSCRIPT FOUR) | in field none/RESULT | left none/RESULT | 20.00, 10, 4
NOT AS C4 | people "U+2469" (CIRCLED NUMBER TEN) | in field none/RESULT | left none/RESULT | 20.00, 10, 10
--- messages
M1 = "Enter the bill total."
M2 = "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50"
M3 = "Enter an amount above 0."
M4 = "Enter 1000000.00 or less."
M5 = "Enter the tip percent. Enter 0 for no tip."
M6 = "Enter a whole number from 0 to 100, in digits only."
M7 = "Enter the number of people."
M8 = "Enter a whole number from 1 to 100, in digits only."
```

- 120 inputs behaved as C4 says, including every input that C4 names. 35 did not: FINDINGS 1 and 2.

### Command 4 — `node c5.js` (the 4 states of C4; C5; C6; C7)

```text
=== C4 states
first open | values ["","",""] | errors ["","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus 
clicked into bill, typed nothing | values ["","",""] | errors ["","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus bill
typed 4 in bill; tip and people untouched (incomplete) | values ["4","",""] | errors ["","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus bill
tabbed to tip (bill left valid) | values ["4","",""] | errors ["","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus tip
tabbed past tip without typing (tip left empty) | values ["4","",""] | errors ["","Enter the tip percent. Enter 0 for no tip.",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus people
typed x in people | values ["4","","x"] | errors ["","Enter the tip percent. Enter 0 for no tip.","Enter a whole number from 1 to 100, in digits only."] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus people
deleted x (people typed in, now empty) | values ["4","",""] | errors ["","Enter the tip percent. Enter 0 for no tip.","Enter the number of people."] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus people
people 3, tip 1 | values ["4","1","3"] | errors ["","",""] | result ["Bill total: 4.00","Tip percent: 1","Number of people: 3","Tip amount: 0.04","Total with tip: 4.04","2 people pay 1.35 each","1 person pays 1.34","Your group decides who pays the higher amount."] | guide "Type the bill total, the tip percent and the number of people." | focus tip
tip 15 (recomputed) | values ["4","15","3"] | errors ["","",""] | result ["Bill total: 4.00","Tip percent: 15","Number of people: 3","Tip amount: 0.60","Total with tip: 4.60","1 person pays 1.54","2 people pay 1.53 each","Your group decides who pays the higher amount."] | guide "Type the bill total, the tip percent and the number of people." | focus tip
tip 1 again (recomputed) | values ["4","1","3"] | errors ["","",""] | result ["Bill total: 4.00","Tip percent: 1","Number of people: 3","Tip amount: 0.04","Total with tip: 4.04","2 people pay 1.35 each","1 person pays 1.34","Your group decides who pays the higher amount."] | guide "Type the bill total, the tip percent and the number of people." | focus tip
bill "4." with cursor in bill | values ["4.","1","3"] | errors ["","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus bill
bill "4.5" | values ["4.5","1","3"] | errors ["","",""] | result ["Bill total: 4.50","Tip percent: 1","Number of people: 3","Tip amount: 0.05","Total with tip: 4.55","2 people pay 1.52 each","1 person pays 1.51","Your group decides who pays the higher amount."] | guide "Type the bill total, the tip percent and the number of people." | focus bill
bill "4." again, cursor in bill | values ["4.","1","3"] | errors ["","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus bill
left bill for tip with "4." | values ["4.","1","3"] | errors ["Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus tip
clicked back into bill holding "4." (cursor in bill again) | values ["4.","1","3"] | errors ["Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus bill
moved the caret with the arrow keys, cursor still in bill | values ["4.","1","3"] | errors ["Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus bill
typed 5 -> "4.5" | values ["4.5","1","3"] | errors ["","",""] | result ["Bill total: 4.50","Tip percent: 1","Number of people: 3","Tip amount: 0.05","Total with tip: 4.55","2 people pay 1.52 each","1 person pays 1.51","Your group decides who pays the higher amount."] | guide "Type the bill total, the tip percent and the number of people." | focus bill
values inserted as text (paste / IME path) | values ["100.00","18","4"] | errors ["","",""] | result ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"] | guide "Type the bill total, the tip percent and the number of people." | focus people
=== C5 markup
{
 "labels": [
  {
   "for": "bill",
   "text": "Bill total, tax included",
   "visible": true,
   "h": 24,
   "targetExists": true
  },
  {
   "for": "tip",
   "text": "Tip percent",
   "visible": true,
   "h": 24,
   "targetExists": true
  },
  {
   "for": "people",
   "text": "Number of people",
   "visible": true,
   "h": 24,
   "targetExists": true
  }
 ],
 "inputs": [
  {
   "id": "bill",
   "type": "text",
   "inputmode": "decimal",
   "autocomplete": "off",
   "describedby": "bill-error",
   "accessibleLabel": "Bill total, tax included"
  },
  {
   "id": "tip",
   "type": "text",
   "inputmode": "numeric",
   "autocomplete": "off",
   "describedby": "tip-error",
   "accessibleLabel": "Tip percent"
  },
  {
   "id": "people",
   "type": "text",
   "inputmode": "numeric",
   "autocomplete": "off",
   "describedby": "people-error",
   "accessibleLabel": "Number of people"
  }
 ],
 "errorParas": [
  {
   "id": "bill-error",
   "role": "alert"
  },
  {
   "id": "tip-error",
   "role": "alert"
  },
  {
   "id": "people-error",
   "role": "alert"
  }
 ],
 "alerts": [
  "bill-error",
  "tip-error",
  "people-error"
 ],
 "result": {
  "role": "status",
  "live": "polite"
 },
 "statusCount": 1,
 "inputCount": 3
}
=== C5 count of changes while a person types in another field
setup A: bill "abc" (message), people "0" (message), tip untouched | values ["abc","","0"] | errors ["Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50","","Enter a whole number from 1 to 100, in digits only."] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus people
A: typed 1,8,backspace,5 in tip -> mutation records (bill-error, tip-error, people-error, result): {"bill":0,"tip":0,"people":0,"result":0}
A2: then typed x,9,y in tip (tip message appears, clears, appears) -> {"bill":0,"tip":1,"people":0,"result":0}
setup B: valid result showing | values ["100.00","18","4"] | errors ["","",""] | result ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"] | guide "Type the bill total, the tip percent and the number of people." | focus people
B: in bill typed space, backspace, backspace, 0 (100.00 -> "100.00 " -> 100.00 -> 100.0 -> 100.00; same amount each time) -> {"bill":0,"tip":0,"people":0,"result":0}
B2: prefixed tip and people with 0 (018, 04), then left the fields -> {"bill":0,"tip":0,"people":0,"result":0}
after B2 | values ["100.00","018","04"] | errors ["","",""] | result ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"] | guide "Type the bill total, the tip percent and the number of people." | focus 
B3: tip 018 -> 01 -> 015 (result changes twice; error paragraphs must stay at 0) -> {"bill":0,"tip":0,"people":0,"result":4}
C: bill "12." left (message showing); typed tip 18 and people 4 -> {"bill":0,"tip":0,"people":0,"result":0}
after C | values ["12.","18","4"] | errors ["Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50","",""] | result [] | guide "Type the bill total, the tip percent and the number of people." | focus people
=== C5 widths
width 360 first-open: {"innerWidth":360,"clientWidth":360,"docScrollWidth":360,"bodyScrollWidth":360,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 360 errors: {"innerWidth":360,"clientWidth":360,"docScrollWidth":360,"bodyScrollWidth":360,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 360 result-2-lines: {"innerWidth":360,"clientWidth":360,"docScrollWidth":360,"bodyScrollWidth":360,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 360 long-input: {"innerWidth":360,"clientWidth":360,"docScrollWidth":360,"bodyScrollWidth":360,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 768 first-open: {"innerWidth":768,"clientWidth":768,"docScrollWidth":768,"bodyScrollWidth":768,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 768 errors: {"innerWidth":768,"clientWidth":768,"docScrollWidth":768,"bodyScrollWidth":768,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 768 result-2-lines: {"innerWidth":768,"clientWidth":768,"docScrollWidth":768,"bodyScrollWidth":768,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 768 long-input: {"innerWidth":768,"clientWidth":768,"docScrollWidth":768,"bodyScrollWidth":768,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 1280 first-open: {"innerWidth":1280,"clientWidth":1280,"docScrollWidth":1280,"bodyScrollWidth":1280,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 1280 errors: {"innerWidth":1280,"clientWidth":1280,"docScrollWidth":1280,"bodyScrollWidth":1280,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 1280 result-2-lines: {"innerWidth":1280,"clientWidth":1280,"docScrollWidth":1280,"bodyScrollWidth":1280,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
width 1280 long-input: {"innerWidth":1280,"clientWidth":1280,"docScrollWidth":1280,"bodyScrollWidth":1280,"elementsOutside":0,"worst":null,"scrollXAfterScrollTo500":0}
=== C6 JavaScript off
visible text of the page: "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page."
  #guide visible: false
  #fields visible: false
  #bill visible: false
  #tip visible: false
  #people visible: false
  noscript p visible: true
  h1 visible: true
=== C7
CSP tag present word for word: true ; count of "Content-Security-Policy" in source: 1
  source occurrences of "localStorage": 0
  source occurrences of "sessionStorage": 0
  source occurrences of "indexedDB": 0
  source occurrences of "document.cookie": 0
  source occurrences of "caches": 0
  source occurrences of "fetch": 0
  source occurrences of "XMLHttpRequest": 0
  source occurrences of "sendBeacon": 0
  source occurrences of "WebSocket": 0
  source occurrences of "EventSource": 0
  source occurrences of "http://": 0
  source occurrences of "https://": 0
  source occurrences of "src=": 0
  source occurrences of "href=": 0
  source occurrences of "import": 0
  source occurrences of "<form": 0
  source occurrences of "<img": 0
  source occurrences of "<link": 0
  source occurrences of "url(": 0
  autocomplete="off" occurrences: 3 ; <input occurrences: 3
fetch('https://example.com') -> REJECTED TypeError: Failed to fetch
new Image().src -> ERROR (blocked)
sendBeacon -> true
console messages: [
 "error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.",
 "error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy.",
 "error: Loading the image 'https://example.com/x.png' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'img-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.",
 "error: Connecting to 'https://example.com/b' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked."
]
request log: ["file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html","https://example.com/x.png","FAILED https://example.com/x.png csp"]
storage after use: {"cookie":"","local":0,"session":0}
before reload: ["100.00","18","4"] ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"]
after F5 reload: values ["100.00","18","4"] errors ["","",""] result ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"]
after leaving to about:blank and pressing Back: values ["","",""] errors ["","",""] result []
```

- C4 states: first open, incomplete, error and result behave as C4 says, except the line `clicked back into bill holding "4."`: FINDING 3. Screenshots `c4-state-incomplete.png`, `c4-state-error.png`, `c4-state-result.png`, `c4-waiting-cursor-in-bill.png`, `c4-waiting-left-bill.png`, `c4-waiting-cursor-back-in-bill.png`.
- C5: at 360, 768 and 1280 pixels, in 4 states each, 0 elements reach outside the window and the page does not scroll sideways (12 screenshots `c5-<width>-<state>.png`). 3 visible labels; the bill's label reads "Bill total, tax included". 3 error paragraphs carry `role="alert"`; the result carries `role="status"`. `inputmode` is `decimal`, `numeric`, `numeric`. Changes inside the other error paragraphs and the result while I typed in another field: 0 (runs A, B, B2 and C). PASS for what C5 tests. A real phone and a screen reader: UNVERIFIED; I have neither.
- C6: with JavaScript off, the page shows the heading and "This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page." It shows no guidance and no field. Screenshot `c6-javascript-off.png`. PASS.
- C7: the tag is present word for word; 3 fields carry `autocomplete="off"`; the 5 words are absent from the source; `fetch('https://example.com')` was rejected and Chrome's console names the Content Security Policy. PASS for those parts. The line "after F5 reload" in this output is void: see command 5.

### Command 5 — `node c7b.js` (C7, reload)

The F5 key that my script sent in command 4 did not reload the page: a marker I set in the page survived it. That check proved nothing. I ran the reload again in 3 ways by script, and a 4th time by hand (T1, step 3).

```text
after synthetic F5 key: marker same document (a marker that survives means the key did not reload the page; the check is void)
after Page.reload (normal reload): marker undefined values ["","",""] errors ["","",""] result [] navigation type reload
after Page.reload ignoring cache (hard reload): values ["","",""] errors ["","",""] result []
after location.reload(): values ["","",""] errors ["","",""] result []
```

- C7, "a reload in Chrome clears every field": PASS (Chrome's reload button by hand; `Page.reload`; hard reload; `location.reload()`; Back from another page). Firefox: UNVERIFIED; it is not on this machine and C7 says it is not tested.

### Other commands

```text
$ git clone --branch devin/hinshitsu-build https://github.com/CatCorner22/devin.git
Cloning into 'devin'...
$ git log --format='%H %ad %s' --date=iso | grep -n 'example run: round 2 swarm scopes'
2:1b6cf7695510718d4b21836b0756749400da0c54 2026-11-18 17:13:31 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in
3:d3fecb7bb267d611c64368b1c9b91402f5544c6e 2026-11-18 17:13:24 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger filled in
4:9783ee2a7133facb2130f65a7f5e57c134df9f7d 2026-11-18 17:13:16 +0000 example run: round 2 swarm scopes; the copy under review
$ git checkout -q 1b6cf7695510718d4b21836b0756749400da0c54 && git log -1 --format='%H %s'
1b6cf7695510718d4b21836b0756749400da0c54 example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in
$ sha256sum skills/hinshitsu/example/index.html        (before the first check)
e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0  skills/hinshitsu/example/index.html
$ wc -lc skills/hinshitsu/example/index.html
 195 8769 skills/hinshitsu/example/index.html
$ git status --short | wc -l && git rev-parse HEAD && sha256sum skills/hinshitsu/example/index.html        (after the last check)
0
1b6cf7695510718d4b21836b0756749400da0c54
e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0  skills/hinshitsu/example/index.html
$ grep -c 'DELIVERY' skills/hinshitsu/example/run/AUDIT-LOG.md
0
$ ls skills/hinshitsu/example/run
AUDIT-LOG.md CONNECTIONS.md COVERAGE-LEDGER.md FRAMEWORK.md GAUGE.svg MINDMAP.md SESSION-STATE.md audits evidence memos prompts review
```

I also ran `cat -n` on `index.html`, `sed -n 225,262p` on `AUDIT-LOG.md`, and `grep` on `GLOSSARY.md` and `AUDIT-LOG.md`, to read the lines listed under "Files". Their output is those lines. I ran 1 Node command outside the browser to try the 2 fixes I propose; FINDINGS 1 and 2 say what it showed.

## Findings

### 1. An invisible character at either end of a value gets a message and no result

- **Class:** BLOCKER (part (a): the DELIVERABLE fails a CRITERION).
- **Where:** `skills/hinshitsu/example/index.html`, line 76, the last `replace` in `plain`. It removes white space and 5 characters only: U+200B, U+200C, U+200D, U+2060, U+FEFF.
- **Trigger:** open the page; type `10` as tip and `2` as people; put `12.50` followed by U+200E (LEFT-TO-RIGHT MARK) into the bill field. The bill field shows "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" and no result shows. The same happens with each of these at an end of the bill: U+200F; U+202A with U+202C; U+202B with U+202C around `١٢٫٥٠`; U+2066 with U+2069; U+061C; U+00AD; U+180E; U+2061; U+2063; U+034F; U+FE0F; U+115F; U+3164; U+2800. Tip `18` + U+200E and people `4` + U+200E show "Enter a whole number from … in digits only." These are the 19 lines under "invisible characters at either end" in command 3. The person sees a correct amount and a message that calls it wrong. I inserted the characters as text; I did not copy a value from another app. The direction marks (U+200E, U+200F, U+202A to U+202C, U+2066 to U+2069, U+061C) are the ones that right-to-left text carries around numbers.
- **Violates:** C4, "Spaces and invisible characters at either end are ignored".
- **Proposed fix:** in line 76, remove every default-ignorable code point at the ends: `.replace(/^[\s\p{Default_Ignorable_Code_Point}]+|[\s\p{Default_Ignorable_Code_Point}]+$/gu, "")`. I tried this expression in Node 22, outside the page: it strips 18 of the 19 inputs. It does not strip U+2800 (BRAILLE PATTERN BLANK), which is a blank symbol. Either add U+2800 to the class, or have C4 list the characters it means by "invisible".

### 2. Characters that are neither full-width nor Arabic-Indic count as digits and decimal marks

- **Class:** BLOCKER (part (a)), if C4's list of 2 kinds is complete. If the ORCHESTRATOR reads "digits" as any character that Unicode folds to a digit, the page is right and C4's wording is the DEFECT.
- **Where:** `skills/hinshitsu/example/index.html`, line 72, `text.normalize("NFKC")`.
- **Trigger:** open the page; type `10` as tip and `2` as people; put `²` (U+00B2) into the bill field. No message shows, and the result shows "Bill total: 2.00". Also as bill: `①` gives 1.00; `⑳` gives 20.00; `㊿` gives 50.00; `₁₂` gives 12.00; `𝟏𝟐` gives 12.00; `⒈5` gives 1.50; `12․50` (U+2024), `12﹒50` (U+FE52) and `12﹐50` (U+FE50) give 12.50. As tip: `²` gives 2; `①⑧` and `⑱` give 18. As people: `④` and `⁴` give 4; `⑩` gives 10. These are the 16 lines marked NOT AS C4 under "characters that are neither full-width nor Arabic-Indic" in command 3.
- **Violates:** C4: "a value that fails the formats below shows a message … and no result shows"; "A whole number is digits only"; "a full-width or Arabic-Indic digit or decimal mark counts as its plain form" (2 kinds, no others).
- **Proposed fix:** replace `normalize("NFKC")` with a map of the characters C4 names: U+FF10 to U+FF19 become `0` to `9`, U+FF0E becomes `.`, U+FF0C becomes `,`. Keep lines 73 to 75. I tried this map in Node 22, outside the page: `１２．５０` becomes `12.50`, and `²` and `①` stay as they are, so they would get a message. Add `²`, `①` and `12․50` to the inputs of C4 that get a message.

### 3. The message for `12.` stays when the cursor returns to the bill field

- **Class:** BLOCKER (part (a)), on the plain reading of the sentence. If C4 means only the time before the person first leaves the field, the page is right and C4's wording is the DEFECT.
- **Where:** `skills/hinshitsu/example/index.html`, lines 178 and 179. The page listens for `input` and `blur`, not for `focus`. Line 121 decides "the person is typing" from `document.activeElement`, but nothing runs `update()` when the field gets the cursor.
- **Trigger:** open the page; type `4.` in the bill field (no message, no result: as C4 says); click the tip field (the bill's message shows: as C4 says); click the bill field again. Now the cursor is in the bill field, the field holds `4.`, and the message "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" still shows. It stays while the caret moves. It goes when the person types a digit. See command 4, the lines from `left bill for tip with "4."` to `moved the caret with the arrow keys`, and screenshot `c4-waiting-cursor-back-in-bill.png`. I did not test a switch to another window and back.
- **Violates:** C4, "While the bill field has the cursor, digits followed by a decimal mark and nothing else (`12.`) show no message and no result".
- **Proposed fix:** add `f.input.addEventListener("focus", update);` beside line 179. `update` writes a paragraph only when its text changes, so the count in C5 stays 0 for the other fields. I did not try this fix in the page. If the ORCHESTRATOR prefers the page as it is, reword C4: "until the person first leaves the bill field".

I found nothing else. I raise no FINDING against C1, C2, C3, C5, C6 or C7.

## Not examined

- **C8 — UNVERIFIED.** No delivery report exists at this commit: `AUDIT-LOG.md` has 0 `DELIVERY` entries, the RUN FOLDER lists no report file, and `SESSION-STATE.md` puts the run at S7. I could not follow the 3 checks or record a time. For the same reason I did not act as RECIPIENT 1 (the USER as reader).
- **A real phone and a screen reader (C5) — UNVERIFIED.** Neither is on this machine. I read the roles and counted the changes; I did not hear an announcement. The 360-pixel checks ran in desktop Chrome with a 360-pixel window, so I did not see which keyboard `inputmode` opens.
- **Firefox (C7) — UNVERIFIED.** It is not on this machine. I tested no browser other than Chrome 156 on Linux.
- **JavaScript off through Chrome's settings page.** I turned JavaScript off through the DevTools protocol, for 1 browser context.
- **A copy and paste from another app** (FINDING 1). I inserted the characters as text into the field.
- **Bills above 50.00, tips other than 0, 15, 18 and 20, and more than 12 people, in bulk.** C3 does not name them. I ran only the spot cases there.
- **The hosted page.** The scope says it is not hosted. I opened the file from disk only.
- **`review/index.html`, `audits/`, `evidence/`, `memos/`, `prompts/`, `FRAMEWORK.md`, `COVERAGE-LEDGER.md`, `CONNECTIONS.md`, `MINDMAP.md`, `GAUGE.svg`, and the rest of `AUDIT-LOG.md`.** My scope does not name them, and the lines I read did not send me to them.
- **Printing, zoom, dark mode, high-contrast mode, windows narrower than 360 pixels.** No CRITERION names them.
