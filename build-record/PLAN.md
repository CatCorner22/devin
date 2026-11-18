# PLAN — what the builder intends to write (plan-time lens memos and the red cell attack this file)

Read with `BRIEF.md` (the user's words), `AUDIT-LOG.md` (VoC E-002, gaps E-003, criteria E-004 to E-006, assumptions E-007, decisions E-008), `FRAMEWORK.md` and `CONNECTIONS.md`.

## 1. Shape of `SKILL.md`

- Frontmatter: `name`, `description`. Then a title, 1 paragraph stating that the skill is a contract and that `GLOSSARY.md` controls the meaning of every capitalized term, then sections 0 to 23.
- Each section is a numbered list of rules. Each rule: actor + `must` / `must not` / `may` + action + the artifact or observable result that proves it. Rule IDs take the form `section.rule` (for example 6.4) so a finding can cite a rule.
- Planned length: 30 to 40 KiB.

## 2. Mechanics the plan relies on

| Topic | Plan |
|---|---|
| Roles | ORCHESTRATOR (plans, scopes sub-agents, merges), BUILDER (writes the deliverable), AUDITOR (one per swarm role), RED CELL, LENS. The same agent may hold ORCHESTRATOR and BUILDER. No agent audits what it built. An auditor proposes fixes; the builder applies them; a different auditor run re-audits. |
| Gate at section 0 | Agent writes a CAPABILITY entry to the audit log before any other work. It tests the 3 swarm conditions (D-004). Pass: SWARM mode. Fail: the agent tells the user and stops; the user may accept DEGRADED mode in writing. |
| Run folder | All artifacts live in 1 folder the agent names in the CAPABILITY entry (default `hinshitsu/` at the repository root): `AUDIT-LOG.md`, `FRAMEWORK.md`, `SESSION-STATE.md`, `MINDMAP.md`, `CONNECTIONS.md`, `COVERAGE-LEDGER.md`, `DELIVERY-REPORT.md`, `memos/`, `audits/`, `evidence/`. |
| Criteria | Each criterion has an ID and a named test. Frozen by a CRITERIA entry that quotes the user's approval. A change needs a CRITERIA-CHANGE entry quoting the user's new approval and the reason. |
| WORK UNIT | The smallest change set the builder completes before asking for audit: at most 1 component or 1 document section group, declared in `FRAMEWORK.md` before work on it starts. |
| Lenses | 4 lens sub-agents at plan time; each writes a memo with fixed fields (what breaks for this lens, what to cut, what to add, the 1 change it would insist on). Orchestrator writes a reconciliation table: each memo point accepted (criterion or decision changed) or rejected (reason). After each work unit, each finding is tagged with 1 lens and that lens's question is answered in the log. |
| Red cell | A sub-agent with no builder context beyond the run folder. Full attack at plan time and before delivery; probes on the 4 triggers. Must attack at least 1 premise absent from the builder's assumption list, or return INSUFFICIENTLY ADVERSARIAL, in which case the orchestrator runs a fresh red cell. Premortem before delivery. Its findings are BLOCKER. |
| Swarm | 8 roles after each work unit, each a separate sub-agent with a scope that quotes the criteria word for word and names files. Reports saved word for word in `audits/`. A round with 0 findings triggers a red-cell probe and a seeded-defect check (the orchestrator plants 1 known defect in a copy and confirms the auditor finds it). |
| Findings | ID, file, line, trigger (steps to reproduce), class, rule or criterion violated, status. BLOCKER: stop, fix, re-audit; nobody may overrule it, including the user (the user may end the run or change criteria through catchball instead). DEFECT, FRAGILITY, STYLE: fix, or overrule in writing with a reason; the orchestrator may overrule STYLE; the user alone may overrule DEFECT and FRAGILITY. |
| Coverage ledger | Rows: every file, function, branch and criterion. Columns: every audit role plus recipient-side verification and stability. Cell: `PASS` + evidence path, `FAIL` + finding ID, `N/A` + reason, or `UNVERIFIED` + reason. Empty cell blocks delivery. |
| Evidence | Every claim in the delivery report ends with a citation to a file path, a command-output file, a screenshot or a log entry ID. No citation: the claim is ASSERTED and the gate fails. A final auditor (not the builder) opens every cited path and re-runs every cited command. |
| DONE | Defined in the glossary as a checklist: every criterion VERIFIED; 0 open BLOCKER; every DEFECT and FRAGILITY fixed or overruled by the user; 0 empty ledger cells; 0 ASSERTED claims; `hinshitsu_check.py` exits 0; delivery report sent. The agent must not say "done", "ready", "complete", "finished" or "shipped" before that. |
| Baby Bird (section 23) | The 8 rules in E-005. |
| Waiver | The user may waive a named section for a run in writing. The agent logs it and reports each waived check UNVERIFIED. The agent must not propose a waiver to save its own effort. |

## 3. Scripts

- `scripts/lint.py`: tests this repository against C1 to C4 and C6 (file list, section order and names, glossary terms defined once, banned words, links resolve inside the repository).
- `scripts/hinshitsu_check.py <run-folder>`: tests any run. Checks: required files exist; audit log has CAPABILITY, VOC, CRITERIA entries and ascending IDs; ledger has no empty cell and each `PASS` cites a path that exists; delivery report has the required headings in order, contains no banned word and no ASSERTED claim; every finding has class and status; no open BLOCKER.

## 4. Adapters

7 files: Claude Code, Cursor, Devin, ChatGPT (Codex and ChatGPT Work), Gemini (Gemini CLI), Kimi (Kimi Code CLI), Muse (Muse Code CLI). Each: target surface; capability table (3 swarm conditions, artifact storage, browser access) with source link and date; role-to-mechanism mapping; install steps; known limits. No rule text copied.

## 5. Example

A single-file bill-splitting web page (`skills/hinshitsu/example/deliverable/index.html`), built by the orchestrator session, with lens, red-cell and swarm roles run by child Devin sessions, browser checks run with Playwright and Chrome, and every artifact kept in `skills/hinshitsu/example/run/`. `EXAMPLE.md` walks through the run and links each artifact.

## 6. Order of work

WU-1 glossary and skill → WU-2 templates and scripts → WU-3 adapters → WU-4 example → WU-5 README and changelog. Swarm after each work unit; red cell and premortem before delivery; then fast-forward `main`.
