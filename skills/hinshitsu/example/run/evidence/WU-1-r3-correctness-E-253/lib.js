const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const fs = require('fs');
const BIN = fs.readdirSync('/opt/.devin/chrome/chrome').map(d => `/opt/.devin/chrome/chrome/${d}/chrome-linux64/chrome`).filter(p => fs.existsSync(p)).sort().pop();
const FILE = '/home/ubuntu/audit/devin/skills/hinshitsu/example/run/review/index.html';
const URL = 'file://' + FILE;
async function launch() { return chromium.launch({ executablePath: BIN, headless: false }); }
async function typeInto(page, id, text) {
  await page.click('#' + id);
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  if (text) await page.keyboard.type(text);
}
async function state(page) {
  return page.evaluate(() => {
    const t = id => document.getElementById(id).textContent;
    return {
      billErr: t('bill-error'), tipErr: t('tip-error'), peopleErr: t('people-error'),
      lines: [...document.querySelectorAll('#result p')].map(p => p.textContent),
      resultText: document.getElementById('result').textContent,
      active: document.activeElement.id || document.activeElement.tagName,
      invalid: ['bill', 'tip', 'people'].filter(i => document.getElementById(i).getAttribute('aria-invalid') === 'true').join(','),
      values: ['bill', 'tip', 'people'].map(i => document.getElementById(i).value)
    };
  });
}
const esc = s => [...s].map(c => { const k = c.codePointAt(0); return (k < 0x20 || k > 0x7e) ? 'U+' + k.toString(16).toUpperCase().padStart(4, '0') + ' ' : c; }).join('').replace(/ (?=[^U]|$)/g, m => m);
const show = s => JSON.stringify(s).replace(/[^\x20-\x7e]/g, c => '\\u{' + c.codePointAt(0).toString(16).toUpperCase() + '}');
module.exports = { chromium, BIN, FILE, URL, launch, typeInto, state, show };
