devin-76f7874b7ab945e4b44a4e9d543d864f

# Code review of the 3 hinshitsu scripts

Repository `CatCorner22/devin`, commit `93311abb80ff4154617ee0962be10fa375d59982`, checked out as a detached git worktree in a scratch folder. I changed no file of the repository. Python 3.12.16, Linux.

## Verdict

SCRIPTS UNSOUND

The verdict rests on `scripts/hinshitsu_check.py`. It passes records that the rules forbid at the DONE gate (bugs 1, 2, 4, 5) and fails records that the rules allow (bugs 3, 10, 13 to 17). 43 of its 79 failure messages have no test. `lint.py` and `gauge.py` have no BLOCKER; each is sound with the fixes listed.

## Examined

- Every line of `scripts/hinshitsu_check.py` (517 lines), `scripts/lint.py` (209), `skills/hinshitsu-gauge/scripts/gauge.py` (218).
- `tests/test_check.py`, `tests/test_gauge.py` (test names only), `tests/test_lint.py` (test names only).
- All 7 `SKILL.md` files (sections 0 to 24), `GLOSSARY.md`, `TESTING.md`, `templates/*.md`, and the lines of `README.md`, `CHANGELOG.md` and `EXAMPLE.md` that name a script.
- Commands run: the unit tests; the 3 scripts on the example run and on `templates/`; 55 proof cases (51 are pasted below); 79 mutants of `hinshitsu_check.py` and 24 of `lint.py`; 13 proposed fixes on a scratch copy.

### What each function does

**`scripts/hinshitsu_check.py`**

| Function | Lines | What it does |
|---|---|---|
| `parse_log` | 37–52 | Splits `AUDIT-LOG.md` into entries at each `### ` line; a `### ` line that is not an entry heading becomes a "bad" entry. |
| `field` | 55–58 | Returns the text after `- <name>:` on the first line that has it, or nothing. |
| `criteria_ids_of` | 61–65 | Returns the `C<n>` IDs that start a list item in the newest `CRITERIA` entry. |
| `strip_quotes` | 68–72 | Removes code blocks, block quotes and text in double quotes before the banned-word scan. |
| `check` | 75–418 | Runs every check for the stage and returns the list of failures. |
| `check_record` | 421–478 | Compares `SESSION-STATE.md`, `FRAMEWORK.md` and `MINDMAP.md` with the log. |
| `main` | 481–509 | Reads the options, prints each failure and the count, returns exit code 0, 1 or 2. |
| module handler | 512–517 | Turns a read error into 1 `FAIL` line and exit 1. |

**`scripts/lint.py`**

| Function | Lines | What it does |
|---|---|---|
| `singulars` | 50–56 | Returns the singular forms a plural word in capitals may come from. |
| `strip_quotes` | 59–65 | Same as the checker's. Its docstring says it removes code spans; it does not (bug 35). |
| `frontmatter` | 68–76 | Reads the `key: value` lines between the first 2 `---` lines. |
| `glossary_terms` | 79–80 | Lists the terms the glossary defines in the form `**TERM** —`. |
| `lint` | 83–196 | Tests required files, the glossary, each skill's form and size, banned words, undefined terms in capitals, adapters and the 2 manifests. |
| `main` | 199–205 | Prints each failure and the count; exit 0 or 1. |

**`skills/hinshitsu-gauge/scripts/gauge.py`**

| Function | Lines | What it does |
|---|---|---|
| `entries` | 30–42 | Yields number, type and body of each well-formed entry. |
| `field` | 45–48 | Same as the checker's. |
| `read_state` | 51–100 | Works out each STAGE's state, the work-unit count, the open BLOCKERS and the percent. |
| `text_gauge` | 103–123 | Builds the text gauge. |
| `esc` | 126–127 | Escapes `&`, `<`, `>` for the picture. |
| `polar` | 130–132 | Turns an angle into a point on the dial. |
| `svg_gauge` | 135–193 | Builds `GAUGE.svg`. |
| `main` | 196–210 | Reads the log, writes the picture, prints the text; exit 0 or 2. |

## Bugs

How to read the proofs. `$C` is `python3 scripts/hinshitsu_check.py` at the commit; `$L` is `lint.py`; `$G` is `gauge.py`. `mk.py NAME [FILE OLD NEW]…` is my helper: it copies the passing fixture of `tests/test_check.py` (`good_run()`; with `--record-fixture`, `record_run()`) to the folder `NAME`, then makes each edit. `OLD` empty writes the file, `+` appends, `-` deletes, `ALL:x` replaces every `x`; `{N}` is the next entry number. Each proof is therefore "a record that passes, plus 1 change". Each block is the command and its complete output, with 1 cut: after each count line the checker prints 1 fixed line ("This script tests the shape of the record. It does not prove that any check ran.", or for `--record` "This script compares the state files with the log. It does not prove that the log is true."). I removed that line from every block in this report. `cp_repo X` copies the commit's files to folder `X`.

"Fix tested" means: I applied the change to a scratch copy, re-ran the trigger and it gave the right result. With all 13 tested fixes applied, 69 of 71 tests pass; the 2 that fail assert the old behavior (`test_frozen_without_quoted_approval_fails` expects the text "rule 3.3"; `test_record_fault_resolution_needs_the_saved_output` saves a file that holds only "ok"). The other fixes are proposals I did not run.

### `scripts/hinshitsu_check.py`

**1. Status DONE passes with a final audit that failed.** Class: BLOCKER. Lines 407–408. The check accepts any last line that holds "passed" and not "not passed".

````text
# P38 a final audit whose last line holds the word passed
$ python3 mk.py p38 audits/final-audit-E-27.md "passed" "Verdict: failed. 0 of 12 checks passed"; cat p38/audits/final-audit-E-27.md; echo; $C --stage delivery p38; echo "[exit $?]"
run-fin
Verdict: failed. 0 of 12 checks passed
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix (tested):

```diff
-                if "not passed" in tail[0] or "passed" not in tail[0]:
+                if not re.search(r"(?:^|[—:;-])\s*`?passed`?\.?$", tail[0].strip()):
```

**2. Status DONE passes when a CRITERION row holds no PASS, or holds FAIL.** Class: BLOCKER. Lines 364–378. DONE part 1 says every CRITERION is VERIFIED. The check asks only that a row exists and that the word UNVERIFIED is absent.

````text
# P06-criterion-all-NA-is-DONE
$ python3 mk.py p06 COVERAGE-LEDGER.md "ALL:$PASS" "N/A — does not apply"; tail -1 p06/COVERAGE-LEDGER.md; $C --stage delivery p06
| C1 works | N/A — does not apply | N/A — does not apply | N/A — does not apply | N/A — does not apply | N/A — does not apply | N/A — does not apply | N/A — does not apply | N/A — does not apply | N/A — does not apply | N/A — does not apply |
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
# P32 DONE with a CRITERION row that holds FAIL
$ python3 mk.py p32 COVERAGE-LEDGER.md "$PASS" 'FAIL F-1'; $C --stage delivery p32; echo "[exit $?]"
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix (tested), before line 377:

```diff
+        for l in ledger_text.splitlines():
+            if is_done and re.match(r"\|[\s`*]*C\d+", l) and (re.search(r"\bFAIL\b", l) or not re.search(r"\bPASS\b", l)):
+                err("DELIVERY-REPORT.md: Status DONE, and CRITERION row %s holds FAIL or holds no PASS (DONE, part 1)"
+                    % l.split("|")[1].strip())
```

**3. One final audit that did not pass blocks DONE for the rest of the run.** Class: DEFECT. Lines 404–409. Rule 17.4 says to run the final audit again after a change; rule 1.7 forbids discarding the first report. The check requires every final-audit report to read passed.

````text
# P08 an earlier final audit that did not pass blocks DONE, though a later one passed
$ python3 mk.py p08 AUDIT-LOG.md "Planned SUB-AGENT runs: 3" "Planned SUB-AGENT runs: 9" audits/final-audit-E-27.md "passed" "not passed" AUDIT-LOG.md + $'\n### E-{N} · 2026-01-01T00:00Z · LAUNCH · orchestrator\n\n- Role: final auditor, second run after the fix\n- Scope: `prompts/WU-1-correctness.md`\n- Commit under review: no git\n- SUB-AGENT identifier: run-fin2\n- Report: `audits/final-audit-E-32.md`\n' audits/final-audit-E-32.md "" $'run-fin2\npassed'; tail -8 p08/AUDIT-LOG.md; $C --stage delivery p08; echo "[exit $?]"

### E-32 · 2026-01-01T00:00Z · LAUNCH · orchestrator

- Role: final auditor, second run after the fix
- Scope: `prompts/WU-1-correctness.md`
- Commit under review: no git
- SUB-AGENT identifier: run-fin2
- Report: `audits/final-audit-E-32.md`
FAIL audits/final-audit-E-27.md: Status DONE, and the last line of the final audit does not read passed (DONE, part 6)
hinshitsu_check (delivery): 1 failure(s).
[exit 1]
````

Fix (tested): test the newest only.

```diff
-            for r in final:
+            for r in sorted(final, key=lambda x: int((re.findall(r"E-(\d+)", x) or ["0"])[-1]))[-1:]:
```

**4. The budget check (rule 0.9) is switched off by any ANSWER entry.** Class: DEFECT. Line 413. Every run that follows rule 3.4 has an ANSWER entry (the approval of the criteria), so the check cannot fire in a real run. It also runs only when Status is DONE.

````text
# P07-budget
$ python3 mk.py p07 AUDIT-LOG.md "Planned SUB-AGENT runs: 3" "Planned SUB-AGENT runs: 1"; $C --stage delivery p07; python3 mk.py p07 AUDIT-LOG.md "Planned SUB-AGENT runs: 3" "Planned SUB-AGENT runs: 1" AUDIT-LOG.md + $'\n### E-{N} · 2026-01-01T00:00Z · ANSWER · orchestrator\n\n- The USER'"'"'s reply: "approve all"\n'; grep -c "· LAUNCH ·" p07/AUDIT-LOG.md; $C --stage delivery p07
FAIL AUDIT-LOG.md: 3 LAUNCH entries exceed the 1 planned, with no ANSWER entry (rule 0.9)
hinshitsu_check (delivery): 1 failure(s).
3
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix (not run): require an ANSWER entry later than the LAUNCH entry that reached the number.

```diff
+            launches = by_type.get("LAUNCH", [])
             if not planned:
                 err("AUDIT-LOG.md: Status DONE, and no TIER entry states Planned SUB-AGENT runs (rule 0.9)")
-            elif len(by_type.get("LAUNCH", [])) > planned[0] and not by_type.get("ANSWER"):
+            elif len(launches) > planned[0] and not any(
+                    launches[planned[0] - 1]["n"] < a["n"] < launches[planned[0]]["n"]
+                    for a in by_type.get("ANSWER", [])):
```

Also move the test out of `if is_done:`, so that it runs for every Status.

**5. The ASSERTED check passes uncited claims.** Class: DEFECT. Lines 390–393. A label written `**What you got:**` is not matched, so nothing is tested. Under a matched label, 1 citation anywhere satisfies the check for every sentence. Rule 17.1 says every claim ends with a citation.

````text
# P21 an uncited claim under a label written with a colon; an uncited second sentence
$ python3 mk.py p21 DELIVERY-REPORT.md "**What you got.** A page. [E-17]" "**What you got:** A page that every bank has approved." DELIVERY-REPORT.md "It runs. [" "It runs on every phone ever made. It runs. ["; sed -n '/What you got/,/What was proven/p' p21/DELIVERY-REPORT.md; $C --stage delivery p21; echo "[exit $?]"
**What you got:** A page that every bank has approved.

**What was proven.** It runs on every phone ever made. It runs. [`audits/WU-1-correctness-E-19.md`]
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix (not run):

```diff
-            m = re.search(r"\*\*%s\.?\*\*(.*?)(?=\n\*\*|\Z)" % label, summary, re.S)
-            if m and not re.search(r"\[[^\]]+\]", m.group(1)):
+            m = re.search(r"\*\*%s[.:]?\*\*:?(.*?)(?=\n\*\*|\Z)" % label, summary, re.S)
+            sentences = [x for x in re.split(r"(?<=[.!?\]])\s+(?=[A-Z])", m.group(1).strip()) if x] if m else []
+            if not m or any(not re.search(r"\[[^\]]+\]\.?$", x) for x in sentences):
```

**6. A cell `` `N/A` `` or `` `UNVERIFIED` `` with no reason passes.** Class: DEFECT. Lines 317, 321, 332. The closing backtick falls into the "reason".

````text
# P05-cell-without-reason
$ python3 mk.py p05 COVERAGE-LEDGER.md "$PASS" "\`N/A\`" COVERAGE-LEDGER.md "$PASS" "\`UNVERIFIED\`"; tail -1 p05/COVERAGE-LEDGER.md | cut -c1-80; $C --stage unit p05
| C1 works | `N/A` | `UNVERIFIED` | `PASS` `audits/WU-1-correctness-E-19.md` | `
hinshitsu_check (unit): 0 failure(s).
[exit 0]
````

Fix (tested):

```diff
-                m = re.match(r"`?(PASS|FAIL|N/A|UNVERIFIED)`?\b\s*(.*)$", c)
+                m = re.match(r"(`?)(PASS|FAIL|N/A|UNVERIFIED)\1(?![\w`])\s*(.*)$", c)
…
-                kind, rest = m.group(1), m.group(2).strip(" —-")
+                kind, rest = m.group(2), m.group(3).strip(" —-")
```

**7. A FINDING ID that is not `F-<n>` hides every other failure.** Class: DEFECT. Lines 223, 433, 474. The ID is never tested against rule 9.5. `F-1.` reaches `int("1.")`; the handler prints 1 line that blames the file's readability and drops all other failures and the count line.

````text
# P17 a FINDING ID with a full stop
$ python3 mk.py p17 AUDIT-LOG.md "- ID: F-1" "- ID: F-1."; $C --stage delivery p17; echo "[exit $?]"
FAIL the record cannot be read: ValueError: invalid literal for int() with base 10: '1.'
[exit 1]
````

Fix (tested): after line 223 add

```diff
+        if not re.fullmatch(r"F-\d+", fid):
+            err("AUDIT-LOG.md: E-%d FINDING ID %s is not F-<n> (rule 9.5)" % (e["n"], fid))
+            continue
```

and at line 434 `if fid and re.fullmatch(r"F-\d+", fid[0]):`.

**8. `--record` reads the running STAGE from any word in the entry.** Class: DEFECT. Line 444. It searches the whole body for the first "start", "end" or "skipped" after `S<n>`. A note that holds "end" hides a stale state file; a note that holds "start" fails a correct one.

````text
# P23a --record: the STAGE that runs is read from any word in the entry, not from the Event field
$ python3 mk.py p23 --record-fixture SESSION-STATE.md "STAGE S5" "STAGE S4"; $C --record p23; echo "[exit $?]"
FAIL SESSION-STATE.md: does not name S5, the STAGE the log shows as started (rule 14.6)
hinshitsu_check (record): 1 failure(s).
[exit 1]
$ python3 mk.py p23 --record-fixture SESSION-STATE.md "STAGE S5" "STAGE S4" AUDIT-LOG.md "- Stage: S5" "- Stage: S5 (begins after the end of S4)"; sed -n 3,6p p23/AUDIT-LOG.md; $C --record p23; echo "[exit $?]"
### E-1 · 2026-01-01T00:00Z · STAGE · orchestrator

- Stage: S5 (begins after the end of S4)
- Event: start
hinshitsu_check (record): 0 failure(s).
[exit 0]
# P23b --record: a STAGE that ended is taken as running
$ python3 mk.py p23b --record-fixture SESSION-STATE.md "STAGE S5" "STAGE S6 is next" AUDIT-LOG.md $'- Stage: S5\n- Event: start' $'- Stage: S5 (second start, after the fix)\n- Event: end'; sed -n 3,6p p23b/AUDIT-LOG.md; $C --record p23b; echo "[exit $?]"
### E-1 · 2026-01-01T00:00Z · STAGE · orchestrator

- Stage: S5 (second start, after the fix)
- Event: end
FAIL SESSION-STATE.md: does not name S5, the STAGE the log shows as started (rule 14.6)
hinshitsu_check (record): 1 failure(s).
[exit 1]
````

Fix (not run): read the 2 fields, as line 139–140 do.

```diff
-            m = re.search(r"\b(S\d+)\b.*?\b(start|end|skipped)\b", e["body"], re.S)
-            if m:
-                running = m.group(1) if m.group(2) == "start" else None
+            m = re.match(r"(S\d+)\b", field(e["body"], "Stage") or "")
+            ev = (field(e["body"], "Event") or "").split()[0:1]
+            if m and ev and ev[0] in ("start", "end", "skipped"):
+                running = m.group(1) if ev[0] == "start" else None
```

**9. `--record` takes "open" and "closed" from any word on the line.** Class: DEFECT. Lines 458–465. "no longer open" counts as open; "the menu stays closed" counts as closed. A correct state file fails; the delivery stage inherits the failure (line 402).

````text
# P24 --record: "no longer open" and a description that holds "closed"
$ python3 mk.py p24 --record-fixture SESSION-STATE.md "F-1 is open" "F-1 is no longer open" MINDMAP.md "(DEFECT, open)" "(DEFECT, FIXED)" AUDIT-LOG.md + $'\n### E-4 · 2026-01-01T00:00Z · RESOLUTION · orchestrator\n\n- Finding: F-1\n- Result: FIXED\n'; $C --record p24; echo "[exit $?]"
FAIL SESSION-STATE.md:2: calls F-1 open; the log closed it (rule 14.6)
hinshitsu_check (record): 1 failure(s).
[exit 1]
$ python3 mk.py p24b --record-fixture SESSION-STATE.md "F-1 is open" "F-1: the menu stays closed after a click"; $C --record p24b; echo "[exit $?]"
FAIL SESSION-STATE.md:2: calls F-1 closed; the log holds no closing entry (rule 14.6)
hinshitsu_check (record): 1 failure(s).
[exit 1]
````

Fix (not run): read the status only from a status position, and reject a negation.

```diff
-                says_open = re.search(r"\bopen\b|not re-audited|waits (for|until) %s\b" % fid, line)
-                says_closed = re.search(r"\bFIXED\b|\bWITHDRAWN\b|\bclosed\b|overruled", line)
+                says_open = re.search(r"(?<!not )(?<!no longer )\bopen\b\W*$|not re-audited|waits (for|until) %s\b" % fid, line)
+                says_closed = re.search(r"\b(FIXED|WITHDRAWN|OVERRULED)\b|\bclosed\b\W*$", line)
```

**10. The edge test fails a labelled edge and passes unlabelled ones.** Class: DEFECT. Line 287. Mermaid's `A -- text --> B` is a labelled edge; the check fails it. `-.->`, `==>`, `---`, the second edge of a chain and an empty label `-->||` all pass.

````text
# P04a-labelled-edge-rejected
$ python3 mk.py p04a CONNECTIONS.md "A -->|reads| B" "A -- reads --> B"; $C --stage plan p04a
FAIL CONNECTIONS.md: edge A --> B has no label (rule 9.3)
hinshitsu_check (plan): 1 failure(s).
[exit 1]
# P04b-unlabelled-edges-accepted
$ python3 mk.py p04b CONNECTIONS.md "A -->|reads| B" $'A -.-> B\n  A ==> C\n  A --- D\n  A -->|reads| E --> F\n  A -->|| G'; cat p04b/CONNECTIONS.md; $C --stage plan p04b
```mermaid
graph LR
  A -.-> B
  A ==> C
  A --- D
  A -->|reads| E --> F
  A -->|| G
```
hinshitsu_check (plan): 0 failure(s).
[exit 0]
````

Fix (not run): test each arrow on each line of the mermaid block.

```diff
-        for m in re.finditer(r"^\s*(\w+)[^\n|]*?--+>(?!\|)\s*(\w+)", text, re.M):
-            err("CONNECTIONS.md: edge %s --> %s has no label (rule 9.3)" % (m.group(1), m.group(2)))
+        for block in re.findall(r"```mermaid\n(.*?)```", text, re.S):
+            for line in block.splitlines():
+                for m in re.finditer(r"(--\s*[^-|>\s][^|>]*?)?(-\.+->|==+>|--+>|---+)(\|[^|]*\|)?", line):
+                    if not m.group(1) and not (m.group(3) or "").strip("| "):
+                        err("CONNECTIONS.md: an edge on the line %r has no label (rule 9.3)" % line.strip())
```

**11. The banned-word test misses inflected forms and fails names in code.** Class: DEFECT. Lines 25–27, 276–279. The rule bans "their inflected forms"; the checker's list holds none (`lint.py` holds some). "shouldn't" passes in both scripts. A name inside backticks, such as `ensure_dir()`, fails.

````text
# P02 inflected forms and "shouldn't"
$ python3 mk.py p02 FRAMEWORK.md + $'It ensures the page works properly and reasonably. It shouldn\'t fail.\n'; tail -1 p02/FRAMEWORK.md; $C --stage plan p02; echo "[exit $?]"
It ensures the page works properly and reasonably. It shouldn't fail.
hinshitsu_check (plan): 0 failure(s).
[exit 0]
# P03-inline-code
$ python3 mk.py p03 FRAMEWORK.md + $'The BUILDER calls `ensure_dir()` in `lib/proper-case.js`.\n'; $C --stage plan p03
FAIL FRAMEWORK.md:2: banned word 'ensure' (banned-word rule of the conductor)
hinshitsu_check (plan): 1 failure(s).
[exit 1]
````

Fix (not run): use one list in both scripts and drop code spans.

```diff
-    r"(?<![A-Za-z])(should|shall|appropriate|reasonable|proper|adequate|ensure|try to|as needed|"
-    r"if possible|generally|typically)(?![A-Za-z])", re.I)
+    r"(?<![A-Za-z])(should(?:n['’]t)?|shall|appropriate(?:ly)?|reasonabl[ey]|proper(?:ly)?|adequate(?:ly)?|"
+    r"ensur(?:e|es|ed|ing)|(?:try|tries|tried|trying) to|as needed|if possible|generally|typically)(?![A-Za-z_])", re.I)
```

and in `strip_quotes`, before the return: `text = re.sub(r"`[^`\n]*`", " ", text)`. This last line also hides placeholders in backticks from line 280; run the placeholder test on the unstripped line.

**12. Line numbers in banned-word and placeholder messages are wrong after a code block.** Class: DEFECT. Line 69 (and `lint.py` line 61). A code block of any length becomes 1 space, so each later line number is too low. The owner is sent to the wrong line.

````text
# P01-line-numbers
$ python3 mk.py p01 FRAMEWORK.md "" $'```\na\nb\nc\n```\nIt should work.\n' && grep -n should p01/FRAMEWORK.md; $C --stage plan p01
6:It should work.
FAIL FRAMEWORK.md:2: banned word 'should' (banned-word rule of the conductor)
hinshitsu_check (plan): 1 failure(s).
[exit 1]
````

Fix (tested; make the same change in `lint.py`):

```diff
-    text = re.sub(r"```.*?```", " ", text, flags=re.S)
+    text = re.sub(r"```.*?```", lambda m: "\n" * m.group(0).count("\n"), text, flags=re.S)
```

**13. A quoted approval inside a sentence fails; both messages cite the wrong rule.** Class: DEFECT. Lines 173–177. The quote must follow `- Approval:` at once. Rule 3.4 asks only that the entry quotes the USER's words. The messages cite rule 3.3 (Catchball); the rules are 3.4 (Freeze) and 3.2 (nothing is VERIFIED while PROPOSED).

````text
# P14 approval quoted in a sentence
$ python3 mk.py p14 AUDIT-LOG.md '- Approval: "approve all" (t)' '- Approval: the USER replied "approve all" at 2026-01-01T00:00Z'; $C --stage plan p14; echo "[exit $?]"
FAIL AUDIT-LOG.md: E-16 is FROZEN with no quoted approval (rule 3.3)
hinshitsu_check (plan): 1 failure(s).
[exit 1]
````

Fix (tested):

```diff
-        quoted = re.search(r'^- Approval:\s*(?:USER\s*—\s*)?["“].+["”]', last, re.M)
+        quoted = re.search(r'^- Approval:[^\n]*["“][^"”\n]+["”]', last, re.M)
-            err("AUDIT-LOG.md: E-%d is FROZEN with no quoted approval (rule 3.3)" % crit[-1]["n"])
+            err("AUDIT-LOG.md: E-%d is FROZEN with no quoted approval (rule 3.4)" % crit[-1]["n"])
-            err("AUDIT-LOG.md: CRITERIA are not FROZEN; no WORK UNIT may be reported VERIFIED (rule 3.3)")
+            err("AUDIT-LOG.md: CRITERIA are not FROZEN; no WORK UNIT may be reported VERIFIED (rule 3.2)")
```

**14. Criteria written as a table are not seen; a CRITERIA-CHANGE entry is not read.** Class: DEFECT. Lines 65, 367–372. A FROZEN entry that lists `| C1 | … |` gives "lists no CRITERION". A CRITERION added under rule 3.5 needs no ledger row.

````text
# P15 criteria listed in a table
$ python3 mk.py p15 AUDIT-LOG.md '- C1. It works. Test: run it.' $'| ID | CRITERION | Test |\n|---|---|---|\n| C1 | It works. | run it |\n'; $C --stage delivery p15; echo "[exit $?]"
FAIL DELIVERY-REPORT.md: Status DONE, and the newest CRITERIA entry lists no CRITERION (DONE, part 1)
hinshitsu_check (delivery): 1 failure(s).
[exit 1]
# P41 a CRITERION added by a CRITERIA-CHANGE entry has no ledger row
$ python3 mk.py p41 AUDIT-LOG.md + $'\n### E-{N} · 2026-01-01T00:00Z · CRITERIA-CHANGE · orchestrator\n\n- C2. It prints. Test: print it.\n- Approval: "add C2" (t)\n'; $C --stage delivery p41; echo "[exit $?]"
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix for the table (tested): `r"^[-*\d.\s`|]*\**`?(C\d+)\b"`. Fix for the change entry (not run): at line 369, `criteria_ids = criteria_ids_of(crit) | set(re.findall(r"^[-*\d.\s`|]*\**`?(C\d+)\b", "\n".join(e["body"] for e in by_type.get("CRITERIA-CHANGE", [])), re.M))`.

**15. An overrule that quotes the USER in a sentence fails.** Class: DEFECT. Line 244. Only the exact form `USER — "` passes.

````text
# P35 a DEFECT overruled by the USER, quoted in a sentence
$ python3 mk.py p35 AUDIT-LOG.md "· RESOLUTION ·" "· OVERRULE ·" AUDIT-LOG.md $'- Result: FIXED\n- Re-audit: `audits/WU-1-reaudit-E-21.md`' $'- Result: OVERRULED\n- By: the USER, in the message "leave F-1 as it is" (2026-01-01T00:00Z)\n- Reason: the USER accepts it'; $C --stage delivery p35; echo "[exit $?]"
FAIL AUDIT-LOG.md: E-22 overrules F-1 with no quoted USER message (rule 15.5)
hinshitsu_check (delivery): 1 failure(s).
[exit 1]
````

Fix (tested):

```diff
-            elif findings[fid]["class"] in ("DEFECT", "FRAGILITY") and not re.search(r'USER\s*—\s*["“]', b):
+            elif findings[fid]["class"] in ("DEFECT", "FRAGILITY") and not re.search(r'USER\b[^\n]*["“][^"”\n]+["”]', b):
```

**16. Rule 0.3 false alarm when a reason holds ": no".** Class: DEFECT. Lines 121, 126. The pattern runs to the last colon on the line.

````text
# P11 rule 0.3 false alarm: a reason that holds ": no"
$ python3 mk.py p11 AUDIT-LOG.md "part 2 (x): yes — probe" "part 2 (x): yes — the probe replied: no record of the task"; $C --stage plan p11; echo "[exit $?]"
FAIL AUDIT-LOG.md: E-1 says SWARM with a part answered no (rule 0.3)
hinshitsu_check (plan): 1 failure(s).
[exit 1]
````

Fix (tested): `[^\n:]*:` in place of `[^\n]*:` in both patterns.

**17. A SHA-256 in capitals fails.** Class: DEFECT. Line 145. PowerShell `Get-FileHash` and `certutil` print capitals. The check also accepts 1 hash where rule 0.7 requires the path, the byte count and 3 hashes.

````text
# P12 SHA-256 in capitals (the form PowerShell Get-FileHash and certutil print)
$ python3 mk.py p12 AUDIT-LOG.md "SHA-256 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" "SHA-256 E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855"; $C --stage plan p12; echo "[exit $?]"
FAIL AUDIT-LOG.md: E-3 start of S1 has no SHA-256 of the skill read (rule 0.7)
hinshitsu_check (plan): 1 failure(s).
[exit 1]
````

Fix (tested): `re.search(r"\b[0-9a-fA-F]{64}\b", e["body"])`.

**18. A FINDING closes FIXED on the report that raised it.** Class: DEFECT. Lines 258–265. For a DEFECT or FRAGILITY the check asks only that some `audits/` file exists. For a BLOCKER, a file name that holds `-seed-` skips the "later LAUNCH" test for any result.

````text
# P18 a DEFECT closed FIXED on the report that raised it
$ python3 mk.py p18 AUDIT-LOG.md '- Re-audit: `audits/WU-1-reaudit-E-21.md`' '- Re-audit: `audits/WU-1-correctness-E-19.md`'; grep -n "E-19.md\|^- Finding\|^- ID" p18/AUDIT-LOG.md; $C --stage delivery p18; echo "[exit $?]"
111:- Report: `audits/WU-1-correctness-E-19.md`
115:- ID: F-1
133:- Finding: F-1
135:- Re-audit: `audits/WU-1-correctness-E-19.md`
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
# P19 a BLOCKER closed on the report that raised it, when the file name holds "-seed-"
$ python3 mk.py p19 AUDIT-LOG.md "- Class: DEFECT" "- Class: BLOCKER" AUDIT-LOG.md '- Re-audit: `audits/WU-1-reaudit-E-21.md`' '- Re-audit: `audits/WU-1-correctness-E-19.md`'; $C --stage delivery p19; echo "[exit $?]"
FAIL AUDIT-LOG.md: E-22 cites audits/WU-1-correctness-E-19.md, which matches no LAUNCH entry later than the FINDING (rule 14.3)
hinshitsu_check (delivery): 1 failure(s).
[exit 1]
$ mv p19/audits/WU-1-correctness-E-19.md p19/audits/WU-1-seed-E-19.md; sed -i 's#audits/WU-1-correctness-E-19.md#audits/WU-1-seed-E-19.md#g' p19/*.md; $C --stage delivery p19; echo "[exit $?]"
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix (not run):

```diff
-                elif (findings[fid]["class"] == "BLOCKER" and "-seed-" not in ra.group(1)  # rule 16.7: the planted defect
+                elif (not ("-seed-" in ra.group(1) and result == ["WITHDRAWN"])  # rule 16.7: the planted defect
```

**19. A record fault closes on a saved output that shows failures.** Class: DEFECT. Lines 253–256. Rule 14.6(b) says the command must exit 0; the check asks only that the file exists.

````text
# P20 a record fault closed on a saved output that shows failures
$ python3 mk.py p20 AUDIT-LOG.md '- Re-audit: `audits/WU-1-reaudit-E-21.md`' $'- Record fault: yes\n- Evidence: `evidence/record-check-E-22.txt`' evidence/record-check-E-22.txt "" $'FAIL SESSION-STATE.md:2: calls F-1 closed; the log holds no closing entry (rule 14.6)\nhinshitsu_check (record): 1 failure(s).\n[exit 1]\n'; $C --stage delivery p20; echo "[exit $?]"
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix (tested):

```diff
+                elif "hinshitsu_check (record): 0 failure(s)." not in (folder / rc.group(1)).read_text(encoding="utf-8"):
+                    err("AUDIT-LOG.md: E-%d cites %s, which does not show 0 failures (rule 14.6)" % (e["n"], rc.group(1)))
```

**20. Reports saved as `.txt` or in a sub-folder escape the custody test.** Class: DEFECT. Line 210. Rule 1.7 forbids discarding a report; rule 17.4(e) matches every file under `audits/` and `memos/`.

````text
# P16 reports that no LAUNCH entry names, saved as .txt or in a sub-folder; and a report whose name holds no LAUNCH ID
$ python3 mk.py p16 audits/secret-second-opinion.txt "" "not passed" audits/discarded/WU-1-correctness-run2.md "" "BLOCKER found"; find p16/audits -type f | sort; $C --stage delivery p16; echo "[exit $?]"
p16/audits/WU-1-correctness-E-19.md
p16/audits/WU-1-reaudit-E-21.md
p16/audits/discarded/WU-1-correctness-run2.md
p16/audits/final-audit-E-27.md
p16/audits/secret-second-opinion.txt
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix (not run): `for p in sorted(x for x in d.rglob("*") if x.is_file()):` and `rel = str(p.relative_to(folder))`.

**21. The identifier test is a substring test.** Class: DEFECT. Line 205. An identifier of 1 letter matches any first line that holds the letter. The file name is not tested for the LAUNCH ID (rule 1.6).

````text
# P31 an identifier of 1 letter matches any first line that holds the letter
$ python3 mk.py p31 AUDIT-LOG.md "- SUB-AGENT identifier: run-abc" "- SUB-AGENT identifier: r"; cat p31/audits/WU-1-correctness-E-19.md; echo; $C --stage delivery p31; echo "[exit $?]"
run-abc
report
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix (not run): `elif ident and not re.search(r"(?<![\w-])%s(?![\w-])" % re.escape(bare), first):` and add `if "E-%d" % e["n"] not in report.group(1): err(…rule 1.6…)` for paths under `audits/` and `memos/`.

**22. An artifact path may point outside the RUN FOLDER and outside any repository.** Class: DEFECT. Lines 151–158. Where no `.git` folder exists above the run, the loop climbs to the root of the disk. Absolute paths and `..` are accepted.

````text
# P27 an artifact path outside the RUN FOLDER and outside any repository
$ python3 mk.py p27 AUDIT-LOG.md '- Artifacts: `AUDIT-LOG.md`' '- Artifacts: `/etc/hostname`, `etc/os-release`, `../base/GAUGE.svg`'; $C --stage plan p27; echo "[exit $?]"
hinshitsu_check (plan): 0 failure(s).
[exit 0]
````

Fix (not run): before line 152, `if path.startswith("/") or ".." in Path(path).parts: err(…); continue`; and build `bases` so that it holds only `folder` when the loop ends without finding `.git`.

**23. The delivery stage cannot pass at the moment rule 17.4(h) orders it run.** Class: DEFECT. Lines 161–165, 394–395, 416–417. Rule 17.4(h) has the final AUDITOR run `--stage delivery` inside S10, before its own report exists and before S11. At that moment the checker must print the 6 failures below, whatever the quality of the run. The delivery stage also never asks for S12 (line 161 stops at S11), though rule 0.7 requires an entry for each of the 12.

````text
# P09 the record as it stands when rule 17.4(h) tells the final AUDITOR to run the checker: its own report is not written, S10 has not ended, S11 has not started
$ python3 mk.py p09 audits/final-audit-E-27.md - x; python3 - <<'PY'
import pathlib
p=pathlib.Path("p09/AUDIT-LOG.md"); t=p.read_text(encoding="utf-8")
p.write_text(t[:t.index("### E-28 ")], encoding="utf-8")
PY
$ grep "^### E-2[5-9]" p09/AUDIT-LOG.md; $C --stage delivery p09; echo "[exit $?]"
### E-25 · 2026-01-01T00:00Z · STAGE · orchestrator
### E-26 · 2026-01-01T00:00Z · STAGE · orchestrator
### E-27 · 2026-01-01T00:00Z · LAUNCH · orchestrator
FAIL AUDIT-LOG.md: stage S10 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S11 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: E-27 LAUNCH has no saved report (rule 1.7)
FAIL AUDIT-LOG.md: no LESSON entry (rule 20.4)
FAIL SESSION-STATE.md: does not name S10, the STAGE the log shows as started (rule 14.6)
FAIL audits/: no final-audit report matched to a LAUNCH entry (rule 17.4)
hinshitsu_check (delivery): 6 failure(s).
[exit 1]
````

Fix (not run): add a stage `audit` with `"audit": range(1, 10)` in `needed` and the delivery-report block limited to the report's own form, cite it in rule 17.4(h), and keep `delivery` for DONE part 7. This needs the owner's decision, because it changes a rule.

**24. The placeholder test finds 2 forms only.** Class: DEFECT. Line 280. It finds `<…>` and `<a | b>` that starts with a small letter. On the unfilled templates it flags 23 of the 181 lines that hold a placeholder, and none in `DELIVERY-REPORT.md` or `SESSION-STATE.md` (see the template run below).

````text
# P29 template placeholders left in place
$ python3 mk.py p29 FRAMEWORK.md + $'Owner: <name>. Path: <path>. Count: <n>. Tier: <CORE | FULL>.\n'; $C --stage plan p29; echo "[exit $?]"
hinshitsu_check (plan): 0 failure(s).
[exit 0]
````

Fix (not run): `re.search(r"<[A-Za-z][^<>\n]{0,80}>", line)` on the line after code spans are removed. It will also flag a real `E-<n>` written in prose; the owner decides whether that is wanted.

**25. PASS may cite any file under `audits/` or `evidence/`.** Class: DEFECT. Lines 323–327. The capability probe supports a PASS. Rule 10.5 allows only an AUDITOR's report or the output of a command an AUDITOR ran.

````text
# P28 PASS cells that cite the capability probe, not an AUDITOR's report
$ python3 mk.py p28 COVERAGE-LEDGER.md "ALL:$PASS" '`PASS` `evidence/capability-probe.md`'; $C --stage delivery p28; echo "[exit $?]"
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Fix (not run): for a path under `audits/`, add `elif ev.group(1).startswith("audits/") and ev.group(1).split("#")[0] not in cited_reports: err(…rule 10.5…)`. A file under `evidence/` cannot be tied to an AUDITOR by form alone.

**26. A sub-heading inside an entry fails the log.** Class: FRAGILITY. Line 45. Rule 9.4 fixes the heading of an entry; it does not forbid `### ` inside one.

````text
# P22 a sub-heading inside an entry
$ python3 mk.py p22 AUDIT-LOG.md $'· VOC · orchestrator\n\ntext' $'· VOC · orchestrator\n\ntext\n\n### Translation\n\nmore text'; $C --stage plan p22; echo "[exit $?]"
FAIL AUDIT-LOG.md: heading '### Translation' does not follow rule 9.4
hinshitsu_check (plan): 1 failure(s).
[exit 1]
````

Fix (not run): treat as "bad" only a line that starts `### E-`; append any other `### ` line to the current entry.

**27. `MINDMAP.md` with the diagram above the list fails.** Class: FRAGILITY. Line 473. "The list" is the text before the first code fence.

````text
# P36 MINDMAP.md with the diagram above the list
$ python3 mk.py p36 MINDMAP.md "" $'```mermaid\ngraph TD\n  F1["F-1"]\n```\n\n- F-1 a fault (DEFECT, closed)\n'; $C --stage delivery p36; echo "[exit $?]"
FAIL MINDMAP.md: F-1 appears 0 times in the list; rule 9.2 requires 1
hinshitsu_check (delivery): 1 failure(s).
[exit 1]
````

Fix (not run): `listed = re.sub(r"```.*?```", "", texts["MINDMAP.md"], flags=re.S)`.

**28. Messages name E-1 when the CAPABILITY entry is E-2.** Class: STYLE. Lines 121, 124, 126. Under rule 0.1 as amended the entry is E-2. (In the output, the first 6 lines are about E-2.)

````text
# P10 the message names E-1 when the CAPABILITY entry is E-2
$ mkdir -p p10/evidence; printf '%s\n' '### E-1 · t · LAUNCH · orchestrator' '' '- Report: `evidence/capability-probe.md`' '' '### E-2 · t · CAPABILITY · orchestrator' '' '- Mode:' > p10/AUDIT-LOG.md; $C --stage plan p10 | grep "E-1 "; echo "[exit ${PIPESTATUS[0]}]"
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 1 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 2 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 3 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 4 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 5 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 states no mode (rule 0.1)
FAIL AUDIT-LOG.md: E-1 LAUNCH scope file is missing (rule 1.5)
FAIL AUDIT-LOG.md: E-1 LAUNCH has no SUB-AGENT identifier (rule 1.5)
FAIL AUDIT-LOG.md: E-1 LAUNCH names no commit and no `no git` (rule 1.5)
FAIL AUDIT-LOG.md: E-1 LAUNCH has no saved report (rule 1.7)
[exit 1]
````

Fix (tested): use `entries_cap["n"]` in the 3 messages.

**29. One missing probe file gives 2 failures in 2 wordings.** Class: STYLE. Lines 127–128 and 396–400 test the same file.

````text
# P25 1 missing file, 2 failures, 2 forms
$ python3 mk.py p25 evidence/capability-probe.md - x; $C --stage delivery p25; echo "[exit $?]"
FAIL evidence/capability-probe.md: missing (rule 0.2)
FAIL evidence/capability-probe.md: missing or empty in a SWARM run (rule 0.2)
hinshitsu_check (delivery): 2 failure(s).
[exit 1]
````

Fix (not run): delete lines 396–400 and add the "not empty" test to line 127.

**30. Rule citations that do not fit.** Class: STYLE. No trigger needed; read the lines.

- Line 81: every missing file cites the same 6 rules (7.1, 8.1, 9.1, 10.1, 19.1, 24.1). Fix: a table from file name to its 1 rule.
- Line 194: "LAUNCH has no saved report" cites rule 1.7 (do not discard); the duty to save is rule 1.6.
- Line 204: cites rule 21.3 (marking the delivery report); the rule that requires the CAPABILITY entry is 21.4.
- Line 232: "logged 2 times" cites rule 9.5 (ID formats); "assign each ID 1 time" is rule 7.4.
- Line 260: cites rule 14.3 for every class; 14.3 covers a BLOCKER, 15.4 the others.
- Line 515: the comment cites rule 17.5 (idempotence) for error handling; no rule covers it.
- Lines 279, 281: the banned-word and placeholder messages cite no rule number.

**31. Dead or doubled code.** Class: STYLE. Line 396 reuses the name `cap` (a string at line 118) for a list. Line 319 prints the same message once per cell with no column; 1 unfilled row gives 10 equal lines (see the template run). The error path at lines 515–517 prints no "N failure(s)" line.

### `scripts/lint.py`

**32. Files that the rules name are not required.** Class: DEFECT. Lines 22–29. `templates/DELIVERY-REPORT.md` (rule 19.1), `templates/FRAMEWORK.md`, `templates/SESSION-STATE.md`, `templates/roles/` (rules 1.5, 16.1), both scripts and `gauge.py` (rules 14.6, 17.4, 24.1) can be deleted with 0 failures.

````text
# L1 lint: templates and role files that the rules name are not required files
$ cp_repo l1; rm l1/templates/DELIVERY-REPORT.md l1/templates/FRAMEWORK.md l1/templates/SESSION-STATE.md; rm -r l1/templates/roles l1/scripts l1/skills/hinshitsu-gauge/scripts; $L l1; echo "[exit $?]"
lint: 0 failure(s). This script tests form; it does not prove that any rule is sound.
[exit 0]
````

Fix (not run): add those paths, and `templates/roles/*.md` by name, to `REQUIRED_FILES`.

**33. Three inputs give a traceback and no verdict.** Class: FRAGILITY. Line 186 (a manifest that is a list), line 137 (a section heading on the last line with no line end), any file that is not UTF-8. `lint.py` has no handler like the other 2 scripts.

````text
# L2 lint: plugin.json that holds a list
$ cp_repo l2; echo '[]' > l2/plugin.json; $L l2; echo "[exit $?]"
Traceback (most recent call last):
  File "/home/ubuntu/scratch/hin/scripts/lint.py", line 209, in <module>
    sys.exit(main(sys.argv))
             ^^^^^^^^^^^^^^
  File "/home/ubuntu/scratch/hin/scripts/lint.py", line 201, in main
    errors = lint(root)
             ^^^^^^^^^^
  File "/home/ubuntu/scratch/hin/scripts/lint.py", line 186, in lint
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", str(data.get("name", ""))):
                                                       ^^^^^^^^
AttributeError: 'list' object has no attribute 'get'
[exit 1]
# L4 lint: a section heading on the last line of a skill, with no line end
$ cp_repo l4; printf '\n## 25. New' >> l4/skills/hinshitsu-gauge/SKILL.md; $L l4; echo "[exit $?]"
Traceback (most recent call last):
  File "/home/ubuntu/scratch/hin/scripts/lint.py", line 209, in <module>
    sys.exit(main(sys.argv))
             ^^^^^^^^^^^^^^
  File "/home/ubuntu/scratch/hin/scripts/lint.py", line 201, in main
    errors = lint(root)
             ^^^^^^^^^^
  File "/home/ubuntu/scratch/hin/scripts/lint.py", line 137, in lint
    body = re.search(r"^## %d\. .*?\n(.*?)(?=^## |\Z)" % num, text, re.M | re.S).group(1)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AttributeError: 'NoneType' object has no attribute 'group'
[exit 1]
# L5 lint: a file that is not UTF-8
$ cp_repo l5; printf 'caf\xe9\n' >> l5/README.md; $L l5 2>&1 | tail -3; echo "[exit ${PIPESTATUS[0]}]"
           ^^^^^^^^
  File "<frozen codecs>", line 322, in decode
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe9 in position 7139: invalid continuation byte
[exit 1]
````

Fix (not run): line 185 `if not isinstance(data, dict): raise ValueError("the manifest is not an object")`; line 137 `m = re.search(…); body = m.group(1) if m else ""`; wrap `main` as the checker does: `except (ValueError, UnicodeDecodeError, OSError) as exc: print("FAIL the files cannot be read: …"); sys.exit(1)`.

**34. A skill saved with Windows line ends fails with a wrong reason.** Class: FRAGILITY. Lines 115–116. The bytes are decoded with `\r\n` kept, so the frontmatter is not found.

````text
# L3 lint: a skill saved with Windows line ends
$ cp_repo l3; sed -i 's/$/\r/' l3/skills/hinshitsu-gauge/SKILL.md; $L l3 | cut -c1-200; echo "[exit ${PIPESTATUS[0]}]"
FAIL skills/hinshitsu-gauge/SKILL.md: no YAML frontmatter (C2)
FAIL skills/hinshitsu-gauge/SKILL.md: frontmatter name None is not the folder name (C2)
FAIL skills/hinshitsu-gauge/SKILL.md: no description (C2)
lint: 3 failure(s). This script tests form; it does not prove that any rule is sound.
[exit 1]
````

Fix (not run): `text = raw.decode("utf-8").replace("\r\n", "\n")`.

**35. Banned words: wrong line numbers, "shouldn't" passes, names in code fail.** Class: DEFECT. Lines 30–34, 59–65. Same causes as bugs 11 and 12. The docstring at line 60 says code spans are removed; they are not. In the proof the words are on lines 18 to 20; lint reports 15 and 17, passes "shouldn't", and fails `ensure_dir()`.

````text
# L6 lint: wrong line number after a code block; inflected and prefixed forms; inline code
$ cp_repo l6; printf '\n```\na\nb\n```\nThe AGENT should stop.\nIt shouldn\x27t fail. This is inappropriate and improperly done.\nCall `ensure_dir()`.\n' >> l6/TESTING.md; grep -n "should\|ensure_dir" l6/TESTING.md; $L l6; echo "[exit $?]"
18:The AGENT should stop.
19:It shouldn't fail. This is inappropriate and improperly done.
20:Call `ensure_dir()`.
FAIL TESTING.md:15: banned word 'should' (C4)
FAIL TESTING.md:17: banned word 'ensure' (C4)
lint: 2 failure(s). This script tests form; it does not prove that any rule is sound.
[exit 1]
````

Fix: as bugs 11 and 12.

**36. Undefined terms in capitals pass when built from words on the skip list.** Class: DEFECT. Lines 39–46, 163–165. The list holds plain words (`WITH`, `CHANGES`, `RECORD`, `TYPE`, `PLAN`, `NO`, `NOT`, `FOR`, `RED`). Any phrase made of them passes.

````text
# L7 lint: an undefined term in capitals built from words of the skip list
$ cp_repo l7; printf '\nThe WITH CHANGES RECORD must approve each TYPE PLAN.\n' >> l7/skills/hinshitsu-gauge/SKILL.md; $L l7; echo "[exit $?]"
lint: 0 failure(s). This script tests form; it does not prove that any rule is sound.
[exit 0]
````

Fix (not run): keep multi-word literals whole (`"PLAN SURVIVES WITH CHANGES"`, `"NO RECORD"`) in a second set matched as phrases, and remove their single words from `NOT_TERMS`.

**37. Messages cite IDs the owner cannot look up in the skills; a wrong folder is not a usage error.** Class: STYLE. Lines 92–195 cite `C1` to `C15` and `E-006`, which are in `build-record/`, not in the skills. Line 200 accepts a folder that does not exist and prints 37 failures.

````text
# L8 lint: a folder that does not exist
$ $L /no/such/folder | tail -1; echo "[exit ${PIPESTATUS[0]}]"
lint: 37 failure(s). This script tests form; it does not prove that any rule is sound.
[exit 1]
````

Fix (not run): name the file `build-record/AUDIT-LOG.md` in the closing line; `if not Path(root).is_dir(): print usage; return 2`.

### `skills/hinshitsu-gauge/scripts/gauge.py`

**38. Entries the script cannot read are dropped in silence.** Class: FRAGILITY. Lines 33–40, 60–68. A STAGE heading with the wrong separator, an event word such as `ended`, and a STAGE `S13` are ignored; the gauge shows less progress and exits 0 with no warning.

````text
# G3 gauge: a STAGE heading with hyphens, and an event word the script does not know
$ mkdir -p g3; printf '### E-1 - t - STAGE - orchestrator\n\n- Stage: S1\n- Event: end\n\n### E-2 · t · STAGE · orchestrator\n\n- Stage: S2\n- Event: ended\n\n### E-3 · t · STAGE · orchestrator\n\n- Stage: S13\n- Event: end\n' > g3/AUDIT-LOG.md; $G g3 --no-svg | head -4; echo "[exit ${PIPESTATUS[0]}]"
hinshitsu gauge  [........................] 0%  0 of 12 stages complete
Next: S1 Capability and tier  -> skill: hinshitsu
  [ ] S1  Capability and tier            hinshitsu
  [ ] S2  Record set up                  hinshitsu-record
[exit 0]
````

Fix (not run): count the `### ` lines that fail `HEADING`, the STAGE entries with an unknown event or STAGE, and print `"%d entries could not be read"` under the gauge.

**39. A mistyped option is ignored.** Class: FRAGILITY. Lines 197, 207. `--nosvg` writes the picture.

````text
# G2 gauge: a mistyped option is ignored and the picture is written
$ mkdir -p g2; cp g1/AUDIT-LOG.md g2/; $G g2 --nosvg | head -1; ls g2
hinshitsu gauge  [########################] 100%  12 of 12 stages complete
AUDIT-LOG.md
GAUGE.svg
````

Fix (not run): `if any(a.startswith("--") and a != "--no-svg" for a in argv[1:]): usage; return 2`.

**40. Wrong words in 3 messages.** Class: STYLE.

- Lines 111, 166: "All 12 stages have an end entry" when all 12 are skipped.
- Lines 216–217: a failure to write the picture is reported as "the log cannot be read".
- Lines 119, 177: the script prints `STOPPED - blocker open` with a hyphen; rule 24.3 gives `STOPPED — blocker open`. (See the example run below.)

````text
# G1 gauge: 12 STAGES skipped
$ mkdir -p g1; for i in 1 2 3 4 5 6 7 8 9 10 11 12; do printf '### E-%d · t · STAGE · orchestrator\n\n- Stage: S%d\n- Event: skipped\n\n' $i $i; done > g1/AUDIT-LOG.md; $G g1 --no-svg | head -2; echo "[exit ${PIPESTATUS[0]}]"
hinshitsu gauge  [########################] 100%  12 of 12 stages complete
All 12 stages have an end entry. This is the log's state, not proof of DONE.
[exit 0]
# G4 gauge: a folder that cannot be written
$ mkdir -p g4; cp g1/AUDIT-LOG.md g4/; chmod 555 g4; $G g4; echo "[exit $?]"; chmod 755 g4
hinshitsu gauge: the log cannot be read: PermissionError: [Errno 13] Permission denied: 'g4/GAUGE.svg'
[exit 2]
````

Fix (not run): "All 12 stages have an end or skipped entry"; "hinshitsu gauge: cannot read the log or write the picture"; use the em dash.

**41. A BLOCKER logged 2 times is listed 2 times; `started` is dead code.** Class: STYLE. Lines 75–83, 99. In the proof, `**BLOCKER**` is not counted (the checker fails that class word too), F-2 appears twice, and the overruled F-3 stays open, which agrees with rule 24.2.

````text
# G5 gauge: a BLOCKER whose class word carries marks, and a BLOCKER logged 2 times
$ mkdir -p g5; printf '### E-1 · t · FINDING · a\n\n- ID: F-1\n- Class: **BLOCKER**\n\n### E-2 · t · FINDING · a\n\n- ID: F-2\n- Class: BLOCKER\n\n### E-3 · t · FINDING · a\n\n- ID: F-2\n- Class: BLOCKER\n\n### E-4 · t · FINDING · a\n\n- ID: F-3\n- Class: BLOCKER\n\n### E-5 · t · OVERRULE · a\n\n- Finding: F-3\n' > g5/AUDIT-LOG.md; $G g5 --no-svg | sed -n 1,3p; echo "[exit ${PIPESTATUS[0]}]"
hinshitsu gauge  [........................] 0%  0 of 12 stages complete
Next: S1 Capability and tier  -> skill: hinshitsu
STOPPED - blocker open: F-2, F-2, F-3
[exit 0]
````

Fix (not run): `if fid and fid not in blockers:`; delete line 99.

### Outside the 3 scripts, seen while testing

- `templates/AUDIT-LOG.md` numbers 2 entries E-3 (TIER and STAGE). The checker reports it: "entry E-3 where E-4 belongs".
- `templates/MINDMAP.md` writes `F-001` and `D-001`; rule 9.5 and `templates/AUDIT-LOG.md` write `F-1`. The checker treats them as different IDs.
- `EXAMPLE.md` line 57 states that the checker prints 1 failure on the example run. I saw that failure (below). This is disclosed, not hidden.

## Checks against their rules

Each row is 1 check of `hinshitsu_check.py`. "Input" is an input the rule forbids that passes (WEAKER) or one the rule allows that fails (STRONGER). A proof number points to the block above. "base" is the tests' passing fixture, which already holds the input. "(not run)" marks an input I reasoned from the code and did not run.

| Lines | Check | Rule cited | Verdict | Input |
|---|---|---|---|---|
| 79–81 | each file of the stage exists | 7.1, 8.1, 9.1, 10.1, 19.1, 24.1 | MATCH (1 rule list for every file, bug 30) | — |
| 91 | heading form | 9.4 | STRONGER | `### Translation` inside an entry (bug 26) |
| 93–94 | numbers ascend by 1 | 9.4 | MATCH | — |
| 96–97 | type is 1 of 27 | 9.4 | MATCH (the 27 words equal the rule's list; compared by script) | — |
| 98–99 | a time is present | 0.6 | WEAKER | `some time later`; a time that goes backward: proof P13 below |
| 100–102 | no later entry cited | 9.6 | WEAKER | an entry that cites a decision `D-9` logged later (not run); only `E-` IDs are read |
| 109–116 | log opens with probe LAUNCH and CAPABILITY | 0.1 | WEAKER | a log that opens with CAPABILITY and has no probe LAUNCH (base; the comment at line 108 says so) |
| 120–121 | 5 parts answered yes or no | 0.1 | WEAKER | no runtime name, no RUN FOLDER, no tool, no reason (base) |
| 123–124 | mode stated | 0.1 | MATCH | — |
| 125–126 | SWARM with a part `no` | 0.3 | STRONGER | bug 16 |
| 127–128, 396–400 | probe file exists, not empty | 0.2 | WEAKER | a probe file that holds 1 letter and no identifier (not run) |
| 129–130 | a TIER entry exists | 0.5 | WEAKER | a TIER entry with no count and no second entry before the audit (base) |
| 131–133 | VOC, GAP, ASSUMPTION, CRITERIA exist | sections 2, 3, 4, 23 | WEAKER | each entry holds only the word "text" (base) |
| 139–142 | STAGE has Stage and Event | 0.7 | MATCH | — |
| 144–145 | start has a SHA-256 | 0.7 | WEAKER and STRONGER | 1 hash of 64 letters "a" (base); a hash in capitals (bug 17) |
| 146–147 | end needs a start | 0.7 | MATCH | — |
| 148–158 | artifacts of an end exist | 0.7 | WEAKER | an end with no Artifacts line (base, S6); `/etc/hostname` (bug 22) |
| 161–165 | each STAGE ended or skipped | 0.7 | WEAKER and STRONGER | a FULL run with S5, S8, S9 skipped and no S12 (base); the record at rule 17.4(h) (bug 23) |
| 172–175 | FROZEN needs a quoted approval | 3.3 | WRONG RULE (3.4); STRONGER | bug 13 |
| 176–177 | not FROZEN at unit or delivery | 3.3 | WRONG RULE (3.2) | — |
| 188 | scope file exists | 1.5 | MATCH | — |
| 190 | identifier present | 1.5 | WEAKER | identifier `r` (bug 21); no link and no `not openable by the USER` (base) |
| 192 | commit or `no git` | 1.5 | MATCH | — |
| 194 | LAUNCH has a saved report | 1.7 | WRONG RULE (1.6) | — |
| 201–204 | DEGRADED first line needs a DEGRADED CAPABILITY entry | 21.3 | WRONG RULE (21.4) | — |
| 205–206 | first line holds the identifier | 1.6 | WEAKER | bug 21 |
| 207–213 | every report matches a LAUNCH | 1.8 | WEAKER | bug 20 |
| 219–221 | FINDING has an ID | 15.1 | WEAKER | ID `F-1.` (bug 7) |
| 225–227 | class is 1 of 4 | 15.1 | MATCH | — |
| 228–230 | 5 more fields present | 15.1 | MATCH | — |
| 231–232 | ID logged 1 time | 9.5 | WRONG RULE (7.4) | — |
| 237–238 | closing entry names a logged FINDING | 15.4 | MATCH | — |
| 242–243 | no overrule of a BLOCKER | 14.4 | MATCH | — |
| 244–245 | overrule of DEFECT or FRAGILITY quotes the USER | 15.5 | STRONGER | bug 15 |
| 247–249 | result FIXED or WITHDRAWN | 15.4 | MATCH | — |
| 250–252 | record fault only for a DEFECT | 14.6 | MATCH | — |
| 253–256 | record-check output exists | 14.6 | WEAKER | bug 19 |
| 258–260 | re-audit report exists | 14.3 | WEAKER | bug 18 (DEFECT) |
| 261–265 | BLOCKER closed on a later LAUNCH | 14.3 | WEAKER | bug 18 (`-seed-`) |
| 266–268 | 1 closing entry | 15.4 | MATCH | — |
| 272–279 | banned words | "banned-word rule" | WEAKER and STRONGER | bug 11 |
| 280–281 | placeholder left | none | no rule cited; WEAKER against the templates' own instruction | bug 24 |
| 284–288 | every edge labelled | 9.3 | WEAKER and STRONGER | bug 10; the edge table is not read |
| 309–310 | 11 cells | 10.2 | MATCH | — |
| 313–316 | no empty cell at delivery | 10.6 | MATCH | — |
| 317–319 | cell starts PASS, FAIL, N/A or UNVERIFIED | 10.3 | MATCH | — |
| 322–325 | PASS cites a file | 10.5 | WEAKER | bug 25 |
| 326–327 | cited file exists | 17.4 | MATCH | — |
| 328–331 | FAIL names a logged FINDING | 10.3 | MATCH | — |
| 332–333 | N/A and UNVERIFIED give a reason | 10.3 | WEAKER | bug 6 |
| 334–335 | ledger has a row | 10.1 | WEAKER | 1 row for a whole DELIVERABLE (base) |
| 344–346 | 12 headings in order | 19.1 | MATCH (equal to rules 19.2–19.13; compared by script) | — |
| 348–351 | Summary ≤ 200 words | 19.3 | MATCH | — |
| 352–354 | 4 sub-headings | 19.3 | WEAKER | a Summary with no "You may stop reading here." (base) |
| 355–357 | 3 numbered checks | 19.2 | WEAKER | checks "a", "b", "c", no closing sentence (base) |
| 358–361 | Status DONE or DELIVERED — NOT DONE | 19.4 | WEAKER | a DEGRADED run, no unmet part named, no TIER, no mode: proof P34 below |
| 367–372 | DONE: criteria listed, a ledger row for each | DONE part 1 | WEAKER and STRONGER | bugs 2 and 14 |
| 373–374, 379–380 | DONE in a DEGRADED run | 21.6 | MATCH | — |
| 375–376 | DONE with open FINDINGS | DONE parts 2, 3 | MATCH | — |
| 377–378 | DONE with an UNVERIFIED CRITERION row | 22.4 | MATCH | — |
| 381–383 | open FINDINGS listed in the report | 15.6 | MATCH | — |
| 384–386 | cited paths exist | 17.4 | WEAKER | a missing path outside `audits/`, `memos/`, `evidence/`, `prompts/`, or not in backticks (not run) |
| 387–389 | cited entries exist | 17.4 | MATCH | — |
| 390–393 | no ASSERTED claim | 17.2 | WEAKER | bug 5 |
| 394–395 | a LESSON entry | 20.4 | MATCH | — |
| 401–403 | state files agree with the log | 14.6 | see the 5 rows below | — |
| 404–409 | final audit passed | DONE part 6 | WEAKER and STRONGER | bugs 1 and 3 |
| 410–415 | budget | 0.9 | WEAKER | bug 4 |
| 416–417 | a final-audit report with a LAUNCH | 17.4 | MATCH | — |
| 453–456 | a named FINDING has an entry | 14.6 | MATCH | — |
| 458–465 | open or closed agrees with the log | 14.6 | STRONGER; WEAKER | bug 9; a line that names 2 FINDINGS is skipped (line 460) |
| 466–469 | newest CRITERIA entry named | 14.6 | MATCH | — |
| 470–471 | running STAGE named | 14.6 | WEAKER and STRONGER | bug 8 |
| 472–477 | each FINDING 1 time in the list | 9.2 | WEAKER and STRONGER | the diagram, the CRITERIA, the WORK UNITS and the decisions are not counted (base); bug 27 |

Proofs for the 2 rows that have no bug number, and what the base fixture lacks (no ANSWER, DELIVERY or S12 entry; TIER FULL with 3 STAGES skipped; an S6 end with no Artifacts line):

````text
# P13 times: free text and a time that goes backward
$ python3 mk.py p13 AUDIT-LOG.md "### E-2 · 2026-01-01T00:00Z" "### E-2 · 1999-01-01T00:00Z" AUDIT-LOG.md "### E-3 · 2026-01-01T00:00Z" "### E-3 · some time later"; sed -n '/^### E-[123] /p' p13/AUDIT-LOG.md; $C --stage delivery p13; echo "[exit $?]"
### E-1 · 2026-01-01T00:00Z · CAPABILITY · orchestrator
### E-2 · 1999-01-01T00:00Z · TIER · orchestrator
### E-3 · some time later · STAGE · orchestrator
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
# P34 a DEGRADED run whose Status line does not say DEGRADED and names no unmet part of DONE
$ python3 mk.py p34 DELIVERY-REPORT.md $'## Status\n\nDONE' $'## Status\n\nDELIVERED — NOT DONE' AUDIT-LOG.md + $'\n### E-{N} · 2026-01-01T00:00Z · CAPABILITY · orchestrator\n\n- Mode: DEGRADED\n'; $C --stage delivery p34; echo "[exit $?]"
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
# P33 the passing fixture of the tests: what it lacks
$ grep -c "· ANSWER ·\|· DELIVERY ·\|Stage: S12" base/AUDIT-LOG.md; grep -n "TIER: \|Event: skipped" base/AUDIT-LOG.md; grep -n -A3 "^- Stage: S6" base/AUDIT-LOG.md | grep -n "Event: end" ; $C --stage delivery base; echo "[exit $?]"
0
14:- TIER: FULL
80:- Event: skipped — fixture
145:- Event: skipped — fixture
150:- Event: skipped — fixture
7:97-- Event: end
hinshitsu_check (delivery): 0 failure(s).
[exit 0]
````

Totals: 74 rows; 31 MATCH, 5 WRONG RULE (1 of them also STRONGER), 36 WEAKER or STRONGER or both, 1 with no rule cited, 1 that points to the 5 rows of the record check.

## Rules no script tests

I searched the 7 skills and the glossary for "script", "checker", `hinshitsu_check`, `lint.py` and `gauge.py`. 6 places say a script tests or shows something. For each: what the script leaves untested.

| Rule | What the rule says the script does | What no script tests |
|---|---|---|
| 14.6(b) | `--record` must exit 0; its output is saved | No script reads the saved output (bug 19). |
| 14.6 | A false or out-of-date statement in a record file is closed "by a script check" | `--record` tests 5 things only: FINDING IDs exist, open or closed, the newest CRITERIA entry number, the running STAGE, FINDINGS in the mind-map list. It does not test CRITERION states, approvals, WORK UNIT, artifacts, checks run or next action (fields 2 to 8 of rule 8.1), nor `CONNECTIONS.md`, nor `COVERAGE-LEDGER.md`. |
| 17.7 | The checker tests "that entries, citations, cells and files exist and agree with each other" | Citations inside log entries other than `E-` IDs and the paths of LAUNCH, RESOLUTION and Artifacts fields; any citation in `FRAMEWORK.md`, `SESSION-STATE.md`, `MINDMAP.md`, `CONNECTIONS.md`; whether a cited file says what the claim says. |
| DONE part 7 | The script exits 0, and an ANSWER entry quotes the USER on the final AUDITOR's link | The ANSWER entry is not tested. The fixture passes DONE with no ANSWER entry (base). |
| 24.2, 24.3 | The gauge shows `STOPPED — blocker open` with the FINDING IDs | The words differ by 1 character (bug 40). The picture lists at most 4 IDs, then "..." (line 178); the text lists all. |
| 24.5 | Same log, same picture, byte for byte | Tested and true: `test_same_log_gives_same_bytes`, and my proof G6. |

No other rule of the skills says a script tests it. `CHANGELOG.md` line 22 lists rules "made testable" (0.4, 0.6, 0.7, 1.7, 6.1, 7.3, 8.1, 8.2, 16.4, 16.7, 17.3, 17.6, 21.2). I read that as "worded so that a person can test them". If the owner reads it as "the script tests them", then the script tests none of these in full: 0.6 and 0.7 in part (rows above), the other 11 not at all.

````text
# G6 gauge: same log, same bytes
$ $G g1 >/dev/null; sha256sum g1/GAUGE.svg; $G g1 >/dev/null; sha256sum g1/GAUGE.svg
047be80df48e46c11204f49e54a35baa4e3b5663f68502223d1e7b9287a41354  g1/GAUGE.svg
047be80df48e46c11204f49e54a35baa4e3b5663f68502223d1e7b9287a41354  g1/GAUGE.svg
````

## Test coverage and mutation check

Command and complete output (the usage text and the 5 `hinshitsu_check (record)` lines are printed by tests that call `main`):

```text
$ python3 -m unittest discover -s tests
........................................hinshitsu check: test the form of a run's record.

Usage: hinshitsu_check.py [--stage plan|unit|delivery] <run-folder>
       hinshitsu_check.py --record <run-folder>   (state files against the log, rule 14.6)
Exit 0 when every check for the stage passes, 1 when any fails, 2 on a usage error.
Standard library only. Same folder in, same verdict out.

This script tests the shape of the record: that entries, citations, cells and
files exist and agree with each other. It does not prove that any check ran or
that any report is true (rule 17.7).
...............................
----------------------------------------------------------------------
Ran 71 tests in 2.104s

OK
hinshitsu_check (record): 0 failure(s).
FAIL MINDMAP.md:1: calls F-1 closed; the log holds no closing entry (rule 14.6)
hinshitsu_check (record): 1 failure(s).
[exit 0]
```

Mutation check. For each failure message in the script I made 1 scratch copy in which that 1 message is never recorded, and ran the 71 tests. KILLED means 1 or more tests failed. SURVIVED means all 71 passed, so no test covers that check. KILLED rows come first; the last row of each table lists the lines of the SURVIVED mutants.

`hinshitsu_check.py`: 79 mutants, 36 KILLED, 43 SURVIVED.

| Line | Check (message) | Result | Test that failed |
|---|---|---|---|
| 94 | entry E-%d where E-%d belongs (rule 9.4) | KILLED | gap_in_entry_numbers_fails |
| 102 | E-%d cites later entry E-%s (rule 9.6) | KILLED | entry_citing_later_entry_fails |
| 174 | E-%d is FROZEN with no quoted approval (rule 3.3 | KILLED | frozen_without_quoted_approval_fails |
| 176 | CRITERIA are not FROZEN; no WORK UNIT may be rep | KILLED | proposed_criteria_fail_at_unit |
| 190 | E-%d LAUNCH has no SUB-AGENT identifier (rule 1. | KILLED | identifier_none_fails |
| 194 | E-%d LAUNCH has no saved report (rule 1.7) | KILLED | launch_without_report_fails |
| 204 | %s: first line says DEGRADED, and no CAPABILITY  | KILLED | degraded_first_line_with_hyphen_fails, degraded_first_line_without_degraded_mode_fails |
| 206 | %s: first line does not hold the identifier of E | KILLED | report_without_identifier_line_fails |
| 213 | %s: report matches no LAUNCH entry (rule 1.8) | KILLED | report_with_no_launch_fails |
| 243 | E-%d overrules BLOCKER %s (rule 14.4) | KILLED | overruled_blocker_fails |
| 251 | E-%d closes %s %s as a record fault; rule 14.6 c | KILLED | blocker_closed_as_record_fault_fails |
| 256 | E-%d cites no existing record-check output (rule | KILLED | record_fault_resolution_needs_the_saved_output |
| 264 | E-%d cites %s, which matches no LAUNCH entry lat | KILLED | blocker_closed_by_a_report_older_than_the_finding_fails |
| 279 | %s:%d: banned word %r (banned-word rule of the c | KILLED | banned_word_fails_and_quoted_one_passes |
| 288 | edge %s --> %s has no label (rule 9.3) | KILLED | unlabeled_edge_fails |
| 315 | empty cell (rule 10.6) | KILLED | empty_ledger_cell_fails_at_delivery |
| 325 | PASS cites no report or evidence (rule 10.5) | KILLED | pass_without_citation_fails |
| 327 | PASS cites %s, which does not exist (rule 17.4) | KILLED | pass_with_missing_evidence_fails |
| 346 | headings %s; rule 19.1 requires %s | KILLED | wrong_heading_order_fails |
| 351 | Summary has %d words; limit 200 (rule 19.3) | KILLED | long_summary_fails |
| 368 | Status DONE, and the newest CRITERIA entry lists | KILLED | done_with_criteria_entry_that_lists_no_criterion_fails |
| 376 | Status DONE with open FINDINGS %s (DONE, parts 2 | KILLED | done_with_open_finding_fails |
| 378 | Status DONE with %d UNVERIFIED CRITERION rows (r | KILLED | criterion_row_in_code_marks_cannot_hide_unverified |
| 389 | cites E-%s, which is not in the log (rule 17.4) | KILLED | report_citing_absent_entry_fails |
| 393 | %r has no citation; it is ASSERTED (rule 17.2) | KILLED | uncited_summary_claim_fails |
| 403 | (each failure of the record check, rule 14.6) | KILLED | delivery_stage_runs_the_record_check |
| 409 | %s: Status DONE, and the last line of the final  | KILLED | done_with_final_audit_not_passed_fails |
| 412 | Status DONE, and no TIER entry states Planned SU | KILLED | done_without_planned_runs_fails |
| 414 | %d LAUNCH entries exceed the %d planned, with no | KILLED | more_launches_than_planned_fails |
| 417 | audits/: no final-audit report matched to a LAUN | KILLED | missing_final_audit_fails |
| 456 | %s:%d: names %s, which has no FINDING entry (rul | KILLED | unknown_finding_fails |
| 463 | %s:%d: calls %s open; the log closed it (rule 14 | KILLED | closed_finding_called_open_fails |
| 465 | %s:%d: calls %s closed; the log holds no closing | KILLED | cli_exit_codes, open_finding_called_fixed_fails |
| 469 | %s: does not name E-%d, the newest CRITERIA entr | KILLED | stale_criteria_entry_fails |
| 471 | does not name %s, the STAGE the log shows as sta | KILLED | wrong_stage_fails |
| 477 | %s appears %d times in the list; rule 9.2 requir | KILLED | delivery_stage_runs_the_record_check, finding_missing_from_mind_map_fails |
| 81, 91, 97, 99, 116, 121, 124, 126, 128, 130, 133, 141, 145, 147, 158, 165, 188, 192, 221, 227, 230, 232, 238, 245, 249, 260, 268, 281, 310, 319, 331, 333, 335, 354, 357, 361, 371, 374, 380, 383, 386, 395, 400 | the message at each of these lines | SURVIVED | none |

`lint.py`: 24 mutants, 8 KILLED, 16 SURVIVED.

| Line | Check (message) | Result | Test that failed |
|---|---|---|---|
| 94 | adapter for a surface that fails the swarm test | KILLED | perplexity_adapter_fails |
| 100 | term defined N times (C3) | KILLED | duplicate_glossary_term_fails |
| 122 | frontmatter name %r is not the folder name (C2) | KILLED | wrong_name_fails |
| 127 | description is %d characters; limit 1,024 (C13) | KILLED | long_description_fails |
| 134 | sections %s; expected %s in that order (C2) | KILLED | missing_section_fails |
| 140 | section %d: rule numbers %s are not 1..n (C5) | KILLED | rule_number_gap_fails |
| 154 | banned word (C4) | KILLED | banned_word_in_a_rule_fails |
| 167 | capitalized term is not in the glossary (C3) | KILLED | undefined_capitalized_term_fails |
| 92, 103, 113, 119, 125, 129, 131, 142, 173, 175, 177, 179, 187, 191, 193, 195 | the message at each of these lines | SURVIVED | none |

Checks that no test covers: the 43 and the 16 marked SURVIVED. In plain words, for the checker: missing files, heading form, entry type, time, all of the capability and probe checks, the TIER, VOC, GAP, ASSUMPTION and CRITERIA entries, every STAGE check, the scope file, the commit, 4 of the FINDING field checks, 4 closing checks, placeholders, 5 ledger checks, the Summary sub-headings, the 3 checks, the Status line, 3 DONE checks, the open-FINDING list, cited paths and the LESSON entry.

The tests also never run the checker on the example run or on the templates. The tests' passing fixture is itself a record the rules forbid (the 12 rows marked "base" above), so the tests fix those weak spots in place.

`gauge.py` has no failure messages to switch off; I ran no mutants on it. From the test names, no test covers: an unknown option, a folder that cannot be written, a malformed heading, the 4-ID limit in the picture, a BLOCKER logged 2 times.

## Runs on the example and on the templates

Example run, in place (the checker writes nothing):

````text
$ python3 scripts/hinshitsu_check.py --stage plan skills/hinshitsu/example/run
FAIL AUDIT-LOG.md: E-92 closes BLOCKER F-18 as a record fault; rule 14.6 covers a DEFECT only
hinshitsu_check (plan): 1 failure(s).
[exit 1]
$ python3 scripts/hinshitsu_check.py --stage unit skills/hinshitsu/example/run
FAIL AUDIT-LOG.md: E-92 closes BLOCKER F-18 as a record fault; rule 14.6 covers a DEFECT only
hinshitsu_check (unit): 1 failure(s).
[exit 1]
$ python3 scripts/hinshitsu_check.py --stage delivery skills/hinshitsu/example/run
FAIL AUDIT-LOG.md: E-92 closes BLOCKER F-18 as a record fault; rule 14.6 covers a DEFECT only
hinshitsu_check (delivery): 1 failure(s).
[exit 1]
$ python3 scripts/hinshitsu_check.py --record skills/hinshitsu/example/run
hinshitsu_check (record): 0 failure(s).
[exit 0]
````

Gauge on a scratch copy of the example run. The picture it wrote is byte-equal to the `GAUGE.svg` in the repository (`cmp` printed nothing).

````text
$ python3 skills/hinshitsu-gauge/scripts/gauge.py ex; cmp ex/GAUGE.svg skills/hinshitsu/example/run/GAUGE.svg
hinshitsu gauge  [########################] 100%  12 of 12 stages complete
All 12 stages have an end entry. This is the log's state, not proof of DONE.
STOPPED - blocker open: F-90, F-98, F-102, F-103, F-137, F-138, F-141, F-149, F-153, F-154, F-155, F-156, F-157, F-158, F-159
  [x] S1  Capability and tier            hinshitsu
  [x] S2  Record set up                  hinshitsu-record
  [x] S3  Customer voice and gap list    hinshitsu-baby-bird-plan
  [x] S4  Assumptions and criteria       hinshitsu-baby-bird-plan
  [x] S5  Lenses and red cell            hinshitsu-challenge
  [x] S6  Reconcile and freeze           hinshitsu-baby-bird-plan
  [x] S7  Build and audit                hinshitsu-audit
  [x] S8  Recipient and stability checks hinshitsu-audit
  [x] S9  Pre-delivery red cell          hinshitsu-challenge
  [x] S10 Audit of the audit             hinshitsu-delivery
  [x] S11 Delivery report                hinshitsu-delivery
  [x] S12 Lessons                        hinshitsu-delivery
  x done   - skipped   > running   (blank) pending
[exit 0]
````

`lint.py` on the repository:

```text
$ python3 scripts/lint.py
lint: 0 failure(s). This script tests form; it does not prove that any rule is sound.
[exit 0]
```

Templates, copied to a scratch folder `tpl`. Stage delivery, complete. Where the script printed the same line 10 times in a row, I show it 1 time with the mark `[printed 10 times]`:

```text
$ python3 scripts/hinshitsu_check.py --stage delivery tpl
FAIL GAUGE.svg: file is missing (rules 7.1, 8.1, 9.1, 10.1, 19.1, 24.1)
FAIL AUDIT-LOG.md: entry E-3 where E-4 belongs (rule 9.4)
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 1 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 2 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 3 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 4 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 does not answer SWARM-CAPABLE part 5 (rule 0.1)
FAIL AUDIT-LOG.md: E-1 states no mode (rule 0.1)
FAIL AUDIT-LOG.md: E-3 STAGE entry lacks Stage or Event (rule 0.7)
FAIL AUDIT-LOG.md: stage S1 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S2 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S3 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S4 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S5 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S6 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S7 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S8 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S9 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S10 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: stage S11 has no end or skipped entry (rule 0.7)
FAIL AUDIT-LOG.md: CRITERIA are not FROZEN; no WORK UNIT may be reported VERIFIED (rule 3.3)
FAIL AUDIT-LOG.md: E-1 LAUNCH scope file is missing (rule 1.5)
FAIL AUDIT-LOG.md: E-1 LAUNCH has no SUB-AGENT identifier (rule 1.5)
FAIL AUDIT-LOG.md: E-1 LAUNCH has no saved report (rule 1.7)
FAIL AUDIT-LOG.md: E-11 LAUNCH scope file is missing (rule 1.5)
FAIL AUDIT-LOG.md: E-11 LAUNCH has no SUB-AGENT identifier (rule 1.5)
FAIL AUDIT-LOG.md: E-11 LAUNCH has no saved report (rule 1.7)
FAIL AUDIT-LOG.md: F-1 has no class (rule 15.1)
FAIL AUDIT-LOG.md: E-16 has no result FIXED or WITHDRAWN (rule 15.4)
FAIL AUDIT-LOG.md: E-16 cites no existing re-audit report (rule 14.3)
FAIL AUDIT-LOG.md: E-17 closes F-<n>, which has no FINDING entry (rule 15.4)
FAIL AUDIT-LOG.md:9: template placeholder left in place
FAIL AUDIT-LOG.md:15: template placeholder left in place
FAIL AUDIT-LOG.md:16: template placeholder left in place
FAIL AUDIT-LOG.md:26: template placeholder left in place
FAIL AUDIT-LOG.md:27: template placeholder left in place
FAIL AUDIT-LOG.md:28: template placeholder left in place
FAIL AUDIT-LOG.md:29: template placeholder left in place
FAIL AUDIT-LOG.md:30: template placeholder left in place
FAIL AUDIT-LOG.md:31: template placeholder left in place
FAIL AUDIT-LOG.md:38: template placeholder left in place
FAIL AUDIT-LOG.md:45: template placeholder left in place
FAIL AUDIT-LOG.md:107: template placeholder left in place
FAIL AUDIT-LOG.md:108: template placeholder left in place
FAIL AUDIT-LOG.md:109: template placeholder left in place
FAIL AUDIT-LOG.md:116: template placeholder left in place
FAIL AUDIT-LOG.md:144: template placeholder left in place
FAIL AUDIT-LOG.md:145: template placeholder left in place
FAIL AUDIT-LOG.md:163: template placeholder left in place
FAIL AUDIT-LOG.md:169: template placeholder left in place
FAIL FRAMEWORK.md:35: template placeholder left in place
FAIL FRAMEWORK.md:41: template placeholder left in place
FAIL MINDMAP.md:3: template placeholder left in place
FAIL CONNECTIONS.md:23: template placeholder left in place
FAIL COVERAGE-LEDGER.md:20: cell '<cell>' is not PASS, FAIL, N/A or UNVERIFIED (rule 10.3)   [printed 10 times]
FAIL COVERAGE-LEDGER.md:26: cell '<cell>' is not PASS, FAIL, N/A or UNVERIFIED (rule 10.3)   [printed 10 times]
FAIL COVERAGE-LEDGER.md:32: cell '<cell>' is not PASS, FAIL, N/A or UNVERIFIED (rule 10.3)   [printed 10 times]
FAIL COVERAGE-LEDGER.md:38: cell '<cell>' is not PASS, FAIL, N/A or UNVERIFIED (rule 10.3)   [printed 10 times]
FAIL DELIVERY-REPORT.md: Status is neither DONE nor DELIVERED — NOT DONE (rule 19.4)
FAIL DELIVERY-REPORT.md: cites audits/redcell-delivery.md, which does not exist (rule 17.4)
FAIL DELIVERY-REPORT.md: cites audits/redcell-plan.md, which does not exist (rule 17.4)
FAIL MINDMAP.md:11: names F-001, which has no FINDING entry (rule 14.6)
FAIL MINDMAP.md:25: names F-001, which has no FINDING entry (rule 14.6)
FAIL SESSION-STATE.md: does not name E-8, the newest CRITERIA entry (rule 14.6)
FAIL FRAMEWORK.md: does not name E-8, the newest CRITERIA entry (rule 14.6)
FAIL MINDMAP.md: F-1 appears 0 times in the list; rule 9.2 requires 1
FAIL audits/: no final-audit report matched to a LAUNCH entry (rule 17.4)
hinshitsu_check (delivery): 103 failure(s).
[exit 1]
```

Stage unit printed 88 failures, exit 1: the delivery list minus the 15 lines for `GAUGE.svg`, S7 to S11, the 3 `DELIVERY-REPORT.md` lines, the 5 record lines and the `audits/` line. Stage plan printed 47 failures, exit 1: the unit list minus "CRITERIA are not FROZEN" and the 40 `COVERAGE-LEDGER.md` lines. I checked both statements with `comm`.

```text
$ python3 scripts/hinshitsu_check.py --record tpl
FAIL MINDMAP.md:11: names F-001, which has no FINDING entry (rule 14.6)
FAIL MINDMAP.md:25: names F-001, which has no FINDING entry (rule 14.6)
FAIL SESSION-STATE.md: does not name E-8, the newest CRITERIA entry (rule 14.6)
FAIL FRAMEWORK.md: does not name E-8, the newest CRITERIA entry (rule 14.6)
FAIL MINDMAP.md: F-1 appears 0 times in the list; rule 9.2 requires 1
hinshitsu_check (record): 5 failure(s).
[exit 1]
$ python3 skills/hinshitsu-gauge/scripts/gauge.py tpl
hinshitsu gauge  [........................] 0%  0 of 12 stages complete
Next: S1 Capability and tier  -> skill: hinshitsu
  [ ] S1  Capability and tier            hinshitsu
  [ ] S2  Record set up                  hinshitsu-record
  [ ] S3  Customer voice and gap list    hinshitsu-baby-bird-plan
  [ ] S4  Assumptions and criteria       hinshitsu-baby-bird-plan
  [ ] S5  Lenses and red cell            hinshitsu-challenge
  [ ] S6  Reconcile and freeze           hinshitsu-baby-bird-plan
  [ ] S7  Build and audit                hinshitsu-audit
  [ ] S8  Recipient and stability checks hinshitsu-audit
  [ ] S9  Pre-delivery red cell          hinshitsu-challenge
  [ ] S10 Audit of the audit             hinshitsu-delivery
  [ ] S11 Delivery report                hinshitsu-delivery
  [ ] S12 Lessons                        hinshitsu-delivery
  x done   - skipped   > running   (blank) pending
[exit 0]
```

Placeholder lines found by the checker in the unfilled templates: `AUDIT-LOG.md` 19 of 107, `CONNECTIONS.md` 1 of 6, `COVERAGE-LEDGER.md` 0 of 6 (the cells fail another check), `DELIVERY-REPORT.md` 0 of 23, `FRAMEWORK.md` 2 of 9, `MINDMAP.md` 1 of 20, `SESSION-STATE.md` 0 of 10.

## What "0 failures" means

For an owner who cannot read code. "0 failures" from `hinshitsu_check.py --stage delivery` is a statement about paperwork, not about the work.

**What it tells you**

- The 8 record files exist.
- The log's entries are numbered 1, 2, 3 … with no gap, each has a known type and some text where the time goes, and no entry points to a later entry number.
- The log has a capability entry, a tier entry, a customer-voice entry, a gap list, an assumptions entry and a criteria entry. Stages 1 to 11 each have an "end" or "skipped" entry.
- The newest criteria entry says FROZEN and holds something in quotation marks after "Approval:".
- Each sub-agent launch entry names a scope file and a report file that exist, and the report's first line holds the identifier written in the log.
- Each report file ending in `.md` directly under `audits/` or `memos/` is named by a launch entry.
- Each finding has its 7 fields and 1 class. No finding has 2 closing entries. No BLOCKER is overruled.
- Each PASS in the ledger names a file that exists. No cell is empty.
- The delivery report has the 12 headings in order, a Summary of at most 200 words, and 3 numbered lines in the first section.
- If the report says DONE: the log shows no open finding, no criterion row holds the word UNVERIFIED, no report or capability entry says DEGRADED, a final-audit file exists and its last line holds the word "passed".
- The state files name the newest criteria entry, and each finding appears 1 time in the mind-map list.

**What it does not tell you**

- That the product works. The script never opens the product.
- That any audit, test or sub-agent ran. A person or an agent can type every file by hand, with made-up identifiers, and get 0 failures. `CHANGELOG.md` line 31 says so. The only guard is you: open the session links in the report's first section and compare.
- That the approval is yours. Any text in quotation marks passes.
- That a report says what the log says it says. The script reads only the first line of each report, and the last line of the final audit.
- That every criterion was proven. Today a criterion row filled with "N/A" or with "FAIL" passes as DONE (bug 2), and a final audit that ends "0 of 12 checks passed" passes as passed (bug 1).
- That the claims in the report are backed. 1 citation under 2 of the Summary's 4 labels is enough (bug 5).
- That no stage was skipped. "skipped" passes for any stage, in any tier, with no reason. Stage 12 is not asked for.
- That the run stayed inside its budget of sub-agent runs (bug 4).
- That no report was thrown away (bug 20), that findings were fixed by a second auditor (bug 18), or that the banned words are absent in every form (bug 11).
- That the times are real or in order.

**The other direction.** More than 0 failures does not always mean the record is wrong. Bugs 3, 10, 13 to 17, 26 and 27 fail records that follow the rules. Bug 12 can send you to the wrong line.

**One more limit.** The rules have the final auditor run this command before its own report exists. At that moment the command cannot print 0 (bug 23). A "0 failures" can only come from a later run, made by the same agent whose work is under test.

## Not examined

- I did not run the scripts on Windows or macOS, or on any Python other than 3.12.16.
- I did not open `GAUGE.svg` in a browser or check how it looks; I tested only that it is written and that 2 runs give the same bytes.
- I read `tests/test_gauge.py` and `tests/test_lint.py` by test name only, not line by line.
- I ran no mutants on `gauge.py`, and none that change a condition in place (only "this message is never recorded").
- 28 of the 41 proposed fixes are not run; each is marked. The 13 tested fixes were tested only against their trigger, the tests' fixture and the example run (which still prints its 1 failure).
- 4 table inputs are marked "(not run)".
- I did not review the skills' rules for soundness, the adapters, the manifests, `build-record/`, the role files under `templates/roles/`, or the reports inside the example run beyond the lines quoted.
- I did not test very large files or timing. One try (a line of 40,000 hyphens in `CONNECTIONS.md`) ran in 0.76 seconds.
- `lint.py`'s undefined-term test (lines 47, 155–167) is complex; I proved 1 hole (bug 36) and did not search for all.
