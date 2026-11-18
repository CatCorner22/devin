session ID: devin-352a89a6d8da419ebea30c0cc597bb21

# Language auditor report — WU-1, `skills/hinshitsu/example/index.html`

## Scope received

> You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: WU-1 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.
>
> # Role scope — Language auditor
>
> You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.
>
> ## Your job
>
> Read the CRITERIA, the `VOC` entry, every word a RECIPIENT reads, and the delivery report where it exists. Apply the categories of ambiguity in Kenneth A. Adams, *A Manual of Style for Contract Drafting*: lexical ambiguity; syntactic ambiguity (modifiers, "and" and "or", plurals); vagueness; undue generality; inconsistency (1 thing with 2 names, 1 name for 2 things); conflict between 2 statements; a rule with no actor; a rule that a third party cannot test. Report every banned word: "should", "shall", "appropriate", "reasonable", "proper", "adequate", "ensure", "try to", "as needed", "if possible", "generally", "typically".
>
> ## Filled in by the ORCHESTRATOR
>
> - DELIVERABLE and files to examine: `skills/hinshitsu/example/index.html`, all lines (every word a RECIPIENT reads); the `VOC` entry E-25 and the `CRITERIA` entry E-98 in `skills/hinshitsu/example/run/AUDIT-LOG.md`. No delivery report exists yet
> - Commit under review: the commit named in the first paragraph
> - CRITERIA, word for word from entry E-98:
>
> - C1. `skills/hinshitsu/example/index.html` is 1 file that loads no other file, and its calculator works when the file is opened from disk in desktop Chrome. Test: open the file by its `file://` path; the browser's request log shows 1 request; C2's first test passes. Covers G8, G11.
> - C2. Given a bill from 0.01 to 1,000,000.00, a whole-number tip from 0 to 100 percent and 1 to 100 people, the page shows: the bill, tip percent and people as read; the tip amount; the total; and what each person pays, as 1 line ("4 people pay 29.50 each") or 2 lines ("1 person pays 3.34" and "2 people pay 3.33 each"). Half a cent of tip rounds up. Tests, typed into the page: 100.00, 18, 4 gives tip 18.00, total 118.00, "4 people pay 29.50 each"; 0.30, 15, 1 gives tip 0.05; 10.10, 15, 1 gives tip 1.52 and total 11.62; 12.25, 18, 1 gives tip 2.21. Covers T1, G12.
> - C3. The payments sum to the total, to the cent, and no 2 payments differ by more than 0.01. Test: an AUDITOR types values into the page's own fields in a browser driven by a script, reads the page's own output, and compares it with a tip, total and payments computed by the AUDITOR's own code: every bill from 0.01 to 50.00 with tips 0, 15, 18 and 20 for 1 person; every bill from 0.01 to 5.00 with 1 to 12 people at tip 18; and the spot cases, as typed, `10.00`, `0`, `3` (3.34 and 3.33); `1000000.00`, `100`, `100`; and `0.01`, `0`, `100`. Covers G3.
> - C4. The page has 3 states. First open: 3 empty fields, 1 line of guidance, no error text, no result. Error: after a person types in a field or leaves it, a value that fails the rules below shows a message in plain words beside that field, and no result shows. Result: when all 3 fields are valid, the result shows and is recomputed on every change. An amount is digits, with an optional dot followed by 1 or 2 digits. A whole number is digits only. Spaces at either end are ignored. Each of these gets a message and no result: an empty field once left; letters; a comma (`12,50`, `1,000.00`); `1e3`; `10.`; `.5`; a currency sign; a negative or 0 bill; a bill above 1,000,000; 3 or more decimal places; a tip that is not a whole number from 0 to 100; people not a whole number from 1 to 100; `18.0`, `1e1`, `+4` or `4.` as tip or people. The message for a comma says to use a dot. Test: each input, in the browser. Covers G1, G2, G13.
> - C5. At widths of 360, 768 and 1280 pixels nothing is cut off and nothing scrolls sideways. Every field has a visible label; the bill's label reads "Bill total, tax included". Error text and the result sit in regions that screen readers announce. The bill field carries `inputmode="decimal"` and the other 2 fields `inputmode="numeric"`. Test: screenshots at the 3 widths; reading of the markup. A real phone is not tested and is reported UNVERIFIED. Covers G4, G5.
> - C6. With JavaScript off, the page shows a sentence saying that the calculator needs JavaScript. Test: load with JavaScript disabled. Covers G9.
> - C7. The page stores nothing and sends nothing. The file carries the tag `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`, and each field carries `autocomplete="off"`. Test: with the page open, `fetch('https://example.com')` run in the browser is blocked; the source holds no storage call; a reload in Chrome clears every field. Firefox is not tested and is reported UNVERIFIED. Covers G6, G7.
> - C8. The delivery report opens with 3 checks that a reader can do in 5 minutes in a browser, with no terminal: each names what to open, what to do, and what to see. The report states the SHA-256 of `index.html` as audited. Test: an AUDITOR who did not build the page follows the 3 checks as written. Covers V1, V2.
>
> - Glossary: `skills/hinshitsu/GLOSSARY.md`
>
> ## Report
>
> Write 1 report, in Markdown, in this order:
>
> 1. First line: the identifier that your runtime gave this run (session ID, task ID or agent ID). If you cannot read it, write `identifier: not visible to me`.
> 2. `## Scope received` — this scope, word for word.
> 3. `## Examined` — each file with line ranges, each command you ran with its complete output, each page you opened with what you did.
> 4. `## Findings` — number them 1, 2, 3. For each: **Class** (BLOCKER, DEFECT, FRAGILITY or STYLE, as `GLOSSARY.md` defines them); **Where** (file and line, or artifact and heading); **Trigger** (the exact steps, input or command that reproduce it, and what appears); **Violates** (the CRITERION ID or the rule number); **Proposed fix**.
> 5. `## Not examined` — what you did not examine, and why.
>
> ## Limits
>
> - You did not build this work. Do not change the DELIVERABLE or any file in the RUN FOLDER; propose each fix in your report.
> - Read only the files this scope names, and files those files reference.
> - Report what you observed. Do not report a check that you did not run. A check that you cannot run is UNVERIFIED, with the reason.
> - If you find nothing, say so, and list under `Examined` what you checked. Do not invent a finding and do not withhold one.

## Examined

**Commit.** `d125232c69fc9c85fae844443dc5053e7e6fa30d`, "example run: WU-1 swarm scopes; the copy under review", 2026-11-18 16:32:19 +0000. It is the only commit on `origin/devin/hinshitsu-build` whose message begins "example run: WU-1 swarm scopes", and it is the branch head. I used the copy of the repository already on my machine at `/home/ubuntu/repos/devin`, with full history; I did not make a second clone. `git status --porcelain` printed nothing before and after my work. My script, its output and my screenshots are in `/home/ubuntu/audit-lang/`, outside the repository.

**Files read**

| File | Lines | What I read it for |
|---|---|---|
| `skills/hinshitsu/example/index.html` | 1–167 (all) | every word a RECIPIENT reads; SHA-256 `11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184` |
| `skills/hinshitsu/example/run/AUDIT-LOG.md` | 230–258 | `VOC` entry E-25 |
| `skills/hinshitsu/example/run/AUDIT-LOG.md` | 997–1011 | `CRITERIA` entry E-98 |
| `skills/hinshitsu/example/run/AUDIT-LOG.md` | 599 onward, the 9 lines `C1.` to `Not covered` of E-55 | E-98 says its text is E-55 word for word |
| `skills/hinshitsu/example/run/AUDIT-LOG.md` | 85–97, 585–587 (table rows G1–G13, cut at 330 characters) | the "Covers G…" references in E-98 |
| `skills/hinshitsu/example/run/AUDIT-LOG.md` | 225–228, 259–262, 990–996, 1012–1025 | read in passing; they sit beside E-25 and E-98 in the ranges I printed |
| `skills/hinshitsu/GLOSSARY.md` | 1–97 (all) | finding classes and defined terms |

**Commands and output**

The 3 commands that printed whole files (`cat -n index.html`, `cat -n GLOSSARY.md`, `sed`/`awk` of the `AUDIT-LOG.md` ranges above) printed those lines of the files at the commit, unchanged; I do not repeat them here.

```
$ git log --format='%H %ci %s' --grep='^example run: WU-1 swarm scopes' origin/devin/hinshitsu-build
d125232c69fc9c85fae844443dc5053e7e6fa30d 2026-11-18 16:32:19 +0000 example run: WU-1 swarm scopes; the copy under review
$ git rev-parse HEAD
d125232c69fc9c85fae844443dc5053e7e6fa30d
$ git status --porcelain
$ wc -l skills/hinshitsu/example/index.html skills/hinshitsu/example/run/AUDIT-LOG.md skills/hinshitsu/GLOSSARY.md
  167 skills/hinshitsu/example/index.html
 1048 skills/hinshitsu/example/run/AUDIT-LOG.md
   97 skills/hinshitsu/GLOSSARY.md
 1312 total
$ sha256sum skills/hinshitsu/example/index.html
11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184  skills/hinshitsu/example/index.html
```

Banned words (`B='should|shall|appropriate|reasonabl|proper|adequate|ensure|try to|as needed|if possible|generally|typically'`, `grep -niE`; exit 1 means no match):

```
--- banned: index.html
exit 1
--- banned: E-25 (lines 230-258)
exit 1
--- banned: E-98 (lines 997-1011)
exit 1
```

Storage and network calls in the source (`grep -niE 'localStorage|sessionStorage|indexedDB|cookie|caches|sendBeacon|XMLHttpRequest|fetch\(|WebSocket|EventSource|<img|<link|<iframe|src=|href=|url\(|@import|navigator\.' index.html`):

```
--- storage calls
exit 1
```

E-55 against E-98 (the 9 lines `C1.` to `Not covered` of each, `diff`):

```
599:### E-55 · 2026-11-18T15:45:12Z · CRITERIA · orchestrator
   9 /tmp/e55.txt
   9 /tmp/e98.txt
  18 total
IDENTICAL
```

Words in capitals in E-25 and E-98 (`grep -oE '\b[A-Z][A-Z-]{2,}\b' | sort | uniq -c`):

```
      3 AUDITOR
      3 BRIEF
      1 CORRECTION
      1 CRITERIA
      3 CRITERION
      3 EST
      1 EXAMPLE
      1 FROZEN
      1 HTML
      2 ORCHESTRATOR
      1 PROPOSED
      1 RECIPIENT
      1 RECIPIENTS
      1 SHA-
      2 UNVERIFIED
      9 USER
      1 VOC
      2 VOC-ASSUMED
```

**Page opened.** `file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html` in the Chrome on my machine (Chrome 156.0.8078.47), driven by my script `run.js` through Playwright. What the script did:

- C1: opened the page and logged every request.
- C2, C4, C7 and the 3 spot cases of C3: clicked each field, cleared it and typed the value with key presses, then pressed Tab.
- C3 sweeps: 26,000 cases. For speed the script set each field's value and fired the field's `input` event; it did not send key presses. It read the page's own result lines and compared them with my own arithmetic (BigInt; tip = (bill × percent × 2 + 100) ÷ 200, rounded down), and summed the payments that the page printed.
- C5: set widths 360, 768 and 1280; took a full-page screenshot of each of the 3 states at each width; compared `scrollWidth` with `clientWidth`. I looked at 5 of the 10 screenshots (`360-error`, `360-result`, `360-nojs`, `768-result`, `1280-error`); the others I only measured.
- C6: opened the page in a second browser context with JavaScript disabled.
- C7: ran `fetch('https://example.com')` in the page; typed 3 values and reloaded.

Complete output of `node run.js`:

```
Chrome 156.0.8078.47

== C1 ==
requests: 1 ["file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
console: []

== C4 first open ==
{"vals":["","",""],"errs":["","",""],"hidden":true,"lines":[],"guide":"Type the bill, the tip and the number of people. The split shows below.","sw":1280,"cw":1280}
visible text: "Split the bill\n\nType the bill, the tip and the number of people. The split shows below.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"

== C2 ==
["100.00","18","4"] -> ["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"] errs ["","",""] hidden false
["0.30","15","1"] -> ["Bill: 0.30","Tip: 15 percent","People: 1","Tip amount: 0.05","Total: 0.35","1 person pays 0.35"] errs ["","",""] hidden false
["10.10","15","1"] -> ["Bill: 10.10","Tip: 15 percent","People: 1","Tip amount: 1.52","Total: 11.62","1 person pays 11.62"] errs ["","",""] hidden false
["12.25","18","1"] -> ["Bill: 12.25","Tip: 18 percent","People: 1","Tip amount: 2.21","Total: 14.46","1 person pays 14.46"] errs ["","",""] hidden false
["10.00","0","3"] -> ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."] errs ["","",""] hidden false
["1000000.00","100","100"] -> ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"] errs ["","",""] hidden false
["0.01","0","100"] -> ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."] errs ["","",""] hidden false
["0100.5","007","02"] -> ["Bill: 100.50","Tip: 7 percent","People: 2","Tip amount: 7.04","Total: 107.54","2 people pay 53.77 each"] errs ["","",""] hidden false
[" 12.5 "," 18 "," 2 "] -> ["Bill: 12.50","Tip: 18 percent","People: 2","Tip amount: 2.25","Total: 14.75","1 person pays 7.38","1 person pays 7.37","Your group decides who pays the extra cent."] errs ["","",""] hidden false

== C4 inputs (other 2 fields valid: bill 10.00, tip 18, people 2) ==
bill "" -> errs ["Enter the bill total.","",""] result hidden true lines 0
bill "abc" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "12,50" -> errs ["Use a dot, not a comma. Example: 12.50","",""] result hidden true lines 0
bill "1,000.00" -> errs ["Use a dot, not a comma. Example: 12.50","",""] result hidden true lines 0
bill "1e3" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "10." -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill ".5" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "$10" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "€10" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "10$" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "-5" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "0" -> errs ["Enter an amount above 0.","",""] result hidden true lines 0
bill "0.00" -> errs ["Enter an amount above 0.","",""] result hidden true lines 0
bill "1000000.01" -> errs ["Enter 1000000.00 or less.","",""] result hidden true lines 0
bill "1000001" -> errs ["Enter 1000000.00 or less.","",""] result hidden true lines 0
bill "99999999" -> errs ["Enter 1000000.00 or less.","",""] result hidden true lines 0
bill "1.234" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "10.000" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "1 0" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "+5" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
bill "١٢" -> errs ["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""] result hidden true lines 0
tip "" -> errs ["","Enter the tip percent. Enter 0 for no tip.",""] result hidden true lines 0
tip "abc" -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
tip "18.0" -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
tip "1e1" -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
tip "+4" -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
tip "4." -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
tip "101" -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
tip "-1" -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
tip "18,5" -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
tip "18%" -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
tip "1000" -> errs ["","Enter a whole number from 0 to 100, in digits only.",""] result hidden true lines 0
people "" -> errs ["","","Enter the number of people."] result hidden true lines 0
people "abc" -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
people "18.0" -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
people "1e1" -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
people "+4" -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
people "4." -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
people "0" -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
people "101" -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
people "-1" -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
people "2,5" -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
people "00" -> errs ["","","Enter a whole number from 1 to 100, in digits only."] result hidden true lines 0
-- valid boundary values --
["1000000","0","1"] -> ["Bill: 1000000.00","Tip: 0 percent","People: 1","Tip amount: 0.00","Total: 1000000.00","1 person pays 1000000.00"] ["","",""]
["1000000.00","100","100"] -> ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"] ["","",""]
["0.01","0","1"] -> ["Bill: 0.01","Tip: 0 percent","People: 1","Tip amount: 0.00","Total: 0.01","1 person pays 0.01"] ["","",""]
["0.1","100","100"] -> ["Bill: 0.10","Tip: 100 percent","People: 100","Tip amount: 0.10","Total: 0.20","20 people pay 0.01 each","80 people pay 0.00 each","Your group decides who pays the extra cent."] ["","",""]
["5","0","1"] -> ["Bill: 5.00","Tip: 0 percent","People: 1","Tip amount: 0.00","Total: 5.00","1 person pays 5.00"] ["","",""]
-- timing of messages --
focus bill, nothing typed: ["","",""]
left bill empty (Tab): ["Enter the bill total.","",""]
typed 1 in tip: ["Enter the bill total.","",""]
deleted it, focus still in tip: ["Enter the bill total.","Enter the tip percent. Enter 0 for no tip.",""]
typed "1" in bill only: {"vals":["1","",""],"errs":["","",""],"hidden":true,"lines":[],"guide":"Type the bill, the tip and the number of people. The split shows below.","sw":1280,"cw":1280}
all valid without leaving people: ["Bill: 12.50","Tip: 18 percent","People: 3","Tip amount: 2.25","Total: 14.75","2 people pay 4.92 each","1 person pays 4.91","Your group decides who pays the extra cent."]
people now 3x: {"vals":["12.5","18","3x"],"errs":["","","Enter a whole number from 1 to 100, in digits only."],"hidden":true,"lines":[],"guide":"Type the bill, the tip and the number of people. The split shows below.","sw":1280,"cw":1280}
people back to 3: ["Bill: 12.50","Tip: 18 percent","People: 3","Tip amount: 2.25","Total: 14.75","2 people pay 4.92 each","1 person pays 4.91","Your group decides who pays the extra cent."]

== C7 ==
fetch result: blocked: TypeError: Failed to fetch
console after fetch: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy."]
requests so far: ["file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
before reload: ["100.00","18","4"]
after reload: ["","",""] errs ["","",""] hidden true
storage: {"ls":0,"ss":0,"cookie":""}

== C5 ==
360 first: scrollWidth 360 clientWidth 360
360 error: scrollWidth 360 clientWidth 360
360 result: scrollWidth 360 clientWidth 360 ["Bill: 1000000.00","Tip: 100 percent","People: 3","Tip amount: 1000000.00","Total: 2000000.00","2 people pay 666666.67 each","1 person pays 666666.66","Your group decides who pays the extra cent."]
360 elements wider than their box: []
768 first: scrollWidth 768 clientWidth 768
768 error: scrollWidth 768 clientWidth 768
768 result: scrollWidth 768 clientWidth 768 ["Bill: 1000000.00","Tip: 100 percent","People: 3","Tip amount: 1000000.00","Total: 2000000.00","2 people pay 666666.67 each","1 person pays 666666.66","Your group decides who pays the extra cent."]
768 elements wider than their box: []
1280 first: scrollWidth 1280 clientWidth 1280
1280 error: scrollWidth 1280 clientWidth 1280
1280 result: scrollWidth 1280 clientWidth 1280 ["Bill: 1000000.00","Tip: 100 percent","People: 3","Tip amount: 1000000.00","Total: 2000000.00","2 people pay 666666.67 each","1 person pays 666666.66","Your group decides who pays the extra cent."]
1280 elements wider than their box: []
markup: {"inputs":[{"id":"bill","inputmode":"decimal","autocomplete":"off","label":"Bill total, tax included","labelVisible":true},{"id":"tip","inputmode":"numeric","autocomplete":"off","label":"Tip percent","labelVisible":true},{"id":"people","inputmode":"numeric","autocomplete":"off","label":"Number of people","labelVisible":true}],"regions":[{"id":"bill-error","role":"alert","live":null},{"id":"tip-error","role":"alert","live":null},{"id":"people-error","role":"alert","live":null},{"id":"result","role":"status","live":"polite"}]}

== C3 sweeps ==
sweep A (0.01..50.00 x tips 0,15,18,20 x 1 person): cases 20000 failures 0
sweep B (0.01..5.00 x 1..12 people x tip 18): cases 6000 failures total 0
note: sweeps set each field value and fire the input event from a script; spot cases below use key presses
spot ["10.00","0","3"] page ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."] | own 0.00 10.00 ["1 person pays 3.34","2 people pay 3.33 each"]
spot ["1000000.00","100","100"] page ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"] | own 1000000.00 2000000.00 ["100 people pay 20000.00 each"]
spot ["0.01","0","100"] page ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."] | own 0.00 0.01 ["1 person pays 0.01","99 people pay 0.00 each"]
first failures: []

== C6 ==
visible text with JavaScript off: "Split the bill\n\nThis calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page.\n\nType the bill, the tip and the number of people. The split shows below.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"
```

**CRITERIA checks, as I observed them**

| CRITERION | Observed | Note |
|---|---|---|
| C1 | 1 request; C2's first test gave the expected 3 values | — |
| C2 | all 4 tests gave the stated values | see findings 9 and 10 on the wording |
| C3 | 20,000 + 6,000 sweep cases, 0 failures; 3 spot cases match | sweeps used a scripted `input` event, not key presses |
| C4 | first open, every listed input, and recompute on change behaved as stated, if "the message for a comma" means the bill | see findings 6, 7 and 8 |
| C5 | no sideways scroll at 3 widths in 3 states; 3 visible labels; `inputmode` and `role` values as stated | a real phone: UNVERIFIED, I have none. A screen reader: UNVERIFIED, I ran none |
| C6 | the sentence shows | see finding 2 |
| C7 | fetch blocked by the policy; no storage call in the source; reload cleared 3 fields; meta tag and `autocomplete="off"` present | Firefox: UNVERIFIED, not on my machine and C7 excludes it |
| C8 | UNVERIFIED | no delivery report exists |

These are observations, not VERIFIED checks in the glossary's sense: my EVIDENCE is not in the RUN FOLDER, which I must not change.

## Findings

Banned words: none in `index.html`, E-25 or E-98.

How I chose each class. BLOCKER: the glossary's part (d), "a statement … in the DELIVERABLE is false". DEFECT: wording that can change what a RECIPIENT types, or a CRITERION that passes under 1 reading and fails under another. STYLE: wording that changes no result and no pass or fail. Findings 1 to 5 are about the page; 6 to 13 about E-98; 14 and 15 about E-25.

### 1. "the extra cent" is false when more than 1 cent is left over

- **Class:** BLOCKER (glossary, part d)
- **Where:** `skills/hinshitsu/example/index.html` line 143
- **Trigger:** type `0.1`, `100`, `100`. The page shows "20 people pay 0.01 each", "80 people pay 0.00 each", "Your group decides who pays the extra cent." There are 20 extra cents and 20 payers. Also `12.5`, `18`, `3`: "2 people pay 4.92 each", "1 person pays 4.91", then the same sentence; 2 people pay an extra cent.
- **Violates:** glossary BLOCKER (d); the role scope's category "syntactic ambiguity (plurals)". C2 does not name this sentence at all (finding 10).
- **Proposed fix:** make the sentence follow the count of the first share. When `out.shares[0].count === 1`: "Your group decides who pays the extra cent." Otherwise: "Your group decides which N people pay 1 cent more.", with N = `out.shares[0].count`.

### 2. With JavaScript off, the page still says "The split shows below"

- **Class:** BLOCKER (glossary, part d)
- **Where:** `index.html` lines 28 to 46
- **Trigger:** load the page with JavaScript disabled. Visible text: "This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page." and directly under it "Type the bill, the tip and the number of people. The split shows below.", followed by the 3 fields. A person can type in all 3 fields and nothing shows. The 2 sentences conflict, and the second is false in this state. C6 itself passes.
- **Violates:** glossary BLOCKER (d); the role scope's category "conflict between 2 statements".
- **Proposed fix:** give `<p id="guide">` and `<form id="form">` the `hidden` attribute in the markup, and remove it in the first lines of the script. C4's first-open state is unchanged when JavaScript is on.

### 3. The guide says "the tip" for what the field calls "Tip percent" and the result calls both "Tip" and "Tip amount"

- **Class:** DEFECT
- **Where:** `index.html` line 29 (guide), line 37 (label), lines 138 and 140 (result)
- **Trigger:** read the guide: "Type the bill, the tip and the number of people." A person who takes "the tip" as an amount and types `5` for a `50.00` bill gets "Tip: 5 percent", "Tip amount: 2.50", with no message. In the result, "Tip:" is a percent and "Tip amount:" is money: 1 name for 2 things.
- **Violates:** the role scope's category "inconsistency (1 name for 2 things)"; C4's "plain words".
- **Proposed fix:** line 29: "Type the bill, the tip percent and the number of people. The result shows below." Line 138: `"Tip percent: " + read.tip.value`.

### 4. The bill's error message does not match the rule it enforces

- **Class:** DEFECT
- **Where:** `index.html` line 75
- **Trigger:** type `10.` in the bill and press Tab. Message: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50". `10.` is above 0, in digits, and has at most 2 digits after the dot (it has 0), so it meets every word of the message and is still refused. The same message answers `.5`, which fails for a reason the message does not name (no digit before the dot).
- **Violates:** C4, "a message in plain words"; the role scope's category "conflict between 2 statements" (the message and the rule in C4, "a dot followed by 1 or 2 digits").
- **Proposed fix:** "Enter an amount above 0, in digits. A dot needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50"

### 5. "Bill total" and "Total" are 2 amounts with nearly 1 name; "the split" has no referent on the page

- **Class:** STYLE
- **Where:** `index.html` lines 7, 27, 29, 32, 72, 137, 139, 141
- **Trigger:** type `100.00`, `18`, `4`. The label reads "Bill total, tax included" (100.00) and the result reads "Total: 118.00". The same amount is "Bill total" in the label and the error, and "Bill:" in the result. "Number of people" in the label is "People:" in the result. The guide promises "The split"; no line in the result carries that word.
- **Violates:** the role scope's category "inconsistency (1 thing with 2 names, 1 name for 2 things)". C5 fixes the label's words, so the fix is in the result.
- **Proposed fix:** line 141: `"Total with tip: "`. Line 137: `"Bill total: "`. Line 139: `"Number of people: "`. Guide: "The result shows below." (as in finding 3).

### 6. C4: "The message for a comma says to use a dot" names no field

- **Class:** DEFECT
- **Where:** `AUDIT-LOG.md`, E-98, C4, second-to-last sentence
- **Trigger:** type `18,5` as the tip (bill `10.00`, people `2`). Message: "Enter a whole number from 0 to 100, in digits only." It holds no word "dot". If "a comma" means a comma in any field, the page fails C4; if it means the bill, the page passes. The page's choice is the sound one: a dot in the tip is also refused.
- **Violates:** the role scope's categories "undue generality" and "a rule that a third party cannot test".
- **Proposed fix:** a `CRITERIA-CHANGE` for C4: "The message for a comma in the bill says to use a dot."

### 7. C4: "The page has 3 states" — I observed a 4th

- **Class:** DEFECT
- **Where:** E-98, C4, sentences 1 to 4
- **Trigger:** reload, type `1` in the bill only. The page shows 1 filled field, 2 empty fields, no error text and no result. That is not "First open" (3 empty fields), not "Error" and not "Result".
- **Violates:** the role scope's category "conflict between 2 statements" (the count "3" and the 3 definitions, which leave a case out).
- **Proposed fix:** `CRITERIA-CHANGE`: "The page has 4 states." and add: "Incomplete: 1 or more fields are empty and untouched, and no touched field fails a rule; no error text and no result show."

### 8. C4: 2 sentences disagree on when an empty field gets its message

- **Class:** DEFECT
- **Where:** E-98, C4, "after a person types in a field or leaves it, a value that fails the rules below shows a message" and "an empty field once left"
- **Trigger:** reload, click the tip, type `1`, press Backspace; do not leave the field. The message "Enter the tip percent. Enter 0 for no tip." shows. The first sentence allows that; "once left" says the message waits until the person leaves. Also, "the rules below" do not say that an empty value fails; only the list does.
- **Violates:** the role scope's category "conflict between 2 statements".
- **Proposed fix:** `CRITERIA-CHANGE`: replace "an empty field once left" with "an empty field that the person has typed in or left".

### 9. C2: "as read" has 2 meanings

- **Class:** DEFECT
- **Where:** E-98, C2, "the bill, tip percent and people as read"
- **Trigger:** type `0100.5`, `007`, `02`. The page shows "Bill: 100.50", "Tip: 7 percent", "People: 2". If "as read" means "as the person typed them", the page fails C2; if it means "as the page parsed them", it passes.
- **Violates:** the role scope's category "lexical ambiguity".
- **Proposed fix:** `CRITERIA-CHANGE`: "the bill with 2 decimal places, the tip percent and the number of people, each as a number without leading zeros".

### 10. C2 lists what the page shows and is silent on the rest

- **Class:** STYLE
- **Where:** E-98, C2
- **Trigger:** type `10.00`, `0`, `3`. The page shows a line C2 does not list: "Your group decides who pays the extra cent." C2 also does not say which of the 2 lines comes first (the page puts the larger payment first), nor what the 2 lines read when each holds 1 person (`12.5`, `18`, `2` gives "1 person pays 7.38" and "1 person pays 7.37").
- **Violates:** the role scope's category "undue generality".
- **Proposed fix:** add to C2: "The larger payment comes first. Under 2 lines, 1 sentence says that the group decides who pays more. The result shows no other text."

### 11. C2: "a whole-number tip from 0 to 100 percent and 1 to 100 people"

- **Class:** STYLE
- **Where:** E-98, C2, first sentence
- **Trigger:** reading. "whole-number" can modify "tip" alone or "tip … and … people". C4 settles it ("people not a whole number from 1 to 100"), so no result changes. The same sentence writes "1,000,000.00" with commas, the form C4 makes the page refuse.
- **Violates:** the role scope's category "syntactic ambiguity (modifiers)".
- **Proposed fix:** "a bill from 0.01 to 1000000.00, a tip that is a whole number from 0 to 100 percent, and a number of people that is a whole number from 1 to 100".

### 12. Terms in E-98 that a third party cannot test as written

- **Class:** STYLE
- **Where:** E-98, C1, C3, C4, C5, C7
- **Trigger:** reading, and the screenshots.
  - C4 "beside that field": each message sits below its field (`360-error.png`, `1280-error.png`). "Beside" also means "at the side of".
  - C4 "in plain words": no test names what plain is.
  - C5 "nothing is cut off": I measured width only; the criterion names no measure.
  - C5 "regions that screen readers announce": the test is "reading of the markup", and names no attribute. I found `role="alert"` on the 3 error paragraphs and `role="status"` with `aria-live="polite"` on the result.
  - C7 "storage call": not defined. I searched for `localStorage`, `sessionStorage`, `indexedDB`, `cookie` and `caches`.
  - C3 "every bill from 0.01 to 50.00": the step is not stated. I used 0.01.
  - C1 "its calculator works": the test gives it meaning; the words alone do not.
- **Violates:** the role scope's categories "vagueness" and "a rule that a third party cannot test".
- **Proposed fix:** C4: "below that field", and drop "in plain words" or replace it with "names what to type". C5: "no element is wider than the window" and "the error paragraphs carry `role="alert"`; the result carries `role="status"`". C7: "the source holds none of `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`, `caches`". C3: "every bill, in steps of 0.01,".

### 13. C8: "3 checks that a reader can do in 5 minutes", and "a reader"

- **Class:** DEFECT
- **Where:** E-98, C8
- **Trigger:** reading. "in 5 minutes" can mean 5 minutes for each check or for all 3; a report whose 3 checks take 4 minutes each passes 1 reading and fails the other. "a reader" is a new name: the glossary has USER and RECIPIENT, and E-25's table says "the USER". "as audited" does not say which audit when the page changes after a first audit. The test names no clock.
- **Violates:** the role scope's categories "syntactic ambiguity" and "inconsistency (1 thing with 2 names)".
- **Proposed fix:** `CRITERIA-CHANGE`: "The delivery report opens with 3 checks. The USER can do all 3 within 5 minutes in total, in a browser, with no terminal. … The report states the SHA-256 of `index.html` at the last audit that passed. Test: an AUDITOR who did not build the page follows the 3 checks as written and records the time taken."

### 14. E-25's table and the CRITERIA it points to do not say the same thing

- **Class:** STYLE
- **Where:** `AUDIT-LOG.md`, E-25, "Translation" table (lines 250 to 255)
- **Trigger:** reading E-25 beside E-98.
  - Row 2: "3 checks the USER can do … each naming what to open and what to see". C8 adds "what to do" and "in 5 minutes", and says "a reader".
  - Row 3 sends "messages and labels on the page in plain words" to C4 and C5. C4 covers messages; C5 has no plain-words test for labels.
  - Row 4 lists `T1` under the heading "Customer language", yet the entry says the ORCHESTRATOR wrote T1.
  - The page's result is "what each person pays" (E-25 row 4, C2), "payments" (E-25 row 4, C3), "shares" (G3) and "the split" (the page).
- **Violates:** the role scope's category "inconsistency (1 thing with 2 names)".
- **Proposed fix:** a `VOC` correction: row 2, copy C8's words; row 3, cite C4 only, or add a label test to C5; rename the first column "Need (ID and words)"; use "payments" throughout.

### 15. E-25 and E-98 use names the glossary does not hold

- **Class:** STYLE
- **Where:** E-25 lines 230, 232, 235, 243, 250; E-98 line 1010
- **Trigger:** reading against `GLOSSARY.md`.
  - `VOC` and `CORRECTION`, in capitals, are not defined; glossary line 3 says that an undefined term in capitals is a FINDING against the file that uses it. The glossary's own name is "Voice of the Customer statement".
  - "skill set" (line 235) for what the glossary calls "the skills".
  - "the card" (line 243) for DECISION CARD.
  - "Customer" (line 250) for a party the glossary calls USER or RECIPIENT.
  - E-98's Approval line calls the 8 CRITERIA "these 8 rules"; C4 uses "the rules below" for input formats; the glossary uses "rule" for a rule of the skills. 1 name, 3 things.
- **Violates:** `GLOSSARY.md` line 3; the role scope's category "inconsistency".
- **Proposed fix:** define `VOC` and `CORRECTION` in the glossary as entry types, or write them as the glossary does; in E-25 write "the skills" and "the DECISION CARD"; in E-98 write "these 8 CRITERIA", and in C4 "the formats below".

## Not examined

- The delivery report: none exists. C8 is UNVERIFIED.
- A real phone (C5) and Firefox (C7): I have neither; the CRITERIA report both UNVERIFIED.
- A screen reader: I ran none. I read the `role` and `aria-live` attributes only.
- 5 of the 10 screenshots: measured, not looked at (`360-first`, `768-first`, `768-error`, `1280-first`, `1280-result`).
- Key presses for the 26,000 sweep cases of C3: the script set values and fired `input`. The 3 spot cases and all C2 and C4 cases used key presses.
- The skills' rules (`SKILL.md` files), including rule 13.1: the scope does not name them, so I cite the role scope's categories in their place.
- Every other file of the RUN FOLDER, and `AUDIT-LOG.md` outside the lines listed under `Examined`: outside this scope.
- The page's code for faults other than language (arithmetic, security, access): other roles hold those. I report only what my CRITERIA checks showed.
