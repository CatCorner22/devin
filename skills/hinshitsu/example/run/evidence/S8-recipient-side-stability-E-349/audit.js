const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const fs = require('fs'); const { execSync } = require('child_process');
const run = process.argv[2]; const OUT = `/home/ubuntu/audit/out/run${run}`; fs.mkdirSync(OUT, { recursive: true });
const URL = 'file:///home/ubuntu/audit/fresh/index.html';
const R = {};
(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = browser.contexts()[0];
  const page = await ctx.newPage();
  const reqs = []; page.on('request', r => reqs.push(r.url()));
  const errs = []; page.on('pageerror', e => errs.push(String(e))); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.setViewportSize({ width: 1280, height: 800 });
  const open = async () => { reqs.length = 0; await page.goto(URL); };
  const state = () => page.evaluate(() => ({
    vals: ['bill', 'tip', 'people'].map(i => document.getElementById(i).value),
    errs: ['bill', 'tip', 'people'].map(i => document.getElementById(i + '-error').textContent),
    invalid: ['bill', 'tip', 'people'].map(i => document.getElementById(i).getAttribute('aria-invalid')),
    result: Array.from(document.querySelectorAll('#result p')).map(p => p.textContent),
    guide: document.getElementById('guide').hidden ? null : document.getElementById('guide').textContent,
  }));
  const type = async (id, v) => { await page.click('#' + id); await page.keyboard.press('Control+a'); await page.keyboard.press('Delete'); if (v) await page.keyboard.type(v); };
  const fill3 = async (b, t, p) => { await type('bill', b); await type('tip', t); await type('people', p); await page.keyboard.press('Tab'); };
  const shot = async n => { await page.screenshot({ path: `${OUT}/${n}.png`, fullPage: true }); };
  const layout = () => page.evaluate(() => {
    const w = document.documentElement.clientWidth; const wide = []; const cut = [];
    document.querySelectorAll('body *').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.right > w + 0.5 || r.left < -0.5)) wide.push(e.tagName + '#' + e.id);
      if (e.tagName !== 'INPUT' && e.tagName !== 'SCRIPT' && e.scrollWidth > e.clientWidth + 1 && e.clientWidth) cut.push(e.tagName + '#' + e.id); });
    return { innerWidth: window.innerWidth, docScrollWidth: document.documentElement.scrollWidth, sideways: document.documentElement.scrollWidth > window.innerWidth, wide, cut };
  });

  // fresh open
  await open(); R.open = { requests: reqs.slice(), state: await state() }; await shot('00-first-open');
  // (a)
  await fill3('100.00', '18', '4'); R.a = await state(); await shot('a-100-18-4');
  // (b)
  await open(); await fill3('10.00', '0', '3'); R.b = await state(); await shot('b-10-0-3');
  // (c)
  await open(); await fill3('$100', '18.5', '0'); R.c_wrong = await state(); await shot('c1-wrong');
  await fill3('100', '18', '4'); R.c_fixed = await state(); await shot('c2-corrected');
  // (d)
  await open(); await fill3('12,50', '18', '2'); R.d = await state(); await shot('d-comma');
  // (e)
  await open(); await fill3('12.5', '18', '2'); R.e = await state(); await shot('e-one-digit');
  // reload mid-task
  await open(); await type('bill', '100.00'); await type('tip', '18'); R.reload_before = await state(); await shot('s-reload-before');
  await page.reload(); R.reload_after = await state(); await shot('s-reload-after');
  await type('people', 'x'); await page.reload(); R.reload_after_error = await state();
  // empty / min / max
  await open(); R.empty_untouched = await state();
  await page.click('#bill'); await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); R.empty_tabbed = await state(); await shot('s-empty-tabbed');
  await open(); await fill3('0.01', '0', '1'); R.min = await state(); await shot('s-min');
  await open(); await fill3('1000000.00', '100', '100'); R.max = await state(); await shot('s-max');
  await open(); await fill3('1000000.01', '101', '101'); R.over_max = await state();
  await open(); await fill3('0.00', '-1', '0'); R.under_min = await state();
  // invalid in every field
  R.invalid = [];
  for (const [b, t, p] of [['abc', 'abc', 'abc'], ['1,000.00', '18.0', '4.'], ['1e3', '1e1', '+4'], ['.5', '18,5', '2.5'], ['-5', '-1', '-2'], ['12.345', ' ', ' '], ['10.', '', '']]) {
    await open(); await fill3(b, t, p); const s = await state(); R.invalid.push({ typed: [b, t, p], errs: s.errs, result: s.result });
  }
  await open(); await fill3('abc', 'abc', 'abc'); await shot('s-invalid-all');
  // widths
  R.widths = {};
  for (const w of [360, 768, 1280]) {
    await page.setViewportSize({ width: w, height: 800 }); R.widths[w] = {};
    await open(); R.widths[w].first = await layout(); await shot(`w${w}-first-open`);
    await fill3('1000000.00', '100', '3'); R.widths[w].result = await layout(); R.widths[w].resultText = (await state()).result; await shot(`w${w}-result`);
    await fill3('1,000.00', 'abc', 'abc'); R.widths[w].error = await layout(); await shot(`w${w}-error`);
  }
  await page.setViewportSize({ width: 1280, height: 800 });
  // paste
  const paste = async (txt, name) => {
    await open(); await page.bringToFront(); await page.click('#tip'); await page.keyboard.insertText(txt); await page.keyboard.press('Control+a'); await page.keyboard.press('Control+x');
    const cutLeft = (await state()).vals[1].length; if (cutLeft) throw new Error('cut failed');
    await page.click('#bill'); await page.keyboard.press('Control+v');
    const focused = await state(); await type('tip', '18'); await type('people', '4'); await page.keyboard.press('Tab');
    const s = await state(); await shot(name); return { pastedLength: txt.length, valueLength: s.vals[0].length, whileFocused: { errs: focused.errs, result: focused.result }, after: { errs: s.errs, result: s.result }, layout: await layout() };
  };
  R.paste_spaces = await paste(' '.repeat(60) + '1234.56', 's-paste-60-spaces');
  R.paste_digits = await paste('1'.repeat(70), 's-paste-70-digits');
  R.paste_spaces_only = await paste(' '.repeat(70), 's-paste-70-spaces');
  await page.setViewportSize({ width: 360, height: 800 });
  R.paste_digits_360 = await paste('1'.repeat(70), 's-paste-70-digits-w360');
  await page.setViewportSize({ width: 1280, height: 800 });
  R.pageErrors = errs;
  fs.writeFileSync(`${OUT}/results.json`, JSON.stringify(R, null, 1));
  await page.close(); await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
