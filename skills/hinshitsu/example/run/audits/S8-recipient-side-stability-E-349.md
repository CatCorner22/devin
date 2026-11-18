devin-0e03cd32bc6d47a3adb0df1e5bda10be

# AUDITOR report: recipient-side verification and stability

Session: https://app.devin.ai/sessions/0e03cd32bc6d47a3adb0df1e5bda10be
Commit audited: `6c94e4c10c9ce7b3c0b45072105b0c2355ec98ef` ("example run: S8 and S9 scopes; GitHub Pages check (E-348)"), branch `main`.
I changed, committed and pushed no file of the repository (`git status --short` printed 0 lines at the end).

## Examined

**Files**
- `skills/hinshitsu/example/index.html`, downloaded raw from GitHub at the commit above into the empty directory `~/audit/fresh/`. I read all 219 lines.
- `README.md` of the repository (the lines that mention the example).
- `skills/hinshitsu-audit/SKILL.md` sections 11 and 12; `skills/hinshitsu/GLOSSARY.md` finding classes.

**Commands and output**

```
$ curl -sSL -o index.html https://raw.githubusercontent.com/CatCorner22/devin/6c94e4c10c9ce7b3c0b45072105b0c2355ec98ef/skills/hinshitsu/example/index.html
$ sha256sum index.html
32964a18b797edaf860fba7bb290c2bb493f72939bd5e5bab28e90efc1cdc7a5  index.html
$ wc -c index.html
9723 index.html
```
The SHA-256 matches the scope.

```
$ grep -n -o -i -E '(src|href)=|@import|url\(|import\s|require\(|fetch\(|XMLHttpRequest|<link|<img|<iframe|<script[^>]*>' index.html
49:<script>
```
```
$ find skills/hinshitsu/example -maxdepth 1 \( -name 'package*.json' -o -name Makefile -o -name '*.config.*' \)
(no output)
$ ls skills/hinshitsu/example
index.html
run
```
```
$ curl -s -o /dev/null -w "%{http_code}\n" https://raw.githubusercontent.com/CatCorner22/devin/6c94e4c10c9ce7b3c0b45072105b0c2355ec98ef/skills/hinshitsu/EXAMPLE.md
404
$ git ls-files | grep -i example | grep -v "example/run/"
skills/hinshitsu/example/index.html
```

**Page opened**
- `file:///home/ubuntu/audit/fresh/index.html` in the Chrome on this machine (Chrome for Testing 156.0.8078.47, with a window, not headless), driven through its debugging port by `audit.js` (Playwright). The script clicks each field, types with key presses, leaves the field with Tab, and reads the page's own text. Request log on open: 1 request, the file itself. Page errors and console errors: 0.
- The script ran 2 times from start to end. `results-run1.json` and `results-run2.json` are byte-identical, and all 26 screenshots of run 2 are byte-identical to run 1 (`two-run-compare.txt`). The attached screenshots are those of run 1.
- I looked at 5 of the 26 screenshots by eye: `b-10-0-3.png`, `w360-result.png`, `w360-error.png`, `s-paste-60-spaces.png`, `s-paste-70-digits-w360.png`. For the others I rely on the text and sizes that the script read from the page.

## Result for each task

| Task | Result | What the page showed | Screenshot |
|---|---|---|---|
| (a) 100.00, 18, 4 | PASS | Bill total: 100.00; Tip percent: 18; Number of people: 4; Tip amount: 18.00; Total with tip: 118.00; "4 people pay 29.50 each" | `a-100-18-4.png` |
| (b) 10.00, 0, 3 | PASS | Tip amount: 0.00; Total with tip: 10.00; "1 person pays 3.34"; "2 people pay 3.33 each"; "Your group decides who pays the higher amount." | `b-10-0-3.png` |
| (c) wrong value in each field, then correct | PASS | `$100` → "Type the amount in digits only, such as 12.50 or 12,50. Leave out currency signs and thousands separators."; `18.5` → "Type a whole number from 0 to 100, in digits only."; `0` people → "Type a whole number from 1 to 100, in digits only."; no result. After 100, 18, 4: all 3 messages gone, result as in (a). | `c1-wrong.png`, `c2-corrected.png` |
| (d) bill `12,50` (tip 18, 2 people) | PASS | Bill total: 12.50; Tip amount: 2.25; Total with tip: 14.75; "1 person pays 7.38"; "1 person pays 7.37"; the sentence | `d-comma.png` |
| (e) bill `12.5` (tip 18, 2 people) | PASS | Same result as (d); Bill total shows 12.50 | `e-one-digit.png` |

First open: 3 empty fields, the guidance sentence, no message, no result (`00-first-open.png`).

## Result for each stability check

Run 1 and run 2 agree on every check below (see `two-run-compare.txt`).

| Check | Run 1 | Run 2 | What happened |
|---|---|---|---|
| 12.2 Fresh install | PASS for the file; see F-1 and F-2 for the instructions | same | 1 `curl`, SHA-256 matches, the page opens from disk and works with 1 request. I obtained the file with the address in my scope. The README does not give a RECIPIENT that step. |
| 12.3 Production build | N/A | N/A | No build step exists. The folder holds `index.html` and `run/` only; no `package.json`, Makefile or config file. The file that ships is the file I tested. |
| 12.4 Reload in the middle of a task | PASS | PASS | Typed 100.00 and 18, reloaded: 3 empty fields, no message, no result. Typed `x` in people (message showing), reloaded: same clean state. `s-reload-before.png`, `s-reload-after.png` |
| 12.4 Widths 360, 768, 1280 | PASS | PASS | In first-open, result (1000000.00, 100, 3) and error (3 messages) states: document width equals window width, 0 elements past the window edge, 0 elements with clipped text, no sideways scroll. Long messages wrap. `w360-*.png`, `w768-*.png`, `w1280-*.png` (9 files). I viewed the 360 result and error screenshots by eye; no text is cut off. |
| 12.4 3 fields empty | PASS | PASS | Untouched: no message, no result. After Tab through all 3: "Type the bill total.", "Type the tip percent. Type 0 for no tip.", "Type the number of people."; no result. `s-empty-tabbed.png` |
| 12.4 Smallest values 0.01, 0, 1 | PASS | PASS | Tip amount: 0.00; Total with tip: 0.01; "1 person pays 0.01". `s-min.png` |
| 12.4 Largest values 1000000.00, 100, 100 | PASS | PASS | Tip amount: 1000000.00; Total with tip: 2000000.00; "100 people pay 20000.00 each". `s-max.png`. Just outside (1000000.01, 101, 101 and 0.00, -1, 0): a message under each field, no result. |
| 12.4 Invalid value in every field | PASS | PASS | 7 sets (`abc`×3; `1,000.00`, `18.0`, `4.`; `1e3`, `1e1`, `+4`; `.5`, `18,5`, `2.5`; `-5`, `-1`, `-2`; `12.345`, space, space; `10.`, empty, empty): each field showed a message that names what to type; no result in any set. `s-invalid-all.png`, full text in `results-run1.json` under `invalid`. |
| Paste longer than 64 characters into the bill | PASS | PASS | Real clipboard paste (Ctrl+X from another field, Ctrl+V into the bill). 60 spaces + `1234.56` (67 characters): the field kept all 67; no message; with tip 18 and 4 people the result shows Bill total: 1234.56, Tip amount: 222.22, Total with tip: 1456.78, "2 people pay 364.20 each", "2 people pay 364.19 each". The amount sits toward the right of the field, after the spaces (`s-paste-60-spaces.png`). 70 digits: "Type 1000000.00 or less.", no result, no sideways scroll at 1280 or 360 (`s-paste-70-digits.png`, `s-paste-70-digits-w360.png`). 70 spaces: "Type the bill total.", no result (`s-paste-70-spaces.png`). |
| 12.5 Dependencies | PASS | PASS | None. The `grep` above finds no `src=`, `href=`, `@import`, `url(`, `import`, `require(`, `fetch(`, `<link`, `<img` or `<iframe`; the only match is the inline `<script>`. The request log shows 1 request. No lock file exists and none is needed. The page uses the system font (`system-ui`), so letter shapes and line breaks depend on the machine. |
| 12.6 2 runs | PASS | PASS | Results and screenshots byte-identical. |

## Findings

**F-1**
- Class: DEFECT
- Where: `README.md`, section "Worked example" (line 74), link `skills/hinshitsu/EXAMPLE.md`.
- Trigger: a RECIPIENT follows the README's only link to the worked example. The file does not exist at the audited commit: GitHub returns 404, and `git ls-files` lists no such file.
- Violates: rule 12.2 of `skills/hinshitsu-audit/SKILL.md` (the RECIPIENT follows only the instructions received and must reach a working state). The README is one of the 2 sources of instruction the scope names.
- Proposed fix: add `skills/hinshitsu/EXAMPLE.md`, or point the link at a file that exists.

**F-2**
- Class: DEFECT
- Where: `README.md` (whole file).
- Trigger: a RECIPIENT wants to use the page. The README names the folder `skills/hinshitsu/example/` (line 5) but has no step that says to download `index.html` and open it in a browser. On GitHub the file opens as source text, not as a page. I reached a working page only because my scope gave the step.
- Violates: rule 12.2 ("no step that the instructions omit").
- Proposed fix: add 2 sentences to the README: where the file is, and "download it, then open it in a browser".

I found no FINDING against the page itself in the tasks and checks I ran.

## Not examined

- UNVERIFIED: a real phone. Reason: none on this machine. I tested window widths of 360 and 768 pixels in desktop Chrome only; the on-screen keyboard that `inputmode` selects was not seen. To check: put the file on a phone, open it in the phone's browser, tap the bill field and confirm a number keyboard with a decimal key appears and nothing scrolls sideways.
- UNVERIFIED: a screen reader. Reason: none run. I did not check that messages and the result are spoken. To check: turn on VoiceOver or TalkBack, type `abc` in the bill field, leave it, and listen for the message.
- UNVERIFIED: Firefox, Safari, Edge, and Chrome on Windows or macOS. Reason: only Chrome for Testing 156 on Linux was used.
- UNVERIFIED: the download as a person does it (the "Download raw file" button on GitHub, then a double-click on the file). Reason: I used `curl`, as the scope directs.
- Not run, outside this scope: the full C2 test list, the C3 sweep, the C5 count of changes, C6 (JavaScript off), C7 (`fetch` blocked) and C8 (the 3 checks of the delivery report).
- Screenshots at 768 and 1280 pixels were judged from the sizes the script read, not viewed by eye.

## Attached

`REPORT.md`, `audit.js`, `results-run1.json`, `results-run2.json`, `two-run-compare.txt`, and 26 screenshots.
