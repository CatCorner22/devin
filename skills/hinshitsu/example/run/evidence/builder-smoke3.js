const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME, args: ['--no-sandbox'] });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(String(e))); await p.goto('file://' + process.argv[2]);
  const st = async () => ({ r: (await p.locator('#result').innerText()).replace(/\n+/g,' | ').slice(0,60), e: (await p.$$eval('.error', x => x.map(e => e.textContent.slice(0,30)))).join(' / ') });
  const set = async (id, v) => { await p.evaluate(([id, v]) => { const e = document.getElementById(id); e.focus(); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); };
  const run = async (bill, tip, people) => { await set('bill', bill); await set('tip', tip); await set('people', people); await p.locator('h1').click(); return st(); };
  const cases = [['5\u00B2','18','4'],['12\u2075\u2070','18','4'],['\u2460\u2461','18','4'],['\u{1D7CF}\u{1D7D0}','18','4'],['12\u202450','18','4'],['100.00','1\u00B2','\u2463'],['\u3251','0','1'],
    ['\u200E12.50','0','1'],['12.50\u200F','0','1'],['\u061C12.50','0','1'],['\u00AD12.50','0','1'],['\u206612.50\u2069','0','1'],['\u202A12.50\u202C','\u200E18','4\u200F'],['\u00A012.50\uFEFF','0','1'],['12\u200B.50','0','1'],
    ['\uFF11\uFF12\uFF0E\uFF15\uFF10','0','1'],['\u0661\u0662\u066B\u0665','\u0665','\u0662'],['\u06F1\u06F2','0','1'],['\u0967\u0968','0','1'],['12\uFF0C50','0','1'],['1000000.00','100','100'],['1000000.01','0','1'],['1,000','0','1'],['$12','0','1']];
  for (const c of cases) console.log(JSON.stringify(c.map(x => [...x].map(ch => ch.codePointAt(0) > 126 ? 'U+' + ch.codePointAt(0).toString(16).toUpperCase() : ch).join(''))), '=>', JSON.stringify(await run(...c)));
  await p.reload(); await p.fill('#tip','18'); await p.fill('#people','4'); await p.click('#bill'); await p.keyboard.type('12.'); console.log('12. focused:', JSON.stringify(await st()));
  await p.keyboard.press('Tab'); console.log('12. left:', JSON.stringify(await st())); await p.keyboard.press('Shift+Tab'); console.log('12. back in field:', JSON.stringify(await st()));
  await p.reload(); const t0 = Date.now(); await set('tip', '1' + ' '.repeat(100000) + 'x'); console.log('100000 spaces ms:', Date.now() - t0, 'maxlength:', await p.getAttribute('#tip', 'maxlength'));
  console.log('globals:', await p.evaluate(() => ['splitBill','plain','readAmount','fields','update','money'].filter(n => n in window)), 'errors:', errs);
  await b.close();
})();
