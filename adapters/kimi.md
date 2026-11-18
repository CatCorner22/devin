UNVERIFIED — never run on this surface

# hinshitsu adapter — Kimi Code CLI

This file maps tool names. It adds no rule and removes none (rule 0.10). The rules are in `skills/hinshitsu/SKILL.md` (the conductor) and the 6 skills it names; the terms are in `skills/hinshitsu/GLOSSARY.md`.

**Surface this adapter targets:** Kimi Code CLI.

**Not for:** kimi.com chat (no sub-agents) and kimi.com Agent Swarm, which organizes its own sub-agents "without predefined roles or manually designed workflows" and so fails part 1.

## Capabilities, with sources

Read on 2026-11-18. A vendor changes its product; rule 0.2 requires a live probe in every run, whatever this table says.

| SWARM-CAPABLE part | What the vendor documents | Source |
|---|---|---|
| 1 scope written by the orchestrator | The `Agent` tool takes `prompt`, `description`, `subagent_type` (coder, explore, plan) and `run_in_background`. | https://www.kimi.com/code/docs/en/kimi-code-cli/reference/tools.html |
| 2 no builder conversation | A subagent runs in an isolated context. | https://www.kimi.com/code/docs/en/kimi-code-cli/customization/agents.html |
| 3 report returns whole | The subagent's result returns to the main agent. | same pages |
| 4 identifier | UNVERIFIED — test in the run under rule 0.2. | — |
| 5 live test call | UNVERIFIED — never run on this surface. | — |

## Tool mapping

| The skill says | On this surface |
|---|---|
| start a SUB-AGENT (rules 0.2, 1.5) | the `Agent` tool with the scope as `prompt` |
| read the SUB-AGENT's report (rule 1.6) | the tool result; write it to the report file before any other action |
| the identifier of the run (rule 1.6) | the agent ID in the tool result, where present |
| run roles in parallel (rule 13.1) | `run_in_background`, or `AgentSwarm` in swarm mode only when each scope is still written by the ORCHESTRATOR |
| RUN FOLDER | `hinshitsu/` at the root of the repository or workspace |
| gauge (rule 24.1) | `python3 skills/hinshitsu-gauge/scripts/gauge.py hinshitsu/` |

## Install

- Install the whole repository. The 7 skill folders need `scripts/`, `templates/` and `skills/hinshitsu/GLOSSARY.md`; a copy of the skill folders alone is not a supported install. UNVERIFIED — no install was run on this surface.
- `AGENTS.md`: add 1 line: "Before any task that produces something a person will receive, read `skills/hinshitsu/SKILL.md` and follow it."
