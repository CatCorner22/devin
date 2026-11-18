// Auditor script 3: C3 sweep. Values go into the page's own fields with Playwright fill()
// (sets the field's value and fires the page's own "input" event); output is read from #result.
const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const URL = 'file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html';
// Auditor's own arithmetic, in BigInt, written without reference to the page's splitBill().
function expect(billStr, tip, people) {
  const [w, d = ''] = billStr.split('.');
  const bill = BigInt(w) * 100n + BigInt((d + '00').slice(0, 2));
  const twice = 2n * bill * BigInt(tip);            // tip in half-hundredths of a cent
  const tipC = (twice + 100n) / 200n;               // half a cent rounds up
  const total = bill + tipC; const n = BigInt(people);
  const lo = total / n, hi = lo + 1n, nHi = total - lo * n, nLo = n - nHi;
  const pays = []; if (nHi > 0n) pays.push([nHi, hi]); pays.push([nLo, lo]);
  return { bill, tipC, total, pays };
}
const cents = s => { const m = /^(\d+)\.(\d\d)$/.exec(s); if (!m) throw new Error('bad money ' + s); return BigInt(m[1]) * 100n + BigInt(m[2]); };
function parse(lines) {
  const o = { pays: [] };
  for (const l of lines) { let m;
    if ((m = /^Bill: (\S+)$/.exec(l))) o.bill = cents(m[1]);
    else if ((m = /^Tip: (\d+) percent$/.exec(l))) o.tip = m[1];
    else if ((m = /^People: (\d+)$/.exec(l))) o.people = m[1];
    else if ((m = /^Tip amount: (\S+)$/.exec(l))) o.tipC = cents(m[1]);
    else if ((m = /^Total: (\S+)$/.exec(l))) o.total = cents(m[1]);
    else if ((m = /^1 person pays (\S+)$/.exec(l))) o.pays.push([1n, cents(m[1])]);
    else if ((m = /^(\d+) people pay (\S+) each$/.exec(l))) o.pays.push([BigInt(m[1]), cents(m[2])]);
    else if (l === 'Your group decides who pays the extra cent.') o.note = true;
    else o.unknown = l; }
  return o;
}
(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:29229');
  const page = await browser.contexts()[0].newPage(); await page.goto(URL);
  const read = () => page.evaluate(() => { const r = document.getElementById('result'); return { vis: getComputedStyle(r).display !== 'none', lines: Array.from(r.querySelectorAll('p')).map(p => p.textContent), errs: ['bill','tip','people'].map(n => document.getElementById(n + '-error').textContent) }; });
  let n = 0, fails = 0; const failList = []; let two = 0;
  async function check(b, t, p, typed) {
    const s = await read(); n++;
    const e = expect(b.trim(), Number(t), Number(p)); let why = null;
    try {
      if (!s.vis) why = 'no result; errors ' + JSON.stringify(s.errs);
      else { const o = parse(s.lines);
        const sum = o.pays.reduce((a, [c, v]) => a + c * v, 0n), cnt = o.pays.reduce((a, [c]) => a + c, 0n);
        const vals = o.pays.map(x => x[1]); const spread = vals.length === 2 ? vals[0] - vals[1] : 0n;
        if (o.unknown) why = 'unknown line ' + o.unknown;
        else if (o.bill !== e.bill || o.tip !== String(Number(t)) || o.people !== String(Number(p))) why = 'echo differs';
        else if (o.tipC !== e.tipC) why = 'tip ' + o.tipC + ' != ' + e.tipC;
        else if (o.total !== e.total) why = 'total ' + o.total + ' != ' + e.total;
        else if (sum !== o.total) why = 'payments sum ' + sum + ' != total ' + o.total;
        else if (cnt !== BigInt(p)) why = 'payer count ' + cnt;
        else if (spread > 1n || spread < 0n) why = 'spread ' + spread;
        else if (JSON.stringify(o.pays.map(x => x.map(String))) !== JSON.stringify(e.pays.map(x => x.map(String)))) why = 'payments differ from auditor';
        else if (o.pays.length > 2) why = 'more than 2 pay lines';
        if (o.pays.length === 2) two++; }
    } catch (err) { why = 'parse: ' + err.message; }
    if (why) { fails++; if (failList.length < 20) failList.push([b, t, p, why, s.lines]); }
  }
  const t0 = Date.now();
  // Sweep A: bills 0.01..50.00, tips 0/15/18/20, 1 person
  await page.fill('#people', '1'); let a = 0;
  for (const t of ['0', '15', '18', '20']) { await page.fill('#tip', t);
    for (let c = 1; c <= 5000; c++) { const b = (c / 100).toFixed(2); await page.fill('#bill', b); await check(b, t, '1'); a++; } }
  console.log('Sweep A cases:', a, 'failures so far:', fails, 'secs', (Date.now() - t0) / 1000);
  // Sweep B: bills 0.01..5.00, people 1..12, tip 18
  await page.fill('#tip', '18'); let bcount = 0;
  for (let p = 1; p <= 12; p++) { await page.fill('#people', String(p));
    for (let c = 1; c <= 500; c++) { const b = (c / 100).toFixed(2); await page.fill('#bill', b); await check(b, '18', String(p)); bcount++; } }
  console.log('Sweep B cases:', bcount, 'failures so far:', fails, 'secs', (Date.now() - t0) / 1000);
  // Spot cases, typed key by key
  for (const [b, t, p] of [['10.00', '0', '3'], ['1000000.00', '100', '100'], ['0.01', '0', '100']]) {
    for (const [id, v] of [['bill', b], ['tip', t], ['people', p]]) { await page.click('#' + id); await page.keyboard.press('Control+a'); await page.keyboard.press('Delete'); await page.keyboard.type(v); }
    const before = fails; await check(b, t, p); console.log('spot', JSON.stringify([b, t, p]), '->', JSON.stringify((await read()).lines), fails === before ? 'MATCH' : 'MISMATCH'); }
  console.log('TOTAL cases:', n, 'failures:', fails, 'cases with 2 pay lines:', two);
  console.log('failure samples:', JSON.stringify(failList));
  await page.close(); await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
