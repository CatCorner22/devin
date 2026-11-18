# hinshitsu adapter — Devin

This file maps tool names. It adds no rule and removes none (rule 0.10). The rules are in `skills/hinshitsu/SKILL.md` (the conductor) and the 6 skills it names; the terms are in `skills/hinshitsu/GLOSSARY.md`.

**Surface this adapter targets:** Devin in the web app (child sessions) and the Devin CLI (subagents).

**Not for:** none; both Devin surfaces document sub-agents.

## Capabilities, with sources

Read on 2026-11-18. A vendor changes its product; rule 0.2 requires a live probe in every run, whatever this table says.

| SWARM-CAPABLE part | What the vendor documents | Source |
|---|---|---|
| 1 scope written by the orchestrator | Web: the coordinator session writes each child session's prompt. CLI: the `run_subagent` tool takes the task text. | https://docs.devin.ai/work-with-devin/advanced-capabilities ; https://docs.devin.ai/cli/subagents |
| 2 no builder conversation | Web: each child session runs in its own isolated machine. CLI: a subagent does not receive the parent's history. | same pages |
| 3 report returns whole | Web: observed in the run of 2026-11-18 (33 `LAUNCH` entries; each report was read from the parent). The cited pages do not state it: UNVERIFIED from the documents. CLI: `read_subagent` returns the subagent's response. | `skills/hinshitsu/example/run/AUDIT-LOG.md` ; https://docs.devin.ai/cli/subagents |
| 4 identifier | Web: observed in the run of 2026-11-18 (each child session had a session ID and a URL). The cited pages do not state it: UNVERIFIED from the documents. CLI: UNVERIFIED — test in the run under rule 0.2. | `skills/hinshitsu/EXAMPLE.md` |
| 5 live test call | Performed in the run of 2026-11-18 recorded in this repository. | `skills/hinshitsu/EXAMPLE.md` |

## Tool mapping

| The skill says | On this surface |
|---|---|
| start a SUB-AGENT (rules 0.2, 1.5) | Web: create a child session with the scope as its prompt. CLI: `run_subagent` with the scope as the task |
| read the SUB-AGENT's report (rule 1.6) | Web: read the child session's last message and download its attachment. CLI: `read_subagent` |
| the identifier of the run (rule 1.6) | Web: the child session's ID and URL. CLI: the agent ID |
| run roles in parallel (rule 13.1) | Web: create the child sessions, then wait for all. CLI: background subagents |
| RUN FOLDER | `hinshitsu/` at the root of the repository or workspace |
| gauge (rule 24.1) | `python3 skills/hinshitsu-gauge/scripts/gauge.py hinshitsu/` |

## Install

- Plugin: the Devin CLI reads `.claude-plugin/plugin.json` and the root `plugin.json` of this repository; install the repository as a plugin (https://docs.devin.ai/cli/extensibility/plugins/overview.md, read 2026-11-18). UNVERIFIED — no install was run.
- Install the whole repository. The 7 skill folders need `scripts/`, `templates/` and `skills/hinshitsu/GLOSSARY.md`; a copy of the skill folders alone is not a supported install.
- `AGENTS.md`: Devin includes up to 16 KiB of `AGENTS.md` (https://docs.devin.ai/onboard-devin/agents-md, read 2026-11-18). Add 1 line to it: "Before any task that produces something a person will receive, read `skills/hinshitsu/SKILL.md` and follow it." Do not paste the skills into `AGENTS.md`; the 7 files exceed 16 KiB.

## Smoke run

Smoke run: `skills/hinshitsu/EXAMPLE.md` records a run on Devin in the web app on 2026-11-18, with the session ID of each SUB-AGENT. The Devin CLI is UNVERIFIED — never run on that surface.
