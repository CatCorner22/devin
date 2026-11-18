devin-f58ed8aa997e4691a0d7ca990328c666 (https://app.devin.ai/sessions/f58ed8aa997e4691a0d7ca990328c666)

# Best-practices audit — WU-1, `skills/hinshitsu/example/index.html`

Result: 8 findings — 1 BLOCKER, 2 FRAGILITY, 5 STYLE. Every test that C1 to C7 name and that I could run, ran and matched the CRITERION. C8, a real phone, Firefox and a screen reader are UNVERIFIED (see `## Not examined`).

## Scope received

````text
You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: WU-1 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Best-practices auditor

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Compare the WORK UNIT with (a) the conventions of the repository it lives in, taken from its existing files and its contributor documents, and (b) the documented practice of its language, framework and platform. Cite the convention or the document for each finding.

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

The repository holds no other HTML page; its conventions are in `README.md` and `TESTING.md`.
````

## Examined

### Files

| File | Lines | Why |
|---|---|---|
| `skills/hinshitsu/example/index.html` | 1–167 (all) | the DELIVERABLE |
| `README.md` | 1–88 (all) | repository conventions |
| `TESTING.md` | 1–12 (all) | repository conventions |
| `skills/hinshitsu/GLOSSARY.md` | 1–97 (all) | finding classes |
| `scripts/lint.py` | 28–35 and 140–158 only | named by `TESTING.md`; read to learn whether its banned-word rule covers `index.html` (it does not: it covers Markdown files only) |

Checkout: the machine already held a clone at `/home/ubuntu/repos/devin`. I fetched the branch and checked out the commit there. I wrote my scripts and screenshots to `/home/ubuntu/audit`, outside the repository.

Browser: "Google Chrome for Testing" 156.0.8078.47 on Ubuntu, a window on the desktop (not headless), driven by Playwright 1.63 over the Chrome DevTools Protocol. It is not the branded Google Chrome build.

### Commands and output

1. Find and check out the commit.

```text
$ git fetch origin devin/hinshitsu-build
From https://git-manager.devin.ai/proxy/github.com/CatCorner22/devin
 * branch            devin/hinshitsu-build -> FETCH_HEAD
$ git log origin/devin/hinshitsu-build --format='%H %cI %s' | grep -n 'example run: WU-1 swarm scopes'
1:d125232c69fc9c85fae844443dc5053e7e6fa30d 2026-11-18T16:32:19Z example run: WU-1 swarm scopes; the copy under review
$ git checkout --detach d125232c69fc9c85fae844443dc5053e7e6fa30d
HEAD is now at d125232 example run: WU-1 swarm scopes; the copy under review
$ sha256sum skills/hinshitsu/example/index.html
11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184  skills/hinshitsu/example/index.html
$ wc -lc skills/hinshitsu/example/index.html
 167 7123 skills/hinshitsu/example/index.html
```

2. Read the files: `cat -n` on `index.html`, `README.md`, `TESTING.md` and `GLOSSARY.md`. The output is the files themselves.

3. Static reading of the source (C7 "no storage call", and form).

```text
$ grep -nEi 'localStorage|sessionStorage|indexedDB|cookie|caches|sendBeacon|XMLHttpRequest|fetch|WebSocket|EventSource|navigator\.|history\.|location|import|src=|href=|url\(|@import|eval|innerHTML|document\.write' skills/hinshitsu/example/index.html
(no output; grep exit 1 = no match)
$ grep -nP '[^\x00-\x7F]' skills/hinshitsu/example/index.html
(no output; exit 1 = the file is pure ASCII)
$ grep -nP '\t| +$|\r' skills/hinshitsu/example/index.html | head
(no output = no tab, no trailing space, no CR)
$ tail -c 20 skills/hinshitsu/example/index.html | xxd | tail -2
00000000: 7074 3e0a 3c2f 626f 6479 3e0a 3c2f 6874  pt>.</body>.</ht
00000010: 6d6c 3e0a                                ml>.
```

4. The repository's lint, and its banned-word list applied to `index.html` by a 6-line Python script of mine that imports the `BANNED` list from `scripts/lint.py`.

```text
$ PYTHONDONTWRITEBYTECODE=1 python3 scripts/lint.py
FAIL skills/hinshitsu/EXAMPLE.md: required file is missing (C1)
lint: 1 failure(s). This script tests form; it does not prove that any rule is sound.
(exit 1)
$ python3 - (my script)
banned-word hits in index.html: []
```

5. HTML validity.

```text
$ npx html-validate --version
html-validate-9.7.1
$ npx html-validate --preset standard /home/ubuntu/repos/devin/skills/hinshitsu/example/index.html
(no output; exit 0)
$ curl -s -o vnu.json -w '%{http_code}\n' -H 'Content-Type: text/html; charset=utf-8' --data-binary @.../index.html 'https://validator.w3.org/nu/?out=json'
200
$ cat vnu.json
{"version":"26.11.17","messages":[]}
```

6. `node a1.js` — my script for C1, C2, C4, C5, C6, C7 and the live-region observations. It opens the page by its `file://` path in the Chrome named above, clicks each field, clears it and types with key events, then reads the page's own DOM. Complete output:

```text
browser version: 156.0.8078.47

== C1 request log ==
["GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
request count: 1
console at load: []

== C4 first open ==
{"bill":"","tip":"","people":"","eb":"","et":"","ep":"","inv":[null,null,null],"hidden":true,"visible":false,"lines":[]}
guide text: "Type the bill, the tip and the number of people. The split shows below."
visible text of body: "Split the bill\n\nType the bill, the tip and the number of people. The split shows below.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"

== C2 cases, typed with key events ==
["100.00","18","4"] => ["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"] visible: true errors: ["","",""]
["0.30","15","1"] => ["Bill: 0.30","Tip: 15 percent","People: 1","Tip amount: 0.05","Total: 0.35","1 person pays 0.35"] visible: true errors: ["","",""]
["10.10","15","1"] => ["Bill: 10.10","Tip: 15 percent","People: 1","Tip amount: 1.52","Total: 11.62","1 person pays 11.62"] visible: true errors: ["","",""]
["12.25","18","1"] => ["Bill: 12.25","Tip: 18 percent","People: 1","Tip amount: 2.21","Total: 14.46","1 person pays 14.46"] visible: true errors: ["","",""]
["10.00","0","3"] => ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."] visible: true errors: ["","",""]
["1000000.00","100","100"] => ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"] visible: true errors: ["","",""]
["0.01","0","100"] => ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."] visible: true errors: ["","",""]
["10.00","0","6"] => ["Bill: 10.00","Tip: 0 percent","People: 6","Tip amount: 0.00","Total: 10.00","4 people pay 1.67 each","2 people pay 1.66 each","Your group decides who pays the extra cent."] visible: true errors: ["","",""]
[" 100.00 "," 18 "," 4 "] => ["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"] visible: true errors: ["","",""]
after appending 0 to people (40): ["Bill: 100.00","Tip: 18 percent","People: 40","Tip amount: 18.00","Total: 118.00","40 people pay 2.95 each"]

== C4 error inputs: bill field (tip=18, people=4 valid) ==
"abc" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"12,50" => msg: "Use a dot, not a comma. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"1,000.00" => msg: "Use a dot, not a comma. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"1e3" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"10." => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
".5" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"$12.50" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"€12" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"12.50$" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"-5" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"-0.01" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"0" => msg: "Enter an amount above 0." aria-invalid: true resultVisible: false lines: 0
"0.00" => msg: "Enter an amount above 0." aria-invalid: true resultVisible: false lines: 0
"00.0" => msg: "Enter an amount above 0." aria-invalid: true resultVisible: false lines: 0
"1000000.01" => msg: "Enter 1000000.00 or less." aria-invalid: true resultVisible: false lines: 0
"1000001" => msg: "Enter 1000000.00 or less." aria-invalid: true resultVisible: false lines: 0
"99999999999999999999" => msg: "Enter 1000000.00 or less." aria-invalid: true resultVisible: false lines: 0
"1.234" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"12.500" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"1 000" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"1..2" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"+5" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"٣" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"１２" => msg: "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid: true resultVisible: false lines: 0
"   " => msg: "Enter the bill total." aria-invalid: true resultVisible: false lines: 0
"" => msg: "Enter the bill total." aria-invalid: true resultVisible: false lines: 0
valid? "0.01" => msg: "" resultVisible: true first line: Bill: 0.01
valid? "1000000.00" => msg: "" resultVisible: true first line: Bill: 1000000.00
valid? "1000000" => msg: "" resultVisible: true first line: Bill: 1000000.00
valid? "007.5" => msg: "" resultVisible: true first line: Bill: 7.50
valid? "  12.5  " => msg: "" resultVisible: true first line: Bill: 12.50

== C4 error inputs: tip field ==
"" => msg: "Enter the tip percent. Enter 0 for no tip." aria-invalid: true resultVisible: false lines: 0
"abc" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"18.0" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"1e1" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"+4" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"4." => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"-1" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"101" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"1000" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"18,5" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"18%" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"1 8" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"0.5" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"  " => msg: "Enter the tip percent. Enter 0 for no tip." aria-invalid: true resultVisible: false lines: 0
"١٨" => msg: "Enter a whole number from 0 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
valid? "0" => msg: "" resultVisible: true lines: ["Tip: 0 percent","People: 4"]
valid? "100" => msg: "" resultVisible: true lines: ["Tip: 100 percent","People: 4"]
valid? "007" => msg: "" resultVisible: true lines: ["Tip: 7 percent","People: 4"]
valid? " 18 " => msg: "" resultVisible: true lines: ["Tip: 18 percent","People: 4"]

== C4 error inputs: people field ==
"" => msg: "Enter the number of people." aria-invalid: true resultVisible: false lines: 0
"abc" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"18.0" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"1e1" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"+4" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"4." => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"-1" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"0" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"00" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"101" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"1000" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"4,0" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"four" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
"1.5" => msg: "Enter a whole number from 1 to 100, in digits only." aria-invalid: true resultVisible: false lines: 0
valid? "1" => msg: "" resultVisible: true lines: ["Tip: 18 percent","People: 1"]
valid? "100" => msg: "" resultVisible: true lines: ["Tip: 18 percent","People: 100"]
valid? "004" => msg: "" resultVisible: true lines: ["Tip: 18 percent","People: 4"]
valid? " 4 " => msg: "" resultVisible: true lines: ["Tip: 18 percent","People: 4"]

focus bill then Tab away (nothing typed): {"bill":"","tip":"","people":"","eb":"Enter the bill total.","et":"","ep":"","inv":["true",null,null],"hidden":true,"visible":false,"lines":[]}
after tabbing past all 3: {"bill":"","tip":"","people":"","eb":"Enter the bill total.","et":"Enter the tip percent. Enter 0 for no tip.","ep":"Enter the number of people.","inv":["true","true","true"],"hidden":true,"visible":false,"lines":[]}
after Enter in bill: url unchanged = true {"bill":"100.00","tip":"","people":"","eb":"","et":"Enter the tip percent. Enter 0 for no tip.","ep":"Enter the number of people.","inv":[null,"true","true"],"hidden":true,"visible":false,"lines":[]}

== C5 widths ==
360 first {"innerWidth":360,"clientWidth":360,"docScrollWidth":360,"bodyScrollWidth":360,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":45.1875}
360 error {"innerWidth":360,"clientWidth":360,"docScrollWidth":360,"bodyScrollWidth":360,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":47.1875}
360 result-max {"innerWidth":360,"clientWidth":360,"docScrollWidth":360,"bodyScrollWidth":360,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":45.1875}
360 result-2line {"innerWidth":360,"clientWidth":360,"docScrollWidth":360,"bodyScrollWidth":360,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":45.1875}
768 first {"innerWidth":768,"clientWidth":768,"docScrollWidth":768,"bodyScrollWidth":768,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":45.1875}
768 error {"innerWidth":768,"clientWidth":768,"docScrollWidth":768,"bodyScrollWidth":768,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":47.1875}
768 result-max {"innerWidth":768,"clientWidth":768,"docScrollWidth":768,"bodyScrollWidth":768,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":45.1875}
768 result-2line {"innerWidth":768,"clientWidth":768,"docScrollWidth":768,"bodyScrollWidth":768,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":45.1875}
1280 first {"innerWidth":1280,"clientWidth":1280,"docScrollWidth":1280,"bodyScrollWidth":1280,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":45.1875}
1280 error {"innerWidth":1280,"clientWidth":1280,"docScrollWidth":1280,"bodyScrollWidth":1280,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":47.1875}
1280 result-max {"innerWidth":1280,"clientWidth":1280,"docScrollWidth":1280,"bodyScrollWidth":1280,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":45.1875}
1280 result-2line {"innerWidth":1280,"clientWidth":1280,"docScrollWidth":1280,"bodyScrollWidth":1280,"offenders":null,"guideLines":2,"inputFont":"16px","inputH":45.1875}

== C5 markup, read from the live DOM ==
[
 {
  "id": "bill",
  "type": "text",
  "inputmode": "decimal",
  "autocomplete": "off",
  "describedby": "bill-error",
  "label": "Bill total, tax included",
  "labelVisible": true
 },
 {
  "id": "tip",
  "type": "text",
  "inputmode": "numeric",
  "autocomplete": "off",
  "describedby": "tip-error",
  "label": "Tip percent",
  "labelVisible": true
 },
 {
  "id": "people",
  "type": "text",
  "inputmode": "numeric",
  "autocomplete": "off",
  "describedby": "people-error",
  "label": "Number of people",
  "labelVisible": true
 }
]
[{"id":"bill-error","role":"alert","live":null,"atomic":null,"hidden":false,"display":"block"},{"id":"tip-error","role":"alert","live":null,"atomic":null,"hidden":false,"display":"block"},{"id":"people-error","role":"alert","live":null,"atomic":null,"hidden":false,"display":"block"},{"id":"result","role":"status","live":"polite","atomic":null,"hidden":true,"display":"none"}]
CSP meta: <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">

== live-region observations ==
AX tree first open -> non-ignored status/alert nodes: ["alert","alert","alert"]
mutation records after typing "abc" in bill (3 keys) {"bill-error":3,"tip-error":0,"people-error":0,"result":3}
AX tree bill error showing -> non-ignored status/alert nodes: ["alert","alert","alert"]
mutation records after typing "18" in tip (2 keys + clear) while bill error shows unchanged {"bill-error":3,"tip-error":0,"people-error":0,"result":3}
mutation records after making all valid {"bill-error":5,"tip-error":0,"people-error":0,"result":16}
AX tree result showing -> non-ignored status/alert nodes: ["status","alert","alert","alert"]
mutation records after 1 key in people while result shows {"bill-error":0,"tip-error":0,"people-error":0,"result":7}

== C7 ==
fetch('https://example.com') -> REJECTED TypeError: Failed to fetch
console: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy."]
requests seen: ["GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html"]
extra probes: {"img":"ERROR(blocked)","beacon":true,"ls":0,"cookie":""}
before reload: {"bill":"100.00","tip":"18","people":"4","eb":"","et":"","ep":"","inv":[null,null,null],"hidden":false,"visible":true,"lines":["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]}
after reload: {"bill":"","tip":"","people":"","eb":"","et":"","ep":"","inv":[null,null,null],"hidden":true,"visible":false,"lines":[]}
after navigating away and Back: {"bill":"","tip":"","people":"","eb":"","et":"","ep":"","inv":[null,null,null],"hidden":true,"visible":false,"lines":[]}

== C6 JavaScript disabled ==
noscript outerHTML: <noscript><p>This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page.</p></noscript>
noscript p box (rendered if present): {"width":480,"height":48}
```

7. `node a3.js` — my script for C3. It computes the tip, total and payments in BigInt with my own formula (`tip = (2 × bill × percent + 100) ÷ 200`, rounded down), and compares them with the lines the page shows. The 2 sweeps put each value into the field with Playwright `fill()`, which sets the field and fires the page's own `input` event; it does not send 1 key event per character. The 3 spot cases are typed with key events. Complete output:

```text
Sweep A cases: 20000 failures so far: 0 secs 110.498
Sweep B cases: 6000 failures so far: 0 secs 144.455
spot ["10.00","0","3"] -> ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."] MATCH
spot ["1000000.00","100","100"] -> ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"] MATCH
spot ["0.01","0","100"] -> ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."] MATCH
TOTAL cases: 26003 failures: 0 cases with 2 pay lines: 4455
failure samples: []
```

8. After all runs:

```text
$ git status --short
(no output: no file changed)
$ git rev-parse HEAD
d125232c69fc9c85fae844443dc5053e7e6fa30d
$ sha256sum skills/hinshitsu/example/index.html
11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184  skills/hinshitsu/example/index.html
```

9. Documents fetched with `curl` for the citations in the findings, with the sentences I rely on:

- MDN, "ARIA live regions" (developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions): "Establish the live region before updating its content. Start with an empty live region, then allow time for it to be exposed to assistive technologies before updating its content."
- MDN, "ARIA: alert role" (…/ARIA/Reference/Roles/alert_role): "Because of its intrusive nature, the alert role must be used sparingly and only in situations where the user's immediate attention is required."
- W3C technique ARIA19 (w3.org/WAI/WCAG22/Techniques/aria/ARIA19): "The error container must be present in the DOM on page load for the error message to be spoken by most screen readers."
- MDN, "ARIA: status role": "Elements with the role status have an implicit aria-live value of polite and an implicit aria-atomic value of true."
- MDN glossary, "Progressive enhancement": "provides a baseline of essential content and functionality to as many users as possible".
- web.dev, "Cumulative Layout Shift (CLS)": "Unexpected layout shifts can disrupt the user experience in many ways".
- MDN, "ARIA: aria-required attribute": "The aria-required attribute indicates that user input is required on the element before a form may be submitted." W3C technique ARIA2 has the same aim.

10. `node a4.js` — 1 check for finding 7, on a `data:` page of mine, not on the DELIVERABLE.

```text
typeof window.f on a page whose only script is  "use strict";function f(){}  -> function
```

### Pages opened

`file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html`, in the Chrome named above, by the 2 scripts. I looked at 4 of the 14 screenshots myself: `w360-error.png`, `w360-result-max.png`, `w1280-result-2line.png`, `js-off-typed.png`. The other 10 I judged from the measurements in the output of command 6.

### What the checks showed, by CRITERION

| CRITERION | What I ran | Observed |
|---|---|---|
| C1 | request log on `file://` open; `100.00`, `18`, `4` typed | 1 request; tip 18.00, total 118.00, "4 people pay 29.50 each" |
| C2 | the 4 named cases, typed | all 4 match |
| C3 | 20,000 + 6,000 sweep cases, 3 spot cases | 26,003 cases, 0 differences |
| C4 | first open; 26 bad bills, 15 bad tips, 14 bad people values; leaving an empty field; recompute | each bad value: a message beside its field and no result. Both comma inputs: "Use a dot, not a comma. Example: 12.50". See finding 5 for "1 line of guidance" |
| C5 | 3 widths × 4 states: measurements and screenshots; markup read from the DOM | no element past the viewport edge, no sideways scroll; labels, roles and `inputmode` as the CRITERION states. Real phone: UNVERIFIED, not on this machine |
| C6 | load in a context with JavaScript disabled | the sentence shows. See finding 1 |
| C7 | `fetch('https://example.com')`; source grep; reload; Back | fetch rejected and Chrome logged the CSP violation; no storage call; reload and Back both give 3 empty fields. Firefox: UNVERIFIED, not on this machine |
| C8 | not run | the scope names no delivery report |

Conventions and documented practice that the file meets, so that no finding stands on them: HTML valid in 2 validators; `lang`, `charset` first, `viewport`, `<title>`; each `<label for>` matches 1 field; text set with `textContent` only; money held in whole cents (largest product 10,000,000,000, far below 2^53); 16px field text; default focus ring kept; ASCII, LF line ends, final newline; digits for numbers and none of the repository's banned words in the page text.

## Findings

### 1. With JavaScript off, the page still tells the reader to type and says "The split shows below."

- **Class:** BLOCKER, under part (d) of the glossary: "a statement in … the DELIVERABLE is false". C6 itself passes. The harm is small: the needs-JavaScript sentence sits directly above. I class it by the glossary's rule that the first class that fits applies; if the ORCHESTRATOR reads the 2 paragraphs as 1 statement, the class falls to STYLE.
- **Where:** `skills/hinshitsu/example/index.html` lines 28–30 (the `<noscript>`, `#guide` and `<form>` are siblings; nothing hides the guide or the form when the script does not run).
- **Trigger:** open the file in Chrome with JavaScript disabled. The page shows "This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page.", then "Type the bill, the tip and the number of people. The split shows below.", then 3 fields that accept typing. Type `100.00` and press Tab: nothing shows (screenshot `js-off-typed.png`).
- **Violates:** GLOSSARY "BLOCKER" (d). Documented practice: MDN glossary, "Progressive enhancement" — the page without script is the baseline, and the script adds what needs script.
- **Proposed fix:** add `hidden` to `<p id="guide">` and to `<form id="form">` in the markup, and remove both attributes in the script before line 147. The first-open state of C4 is unchanged when JavaScript is on.

### 2. The result region is filled while it is not exposed to screen readers, and is rebuilt on every keystroke

- **Class:** FRAGILITY. The change that makes it fail: a machine that runs a screen reader (NVDA, JAWS, VoiceOver, TalkBack). C5's own test, a reading of the markup, passes.
- **Where:** `index.html` line 19 (`#result[hidden] { display: none; }`), line 47 (`hidden` in the markup), lines 134–144 (`update()` empties the region, appends 6 to 9 `<p>` elements while it is still hidden, then sets `hidden = false`).
- **Trigger:** command 6, "live-region observations". At first open and in the error state Chrome's accessibility tree holds 3 `alert` nodes and no `status` node. The `status` node enters the tree only in the same step as its content. With a result showing, 1 key in the people field gives 7 mutation records in `#result`: the whole result is removed and written again.
- **Violates:** documented practice, MDN "ARIA live regions": "Start with an empty live region, then allow time for it to be exposed to assistive technologies before updating its content." It puts at risk the C5 sentence "Error text and the result sit in regions that screen readers announce". Whether a screen reader speaks the result is UNVERIFIED: no screen reader is on this machine.
- **Proposed fix:** keep `#result` rendered from first open: remove `hidden` from line 47, remove line 19, and move the border and padding to an inner `<div>` that `update()` creates only when there is a result. In `update()`, build the new lines first and touch the DOM only when they differ from the lines shown.

### 3. Each keystroke in any field writes every error message again into its `role="alert"` region

- **Class:** FRAGILITY. Same change as finding 2: a machine that runs a screen reader.
- **Where:** `index.html` line 130 (`f.errorBox.textContent = showError ? r.error : "";` runs for all 3 fields on every `input` and `blur` event), with lines 34, 39, 44 (`role="alert"`) and lines 33, 38, 43 (`aria-describedby` to the same element).
- **Trigger:** command 6. Type `abc` in the bill field: its message shows. Then type `18` in the tip field: `#bill-error` receives 3 mutation records, 1 per `input` event, though its text did not change. A screen reader may speak "Enter an amount above 0 in digits…" again on each key typed in another field, and `role="alert"` interrupts other speech. What a screen reader speaks is UNVERIFIED.
- **Violates:** documented practice, MDN "ARIA: alert role": "the alert role must be used sparingly and only in situations where the user's immediate attention is required." W3C technique ARIA19 shows the pattern: the message is injected when the error arises.
- **Proposed fix:** write only on change — `var text = showError ? r.error : ""; if (f.errorBox.textContent !== text) { f.errorBox.textContent = text; }`.

### 4. "Your group decides who pays the extra cent." shows when several people pay more

- **Class:** STYLE. The amounts are right; the count word in the sentence is wrong. The claim that the group decides stays true.
- **Where:** `index.html` line 143.
- **Trigger:** type `10.00`, `0`, `6`. The page shows "4 people pay 1.67 each", "2 people pay 1.66 each", "Your group decides who pays the extra cent." 4 people pay 1 cent more, not 1 person.
- **Violates:** no CRITERION. Plain-language practice: a number word matches the number shown. The repository's documents write each count as an exact digit (`README.md` lines 3, 11, 27).
- **Proposed fix:** "Your group decides who pays the higher amount."

### 5. The guidance shows as 2 lines at all 3 widths

- **Class:** STYLE, on the reading that C4's "1 line of guidance" means 1 guidance paragraph (there is 1). If the ORCHESTRATOR reads it as 1 displayed line, this fails C4 and is a BLOCKER under (a).
- **Where:** `index.html` line 29 (2 sentences, 71 characters) with line 11 (`main { max-width: 30rem; }`).
- **Trigger:** command 6, "C5 widths": `guideLines` is 2 at 360, 768 and 1280 pixels (screenshot `w1280-result-2line.png`).
- **Violates:** C4, "1 line of guidance", on the strict reading only.
- **Proposed fix:** shorten to 1 sentence that fits 480 pixels, for example "Type the bill, the tip percent and the number of people." At 360 pixels any sentence of that length still wraps; the CRITERION needs the USER's reading.

### 6. Showing an error moves the content below it

- **Class:** STYLE.
- **Where:** `index.html` line 16 (`border: 2px` on an invalid field, against `1px` on line 15) and line 17 (`min-height: 1.5rem` holds room for 1 line of error text).
- **Trigger:** command 6, "C5 widths": the bill field is 45.19 pixels high without an error and 47.19 with one. At 360 pixels 2 of the messages wrap to 2 lines (screenshot `w360-error.png`), which moves the fields below by 1 more line while the person types.
- **Violates:** documented practice, web.dev "Cumulative Layout Shift (CLS)": "Unexpected layout shifts can disrupt the user experience". Here the shift follows the person's own keystroke, so the cost is small.
- **Proposed fix:** keep the border width at 1px and add `outline: 1px solid #a40000` or `box-shadow: inset 0 0 0 1px #a40000` for the invalid state; set `.error { min-height: 3rem; }` below 30rem of width, or shorten the 2 long messages.

### 7. Line 67 does nothing

- **Class:** STYLE.
- **Where:** `index.html` line 67, `window.splitBill = splitBill;`.
- **Trigger:** read the source: no other line reads `window.splitBill`. A function declared at the top level of a classic `<script>` is already a property of `window` (command 10 shows it in this Chrome).
- **Violates:** no CRITERION and no written repository rule; common practice that each line has an effect or a stated reason. The file gives no reason for the line.
- **Proposed fix:** delete line 67, or keep it with a comment that names who calls it.

### 8. The 3 fields are required, and the markup does not say so

- **Class:** STYLE.
- **Where:** `index.html` lines 33, 38, 43.
- **Trigger:** read the markup: no `required` and no `aria-required`. C4 treats an empty field as an error once left.
- **Violates:** documented practice, MDN "aria-required" and WCAG 2.2 technique ARIA2: a field that must be filled is marked so that assistive technology states it before the error.
- **Proposed fix:** add `aria-required="true"` to each `<input>`. The form already has `novalidate`, so the plain `required` attribute also works and shows no browser bubble.

## Not examined

- **C8, the delivery report.** The scope names 1 file to examine and no delivery report. UNVERIFIED by me.
- **A real phone (C5).** None on this machine. UNVERIFIED. I did not use the Android emulator: the CRITERION asks for a real phone.
- **Firefox (C7).** Not on this machine. UNVERIFIED.
- **A screen reader.** None on this machine. What findings 2 and 3 cause in speech is UNVERIFIED; I observed the accessibility tree and the DOM mutations only.
- **Branded Google Chrome, and Chrome on Windows or macOS.** The machine has Chrome for Testing 156 on Linux only.
- **Key-by-key typing for the 26,000 sweep cases of C3.** The sweeps used `fill()`; only the 3 spot cases and all C2 and C4 inputs were typed with key events.
- **`skills/hinshitsu/example/run/`, `SKILL.md`, the other skills, templates, adapters, `tests/`, and the rest of `scripts/`.** The scope limits me to the files it names and the files they reference. I did not run `python3 -m unittest discover -s tests` or `hinshitsu_check.py`: they test the scripts and the RUN FOLDER, not this file.
- **Outside the WORK UNIT, reported so that it is not withheld:** `python3 scripts/lint.py` exits 1 at this commit because `skills/hinshitsu/EXAMPLE.md`, which `README.md` line 74 links, does not exist. This is not a finding against `index.html`.
- **One act outside the machine:** I sent the text of `index.html` to `validator.w3.org` for the validity check. The file is in a public repository.
