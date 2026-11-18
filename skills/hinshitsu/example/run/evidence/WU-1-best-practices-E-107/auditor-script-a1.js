// Auditor script 1: C1, C2, C4, C5, C6, C7 and live-region observations.
const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const URL = 'file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html';
const log = (...a) => console.log(...a);
async function state(page) {
  return page.evaluate(() => {
    const g = id => document.getElementById(id);
    const r = g('result');
    return {
      bill: g('bill').value, tip: g('tip').value, people: g('people').value,
      eb: g('bill-error').textContent, et: g('tip-error').textContent, ep: g('people-error').textContent,
      inv: ['bill','tip','people'].map(n => g(n).getAttribute('aria-invalid')),
      hidden: r.hidden, visible: getComputedStyle(r).display !== 'none',
      lines: Array.from(r.querySelectorAll('p')).map(p => p.textContent),
    };
  });
}
async function typeInto(page, id, text) {
  await page.click('#' + id);
  await page.keyboard.press('Control+a'); await page.keyboard.press('Delete');
  if (text.length) await page.keyboard.type(text);
}
async function fresh(ctx) {
  const page = await ctx.newPage();
  const reqs = []; const cons = [];
  page.on('request', r => reqs.push(r.method() + ' ' + r.url()));
  page.on('console', m => cons.push(m.type() + ': ' + m.text()));
  page.on('pageerror', e => cons.push('pageerror: ' + e.message));
  await page.goto(URL); await page.waitForLoadState('load');
  return { page, reqs, cons };
}
(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:29229');
  log('browser version:', browser.version());
  const ctx = browser.contexts()[0];

  // ---- C1 + first-open state
  let { page, reqs, cons } = await fresh(ctx);
  await page.waitForTimeout(500);
  log('\n== C1 request log =='); log(JSON.stringify(reqs)); log('request count:', reqs.length);
  log('console at load:', JSON.stringify(cons));
  log('\n== C4 first open =='); log(JSON.stringify(await state(page)));
  log('guide text:', JSON.stringify(await page.textContent('#guide')));
  log('visible text of body:', JSON.stringify(await page.evaluate(() => document.body.innerText)));

  // ---- C2 cases (real key events)
  log('\n== C2 cases, typed with key events ==');
  for (const [b, t, p] of [['100.00','18','4'],['0.30','15','1'],['10.10','15','1'],['12.25','18','1'],['10.00','0','3'],['1000000.00','100','100'],['0.01','0','100'],['10.00','0','6'],[' 100.00 ',' 18 ',' 4 ']]) {
    await typeInto(page,'bill',b); await typeInto(page,'tip',t); await typeInto(page,'people',p);
    const s = await state(page);
    log(JSON.stringify([b,t,p]), '=>', JSON.stringify(s.lines), 'visible:', s.visible, 'errors:', JSON.stringify([s.eb,s.et,s.ep]));
  }
  // recompute on every change
  await typeInto(page,'bill','100.00'); await typeInto(page,'tip','18'); await typeInto(page,'people','4');
  await page.click('#people'); await page.keyboard.press('End'); await page.keyboard.type('0');
  log('after appending 0 to people (40):', JSON.stringify((await state(page)).lines));
  await page.close();

  // ---- C4 error inputs
  log('\n== C4 error inputs: bill field (tip=18, people=4 valid) ==');
  ({ page, reqs, cons } = await fresh(ctx));
  await typeInto(page,'tip','18'); await typeInto(page,'people','4');
  for (const v of ['abc','12,50','1,000.00','1e3','10.','.5','$12.50','€12','12.50$','-5','-0.01','0','0.00','00.0','1000000.01','1000001','99999999999999999999','1.234','12.500','1 000','1..2','+5','٣','１２','   ','']) {
    await typeInto(page,'bill',v); 
    if (v === '') { await page.keyboard.press('Tab'); }
    const s = await state(page);
    log(JSON.stringify(v), '=> msg:', JSON.stringify(s.eb), 'aria-invalid:', s.inv[0], 'resultVisible:', s.visible, 'lines:', s.lines.length);
  }
  for (const v of ['0.01','1000000.00','1000000','007.5','  12.5  ']) {
    await typeInto(page,'bill',v); const s = await state(page);
    log('valid?', JSON.stringify(v), '=> msg:', JSON.stringify(s.eb), 'resultVisible:', s.visible, 'first line:', s.lines[0]);
  }
  for (const [field, good, bads, goods] of [
    ['tip','18',['','abc','18.0','1e1','+4','4.','-1','101','1000','18,5','18%','1 8','0.5','  ','١٨'],['0','100','007',' 18 ']],
    ['people','4',['','abc','18.0','1e1','+4','4.','-1','0','00','101','1000','4,0','four','1.5'],['1','100','004',' 4 ']]]) {
    log(`\n== C4 error inputs: ${field} field ==`);
    await typeInto(page,'bill','100.00'); await typeInto(page,'tip','18'); await typeInto(page,'people','4');
    for (const v of bads) {
      await typeInto(page,field,v); if (v === '') await page.keyboard.press('Tab');
      const s = await state(page); const i = field==='tip'?1:2;
      log(JSON.stringify(v), '=> msg:', JSON.stringify(i===1?s.et:s.ep), 'aria-invalid:', s.inv[i], 'resultVisible:', s.visible, 'lines:', s.lines.length);
    }
    for (const v of goods) { await typeInto(page,field,v); const s = await state(page);
      log('valid?', JSON.stringify(v), '=> msg:', JSON.stringify(field==='tip'?s.et:s.ep), 'resultVisible:', s.visible, 'lines:', JSON.stringify(s.lines.slice(1,3))); }
    await typeInto(page,field,good);
  }
  await page.close();

  // leave-empty behaviour on first open: Tab through
  ({ page } = await fresh(ctx));
  await page.click('#bill'); await page.keyboard.press('Tab');
  log('\nfocus bill then Tab away (nothing typed):', JSON.stringify(await state(page)));
  await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
  log('after tabbing past all 3:', JSON.stringify(await state(page)));
  // Enter key in a field
  await typeInto(page,'bill','100.00'); await page.keyboard.press('Enter');
  log('after Enter in bill: url unchanged =', page.url() === URL, JSON.stringify(await state(page)));
  await page.close();

  // ---- C5 widths
  log('\n== C5 widths ==');
  for (const w of [360, 768, 1280]) {
    ({ page } = await fresh(ctx));
    await page.setViewportSize({ width: w, height: 900 });
    const measure = async (label) => {
      const m = await page.evaluate(() => {
        const de = document.documentElement; const vw = de.clientWidth; let worst = null;
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect(); if (r.width === 0) continue;
          if (r.right > vw + 0.5 || r.left < -0.5 || el.scrollWidth > el.clientWidth + 1) worst = (worst||[]).concat(el.tagName + '#' + el.id + ' L' + r.left + ' R' + r.right + ' sw' + el.scrollWidth + ' cw' + el.clientWidth);
        }
        return { innerWidth, clientWidth: vw, docScrollWidth: de.scrollWidth, bodyScrollWidth: document.body.scrollWidth, offenders: worst,
          guideLines: Math.round(document.getElementById('guide').getBoundingClientRect().height / parseFloat(getComputedStyle(document.getElementById('guide')).lineHeight)),
          inputFont: getComputedStyle(document.getElementById('bill')).fontSize, inputH: document.getElementById('bill').getBoundingClientRect().height };
      });
      log(w, label, JSON.stringify(m));
      await page.screenshot({ path: `/home/ubuntu/audit/shots/w${w}-${label}.png`, fullPage: true });
    };
    await measure('first');
    await typeInto(page,'bill','1,000.00'); await typeInto(page,'tip','18.0'); await typeInto(page,'people','0'); await page.keyboard.press('Tab');
    await measure('error');
    await typeInto(page,'bill','1000000.00'); await typeInto(page,'tip','100'); await typeInto(page,'people','100');
    await measure('result-max');
    await typeInto(page,'bill','10.00'); await typeInto(page,'tip','0'); await typeInto(page,'people','3');
    await measure('result-2line');
    await page.close();
  }

  // ---- C5 markup
  ({ page } = await fresh(ctx));
  log('\n== C5 markup, read from the live DOM ==');
  log(JSON.stringify(await page.evaluate(() => Array.from(document.querySelectorAll('input')).map(i => ({ id: i.id, type: i.type, inputmode: i.getAttribute('inputmode'), autocomplete: i.getAttribute('autocomplete'), describedby: i.getAttribute('aria-describedby'),
    label: (document.querySelector('label[for="'+i.id+'"]')||{}).textContent, labelVisible: !!document.querySelector('label[for="'+i.id+'"]').getClientRects().length }))), null, 1));
  log(JSON.stringify(await page.evaluate(() => ['bill-error','tip-error','people-error','result'].map(id => { const e = document.getElementById(id); return { id, role: e.getAttribute('role'), live: e.getAttribute('aria-live'), atomic: e.getAttribute('aria-atomic'), hidden: e.hidden, display: getComputedStyle(e).display }; }))));
  log('CSP meta:', await page.evaluate(() => document.querySelector('meta[http-equiv]').outerHTML));

  // ---- live-region observations
  log('\n== live-region observations ==');
  const cdp = await ctx.newCDPSession(page);
  const ax = async (label) => {
    const { nodes } = await cdp.send('Accessibility.getFullAXTree');
    const pick = nodes.filter(n => !n.ignored && ['status','alert'].includes(n.role && n.role.value)).map(n => n.role.value + (n.name && n.name.value ? ':' + n.name.value : ''));
    log('AX tree', label, '-> non-ignored status/alert nodes:', JSON.stringify(pick));
  };
  await ax('first open');
  await page.evaluate(() => { window.__mut = {};
    for (const id of ['bill-error','tip-error','people-error','result']) { window.__mut[id] = 0;
      new MutationObserver(l => { window.__mut[id] += l.length; }).observe(document.getElementById(id), { childList: true, characterData: true, subtree: true, attributes: true }); } });
  const mut = async (label) => { log('mutation records after', label, JSON.stringify(await page.evaluate(() => { const m = window.__mut; window.__mut = { 'bill-error':0,'tip-error':0,'people-error':0,'result':0 }; return m; }))); };
  await typeInto(page,'bill','abc'); await mut('typing "abc" in bill (3 keys)');
  await ax('bill error showing');
  await typeInto(page,'tip','18'); await mut('typing "18" in tip (2 keys + clear) while bill error shows unchanged');
  await typeInto(page,'bill','100.00'); await typeInto(page,'people','4'); await mut('making all valid');
  await ax('result showing');
  await page.click('#people'); await page.keyboard.press('End'); await page.keyboard.type('0'); await mut('1 key in people while result shows');
  await page.close();

  // ---- C7
  log('\n== C7 ==');
  ({ page, reqs, cons } = await fresh(ctx));
  const f = await page.evaluate(() => fetch('https://example.com').then(r => 'RESOLVED ' + r.status, e => 'REJECTED ' + e.name + ': ' + e.message));
  await page.waitForTimeout(300);
  log("fetch('https://example.com') ->", f); log('console:', JSON.stringify(cons)); log('requests seen:', JSON.stringify(reqs));
  const extra = await page.evaluate(async () => { const out = {};
    try { const i = new Image(); out.img = await new Promise(r => { i.onload = () => r('LOADED'); i.onerror = () => r('ERROR(blocked)'); i.src = 'https://example.com/x.png'; }); } catch (e) { out.img = 'threw ' + e.message; }
    try { out.beacon = navigator.sendBeacon('https://example.com/b', 'x'); } catch (e) { out.beacon = 'threw ' + e.message; }
    try { out.ls = localStorage.length; } catch (e) { out.ls = 'threw ' + e.name; }
    out.cookie = document.cookie; return out; });
  log('extra probes:', JSON.stringify(extra));
  await typeInto(page,'bill','100.00'); await typeInto(page,'tip','18'); await typeInto(page,'people','4');
  log('before reload:', JSON.stringify(await state(page)));
  await page.reload(); await page.waitForLoadState('load');
  log('after reload:', JSON.stringify(await state(page)));
  await typeInto(page,'bill','55.00'); await typeInto(page,'tip','abc');
  await page.goto('about:blank'); await page.goBack(); await page.waitForLoadState('load');
  log('after navigating away and Back:', JSON.stringify(await state(page)));
  await page.close();

  // ---- C6 JavaScript off
  log('\n== C6 JavaScript disabled ==');
  const ctx2 = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 768, height: 700 } });
  const p2 = await ctx2.newPage(); await p2.goto(URL);
  const c2 = await p2.context().newCDPSession(p2);
  const txt = await c2.send('DOMSnapshot.captureSnapshot', { computedStyles: [] }).then(() => null).catch(() => null);
  const { root } = await c2.send('DOM.getDocument', { depth: -1 });
  const { nodeId } = await c2.send('DOM.querySelector', { nodeId: root.nodeId, selector: 'noscript' });
  const html = await c2.send('DOM.getOuterHTML', { nodeId });
  const box = await c2.send('DOM.getBoxModel', { nodeId: (await c2.send('DOM.querySelector', { nodeId: root.nodeId, selector: 'noscript p' })).nodeId }).catch(e => ({ error: e.message }));
  log('noscript outerHTML:', html.outerHTML);
  log('noscript p box (rendered if present):', JSON.stringify(box.model ? { width: box.model.width, height: box.model.height } : box));
  await p2.screenshot({ path: '/home/ubuntu/audit/shots/js-off.png', fullPage: true });
  await p2.click('#bill'); await p2.keyboard.type('100.00'); await p2.keyboard.press('Tab');
  await p2.screenshot({ path: '/home/ubuntu/audit/shots/js-off-typed.png', fullPage: true });
  await ctx2.close();
  await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
