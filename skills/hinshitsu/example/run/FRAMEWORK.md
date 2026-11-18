# FRAMEWORK — bill-splitting page

Form: section 7. Superseded lines stay, marked.

## 1. CRITERIA

By reference: the controlling `CRITERIA` entry in `AUDIT-LOG.md`. None exists at S2; this part is updated at S4 and S6.

## 2. Architecture decisions

None at S2. Each decision is added here with its `D-<n>` ID when logged.

## 3. Naming conventions

- IDs: `E-<n>`, `C<n>`, `G<n>`, `A-<n>`, `D-<n>`, `WU-<n>`, `F-<n>`, `S<n>` (rule 9.5).
- Report files: `audits/<WU>-<role>-<LAUNCH ID>.md`; LENS memos: `memos/lens-<name>-<LAUNCH ID>.md`.

## 4. Contracts between parts

None at S2.

## 5. File ownership

| Path | Built by | Audited by |
|---|---|---|
| `skills/hinshitsu/example/index.html` | BUILDER (the orchestrator session) | the 8 AUDITOR roles, each a child Devin session |
| `skills/hinshitsu/example/run/audits/`, `memos/` | the SUB-AGENT that wrote each report; saved whole by the ORCHESTRATOR | final AUDITOR |
| every other file in the RUN FOLDER | ORCHESTRATOR | final AUDITOR |

## 6. WORK UNITS

| ID | What | Status |
|---|---|---|
| WU-1 | `index.html`, the whole page | not started |

## 7. Existing implementations checked

| Searched for | Where | Command | Result |
|---|---|---|---|
| an existing bill-splitting page or split function | this repository | `grep -ril "split" --include=*.html --include=*.js .` | no file found at S2 |
