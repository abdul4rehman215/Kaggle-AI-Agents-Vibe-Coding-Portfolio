# 🧾 Codelab 1 - Ambient Expense Agent Security & Evaluation

This codelab built an **ADK 2.0 ambient expense approval agent** and then hardened it with the security and evaluation controls from Day 4.

The final agent is not just a demo that calls an LLM. It has deterministic policy routing, a security screen before the review model, human-in-the-loop approval, and local evaluation artifacts that prove routing and security containment.

---

## 🎯 What I built

The final project is preserved as a cleaned source snapshot in [`source/ambient-expense-agent/`](./source/ambient-expense-agent/).

At a high level, it handles expense events with fields such as:

```text
amount
submitter
category
description
date
```

It supports both local JSON-style testing and Pub/Sub-style encoded payloads. The workflow then routes the expense through deterministic Python logic before deciding whether a review model or a human approval step is needed.

---

## 🧭 Workflow graph

The final graph topology was:

```text
START
  -> parse_expense_email
  -> route_by_amount
       AUTO_APPROVE -> auto_approve
       NEEDS_REVIEW -> security_screen
            CLEAN -> review_agent -> request_approval -> process_decision
            BYPASS_LLM -> request_approval -> process_decision
```

The important engineering choice is that the dollar threshold stays in Python code. The LLM is used only for risk judgment after the deterministic route has already decided that review is required.

![Expense workflow graph in ADK Playground](../../screenshots/codelab-1-ambient-expense-agent/09-playground-expense-agent-graph.png)

---

## 🛡️ Security checkpoint

The codelab inserted a `security_screen` node before the LLM review path.

The screen handled three practical concerns:

| Control | Why it matters |
|---|---|
| PII redaction | Sensitive identifiers should not be blindly passed into prompts, logs, or human-review payloads. |
| Prompt-injection detection | Malicious instructions in an expense description should not be handed to the LLM review node as normal business text. |
| Parsing-error escalation | Unclear or malformed expense data should fail safely into human review instead of being auto-approved. |

![PII redaction and malicious input handling](../../screenshots/codelab-1-ambient-expense-agent/10-malicious-expense-pii-redaction-proof.png)

![Prompt-injection bypass proof](../../screenshots/codelab-1-ambient-expense-agent/11-prompt-injection-bypass-proof.png)

---

## 👤 Human-in-the-loop behavior

High-value or suspicious expenses do not disappear into automatic processing. They pause for a human reviewer.

That matters because security controls are only useful if the handoff gives the human enough context to make a decision. The workflow stores parsed and sanitized expense fields in state so the review payload remains clear without leaking raw sensitive strings.

![Human review routing proof](../../screenshots/codelab-1-ambient-expense-agent/12-human-review-routing-proof.png)

---

## 📊 Local evaluation strategy

The hosted grading path was blocked by environment constraints, so I built a local evaluation path instead of pretending that step succeeded.

The local evaluator included:

- a dataset with five representative expense cases,
- a trace generator that exercised the workflow end to end,
- a grader that checked routing correctness and security containment,
- and a markdown scorecard saved as an artifact.

![Trace generation and offline evaluation code](../../screenshots/codelab-1-ambient-expense-agent/14-eval-trace-generator-code.png)

![Routing and security scorecard](../../screenshots/codelab-1-ambient-expense-agent/18-eval-scorecard-routing-security.png)

---

## ✅ Final validation summary

| Check | Result |
|---|---|
| `agents-cli lint --fix` | ✅ Passed |
| `uv run pytest` | ✅ Passed with 9 tests |
| Local ADK Playground | ✅ Loaded and displayed workflow graph |
| PII redaction path | ✅ Verified |
| Prompt-injection bypass path | ✅ Verified |
| Trace generation | ✅ Completed |
| Offline grader | ✅ Completed |
| Evaluation scorecard | ✅ All 5 cases passed routing and security containment metrics |

---

## 📁 Codelab folder guide

| File / Folder | Purpose |
|---|---|
| [`commands-used.md`](./commands-used.md) | Main setup, implementation, test, playground, and evaluation commands. |
| [`testing-and-validation.md`](./testing-and-validation.md) | Validation record for linting, pytest, playground, and local eval. |
| [`security-implementation-notes.md`](./security-implementation-notes.md) | Notes on the security checkpoint, routing logic, and state handling. |
| [`evaluation-notes.md`](./evaluation-notes.md) | Explanation of the local trace and grading approach. |
| [`troubleshooting-notes.md`](./troubleshooting-notes.md) | Honest notes about model/billing/API compatibility and Windows command behavior. |
| [`artifacts/`](./artifacts/) | Scorecard, traces, and implementation-planning evidence. |
| [`source/ambient-expense-agent/`](./source/ambient-expense-agent/) | Cleaned source snapshot of the working ADK project. |

---

## 🧠 What I learned

This codelab made one Day 4 idea feel practical: **security has to be in the graph, not only in the prompt**.

If the system relies on the LLM to decide every policy boundary, then the boundary is soft. When the workflow uses deterministic routing, explicit security checks, and human review for high-risk cases, the agent starts to look more like an engineered system than a free-form chatbot.
