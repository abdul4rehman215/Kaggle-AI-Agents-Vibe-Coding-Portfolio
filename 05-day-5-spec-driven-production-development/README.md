# 🚀 Day 5 - Spec-Driven Production Development

This folder documents the theory phase of Unit 5 from the **Google/Kaggle 5-Day AI Agents Intensive Vibe Coding Course**.

Day 5 focused on the move from fast vibe-coded prototypes to production-grade agentic software. The main idea is that production reliability does not come from trusting generated code more. It comes from tightening the process around the code: specs, review boundaries, tests, evaluation, policy checks, sandboxing, and human checkpoints.

---

## 📌 Current status

| Area | Status | Notes |
|---|---|---|
| Unit 5 podcast | ✅ Completed | Listened to the summary podcast and converted the main ideas into study notes. |
| Spec-driven development whitepaper | ✅ Completed | Read the whitepaper and mapped the core ideas into documentation. |
| NotebookLM review | ✅ Completed | Used study guide, Q&A, quiz-style review, and explainer material for revision. |
| Visual revision | ✅ Completed | Added two infographics created during study revision. |
| Optional codelab 1 | Pending | Deploy and host an ADK agent on Google Cloud. Not attempted yet because this may require billing. |
| Optional codelab 2 | Pending | Build a frontend web app and connect it to the hosted agent. Not attempted yet. |

This is a **Phase 1 theory folder**. The optional cloud codelabs will be documented later if I choose to run them.

---

## 🧠 Main learning summary

The strongest idea from Day 5 is that AI has changed where the bottleneck sits.

Earlier, a lot of development effort went into manually writing code, debugging syntax, and searching documentation. With coding agents, the code can appear very quickly. That feels productive, but it can also create a new problem: thousands of lines of code can be generated before the design is actually stable.

My current mental model is:

```text
Vibe coding works for prototypes.
Spec-driven development is needed for production.
```

A vibe-coded prototype can prove an idea. A production system needs a stronger contract. That contract is the specification: what the system should do, what it must not do, what the edge cases are, what tools it can use, what needs human review, and how the result will be tested or evaluated.

The whitepaper's phrase that stayed with me is that **code becomes disposable**. I do not read that as "code does not matter." I read it as: the implementation is no longer the most stable artifact. The spec is the thing worth protecting, reviewing, versioning, and improving.

---

## 🖼️ Visual study assets

I used two visual summaries while revising the Day 5 material.

| Asset | Purpose |
|---|---|
| [`spec-driven-development-workflow.png`](./assets/infographics/spec-driven-development-workflow.png) | A workflow-style map from vibe coding to spec-first development, BDD, policy checks, sandboxing, and reliable output. |
| [`from-vibe-coding-to-production.png`](./assets/infographics/from-vibe-coding-to-production.png) | A blueprint-style summary showing the production safety net: sandboxing, HITL, and policy server controls. |

![Spec-driven development workflow](./assets/infographics/spec-driven-development-workflow.png)

---

## 📁 Folder contents

| File / Folder | Purpose |
|---|---|
| [`notes/day-5-podcast-whitepaper-notes.md`](./notes/day-5-podcast-whitepaper-notes.md) | Main theory notes from the podcast, whitepaper, and revision material. |
| [`notes/day-5-key-concepts.md`](./notes/day-5-key-concepts.md) | Compact revision map for the most important Day 5 terms. |
| [`notes/day-5-study-guide-summary.md`](./notes/day-5-study-guide-summary.md) | Study process, recall prompts, and how I reviewed the material before codelabs. |
| [`resources/day-5-links.md`](./resources/day-5-links.md) | Official podcast, whitepaper, optional codelabs, and related references. |
| [`resources/source-material-note.md`](./resources/source-material-note.md) | What was used, what was committed, and what was intentionally left out. |
| [`assets/infographics/`](./assets/infographics/) | Visual study assets created during the theory phase. |

---

## 🧩 What clicked for me

The main thing that clicked is that production-grade agent development is less about asking the agent to be perfect and more about designing the rails around it.

A few ideas became clear:

- **Specs reduce guessing.** The agent should not have to infer business rules from vague prompts.
- **Generated code still needs boundaries.** The faster code appears, the more important review, testing, and policy become.
- **Behavior is more stable than implementation.** Code can be regenerated, but expected behavior should be preserved.
- **Security cannot live only in prompts.** Sandboxes, policy servers, and human checkpoints are external controls, not motivational instructions to the model.
- **Testing and evaluation are different.** Tests catch deterministic failures; evaluation catches quality drift and behavior changes.

---

## 🏗️ From vibe prototype to production reality

The Day 5 flow can be summarized like this:

```text
High-level idea
  -> production specification
  -> BDD scenarios and structured config
  -> agent implementation
  -> tests and evaluation
  -> review and policy checks
  -> sandboxed or governed deployment
```

This is a different mindset from writing a prompt, accepting generated files, and cleaning up later. The cleanup-later approach is risky because AI can create technical debt at the same speed it creates code.

The better habit is to move design decisions earlier:

```text
Do not ask the agent to guess the system.
Give the agent a reviewed blueprint and make it build against that blueprint.
```

---

## 🛡️ Production safety net

The production safety net has multiple layers:

| Layer | What it controls | My practical takeaway |
|---|---|---|
| Specification | What the system should do | Keep the source of truth in version-controlled docs, not only in chat history. |
| BDD / Gherkin | Expected behavior | Use `Given / When / Then` to remove vague intent. |
| Tests | Deterministic correctness | Ask for failing tests or reproduction commands before fixes. |
| Evaluation | Behavioral quality | Use scored checks when exact outputs are not enough. |
| Sandboxing | Execution blast radius | Run agent actions in isolated, disposable environments. |
| HITL | High-risk decisions | Require human sign-off for deployment, money, schema changes, or sensitive data actions. |
| Policy server | Runtime governance | Intercept actions before they reach external systems. |
| Context hygiene | Data safety | Keep sensitive data out of prompts, test logs, and agent memory. |

This makes the system safer without pretending that the model is deterministic.

---

## ⏭️ Next work: optional codelabs

The next step is to review or complete the optional cloud codelabs:

1. Deploy and host the ADK expense agent on Google Cloud.
2. Build a frontend dashboard and connect it to the hosted agent through an event-driven flow.

I am not documenting those as completed yet. If I run them later, I will add codelab folders, command logs, screenshots, cleanup notes, and billing-safety notes in the same style as previous days.

---

## ✅ Current takeaway

Day 5 reframed vibe coding for me.

The goal is not to stop using fast AI-assisted development. The goal is to make that speed safe enough to use in real systems.

```text
Generation is no longer the hard part.
Specification, verification, governance, and integration are the real craft.
```
