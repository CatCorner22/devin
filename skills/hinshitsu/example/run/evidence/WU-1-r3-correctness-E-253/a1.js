const { launch, URL, typeInto, state, show, BIN } = require('./lib');
(async () => {
  console.log('chrome binary:', BIN);
  const browser = await launch();
  console.log('browser version:', browser.version());
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const reqs = [];
  page.on('request', r => reqs.push(r.method() + ' ' + r.url()));
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  const cdpReqs = [];
  cdp.on('Network.requestWillBeSent', e => cdpReqs.push(e.request.url));
  await page.goto(URL);
  console.log('\n== C1 ==');
  console.log('playwright request log (' + reqs.length + '):', reqs);
  console.log('CDP Network.requestWillBeSent (' + cdpReqs.length + '):', cdpReqs);
  console.log('performance entries:', await page.evaluate(() => performance.getEntries().map(e => e.entryType + ' ' + e.name)));
  console.log('elements with src/href, link, script[src], img, iframe:', await page.evaluate(() => document.querySelectorAll('[src],[href],link,img,iframe,object,embed').length));

  console.log('\n== C4 first open ==');
  console.log(show(await state(page)));
  console.log('guide:', await page.evaluate(() => { const g = document.getElementById('guide'); return { hidden: g.hidden, text: g.textContent, sentences: g.textContent.split('.').filter(Boolean).length }; }));
  console.log('visible body text:', show(await page.evaluate(() => document.body.innerText)));

  console.log('\n== C2 tests ==');
  const c2 = [['100.00', '18', '4'], ['0.30', '15', '1'], ['10.10', '15', '1'], ['12.25', '18', '1'], ['0100.5', '007', '02'], ['10.00', '0', '3'], ['10.01', '0', '3']];
  for (const [b, t, p] of c2) {
    await page.goto(URL);
    await typeInto(page, 'bill', b); await typeInto(page, 'tip', t); await typeInto(page, 'people', p);
    const s = await state(page);
    console.log([b, t, p].join(' | '), '=>', show(s.lines), 'errors:', show([s.billErr, s.tipErr, s.peopleErr]));
  }
  console.log('after C2: requests', reqs.length, 'cdp', cdpReqs.length, '(7 navigations + first = 8 expected if 1 per load)');

  console.log('\n== C4 incomplete ==');
  await page.goto(URL);
  await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18');
  console.log('bill+tip typed, people untouched:', show(await state(page)));
  await page.click('#people');
  console.log('people clicked, nothing typed, still focused:', show(await state(page)));
  await page.goto(URL);
  await page.click('#bill');
  console.log('fresh page, bill clicked only:', show(await state(page)));
  await page.keyboard.press('Tab');
  console.log('then Tab (left bill empty):', show(await state(page)));
  await page.goto(URL);
  await typeInto(page, 'tip', '18');
  console.log('fresh page, only tip typed (focus still in tip):', show(await state(page)));
  await page.goto(URL);
  await typeInto(page, 'bill', '5'); await page.keyboard.press('Backspace');
  console.log('bill typed 5 then deleted, still focused:', show(await state(page)));

  console.log('\n== C4 error inputs (other 2 fields valid: bill 100.00, tip 18, people 4) ==');
  const bad = {
    bill: ['abc', '1,000.00', '1.000,00', '1e3', '.5', ',5', '$12.50', '12.50$', '\u20AC12,50', '\u00A35', '-5', '-0.01', '\u22125', '0', '0.00', '0,0', '000', '1000000.01', '1000001', '1000000,01', '99999999', '12.345', '12,345', '1.000', '0.001', '1 000', '12 .50', '12..5', '12.5.0', '12.,5', '+5', '12.50x', 'Infinity', 'NaN', '0x10', '1_000', "1'000", '12/5', '5%', '1e-2', '12.5e1'],
    tip: ['abc', '101', '-1', '18.0', '18,5', '1e1', '+4', '4.', '18%', '1 8', '100.0', '1000', '0.5', '.5', '4,'],
    people: ['0', '00', '101', '-1', '18.0', '18,5', '1e1', '+4', '4.', 'abc', '1.0', '2 0', '1000', '4,', 'four']
  };
  const good = { bill: '100.00', tip: '18', people: '4' };
  let nBad = 0, nFail = 0;
  for (const f of Object.keys(bad)) {
    for (const v of bad[f]) {
      await page.goto(URL);
      for (const g of Object.keys(good)) if (g !== f) await typeInto(page, g, good[g]);
      await typeInto(page, f, v);
      const s1 = await state(page);
      await page.keyboard.press('Tab');
      const s2 = await state(page);
      const m1 = s1[f + 'Err'], m2 = s2[f + 'Err'];
      const ok = m1 !== '' && m2 !== '' && s1.lines.length === 0 && s2.lines.length === 0 && s1.resultText === '' && s2.invalid === f;
      nBad++; if (!ok) nFail++;
      console.log((ok ? 'ok  ' : 'FAIL'), f, show(v), '| focused:', show(m1), '| left:', m1 === m2 ? '(same)' : show(m2), '| result lines:', s1.lines.length, s2.lines.length, '| other msgs:', show(['bill', 'tip', 'people'].filter(x => x !== f).map(x => s2[x + 'Err']).join('')));
    }
  }
  console.log('error inputs:', nBad, 'not conforming:', nFail);

  console.log('\n== C4 empty after typed/left ==');
  for (const f of ['bill', 'tip', 'people']) {
    await page.goto(URL);
    for (const g of Object.keys(good)) if (g !== f) await typeInto(page, g, good[g]);
    await typeInto(page, f, '7'); await page.keyboard.press('Backspace');
    const s1 = await state(page);
    await page.goto(URL);
    for (const g of Object.keys(good)) if (g !== f) await typeInto(page, g, good[g]);
    await page.click('#' + f); await page.click('h1');
    const s2 = await state(page);
    console.log(f, '| typed then emptied:', show(s1[f + 'Err']), 'lines', s1.lines.length, '| focused then left:', show(s2[f + 'Err']), 'lines', s2.lines.length);
  }

  console.log('\n== C4 trailing decimal mark ==');
  for (const v of ['12.', '12,', '10.', '\uFF11\uFF12\uFF0E', '\u0661\u0662\u066B', '0.', ' 12. ']) {
    await page.goto(URL);
    await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4'); await typeInto(page, 'bill', v);
    const a = await state(page);
    await page.keyboard.press('Tab');
    const b = await state(page);
    await page.keyboard.press('Shift+Tab');
    const c = await state(page);
    await page.keyboard.type('5');
    const d = await state(page);
    console.log(show(v), '| focused: msg', show(a.billErr), 'lines', a.lines.length, 'invalid', show(a.invalid), '| after Tab: msg', show(b.billErr), 'lines', b.lines.length, 'active', b.active, '| back (Shift+Tab): msg', show(c.billErr), 'lines', c.lines.length, 'active', c.active, 'value', show(c.values[0]), '| then type 5:', show(d.values[0]), show(d.lines[0] || ''), 'msg', show(d.billErr));
  }
  for (const f of ['tip', 'people']) {
    await page.goto(URL);
    await typeInto(page, 'bill', '100.00'); await typeInto(page, f === 'tip' ? 'people' : 'tip', '4'); await typeInto(page, f, '4.');
    const a = await state(page);
    console.log(f, '"4." while focused: msg', show(a[f + 'Err']), 'lines', a.lines.length);
  }

  console.log('\n== C4 valid inputs (result must show) ==');
  const ok = {
    bill: ['12.50', '12,50', '  12.50  ', '\u00A012.50\u200B', '\t12.50\uFEFF', '\uFF11\uFF12\uFF0E\uFF15\uFF10', '\uFF11\uFF12\uFF0C\uFF15\uFF10', '\u0661\u0662\u066B\u0665\u0660', '\u0661\u0662.\u0665\u0660', '\u06F1\u06F2\u066B\u06F5\u06F0', '1\uFF12.\u0665\u06F0', '0.01', '0,01', '1000000.00', '1000000', '1000000,0', '1000000.0', '999999.99', '007', '12.5', '12,5', '0.5', '0.1', '0.10', '100.5', '5', '0000000000000000000000000000000000000000000000000000000012.50', '1.05', '1.5', '1.50'],
    tip: ['0', '100', '00', '018', '\uFF11\uFF18', '\u0661\u0668', '\u06F1\u06F8', ' 18 ', '\u200B18\u00A0', '000000000000000000000000000000000000000000000000000000000000100'],
    people: ['1', '100', '001', '\uFF14', '\u0664', '\u06F4', ' 4 ', '\u200E4\u200F']
  };
  for (const f of Object.keys(ok)) {
    for (const v of ok[f]) {
      await page.goto(URL);
      for (const g of Object.keys(good)) if (g !== f) await typeInto(page, g, good[g]);
      await typeInto(page, f, v);
      const s = await state(page);
      console.log(f, show(v), '=>', show(s.lines.slice(0, 3).join(' / ')), '| value in field', show(s.values[['bill', 'tip', 'people'].indexOf(f)]), '| msgs', show(s.billErr + s.tipErr + s.peopleErr));
    }
  }

  console.log('\n== C4 result recomputed on every change ==');
  await page.goto(URL);
  await typeInto(page, 'bill', '100.00'); await typeInto(page, 'tip', '18'); await typeInto(page, 'people', '4');
  console.log('100.00/18/4:', show((await state(page)).lines));
  await page.keyboard.press('Backspace'); console.log('people emptied:', show(await state(page)));
  await page.keyboard.type('3'); console.log('people 3:', show((await state(page)).lines));
  await page.click('#tip'); await page.keyboard.press('End'); await page.keyboard.press('Backspace'); console.log('tip 1:', show((await state(page)).lines));
  await page.keyboard.type('x'); console.log('tip 1x:', show(await state(page)));
  await page.keyboard.press('Backspace'); await page.keyboard.type('5'); console.log('tip 15:', show((await state(page)).lines));
  await page.click('#bill'); await page.keyboard.press('End'); await page.keyboard.press('Backspace'); console.log('bill 100.0:', show((await state(page)).lines));
  await page.keyboard.press('Backspace'); console.log('bill 100. (focused):', show(await state(page)));
  await page.keyboard.press('Backspace'); console.log('bill 100:', show((await state(page)).lines));

  console.log('\nfinal request counts: playwright', reqs.length, 'cdp', cdpReqs.length, 'distinct urls', [...new Set(cdpReqs)]);
  await browser.close();
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
