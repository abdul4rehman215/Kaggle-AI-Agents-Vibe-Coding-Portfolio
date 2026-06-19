# Commands Used - Ambient Expense Agent

This file records the main command groups used during Codelab 1. I kept it focused on the commands that shaped the environment, implementation, validation, and local evaluation.

---

## Workspace and scaffold

```powershell
Set-Location "C:\Users\Abdul Rehman\agy2-projects\kaggle-day4-hands-on"
agents-cli scaffold create ambient-expense-agent --agent adk --prototype --agent-guidance-filename GEMINI.md --yes
cd ambient-expense-agent
agents-cli install
```

---

## ADK / API inspection

```powershell
uv run python -c "import google.adk.workflow as w; print(dir(w))"
uv run python -c "import google.adk.agents as a; print(dir(a))"
uv run python -c "from google.adk.events.event import Event; import inspect; print(inspect.signature(Event.__init__))"
```

These inspections mattered because the codelab used ADK 2.0-style graph workflow concepts, and the installed package behavior needed to be verified instead of assumed.

---

## Linting and tests

```powershell
agents-cli lint
agents-cli lint --fix
uv run pytest
```

Final result:

```text
9 passed
```

---

## Local Playground

```powershell
uv run adk web --host 127.0.0.1 --port 8080 --reload_agents
```

On Windows, running the ADK server directly avoided PowerShell wildcard expansion issues seen with some CLI argument combinations.

---

## Local evaluation

```powershell
uv run python tests/eval/generate_traces.py
uv run python tests/eval/grade_traces.py
make eval
```

The generated artifacts were kept in:

```text
artifacts/traces/generated_traces.jsonl
artifacts/eval_scorecard.md
```
