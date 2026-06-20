# 🖥️ Codelab 2 Review - Frontend Dashboard for an ADK Agent

This codelab builds on the Agent Runtime deployment from Codelab 1. It gives the deployed Ambient Expense Agent a frontend, an event ingestion path, and a human review loop.

I reviewed it as an architecture exercise: how the user-facing dashboard, Pub/Sub pipeline, session service, and deployed agent fit together.

---

## 🎯 Purpose

The previous lab makes the agent available in the cloud. This lab makes the agent usable in a more realistic workflow.

Instead of sending direct console/API requests to the agent, the codelab adds:

- a manager dashboard,
- an asynchronous Pub/Sub event pipeline,
- a direct push path into Agent Runtime,
- and approve/reject actions for paused human-in-the-loop sessions.

This is the bridge from “agent backend exists” to “someone can operate it.”

---

## 🔗 Dependency on Codelab 1

This lab assumes the Ambient Expense Agent is already deployed to Agent Runtime. It needs the remote runtime ID and project context from the previous deployment.

That dependency matters because the frontend is not a separate toy app. It is built around a live agent backend and its session state.

```text
Codelab 1 gives the agent a runtime.
Codelab 2 gives the runtime a product-facing workflow.
```

---

## 🧱 What the lab builds

The codelab creates an event-driven approval architecture:

```text
Expense payload
  -> Pub/Sub topic
  -> OIDC-authenticated push subscription
  -> Agent Runtime query endpoint
  -> ADK expense workflow
      -> under $100: auto approval
      -> $100 or more: RequestInput pause
  -> Agent Platform Session Service
  -> Cloud Run Manager Dashboard
  -> approve / reject
  -> resume agent execution
```

The manager dashboard is a FastAPI application deployed to Cloud Run. It queries pending sessions and sends decisions back to Agent Runtime.

---

## 🧭 Reconnect and align environment

The lab starts by reconnecting Antigravity to the existing project and confirming three things:

| Check | Why it matters |
|---|---|
| ADK skills are loaded | The IDE needs the right workflows to reason about ADK structures. |
| Cloud project is configured | Cloud Run, Pub/Sub, Agent Platform, and Cloud Build need correct project context. |
| Existing agent is found | The dashboard must connect to the deployed runtime, not modify agent logic blindly. |

The prompt explicitly says the agent code is not being changed. I liked that boundary because it keeps this lab focused on integration, not accidental rewrites.

---

## 🧑‍💼 Manager dashboard flow

The codelab asks Antigravity to create a `submission_frontend/` folder with a FastAPI app.

The dashboard service includes three main endpoints:

| Endpoint | Role |
|---|---|
| `GET /` | Serves the interactive manager dashboard page. |
| `GET /api/pending` | Queries the ADK session service for paused sessions. |
| `POST /api/action/{session_id}` | Resumes a paused agent session with an approve/reject decision. |

The frontend is not just decoration. It is the human-in-the-loop control surface.

---

## ☁️ Cloud Run deployment

The dashboard is deployed as:

```text
expense-manager-dashboard
```

The codelab sets environment variables such as:

```text
GOOGLE_CLOUD_PROJECT
AGENT_RUNTIME_ID
```

It also grants the Cloud Run service account `roles/aiplatform.user`, allowing the dashboard to query sessions and resume the agent workflow.

My takeaway: even a simple dashboard becomes production work once identity and permissions are involved.

---

## 📩 Pub/Sub event pipeline

The event pipeline uses two topics:

| Topic | Purpose |
|---|---|
| `expense-reports` | Main ingestion topic for incoming expense payloads. |
| `expense-reports-dead-letter` | Stores messages that fail delivery after retries. |

The dead-letter topic is important because production systems need a place for failed events to land. Otherwise, failed messages disappear into logs and become hard to audit.

---

## 🔐 Pub/Sub to Agent Runtime

The codelab wires Pub/Sub directly to Agent Runtime using an authenticated push subscription.

Important details:

| Piece | Role |
|---|---|
| `pubsub-invoker` service account | Identity used by Pub/Sub to invoke the agent. |
| `roles/aiplatform.user` | Permission needed to query/invoke the Agent Runtime. |
| OIDC push authentication | Lets Pub/Sub call the runtime endpoint securely. |
| `--push-no-wrapper` | Sends the raw JSON payload instead of the Pub/Sub envelope. |
| dead-letter policy | Routes failed messages after repeated delivery failures. |

The `--push-no-wrapper` detail stood out because it shows how small integration settings decide whether the downstream agent receives the expected schema or a wrapped event it cannot parse.

---

## 🧪 End-to-end scenarios reviewed

The lab validates three practical scenarios.

| Scenario | What it checks |
|---|---|
| Low-value expense under `$100` | The agent auto-approves immediately and nothing appears in the manager queue. |
| High-value expense over `$100` | The agent pauses and the dashboard surfaces the pending approval. |
| Malicious high-value payload | The security path catches the risky request and the manager rejects it. |

The prompt-injection test connects strongly to Day 4. It shows why security and evaluation work cannot be separated from production deployment.

---

## 🧹 Cleanup path

The cleanup step removes:

- the Cloud Run service,
- the Pub/Sub push subscription,
- the Pub/Sub topics,
- and the invoker service account.

The lab also notes that the underlying Agent Runtime deployment can be decommissioned if it is no longer needed.

My takeaway: in a cloud lab, cleanup is not optional housekeeping. It is part of the safe operating procedure.

---

## 🧠 My takeaway

This codelab shows the difference between a deployed agent and an operable system.

The agent alone can make decisions, but a production workflow also needs event ingestion, identity, routing, human review, UI, logs, retries, and cleanup.

```text
The frontend is not just a UI.
It is the human checkpoint layer around the agent.
```
