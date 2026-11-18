UNVERIFIED — never run on this surface

# hinshitsu adapter — Claude Code

This file maps tool names. It adds no rule and removes none (rule 0.10). The rules are in `skills/hinshitsu/SKILL.md` (the conductor) and the 6 skills it names; the terms are in `skills/hinshitsu/GLOSSARY.md`.

**Surface this adapter targets:** Claude Code (CLI, IDE extensions, SDK).

**Not for:** Claude chat on claude.ai with no agent tools.

## Capabilities, with sources

Read on 2026-11-18. A vendor changes its product; rule 0.2 requires a live probe in every run, whatever this table says.

| SWARM-CAPABLE part | What the vendor documents | Source |
|---|---|---|
| 1 scope written by the orchestrator | The `Agent` tool (formerly `Task`) takes a prompt written by the main agent. | https://code.claude.com/docs/en/sub-agents ; https://code.claude.com/docs/en/tools |
| 2 no builder conversation | Each subagent runs in its own context window. | https://code.claude.com/docs/en/sub-agents |
| 3 report returns whole | The subagent's final message returns to the main agent as the tool result. | same page |
| 4 identifier | UNVERIFIED — test in the run under rule 0.2; where the tool result carries an agent ID, use it. | — |
| 5 live test call | UNVERIFIED — never run on this surface. | — |

## Tool mapping

| The skill says | On this surface |
|---|---|
| start a SUB-AGENT (rules 0.2, 1.5) | the `Agent` tool with the built-in general-purpose subagent, the scope as its prompt |
| read the SUB-AGENT's report (rule 1.6) | the tool result; write it to the report file with the `Write` tool before any other action |
| the identifier of the run (rule 1.6) | the agent ID in the tool result, where present |
| run roles in parallel (rule 13.1) | several `Agent` calls in 1 message |
| RUN FOLDER | `hinshitsu/` at the root of the repository or workspace |
| gauge (rule 24.1) | `python3 skills/hinshitsu-gauge/scripts/gauge.py hinshitsu/` |

## Install

- Plugin: this repository holds `.claude-plugin/plugin.json` with the skills under `skills/` (https://code.claude.com/docs/en/plugins, read 2026-11-18). Add the repository as a plugin source and install `hinshitsu`.
- Install the whole repository. The 7 skill folders need `scripts/`, `templates/` and `skills/hinshitsu/GLOSSARY.md`; a copy of the skill folders alone is not a supported install.
- After a long session Claude Code keeps only the start of each skill; the conductor's re-read rule covers this.
