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
| RUN FOLDER | `hinshitsu/<short-task-name>/` at the root of the repository or workspace |
| gauge (rule 24.1) | `python3 <plugin folder>/skills/hinshitsu-gauge/scripts/gauge.py <RUN FOLDER>` |

## Operating on Devin

These lines say how to do on Devin what the rules require. They come from the 2 runs recorded under `runs/`.

1. **Find the plugin's folder.** Where hinshitsu is installed as a plugin, `scripts/` and `templates/` are not in the working repository. Take the path of the conductor's `SKILL.md` as the skill list shows it; the plugin's folder is the one that holds `skills/`. Write it once into the `CAPABILITY` entry as `Plugin folder: <path>`, and write every script and template path in full from it.
2. **RUN FOLDER and branch.** Use `hinshitsu/<short-task-name>/` at the root of the repository, on the task's working branch. A child session works on its own machine and sees only what is pushed: commit and push the branch before each child session starts, and name the repository, the branch and the commit in its scope.
3. **Start a SUB-AGENT.** Create 1 child session whose prompt is the saved scope, word for word, and ask to be notified when it settles. Do not poll it. Its session ID and URL are the identifier; the URL is the link the USER opens.
4. **Read a report.** Read the child session's last message in full, and download its attachment where it has one. Save it under `audits/` or `memos/` with the session ID as its first line. A child session cannot write into the RUN FOLDER; its command outputs stay in its report.
5. **The probe.** A child session may decline to list the instructions its runtime gave it. Record its words; part 2 of SWARM-CAPABLE holds when it answers `NO RECORD` to the question about the builder's conversation.
6. **Cost.** Each child session is a paid session of the USER. State the planned number on the first DECISION CARD, in plain words ("this run will start 4 separate Devin sessions"), and start none beyond that number without the USER's answer.
7. **Cards.** Send each DECISION CARD as 1 message that stops and waits for the USER. Offer the replies as choices where the tool allows it.
8. **Log and gauge.** Write each entry with `python3 <plugin folder>/scripts/hinshitsu_log.py add <RUN FOLDER> <TYPE>`; rebuild the state files with `python3 <plugin folder>/scripts/hinshitsu_log.py state <RUN FOLDER>`; draw the gauge with `python3 <plugin folder>/skills/hinshitsu-gauge/scripts/gauge.py <RUN FOLDER>`, and attach `GAUGE.svg` to each progress message.

## Install

- Plugin: Devin reads `.claude-plugin/plugin.json` and the root `plugin.json` of this repository; install the repository, or the folder inside `dist/hinshitsu-plugin.zip`, as a plugin (https://docs.devin.ai/cli/extensibility/plugins/overview.md, read 2026-11-18). An install as a personal plugin in the Devin web app was made on 2026-11-18 and the 7 skills loaded; the Devin CLI is UNVERIFIED.
- Install the whole repository. The 7 skill folders need `scripts/`, `templates/` and `skills/hinshitsu/GLOSSARY.md`; a copy of the skill folders alone is not a supported install.
- `AGENTS.md`: Devin includes up to 16 KiB of `AGENTS.md` (https://docs.devin.ai/onboard-devin/agents-md, read 2026-11-18). Add 1 line to it: "Before any task that produces something a person will receive, read `skills/hinshitsu/SKILL.md` and follow it." Do not paste the skills into `AGENTS.md`; the 7 files exceed 16 KiB.

## Smoke run

Smoke run: `skills/hinshitsu/EXAMPLE.md` records a run on Devin in the web app on 2026-11-18, with the session ID of each SUB-AGENT. The Devin CLI is UNVERIFIED — never run on that surface.
