const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const URL = 'file:///home/ubuntu/audit/devin-audit/skills/hinshitsu/example/index.html';
// auditor's own reference, BigInt, written without using the page's code
function ref(billStr, tip, people) {
  const [w, f = ''] = billStr.split('.');
  const bill = BigInt(w) * 100n + BigInt((f + '00').slice(0, 2));
  const num = bill * BigInt(tip);              // tip in hundredths of a cent
  let tipC = num / 100n; if (num % 100n >= 50n) tipC += 1n;   // half a cent rounds up
  const total = bill + tipC, n = BigInt(people);
  const low = total / n, hi = total % n;       // hi people pay low+1
  const pays = []; for (let i = 0n; i < n; i++) pays.push(i < hi ? low + 1n : low);
  return { tipC, total, pays };
}
const fmt = c => { const s = c.toString().padStart(3, '0'); return s.slice(0, -2) + '.' + s.slice(-2); };
const toC = s => BigInt(s.replace('.', ''));
function check(billStr, tip, people, lines) {
  const r = ref(billStr, tip, people); const bad = [];
  if (lines[0] !== 'Bill: ' + fmt(toC(billStr.includes('.')?billStr:billStr+'.00'))) bad.push('bill line');
  if (lines[1] !== `Tip: ${tip} percent`) bad.push('tip line');
  if (lines[2] !== `People: ${people}`) bad.push('people line');
  if (lines[3] !== 'Tip amount: ' + fmt(r.tipC)) bad.push('tip amount');
  if (lines[4] !== 'Total: ' + fmt(r.total)) bad.push('total');
  // parse the page's payment lines independently
  const pays = [];
  for (const l of lines.slice(5)) {
    let m;
    if ((m = /^1 person pays (\d+\.\d\d)$/.exec(l))) pays.push(toC(m[1]));
    else if ((m = /^(\d+) people pay (\d+\.\d\d) each$/.exec(l))) { for (let i = 0; i < +m[1]; i++) pays.push(toC(m[2])); }
    else if (l !== 'Your group decides who pays the extra cent.') bad.push('unparsed line: ' + l);
  }
  if (pays.length !== people) bad.push('payer count ' + pays.length);
  const sum = pays.reduce((a, b) => a + b, 0n);
  if (sum !== r.total) bad.push('sum ' + fmt(sum) + ' != ' + fmt(r.total));
  const mx = pays.reduce((a, b) => a > b ? a : b), mn = pays.reduce((a, b) => a < b ? a : b);
  if (mx - mn > 1n) bad.push('spread');
  const sorted = [...pays].sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  if (sorted.join() !== r.pays.join()) bad.push('payments differ from reference');
  const payLines = lines.slice(5).filter(l => /pay/.test(l) && !/^Your/.test(l)).length;
  if (payLines < 1 || payLines > 2) bad.push('pay line count ' + payLines);
  return bad;
}
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = await b.newContext(); const p = await ctx.newPage(); await p.goto(URL);
  const read = () => p.evaluate(() => ({ h: document.getElementById('result').hidden, e: ['bill','tip','people'].map(n => document.getElementById(n + '-error').textContent).join(''), l: [...document.querySelectorAll('#result p')].map(e => e.textContent) }));
  let n = 0, fails = 0; const cur = {};
  const run = async (bill, tip, people) => {
    for (const [id, v] of [['bill', bill], ['tip', String(tip)], ['people', String(people)]]) if (cur[id] !== v) { await p.fill('#' + id, v); cur[id] = v; }
    const s = await read(); n++;
    const bad = (s.h || s.e) ? ['no result / error: ' + s.e] : check(bill, tip, people, s.l);
    if (bad.length) { fails++; if (fails <= 20) console.log('MISMATCH', bill, tip, people, JSON.stringify(bad), JSON.stringify(s.l)); }
  };
  let t = Date.now();
  for (const tip of [0, 15, 18, 20]) for (let c = 1; c <= 5000; c++) await run((c / 100).toFixed(2), tip, 1);
  console.log('sweep A (bills 0.01-50.00 x tips 0,15,18,20 x 1 person): cases', n, 'mismatches', fails, 'secs', (Date.now() - t) / 1000);
  let n0 = n, f0 = fails; t = Date.now();
  for (let ppl = 1; ppl <= 12; ppl++) for (let c = 1; c <= 500; c++) await run((c / 100).toFixed(2), 18, ppl);
  console.log('sweep B (bills 0.01-5.00 x 1-12 people x tip 18): cases', n - n0, 'mismatches', fails - f0, 'secs', (Date.now() - t) / 1000);
  n0 = n; f0 = fails;
  for (const [bl, tp, pp] of [['10.00', 0, 3], ['1000000.00', 100, 100], ['0.01', 0, 100]]) { await run(bl, tp, pp); console.log('spot', bl, tp, pp, JSON.stringify((await read()).l)); }
  console.log('spot cases', n - n0, 'mismatches', fails - f0);
  // self-test of the checker: a wrong expectation must be caught
  console.log('checker self-test (expects non-empty):', JSON.stringify(check('10.00', 0, 3, ['Bill: 10.00','Tip: 0 percent','People: 3','Tip amount: 0.00','Total: 10.00','3 people pay 3.33 each'])));
  // in-memory only: is the "#result[hidden]" rule needed?
  console.log('result display with rule:', await p.evaluate(() => { document.getElementById('result').hidden = true; return getComputedStyle(document.getElementById('result')).display; }));
  console.log('result display with rule deleted in memory:', await p.evaluate(() => { const sh = document.styleSheets[0]; for (let i = 0; i < sh.cssRules.length; i++) if (sh.cssRules[i].selectorText === '#result[hidden]') { sh.deleteRule(i); break; } return getComputedStyle(document.getElementById('result')).display; }));
  console.log('TOTAL cases', n, 'mismatches', fails);
  await ctx.close(); await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
