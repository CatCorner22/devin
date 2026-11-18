ad551496f9e64b7eb15bb7db26164132 (Devin session devin-ad551496f9e64b7eb15bb7db26164132)

## Scope received

You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: WU-1 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Framework-drift auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Compare the WORK UNIT with `FRAMEWORK.md` and `CONNECTIONS.md`: names, contracts between parts, file ownership, each edge, duplicates of things that already exist, decisions marked superseded that the work still follows, and parts of the work that the framework does not record.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: `skills/hinshitsu/example/index.html`, all lines; with `skills/hinshitsu/example/run/FRAMEWORK.md` and `skills/hinshitsu/example/run/CONNECTIONS.md`
- Commit under review: the commit named in the first paragraph
- CRITERIA, word for word from entry E-98:

- C1. `skills/hinshitsu/example/index.html` is 1 file that loads no other file, and its calculator works when the file is opened from disk in desktop Chrome. Test: open the file by its `file://` path; the browser's request log shows 1 request; C2's first test passes. Covers G8, G11.
- C2. Given a bill from 0.01 to 1,000,000.00, a whole-number tip from 0 to 100 percent and 1 to 100 people, the page shows: the bill, tip percent and people as read; the tip amount; the total; and what each person pays, as 1 line ("4 people pay 29.50 each") or 2 lines ("1 person pays 3.34" and "2 people pay 3.33 each"). Half a cent of tip rounds up. Tests, typed into the page: 100.00, 18, 4 gives tip 18.00, total 118.00, "4 people pay 29.50 each"; 0.30, 15, 1 gives tip 0.05; 10.10, 15, 1 gives tip 1.52 and total 11.62; 12.25, 18, 1 gives tip 2.21. Covers T1, G12.
- C3. The payments sum to the total, to the cent, and no 2 payments differ by more than 0.01. Test: an AUDITOR types values into the page's own fields in a browser driven by a script, reads the page's own output, and compares it with a tip, total and payments computed by the AUDITOR's own code: every bill from 0.01 to 50.00 with tips 0, 15, 18 and 20 for 1 person; every bill from 0.01 to 5.00 with 1 to 12 people at tip 18; and the spot cases, as typed, `10.00`, `0`, `3` (3.34 and 3.33); `1000000.00`, `100`, `100`; and `0.01`, `0`, `100`. Covers G3.
- C4. The page has 3 states. First open: 3 empty fields, 1 line of guidance, no error text, no result. Error: after a person types in a field or leaves it, a value that fails the rules below shows a message in plain words beside that field, and no result shows. Result: when all 3 fields are valid, the result shows and is recomputed on every change. An amount is digits, with an optional dot followed by 1 or 2 digits. A whole number is digits only. Spaces at either end are ignored. Each of these gets a message and no result: an empty field once left; letters; a comma (`12,50`, `1,000.00`); `1e3`; `10.`; `.5`; a currency sign; a negative or 0 bill; a bill above 1,000,000; 3 or more decimal places; a tip that is not a whole number from 0 to 100; people not a whole number from 1 to 100; `18.0`, `1e1`, `+4` or `4.` as tip or people. The message for a comma says to use a dot. Test: each input, in the browser. Covers G1, G2, G13.
- C5. At widths of 360, 768 and 1280 pixels nothing is cut off and nothing scrolls sideways. Every field has a visible label; the bill's label reads "Bill total, tax included". Error text and the result sit in regions that screen readers announce. The bill field carries `inputmode="decimal"` and the other 2 fields `inputmode="numeric"`. Test: screenshots at the 3 widths; reading of the markup. A real phone is not tested and is reported UNVERIFIED. Covers G4, G5.
- C6. With JavaScript off, the page shows a sentence saying that the calculator needs JavaScript. Test: load with JavaScript disabled. Covers G9.
- C7. The page stores nothing and sends nothing. The file carries the tag `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`, and each field carries `autocomplete="off"`. Test: with the page open, `fetch('https://example.com')` run in the browser is blocked; the source holds no storage call; a reload in Chrome clears every field. Firefox is not tested and is reported UNVERIFIED. Covers G6, G7.
- C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a browser, with no terminal: each names what to open, what to do, and what to see. The report states the SHA-256 of `index.html` as audited. Test: an AUDITOR who did not build the page follows the 3 checks as written. Covers V1, V2.

- Glossary: `skills/hinshitsu/GLOSSARY.md`

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

The RUN FOLDER is `skills/hinshitsu/example/run/`. Under rule 14.6 of `skills/hinshitsu-audit/SKILL.md`, also read each `RESOLUTION` entry in its `AUDIT-LOG.md` that holds the line `Record fault: yes` (E-92 to E-94) and report each correction that is itself false.

## Examined

Commit: `d125232c69fc9c85fae844443dc5053e7e6fa30d`, "example run: WU-1 swarm scopes; the copy under review". The repository was already on this machine at `/home/ubuntu/repos/devin`, checked out at that commit; I did not clone it again. I changed, committed and pushed nothing; `git status --short` printed nothing before and after.

SHA-256 of `skills/hinshitsu/example/index.html` as I audited it: `11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184`.

### A. Files read

| File | Lines |
|---|---|
| `skills/hinshitsu/example/index.html` | 1 to 167, all |
| `skills/hinshitsu/example/run/FRAMEWORK.md` | 1 to 56, all |
| `skills/hinshitsu/example/run/CONNECTIONS.md` | 1 to 42, all |
| `skills/hinshitsu/GLOSSARY.md` | 1 to 97, all |
| `skills/hinshitsu-audit/SKILL.md` | 1 to 75, all |
| `skills/hinshitsu/example/run/AUDIT-LOG.md` | 684 to 1048, all (E-64 to E-103); other lines only where `grep` printed them (26, 408) |
| `skills/hinshitsu/example/run/evidence/record-check-E-92.txt` | all |
| `skills/hinshitsu/example/run/SESSION-STATE.md` | 4, 6, 8, 10 |
| `skills/hinshitsu/example/run/review/index.html` | by `cmp` and `diff` against the page; line 74 |
| `skills/hinshitsu/example/run/prompts/WU-1-framework-drift.md` | all |
| `skills/hinshitsu/example/run/prompts/WU-1-*.md`, the other 7 | by `grep -i sha` only |
| `skills/hinshitsu/example/run/audits/plan-reaudit-E-81.md` | 5 to 40 |
| `skills/hinshitsu/example/run/COVERAGE-LEDGER.md` | 1 to 47 |

What I compared, and the result where there is no finding:

- **Names** (`FRAMEWORK.md` part 3): the page's ids, the function name `splitBill`, cents as whole numbers. No drift.
- **Contract `window.splitBill`** (part 4): signature, output shape, larger payment first, the tip formula. Met; 706,125 direct calls compared with my own code, 0 differences.
- **Text to cents** (part 4): `index.html` line 78 builds cents from digit strings with `parseInt`; no decimal arithmetic. Met.
- **Each edge of `CONNECTIONS.md`:** 16 edges in the diagram, 16 rows in the table, the same text and order. Edges that end in the delivery report cannot be tested yet (the report does not exist). The edge `index.html` → AUDITOR reports is finding 1.
- **Duplicates:** finding 4.
- **Superseded decisions:** see `Not examined`, last item. No finding.
- **Parts the framework does not record:** findings 4 and 8.

### B. Commands, with complete output

Run from `/home/ubuntu/repos/devin`. Lines cut with `cut -c` are cut in the command itself.

```
$ git log --format='%H %ci %s' | grep -n 'example run: WU-1 swarm scopes'
1:d125232c69fc9c85fae844443dc5053e7e6fa30d 2026-11-18 16:32:19 +0000 example run: WU-1 swarm scopes; the copy under review
exit: 0
```

```
$ git rev-parse HEAD; git ls-remote origin refs/heads/devin/hinshitsu-build; git log --format='%h %s' d125232..FETCH_HEAD | cut -c1-120
d125232c69fc9c85fae844443dc5053e7e6fa30d
2a9c4375e8ed5ff5c8481f2a5373ff8bc2093d10	refs/heads/devin/hinshitsu-build
2a9c437 example run: LAUNCH E-104 to E-110 (7 auditors of WU-1); the seeder's report, saved whole after the auditors sta
exit: 0
```

```
$ git status --short
exit: 0
```

```
$ wc -l skills/hinshitsu/example/index.html skills/hinshitsu/example/run/FRAMEWORK.md skills/hinshitsu/example/run/CONNECTIONS.md skills/hinshitsu/example/run/AUDIT-LOG.md skills/hinshitsu/GLOSSARY.md skills/hinshitsu-audit/SKILL.md
   167 skills/hinshitsu/example/index.html
    56 skills/hinshitsu/example/run/FRAMEWORK.md
    42 skills/hinshitsu/example/run/CONNECTIONS.md
  1048 skills/hinshitsu/example/run/AUDIT-LOG.md
    97 skills/hinshitsu/GLOSSARY.md
    75 skills/hinshitsu-audit/SKILL.md
  1485 total
exit: 0
```

```
$ sha256sum skills/hinshitsu/example/index.html
11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184  skills/hinshitsu/example/index.html
exit: 0
```

```
$ ls skills/hinshitsu/example/run skills/hinshitsu/example/run/audits skills/hinshitsu/example/run/evidence skills/hinshitsu/example/run/prompts skills/hinshitsu/example/run/review
skills/hinshitsu/example/run:
AUDIT-LOG.md
CONNECTIONS.md
COVERAGE-LEDGER.md
FRAMEWORK.md
GAUGE.svg
MINDMAP.md
SESSION-STATE.md
audits
evidence
memos
prompts
review

skills/hinshitsu/example/run/audits:
plan-reaudit-E-40.md
plan-reaudit-E-56.md
plan-reaudit-E-65.md
plan-reaudit-E-71.md
plan-reaudit-E-81.md
redcell-plan-E-23.md

skills/hinshitsu/example/run/evidence:
a3-local-script.txt
a3-page.html
a4-check.js
a4-integer-arithmetic.txt
capability-probe.md
record-check-E-92.txt

skills/hinshitsu/example/run/prompts:
WU-1-adversarial.md
WU-1-best-practices.md
WU-1-correctness.md
WU-1-forensic-5s.md
WU-1-framework-drift.md
WU-1-language.md
WU-1-recipient-experience.md
WU-1-seeder.md
capability-probe.md
plan-lens-minimal-viable-sequence.md
plan-lens-recipient-experience.md
plan-lens-structural-integrity.md
plan-lens-trust-controls.md
plan-reaudit-blockers.md
plan-reaudit-round2.md
plan-reaudit-round3.md
plan-reaudit-round4.md
plan-reaudit-round5.md
plan-red-cell.md

skills/hinshitsu/example/run/review:
index.html
exit: 0
```

```
$ ls skills/hinshitsu/example/run/DELIVERY-REPORT.md
ls: cannot access 'skills/hinshitsu/example/run/DELIVERY-REPORT.md': No such file or directory
exit: 2
```

```
$ grep -n -i 'sha' skills/hinshitsu/example/run/prompts/WU-1-*.md | cut -c1-150
skills/hinshitsu/example/run/prompts/WU-1-adversarial.md:24:- C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a brows
skills/hinshitsu/example/run/prompts/WU-1-best-practices.md:24:- C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a br
skills/hinshitsu/example/run/prompts/WU-1-correctness.md:24:- C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a brows
skills/hinshitsu/example/run/prompts/WU-1-forensic-5s.md:24:- C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a brows
skills/hinshitsu/example/run/prompts/WU-1-framework-drift.md:24:- C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a b
skills/hinshitsu/example/run/prompts/WU-1-language.md:9:Read the CRITERIA, the `VOC` entry, every word a RECIPIENT reads, and the delivery report wher
skills/hinshitsu/example/run/prompts/WU-1-language.md:24:- C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a browser,
skills/hinshitsu/example/run/prompts/WU-1-recipient-experience.md:24:- C8. The delivery report opens with 3 checks that a reader can do in 5 minutes i
skills/hinshitsu/example/run/prompts/WU-1-seeder.md:19:- C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a browser, w
exit: 0
```

```
$ diff <(sed -n 17,24p skills/hinshitsu/example/run/prompts/WU-1-framework-drift.md) <(sed -n 1001,1008p skills/hinshitsu/example/run/AUDIT-LOG.md)
exit: 0
```

```
$ cmp skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html; diff skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html
skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html differ: byte 3336, line 74
74c74
<   var m = /^(\d+)(?:\.(\d{1,2}))?$/.exec(s);
---
>   var m = /^(\d+)(?:\.(\d{0,2}))?$/.exec(s);
exit: 1
```

```
$ git show --stat --format='%h %ci %s' 1c8f220
1c8f220 2026-11-18 16:25:42 +0000 example: index.html, the bill-splitting page (WU-1), built to the frozen criteria E-98; not yet audited

 skills/hinshitsu/example/index.html | 167 ++++++++++++++++++++++++++++++++++++
 1 file changed, 167 insertions(+)
exit: 0
```

```
$ grep -n '· TIER ·' skills/hinshitsu/example/run/AUDIT-LOG.md
26:### E-3 · 2026-11-18T15:23:59Z · TIER · orchestrator
1025:### E-101 · 2026-11-18T16:24:31Z · TIER · orchestrator
exit: 0
```

```
$ grep -n 'WU-1' skills/hinshitsu/example/run/FRAMEWORK.md | cut -c1-200; sed -n '4p;6p;10p' skills/hinshitsu/example/run/SESSION-STATE.md | cut -c1-200
32:- **File identity.** Each AUDITOR scope for WU-1 states the SHA-256 of `index.html`; the delivery report states the SHA-256 as audited.
46:| WU-1 | `index.html`, the whole page | not started; the CRITERIA are frozen (E-98) |
48:Build order inside WU-1: (1) `splitBill` and the text-to-cents step; (2) form, the 3 states and validation; (3) layout at the 3 widths; (4) the no-JavaScript sentence and the policy tag.
50:Estimate of size, by part: function and conversion 40 lines; validation and states 60; markup 40; style 50; total about 190 lines, which is above the 100-line limit of TIER CORE. The TIER is measur
2. **CRITERIA:** `AUDIT-LOG.md` E-98, C1 to C8, `Status: FROZEN`, approved by the USER in E-64. Each CRITERION: not yet tested.
4. **Current STAGE and WORK UNIT:** S7; WU-1, `skills/hinshitsu/example/index.html`, being built.
8. **Next action:** build WU-1 to the contract in `FRAMEWORK.md` part 4; then ledger rows, planted defect, swarm.
exit: 0
```

```
$ grep -n -i 'review/\|seed\|prompts/\|evidence/\|Pages\|who pays the extra\|group decides' skills/hinshitsu/example/run/FRAMEWORK.md skills/hinshitsu/example/run/CONNECTIONS.md | cut -c1-200
skills/hinshitsu/example/run/FRAMEWORK.md:19:| D-8 | 1 self-contained HTML file with a policy tag that blocks network requests; published with GitHub Pages after it passes its audits | E-68 | in force
exit: 0
```

```
$ grep -n -i 'who pays the extra\|group decides\|The group picks' skills/hinshitsu/example/run/AUDIT-LOG.md | cut -c1-200
696:> - A: the page says "1 person pays 3.34; 2 people pay 3.33 each". The group picks who. Nobody overpays.
exit: 0
```

```
$ python3 /home/ubuntu/audit/conn.py
diagram edges 16 table rows 16 identical order and text: True
node ids: 13 ids with more than 1 label: []
exit: 0
```

```
$ grep -n -i 'localStorage\|sessionStorage\|indexedDB\|cookie\|caches\|sendBeacon\|XMLHttpRequest\|fetch(\|WebSocket\|src=\|href=\|url(\|@import\|import(' skills/hinshitsu/example/index.html
exit: 1
```

```
$ grep -n -o 'inputmode="[a-z]*"\|autocomplete="[a-z]*"\|role="[a-z]*"\|aria-live="[a-z]*"\|<label[^>]*>[^<]*' skills/hinshitsu/example/index.html
30:autocomplete="off"
32:<label for="bill">Bill total, tax included
33:inputmode="decimal"
33:autocomplete="off"
34:role="alert"
37:<label for="tip">Tip percent
38:inputmode="numeric"
38:autocomplete="off"
39:role="alert"
42:<label for="people">Number of people
43:inputmode="numeric"
43:autocomplete="off"
44:role="alert"
47:role="status"
47:aria-live="polite"
exit: 0
```

```
$ grep -n 'Record fault' skills/hinshitsu/example/run/AUDIT-LOG.md
943:  - `skills/hinshitsu-audit/SKILL.md`, new rule 14.6 (record faults): correct, run `scripts/hinshitsu_check.py --record`, save the output, log a `RESOLUTION` with `Record fault: yes`; the framework-drift auditor of the next WORK UNIT reads each such entry.
957:- Record fault: yes
965:- Record fault: yes
973:- Record fault: yes
exit: 0
```

```
$ cat skills/hinshitsu/example/run/evidence/record-check-E-92.txt
$ python3 scripts/hinshitsu_check.py --record skills/hinshitsu/example/run   # before the RESOLUTION entries E-92 to E-94
hinshitsu_check (record): 0 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
exit: 0
$ grep -n "F-7" skills/hinshitsu/example/run/SESSION-STATE.md skills/hinshitsu/example/run/FRAMEWORK.md
exit: 1
$ python3 scripts/hinshitsu_check.py --record skills/hinshitsu/example/run   # after E-92 to E-95 and the change to MINDMAP.md
hinshitsu_check (record): 0 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
exit: 0
exit: 0
```

```
$ python3 scripts/hinshitsu_check.py --record skills/hinshitsu/example/run
hinshitsu_check (record): 0 failure(s).
This script compares the state files with the log. It does not prove that the log is true.
exit: 0
```

```
$ git log --format='%h %s' -1 226b317 | cut -c1-160; git show 226b317 --stat --format= | cat
226b317 example run: F-15 and F-17 closed FIXED; F-16 still open; F-18 (BLOCKER), F-19, F-20 logged; CORRECTION E-87; state files synced; CARD E-88 (amend the s
 skills/hinshitsu/example/run/AUDIT-LOG.md     | 65 +++++++++++++++++++++++++++
 skills/hinshitsu/example/run/FRAMEWORK.md     |  2 +-
 skills/hinshitsu/example/run/GAUGE.svg        |  2 +-
 skills/hinshitsu/example/run/MINDMAP.md       | 10 ++++-
 skills/hinshitsu/example/run/SESSION-STATE.md | 10 ++---
 5 files changed, 80 insertions(+), 9 deletions(-)
exit: 0
```

```
$ for c in b459e4a 226b317 d125232; do echo "== $c"; git grep -n 'F-7' $c -- skills/hinshitsu/example/run/SESSION-STATE.md skills/hinshitsu/example/run/FRAMEWORK.md | cut -c1-230; done
== b459e4a
b459e4a:skills/hinshitsu/example/run/FRAMEWORK.md:46:| WU-1 | `index.html`, the whole page | not started; the USER approved the CRITERIA in E-64; waits for F-7 to close and for the freeze |
b459e4a:skills/hinshitsu/example/run/SESSION-STATE.md:4:2. **CRITERIA:** `AUDIT-LOG.md` E-55, C1 to C8, `Status: PROPOSED`. Approved by the USER in E-64. Not yet frozen: the freeze waits for F-7 to close.
== 226b317
== d125232
exit: 0
```

```
$ git show b459e4a:skills/hinshitsu/example/run/FRAMEWORK.md | grep -n '^## '; grep -n '^## ' skills/hinshitsu/example/run/FRAMEWORK.md
5:## 1. CRITERIA
9:## 2. Architecture decisions
22:## 3. Naming conventions
27:## 4. Contracts between parts
34:## 5. File ownership
42:## 6. WORK UNITS
52:## 7. Existing implementations checked
5:## 1. CRITERIA
9:## 2. Architecture decisions
22:## 3. Naming conventions
27:## 4. Contracts between parts
34:## 5. File ownership
42:## 6. WORK UNITS
52:## 7. Existing implementations checked
exit: 0
```

```
$ grep -n 'F-16\|N-2' skills/hinshitsu/example/run/audits/plan-reaudit-E-81.md | cut -c1-140
10:| F-16 | STILL REPRODUCES | E-69 (lines 749 to 755): `grep -c '^> - [A-Z]:'` prints 2. E-77 item 2 names E-69 and states the missing choi
16:- **N-2. DEFECT.** Place: E-79, choice B. Trigger: read choice B against rule 14.4. It offers the USER a way to let an open BLOCKER (F-15
exit: 0
```

```
$ sed -n '879,883p;889,893p;955,975p' skills/hinshitsu/example/run/AUDIT-LOG.md

- ID: F-18
- Class: BLOCKER
- Where: `SESSION-STATE.md` field 2; `FRAMEWORK.md` part 5, row WU-1
- Trigger: `grep -n 'F-7' SESSION-STATE.md FRAMEWORK.md` prints "the freeze waits for F-7 to close" and "waits for F-7 to close and for the freeze"; E-72 closed F-7

- ID: F-19
- Class: DEFECT
- Where: E-79, choice B
- Trigger: read choice B against rule 14.4: it offers the USER a way to let an open BLOCKER stop halting the run without a re-audit
- Finding: F-18
- Result: FIXED
- Record fault: yes
- Change: `SESSION-STATE.md` field 2 and `FRAMEWORK.md` part 5 no longer name F-7 (commit of E-88)
- Evidence: `evidence/record-check-E-92.txt`

### E-93 · 2026-11-18T16:23:44Z · RESOLUTION · orchestrator

- Finding: F-16
- Result: FIXED
- Record fault: yes
- Change: the card in E-88 offered a change to a CRITERION as choice C; E-77 item 2 states what the card in E-69 lacked
- Evidence: `evidence/record-check-E-92.txt`

### E-94 · 2026-11-18T16:23:44Z · RESOLUTION · orchestrator

- Finding: F-19
- Result: FIXED
- Record fault: yes
- Change: E-87 item 1 withdrew choice B of the card in E-79; the USER did not choose it
- Evidence: `evidence/record-check-E-92.txt`
exit: 0
```

```
$ git status --short
exit: 0
```


`conn.py` reads the Mermaid edges and the table rows of `CONNECTIONS.md` and compares them.

A first `wc` over `example/run/*` also printed "Is a directory" for `audits`, `evidence`, `memos`, `prompts` and `review`. `python3 -c 'import playwright'` printed `ModuleNotFoundError: No module named 'playwright'`; I used the Node package instead.

### C. Pages opened

Browser: the Chrome on this machine, version 156.0.8078.47, headless, driven by Playwright (Node) from my script `audit.js`. Every value was typed into the page's own fields and read from the page's own output.

1. `file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html`. Logged every request (C1). Read the first-open state (C4). Typed the 4 cases of C2 and `10.00`, `0`, `3`. Called `window.splitBill` from the page for 706,125 inputs (bills 1 to 5,000 cents and 6 large bills; tips 0, 15, 18, 20 and others; 1 to 100 people) and compared with my own code; wrapped it in a spy while typing. Typed each invalid input of C4 into each field, then left the field. Ran `fetch('https://example.com')` in the page, read storage and cookies, reloaded, went back (C7). Set the viewport to 360, 768 and 1280 pixels in each of the 3 states, measured `scrollWidth` against `clientWidth`, searched for any element wider than the viewport, and saved 9 screenshots; I looked at the 360-pixel result screenshot (long amounts wrap; nothing is cut off) (C5). Ran the sweep of C3: 26,003 cases.
2. The same file in a context with JavaScript disabled (C6); 1 screenshot.
3. The page and `run/review/index.html`, each with tip `18`, people `4`, bill `10.` (script `copy.js`).

Results by CRITERION, from the checks I ran: C1 pass; C2 pass; C3 pass (0 failures in 26,003); C4 pass; C5 pass at the 3 widths and in the markup, a real phone UNVERIFIED; C6 pass; C7 pass in Chrome, Firefox UNVERIFIED; C8 UNVERIFIED (no delivery report exists).

Complete output of `node audit.js`:

```
browser version: 156.0.8078.47

== C1 requests on load: 1 ["file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]

== C4 first open: {"hidden":true,"lines":[],"errs":["","",""],"vals":["","",""]} guide lines: 1 "Type the bill, the tip and the number of people. The split shows below."

== C2
["100.00","18","4"] => ["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]
["0.30","15","1"] => ["Bill: 0.30","Tip: 15 percent","People: 1","Tip amount: 0.05","Total: 0.35","1 person pays 0.35"]
["10.10","15","1"] => ["Bill: 10.10","Tip: 15 percent","People: 1","Tip amount: 1.52","Total: 11.62","1 person pays 11.62"]
["12.25","18","1"] => ["Bill: 12.25","Tip: 18 percent","People: 1","Tip amount: 2.21","Total: 14.46","1 person pays 14.46"]
["10.00","0","3"] => ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."]
requests after C2: 1

== contract: window.splitBill
{"type":"function","a":{"tipCents":0,"totalCents":1000,"shares":[{"count":1,"cents":334},{"count":2,"cents":333}]},"b":{"tipCents":1800,"totalCents":11800,"shares":[{"count":4,"cents":2950}]},"c":{"tipCents":100000000,"totalCents":200000000,"shares":[{"count":100,"cents":2000000}]},"d":{"tipCents":0,"totalCents":1,"shares":[{"count":1,"cents":1},{"count":99,"cents":0}]},"arity":3}
spy calls while typing 10.00/0/3: [[1000,0,3,"{\"tipCents\":0,\"totalCents\":1000,\"shares\":[{\"count\":1,\"cents\":334},{\"count\":2,\"cents\":333}]}"],[100,0,3,"{\"tipCents\":0,\"totalCents\":100,\"shares\":[{\"count\":1,\"cents\":34},{\"count\":2,\"cents\":33}]}"],[1000,0,3,"{\"tipCents\":0,\"totalCents\":1000,\"shares\":[{\"count\":1,\"cents\":334},{\"count\":2,\"cents\":333}]}"],[1000,0,3,"{\"tipCents\":0,\"totalCents\":1000,\"shares\":[{\"count\":1,\"cents\":334},{\"count\":2,\"cents\":333}]}"],[1000,0,3,"{\"tipCents\":0,\"totalCents\":1000,\"shares\":[{\"count\":1,\"cents\":334},{\"count\":2,\"cents\":333}]}"],[1000,0,3,"{\"tipCents\":0,\"totalCents\":1000,\"shares\":[{\"count\":1,\"cents\":334},{\"count\":2,\"cents\":333}]}"],[1000,0,3,"{\"tipCents\":0,\"totalCents\":1000,\"shares\":[{\"count\":1,\"cents\":334},{\"count\":2,\"cents\":333}]}"],[1000,0,3,"{\"tipCents\":0,\"totalCents\":1000,\"shares\":[{\"count\":1,\"cents\":334},{\"count\":2,\"cents\":333}]}"],[1000,0,3,"{\"tipCents\":0,\"totalCents\":1000,\"shares\":[{\"count\":1,\"cents\":334},{\"count\":2,\"cents\":333}]}"]]
page lines: ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."]
contract sweep: {"n":706125,"bad":[],"domUnchanged":true}

== C4 inputs
bill "" | err: "Enter the bill total." | result hidden: true | lines: 0
bill "abc" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill "12,50" | err: "Use a dot, not a comma. Example: 12.50" | result hidden: true | lines: 0
bill "1,000.00" | err: "Use a dot, not a comma. Example: 12.50" | result hidden: true | lines: 0
bill "1e3" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill "10." | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill ".5" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill "$5" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill "€5" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill "5$" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill "-5" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill "0" | err: "Enter an amount above 0." | result hidden: true | lines: 0
bill "0.00" | err: "Enter an amount above 0." | result hidden: true | lines: 0
bill "1000000.01" | err: "Enter 1000000.00 or less." | result hidden: true | lines: 0
bill "1000001" | err: "Enter 1000000.00 or less." | result hidden: true | lines: 0
bill "9999999999999999999999" | err: "Enter 1000000.00 or less." | result hidden: true | lines: 0
bill "1.234" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill "1.000" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
bill "１２" | err: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" | result hidden: true | lines: 0
tip "" | err: "Enter the tip percent. Enter 0 for no tip." | result hidden: true | lines: 0
tip "abc" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "18.0" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "1e1" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "+4" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "4." | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "-1" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "101" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "100.0" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "12,5" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "1 0" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
tip "0x10" | err: "Enter a whole number from 0 to 100, in digits only." | result hidden: true | lines: 0
people "" | err: "Enter the number of people." | result hidden: true | lines: 0
people "abc" | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
people "18.0" | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
people "1e1" | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
people "+4" | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
people "4." | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
people "0" | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
people "101" | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
people "-2" | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
people "2,0" | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
people "1.5" | err: "Enter a whole number from 1 to 100, in digits only." | result hidden: true | lines: 0
-- valid edge forms
[" 100.00 "," 18 "," 4 "] | errs: ["","",""] | lines: ["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]
["1000000","100","100"] | errs: ["","",""] | lines: ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"]
["1000000.00","0","1"] | errs: ["","",""] | lines: ["Bill: 1000000.00","Tip: 0 percent","People: 1","Tip amount: 0.00","Total: 1000000.00","1 person pays 1000000.00"]
["0.01","0","1"] | errs: ["","",""] | lines: ["Bill: 0.01","Tip: 0 percent","People: 1","Tip amount: 0.00","Total: 0.01","1 person pays 0.01"]
["5","0","1"] | errs: ["","",""] | lines: ["Bill: 5.00","Tip: 0 percent","People: 1","Tip amount: 0.00","Total: 5.00","1 person pays 5.00"]
["5.5","0","1"] | errs: ["","",""] | lines: ["Bill: 5.50","Tip: 0 percent","People: 1","Tip amount: 0.00","Total: 5.50","1 person pays 5.50"]
["007.50","00","001"] | errs: ["","",""] | lines: ["Bill: 7.50","Tip: 0 percent","People: 1","Tip amount: 0.00","Total: 7.50","1 person pays 7.50"]
["0000001000000.00","100","100"] | errs: ["","",""] | lines: ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"]
-- typing without leaving shows error; recompute on each change
after typing only "1" in bill (no blur): {"hidden":true,"lines":[],"errs":["","",""],"vals":["1","",""]}
after "1x": ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] true
20.00/10/2: ["Bill: 20.00","Tip: 10 percent","People: 2","Tip amount: 2.00","Total: 22.00","2 people pay 11.00 each"]
people -> 20: ["Bill: 20.00","Tip: 10 percent","People: 20","Tip amount: 2.00","Total: 22.00","20 people pay 1.10 each"]
people -> 200: ["","","Enter a whole number from 1 to 100, in digits only."] hidden true lines 0
aria-invalid people: true

== C7
fetch result: blocked: TypeError: Failed to fetch
requests issued by fetch: 0
console after fetch: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy."]
storage: localStorage 0 sessionStorage 0 cookie ""
before reload: ["100.00","18","4"]
after reload: {"hidden":true,"lines":[],"errs":["","",""],"vals":["","",""]}
after back: {"hidden":true,"lines":[],"errs":["","",""],"vals":["","",""]}

== C5
360 first {"sw":360,"cw":360,"bodySw":360,"over":[]}
360 error {"sw":360,"cw":360,"bodySw":360,"over":[]}
360 result {"sw":360,"cw":360,"bodySw":360,"over":[]}
768 first {"sw":768,"cw":768,"bodySw":768,"over":[]}
768 error {"sw":768,"cw":768,"bodySw":768,"over":[]}
768 result {"sw":768,"cw":768,"bodySw":768,"over":[]}
1280 first {"sw":1280,"cw":1280,"bodySw":1280,"over":[]}
1280 error {"sw":1280,"cw":1280,"bodySw":1280,"over":[]}
1280 result {"sw":1280,"cw":1280,"bodySw":1280,"over":[]}
console messages total: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy."]

== C6
noscript visible text: "This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page."
body text: "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page.\n\nType the bill, the tip and the number of people. The split shows below.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"

== C3 sweep
part 1 (0.01..50.00 x tips 0,15,18,20 x 1 person): cases 20000 failures 0
part 2 (0.01..5.00 x 1..12 people x tip 18): cases 6000 failures so far 0
spot 10.00 0 3 => ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."]
spot 1000000.00 100 100 => ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"]
spot 0.01 0 100 => ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."]
C3 total cases 26003 failures 0 []
total requests seen in session: 66 ["file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
```

Complete output of `node copy.js`:

```
index.html {"err":"Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","hidden":true,"lines":[]}
run/review/index.html {"err":"","hidden":false,"lines":["Bill: 10.00","Tip: 18 percent","People: 4","Tip amount: 1.80","Total: 11.80","4 people pay 2.95 each"]}
```

## Findings

9 findings: 0 BLOCKER, 6 DEFECT, 0 FRAGILITY, 3 STYLE. Every check that C1 to C7 name and that I could run passed on `index.html` (see `Examined`, part C). Findings 1 to 4 and 8 to 9 concern the WORK UNIT against the framework. Findings 5 to 7 concern the corrections E-92 to E-94.

### 1

- **Class:** DEFECT
- **Where:** `FRAMEWORK.md` line 32 (part 4, "File identity"); `CONNECTIONS.md` lines 16 and 36 (edge `index.html` → AUDITOR reports); `prompts/WU-1-*.md`, all 7 role scopes; the scope I received.
- **Trigger:** Run `grep -n -i 'sha' skills/hinshitsu/example/run/prompts/WU-1-*.md`. It prints only the C8 line of each scope and line 9 of the language scope. No scope states a SHA-256 of `index.html`. The scope I received states none. `FRAMEWORK.md` line 32 says: "Each AUDITOR scope for WU-1 states the SHA-256 of `index.html`". The edge at `CONNECTIONS.md` line 36 is "Broken when the file's SHA-256 differs from the scope's"; with no SHA-256 in the scope, nobody can test that edge.
- **Violates:** the contract in `FRAMEWORK.md` part 4 (File identity), decision D-7's companion control accepted at `AUDIT-LOG.md` line 408; the edge in `CONNECTIONS.md` line 36.
- **Proposed fix:** Add to each WU-1 scope the line `SHA-256 of index.html: 11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184` (the value `sha256sum` printed for me at commit d125232; E-102 records the same value). Re-issue the scopes, or log a `CORRECTION` entry that states the value each AUDITOR must confirm.

### 2

- **Class:** DEFECT
- **Where:** `FRAMEWORK.md` line 46 (part 6, row WU-1); `SESSION-STATE.md` lines 6, 8 and 10 (fields 4, 6 and 8).
- **Trigger:** Read `FRAMEWORK.md` line 46: WU-1 status is "not started; the CRITERIA are frozen (E-98)". Run `git show --stat 1c8f220`: the commit adds `index.html`, 167 lines. E-102 records the built file, and E-103 launches the seeder on it. `SESSION-STATE.md` field 4 says WU-1 is "being built"; field 8 says the next action is "build WU-1 … then ledger rows, planted defect, swarm"; field 6 lists no `index.html`, no `review/index.html` and no `prompts/WU-1-*.md`. `python3 scripts/hinshitsu_check.py --record skills/hinshitsu/example/run` prints "0 failure(s)" and exits 0 while these lines are out of date.
- **Violates:** rule 14.6 (an out-of-date statement in a file of the RUN FOLDER); rule 8.1 as E-90 describes it (change the state files in the same commit as the entry that changes a fact).
- **Proposed fix:** Change the WU-1 status to "built at commit 1c8f220 (E-102); audit round 1 running". Bring `SESSION-STATE.md` fields 4, 6 and 8 up to E-103. Extend `hinshitsu_check.py --record` to compare the WORK UNIT status with the latest `CHECK` and `LAUNCH` entries.

### 3

- **Class:** DEFECT
- **Where:** `FRAMEWORK.md` line 50 (part 6); `AUDIT-LOG.md` E-101 (line 1025).
- **Trigger:** `FRAMEWORK.md` line 50 says: "The TIER is measured again from `git diff --stat` when WU-1 is built." Run `grep -n '· TIER ·' AUDIT-LOG.md`: it prints E-3 and E-101 only. E-101 carries the time 16:24:31Z; commit 1c8f220, which adds the page, carries 16:25:42Z. E-101 gives the reason "about 190 lines", which is the estimate, not a measurement. `git show --stat 1c8f220` prints 167 insertions. No entry records a measurement after the build. The TIER itself does not change: 167 is above 100.
- **Violates:** the commitment in `FRAMEWORK.md` part 6; rule 0.5 as E-101 cites it.
- **Proposed fix:** Log a `TIER` (or `CORRECTION`) entry after E-102 that quotes `git show --stat 1c8f220` (167 insertions) and confirms `FULL`. Change line 50 to state the measured count.

### 4

- **Class:** DEFECT
- **Where:** `run/review/index.html`; `FRAMEWORK.md` parts 5 (lines 36 to 40) and 7 (lines 54 to 56); `CONNECTIONS.md`, the whole diagram and table.
- **Trigger:** Run `cmp skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html`. It prints "differ: byte 3336, line 74": the copy holds `\d{0,2}` where the page holds `\d{1,2}`. In Chrome, with tip `18` and people `4`, the bill `10.` typed into the copy gives a result ("4 people pay 2.95 each") and no message; the page gives a message and no result. The RUN FOLDER therefore holds a second, different copy of the DELIVERABLE that the framework does not record: `FRAMEWORK.md` part 5 has no row for `review/` (it falls under "every other file … ORCHESTRATOR", while E-103 gives the copy to the seeder, a SUB-AGENT); part 7 lists no duplicate; `CONNECTIONS.md` has no node for the copy, the seeder, the seed report, the scopes in `prompts/`, `evidence/`, or the publishing step of D-8 (`grep -n -i 'review/\|seed\|prompts/\|evidence/\|Pages'` over both files prints only the D-8 row). E-102 says the copy was "identical to the file above at this entry"; no entry at this commit records the change (E-103 says the seed report is saved later).
- **Violates:** rule 7.2 and rule 9.3 as `CONNECTIONS.md` line 3 cites them (each part and each edge is recorded); `FRAMEWORK.md` part 5 (ownership); rule 16.7 names the copy but the framework does not.
- **Proposed fix:** Add a row to part 5: "`run/review/index.html` | the seeder (rule 16.7) | the AUDITORS the seed report names; never shipped". Add a line to part 7 naming the copy as a deliberate duplicate. Add nodes and edges to `CONNECTIONS.md`: `index.html` → review copy → seed report → `CHECK` entry; scopes in `prompts/` → AUDITOR reports; AUDITOR reports → published page (D-8). Log the entry that records when and by whom the copy changed.

### 5

- **Class:** DEFECT
- **Where:** `AUDIT-LOG.md` E-92, line 958 (and E-84, line 882, which it repeats).
- **Trigger:** E-92 says "`FRAMEWORK.md` part 5 no longer name[s] F-7". Run `grep -n '^## ' FRAMEWORK.md`: part 5 is "File ownership" (line 34); the WU-1 row is in part 6, "WORK UNITS" (line 42), at line 46. The same headings stood at commit b459e4a, before the fix. The rest of E-92 is true: `git grep -n 'F-7' b459e4a -- …/SESSION-STATE.md …/FRAMEWORK.md` prints 2 lines; the same command at 226b317 (the commit that holds E-88) and at d125232 prints none; my run of the record check exits 0.
- **Violates:** rule 14.6 (a correction that is itself false, in 1 detail: the place).
- **Proposed fix:** Log a `CORRECTION` entry: "E-84 and E-92 name `FRAMEWORK.md` part 5; the row is in part 6, line 46."

### 6

- **Class:** DEFECT
- **Where:** `AUDIT-LOG.md` E-93, lines 963 to 967.
- **Trigger:** Read E-93 against rule 14.6 and F-16 (E-75). F-16 is "the card offers 2 [choices]; 'change a CRITERION' is absent", violating rule 14.5. That is a missing choice in a card that was sent and answered. It is not "a false or out-of-date statement in a file of the RUN FOLDER", which is all that rule 14.6 covers. The line `Record fault: yes` is therefore false. The last AUDITOR to test F-16 reported "STILL REPRODUCES" (`audits/plan-reaudit-E-81.md` line 10). E-93 cites no re-audit report. Its evidence, `evidence/record-check-E-92.txt`, holds 2 runs of the record check and 1 `grep` for "F-7"; none of them tests a card. The 2 statements in the `Change` line are true: E-88 choice C reads "change one of the 8 page rules", and E-77 item 2 states what E-69 lacked.
- **Violates:** rule 14.6 (scope of a record fault); rule 15.4 (`FIXED` needs the re-audit report that confirms it); the status table in `GLOSSARY.md` (a DEFECT clears by an AUDITOR exit or the USER's quoted overrule); `GLOSSARY.md`, ASSERTED (the cited EVIDENCE does not show what the claim says).
- **Proposed fix:** Log a `CORRECTION` that withdraws `Record fault: yes` from E-93. Then close F-16 in 1 of the 2 ways the status table allows: a new AUDITOR re-runs the trigger against E-88 and reports, or the USER overrules in a quoted message. Or ask the USER to widen rule 14.6 to faults in cards already answered.

### 7

- **Class:** DEFECT
- **Where:** `AUDIT-LOG.md` E-94, lines 971 to 975.
- **Trigger:** Read E-94 against rule 14.6 and F-19 (E-85). F-19 is that choice B of the card in E-79 offered the USER a way past an open BLOCKER, violating rule 14.4. That is a fault in what a card offered, not a false or out-of-date statement. The line `Record fault: yes` is therefore false. No AUDITOR re-ran the trigger after E-87; E-94 cites no re-audit report; its evidence file tests no card. The 2 statements in the `Change` line are true: E-87 item 1 withdraws choice B, and E-80 quotes the USER's reply as "A".
- **Violates:** the same rules as finding 6.
- **Proposed fix:** The same as finding 6, for F-19. Rule 14.6(b) also asks for a file `evidence/record-check-E-<n>.txt` for each such entry; E-93 and E-94 reuse the file of E-92. Either save 1 file per entry or state in the rule that 1 run may serve several entries.

### 8

- **Class:** STYLE
- **Where:** `index.html` lines 143 and 56; `FRAMEWORK.md` line 30 (part 4); C2.
- **Trigger:** (a) Type `10.00`, `0`, `3`. The result holds 8 lines; the last is "Your group decides who pays the extra cent." No CRITERION, decision or contract names this line. Its only source is the card in E-63, choice 4A ("The group picks who"), which the USER approved in E-64. (b) `FRAMEWORK.md` line 30 and the comment at `index.html` line 56 say that no code other than `splitBill` "computes a number shown in the result". The result also shows "Bill: 10.00", "Tip: 0 percent" and "People: 3" (lines 137 to 139). Those numbers come from `readAmount` (line 78: `parseInt(whole, 10) * 100 + parseInt(…)`) and `readWhole`, and `money` (lines 97 to 100) divides and takes a remainder to print each amount. `FRAMEWORK.md` line 31 calls the first of these "converts", so I read the contract as met; a spy on `window.splitBill` in the live page showed 1 call for each valid change, and every tip, total and payment shown equalled its return value. The words "a number shown in the result" still cover more than the code does.
- **Violates:** `FRAMEWORK.md` part 4, as worded (form only; no result changes).
- **Proposed fix:** In `FRAMEWORK.md` line 30 and the comment at line 56, write "computes the tip, the total or a payment". Add to part 4: "When 2 groups show, the result ends with the line 'Your group decides who pays the extra cent.' (E-63 choice 4A, E-64)."

### 9

- **Class:** STYLE
- **Where:** `index.html` lines 28 to 46.
- **Trigger:** Load the file in Chrome with JavaScript disabled. The page shows the sentence C6 requires. Below it the page still shows "Type the bill, the tip and the number of people. The split shows below." and the 3 fields, which do nothing. C6 passes as written. This is outside my role's hunt; I report it because I saw it.
- **Violates:** no CRITERION; `FRAMEWORK.md` part 6, build step (4), records only "the no-JavaScript sentence".
- **Proposed fix:** Give `#guide` and `#form` the `hidden` attribute in the markup and remove it in the script, so that only the sentence shows when JavaScript is off. Re-test C4 "first open" after the change.

## Not examined

- **C8:** UNVERIFIED. `run/DELIVERY-REPORT.md` does not exist at this commit (`ls` exits 2), so I could not follow its 3 checks or read its SHA-256.
- **A real phone (C5) and Firefox (C7):** UNVERIFIED. The CRITERIA exclude them, and this machine has neither.
- **Runs 2 times:** I ran the browser script once in full; I did not repeat each check a second time.
- **Screen readers (C5):** I read the markup (`role="alert"`, `role="status"`, `aria-live="polite"`). I did not run a screen reader; whether one announces the regions is UNVERIFIED.
- **Chrome with a window on screen:** I drove the installed Chrome (156.0.8078.47) headless by script. I did not repeat the checks by hand in the visible window.
- **The published GitHub Pages link (D-8):** not opened. E-98 says hosting is not a CRITERION and belongs to S8.
- **Commit 2a9c437,** which reached the branch after I started: I read its 1-line message only, to confirm that d125232 is still the newest commit whose message begins "example run: WU-1 swarm scopes". I did not read its files, which include the seeder's report.
- **`AUDIT-LOG.md` lines 1 to 683:** not read, except lines that `grep` printed. I read lines 684 to 1048 whole. I did not test E-1 to E-91 or E-95 to E-103 for truth beyond what the findings cite.
- **`COVERAGE-LEDGER.md`, `MINDMAP.md`, `GAUGE.svg`, `memos/`, the other files in `audits/` and `prompts/`:** not audited. I read the ledger's first 47 lines and `audits/plan-reaudit-E-81.md` lines 5 to 40 because E-92 to E-94 depend on them, and I ran `grep` over `prompts/WU-1-*.md`.
- **`scripts/hinshitsu_check.py`:** run, not read. Whether it tests what rule 14.6 needs is not assessed, beyond finding 2.
- **The rules of the skills other than sections 11 to 16 of `skills/hinshitsu-audit/SKILL.md`:** not read. Where a finding cites rule 0.5, 7.2, 8.1 or 9.3, it relies on how the RUN FOLDER quotes that rule.
- **Whether the RED CELL runs for WU-1:** `FRAMEWORK.md` line 38 says "the 8 AUDITOR roles"; `prompts/` holds 7 role scopes for WU-1. Rule 13.1 allows the eighth cell to read `N/A — no trigger`. I did not decide whether a trigger of rule 6.3 fired.
- **Superseded decisions D-1, D-2, D-3 and D-6:** compared with the page by reading. The page follows none of them where it differs from D-4, D-5 and D-8: nothing in the file says "not hosted", and the remainder goes to grouped lines, larger first. No finding.
