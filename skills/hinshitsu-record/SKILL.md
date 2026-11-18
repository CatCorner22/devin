---
name: hinshitsu-record
description: The record skill of hinshitsu - the durable artifacts that let a third party who was not in the room check a run. It keeps a living framework (criteria, decisions, naming, contracts, file ownership) with a dependency graph, a session-state file that survives context compaction, an append-only audit log, a mind map, a connections graph, and a coverage ledger in which every criterion, file, function and branch is a row, every audit is a column and no cell is empty. It also holds the rollback contract for destructive or hard-to-reverse actions. Use it at the start of any task that hinshitsu governs; before and after every work unit; before any change to existing code or text ("what does this break"); in long sessions, after a compaction, handoff or resume; before deleting, overwriting, force-pushing, migrating, deploying, publishing or sending; and when the user says "keep a log", "audit trail", "decision log", "track coverage", "where were we", "resume" or "what depends on this".
---

# hinshitsu-record: the record a third party can check

Part of the hinshitsu contract. `../hinshitsu/GLOSSARY.md` defines every term in capitals. `../hinshitsu/SKILL.md` (the conductor) sets precedence, roles and the 12 STAGES. An imperative sentence binds the ORCHESTRATOR; `must` binds the actor named; `may` grants a discretion that nobody else has. Rules are cited by section and number.

This skill holds sections 7, 8, 9, 10 and 18. It serves STAGE S2 (set-up) and applies in every later STAGE. Before acting, read sections 0 and 1 of the conductor (`hinshitsu`) and `GLOSSARY.md`; the `STAGE` start entry states the SHA-256 of each (rule 0.7). Without a conductor run this skill produces no verdict: say so to the USER and start the conductor.

**RUN FOLDER layout.** `AUDIT-LOG.md`, `FRAMEWORK.md`, `SESSION-STATE.md`, `MINDMAP.md`, `CONNECTIONS.md`, `COVERAGE-LEDGER.md`, `DELIVERY-REPORT.md`, `GAUGE.svg`, and the folders `prompts/` (scopes sent), `memos/` (LENS reports), `audits/` (AUDITOR and RED CELL reports), `evidence/` (command outputs, screenshots, recordings).

## 7. Living Reference Framework

1. **Create.** At S2, before the first WORK UNIT, create `FRAMEWORK.md` with these 7 parts: CRITERIA (by reference to the `CRITERIA` entry that controls); architecture decisions; naming conventions; contracts between parts (provider, consumer, what is promised); file ownership (which role builds each path and which roles audit it); the list of WORK UNITS with status; existing implementations checked.
2. **Graph.** Create `CONNECTIONS.md` at the same time (rule 9.3). It is the framework's dependency graph.
3. **Consult and update.** Before each WORK UNIT, log a `CHECK` entry that names the parts of `FRAMEWORK.md` the WORK UNIT rests on. After each one, update `FRAMEWORK.md` and log the update as a `DECISION` or `CHECK` entry that names the part changed.
4. **Supersede, never delete.** Never delete a superseded line. Mark it `(superseded <date> → <ID>)` and leave it. Assign each ID 1 time; never reuse or renumber an ID.
5. **Existing implementations.** Before creating a file, function, component, term or rule, search the workspace for one that already does the job. Record the search (what was searched for, where, the command, the result) in part 7 of `FRAMEWORK.md`. Creating a duplicate of something the search finds is a DEFECT.
6. **Trace before change.** Before any change to something that exists, write a `TRACE` entry with 3 lines: **forward** — each node the changed node points to in `CONNECTIONS.md`, and whether the change breaks it; **backward** — each assumption and decision the changed node rests on, and whether the change violates it; **lateral** — each WORK UNIT in progress or complete that shares a provider with the changed node, and whether the change invalidates it. A change with no `TRACE` entry is a DEFECT. A broken edge triggers rule 6.3(c).

## 8. Long Session Hygiene

1. **State file.** Keep `SESSION-STATE.md`. It holds only the current state, in these 8 fields: objective (the USER's words); each CRITERION ID with its state; constraints and approvals in force, each with its entry ID; current STAGE and WORK UNIT; open FINDINGS by ID; artifacts that exist, by path; checks actually run, by EVIDENCE path; the single next action. When an `ANSWER`, `DECISION`, `REVERSAL`, `CRITERIA`, `FINDING` or `RESOLUTION` entry changes a fact that `SESSION-STATE.md`, `FRAMEWORK.md` or `MINDMAP.md` states, change those files in the same commit as the entry. Copy every commit ID, count and path from the output of a command. A commit ID in the record that `git cat-file -e <ID>` rejects is a DEFECT.
2. **When to rewrite.** Rewrite `SESSION-STATE.md` (a) after each WORK UNIT, (b) before any context compaction, handoff or pause, and (c) when 25 log entries have been written since the last rewrite. Log each rewrite as a `COMPACTION` entry with the reason.
3. **Resume.** After a compaction, a handoff or a new session, read `SESSION-STATE.md`, `AUDIT-LOG.md` and the `SKILL.md` of the current STAGE first; confirm that each listed artifact exists; and log a `CHECK` entry with the result before any other action. Write lost state as lost; do not rebuild it from memory.
4. **Contradiction check.** Before logging a `DECISION`, search `AUDIT-LOG.md` for earlier decisions on the same subject. If the new decision reverses or conflicts with one, log a `REVERSAL` entry that names the earlier ID and gives the reason and the EVIDENCE that changed. A conflict found with no `REVERSAL` entry is a contradiction: it triggers rule 6.3(b).
5. **Abandoned approaches.** When an approach is dropped, log an `ABANDONED` entry: what was tried, the EVIDENCE of why it failed, and what replaces it. Do not retry an abandoned approach unless a new entry cites new EVIDENCE.
6. **Loop limit.** After 2 attempts at the same step fail the same way, stop repeating it: log the 2 failures, then change the approach or send a DECISION CARD.

## 9. Durable artifacts

1. **3 files, in real time.** Keep `MINDMAP.md`, `CONNECTIONS.md` and `AUDIT-LOG.md` from S2; update each within the WORK UNIT in which the thing it records happens; deliver all 3 to the USER. `templates/` holds the form of each.
2. **`MINDMAP.md`** — the hierarchy goal → CRITERION → component → decision → FINDING, as an indented list with IDs and as a Mermaid diagram of the same nodes. Every CRITERION, WORK UNIT, decision and FINDING appears exactly 1 time in each. A node with no parent is a FINDING.
3. **`CONNECTIONS.md`** — a Mermaid graph in which every edge has a label that states what the target takes from the source, and an edge table with the columns from, to, label, broken when. Every edge has 1 row and every row has an edge. An unlabeled edge is a FINDING.
4. **`AUDIT-LOG.md`** — append-only. Write each entry with `python3 scripts/hinshitsu_log.py add <run folder> <TYPE>`: the script numbers the entry, takes the time from the clock, and refuses an entry that these rules forbid. After each entry that changes a FINDING, a STAGE or the CRITERIA, run `python3 scripts/hinshitsu_log.py state <run folder>`. Each entry has the heading `### E-<n> · <UTC time> · <TYPE> · <role>`, with `<n>` ascending by 1. TYPE is 1 of: `CAPABILITY`, `TIER`, `STAGE`, `VOC`, `GAP`, `ASSUMPTION`, `CRITERIA`, `CRITERIA-CHANGE`, `CARD`, `ANSWER`, `RECONCILIATION`, `DECISION`, `TRACE`, `LAUNCH`, `FINDING`, `RESOLUTION`, `OVERRULE`, `PROBE`, `CHECK`, `COMPACTION`, `REVERSAL`, `ABANDONED`, `ROLLBACK`, `WAIVER`, `CORRECTION`, `DELIVERY`, `LESSON`.
5. **ID formats.** Use exactly these: entry `E-<n>`; CRITERION `C<n>`; gap `G<n>`; PREMISE `A-<n>`; decision `D-<n>`; WORK UNIT `WU-<n>`; FINDING `F-<n>`; STAGE `S<n>`. The ORCHESTRATOR assigns each `F-<n>` when it logs the FINDING; an AUDITOR's report numbers its own findings locally and the `FINDING` entry cites that number.
6. **Append-only.** Never edit or delete an entry. Correct an entry with a `CORRECTION` entry that names it. An entry must not cite an entry, a decision or a message later than itself.
7. **Write before acting.** Write the entry for an action before starting the action. Where the workspace is a git repository, commit `AUDIT-LOG.md` after each entry or group of entries written at the same moment and before the action they describe, so that the git history shows the order and shows that the file only grew. Do not write several STAGES of entries after the fact; if an entry was written late, say so in the entry.
8. **Secrets.** Do not write a password, key, token or personal identifier into any artifact. Replace it with `[REDACTED]` at the moment of capture, including inside a saved report. A secret in an artifact is a BLOCKER.

## 10. Coverage ledger

1. **Rows.** Keep `COVERAGE-LEDGER.md`. Each row is 1 thing to cover. For code: every CRITERION; every file in the DELIVERABLE; every function; every branch (each `if`, `else`, `case`, loop exit, error path and early return). For a document, a plan or a design: every CRITERION; every file; every heading; every factual claim. Add the rows for a WORK UNIT before its swarm starts.
2. **Columns.** Each column is 1 audit: the 8 roles of section 13, recipient-side verification (section 11) and stability testing (section 12).
3. **Cells.** Each cell holds exactly 1 of: `PASS` with the EVIDENCE path; `FAIL` with the FINDING ID; `N/A` with the reason that audit cannot apply to that row; `UNVERIFIED` with the reason.
4. **Who reads code.** Function rows and branch rows are audited by the correctness auditor and the adversarial tester. In the other 8 columns of those rows write `N/A — covered at file row`; those audits fill the file row.
5. **Support for PASS.** Only an AUDITOR's report saved under rule 1.6, or the output of a command that an AUDITOR ran, supports a `PASS`. The BUILDER's statement does not. A cell that rests on a report older than the last change to its row is `UNVERIFIED — stale`.
6. **No empty cell.** Do not deliver with an empty cell. Write a cell that nobody filled as `UNVERIFIED — not audited` and count it in the delivery report.
7. **N/A is not a way out.** Apart from rule 10.4, an `N/A` with no reason, or with a reason that is false, is a DEFECT. The final AUDITOR checks every `N/A` reason under rule 17.4.

## 18. Rollback contract

1. **Covered actions.** Before any action in this list, write a `ROLLBACK` entry: deleting or overwriting files outside the RUN FOLDER that the run did not create; rewriting git history or force-pushing; pushing to a default or shared branch; running a migration or any write against a database that is not local and disposable; deploying; publishing a package; sending a message, email or comment to anyone but the USER; spending money; changing or revoking a credential.
2. **Content.** The entry states the action, the exact command or steps that undo it, and whether the undo was tested. Take a backup first where the undo depends on one, and cite its path.
3. **No undo.** If no undo exists, do not act until the USER approves that named action on a DECISION CARD; quote the approval in the entry. An approval of the task as a whole is not an approval of the action.
4. **Missed entry.** An action taken with no `ROLLBACK` entry is a BLOCKER of class (d) until the entry is written after the fact, marked late, and the USER is told.
