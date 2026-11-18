# User brief and later user messages, verbatim

This file holds the user's words exactly as sent. It is the input to the build, not an artifact the skill governs. The lint script skips it because it quotes the banned-word list.

## Message 1 — 2026-11-18 09:47 EST

Build the hinshitsu (品質, "quality") skill in the new repository `CatCorner22/devin`. This is an LLM-agnostic skill that forces any AI coding assistant to deliver stable, verified, end-user-ready work instead of self-graded output. The executing agent must apply the hinshitsu discipline to its own build process: write acceptance criteria first, audit its own output, and produce the artifacts described below.

### Repository layout to create

```
catcorner22/devin/
  README.md                          — what hinshitsu is, why it exists, how to install per platform
  skills/hinshitsu/SKILL.md          — canonical skill (source of truth)
  skills/hinshitsu/GLOSSARY.md       — defined terms (may be embedded in SKILL.md if short)
  skills/hinshitsu/EXAMPLE.md        — worked example: small deliverable run through the full pipeline with real artifacts, as a self-test
  templates/MINDMAP.md               — template for the hierarchical map artifact
  templates/CONNECTIONS.md           — template for the dependency-graph artifact
  templates/AUDIT-LOG.md             — template for the append-only audit log
  templates/COVERAGE-LEDGER.md       — template for the coverage ledger
  adapters/claude-code.md            — runtime mapping: Task-tool sub-agents
  adapters/cursor.md                 — .mdc rule version; background agents or serial
  adapters/devin.md                  — AGENTS.md/knowledge version; subagent sessions
  adapters/chatgpt.md                — paste-in instructions; serial degraded mode
  adapters/gemini.md                 — paste-in; serial degraded mode
  adapters/perplexity.md             — paste-in; serial degraded, artifacts in-chat
  adapters/kimi.md                   — paste-in; serial degraded mode
  adapters/muse.md                   — paste-in; serial degraded mode
```

### SKILL.md format

Match the conventions of `CatCorner22/precog/.claude/skills/precog-verify/SKILL.md` and `precog-personas/SKILL.md` (read them first): YAML frontmatter with `name: hinshitsu` and a long trigger-heavy `description` listing when the skill activates (any task producing something a person will receive, run, read, or rely on; before declaring work finished; "is this ready", "ship it", "hand it off"; end of any build/plan/design phase). Then numbered imperative sections. Imperative voice throughout.

### Drafting standard — Ken Adams, *Manual of Style for Contract Drafting*

The skill is a contract between the user and the agent; draft it so it cannot be loopholed:
- GLOSSARY defines every capitalized term once: DELIVERABLE, RECIPIENT, DONE, BLOCKER, DEFECT, FRAGILITY, STYLE, VERIFIED, ASSERTED, UNVERIFIED, DEGRADED, VOC-ASSUMED, INSUFFICIENTLY ADVERSARIAL.
- `must` for obligations, `may` for discretion. Banned words in the skill text and all artifacts it governs: should, shall, appropriate, reasonable, proper, adequate, ensure, try to, as needed, if possible, generally, typically.
- Every rule must be testable by a third party who was not in the room. Nothing left to implication.

### Required sections (in order)

0. **Capability declaration** — agent states its runtime (Claude Code, Cursor, Devin, Gemini, ChatGPT, Perplexity, Kimi, Muse) and which swarm/artifact capabilities are actually available before starting.
1. **Separation of duties** — the agent that plans never solely grades; the agent that builds never audits its own output; the agent that audits never merges its own fixes. Single-agent runtimes run roles as separate passes producing separate written artifacts, marked DEGRADED.
2. **Voice of the Customer** — recipient identity, verbatim needs, observed-workflow needs (past behavior over stated opinion), customer-language→technical-requirements translation; unattainable signal marked VOC-ASSUMED with guesses listed.
3. **Hoshin kanri catchball** — acceptance criteria confirmed with the user, written to AUDIT-LOG.md, frozen; changes require explicit user re-approval logged with reason.
4. **Nemawashi** — all load-bearing assumptions written and socialized before decisions.
5. **Continuous Lens Rotation** — four lenses (recipient experience, minimal viable sequence, structural integrity, trust/controls — modeled on `CatCorner22/Dental_Mgmt` `reviews/design-lens-*.md` and `runSpecialistAgents` in `CatCorner22/precog/src/lib/precog/llm/multi-agent.ts`). At planning, each lens produces a short challenge memo against the plan; orchestrator reconciles into frozen criteria. During build, swarm findings route through the relevant lens after each work unit; no work unit ships without at least one lens pass. Full multi-design synthesis with judges only on user request or when the red cell kills the plan.
6. **Standing Red Cell (Van Riper / Millennium Challenge)** — persistent adversary, not a fixed gate. Full premise attacks at plan time and pre-delivery; lightweight assumption probes fire on triggers (criteria-change request, contradiction-check failure, broken dependency-graph edge, finding-free audit round); may attack any logged decision retroactively; must surface ≥1 attack on a premise the builder did not flag or report INSUFFICIENTLY ADVERSARIAL; premortem before delivery ("six weeks from now the user reports failure — write the story"); findings BLOCKER-class.
7. **Living Reference Framework** — framework doc created at session start (criteria, architecture decisions, naming conventions, contracts, file ownership) with a dependency graph; consulted before and updated after every work unit; superseded decisions marked, not deleted; check for existing implementations before creating anything; before any change trace forward (downstream breakage), backward (violated assumptions), lateral (invalidated parallel work).
8. **Long Session Hygiene** — running session-state block; checkpoint compaction to a durable SESSION-STATE artifact; contradiction checks against logged decisions with explicit justification for reversals; abandoned approaches logged with reasons.
9. **Durable artifacts** — MINDMAP.md (hierarchical goal→criterion→component→decision→finding map with embedded Mermaid), CONNECTIONS.md (labeled dependency graph), append-only AUDIT-LOG.md (timestamped decisions, findings, resolutions, overrules, compactions). All maintained in real time and delivered to the user.
10. **Coverage ledger** — every file/function/branch/criterion is a row, every audit a column; zero empty cells required for delivery; gaps reported UNVERIFIED.
11. **Recipient-side verification** — exercise the deliverable as the end user receives it (built artifact in a real browser, document actually opened); self-reports do not count.
12. **Stability testing** — fresh install, production build, refresh/resize/empty-data, dependency drift.
13. **Forensic Swarm** — parallel adversarial sub-agents in real time after each work unit: correctness auditor, forensic/5S sloppiness hunter (dead code, unused imports, TODOs, placeholders, copy-paste drift, hardcoded values), best-practices auditor vs repo conventions, adversarial tester, recipient-experience auditor, framework-drift auditor, language auditor (Adams ambiguity categories applied to criteria/VoC/report).
14. **Jidoka** — any BLOCKER stops all forward work until fixed and re-audited.
15. **Finding protocol** — every finding reproducible (file/line/trigger), classified BLOCKER/DEFECT/FRAGILITY/STYLE, fixed or overruled with written justification; BLOCKERs non-overridable; no silent dismissals.
16. **Swarm management** — narrow scopes with criteria verbatim; no self-auditing; a finding-free swarm is a red flag, not a success; re-run affected auditors after every fix.
17. **Anti-pretend enforcement** — every report claim cites an existing artifact (file path, command output, screenshot, log line) or is marked ASSERTED, which fails the gate; a final self-audit-of-the-audit verifies cited files/logs/maps exist and match the code; idempotence — checks must be re-runnable with the same verdict.
18. **Rollback contract** — rollback path stated before destructive or hard-to-reverse actions, or explicit user sign-off.
19. **Delivery report** — opens with a plain-language summary for a non-technical reader (what you got, what was proven, what wasn't), then VoC statement, lens reconciliation, red-cell and swarm verdicts, coverage ledger, maps, audit log.
20. **Kaizen/hansei** — LESSONS section proposing concrete skill amendments for user approval.
21. **Degradation** — when sub-agents are unavailable (always for ChatGPT, Perplexity, Kimi, Muse, Gemini), run auditor roles serially and mark the report `DEGRADED — single-agent audit`; never pretend the swarm ran.
22. **UNVERIFIED** — a check that cannot run is reported UNVERIFIED, never passed.

### Adapters

Each adapter imports the canonical spec verbatim (or references it) with a short runtime-mapping header. Verify each platform's current sub-agent capabilities online before finalizing the mapping table — do not guess.

### Self-test requirement

EXAMPLE.md must show a real small deliverable (e.g., a single-page frontend) run through the full pipeline: VoC statement, frozen criteria, lens memos, red-cell attack, coverage ledger, findings with resolutions, delivery report. This is how the user verifies the skill executes rather than performs.

### Notes

- Do NOT modify `precog-verify` or `precog-personas` — the lens/red-cell adaptations are scoped to hinshitsu only.
- The user's prior "Kimi skills" (long-session-hygiene, living-reference) are not in the indexed repos; if located, import their text verbatim instead of re-deriving.
- Commit all work to `CatCorner22/devin` on main with a clear commit message.

## Message 2 — 2026-11-18 09:48 EST

use Ultra please.  I need world-class work on this effort

## Message 3 — 2026-11-18 09:51 EST

Add a "baby bird" element: baby birds don't know what they need. Their mom or dad, or both, bring them food.  I don't know what gaps I left in a plan.  Nor do I understand all technical aspects of my requests or directions.  Baby bird me, bro.  You understand, right?  What I want you to include?  A proactive pro-user tool.

## Message 4 — 2026-11-18 09:52 EST

Please build the skill or plugin only for platforms that allow sub-agents.

## Message 5 — 2026-11-18 10:05 EST

> Wait, let's divide these up into separate skills.

## Message 6 — 2026-11-18 10:05 EST

> I defer to you, but the most important thing would be to keep together anything that would be a synergy

## Message 7 — 2026-11-18 10:06 EST

> please keep baby bird in the plan name so I remember.  Please now build each skill fully and run the same tests and red teams over it once you finish
