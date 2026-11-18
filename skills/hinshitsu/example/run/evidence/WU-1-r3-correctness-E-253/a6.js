const { launch, URL, typeInto, state, show } = require('./lib');
(async () => {
  const browser = await launch();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
  const good = { bill: '100.00', tip: '18', people: '4' };
  for (const f of ['bill', 'tip', 'people']) for (const v of ['   ', '\u200B\u00A0\uFEFF']) {
    await page.goto(URL); for (const g of Object.keys(good)) if (g !== f) await typeInto(page, g, good[g]); await typeInto(page, f, v);
    const s = await state(page); console.log(f, show(v), '=> msg', show(s[f + 'Err']), '| result lines', s.lines.length);
  }
  for (const v of ['12345678.00', '10000000', '1000000.01', '0', '0.0', '00.00']) { await page.goto(URL); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4'); await typeInto(page, 'bill', v); const s = await state(page); console.log('bill', show(v), '=> msg', show(s.billErr), '| result lines', s.lines.length); }
  await page.goto(URL); await typeInto(page, 'bill', '10.00'); await typeInto(page, 'tip', '0'); await typeInto(page, 'people', '3');
  console.log('markup of a 2-line result:', await page.evaluate(() => document.getElementById('result').innerHTML));
  await typeInto(page, 'people', '2');
  console.log('markup of a 1-line result:', await page.evaluate(() => document.getElementById('result').innerHTML));
  await typeInto(page, 'people', 'x');
  console.log('markup after an error:', show(await page.evaluate(() => document.getElementById('result').innerHTML)), '| aria-invalid on people:', await page.getAttribute('#people', 'aria-invalid'));
  await typeInto(page, 'people', '2');
  console.log('aria-invalid on people after a valid value:', await page.getAttribute('#people', 'aria-invalid'));
  await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
