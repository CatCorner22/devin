import re,os,sys
root='.'; run='runs/2.1.0-mermaid-edges'
log=open(f'{run}/AUDIT-LOG.md').read()
entries=set(int(x) for x in re.findall(r'^### E-(\d+) ',log,re.M))
print('log entries:',min(entries),'to',max(entries),'count',len(entries))
miss=0
for f in ['DELIVERY-REPORT.md','COVERAGE-LEDGER.md']:
    t=open(f'{run}/{f}').read()
    paths=set(); es=set()
    for i,line in enumerate(t.split('\n'),1):
        for m in re.findall(r'`([^`]+)`',line):
            m2=re.sub(r':\d+(-\d+)?$','',m)
            if re.match(r'^[\w./-]+\.(md|txt|py|svg)$',m2) or m2.endswith('/'):
                paths.add((m2,i))
        for a,b in re.findall(r'\bE-(\d+)(?: to E-(\d+))?',line):
            rng=range(int(a),int(b)+1) if b else [int(a)]
            for e in rng: es.add((e,i))
    print(f'== {f}: {len(set(p for p,_ in paths))} distinct paths, {len(set(e for e,_ in es))} distinct entry IDs')
    for p in sorted(set(p for p,_ in paths)):
        lines=sorted(i for q,i in paths if q==p)
        cands=[f'{run}/{p}',p]
        if p.startswith(('scripts/','tests/','skills/')): cands=[p]
        ok=[c for c in cands if os.path.exists(c)]
        if not ok: miss+=1
        print(('EXISTS  ' if ok else 'MISSING ')+p+'  -> '+(ok[0] if ok else '-')+'  cited at lines '+','.join(map(str,lines)))
    for e in sorted(set(e for e,_ in es)):
        ok=e in entries
        if not ok: miss+=1
        print(('EXISTS  ' if ok else 'MISSING ')+f'E-{e}  cited at lines '+','.join(str(i) for q,i in sorted(es) if q==e))
print('missing total:',miss)
