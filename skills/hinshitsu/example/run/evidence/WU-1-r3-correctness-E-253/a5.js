const { launch, URL, FILE, typeInto, state, show } = require('./lib');
const fs = require('fs');
const brief = s => 'msgs[' + [s.billErr, s.tipErr, s.peopleErr].map(m => m ? 'Y' : '-').join('') + '] result ' + (s.lines.length ? show(s.lines[0]) : 'none');
(async () => {
  const browser = await launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const fill3 = async b => { await page.goto(URL); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4'); await typeInto(page, 'bill', b); };
  console.log('== visible format characters at an end (tip 18, people 4) ==');
  for (const b of ['\u060012.50', '12.50\u06DD', '\u070F12.50', '\u08E212.50', '\u168012.50', '12.50\u0301', '12.50\u20E3']) { await fill3(b); await page.screenshot({ path: 'shots/x-' + b.codePointAt(b.startsWith('1') ? 5 : 0).toString(16) + '.png', clip: { x: 300, y: 100, width: 700, height: 120 } }); console.log('bill', show(b), '=>', brief(await state(page))); }
  console.log('== invisible characters inside the number ==');
  for (const b of ['12\u200B.50', '1\u00AD2.50', '12.\u200E50', '1 2.50', '12.5\uFE0F0']) { await fill3(b); const s = await state(page); console.log('bill', show(b), '=>', brief(s), s.billErr ? '| ' + show(s.billErr.slice(0, 44)) : ''); }
  console.log('== maxlength 64 ==');
  const helper = await ctx.newPage();
  for (const text of [' '.repeat(60) + '1234.56', '0'.repeat(60) + '1234.56', ' '.repeat(57) + '12.50' + ' '.repeat(10), ' '.repeat(62) + '15']) {
    await helper.setContent('<textarea id="t"></textarea>'); await helper.evaluate(t => { document.getElementById('t').value = t; }, text);
    await helper.bringToFront(); await helper.click('#t'); await helper.keyboard.press('Control+A'); await helper.keyboard.press('Control+C');
    await page.bringToFront(); await page.goto(URL); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '1');
    const target = text.endsWith('15') ? 'tip' : 'bill';
    await page.click('#' + target); await page.keyboard.press('Control+A'); await page.keyboard.press('Control+V');
    const s = await state(page); const v = s.values[target === 'bill' ? 0 : 1];
    console.log('pasted into', target, show(text.replace(/^ +/, m => `<${m.length} spaces>`).replace(/^0{20,}/, m => `<${m.length} zeros>`).replace(/ +$/, m => `<${m.length} spaces>`)), '(' + text.length + ' chars) | field holds', v.length, 'chars ending', show(v.slice(-8)), '|', 'msgs', show(s.billErr + s.tipErr), '| result', show(s.lines.slice(0, 2)));
  }
  await page.goto(URL); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '1'); await typeInto(page, 'bill', ' '.repeat(60) + '1234.56');
  { const s = await state(page); console.log('typed key by key: 60 spaces + 1234.56 | field holds', s.values[0].length, 'chars ending', show(s.values[0].slice(-8)), '| msgs', show(s.billErr), '| result', show(s.lines.slice(0, 1))); }
  console.log('== simulation: an engine that rejects the script (copy outside the repository, 1 property name changed) ==');
  const sim = '/home/ubuntu/audit/work/sim-script-fails.html';
  fs.writeFileSync(sim, fs.readFileSync(FILE, 'utf8').replace('\\p{Default_Ignorable_Code_Point}', '\\p{No_Such_Property}'));
  const p3 = await ctx.newPage(); const errs = []; p3.on('pageerror', e => errs.push(String(e).slice(0, 90)));
  await p3.goto('file://' + sim);
  console.log('page errors:', errs, '| visible text:', show(await p3.locator('body').innerText()), '| visible inputs:', await p3.locator('input:visible').count());
  await p3.screenshot({ path: 'shots/sim-script-fails.png' });
  await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
