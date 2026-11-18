identifier: devin-6b750018b2914b0a9b8d30fafc55d59d (Devin session ID; https://app.devin.ai/sessions/6b750018b2914b0a9b8d30fafc55d59d)

# WU-1 correctness audit — commit fe82be2

Verdict: C1 to C7 each pass their named tests. 4 FINDINGS: 3 DEFECT, 1 FRAGILITY. No BLOCKER.

## Scope received

# Role scope — Correctness auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Test each CRITERION against the DELIVERABLE. Run every test the CRITERIA name. Read every function and every branch (each `if`, `else`, `case`, loop exit, error path and early return) and state for each whether it does what the CRITERIA require. Hunt for wrong results, missing behavior and behavior nobody asked for.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: repository `CatCorner22/devin` on GitHub, branch `devin/hinshitsu-run-2.1.0`; `scripts/hinshitsu_check.py` lines 27-37 and 293-301; `tests/test_check.py` lines 105-108 and 219-236; the change is `git diff 93311ab fe82be2 -- scripts tests`
- Commit under review: fe82be2
- CRITERIA, word for word from entry E-25:

In each CRITERION, "the fixture" is the run folder that `good_run()` in `tests/test_check.py` builds, with the 1 edge line of its `CONNECTIONS.md` replaced by the line named. `<name>` in a test stands for `python3 -m unittest discover -s tests -k <name> -v`, run from the repository root, which must exit 0.

- C1. On the fixture with the line `A ==> B`, `check()` returns the failure `CONNECTIONS.md: edge A ==> B has no label (rule 9.3)`, and `main()` returns 1. Test: `test_unlabeled_thick_edge_fails` and `test_edge_forms_set_the_exit_code`.
- C2. On the fixture with the line `C -.-> D`, `check()` returns the failure `CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)`, and `main()` returns 1. Test: `test_unlabeled_dotted_edge_fails` and `test_edge_forms_set_the_exit_code`.
- C3. On the fixture with the line `A -- reads --> B`, `check()` returns no failure that holds `no label`, and `main()` returns 0. Test: `test_edge_with_label_between_dashes_passes` and `test_edge_forms_set_the_exit_code`.
- C4. The 2 verdicts of commit 93311ab stay: `A --> B` gives a failure that holds `no label`, `A -->|reads| B` gives none, and the script prints the same `FAIL` lines as the script of commit 93311ab on `skills/hinshitsu/example/run` and on `build-record`. Test: `test_unlabeled_edge_fails`; `test_good_run_passes_every_stage`; and `git show 93311ab:scripts/hinshitsu_check.py > /tmp/old_check.py; for d in skills/hinshitsu/example/run build-record; do diff <(python3 /tmp/old_check.py --stage delivery $d) <(python3 scripts/hinshitsu_check.py --stage delivery $d) && echo same; done`, which must print `same` 2 times.
- C5. On the fixture with each of the 4 lines `A ==>|reads| B`, `A == reads ==> B`, `C -.->|reads| D` and `C -. reads .-> D`, `check()` returns no failure that holds `no label`. Test: `test_labeled_thick_and_dotted_edges_pass`.
- C6. `tests/test_check.py` holds the 5 tests named in C1, C2, C3 and C5, in the class `Check`, built from `good_run()`; the whole suite passes; and the 4 tests named in C1, C2 and C3 fail against the script of commit 93311ab. Test: `python3 -m unittest discover -s tests` exits 0; and `git worktree add /tmp/base 93311ab && cp tests/test_check.py /tmp/base/tests/ && (cd /tmp/base && python3 -m unittest discover -s tests -k edge)` exits 1 and reports those 4 tests as failed.
- C7. Compared with commit 93311ab, the branch `devin/hinshitsu-run-2.1.0` changes, outside `runs/`, only `scripts/hinshitsu_check.py` and `tests/test_check.py`; it adds no `import` line; and `python3 scripts/lint.py` exits 0. Test: `git diff --stat 93311ab -- . ':!runs'` lists those 2 files only; `git diff 93311ab -- scripts tests | grep -E '^\+\s*(import|from) '` prints nothing; `python3 scripts/lint.py` exits 0.
- Status: FROZEN
- Approval: "Decision 1: approve. Decision 2: 3 forms only." (the USER, Wednesday, 2026-11-18 14:42 EST, which is 19:42 UTC; E-22)

- Glossary: `skills/hinshitsu/GLOSSARY.md`
- How to return the report: send the report as your last message in this session, whole, and attach the same text as 1 Markdown file named `WU-1-correctness.md`. For each test the CRITERIA name, let the command itself write its complete output to a text file (a redirect) outside the repository, and attach each of those files.

## Report

Write 1 report, in Markdown, in this order:

1. First line: the identifier that your runtime gave this run (session ID, task ID or agent ID). If you cannot read it, write `identifier: not visible to me`.
2. `## Scope received` — this scope, word for word.
3. `## Examined` — each file with line ranges, each command you ran with its complete output, each page you opened with what you did.
4. `## Findings` — number them 1, 2, 3. For each: **Class** (BLOCKER, DEFECT, FRAGILITY or STYLE, as `GLOSSARY.md` defines them); **Where** (file and line, or artifact and heading); **Trigger** (the exact steps, input or command that reproduce it, and what appears); **Violates** (the CRITERION ID or the rule number); **Proposed fix**.
5. `## Not examined` — what you did not examine, and why.

## Limits

- You did not build this work. Do not change the DELIVERABLE or any file in the RUN FOLDER; propose each fix in your report.
- Read only the files this scope names, and files those files reference.
- Report what you observed. Do not report a check that you did not run. A check that you cannot run is UNVERIFIED, with the reason.
- If you find nothing, say so, and list under `Examined` what you checked. Do not invent a finding and do not withhold one.

## Examined

### Where the checks ran

A detached worktree of commit fe82be2 at `/home/ubuntu/audit/wt`, outside the repository checkout. I changed no file of the DELIVERABLE and no file of the RUN FOLDER. The branch `origin/devin/hinshitsu-run-2.1.0` pointed at 03b0161 when I ran; fe82be2 is an ancestor of it, and the commits after fe82be2 change files under `runs/` only (output in the branch-tip file below).

### Files read

- `scripts/hinshitsu_check.py` lines 22-40 (the 4 new constants, lines 28-37), lines 286-306 (the connections block, lines 293-301), lines 494-530 (`main()`).
- `tests/test_check.py` lines 1-125 (`good_run()`, `edit()`, `edge_run()` at 105-108, `assertFails`) and lines 205-240 (the 5 new tests at 219-236, and `test_unlabeled_edge_fails` at 214-217).
- `skills/hinshitsu/GLOSSARY.md` lines 1-80 (roles, things, finding classes, states).
- `git diff 93311ab fe82be2 -- scripts tests`, whole: 2 files, 40 insertions, 2 deletions.

### Branches read, with what each does

| Branch | What it does | Required by |
|---|---|---|
| Line 295, `if p.is_file()` | Skips the block when `CONNECTIONS.md` is absent. Same as 93311ab. | C4 |
| Line 297, loop over `EDGE_RE` | Takes the first `-->`, `==>` or `-.->` link, with no `\|` after it, on each line that starts with a word. A line with `\|label\|` after the first arrow gives no match. Loop ends when no line matches. | C1, C2, C4, C5 |
| Line 299, `kind` | `=` for a thick arrow, `.` for a dotted arrow, `-` otherwise. Correct for all 9 lines the CRITERIA name. | C1, C2, C3, C5 |
| Line 300, `if not LABEL_OPEN_RE[kind].search(...)` true | Reports `CONNECTIONS.md: edge <src> <arrow> <dst> has no label (rule 9.3)`. Exact text matches C1 and C2. | C1, C2, C4 |
| Line 300, false | A `--`, `==` or `-.` opener with text after it sits before the arrow: no report. See FINDINGS 1 and 2 for inputs where this branch gives a wrong result. | C3, C5 |
| Line 303, `if stage == "plan": return errors` | Unchanged. The edge check runs at every stage; I ran the 9 named lines at `plan`, `unit` and `delivery` (probe output below). | C1 to C5 |
| `main()` lines 517-522 | Unchanged. Returns 1 when `check()` returns any failure, else 0. | C1, C2, C3 |
| `edge_run()` lines 105-108 | Builds `good_run()`, replaces the 1 edge line. `edit()` asserts the old line is present, so a test cannot pass on an unchanged fixture. | C6 |

### Result for each CRITERION

| CRITERION | Result | Basis |
|---|---|---|
| C1 | PASS | Commands 1 and 4; probe: `A ==> B` gives the exact failure and `main()` returns 1 at all 3 stages |
| C2 | PASS | Commands 2 and 4; probe: same for `C -.-> D` |
| C3 | PASS | Commands 3 and 4; probe: no failure, `main()` returns 0 at all 3 stages |
| C4 | PASS | Commands 5, 6, 7: `same` printed 2 times |
| C5 | PASS | Command 8; probe: all 4 lines give no failure at all 3 stages |
| C6 | PASS | Command 9: 76 tests, exit 0. Command 10: exit 1; the failures are the 4 tests of C1, C2 and C3 and no other (6 failure records, because `test_edge_forms_set_the_exit_code` has 3 subtests). The 5 tests are in class `Check` and call `edge_run()`, which calls `good_run()` |
| C7 | PASS | Commands 11 to 14: 2 files only, at fe82be2 and at the branch tip 03b0161; grep printed nothing (exit 1); lint exit 0 at both commits |

### Commands the CRITERIA name, each with its complete output

All ran from `/home/ubuntu/audit/wt` (the repository root at fe82be2). Each output file sat in `/home/ubuntu/audit/out/`; the paths are shortened here. Each file is attached.

1. C1. Command: `python3 -m unittest discover -s tests -k test_unlabeled_thick_edge_fails -v > c1-thick.txt 2>&1`. Exit code: 0. Output file `c1-thick.txt`:

````text
test_unlabeled_thick_edge_fails (test_check.Check.test_unlabeled_thick_edge_fails) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.005s

OK
````

2. C2. Command: `python3 -m unittest discover -s tests -k test_unlabeled_dotted_edge_fails -v > c2-dotted.txt 2>&1`. Exit code: 0. Output file `c2-dotted.txt`:

````text
test_unlabeled_dotted_edge_fails (test_check.Check.test_unlabeled_dotted_edge_fails) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.006s

OK
````

3. C3. Command: `python3 -m unittest discover -s tests -k test_edge_with_label_between_dashes_passes -v > c3-between-dashes.txt 2>&1`. Exit code: 0. Output file `c3-between-dashes.txt`:

````text
test_edge_with_label_between_dashes_passes (test_check.Check.test_edge_with_label_between_dashes_passes) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.005s

OK
````

4. C1, C2, C3. Command: `python3 -m unittest discover -s tests -k test_edge_forms_set_the_exit_code -v > c1-c2-c3-exit-code.txt 2>&1`. Exit code: 0. Output file `c1-c2-c3-exit-code.txt`:

````text
test_edge_forms_set_the_exit_code (test_check.Check.test_edge_forms_set_the_exit_code) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.011s

OK
FAIL CONNECTIONS.md: edge A ==> B has no label (rule 9.3)
hinshitsu_check (plan): 1 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
FAIL CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)
hinshitsu_check (plan): 1 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
hinshitsu_check (plan): 0 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
````

5. C4. Command: `python3 -m unittest discover -s tests -k test_unlabeled_edge_fails -v > c4-unlabeled-edge.txt 2>&1`. Exit code: 0. Output file `c4-unlabeled-edge.txt`:

````text
test_unlabeled_edge_fails (test_check.Check.test_unlabeled_edge_fails) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.005s

OK
````

6. C4. Command: `python3 -m unittest discover -s tests -k test_good_run_passes_every_stage -v > c4-good-run.txt 2>&1`. Exit code: 0. Output file `c4-good-run.txt`:

````text
test_good_run_passes_every_stage (test_check.Check.test_good_run_passes_every_stage) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.011s

OK
````

7. C4. Command: `bash -c 'git show 93311ab:scripts/hinshitsu_check.py > /tmp/old_check.py; for d in skills/hinshitsu/example/run build-record; do diff <(python3 /tmp/old_check.py --stage delivery $d) <(python3 scripts/hinshitsu_check.py --stage delivery $d) && echo same; done' > c4-diff-old-new.txt 2>&1`. Exit code: 0. Output file `c4-diff-old-new.txt`:

````text
same
same
````

8. C5. Command: `python3 -m unittest discover -s tests -k test_labeled_thick_and_dotted_edges_pass -v > c5-labeled.txt 2>&1`. Exit code: 0. Output file `c5-labeled.txt`:

````text
test_labeled_thick_and_dotted_edges_pass (test_check.Check.test_labeled_thick_and_dotted_edges_pass) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.014s

OK
````

9. C6. Command: `python3 -m unittest discover -s tests > c6-whole-suite.txt 2>&1`. Exit code: 0. Output file `c6-whole-suite.txt`:

````text
.............................................hinshitsu check: test the form of a run's record.

Usage: hinshitsu_check.py [--stage plan|unit|delivery] <run-folder>
       hinshitsu_check.py --record <run-folder>   (state files against the log, rule 14.6)
Exit 0 when every check for the stage passes, 1 when any fails, 2 on a usage error.
Standard library only. Same folder in, same verdict out.

This script tests the shape of the record: that entries, citations, cells and
files exist and agree with each other. It does not prove that any check ran or
that any report is true (rule 17.7).
...............................
----------------------------------------------------------------------
Ran 76 tests in 1.150s

OK
FAIL CONNECTIONS.md: edge A ==> B has no label (rule 9.3)
hinshitsu_check (plan): 1 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
FAIL CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)
hinshitsu_check (plan): 1 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
hinshitsu_check (plan): 0 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
hinshitsu_check (record): 0 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
FAIL MINDMAP.md:1: calls F-1 closed; the log holds no closing entry (rule 14.6)
hinshitsu_check (record): 1 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
````

10. C6. Command: `bash -c 'git worktree add /tmp/base 93311ab && cp tests/test_check.py /tmp/base/tests/ && (cd /tmp/base && python3 -m unittest discover -s tests -k edge)' > c6-base-edge.txt 2>&1`. Exit code: 1. Output file `c6-base-edge.txt`:

````text
Preparing worktree (detached HEAD 93311ab)
HEAD is now at 93311ab version 2.1.0: round-2 auditor answered (12 rules made testable, rules 0.2, 0.3, 23.10, checker and gauge error handling, adapters, README, EXAMPLE citations, cold-start transcript); build record E-022, E-023; delivery report rewritten
FFFF....F.F
======================================================================
FAIL: test_edge_forms_set_the_exit_code (test_check.Check.test_edge_forms_set_the_exit_code) (line='A ==> B')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/tmp/base/tests/test_check.py", line 236, in test_edge_forms_set_the_exit_code
    self.assertEqual(hcheck.main(["x", "--stage", "plan", str(edge_run(line))]), code)
AssertionError: 0 != 1

======================================================================
FAIL: test_edge_forms_set_the_exit_code (test_check.Check.test_edge_forms_set_the_exit_code) (line='C -.-> D')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/tmp/base/tests/test_check.py", line 236, in test_edge_forms_set_the_exit_code
    self.assertEqual(hcheck.main(["x", "--stage", "plan", str(edge_run(line))]), code)
AssertionError: 0 != 1

======================================================================
FAIL: test_edge_forms_set_the_exit_code (test_check.Check.test_edge_forms_set_the_exit_code) (line='A -- reads --> B')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/tmp/base/tests/test_check.py", line 236, in test_edge_forms_set_the_exit_code
    self.assertEqual(hcheck.main(["x", "--stage", "plan", str(edge_run(line))]), code)
AssertionError: 1 != 0

======================================================================
FAIL: test_edge_with_label_between_dashes_passes (test_check.Check.test_edge_with_label_between_dashes_passes)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/tmp/base/tests/test_check.py", line 226, in test_edge_with_label_between_dashes_passes
    self.assertFalse(any("no label" in x for x in hcheck.check(edge_run("A -- reads --> B"), "plan")))
AssertionError: True is not false

======================================================================
FAIL: test_unlabeled_dotted_edge_fails (test_check.Check.test_unlabeled_dotted_edge_fails)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/tmp/base/tests/test_check.py", line 223, in test_unlabeled_dotted_edge_fails
    self.assertIn("CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)", hcheck.check(edge_run("C -.-> D"), "plan"))
AssertionError: 'CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)' not found in []

======================================================================
FAIL: test_unlabeled_thick_edge_fails (test_check.Check.test_unlabeled_thick_edge_fails)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/tmp/base/tests/test_check.py", line 220, in test_unlabeled_thick_edge_fails
    self.assertIn("CONNECTIONS.md: edge A ==> B has no label (rule 9.3)", hcheck.check(edge_run("A ==> B"), "plan"))
AssertionError: 'CONNECTIONS.md: edge A ==> B has no label (rule 9.3)' not found in []

----------------------------------------------------------------------
Ran 9 tests in 0.044s

FAILED (failures=6)
hinshitsu_check (plan): 0 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
hinshitsu_check (plan): 0 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
FAIL CONNECTIONS.md: edge A --> B has no label (rule 9.3)
hinshitsu_check (plan): 1 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
````

11. C7. Command: `git diff --stat 93311ab -- . ':!runs' > c7-diff-stat-fe82be2.txt 2>&1`. Exit code: 0. Output file `c7-diff-stat-fe82be2.txt`:

````text
 scripts/hinshitsu_check.py | 17 +++++++++++++++--
 tests/test_check.py        | 25 +++++++++++++++++++++++++
 2 files changed, 40 insertions(+), 2 deletions(-)
````

12. C7. Command: `git diff --stat 93311ab origin/devin/hinshitsu-run-2.1.0 -- . ':!runs' > c7-diff-stat-branch-tip-03b0161.txt 2>&1`. Exit code: 0. Output file `c7-diff-stat-branch-tip-03b0161.txt`:

````text
 scripts/hinshitsu_check.py | 17 +++++++++++++++--
 tests/test_check.py        | 25 +++++++++++++++++++++++++
 2 files changed, 40 insertions(+), 2 deletions(-)
````

13. C7. Command: `git diff 93311ab -- scripts tests | grep -E '^\+\s*(import|from) ' > c7-import-grep.txt 2>&1`. Exit code: 1. Output file `c7-import-grep.txt`:

````text
(empty: the command printed nothing)
````

14. C7. Command: `python3 scripts/lint.py > c7-lint.txt 2>&1`. Exit code: 0. Output file `c7-lint.txt`:

````text
lint: 0 failure(s). This script tests form; it does not prove that any rule is sound.
````


### Commands I added

15. Old script against new script on the 9 lines of the CRITERIA at 3 stages, and on 71 other edge lines at stage `plan`. Command: `python3 /home/ubuntu/audit/probe.py > probe-old-vs-new.txt 2>&1`. Exit code: 0. Each tuple is (`main()` return, `check()` list). The probe script:

````python
import importlib.util, sys, io, contextlib
sys.path.insert(0, "tests")
import test_check as t
new = t.hcheck
spec = importlib.util.spec_from_file_location("old", "/tmp/old_check.py"); old = importlib.util.module_from_spec(spec); spec.loader.exec_module(old)
def run(mod, line, stage):
    d = t.edge_run(line)
    errs = mod.check(d, stage)
    with contextlib.redirect_stdout(io.StringIO()):
        rc = mod.main(["x", "--stage", stage, str(d)])
    return rc, errs
print("## criteria lines, every stage (new script)")
for line in ["A ==> B", "C -.-> D", "A -- reads --> B", "A --> B", "A -->|reads| B", "A ==>|reads| B", "A == reads ==> B", "C -.->|reads| D", "C -. reads .-> D"]:
    for st in ("plan", "unit", "delivery"):
        print(repr(line), st, run(new, line, st))
print("## probes: old vs new at stage plan")
P = ["A-->B", "A==>B", "C-.->D", "A ---> B", "A ===> B", "C -..-> D", "A --reads--> B", "A ==reads==> B", "C -.reads.-> D",
 'A -- "reads" --> B', 'A == "reads" ==> B', 'C -. "reads" .-> D', "A -- (reads) --> B", "A -- [1] --> B", "A -- {x} --> B",
 'A -- reads "x" --> B', "A[a -- b] --> B", 'A["a -- b"] --> B', "A(a == b) ==> B", "A[one] -- reads --> B[two]",
 "A --x B --> C", "A --o B --> C", "A --- B --> C", "A -- reads --- B --> C", "A --> B --> C", "A -- reads --> B --> C", "A -->|reads| B --> C",
 "A --> B -- reads --> C", "A ==> B == reads ==> C", "A -- reads ==> B", "A == reads --> B", "A -- reads -.-> B", "A -. reads --> B",
 "A -- --> B", "A --  --> B", "A --> |reads| B", "A ==> |reads| B", "A -->|reads|B", "A <--> B", "A <==> B", "A <-.-> B", "A x--x B",
 "A & B --> C", "A --> B & C", "my-node --> B", "my-node -- reads --> B", "A.->B", "A .-> B", "A ..-> B", "A -. .-> B",
 "%% A ==> B", "note: see A ==> B for detail", "Text with a.b...-> c", "A ~~~ B", "A --> B;", "A-- reads -->B", "A -- reads -->|also| B",
 "A --\treads --> B", "A -- - --> B", "A -- > --> B", "A -- reads -- more --> B", "A --- reads --> B", "A -.- B", "A === B",
 "A ==> B\n  C -.-> D\n  E --> F", "A -- reads --> B\n  C ==> D", "subgraph one\n  A ==> B\n  end", "A:::cls ==> B", "A@{ shape: rect } --> B", "A e1@--> B", "A e1@==> B"]
for line in P:
    o = run(old, line, "plan"); n = run(new, line, "plan")
    print("%-34r old=%d %s | new=%d %s%s" % (line, o[0], [x for x in o[1]], n[0], [x for x in n[1]], "" if o == n else "   <-- DIFFERS"))
````

Output file `probe-old-vs-new.txt`:

````text
## criteria lines, every stage (new script)
'A ==> B' plan (1, ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)'])
'A ==> B' unit (1, ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)'])
'A ==> B' delivery (1, ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)'])
'C -.-> D' plan (1, ['CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)'])
'C -.-> D' unit (1, ['CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)'])
'C -.-> D' delivery (1, ['CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)'])
'A -- reads --> B' plan (0, [])
'A -- reads --> B' unit (0, [])
'A -- reads --> B' delivery (0, [])
'A --> B' plan (1, ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'])
'A --> B' unit (1, ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'])
'A --> B' delivery (1, ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'])
'A -->|reads| B' plan (0, [])
'A -->|reads| B' unit (0, [])
'A -->|reads| B' delivery (0, [])
'A ==>|reads| B' plan (0, [])
'A ==>|reads| B' unit (0, [])
'A ==>|reads| B' delivery (0, [])
'A == reads ==> B' plan (0, [])
'A == reads ==> B' unit (0, [])
'A == reads ==> B' delivery (0, [])
'C -.->|reads| D' plan (0, [])
'C -.->|reads| D' unit (0, [])
'C -.->|reads| D' delivery (0, [])
'C -. reads .-> D' plan (0, [])
'C -. reads .-> D' unit (0, [])
'C -. reads .-> D' delivery (0, [])
## probes: old vs new at stage plan
'A-->B'                            old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A==>B'                            old=0 [] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)']   <-- DIFFERS
'C-.->D'                           old=0 [] | new=1 ['CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)']   <-- DIFFERS
'A ---> B'                         old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A ---> B has no label (rule 9.3)']   <-- DIFFERS
'A ===> B'                         old=0 [] | new=1 ['CONNECTIONS.md: edge A ===> B has no label (rule 9.3)']   <-- DIFFERS
'C -..-> D'                        old=0 [] | new=1 ['CONNECTIONS.md: edge C -..-> D has no label (rule 9.3)']   <-- DIFFERS
'A --reads--> B'                   old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A ==reads==> B'                   old=0 [] | new=0 []
'C -.reads.-> D'                   old=0 [] | new=0 []
'A -- "reads" --> B'               old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A == "reads" ==> B'               old=0 [] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)']   <-- DIFFERS
'C -. "reads" .-> D'               old=0 [] | new=1 ['CONNECTIONS.md: edge C .-> D has no label (rule 9.3)']   <-- DIFFERS
'A -- (reads) --> B'               old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A -- [1] --> B'                   old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A -- {x} --> B'                   old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A -- reads "x" --> B'             old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A[a -- b] --> B'                  old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A["a -- b"] --> B'                old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A(a == b) ==> B'                  old=0 [] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)']   <-- DIFFERS
'A[one] -- reads --> B[two]'       old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A --x B --> C'                    old=1 ['CONNECTIONS.md: edge A --> C has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A --o B --> C'                    old=1 ['CONNECTIONS.md: edge A --> C has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A --- B --> C'                    old=1 ['CONNECTIONS.md: edge A --> C has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> C has no label (rule 9.3)']
'A -- reads --- B --> C'           old=1 ['CONNECTIONS.md: edge A --> C has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A --> B --> C'                    old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A -- reads --> B --> C'           old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A -->|reads| B --> C'             old=0 [] | new=0 []
'A --> B -- reads --> C'           old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A ==> B == reads ==> C'           old=0 [] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)']   <-- DIFFERS
'A -- reads ==> B'                 old=0 [] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)']   <-- DIFFERS
'A == reads --> B'                 old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A -- reads -.-> B'                old=0 [] | new=1 ['CONNECTIONS.md: edge A -.-> B has no label (rule 9.3)']   <-- DIFFERS
'A -. reads --> B'                 old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A -- --> B'                       old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A --  --> B'                      old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A --> |reads| B'                  old=0 [] | new=0 []
'A ==> |reads| B'                  old=0 [] | new=0 []
'A -->|reads|B'                    old=0 [] | new=0 []
'A <--> B'                         old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A <==> B'                         old=0 [] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)']   <-- DIFFERS
'A <-.-> B'                        old=0 [] | new=1 ['CONNECTIONS.md: edge A -.-> B has no label (rule 9.3)']   <-- DIFFERS
'A x--x B'                         old=0 [] | new=0 []
'A & B --> C'                      old=1 ['CONNECTIONS.md: edge A --> C has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> C has no label (rule 9.3)']
'A --> B & C'                      old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'my-node --> B'                    old=1 ['CONNECTIONS.md: edge my --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge my --> B has no label (rule 9.3)']
'my-node -- reads --> B'           old=1 ['CONNECTIONS.md: edge my --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A.->B'                            old=0 [] | new=1 ['CONNECTIONS.md: edge A .-> B has no label (rule 9.3)']   <-- DIFFERS
'A .-> B'                          old=0 [] | new=1 ['CONNECTIONS.md: edge A .-> B has no label (rule 9.3)']   <-- DIFFERS
'A ..-> B'                         old=0 [] | new=1 ['CONNECTIONS.md: edge A ..-> B has no label (rule 9.3)']   <-- DIFFERS
'A -. .-> B'                       old=0 [] | new=1 ['CONNECTIONS.md: edge A .-> B has no label (rule 9.3)']   <-- DIFFERS
'%% A ==> B'                       old=0 [] | new=0 []
'note: see A ==> B for detail'     old=0 [] | new=1 ['CONNECTIONS.md: edge note ==> B has no label (rule 9.3)']   <-- DIFFERS
'Text with a.b...-> c'             old=0 [] | new=1 ['CONNECTIONS.md: edge Text ...-> c has no label (rule 9.3)']   <-- DIFFERS
'A ~~~ B'                          old=0 [] | new=0 []
'A --> B;'                         old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A-- reads -->B'                   old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A -- reads -->|also| B'           old=0 [] | new=0 []
'A --\treads --> B'                old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A -- - --> B'                     old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A -- > --> B'                     old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A -- reads -- more --> B'         old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=0 []   <-- DIFFERS
'A --- reads --> B'                old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A -.- B'                          old=0 [] | new=0 []
'A === B'                          old=0 [] | new=0 []
'A ==> B\n  C -.-> D\n  E --> F'   old=1 ['CONNECTIONS.md: edge E --> F has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)', 'CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)', 'CONNECTIONS.md: edge E --> F has no label (rule 9.3)']   <-- DIFFERS
'A -- reads --> B\n  C ==> D'      old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge C ==> D has no label (rule 9.3)']   <-- DIFFERS
'subgraph one\n  A ==> B\n  end'   old=0 [] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)']   <-- DIFFERS
'A:::cls ==> B'                    old=0 [] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)']   <-- DIFFERS
'A@{ shape: rect } --> B'          old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A e1@--> B'                       old=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)'] | new=1 ['CONNECTIONS.md: edge A --> B has no label (rule 9.3)']
'A e1@==> B'                       old=0 [] | new=1 ['CONNECTIONS.md: edge A ==> B has no label (rule 9.3)']   <-- DIFFERS
````


16. Suite, lint and diff at the branch tip 03b0161, in a second detached worktree. Command: `(python3 -m unittest discover -s tests; echo "suite exit=$?"; python3 scripts/lint.py; echo "lint exit=$?"; git diff --stat 93311ab HEAD -- . ':!runs'; git diff fe82be2 HEAD --stat | tail -1; git diff fe82be2 HEAD --name-only | grep -v '^runs/'; echo "non-runs names above (none if blank)") > branch-tip-03b0161-suite-lint.txt 2>&1`. Output file `branch-tip-03b0161-suite-lint.txt`:

````text
.............................................hinshitsu check: test the form of a run's record.

Usage: hinshitsu_check.py [--stage plan|unit|delivery] <run-folder>
       hinshitsu_check.py --record <run-folder>   (state files against the log, rule 14.6)
Exit 0 when every check for the stage passes, 1 when any fails, 2 on a usage error.
Standard library only. Same folder in, same verdict out.

This script tests the shape of the record: that entries, citations, cells and
files exist and agree with each other. It does not prove that any check ran or
that any report is true (rule 17.7).
...............................
----------------------------------------------------------------------
Ran 76 tests in 1.213s

OK
FAIL CONNECTIONS.md: edge A ==> B has no label (rule 9.3)
hinshitsu_check (plan): 1 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
FAIL CONNECTIONS.md: edge C -.-> D has no label (rule 9.3)
hinshitsu_check (plan): 1 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
hinshitsu_check (plan): 0 failure(s).
This script tests the shape of the record. It does not prove that any check ran.
hinshitsu_check (record): 0 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
FAIL MINDMAP.md:1: calls F-1 closed; the log holds no closing entry (rule 14.6)
hinshitsu_check (record): 1 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
suite exit=0
lint: 0 failure(s). This script tests form; it does not prove that any rule is sound.
lint exit=0
 scripts/hinshitsu_check.py | 17 +++++++++++++++--
 tests/test_check.py        | 25 +++++++++++++++++++++++++
 2 files changed, 40 insertions(+), 2 deletions(-)
 7 files changed, 183 insertions(+), 4 deletions(-)
non-runs names above (none if blank)
````


17. `git rev-parse origin/devin/hinshitsu-run-2.1.0 fe82be2 93311ab` printed `03b0161af97af1bdb9289bb25c30c50b81a4448a`, `fe82be2150dd5481be0dfb81accb37234e1c0239`, `93311abb80ff4154617ee0962be10fa375d59982`.

18. `grep -rn "9\.3" skills/*/SKILL.md | head -8` printed 1 line: `skills/hinshitsu-record/SKILL.md:17:2. **Graph.** Create `CONNECTIONS.md` at the same time (rule 9.3). It is the framework's dependency graph.`

19. Cleanup: `git worktree remove --force` on `/tmp/base` and on the branch-tip worktree. `git worktree list` then showed the main checkout and `/home/ubuntu/audit/wt` only; I removed that worktree after the last command.

### Pages opened

None.

## Findings

No FINDING fails a CRITERION. Each of the 4 below is an input outside the 9 lines the CRITERIA name. The triggers are in `probe-old-vs-new.txt`; each line there replaces the 1 edge line of the fixture, at stage `plan`.

### 1

- **Class:** DEFECT
- **Where:** `scripts/hinshitsu_check.py` lines 34-36 (`LABEL_OPEN_RE`) and line 300.
- **Trigger:** fixture lines `A --x B --> C`, `A --o B --> C` and `A -- reads --- B --> C`. In each, the edge into `C` has no label. The script of 93311ab returns `CONNECTIONS.md: edge A --> C has no label (rule 9.3)` and `main()` returns 1. The script of fe82be2 returns no failure and `main()` returns 0. Cause: line 300 searches all text before the arrow for `--` followed by a character, so `--x`, `--o` and the label of an earlier link each count as the label of this arrow.
- **Violates:** rule 9.3 as the script enforces it (an edge with no label must fail). C4 names 2 verdicts only, so C4 holds; this is a verdict of 93311ab that the change reverses.
- **Proposed fix:** accept an opener only when no other link sits between it and the arrow. For example, after `NODE_TEXT_RE.sub`, require the text after the opener to hold no `--`, `==` or `-.` run and no whitespace-then-word-then-end node, and reject `--x` and `--o` followed by whitespace. Add the 3 lines above as failing tests.

### 2

- **Class:** DEFECT
- **Where:** `scripts/hinshitsu_check.py` line 31 (`NODE_TEXT_RE`) and line 300.
- **Trigger:** fixture lines `A == "reads" ==> B` and `C -. "reads" .-> D`. Each edge has a label in quotation marks. The script of fe82be2 returns `CONNECTIONS.md: edge A ==> B has no label (rule 9.3)` and `CONNECTIONS.md: edge C .-> D has no label (rule 9.3)`, and `main()` returns 1; the script of 93311ab returns no failure. The second message also names an arrow, `.->`, that is not the link in the file. Cause: line 300 deletes every quoted, bracketed, parenthesized and braced span before it looks for label text, so it deletes the label. `A -- "reads" --> B`, `A -- (reads) --> B` and `A -- [1] --> B` fail the same way; those 3 also fail under 93311ab.
- **Violates:** rule 9.3 as the script enforces it (a labeled edge must not be reported as having no label). No CRITERION names a quoted label. Whether a quoted label lies inside "3 forms only" (E-22) is the USER's call; I report the result and do not class it a BLOCKER. I did not run Mermaid to confirm that it accepts a quoted label between the dashes; that part is UNVERIFIED.
- **Proposed fix:** delete node text only up to the label opener, or replace each deleted span with a placeholder character instead of the empty string, so `-- "reads"` still shows text after the opener. Print the link as written (`-. … .->`) in the message. Add the 2 lines as passing tests.

### 3

- **Class:** DEFECT
- **Where:** `scripts/hinshitsu_check.py` line 30 (`EDGE_RE`) and lines 28-29 (the comment "The first arrow link on a line").
- **Trigger:** fixture line `A -- reads --> B --> C`. The edge from `B` to `C` has no label. The script of 93311ab returns a failure and `main()` returns 1 (for the wrong edge, `A --> B`); the script of fe82be2 returns no failure and `main()` returns 0. The script tests the first link of a line only. 93311ab has the same limit (`A -->|reads| B --> C` passes under both), so the change did not create it, but the change makes 1 more unlabeled edge pass.
- **Violates:** rule 9.3 as the script enforces it.
- **Proposed fix:** test every link on a line: after a match, continue the search from the destination node of that match instead of from the next line. Add `A -- reads --> B --> C` and `A -->|reads| B --> C` as failing tests. If the USER holds this outside "3 forms only", record it as a known limit in the comment at lines 28-29.

### 4

- **Class:** FRAGILITY
- **Where:** `scripts/hinshitsu_check.py` line 30, the alternatives `==+>` and `-?\.+->`.
- **Trigger:** the script works on `skills/hinshitsu/example/run` and `build-record` today (C4, `same` 2 times). It fails on a `CONNECTIONS.md` that gains a prose line starting with a word and holding `==>`, or holding dots before `->`: fixture line `note: see A ==> B for detail` returns `CONNECTIONS.md: edge note ==> B has no label (rule 9.3)`; `Text with a.b...-> c` returns `edge Text ...-> c`; `A .-> B` and `A ..-> B`, which are not Mermaid links, are reported as edges. 93311ab returns no failure on each. 93311ab already reported prose that holds `-->`; the change adds 2 more arrow shapes to that behavior, and the optional dash in `-?\.+->` matches more than the dotted arrow needs.
- **Violates:** no CRITERION. Behavior nobody asked for: C2 and C5 name `-.->` and `-. reads .->` only.
- **Proposed fix:** read edges only inside the ```` ```mermaid ```` fence of `CONNECTIONS.md`; and match the dotted arrow as `-\.+->`, allowing the bare `\.+->` tail only when a `-.` opener precedes it.

## Not examined

- `scripts/hinshitsu_check.py` outside lines 22-40, 286-306 and 494-530, and `tests/test_check.py` lines 126-204 and 241 to the end: the scope names the changed lines, and `git diff 93311ab fe82be2 -- scripts tests` shows no change elsewhere.
- `scripts/lint.py`: I ran it; I did not read it. The scope does not name it as a file to examine.
- The RUN FOLDER under `runs/` and `AUDIT-LOG.md` entries E-22 and E-25: the scope gives the CRITERIA and the approval word for word; I did not compare them with the log.
- The text of rule 9.3 in full: command 18 found 1 mention, in `skills/hinshitsu-record/SKILL.md` line 17. I did not read further skill files.
- Mermaid itself: I did not install or run Mermaid, so no statement here about which link forms Mermaid renders is VERIFIED. The link forms in the probe come from my knowledge of Mermaid flowchart syntax.
- Operating systems and Python versions other than this machine's (Linux, Python 3.12.16).
