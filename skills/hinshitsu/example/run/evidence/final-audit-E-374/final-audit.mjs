import { chromium } from 'playwright';
import fs from 'fs';
const CH = fs.readdirSync('/opt/.devin/chrome/chrome').map(d=>`/opt/.devin/chrome/chrome/${d}/chrome-linux64/chrome`).sort().pop();
const FILE = 'file:///home/ubuntu/repos/devin/skills/hinshitsu/example/index.html';
const OUT = '/home/ubuntu/audit-out/';
const log = (...a)=>console.log(...a);
const browser = await chromium.launch({ executablePath: CH, headless: true });
log('browser', browser.version());
const ctx = await browser.newContext({ viewport: {width:1280,height:800} });
const page = await ctx.newPage();
const reqs=[]; const errs=[];
page.on('request', r=>reqs.push(r.url())); page.on('pageerror',e=>errs.push(String(e))); page.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await page.goto(FILE);
const read = ()=>page.evaluate(()=>({res:[...document.querySelectorAll('#result p')].map(p=>p.textContent), resText:document.getElementById('result').innerText, err:['bill','tip','people'].map(n=>document.getElementById(n+'-error').textContent), val:['bill','tip','people'].map(n=>document.getElementById(n).value)}));
async function typeAll(b,t,p){ for (const [id,v] of [['bill',b],['tip',t],['people',p]]) { await page.click('#'+id); await page.keyboard.press('Control+a'); await page.keyboard.press('Delete'); if(v!=='') await page.keyboard.type(v);} await page.keyboard.press('Tab'); return read(); }
// ---- C1
log('C1 requests:', JSON.stringify(reqs), 'count', reqs.length);
// ---- C4 first open
const fo = await page.evaluate(()=>({vals:['bill','tip','people'].map(n=>document.getElementById(n).value), guideVisible:!document.getElementById('guide').hidden, guide:document.getElementById('guide').textContent, bodyText:document.body.innerText}));
log('C4 first open', JSON.stringify(fo), JSON.stringify(await read()));
// incomplete: type only bill, do not touch others (no tab)
await page.click('#bill'); await page.keyboard.type('12.50');
log('C4 incomplete (bill typed, others untouched)', JSON.stringify(await read()));
await page.reload();
// ---- C2
let c2ok=true;
const c2=[['100.00','18','4',['Bill total: 100.00','Tip percent: 18','Number of people: 4','Tip amount: 18.00','Total with tip: 118.00','4 people pay 29.50 each']],
 ['0.30','15','1',['Bill total: 0.30','Tip percent: 15','Number of people: 1','Tip amount: 0.05','Total with tip: 0.35','1 person pays 0.35']],
 ['10.10','15','1',['Bill total: 10.10','Tip percent: 15','Number of people: 1','Tip amount: 1.52','Total with tip: 11.62','1 person pays 11.62']],
 ['12.25','18','1',['Bill total: 12.25','Tip percent: 18','Number of people: 1','Tip amount: 2.21','Total with tip: 14.46','1 person pays 14.46']],
 ['0100.5','007','02',['Bill total: 100.50','Tip percent: 7','Number of people: 2','Tip amount: 7.04','Total with tip: 107.54','2 people pay 53.77 each']],
 ['10.00','0','3',['Bill total: 10.00','Tip percent: 0','Number of people: 3','Tip amount: 0.00','Total with tip: 10.00','1 person pays 3.34','2 people pay 3.33 each','Your group decides who pays the higher amount.']]];
for (const [b,t,p,exp] of c2){ const r=await typeAll(b,t,p); const ok=JSON.stringify(r.res)===JSON.stringify(exp)&&r.err.every(e=>e===''); if(!ok)c2ok=false; log('C2',ok?'ok':'MISMATCH',JSON.stringify([b,t,p]),JSON.stringify(r.res),JSON.stringify(r.err)); }
await page.screenshot({path:OUT+'c2-10-0-3-w1280.png'});
log('C2 all ok:',c2ok);
// ---- C3 oracle (auditor's own code, BigInt, different formula)
function oracle(cents,tip,n){ const c=BigInt(cents),t=BigInt(tip),N=BigInt(n); const tipC=(c*t*2n+100n)/200n; const tot=c+tipC; const base=tot/N, rem=tot%N; const pays=[]; for(let i=0n;i<N;i++) pays.push(i<rem?base+1n:base); return {tipC,tot,pays}; }
const m=(x)=>{const s=x.toString().padStart(3,'0'); return s.slice(0,-2)+'.'+s.slice(-2);};
function parsePays(lines){ const pays=[]; for(const l of lines){ let k=/^1 person pays (\d+\.\d\d)$/.exec(l); if(k){pays.push(k[1]);continue;} k=/^(\d+) people pay (\d+\.\d\d) each$/.exec(l); if(k){for(let i=0;i<+k[1];i++)pays.push(k[2]);continue;} return null;} return pays; }
function cmp(r,cents,tip,n){ const o=oracle(cents,tip,n); const L=r.res; const problems=[];
  if(L[0]!=='Bill total: '+m(BigInt(cents)))problems.push('bill'); if(L[1]!=='Tip percent: '+tip)problems.push('tip%'); if(L[2]!=='Number of people: '+n)problems.push('people');
  if(L[3]!=='Tip amount: '+m(o.tipC))problems.push('tipAmt'); if(L[4]!=='Total with tip: '+m(o.tot))problems.push('total');
  let payLines=L.slice(5); const two=payLines[payLines.length-1]==='Your group decides who pays the higher amount.'; if(two)payLines=payLines.slice(0,-1);
  const pays=parsePays(payLines); if(!pays){problems.push('unparsed');return problems;}
  if((payLines.length===2)!==two)problems.push('sentence'); if(payLines.length>2)problems.push('lines');
  const exp=o.pays.map(m); if(JSON.stringify(pays)!==JSON.stringify(exp))problems.push('payments');
  const cs=pays.map(x=>BigInt(x.replace('.',''))); const sum=cs.reduce((a,b)=>a+b,0n); if(sum!==o.tot)problems.push('sum');
  const mx=cs.reduce((a,b)=>a>b?a:b), mn=cs.reduce((a,b)=>a<b?a:b); if(mx-mn>1n)problems.push('spread'); if(cs.some((v,i)=>i>0&&v>cs[i-1]))problems.push('order');
  if(r.err.some(e=>e!==''))problems.push('errtext'); return problems; }
let cases=0, wrong=0; const wrongList=[];
const t0=Date.now();
for (const tip of [0,15,18,20]) { await page.fill('#tip',String(tip)); await page.fill('#people','1');
  for (let c=1;c<=5000;c++){ const b=m(BigInt(c)); await page.fill('#bill',b); const r=await read(); const pr=cmp(r,c,tip,1); cases++; if(pr.length){wrong++; if(wrongList.length<20)wrongList.push([b,tip,1,pr,r.res]);} } }
log('C3 set 1 (0.01..50.00 x tips 0,15,18,20 x 1 person): cases',cases,'wrong',wrong);
let c1=cases,w1=wrong;
await page.fill('#tip','18');
for (let n=1;n<=12;n++){ await page.fill('#people',String(n)); for(let c=1;c<=500;c++){ const b=m(BigInt(c)); await page.fill('#bill',b); const r=await read(); const pr=cmp(r,c,18,n); cases++; if(pr.length){wrong++; if(wrongList.length<20)wrongList.push([b,18,n,pr,r.res]);} } }
log('C3 set 2 (0.01..5.00 x 1..12 people x tip 18): cases',cases-c1,'wrong',wrong-w1);
for (const [b,t,p] of [['10.00','0','3'],['1000000.00','100','100'],['0.01','0','100']]){ const r=await typeAll(b,t,p); const pr=cmp(r,Number(b.replace('.','')),+t,+p); cases++; if(pr.length){wrong++;wrongList.push([b,t,p,pr,r.res]);} log('C3 spot',JSON.stringify([b,t,p]),pr.length?'WRONG '+pr:'ok',JSON.stringify(r.res)); }
log('C3 total cases',cases,'wrong',wrong,'seconds',((Date.now()-t0)/1000).toFixed(1), JSON.stringify(wrongList));
// ---- C4 inputs
await page.reload();
const bad = { bill:['abc','12a','1,000.00','1.000,00','1e3','.5','$12','12€','-5','0','0.00','1000000.01','1000001','12.345','1,234','  ','١٢.٥٠x','+5','1 000'], tip:['18.0','18,5','1e1','+4','4.','101','-1','abc','1.5',''], people:['18.0','18,5','1e1','+4','4.','101','0','-1','abc',''] };
let c4fail=[];
for (const id of ['bill','tip','people']) for (const v of bad[id]) {
  const others={bill:'10.00',tip:'18',people:'2'}; others[id]=v; const r=await typeAll(others.bill,others.tip,others.people);
  const i=['bill','tip','people'].indexOf(id); const ok=r.err[i]!==''&&r.res.length===0&&r.err.every((e,j)=>j===i||e==='');
  if(!ok)c4fail.push([id,v,r]); log('C4 bad',id,JSON.stringify(v),ok?'message+no result':'UNEXPECTED',JSON.stringify(r.err[i]),'res',r.res.length); }
// good equivalents
const good=[['12.50','18','4'],['12,50','18','4'],['  12.50 ','18 ',' 4'],['１２．５０','１８','４'],['١٢٫٥٠','١٨','٤'],['\u200b12.50\u200b','18','4'],['12.5','18','4'],['12','18','4']];
let ref=null; for(const g of good){ const r=await typeAll(...g); if(!ref)ref=JSON.stringify(r.res); const ok= r.err.every(e=>e==='') && (g[0]==='12'? r.res[0]==='Bill total: 12.00' : JSON.stringify(r.res)===ref); if(!ok)c4fail.push(['good',g,r]); log('C4 good',JSON.stringify(g),ok?'result same as 12.50/18/4':'UNEXPECTED',JSON.stringify(r.res.slice(0,3)),JSON.stringify(r.err)); }
// "12." while focused, then leave
await page.reload(); await page.fill('#tip','18'); await page.fill('#people','4'); await page.click('#bill'); await page.keyboard.type('12.');
let r=await read(); const w1ok=r.err[0]===''&&r.res.length===0; log('C4 "12." focused:',JSON.stringify(r.err),'res',r.res.length, w1ok?'ok':'UNEXPECTED');
await page.keyboard.press('Tab'); r=await read(); const w2ok=r.err[0]!==''&&r.res.length===0; log('C4 "12." after leaving:',JSON.stringify(r.err[0]),'res',r.res.length,w2ok?'ok':'UNEXPECTED');
await page.click('#bill'); r=await read(); log('C4 "12." cursor returned:',JSON.stringify(r.err[0]),'res',r.res.length);
await page.keyboard.type('5'); r=await read(); log('C4 recompute after typing 5:',JSON.stringify(r.res)); const recompOk=r.res[0]==='Bill total: 12.50';
await page.keyboard.press('Backspace');await page.keyboard.press('Backspace');await page.keyboard.press('Backspace');await page.keyboard.press('Backspace'); r=await read(); log('C4 emptied after typing (still focused):',JSON.stringify(r.err[0]),'res',r.res.length); const emptOk=r.err[0]!==''&&r.res.length===0;
// empty field left (tab through untouched)
await page.reload(); await page.click('#bill'); await page.keyboard.press('Tab'); r=await read(); log('C4 empty bill left by Tab:',JSON.stringify(r.err)); const leftOk=r.err[0]!==''&&r.err[2]==='';
log('C4 failures:',JSON.stringify(c4fail), 'waiting ok',w1ok,w2ok,'recompute',recompOk,'emptied',emptOk,'left',leftOk);
// ---- C5
for (const w of [360,768,1280]) { await page.setViewportSize({width:w,height:800}); await page.reload();
  const meas=async(tag)=>{ const x=await page.evaluate(()=>{const W=document.documentElement.clientWidth; let over=[]; for(const e of document.querySelectorAll('body *')){const b=e.getBoundingClientRect(); if(b.width>W+0.5||b.right>W+0.5||b.left<-0.5)over.push(e.tagName+'#'+e.id+' '+b.left.toFixed(1)+'..'+b.right.toFixed(1));} return {W,inner:window.innerWidth,scrollW:document.documentElement.scrollWidth,bodyScrollW:document.body.scrollWidth,over};}); await page.evaluate(()=>window.scrollTo(500,0)); const sx=await page.evaluate(()=>window.scrollX); log('C5 width',w,tag,JSON.stringify(x),'scrollX after scrollTo(500):',sx); await page.screenshot({path:`${OUT}c5-w${w}-${tag}.png`,fullPage:true}); };
  await meas('first-open'); await typeAll('abc','x','y'); await meas('error'); await typeAll('1000000.00','100','7'); await meas('result'); }
await page.setViewportSize({width:1280,height:800}); await page.reload();
log('C5 markup', JSON.stringify(await page.evaluate(()=>({labels:[...document.querySelectorAll('label')].map(l=>({for:l.htmlFor,text:l.textContent,visible:l.getBoundingClientRect().height>0&&getComputedStyle(l).visibility==='visible'})), errRoles:[...document.querySelectorAll('.error')].map(e=>e.getAttribute('role')), resultRole:document.getElementById('result').getAttribute('role'), inputmode:['bill','tip','people'].map(n=>document.getElementById(n).getAttribute('inputmode')), autocomplete:['bill','tip','people'].map(n=>document.getElementById(n).getAttribute('autocomplete'))}))));
// mutation count: bill error shown, result absent; then valid bill+tip result and type in people? Two scenarios.
async function mutCount(setup, targets, act){ await page.reload(); await setup(); await page.evaluate((targets)=>{window.__m=0; const o=new MutationObserver(l=>{window.__m+=l.length}); for(const s of targets)o.observe(document.querySelector(s),{childList:true,subtree:true,characterData:true,attributes:true}); window.__o=o;},targets); await act(); return page.evaluate(()=>{window.__m+=window.__o.takeRecords().length; return window.__m;}); }
const mA=await mutCount(async()=>{await page.click('#bill');await page.keyboard.type('abc');await page.keyboard.press('Tab');}, ['#bill-error','#result'], async()=>{await page.click('#tip');await page.keyboard.type('18');await page.click('#people');await page.keyboard.type('4');});
log('C5 changes in #bill-error and #result while typing in tip and people (bill error showing):',mA);
const mB=await mutCount(async()=>{await typeAll('abc','x','y');}, ['#bill-error','#tip-error','#people-error','#result'], async()=>{await page.click('#bill');await page.keyboard.press('End');await page.keyboard.type('def');});
log('C5 changes in 3 error paragraphs and #result while typing more letters in bill (same messages):',mB);
const mC=await mutCount(async()=>{await typeAll('100.00','18','4');}, ['#bill-error','#tip-error','#people-error','#result'], async()=>{await page.click('#people');await page.keyboard.press('End');await page.keyboard.press('Backspace');await page.keyboard.type('4');await page.click('#bill');await page.keyboard.press('End');await page.keyboard.type(' ');});
log('C5 changes after delete+retype of 4 in people (1 clear + 1 rewrite expected, text did change) then a trailing space in bill:',mC);
const mD=await mutCount(async()=>{await typeAll('100.00','18','4');}, ['#bill-error','#tip-error','#people-error','#result'], async()=>{await page.click('#bill');await page.keyboard.press('End');await page.keyboard.type(' ');await page.click('#tip');await page.keyboard.press('Home');await page.keyboard.type('0');await page.keyboard.press('Tab');});
log('C5 changes with a result showing while typing a trailing space in bill and a leading 0 in tip (text unchanged):',mD);
// ---- C7
const fr=await page.evaluate(async()=>{try{const r=await fetch('https://example.com');return 'NOT BLOCKED status '+r.status;}catch(e){return 'blocked: '+e;}});
log('C7 fetch:',fr,'console errors:',JSON.stringify(errs.slice(-2)));
const src=fs.readFileSync('/home/ubuntu/repos/devin/skills/hinshitsu/example/index.html','utf8');
for(const w of ['localStorage','sessionStorage','indexedDB','document.cookie','caches']) log('C7 source holds',w,':',src.includes(w));
log('C7 CSP tag exact:', src.includes(`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`));
await typeAll('100.00','18','4'); const before=await read(); await page.reload(); const after=await read(); log('C7 reload: before',JSON.stringify(before.val),'after',JSON.stringify(after.val),'result lines after',after.res.length);
log('C1 total requests over whole run to non-file URLs:', JSON.stringify([...new Set(reqs)]));
// ---- C6
const ctx2=await browser.newContext({javaScriptEnabled:false,viewport:{width:1280,height:800}}); const p2=await ctx2.newPage(); await p2.goto(FILE);
const t=await p2.locator('body').innerText(); const vis={guide:await p2.locator('#guide').isVisible(), fields:await p2.locator('#fields').isVisible(), inputs:await p2.locator('input:visible').count()};
log('C6 JS off body text:',JSON.stringify(t),JSON.stringify(vis)); await p2.screenshot({path:OUT+'c6-js-off.png'});
log('page errors:',JSON.stringify(errs));
await browser.close();
