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
