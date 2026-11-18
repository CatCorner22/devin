const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const p = await b.newPage();
  const reqs = []; p.on('request', r => reqs.push(r.url()));
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  await p.goto('file://' + process.argv[2]);
  const run = async (bill, tip, people) => { await p.fill('#bill', bill); await p.fill('#tip', tip); await p.fill('#people', people);
    return { hidden: (await p.textContent('#result')) === '', text: (await p.locator('#result').innerText()).replace(/\n+/g,' | '),
      e: [await p.textContent('#bill-error'), await p.textContent('#tip-error'), await p.textContent('#people-error')] }; };
  console.log('first open:', (await p.textContent('#result')) === '', JSON.stringify(await p.$$eval('.error', x => x.map(e => e.textContent))));
  for (const c of [['100.00','18','4'],['0.30','15','1'],['10.10','15','1'],['12.25','18','1'],['10.00','0','3'],['1000000.00','100','100'],['0.01','0','100'],['12,50','18','4'],['10.','18.0','+4'],['1000000.01','101','0'],[' 5.5 ',' 0 ',' 2 ']])
    console.log(c.join(' / '), '=>', JSON.stringify(await run(...c)));
  console.log('requests:', reqs.length, 'errors:', JSON.stringify(errs));
  console.log('fetch:', await p.evaluate(() => fetch('https://example.com').then(() => 'ALLOWED', e => 'blocked: ' + e.message)));
  await p.fill('#bill', '5'); await p.reload(); console.log('after reload bill=', JSON.stringify(await p.inputValue('#bill')));
  for (const w of [360, 768, 1280]) { await p.setViewportSize({ width: w, height: 800 }); await p.fill('#bill','1000000.00'); await p.fill('#tip','100'); await p.fill('#people','7');
    console.log(w, 'scrollWidth', await p.evaluate(() => document.documentElement.scrollWidth)); await p.screenshot({ path: `/tmp/smoke-${w}.png`, fullPage: true }); }
  await b.close();
})();
