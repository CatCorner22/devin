const { connect, URL, state, fill3 } = require('./lib');
const J = x => JSON.stringify(x);
const C = s => 'be=' + J(s.be) + ' te=' + J(s.te) + ' pe=' + J(s.pe) + ' result=' + J(s.r.join(' | '));
const esc = s => [...s].map(c => c.codePointAt(0) > 126 || c.codePointAt(0) < 32 ? 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0') : c).join('');
(async () => {
  const browser = await connect();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(URL);
  console.log('--- A. characters at the ends that a person cannot see (bill; tip 18, people 4)');
  for (const [n, ch] of [['LRM U+200E','\u200e'],['RLM U+200F','\u200f'],['ALM U+061C','\u061c'],['soft hyphen U+00AD','\u00ad'],['LRE U+202A','\u202a'],['PDF U+202C','\u202c'],['LRI U+2066','\u2066'],['PDI U+2069','\u2069'],['MVS U+180E','\u180e'],['CGJ U+034F','\u034f'],['invisible times U+2062','\u2062'],['Hangul filler U+3164','\u3164'],['braille blank U+2800','\u2800'],['NBSP U+00A0','\u00a0'],['tab','\t'],['ideographic space U+3000','\u3000'],['ZWSP U+200B','\u200b'],['ZWJ U+200D','\u200d'],['WJ U+2060','\u2060'],['BOM U+FEFF','\ufeff'],['variation selector U+FE0F','\ufe0f'],['NUL','\u0000'],['DEL U+007F','\u007f']]) {
    const a = await fill3(page, ch + '12.50', '18', '4'), b = await fill3(page, '12.50' + ch, '18', '4');
    console.log(n, '| leading:', a.r.length ? 'RESULT' : 'message ' + J(a.be), '| trailing:', b.r.length ? 'RESULT' : 'message ' + J(b.be));
  }
  console.log('--- A2. Arabic-Indic amount with RLM as a phone keyboard or a copy from right-to-left text gives it');
  console.log(C(await fill3(page, '\u200f١٢٫٥٠', '١٨\u200f', '\u200f٤')));
  console.log('--- B. characters that are not full-width or Arabic-Indic and that NFKC turns into digits or marks');
  for (const [f, v] of [['tip','5²'],['tip','1⁰'],['tip','①'],['tip','⑱'],['tip','𝟏𝟖'],['tip','₁₈'],['tip','㊿'],['tip','⒙'],['tip','１⁸'],['people','２²'],['people','④'],['people','㈩'],['people','Ⅳ'],['people','½'],['people','٤²'],['bill','12․50'],['bill','12﹒50'],['bill','12﹐50'],['bill','⒓50'],['bill','1²'],['bill','³.⁵'],['bill','12。50'],['bill','12٬50'],['bill','१२.५०'],['bill','߁߂'],['bill','12·50'],['bill','12⁄50']]) {
    const a = { bill: '100', tip: '18', people: '4' }; a[f] = v;
    console.log(f, J(v), esc(v), '=>', C(await fill3(page, a.bill, a.tip, a.people)));
  }
  console.log('--- C. typing order and focus');
  await page.reload();
  const st = async l => console.log(l, '| active=' + await page.evaluate(() => document.activeElement.id || document.activeElement.tagName), C(await state(page)));
  await page.click('#bill'); await st('click bill, type nothing');
  await page.keyboard.type('12'); await st('type 12');
  await page.keyboard.type('.'); await st('type .');
  await page.keyboard.press('Tab'); await st('Tab to tip');
  await page.keyboard.press('Shift+Tab'); await st('Shift+Tab back to bill (12. in the field, cursor in it)');
  await page.keyboard.press('End'); await page.keyboard.type('5'); await st('type 5');
  await page.keyboard.press('Tab'); await page.keyboard.type('18'); await st('tip 18');
  await page.keyboard.press('Tab'); await page.keyboard.type('4'); await st('people 4');
  await page.click('#bill'); await page.keyboard.press('End'); await page.keyboard.press('Backspace'); await st('bill back to "12." with cursor in bill');
  await page.keyboard.press('Backspace'); await st('bill "12"');
  await page.keyboard.type(','); await st('bill "12,"');
  await page.evaluate(() => document.getElementById('tip').focus()); await st('script moves focus to tip');
  await page.click('#bill'); await st('click bill again (12, in field)');
  await page.click('h1'); await st('click the heading');
  console.log('--- C2. tab through 3 empty fields without typing');
  await page.reload(); await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await st('after 4 Tabs');
  console.log('--- C3. incomplete: 2 valid fields, third never touched');
  await page.reload(); await page.fill('#bill', '10'); await page.fill('#tip', '10'); await st('bill 10, tip 10');
  console.log('--- C4. value set without an input event (script, some password managers and autofill tools)');
  await page.reload(); await page.evaluate(() => { bill.value = '100'; tip.value = '18'; people.value = '4'; }); await st('values set by script, no event');
  console.log('--- C5. paste with a line break and a tab inside');
  await page.reload();
  for (const v of ['12\n50', '12\t50', '12\r\n.50', '100\n']) { await page.evaluate(v => { const b = document.getElementById('bill'); b.focus(); b.select(); document.execCommand('insertText', false, v); }, v); const val = await page.inputValue('#bill'); await page.fill('#tip', '0'); await page.fill('#people', '1'); await page.evaluate(() => document.activeElement.blur()); console.log('insert', J(v), 'field holds', J(val), C(await state(page))); }
  console.log('--- D. huge input: time for 1 input event');
  for (const [n, mk] of [['100000 digits', n => '9'.repeat(100000)], ['1000000 digits', n => '9'.repeat(1000000)], ['"1" + 20000 spaces + "x"', n => '1' + ' '.repeat(20000) + 'x'], ['"1" + 50000 spaces + "x"', n => '1' + ' '.repeat(50000) + 'x'], ['"1" + 100000 spaces + "x"', n => '1' + ' '.repeat(100000) + 'x'], ['"1" + 100000 ZWSP + "x"', n => '1' + '\u200b'.repeat(100000) + 'x'], ['100000 x "1 "', n => '1 '.repeat(100000)]]) {
    const v = mk();
    const ms = await page.evaluate(v => { const t = document.getElementById('tip'); t.value = v; const t0 = performance.now(); t.dispatchEvent(new Event('input', { bubbles: true })); return Math.round(performance.now() - t0); }, v);
    const s = await state(page);
    console.log(n, '(length ' + v.length + ') in tip:', ms + ' ms', '| te=' + J(s.te));
  }
  await page.fill('#tip', '');
  console.log('--- E. hostile markup as input');
  console.log(C(await fill3(page, '<img src=x onerror=alert(1)>', '<script>alert(1)</script>', '"><b>x')), '| elements inside error paragraphs and result:', await page.evaluate(() => document.querySelectorAll('.error *, #result img, #result script, #result b').length));
  console.log('--- F. repeated: 300 changes in a row, last value wins');
  await page.fill('#bill', '100'); await page.fill('#people', '4');
  for (let i = 0; i <= 300; i++) await page.evaluate(i => { const t = document.getElementById('tip'); t.value = String(i % 101); t.dispatchEvent(new Event('input', { bubbles: true })); }, i);
  console.log(C(await state(page)));
  console.log('--- G. C5 mutation counts');
  await page.reload();
  await page.evaluate(() => { window.__m = { bill: 0, tip: 0, people: 0, result: 0 }; for (const [k, id] of [['bill','bill-error'],['tip','tip-error'],['people','people-error'],['result','result']]) new MutationObserver(l => { window.__m[k] += l.length; }).observe(document.getElementById(id), { childList: true, characterData: true, subtree: true, attributes: true }); });
  const mc = async l => { console.log(l, J(await page.evaluate(() => { const m = { ...window.__m }; window.__m = { bill: 0, tip: 0, people: 0, result: 0 }; return m; })), C(await state(page))); };
  await page.click('#bill'); await page.keyboard.type('abc'); await page.keyboard.press('Tab'); await mc('bill abc then Tab');
  await page.keyboard.type('18'); await mc('type 18 in tip (bill error showing)');
  await page.keyboard.press('Tab'); await page.keyboard.type('12'); await mc('type 12 in people');
  await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace'); await mc('empty people');
  await page.keyboard.type('x'); await mc('people x');
  await page.keyboard.type('yz'); await mc('people xyz (same message)');
  await page.click('#tip'); await page.keyboard.type('5'); await mc('tip 185 -> tip error');
  await page.keyboard.type('5'); await mc('tip 1855 (same message)');
  await page.fill('#bill', '100'); await page.fill('#tip', '18'); await page.fill('#people', '4'); await mc('all valid');
  await page.click('#bill'); await page.keyboard.press('End'); await page.keyboard.type('.'); await mc('bill "100."');
  await page.keyboard.type('0'); await mc('bill "100.0"'); await page.keyboard.type('0'); await mc('bill "100.00" (same result text)');
  await page.keyboard.type(' '); await mc('bill "100.00 " (same result text)');
  await page.click('#tip'); await page.keyboard.press('Home'); await page.keyboard.type('0'); await mc('tip "018" (same result text)');
  await page.click('#people'); await page.click('#bill'); await page.click('h1'); await mc('move focus around, no change of value');
  console.log('--- H. markup');
  console.log(J(await page.evaluate(() => ({ inputs: [...document.querySelectorAll('input')].map(i => ({ id: i.id, type: i.type, inputmode: i.getAttribute('inputmode'), autocomplete: i.getAttribute('autocomplete'), label: document.querySelector('label[for=' + i.id + ']').textContent, labelVisible: document.querySelector('label[for=' + i.id + ']').getBoundingClientRect().height > 0, describedby: i.getAttribute('aria-describedby') })), alerts: [...document.querySelectorAll('.error')].map(e => e.id + ':' + e.getAttribute('role')), result: document.getElementById('result').getAttribute('role'), csp: document.querySelector('meta[http-equiv]').outerHTML }))));
  console.log('--- I. C7');
  const cons = []; page.on('console', m => cons.push(m.text()));
  console.log('fetch:', await page.evaluate(() => fetch('https://example.com').then(r => 'NOT BLOCKED ' + r.status, e => 'blocked: ' + e)));
  console.log('img:', await page.evaluate(() => new Promise(r => { const i = new Image(); i.onload = () => r('NOT BLOCKED'); i.onerror = () => r('blocked'); i.src = 'https://example.com/x.png?' + document.getElementById('bill').value; })));
  console.log('sendBeacon:', await page.evaluate(() => { try { return String(navigator.sendBeacon('https://example.com', 'x')); } catch (e) { return 'threw ' + e; } }));
  console.log('console:', J(cons));
  await page.fill('#bill', '100'); await page.fill('#tip', '18'); await page.fill('#people', '4');
  await page.reload(); console.log('after reload:', J(await page.evaluate(() => ['bill','tip','people'].map(i => document.getElementById(i).value))), C(await state(page)));
  await page.fill('#bill', '100'); await page.fill('#tip', '18'); await page.fill('#people', '4');
  await page.goto('about:blank'); await page.goBack(); await page.waitForTimeout(300);
  console.log('after leave and Back:', J(await page.evaluate(() => ['bill','tip','people'].map(i => document.getElementById(i).value))), C(await state(page)));
  console.log('storage:', J(await page.evaluate(async () => ({ cookie: document.cookie, ls: (() => { try { return localStorage.length; } catch (e) { return String(e); } })(), ss: (() => { try { return sessionStorage.length; } catch (e) { return String(e); } })() }))));
  console.log('--- J. widths');
  for (const w of [360, 768, 1280]) {
    await page.setViewportSize({ width: w, height: 800 });
    for (const [tag, v] of [['first', null], ['errors', ['abc', '18.0', '0']], ['result2', ['999999.99', '100', '100']], ['longinput', ['9'.repeat(300), 'W'.repeat(300), '4']]]) {
      await page.reload(); if (v) await fill3(page, ...v);
      const m = await page.evaluate(() => { const w = document.documentElement.clientWidth; const wide = [...document.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); return r.right > w + 0.5 || r.left < -0.5 || r.width > w + 0.5; }).map(e => e.tagName + '#' + e.id); window.scrollTo(1000, 0); const sx = window.scrollX; window.scrollTo(0, 0); return { innerWidth: window.innerWidth, clientWidth: w, scrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth, wider: wide, scrollXafterScrollTo1000: sx }; });
      await page.screenshot({ path: `w${w}-${tag}.png`, fullPage: true });
      console.log(w, tag, J(m));
    }
  }
  await ctx.close();
  console.log('--- K. JavaScript off');
  const ctx2 = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
  const p2 = await ctx2.newPage(); await p2.goto(URL);
  console.log('visible text:', J(await p2.locator('body').innerText()), '| guide visible:', await p2.locator('#guide').isVisible(), '| inputs visible:', await p2.locator('input:visible').count(), '| labels visible:', await p2.locator('label:visible').count());
  await p2.screenshot({ path: 'nojs.png' });
  await ctx2.close(); await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
