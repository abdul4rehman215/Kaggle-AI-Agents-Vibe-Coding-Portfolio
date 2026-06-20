# 🧪 Day 5 Optional Codelabs - Review Notes

This section documents my review of the two optional Day 5 codelabs. I went through the full codelab steps and used them as an architecture walkthrough for productionizing an ADK agent.

The important distinction for this folder: these are **review notes**, not deployment evidence. I studied the workflow, services, prompts, commands, test cases, and cleanup path, but I did not create live Google Cloud resources in this pass.

---

## 📌 Current status

| Codelab | Status | What was captured |
|---|---|---|
| Deploy ADK agent to Agent Runtime | ✅ Reviewed | Deployment path, `agents-cli` flow, Agent Runtime concepts, test cases, observability, registry, cleanup. |
| Vibecode frontend for ADK agent | ✅ Reviewed | Cloud Run dashboard, Pub/Sub pipeline, OIDC push subscription, HITL approval loop, end-to-end test scenarios, cleanup. |

---

## 🧭 Why this section exists

The whitepaper explains the mindset shift: code generation is no longer the full problem. The harder part is turning generated work into something that can be packaged, verified, deployed, observed, governed, and cleaned up.

The codelabs make that idea concrete. They show what production-grade agent work starts to look like when an agent leaves the local machine and becomes part of a cloud architecture.

---

## 🏗️ Codelab path at a glance

```text
Codelab 1
Local ADK expense agent
  -> agents-cli setup and skills
  -> production deployment wrappers
  -> uv lock and dry-run verification
  -> Agent Runtime deployment
  -> live tests, traces, logs, registry, cleanup

Codelab 2
Deployed Agent Runtime backend
  -> FastAPI manager dashboard
  -> Cloud Run deployment
  -> Pub/Sub event ingestion
  -> OIDC push subscription
  -> HITL approval / rejection loop
  -> end-to-end tests and cleanup
```

---

## 🧠 What I learned from reviewing them

The two codelabs connect the Day 5 theory to a real production architecture:

- `agents-cli` turns local ADK work into deployable cloud artifacts.
- Agent Runtime gives the agent a managed backend instead of a localhost-only lifecycle.
- Cloud Trace and Cloud Logging make agent behavior inspectable after deployment.
- Pub/Sub decouples external expense events from agent execution.
- Cloud Run gives the human reviewer a proper dashboard instead of forcing direct console/API interaction.
- Human-in-the-loop is not just a concept; it becomes a persisted paused session that a manager can resolve.
- Cleanup is part of the architecture. A cloud lab is not finished until the resources are removed or intentionally kept.

---

## 📁 Files in this codelab section

| File | Purpose |
|---|---|
| [`codelab-1-agent-runtime-review.md`](./codelab-1-agent-runtime-review.md) | Notes on deploying the ADK expense agent to Agent Runtime. |
| [`codelab-2-frontend-dashboard-review.md`](./codelab-2-frontend-dashboard-review.md) | Notes on the Cloud Run dashboard and Pub/Sub event pipeline. |
| [`production-architecture-map.md`](./production-architecture-map.md) | One combined architecture map across both codelabs. |
| [`execution-boundary-note.md`](./execution-boundary-note.md) | Clear boundary between reviewed architecture and actual cloud execution. |

---

## ✅ Codelab review takeaway

The practical lesson is that production agent work is a system problem, not only a model problem.

```text
Agent logic matters.
Runtime, identity, event flow, observability, review, and cleanup matter just as much.
```
