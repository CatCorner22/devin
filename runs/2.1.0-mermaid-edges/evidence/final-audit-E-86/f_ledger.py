import re,os,collections
R=os.path.expanduser('~/audit-r2/clone/runs/2.1.0-mermaid-edges')
L=open(R+'/COVERAGE-LEDGER.md').read().split('\n')
cnt=collections.Counter(); reasons=collections.Counter(); rows=0; hdr=None; sec=None; bycol=collections.Counter(); core_rows=collections.Counter()
for i,l in enumerate(L,1):
    if l.startswith('## '): sec=l[3:]
    if not l.startswith('|') or sec=='Totals': continue
    cells=[c.strip() for c in l.strip().strip('|').split(' | ')]
    if cells[0]=='Row': hdr=cells; continue
    if set(l)<=set('|- '): continue
    rows+=1
    if len(cells)!=11: print('ROW WITH',len(cells),'CELLS line',i)
    for h,c in zip(hdr[1:],cells[1:]):
        if c=='': cnt['empty']+=1; continue
        m=re.match(r'`(PASS|FAIL|N/A|UNVERIFIED)`\s*(.*)',c)
        if not m: print('ODD CELL line',i,c); continue
        cnt[m.group(1)]+=1
        if m.group(1)=='N/A':
            reasons[m.group(2)]+=1
            if m.group(2)!='— covered at file row': bycol[(sec,h)]+=1; core_rows[sec]+=1
        if m.group(1)=='PASS': reasons['PASS cites '+m.group(2)]+=1
        if m.group(1)=='FAIL': print('FAIL cell line',i,h,':',m.group(2))
print('rows:',rows,'cells:',sum(cnt.values())); print('counts:',dict(cnt))
print('N/A reasons and PASS citations:'); [print('  ',v,'x',k) for k,v in reasons.items()]
print('N/A cells other than "covered at file row", by section and column:'); [print('  ',k,v) for k,v in sorted(bycol.items())]
print('Totals line:',[l for l in L if re.match(r'\| \d+ \|',l)])
