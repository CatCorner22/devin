const { connect, URL, SHOTS, state } = require('./lib');
(async () => {
  const b = await connect(); const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage(); await p.goto(URL);
  const fillAll = async () => { await p.click('#bill'); await p.keyboard.type('100.00'); await p.click('#tip'); await p.keyboard.type('18'); await p.click('#people'); await p.keyboard.type('4'); };
  await fillAll();
  await p.evaluate(() => { window.__marker = 'same document'; });
  await p.keyboard.press('F5'); await p.waitForTimeout(1000);
  console.log('after synthetic F5 key: marker', await p.evaluate(() => window.__marker), '(a marker that survives means the key did not reload the page; the check is void)');
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Page.reload', { ignoreCache: false }); await p.waitForTimeout(1200);
  let s = await state(p); console.log('after Page.reload (normal reload): marker', await p.evaluate(() => window.__marker), 'values', JSON.stringify(s.values), 'errors', JSON.stringify(s.errors), 'result', JSON.stringify(s.lines), 'navigation type', await p.evaluate(() => performance.getEntriesByType('navigation')[0].type));
  await fillAll(); await cdp.send('Page.reload', { ignoreCache: true }); await p.waitForTimeout(1200);
  s = await state(p); console.log('after Page.reload ignoring cache (hard reload): values', JSON.stringify(s.values), 'errors', JSON.stringify(s.errors), 'result', JSON.stringify(s.lines));
  await fillAll(); await p.evaluate(() => location.reload()); await p.waitForTimeout(1200);
  s = await state(p); console.log('after location.reload(): values', JSON.stringify(s.values), 'errors', JSON.stringify(s.errors), 'result', JSON.stringify(s.lines));
  await ctx.close(); await b.close();
})();
