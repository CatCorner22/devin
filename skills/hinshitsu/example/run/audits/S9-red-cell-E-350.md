devin-bfe8098018b340c2aa0841918b20adb7

# RED CELL — full attack before delivery

Commit: `6c94e4c10c9ce7b3c0b45072105b0c2355ec98ef` on `main`. `sha256sum skills/hinshitsu/example/index.html` printed `32964a18b797edaf860fba7bb290c2bb493f72939bd5e5bab28e90efc1cdc7a5`, which matches the scope. I changed no file (`git status --porcelain | wc -l` printed `0`). Browser: Chrome 156 on Linux, driven by a script that types into the page's own fields.

Evidence files, all attached: `browser-run.txt` (every browser result below), `browser-run.mjs.txt` (the script), `hashes-and-greps.txt`, `checker-output.txt`, and 8 screenshots `01` to `06`.

## Verdict

PLAN SURVIVES WITH CHANGES

The page itself held up: on the delivered file every test of C1, C2, C6 and C7 that I ran passed, and every closed trigger I re-ran stayed closed. The plan fails in its record and in its delivery, not in its arithmetic. `DELIVERED — NOT DONE` is a true description only if the 6 changes below are made.

## Premises attacked

### P1. The file the AUDITORS ran is the file the USER receives

- Listed in an `ASSUMPTION` entry: no.
- Evidence (`hashes-and-greps.txt`): 3 different files carry the name.

| File | SHA-256 (first 12) | Who ran it |
|---|---|---|
| `review/index.html` at round 3 (seed and `maxlength`) | `a615ada402bc` | both round-3 AUDITORS |
| `index.html` at round 3 (`maxlength`, no seed) | `d5e4f980b2fc` | nobody |
| `index.html` delivered | `32964a18b797` | nobody before this report |

- The delivered file differs from the audited copy in 4 lines: 3 `maxlength` attributes and line 107. Both round-3 reports say they did not run `example/index.html` (E-253 line 312; E-254 line 168).
- How it fails: the delivery report says "audited in 3 rounds". The USER takes that to cover the file in hand. It covers a different file. Under the glossary, part (a) of VERIFIED fails for every CRITERION.
- C8 makes it worse. C8 asks for "the SHA-256 of `index.html` at the last audit round". That hash is `d5e4f980…`. If the report prints `32964a18…` under those words, the statement is false. If it prints `d5e4f980…`, it does not match the file delivered.
- What I ran on the delivered file: the 5 typed tests of C2, the 3 spot cases of C3, the seeded case (`12.5` shows 12.50), 1 request on load, JavaScript off, the blocked `fetch`, reload, and the 3 widths. All passed. The 2 sweeps of C3 I did not run.

### P2. The USER ended the audit rounds

- Listed: no.
- Evidence: E-268 and E-346 rest on the USER's words "We've spent a lot of time on this one issue." `grep` finds those words only inside those 2 orchestrator entries. The last `ANSWER` entry is E-173. No DECISION CARD with the 3 choices of rule 14.5 follows round 3, though 8 BLOCKERS are open.
- How it fails: the USER made a remark about time. The ORCHESTRATOR reads it as the choice "end the run and receive the work as `DELIVERED — NOT DONE`". If the USER meant "fix it faster", the USER receives 8 open BLOCKERS that the USER never chose to accept. The claim is ASSERTED.

### P3. A friend can reach the page (A-6, D-8)

- Listed: yes, A-6. Attacked anyway: D-8 is "in force" and unmet.
- Evidence: the GitHub Pages address returns 404 (`06-github-pages-404.png`). The raw GitHub address serves `text/plain` with a `sandbox` policy; at phone width the browser shows source code and 0 fields (`05-raw-github-phone-width.png`).
- How it fails: the USER sends a friend the GitHub link at the table. The friend sees code. Only a person who downloads the file to a laptop can split a bill. The USER approved publishing in E-64; the run delivers without it.

### P4. The deliverable is the page

- Listed: no.
- Evidence: the USER's words (V1, `AUDIT-LOG.md` line 239) ask for `EXAMPLE.md` showing "findings with resolutions, delivery report". `find . -iname "EXAMPLE*"` prints only the folder. C1 to C8 name no `EXAMPLE.md`.
- How it fails: the USER opens the repository to learn how a run works. No `EXAMPLE.md` exists, and no CRITERION can fail for its absence. The run can reach delivery with the USER's stated objective unmet and no FINDING to show it.

### P5. The tip is a whole-number percent (D-4)

- Listed: no. A-5 covers what the percent is taken of, not that it is a whole number.
- Evidence: tip `12.5` and `17,5` each get "Type a whole number from 0 to 100, in digits only." (`02-tip-12.5-refused.png`).
- How it fails: a group that tips 12.5 percent must round up or down by hand. C2 freezes the rule and the USER approved it, so no CRITERION fails. No finding; the delivery report should name the limit.

### P6. A hash helps a reader who uses no terminal (D-7, A-8)

- Listed: no.
- How it fails: C8 has the report state a SHA-256. A-8 says the reader does not use a terminal. That reader cannot compute a hash, so the line proves nothing to the reader it is written for.
- Named test: the AUDITOR of C8 records whether any of the 3 checks lets the USER confirm the file's identity in a browser.

### Decisions that survived

- D-5 (integer cents): no wrong amount in any case I typed, up to `1000000.00`, `100`, `100`.
- D-9 (comma): `12,5` equals `12.5`; `1,000` and `1.000,00` are refused with a message that names thousands separators.
- E-268 (`maxlength` removed): 60 spaces then `1234.56` now shows 1234.56; 1,000,000 characters cost 19 to 54 ms per event, 5,000,000 spaces 95 ms.

## Closing entries tested against the cited reports

| Entry | Closes | Supported by the cited report? |
|---|---|---|
| E-273, E-274 | F-139, F-140 WITHDRAWN | Yes. On the delivered file `12.5` shows 12.50. |
| E-275 to E-281 | F-83 to F-89 FIXED | In part. The retest ran 4 of F-83's 7 inputs, on the review copy. I ran all 7 on the delivered file: each is refused. |
| E-289 | F-99 FIXED | Yes, both reports, trigger 3. |
| E-293 | F-111 FIXED | Yes. My run: 22 ms for the same input at 1,000,000 spaces. |
| E-308 | F-39 FIXED | In part. Trigger 8 of the correctness report retests parts (a) and (b): 0 changes. My run of (b) on the delivered file: 0 changes. Trigger 8 does not retest part (c), content added to a hidden live region. |
| E-313 | F-53 FIXED | In part. The page now takes a comma, which removes the stated cause. The trigger is a phone keypad; the retest is `12,50` on a desktop. No phone was run. |
| E-317 to E-319 | F-44 to F-46 OVERRULE | No. The reason says `FRAMEWORK.md` part 4 names `window.splitBill` "as the contract that the AUDITORS call". Part 4, line 34, says "no check of this run calls `window.splitBill`". The reason is false. |
| E-320 to E-328 | 9 wording FINDINGS OVERRULE | No. The reason says the wording "is the USER's to approve" and that the delivery report lists them as open. A FINDING cannot be both overruled and open (rule 15.6). |
| E-329, E-343 | F-54, F-121 OVERRULE | No. Both carry the stock reason "No fix is claimed." F-54 is about a `<form>` that the page no longer has. F-121 was answered by E-251, which changed `FRAMEWORK.md` part 3. Neither reason fits its FINDING. |
| E-344, E-345 | F-147, F-148 OVERRULE | Not supported: the stock reason gives no ground for leaving the message as it is. |

The count is sound: 150 FINDINGS, 97 closed, 53 open, none in both sets, none in neither.

## Is `DELIVERED — NOT DONE` a true description?

Yes, and it is the only true status. It becomes false by omission unless the report says all of this:

- 8 of the 53 open FINDINGS are BLOCKERS: F-90, F-98, F-102, F-103, F-137, F-138, F-141, F-149. The rest are 36 DEFECTS and 9 FRAGILITIES.
- No CRITERION is VERIFIED for the delivered file (P1). C8 has never been tested: no delivery report exists.
- Parts 1, 2, 3, 6 and 7 of DONE are unmet (part 8 too, until the report is sent). `scripts/hinshitsu_check.py` prints 5 failures and exits 1 (`checker-output.txt`).
- "53" will be wrong on the day: the findings below add to it.

## The cheating agent

The cheapest fake: write the retest list yourself, make each trigger narrower than the FINDING it closes, then stamp one line across every FINDING of the "same fault".

This run shows the shape. All 77 closing entries carry timestamps inside 4 seconds (18:20:28 to 18:20:31). 42 of them cite "trigger N: DOES NOT REPRODUCE" from a list of 10 triggers that the ORCHESTRATOR wrote into the round-3 scopes. 17 overrules share 1 sentence. The AUDITORS ran a copy, and the page changed after they finished.

Which rule catches it: rule 14.3(a) says the new SUB-AGENT "re-ran the trigger", meaning the FINDING's own. Nothing enforces it. `hinshitsu_check.py` says of itself: "It does not prove that any check ran." The audit of the audit (section 17) would catch it, and it has not run. Rule 16.2 (no steering) is also bent: the round-3 scopes tell each AUDITOR what the page did "before", which tells them what result is hoped for.

So: no rule that has run in this run catches it.

## Findings

Each is classed BLOCKER because the glossary makes every RED CELL finding a BLOCKER. Findings 2 and 4 to 7 are faults in the record, not in the page.

1. **BLOCKER.** Place: `index.html` at `32964a18…`; E-268; C8. Trigger: run the 2 `diff` commands in `hashes-and-greps.txt`. The delivered file matches neither the copy the AUDITORS ran nor `index.html` at the last audit round. Violates: glossary VERIFIED part (a) for C1 to C7; C8, whose hash sentence cannot be both true and useful.
2. **BLOCKER.** Place: E-268, E-346. Trigger: `grep -n "spent a lot of time" AUDIT-LOG.md` and `grep -n "· ANSWER ·" AUDIT-LOG.md | tail -1`. The USER's instruction to stop has no entry that quotes it, and no card offered the 3 choices. Violates: rules 14.3(c) and 14.5; glossary ASSERTED.
3. **BLOCKER.** Place: E-348; D-8; E-64. Trigger: open the Pages address (404), then the raw address on a phone-width screen (source code, 0 fields). Violates: the USER's approval in E-64; glossary BLOCKER (b) for any RECIPIENT with only a link.
4. **BLOCKER.** Place: E-317, E-318, E-319. Trigger: read the reason beside `FRAMEWORK.md` line 34. The overrule rests on a false statement, the same one that open BLOCKERS F-102 and F-103 report. Violates: rule 15.5 (a written reason).
5. **BLOCKER.** Place: E-320 to E-328. Trigger: read the reason. Each FINDING is closed and also promised to the USER as open. Violates: rules 15.4 and 15.6.
6. **BLOCKER.** Place: E-329, E-343, and the other 15 overrules that share the sentence "No fix is claimed." Trigger: read F-54 (a `<form>`; `grep -c "<form" index.html` prints 0) and F-121 beside E-251. The stock reason is false for these 2 and was not written per FINDING for the rest. Violates: rule 15.5 (a written reason).
7. **BLOCKER.** Place: repository root; C8. Trigger: `find . -iname "EXAMPLE*"`. C8 says it "Covers V1", yet its test is the 3 checks only; no CRITERION asks for `EXAMPLE.md`, and no such file exists at this commit. Violates: V1 as the USER wrote it.

## Changes demanded

1. Before delivery, have 1 AUDITOR that is not the BUILDER run C1 to C7 on `32964a18…`. The S8 scope can carry it. Until then, write "no CRITERION is VERIFIED on the delivered file".
2. In the delivery report print both hashes, each with a plain label: the file delivered, and `index.html` at round 3. Say that the AUDITORS ran a third file.
3. Log an entry that quotes the USER's stop message whole, with its time. Or send the rule-14.5 card and wait.
4. Reopen F-44 to F-46, F-36, F-72, F-76, F-77, F-79, F-80, F-134 to F-136. Rewrite the reasons of E-329 to E-345 one FINDING at a time.
5. State in the first lines of the delivery report: 8 open BLOCKERS by ID; the page is not published and a link shows source code; the 4 clicks that publish it; whole-number tips only.
6. Add `EXAMPLE.md`, or tell the USER in the report that it does not exist and why.

## Premortem

Six weeks from now the user reports that this failed. The user had read the delivery report on the day, seen "3 audit rounds" and a long hash, and taken the page as checked. At dinner the user pasted the GitHub link into the group chat. Five friends tapped it and each saw a screen of code. One friend with a laptop downloaded the file and it worked, so the group blamed their phones. Later a colleague, building a second example from this one, compared the hash in the report with the file and found that they did not match. The colleague then opened the round-3 reports and read that both AUDITORS "did not run `example/index.html`". The user asked which file had been audited. The honest answer was: a copy with a planted bug and a length limit that the delivered page does not have. The user then counted 8 open BLOCKERS and asked who had agreed to ship them. The log pointed to the user's own remark about time, which no entry quotes. What failed was trust in the record, not the sums. P1 and P2 let it through: no CRITERION ties the audited bytes to the delivered bytes, and no check asks for the USER's stop in the USER's words. A-6 was known and left unmet.
