# Security Implementation Notes - Ambient Expense Agent

The main security work in this codelab was inserting a pre-LLM checkpoint into the workflow.

---

## Why the checkpoint sits before the LLM

A prompt-injection attempt inside an expense description is not normal business context. If that text is sent directly to the risk-review LLM, the model has to defend itself while also performing the review task.

The better boundary is structural:

```text
High-value expense
  -> security_screen
       CLEAN      -> LLM review
       BYPASS_LLM -> human review
```

The workflow does not ask the LLM to decide whether the text is safe for the LLM. The Python node makes that containment decision first.

---

## PII redaction

The helper logic redacts sensitive-looking values from the expense description before the payload moves deeper into the workflow.

Examples:

- US-style SSN format: `###-##-####`
- credit-card-like digit sequences

The goal is not to build a perfect DLP engine. The goal is to show the control pattern: sanitize before model review and human-review rendering.

---

## Prompt-injection detection

The detector checked suspicious instruction phrases such as:

- ignore previous instructions,
- bypass rules,
- approve without review,
- reveal hidden instructions.

When the detector flagged a description, the workflow routed directly to human review with warning state instead of sending that description through the review model.

---

## State handling fix

One important implementation detail was storing parsed and sanitized fields at the root state level. That prevented instruction interpolation failures in the LLM review node and made the human-review payload more consistent.

This was a useful reminder: in graph agents, security controls and state layout are connected. A clean security node still has to feed downstream nodes with the exact fields they expect.
