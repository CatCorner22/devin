const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229'); const p = await b.contexts()[0].newPage();
  await p.goto('file:///home/ubuntu/audit/devin/skills/hinshitsu/example/index.html');
  const names = ['MAX_BILL_CENTS','MAX_TIP_PERCENT','MAX_PEOPLE','splitBill','plain','readAmount','readWhole','money','payLine','fields','resultBox','shownResult','showResult','update'];
  console.log(JSON.stringify(await p.evaluate(ns => ns.map(n => [n, Object.prototype.hasOwnProperty.call(window, n), typeof window[n]]), names)));
  console.log('window.money(1234) from console:', await p.evaluate(() => window.money(1234)));
  console.log('splitBill(1000,0,3):', JSON.stringify(await p.evaluate(() => window.splitBill(1000,0,3))));
  await p.close(); await b.close();
})();
