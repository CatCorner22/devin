# Install hinshitsu

Version 3.1.0. Pick your surface. Only Devin was run in this repository; every other row is UNVERIFIED — never run on that surface. The vendor pages were read on 2026-11-18; a vendor changes its product.

| You use | Install this | Independent checkers |
|---|---|---|
| Claude chat (claude.ai, Claude apps) | `dist/hinshitsu-claude.zip` | no: 1 assistant |
| ChatGPT (chatgpt.com, ChatGPT apps) | `dist/hinshitsu-chatgpt.zip`, or the paste-in block | no: 1 assistant |
| Claude Code | the whole repository as a plugin | yes |
| Codex, ChatGPT Work | `dist/hinshitsu-codex.zip` | yes |
| Devin | the whole repository | yes |
| Cursor | the whole repository as a plugin | yes |
| Gemini CLI | the whole repository | yes |
| Muse Code CLI | the whole repository | yes |
| Kimi Code CLI | the whole repository | yes |

## Claude chat

1. Download `dist/hinshitsu-claude.zip` from this repository.
2. In Claude's settings, turn on code execution; Anthropic's page says a skill needs it.
3. Open Customize, Skills, choose "Create skill", then "Upload", and pick the zip file.
4. In a new chat, write: `baby bird me: <your request>`.

Source: https://support.claude.com/en/articles/12512198-how-to-create-custom-skills

## ChatGPT

With a Skills page (OpenAI documents it for Business, Enterprise, Healthcare and Edu accounts):

1. Download `dist/hinshitsu-chatgpt.zip`.
2. Open Plugins, Skills, choose "Create", then "Upload from your computer", and pick the zip file.
3. In a new chat, write: `@hinshitsu-chatgpt baby bird me: <your request>`.

Without a Skills page: open `chat/chatgpt/PASTE-IN.md`, copy the block, and paste it into Settings, Personalization, Custom instructions, or into the instructions of a Project. Then write: `baby bird me: <your request>`.

Source: https://help.openai.com/en/articles/20001066-skills-in-chatgpt

## Claude Code

Clone the repository, add it as a plugin source, and install `hinshitsu` (it holds `.claude-plugin/plugin.json`). The skills need `scripts/` and `templates/` beside them, so install the whole repository, not the `skills/` folder alone. Details and tool names: `adapters/claude-code.md`.

## Codex and ChatGPT Work

1. Download `dist/hinshitsu-codex.zip` and unzip it. You get the folder `hinshitsu-codex`.
2. Run `python3 hinshitsu-codex/install.py <your project folder>` for 1 project, or `python3 hinshitsu-codex/install.py --home` for every project. Or ask Codex: "Unzip hinshitsu-codex.zip and run its install.py for this project."
3. Start Codex in the project and write: `$hinshitsu baby bird me: <your request>`. Restart Codex if the skill is not listed.

The installer puts the 7 skills in `.agents/skills/` and the scripts and templates in `.agents/hinshitsu/`, the folders Codex reads. Details and tool names: `adapters/codex.md`.

Source: https://developers.openai.com/codex/skills

## Devin

Add the repository to the session, or install it as a plugin from `plugin.json`. Then write: `use hinshitsu: <your request>`. Details: `adapters/devin.md`.

## Cursor

Install the repository as a plugin (`plugin.json`), or clone it into the project. Details: `adapters/cursor.md`.

## Gemini CLI, Muse Code CLI, Kimi Code CLI

Clone the repository into the project, and point the agent at `skills/hinshitsu/SKILL.md`. Details: `adapters/gemini.md`, `adapters/muse.md`, `adapters/kimi.md`.

## After the install

- With independent checkers: the first thing the agent does is a live test that it can start a sub-agent. If the test fails, it stops and asks you.
- With 1 assistant: the first reply states that no second assistant checks the work.
- In both forms, nothing starts before you approve the requirements.
