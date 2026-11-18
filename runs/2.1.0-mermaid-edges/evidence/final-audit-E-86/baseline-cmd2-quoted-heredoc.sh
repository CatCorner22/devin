bash -c "$(cat <<'SCRIPT'
python3 - <<'PY'
import sys; sys.path.insert(0, "tests")
import test_check as t
for edge in ["A ==> B", "C -.-> D", "A -- reads --> B", "A --> B", "A -->|reads| B"]:
    d = t.good_run()
    (d / "CONNECTIONS.md").write_text("```mermaid\ngraph LR\n  %s\n```\n" % edge, encoding="utf-8")
    print(repr(edge), "->", [e for e in t.hcheck.check(d, "plan") if "CONNECTIONS" in e])
PY
SCRIPT
)"
