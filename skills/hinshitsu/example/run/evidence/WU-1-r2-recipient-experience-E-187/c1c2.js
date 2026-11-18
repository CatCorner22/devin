const { connect, URL, SHOTS, state, expect } = require('./lib');
(async () => {
  const b = await connect(); const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const reqs = []; page.on('request', r => reqs.push(r.method() + ' ' + r.url()));
  const cdp = await ctx.newCDPSession(page); await cdp.send('Network.enable');
  const cdpReqs = []; cdp.on('Network.requestWillBeSent', e => cdpReqs.push(e.request.url));
  const errs = []; page.on('console', m => errs.push('console.' + m.type() + ': ' + m.text())); page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await page.goto(URL); await page.waitForTimeout(1500);
  console.log('C1 URL', page.url());
  console.log('C1 playwright request log (' + reqs.length + '):', JSON.stringify(reqs));
  console.log('C1 CDP Network.requestWillBeSent (' + cdpReqs.length + '):', JSON.stringify(cdpReqs));
  console.log('C1 performance resource entries:', await page.evaluate(() => performance.getEntriesByType('resource').length));
  console.log('C1 first-open state:', JSON.stringify(await state(page)));
  await page.screenshot({ path: SHOTS + 'c1-first-open-1280.png', fullPage: true });
  const cases = [['100.00','18','4'],['0.30','15','1'],['10.10','15','1'],['12.25','18','1'],['0100.5','007','02'],['10.00','0','3'],['1000000.00','100','100'],['0.01','0','100'],['12,50','20','3'],['0.01','100','1'],['0.01','50','1'],['0.03','50','2']];
  let i = 0;
  for (const [bi, ti, pe] of cases) {
    await page.reload();
    await page.click('#bill'); await page.keyboard.type(bi);
    await page.keyboard.press('Tab'); await page.keyboard.type(ti);
    await page.keyboard.press('Tab'); await page.keyboard.type(pe);
    const s = await state(page); const want = expect(bi, ti, pe);
    const ok = JSON.stringify(s.lines) === JSON.stringify(want) && s.resultText.split('\n').filter(x => x.trim()).join('|') === want.join('|') && s.errors.join('') === '';
    console.log(`C2/C3 typed ${bi} | ${ti} | ${pe} -> ${ok ? 'MATCH' : 'MISMATCH'}\n   page: ${JSON.stringify(s.lines)}\n   mine: ${JSON.stringify(want)}\n   errors: ${JSON.stringify(s.errors)}`);
    await page.screenshot({ path: SHOTS + `c2-case-${++i}.png`, fullPage: true });
  }
  console.log('console/page errors:', JSON.stringify(errs));
  console.log('requests after all cases (playwright):', reqs.length, 'distinct:', JSON.stringify([...new Set(reqs)]));
  await ctx.close(); await b.close();
})();
