**Decision 1 of 2 — the acceptance statements**

(a) Do you approve the 7 statements in the attached file as the test of whether this fix is finished?

(b) I recommend `approve`, because they hold your 3 arrow cases, the 2 results that must stay as they are, the 4 thick and dotted arrows that carry a label, the tests, and a limit of 2 changed files.

(c) `approve`: I build the fix, and 2 independent sessions test it against exactly these statements; you give up changing them later without a new request. `change`: you get your wording; it costs 1 more round of this message. `reject`: nothing is built.

(d) Reply `approve`, or `change C<number>: <new text>`, or `reject`.

**Decision 2 of 2 — arrow forms you did not name**

(a) Do you want this fix to also test the arrow forms you did not name: no arrowhead (`A --- B`), circle and cross ends (`--o`, `--x`), 2-way arrows (`<-->`), and several links on 1 line?

(b) I recommend `3 forms only`, because each added form can make a file that passes today fail.

(c) `3 forms only`: 2 changed files, checked by 2 independent sessions; the other forms stay untested, and the report lists them. `all forms`: those forms are tested too; decision 1 returns to you with additions, and the full review runs, about 20 more independent sessions.

(d) Reply `3 forms only` or `all forms`.

**Choices I made that you may reverse (1 line each)**

- Lines that are not edges, an empty file, and arrows inside a box's text: handled as today.
- Undo: the fix is in commits on the new branch only; `git revert` removes it.
- Upkeep: each tested arrow form has a test with its name; the report lists the forms not tested.
- Failure message: it shows the arrow as typed, for example `edge A ==> B has no label`.
- Thick and dotted arrows that carry a label (`==>|text|`, `== text ==>`, `-.->|text|`, `-. text .->`) pass.
- No changelog line and no version change: the changelog is for changes to the skills.

**2 things I assume about the people who use the checker, with no proof**

- They write at most 1 link on a line. If not, the second link on a line stays untested, as today.
- They write a label on a thick or dotted arrow in 1 of the 4 forms above. If not, that edge fails as having no label.

**Independent sessions planned for the whole run: 3** (1 already used to test that such sessions start with no knowledge of this conversation).
