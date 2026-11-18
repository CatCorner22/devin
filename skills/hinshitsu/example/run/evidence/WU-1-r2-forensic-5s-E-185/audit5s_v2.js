const { chromium } = require('playwright');
const path = '/home/ubuntu/audit/devin/skills/hinshitsu/example/index.html';
const url = 'file://' + path;
const out = '/home/ubuntu/audit/out/';
const log = (...a) => console.log(...a);
function ref(billCents, pct, n) { // auditor's own code, BigInt
  const b = BigInt(billCents), p = BigInt(pct), k = BigInt(n);
  let tip = (b * p) / 100n; if ((b * p) % 100n >= 50n) tip += 1n;
  const total = b + tip, q = total / k, r = total % k;
  const pays = []; for (let i = 0n; i < k; i++) pays.push(i < r ? q + 1n : q);
  return { tip, total, pays };
}
const m = c => { c = BigInt(c); return (c / 100n) + '.' + String(c % 100n).padStart(2, '0'); };
function expectLines(billCents, pct, n) {
  const r = ref(billCents, pct, n);
  const sum = r.pays.reduce((a, b) => a + b, 0n);
  if (sum !== r.total) throw new Error('ref sum');
  const L = ['Bill total: ' + m(billCents), 'Tip percent: ' + pct, 'Number of people: ' + n, 'Tip amount: ' + m(r.tip), 'Total with tip: ' + m(r.total)];
  const hi = r.pays[0], lo = r.pays[r.pays.length - 1];
  const line = (c, v) => c === 1 ? '1 person pays ' + m(v) : c + ' people pay ' + m(v) + ' each';
  if (hi === lo) L.push(line(n, hi));
  else { const ch = r.pays.filter(x => x === hi).length; L.push(line(ch, hi), line(n - ch, lo), 'Your group decides who pays the higher amount.'); }
  return L;
}
(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:29229');
  log('browser', browser.version());
  const ctx = browser.contexts()[0];
  const page = await ctx.newPage();
  const reqs = [], cons = [], errs = [];
  page.on('request', r => reqs.push(r.method() + ' ' + r.url()));
  page.on('console', c => cons.push(c.type() + ': ' + c.text()));
  page.on('pageerror', e => errs.push(String(e)));
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(url);
  log('C1 requests:', reqs.length, JSON.stringify(reqs));
  log('console on load:', JSON.stringify(cons), 'pageerrors:', JSON.stringify(errs));
  const names = ['MAX_BILL_CENTS','MAX_TIP_PERCENT','MAX_PEOPLE','splitBill','plain','readAmount','readWhole','money','payLine','fields','resultBox','shownResult','showResult','update'];
  log('names from the script that are own properties of window:', (await page.evaluate(ns => ns.filter(n => Object.prototype.hasOwnProperty.call(window, n)), names)).join(' '));
  const codes = new Map(); const code = t => { if (t === '') return '-'; if (!codes.has(t)) codes.set(t, 'M' + (codes.size + 1)); return codes.get(t); };
  const state = () => page.evaluate(() => ({
    vals: ['bill', 'tip', 'people'].map(i => document.getElementById(i).value),
    errs: ['bill', 'tip', 'people'].map(i => document.getElementById(i + '-error').textContent),
    inv: ['bill', 'tip', 'people'].map(i => document.getElementById(i).getAttribute('aria-invalid')),
    res: [...document.querySelectorAll('#result p')].map(p => p.textContent),
    resText: document.getElementById('result').textContent,
    guide: document.getElementById('guide').hidden ? null : document.getElementById('guide').textContent,
    fieldsHidden: document.getElementById('fields').hidden,
    active: document.activeElement.id || document.activeElement.tagName }));
  log('C4 first open:', JSON.stringify(await state()));
  const B = page.locator('#bill'), T = page.locator('#tip'), P = page.locator('#people');
  const typeAll = async (b, t, p) => { for (const [l, v] of [[B, b], [T, t], [P, p]]) { await l.fill(''); await l.pressSequentially(v); } await page.locator('h1').click(); };
  log('--- C2 tests (typed key by key)');
  for (const c of [['100.00', '18', '4'], ['0.30', '15', '1'], ['10.10', '15', '1'], ['12.25', '18', '1'], ['0100.5', '007', '02'], ['10.00', '0', '3'], ['1000000.00', '100', '100'], ['0.01', '0', '100']]) {
    await typeAll(...c); const s = await state();
    const bc = Math.round(parseFloat(c[0]) * 100);
    const exp = expectLines(bc, parseInt(c[1], 10), parseInt(c[2], 10));
    log(JSON.stringify(c), '=>', JSON.stringify(s.res), 'errs', JSON.stringify(s.errs), JSON.stringify(s.res) === JSON.stringify(exp) ? 'MATCH' : 'MISMATCH exp ' + JSON.stringify(exp));
  }
  log('--- C3 sweep');
  let n = 0, bad = 0; const t0 = Date.now();
  const readRes = () => page.evaluate(() => [...document.querySelectorAll('#result p')].map(p => p.textContent));
  await P.fill('1');
  for (const pct of [0, 15, 18, 20]) { await T.fill(String(pct));
    for (let c = 1; c <= 5000; c++) { await B.fill(m(c)); const got = await readRes(); n++;
      if (JSON.stringify(got) !== JSON.stringify(expectLines(c, pct, 1))) { bad++; if (bad < 10) log('MISMATCH', m(c), pct, 1, JSON.stringify(got)); } } }
  log('sweep A cases', n, 'mismatches', bad);
  let n2 = 0, bad2 = 0; await T.fill('18');
  for (let k = 1; k <= 12; k++) { await P.fill(String(k));
    for (let c = 1; c <= 500; c++) { await B.fill(m(c)); const got = await readRes(); n2++;
      if (JSON.stringify(got) !== JSON.stringify(expectLines(c, 18, k))) { bad2++; if (bad2 < 10) log('MISMATCH', m(c), 18, k, JSON.stringify(got)); } } }
  log('sweep B cases', n2, 'mismatches', bad2, 'seconds', Math.round((Date.now() - t0) / 1000));
  log('--- C4 inputs (typed, then field left)');
  const one = async (loc, v) => { await page.reload(); await T.fill('15'); await P.fill('2'); await B.fill('10');
    await loc.fill(''); if (v !== '') await loc.pressSequentially(v); else { await loc.focus(); }
    const during = await state(); await page.locator('h1').click(); await loc.blur().catch(() => {}); const after = await state();
    const id = await loc.getAttribute('id'); const i = ['bill', 'tip', 'people'].indexOf(id);
    const cp = /^[\x20-\x7E]*$/.test(v) ? '' : ' (' + [...v].map(ch => 'U+' + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ') + ')';
    const show = /^[\x20-\x7E]*$/.test(v) ? JSON.stringify(v) : '';
    log(id, show + cp, '| with cursor: msg ' + code(during.errs[i]) + ', result lines ' + during.res.length + ' | after leaving: msg ' + code(after.errs[i]) + ', result lines ' + after.res.length + (after.res.length ? ', shows ' + after.res[i].split(': ')[1] : '')); };
  for (const v of ['', 'abc', '1,000.00', '1.000,00', '1e3', '10.', '12.', '12,', '.5', '$5', '5€', '-5', '0', '0.00', '1000000.01', '10000000', '1.234', '12.50', '12,50', ' 12.50 ', '\u200B12.50\uFEFF', '１２．５０', '１２，５０', '١٢٫٥٠', '١٢.٥٠', '۱۲٫۵۰',
    '\u200E12.50', '12.50\u200F', '\u202A12.50\u202C', '\u00AD12.50', '\u00A012.50\u00A0', '①②', '1².5', '⒈5', '𝟏𝟐', '12\u20245', '१२', '1 2', '1\u066C000'])
    await one(B, v);
  for (const v of ['', '18.0', '18,5', '1e1', '+4', '4.', '101', '-1', 'x', '0', '100', '００７', '٧', ' 7 ', '²', '⑦', '\u200E7', '00000000000000000000100', '1000'])
    await one(T, v);
  for (const v of ['', '0', '101', '18.0', '18,5', '1e1', '+4', '4.', '1', '100', '٤', '４', '\u200F4'])
    await one(P, v);
  log('legend:'); for (const [t, c] of codes) log(' ', c, '=', JSON.stringify(t));
  log('--- C4 incomplete: untouched empties, typed only bill');
  await page.reload(); await B.pressSequentially('10'); log(JSON.stringify(await state()));
  log('--- C4 recompute on every change');
  await page.reload(); await B.fill('10'); await T.fill('1'); await P.fill('3'); log(JSON.stringify((await state()).res)); await T.pressSequentially('5'); log(JSON.stringify((await state()).res)); await T.press('Backspace'); await T.press('Backspace'); log(JSON.stringify(await state()));
  log('--- C5 widths');
  for (const w of [360, 768, 1280]) { await page.setViewportSize({ width: w, height: 800 }); await page.reload();
    for (const [st, f] of [['first', async () => {}], ['error', async () => { await B.fill('1,000.00'); await T.fill('abc'); await P.fill('0'); await page.locator('h1').click(); }], ['result', async () => { await B.fill('1000000.00'); await T.fill('100'); await P.fill('3'); await page.locator('h1').click(); }]]) {
      await f(); const r = await page.evaluate(() => { const iw = document.documentElement.clientWidth; let worst = 0, cnt = 0; for (const e of document.querySelectorAll('body *')) { const b = e.getBoundingClientRect(); if (b.width > iw || b.right > iw + 0.01 || b.left < -0.01) cnt++; worst = Math.max(worst, b.right); } return { innerWidth: window.innerWidth, clientWidth: iw, scrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth, overflowing: cnt, maxRight: worst }; });
      await page.evaluate(() => window.scrollTo(500, 0)); const sx = await page.evaluate(() => window.scrollX);
      log(w, st, JSON.stringify(r), 'scrollX after scrollTo(500,0):', sx); await page.screenshot({ path: out + 'w' + w + '-' + st + '.png', fullPage: true }); } }
  await page.setViewportSize({ width: 1280, height: 800 });
  log('--- C5 markup');
  log(JSON.stringify(await page.evaluate(() => ({ labels: [...document.querySelectorAll('label')].map(l => [l.htmlFor, l.textContent, l.getBoundingClientRect().height > 0]), inputs: [...document.querySelectorAll('input')].map(i => [i.id, i.type, i.inputMode, i.autocomplete, i.getAttribute('aria-describedby')]), alerts: [...document.querySelectorAll('.error')].map(e => [e.id, e.getAttribute('role')]), result: [document.getElementById('result').getAttribute('role'), document.getElementById('result').getAttribute('aria-live')], csp: document.querySelector('meta[http-equiv]').outerHTML }))));
  log('--- C5 mutation counts');
  const watch = () => page.evaluate(() => { window.__n = { bill: 0, tip: 0, people: 0, result: 0 }; window.__o = []; for (const [k, id] of [['bill', 'bill-error'], ['tip', 'tip-error'], ['people', 'people-error'], ['result', 'result']]) { const o = new MutationObserver(r => { window.__n[k] += r.length; }); o.observe(document.getElementById(id), { childList: true, subtree: true, characterData: true, attributes: true }); window.__o.push(o); } });
  const counts = () => page.evaluate(async () => { await new Promise(r => setTimeout(r, 50)); window.__o.forEach(o => o.disconnect()); return window.__n; });
  await page.reload(); await P.fill('abc'); await T.fill('x'); await page.locator('h1').click(); await watch(); await B.pressSequentially('123.45'); log('errors on tip+people shown; typed 123.45 in bill:', JSON.stringify(await counts()), JSON.stringify((await state()).errs));
  await page.reload(); await B.fill('10'); await T.fill('15'); await P.fill('2'); await watch(); await B.pressSequentially('   '); await T.focus(); await T.pressSequentially(' '); await P.focus(); await page.locator('h1').click(); log('result shown; typed spaces after bill and tip, moved focus:', JSON.stringify(await counts()), JSON.stringify((await state()).vals));
  await page.reload(); await B.fill('10'); await T.fill('15'); await P.fill('abc'); await page.locator('h1').click(); await watch(); await T.focus(); await T.press('Backspace'); await T.pressSequentially('8'); log('people error shown; edited tip:', JSON.stringify(await counts()));
  log('--- C7');
  await page.reload();
  log('fetch:', await page.evaluate(() => fetch('https://example.com').then(r => 'NOT BLOCKED ' + r.status, e => 'BLOCKED: ' + e)));
  log('console after fetch:', JSON.stringify(cons));
  await B.fill('12.50'); await T.fill('18'); await P.fill('4'); log('before reload', JSON.stringify((await state()).vals)); await page.reload(); log('after reload', JSON.stringify(await state()));
  await B.fill('12.50'); await T.fill('18'); await P.fill('4'); await page.goto('about:blank'); await page.goBack(); log('after back', JSON.stringify(await state()));
  log('storage:', JSON.stringify(await page.evaluate(async () => ({ cookie: document.cookie, ls: (() => { try { return localStorage.length; } catch (e) { return String(e); } })(), ss: (() => { try { return sessionStorage.length; } catch (e) { return String(e); } })() }))));
  log('requests seen on the page object over the whole run:', reqs.length, '; distinct:', JSON.stringify([...new Set(reqs)]));
  log('pageerrors:', JSON.stringify(errs));
  await page.close();
  log('--- C6 JavaScript off');
  const c2 = await browser.newContext({ javaScriptEnabled: false }); const p2 = await c2.newPage(); await p2.goto(url);
  log('body innerText:', JSON.stringify(await p2.locator('body').innerText()));
  log('guide visible:', await p2.locator('#guide').isVisible(), 'fields visible:', await p2.locator('#fields').isVisible(), 'inputs visible:', await p2.locator('input:visible').count(), 'result box height:', JSON.stringify(await p2.locator('#result').boundingBox()));
  await p2.screenshot({ path: out + 'nojs.png' }); await c2.close();
  await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
