devin-075dd2a20b544897b290eb2752939c53

# Forensic (5S) audit — `skills/hinshitsu/example/index.html`

Commit `d125232c69fc9c85fae844443dc5053e7e6fa30d` ("example run: WU-1 swarm scopes; the copy under review"), branch `devin/hinshitsu-build`. SHA-256 of `index.html` as audited: `11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184`. I changed no file; `git status` was clean after the last test.

## Scope received

You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: WU-1 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Forensic (5S) auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Hunt for sloppiness: dead code, unused imports and variables, TODO and FIXME notes, placeholders, sample data, copy-paste drift (2 copies of 1 thing that no longer match), hardcoded values, leftover debug output, files that nothing references, and names that do not match what the thing does.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: `skills/hinshitsu/example/index.html`, all lines
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

## Examined

### Files

- `skills/hinshitsu/example/index.html`, lines 1-167 (all; 7,123 bytes), read in full with `cat -n`.
- `skills/hinshitsu/GLOSSARY.md` (97 lines): only the lines that `grep` returned for the class words, 11-96 in part (the definitions of BLOCKER, DEFECT, FRAGILITY, STYLE, VERIFIED, UNVERIFIED at lines 53-67).
- `index.html` references no other file (no `src=`, `href=`, `url(` or `@import`; see command 3).

### Commands

1. `git clone --branch devin/hinshitsu-build https://github.com/CatCorner22/devin.git devin-audit`, then `git log --format='%H %ci %s' | grep -n 'example run: WU-1 swarm scopes'`:

```
Cloning into 'devin-audit'...
1:d125232c69fc9c85fae844443dc5053e7e6fa30d 2026-11-18 16:32:19 +0000 example run: WU-1 swarm scopes; the copy under review
```

2. `git checkout -q d125232…; git status | head -3; git rev-parse HEAD; wc -lc …/index.html; sha256sum …/index.html; ls -la skills/hinshitsu/example/; cat -n …/index.html` (the `cat -n` output is the file itself, 167 lines, not repeated here):

```
HEAD detached at d125232
nothing to commit, working tree clean
d125232c69fc9c85fae844443dc5053e7e6fa30d
 167 7123 skills/hinshitsu/example/index.html
11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184  skills/hinshitsu/example/index.html
total 20
drwxr-xr-x 3 ubuntu ubuntu 4096 Nov 18 16:32 .
drwxr-xr-x 3 ubuntu ubuntu 4096 Nov 18 16:32 ..
-rw-r--r-- 1 ubuntu ubuntu 7123 Nov 18 16:32 index.html
drwxr-xr-x 7 ubuntu ubuntu 4096 Nov 18 16:32 run
```

3. Static sweep of `index.html`: last 20 bytes (`tail -c 20 | xxd`); tabs or trailing spaces (`grep -n -P '\t| +$'`); `grep -n -i -E 'TODO|FIXME|XXX|HACK|console\.|debugger|alert\(|lorem|localStorage|sessionStorage|indexedDB|cookie|fetch|XMLHttp|sendBeacon|src=|href=|url\(|@import'`; `grep -c .`; `file`. Both greps matched nothing (exit 1):

```
00000000: 7074 3e0a 3c2f 626f 6479 3e0a 3c2f 6874  pt>.</body>.</ht
00000010: 6d6c 3e0a                                ml>.
grep exit 1
156
skills/hinshitsu/example/index.html: HTML document, ASCII text
```

4. `wc -l skills/hinshitsu/GLOSSARY.md` and `grep -n -i -E 'BLOCKER|DEFECT|FRAGILITY|STYLE|UNVERIFIED|RUN FOLDER|DELIVERABLE'` on it: 97 lines; the grep printed the definitions I cite in the findings (lines 53, 55, 57, 59, 63, 67 and 18 other matching lines).

5. `node t1.js` — a Playwright script (attached) that drives the Chrome on this machine (156.0.8078.47) over its debugging port. It opened `file:///home/ubuntu/audit/devin-audit/skills/hinshitsu/example/index.html` and did this: logged every request; read the first-open state; typed each C2 case and each C4 input key by key into the page's fields and read the page's own text; reloaded; tabbed through the empty fields; pressed Enter in each field while counting `submit` events; counted DOM mutations in the result and error regions; ran `fetch('https://example.com')`; went to `about:blank` and back; took full-page screenshots at 360, 768 and 1280 pixels in 4 states (first open, result, 3 errors, a 200-digit bill); then loaded the page with JavaScript disabled, typed `100.00`, `18`, `4` and took a screenshot. Complete output:

```
browser 156.0.8078.47
C1 requests: ["GET file:///home/ubuntu/audit/devin-audit/skills/hinshitsu/example/index.html"]
C4 first open: {"bill":"","tip":"","people":"","errs":["","",""],"hidden":true,"lines":[]}
guide: Type the bill, the tip and the number of people. The split shows below. | noscript visible: 0
C2/C3 spot ["100.00","18","4"] => {"bill":"100.00","tip":"18","people":"4","errs":["","",""],"hidden":false,"lines":["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]}
C2/C3 spot ["0.30","15","1"] => {"bill":"0.30","tip":"15","people":"1","errs":["","",""],"hidden":false,"lines":["Bill: 0.30","Tip: 15 percent","People: 1","Tip amount: 0.05","Total: 0.35","1 person pays 0.35"]}
C2/C3 spot ["10.10","15","1"] => {"bill":"10.10","tip":"15","people":"1","errs":["","",""],"hidden":false,"lines":["Bill: 10.10","Tip: 15 percent","People: 1","Tip amount: 1.52","Total: 11.62","1 person pays 11.62"]}
C2/C3 spot ["12.25","18","1"] => {"bill":"12.25","tip":"18","people":"1","errs":["","",""],"hidden":false,"lines":["Bill: 12.25","Tip: 18 percent","People: 1","Tip amount: 2.21","Total: 14.46","1 person pays 14.46"]}
C2/C3 spot ["10.00","0","3"] => {"bill":"10.00","tip":"0","people":"3","errs":["","",""],"hidden":false,"lines":["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."]}
C2/C3 spot ["1000000.00","100","100"] => {"bill":"1000000.00","tip":"100","people":"100","errs":["","",""],"hidden":false,"lines":["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"]}
C2/C3 spot ["0.01","0","100"] => {"bill":"0.01","tip":"0","people":"100","errs":["","",""],"hidden":false,"lines":["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."]}
C2/C3 spot ["0.05","0","3"] => {"bill":"0.05","tip":"0","people":"3","errs":["","",""],"hidden":false,"lines":["Bill: 0.05","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 0.05","2 people pay 0.02 each","1 person pays 0.01","Your group decides who pays the extra cent."]}
C2/C3 spot ["100","18","4"] => {"bill":"100","tip":"18","people":"4","errs":["","",""],"hidden":false,"lines":["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]}
C2/C3 spot ["007.5","018","004"] => {"bill":"007.5","tip":"018","people":"004","errs":["","",""],"hidden":false,"lines":["Bill: 7.50","Tip: 18 percent","People: 4","Tip amount: 1.35","Total: 8.85","1 person pays 2.22","3 people pay 2.21 each","Your group decides who pays the extra cent."]}
C2/C3 spot ["  12.50 "," 18 "," 2 "] => {"bill":"  12.50 ","tip":" 18 ","people":" 2 ","errs":["","",""],"hidden":false,"lines":["Bill: 12.50","Tip: 18 percent","People: 2","Tip amount: 2.25","Total: 14.75","1 person pays 7.38","1 person pays 7.37","Your group decides who pays the extra cent."]}
C4 bill "abc" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "12,50" => ["Use a dot, not a comma. Example: 12.50","",""] resultHidden true lines 0
C4 bill "1,000.00" => ["Use a dot, not a comma. Example: 12.50","",""] resultHidden true lines 0
C4 bill "1e3" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "10." => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill ".5" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "$5" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "€5" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "-5" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "0" => ["Enter an amount above 0.","",""] resultHidden true lines 0
C4 bill "0.00" => ["Enter an amount above 0.","",""] resultHidden true lines 0
C4 bill "1000000.01" => ["Enter 1000000.00 or less.","",""] resultHidden true lines 0
C4 bill "1000001" => ["Enter 1000000.00 or less.","",""] resultHidden true lines 0
C4 bill "99999999" => ["Enter 1000000.00 or less.","",""] resultHidden true lines 0
C4 bill "1.234" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "1 000" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "١٢" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "12.5.0" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "+5" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill "0x10" => ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] resultHidden true lines 0
C4 bill " " => ["Enter the bill total.","",""] resultHidden true lines 0
C4 tip "18.0" => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip "1e1" => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip "+4" => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip "4." => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip "-1" => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip "101" => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip "abc" => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip "1,0" => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip "1000" => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip "$5" => ["","Enter a whole number from 0 to 100, in digits only.",""] resultHidden true
C4 tip " " => ["","Enter the tip percent. Enter 0 for no tip.",""] resultHidden true
C4 tip "0" => ["","",""] resultHidden false
C4 tip "100" => ["","",""] resultHidden false
C4 people "18.0" => ["","","Enter a whole number from 1 to 100, in digits only."] resultHidden true
C4 people "1e1" => ["","","Enter a whole number from 1 to 100, in digits only."] resultHidden true
C4 people "+4" => ["","","Enter a whole number from 1 to 100, in digits only."] resultHidden true
C4 people "4." => ["","","Enter a whole number from 1 to 100, in digits only."] resultHidden true
C4 people "-1" => ["","","Enter a whole number from 1 to 100, in digits only."] resultHidden true
C4 people "101" => ["","","Enter a whole number from 1 to 100, in digits only."] resultHidden true
C4 people "abc" => ["","","Enter a whole number from 1 to 100, in digits only."] resultHidden true
C4 people "0" => ["","","Enter a whole number from 1 to 100, in digits only."] resultHidden true
C4 people "1000" => ["","","Enter a whole number from 1 to 100, in digits only."] resultHidden true
C4 people " " => ["","","Enter the number of people."] resultHidden true
C4 people "1" => ["","",""] resultHidden false
C4 people "100" => ["","",""] resultHidden false
after reload (C7): {"bill":"","tip":"","people":"","errs":["","",""],"hidden":true,"lines":[]}
focus bill only: ["","",""]
tab out of bill: ["Enter the bill total.","",""]
tab through all: ["Enter the bill total.","Enter the tip percent. Enter 0 for no tip.","Enter the number of people."]
submit events after Enter in each field: 0 url file:///home/ubuntu/audit/devin-audit/skills/hinshitsu/example/index.html {"bill":"5","tip":"5","people":"5","errs":["","",""],"hidden":false,"lines":["Bill: 5.00","Tip: 5 percent","People: 5","Tip amount: 0.25","Total: 5.25","5 people pay 1.05 each"]}
typing "abc" into tip (bill=5, people=5 valid, no visible error change after 1st char): mutation records {"r":11,"e":3} ["","Enter a whole number from 0 to 100, in digits only.",""]
3 clicks between fields, no edit: mutation records {"r":3,"e":3}
globals: ["splitBill:function","readAmount:function","readWhole:function","money:function","payLine:function","fields:object","resultBox:object","addLine:function","update:function","MAX_BILL_CENTS:number","MAX_TIP_PERCENT:number","MAX_PEOPLE:number"]
splitBill own-prop descriptor: ["value","writable","enumerable","configurable"]
id=guide referenced: 0
C7 fetch: blocked: TypeError: Failed to fetch
C7 storage: {"ls":0,"ss":0,"cookie":""}
after back: {"bill":"","tip":"","people":"","errs":["","",""],"hidden":true,"lines":[]}
console/pageerrors: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy."]
C5 360 first {"sw":360,"cw":360,"bsw":360,"over":[]}
C5 360 result {"sw":360,"cw":360,"bsw":360,"over":[]}
C5 360 errors {"sw":360,"cw":360,"bsw":360,"over":[]}
C5 360 longinput {"sw":360,"cw":360,"bsw":360,"over":[]}
C5 768 first {"sw":768,"cw":768,"bsw":768,"over":[]}
C5 768 result {"sw":768,"cw":768,"bsw":768,"over":[]}
C5 768 errors {"sw":768,"cw":768,"bsw":768,"over":[]}
C5 768 longinput {"sw":768,"cw":768,"bsw":768,"over":[]}
C5 1280 first {"sw":1280,"cw":1280,"bsw":1280,"over":[]}
C5 1280 result {"sw":1280,"cw":1280,"bsw":1280,"over":[]}
C5 1280 errors {"sw":1280,"cw":1280,"bsw":1280,"over":[]}
C5 1280 longinput {"sw":1280,"cw":1280,"bsw":1280,"over":[]}
C6 body text: "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page.\n\nType the bill, the tip and the number of people. The split shows below.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"
C6 inputs visible/enabled: 3 true true
C6 after typing 100.00/18/4: result visible false body: "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page.\n\nType the bill, the tip and the number of people. The split shows below.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"
```

6. `node t3.js` — the C3 sweep (script attached). It set each value in the page's own fields (Playwright `fill`, which fires the page's `input` event), read the page's own result lines, and compared them with a tip, total and payment list computed by my own BigInt code. It ends with a self-test of the checker and an in-memory deletion of 1 CSS rule (finding 6). Then `git status --short` (no output: no file changed) and `sha256sum`. Complete output:

```
sweep A (bills 0.01-50.00 x tips 0,15,18,20 x 1 person): cases 20000 mismatches 0 secs 92.487
sweep B (bills 0.01-5.00 x 1-12 people x tip 18): cases 6000 mismatches 0 secs 25.431
spot 10.00 0 3 ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."]
spot 1000000.00 100 100 ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"]
spot 0.01 0 100 ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."]
spot cases 3 mismatches 0
checker self-test (expects non-empty): ["sum 9.99 != 10.00","payments differ from reference"]
result display with rule: none
result display with rule deleted in memory: none
TOTAL cases 26003 mismatches 0
```

7. I viewed 4 of the 13 screenshots myself: `w360-errors.png`, `w360-result.png`, `w1280-result.png`, `nojs.png`. Nothing was cut off in any of the 4.

### What the CRITERIA checks showed

| CRITERION | Check I ran | Observed |
|---|---|---|
| C1 | `file://` open, request log | 1 request; C2's first test passes |
| C2 | The 4 typed tests | All 4 match |
| C3 | 20,000 + 6,000 sweep cases + 3 spot cases | 26,003 cases, 0 mismatches |
| C4 | First open; 21 bad bills, 11 bad tips, 10 bad people; empty field once left | Each bad input: 1 message, no result. Comma message says "Use a dot" |
| C5 | Widths 360, 768, 1280 in 4 states; markup | No sideways scroll, no element past the edge. Labels, `inputmode`, `role="alert"` and `role="status"` present. Real phone UNVERIFIED (none here). Screen reader UNVERIFIED (none run) |
| C6 | JavaScript disabled | The sentence shows (but see finding 2) |
| C7 | `fetch` blocked by the policy; no storage call in source; reload and back both clear the fields; meta tag at line 5 matches word for word; 3 fields carry `autocomplete="off"` | Pass in Chrome. Firefox UNVERIFIED (not installed, not tested) |
| C8 | Not run | UNVERIFIED: the delivery report is not a file this scope names |

## Findings

**1. The line about "the extra cent" is false when more than 1 person pays the higher amount.**
- **Class:** BLOCKER, under part (d) of the definition ("a statement in … the DELIVERABLE is false"). It fails no CRITERION test as written.
- **Where:** `index.html` line 143.
- **Trigger:** type `0.05`, `0`, `3`. The page shows "2 people pay 0.02 each", "1 person pays 0.01", "Your group decides who pays the extra cent." 2 people pay an extra cent, so there are 2 extra cents. With `1000000.00`, `100`, `7` it shows "4 people pay 285714.29 each" and the same sentence (4 extra cents).
- **Violates:** GLOSSARY, BLOCKER (d). Also C2 names 1 or 2 pay lines and no third sentence; the CRITERIA do not ask for this line.
- **Proposed fix:** replace the text with "Your group decides who pays the higher amount.", or delete line 143.

**2. With JavaScript off, the page still shows the guidance and 3 live fields that do nothing.**
- **Class:** DEFECT. If the ORCHESTRATOR reads the guidance sentence as a false statement under BLOCKER (d), it is a BLOCKER.
- **Where:** `index.html` lines 29-46 (shown whether or not the script runs); line 28 is the only JavaScript-off handling.
- **Trigger:** load the file in Chrome with JavaScript disabled. Below "This calculator needs JavaScript…" the page shows "Type the bill, the tip and the number of people. The split shows below." and 3 enabled fields. Type `100.00`, `18`, `4`: no result and no message appear.
- **Violates:** C6 passes as written; this is leftover content in a state where it is untrue (5S), and GLOSSARY DEFECT ("gives a wrong result").
- **Proposed fix:** give `#guide` and `#form` the `hidden` attribute in the markup and have the script remove it on start; the `<noscript>` sentence then stands alone.

**3. `window.splitBill = splitBill;` is a leftover test hook that does nothing.**
- **Class:** STYLE.
- **Where:** `index.html` line 67.
- **Trigger:** read the file: nothing in it uses `window.splitBill`. In the browser, `typeof window.readAmount`, `window.money`, `window.update` and the 3 `MAX_` names are all defined without any such line, because every top-level `function` and `var` in this script is already a global. Line 67 changes nothing.
- **Violates:** the role's dead-code check (rule 13.1, Forensic role).
- **Proposed fix:** delete line 67. To stop the page from exposing 12 globals, wrap lines 50-164 in a function that runs at once; if a test needs `splitBill`, say so in a comment and keep 1 deliberate export.

**4. The `submit` handler, `novalidate` and the form-level `autocomplete="off"` are dead.**
- **Class:** STYLE.
- **Where:** `index.html` line 164; line 30 (`novalidate`, `autocomplete="off"`, and `id="form"`, which only line 164 uses).
- **Trigger:** type `5` in each field and press Enter in each: 0 `submit` events fire and the URL does not change. The form has 3 text fields and no submit button, so Chrome never submits it. No field carries `required`, `pattern`, `min`, `max` or a validating `type`, so `novalidate` switches nothing off. Each field already carries its own `autocomplete="off"` (C7).
- **Violates:** the role's dead-code check (rule 13.1, Forensic role).
- **Proposed fix:** delete line 164 and replace `<form id="form" autocomplete="off" novalidate>` with a `<div>`; or keep them and add 1 comment that says they guard against a submit button added later.

**5. The bill limit is written in 4 places; only 1 is the named constant.**
- **Class:** FRAGILITY. The change that breaks it: someone edits `MAX_BILL_CENTS`.
- **Where:** `index.html` line 52 (`100000000`), line 77 (`whole.length > 7` and the text "1000000.00"), line 80 (the same text again).
- **Trigger:** read lines 52, 77, 80 against lines 87 and 110-111. The tip and people messages are built from `min` and `max`; the bill message and the digit count are typed by hand. Set line 52 to `200000000` and a bill of `1500000` is accepted while `10000000` is refused with "Enter 1000000.00 or less." (by reading; I did not edit the file). The example text "Example: 12.50" is also typed twice (lines 73, 75).
- **Violates:** the role's hardcoded-value and copy-paste-drift checks (rule 13.1, Forensic role).
- **Proposed fix:** build 1 message, `"Enter " + money(MAX_BILL_CENTS) + " or less."`, use it on both lines, and replace `7` with `String(MAX_BILL_CENTS / 100).length`.

**6. The CSS rule `#result[hidden] { display: none; }` does nothing.**
- **Class:** STYLE.
- **Where:** `index.html` line 19.
- **Trigger:** no rule sets `display` on `#result`, so the browser's own rule for `hidden` already applies. I deleted the rule in memory in the open page (not in the file): the computed `display` of the hidden result stayed `none` (the 2 `result display` lines in the output of command 6).
- **Violates:** the role's dead-code check (rule 13.1, Forensic role).
- **Proposed fix:** delete line 19.

**7. `id="guide"` is never used.**
- **Class:** STYLE.
- **Where:** `index.html` line 29.
- **Trigger:** no CSS selector, script line, `aria-describedby`, `aria-labelledby` or `for` names `guide` (browser query returned 0; text search of the file finds the 1 occurrence).
- **Violates:** the role's unused-name check (rule 13.1, Forensic role).
- **Proposed fix:** delete the `id`, or use it (finding 2's fix would).

**8. The comment above `splitBill` claims more than is true.**
- **Class:** STYLE.
- **Where:** `index.html` line 56: "The only code that computes a number shown in the result."
- **Trigger:** read line 78: `readAmount` computes the cents shown on the "Bill:" line. Lines 98-99: `money` computes the digits of every amount shown.
- **Violates:** the role's check that a name or note matches what the thing does (rule 13.1, Forensic role).
- **Proposed fix:** "The only code that computes the tip, the total and the shares."

**9. 4 names or wrappers do not say what the thing is.**
- **Class:** STYLE.
- **Where:** `index.html` lines 109-111 and 123; line 109; line 61; lines 22, 140, 142.
- **Trigger:** read the file. (a) `read` is the parser function on each field (lines 109-111) and also the object of parsed results in `update` (line 123), so lines 127-128 read `read[name] = f.read(...)`. (b) Line 109 wraps `readAmount` in a function that only calls it; `read: readAmount` is the same. (c) `extra` (line 61) holds the count of people who pay 1 more cent. (d) The class `sep` adds space above a line; it separates nothing by itself.
- **Violates:** the role's naming check (rule 13.1, Forensic role).
- **Proposed fix:** rename the local to `parsed`; write `read: readAmount`; rename `extra` to `payOneMore`; rename `sep` to `gap-above`.

**10. Every keystroke and every blur rewrites all 3 error regions and rebuilds the result, changed or not.**
- **Class:** FRAGILITY. The change that may break it: a screen reader, which may repeat an unchanged `role="alert"` or `role="status"` text each time its node is replaced. UNVERIFIED: I ran no screen reader.
- **Where:** `index.html` lines 130 and 134-144, called from lines 152-153.
- **Trigger:** with `5`, `5`, `5` in the fields, click bill, people, bill without typing. The mutation counters show 3 records in the result region and 3 in the error regions, though no visible text changed.
- **Violates:** the role's waste check (rule 13.1, Forensic role); bears on C5 ("regions that screen readers announce").
- **Proposed fix:** write an error box only when its text differs, and rebuild the result only when the 3 parsed values differ from the last ones shown.

Checked and found clean: no TODO, FIXME, placeholder, sample data, debug output, `console` call, `debugger`, storage call, network call, unused function, unused variable, tab or trailing space. Each of the 9 CSS selectors other than line 19 matches an element. Each of the 3 constants is used.

## Not examined

- The delivery report and C8: this scope names no delivery report file, and I may read only named files. C8 is UNVERIFIED.
- The RUN FOLDER `skills/hinshitsu/example/run/`: I listed its name only; the scope does not name its files.
- The rest of the repository, including whether any other file references `index.html`: outside the scope's read limit. The "files that nothing references" check covered only what `index.html` itself references (nothing).
- `GLOSSARY.md` beyond the lines `grep` returned, and the skill's rule text (rules 6, 13, 14, 15, 17): I cite rule 13.1 from the scope, not from a reading of the rule.
- A real phone, Firefox, Safari and any screen reader: none tested. UNVERIFIED.
- Bills from 50.01 to 1,000,000.00 beyond the spot cases, and tips other than 0, 15, 18, 20 beyond the spot cases: C3 does not name them and I did not sweep them.
- 9 of the 13 screenshots: taken, measured by script for overflow, not viewed by eye.
