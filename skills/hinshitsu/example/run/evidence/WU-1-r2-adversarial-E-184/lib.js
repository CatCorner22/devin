const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const URL = 'file:///home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html';
async function connect() { return chromium.connectOverCDP('http://localhost:29229'); }
async function state(page) {
  return page.evaluate(() => ({
    be: document.getElementById('bill-error').textContent,
    te: document.getElementById('tip-error').textContent,
    pe: document.getElementById('people-error').textContent,
    r: [...document.querySelectorAll('#result p')].map(p => p.textContent),
    rt: document.getElementById('result').innerText
  }));
}
async function fill3(page, b, t, p) {
  await page.fill('#bill', b); await page.fill('#tip', t); await page.fill('#people', p);
  await page.evaluate(() => document.activeElement.blur());
  return state(page);
}
module.exports = { connect, URL, state, fill3 };
