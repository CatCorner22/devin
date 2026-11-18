# FRAMEWORK — bill-splitting page

Form: section 7. Superseded lines stay, marked.

## 1. CRITERIA

By reference: `AUDIT-LOG.md` E-175 (C1 to C8), `Status: FROZEN`, approved by the USER in E-173. ~~E-98~~ is superseded by E-174 and E-175. ~~E-55~~ is the same text as proposed. ~~E-16 (C1 to C7)~~ and ~~E-39~~ superseded; never approved.

## 2. Architecture decisions

| ID | Decision | Entry | Status |
|---|---|---|---|
| D-1 | even split; tip on the bill entered | E-13 | superseded by D-4 |
| D-2 | whole cents; remainder to the first shares | E-14 | superseded by D-5 |
| D-3 | 1 self-contained HTML file | E-15 | superseded by D-6 |
| D-4 | even split; whole-number tip percent on the amount typed, tax included | E-35 | in force; approved by the USER in E-64 |
| D-5 | 1 pure function `window.splitBill`; half a cent of tip rounds up; text converted to cents from its digits | E-36 | in force |
| D-6 | 1 self-contained HTML file with a policy tag that blocks network requests; not hosted | E-37 | superseded by D-8 |
| D-8 | 1 self-contained HTML file with a policy tag that blocks network requests; published with GitHub Pages after it passes its audits | E-68 | in force |
| D-9 | the bill accepts a dot or a comma as the decimal mark; a thousands separator is refused. Supersedes the dot-only part of D-4 | E-176 | in force |
| D-7 | the delivery report opens with 3 browser-only checks and the SHA-256 of `index.html` | E-38 | in force |

## 3. Naming conventions

- IDs: `E-<n>`, `C<n>`, `G<n>`, `A-<n>`, `D-<n>`, `WU-<n>`, `F-<n>`, `S<n>` (rule 9.5).
- Report files: `audits/<WU>-<role>-E-<n>.md` in round 1 and `audits/<WU>-r<round>-<role>-E-<n>.md` from round 2 on, and `memos/lens-<name>-E-<n>.md`, where `E-<n>` is the number of the `LAUNCH` entry.

## 4. Contracts between parts

- **`window.splitBill(billCents, tipPercent, people)`** — pure; reachable from the browser console. Inputs: `billCents` a whole number from 1 to 100,000,000; `tipPercent` a whole number from 0 to 100; `people` a whole number from 1 to 100. Output: `{ tipCents, totalCents, shares }`; `shares` is a list of 1 or 2 groups `{ count, cents }`, larger payment first. `tipCents = floor((billCents × tipPercent + 50) / 100)`. `totalCents = billCents + tipCents`. Base payment `floor(totalCents / people)`; `totalCents mod people` people pay 1 cent more.
- **The page's fields call `splitBill` and no other code computes the tip amount, the total with tip or a payment.** `readAmount` turns the bill's text into cents and `money` writes cents as text.
- **The sentence under 2 payment lines.** When the result holds 2 payment lines, it ends with "Your group decides who pays the higher amount." (C2 of E-175).
- **Decimal mark.** A dot or a comma (D-9). `plain` maps exactly these characters before any check: U+FF10 to U+FF19, U+0660 to U+0669 and U+06F0 to U+06F9 to the digit of the same value; U+FF0E to a dot; U+FF0C and U+066B to a comma. Every other character stays as typed. At either end `plain` removes white space, Unicode format characters (Cf), default-ignorable code points and U+2800.
- **Names on `window`.** The script is 1 function; `window.splitBill` is the 1 name it adds. No part of the page and no check of this run calls `window.splitBill`; it exists for a person at the console.
- **Text to cents.** The page converts the bill's text to cents from its digits, with no decimal arithmetic.
- **File identity.** Each AUDITOR scope for WU-1 from audit round 2 on states the SHA-256 of the file it names; the 7 scopes of round 1 did not (F-49, F-50). The delivery report states the SHA-256 at the last audit round.

## 5. File ownership

| Path | Built by | Audited by |
|---|---|---|
| `skills/hinshitsu/example/index.html` | BUILDER (the orchestrator session) | the 8 AUDITOR roles, each a child Devin session |
| `skills/hinshitsu/example/run/review/index.html` | the seeder of each audit round (rule 16.7), from a copy the ORCHESTRATOR makes | the AUDITORS that the seed report names; never shipped; made identical to `index.html` again before each round |
| `skills/hinshitsu/example/run/audits/`, `memos/` | the SUB-AGENT that wrote each report; saved whole by the ORCHESTRATOR | final AUDITOR |
| every other file in the RUN FOLDER | ORCHESTRATOR | final AUDITOR |

## 6. WORK UNITS

| ID | What | Status |
|---|---|---|
| WU-1 | `index.html`, the whole page | 3 audit rounds reported (E-171, E-249, E-267); `maxlength` removed after round 3 with no re-audit (E-268); S7 ended (E-346); open FINDINGS are listed in `SESSION-STATE.md` field 5 |

Build order inside WU-1: (1) `splitBill` and the text-to-cents step; (2) the fields, the 4 states and validation; (3) layout at the 3 widths; (4) the no-JavaScript sentence and the policy tag.

Estimate of size, by part: function and conversion 40 lines; validation and states 60; markup 40; style 50; total about 190 lines, which is above the 100-line limit of TIER CORE. The TIER was measured again after the build (E-179): `git show --stat 1c8f220` prints 167 insertions, above the 100-line limit, so the TIER stays `FULL`.

## 7. Existing implementations checked

| Searched for | Where | Command | Result |
|---|---|---|---|
| an existing bill-splitting page or split function | this repository | `grep -ril "split" --include=*.html --include=*.js .` | no file found at S2. The repository held 0 `.html` and 0 `.js` files (`git ls-files '*.html' '*.js'` printed nothing), so the search shows only that no such file existed. |
| a second copy of the page | the RUN FOLDER | `cmp skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html` | `review/index.html` is a deliberate copy for the planted defect of rule 16.7. It differs from the page only between the seeder's change and the end of that audit round. |
