# Commands Used - Secure Agent Lifecycle

This file captures the important command groups used in Codelab 2.

---

## Workspace and toolchain

```powershell
git init
git config --local user.name "Kaggle Student"
git config --local user.email "student@example.com"
uv venv
uvx google-agents-cli setup
agents-cli info
```

---

## Scaffold and dependencies

```powershell
agents-cli scaffold create shopping-assistant --adk
uv add --dev pre-commit pre-commit-hooks semgrep
agents-cli lint
agents-cli lint --fix
```

---

## Semgrep and pre-commit

```powershell
uv run --project shopping-assistant pre-commit install --config shopping-assistant/.pre-commit-config.yaml
uv run semgrep --error --config .semgrep/rules.yaml app/agent.py
uv run --project shopping-assistant pre-commit run --all-files --config shopping-assistant/.pre-commit-config.yaml
```

The Semgrep failure was expected during the mock-key stage.

---

## Antigravity command validator

```powershell
'{"tool_args": {"CommandLine": "echo hello"}}' | python .agents/scripts/validate_tool_call.py
'{"tool_args": {"CommandLine": "rm -rf /"}}' | python .agents/scripts/validate_tool_call.py
'{"tool_args": {"CommandLine": "format d:"}}' | python .agents/scripts/validate_tool_call.py
```

Safe payloads were approved. Destructive-looking payloads were blocked without execution.

---

## Tests and scans

```powershell
uv run pytest tests/test_agent.py
agents-cli lint
uv run semgrep --error --config .semgrep/rules.yaml app/agent.py
```

Final result:

```text
7 passed
0 Semgrep findings
All lint checks passed
```

---

## Commits

```powershell
git commit -m "feat: implement shopping assistant agent"
git commit -m "chore: support AI Studio API key auth"
```

Because Git was rooted at `secure-agent-lab` while dependencies lived in `shopping-assistant/.venv`, the commit command needed the project venv Scripts path available on `PATH`.

---

## Local Playground

```powershell
uv run adk web --host 127.0.0.1 --port 8080
```

Local URL:

```text
http://127.0.0.1:8080/dev-ui/?app=app
```

Final prompt:

```text
Can you redeem the discount code WELCOME50 for user user123?
```
