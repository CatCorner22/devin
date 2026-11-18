const { connect, URL, state, fill3 } = require('./lib');
const J = x => (x && x.r && 'be' in x) ? 'be=' + JSON.stringify(x.be) + ' te=' + JSON.stringify(x.te) + ' pe=' + JSON.stringify(x.pe) + ' result=' + JSON.stringify(x.r.join(' | ')) : JSON.stringify(x);
(async () => {
  const browser = await connect();
  console.log('browser', browser.version());
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const reqs = []; page.on('request', r => reqs.push(r.url()));
  const cdp = await ctx.newCDPSession(page); await cdp.send('Network.enable');
  const cdpReqs = []; cdp.on('Network.requestWillBeSent', e => cdpReqs.push(e.request.url));
  const errs = []; page.on('pageerror', e => errs.push(String(e))); page.on('console', m => errs.push('console:' + m.text()));
  await page.goto(URL); await page.waitForTimeout(500);
  console.log('C1 playwright requests', reqs.length, J(reqs)); console.log('C1 CDP requests', cdpReqs.length, J(cdpReqs));
  console.log('C4 first open', J(await state(page)), J(await page.evaluate(() => ({ vals: ['bill','tip','people'].map(i => document.getElementById(i).value), guideVisible: !document.getElementById('guide').hidden, guide: document.getElementById('guide').textContent, visibleText: document.body.innerText }))));
  console.log('--- C2 tests');
  for (const c of [['100.00','18','4'],['0.30','15','1'],['10.10','15','1'],['12.25','18','1'],['0100.5','007','02'],['10.00','0','3'],['1000000.00','100','100'],['0.01','0','100'],['1000000','0','1'],['999999.99','100','100'],['1000000.01','0','1'],['0.01','100','1'],['0.01','50','1'],['0.03','50','2']])
    console.log(J(c), '=>', J(await fill3(page, ...c)));
  console.log('--- C4 error inputs (bill; tip=18 people=4 valid), after leaving field');
  for (const b of ['', 'abc', '1,000.00', '1.000,00', '1e3', '10.', '.5', '$5', '5€', '-5', '0', '0.00', '0,0', '1000000.01', '1.234', '12,50', '12.5', ' 12.50 ', '\u200b12.50\ufeff', '１２．５０', '١٢٫٥٠', '۱۲٫۵۰', '１２，５０', '+5', '1 2', '12..5', '12.,5', '0x10', 'Infinity', 'NaN', '1_000', "1'000", '1 000', '１,０００'])
    console.log('bill', J(b), '=>', J(await fill3(page, b, '18', '4')));
  console.log('--- C4 tip inputs (bill=100 people=4)');
  for (const t of ['', '18.0', '18,5', '1e1', '+4', '4.', '-1', '101', '100', '0', '000', '00100', 'a', '１８', '١٨', '۱۸', ' 18 ', '18%', '1 8'])
    console.log('tip', J(t), '=>', J(await fill3(page, '100', t, '4')));
  console.log('--- C4 people inputs (bill=100 tip=18)');
  for (const p of ['', '0', '00', '101', '100', '1', '18.0', '18,5', '1e1', '+4', '4.', '-1', '４', '٤', 'two'])
    console.log('people', J(p), '=>', J(await fill3(page, '100', '18', p)));
  console.log('pageerrors', J(errs));
  await ctx.close(); await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
