# 🧾 Day 4 Codelab 1 Notes - Ambient Expense Agent

This codelab made the Day 4 security/evaluation theory practical. The agent was not only generating text; it was processing expense events, making workflow decisions, routing to tools, pausing for human review, and producing evaluation traces.

---

## What changed my thinking

The strongest lesson was that security controls should be part of the workflow graph.

A prompt can tell the model to be careful, but a graph can force the system to route through a checkpoint before the model receives risky input.

That difference matters:

```text
Prompt-only safety: the model tries to behave safely.
Graph-level safety: unsafe paths are structurally harder to reach.
```

---

## Deterministic routing belongs outside the LLM

The expense threshold was intentionally handled in Python.

That felt right because a dollar threshold is policy, not judgment. The LLM can add value when assessing vague risk, but it should not decide whether `$99.99` or `$100.00` crosses the policy boundary.

This mirrors a general security rule: put crisp authorization and routing rules in deterministic code.

---

## PII redaction is not cosmetic

Redaction protects more than the final UI. It also protects:

- model prompts,
- human-review payloads,
- local traces,
- debugging output,
- and later evaluation artifacts.

That is why the redaction happened before the review payload was built.

---

## Prompt injection should not be treated as normal text

A malicious expense description is not just a “weird description.” It is a hostile input trying to change the agent’s behavior.

The codelab handled this by bypassing the LLM review path and escalating to human review. That is a practical version of the Day 4 idea that the harness is the control surface.

---

## Evaluation needs a record

The local scorecard was important because it created evidence beyond screenshots.

A trace file plus scorecard can answer questions like:

- Did the right path execute?
- Did the prompt-injection case avoid the LLM?
- Was the sensitive string redacted?
- Did HITL still receive useful context?

That is much stronger than saying “I tested it manually.”
