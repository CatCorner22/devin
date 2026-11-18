import json,re,os,difflib
A=os.path.expanduser('~/audit-r2'); plan=json.load(open(A+'/plan.json'))
def norm(s):
    s=re.sub(r'Ran (\d+) tests? in [\d.]+s',r'Ran \1 tests in Xs',s)
    return '\n'.join(l.rstrip() for l in s.strip('\n').split('\n'))
same=diff=0
for id,wt,cmd,body,ex,src in plan:
    got=open(f'{A}/out/rerun/{id}.txt').read().rstrip('\n').split('\n')
    gex=int(got.pop().split()[-1]); got='\n'.join(got)
    if ex is not None and norm(got)==norm(body+'\nexit: %d'%ex): got=body
    okout=norm(got)==norm(body); okex=(ex is None or ex==gex)
    v='SAME' if okout and okex else 'DIFFERENT'
    if v=='SAME': same+=1
    else: diff+=1
    print(f'{v:9} {src} | run in {wt} | saved exit {ex} | exit now {gex} | {id}.txt')
    if v!='SAME':
        print('   command:',cmd[:300].replace('\n','\\n'))
        for l in list(difflib.unified_diff(norm(body).split('\n'),norm(got).split('\n'),'saved','now',lineterm='',n=0))[:14]: print('   '+l[:260])
print(f'total {len(plan)}: same {same}, different {diff}')
