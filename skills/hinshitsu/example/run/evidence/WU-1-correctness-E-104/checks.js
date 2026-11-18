const { open, readState, typeInto, expected, URL_, FILE } = require('./common');
const fs = require('fs');
const log = (...a) => console.log(...a);
(async () => {
  const { browser, ctx, page } = await open();
  const cdp = await ctx.newCDPSession(page);
  log('Chrome:', browser.version());
  const consoleMsgs = []; page.on('console', (m) => consoleMsgs.push(m.type() + ': ' + m.text())); page.on('pageerror', (e) => consoleMsgs.push('pageerror: ' + e.message));

  // ---- C1: request log
  await cdp.send('Network.enable');
  const reqs = []; cdp.on('Network.requestWillBeSent', (e) => reqs.push(e.request.url + ' [' + e.type + ']'));
  await page.goto(URL_); await page.waitForTimeout(1000);
  log('\n== C1 request log on file:// open:', reqs.length, 'request(s)'); reqs.forEach((r) => log('  ', r));
  log('location.href:', await page.evaluate(() => location.href));

  // ---- C4 first-open state
  let s = await readState(page);
  log('\n== C4 first open:', JSON.stringify(s));
  log('visible text of main:', JSON.stringify(await page.evaluate(() => document.querySelector('main').innerText)));
  await page.focus('#bill'); s = await readState(page); log('after focus only on bill: errs', JSON.stringify(s.errs), 'result', s.resultShown);

  // ---- C2 named tests + extras, typed
  log('\n== C2 typed tests');
  const c2 = [['100.00', '18', '4'], ['0.30', '15', '1'], ['10.10', '15', '1'], ['12.25', '18', '1'], ['10.00', '0', '3'], ['10.02', '0', '4'], ['0.01', '0', '1'], ['1000000.00', '100', '100'], ['1000000', '0', '1'], ['12.5', '18', '2'], [' 007.10 ', ' 018 ', ' 02 '], ['0.05', '50', '1'], ['0.10', '5', '1'], ['0.09', '5', '1'], ['999999.99', '99', '97']];
  for (const [b, t, p] of c2) {
    await typeInto(page, 'bill', b); await typeInto(page, 'tip', t); await typeInto(page, 'people', p);
    s = await readState(page); const e = expected(b, t, p);
    const pay = s.lines.slice(5).filter((l) => / pays? /.test(l));
    const ok = s.resultShown && s.lines.slice(0, 5).join('|') === e.head.join('|') && pay.join('|') === e.payLines.join('|');
    log(JSON.stringify([b, t, p]), ok ? 'MATCH' : 'MISMATCH', JSON.stringify(s.lines), ok ? '' : 'expected ' + JSON.stringify(e.head.concat(e.payLines)));
  }

  // ---- C4 invalid/valid inputs
  log('\n== C4 inputs (other 2 fields hold valid values 100.00 / 18 / 4)');
  const sets = {
    bill: { bad: ['', 'abc', '12a', '12,50', '1,000.00', '1e3', '10.', '0.', '.5', '.', '$12.50', '12.50$', '€5', '£5', '¥5', '-5', '-0.01', '0', '0.0', '0.00', '00', '1000000.01', '1000001', '9999999', '10000000', '99999999999999999999999', '1.234', '0.001', '1.000', '1..2', '1.2.3', '1 2', '+5', '１２', '١٢', 'Infinity', 'NaN', '0x10', '1_000', '5%', '   '],
            good: ['0.01', '1000000', '1000000.00', '1000000.0', '  12.50  ', '12.5', '007', '0.10', '0000001000000.00'] },
    tip: { bad: ['', 'abc', '18.0', '1e1', '+4', '4.', '-1', '101', '1000', '18%', '1,5', '1 8', '.5', '１８', '99999999999999999999999'], good: ['0', '100', '018', ' 18 ', '00'] },
    people: { bad: ['', '0', '00', '101', 'abc', '18.0', '1e1', '+4', '4.', '-1', '1.5', '4 people', '1,0', '1000', '99999999999999999999999'], good: ['1', '100', '004', ' 4 '] },
  };
  const base = { bill: '100.00', tip: '18', people: '4' };
  const idx = { bill: 0, tip: 1, people: 2 };
  let c4fail = 0;
  for (const f of Object.keys(sets)) {
    for (const k of Object.keys(base)) await typeInto(page, k, base[k]);
    for (const kind of ['bad', 'good']) for (const v of sets[f][kind]) {
      await typeInto(page, f, v);
      if (v === '') { await page.keyboard.press('Tab'); }
      s = await readState(page);
      const err = s.errs[idx[f]];
      const pass = kind === 'bad' ? (err !== '' && !s.resultShown && s.invalid[idx[f]] === 'true') : (err === '' && s.resultShown);
      if (!pass) c4fail++;
      log(`${f} ${kind} ${JSON.stringify(v)} -> error ${JSON.stringify(err)} | result shown ${s.resultShown}${s.resultShown ? ' ' + JSON.stringify(s.lines.slice(0, 5)) : ''} | ${pass ? 'PASS' : 'FAIL'}`);
    }
  }
  log('C4 input failures:', c4fail);
  // NBSP and tab at the ends (pasted via insertText)
  for (const k of Object.keys(base)) await typeInto(page, k, base[k]);
  await typeInto(page, 'bill', ''); await page.keyboard.insertText('\u00a0\t12.50\u3000'); s = await readState(page);
  log('bill with NBSP, tab, ideographic space at ends -> errs', JSON.stringify(s.errs), 'result', s.resultShown, JSON.stringify(s.lines[0]));

  // ---- C4 states and transitions
  log('\n== C4 transitions');
  await page.reload(); await page.waitForTimeout(300);
  await page.focus('#bill'); await page.keyboard.press('Tab'); s = await readState(page);
  log('focus bill, Tab (leave empty): errs', JSON.stringify(s.errs), 'invalid', JSON.stringify(s.invalid), 'result', s.resultShown, 'active', await page.evaluate(() => document.activeElement.id));
  await page.keyboard.type('x'); s = await readState(page); log('type x in tip: errs', JSON.stringify(s.errs), 'result', s.resultShown);
  const boxes = await page.evaluate(() => ['bill', 'tip', 'people'].map((i) => { const a = document.getElementById(i), e = document.getElementById(i + '-error'); const ra = a.getBoundingClientRect(), re = e.getBoundingClientRect(); return { field: i, inputBottom: ra.bottom, errTop: re.top, errBottom: re.bottom, sameParent: a.parentElement === e.parentElement, color: getComputedStyle(e).color, describedby: a.getAttribute('aria-describedby') }; }));
  log('error placement:', JSON.stringify(boxes));
  await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18'); s = await readState(page);
  log('bill+tip valid, people untouched: errs', JSON.stringify(s.errs), 'result', s.resultShown);
  await typeInto(page, 'people', '4'); s = await readState(page); log('people 4:', s.resultShown, JSON.stringify(s.lines));
  await page.keyboard.type('0'); s = await readState(page); log('append 0 -> people 40:', s.resultShown, JSON.stringify(s.lines));
  await page.keyboard.type('0'); s = await readState(page); log('append 0 -> people 400:', 'errs', JSON.stringify(s.errs), 'result', s.resultShown, 'resultText', JSON.stringify(s.resultText));
  await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace'); s = await readState(page); log('delete all of people (not left yet): errs', JSON.stringify(s.errs), 'result', s.resultShown);
  await page.keyboard.type('3'); s = await readState(page); log('people 3:', 'errs', JSON.stringify(s.errs), s.resultShown, JSON.stringify(s.lines));
  await page.focus('#tip'); await page.keyboard.press('End'); await page.keyboard.press('Backspace'); s = await readState(page); log('tip 18 -> 1:', JSON.stringify(s.lines));
  // submit handler
  const before = await page.evaluate(() => location.href);
  await page.focus('#bill'); await page.keyboard.press('Enter'); await page.waitForTimeout(200);
  const sub = await page.evaluate(() => { let prevented = null; const f = document.getElementById('form'); f.addEventListener('submit', (e) => { prevented = e.defaultPrevented; }); f.requestSubmit(); return prevented; });
  await page.waitForTimeout(300); s = await readState(page);
  log('Enter in bill then form.requestSubmit(): defaultPrevented', sub, 'url unchanged', before === await page.evaluate(() => location.href), 'vals kept', JSON.stringify(s.vals));

  // ---- direct calls to each function (branch coverage)
  log('\n== direct function calls');
  const direct = await page.evaluate(() => {
    const o = {};
    const j = (x) => JSON.stringify(x);
    o['splitBill(10000,18,4) extra=0'] = j(splitBill(10000, 18, 4));
    o['splitBill(1000,0,3) extra>0'] = j(splitBill(1000, 0, 3));
    o['splitBill(100000000,100,100)'] = j(splitBill(100000000, 100, 100));
    o['splitBill(30,15,1) half cent'] = j(splitBill(30, 15, 1));
    o['splitBill(1,0,100) more people than cents'] = j(splitBill(1, 0, 100));
    for (const t of ['', '  ', '1,5', 'x', '10.', '10.5', '10.50', '10', '12345678', '9999999', '0', '0.00', '1000000.01', '1000000.00', '007.07']) o['readAmount(' + j(t) + ')'] = j(readAmount(t));
    for (const t of ['', 'x', '1000', '101', '0', '100', '007']) o['readWhole(' + j(t) + ',1,100,"E")'] = j(readWhole(t, 1, 100, 'E'));
    o['readWhole("0",0,100,"E")'] = j(readWhole('0', 0, 100, 'E'));
    for (const c of [0, 5, 10, 99, 100, 105, 20000000000]) o['money(' + c + ')'] = money(c);
    o['payLine count 1'] = payLine({ count: 1, cents: 334 }); o['payLine count 2'] = payLine({ count: 2, cents: 333 });
    o['typeof window.splitBill'] = typeof window.splitBill;
    o['globals added by script'] = ['MAX_BILL_CENTS', 'MAX_TIP_PERCENT', 'MAX_PEOPLE', 'splitBill', 'readAmount', 'readWhole', 'money', 'payLine', 'fields', 'resultBox', 'addLine', 'update'].filter((k) => k in window).join(',');
    return o;
  });
  for (const k of Object.keys(direct)) log('  ', k, '=>', direct[k]);

  // ---- C5 widths
  log('\n== C5 widths');
  const states = {
    first: async () => { await page.reload(); await page.waitForTimeout(200); },
    error: async () => { await typeInto(page, 'bill', '12,50'); await typeInto(page, 'tip', '18.0'); await typeInto(page, 'people', '0'); await page.keyboard.press('Tab'); },
    error2: async () => { await typeInto(page, 'bill', '12.345'); await typeInto(page, 'tip', ''); await typeInto(page, 'people', ''); await page.keyboard.press('Tab'); await page.focus('#tip'); await page.keyboard.press('Tab'); },
    result: async () => { await typeInto(page, 'bill', '999999.99'); await typeInto(page, 'tip', '99'); await typeInto(page, 'people', '97'); },
  };
  for (const w of [360, 768, 1280]) {
    await page.setViewportSize({ width: w, height: 800 });
    for (const st of Object.keys(states)) {
      await states[st](); await page.waitForTimeout(150);
      const m = await page.evaluate(() => {
        const de = document.documentElement; let worst = 0, clipped = [];
        for (const el of document.querySelectorAll('body *')) { const r = el.getBoundingClientRect(); if (r.width === 0 && r.height === 0) continue; if (r.right > worst) worst = r.right; if (r.left < 0 || r.right > innerWidth + 0.5) clipped.push(el.tagName + '#' + el.id); if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0 && el.tagName !== 'INPUT') clipped.push('overflow:' + el.tagName + '#' + el.id); }
        window.scrollTo(1000, 0); const sx = window.scrollX; window.scrollTo(0, 0);
        return { innerWidth, scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, bodyScrollWidth: document.body.scrollWidth, maxRight: worst, scrollXAfterScrollTo1000: sx, clipped, inputFont: getComputedStyle(document.getElementById('bill')).fontSize };
      });
      const f = `${__dirname}/out/w${w}-${st}.png`; await page.screenshot({ path: f, fullPage: true });
      log(`width ${w} state ${st}:`, JSON.stringify(m), '->', f);
    }
  }
  await page.setViewportSize({ width: 1280, height: 800 });
  log('markup:', JSON.stringify(await page.evaluate(() => ({
    labels: [...document.querySelectorAll('input')].map((i) => { const l = document.querySelector('label[for="' + i.id + '"]'); const r = l && l.getBoundingClientRect(); return { id: i.id, label: l && l.textContent, labelVisible: !!r && r.width > 0 && r.height > 0 && getComputedStyle(l).visibility === 'visible', inputmode: i.getAttribute('inputmode'), autocomplete: i.getAttribute('autocomplete'), type: i.type, describedby: i.getAttribute('aria-describedby') }; }),
    errorRegions: [...document.querySelectorAll('.error')].map((e) => ({ id: e.id, role: e.getAttribute('role'), live: e.getAttribute('aria-live') })),
    result: { role: document.getElementById('result').getAttribute('role'), live: document.getElementById('result').getAttribute('aria-live') },
    csp: document.querySelector('meta[http-equiv]').outerHTML, lang: document.documentElement.lang,
  })), null, 1));
  // accessibility tree in result state
  await states.result();
  const ax = await cdp.send('Accessibility.getFullAXTree');
  log('AX nodes (role: name):', ax.nodes.filter((n) => !n.ignored && n.role && ['alert', 'status', 'textbox', 'heading', 'form'].includes(n.role.value)).map((n) => n.role.value + ': ' + JSON.stringify(n.name && n.name.value) + (n.description ? ' desc ' + JSON.stringify(n.description.value) : '')).join(' | '));

  // ---- C7
  log('\n== C7');
  await page.reload(); await page.waitForTimeout(200); consoleMsgs.length = 0;
  const fr = await page.evaluate(() => new Promise((res) => { const v = []; document.addEventListener('securitypolicyviolation', (e) => v.push({ blockedURI: e.blockedURI, violatedDirective: e.violatedDirective, effectiveDirective: e.effectiveDirective })); fetch('https://example.com').then((r) => res({ outcome: 'RESOLVED status ' + r.status, v }), (e) => setTimeout(() => res({ outcome: 'REJECTED ' + e.name + ': ' + e.message, v }), 200)); }));
  log("fetch('https://example.com'):", JSON.stringify(fr)); consoleMsgs.forEach((m) => log('  console', m));
  const other = await page.evaluate(() => new Promise((res) => { const v = []; document.addEventListener('securitypolicyviolation', (e) => v.push(e.effectiveDirective + ' ' + e.blockedURI)); const img = new Image(); img.src = 'https://example.com/x.png'; let b; try { b = navigator.sendBeacon('https://example.com/b', 'x'); } catch (e) { b = 'threw ' + e.message; } setTimeout(() => res({ sendBeacon: b, violations: v }), 500); }));
  log('img + sendBeacon probes:', JSON.stringify(other));
  await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4');
  log('storage after use:', JSON.stringify(await page.evaluate(async () => { const o = {}; try { o.localStorage = localStorage.length; } catch (e) { o.localStorage = 'threw ' + e.name; } try { o.sessionStorage = sessionStorage.length; } catch (e) { o.sessionStorage = 'threw ' + e.name; } try { o.cookie = document.cookie; } catch (e) { o.cookie = 'threw ' + e.name; } try { o.indexedDB = (await indexedDB.databases()).length; } catch (e) { o.indexedDB = 'threw ' + e.name; } try { o.caches = (await caches.keys()).length; } catch (e) { o.caches = 'threw ' + e.name; } return o; })));
  s = await readState(page); log('before reload:', JSON.stringify(s.vals), 'result', s.resultShown);
  await page.reload(); await page.waitForTimeout(300); s = await readState(page); log('after page.reload():', JSON.stringify(s.vals), 'errs', JSON.stringify(s.errs), 'result', s.resultShown);
  await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4');
  await page.keyboard.press('F5'); await page.waitForTimeout(800); s = await readState(page); log('after F5 key:', JSON.stringify(s.vals), 'errs', JSON.stringify(s.errs), 'result', s.resultShown);
  await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4');
  await page.goto('about:blank'); await page.goBack(); await page.waitForTimeout(500); s = await readState(page); log('after about:blank then Back:', JSON.stringify(s.vals), 'errs', JSON.stringify(s.errs), 'result', s.resultShown);
  const src = fs.readFileSync(FILE, 'utf8');
  for (const re of [/localStorage|sessionStorage|indexedDB|document\.cookie|caches\.|openDatabase|history\.(push|replace)State|location\.(hash|search|href)\s*=/g, /fetch\(|XMLHttpRequest|sendBeacon|WebSocket|EventSource|<img|<link|<iframe|<a\s|src=|href=|url\(|@import|import\(|action=|method=|\bname=/g]) log('source matches for', String(re), ':', JSON.stringify(src.match(re)));
  log('autocomplete attributes in source:', JSON.stringify(src.match(/<(form|input)[^>]*>/g)));
  log('CSP tag exact match:', src.includes(`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`));
  log('non-ASCII bytes in file:', (src.match(/[^\x00-\x7f]/g) || []).length, '| CR bytes:', (src.match(/\r/g) || []).length);

  // ---- C6
  log('\n== C6 JavaScript disabled');
  await cdp.send('Emulation.setScriptExecutionDisabled', { value: true });
  await page.goto(URL_); await page.waitForTimeout(500);
  const txt = await cdp.send('Runtime.evaluate', { expression: 'document.querySelector("main").innerText', returnByValue: true }).catch((e) => ({ error: e.message }));
  log('main innerText with JS off (read through DevTools):', JSON.stringify(txt.result ? txt.result.value : txt));
  await page.screenshot({ path: `${__dirname}/out/nojs-1280.png`, fullPage: true });
  await page.focus('#bill'); await page.keyboard.type('100.00'); await page.focus('#tip'); await page.keyboard.type('18'); await page.focus('#people'); await page.keyboard.type('4'); await page.keyboard.press('Tab');
  await page.setViewportSize({ width: 360, height: 800 }); await page.screenshot({ path: `${__dirname}/out/nojs-360-typed.png`, fullPage: true });
  const st2 = await cdp.send('Runtime.evaluate', { expression: 'JSON.stringify({hidden: document.getElementById("result").hidden, errs: [...document.querySelectorAll(".error")].map(e=>e.textContent), vals:[...document.querySelectorAll("input")].map(i=>i.value), scrollWidth: document.documentElement.scrollWidth, innerWidth})', returnByValue: true });
  log('JS off, after typing 100.00/18/4:', st2.result.value);
  await cdp.send('Emulation.setScriptExecutionDisabled', { value: false });
  await page.close(); await browser.close();
})().catch((e) => { console.error('SCRIPT ERROR', e); process.exit(1); });
