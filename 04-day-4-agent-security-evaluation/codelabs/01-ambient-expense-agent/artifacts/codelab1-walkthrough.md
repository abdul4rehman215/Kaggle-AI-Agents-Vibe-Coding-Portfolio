# Walkthrough: Security Checkpoint in Expense Approval Workflow

I have successfully added a pre-LLM security screen for high-value expenses (>= $100) to the ADK 2.0 expense approval agent workflow. All 9 integration and unit tests pass successfully.

## Changes Made

### 1. Security Checkpoint Addition
- Implemented helper functions `redact_pii` and `detect_prompt_injection` in [agent.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/expense_agent/agent.py):
  - **PII Redaction**: Detects and redacts US-style SSNs (format `###-##-####`) with `[REDACTED_SSN]` and credit card-like numbers (13 to 19 digits) with `[REDACTED_CARD]` in the expense description.
  - **Prompt Injection**: Detects phrases like "ignore previous instructions", "bypass rules", etc.
- Added a new `security_screen` node:
  - Validates description fields, performs PII redaction, and checks for prompt injections.
  - If prompt injection or parsing errors are detected, it bypasses the LLM (`review_agent`) and routes directly to the human reviewer (`request_approval`) using the `BYPASS_LLM` route.
  - If the input is clean, it routes to `review_agent` using the `CLEAN` route.

### 2. Graph Edges & State Integration
- Re-routed the graph edges in `root_agent` to place the `security_screen` node on the `$100+` and parsing error path:
  ```python
  root_agent = Workflow(
      name="root_agent",
      edges=[
          ("START", parse_expense_email),
          (parse_expense_email, route_by_amount),
          (
              route_by_amount,
              {
                  "AUTO_APPROVE": auto_approve,
                  "NEEDS_REVIEW": security_screen,
              },
          ),
          (
              security_screen,
              {
                  "BYPASS_LLM": request_approval,
                  "CLEAN": review_agent,
              },
          ),
          (review_agent, request_approval),
          (request_approval, process_decision),
      ],
  )
  ```
- Stored all parsed/sanitized expense fields (e.g. `amount`, `submitter`, `category`, `description`, `date`) at the root level of `ctx.state` to resolve a `KeyError` during instruction variable interpolation in `review_agent`.

### 3. Test Fixes & Mock Enhancements
- Updated [test_agent.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/tests/integration/test_agent.py):
  - Added test cases covering under-$100 clean auto-approvals, high-value clean reviews, SSN/Credit Card redactions, and prompt-injection LLM bypasses.
  - Patched the base class `LlmAgent` instead of the local variable `review_agent` since the ADK clones nodes during graph initialization.
  - Updated `mock_review_run` to yield a single content event with a valid JSON string matching the `RiskAssessment` schema, preventing `ValueError: Output already set`.

## Verification & Quality Check

- Ran `agents-cli lint --fix` which validated formatting and all coding standards.
- Executed all unit and integration tests successfully via `uv run pytest`:
  ```
  tests\integration\test_agent.py .....                                    [ 55%]
  tests\integration\test_server_e2e.py ...                                 [ 88%]
  tests\unit\test_dummy.py .                                               [100%]
  ======================= 9 passed, 4 warnings in 14.36s ========================
  ```

## Local ADK Playground Verification
- Created [Makefile](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/Makefile) with clean targets (`install`, `lint`, `test`, `playground`).
- Documented and resolved the PowerShell globbing expansion bug on Windows by running the ADK web server directly with:
  `uv run adk web --host 127.0.0.1 --port 8080 --reload_agents`
- Verified the local playground loads successfully on `http://127.0.0.1:8080/dev-ui/?app=expense_agent`.

## Local Evaluation Step
- Created the evaluation dataset [basic-dataset.json](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/tests/eval/datasets/basic-dataset.json) containing 5 diverse test cases.
- Created the trace generator [generate_traces.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/tests/eval/generate_traces.py) which runs the cases E2E, mock-intercepts LLM node calls, automatically resumes paused HITL states with programmatic decisions, and serializes the traces.
- Created [eval_config.yaml](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/tests/eval/eval_config.yaml) to configure `routing_correctness` and `security_containment` metrics.
- Created [grade_traces.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/tests/eval/grade_traces.py) as a faithful offline evaluator since the online `agents-cli grade` command requires Vertex AI billing (which is disabled on this project).
- Added `generate-traces`, `grade`, and `eval` targets to [Makefile](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/Makefile).
- Generated traces and graded them successfully. All 5 test cases passed both evaluation metrics.
- Saved the output markdown scorecard at [eval_scorecard.md](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/artifacts/eval_scorecard.md).


