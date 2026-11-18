You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file, with every output file it cites. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine. Keep the run short: aim to finish within 40 minutes; where a job is too large to finish, sample, and say what you sampled.

# Role scope — Final AUDITOR (audit of the audit)

You are the final AUDITOR of a hinshitsu run (rule 17.4). You built nothing and audited nothing in this run. You test whether the record is true.

## Filled in by the ORCHESTRATOR

- RUN FOLDER: `skills/hinshitsu/example/run/`
- DELIVERABLE: `skills/hinshitsu/example/index.html`, SHA-256 32964a18b797edaf860fba7bb290c2bb493f72939bd5e5bab28e90efc1cdc7a5
- Draft report: `DELIVERY-REPORT.md`
- Commit under review: the newest commit of branch `devin/hinshitsu-build` whose message begins "example run: S10 scope"
- Glossary: `skills/hinshitsu/GLOSSARY.md`

## Your job

(a) Open every path that the report and `COVERAGE-LEDGER.md` cite. List each one that is missing.
(b) For each cited file, state whether it shows what the citing claim says.
(c) Run every recorded command again and compare the result with the saved output.
(d) State whether `MINDMAP.md` and `CONNECTIONS.md` name only files and parts that exist in the DELIVERABLE, and miss none.
(e) Match every file under `audits/` and `memos/` to a `LAUNCH` entry and an identifier line. List each `LAUNCH` entry with no report. Where the runtime lets you open a SUB-AGENT run by its identifier, open at least 3 and compare each with its saved report. Check that no entry in `AUDIT-LOG.md` cites a later entry and, where git exists, that the history of `AUDIT-LOG.md` shows only added lines.
(f) Check the reason in every `N/A` cell other than `N/A — covered at file row`.
(g) For each RED CELL attack on a PREMISE that no `ASSUMPTION` entry lists, record `counts` or `does not count`, with the reason (rule 6.5).
(h) Run `python3 scripts/hinshitsu_check.py --stage delivery <RUN FOLDER>` where Python exists, and paste its output.
(i) Name the commit, or the file hashes, that you examined.

## Added by the ORCHESTRATOR

- The draft report states the status `DELIVERED — NOT DONE`. The ORCHESTRATOR expects the last line `not passed` if you find any mismatch; do not soften it.
- (j) The RED CELL demanded that an AUDITOR who is not the BUILDER run the CRITERIA on the delivered file. Open `skills/hinshitsu/example/index.html` (check its SHA-256 first) in Chrome and test C1 to C7 by each CRITERION's own test, as far as 20 minutes allow. For each, write `PASS`, `FAIL` or `UNVERIFIED` with what you ran. The CRITERIA, word for word from entry E-175:

- C1. `skills/hinshitsu/example/index.html` is 1 file that loads no other file, and its calculator works when the file is opened from disk in desktop Chrome. Test: open the file by its `file://` path; the browser's request log shows 1 request; C2's first test passes. Covers G8, G11.
- C2. Given a bill from 0.01 to 1000000.00, a tip that is a whole number from 0 to 100 percent, and a number of people that is a whole number from 1 to 100, the result shows, in this order: the bill total with 2 decimal places, the tip percent and the number of people, each as a number without leading zeros; the tip amount; the total with tip; and the payments, as 1 line ("4 people pay 29.50 each") or as 2 lines with the larger payment first ("1 person pays 3.34" and "2 people pay 3.33 each"). Under 2 lines, 1 sentence follows: "Your group decides who pays the higher amount." The result shows no other text. Half a cent of tip rounds up. Tests, typed into the page: 100.00, 18, 4 gives tip amount 18.00, total with tip 118.00, "4 people pay 29.50 each"; 0.30, 15, 1 gives tip amount 0.05; 10.10, 15, 1 gives tip amount 1.52 and total with tip 11.62; 12.25, 18, 1 gives tip amount 2.21; 0100.5, 007, 02 shows 100.50, 7 and 2. Covers T1, G12.
- C3. The payments sum to the total with tip, to the cent, and no 2 payments differ by more than 0.01. Test: an AUDITOR types values into the page's own fields in a browser driven by a script, reads the page's own output, and compares it with a tip amount, total and payments computed by the AUDITOR's own code: every bill from 0.01 to 50.00, in steps of 0.01, with tips 0, 15, 18 and 20 for 1 person; every bill from 0.01 to 5.00, in steps of 0.01, with 1 to 12 people at tip 18; and the spot cases, as typed, `10.00`, `0`, `3` (3.34 and 3.33); `1000000.00`, `100`, `100`; and `0.01`, `0`, `100`. Covers G3.
- C4. The page has 4 states. First open: 3 empty fields, 1 sentence of guidance, no error text, no result. Incomplete: 1 or more fields are empty, the person has neither typed in nor left them, and no field shows a message; no result shows. Error: after a person types in a field or leaves it, a value that fails the formats below shows a message below that field, the message names what to type, and no result shows. Result: when all 3 fields are valid, the result shows and is recomputed on every change. The bill is digits, with an optional decimal mark followed by 1 or 2 digits; the decimal mark is a dot or a comma, so `12.50` and `12,50` are the same amount. A whole number is digits only. Spaces and invisible characters at either end are ignored; a full-width or Arabic-Indic digit or decimal mark counts as its plain form. While the bill field has the cursor, digits followed by a decimal mark and nothing else (`12.`) show no message and no result; the message shows when the person leaves the field. Each of these gets a message and no result: an empty field that the person has typed in or left; letters; a thousands separator (`1,000.00`, `1.000,00`); `1e3`; `10.` once the person has left the field; `.5`; a currency sign; a negative or 0 bill; a bill above 1000000.00; 3 or more decimal places; a tip that is not a whole number from 0 to 100; a number of people that is not a whole number from 1 to 100; `18.0`, `18,5`, `1e1`, `+4` or `4.` as tip or people. Test: each input, in the browser. Covers G1, G2, G13.
- C5. At widths of 360, 768 and 1280 pixels no element is wider than the window and nothing scrolls sideways. Every field has a visible label; the bill's label reads "Bill total, tax included". Each error paragraph carries `role="alert"` and the result carries `role="status"`; the page does not write a message or a result again when its text has not changed. The bill field carries `inputmode="decimal"` and the other 2 fields `inputmode="numeric"`. Test: screenshots at the 3 widths; reading of the markup; a count of the changes inside the error paragraphs and the result while a person types in another field (0 changes). A real phone and a screen reader are not tested and are reported UNVERIFIED. Covers G4, G5.
- C6. With JavaScript off, the page shows a sentence saying that the calculator needs JavaScript, and shows no guidance and no field. Test: load with JavaScript disabled. Covers G9.
- C7. The page stores nothing and sends nothing. The file carries the tag `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`, and each field carries `autocomplete="off"`. Test: with the page open, `fetch('https://example.com')` run in the browser is blocked; the source holds none of `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie` and `caches`; a reload in Chrome clears every field. Firefox is not tested and is reported UNVERIFIED. Covers G6, G7.
- C8. The delivery report opens with 3 checks. The USER can do all 3 within 5 minutes in total, in a browser, with no terminal: each check names what to open, what to do and what to see. The report states the SHA-256 of `index.html` at the last audit round. Test: an AUDITOR who did not build the page follows the 3 checks as written and records the time taken. Covers V1, V2.

- (k) State whether each of these answers is true, by opening the files: F-151 and F-159 (`skills/hinshitsu/EXAMPLE.md` exists and the README link reaches it); F-152 (the README states how to download and open the page); F-154 (entry E-362 quotes the USER's message); F-156, F-157, F-158 (entry E-363 states what the 29 `OVERRULE` entries E-317 to E-345 are worth, and the draft report lists those 29 FINDINGS for the USER). Write `confirmed` or `not confirmed` for each.
- For job (c), the recorded commands are in `evidence/*.txt` and in the `CHECK` entries of `AUDIT-LOG.md`; also run `python3 -m unittest discover -s tests` and `python3 scripts/lint.py` at the repository root and paste the last lines.
- For job (e), a SUB-AGENT run opens at the link in its `LAUNCH` entry.

## Report

First line: the identifier that your runtime gave this run; if you cannot read it, write `identifier: not visible to me`. Then 1 heading per letter above, with what you did and what you found; then `## Findings` (class, place, trigger, what it violates); then a last line: the commit or file hashes examined, and `passed` or `not passed`. Write `passed` only when (a) to (e) show no mismatch.

## Limits

- Do not change any file.
- Do not report a check that you did not run. A check that you cannot run is UNVERIFIED, with the reason, and the last line is then `not passed`.
