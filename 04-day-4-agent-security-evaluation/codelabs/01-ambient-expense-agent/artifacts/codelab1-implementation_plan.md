# Add Security Checkpoint to Expense Approval Workflow

This plan outlines adding a pre-LLM security screen for high-value expenses (>= $100) to redact PII (SSNs and credit cards), detect prompt-injection attacks, and handle parsing errors safely.

## User Review Required

> [!IMPORTANT]
> - Under-$100 clean expenses will continue to be auto-approved without triggering any security screen or LLM calls.
> - Parsing errors will be routed directly to human review via the security screen instead of auto-approving.
> - Prompt injection attempts will bypass the `review_agent` and route directly to human review with security flags.

## Open Questions

None.

## Proposed Changes

### Core Agent Logic

#### [MODIFY] [agent.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/expense_agent/agent.py)
- Create `redact_pii` and `detect_prompt_injection` helper functions.
- Add `security_screen` node that:
  - Sanitizes the description from SSNs and credit cards.
  - Detects prompt injection (phrases like "ignore previous instructions").
  - Routes to `BYPASS_LLM` (goes to `request_approval`) if prompt injection is detected or a parsing error is present.
  - Routes to `CLEAN` (goes to `review_agent`) if clean.
- Update `route_by_amount` to send parsing errors to the `NEEDS_REVIEW` path (which maps to `security_screen`).
- Update `request_approval` and `process_decision` to support warning/info rendering for prompt injection and parsing errors.
- Connect the new graph edges in `root_agent`:
  ```python
  root_agent = Workflow(
      name="root_agent",
      edges=[
          ("START", parse_expense_email, route_by_amount),
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
          (review_agent, request_approval, process_decision),
      ],
  )
  ```

### Tests

#### [MODIFY] [test_agent.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/ambient-expense-agent/tests/integration/test_agent.py)
- Add new test cases to verify:
  - under-$100 clean expense auto-approves without LLM.
  - $100+ clean expense reaches the review path.
  - SSN is redacted before LLM/HITL payload.
  - Credit card number is redacted before LLM/HITL payload.
  - Prompt-injection description bypasses LLM and goes directly to human review.
  - Raw PII strings are not present in the sanitized expense output.

## Verification Plan

### Automated Tests
- Run `agents-cli lint --fix` to verify syntax and formatting.
- Run `uv run pytest` to execute all integration tests.
