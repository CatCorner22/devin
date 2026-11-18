# MINDMAP — Mermaid edge forms in the CONNECTIONS.md label check

Form required by rule 9.2 (`skills/hinshitsu-record/SKILL.md`).

## Hierarchy

- **Goal:** "The checker's test for unlabelled edges in CONNECTIONS.md misses 2 of Mermaid's arrow forms and misreads a third. `A ==> B` and `C -.-> D` pass with no label, and `A -- reads --> B` fails though it has a label. Fix it in `scripts/hinshitsu_check.py`, with tests."
  - **C1** `A ==> B` fails with `no label`
    - **WU-1** the unlabeled-edge test in `scripts/hinshitsu_check.py` and its tests in `tests/test_check.py`
      - **D-1** test the first arrow link on each line; 3 link kinds; 2 label forms
        - **F-1** DEFECT — a second link on a line, or `--x`, `--o`, counts as the label of a later arrow — open
        - **F-2** DEFECT — a label in quotation marks or brackets between the halves of a link fails as no label — open
        - **F-3** DEFECT — the second link on a line is not tested, and 1 more unlabeled edge passes — open
        - **F-4** FRAGILITY — prose lines and `.->` are read as edges — open
      - **D-2** the failure message names the arrow as written
  - **C2** `C -.-> D` fails with `no label`
  - **C3** `A -- reads --> B` passes
  - **C4** the 2 verdicts of commit 93311ab stay
  - **C5** the 4 labelled thick and dotted forms pass
  - **C6** the tests exist, pass, and fail against commit 93311ab
  - **C7** 2 files changed, no new import, lint passes

## Diagram

```mermaid
graph TD
  G["Goal: fix the unlabelled-edge test in scripts/hinshitsu_check.py, with tests"]
  G --> C1["C1 A ==> B fails"]
  G --> C2["C2 C -.-> D fails"]
  G --> C3["C3 A -- reads --> B passes"]
  G --> C4["C4 the 2 verdicts of 93311ab stay"]
  G --> C5["C5 labelled thick and dotted forms pass"]
  G --> C6["C6 tests exist, pass, and fail against 93311ab"]
  G --> C7["C7 2 files, no new import, lint passes"]
  C1 --> WU1["WU-1 edge test and its tests"]
  WU1 --> D1["D-1 first arrow link on each line"]
  WU1 --> D2["D-2 message names the arrow"]
  D1 --> F1["F-1 DEFECT: earlier link counts as a label (open)"]
  D1 --> F2["F-2 DEFECT: quoted label fails (open)"]
  D1 --> F3["F-3 DEFECT: second link on a line not tested (open)"]
  D1 --> F4["F-4 FRAGILITY: prose lines read as edges (open)"]
```

## Node check

| Kind | Count in `AUDIT-LOG.md` | Count in this map |
|---|---|---|
| CRITERIA | 7 | 7 |
| WORK UNITS | 1 | 1 |
| Decisions | 2 | 2 |
| FINDINGS | 4 | 4 |
