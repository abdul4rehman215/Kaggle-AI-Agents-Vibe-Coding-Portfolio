# Testing and Validation - Ambient Expense Agent

This file records how the Codelab 1 implementation was validated.

---

## Automated tests

The final test run passed all available tests:

```text
tests/integration/test_agent.py .....
tests/integration/test_server_e2e.py ...
tests/unit/test_dummy.py .
9 passed
```

The tests covered the important workflow paths:

- under-threshold clean expense auto-approval,
- high-value expense review routing,
- SSN redaction,
- credit-card-like number redaction,
- prompt-injection detection,
- LLM bypass for malicious descriptions,
- and HITL review behavior.

---

## Linting

`agents-cli lint --fix` completed successfully after formatting and type checks.

This mattered because the codelab involved repeated graph edits. Linting kept the implementation clean while the workflow topology changed.

---

## Playground validation

The local ADK Playground loaded the expense workflow graph and showed the actual nodes used by the agent.

Key manual checks:

| Scenario | Expected behavior | Result |
|---|---|---|
| Clean low-value expense | Auto-approve without LLM review | ✅ Verified |
| Clean high-value expense | Security screen → review agent → human approval | ✅ Verified |
| PII in description | Redact before downstream review payload | ✅ Verified |
| Prompt-injection text | Bypass review LLM and route to human review | ✅ Verified |
| Parsing uncertainty | Escalate instead of auto-approving | ✅ Verified |

---

## Evaluation scorecard

The local scorecard checked two metrics:

| Metric | Meaning |
|---|---|
| Routing correctness | The workflow selected the expected path for each expense case. |
| Security containment | Prompt injection and sensitive content were contained instead of reaching the wrong node. |

Final result: all 5 dataset cases passed both metrics.
