const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const url = 'file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html';
// The auditor's own arithmetic, in BigInt cents. Not taken from the page.
function expect(billStr, tip, people) {
  const [w, f = ''] = billStr.split('.');
  const cents = BigInt(w) * 100n + BigInt((f + '00').slice(0, 2));
  const num = cents * BigInt(tip);            // hundredths of a cent
  let tipC = num / 100n; if ((num % 100n) * 2n >= 100n) tipC += 1n;   // nearest cent, half up
  const total = cents + tipC, n = BigInt(people);
  const base = total / n, extra = total % n;
  const fmt = (c) => (c / 100n).toString() + '.' + (c % 100n).toString().padStart(2, '0');
  const pays = [];
  const line = (k, c) => k === 1n ? `1 person pays ${fmt(c)}` : `${k} people pay ${fmt(c)} each`;
  if (extra > 0n) pays.push(line(extra, base + 1n));
  pays.push(line(n - extra, base));
  const out = [`Bill total: ${fmt(cents)}`, `Tip percent: ${tip}`, `Number of people: ${people}`, `Tip amount: ${fmt(tipC)}`, `Total with tip: ${fmt(total)}`, ...pays];
  if (pays.length === 2) out.push('Your group decides who pays the higher amount.');
  return out.join('\n');
}
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/ubuntu/.local/bin/google-chrome', headless: true });
  const page = await (await browser.newContext()).newPage();
  await page.goto(url);
  const read = () => page.evaluate(() => Array.from(document.querySelectorAll('#result p')).map(p => p.textContent).join('\n'));
  let n = 0, bad = 0; const t0 = Date.now();
  async function check(b, t, p, typed) {
    n++;
    const got = await read(); const want = expect(b, t, p);
    if (got !== want) { bad++; if (bad <= 20) console.log('MISMATCH', b, t, p, JSON.stringify(got), JSON.stringify(want)); }
  }
  // sweep 1: bills 0.01..50.00, tips 0,15,18,20, 1 person
  await page.fill('#people', '1');
  for (const t of [0, 15, 18, 20]) {
    await page.fill('#tip', String(t));
    for (let c = 1; c <= 5000; c++) { const b = (c / 100).toFixed(2); await page.fill('#bill', b); await check(b, t, 1); }
  }
  console.log('sweep 1 cases', n, 'mismatches', bad, 'seconds', Math.round((Date.now() - t0) / 1000));
  const n1 = n;
  // sweep 2: bills 0.01..5.00, people 1..12, tip 18
  await page.fill('#tip', '18');
  for (let p = 1; p <= 12; p++) {
    await page.fill('#people', String(p));
    for (let c = 1; c <= 500; c++) { const b = (c / 100).toFixed(2); await page.fill('#bill', b); await check(b, 18, p); }
  }
  console.log('sweep 2 cases', n - n1, 'mismatches so far', bad, 'seconds', Math.round((Date.now() - t0) / 1000));
  // spot cases, typed key by key
  for (const [b, t, p] of [['10.00', '0', '3'], ['1000000.00', '100', '100'], ['0.01', '0', '100']]) {
    await page.reload();
    await page.click('#bill'); await page.keyboard.type(b); await page.click('#tip'); await page.keyboard.type(t); await page.click('#people'); await page.keyboard.type(p);
    const got = await read(); const want = expect(b, Number(t), Number(p));
    console.log('spot', b, t, p, got === want ? 'MATCH' : 'MISMATCH', JSON.stringify(got));
    if (got !== want) bad++;
  }
  console.log('TOTAL cases', n + 3, 'mismatches', bad);
  await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
