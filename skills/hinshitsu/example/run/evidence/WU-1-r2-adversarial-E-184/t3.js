/* C3: the page's own fields and output against the auditor's own arithmetic (BigInt, written without the page's code). */
const { connect, URL } = require('./lib');
function ref(billText, tip, people) {
  const [w, f = ''] = billText.split('.');
  const bill = BigInt(w) * 100n + BigInt((f + '00').slice(0, 2));
  let tipC = bill * BigInt(tip) / 100n; if ((bill * BigInt(tip)) % 100n >= 50n) tipC += 1n;   // half a cent rounds up
  const total = bill + tipC, n = BigInt(people);
  const low = total / n, extra = total - low * n;                                              // extra people pay 1 cent more
  const fmt = c => (c / 100n).toString() + '.' + (c % 100n).toString().padStart(2, '0');
  const line = (k, c) => k === 1n ? `1 person pays ${fmt(c)}` : `${k} people pay ${fmt(c)} each`;
  const out = [`Bill total: ${fmt(bill)}`, `Tip percent: ${tip}`, `Number of people: ${people}`, `Tip amount: ${fmt(tipC)}`, `Total with tip: ${fmt(total)}`];
  if (extra > 0n) out.push(line(extra, low + 1n), line(n - extra, low), 'Your group decides who pays the higher amount.'); else out.push(line(n, low));
  return out;
}
/* Independent of ref(): parse the page's payment lines and check the sum and the spread. */
function invariants(lines) {
  const cents = s => { const m = /^(\d+)\.(\d\d)$/.exec(s); return m ? BigInt(m[1]) * 100n + BigInt(m[2]) : null; };
  const total = cents(lines[4].replace('Total with tip: ', '')); let sum = 0n, pays = [], count = 0n;
  for (const l of lines.slice(5)) { let m = /^1 person pays (\S+)$/.exec(l); if (m) { sum += cents(m[1]); pays.push(cents(m[1])); count += 1n; continue; } m = /^(\d+) people pay (\S+) each$/.exec(l); if (m) { sum += BigInt(m[1]) * cents(m[2]); pays.push(cents(m[2])); count += BigInt(m[1]); } }
  const people = BigInt(lines[2].replace('Number of people: ', ''));
  const spread = pays.length === 2 ? pays[0] - pays[1] : 0n;
  return sum === total && count === people && (spread === 0n || spread === 1n) && pays.length >= 1;
}
(async () => {
  const browser = await connect(); const ctx = await browser.newContext(); const page = await ctx.newPage(); await page.goto(URL);
  const read = () => page.evaluate(() => ({ r: [...document.querySelectorAll('#result p')].map(p => p.textContent), e: [...document.querySelectorAll('.error')].map(p => p.textContent).filter(Boolean) }));
  let n = 0, bad = 0, badInv = 0; const fails = [];
  async function one(b, t, p) {
    await page.fill('#bill', b); await page.fill('#tip', String(t)); await page.fill('#people', String(p));
    const got = await read(); const want = ref(b, t, p); n++;
    if (JSON.stringify(got.r) !== JSON.stringify(want)) { bad++; if (fails.length < 10) fails.push({ typed: [b, String(t), String(p)], page: got, auditor: want }); }
    else if (!invariants(got.r)) { badInv++; fails.push({ typed: [b, t, p], invariant: 'FAILED', page: got.r }); }
  }
  const t0 = Date.now();
  for (let c = 1; c <= 5000; c++) for (const t of [0, 15, 18, 20]) await one((c / 100).toFixed(2), t, 1);
  console.log('sweep 1: bills 0.01-50.00 step 0.01, tips 0/15/18/20, 1 person: cases', n, 'mismatches', bad, 'invariant failures', badInv); let n1 = n, b1 = bad;
  for (let c = 1; c <= 500; c++) for (let p = 1; p <= 12; p++) await one((c / 100).toFixed(2), 18, p);
  console.log('sweep 2: bills 0.01-5.00 step 0.01, 1-12 people, tip 18: cases', n - n1, 'mismatches', bad - b1, 'invariant failures', badInv);
  for (const [b, t, p] of [['10.00', '0', '3'], ['1000000.00', '100', '100'], ['0.01', '0', '100']]) { const before = bad; await one(b, t, p); const got = await read(); console.log('spot', JSON.stringify([b, t, p]), bad === before ? 'MATCH' : 'MISMATCH', '| page:', JSON.stringify(got), '| auditor:', JSON.stringify(ref(b, t, p))); }
  console.log('extra, beyond C3: top of the range');
  for (const [b, t, p] of [['999999.99', '100', '100'], ['999999.99', '99', '97'], ['999999.99', '1', '7'], ['500000.00', '100', '3'], ['999999.50', '15', '99']]) { const before = bad; await one(b, t, p); console.log('extra', JSON.stringify([b, t, p]), bad === before ? 'MATCH' : 'MISMATCH'); }
  console.log('total cases', n, 'mismatches', bad, 'seconds', Math.round((Date.now() - t0) / 1000));
  console.log('first mismatches:', JSON.stringify(fails, null, 1));
  await ctx.close(); await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
