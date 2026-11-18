const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const path = require('path');
const FILE = path.resolve(__dirname, 'devin/skills/hinshitsu/example/run/review/index.html');
const URL_ = 'file://' + FILE;
async function open() {
  const browser = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = browser.contexts()[0];
  const page = await ctx.newPage();
  return { browser, ctx, page };
}
const readState = (page) => page.evaluate(() => {
  const g = (id) => document.getElementById(id);
  const r = g('result');
  return {
    vals: ['bill', 'tip', 'people'].map((i) => g(i).value),
    errs: ['bill', 'tip', 'people'].map((i) => g(i + '-error').textContent),
    invalid: ['bill', 'tip', 'people'].map((i) => g(i).getAttribute('aria-invalid')),
    resultShown: !r.hidden && getComputedStyle(r).display !== 'none',
    lines: [...r.querySelectorAll('p')].map((p) => p.textContent),
    resultText: r.textContent,
  };
});
async function typeInto(page, id, text) {
  await page.focus('#' + id);
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  if (text !== '') await page.keyboard.type(text);
}
/* AUDITOR's own arithmetic, BigInt, written without reference to the page's splitBill. */
function toCents(s) { const [w, f = ''] = s.trim().split('.'); return BigInt(w) * 100n + BigInt((f + '00').slice(0, 2)); }
function fmt(c) { const s = c.toString().padStart(3, '0'); return s.slice(0, -2) + '.' + s.slice(-2); }
function expected(billStr, tipStr, peopleStr) {
  const bill = toCents(billStr), pct = BigInt(tipStr.trim()), n = BigInt(peopleStr.trim());
  const prod = bill * pct;               // hundredths of a cent
  let tip = prod / 100n; if (prod % 100n >= 50n) tip += 1n;   // half a cent rounds up
  const total = bill + tip;
  const pays = [];
  let left = total;
  for (let i = n; i > 0n; i--) { const p = (left + i - 1n) / i; pays.push(p); left -= p; } // ceil of remaining share
  const groups = [];
  for (const p of pays) { const g = groups[groups.length - 1]; if (g && g.c === p) g.k++; else groups.push({ c: p, k: 1 }); }
  const payLines = groups.map((g) => g.k === 1 ? `1 person pays ${fmt(g.c)}` : `${g.k} people pay ${fmt(g.c)} each`);
  return { head: [`Bill: ${fmt(bill)}`, `Tip: ${pct} percent`, `People: ${n}`, `Tip amount: ${fmt(tip)}`, `Total: ${fmt(total)}`], payLines, total, tip, pays };
}
/* Parse the page's own pay lines back into cents and check sum and spread. */
function checkPayLines(lines, total, n) {
  let sum = 0n, cnt = 0n, min = null, max = null;
  for (const l of lines) {
    let m = /^1 person pays (\d+)\.(\d\d)$/.exec(l), k, c;
    if (m) { k = 1n; c = BigInt(m[1]) * 100n + BigInt(m[2]); }
    else { m = /^(\d+) people pay (\d+)\.(\d\d) each$/.exec(l); if (!m) return 'unparsed pay line: ' + l; k = BigInt(m[1]); c = BigInt(m[2]) * 100n + BigInt(m[3]); }
    sum += k * c; cnt += k; if (min === null || c < min) min = c; if (max === null || c > max) max = c;
  }
  if (cnt !== n) return `payer count ${cnt} != ${n}`;
  if (sum !== total) return `payments sum ${sum} != total ${total}`;
  if (max - min > 1n) return `spread ${max - min} cents`;
  return null;
}
module.exports = { open, readState, typeInto, expected, checkPayLines, fmt, URL_, FILE };
