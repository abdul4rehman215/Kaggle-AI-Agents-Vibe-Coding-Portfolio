# 🧠 Day 1 Key Concepts

A compact glossary of the ideas I want to keep using throughout the course.

---

## ✨ Vibe coding

Building software by describing the desired result in natural language and iterating with an AI tool.

Useful for fast prototypes, but weak if the human does not review output carefully.

---

## 🧱 Agentic engineering

A more disciplined version of AI-assisted development.

It adds structure around the AI:

- requirements,
- constraints,
- tool boundaries,
- review,
- tests,
- logs,
- deployment notes,
- and human checkpoints.

---

## 🤖 Agent

A system that uses a model plus surrounding capabilities to pursue a task.

The model reasons. The surrounding system gives it tools, memory, context, execution ability, permissions, and feedback loops.

---

## 🧩 Harness

The non-model part of the agent system.

Examples:

- tools,
- sandboxes,
- orchestrators,
- MCP servers,
- skills,
- guardrails,
- CI/CD checks,
- evaluation loops,
- and human review steps.

The harness is what turns a model response into a controlled workflow.

---

## 📦 Artifact

A reviewable output created during the workflow.

Examples from Day 1:

- implementation plan,
- generated code diff,
- terminal output,
- screenshot,
- exported app source,
- deployment note,
- code-review result.

Artifacts matter because they make the work inspectable later.

---

## 🧠 Context engineering

The skill of giving an agent the right information at the right time.

Good context is specific, relevant, and bounded. Bad context is either missing, vague, too broad, or mixed with unrelated instructions.

---

## 🛠️ Agent skill

A reusable instruction bundle that can be loaded when a particular task is needed.

In Day 1, the `code-review` skill stored a review checklist instead of asking the agent to remember the process from a one-off prompt.

---

## 🎯 Specification quality

How clearly the desired behavior is described.

As AI speeds up implementation, specification quality becomes more important. A vague request can still produce working-looking code, but the output may not match the real need.

---

## ✅ Verification loop

The process of checking the output before trusting it.

A verification loop may include:

- running the app,
- reading the source,
- checking terminal output,
- testing edge cases,
- reviewing screenshots,
- deploying safely,
- and cleaning up resources.

---

## 👀 Human in the loop

A human review point where the agent should not continue blindly.

This is especially important when the agent touches:

- credentials,
- cloud services,
- production code,
- security-sensitive files,
- billing-related resources,
- or external systems.

---

## 🧪 IUS: impressive, useful, sustainable

A practical way to judge AI builds:

- **Impressive:** looks good as a demo.
- **Useful:** solves a real problem repeatedly.
- **Sustainable:** is maintainable, safe, cost-aware, and scalable.

The Day 1 AI Studio app is mostly in the impressive/exploratory category, while the documentation work moves it closer to useful as learning evidence.
