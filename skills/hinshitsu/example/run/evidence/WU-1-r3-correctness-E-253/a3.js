const { launch, URL, typeInto, state, show } = require('./lib');
// The AUDITOR's own arithmetic. It shares no code with the page.
function expected(billText, tipText, peopleText) {
  const [w, f = ''] = billText.replace(',', '.').split('.');
  const bill = BigInt(w) * 100n + BigInt((f + '00').slice(0, 2));
  const tipPct = BigInt(tipText), n = BigInt(peopleText);
  const twice = bill * tipPct * 2n;                 // tip in 1/200 of a cent
  const tip = (twice + 100n) / 200n;                // half a cent rounds up
  const total = bill + tip;
  const low = total / n, extra = total - low * n;   // `extra` people pay 1 cent more
  const fmt = c => (c / 100n).toString() + '.' + (c % 100n).toString().padStart(2, '0');
  const pay = (count, c) => count === 1n ? `1 person pays ${fmt(c)}` : `${count} people pay ${fmt(c)} each`;
  const lines = [`Bill total: ${fmt(bill)}`, `Tip percent: ${tipPct}`, `Number of people: ${n}`, `Tip amount: ${fmt(tip)}`, `Total with tip: ${fmt(total)}`];
  if (extra > 0n) { lines.push(pay(extra, low + 1n), pay(n - extra, low), 'Your group decides who pays the higher amount.'); } else { lines.push(pay(n, low)); }
  return lines;
}
// Reads the page's own lines back into cents and checks sum and spread.
function invariants(lines) {
  const cents = t => { const m = /(\d+)\.(\d\d)/.exec(t); return BigInt(m[1]) * 100n + BigInt(m[2]); };
  const total = cents(lines[4]); let sum = 0n; const amounts = [];
  for (const l of lines.slice(5)) { const m = /^(\d+) (?:person pays|people pay) /.exec(l); if (!m) continue; const c = cents(l.slice(m[0].length)); sum += BigInt(m[1]) * c; amounts.push(c); }
  const spread = amounts.reduce((a, b) => a > b ? a : b) - amounts.reduce((a, b) => a < b ? a : b);
  return sum === total && spread <= 1n && (amounts.length < 2 || amounts[0] > amounts[1]);
}
async function run(browser, name, jobs) {
  const ctx = await browser.newContext({ viewport: { width: 800, height: 900 } });
  const page = await ctx.newPage(); await page.goto(URL);
  let n = 0, bad = 0; const fails = []; let cur = {};
  for (const [b, t, p] of jobs) {
    if (cur.t !== t) { await typeInto(page, 'tip', t); cur.t = t; cur.focus = 'tip'; }
    if (cur.p !== p) { await typeInto(page, 'people', p); cur.p = p; cur.focus = 'people'; }
    if (cur.focus !== 'bill') { await page.click('#bill'); cur.focus = 'bill'; }
    await page.keyboard.press('Control+A'); await page.keyboard.type(b);
    const s = await state(page); const exp = expected(b, t, p); n++;
    const ok = s.values[0] === b && s.values[1] === t && s.values[2] === p && JSON.stringify(s.lines) === JSON.stringify(exp) && s.billErr + s.tipErr + s.peopleErr === '' && invariants(s.lines);
    if (!ok) { bad++; if (fails.length < 5) fails.push(show({ typed: [b, t, p], page: s.lines, auditor: exp, msgs: [s.billErr, s.tipErr, s.peopleErr] })); }
  }
  await ctx.close();
  return { name, cases: n, mismatches: bad, fails };
}
(async () => {
  const t0 = Date.now();
  const browser = await launch();
  const two = c => Math.floor(c / 100) + '.' + String(c % 100).padStart(2, '0');
  const sets = [];
  for (const tip of ['0', '15', '18', '20']) { const j = []; for (let c = 1; c <= 5000; c++) j.push([two(c), tip, '1']); sets.push(['bills 0.01-50.00, tip ' + tip + ', 1 person', j]); }
  for (const grp of [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) { const j = []; for (const p of grp) for (let c = 1; c <= 500; c++) j.push([two(c), '18', String(p)]); sets.push(['bills 0.01-5.00, tip 18, people ' + grp.join(','), j]); }
  sets.push(['spot cases', [['10.00', '0', '3'], ['1000000.00', '100', '100'], ['0.01', '0', '100']]]);
  { const j = []; for (let d = 1; d <= 500; d++) j.push([Math.floor(d / 10) + '.' + d % 10, '18', '1']); sets.push(['EXTRA (not named in C3): bills 0.1-50.0 typed with 1 decimal place, tip 18, 1 person', j]); }
  const results = await Promise.all(sets.map(([name, j]) => run(browser, name, j)));
  let total = 0;
  for (const r of results) { console.log(r.name + ': cases ' + r.cases + ', mismatches ' + r.mismatches); r.fails.slice(0, 2).forEach(f => console.log('   ' + f)); if (!r.name.startsWith('EXTRA')) total += r.cases; }
  const page = await (await browser.newContext()).newPage();
  for (const [b, t, p] of [['10.00', '0', '3'], ['1000000.00', '100', '100'], ['0.01', '0', '100']]) { await page.goto(URL); await typeInto(page, 'bill', b); await typeInto(page, 'tip', t); await typeInto(page, 'people', p); console.log('spot', b, t, p, '=>', show((await state(page)).lines)); }
  console.log('C3 cases compared (without EXTRA):', total, '| seconds:', Math.round((Date.now() - t0) / 1000));
  await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
