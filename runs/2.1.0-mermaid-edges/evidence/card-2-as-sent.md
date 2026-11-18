**Decision 1 of 2 — more independent sessions**

(a) Do you approve raising the number of independent sessions from 3 to 5?

(b) I recommend `raise to 5`, because the independent tester found 4 faults in my fix, and a new session must test each repair.

(c) `raise to 5`: 1 session re-tests the repairs, 1 does the final check, and 1 is spare for a second repair round; you give up 2 more sessions. `raise to 4`: no spare; if the re-test finds a fault, I ask you again. `keep 3`: the re-test or the final check does not run, and the work arrives marked not finished.

(d) Reply `raise to 5`, `raise to 4` or `keep 3`.

**Decision 2 of 2 — the second arrow on a line**

(a) Do you accept that the checker tests only the first arrow on a line, so `A -- reads --> B --> C` passes although the arrow into `C` has no label?

(b) I recommend `leave it`, because you chose `3 forms only`, which left several links on 1 line outside this fix.

(c) `leave it`: the fix stays small, and the code and the report state the limit; such an edge keeps passing. `fix it`: every arrow on a line is tested; the acceptance statements gain 1 statement and return to you, and 1 more independent session attacks the change.

(d) Reply `leave it` or `fix it`.

**What the independent tester found** (session 6b750018b2914b0a9b8d30fafc55d59d; all 7 acceptance statements passed their tests)

- Fault 1: `A --x B --> C` and `A -- reads --- B --> C` now pass; before my change they failed. I will repair it.
- Fault 2: a label in quotation marks, `A == "reads" ==> B`, fails as having no label. I will repair it.
- Fault 3: decision 2 above.
- Fault 4: a sentence outside the diagram that holds `==>` is read as an edge. I will repair it by reading edges only inside the diagram block. This reverses my earlier choice "handled as today" for text outside the diagram; you may reverse it back.
