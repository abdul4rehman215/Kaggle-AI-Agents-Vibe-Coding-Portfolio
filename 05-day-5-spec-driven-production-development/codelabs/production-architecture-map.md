# 🏗️ Production Architecture Map

This file connects both Day 5 codelabs into one architecture map. The first codelab deploys the ADK agent. The second codelab wraps that deployed agent with an event pipeline and a manager dashboard.

---

## 🔁 End-to-end flow

```text
External finance system / email
  -> publishes expense JSON
  -> Pub/Sub topic: expense-reports
  -> OIDC push subscription: expense-reports-push
  -> Agent Runtime :query endpoint
  -> Ambient Expense Agent ADK graph
      -> amount < $100
          -> auto approve
          -> finish
      -> amount >= $100
          -> RequestInput pause
          -> persist state in Session Service
  -> Cloud Run Manager Dashboard
      -> GET /api/pending
      -> manager clicks Approve or Reject
      -> POST /api/action/{session_id}
  -> Agent Runtime resumes execution
  -> Cloud Trace / Cloud Logging capture behavior
```

This is the production shape I took from the codelabs: the agent is only one piece. The surrounding cloud services define how inputs arrive, how decisions pause, how humans intervene, and how the system can be inspected later.

---

## 🧩 Services and responsibilities

| Component | Responsibility |
|---|---|
| ADK graph workflow | Encodes the expense approval logic and HITL pause path. |
| `agents-cli` | Scaffolds, enhances, dry-runs, deploys, and manages the agent lifecycle. |
| Agent Runtime | Hosts the agent as a managed cloud runtime. |
| Agent Platform Session Service | Stores paused session state for human review. |
| Cloud Run | Hosts the manager dashboard as a serverless web app. |
| FastAPI dashboard | Lists pending sessions and sends approve/reject decisions. |
| Pub/Sub topic | Accepts incoming expense events asynchronously. |
| Pub/Sub push subscription | Delivers events directly to Agent Runtime. |
| Dead-letter topic | Holds messages that cannot be delivered successfully. |
| IAM service accounts | Give Pub/Sub and Cloud Run controlled permission to invoke/query runtime services. |
| Cloud Trace | Shows transaction maps, spans, latency, and tool execution paths. |
| Cloud Logging | Captures runtime logs and diagnostic output. |
| Agent Registry | Makes the deployed agent discoverable after Agent Runtime deployment. |

---

## 🧠 Runtime path

The runtime path handles normal agent execution.

```text
input expense
  -> agent evaluates amount
  -> branch decision
  -> produce approval or pause
```

The key branch is intentionally simple:

| Amount | Runtime behavior |
|---|---|
| `< $100` | Low-risk path, auto-approved. |
| `>= $100` | Higher-risk path, paused for manager review. |

The point is not the dollar amount itself. The point is the architectural pattern: ordinary cases can be automated, but riskier cases need a checkpoint.

---

## 🧑‍⚖️ Human review path

The human review path starts when the ADK workflow reaches `RequestInput`.

```text
RequestInput pause
  -> session state persists
  -> dashboard queries pending sessions
  -> manager chooses approve or reject
  -> dashboard sends decision
  -> agent resumes
```

This is the practical version of HITL from the whitepaper. The human is not reading raw logs or editing JSON manually. The human gets a dedicated review surface.

---

## 📩 Event ingestion path

The Pub/Sub part decouples the external producer from the agent.

```text
Producer does not call the agent directly.
Producer publishes to Pub/Sub.
Pub/Sub delivers to Agent Runtime.
```

This matters because production systems need buffering, retries, dead-letter handling, and independent scaling. Direct calls are simpler, but less robust.

---

## 🔐 Identity and permission path

The codelabs show that production AI systems need explicit identity boundaries.

| Boundary | Why it matters |
|---|---|
| Cloud Run service account | Dashboard needs permission to query and resume agent sessions. |
| Pub/Sub invoker service account | Pub/Sub needs a controlled identity to call Agent Runtime. |
| OIDC authentication | Push delivery should be authenticated, not anonymous. |
| IAM role grants | Services get only the access needed for the workflow. |

My note: this is where “production” becomes real. The model is not the security boundary. IAM, service accounts, runtime checks, and policy decisions are the boundary.

---

## 👀 Observability path

Observability appears in both codelabs.

| Tool | What I would inspect after execution |
|---|---|
| Cloud Trace | Which node ran, how long model/tool steps took, where HITL paused. |
| Cloud Logging | Errors, stdout, stack traces, and event handling issues. |
| BigQuery analytics | Approval ratios, rejection rates, and workflow trends if analytics were enabled. |
| Agent Runtime sessions | Full session trace for approval/rejection decisions. |

For agents, observability is not just uptime monitoring. It is part of understanding why an agent took a path.

---

## 🛡️ Security and governance points

The architecture has several natural control points:

| Control point | What it can protect |
|---|---|
| Input validation | Bad payload shape, missing amount, malformed message. |
| Pub/Sub dead-letter topic | Repeated delivery failures and poison messages. |
| IAM permissions | Unauthorized service-to-service calls. |
| HITL threshold | High-risk financial decisions. |
| Dashboard decision endpoint | Controlled approve/reject path. |
| Logging / traces | Auditability after decisions. |
| Prompt-injection test scenario | Malicious content attempting to override policy. |

This continues the Day 4 security theme. The architecture should assume the agent can be useful and still require guardrails.

---

## 🧹 Cleanup responsibilities

The combined architecture creates several resources that need cleanup after a real run:

```text
Agent Runtime deployment
Artifact Registry image repository
Cloud Run dashboard service
Pub/Sub push subscription
Pub/Sub topics
Invoker service account
Local deployment metadata
```

I like that both codelabs end with cleanup. In cloud work, the cleanup step is part of the learning, not an optional extra.

---

## 🔗 How this connects to the whitepaper

| Whitepaper idea | Codelab architecture example |
|---|---|
| Code is not enough | The solution needs runtime, events, dashboard, logs, identity, and cleanup. |
| Spec-driven behavior | The approval threshold creates clear behavior branches. |
| Human-in-the-loop | High-value expenses pause and wait for manager input. |
| Zero-trust thinking | Service accounts and IAM control who can call what. |
| Evaluation beyond tests | Prompt-injection scenario checks behavior under malicious input. |
| Observability | Trace/log views explain what happened during execution. |
| Production reality | Local agent becomes a hosted, event-driven, reviewable workflow. |

---

## ✅ Final architecture takeaway

The two codelabs together describe a realistic pattern for production agents:

```text
Automate routine work.
Pause risky work.
Give humans a clean review surface.
Log enough to explain the result.
Clean up what you create.
```
