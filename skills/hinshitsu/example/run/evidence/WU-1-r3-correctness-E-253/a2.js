const { launch, URL, FILE, typeInto, state, show } = require('./lib');
const fs = require('fs');
const brief = s => 'msgs[' + [s.billErr, s.tipErr, s.peopleErr].map(m => m ? 'Y' : '-').join('') + '] lines ' + s.lines.length + (s.lines.length ? ' ' + show(s.lines[0]) : '') + (s.billErr ? ' billMsg ' + show(s.billErr.slice(0, 34)) : '') + (s.peopleErr ? ' peopleMsg ' + show(s.peopleErr.slice(0, 30)) : '');
(async () => {
  const browser = await launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const fill3 = async (b, t, p) => { await page.goto(URL); await typeInto(page, 'tip', t); await typeInto(page, 'people', p); await typeInto(page, 'bill', b); };

  console.log('== Trigger 1 ==');
  for (const [b, p] of [['5\u00B2', '4'], ['\u2460\u2461', '4'], ['12\u202450', '4']]) { await fill3(b, '18', p); console.log('bill', show(b), '=>', brief(await state(page))); }
  await page.goto(URL); await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '\u2463');
  console.log('people "\\u{2463}" bill 100.00 =>', brief(await state(page)));

  console.log('== Trigger 2 ==');
  for (const b of ['\u200E12.50', '12.50\u200F', '\u061C12.50', '\u00AD12.50', '\u206612.50\u2069', '\u202A12.50\u202C', '12.50\u180E']) {
    await fill3(b, '18', '4'); const s = await state(page);
    console.log('bill', show(b), '=>', brief(s), '| field holds', show(s.values[0]), '| pay', show(s.lines[5] || ''));
  }

  console.log('== Trigger 5 ==');
  await page.goto(URL);
  const t5 = await page.evaluate(() => {
    const tip = document.getElementById('tip');
    tip.value = '1' + ' '.repeat(100000) + 'x';
    const t0 = performance.now(); tip.dispatchEvent(new Event('input', { bubbles: true })); const dt = performance.now() - t0;
    return { length: tip.value.length, ms: Math.round(dt * 10) / 10, msg: document.getElementById('tip-error').textContent };
  });
  console.log('tip = 1 + 100000 spaces + x, 1 input event:', JSON.stringify(t5));
  const t5b = await page.evaluate(() => {
    const out = {};
    for (const [id, v] of [['bill', '1' + ' '.repeat(100000) + 'x'], ['bill', ' '.repeat(100000) + 'x'], ['bill', '1'.repeat(100000) + 'x'], ['bill', '1' + '\u200B'.repeat(100000) + 'x'], ['people', '0'.repeat(100000) + 'x'], ['bill', '0'.repeat(1000000)]]) {
      const el = document.getElementById(id); el.value = v;
      const t0 = performance.now(); el.dispatchEvent(new Event('input', { bubbles: true }));
      out[id + ' ' + v.slice(0, 2).replace('\u200B', 'ZWSP') + '.. len ' + v.length] = Math.round((performance.now() - t0) * 10) / 10 + ' ms';
      el.value = ''; el.dispatchEvent(new Event('input', { bubbles: true }));
    }
    return out;
  });
  console.log('other long values, 1 input event each:', JSON.stringify(t5b));

  console.log('== Trigger 7 =='); await fill3('10.01', '0', '3'); console.log(show((await state(page)).lines));
  console.log('== Trigger 9 =='); await fill3('12,50', '18', '4'); console.log(show((await state(page)).lines));
  await fill3('12.50', '18', '4'); console.log('12.50:', show((await state(page)).lines));

  console.log('== Trigger 8 / C5 change counts ==');
  const watch = () => page.evaluate(() => {
    window.__n = { bill: 0, tip: 0, people: 0, result: 0 };
    for (const [k, id] of [['bill', 'bill-error'], ['tip', 'tip-error'], ['people', 'people-error'], ['result', 'result']]) {
      new MutationObserver(r => { window.__n[k] += r.length; }).observe(document.getElementById(id), { childList: true, characterData: true, subtree: true, attributes: true });
    }
  });
  const counts = () => page.evaluate(() => new Promise(r => setTimeout(() => r(JSON.stringify(window.__n)), 50)));
  await page.goto(URL); await typeInto(page, 'bill', 'abc'); await page.keyboard.press('Tab');
  await watch(); await page.keyboard.type('18');
  console.log('a) bill abc, Tab, type 18 in tip:', await counts(), '| bill msg', show((await state(page)).billErr.slice(0, 30)));
  await page.keyboard.press('Tab'); await page.keyboard.type('4');
  console.log('b) then Tab, type 4 in people:', await counts());
  await page.goto(URL); await typeInto(page, 'bill', 'abc'); await typeInto(page, 'tip', 'x'); await typeInto(page, 'people', 'y');
  await watch(); await page.keyboard.type('yz'); await page.click('#tip'); await page.keyboard.type('q'); await page.click('#bill'); await page.keyboard.type('d'); await page.click('h1');
  console.log('c) 3 messages showing; type more letters in each field, click away:', await counts());
  await page.goto(URL); await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4');
  await watch(); await page.keyboard.type(' '); await page.click('#bill'); await page.keyboard.press('End'); await page.keyboard.type(' '); await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.click('#tip'); await page.keyboard.press('Home'); await page.keyboard.type('0');
  console.log('d) result showing; type a space after people, a space after bill, Tab x3, a leading 0 in tip:', await counts(), '| result still', show((await state(page)).lines[5]));
  await page.click('#people'); await page.keyboard.press('End'); await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace'); await page.keyboard.type('5');
  console.log('e) people changed 4 -> empty -> 5 (a real change; 3 keys):', await counts(), '| result', show((await state(page)).lines[5]));

  console.log('== Trigger 10 ==');
  await page.goto(URL);
  console.log(await page.evaluate(() => JSON.stringify(Object.fromEntries(['splitBill', 'plain', 'plainChar', 'readAmount', 'readWhole', 'money', 'payLine', 'showResult', 'update', 'MAX_BILL_CENTS', 'MAX_TIP_PERCENT', 'MAX_PEOPLE', 'IGNORED_AT_ENDS', 'fields', 'resultBox', 'shownResult'].map(n => [n, n in window])))));
  console.log('window.splitBill(10000,18,4) =', await page.evaluate(() => JSON.stringify(window.splitBill(10000, 18, 4))), '| splitBill(1000,0,3) =', await page.evaluate(() => JSON.stringify(window.splitBill(1000, 0, 3))));
  console.log('splitBill vs auditor formula, bills 1..3000 and 99997001..100000000, tips 0..100, people 1..100:', await page.evaluate(() => {
    let n = 0, bad = 0, first = null;
    const bills = []; for (let b = 1; b <= 3000; b++) bills.push(b); for (let b = 99997001; b <= 100000000; b++) bills.push(b);
    for (const b of bills) for (let t = 0; t <= 100; t++) {
      const q = b * t, r = q % 100, tip = (q - r) / 100 + (r >= 50 ? 1 : 0), total = b + tip;
      for (let p = 1; p <= 100; p++) {
        const lo = Math.trunc(total / p), hiCount = total - lo * p;
        const exp = hiCount ? [{ count: hiCount, cents: lo + 1 }, { count: p - hiCount, cents: lo }] : [{ count: p, cents: lo }];
        const got = window.splitBill(b, t, p); n++;
        if (got.tipCents !== tip || got.totalCents !== total || JSON.stringify(got.shares) !== JSON.stringify(exp)) { bad++; first = first || [b, t, p, JSON.stringify(got)]; }
      }
    }
    return JSON.stringify({ calls: n, mismatches: bad, first });
  }));

  console.log('== C5 markup ==');
  console.log(await page.evaluate(() => JSON.stringify({
    labels: [...document.querySelectorAll('label')].map(l => ({ text: l.textContent, for: l.htmlFor, visible: l.getBoundingClientRect().height > 0 && getComputedStyle(l).visibility === 'visible', labelsInput: document.getElementById(l.htmlFor).labels[0] === l })),
    inputs: [...document.querySelectorAll('input')].map(i => ({ id: i.id, type: i.type, inputmode: i.getAttribute('inputmode'), autocomplete: i.getAttribute('autocomplete'), maxlength: i.getAttribute('maxlength'), describedby: i.getAttribute('aria-describedby') })),
    errors: [...document.querySelectorAll('p.error')].map(p => ({ id: p.id, role: p.getAttribute('role') })),
    result: { role: document.getElementById('result').getAttribute('role'), live: document.getElementById('result').getAttribute('aria-live') },
    inputCount: document.querySelectorAll('input,select,textarea,button').length
  })));

  console.log('== C5 widths ==');
  const measure = () => page.evaluate(() => {
    const w = window.innerWidth, cw = document.documentElement.clientWidth;
    let worst = 0, over = [];
    for (const el of document.querySelectorAll('body, body *')) {
      const r = el.getBoundingClientRect(); if (r.width === 0 && r.height === 0) continue;
      worst = Math.max(worst, r.width);
      if (r.width > cw + 0.01 || r.right > cw + 0.01 || r.left < -0.01) over.push(el.tagName + '#' + el.id + ' ' + r.left + '..' + r.right);
    }
    window.scrollTo(500, 0); const sx = window.scrollX; window.scrollTo(0, 0);
    return JSON.stringify({ innerWidth: w, clientWidth: cw, docScrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth, widestElement: worst, elementsOutside: over, scrollXAfterScrollTo500: sx });
  });
  for (const w of [360, 768, 1280]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto(URL); console.log(w, 'first open:', await measure()); await page.screenshot({ path: `shots/w${w}-1-first.png`, fullPage: true });
    await typeInto(page, 'bill', 'abc'); await typeInto(page, 'tip', '18.0'); await typeInto(page, 'people', '0'); await page.click('h1');
    console.log(w, '3 messages:', await measure()); await page.screenshot({ path: `shots/w${w}-2-errors.png`, fullPage: true });
    await typeInto(page, 'bill', '1000000.00'); await typeInto(page, 'tip', '100'); await typeInto(page, 'people', '99');
    console.log(w, 'largest 2-line result:', await measure(), show((await state(page)).lines.slice(5))); await page.screenshot({ path: `shots/w${w}-3-result.png`, fullPage: true });
    await typeInto(page, 'bill', 'W'.repeat(64)); await typeInto(page, 'tip', '9'.repeat(64)); await typeInto(page, 'people', 'M'.repeat(64)); await page.click('h1');
    console.log(w, '64-character values:', await measure()); await page.screenshot({ path: `shots/w${w}-4-long.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1280, height: 800 });

  console.log('== C7 ==');
  await page.goto(URL);
  console.log('fetch:', await page.evaluate(() => new Promise(res => {
    const v = []; document.addEventListener('securitypolicyviolation', e => v.push(e.violatedDirective + ' blocked ' + e.blockedURI));
    fetch('https://example.com').then(r => res('NOT BLOCKED status ' + r.status), e => setTimeout(() => res('rejected: ' + e + ' | violations: ' + v.join('; ')), 100));
  })));
  console.log('other channels:', await page.evaluate(() => new Promise(res => {
    const v = []; document.addEventListener('securitypolicyviolation', e => v.push(e.violatedDirective));
    const img = new Image(); img.src = 'https://example.com/a.png';
    let beacon; try { beacon = navigator.sendBeacon('https://example.com/b', 'x'); } catch (e) { beacon = 'threw ' + e; }
    let xhr; try { const x = new XMLHttpRequest(); x.open('GET', 'https://example.com/c', false); x.send(); xhr = 'sent ' + x.status; } catch (e) { xhr = 'threw ' + e.name; }
    let ws; try { new WebSocket('wss://example.com'); ws = 'constructed'; } catch (e) { ws = 'threw ' + e.name; }
    setTimeout(() => res(JSON.stringify({ sendBeaconReturned: beacon, xhr, ws, violations: v })), 300);
  })));
  await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4');
  console.log('storage after use:', await page.evaluate(async () => {
    const t = f => { try { return f(); } catch (e) { return 'threw ' + e.name; } };
    return JSON.stringify({ cookie: t(() => document.cookie), localStorage: t(() => localStorage.length), sessionStorage: t(() => sessionStorage.length), indexedDB: await (async () => { try { return (await indexedDB.databases()).length; } catch (e) { return 'threw ' + e.name; } })(), caches: await (async () => { try { return (await caches.keys()).length; } catch (e) { return 'threw ' + e.name; } })() });
  }));
  console.log('before reload:', show(await state(page)));
  await page.reload(); console.log('after reload:', show(await state(page)));
  await typeInto(page, 'bill', 'abc'); await typeInto(page, 'tip', '18'); await page.click('h1');
  await page.reload(); console.log('after reload from an error state:', show(await state(page)));
  await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4');
  await page.goto('about:blank'); await page.goBack(); console.log('after about:blank then Back:', show(await state(page)));
  const src = fs.readFileSync(FILE, 'utf8');
  console.log('source search:', JSON.stringify(Object.fromEntries(['localStorage', 'sessionStorage', 'indexedDB', 'document.cookie', 'caches', 'fetch', 'XMLHttpRequest', 'sendBeacon', 'WebSocket', 'http:', 'https:', 'src=', 'href=', '<form', 'eval(', 'innerHTML'].map(k => [k, src.split(k).length - 1]))));
  console.log('CSP tag exact match count:', src.split(`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`).length - 1, '| non-ASCII bytes in file:', [...src].filter(c => c.codePointAt(0) > 126).length);

  console.log('== C6 / Trigger 6: JavaScript off ==');
  const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 800 }, javaScriptEnabled: false });
  const p2 = await ctx2.newPage(); await p2.goto(URL);
  console.log('visible text:', show(await p2.locator('body').innerText()));
  console.log('guide visible:', await p2.locator('#guide').isVisible(), '| fields div visible:', await p2.locator('#fields').isVisible(), '| visible inputs:', await p2.locator('input:visible').count(), '| visible labels:', await p2.locator('label:visible').count(), '| noscript sentence visible:', await p2.getByText('This calculator needs JavaScript').isVisible());
  await p2.screenshot({ path: 'shots/js-off.png' });
  for (const w of [360]) { await p2.setViewportSize({ width: w, height: 800 }); await p2.screenshot({ path: 'shots/js-off-360.png' }); }
  await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
