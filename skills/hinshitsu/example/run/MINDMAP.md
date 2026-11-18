# MINDMAP — bill-splitting page

Form: rule 9.2. Updated within the WORK UNIT in which a node appears.

- Goal: a real small deliverable that shows the skill set running (V1)
  - Task chosen: a page that splits a restaurant bill, tip added (T1)
    - WU-1 `index.html`, the whole page (not started)
    - C1 1 file, works from disk
      - D-8 1 file, policy tag, published with GitHub Pages after its audits
        - D-6 superseded
          - D-3 superseded
    - C2 tip, total and payments shown; half a cent rounds up
      - D-4 even split, whole-number tip
        - D-1 superseded
      - D-5 `splitBill`, half-up rounding, digits to cents
        - D-2 superseded
      - F-3 tip rounding had no rule (BLOCKER, FIXED)
    - C3 payments sum to the total; tested through the page's own fields
      - F-5 the test ran a function, not the page (BLOCKER, FIXED)
      - F-11 a spot case was written with a comma (STYLE, FIXED)
    - C4 3 states; what counts as an amount and as a whole number
      - F-4 `12,50` had no defined result (BLOCKER, FIXED)
      - F-10 no text rule for a whole number (DEFECT, FIXED)
    - C5 3 widths, labels, announced regions, keypad hints
    - C6 sentence when JavaScript is off
    - C7 stores nothing, sends nothing; policy tag
      - F-2 no answer to how a phone gets the page (BLOCKER, FIXED)
  - C8 3 browser-only checks; SHA-256 of the page
    - D-7 the report opens with 3 checks
    - F-1 the request was called the USER's words (BLOCKER, FIXED)
  - Record
    - F-6 2 PREMISES were checkable and left unchecked (BLOCKER, FIXED)
    - F-7 state files were behind the log (BLOCKER, open after 3 rounds; fourth fix made, not re-audited)
    - F-8 a PREMISE cited EVIDENCE it did not have (DEFECT, FIXED)
    - F-9 2 evidence files held no command (DEFECT, FIXED)
    - F-12 gaps called answered with no answer (DEFECT, FIXED)
    - F-13 the session state left out 2 evidence files (DEFECT, FIXED)
    - F-14 a saved scope differed from the scope sent (DEFECT, open)

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
  C1 --> D8[D-8 one file, policy tag, published after audits]
  C7 --> D8
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
  REC --> F8[F-8 DEFECT]
  REC --> F9[F-9 DEFECT]
  REC --> F12[F-12 DEFECT]
  REC --> F13[F-13 DEFECT]
  C4 --> F10[F-10 DEFECT]
  C3 --> F11[F-11 STYLE]
  T1 --> WU1[WU-1 index.html]
  D4 --> D1[D-1 superseded]
  D5 --> D2[D-2 superseded]
  D8 --> D6[D-6 superseded]
  D6 --> D3[D-3 superseded]
  REC --> F14[F-14 DEFECT]
```
