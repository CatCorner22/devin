# hinshitsu (品質, "quality")

A set of 7 skills that make an AI coding assistant prove its work before it calls the work finished. The agent that builds a thing does not grade it: separate sub-agents, which never saw the builder's conversation, attack the plan and audit the result, and every claim in the final report cites a file a third party can open.

**Status of this repository: not yet verified.** The build record in `build-record/` and the worked example in `skills/hinshitsu/example/` state what has been checked, by whom, and what has not.

## Why it exists

An assistant that writes "done" has produced a sentence, not evidence. hinshitsu replaces the sentence with a record: criteria the user approved in the user's own quoted words, reports from independent sub-agents saved word for word with identifiers the platform issued, and a ledger that shows which check covered which part. A check that did not run is reported `UNVERIFIED`. It is never reported as passed.

## The 7 skills

Each skill stands in its own folder and works alone. The conductor calls the others in order.

| Skill | What it does |
|---|---|
| [`hinshitsu`](skills/hinshitsu/SKILL.md) | Conductor. Tests that the runtime has real sub-agents, sets the size of the run, runs the 12 stages in order, and defines when work is done. |
| [`hinshitsu-baby-bird-plan`](skills/hinshitsu-baby-bird-plan/SKILL.md) | Finds what the request left out and brings an answer for each gap, not a question. Writes the criteria and gets the user's approval on a short decision card. |
| [`hinshitsu-challenge`](skills/hinshitsu-challenge/SKILL.md) | 4 design lenses and a standing red cell attack the plan before the build and again before delivery. |
| [`hinshitsu-record`](skills/hinshitsu-record/SKILL.md) | The append-only audit log, the framework, the session state, the 2 maps, the coverage ledger and the rollback rule. |
| [`hinshitsu-audit`](skills/hinshitsu-audit/SKILL.md) | 8 auditor roles after each unit of work, a planted defect that the auditors must catch, checks on the thing as the recipient receives it, and the rule that a blocker stops the line. |
| [`hinshitsu-delivery`](skills/hinshitsu-delivery/SKILL.md) | The rule that every claim cites evidence, a final audit of the audit, the delivery report, and lessons. |
| [`hinshitsu-gauge`](skills/hinshitsu-gauge/SKILL.md) | A speedometer drawn from the audit log: which of the 12 stages is running, how many are complete, and a red stop while a blocker is open. |

All 7 share 1 glossary: [`skills/hinshitsu/GLOSSARY.md`](skills/hinshitsu/GLOSSARY.md).

## The 12 stages

| Stage | What happens | Skill |
|---|---|---|
| S1 | Capability test and size of the run | `hinshitsu` |
| S2 | Record set up | `hinshitsu-record` |
| S3 | Voice of the customer and gap list | `hinshitsu-baby-bird-plan` |
| S4 | Assumptions and proposed criteria | `hinshitsu-baby-bird-plan` |
| S5 | 4 lenses and the red cell attack the plan | `hinshitsu-challenge` |
| S6 | Reconcile, ask the user, freeze the criteria | `hinshitsu-baby-bird-plan` |
| S7 | Build and audit each unit of work | `hinshitsu-audit` |
| S8 | Checks on the thing as the recipient receives it | `hinshitsu-audit` |
| S9 | Red cell before delivery, and the premortem | `hinshitsu-challenge` |
| S10 | Audit of the audit | `hinshitsu-delivery` |
| S11 | Delivery report | `hinshitsu-delivery` |
| S12 | Lessons | `hinshitsu-delivery` |

## Where it runs

hinshitsu runs only where the main agent can start a sub-agent, write that sub-agent's whole scope, and get its report back whole with an identifier. The conductor tests this with a live call at the start of every run; a runtime that fails the test stops and asks the user.

| Surface | Adapter | Tested in this repository |
|---|---|---|
| Devin | [`adapters/devin.md`](adapters/devin.md) | yes: the worked example ran here |
| Claude Code | [`adapters/claude-code.md`](adapters/claude-code.md) | no |
| Cursor | [`adapters/cursor.md`](adapters/cursor.md) | no |
| Codex and ChatGPT Work | [`adapters/chatgpt.md`](adapters/chatgpt.md) | no |
| Gemini CLI | [`adapters/gemini.md`](adapters/gemini.md) | no |
| Kimi Code CLI | [`adapters/kimi.md`](adapters/kimi.md) | no |
| Muse Code CLI | [`adapters/muse.md`](adapters/muse.md) | no |

An adapter that was never run on its surface says so in its first line. Each adapter gives the install steps for its surface and a dated link to the vendor's page for each capability it states.

**Not supported:** ordinary ChatGPT chat, the Gemini app, kimi.com chat and the Meta AI app, which do not let the main agent scope a sub-agent. Perplexity has no adapter: its Computer product starts sub-agents itself, and its documentation shows no way for the main agent to write each one's scope.

## Install

The repository is a plugin. `plugin.json` at the root is the manifest in the Agent Plugins format; `.claude-plugin/plugin.json` is the manifest Claude Code reads. The skills are the folders under `skills/`. Each adapter states how its surface installs a plugin or a skill folder.

## How to tell a real run from a claimed one

1. Open the run's `DELIVERY-REPORT.md`. It opens with 3 checks that take 5 minutes and need no terminal.
2. Open any report under the run's `audits/` folder. Its first line is an identifier the platform issued. On Devin it is a session link that opens.
3. Run `python3 scripts/hinshitsu_check.py --stage delivery <run-folder>`. It tests the form of the record: numbering, custody, closed findings, cited evidence. It does not prove that any check ran, and it says so.

## Worked example

[`skills/hinshitsu/EXAMPLE.md`](skills/hinshitsu/EXAMPLE.md) walks through a real run: a 1-file bill-splitting page taken through the stages, with the sub-agents' reports as they came back, including what they caught the orchestrator doing wrong.

## Repository layout

| Path | Holds |
|---|---|
| `skills/` | the 7 skills, the glossary, the gauge script, the worked example |
| `templates/` | blank forms for each artifact, and 1 scope per sub-agent role under `templates/roles/` |
| `adapters/` | 1 runtime mapping per supported surface |
| `scripts/lint.py` | checks the form of the skills, adapters and manifests |
| `scripts/hinshitsu_check.py` | checks the form of a run folder |
| `tests/` | unit tests for the 2 scripts and the gauge |
| `build-record/` | the record of how this repository was built, with the reviews it received |

See [`TESTING.md`](TESTING.md) for the commands.
