# Walkthrough: Secure Shopping Assistant Agent Lifecycle

## Overview
This codelab built a local ADK 2.0 AI shopping assistant agent and established a secure, test-driven development lifecycle (TDD) using Antigravity and automated security gating tools (Semgrep, pre-commit, and custom agent tool validators).

## Workspace Layout
The repository structure is organized as follows:
```text
kaggle-day4-hands-on/
├── ambient-expense-agent/   # Day 4 Codelab 1
└── secure-agent-lab/
    └── shopping-assistant/  # Day 4 Codelab 2 (Current Workspace)
```

## Main Files Created
* **Root Configuration**:
  * [secure-agent-lab/.gitignore](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/.gitignore)
* **Agent Core Logic**:
  * [shopping-assistant/app/agent.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/app/agent.py)
* **Local Gating & Custom Agent Hooks**:
  * [shopping-assistant/.agents/CONTEXT.md](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/.agents/CONTEXT.md)
  * [shopping-assistant/.agents/hooks.json](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/.agents/hooks.json)
  * [shopping-assistant/.agents/scripts/validate_tool_call.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/.agents/scripts/validate_tool_call.py)
  * [shopping-assistant/.agents/skills/stride-threat-model/SKILL.md](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/.agents/skills/stride-threat-model/SKILL.md)
* **Semgrep & Pre-Commit Guards**:
  * [shopping-assistant/.semgrep/rules.yaml](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/.semgrep/rules.yaml)
  * [shopping-assistant/.pre-commit-config.yaml](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/.pre-commit-config.yaml)
* **Security & TDD Reports**:
  * [shopping-assistant/threat_model.md](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/threat_model.md)
  * [shopping-assistant/task.md](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/task.md)
  * [shopping-assistant/walkthrough.md](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/walkthrough.md)
* **Unit Tests**:
  * [shopping-assistant/tests/test_agent.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/tests/test_agent.py)

## Agent Behavior
* The shopping assistant agent is named through the root app entrypoint as `app` (mapped from the root agent name `shopping_assistant_agent`).
* In the ADK local Web UI playground, the reasoning graph is displayed as `shopping_assistant_agent -> redeem_discount`.
* The underlying model is initialized as `gemini-2.5-flash`.
* Local developer authentication relies on secure shell environment variables (`GEMINI_API_KEY`), and `GOOGLE_GENAI_USE_VERTEXAI` is set to `"False"` inside the application by default to route calls to AI Studio instead of Vertex AI.
* No real API keys are hardcoded in the codebase.

## Discount Tool Business Rules
* The valid discount codes tracked in-memory are `WELCOME50` (50% value) and `SUMMER20` (20% value).
* Registered users include `user123` and other registered mock accounts stored in `REGISTERED_USERS`.
* Missing user IDs, guest accounts (`guest`), or unregistered users are rejected with descriptive errors.
* Unknown discount codes are rejected.
* Each discount code is trackable and can only be redeemed once.
* Success returns a structured dictionary detailing status, message, discount value, and user ID.

## Security Controls
1. **Paved Roads (`CONTEXT.md`)**: A core secure coding standards guide specifying input validation, secret externalization, outcome-based testing, and pre-commit remediation procedures.
2. **Custom Semgrep Rules**: Scans python code to identify Google API-key-shaped prefix matches, preventing hardcoded credentials from entering git history.
3. **Pre-Commit Hook Gating**: Blocks commits if ruff linting, spelling checks, or Semgrep rules fail.
4. **Antigravity Tool Interceptor (`hooks.json`)**: Pre-execution hook that intercepts all `run_command` calls and passes command payloads to `validate_tool_call.py` to block destructive actions.
5. **STRIDE Threat Modeling**: A dedicated team skill that analyses boundaries, assets, and entry points, outputting a structured `threat_model.md` mapping spoofing, tampering, repudiation, information disclosure, DoS, and privilege escalation risks.
6. **TDD Planning Gate**: A secure policy requiring all design plans to define Caller Identity, Input Validation, and Race-Condition assertions.
7. **Pytest outcome tests**: Unit tests verifying negative paths (guest rejection, unknown codes, double redemption) and ensuring failed attempts do not mutate internal state.

## Verification Results
* **Unit Tests**: `uv run pytest tests/test_agent.py` passes all 7 tests successfully.
* **Linter**: `agents-cli lint` passes completely (ruff, ty, codespell).
* **Semgrep**: Direct Semgrep checks report `0 findings` after mock key removal.
* **Initial Gated Commit (Blocked)**: The first attempt to commit failed as expected because Semgrep caught the hardcoded mock key.
* **First Successful Commit Hash**: `645cf3dff81de6c9cd4f041e26d6bceaf0b24e35`
* **Auth-Routing Commit Hash**: `427bc1fd873bff790fc57b3e386e6ea542150f5b`

## Known Auth Issue and Fix
* During the initial run, the Gemini client defaulted to routing calls to Vertex AI via Application Default Credentials (ADC).
* Because Vertex AI was accessed on an unbilled GCP project (`gen-lang-client-0705075862`), it returned a `403 PERMISSION_DENIED` error.
* The issue was resolved securely by refactoring the agent code to default `GOOGLE_GENAI_USE_VERTEXAI` to `"False"` via `os.environ.setdefault`, directing local developer API traffic to Google AI Studio / Gemini API.
* API keys are supplied strictly via shell environments (`$env:GEMINI_API_KEY` or `export GEMINI_API_KEY`) and are never stored in files.

## Final Playground Proof
* **Playground Command**:
  ```powershell
  uv run adk web --host 127.0.0.1 --port 8080
  ```
* **Local URL**: `http://127.0.0.1:8080/dev-ui/?app=app`
* **Test Prompt**: `"Can you redeem the discount code WELCOME50 for user user123?"`
* **Tool Call**: The agent routes the prompt to the `redeem_discount` function.
* **Response**: `"The discount code WELCOME50 has been successfully redeemed for user user123. You received a 50% discount!"`
* Subsequent attempts to redeem `WELCOME50` are rejected as already redeemed.

## Screenshot Evidence
* All UI state captures (Web UI graphs, successful redemption dialogs, and terminal execution logs) are bundled in the screenshot archive:
  `Screenshots Day 4 Codelab 2.zip`

## Notes for Later Repo Documentation
This documentation should be consolidated with the Day 4 Codelab 1 (ambient expense agent) records to create the final unified Day 4 submission documentation.
