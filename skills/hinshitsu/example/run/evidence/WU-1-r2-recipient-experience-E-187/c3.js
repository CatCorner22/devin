const { connect, URL, state, expect } = require('./lib');
(async () => {
  const b = await connect(); const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage(); await page.goto(URL);
  const read = () => page.evaluate(() => [Array.from(document.querySelectorAll('#result p')).map(p => p.textContent), document.getElementById('result').innerText, ['bill','tip','people'].map(n => document.getElementById(n + '-error').textContent).join('')]);
  let n = 0, bad = 0, sumBad = 0; const t0 = Date.now();
  const check = async (bi, ti, pe) => {
    const [lines, text, err] = await read(); const want = expect(bi, ti, pe); n++;
    // independent invariants read from the page's own lines: sum and spread
    const pays = lines.slice(5).filter(l => /^\d+ (person pays|people pay) /.test(l)).map(l => { const m = /^(\d+) (?:person pays|people pay) (\d+)\.(\d\d)/.exec(l); return [BigInt(m[1]), BigInt(m[2]) * 100n + BigInt(m[3])]; });
    const tot = /^Total with tip: (\d+)\.(\d\d)$/.exec(lines[4] || ''); const totC = tot ? BigInt(tot[1]) * 100n + BigInt(tot[2]) : -1n;
    const sum = pays.reduce((a, [k, c]) => a + k * c, 0n); const cs = pays.map(p => p[1]);
    const spread = cs.length ? cs.reduce((a, c) => c > a ? c : a) - cs.reduce((a, c) => c < a ? c : a) : 99n;
    const cnt = pays.reduce((a, [k]) => a + k, 0n);
    if (sum !== totC || spread > 1n || cnt !== BigInt(pe) || (cs.length === 2 && cs[0] <= cs[1])) { sumBad++; if (sumBad <= 20) console.log('INVARIANT FAIL', bi, ti, pe, JSON.stringify(lines)); }
    if (JSON.stringify(lines) !== JSON.stringify(want) || text.split('\n').filter(x => x.trim()).join('|') !== want.join('|') || err !== '') { bad++; if (bad <= 20) console.log('MISMATCH', bi, ti, pe, JSON.stringify(lines), JSON.stringify(want), err); }
  };
  for (const tip of ['0', '15', '18', '20']) {
    await page.fill('#tip', tip); await page.fill('#people', '1'); let k = 0;
    for (let c = 1; c <= 5000; c++) { const bi = (c / 100).toFixed(2); await page.fill('#bill', bi); await check(bi, tip, '1'); k++; }
    console.log(`sweep A tip ${tip}, 1 person, bills 0.01..50.00: ${k} cases; running mismatches ${bad}, invariant failures ${sumBad}`);
  }
  for (let p = 1; p <= 12; p++) {
    await page.fill('#tip', '18'); await page.fill('#people', String(p)); let k = 0;
    for (let c = 1; c <= 500; c++) { const bi = (c / 100).toFixed(2); await page.fill('#bill', bi); await check(bi, '18', String(p)); k++; }
    console.log(`sweep B tip 18, ${p} people, bills 0.01..5.00: ${k} cases; running mismatches ${bad}, invariant failures ${sumBad}`);
  }
  // a sample typed key by key instead of fill()
  let kk = 0;
  for (let c = 1; c <= 5000; c += 37) { const bi = (c / 100).toFixed(2); const pe = String(1 + (c % 12));
    for (const [id, v] of [['#bill', bi], ['#tip', '18'], ['#people', pe]]) { await page.click(id); await page.keyboard.press('Control+a'); await page.keyboard.type(v); }
    await check(bi, '18', pe); kk++; }
  console.log(`key-by-key sample: ${kk} cases`);
  console.log(`TOTAL cases ${n}; mismatches against auditor's code ${bad}; sum/spread/order invariant failures ${sumBad}; seconds ${((Date.now() - t0) / 1000).toFixed(0)}`);
  await ctx.close(); await b.close();
})();
