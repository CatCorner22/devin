# hinshitsu for Codex

Version 3.1.0. UNVERIFIED — never run on Codex. The layout follows OpenAI's page on where Codex reads skills (https://developers.openai.com/codex/skills, read 2026-11-18).

## Install

1. Unzip `hinshitsu-codex.zip`. You get the folder `hinshitsu-codex`.
2. Pick 1:
   - **1 project:** run `python3 hinshitsu-codex/install.py <your project folder>`.
   - **Every project:** run `python3 hinshitsu-codex/install.py --home`.
3. Start Codex in the project. Type `$hinshitsu` and your request, for example: `$hinshitsu baby bird me: add a search box to the page`.

Or ask Codex to do it: "Unzip hinshitsu-codex.zip and run its install.py for this project."

Without Python: copy the folder `hinshitsu-codex/agents` into your project and rename it `.agents`.

## What gets installed

- `.agents/skills/` — the 7 skills: `hinshitsu` (the conductor), `hinshitsu-baby-bird-plan`, `hinshitsu-challenge`, `hinshitsu-record`, `hinshitsu-audit`, `hinshitsu-delivery`, `hinshitsu-gauge`.
- `.agents/hinshitsu/` — the scripts, the templates and `adapters/codex.md`, which maps the skills' words to Codex's tools.

## What to expect

- The first thing the agent does is a live test that it can start a sub-agent. Codex starts sub-agents when you or an instruction file ask for them; the skill asks. If the test fails, the agent stops and asks you.
- Nothing is built before you approve the requirements.
- The agent states how many sub-agent runs it plans, and asks before it exceeds that number.
- The run ends with a report that says what was proven, what was not, and 3 checks you can do yourself.

To remove it, delete `.agents/hinshitsu` and the 7 folders named above under `.agents/skills`.
