# CONNECTIONS — dependency graph for the hinshitsu build

An edge `A -->|label| B` means B depends on A: a change to A can break B. Before changing a node, trace forward (every node it points to), backward (every node that points to it) and lateral (nodes that share a provider with it).

```mermaid
graph LR
  BRIEF[build-record/BRIEF.md] -->|criteria C1-C11| LOG[build-record/AUDIT-LOG.md]
  LOG -->|frozen criteria| SKILL[skills/hinshitsu/SKILL.md]
  GLOSS[skills/hinshitsu/GLOSSARY.md] -->|term names| SKILL
  GLOSS -->|term names| TPL[templates/*.md]
  SKILL -->|artifact rules s7-s10 s15 s19| TPL
  SKILL -->|section numbers and names| ADP[adapters/*.md]
  SKILL -->|section numbers and names| LINT[scripts/lint.py]
  SKILL -->|structural rules| CHECK[scripts/hinshitsu_check.py]
  VENDOR[vendor documents] -->|capability claims| ADP
  TPL -->|headings and columns| EX[skills/hinshitsu/example/]
  TPL -->|headings and columns| BR[build-record/]
  CHECK -->|exit code| EX
  CHECK -->|exit code| BR
  EX -->|cited paths| EXMD[skills/hinshitsu/EXAMPLE.md]
  SKILL -->|what it is| README[README.md]
  ADP -->|install steps| README
  LINT -->|pass or fail| README
```

## Edge list

| From | To | Label | Broken when |
|---|---|---|---|
| BRIEF.md | AUDIT-LOG.md | criteria | a criterion has no source line in the brief or a user message |
| AUDIT-LOG.md | SKILL.md | frozen criteria | a section lacks an element C2 or C11 lists |
| GLOSSARY.md | SKILL.md, templates, adapters, example | term names | a capitalized term is used and not defined, or defined twice |
| SKILL.md | adapters, lint.py | section numbers and names | a reference names a section number or title that `SKILL.md` does not have |
| SKILL.md | templates, hinshitsu_check.py | artifact rules | a template or check disagrees with the rule text |
| vendor documents | adapters | capability claims | a link fails or the page no longer says it |
| templates | example, build-record | headings and columns | an artifact lacks a template heading or column |
| hinshitsu_check.py | example, build-record | exit code | the script exits non-zero |
| example/ | EXAMPLE.md | cited paths | a cited path does not exist |
| SKILL.md, adapters, lint.py | README.md | summary and install steps | README states a step or rule the source does not |
