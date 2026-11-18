import re,os
R=os.path.expanduser('~/audit-r2/clone/runs/2.1.0-mermaid-edges')
t=open(R+'/AUDIT-LOG.md').read()
parts=re.split(r'^(### E-\d+ .*)$',t,flags=re.M)
ents=[]
for i in range(1,len(parts),2):
    h=parts[i]; m=re.match(r'### E-(\d+) · (\S+) · (\w[\w-]*) · (.*)',h)
    ents.append((int(m.group(1)),m.group(2),m.group(3),m.group(4),parts[i+1]))
print('entries:',len(ents),'first',ents[0][0],'last',ents[-1][0])
print('numbers ascend by 1:',all(ents[i][0]==i+1 for i in range(len(ents))))
print('times do not decrease:',all(ents[i][1]<=ents[i+1][1] for i in range(len(ents)-1)))
fwd=0
for n,ts,ty,role,body in ents:
    for a,b in re.findall(r'\bE-(\d+)(?: to E-(\d+))?',body):
        hi=int(b) if b else int(a)
        if hi>n: fwd+=1; print(f'FORWARD CITE: E-{n} cites E-{hi}')
print('forward cites:',fwd)
from collections import Counter
c=Counter(e[2] for e in ents); print('types:',dict(sorted(c.items())))
print('--- LAUNCH entries and their reports')
for n,ts,ty,role,body in ents:
    if ty=='LAUNCH':
        ident=re.search(r'SUB-AGENT identifier: (\w+)',body).group(1); rep=re.search(r'Report: `([^`]+)`',body).group(1)
        scope=re.search(r'Scope: `([^`]+)`',body).group(1)
        p=R+'/'+rep; ex=os.path.exists(p)
        l1=open(p).readline().strip() if ex else '-'
        print(f'E-{n} id {ident} | scope {scope} exists={os.path.exists(R+"/"+scope)} | report {rep} exists={ex} | line 1 holds id: {ident in l1} | line 1: {l1[:110]}')
print('--- files under audits/ and memos/')
for d in ('audits','memos'):
    if not os.path.isdir(R+'/'+d): print(d+'/: no such folder'); continue
    for f in sorted(os.listdir(R+'/'+d)):
        m=[n for n,ts,ty,role,body in ents if ty=='LAUNCH' and f'`{d}/{f}`' in body]
        print(f'{d}/{f}: LAUNCH entry {["E-%d"%x for x in m]}')
print('--- FINDING / RESOLUTION / OVERRULE')
for n,ts,ty,role,body in ents:
    if ty in('FINDING','RESOLUTION','OVERRULE'):
        fid=re.search(r'(?:ID|Finding): (F-\d+)',body).group(1); cl=re.search(r'Class: (\w+)',body); res=re.search(r'Result: (\w+)',body)
        print(f'E-{n} {ty} {fid} {cl.group(1) if cl else ""} {res.group(1) if res else ""}')
