# 🧪 Day 3 Codelabs

This folder contains the hands-on Day 3 codelab work for **Agent Skills & Procedural Memory**.

Day 3 had two practical angles. The first codelab focused on packaging reusable procedures as Antigravity Skills. The second codelab focused on using Agents CLI and ADK 2.0 to build, test, and run a graph workflow agent.

| Codelab | Status | Folder | What it demonstrates |
|---|---|---|---|
| Authoring / Exploring Google Antigravity Skills | ✅ Completed | [`01-antigravity-skills/`](./01-antigravity-skills/) | Workspace skill installation, `SKILL.md` structure, routing descriptions, resources, scripts, examples, validation tests, and Agents CLI skill installation. |
| Agents CLI + ADK lifecycle | ✅ Completed | [`02-agents-cli-adk-lifecycle/`](./02-agents-cli-adk-lifecycle/) | Agent project scaffolding, ADK graph workflow design, local Gemini API-key mode, linting, playground traces, response-style iteration, and CLI execution. |

---

## 🧭 How these two codelabs fit together

The Day 3 theory work explains why agents need procedural memory. These codelabs show what that looks like in practice.

The first codelab answered:

> How can a reusable workflow be packaged so an agent loads the right instructions only when a task needs them?

The second codelab answered:

> How can a generated agent project move through a real development lifecycle: scaffold, inspect, patch, lint, run, test, and document?

Together, they connect the concept of **skills as procedural memory** with the engineering workflow needed to build reliable agents.

---

## 📁 Folder guide

| Folder | Use when reviewing |
|---|---|
| [`01-antigravity-skills/`](./01-antigravity-skills/) | Review Antigravity Skills setup, skill package structure, skill tests, Agents CLI setup, and the weather assistant prototype limitation. |
| [`02-agents-cli-adk-lifecycle/`](./02-agents-cli-adk-lifecycle/) | Review the customer support graph workflow agent, validation steps, ADK playground evidence, hot-restart testing, and CLI query execution. |

Screenshot evidence for both codelabs is stored in the Day 3 [`screenshots/`](../screenshots/) folder.
