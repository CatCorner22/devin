# MINDMAP — bill-splitting page

Form: rule 9.2. Updated within the WORK UNIT in which a node appears.

- Goal: a real small deliverable that shows the skill set running (V1)
  - Task chosen: a page that splits a restaurant bill, tip added (T1)
    - C1 1 file, works from disk — D-6
    - C2 tip, total and payments shown; half a cent rounds up — D-4, D-5
      - F-3 tip rounding had no rule (BLOCKER, fix awaits re-audit)
    - C3 payments sum to the total; tested through the page's own fields — D-5
      - F-5 the test ran a function, not the page (BLOCKER, fix awaits re-audit)
    - C4 3 states; what counts as an amount — D-5
      - F-4 `12,50` had no defined result (BLOCKER, fix awaits re-audit)
    - C5 3 widths, labels, announced regions, keypad hints
    - C6 sentence when JavaScript is off
    - C7 stores nothing, sends nothing; policy tag — D-6
      - F-2 no answer to how a phone gets the page (BLOCKER, fix awaits re-audit)
  - C8 3 browser-only checks; SHA-256 of the page — D-7
    - F-1 the request was called the USER's words (BLOCKER, fix awaits re-audit)
  - Record
    - F-6 A-3 and A-4 were checkable and left unchecked (BLOCKER, fix awaits re-audit)
    - F-7 state files were behind the log (BLOCKER, fix awaits re-audit)

```mermaid
graph TD
  GOAL[Goal: a real small deliverable that shows the skill set running] --> T1[Task: bill-splitting page]
  GOAL --> C8[C8 browser-only checks]
  T1 --> C1[C1 one file]
  T1 --> C2[C2 tip, total, payments]
  T1 --> C3[C3 payments sum to total]
  T1 --> C4[C4 three states, input rules]
  T1 --> C5[C5 widths, labels, keypad]
  T1 --> C6[C6 no-JavaScript sentence]
  T1 --> C7[C7 stores and sends nothing]
  C1 --> D6[D-6 one file, policy tag, not hosted]
  C7 --> D6
  C2 --> D4[D-4 even split, whole-number tip]
  C2 --> D5[D-5 splitBill, half-up, digits to cents]
  C3 --> D5
  C4 --> D5
  C8 --> D7[D-7 report opens with 3 checks]
  C8 --> F1[F-1 BLOCKER]
  C7 --> F2[F-2 BLOCKER]
  C2 --> F3[F-3 BLOCKER]
  C4 --> F4[F-4 BLOCKER]
  C3 --> F5[F-5 BLOCKER]
  GOAL --> REC[Record]
  REC --> F6[F-6 BLOCKER]
  REC --> F7[F-7 BLOCKER]
```
