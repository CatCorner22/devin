UNVERIFIED — never run on this surface

# hinshitsu adapter — Gemini CLI

This file maps tool names. It adds no rule and removes none (rule 0.10). The rules are in `skills/hinshitsu/SKILL.md` (the conductor) and the 6 skills it names; the terms are in `skills/hinshitsu/GLOSSARY.md`.

**Surface this adapter targets:** Gemini CLI.

**Not for:** the Gemini app (Chat and Task): Google documents no sub-agent whose scope the user or the main agent writes, so the gate of rule 0.3 stops the run.

## Capabilities, with sources

Read on 2026-11-18. A vendor changes its product; rule 0.2 requires a live probe in every run, whatever this table says.

| SWARM-CAPABLE part | What the vendor documents | Source |
|---|---|---|
| 1 scope written by the orchestrator | Subagents defined in `.gemini/agents/*.md` or `~/.gemini/agents`; the main agent delegates, or the user calls one with `@name`. | https://geminicli.com/docs/core/subagents/ |
| 2 no builder conversation | Each subagent runs its own context loop. | same page ; https://developers.googleblog.com/subagents-have-arrived-in-gemini-cli/ |
| 3 report returns whole | The subagent's result returns to the main agent. | same pages |
| 4 identifier | UNVERIFIED — test in the run under rule 0.2. | — |
| 5 live test call | UNVERIFIED — never run on this surface. | — |

## Tool mapping

| The skill says | On this surface |
|---|---|
| start a SUB-AGENT (rules 0.2, 1.5) | delegate to a subagent with the scope as the task |
| read the SUB-AGENT's report (rule 1.6) | the subagent's result; write it to the report file before any other action |
| the identifier of the run (rule 1.6) | the subagent run's ID, where shown |
| run roles in parallel (rule 13.1) | parallel subagents |
| RUN FOLDER | `hinshitsu/` at the root of the repository or workspace |
| gauge (rule 24.1) | `python3 skills/hinshitsu-gauge/scripts/gauge.py hinshitsu/` |

## Install

- Install the whole repository. The 7 skill folders need `scripts/`, `templates/` and `skills/hinshitsu/GLOSSARY.md`; a copy of the skill folders alone is not a supported install. UNVERIFIED — no install was run on this surface.
- `GEMINI.md`: add 1 line: "Before any task that produces something a person will receive, read `skills/hinshitsu/SKILL.md` and follow it."
