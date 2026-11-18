const { connect, URL, SHOTS, state } = require('./lib');
const fs = require('fs');
(async () => {
  const b = await connect(); const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage(); await page.goto(URL);
  const brief = async (label) => { const s = await state(page); console.log(label, '| values', JSON.stringify(s.values), '| errors', JSON.stringify(s.errors), '| result', JSON.stringify(s.lines), '| guide', JSON.stringify(s.guide), '| focus', s.active); return s; };
  console.log('=== C4 states');
  await brief('first open');
  await page.click('#bill'); await brief('clicked into bill, typed nothing');
  await page.keyboard.type('4'); await brief('typed 4 in bill; tip and people untouched (incomplete)');
  await page.screenshot({ path: SHOTS + 'c4-state-incomplete.png', fullPage: true });
  await page.keyboard.press('Tab'); await brief('tabbed to tip (bill left valid)');
  await page.keyboard.press('Tab'); await brief('tabbed past tip without typing (tip left empty)');
  await page.keyboard.type('x'); await brief('typed x in people');
  await page.screenshot({ path: SHOTS + 'c4-state-error.png', fullPage: true });
  await page.keyboard.press('Backspace'); await brief('deleted x (people typed in, now empty)');
  await page.keyboard.type('3'); await page.click('#tip'); await page.keyboard.type('1'); await brief('people 3, tip 1');
  await page.keyboard.type('5'); await brief('tip 15 (recomputed)');
  await page.screenshot({ path: SHOTS + 'c4-state-result.png', fullPage: true });
  await page.keyboard.press('Backspace'); await brief('tip 1 again (recomputed)');
  await page.click('#bill'); await page.keyboard.type('.'); await brief('bill "4." with cursor in bill');
  await page.screenshot({ path: SHOTS + 'c4-waiting-cursor-in-bill.png', fullPage: true });
  await page.keyboard.type('5'); await brief('bill "4.5"');
  await page.keyboard.press('Backspace'); await brief('bill "4." again, cursor in bill');
  await page.click('#tip'); await brief('left bill for tip with "4."');
  await page.screenshot({ path: SHOTS + 'c4-waiting-left-bill.png', fullPage: true });
  await page.click('#bill'); await brief('clicked back into bill holding "4." (cursor in bill again)');
  await page.screenshot({ path: SHOTS + 'c4-waiting-cursor-back-in-bill.png', fullPage: true });
  await page.keyboard.press('End'); await page.keyboard.press('ArrowLeft'); await brief('moved the caret with the arrow keys, cursor still in bill');
  await page.keyboard.press('End'); await page.keyboard.type('5'); await brief('typed 5 -> "4.5"');
  // paste
  await page.reload();
  await page.click('#bill'); await page.keyboard.insertText('100.00'); await page.click('#tip'); await page.keyboard.insertText('18'); await page.click('#people'); await page.keyboard.insertText('4');
  await brief('values inserted as text (paste / IME path)');

  console.log('=== C5 markup');
  const html = fs.readFileSync('/home/ubuntu/audit/devin/skills/hinshitsu/example/index.html', 'utf8');
  console.log(JSON.stringify(await page.evaluate(() => ({
    labels: Array.from(document.querySelectorAll('label')).map(l => ({ for: l.htmlFor, text: l.textContent, visible: l.getClientRects().length > 0, h: l.getBoundingClientRect().height, targetExists: !!document.getElementById(l.htmlFor) })),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ id: i.id, type: i.type, inputmode: i.getAttribute('inputmode'), autocomplete: i.getAttribute('autocomplete'), describedby: i.getAttribute('aria-describedby'), accessibleLabel: i.labels[0] && i.labels[0].textContent })),
    errorParas: Array.from(document.querySelectorAll('p.error')).map(p => ({ id: p.id, role: p.getAttribute('role') })),
    alerts: Array.from(document.querySelectorAll('[role=alert]')).map(p => p.id),
    result: { role: document.getElementById('result').getAttribute('role'), live: document.getElementById('result').getAttribute('aria-live') },
    statusCount: document.querySelectorAll('[role=status]').length, inputCount: document.querySelectorAll('input').length,
  })), null, 1));

  console.log('=== C5 count of changes while a person types in another field');
  const arm = () => page.evaluate(() => { window.__c = { bill: 0, tip: 0, people: 0, result: 0 }; window.__o && window.__o.forEach(o => o.disconnect()); window.__o = [];
    for (const [k, id] of [['bill', 'bill-error'], ['tip', 'tip-error'], ['people', 'people-error'], ['result', 'result']]) { const o = new MutationObserver(r => { window.__c[k] += r.length; }); o.observe(document.getElementById(id), { childList: true, characterData: true, subtree: true, attributes: true }); window.__o.push(o); } });
  const counts = async (label) => { await page.waitForTimeout(50); console.log(label, JSON.stringify(await page.evaluate(() => window.__c))); };
  await page.reload();
  await page.click('#bill'); await page.keyboard.type('abc'); await page.click('#people'); await page.keyboard.type('0');
  await brief('setup A: bill "abc" (message), people "0" (message), tip untouched');
  await arm(); await page.click('#tip'); await page.keyboard.type('18'); await page.keyboard.press('Backspace'); await page.keyboard.type('5');
  await counts('A: typed 1,8,backspace,5 in tip -> mutation records (bill-error, tip-error, people-error, result):');
  await arm(); await page.keyboard.press('Control+a'); await page.keyboard.type('x9y');
  await counts('A2: then typed x,9,y in tip (tip message appears, clears, appears) ->');
  await page.reload();
  await page.click('#bill'); await page.keyboard.type('100.00'); await page.click('#tip'); await page.keyboard.type('18'); await page.click('#people'); await page.keyboard.type('4');
  await brief('setup B: valid result showing');
  await arm(); await page.click('#bill'); await page.keyboard.press('End'); await page.keyboard.type(' '); await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace'); await page.keyboard.type('0');
  await counts('B: in bill typed space, backspace, backspace, 0 (100.00 -> "100.00 " -> 100.00 -> 100.0 -> 100.00; same amount each time) ->');
  await arm(); await page.click('#tip'); await page.keyboard.press('Home'); await page.keyboard.type('0'); await page.click('#people'); await page.keyboard.press('Home'); await page.keyboard.type('0'); await page.click('h1');
  await counts('B2: prefixed tip and people with 0 (018, 04), then left the fields ->');
  await brief('after B2');
  await arm(); await page.click('#tip'); await page.keyboard.press('End'); await page.keyboard.press('Backspace'); await page.keyboard.type('5');
  await counts('B3: tip 018 -> 01 -> 015 (result changes twice; error paragraphs must stay at 0) ->');
  await page.reload();
  await page.click('#bill'); await page.keyboard.type('12.'); await page.click('#tip');
  await arm(); await page.keyboard.type('18'); await page.click('#people'); await page.keyboard.type('4');
  await counts('C: bill "12." left (message showing); typed tip 18 and people 4 ->'); await brief('after C');

  console.log('=== C5 widths');
  for (const w of [360, 768, 1280]) {
    await page.setViewportSize({ width: w, height: 800 });
    for (const [name, setup] of [
      ['first-open', async () => { await page.reload(); }],
      ['errors', async () => { await page.reload(); await page.click('#bill'); await page.keyboard.type('1,000.00'); await page.click('#tip'); await page.keyboard.type('18.0'); await page.click('#people'); await page.keyboard.type('0'); await page.click('h1'); }],
      ['result-2-lines', async () => { await page.reload(); await page.click('#bill'); await page.keyboard.type('1000000.00'); await page.click('#tip'); await page.keyboard.type('100'); await page.click('#people'); await page.keyboard.type('99'); await page.click('h1'); }],
      ['long-input', async () => { await page.reload(); await page.click('#bill'); await page.keyboard.type('9'.repeat(120)); await page.click('#tip'); await page.keyboard.type('W'.repeat(120)); await page.click('#people'); await page.keyboard.type('4'); await page.click('h1'); }],
    ]) {
      await setup();
      const m = await page.evaluate(() => { const vw = document.documentElement.clientWidth; let worst = null, wide = 0;
        for (const el of document.querySelectorAll('body, body *')) { const r = el.getBoundingClientRect(); if (r.width === 0 && r.height === 0) continue; if (r.right > vw + 0.5 || r.left < -0.5 || r.width > window.innerWidth + 0.5) { wide++; worst = worst || (el.tagName + '#' + el.id + ' ' + r.left + '..' + r.right); } }
        window.scrollTo(500, 0); const sx = window.scrollX; window.scrollTo(0, 0);
        return { innerWidth: window.innerWidth, clientWidth: vw, docScrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth, elementsOutside: wide, worst, scrollXAfterScrollTo500: sx }; });
      console.log(`width ${w} ${name}:`, JSON.stringify(m));
      await page.screenshot({ path: SHOTS + `c5-${w}-${name}.png`, fullPage: true });
    }
  }
  await ctx.close();

  console.log('=== C6 JavaScript off');
  const ctx2 = await b.newContext({ viewport: { width: 1280, height: 800 }, javaScriptEnabled: false });
  const p2 = await ctx2.newPage(); await p2.goto(URL);
  const cdp = await ctx2.newCDPSession(p2);
  const ev = async (expr) => (await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true })).result.value;
  console.log('visible text of the page:', JSON.stringify(await p2.locator('body').innerText().catch(e => 'ERR ' + e.message)));
  for (const sel of ['#guide', '#fields', '#bill', '#tip', '#people', 'noscript p', 'h1']) console.log(' ', sel, 'visible:', await p2.locator(sel).isVisible());
  await p2.screenshot({ path: SHOTS + 'c6-javascript-off.png', fullPage: true });
  await ctx2.close();

  console.log('=== C7');
  const want = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`;
  console.log('CSP tag present word for word:', html.includes(want), '; count of "Content-Security-Policy" in source:', html.split('Content-Security-Policy').length - 1);
  for (const w of ['localStorage', 'sessionStorage', 'indexedDB', 'document.cookie', 'caches', 'fetch', 'XMLHttpRequest', 'sendBeacon', 'WebSocket', 'EventSource', 'http://', 'https://', 'src=', 'href=', 'import', '<form', '<img', '<link', 'url(']) console.log(`  source occurrences of ${JSON.stringify(w)}:`, html.split(w).length - 1);
  console.log('  autocomplete="off" occurrences:', html.split('autocomplete="off"').length - 1, '; <input occurrences:', html.split('<input').length - 1);
  const ctx3 = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const p3 = await ctx3.newPage(); const msgs = []; p3.on('console', m => msgs.push(m.type() + ': ' + m.text()));
  const reqs = []; p3.on('request', r => reqs.push(r.url())); p3.on('requestfailed', r => reqs.push('FAILED ' + r.url() + ' ' + (r.failure() || {}).errorText));
  await p3.goto(URL);
  console.log("fetch('https://example.com') ->", await p3.evaluate(() => fetch('https://example.com').then(r => 'RESOLVED status ' + r.status, e => 'REJECTED ' + e.name + ': ' + e.message)));
  console.log("new Image().src ->", await p3.evaluate(() => new Promise(res => { const i = new Image(); i.onload = () => res('LOADED'); i.onerror = () => res('ERROR (blocked)'); i.src = 'https://example.com/x.png'; setTimeout(() => res('timeout'), 4000); })));
  console.log("sendBeacon ->", await p3.evaluate(() => { try { return String(navigator.sendBeacon('https://example.com/b', 'x')); } catch (e) { return 'THREW ' + e.message; } }));
  await p3.waitForTimeout(500);
  console.log('console messages:', JSON.stringify(msgs, null, 1)); console.log('request log:', JSON.stringify(reqs));
  console.log('storage after use:', JSON.stringify(await p3.evaluate(async () => ({ cookie: document.cookie, local: (() => { try { return localStorage.length; } catch (e) { return 'ERR ' + e.name; } })(), session: (() => { try { return sessionStorage.length; } catch (e) { return 'ERR ' + e.name; } })() }))));
  await p3.click('#bill'); await p3.keyboard.type('100.00'); await p3.click('#tip'); await p3.keyboard.type('18'); await p3.click('#people'); await p3.keyboard.type('4');
  console.log('before reload:', JSON.stringify((await state(p3)).values), JSON.stringify((await state(p3)).lines));
  await p3.screenshot({ path: SHOTS + 'c7-before-reload.png', fullPage: true });
  await p3.keyboard.press('F5'); await p3.waitForTimeout(1500);
  let s = await state(p3); console.log('after F5 reload: values', JSON.stringify(s.values), 'errors', JSON.stringify(s.errors), 'result', JSON.stringify(s.lines));
  await p3.screenshot({ path: SHOTS + 'c7-after-reload.png', fullPage: true });
  await p3.click('#bill'); await p3.keyboard.type('55.55'); await p3.click('#tip'); await p3.keyboard.type('x');
  await p3.goto('about:blank'); await p3.goBack(); await p3.waitForTimeout(1000);
  s = await state(p3); console.log('after leaving to about:blank and pressing Back: values', JSON.stringify(s.values), 'errors', JSON.stringify(s.errors), 'result', JSON.stringify(s.lines));
  await ctx3.close(); await b.close();
})();
