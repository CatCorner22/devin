const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const path = '/home/ubuntu/repos/devin/skills/hinshitsu/example/index.html';
const url = 'file://' + path;
const J = (x) => JSON.stringify(x);
async function state(page) {
  return page.evaluate(() => ({
    bill: document.getElementById('bill').value, tip: document.getElementById('tip').value, people: document.getElementById('people').value,
    be: document.getElementById('bill-error').textContent, te: document.getElementById('tip-error').textContent, pe: document.getElementById('people-error').textContent,
    result: Array.from(document.querySelectorAll('#result p')).map(p => p.textContent),
    active: document.activeElement.id || document.activeElement.tagName
  }));
}
async function clear(page) { await page.reload(); }
async function typeIn(page, id, text) { await page.click('#' + id); if (text) await page.keyboard.type(text); }
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/ubuntu/.local/bin/google-chrome', headless: true });
  console.log('browser', browser.version());
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const reqs = [];
  page.on('request', r => reqs.push(r.method() + ' ' + r.url()));
  page.on('console', m => console.log('  [console.' + m.type() + '] ' + m.text()));
  await page.goto(url);
  console.log('## C1 requests after load:', reqs.length, J(reqs));
  console.log('first open:', J(await state(page)));
  console.log('visible text:', J(await page.evaluate(() => document.body.innerText)));

  console.log('## C2 tests');
  for (const [b, t, p] of [['100.00','18','4'],['0.30','15','1'],['10.10','15','1'],['12.25','18','1'],['0100.5','007','02'],['10.00','0','3'],['1000000.00','100','100'],['0.01','0','100'],['0.50','0','1']]) {
    await clear(page);
    await typeIn(page,'bill',b); await typeIn(page,'tip',t); await typeIn(page,'people',p);
    const s = await state(page);
    console.log(J([b,t,p]), '=>', J(s.result), 'errors', J([s.be,s.te,s.pe]));
  }
  console.log('## C1 requests after C2 tests (reloads included):', reqs.length);

  console.log('## C4 states');
  await clear(page);
  await typeIn(page,'tip','18'); await typeIn(page,'people','4');
  console.log('incomplete (tip, people typed; bill untouched):', J(await state(page)));
  await clear(page);
  await typeIn(page,'bill','abc');
  console.log('bill abc, cursor still in bill; tip and people untouched:', J(await state(page)));
  await clear(page);
  await page.click('#bill'); await page.keyboard.press('Tab');
  console.log('bill focused then Tab (left empty):', J(await state(page)));
  await clear(page);
  await typeIn(page,'bill','1'); await page.keyboard.press('Backspace');
  console.log('bill typed 1 then Backspace:', J(await state(page)));

  console.log('## C4 inputs: bill (tip 18, people 4 typed first; then bill typed; state read with cursor in bill, then after Tab)');
  const bills = ['12.50','12,50','12','12.5','  12.50  ','\u200B12.50\uFEFF','\uFF11\uFF12\uFF0E\uFF15\uFF10','\uFF11\uFF12\uFF0C\uFF15\uFF10','\u0661\u0662\u066B\u0665\u0660','\u0661\u0662.\u0665\u0660',
    '12.','12,','10.','abc','12a','1,000.00','1.000,00','1,000','1e3','.5',',5','$12','12$','\u20AC12','12 \u20AC','-5','-0','0','0.00','00','1000000.01','1000001','1000000.00','1000000','12.345','12,345','1 000','12 .50','+12',
    // probes of the wording
    '\u200E12.50','12.50\u200F','\u202D12.50\u202C','\u00AD12.50','\u206612.50\u2069','\u00A012.50','\t12.50','\u2460\u2461','\u00B9\u00B2','\u06F1\u06F2','\u0967\u0968','\uD835\uDFCF\uD835\uDFD0','\u3251','12\u066C345','12\u060C50','12\u00B750','12\u2396\u0035\u0030'];
  for (const b of bills) {
    await clear(page);
    await typeIn(page,'tip','18'); await typeIn(page,'people','4');
    await page.click('#bill'); await page.keyboard.insertText(b);
    const s1 = await state(page);
    await page.keyboard.press('Tab');
    const s2 = await state(page);
    const cp = Array.from(b).map(c => c.codePointAt(0) > 126 || c.codePointAt(0) < 32 ? 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0') : c).join('');
    console.log(J(cp), '| in field: msg=' + J(s1.be) + ' result=' + J(s1.result[0]||'') + (s1.result.length? ' ['+s1.result.length+' lines]':'') + ' | after Tab: msg=' + J(s2.be) + ' result=' + J(s2.result.slice(0,1)) );
  }
  console.log('## C4 inputs: tip and people (bill 100.00 typed first, other whole-number field valid)');
  for (const [id, other, otherVal] of [['tip','people','4'],['people','tip','18']]) {
    for (const v of ['18','0','100','101','007','0100','18.0','18,5','1e1','+4','4.','-1','abc','18%','1 8',' 18 ','\uFF11\uFF18','\u0661\u0668','\u2460','1000','']) {
      await clear(page);
      await typeIn(page,'bill','100.00'); await typeIn(page,other,otherVal);
      await page.click('#' + id); if (v) await page.keyboard.insertText(v);
      const s1 = await state(page);
      await page.keyboard.press('Tab');
      const s2 = await state(page);
      const cp = Array.from(v).map(c => c.codePointAt(0) > 126 ? 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0') : c).join('');
      console.log(id, J(cp), '| in field: msg=' + J(id==='tip'?s1.te:s1.pe) + ' lines=' + s1.result.length + ' | after Tab: msg=' + J(id==='tip'?s2.te:s2.pe) + ' lines=' + s2.result.length + (s2.result.length ? ' ' + J(s2.result.slice(1,3)) : ''));
    }
  }

  console.log('## C4 wording probes: "has the cursor" and "leaves the field"');
  await clear(page);
  await typeIn(page,'tip','18'); await typeIn(page,'people','4'); await typeIn(page,'bill','12.');
  console.log('12. typed, text cursor in bill:', J(await state(page)));
  await page.mouse.move(640, 700);
  console.log('mouse pointer moved off the bill field, text cursor still in bill:', J(await state(page)));
  await page.click('#tip');
  console.log('clicked tip (text cursor left bill):', J(await state(page)));
  const box = await page.locator('#bill').boundingBox();
  await page.mouse.move(box.x + 20, box.y + 10);
  console.log('mouse pointer over the bill field, text cursor in tip:', J(await state(page)));
  // window loses focus while text cursor is in bill
  await clear(page);
  await page.evaluate(() => { window.__ev = []; ['blur','focus'].forEach(t => { window.addEventListener(t, e => window.__ev.push('window ' + t)); document.getElementById('bill').addEventListener(t, e => window.__ev.push('bill ' + t)); }); });
  await page.click('#bill');
  const page2 = await ctx.newPage(); await page2.goto('about:blank'); await page2.bringToFront();
  await page.waitForTimeout(500);
  console.log('bill clicked, nothing typed, then another tab brought to front: events=' + J(await page.evaluate(() => window.__ev)) + ' hasFocus=' + await page.evaluate(() => document.hasFocus()) + ' state=' + J(await state(page)));
  await page2.close(); await page.bringToFront();

  console.log('## C5 mutation counts');
  async function watch(page) { await page.evaluate(() => { window.__m = {}; ['bill-error','tip-error','people-error','result'].forEach(id => { window.__m[id] = 0; new MutationObserver(l => { window.__m[id] += l.length; }).observe(document.getElementById(id), { childList: true, characterData: true, subtree: true, attributes: true }); }); }); }
  await clear(page);
  await typeIn(page,'bill','abc'); await page.keyboard.press('Tab'); // now in tip
  await watch(page);
  await page.keyboard.type('18');
  console.log('bill shows a message; person types 18 in tip:', J(await page.evaluate(() => window.__m)), J(await state(page)));
  await clear(page);
  await typeIn(page,'bill','100'); await typeIn(page,'tip','18'); await typeIn(page,'people','4');
  await watch(page);
  await page.click('#bill'); await page.keyboard.press('End'); await page.keyboard.type('.00');
  console.log('result shows; person types .00 after 100 in bill (result text ends the same; passes through "100."):', J(await page.evaluate(() => window.__m)), J((await state(page)).result));
  await clear(page);
  await typeIn(page,'bill','100'); await typeIn(page,'tip','18'); await typeIn(page,'people','4');
  await watch(page);
  await page.click('#tip'); await page.keyboard.press('Home'); await page.keyboard.type('00');
  console.log('result shows; person types 00 before 18 in tip (0018):', J(await page.evaluate(() => window.__m)), J((await state(page)).result));
  await clear(page);
  await typeIn(page,'bill','100'); await typeIn(page,'tip','18'); await typeIn(page,'people','4');
  await watch(page);
  await page.click('#people'); await page.keyboard.press('End'); await page.keyboard.type('0');
  console.log('result shows; person types 0 after 4 in people (40):', J(await page.evaluate(() => window.__m)), J((await state(page)).result));

  console.log('## C5 markup');
  console.log(J(await page.evaluate(() => ({
    labels: Array.from(document.querySelectorAll('label')).map(l => ({ for: l.htmlFor, text: l.textContent, visible: l.getBoundingClientRect().height > 0 && getComputedStyle(l).visibility === 'visible' })),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ id: i.id, inputmode: i.getAttribute('inputmode'), autocomplete: i.getAttribute('autocomplete') })),
    errorRoles: Array.from(document.querySelectorAll('.error')).map(p => p.id + ':' + p.getAttribute('role')),
    resultRole: document.getElementById('result').getAttribute('role')
  }))));

  console.log('## C5 widths');
  for (const w of [360, 768, 1280]) {
    for (const st of ['first-open','errors','result-max']) {
      await page.setViewportSize({ width: w, height: 800 });
      await clear(page);
      if (st === 'errors') { await typeIn(page,'bill','abc'); await typeIn(page,'tip','abc'); await typeIn(page,'people','abc'); await page.keyboard.press('Tab'); }
      if (st === 'result-max') { await typeIn(page,'bill','999999.99'); await typeIn(page,'tip','100'); await typeIn(page,'people','99'); }
      const r = await page.evaluate(() => { const de = document.documentElement; const wide = Array.from(document.querySelectorAll('*')).filter(e => { const b = e.getBoundingClientRect(); return b.right > window.innerWidth + 0.5 || b.left < -0.5 || b.width > window.innerWidth + 0.5; }).map(e => e.tagName + '#' + e.id); window.scrollTo(1000, 0); const sx = window.scrollX; window.scrollTo(0,0); return { innerWidth: window.innerWidth, scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, widerThanWindow: wide, scrollXAfterScrollTo1000: sx }; });
      await page.screenshot({ path: `/home/ubuntu/audit-lang/w${w}-${st}.png`, fullPage: true });
      console.log(w, st, J(r));
    }
  }
  await page.setViewportSize({ width: 1280, height: 800 });

  console.log('## C7');
  await clear(page);
  const f = await page.evaluate(() => fetch('https://example.com').then(r => 'NOT BLOCKED status ' + r.status, e => 'rejected: ' + e.name + ': ' + e.message));
  console.log("fetch('https://example.com') =>", f);
  await typeIn(page,'bill','100.00'); await typeIn(page,'tip','18'); await typeIn(page,'people','4');
  console.log('before reload:', J(await state(page)));
  await page.reload();
  console.log('after reload:', J(await state(page)));
  console.log('storage after use:', J(await page.evaluate(() => { let o = {}; try { o.cookie = document.cookie; } catch (e) { o.cookie = 'throws ' + e.name; } try { o.ls = localStorage.length; } catch (e) { o.ls = 'throws ' + e.name; } try { o.ss = sessionStorage.length; } catch (e) { o.ss = 'throws ' + e.name; } return o; })));
  console.log('## C1 total requests seen on this page in the whole run:', reqs.length, J(Array.from(new Set(reqs))));

  console.log('## C6 JavaScript disabled');
  const ctx2 = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
  const p2 = await ctx2.newPage(); await p2.goto(url);
  console.log('visible text:', J(await p2.locator('body').innerText()));
  console.log('guide visible:', await p2.locator('#guide').isVisible(), '| fields visible:', await p2.locator('#fields').isVisible(), '| inputs visible:', J(await Promise.all(['bill','tip','people'].map(i => p2.locator('#'+i).isVisible()))));
  await p2.screenshot({ path: '/home/ubuntu/audit-lang/nojs.png' });
  await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
