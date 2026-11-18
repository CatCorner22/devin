UNVERIFIED — never run on this surface

# hinshitsu adapter — Codex and ChatGPT Work

This file maps tool names. It adds no rule and removes none (rule 0.10). The rules are in `skills/hinshitsu/SKILL.md` (the conductor) and the 6 skills it names; the terms are in `skills/hinshitsu/GLOSSARY.md`.

**Surface this adapter targets:** Codex (app, CLI, IDE extension) and ChatGPT Work.

**Not for:** ordinary ChatGPT chat with no Work or Codex agent: OpenAI documents no sub-agents there, so the gate of rule 0.3 stops the run. Ordinary ChatGPT has its own single-assistant skill, `chat/chatgpt/hinshitsu-chatgpt/`.

## Capabilities, with sources

Read on 2026-11-18. A vendor changes its product; rule 0.2 requires a live probe in every run, whatever this table says.

| SWARM-CAPABLE part | What the vendor documents | Source |
|---|---|---|
| 1 scope written by the orchestrator | Subagent workflows: the agent spawns subagents for tasks it describes; at most intelligence levels the USER or an instruction file needs to ask for them explicitly. | https://learn.chatgpt.com/docs/agent-configuration/subagents |
| 2 no builder conversation | UNVERIFIED — test in the run under rule 0.2. | — |
| 3 report returns whole | Subagent results return to the main agent. | same page |
| 4 identifier | UNVERIFIED — test in the run under rule 0.2; `/subagents` lists runs in Codex. | same page |
| 5 live test call | UNVERIFIED — never run on this surface. | — |

## Tool mapping

| The skill says | On this surface |
|---|---|
| start a SUB-AGENT (rules 0.2, 1.5) | ask for a subagent explicitly, with the scope as its task |
| read the SUB-AGENT's report (rule 1.6) | the subagent's result; write it to the report file before any other action |
| the identifier of the run (rule 1.6) | the subagent's ID or thread, where shown |
| run roles in parallel (rule 13.1) | several subagents in 1 request |
| RUN FOLDER | `hinshitsu/` at the root of the repository or workspace |
| gauge (rule 24.1) | `python3 skills/hinshitsu-gauge/scripts/gauge.py hinshitsu/` |

## Install

- Zip file: `dist/hinshitsu-codex.zip` holds the 7 skills in the layout Codex reads, with an installer. Unzip it and run `python3 hinshitsu-codex/install.py <project folder>`, or `python3 hinshitsu-codex/install.py --home` for every project. Codex reads the folder `.agents` in the project, in each folder above it up to the repository root, and in the user's home folder (https://developers.openai.com/codex/skills, read 2026-11-18). Then type `$hinshitsu` and the request.
- Plugin: ChatGPT and Codex also install a plugin from a root `plugin.json` with the skill folders beside it; this repository has both (https://developers.openai.com/codex/plugins/build.md, read 2026-11-18).
- Install every part. The 7 skill folders need the scripts, the templates and the glossary; the zip file and the plugin hold them, and a copy of the skill folders alone is not a supported install.
- `AGENTS.md`: add 1 line: "Before any task that produces something a person will receive, read `skills/hinshitsu/SKILL.md` and follow it. Use subagents for every auditor, lens and red-cell role." The second sentence is the explicit request that the vendor's page describes.
