const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME, args: ['--no-sandbox'] });
  const p = await b.newPage(); await p.goto('file://' + process.argv[2]);
  const st = async () => ({ r: (await p.locator('#result').innerText()).replace(/\n+/g,' | '), e: await p.$$eval('.error', x => x.map(e => e.textContent)) });
  const run = async (bill, tip, people) => { await p.fill('#bill', bill); await p.fill('#tip', tip); await p.fill('#people', people); await p.locator('h1').click(); return st(); };
  for (const c of [['12,50','18','3'],['12.5','18','3'],['1,000.00','0','1'],['1.000,00','0','1'],['1,000','0','1'],['10.','0','1'],['10,','0','1'],['.5','0','1'],['\uFF11\uFF12\uFF0E\uFF15\uFF10','0','1'],['\u0661\u0662\u066B\u0665','\u0665','\u0662'],['12.50\u200B','0','1'],['12\uFF0C50','0','1'],['0100.5','007','02'],['5','18,5','2'],['5','0','']])
    console.log(JSON.stringify(c), '=>', JSON.stringify(await run(...c)));
  await p.reload(); await p.click('#bill'); await p.keyboard.type('12.'); console.log('typing 12. focused:', JSON.stringify(await st()));
  await p.keyboard.type('5'); console.log('typing 12.5:', JSON.stringify(await st()));
  await p.keyboard.press('Backspace'); await p.keyboard.press('Tab'); console.log('12. after leaving:', JSON.stringify(await st()));
  await p.fill('#bill','abc'); await p.evaluate(() => { window.__n = 0; new MutationObserver(m => window.__n += m.length).observe(document.querySelector('main'), { subtree: true, childList: true, characterData: true }); });
  await p.click('#tip'); await p.keyboard.type('18'); console.log('changes while typing in tip with a bill error:', await p.evaluate(() => window.__n));
  await p.fill('#bill','10'); await p.fill('#people','3'); await p.evaluate(() => window.__n = 0); await p.click('#bill'); await p.click('#tip'); await p.click('#people'); await p.locator('h1').click();
  console.log('changes while moving focus with a result:', await p.evaluate(() => window.__n));
  await b.close();
  const b2 = await chromium.launch({ executablePath: process.env.CHROME, args: ['--no-sandbox'] });
  const c2 = await b2.newContext({ javaScriptEnabled: false }); const q = await c2.newPage(); await q.goto('file://' + process.argv[2]);
  console.log('JS off visible text:', JSON.stringify((await q.locator('body').innerText()).trim()), 'visible inputs:', await q.locator('input:visible').count());
  await b2.close();
})();
