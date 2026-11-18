UNVERIFIED — never run on this surface

# hinshitsu adapter — Muse Code CLI

This file maps tool names. It adds no rule and removes none (rule 0.10). The rules are in `skills/hinshitsu/SKILL.md` (the conductor) and the 6 skills it names; the terms are in `skills/hinshitsu/GLOSSARY.md`.

**Surface this adapter targets:** Muse Code CLI (`muse`).

**Not for:** the Meta AI app and meta.ai: the model launches sub-agents itself and no scope is written by the user or the main agent, so part 1 fails.

## Capabilities, with sources

Read on 2026-11-18. A vendor changes its product; rule 0.2 requires a live probe in every run, whatever this table says.

| SWARM-CAPABLE part | What the vendor documents | Source |
|---|---|---|
| 1 scope written by the orchestrator | Subagents and workflows; definitions in `agents.json` with `description`, `prompt`, `model`, `effort`. | https://dev.meta.ai/docs/muse-code/agents ; https://dev.meta.ai/docs/muse-code/workflows |
| 2 no builder conversation | UNVERIFIED — test in the run under rule 0.2. | — |
| 3 report returns whole | Fan-out returns each subagent's result; worktree fan-out is documented. | https://dev.meta.ai/docs/cookbook/subagent-fanout |
| 4 identifier | UNVERIFIED — test in the run under rule 0.2. | — |
| 5 live test call | UNVERIFIED — never run on this surface. | — |

## Tool mapping

| The skill says | On this surface |
|---|---|
| start a SUB-AGENT (rules 0.2, 1.5) | a subagent with the scope as its prompt |
| read the SUB-AGENT's report (rule 1.6) | the subagent's result; write it to the report file before any other action |
| the identifier of the run (rule 1.6) | the subagent run's ID, where shown |
| run roles in parallel (rule 13.1) | a workflow fan-out |
| RUN FOLDER | `hinshitsu/` at the root of the repository or workspace |
| gauge (rule 24.1) | `python3 skills/hinshitsu-gauge/scripts/gauge.py hinshitsu/` |

## Install

- Install the whole repository. The 7 skill folders need `scripts/`, `templates/` and `skills/hinshitsu/GLOSSARY.md`; a copy of the skill folders alone is not a supported install. UNVERIFIED — no install was run on this surface.
- `AGENTS.md`: add 1 line: "Before any task that produces something a person will receive, read `skills/hinshitsu/SKILL.md` and follow it."
