devin-51ff85626c5946bca66b734a37342da5

Commit 79ad62123f7fa66f48c2eda0ac8dea304803257c, detached. `git status --porcelain` printed 0 lines after my work. Test files: `/tmp/reaudit/`.

## Results

| FINDING | Result | Steps run and what appeared |
|---|---|---|
| F-1 | NO LONGER REPRODUCES | `grep -rn "restaurant" build-record/` still prints nothing. `SESSION-STATE.md` line 3 now quotes "EXAMPLE.md must show a real small deliverable…" as the USER's words and calls the bill page "the task the ORCHESTRATOR chose". `grep -n` finds that quotation at `build-record/BRIEF.md` line 74, in Message 1 (09:47 EST). E-24 and E-25 name the bill page as the ORCHESTRATOR's task T1. `grep -rn "USER's words"` over the RUN FOLDER finds no remaining false label. |
| F-2 | NO LONGER REPRODUCES | Both `curl` results are unchanged: raw `.html` returns `content-type: text/plain` with `sandbox`; `https://catcorner22.github.io/devin/` returns 404. The record changed: A-6 (E-33) lists the PREMISE and its failure; D-6 (E-37) supersedes D-3 and rests on A-3 and A-6; E-25 VA1 names "1 phone or laptop"; E-34 sends hosting to card question 2. See N-5 for G11. |
| F-3 | NO LONGER REPRODUCES | `node /tmp/reaudit/t.js`, 4 tip rules against the 4 tests of C2 in E-39: half-up passes 4; floor fails 3 (10.10 at 15 gives 11.61); half-even fails 2; float with `toFixed` fails 2 (11.61). All 4 rules pass E-16's single test. Against C3's sweep of 20,000 cases: floor differs in 7,000, half-even in 175, float in 239. D-5 states the rule and rests on A-2, A-4, A-7. |
| F-4 | NO LONGER REPRODUCES | C4 (E-39) names `12,50`: a message that says to use a dot, and no result. `/^\d+(\.\d{1,2})?$/.test('12,50')` prints `false`. A-7 lists the PREMISE; D-5 names A-7. |
| F-5 | NO LONGER REPRODUCES | C3 now requires typing into the page's fields and reading the page's output. Simulated the trigger's page (`Math.trunc(parseFloat(text)*100)`): wrong for 287 of the 5,000 bills in C3's sweep, first `0.29 -> 0.28`. That page now fails C3. |
| F-6 | NO LONGER REPRODUCES | E-33 marks A-3 and A-4 settled, each with a file. My own page in `google-chrome --headless=new --dump-dom` (Chrome for Testing 156.0.8078.47) printed `<p id="o">script ran: 295</p>`. Node: digit conversion wrong for 0 of 100,000,000 amounts; largest product 10000000050, `Number.isSafeInteger` true. A-4 as reworded is true. See N-1, N-2. |
| F-7 | STILL REPRODUCES | `SESSION-STATE.md` and `FRAMEWORK.md` now match the log (E-39, S5, D-1 to D-7). `MINDMAP.md` still breaks rule 9.2: by `grep`, D-1, D-2, D-3 and WU-1 appear 0 times in the list and in the diagram; in the list D-5 appears 3 times and D-6 2 times. |

## New findings

- **N-1. DEFECT.** Place: E-33, A-8. Trigger: read its EVIDENCE cell, "USER, V2"; `grep -n -i "terminal\|github.com" build-record/BRIEF.md` prints nothing. V2 does not say where the reader opens files. Violates rule 4.1.
- **N-2. DEFECT.** Place: `evidence/a3-local-script.txt`, `evidence/a4-integer-arithmetic.txt`. Trigger: `cat` both: output only, no command, no script; "Chrome 156 on Linux" (E-33, A-3) appears in neither. Violates rule 4.2 with the glossary's EVIDENCE ("a command with its full output").
- **N-3. DEFECT.** Place: E-39, C4. Trigger: type `18.0`, `1e1`, `+4` or `4.` as tip or people. C4 gives a text rule for an amount only. `Number.isInteger(Number(s))` accepts all 4; `/^\d+$/` rejects all 4; both pages pass C4's listed inputs. Violates rule 3.1.
- **N-4. STYLE.** Place: E-39, C3 spot case "1,000,000.00, 100, 100". Trigger: type the value as written; C4 requires an error for a comma.
- **N-5. DEFECT.** Place: E-34 rows "MVS cut" and "RC demand 6"; E-9. Trigger: `grep -c '· ANSWER ·\|· CARD ·' AUDIT-LOG.md` prints 0, yet E-34 writes "G12 answered" and "G13 answered" for gaps E-9 gives to the USER. No entry after E-32 names E-9: G13 still says the page "works for dollars, euros and pounds", and G11 still says "opens by double-click". Violates rules 23.5 and 9.6.

## Not run

- Any test on `index.html`: not run; the file does not exist.
- Phone, Firefox, C5, C6, C7: not run.
- The RED CELL's `/tmp/rc/` files: not run; not in the repository. I wrote my own.
- `scripts/hinshitsu_check.py --stage plan`: run; exit 1 (S5 and S6 have no end entry).
- Memos E-19 to E-22 and the 6 scopes: not read in full.
