**Decision — the 6 faults still open**

(a) Do you accept the 6 open faults (F-4 to F-9) as known limits, or do you want 1 more repair round?

(b) I recommend `accept`, because the 3 lines you named and all 7 acceptance statements pass, and each repair round turned up new faults.

(c) `accept`: the final check runs with session 4, and the report lists the 6 limits; such lines keep getting the wrong result. `one more round`: I repair F-4, F-6, F-7 and F-8, and a new session re-tests them; you give up 1 more session, and it may find more. F-5 stays either way.

(d) Reply `accept` or `one more round`.

**The 6 open faults** (found by the second independent tester, session cecdcf81310d47498b7a6dfc923e59b9, at commit 5099f2a)

- F-4, fragile: a sentence that holds `==>` inside the diagram block, or in a file with no diagram block, is read as an edge.
- F-5, wrong result: `A == reads ==> B --> C` passes; the arrow into `C` has no label. Only the first arrow on a line is tested.
- F-6, wrong result: `A -. reads .- B -.-> C` passes.
- F-7, wrong result: `A --oB --> C`, `A>a -- b] --> B`, `A["a ] -- b"] --> B` and `A -- "" --> B` pass.
- F-8, fragile: a second diagram in a `~~~mermaid` block is not read.
- F-9, wording only: the message for `A ---> B` now shows the arrow as typed.

**Closed:** the second tester confirmed that faults F-1 and F-2 no longer occur, and all 7 acceptance statements passed again. You accepted F-3 earlier.
