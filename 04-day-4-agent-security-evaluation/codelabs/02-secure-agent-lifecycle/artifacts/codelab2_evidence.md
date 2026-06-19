# Codelab 2 Evidence Log

## Commands Run
The following commands were executed to configure, validate, and secure the Shopping Assistant Agent:

```powershell
# Git Configuration
git init
git config --local user.name "Kaggle Student"
git config --local user.email "student@example.com"

# Virtual Environment & Tooling Installation
uv venv
uvx google-agents-cli setup
agents-cli info

# Scaffolding ADK Agent Project
agents-cli scaffold create shopping-assistant --adk

# Adding Dependency Packages
uv add --dev pre-commit pre-commit-hooks semgrep

# Linting & Autoformatting
agents-cli lint
agents-cli lint --fix

# Gating Hook Setup
uv run --project shopping-assistant pre-commit install --config shopping-assistant/.pre-commit-config.yaml
uv run --project shopping-assistant pre-commit run --all-files --config shopping-assistant/.pre-commit-config.yaml

# Manual Command Interceptor Verification
python .agents/scripts/validate_tool_call.py

# Testing Code
uv run pytest tests/test_agent.py

# Semgrep Scan
uv run semgrep --error --config .semgrep/rules.yaml app/agent.py

# Commit Operations
git commit -m "feat: implement shopping assistant agent"
git commit -m "chore: support AI Studio API key auth"

# Playground local launch
uv run adk web --host 127.0.0.1 --port 8080
```

## Test Evidence
* **Pytest**: 7 tests passed successfully (`tests/test_agent.py`).
* **Agents CLI Lint**: Passed successfully with `All checks passed!`.
* **Direct Semgrep Check**: Checked on `app/agent.py` after mock key removal and returned `0 findings`.
* **Safe command payload test**:
  * Input: `{"tool_args": {"CommandLine": "echo hello"}}`
  * Output: `APPROVED: Command validation passed.` (Exit code: `0`)
* **Destructive command payload test**:
  * Input: `{"tool_args": {"CommandLine": "rm -rf /"}}`
  * Output: `BLOCKED: Destructive command detected containing 'rm -rf /'.` (Exit code: `1`)

## Git Evidence
* **First Security Lifecycle Commit (Mock key present in git history, then blocked/remediated)**:
  * Commit Hash: `645cf3dff81de6c9cd4f041e26d6bceaf0b24e35`
  * *Note: The first git commit attempt failed intentionally because Semgrep blocked it due to the mock key in `app/agent.py`.*
* **AI Studio Auth-Routing Commit**:
  * Commit Hash: `427bc1fd873bff790fc57b3e386e6ea542150f5b`

## Auth Evidence
* **Initial Run (Vertex AI + ADC)**: Failed with a `403 PERMISSION_DENIED` error due to missing billing configuration on the default GCP project `gen-lang-client-0705075862`.
* **Refactored Run (Google AI Studio)**: Enforced `GOOGLE_GENAI_USE_VERTEXAI = "False"` in `app/agent.py` by default. Requests route successfully using the secure environment variable `GEMINI_API_KEY` supplied in the terminal. No credentials are saved in project files.

## Screenshot Evidence
* **Archive Reference**: `Screenshots Day 4 Codelab 2.zip`
