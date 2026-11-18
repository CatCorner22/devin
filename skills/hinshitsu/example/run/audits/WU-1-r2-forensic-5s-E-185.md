devin-3b4fec4d99794f768ce5b636c55e2af2

# Forensic (5S) audit — `skills/hinshitsu/example/index.html`

## Scope received

You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: round 2 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Forensic (5S) auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Hunt for sloppiness: dead code, unused imports and variables, TODO and FIXME notes, placeholders, sample data, copy-paste drift (2 copies of 1 thing that no longer match), hardcoded values, leftover debug output, files that nothing references, and names that do not match what the thing does.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: `skills/hinshitsu/example/index.html`, all lines, SHA-256 e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0
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

### Files

- `skills/hinshitsu/example/index.html`, lines 1 to 195 (all), at commit `1b6cf7695510718d4b21836b0756749400da0c54` ("example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in"), the newest of 3 commits on `devin/hinshitsu-build` whose message begins with the named words.
- `skills/hinshitsu/GLOSSARY.md`, lines 53 to 59 and 91 to 93 (the 4 classes), by `grep`.
- `skills/hinshitsu/example/run/FRAMEWORK.md`, lines 1 to 56. Line 67 of `index.html` references "FRAMEWORK.md, part 4".
- `templates/FRAMEWORK.md` and `build-record/FRAMEWORK.md`: headings and a search for `splitBill` only (0 matches for `splitBill` in both), to find which `FRAMEWORK.md` line 67 means.

### Commands and output

1. Clone, find the commit, check out, confirm the SHA-256.

```
$ git clone --branch devin/hinshitsu-build https://github.com/CatCorner22/devin.git devin
Cloning into 'devin'...
$ git log --format='%H %ad %s' --date=iso | grep -n 'example run: round 2 swarm scopes'
1:1b6cf7695510718d4b21836b0756749400da0c54 2026-11-18 17:13:31 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in
2:d3fecb7bb267d611c64368b1c9b91402f5544c6e 2026-11-18 17:13:24 +0000 example run: round 2 swarm scopes; the copy under review; the probe's trigger filled in
3:9783ee2a7133facb2130f65a7f5e57c134df9f7d 2026-11-18 17:13:16 +0000 example run: round 2 swarm scopes; the copy under review
$ git checkout -q 1b6cf7695510718d4b21836b0756749400da0c54 && git log -1 --format='%H %s'
1b6cf7695510718d4b21836b0756749400da0c54 example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in
$ sha256sum skills/hinshitsu/example/index.html
e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0  skills/hinshitsu/example/index.html
$ wc -lc skills/hinshitsu/example/index.html
 195 8769 skills/hinshitsu/example/index.html
```

The SHA-256 matches the scope. After all checks, `git status --short | wc -l` printed `0` and `sha256sum` printed the same hash: I changed no file.

2. `cat -n skills/hinshitsu/example/index.html` — output is the file, 195 lines; I read every line.

3. Hygiene searches of `index.html`.

```
$ grep -n -i -E 'TODO|FIXME|XXX|HACK|console\.|debugger|alert\(|lorem|placeholder|sample|localStorage|sessionStorage|indexedDB|document\.cookie|caches' index.html
(no output; grep exit 1)
$ grep -n -P '[ \t]+$' index.html        (trailing spaces)
(no output)
$ grep -c -P '\t' index.html             (tabs)
0
$ grep -c $'\r' index.html               (carriage returns)
0
$ grep -n -P '[^\x00-\x7F]' index.html   (non-ASCII bytes)
(no output)
$ tail -c 1 index.html | xxd
00000000: 0a                                       .
```

4. `find . -name 'FRAMEWORK.md' -not -path './.git/*'` printed `./templates/FRAMEWORK.md`, `./build-record/FRAMEWORK.md`, `./skills/hinshitsu/example/run/FRAMEWORK.md`. `ls skills/hinshitsu skills/hinshitsu/example` printed `GLOSSARY.md SKILL.md example` and `index.html run`. `grep -n -E '^#|splitBill'` on the 3 files printed their headings; only the file under `example/run/` names `splitBill` (lines 17, 30, 31, 52). `sed -n 1,56p skills/hinshitsu/example/run/FRAMEWORK.md` printed that file's lines 1 to 56, which I read.

5. Browser run. Desktop Chrome for Testing 156.0.8078.47, the Chrome already running on my machine, driven by a Playwright script over its debugging port. The script opened `file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html`, typed into the page's 3 fields, and read the page's own text. My own reference code computes the tip, total and payments with `BigInt` and does not call the page's `splitBill`. Command: `node audit5s_v2.js`. Exit code 0. Complete output:

```
browser 156.0.8078.47
C1 requests: 1 ["GET file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html"]
console on load: [] pageerrors: []
names from the script that are own properties of window: MAX_BILL_CENTS MAX_TIP_PERCENT MAX_PEOPLE splitBill plain readAmount readWhole money payLine fields resultBox shownResult showResult update
C4 first open: {"vals":["","",""],"errs":["","",""],"inv":[null,null,null],"res":[],"resText":"","guide":"Type the bill total, the tip percent and the number of people.","fieldsHidden":false,"active":"BODY"}
--- C2 tests (typed key by key)
["100.00","18","4"] => ["Bill total: 100.00","Tip percent: 18","Number of people: 4","Tip amount: 18.00","Total with tip: 118.00","4 people pay 29.50 each"] errs ["","",""] MATCH
["0.30","15","1"] => ["Bill total: 0.30","Tip percent: 15","Number of people: 1","Tip amount: 0.05","Total with tip: 0.35","1 person pays 0.35"] errs ["","",""] MATCH
["10.10","15","1"] => ["Bill total: 10.10","Tip percent: 15","Number of people: 1","Tip amount: 1.52","Total with tip: 11.62","1 person pays 11.62"] errs ["","",""] MATCH
["12.25","18","1"] => ["Bill total: 12.25","Tip percent: 18","Number of people: 1","Tip amount: 2.21","Total with tip: 14.46","1 person pays 14.46"] errs ["","",""] MATCH
["0100.5","007","02"] => ["Bill total: 100.50","Tip percent: 7","Number of people: 2","Tip amount: 7.04","Total with tip: 107.54","2 people pay 53.77 each"] errs ["","",""] MATCH
["10.00","0","3"] => ["Bill total: 10.00","Tip percent: 0","Number of people: 3","Tip amount: 0.00","Total with tip: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the higher amount."] errs ["","",""] MATCH
["1000000.00","100","100"] => ["Bill total: 1000000.00","Tip percent: 100","Number of people: 100","Tip amount: 1000000.00","Total with tip: 2000000.00","100 people pay 20000.00 each"] errs ["","",""] MATCH
["0.01","0","100"] => ["Bill total: 0.01","Tip percent: 0","Number of people: 100","Tip amount: 0.00","Total with tip: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the higher amount."] errs ["","",""] MATCH
--- C3 sweep
sweep A cases 20000 mismatches 0
sweep B cases 6000 mismatches 0 seconds 145
--- C4 inputs (typed, then field left)
bill "" | with cursor: msg M1, result lines 0 | after leaving: msg M1, result lines 0
bill "abc" | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill "1,000.00" | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill "1.000,00" | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill "1e3" | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill "10." | with cursor: msg -, result lines 0 | after leaving: msg M2, result lines 0
bill "12." | with cursor: msg -, result lines 0 | after leaving: msg M2, result lines 0
bill "12," | with cursor: msg -, result lines 0 | after leaving: msg M2, result lines 0
bill ".5" | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill "$5" | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill  (U+0035 U+20AC) | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill "-5" | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill "0" | with cursor: msg M3, result lines 0 | after leaving: msg M3, result lines 0
bill "0.00" | with cursor: msg M3, result lines 0 | after leaving: msg M3, result lines 0
bill "1000000.01" | with cursor: msg M4, result lines 0 | after leaving: msg M4, result lines 0
bill "10000000" | with cursor: msg M4, result lines 0 | after leaving: msg M4, result lines 0
bill "1.234" | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill "12.50" | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill "12,50" | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill " 12.50 " | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+200B U+0031 U+0032 U+002E U+0035 U+0030 U+FEFF) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+FF11 U+FF12 U+FF0E U+FF15 U+FF10) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+FF11 U+FF12 U+FF0C U+FF15 U+FF10) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+0661 U+0662 U+066B U+0665 U+0660) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+0661 U+0662 U+002E U+0665 U+0660) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+06F1 U+06F2 U+066B U+06F5 U+06F0) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+200E U+0031 U+0032 U+002E U+0035 U+0030) | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill  (U+0031 U+0032 U+002E U+0035 U+0030 U+200F) | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill  (U+202A U+0031 U+0032 U+002E U+0035 U+0030 U+202C) | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill  (U+00AD U+0031 U+0032 U+002E U+0035 U+0030) | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill  (U+00A0 U+0031 U+0032 U+002E U+0035 U+0030 U+00A0) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+2460 U+2461) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.00
bill  (U+0031 U+00B2 U+002E U+0035) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+2488 U+0035) | with cursor: msg -, result lines 8 | after leaving: msg -, result lines 8, shows 1.50
bill  (U+1D7CF U+1D7D0) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.00
bill  (U+0031 U+0032 U+2024 U+0035) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 12.50
bill  (U+0967 U+0968) | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill "1 2" | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
bill  (U+0031 U+066C U+0030 U+0030 U+0030) | with cursor: msg M2, result lines 0 | after leaving: msg M2, result lines 0
tip "" | with cursor: msg M5, result lines 0 | after leaving: msg M5, result lines 0
tip "18.0" | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
tip "18,5" | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
tip "1e1" | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
tip "+4" | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
tip "4." | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
tip "101" | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
tip "-1" | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
tip "x" | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
tip "0" | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 0
tip "100" | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 100
tip  (U+FF10 U+FF10 U+FF17) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 7
tip  (U+0667) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 7
tip " 7 " | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 7
tip  (U+00B2) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 2
tip  (U+2466) | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 7
tip  (U+200E U+0037) | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
tip "00000000000000000000100" | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 100
tip "1000" | with cursor: msg M6, result lines 0 | after leaving: msg M6, result lines 0
people "" | with cursor: msg M7, result lines 0 | after leaving: msg M7, result lines 0
people "0" | with cursor: msg M8, result lines 0 | after leaving: msg M8, result lines 0
people "101" | with cursor: msg M8, result lines 0 | after leaving: msg M8, result lines 0
people "18.0" | with cursor: msg M8, result lines 0 | after leaving: msg M8, result lines 0
people "18,5" | with cursor: msg M8, result lines 0 | after leaving: msg M8, result lines 0
people "1e1" | with cursor: msg M8, result lines 0 | after leaving: msg M8, result lines 0
people "+4" | with cursor: msg M8, result lines 0 | after leaving: msg M8, result lines 0
people "4." | with cursor: msg M8, result lines 0 | after leaving: msg M8, result lines 0
people "1" | with cursor: msg -, result lines 6 | after leaving: msg -, result lines 6, shows 1
people "100" | with cursor: msg -, result lines 8 | after leaving: msg -, result lines 8, shows 100
people  (U+0664) | with cursor: msg -, result lines 8 | after leaving: msg -, result lines 8, shows 4
people  (U+FF14) | with cursor: msg -, result lines 8 | after leaving: msg -, result lines 8, shows 4
people  (U+200F U+0034) | with cursor: msg M8, result lines 0 | after leaving: msg M8, result lines 0
legend:
  M1 = "Enter the bill total."
  M2 = "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50"
  M3 = "Enter an amount above 0."
  M4 = "Enter 1000000.00 or less."
  M5 = "Enter the tip percent. Enter 0 for no tip."
  M6 = "Enter a whole number from 0 to 100, in digits only."
  M7 = "Enter the number of people."
  M8 = "Enter a whole number from 1 to 100, in digits only."
--- C4 incomplete: untouched empties, typed only bill
{"vals":["10","",""],"errs":["","",""],"inv":[null,null,null],"res":[],"resText":"","guide":"Type the bill total, the tip percent and the number of people.","fieldsHidden":false,"active":"bill"}
--- C4 recompute on every change
["Bill total: 10.00","Tip percent: 1","Number of people: 3","Tip amount: 0.10","Total with tip: 10.10","2 people pay 3.37 each","1 person pays 3.36","Your group decides who pays the higher amount."]
["Bill total: 10.00","Tip percent: 51","Number of people: 3","Tip amount: 5.10","Total with tip: 15.10","1 person pays 5.04","2 people pay 5.03 each","Your group decides who pays the higher amount."]
{"vals":["10","1","3"],"errs":["","",""],"inv":[null,null,null],"res":["Bill total: 10.00","Tip percent: 1","Number of people: 3","Tip amount: 0.10","Total with tip: 10.10","2 people pay 3.37 each","1 person pays 3.36","Your group decides who pays the higher amount."],"resText":"Bill total: 10.00Tip percent: 1Number of people: 3Tip amount: 0.10Total with tip: 10.102 people pay 3.37 each1 person pays 3.36Your group decides who pays the higher amount.","guide":"Type the bill total, the tip percent and the number of people.","fieldsHidden":false,"active":"tip"}
--- C5 widths
360 first {"innerWidth":360,"clientWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"overflowing":0,"maxRight":344} scrollX after scrollTo(500,0): 0
360 error {"innerWidth":360,"clientWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"overflowing":0,"maxRight":344} scrollX after scrollTo(500,0): 0
360 result {"innerWidth":360,"clientWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"overflowing":0,"maxRight":344} scrollX after scrollTo(500,0): 0
768 first {"innerWidth":768,"clientWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"overflowing":0,"maxRight":624} scrollX after scrollTo(500,0): 0
768 error {"innerWidth":768,"clientWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"overflowing":0,"maxRight":624} scrollX after scrollTo(500,0): 0
768 result {"innerWidth":768,"clientWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"overflowing":0,"maxRight":624} scrollX after scrollTo(500,0): 0
1280 first {"innerWidth":1280,"clientWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"overflowing":0,"maxRight":880} scrollX after scrollTo(500,0): 0
1280 error {"innerWidth":1280,"clientWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"overflowing":0,"maxRight":880} scrollX after scrollTo(500,0): 0
1280 result {"innerWidth":1280,"clientWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"overflowing":0,"maxRight":880} scrollX after scrollTo(500,0): 0
--- C5 markup
{"labels":[["bill","Bill total, tax included",true],["tip","Tip percent",true],["people","Number of people",true]],"inputs":[["bill","text","decimal","off","bill-error"],["tip","text","numeric","off","tip-error"],["people","text","numeric","off","people-error"]],"alerts":[["bill-error","alert"],["tip-error","alert"],["people-error","alert"]],"result":["status","polite"],"csp":"<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'\">"}
--- C5 mutation counts
errors on tip+people shown; typed 123.45 in bill: {"bill":0,"tip":0,"people":0,"result":0} ["","Enter a whole number from 0 to 100, in digits only.","Enter a whole number from 1 to 100, in digits only."]
result shown; typed spaces after bill and tip, moved focus: {"bill":0,"tip":0,"people":0,"result":0} ["   10","15 ","2"]
people error shown; edited tip: {"bill":0,"tip":0,"people":0,"result":0}
--- C7
fetch: BLOCKED: TypeError: Failed to fetch
console after fetch: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy."]
before reload ["12.50","18","4"]
after reload {"vals":["","",""],"errs":["","",""],"inv":[null,null,null],"res":[],"resText":"","guide":"Type the bill total, the tip percent and the number of people.","fieldsHidden":false,"active":"BODY"}
after back {"vals":["","",""],"errs":["","",""],"inv":[null,null,null],"res":[],"resText":"","guide":"Type the bill total, the tip percent and the number of people.","fieldsHidden":false,"active":"BODY"}
storage: {"cookie":"","ls":0,"ss":0}
requests seen on the page object over the whole run: 83 ; distinct: ["GET file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html"]
pageerrors: []
--- C6 JavaScript off
body innerText: "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page."
guide visible: false fields visible: false inputs visible: 0 result box height: {"x":400,"y":132,"width":480,"height":0}
```

Reading of that output, by CRITERION:

| CRITERION | Check run | Observed |
|---|---|---|
| C1 | request log on open; C2's first test | 1 request; first test matches |
| C2 | the 5 named tests, typed key by key | 5 of 5 match |
| C3 | 20000 + 6000 swept cases and 3 spot cases against my own code | 0 mismatches |
| C4 | first open, incomplete, each named input, recompute | every input the CRITERION names behaves as written; findings 1 and 2 are inputs it does not name |
| C5 | 3 widths x 3 states, markup, change counts | 0 elements too wide, no sideways scroll, markup as written, 0 changes in 3 scenarios |
| C6 | load with JavaScript disabled | only the heading and the JavaScript sentence show |
| C7 | `fetch`, source search, reload, back button | fetch blocked; 0 of the 5 words in the source; fields empty after reload and after back |
| C8 | not run | UNVERIFIED — see `Not examined` |

I viewed 2 of the 10 screenshots (360 pixels, error state and result state): nothing is cut off and nothing overflows.

6. An earlier run of the same script (`node audit5s.js`, exit code 0, 123 lines) gave the same results line for line in substance. It also printed a list of 257 "globals added by page" that is wrong: I compared against `about:blank`, which lacks the interfaces Chrome gives a `file://` page. I replaced that check with the named-list check in the run above. Its complete output is attached as `run1.txt`.

7. Globals check, `node g.js`. Complete output:

```
[["MAX_BILL_CENTS",true,"number"],["MAX_TIP_PERCENT",true,"number"],["MAX_PEOPLE",true,"number"],["splitBill",true,"function"],["plain",true,"function"],["readAmount",true,"function"],["readWhole",true,"function"],["money",true,"function"],["payLine",true,"function"],["fields",true,"object"],["resultBox",true,"object"],["shownResult",true,"string"],["showResult",true,"function"],["update",true,"function"]]
window.money(1234) from console: 12.34
splitBill(1000,0,3): {"tipCents":0,"totalCents":1000,"shares":[{"count":1,"cents":334},{"count":2,"cents":333}]}
```

### 5S checks that found nothing

- TODO, FIXME, placeholder, sample data, debug output: none (command 3; 0 console messages and 0 page errors on load).
- Unused CSS: each of the 14 rules in lines 9 to 22 matches an element the page creates.
- Unused variables, functions and parameters: none. Every function is called; every branch in lines 57 to 171 is reached by an input in the run above.
- Unreferenced files: the page loads no file (1 request).
- IDs: the 9 `id` values are each used by a `for`, an `aria-describedby`, a `getElementById` or a CSS rule.

## Findings

### 1. `plain` accepts characters that C4 does not allow

- **Class:** BLOCKER (a). C4 names 2 kinds of character that count as their plain form: full-width and Arabic-Indic. If the ORCHESTRATOR rules that C4's list is open, this is a STYLE finding about the comment only.
- **Where:** `index.html` line 72 (`text.normalize("NFKC")`); the comment on line 70; `run/FRAMEWORK.md` line 33.
- **Trigger:** type 10 in the bill, 15 in the tip, 2 in the people field. Then replace 1 field. Bill `①②` (U+2460 U+2461): no message, result shows "Bill total: 12.00". Bill `1².5` (U+00B2): shows 12.50. Bill `⒈5` (U+2488 U+0035): shows 1.50. Bill `𝟏𝟐` (U+1D7CF U+1D7D0): shows 12.00. Bill `12․5` (U+2024, one dot leader): shows 12.50. Tip `²`: shows "Tip percent: 2". Tip `⑦` (U+2466): shows 7.
- **Violates:** C4 ("The bill is digits…", "A whole number is digits only", "a full-width or Arabic-Indic digit or decimal mark counts as its plain form"). The comment on line 70 and the contract in `FRAMEWORK.md` part 4 say `plain` converts full-width and Arabic-Indic forms; the code converts every NFKC compatibility form, so the name and comment do not match what the code does.
- **Proposed fix:** drop `normalize("NFKC")`. Map only U+FF10 to U+FF19 to digits, U+FF0E to `.`, U+FF0C to `,`, and keep lines 73 to 75.

### 2. Some invisible characters at the ends are not ignored

- **Class:** BLOCKER (a).
- **Where:** `index.html` line 76.
- **Trigger:** with tip 15 and people 2, paste into the bill U+200E then `12.50`; or `12.50` then U+200F; or U+202A `12.50` U+202C; or U+00AD then `12.50`. Each shows "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50" and no result. Tip U+200E `7` and people U+200F `4` show "Enter a whole number from … to 100, in digits only." U+200B, U+FEFF and U+00A0 at the ends are ignored, as C4 requires.
- **Violates:** C4 ("Spaces and invisible characters at either end are ignored"). The error text also tells the person to type what they see they typed. My inference, not observed: direction marks travel with copied Arabic text, which this page accepts.
- **Proposed fix:** add `\u00AD\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069` to the class, and write the class once (see finding 6).

### 3. The comment on line 67 does not match C3

- **Class:** BLOCKER (d), a false statement in the DELIVERABLE, if the ORCHESTRATOR confirms my reading; I did not read the run's check scripts.
- **Where:** `index.html` lines 67 and 68.
- **Trigger:** read line 67: "the checks of C3 compare the page with it" (`window.splitBill`). Read C3 in E-175: the AUDITOR compares the page "with a tip amount, total and payments computed by the AUDITOR's own code". Nothing in the page reads `window.splitBill`; the page calls `splitBill` directly on line 160. The comment also cites "FRAMEWORK.md, part 4" with no path: the repository holds 3 files of that name, and a reader of the published page has none.
- **Violates:** `GLOSSARY.md` BLOCKER (d); 5S (a comment that no longer matches the thing).
- **Proposed fix:** change line 67 to "Reachable from the browser console as `window.splitBill` (contract: `run/FRAMEWORK.md`, part 4)."

### 4. `FRAMEWORK.md` says 3 states; C4 says 4

- **Class:** DEFECT (an out-of-date statement in a RUN FOLDER file, rule 14.6).
- **Where:** `skills/hinshitsu/example/run/FRAMEWORK.md` line 52.
- **Trigger:** read line 52: "(2) form, the 3 states and validation". C4 of E-175: "The page has 4 states."
- **Violates:** rule 14.6.
- **Proposed fix:** mark the line superseded and write "the 4 states (C4 of E-175)".

### 5. The script puts 14 names on `window`; the contract names 1

- **Class:** FRAGILITY. The page works today. It fails if a second script is added to the page, or a tool run from the console assigns `fields`, `update`, `money` or `plain`: the name is silently replaced.
- **Where:** `index.html` lines 52 to 171 (top-level `var` and `function`); line 30 (`id="fields"`) and line 120 (`var fields`) are 2 different things with 1 name.
- **Trigger:** open the page, open the console, type `window.money(1234)`: prints "12.34". The 14 names are in command 7.
- **Violates:** `FRAMEWORK.md` part 4 (names only `window.splitBill`); 5S.
- **Proposed fix:** wrap lines 52 to 192 in `(function () { … })();` and keep line 68. Rename the `div` to `id="form"`.

### 6. Five things are written twice

- **Class:** STYLE. The copies match today.
- **Where:** `index.html` line 76 (the character class, twice in 1 regex); lines 87 and 102 (`replace(/^0+(?=\d)/, "")`); lines 89 and 103 (the digit-count guard); lines 73 and 74 (digit ranges); lines 178 and 179 (2 identical handlers).
- **Trigger:** read the lines. Fixing finding 2 needs the same edit in 2 places on line 76.
- **Violates:** 5S (copy-paste drift, not yet drifted).
- **Proposed fix:** 1 constant for the class; 1 `stripZeros` helper; 1 named handler bound to both events.

### 7. A name and a comment say "typing"; the code tests "has the cursor"

- **Class:** STYLE.
- **Where:** `index.html` lines 79 to 81, 85 and 121.
- **Trigger:** read line 121: the value passed is `document.activeElement === fields.bill.input`. C4 says "While the bill field has the cursor".
- **Violates:** 5S (name does not match what the thing does).
- **Proposed fix:** rename `typing` to `hasCursor`; change the comment to "while the bill field has the cursor".

### 8. Hardcoded values that repeat or sit apart from their constant

- **Class:** STYLE.
- **Where:** `index.html` line 16 and 17 (`#a40000`, 3 times); lines 15 and 19 (`1px solid #555` and `0.25rem`, twice each); line 17 (`min-height: 1.5rem`, which equals 1 line of the `1rem/1.5` on line 10); lines 122 and 123 (minimums `0` and `1` as bare numbers, beside the named maximums of lines 52 to 54); line 86 ("1 or 2 digits" and "12.50" in the message, beside `\d{1,2}` on line 84).
- **Trigger:** read the lines. At 360 pixels the message of line 86 takes 3 lines, so the 1-line `min-height` does not hold the layout still there (screenshot `w360-error.png`).
- **Violates:** 5S (hardcoded values).
- **Proposed fix:** CSS custom properties for the 2 colours and the radius; `MIN_TIP_PERCENT` and `MIN_PEOPLE` constants.

### 9. `aria-live="polite"` repeats what `role="status"` already means

- **Class:** STYLE.
- **Where:** `index.html` line 47.
- **Trigger:** read the line. C5 asks for `role="status"` only.
- **Violates:** 5S (redundant attribute).
- **Proposed fix:** remove `aria-live="polite"`, or keep it and record the reason in `FRAMEWORK.md`. A screen reader is UNVERIFIED either way.

## Not examined

- **C8, the delivery report.** The scope names no delivery report and no path to one; I read only the files the scope names and the files they reference. UNVERIFIED.
- **A real phone, a screen reader, Firefox.** Not on my machine. UNVERIFIED, as C5 and C7 state.
- **Typing by a human hand.** A script typed every value into the page's fields in desktop Chrome. I did not test an on-screen keyboard, an input method editor, or paste from the system clipboard; the characters in findings 1 and 2 were entered by the script's key events.
- **Other bills in C3's range.** I ran the bills C3 names and no others.
- **`run/review/index.html`, `AUDIT-LOG.md`, the check scripts, `SKILL.md`, and every other file.** Outside the scope. Finding 3 rests on C3 as the scope quotes it.
- **Git history of `index.html`.** Not read; the scope names 1 commit.
- **8 of the 10 screenshots.** I viewed 2; the script's measurements cover all 9 width-and-state pairs.
