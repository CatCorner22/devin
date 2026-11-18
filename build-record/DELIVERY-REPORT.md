# DELIVERY REPORT — the hinshitsu skill set (the build itself)

Status: `DELIVERED — NOT DONE`. Paths are relative to the root of the repository. Entry IDs refer to `build-record/AUDIT-LOG.md`.

## Summary

Version 3.1.0. The repository holds 7 skills for surfaces with sub-agents, 2 single-assistant skills for ordinary Claude chat and ordinary ChatGPT, 1 glossary, templates, 7 adapters, 2 plugin manifests, 5 scripts with 187 unit tests, 3 zip files, 1 worked example and the records of 2 runs on real tasks.

**What was proven.** In 2 runs on real tasks, independent sessions found 16 faults that the builder had missed, 1 of them a regression [`build-record/audits/round3-real-run.md`, `round4-proof-run.md`]. The budget rule stopped both runs at the planned number of sub-agent runs and asked. The scripts pass their own 187 tests.

**What was not proven.** No run made with the skills has ended `DONE`: both real runs and the worked example ended `DELIVERED — NOT DONE`. Version 3.1.0 changes the rules that caused this (what stops a run, accepted limits, the end of the audit rounds); no independent session has reviewed it and no run has used it. No file was run on Claude, ChatGPT, Claude Code, Codex, Cursor, Gemini CLI, Muse Code CLI or Kimi Code CLI. 3 independent reviews of earlier versions did not pass the set [E-022, E-025].

**What that means.** The skills do their main job: independent checkers catch faults that the builder misses. Whether a run can now finish at a cost a small task can bear is unknown until 1 run is made under 3.1.0.

## Check it yourself in 5 minutes

1. Open https://app.devin.ai/sessions/b4cda1b3418a42b5a523cacbfebe2070 and compare its last message with `build-record/audits/round2-red-cell.md`. You see the same text and the words "SKILL SET FAILS".
2. Open `skills/hinshitsu/example/run/GAUGE.svg` on GitHub. You see a speedometer at 12 of 12 stages with a red bar that reads "STOPPED - blocker open".
3. Open `skills/hinshitsu/example/run/DELIVERY-REPORT.md`. Its first paragraph says `DELIVERED — NOT DONE` and names 15 BLOCKERS.

## CRITERIA

The USER approved C1 to C15 on 2026-11-18 [E-019]. The column "Round 2" is the independent AUDITOR's result on commit `874ffb2` [`build-record/audits/round2-auditor.md`]. Changes made after that commit are ASSERTED.

| CRITERION | Round 2 | Since round 2 |
|---|---|---|
| C1 files exist | PASS | — |
| C2 names, sections 0 to 24 | PASS | rules amended; not re-audited |
| C3 glossary | PASS on the test as written; DEFECTS on use | open |
| C4 banned words | PASS | `python3 scripts/lint.py` prints 0 failures |
| C5 every rule testable | FAIL: 12 rules | the 12 rules were rewritten to name a file, an entry or a command; not re-audited; the real run lists 29 places where rules conflict or cannot be followed |
| C6 adapter claims cited | PASS with 2 DEFECTS | both answered; not re-audited |
| C7 real example | PASS on the checker test | the amended checker prints 1 failure on the example (E-92 of its log); `skills/hinshitsu/EXAMPLE.md` says so |
| C8 the build's own record | FAIL | open: `build-record/` has no mind map, ledger or session state |
| C9 Precog skills untouched | PASS | `git status` on the 2 folders prints nothing |
| C10 work on `main` | PASS | — |
| C11 Baby Bird | PASS | — |
| C12 cold start | FAIL on the test as written | the transcript is now also under `skills/hinshitsu/example/`; it was made before the amendments |
| C13 size limits | PASS | largest `SKILL.md` 15,005 bytes of 18,432 |
| C14 gauge | PASS | — |
| C15 plugin installs | UNVERIFIED | no install was run on any surface |

## What is open

Listed whole in E-023. The 4 that matter most:

1. **A forged record still passes the script.** A record typed by hand with made-up identifiers passes. No script in this repository can open a session. `DONE` therefore now needs your own statement that you opened the final auditor's session by its link (glossary, DONE part 7).
2. **No run has been made under version 2.1.0.** The example predates the amendments.
3. **Cost.** The example used 33 sub-agent runs on a 1-file page and did not reach `DONE`. Rule 0.9 now puts a budget in front of you before the audits start. It is untested.
4. **C8.** The record of this build is a log and the saved reports, not the full set the skill requires of a run.

## UNVERIFIED

- Every surface except Devin web: Claude Code, Cursor, Codex and ChatGPT Work, Gemini CLI, Kimi Code CLI, Muse Code, the Devin CLI.
- Every change in `CHANGELOG.md` under 2.1.0 and 2.2.0.
- The 4 lenses and 6 of the 7 auditor roles on the finished set: not run.
- The example page on a phone, with a screen reader, and in a browser other than Chrome.

## What you did not ask for and got anyway

- 3 scripts that test a run's record and the form of the skills, with 134 unit tests.
- A budget rule for sub-agent runs (rule 0.9).
- `build-record/`, the record of this build, with every independent report saved whole.
- `CHANGELOG.md`, `TESTING.md`, `LICENSE` (MIT, on your answer).

## What you decided

The USER, 2026-11-18 14:00 EST: "I agree with all of your recommendations.  Please proceed." That answer moved `main` to this work, ordered round 2, set the license to MIT, and approved C1 to C15, the 7 platforms and the tiers [E-019].

## What you need to decide next

1. **1 run under version 3.1.0** (about 5 paid sessions). Recommended: yes, when you are ready to spend; it is the only way to learn whether a run can now end `DONE`. No session starts without your word [E-031].
2. **Try the 2 chat skills yourself.** Upload `dist/hinshitsu-claude.zip` to Claude and `dist/hinshitsu-chatgpt.zip` to ChatGPT (`INSTALL.md`), and write "baby bird me" with a small request. This session has no account on either.
3. **C8.** Recommended: change it to "the example run holds the full record; the build holds a log and the saved reports".
4. **GitHub Pages.** My access cannot turn it on (HTTP 403). In the repository: Settings, Pages, Source "Deploy from a branch", branch `main`, folder `/ (root)`.
5. **The 6 proposed lessons** in `skills/hinshitsu/example/run/DELIVERY-REPORT.md`, section `LESSONS`.
