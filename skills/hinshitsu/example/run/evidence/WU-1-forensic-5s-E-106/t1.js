const { chromium } = require('/home/ubuntu/pwtools/node_modules/playwright');
const URL = 'file:///home/ubuntu/audit/devin-audit/skills/hinshitsu/example/index.html';
const state = async (p) => p.evaluate(() => ({
  bill: document.getElementById('bill').value, tip: document.getElementById('tip').value, people: document.getElementById('people').value,
  errs: ['bill','tip','people'].map(n => document.getElementById(n+'-error').textContent),
  hidden: document.getElementById('result').hidden,
  lines: [...document.querySelectorAll('#result p')].map(e => e.textContent)}));
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  console.log('browser', b.version());
  // C1 + C4 first open
  let ctx = await b.newContext();
  let p = await ctx.newPage();
  const reqs = []; p.on('request', r => reqs.push(r.method()+' '+r.url()));
  const cons = []; p.on('console', m => cons.push(m.type()+': '+m.text())); p.on('pageerror', e => cons.push('pageerror: '+e.message));
  await p.goto(URL); await p.waitForTimeout(500);
  console.log('C1 requests:', JSON.stringify(reqs));
  console.log('C4 first open:', JSON.stringify(await state(p)));
  console.log('guide:', await p.textContent('#guide'), '| noscript visible:', await p.evaluate(()=>{const n=document.querySelector('noscript');return n.getBoundingClientRect().height}));
  // C2
  const typeCase = async (bill, tip, people) => { for (const [id,v] of [['bill',bill],['tip',tip],['people',people]]) { await p.click('#'+id); await p.keyboard.press('Control+a'); await p.keyboard.press('Delete'); if (v!=='') await p.keyboard.type(v); } return state(p); };
  for (const c of [['100.00','18','4'],['0.30','15','1'],['10.10','15','1'],['12.25','18','1'],['10.00','0','3'],['1000000.00','100','100'],['0.01','0','100'],['0.05','0','3'],['100','18','4'],['007.5','018','004'],['  12.50 ',' 18 ',' 2 ']])
    console.log('C2/C3 spot', JSON.stringify(c), '=>', JSON.stringify((await typeCase(...c))));
  // C4 error inputs, bill
  for (const v of ['abc','12,50','1,000.00','1e3','10.','.5','$5','€5','-5','0','0.00','1000000.01','1000001','99999999','1.234','1 000','١٢','12.5.0','+5','0x10',' '])
    { const s = await typeCase(v,'18','4'); console.log('C4 bill', JSON.stringify(v), '=>', JSON.stringify(s.errs), 'resultHidden', s.hidden, 'lines', s.lines.length); }
  for (const v of ['18.0','1e1','+4','4.','-1','101','abc','1,0','1000','$5',' ','0','100'])
    { const s = await typeCase('10.00',v,'4'); console.log('C4 tip', JSON.stringify(v), '=>', JSON.stringify(s.errs), 'resultHidden', s.hidden); }
  for (const v of ['18.0','1e1','+4','4.','-1','101','abc','0','1000',' ','1','100'])
    { const s = await typeCase('10.00','18',v); console.log('C4 people', JSON.stringify(v), '=>', JSON.stringify(s.errs), 'resultHidden', s.hidden); }
  // empty once left
  await p.reload(); await p.waitForTimeout(300);
  console.log('after reload (C7):', JSON.stringify(await state(p)));
  await p.click('#bill'); console.log('focus bill only:', JSON.stringify((await state(p)).errs));
  await p.keyboard.press('Tab'); console.log('tab out of bill:', JSON.stringify((await state(p)).errs));
  await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); console.log('tab through all:', JSON.stringify((await state(p)).errs));
  // Enter key / submit event
  await p.evaluate(()=>{window.__sub=0;document.getElementById('form').addEventListener('submit',()=>{window.__sub++},true)});
  for (const id of ['bill','tip','people']) { await p.click('#'+id); await p.keyboard.type('5'); await p.keyboard.press('Enter'); }
  console.log('submit events after Enter in each field:', await p.evaluate(()=>window.__sub), 'url', p.url(), JSON.stringify(await state(p)));
  // mutation churn
  await p.evaluate(()=>{window.__mut={r:0,e:0};new MutationObserver(m=>{window.__mut.r+=m.length}).observe(document.getElementById('result'),{childList:true,subtree:true,characterData:true,attributes:true});
    ['bill','tip','people'].forEach(n=>new MutationObserver(m=>{window.__mut.e+=m.length}).observe(document.getElementById(n+'-error'),{childList:true,subtree:true,characterData:true}))});
  await p.click('#tip'); await p.keyboard.press('Control+a'); await p.keyboard.type('abc'); await p.waitForTimeout(100);
  console.log('typing "abc" into tip (bill=5, people=5 valid, no visible error change after 1st char): mutation records', JSON.stringify(await p.evaluate(()=>window.__mut)), JSON.stringify((await state(p)).errs));
  // blur with nothing changed
  await p.evaluate(()=>{window.__mut={r:0,e:0}}); await p.click('#bill'); await p.click('#people'); await p.click('#bill'); await p.waitForTimeout(100);
  console.log('3 clicks between fields, no edit: mutation records', JSON.stringify(await p.evaluate(()=>window.__mut)));
  // globals
  console.log('globals:', JSON.stringify(await p.evaluate(()=>['splitBill','readAmount','readWhole','money','payLine','fields','resultBox','addLine','update','MAX_BILL_CENTS','MAX_TIP_PERCENT','MAX_PEOPLE'].map(n=>n+':'+typeof window[n]))));
  console.log('splitBill own-prop descriptor:', JSON.stringify(await p.evaluate(()=>Object.getOwnPropertyDescriptor(window,'splitBill')&&Object.keys(Object.getOwnPropertyDescriptor(window,'splitBill')))));
  console.log('id=guide referenced:', await p.evaluate(()=>document.querySelectorAll('[aria-describedby~="guide"],[aria-labelledby~="guide"],[for="guide"]').length));
  // C7 fetch + storage
  console.log('C7 fetch:', await p.evaluate(()=>fetch('https://example.com').then(r=>'NOT BLOCKED '+r.status, e=>'blocked: '+e)));
  console.log('C7 storage:', JSON.stringify(await p.evaluate(()=>{let o={};try{o.ls=localStorage.length}catch(e){o.ls=''+e}try{o.ss=sessionStorage.length}catch(e){o.ss=''+e}o.cookie=document.cookie;return o})));
  // back button
  await p.fill('#bill','77'); await p.goto('about:blank'); await p.goBack(); await p.waitForTimeout(300);
  console.log('after back:', JSON.stringify(await state(p)));
  console.log('console/pageerrors:', JSON.stringify(cons));
  await ctx.close();
  // C5
  for (const w of [360,768,1280]) {
    ctx = await b.newContext({viewport:{width:w,height:800}}); p = await ctx.newPage(); await p.goto(URL);
    const m = async (tag) => { const r = await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,bsw:document.body.scrollWidth,over:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>document.documentElement.clientWidth+0.5||r.left<-0.5)||e.scrollWidth>e.clientWidth+1&&e.tagName!=='INPUT'}).map(e=>e.tagName+'#'+e.id)}));
      console.log('C5', w, tag, JSON.stringify(r)); await p.screenshot({path:`out/w${w}-${tag}.png`,fullPage:true}); };
    await m('first');
    await p.fill('#bill','1000000.00'); await p.fill('#tip','100'); await p.fill('#people','7'); await m('result');
    await p.fill('#bill','12,50'); await p.fill('#tip','x'); await p.fill('#people','0'); await m('errors');
    await p.fill('#bill','9'.repeat(200)); await m('longinput');
    await ctx.close();
  }
  // C6
  ctx = await b.newContext({javaScriptEnabled:false, viewport:{width:768,height:800}}); p = await ctx.newPage(); await p.goto(URL);
  console.log('C6 body text:', JSON.stringify(await p.locator('body').innerText()));
  console.log('C6 inputs visible/enabled:', await p.locator('input').count(), await p.locator('#bill').isVisible(), await p.locator('#bill').isEnabled());
  await p.locator('#bill').pressSequentially('100.00'); await p.locator('#tip').pressSequentially('18'); await p.locator('#people').pressSequentially('4');
  console.log('C6 after typing 100.00/18/4: result visible', await p.locator('#result').isVisible(), 'body:', JSON.stringify(await p.locator('body').innerText()));
  await p.screenshot({path:'out/nojs.png',fullPage:true});
  await ctx.close(); await b.close();
})().catch(e=>{console.error('FAIL',e);process.exit(1)});
