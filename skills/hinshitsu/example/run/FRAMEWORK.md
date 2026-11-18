# FRAMEWORK — bill-splitting page

Form: section 7. Superseded lines stay, marked.

## 1. CRITERIA

By reference: `AUDIT-LOG.md` E-39 (C1 to C8), `Status: PROPOSED`. ~~E-16 (C1 to C7)~~ superseded by E-39; never approved.

## 2. Architecture decisions

| ID | Decision | Entry | Status |
|---|---|---|---|
| D-1 | even split; tip on the bill entered | E-13 | superseded by D-4 |
| D-2 | whole cents; remainder to the first shares | E-14 | superseded by D-5 |
| D-3 | 1 self-contained HTML file | E-15 | superseded by D-6 |
| D-4 | even split; whole-number tip percent on the amount typed, tax included (working assumption until the USER answers) | E-35 | in force |
| D-5 | 1 pure function `window.splitBill`; half a cent of tip rounds up; text converted to cents from its digits | E-36 | in force |
| D-6 | 1 self-contained HTML file with a policy tag that blocks network requests; not hosted (working assumption until the USER answers) | E-37 | in force |
| D-7 | the delivery report opens with 3 browser-only checks and the SHA-256 of `index.html` | E-38 | in force |

## 3. Naming conventions

- IDs: `E-<n>`, `C<n>`, `G<n>`, `A-<n>`, `D-<n>`, `WU-<n>`, `F-<n>`, `S<n>` (rule 9.5).
- Report files: `audits/<WU>-<role>-E-<n>.md` and `memos/lens-<name>-E-<n>.md`, where `E-<n>` is the number of the `LAUNCH` entry.

## 4. Contracts between parts

- **`window.splitBill(billCents, tipPercent, people)`** — pure; reachable from the browser console. Inputs: `billCents` a whole number from 1 to 100,000,000; `tipPercent` a whole number from 0 to 100; `people` a whole number from 1 to 100. Output: `{ tipCents, totalCents, shares }`; `shares` is a list of 1 or 2 groups `{ count, cents }`, larger payment first. `tipCents = floor((billCents × tipPercent + 50) / 100)`. `totalCents = billCents + tipCents`. Base payment `floor(totalCents / people)`; `totalCents mod people` people pay 1 cent more.
- **The page's fields call `splitBill` and no other code computes a number shown in the result.**
- **Text to cents.** The page converts the bill's text to cents from its digits, with no decimal arithmetic.
- **File identity.** Each AUDITOR scope for WU-1 states the SHA-256 of `index.html`; the delivery report states the SHA-256 as audited.

## 5. File ownership

| Path | Built by | Audited by |
|---|---|---|
| `skills/hinshitsu/example/index.html` | BUILDER (the orchestrator session) | the 8 AUDITOR roles, each a child Devin session |
| `skills/hinshitsu/example/run/audits/`, `memos/` | the SUB-AGENT that wrote each report; saved whole by the ORCHESTRATOR | final AUDITOR |
| every other file in the RUN FOLDER | ORCHESTRATOR | final AUDITOR |

## 6. WORK UNITS

| ID | What | Status |
|---|---|---|
| WU-1 | `index.html`, the whole page | not started; waits for the USER's approval of the CRITERIA |

Build order inside WU-1: (1) `splitBill` and the text-to-cents step; (2) form, the 3 states and validation; (3) layout at the 3 widths; (4) the no-JavaScript sentence and the policy tag.

Estimate of size, by part: function and conversion 40 lines; validation and states 60; markup 40; style 50; total about 190 lines, which is above the 100-line limit of TIER CORE. The TIER is measured again from `git diff --stat` when WU-1 is built.

## 7. Existing implementations checked

| Searched for | Where | Command | Result |
|---|---|---|---|
| an existing bill-splitting page or split function | this repository | `grep -ril "split" --include=*.html --include=*.js .` | no file found at S2. The repository held 0 `.html` and 0 `.js` files (`git ls-files '*.html' '*.js'` printed nothing), so the search shows only that no such file existed. |
