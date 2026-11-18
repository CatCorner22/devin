const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const path = '/home/ubuntu/audit/devin/skills/hinshitsu/example/index.html';
exports.URL = 'file://' + path;
exports.SHOTS = '/home/ubuntu/audit/out/shots/';
exports.connect = () => chromium.connectOverCDP('http://localhost:29229');
exports.state = (page) => page.evaluate(() => {
  const vis = (el) => !!(el && el.offsetParent !== null || (el && el.getClientRects().length));
  const g = document.getElementById('guide');
  return {
    guide: vis(g) ? g.innerText : null,
    fieldsVisible: vis(document.getElementById('fields')),
    values: ['bill','tip','people'].map(n => document.getElementById(n).value),
    errors: ['bill','tip','people'].map(n => document.getElementById(n + '-error').innerText),
    invalid: ['bill','tip','people'].map(n => document.getElementById(n).getAttribute('aria-invalid')),
    lines: Array.from(document.querySelectorAll('#result p')).map(p => p.textContent),
    resultText: document.getElementById('result').innerText,
    active: document.activeElement && document.activeElement.id,
  };
});
// the auditor's own arithmetic, in BigInt, from the typed strings
exports.expect = (billStr, tipStr, peopleStr) => {
  const m = /^0*(\d+)(?:[.,](\d{1,2}))?$/.exec(billStr.trim());
  const cents = BigInt(m[1]) * 100n + BigInt(((m[2] || '') + '00').slice(0, 2));
  const pct = BigInt(tipStr.trim()), n = BigInt(peopleStr.trim());
  const twice = cents * pct * 2n;            // tip in 1/200 of a cent
  let tip = twice / 200n; if (twice % 200n >= 100n) tip += 1n;   // half a cent rounds up
  const total = cents + tip, base = total / n, extra = total % n;
  const f = (c) => { const s = c.toString().padStart(3, '0'); return s.slice(0, -2) + '.' + s.slice(-2); };
  const pay = (k, c) => k === 1n ? `1 person pays ${f(c)}` : `${k} people pay ${f(c)} each`;
  const lines = [`Bill total: ${f(cents)}`, `Tip percent: ${pct}`, `Number of people: ${n}`, `Tip amount: ${f(tip)}`, `Total with tip: ${f(total)}`];
  if (extra > 0n) { lines.push(pay(extra, base + 1n), pay(n - extra, base), 'Your group decides who pays the higher amount.'); }
  else lines.push(pay(n, base));
  return lines;
};
