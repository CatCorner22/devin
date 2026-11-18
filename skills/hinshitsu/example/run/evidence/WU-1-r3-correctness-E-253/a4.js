// Raw DevTools protocol against the desktop Chrome that is already running (no Playwright, so no focus emulation).
const { execSync } = require('child_process');
const { URL } = require('./lib');
const sh = c => execSync(c, { env: { ...process.env, DISPLAY: ':0' } }).toString().trim();
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const tab = await (await fetch('http://localhost:29229/json/new?' + encodeURIComponent(URL), { method: 'PUT' })).json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pending = {};
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending[d.id]) { pending[d.id](d); delete pending[d.id]; } };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pending[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); return r.result.exceptionDetails ? 'EXCEPTION ' + JSON.stringify(r.result.exceptionDetails.exception) : r.result.result.value; };
  const click = async sel => { const [x, y] = JSON.parse(await ev(`(()=>{const r=document.querySelector('${sel}').getBoundingClientRect();return JSON.stringify([r.left+r.width/2,r.top+r.height/2])})()`)); for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 }); };
  const key = async (k, text) => { await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, text, code: k === 'Tab' ? 'Tab' : undefined, windowsVirtualKeyCode: k === 'Tab' ? 9 : undefined }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k }); };
  const type = async s => { for (const c of s) await key(c, c); };
  const snap = () => ev(`JSON.stringify({windowHasFocus:document.hasFocus(),active:document.activeElement.id||document.activeElement.tagName,billValue:bill.value,billMsg:document.getElementById('bill-error').textContent,tipMsg:document.getElementById('tip-error').textContent,result:document.getElementById('result').textContent,events:window.__ev.splice(0).join(',')})`);
  const reload = async () => { await send('Page.reload'); await sleep(700); await ev(`(()=>{window.__ev=[];for(const id of ['bill','tip','people'])for(const t of ['focus','blur','input'])document.getElementById(id).addEventListener(t,()=>window.__ev.push(id+':'+t));window.addEventListener('blur',()=>window.__ev.push('window:blur'));window.addEventListener('focus',()=>window.__ev.push('window:focus'));})()`); };
  await send('Page.enable'); await send('Page.bringToFront'); await sleep(500);
  const chromeWin = sh(`wmctrl -l | grep -i 'Google Chrome' | head -1 | cut -d' ' -f1`);
  const front = async () => { sh(`wmctrl -i -a ${chromeWin}`); await sleep(700); };
  // A second window to bring to the front: a small X11 window opened by xmessage or zenity if present, else the desktop.
  let other = null;
  try { require('child_process').spawn('xmessage', ['-name', 'auditwin', 'other window'], { env: { ...process.env, DISPLAY: ':0' }, detached: true, stdio: 'ignore' }).unref(); await sleep(1000); other = sh(`wmctrl -l | grep -i auditwin | head -1 | cut -d' ' -f1`) || null; } catch (e) { }
  console.log('chrome window', chromeWin, '| other window', other, '| windows:', sh('wmctrl -l').replace(/\n/g, ' ;; '));
  const away = async () => { if (other) sh(`wmctrl -i -a ${other}`); else throw new Error('no other window'); await sleep(900); };

  console.log('page:', await ev('location.href'), '| Chrome', (await send('Browser.getVersion')).result.product);
  await reload(); await front();
  console.log('T4 step 0, page open:', await snap());
  await click('#bill'); await sleep(300);
  console.log('T4 step 1, empty bill field clicked, nothing typed:', await snap());
  await away();
  console.log('T4 step 2, another window brought to the front:', await snap(), '| active X window:', sh('xdotool getactivewindow getwindowname'));
  await front();
  console.log('T4 step 3, Chrome brought back:', await snap());
  await key('Tab'); await sleep(200);
  console.log('T4 step 4, then Tab (the person leaves the field):', await snap());

  await reload(); await front(); await click('#tip'); await type('18'); await click('#people'); await type('4'); await click('#bill'); await type('12.'); await sleep(200);
  console.log('T3 real keys, step 1, bill 12. typed, field focused:', await snap());
  await away();
  console.log('T3 step 2, another window in front:', await snap());
  await front();
  console.log('T3 step 3, Chrome back:', await snap());
  await key('Tab'); await sleep(200);
  console.log('T3 step 4, Tab pressed:', await snap());
  await click('#bill'); await sleep(200);
  console.log('T3 step 5, bill field clicked again:', await snap());
  await type('5'); await sleep(200);
  console.log('T3 step 6, 5 typed (bill 12.5):', await snap());

  await reload(); await front(); await click('#bill'); await type('abc'); await sleep(200); await away();
  console.log('extra: bill abc typed, another window in front:', await snap());
  await front();
  if (other) sh(`wmctrl -i -c ${other}`);
  await fetch('http://localhost:29229/json/close/' + tab.id);
  process.exit(0);
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(1); });
