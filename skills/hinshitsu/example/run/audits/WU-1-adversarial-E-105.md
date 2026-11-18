devin-7a092325e36c4bc581c8ec4e6498fbba

# Adversarial tester report — `skills/hinshitsu/example/run/review/index.html`

## Scope received

You are a sub-agent in a quality run. Work only from this scope. Repository: CatCorner22/devin (public, on GitHub), branch `devin/hinshitsu-build`, the newest commit of that branch whose message begins "example run: WU-1 swarm scopes". Clone it and check out that commit. Do not change, commit or push any file. Deliver your report as the full text of your final message, and attach the same text as a Markdown file. Put the ID of your own Devin session on the first line of the report. A Chrome browser is on your machine; a check named in the CRITERIA that you can run, you must run.

# Role scope — Adversarial tester

You are an AUDITOR in a hinshitsu run (rule 13.1). You hold 1 role.

## Your job

Break it. Build inputs and sequences that the BUILDER did not plan for: empty, huge, malformed, hostile, repeated, out of order, concurrent, interrupted. Run each one against the real DELIVERABLE and record what happened. For rules or instructions, find the cheapest way an AGENT could comply in form and not in substance.

## Filled in by the ORCHESTRATOR

- DELIVERABLE and files to examine: `skills/hinshitsu/example/run/review/index.html`, all lines (the copy under review)
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

### Commit and files

- Checkout: `/home/ubuntu/repos/devin` (the machine's existing clone of CatCorner22/devin), branch `devin/hinshitsu-build`, HEAD `d125232c69fc9c85fae844443dc5053e7e6fa30d`, "example run: WU-1 swarm scopes; the copy under review", the newest commit on `origin/devin/hinshitsu-build` whose message starts with that text (it is the branch tip). I used the existing clone and did not clone a second time. `git status --porcelain` is empty at the end (E8).
- `skills/hinshitsu/example/run/review/index.html`, lines 1-167, all read. SHA-256 `68a527cccb35991429c8bbee059448a042af80b62eeb6c91a8ce146fc54d57e5`, 7123 bytes.
- `skills/hinshitsu/example/index.html` (named in C1): not read line by line. I ran `cmp`, `diff` and `sha256sum` on it against the review copy. SHA-256 `11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184`. The 2 files differ in 1 line (E2).
- `skills/hinshitsu/GLOSSARY.md`: lines 53-59, 67, 69 and 91-96 (the class definitions), found by `grep`.
- I did not open any other file in the run folder. `ls` printed the names of the files in `skills/hinshitsu/example/run/`.

### Browser and pages

- Browser: the machine's desktop Chrome, "Google Chrome for Testing 156.0.8078.47", headed, on Linux, driven over its DevTools port with Playwright 1.63 (`chromium.connectOverCDP`). That Chrome runs with `--disable-back-forward-cache` and an ad-block extension.
- Page opened in every test: `file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html`.
- In `t1.js`, `t2.js`: values typed with Playwright keyboard events (click the field, Ctrl+A, Delete, type), then a click on the heading to leave the field.
- In `t3.js` (C3 sweep): values set with Playwright `fill()`, which sets the field value and fires the page's `input` event. This is not key-by-key typing.
- In `t4.js`: fields focused by a click, values typed with real X11 key events (`xdotool type`), reloads done with real `Ctrl+R`, `F5` and `Ctrl+Shift+R` key presses in the Chrome window.
- JavaScript off: a browser context with `javaScriptEnabled: false`.
- 25 screenshots written to `~/audit/shots/` on my machine (widths 320, 360, 768, 1280 × 5 states; JS off × 2; GUI × 3). I viewed 6: `w360-errors`, `w360-result-max`, `w360-long-input`, `w768-result-2line`, `w1280-errors`, `js-off-typed`. Nothing is cut off in those 6.

### Result of each CRITERION check that I ran

| CRITERION | Check run | Observed |
|---|---|---|
| C1 | open by `file://`, request log | 1 request; C2 first test passes (E4) |
| C2 | the 4 typed tests + 9 more | all 4 match (E4) |
| C3 | 20,000 + 6,000 + 3 spot cases + 3,336 extra, against my own BigInt code | 0 mismatches in 29,339 cases (E6 run 2) |
| C4 | 62 bill inputs, 32 tip inputs, 32 people inputs, sequences | fails on `10.` (Finding 1); every other listed input gets a message and no result |
| C5 | 320, 360, 768, 1280 px × 5 states; markup | no sideways scroll, no element past the viewport; labels, roles and `inputmode` as required (E5). Real phone UNVERIFIED |
| C6 | JS disabled | the sentence shows (E5); see Finding 2 |
| C7 | `fetch`, XHR, image, beacon, WebSocket; storage; reload by script and by real keys | all 5 blocked by CSP; storage empty; fields empty after reload (E5, E7); no storage call in source (E1). Firefox UNVERIFIED |
| C8 | not run | no delivery report is in my scope |

### Commands and complete output

**E1. Locate the commit, hash the files, search the source**

Commands:

````
cd ~/repos/devin && git status -sb | head; git remote -v; git branch -a | head -20; git log --oneline -3
git fetch origin devin/hinshitsu-build 2>&1 | tail -2; git log origin/devin/hinshitsu-build --format='%H %ci %s' | grep -n "example run: WU-1 swarm scopes" | head; git rev-parse HEAD origin/devin/hinshitsu-build; git status --porcelain | head
wc -lc skills/hinshitsu/example/run/review/index.html; sha256sum skills/hinshitsu/example/run/review/index.html skills/hinshitsu/example/index.html
google-chrome --version
grep -n -i -E "localStorage|sessionStorage|cookie|indexedDB|caches|fetch|XMLHttp|sendBeacon|WebSocket|src=|href=|url\(|import" skills/hinshitsu/example/run/review/index.html; echo grep_exit=$?
````

Output (I leave out the `ls` listings, the Chrome process list and the `cat -n` print of the 167 lines):

````
## devin/hinshitsu-build...origin/devin/hinshitsu-build
origin	https://git-manager.devin.ai/proxy/github.com/CatCorner22/devin (fetch)
origin	https://git-manager.devin.ai/proxy/github.com/CatCorner22/devin (push)
* devin/hinshitsu-build
  remotes/origin/HEAD -> origin/devin/hinshitsu-build
  remotes/origin/devin/hinshitsu-build
d125232 example run: WU-1 swarm scopes; the copy under review
66637eb example run: LAUNCH E-103, seeder
b24ac5f example run: WU-1 ledger rows, the review copy and the seeder's scope
From https://git-manager.devin.ai/proxy/github.com/CatCorner22/devin
 * branch            devin/hinshitsu-build -> FETCH_HEAD
1:d125232c69fc9c85fae844443dc5053e7e6fa30d 2026-11-18 16:32:19 +0000 example run: WU-1 swarm scopes; the copy under review
d125232c69fc9c85fae844443dc5053e7e6fa30d
d125232c69fc9c85fae844443dc5053e7e6fa30d
 167 7123 skills/hinshitsu/example/run/review/index.html
68a527cccb35991429c8bbee059448a042af80b62eeb6c91a8ce146fc54d57e5  skills/hinshitsu/example/run/review/index.html
11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184  skills/hinshitsu/example/index.html
Google Chrome for Testing 156.0.8078.47 
grep_exit=1
````

**E2. Compare the review copy with the file that C1 names**

Command:

````
cd ~/repos/devin && cmp skills/hinshitsu/example/run/review/index.html skills/hinshitsu/example/index.html; diff skills/hinshitsu/example/index.html skills/hinshitsu/example/run/review/index.html
````

Output:

````
skills/hinshitsu/example/run/review/index.html skills/hinshitsu/example/index.html differ: byte 3336, line 74
74c74
<   var m = /^(\d+)(?:\.(\d{1,2}))?$/.exec(s);
---
>   var m = /^(\d+)(?:\.(\d{0,2}))?$/.exec(s);
````

Note on E6: the first run of `t3.js` reported 7,435 mismatches. All came from a bug in my script: my filter for payment lines also matched the page's note line "Your group decides who pays the extra cent." I fixed the filter and ran the whole sweep again. Run 2 is the valid one. I print both.

Note on E5: the line "after Ctrl+R with error state" in `t2.js` is not evidence. A scripted `Ctrl+R` does not reload the page in this setup, so the fields kept their values. E7 repeats the test with real key presses and checks, with a marker, that the reload happened. The "bfcache Chrome" line shows that the back/forward cache was not hit, so that path is UNVERIFIED.

**E3. `lib.js`, the helpers that every script uses**

Command:

````
cat ~/audit/lib.js
````

Output:

````
const { chromium } = require('playwright');
const URL = 'file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html';
async function connect() { return chromium.connectOverCDP('http://127.0.0.1:29229'); }
async function state(page) {
  return page.evaluate(() => {
    const g = id => document.getElementById(id);
    const r = g('result');
    return {
      vals: ['bill','tip','people'].map(n => g(n).value),
      err: ['bill','tip','people'].map(n => g(n + '-error').textContent),
      invalid: ['bill','tip','people'].map(n => g(n).getAttribute('aria-invalid')),
      resultShown: !r.hidden && getComputedStyle(r).display !== 'none',
      lines: Array.from(r.querySelectorAll('p')).map(p => p.textContent),
    };
  });
}
async function typeInto(page, id, text) {
  await page.click('#' + id);
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Delete');
  if (text !== '') await page.keyboard.type(text);
}
async function typeAll(page, b, t, p) {
  await typeInto(page, 'bill', b); await typeInto(page, 'tip', t); await typeInto(page, 'people', p);
  await page.click('h1');
}
module.exports = { connect, state, typeInto, typeAll, URL };
````

**E4. `t1.js` source: C1, C2, C4 inputs, sequences, huge inputs, live-region changes**

Command:

````
cat ~/audit/t1.js
````

Output:

````
const { connect, state, typeInto, typeAll, URL } = require('./lib');
(async () => {
  const browser = await connect();
  console.log('browser version:', browser.version());
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const reqs = [], cons = [];
  page.on('request', r => reqs.push(r.method() + ' ' + r.url()));
  page.on('console', m => cons.push(m.type() + ': ' + m.text()));
  page.on('pageerror', e => cons.push('pageerror: ' + e.message));
  await page.goto(URL); await page.waitForTimeout(500);
  console.log('C1 requests:', JSON.stringify(reqs));
  console.log('C1 UA:', await page.evaluate(() => navigator.userAgent));
  console.log('C4 first open:', JSON.stringify(await state(page)), 'guide:', JSON.stringify(await page.textContent('#guide')), 'activeElement:', await page.evaluate(() => document.activeElement.tagName));
  console.log('visible text first open:', JSON.stringify(await page.evaluate(() => document.body.innerText)));

  console.log('\n== C2 tests (keyboard typed) ==');
  for (const [b,t,p] of [['100.00','18','4'],['0.30','15','1'],['10.10','15','1'],['12.25','18','1'],['10.00','0','3'],['1000000.00','100','100'],['0.01','0','100'],['0.05','0','3'],['0.01','100','1'],['0.01','50','1'],['0.01','49','1'],['1000000','100','1'],['1000000.00','100','99']]) {
    await typeAll(page, b, t, p);
    const s = await state(page);
    console.log(JSON.stringify([b,t,p]), '=>', s.resultShown ? JSON.stringify(s.lines) : 'NO RESULT ' + JSON.stringify(s.err));
  }

  console.log('\n== C4 bill inputs (tip 18, people 4 valid) ==');
  const bills = ['', '   ', 'abc', '12,50', '1,000.00', '1e3', '10.', '.5', '$12.50', '€12', '12.50$', '-5', '-0.01', '0', '0.0', '0.00', '000', '1000000.01', '1000001', '10000000', '99999999999999999999999', '1.234', '0.001', '12.500', ' 12.50 ', '\u00a012.50\u00a0', '12.50\u200b', '\u200b12.50', '１２.５０', '١٢', '12 .50', '1 000', '+12.50', '12..5', '1.2.3', '.', '..', '0x10', 'Infinity', 'NaN', '1_000', '12．50', '12٫50', '12،50', '12，50', '0012.5', '0000000001000000.00', '1000000.0', '1000000.', '0.', '00.', '5.', ' 7. ', '<img src=x onerror=alert(1)>', '"><script>alert(1)</script>', '１０', '12.5e0', '12.5 ', '1'.repeat(400), '0'.repeat(400)+'5', '0.1', '0.10', '0.01', '0.010'];
  for (const b of bills) {
    await typeAll(page, b, '18', '4');
    const s = await state(page);
    console.log(JSON.stringify(b.length > 60 ? b.slice(0,20)+'…('+b.length+' chars)' : b), '=>', s.resultShown ? 'RESULT ' + JSON.stringify(s.lines) : 'no result; bill-error=' + JSON.stringify(s.err[0]) + ' aria-invalid=' + s.invalid[0]);
  }
  console.log('\n== C4 tip inputs (bill 100.00, people 4) ==');
  const wholes = ['', '  ', 'abc', '18.0', '1e1', '+4', '4.', '-1', '101', '100', '0', '00', '000', '0100', '018', '1,0', '18%', '18 %', ' 18 ', '１８', '1 8', '0x12', '18.5', '.5', '1000', '9'.repeat(400), '0'.repeat(400)+'7', '\u200b18', '-0', '१८', 'eighteen', '1e2'];
  for (const t of wholes) {
    await typeAll(page, '100.00', t, '4');
    const s = await state(page);
    console.log(JSON.stringify(t.length > 60 ? t.slice(0,20)+'…('+t.length+' chars)' : t), '=>', s.resultShown ? 'RESULT ' + JSON.stringify(s.lines) : 'no result; tip-error=' + JSON.stringify(s.err[1]));
  }
  console.log('\n== C4 people inputs (bill 100.00, tip 18) ==');
  for (const p of wholes) {
    await typeAll(page, '100.00', '18', p);
    const s = await state(page);
    console.log(JSON.stringify(p.length > 60 ? p.slice(0,20)+'…('+p.length+' chars)' : p), '=>', s.resultShown ? 'RESULT ' + JSON.stringify(s.lines) : 'no result; people-error=' + JSON.stringify(s.err[2]));
  }

  console.log('\n== sequences ==');
  await page.reload(); await page.waitForTimeout(300);
  console.log('after reload:', JSON.stringify(await state(page)));
  // focus then leave, empty
  await page.click('#bill'); console.log('focus bill, nothing typed:', JSON.stringify((await state(page)).err));
  await page.keyboard.press('Tab'); console.log('tab away from empty bill:', JSON.stringify((await state(page)).err));
  await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); console.log('tab through all:', JSON.stringify((await state(page)).err));
  await page.reload(); await page.waitForTimeout(300);
  // out of order: people first
  await typeInto(page, 'people', '4'); console.log('people only:', JSON.stringify(await state(page)));
  await typeInto(page, 'tip', '18'); await typeInto(page, 'bill', '1');
  console.log('typed "1" in bill, focus still in bill:', JSON.stringify(await state(page)));
  await page.keyboard.type('0'); await page.keyboard.type('.'); 
  console.log('mid-typing "10." (focus still in bill):', JSON.stringify(await state(page)));
  await page.keyboard.type('5'); console.log('"10.5":', JSON.stringify((await state(page)).lines));
  await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace');
  console.log('bill deleted to empty:', JSON.stringify(await state(page)));
  // Enter key
  await page.keyboard.type('20'); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  console.log('after Enter: url=', page.url(), JSON.stringify(await state(page)));
  // paste with newline and big paste
  await page.click('#bill'); await page.keyboard.press('Control+a');
  await page.evaluate(() => { const i = document.getElementById('bill'); i.focus(); document.execCommand('insertText', false, '12.50\n'); });
  console.log('insertText "12.50\\n":', JSON.stringify(await state(page)));
  const t0 = Date.now();
  await page.evaluate(() => { const i = document.getElementById('bill'); i.focus(); i.select(); document.execCommand('insertText', false, '9'.repeat(5000000)); });
  const s5 = await state(page);
  console.log('5,000,000-digit insert took ms:', Date.now() - t0, 'len', s5.vals[0].length, 'err', JSON.stringify(s5.err), 'shown', s5.resultShown);
  const t1 = Date.now();
  await page.evaluate(() => { const i = document.getElementById('bill'); i.focus(); i.select(); document.execCommand('insertText', false, '0'.repeat(5000000) + '7.5'); });
  const s6 = await state(page);
  console.log('5,000,000 zeros + 7.5 took ms:', Date.now() - t1, 'err', JSON.stringify(s6.err), 'shown', s6.resultShown, JSON.stringify(s6.lines));
  console.log('scrollWidth vs innerWidth with 5MB value:', await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]));
  // rapid repeated typing
  await page.reload(); await page.waitForTimeout(300);
  await typeAll(page, '100.00', '18', '4');
  for (let i = 0; i < 200; i++) { await page.keyboard.press('Tab'); }
  console.log('after 200 tabs:', JSON.stringify(await state(page)));
  // mutation of unchanged error on other-field keystrokes
  await typeAll(page, 'abc', '18', '4');
  const muts = await page.evaluate(async () => {
    let n = 0, rn = 0; const mo = new MutationObserver(l => n += l.length); mo.observe(document.getElementById('bill-error'), { childList: true, characterData: true, subtree: true });
    const t = document.getElementById('tip'); t.focus();
    for (const v of ['1','12','1','15']) { t.value = v; t.dispatchEvent(new Event('input', { bubbles: true })); }
    await new Promise(r => setTimeout(r, 50)); mo.disconnect(); return n;
  });
  console.log('mutation records on unchanged bill-error during 4 tip input events:', muts);
  await typeAll(page, '100.00', '18', '4');
  const muts2 = await page.evaluate(async () => {
    let n = 0; const mo = new MutationObserver(l => n += l.length); mo.observe(document.getElementById('result'), { childList: true, attributes: true, subtree: true });
    document.getElementById('tip').focus(); document.getElementById('people').focus(); document.getElementById('bill').focus(); document.getElementById('bill').blur();
    await new Promise(r => setTimeout(r, 50)); mo.disconnect(); return n;
  });
  console.log('mutation records on #result while only moving focus (no value change):', muts2);
  // order of content insertion vs unhide
  await page.reload(); await page.waitForTimeout(300);
  const order = await page.evaluate(async () => {
    const log = []; const r = document.getElementById('result');
    const mo = new MutationObserver(l => l.forEach(m => log.push(m.type === 'attributes' ? 'attr:' + m.attributeName + ' hidden=' + r.hidden : 'childList +' + m.addedNodes.length + ' -' + m.removedNodes.length)));
    mo.observe(r, { childList: true, attributes: true });
    for (const [id, v] of [['bill','100.00'],['tip','18'],['people','4']]) { const i = document.getElementById(id); i.value = v; i.dispatchEvent(new Event('input', { bubbles: true })); }
    await new Promise(r => setTimeout(r, 50)); mo.disconnect(); return log;
  });
  console.log('first-result mutation order:', JSON.stringify(order));
  console.log('\nconsole/page errors:', JSON.stringify(cons));
  console.log('all requests in session:', JSON.stringify(reqs));
  await ctx.close(); await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
````

**E4. `t1.js` run**

Command:

````
cd ~/audit && node t1.js
````

Output:

````
browser version: 156.0.8078.47
C1 requests: ["GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html"]
C1 UA: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36; Devin/1.0; +devin.ai
C4 first open: {"vals":["","",""],"err":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]} guide: "Type the bill, the tip and the number of people. The split shows below." activeElement: BODY
visible text first open: "Split the bill\n\nType the bill, the tip and the number of people. The split shows below.\n\nBill total, tax included\n\nTip percent\n\nNumber of people"

== C2 tests (keyboard typed) ==
["100.00","18","4"] => ["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]
["0.30","15","1"] => ["Bill: 0.30","Tip: 15 percent","People: 1","Tip amount: 0.05","Total: 0.35","1 person pays 0.35"]
["10.10","15","1"] => ["Bill: 10.10","Tip: 15 percent","People: 1","Tip amount: 1.52","Total: 11.62","1 person pays 11.62"]
["12.25","18","1"] => ["Bill: 12.25","Tip: 18 percent","People: 1","Tip amount: 2.21","Total: 14.46","1 person pays 14.46"]
["10.00","0","3"] => ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."]
["1000000.00","100","100"] => ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"]
["0.01","0","100"] => ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."]
["0.05","0","3"] => ["Bill: 0.05","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 0.05","2 people pay 0.02 each","1 person pays 0.01","Your group decides who pays the extra cent."]
["0.01","100","1"] => ["Bill: 0.01","Tip: 100 percent","People: 1","Tip amount: 0.01","Total: 0.02","1 person pays 0.02"]
["0.01","50","1"] => ["Bill: 0.01","Tip: 50 percent","People: 1","Tip amount: 0.01","Total: 0.02","1 person pays 0.02"]
["0.01","49","1"] => ["Bill: 0.01","Tip: 49 percent","People: 1","Tip amount: 0.00","Total: 0.01","1 person pays 0.01"]
["1000000","100","1"] => ["Bill: 1000000.00","Tip: 100 percent","People: 1","Tip amount: 1000000.00","Total: 2000000.00","1 person pays 2000000.00"]
["1000000.00","100","99"] => ["Bill: 1000000.00","Tip: 100 percent","People: 99","Tip amount: 1000000.00","Total: 2000000.00","2 people pay 20202.03 each","97 people pay 20202.02 each","Your group decides who pays the extra cent."]

== C4 bill inputs (tip 18, people 4 valid) ==
"" => no result; bill-error="Enter the bill total." aria-invalid=true
"   " => no result; bill-error="Enter the bill total." aria-invalid=true
"abc" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12,50" => no result; bill-error="Use a dot, not a comma. Example: 12.50" aria-invalid=true
"1,000.00" => no result; bill-error="Use a dot, not a comma. Example: 12.50" aria-invalid=true
"1e3" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"10." => RESULT ["Bill: 10.00","Tip: 18 percent","People: 4","Tip amount: 1.80","Total: 11.80","4 people pay 2.95 each"]
".5" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"$12.50" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"€12" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12.50$" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"-5" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"-0.01" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"0" => no result; bill-error="Enter an amount above 0." aria-invalid=true
"0.0" => no result; bill-error="Enter an amount above 0." aria-invalid=true
"0.00" => no result; bill-error="Enter an amount above 0." aria-invalid=true
"000" => no result; bill-error="Enter an amount above 0." aria-invalid=true
"1000000.01" => no result; bill-error="Enter 1000000.00 or less." aria-invalid=true
"1000001" => no result; bill-error="Enter 1000000.00 or less." aria-invalid=true
"10000000" => no result; bill-error="Enter 1000000.00 or less." aria-invalid=true
"99999999999999999999999" => no result; bill-error="Enter 1000000.00 or less." aria-invalid=true
"1.234" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"0.001" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12.500" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
" 12.50 " => RESULT ["Bill: 12.50","Tip: 18 percent","People: 4","Tip amount: 2.25","Total: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the extra cent."]
" 12.50 " => RESULT ["Bill: 12.50","Tip: 18 percent","People: 4","Tip amount: 2.25","Total: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the extra cent."]
"12.50​" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"​12.50" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"１２.５０" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"١٢" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12 .50" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"1 000" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"+12.50" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12..5" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"1.2.3" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"." => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
".." => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"0x10" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"Infinity" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"NaN" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"1_000" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12．50" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12٫50" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12،50" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12，50" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"0012.5" => RESULT ["Bill: 12.50","Tip: 18 percent","People: 4","Tip amount: 2.25","Total: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the extra cent."]
"0000000001000000.00" => RESULT ["Bill: 1000000.00","Tip: 18 percent","People: 4","Tip amount: 180000.00","Total: 1180000.00","4 people pay 295000.00 each"]
"1000000.0" => RESULT ["Bill: 1000000.00","Tip: 18 percent","People: 4","Tip amount: 180000.00","Total: 1180000.00","4 people pay 295000.00 each"]
"1000000." => RESULT ["Bill: 1000000.00","Tip: 18 percent","People: 4","Tip amount: 180000.00","Total: 1180000.00","4 people pay 295000.00 each"]
"0." => no result; bill-error="Enter an amount above 0." aria-invalid=true
"00." => no result; bill-error="Enter an amount above 0." aria-invalid=true
"5." => RESULT ["Bill: 5.00","Tip: 18 percent","People: 4","Tip amount: 0.90","Total: 5.90","2 people pay 1.48 each","2 people pay 1.47 each","Your group decides who pays the extra cent."]
" 7. " => RESULT ["Bill: 7.00","Tip: 18 percent","People: 4","Tip amount: 1.26","Total: 8.26","2 people pay 2.07 each","2 people pay 2.06 each","Your group decides who pays the extra cent."]
"<img src=x onerror=alert(1)>" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"\"><script>alert(1)</script>" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"１０" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12.5e0" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true
"12.5 " => RESULT ["Bill: 12.50","Tip: 18 percent","People: 4","Tip amount: 2.25","Total: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the extra cent."]
"11111111111111111111…(400 chars)" => no result; bill-error="Enter 1000000.00 or less." aria-invalid=true
"00000000000000000000…(401 chars)" => RESULT ["Bill: 5.00","Tip: 18 percent","People: 4","Tip amount: 0.90","Total: 5.90","2 people pay 1.48 each","2 people pay 1.47 each","Your group decides who pays the extra cent."]
"0.1" => RESULT ["Bill: 0.10","Tip: 18 percent","People: 4","Tip amount: 0.02","Total: 0.12","4 people pay 0.03 each"]
"0.10" => RESULT ["Bill: 0.10","Tip: 18 percent","People: 4","Tip amount: 0.02","Total: 0.12","4 people pay 0.03 each"]
"0.01" => RESULT ["Bill: 0.01","Tip: 18 percent","People: 4","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","3 people pay 0.00 each","Your group decides who pays the extra cent."]
"0.010" => no result; bill-error="Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" aria-invalid=true

== C4 tip inputs (bill 100.00, people 4) ==
"" => no result; tip-error="Enter the tip percent. Enter 0 for no tip."
"  " => no result; tip-error="Enter the tip percent. Enter 0 for no tip."
"abc" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"18.0" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"1e1" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"+4" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"4." => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"-1" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"101" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"100" => RESULT ["Bill: 100.00","Tip: 100 percent","People: 4","Tip amount: 100.00","Total: 200.00","4 people pay 50.00 each"]
"0" => RESULT ["Bill: 100.00","Tip: 0 percent","People: 4","Tip amount: 0.00","Total: 100.00","4 people pay 25.00 each"]
"00" => RESULT ["Bill: 100.00","Tip: 0 percent","People: 4","Tip amount: 0.00","Total: 100.00","4 people pay 25.00 each"]
"000" => RESULT ["Bill: 100.00","Tip: 0 percent","People: 4","Tip amount: 0.00","Total: 100.00","4 people pay 25.00 each"]
"0100" => RESULT ["Bill: 100.00","Tip: 100 percent","People: 4","Tip amount: 100.00","Total: 200.00","4 people pay 50.00 each"]
"018" => RESULT ["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]
"1,0" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"18%" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"18 %" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
" 18 " => RESULT ["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]
"１８" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"1 8" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"0x12" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"18.5" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
".5" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"1000" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"99999999999999999999…(400 chars)" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"00000000000000000000…(401 chars)" => RESULT ["Bill: 100.00","Tip: 7 percent","People: 4","Tip amount: 7.00","Total: 107.00","4 people pay 26.75 each"]
"​18" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"-0" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"१८" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"eighteen" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."
"1e2" => no result; tip-error="Enter a whole number from 0 to 100, in digits only."

== C4 people inputs (bill 100.00, tip 18) ==
"" => no result; people-error="Enter the number of people."
"  " => no result; people-error="Enter the number of people."
"abc" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"18.0" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"1e1" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"+4" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"4." => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"-1" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"101" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"100" => RESULT ["Bill: 100.00","Tip: 18 percent","People: 100","Tip amount: 18.00","Total: 118.00","100 people pay 1.18 each"]
"0" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"00" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"000" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"0100" => RESULT ["Bill: 100.00","Tip: 18 percent","People: 100","Tip amount: 18.00","Total: 118.00","100 people pay 1.18 each"]
"018" => RESULT ["Bill: 100.00","Tip: 18 percent","People: 18","Tip amount: 18.00","Total: 118.00","10 people pay 6.56 each","8 people pay 6.55 each","Your group decides who pays the extra cent."]
"1,0" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"18%" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"18 %" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
" 18 " => RESULT ["Bill: 100.00","Tip: 18 percent","People: 18","Tip amount: 18.00","Total: 118.00","10 people pay 6.56 each","8 people pay 6.55 each","Your group decides who pays the extra cent."]
"１８" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"1 8" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"0x12" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"18.5" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
".5" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"1000" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"99999999999999999999…(400 chars)" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"00000000000000000000…(401 chars)" => RESULT ["Bill: 100.00","Tip: 18 percent","People: 7","Tip amount: 18.00","Total: 118.00","5 people pay 16.86 each","2 people pay 16.85 each","Your group decides who pays the extra cent."]
"​18" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"-0" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"१८" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"eighteen" => no result; people-error="Enter a whole number from 1 to 100, in digits only."
"1e2" => no result; people-error="Enter a whole number from 1 to 100, in digits only."

== sequences ==
after reload: {"vals":["","",""],"err":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]}
focus bill, nothing typed: ["","",""]
tab away from empty bill: ["Enter the bill total.","",""]
tab through all: ["Enter the bill total.","Enter the tip percent. Enter 0 for no tip.","Enter the number of people."]
people only: {"vals":["","","4"],"err":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]}
typed "1" in bill, focus still in bill: {"vals":["1","18","4"],"err":["","",""],"invalid":[null,null,null],"resultShown":true,"lines":["Bill: 1.00","Tip: 18 percent","People: 4","Tip amount: 0.18","Total: 1.18","2 people pay 0.30 each","2 people pay 0.29 each","Your group decides who pays the extra cent."]}
mid-typing "10." (focus still in bill): {"vals":["10.","18","4"],"err":["","",""],"invalid":[null,null,null],"resultShown":true,"lines":["Bill: 10.00","Tip: 18 percent","People: 4","Tip amount: 1.80","Total: 11.80","4 people pay 2.95 each"]}
"10.5": ["Bill: 10.50","Tip: 18 percent","People: 4","Tip amount: 1.89","Total: 12.39","3 people pay 3.10 each","1 person pays 3.09","Your group decides who pays the extra cent."]
bill deleted to empty: {"vals":["","18","4"],"err":["Enter the bill total.","",""],"invalid":["true",null,null],"resultShown":false,"lines":[]}
after Enter: url= file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html {"vals":["20","18","4"],"err":["","",""],"invalid":[null,null,null],"resultShown":true,"lines":["Bill: 20.00","Tip: 18 percent","People: 4","Tip amount: 3.60","Total: 23.60","4 people pay 5.90 each"]}
insertText "12.50\n": {"vals":["12.50","18","4"],"err":["","",""],"invalid":[null,null,null],"resultShown":true,"lines":["Bill: 12.50","Tip: 18 percent","People: 4","Tip amount: 2.25","Total: 14.75","3 people pay 3.69 each","1 person pays 3.68","Your group decides who pays the extra cent."]}
5,000,000-digit insert took ms: 1362 len 5000000 err ["Enter 1000000.00 or less.","",""] shown false
5,000,000 zeros + 7.5 took ms: 1108 err ["","",""] shown true ["Bill: 7.50","Tip: 18 percent","People: 4","Tip amount: 1.35","Total: 8.85","1 person pays 2.22","3 people pay 2.21 each","Your group decides who pays the extra cent."]
scrollWidth vs innerWidth with 5MB value: [ 1280, 1280 ]
after 200 tabs: {"vals":["100.00","18","4"],"err":["","",""],"invalid":[null,null,null],"resultShown":true,"lines":["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]}
mutation records on unchanged bill-error during 4 tip input events: 4
mutation records on #result while only moving focus (no value change): 21
first-result mutation order: ["attr:hidden hidden=false","attr:hidden hidden=false","childList +1 -0","childList +1 -0","childList +1 -0","childList +1 -0","childList +1 -0","childList +1 -0","attr:hidden hidden=false"]

console/page errors: []
all requests in session: ["GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html","GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html","GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html","GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html","GET file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html"]
````

**E5. `t2.js` source: C5 widths, markup, C7, C6, back button**

Command:

````
cat ~/audit/t2.js
````

Output:

````
const { connect, state, typeInto, typeAll, URL } = require('./lib');
const { chromium } = require('playwright');
(async () => {
  const browser = await connect();
  // C5 widths
  for (const w of [320, 360, 768, 1280]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(URL); await page.waitForTimeout(200);
    const measure = async label => {
      const m = await page.evaluate(() => {
        const de = document.documentElement; const over = [];
        document.querySelectorAll('body *').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.right > innerWidth + 0.5 || r.left < -0.5)) over.push(e.tagName + '#' + e.id + ' ' + r.left.toFixed(1) + '..' + r.right.toFixed(1)); if (e.scrollWidth > e.clientWidth + 1 && e.tagName !== 'INPUT' && getComputedStyle(e).display !== 'inline') over.push('clipped ' + e.tagName + '#' + e.id + ' sw=' + e.scrollWidth + ' cw=' + e.clientWidth); });
        return { innerWidth, scrollWidth: de.scrollWidth, bodyScrollWidth: document.body.scrollWidth, over };
      });
      await page.evaluate(() => window.scrollTo(5000, 0));
      const sx = await page.evaluate(() => window.scrollX); await page.evaluate(() => window.scrollTo(0, 0));
      console.log('width', w, label, JSON.stringify(m), 'scrollX after scrollTo(5000,0):', sx);
      await page.screenshot({ path: `shots/w${w}-${label}.png`, fullPage: true });
    };
    await measure('first');
    await typeAll(page, '1,000.00', '18.0', '0'); await measure('errors');
    await typeAll(page, '1000000.00', '100', '99'); await measure('result-max');
    await typeAll(page, '10.00', '0', '3'); await measure('result-2line');
    await typeAll(page, '9'.repeat(300), '9'.repeat(300), '9'.repeat(300)); await measure('long-input');
    const inputClip = await page.evaluate(() => ['bill','tip','people'].map(n => { const i = document.getElementById(n); return [i.scrollWidth, i.clientWidth]; }));
    console.log('  input scrollWidth/clientWidth with 300 digits:', JSON.stringify(inputClip));
    await ctx.close();
  }
  // markup facts
  {
    const ctx = await browser.newContext(); const page = await ctx.newPage(); await page.goto(URL);
    console.log('markup:', JSON.stringify(await page.evaluate(() => ({
      inputs: Array.from(document.querySelectorAll('input')).map(i => ({ id: i.id, type: i.type, inputmode: i.getAttribute('inputmode'), autocomplete: i.getAttribute('autocomplete'), name: i.getAttribute('name'), label: (document.querySelector('label[for=' + i.id + ']') || {}).textContent, labelVisible: !!(document.querySelector('label[for=' + i.id + ']') || {}).offsetHeight, describedby: i.getAttribute('aria-describedby') })),
      errRoles: Array.from(document.querySelectorAll('.error')).map(e => [e.id, e.getAttribute('role'), e.getAttribute('aria-live')]),
      result: [document.getElementById('result').getAttribute('role'), document.getElementById('result').getAttribute('aria-live'), document.getElementById('result').hidden],
      csp: document.querySelector('meta[http-equiv]').outerHTML,
      formAutocomplete: document.getElementById('form').getAttribute('autocomplete'),
    })), null, 1));
    // C7
    const cons = []; page.on('console', m => cons.push(m.type() + ': ' + m.text()));
    const reqs = []; page.on('request', r => reqs.push(r.url())); page.on('requestfailed', r => reqs.push('FAILED ' + r.url() + ' ' + (r.failure() || {}).errorText));
    const f = await page.evaluate(() => fetch('https://example.com').then(r => 'FETCH OK ' + r.status, e => 'REJECTED: ' + e.name + ': ' + e.message));
    console.log('C7 fetch:', f);
    const others = await page.evaluate(async () => {
      const out = {};
      out.xhr = await new Promise(res => { try { const x = new XMLHttpRequest(); x.open('GET', 'https://example.com'); x.onload = () => res('LOADED ' + x.status); x.onerror = () => res('error'); x.send(); } catch (e) { res('threw ' + e.message); } });
      out.img = await new Promise(res => { const i = new Image(); i.onload = () => res('LOADED'); i.onerror = () => res('error'); i.src = 'https://example.com/favicon.ico?x=1'; setTimeout(() => res('timeout'), 3000); });
      try { out.beacon = navigator.sendBeacon('https://example.com', 'x'); } catch (e) { out.beacon = 'threw ' + e.message; }
      out.ws = await new Promise(res => { try { const w = new WebSocket('wss://example.com'); w.onopen = () => res('OPEN'); w.onerror = () => res('error'); setTimeout(() => res('timeout'), 3000); } catch (e) { res('threw ' + e.name); } });
      out.storage = {}; for (const k of ['localStorage', 'sessionStorage']) { try { out.storage[k] = window[k].length; } catch (e) { out.storage[k] = 'threw ' + e.name; } }
      out.cookie = document.cookie;
      try { out.idb = (await indexedDB.databases()).length; } catch (e) { out.idb = 'threw ' + e.name; }
      return out;
    });
    console.log('C7 other channels:', JSON.stringify(others));
    console.log('C7 console:', JSON.stringify(cons)); console.log('C7 requests:', JSON.stringify(reqs));
    // reload clears
    await typeAll(page, '100.00', '18', '4'); console.log('before reload:', JSON.stringify((await state(page)).vals));
    await page.reload(); await page.waitForTimeout(300); console.log('after reload:', JSON.stringify(await state(page)));
    await typeAll(page, 'abc', '18', '4'); await page.keyboard.press('Control+r'); await page.waitForTimeout(800); console.log('after Ctrl+R with error state:', JSON.stringify(await state(page)));
    // back button (this Chrome runs with --disable-back-forward-cache)
    await typeAll(page, '100.00', '18', '4'); await page.goto('about:blank'); await page.goBack(); await page.waitForTimeout(500);
    console.log('after navigate away + back:', JSON.stringify(await state(page)));
    await ctx.close();
  }
  // C6 JS off
  {
    const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } }); const page = await ctx.newPage();
    await page.goto(URL); await page.waitForTimeout(300);
    await page.screenshot({ path: 'shots/js-off-1280.png', fullPage: true });
    await page.click('#bill'); await page.keyboard.type('100.00'); await page.click('#tip'); await page.keyboard.type('18'); await page.click('#people'); await page.keyboard.type('4'); await page.keyboard.press('Enter'); await page.waitForTimeout(500);
    await page.screenshot({ path: 'shots/js-off-typed.png', fullPage: true });
    console.log('C6 JS off url after Enter:', page.url());
    await ctx.close();
    // Text via CDP on a second page (evaluate is unavailable with JS off in Playwright; use DOM snapshot through a JS-enabled reader of noscript is not equivalent) -> read through accessibility snapshot
    const ctx2 = await browser.newContext({ javaScriptEnabled: false }); const p2 = await ctx2.newPage(); await p2.goto(URL);
    const cdp = await ctx2.newCDPSession(p2);
    const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
    const texts = []; const walk = (n, inNoscript) => { if (n.nodeType === 3 && n.nodeValue.trim() && !['STYLE','SCRIPT','TITLE'].includes(inNoscript.tag)) texts.push((inNoscript.ns ? '[noscript] ' : '') + n.nodeValue.trim()); (n.children || []).forEach(c => walk(c, { ns: inNoscript.ns || n.nodeName === 'NOSCRIPT', tag: n.nodeType === 1 ? n.nodeName : inNoscript.tag })); };
    walk(root, { ns: false, tag: '' });
    console.log('C6 JS-off DOM text nodes:', JSON.stringify(texts));
    const ax = await cdp.send('Accessibility.getFullAXTree');
    console.log('C6 JS-off AX names:', JSON.stringify(ax.nodes.filter(n => n.name && n.name.value && !n.ignored).map(n => n.role.value + ':' + n.name.value)));
    await ctx2.close();
  }
  await browser.close();
  // bfcache-enabled separate Chrome
  try {
    const b2 = await chromium.launch({ executablePath: '/opt/.devin/chrome/chrome/linux-156.0.8078.47/chrome-linux64/chrome', headless: true, ignoreDefaultArgs: ['--disable-back-forward-cache'], args: ['--no-sandbox'] });
    const page = await (await b2.newContext()).newPage();
    await page.goto(URL); await typeAll(page, '100.00', '18', '4');
    await page.evaluate(() => { window.__marker = 1; window.addEventListener('pageshow', e => { window.__persisted = e.persisted; }); });
    await page.goto('data:text/html,<p>other</p>'); await page.goBack(); await page.waitForTimeout(500);
    console.log('bfcache Chrome', b2.version(), 'back: marker(kept if bfcache hit)=', await page.evaluate(() => [window.__marker, window.__persisted]), JSON.stringify(await state(page)));
    await b2.close();
  } catch (e) { console.log('bfcache test error:', e.message.split('\n')[0]); }
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
````

**E5. `t2.js` run**

Command:

````
cd ~/audit && node t2.js
````

Output:

````
width 320 first {"innerWidth":320,"scrollWidth":320,"bodyScrollWidth":320,"over":[]} scrollX after scrollTo(5000,0): 0
width 320 errors {"innerWidth":320,"scrollWidth":320,"bodyScrollWidth":320,"over":[]} scrollX after scrollTo(5000,0): 0
width 320 result-max {"innerWidth":320,"scrollWidth":305,"bodyScrollWidth":305,"over":[]} scrollX after scrollTo(5000,0): 0
width 320 result-2line {"innerWidth":320,"scrollWidth":320,"bodyScrollWidth":320,"over":[]} scrollX after scrollTo(5000,0): 0
width 320 long-input {"innerWidth":320,"scrollWidth":320,"bodyScrollWidth":320,"over":[]} scrollX after scrollTo(5000,0): 0
  input scrollWidth/clientWidth with 300 digits: [[2996,284],[2996,284],[2996,284]]
width 360 first {"innerWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"over":[]} scrollX after scrollTo(5000,0): 0
width 360 errors {"innerWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"over":[]} scrollX after scrollTo(5000,0): 0
width 360 result-max {"innerWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"over":[]} scrollX after scrollTo(5000,0): 0
width 360 result-2line {"innerWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"over":[]} scrollX after scrollTo(5000,0): 0
width 360 long-input {"innerWidth":360,"scrollWidth":360,"bodyScrollWidth":360,"over":[]} scrollX after scrollTo(5000,0): 0
  input scrollWidth/clientWidth with 300 digits: [[2996,324],[2996,324],[2996,324]]
width 768 first {"innerWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"over":[]} scrollX after scrollTo(5000,0): 0
width 768 errors {"innerWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"over":[]} scrollX after scrollTo(5000,0): 0
width 768 result-max {"innerWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"over":[]} scrollX after scrollTo(5000,0): 0
width 768 result-2line {"innerWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"over":[]} scrollX after scrollTo(5000,0): 0
width 768 long-input {"innerWidth":768,"scrollWidth":768,"bodyScrollWidth":768,"over":[]} scrollX after scrollTo(5000,0): 0
  input scrollWidth/clientWidth with 300 digits: [[2996,476],[2996,476],[2996,476]]
width 1280 first {"innerWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"over":[]} scrollX after scrollTo(5000,0): 0
width 1280 errors {"innerWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"over":[]} scrollX after scrollTo(5000,0): 0
width 1280 result-max {"innerWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"over":[]} scrollX after scrollTo(5000,0): 0
width 1280 result-2line {"innerWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"over":[]} scrollX after scrollTo(5000,0): 0
width 1280 long-input {"innerWidth":1280,"scrollWidth":1280,"bodyScrollWidth":1280,"over":[]} scrollX after scrollTo(5000,0): 0
  input scrollWidth/clientWidth with 300 digits: [[2996,476],[2996,476],[2996,476]]
markup: {
 "inputs": [
  {
   "id": "bill",
   "type": "text",
   "inputmode": "decimal",
   "autocomplete": "off",
   "name": null,
   "label": "Bill total, tax included",
   "labelVisible": true,
   "describedby": "bill-error"
  },
  {
   "id": "tip",
   "type": "text",
   "inputmode": "numeric",
   "autocomplete": "off",
   "name": null,
   "label": "Tip percent",
   "labelVisible": true,
   "describedby": "tip-error"
  },
  {
   "id": "people",
   "type": "text",
   "inputmode": "numeric",
   "autocomplete": "off",
   "name": null,
   "label": "Number of people",
   "labelVisible": true,
   "describedby": "people-error"
  }
 ],
 "errRoles": [
  [
   "bill-error",
   "alert",
   null
  ],
  [
   "tip-error",
   "alert",
   null
  ],
  [
   "people-error",
   "alert",
   null
  ]
 ],
 "result": [
  "status",
  "polite",
  true
 ],
 "csp": "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'\">",
 "formAutocomplete": "off"
}
C7 fetch: REJECTED: TypeError: Failed to fetch
C7 other channels: {"xhr":"error","img":"error","beacon":true,"ws":"error","storage":{"localStorage":0,"sessionStorage":0},"cookie":"","idb":0}
C7 console: ["error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Fetch API cannot load https://example.com/. Refused to connect because it violates the document's Content Security Policy.","error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Loading the image 'https://example.com/favicon.ico?x=1' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'img-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Connecting to 'https://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.","error: Connecting to 'wss://example.com/' violates the following Content Security Policy directive: \"default-src 'none'\". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked."]
C7 requests: ["https://example.com/","FAILED https://example.com/ csp","https://example.com/favicon.ico?x=1","FAILED https://example.com/favicon.ico?x=1 csp"]
before reload: ["100.00","18","4"]
after reload: {"vals":["","",""],"err":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]}
after Ctrl+R with error state: {"vals":["abc","18","4"],"err":["Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50","",""],"invalid":["true",null,null],"resultShown":false,"lines":[]}
after navigate away + back: {"vals":["","",""],"err":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]}
C6 JS off url after Enter: file:///home/ubuntu/repos/devin/skills/hinshitsu/example/run/review/index.html
C6 JS-off DOM text nodes: ["Split the bill","[noscript] This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page.","Type the bill, the tip and the number of people. The split shows below.","Bill total, tax included","Tip percent","Number of people"]
C6 JS-off AX names: ["RootWebArea:Split the bill","heading:Split the bill","StaticText:Split the bill","StaticText:This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page.","StaticText:Type the bill, the tip and the number of people. The split shows below.","textbox:Bill total, tax included","textbox:Tip percent","textbox:Number of people","InlineTextBox:Split the bill","InlineTextBox:This calculator needs JavaScript. Turn JavaScript on in your ","InlineTextBox:browser, then reload this page.","InlineTextBox:Type the bill, the tip and the number of people. The split shows ","InlineTextBox:below.","StaticText:Bill total, tax included","StaticText:Tip percent","StaticText:Number of people","InlineTextBox:Bill total, tax included","InlineTextBox:Tip percent","InlineTextBox:Number of people"]
bfcache Chrome 156.0.8078.47 back: marker(kept if bfcache hit)= [ undefined, undefined ] {"vals":["","",""],"err":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]}
````

**E6. `t3.js` source, as run the second time: C3 sweep**

Command:

````
cat ~/audit/t3.js
````

Output:

````
// C3 sweep. Values are put into the page's own fields with Playwright fill() (sets the value and fires the page's input event); output is read from the page's own DOM.
const { connect, URL } = require('./lib');
// Auditor's own arithmetic: BigInt, written independently of the page.
function expected(billStr, tip, people) {
  const [w, f = ''] = billStr.split('.');
  const bill = BigInt(w) * 100n + BigInt((f + '00').slice(0, 2));
  const prod = bill * BigInt(tip);            // hundredths of a cent
  let tipC = prod / 100n; if (prod % 100n >= 50n) tipC += 1n;   // half a cent rounds up
  const total = bill + tipC, n = BigInt(people);
  const lo = total / n, hi = lo + 1n, nHi = total % n, nLo = n - nHi;
  const fmt = c => (c / 100n).toString() + '.' + (c % 100n).toString().padStart(2, '0');
  const line = (k, c) => k === 1n ? `1 person pays ${fmt(c)}` : `${k} people pay ${fmt(c)} each`;
  const pays = []; if (nHi > 0n) pays.push(line(nHi, hi)); pays.push(line(nLo, lo));
  return { bill: fmt(bill), tip: fmt(tipC), total: fmt(total), pays, totalC: total };
}
const cents = s => { const [a, b] = s.split('.'); return BigInt(a) * 100n + BigInt(b); };
(async () => {
  const browser = await connect(); const ctx = await browser.newContext(); const page = await ctx.newPage(); await page.goto(URL);
  let n = 0, bad = 0; const cur = {};
  const set = async (id, v) => { if (cur[id] !== v) { await page.fill('#' + id, v); cur[id] = v; } };
  const check = async (b, t, p) => {
    await set('bill', b); await set('tip', String(t)); await set('people', String(p));
    const s = await page.evaluate(() => { const r = document.getElementById('result'); return { shown: !r.hidden, lines: Array.from(r.querySelectorAll('p')).map(x => x.textContent), err: Array.from(document.querySelectorAll('.error')).map(e => e.textContent).join('|') }; });
    const e = expected(b, t, p); n++;
    const pays = s.lines.filter(l => /^\d+ (person pays|people pay) /.test(l));
    const extraNote = s.lines.slice(5).filter(l => !pays.includes(l));
    if (extraNote.length !== (pays.length === 2 ? 1 : 0) || (extraNote[0] && extraNote[0] !== "Your group decides who pays the extra cent.")) { n; console.log("NOTE-LINE ODD", b, t, p, JSON.stringify(s.lines)); }
    const problems = [];
    if (!s.shown) problems.push('no result: ' + s.err);
    else {
      if (s.lines[0] !== 'Bill: ' + e.bill) problems.push('bill ' + s.lines[0]);
      if (s.lines[1] !== `Tip: ${t} percent`) problems.push('tip% ' + s.lines[1]);
      if (s.lines[2] !== `People: ${p}`) problems.push('people ' + s.lines[2]);
      if (s.lines[3] !== 'Tip amount: ' + e.tip) problems.push('tipamt ' + s.lines[3] + ' want ' + e.tip);
      if (s.lines[4] !== 'Total: ' + e.total) problems.push('total ' + s.lines[4] + ' want ' + e.total);
      if (JSON.stringify(pays) !== JSON.stringify(e.pays)) problems.push('pays ' + JSON.stringify(pays) + ' want ' + JSON.stringify(e.pays));
      // independent of expected lines: parse the page's own payments, sum them, compare spread
      let sum = 0n, cnt = 0n; const amts = [];
      for (const l of pays) { const m = /^(\d+) (?:person pays|people pay) (\d+\.\d\d)(?: each)?$/.exec(l); if (!m) { problems.push('unparsed ' + l); continue; } sum += BigInt(m[1]) * cents(m[2]); cnt += BigInt(m[1]); amts.push(cents(m[2])); }
      if (sum !== e.totalC) problems.push('payments sum ' + sum + ' != total ' + e.totalC);
      if (cnt !== BigInt(p)) problems.push('payer count ' + cnt);
      if (amts.length === 2 && (amts[0] - amts[1] > 1n || amts[1] - amts[0] > 1n)) problems.push('spread > 0.01');
      if (pays.length < 1 || pays.length > 2) problems.push('pay line count ' + pays.length);
    }
    if (problems.length) { bad++; if (bad <= 40) console.log('MISMATCH', b, t, p, problems.join('; ')); }
  };
  const fmt = c => Math.floor(c / 100) + '.' + String(c % 100).padStart(2, '0');
  const t0 = Date.now();
  for (const t of [0, 15, 18, 20]) for (let c = 1; c <= 5000; c++) await check(fmt(c), t, 1);
  console.log('sweep A (bills 0.01..50.00 x tips 0,15,18,20 x 1 person): cases so far', n, 'mismatches', bad);
  for (let p = 1; p <= 12; p++) for (let c = 1; c <= 500; c++) await check(fmt(c), 18, p);
  console.log('sweep B (bills 0.01..5.00 x 1..12 people x tip 18): cases so far', n, 'mismatches', bad);
  for (const [b, t, p] of [['10.00', 0, 3], ['1000000.00', 100, 100], ['0.01', 0, 100]]) { await check(b, t, p); console.log('spot', b, t, p, JSON.stringify(await page.evaluate(() => Array.from(document.querySelectorAll('#result p')).map(x => x.textContent)))); }
  // extra adversarial: boundaries and randoms across the whole C2 range
  let seed = 12345; const rnd = m => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed % m; };
  for (let i = 0; i < 3000; i++) await check(fmt(1 + (rnd(100000) * 1000 + rnd(1000)) % 100000000), rnd(101), 1 + rnd(100));
  for (const c of [1, 49, 50, 51, 99, 100, 99999999, 100000000]) for (const t of [0, 1, 49, 50, 51, 99, 100]) for (const p of [1, 2, 3, 7, 99, 100]) await check(fmt(c), t, p);
  console.log('TOTAL cases', n, 'mismatches', bad, 'seconds', ((Date.now() - t0) / 1000).toFixed(0));
  await ctx.close(); await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
````

**E6. `t3.js` run 1: NOT VALID, bug in my own script**

Command:

````
cd ~/audit && node t3.js
````

Output:

````
sweep A (bills 0.01..50.00 x tips 0,15,18,20 x 1 person): cases so far 20000 mismatches 0
MISMATCH 0.01 18 2 pays ["1 person pays 0.01","1 person pays 0.00","Your group decides who pays the extra cent."] want ["1 person pays 0.01","1 person pays 0.00"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.04 18 2 pays ["1 person pays 0.03","1 person pays 0.02","Your group decides who pays the extra cent."] want ["1 person pays 0.03","1 person pays 0.02"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.06 18 2 pays ["1 person pays 0.04","1 person pays 0.03","Your group decides who pays the extra cent."] want ["1 person pays 0.04","1 person pays 0.03"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.08 18 2 pays ["1 person pays 0.05","1 person pays 0.04","Your group decides who pays the extra cent."] want ["1 person pays 0.05","1 person pays 0.04"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.09 18 2 pays ["1 person pays 0.06","1 person pays 0.05","Your group decides who pays the extra cent."] want ["1 person pays 0.06","1 person pays 0.05"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.11 18 2 pays ["1 person pays 0.07","1 person pays 0.06","Your group decides who pays the extra cent."] want ["1 person pays 0.07","1 person pays 0.06"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.13 18 2 pays ["1 person pays 0.08","1 person pays 0.07","Your group decides who pays the extra cent."] want ["1 person pays 0.08","1 person pays 0.07"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.14 18 2 pays ["1 person pays 0.09","1 person pays 0.08","Your group decides who pays the extra cent."] want ["1 person pays 0.09","1 person pays 0.08"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.16 18 2 pays ["1 person pays 0.10","1 person pays 0.09","Your group decides who pays the extra cent."] want ["1 person pays 0.10","1 person pays 0.09"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.18 18 2 pays ["1 person pays 0.11","1 person pays 0.10","Your group decides who pays the extra cent."] want ["1 person pays 0.11","1 person pays 0.10"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.21 18 2 pays ["1 person pays 0.13","1 person pays 0.12","Your group decides who pays the extra cent."] want ["1 person pays 0.13","1 person pays 0.12"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.23 18 2 pays ["1 person pays 0.14","1 person pays 0.13","Your group decides who pays the extra cent."] want ["1 person pays 0.14","1 person pays 0.13"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.26 18 2 pays ["1 person pays 0.16","1 person pays 0.15","Your group decides who pays the extra cent."] want ["1 person pays 0.16","1 person pays 0.15"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.28 18 2 pays ["1 person pays 0.17","1 person pays 0.16","Your group decides who pays the extra cent."] want ["1 person pays 0.17","1 person pays 0.16"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.30 18 2 pays ["1 person pays 0.18","1 person pays 0.17","Your group decides who pays the extra cent."] want ["1 person pays 0.18","1 person pays 0.17"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.31 18 2 pays ["1 person pays 0.19","1 person pays 0.18","Your group decides who pays the extra cent."] want ["1 person pays 0.19","1 person pays 0.18"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.33 18 2 pays ["1 person pays 0.20","1 person pays 0.19","Your group decides who pays the extra cent."] want ["1 person pays 0.20","1 person pays 0.19"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.35 18 2 pays ["1 person pays 0.21","1 person pays 0.20","Your group decides who pays the extra cent."] want ["1 person pays 0.21","1 person pays 0.20"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.38 18 2 pays ["1 person pays 0.23","1 person pays 0.22","Your group decides who pays the extra cent."] want ["1 person pays 0.23","1 person pays 0.22"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.40 18 2 pays ["1 person pays 0.24","1 person pays 0.23","Your group decides who pays the extra cent."] want ["1 person pays 0.24","1 person pays 0.23"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.43 18 2 pays ["1 person pays 0.26","1 person pays 0.25","Your group decides who pays the extra cent."] want ["1 person pays 0.26","1 person pays 0.25"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.45 18 2 pays ["1 person pays 0.27","1 person pays 0.26","Your group decides who pays the extra cent."] want ["1 person pays 0.27","1 person pays 0.26"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.47 18 2 pays ["1 person pays 0.28","1 person pays 0.27","Your group decides who pays the extra cent."] want ["1 person pays 0.28","1 person pays 0.27"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.48 18 2 pays ["1 person pays 0.29","1 person pays 0.28","Your group decides who pays the extra cent."] want ["1 person pays 0.29","1 person pays 0.28"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.50 18 2 pays ["1 person pays 0.30","1 person pays 0.29","Your group decides who pays the extra cent."] want ["1 person pays 0.30","1 person pays 0.29"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.52 18 2 pays ["1 person pays 0.31","1 person pays 0.30","Your group decides who pays the extra cent."] want ["1 person pays 0.31","1 person pays 0.30"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.53 18 2 pays ["1 person pays 0.32","1 person pays 0.31","Your group decides who pays the extra cent."] want ["1 person pays 0.32","1 person pays 0.31"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.55 18 2 pays ["1 person pays 0.33","1 person pays 0.32","Your group decides who pays the extra cent."] want ["1 person pays 0.33","1 person pays 0.32"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.57 18 2 pays ["1 person pays 0.34","1 person pays 0.33","Your group decides who pays the extra cent."] want ["1 person pays 0.34","1 person pays 0.33"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.60 18 2 pays ["1 person pays 0.36","1 person pays 0.35","Your group decides who pays the extra cent."] want ["1 person pays 0.36","1 person pays 0.35"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.62 18 2 pays ["1 person pays 0.37","1 person pays 0.36","Your group decides who pays the extra cent."] want ["1 person pays 0.37","1 person pays 0.36"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.65 18 2 pays ["1 person pays 0.39","1 person pays 0.38","Your group decides who pays the extra cent."] want ["1 person pays 0.39","1 person pays 0.38"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.67 18 2 pays ["1 person pays 0.40","1 person pays 0.39","Your group decides who pays the extra cent."] want ["1 person pays 0.40","1 person pays 0.39"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.69 18 2 pays ["1 person pays 0.41","1 person pays 0.40","Your group decides who pays the extra cent."] want ["1 person pays 0.41","1 person pays 0.40"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.70 18 2 pays ["1 person pays 0.42","1 person pays 0.41","Your group decides who pays the extra cent."] want ["1 person pays 0.42","1 person pays 0.41"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.72 18 2 pays ["1 person pays 0.43","1 person pays 0.42","Your group decides who pays the extra cent."] want ["1 person pays 0.43","1 person pays 0.42"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.74 18 2 pays ["1 person pays 0.44","1 person pays 0.43","Your group decides who pays the extra cent."] want ["1 person pays 0.44","1 person pays 0.43"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.75 18 2 pays ["1 person pays 0.45","1 person pays 0.44","Your group decides who pays the extra cent."] want ["1 person pays 0.45","1 person pays 0.44"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.77 18 2 pays ["1 person pays 0.46","1 person pays 0.45","Your group decides who pays the extra cent."] want ["1 person pays 0.46","1 person pays 0.45"]; unparsed Your group decides who pays the extra cent.; pay line count 3
MISMATCH 0.79 18 2 pays ["1 person pays 0.47","1 person pays 0.46","Your group decides who pays the extra cent."] want ["1 person pays 0.47","1 person pays 0.46"]; unparsed Your group decides who pays the extra cent.; pay line count 3
sweep B (bills 0.01..5.00 x 1..12 people x tip 18): cases so far 26000 mismatches 4453
spot 10.00 0 3 ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."]
spot 1000000.00 100 100 ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"]
spot 0.01 0 100 ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."]
TOTAL cases 29339 mismatches 7435 seconds 187
````

**E6. `t3.js` run 2: valid**

Command:

````
cd ~/audit && node t3.js
````

Output:

````
sweep A (bills 0.01..50.00 x tips 0,15,18,20 x 1 person): cases so far 20000 mismatches 0
sweep B (bills 0.01..5.00 x 1..12 people x tip 18): cases so far 26000 mismatches 0
spot 10.00 0 3 ["Bill: 10.00","Tip: 0 percent","People: 3","Tip amount: 0.00","Total: 10.00","1 person pays 3.34","2 people pay 3.33 each","Your group decides who pays the extra cent."]
spot 1000000.00 100 100 ["Bill: 1000000.00","Tip: 100 percent","People: 100","Tip amount: 1000000.00","Total: 2000000.00","100 people pay 20000.00 each"]
spot 0.01 0 100 ["Bill: 0.01","Tip: 0 percent","People: 100","Tip amount: 0.00","Total: 0.01","1 person pays 0.01","99 people pay 0.00 each","Your group decides who pays the extra cent."]
TOTAL cases 29339 mismatches 0 seconds 175
````

**E7. `t4.js` source: real X11 keys and real reload keys in the desktop Chrome window**

Command:

````
cat ~/audit/t4.js
````

Output:

````
const { connect, state, URL } = require('./lib');
const { execSync } = require('child_process');
const x = c => execSync('DISPLAY=:0 xdotool ' + c, { encoding: 'utf8' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await connect(); const ctx = browser.contexts()[0];
  const page = await ctx.newPage(); await page.goto(URL); await page.bringToFront(); await sleep(500);
  const box = async id => page.evaluate(i => { const r = document.getElementById(i).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, ox: window.screenX + (outerWidth - innerWidth), oy: window.screenY + (outerHeight - innerHeight), dpr: devicePixelRatio, sw: screen.width, iw: innerWidth, ow: outerWidth, oh: outerHeight, ih: innerHeight }; }, id);
  console.log('geometry', JSON.stringify(await box('bill')), x('getdisplaygeometry').trim());
  await page.evaluate(() => { window.__marker = 'pre-reload'; });
  // focus fields with CDP click (trusted), type with real X11 key events
  for (const [id, v] of [['bill', '100.00'], ['tip', '18'], ['people', '4']]) { await page.click('#' + id); await sleep(150); x(`type --delay 40 "${v}"`); await sleep(300); }
  console.log('typed via X11 keys:', JSON.stringify(await state(page)));
  await page.screenshot({ path: 'shots/gui-before-reload.png' });
  x('key ctrl+r'); await sleep(1500);
  console.log('after real Ctrl+R: marker=', await page.evaluate(() => window.__marker), JSON.stringify(await state(page)));
  await page.screenshot({ path: 'shots/gui-after-reload.png' });
  // error state then F5
  await page.evaluate(() => { window.__marker = 'pre-f5'; });
  await page.click('#bill'); await sleep(150); x('type --delay 40 "12,50"'); await sleep(300);
  console.log('error state:', JSON.stringify(await state(page)));
  x('key F5'); await sleep(1500);
  console.log('after real F5: marker=', await page.evaluate(() => window.__marker), JSON.stringify(await state(page)));
  // hard reload
  await page.click('#bill'); await sleep(150); x('type --delay 40 "7"'); await sleep(200); await page.evaluate(() => { window.__marker = 'pre-hard'; });
  x('key ctrl+shift+r'); await sleep(1500);
  console.log('after real Ctrl+Shift+R: marker=', await page.evaluate(() => window.__marker), JSON.stringify(await state(page)));
  // real keyboard: Enter and paste of multi-line text via X clipboard is skipped; test real typing of "10."
  await page.click('#tip'); x('type --delay 40 "18"'); await page.click('#people'); x('type --delay 40 "4"'); await page.click('#bill'); await sleep(150); x('type --delay 40 "10."'); await sleep(300); x('key Tab'); await sleep(300);
  console.log('real keys "10." then Tab:', JSON.stringify(await state(page)));
  await page.screenshot({ path: 'shots/gui-10-dot.png' });
  await page.close(); await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
````

**E7. `t4.js` run**

Command:

````
cd ~/audit && node t4.js
````

Output:

````
geometry {"x":636,"y":182.59375,"ox":8,"oy":91,"dpr":2,"sw":1280,"iw":1272,"ow":1280,"oh":928,"ih":837} 2560 1920
typed via X11 keys: {"vals":["100.00","18","4"],"err":["","",""],"invalid":[null,null,null],"resultShown":true,"lines":["Bill: 100.00","Tip: 18 percent","People: 4","Tip amount: 18.00","Total: 118.00","4 people pay 29.50 each"]}
after real Ctrl+R: marker= undefined {"vals":["","",""],"err":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]}
error state: {"vals":["12,50","",""],"err":["Use a dot, not a comma. Example: 12.50","",""],"invalid":["true",null,null],"resultShown":false,"lines":[]}
after real F5: marker= undefined {"vals":["","",""],"err":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]}
after real Ctrl+Shift+R: marker= undefined {"vals":["","",""],"err":["","",""],"invalid":[null,null,null],"resultShown":false,"lines":[]}
real keys "10." then Tab: {"vals":["10.","18","4"],"err":["","",""],"invalid":[null,null,null],"resultShown":true,"lines":["Bill: 10.00","Tip: 18 percent","People: 4","Tip amount: 1.80","Total: 11.80","4 people pay 2.95 each"]}
````

**E8. State of the checkout at the end**

Command:

````
cd ~/repos/devin && git status --porcelain && git rev-parse HEAD && sha256sum skills/hinshitsu/example/run/review/index.html
````

Output:

````
d125232c69fc9c85fae844443dc5053e7e6fa30d
68a527cccb35991429c8bbee059448a042af80b62eeb6c91a8ce146fc54d57e5  skills/hinshitsu/example/run/review/index.html
````

## Findings

### 1. The bill field accepts `10.` and shows a result

- **Class:** BLOCKER (a): the DELIVERABLE fails a CRITERION.
- **Where:** `skills/hinshitsu/example/run/review/index.html`, line 74: `var m = /^(\d+)(?:\.(\d{0,2}))?$/.exec(s);`
- **Trigger:** Open the file in Chrome. Type `10.` in "Bill total, tax included", `18` in "Tip percent", `4` in "Number of people". The page shows no message. It shows "Bill: 10.00 … Tip amount: 1.80, Total: 11.80, 4 people pay 2.95 each". The same happens with `5.`, ` 7. ` and `1000000.` (E4 lines for those inputs; E7 last line, typed with real keys). `0.` and `00.` get "Enter an amount above 0.", which is a message, and no result.
- **Violates:** C4 ("An amount is digits, with an optional dot followed by 1 or 2 digits"; `10.` "gets a message and no result").
- **Proposed fix:** Change `\d{0,2}` to `\d{1,2}` on line 74. `skills/hinshitsu/example/index.html` already has `\d{1,2}` on that line (E2); that 1 character is the only difference between the 2 files. After the fix, the SHA-256 of the review copy must equal `11570cbe…b8184`. The C8 report must state the hash of the file that was audited: today the 2 files have different hashes.

### 2. With JavaScript off, the page still tells the reader to type and that "The split shows below"

- **Class:** BLOCKER (d), on a literal reading of the glossary: a statement in the DELIVERABLE is false in this state. If the ORCHESTRATOR reads (d) as covering only the JavaScript-on page, this is a STYLE finding. C6's own test passes.
- **Where:** line 29 (`<p id="guide">`), lines 30-46 (the form), shown together with line 28 (`<noscript>`).
- **Trigger:** Load the file with JavaScript disabled. The page shows "This calculator needs JavaScript. Turn JavaScript on in your browser, then reload this page." and, directly under it, "Type the bill, the tip and the number of people. The split shows below." and 3 live fields. Type `100.00`, `18`, `4`, press Enter: nothing shows, no message, the URL does not change (E5, `C6 JS-off DOM text nodes`; screenshot `js-off-typed.png`).
- **Violates:** Glossary, BLOCKER (d). Not C6.
- **Proposed fix:** Give the guide and the form the `hidden` attribute in the markup, and remove `hidden` from both in the script's first lines. Then the JavaScript-off page shows the heading and the 1 sentence only.

### 3. The note says "the extra cent" when several people each pay 1 cent more

- **Class:** STYLE.
- **Where:** line 143: `addLine("Your group decides who pays the extra cent.")`.
- **Trigger:** Type `100.00`, `18`, `18`. The page shows "10 people pay 6.56 each", "8 people pay 6.55 each", "Your group decides who pays the extra cent." 10 people pay an extra cent, not 1 (E4). Same with `1000000.00`, `100`, `99` (2 people).
- **Violates:** No CRITERION. C2 names 1 or 2 payment lines and is silent on a third line.
- **Proposed fix:** "Your group decides who pays 1 cent more." Or build the sentence from `shares[0].count`.

### 4. A comma in the tip or people field gets no "use a dot" message

- **Class:** STYLE (the CRITERION is open to 2 readings).
- **Where:** lines 85-95 (`readWhole`); C4, sentence "The message for a comma says to use a dot."
- **Trigger:** Type `1,0` as tip or as people. The message is "Enter a whole number from 0 to 100, in digits only." (or "from 1 to 100"). It does not say to use a dot (E4). For the bill field, `12,50` and `1,000.00` do get "Use a dot, not a comma. Example: 12.50".
- **Violates:** C4, if "the message for a comma" covers all 3 fields. A dot is also wrong in these 2 fields, so the page's behavior is the sensible one.
- **Proposed fix:** Change the CRITERION, not the page: "The bill's message for a comma says to use a dot."

### 5. Characters that look right but are not ASCII get a message that does not name the cause

- **Class:** FRAGILITY. The change: a value pasted from another app, or typed on a keyboard that is not a US-style one.
- **Where:** line 71 and line 86 (`trim()`), line 73 (comma test), lines 74 and 89 (`\d`).
- **Trigger:** (a) Paste `12.50` followed by a zero-width space (U+200B) into the bill field: the field looks like `12.50` and the message is "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50". (b) Full-width digits `１２.５０`, Arabic-Indic digits `١٢`: same message, which tells a person who typed digits to type digits. (c) Full-width comma `12，50`, Arabic comma `12،50`, Arabic decimal separator `12٫50`: the general message, not the comma message (E4). Every one of these gets a message and no result, so C4's listed inputs hold.
- **Violates:** No CRITERION as written. Touches C4 ("a message in plain words").
- **Proposed fix:** Before the checks, remove U+200B-U+200D and U+2060 from the ends of the text. Send U+FF0C, U+060C and U+066B to the comma message. Optionally map full-width digits U+FF10-U+FF19 to ASCII digits.

### 6. The live regions are rewritten when nothing changed, and the first result is filled while the region is hidden

- **Class:** FRAGILITY. The change: a screen reader in use. What a screen reader says is UNVERIFIED: no screen reader is on this machine.
- **Where:** line 130 (`f.errorBox.textContent = …` on every update), line 134 and lines 137-144 (`resultBox` emptied and rebuilt on every update, including on `blur`; content added before `hidden = false`), line 153 (`blur` calls `update()`).
- **Trigger (observed, E4 last lines):** (a) With `abc` in the bill field, 4 `input` events in the tip field cause 4 DOM changes inside `#bill-error`, whose text does not change. `#bill-error` has `role="alert"`, so a screen reader can read the bill's message again on each key typed in another field. (b) With a result on screen, moving focus through the 3 fields without changing a value causes 21 DOM changes inside `#result` (`role="status"`). (c) On the first valid input the 6 lines are added while `#result` still has `display: none`; `hidden` goes to false after. Some screen readers do not announce content that was added to a hidden live region.
- **Violates:** No CRITERION as tested: C5 tests the markup only, and the markup has the roles. Touches C5 ("regions that screen readers announce").
- **Proposed fix:** Write an error box only when its text differs from the new text. Build the result into a string, and replace the content only when it differs. Keep `#result` rendered at all times (empty, with no border, in place of `hidden`), so that the first result is a change inside a visible live region. Do not rebuild on `blur` when no value changed.

### 7. `inputmode="decimal"` can give a phone keypad with a comma key and no dot key

- **Class:** FRAGILITY. The change: a phone whose region uses a comma as the decimal mark. UNVERIFIED: I did not test on a phone, and I did not observe this. I report it from the documented behavior of phone keypads for `inputmode="decimal"`, not from a run.
- **Where:** line 33 (`inputmode="decimal"`), line 73 (comma rejected).
- **Trigger (not run):** On such a phone, tap the bill field. If the keypad shows `,` and no `.`, a person cannot type `12.50`; `12,50` gets "Use a dot, not a comma."
- **Violates:** No CRITERION: C5 requires `inputmode="decimal"` and reports the real phone UNVERIFIED. C4 requires the comma to be rejected. The 2 together can leave such a person with no way to enter cents.
- **Proposed fix:** Test on 1 iPhone and 1 Android phone set to a comma region. If the dot is missing, either accept exactly 1 comma followed by 1 or 2 digits as the decimal mark (a change to C4, for the USER to decide), or use `inputmode="text"` on the bill field (a change to C5).

### Tried and found no fault

- Huge input: 400 digits, 5,000,000 digits (message in 1.4 s, no result), 5,000,000 zeros followed by `7.5` (result for 7.50 in 1.1 s). No sideways scroll, no script error.
- Hostile input: `<img src=x onerror=alert(1)>`, `"><script>alert(1)</script>`: message, no result, nothing run. The page writes with `textContent` only.
- Malformed: `1e3`, `.5`, `.`, `..`, `1.2.3`, `0x10`, `Infinity`, `NaN`, `1_000`, `+12.50`, `-0.01`, `12 .50`, `1 000`, `$12.50`, `€12`, `12.50$`, `1.234`, `0.010`: message, no result.
- Limits: `1000000.00` accepted; `1000000.01`, `1000001`, a 23-digit number: "Enter 1000000.00 or less." Tip `100` accepted, `101` rejected. People `100` accepted, `0`, `00`, `101` rejected.
- Leading zeros (`0012.5`, `018`, `0100`) are accepted and shown without the zeros. C4 does not forbid them.
- Out of order: people first, then tip, then bill: no message for an untouched field, result when the third is valid. Tab through 3 empty fields: 3 messages. Delete a valid bill: result goes, message shows. Enter key: no navigation. 200 Tab presses: result unchanged.
- Interrupted: reload (script, `Ctrl+R`, `F5`, `Ctrl+Shift+R`) from a result state and from an error state: 3 empty fields, no message, no result. Navigate away and back: same.
- Sending: `fetch`, XHR, image, `sendBeacon` and WebSocket to example.com are all blocked by the CSP. `localStorage`, `sessionStorage`, cookies and IndexedDB are empty after use.
- Arithmetic: 29,339 cases, 0 mismatches, including bills of 0.01, 0.49-0.51, 999999.99 and 1000000.00 with tips 0, 1, 49, 50, 51, 99, 100 and 1, 2, 3, 7, 99, 100 people.

## Not examined

- **C8, the delivery report:** my scope names no delivery report, and I may read only the files it names. UNVERIFIED by me.
- **Every other file in `skills/hinshitsu/example/run/`** (`AUDIT-LOG.md`, ledgers, `audits/`, `evidence/`, `memos/`, `prompts/`): outside my scope. I saw the file names only.
- **`skills/hinshitsu/example/index.html` as a page:** I compared its bytes with the review copy and did not run my tests against it. Every test result above is for the review copy.
- **A real phone** (C5): none available. UNVERIFIED. Finding 7 depends on it.
- **Firefox and Safari** (C7): not installed; C7 says Firefox is not tested. UNVERIFIED.
- **A screen reader** (C5, Finding 6): none on the machine. I checked roles, the accessibility tree names with JavaScript off, and DOM changes. What is spoken is UNVERIFIED.
- **Back/forward cache:** the desktop Chrome runs with that cache off, and a second headless Chrome did not use it for this `file://` page. Line 157's "return through the back button" was tested only as a full page load. The cached path is UNVERIFIED.
- **Chrome's "reopen closed tab", session restore after a crash, and browser autofill:** not tested; the scripted browser gives no reliable way to trigger them.
- **Mac and Windows Chrome:** the test machine is Linux only.
- **Browser zoom, forced large fonts, dark mode, forced colors, print:** not tested. C5 names the 3 widths only; I added 320 px.
- **Key-by-key typing for the C3 sweep:** the 29,339 cases used `fill()`. Key-by-key typing was used for the C2 and C4 cases and, with real X11 keys, for 5 values in E7.
- **19 of the 25 screenshots:** I did not view them. For those states I rely on the measured widths in E5 (`scrollWidth` equal to or less than `innerWidth`, no element past the viewport, `scrollX` stays 0).
