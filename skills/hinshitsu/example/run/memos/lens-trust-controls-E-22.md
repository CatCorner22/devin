devin-08a2cdd9ca9547d8a93de0121ecbbf9c

Stage: plan. Commit a275dcf. `LOG` = `skills/hinshitsu/example/run/AUDIT-LOG.md`; other files sit in the same folder.

## What breaks

1. **Source quotes do not trace.** For the USER and each AUDITOR. O1 quotes "3 checks you can do in 5 minutes with no terminal" and cites `build-record/BRIEF.md` (LOG:67). Reproduce: `grep -rli "3 checks you can do" .` returns only the log. The ORCHESTRATOR set V1 (LOG:64), yet SESSION-STATE.md:3 calls it "the USER's words".
2. **C1 and C7 pass on a page that sends data.** For the friends. C7's test reads the source (LOG:156); C1's test reads the network log at load (LOG:150). Reproduce: a page that builds a `fetch` call from strings on the first key press passes both. Not run.
3. **C7's reload test covers Chrome only** (LOG:150, 156). For a friend on Firefox, which keeps form values on a plain reload. Reproduce: type a bill, press F5. Not run.
4. **Tip rounding has no rule.** For the friends and the AUDITOR. C2 and D-2 (LOG:151, 134) do not say how a part-cent tip rounds; C4 (LOG:153) does not say whether a tip of 12.5 is valid. Reproduce: bill 0.05, tip 18 is 0.9 cent; 2 builds give 2 totals and both pass C3.
5. **C3's sweep tests a function, not the page** (LOG:152). For the friends. Text-to-cents parsing sits outside the sweep, where A-4 can fail (LOG:118). Reproduce: `node -e 'console.log(1.15*100)'` prints 114.99999999999999 (run).
6. **Shares can sit beside inputs they do not match.** For the friend shown the phone. C4 hides shares only for invalid input (LOG:153). Reproduce: compute, then type another valid bill; no CRITERION says what shows.
7. **The handover record is stale.** For an AGENT that resumes the run. After S4 ended (E-17), SESSION-STATE.md:4 and :6 say "CRITERIA: none written yet" and "S2"; FRAMEWORK.md:11 lists no decision, though it says each is added "when logged".
8. **The probe has no `LAUNCH` entry** (rule 1.5, `skills/hinshitsu/SKILL.md`). For a third party tracing custody. Reproduce: `grep -rn LAUNCH` on the RUN FOLDER finds only FRAMEWORK.md:16.

## What to cut

- "larger shares first" in C3 (LOG:152): shares carry no names, so order protects nobody.
- "(the USER's words)" on V1 (SESSION-STATE.md:3).

## What to add

- C2: the result restates bill, tip percent and people, so the table can check the screen against the paper bill (LOG:151).
- C2: 1 tip rounding rule; whether a decimal tip is valid.
- C3: run the sweep through the page's fields, in the file as delivered.
- C7: `autocomplete="off"` on each field; a Firefox reload test.
- New CRITERION: a changed input hides or recomputes the shares.
- The SHA-256 of `index.html` in each AUDITOR scope and in the delivery report. CONNECTIONS.md:24 names "the page changes after a report"; nothing detects it.
- G1 to G9 and G11, which the AGENT decided alone (LOG:85-95), on the S6 card.

## The 1 change this lens insists on

Enforce C1 and C7 in the page: add `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">`. Test: an AUDITOR calls `fetch` from the console and the browser blocks it.

## Checked and found sound

- The byte counts and SHA-256 values in E-2, E-5 and E-7 match the 3 `SKILL.md` files (`wc -c`, `sha256sum`).
- E-6's search (LOG:49) prints nothing and exits 1.
- `evidence/capability-probe.md` holds E-1's identifier and `NO RECORD`. I could not confirm that the child session wrote it.
- G6, G7 and D-3 (LOG:90-91, 142): no account, storage or network leaves nothing to steal or lose.
- A-4's range: a 2,000,000.00 total is 200,000,000 cents, inside exact integers.
