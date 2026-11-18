const { open, readState, typeInto, expected, checkPayLines, fmt, URL_ } = require('./common');
(async () => {
  const { browser, page } = await open();
  await page.goto(URL_);
  let cases = 0, fails = 0, extraLineCases = 0; const failList = []; const extraKinds = {};
  async function check(bill, tip, people) {
    const s = await readState(page);
    const e = expected(bill, tip, people);
    cases++;
    let why = null;
    if (s.vals.join('|') !== [bill, tip, people].join('|')) why = 'field values ' + JSON.stringify(s.vals);
    else if (!s.resultShown) why = 'no result; errs ' + JSON.stringify(s.errs);
    else {
      const head = s.lines.slice(0, 5), rest = s.lines.slice(5);
      const pay = rest.filter((l) => / pays? /.test(l)), other = rest.filter((l) => !/ pays? /.test(l));
      if (head.join('|') !== e.head.join('|')) why = 'head ' + JSON.stringify(head) + ' expected ' + JSON.stringify(e.head);
      else if (pay.join('|') !== e.payLines.join('|')) why = 'pay ' + JSON.stringify(pay) + ' expected ' + JSON.stringify(e.payLines);
      else { const c = checkPayLines(pay, e.total, BigInt(people)); if (c) why = c; }
      if (other.length) { extraLineCases++; for (const o of other) extraKinds[o] = (extraKinds[o] || 0) + 1; }
    }
    if (why) { fails++; if (failList.length < 40) failList.push(`${bill} ${tip} ${people}: ${why}`); }
  }
  const t0 = Date.now();
  // Pass A: every bill 0.01..50.00, tips 0,15,18,20, 1 person
  await typeInto(page, 'people', '1');
  for (const tip of ['0', '15', '18', '20']) {
    await typeInto(page, 'tip', tip);
    await page.focus('#bill');
    for (let c = 1; c <= 5000; c++) {
      const bill = fmt(BigInt(c));
      await page.keyboard.press('Control+A'); await page.keyboard.type(bill);
      await check(bill, tip, '1');
    }
    console.log(`pass A tip ${tip}: cumulative cases ${cases}, fails ${fails}, ${Math.round((Date.now() - t0) / 1000)}s`);
  }
  const a = cases;
  // Pass B: every bill 0.01..5.00, 1..12 people, tip 18
  await typeInto(page, 'tip', '18');
  for (let n = 1; n <= 12; n++) {
    await typeInto(page, 'people', String(n));
    await page.focus('#bill');
    for (let c = 1; c <= 500; c++) {
      const bill = fmt(BigInt(c));
      await page.keyboard.press('Control+A'); await page.keyboard.type(bill);
      await check(bill, '18', String(n));
    }
  }
  console.log(`pass B: cases ${cases - a}, cumulative fails ${fails}, ${Math.round((Date.now() - t0) / 1000)}s`);
  // Spot cases, as typed
  for (const [b, t, p] of [['10.00', '0', '3'], ['1000000.00', '100', '100'], ['0.01', '0', '100']]) {
    await typeInto(page, 'bill', b); await typeInto(page, 'tip', t); await typeInto(page, 'people', p);
    const before = fails; await check(b, t, p);
    const s = await readState(page);
    console.log(`spot ${b} ${t} ${p}: ${fails === before ? 'MATCH' : 'MISMATCH'} page lines ${JSON.stringify(s.lines)}`);
  }
  console.log(`TOTAL cases ${cases}, mismatches ${fails}`);
  console.log(`cases with a result line that is not a header or pay line: ${extraLineCases}`, JSON.stringify(extraKinds));
  for (const f of failList) console.log('FAIL', f);
  await page.close(); await browser.close();
})().catch((e) => { console.error('SCRIPT ERROR', e); process.exit(1); });
