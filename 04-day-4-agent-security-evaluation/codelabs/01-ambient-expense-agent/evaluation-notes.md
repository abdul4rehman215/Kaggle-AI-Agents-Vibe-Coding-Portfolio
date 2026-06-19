# Evaluation Notes - Ambient Expense Agent

The codelab expected an evaluation step, but the cloud grading path was not available in the local project because Vertex/billing access was blocked. I kept the evaluation honest by creating a local trace-and-grade path.

---

## Evaluation dataset

The dataset included five representative cases:

- clean low-value expense,
- clean high-value expense,
- SSN redaction case,
- credit-card redaction case,
- prompt-injection attempt.

That mix tested both routing and containment instead of only the happy path.

---

## Trace generation

`generate_traces.py` ran the cases through the workflow, intercepted the LLM review node where needed, resumed HITL states programmatically, and serialized the observed traces.

Output:

```text
artifacts/traces/generated_traces.jsonl
```

---

## Offline grading

`grade_traces.py` checked the traces against expected behavior.

The local evaluator focused on:

- whether the workflow chose the correct route,
- whether prompt-injection attempts bypassed the LLM,
- whether sensitive content was redacted,
- and whether human review received the correct sanitized context.

Final scorecard:

```text
artifacts/eval_scorecard.md
```

The final scorecard showed all 5 cases passing both routing correctness and security containment.
