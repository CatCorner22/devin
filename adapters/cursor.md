UNVERIFIED — never run on this surface

# hinshitsu adapter — Cursor

This file maps tool names. It adds no rule and removes none (rule 0.10). The rules are in `skills/hinshitsu/SKILL.md` (the conductor) and the 6 skills it names; the terms are in `skills/hinshitsu/GLOSSARY.md`.

**Surface this adapter targets:** the Cursor editor, the Cursor CLI and Cursor Cloud Agents.

**Not for:** none known.

## Capabilities, with sources

Read on 2026-11-18. A vendor changes its product; rule 0.2 requires a live probe in every run, whatever this table says.

| SWARM-CAPABLE part | What the vendor documents | Source |
|---|---|---|
| 1 scope written by the orchestrator | The main agent delegates a task to a subagent; custom subagents live in `.cursor/agents/*.md`. | https://cursor.com/docs/subagents |
| 2 no builder conversation | A subagent starts with a clean context, without the prior history. | same page |
| 3 report returns whole | The subagent returns its result to the parent. Background subagents: UNVERIFIED — the cited page does not state the version. | same page |
| 4 identifier | UNVERIFIED — test in the run under rule 0.2. | — |
| 5 live test call | UNVERIFIED — never run on this surface. | — |

## Tool mapping

| The skill says | On this surface |
|---|---|
| start a SUB-AGENT (rules 0.2, 1.5) | delegate to a subagent with the scope as the task; for a long independent run, a Cloud Agent |
| read the SUB-AGENT's report (rule 1.6) | the subagent's returned result; write it to the report file before any other action |
| the identifier of the run (rule 1.6) | the subagent or Cloud Agent ID, where shown |
| run roles in parallel (rule 13.1) | background subagents, or `/multitask` |
| RUN FOLDER | `hinshitsu/` at the root of the repository or workspace |
| gauge (rule 24.1) | `python3 skills/hinshitsu-gauge/scripts/gauge.py hinshitsu/` |

## Install

- Plugin: this repository holds a root `plugin.json` in the Agent Plugins form that Cursor reads (https://cursor.com/docs/plugins, read 2026-11-18).
- Install the whole repository. The 7 skill folders need `scripts/`, `templates/` and `skills/hinshitsu/GLOSSARY.md`; a copy of the skill folders alone is not a supported install.
- Rule file: to load the conductor in every chat, add a `.cursor/rules/hinshitsu.mdc` file with `alwaysApply: true` whose body is this 1 line: "Before any task that produces something a person will receive, read `skills/hinshitsu/SKILL.md` and follow it." The rule file points at the skill; it copies no rule.
