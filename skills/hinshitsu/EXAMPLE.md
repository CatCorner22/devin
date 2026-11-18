# EXAMPLE — a real run of hinshitsu on a small page

This file walks through 1 real run of the 7 skills. Nothing here is invented for show: each number, quote and finding comes from a file under [`example/run/`](example/run/), and each SUB-AGENT's report is saved whole under [`example/run/audits/`](example/run/audits/) and [`example/run/memos/`](example/run/memos/) with the link to the session that wrote it. Terms in capitals are defined in [`GLOSSARY.md`](GLOSSARY.md).

The run ended `DELIVERED — NOT DONE`. That is the honest result, and it is the point of the example: the skills stopped the ORCHESTRATOR from calling the work done while FINDINGS were open.

## The task

The USER's brief asked for "a real small deliverable (e.g., a single-page frontend) run through the full pipeline". The ORCHESTRATOR chose a page that splits a restaurant bill among friends, with a tip: [`example/index.html`](example/index.html), 1 file, no dependency.

## The stages, as they ran

| STAGE | What happened | Where to read it |
|---|---|---|
| S1 Capability gate | A live test call started a SUB-AGENT and returned its identifier; the 5 parts of SWARM-CAPABLE held; mode `SWARM` | `AUDIT-LOG.md` E-1; `evidence/capability-probe.md` |
| S2 Record | Run folder, framework, session state, maps and gauge created | `FRAMEWORK.md`, `SESSION-STATE.md`, `MINDMAP.md`, `CONNECTIONS.md`, `GAUGE.svg` |
| S3 Baby Bird plan | Voice of the Customer and a gap list; each gap came with a recommended answer | E-8, E-9, E-25, E-53 |
| S4 Assumptions | 2 PREMISES tested before the build: a local file runs its script; whole-cent arithmetic is exact | `evidence/a3-local-script.txt`, `evidence/a4-integer-arithmetic.txt` |
| S5 Challenge | 4 LENS memos and 1 RED CELL attack, each a separate SUB-AGENT | `memos/`, `audits/redcell-plan-E-23.md`, E-34 |
| S6 Criteria | 8 CRITERIA frozen on the USER's written approval | E-64, E-98; changed on approval in E-173 to E-175 |
| S7 Build and audit | The page built; 3 audit rounds, each with a planted defect | `audits/WU-1-*`, E-171, E-249, E-267 |
| S8 Recipient side and stability | 1 AUDITOR obtained the file as a RECIPIENT does and ran the tasks | `audits/S8-recipient-side-stability-E-349.md` |
| S9 Pre-delivery attack | The RED CELL attacked the record and wrote the premortem | `audits/S9-red-cell-E-350.md` |
| S10 Audit of the audit | A final AUDITOR checked the record against the reports | `audits/final-audit-*.md` |
| S11 Delivery report | Each claim cites a file or a log entry | `DELIVERY-REPORT.md` |
| S12 Lessons | Proposed amendments to the skills, for the USER to approve | `DELIVERY-REPORT.md`, `LESSONS` |

All paths in the table are under `example/run/`.

## What the checks caught

**At the plan.** The RED CELL raised 7 BLOCKERS against the first plan. 2 of them: the ORCHESTRATOR had labelled a request that it invented as the USER's words; and the tip had no rounding rule, so 2 honest builds could differ by a cent [`example/run/audits/redcell-plan-E-23.md`]. 5 re-audit rounds followed. They closed 16 faults, all in the bookkeeping and none in the product, and they did not converge. The USER approved an amendment: a wrong line in a record file is corrected in the log and tested by a script; only a wrong line in the product or the final report stops work [`example/run/AUDIT-LOG.md` E-89, E-90].

**Round 1 of the audit.** A seeder planted 1 defect in a copy (the bill field accepted `10.`). Both roles that received the copy found it without being told that a defect existed [E-171]. 7 AUDITORS raised 60 FINDINGS. One sentence on the page was false: "Your group decides who pays the extra cent" when several cents were left over. With JavaScript off the page still told the reader to type a bill. 1 AUDITOR ran 29,339 calculations and found 0 wrong amounts [`example/run/audits/WU-1-adversarial-E-105.md`].

**Round 2.** The planted defect (a bill of exactly 1000000.00 refused) was found by both roles [E-249]. The AUDITORS also found a real bug in the BUILDER's fix: the page read `5²` as 52, because the fix used a Unicode routine that turns look-alike characters into digits [`example/run/audits/WU-1-r2-adversarial-E-184.md`]. A RED CELL probe found that the ORCHESTRATOR's card to the USER said the reworded CRITERIA "remove nothing you asked for", which was false: 2 approved phrases were gone [`example/run/audits/WU-1-r2-red-cell-probe-E-190.md`]. The ORCHESTRATOR told the USER.

**Round 3.** The planted defect (`12.5` read as 12.05) was found by both roles [E-267]. The 10 triggers of round 2 no longer reproduced. The AUDITORS raised new FINDINGS on characters at the ends of a value and on a length limit that cut a pasted value [`example/run/audits/WU-1-r3-correctness-E-253.md`, `example/run/audits/WU-1-r3-adversarial-E-254.md`].

## Why the run ended `DELIVERED — NOT DONE`

- The audit of the audit ended "not passed". The final AUDITOR ran CRITERIA C1 to C7 on the delivered file in desktop Chrome and each passed; it raised 6 FINDINGS against the record, none against the page's behaviour [`example/run/audits/final-audit-E-374.md`].
- FINDINGS are open (68 at the end of the run). `SESSION-STATE.md` field 5 lists them, and the delivery report names each one. Most concern wording of the CRITERIA that reads 2 ways; that wording belongs to the USER.
- After round 3 the BUILDER removed the length limit that both AUDITORS proposed removing. No AUDITOR saw that change [E-268].
- The USER had approved publishing the page with GitHub Pages. The ORCHESTRATOR's access cannot turn GitHub Pages on, so the page is not published and use on a phone is UNVERIFIED [E-348].
- The USER asked the ORCHESTRATOR to stop spending rounds on this page. The skills give that choice a name and a report form; they do not let the ORCHESTRATOR call the result `DONE`.

## What the example shows about the skills

1. **Independent sessions found what the BUILDER missed**, in the plan, in the page and in the ORCHESTRATOR's own record. Each report carries a session link that a reader can open and compare with the saved file.
2. **A planted defect proved each audit round was real.** A round in which a required role misses the planted defect does not count.
3. **The cost is high for a small page.** 3 audit rounds and 5 plan re-audits on 1 file drew the USER into more decisions than the page was worth. The `LESSONS` section of the delivery report proposes a limit on audit rounds by TIER.
4. **Bookkeeping errors by the ORCHESTRATOR were the largest class of fault.** A script now compares the state files with the log: `python3 scripts/hinshitsu_check.py --record skills/hinshitsu/example/run`.

## The example predates the amendments

The run was made under the rules as they stood before the amendments listed in `CHANGELOG.md`. Its log therefore opens with the `CAPABILITY` entry and holds no `Planned SUB-AGENT runs` line (rules 0.1 and 0.9 as amended). The amended checker prints 1 failure on this run: E-92 closed a BLOCKER as a record fault, which rule 14.6 allows for a DEFECT only. The checker output saved in the run, `example/run/evidence/checker-delivery-final.txt`, is from the checker as it stood when the run ended. No run has yet been made under the amended rules.

## Cold start

The transcript is `example/cold-start-transcript.md`, a copy of `build-record/audits/cold-start.md`. It was made at commit `18cbe7e`, before the amendments. A fresh session, given only this repository and the task "Add a dark-mode toggle to my recipe website", wrote the `CAPABILITY` entry and the gap list before any implementation, and stopped at 1 card for the USER. It also listed 16 places where the rules were unclear; the amendments that followed are in `CHANGELOG.md` [`build-record/audits/cold-start.md`].

## Run the checks yourself

```text
python3 scripts/hinshitsu_check.py --stage delivery skills/hinshitsu/example/run
python3 scripts/hinshitsu_check.py --record skills/hinshitsu/example/run
python3 skills/hinshitsu-gauge/scripts/gauge.py skills/hinshitsu/example/run
```

The checker tests the shape of the record. It does not prove that any check ran; the session links do that.
