# 🧪 Day 4 Codelabs - Security Boundaries, Evaluation, and Secure Agent Development

This folder documents the completed Day 4 hands-on work.

Day 4 had two practical tracks:

| Codelab | Focus | Final artifact |
|---|---|---|
| [`01-ambient-expense-agent/`](./01-ambient-expense-agent/) | Securing and evaluating a running ADK workflow | Ambient expense approval agent with PII redaction, prompt-injection bypass, HITL review, and local eval scorecard |
| [`02-secure-agent-lifecycle/`](./02-secure-agent-lifecycle/) | Securing the development lifecycle around an agent | Shopping assistant with secure project rules, Semgrep, pre-commit, Antigravity hooks, STRIDE threat modeling, tests, and Playground proof |

The two codelabs connect cleanly:

```text
Codelab 1 -> secure the running agent workflow.
Codelab 2 -> secure the way the agent is built, tested, changed, and committed.
```

That made Day 4 feel less like a collection of tools and more like a security engineering pattern. The workflow needs runtime containment, and the development process needs guardrails before unsafe code reaches the repo.

---

## 📁 Folder guide

| Folder | What to review |
|---|---|
| [`01-ambient-expense-agent/`](./01-ambient-expense-agent/) | ADK workflow graph, security checkpoint, PII redaction, prompt-injection handling, human review path, trace generation, and offline evaluation. |
| [`02-secure-agent-lifecycle/`](./02-secure-agent-lifecycle/) | `.agents/CONTEXT.md`, Semgrep rule, pre-commit config, Antigravity hook, STRIDE skill, TDD planning gate, tests, self-correction, and local Playground proof. |

Screenshot evidence for both codelabs is stored in the Day 4 [`screenshots/`](../screenshots/) folder and indexed in [`screenshots-index.md`](./screenshots-index.md).

---

## 🧭 Evidence strategy

I kept the documentation split into separate files so the README pages stay readable:

- `README.md` explains the story and architecture.
- `commands-used.md` captures the important commands.
- `testing-and-validation.md` records what passed and what failed intentionally.
- troubleshooting files keep environment issues honest without distracting from the main flow.
- source snapshots preserve the actual code without virtual environments, session databases, or runtime caches.
