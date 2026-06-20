# 🚀 Codelab 1 Review - Deploy ADK Agent to Agent Runtime

This codelab shows how a local ADK 2.0 agent can be prepared for production hosting on Google Cloud Agent Runtime using `agents-cli` and Antigravity.

I treated this lab as a production deployment walkthrough: what would be installed, what files would be generated, what checks would run before deployment, how the live agent would be tested, and how resources would be cleaned up.

---

## 🎯 Purpose

The lab moves an **Ambient Expense Agent** from local development into a managed cloud runtime.

The agent's business behavior is simple, but useful for understanding production flow:

```text
Expense amount < $100
  -> auto approve

Expense amount >= $100
  -> pause for human review
```

Under the hood, the agent uses an ADK 2.0 graph workflow. The interesting part is not only the expense rule. The interesting part is how the codelab packages and hosts that workflow in a production-style environment.

---

## 🧱 What the lab builds

The codelab walks through this path:

```text
Local Ambient Expense Agent
  -> ADK skills installed into Antigravity
  -> agent project scaffolded with agents-cli
  -> production files added for Agent Runtime
  -> dependencies locked
  -> deployment dry-run checked
  -> agent deployed to Agent Runtime
  -> small and large expense cases tested
  -> traces and logs inspected
  -> registry checked
  -> resources cleaned up
```

That flow matches the Day 5 whitepaper message: a prototype is not production-ready until it can be packaged, verified, observed, and governed.

---

## 🛠️ Required setup I noted

The lab expects a cloud-ready environment:

| Requirement | Why it matters |
|---|---|
| Google Cloud project | The deployment target for Agent Runtime and related services. |
| `gcloud` SDK | Authentication, project configuration, API enablement, and cleanup. |
| `uv` | Python package and lockfile workflow. |
| Google Antigravity | Agentic IDE used to guide scaffolding, deployment, and verification. |
| `agents-cli` | Toolchain that installs ADK skills and performs scaffolding/deployment actions. |

The lab also enables services such as Vertex AI / Agent Platform, Cloud Trace, Cloud Build, and Agent Registry. That is a good reminder that production agent deployment depends on more than the Python code.

---

## 🪜 Step-by-step workflow I reviewed

### 1. Configure Google Cloud

The first step connects Antigravity to a project, authenticates through `gcloud`, and enables the needed platform APIs.

My takeaway: cloud setup is not a side task. It is part of production readiness because the runtime, tracing, builds, and registry all depend on those services being enabled correctly.

### 2. Install Agents CLI and ADK skills

The lab uses:

```text
uvx google-agents-cli setup
agents-cli info
```

This installs the CLI and companion skills so Antigravity knows how to scaffold, deploy, evaluate, and manage ADK agents.

My takeaway: this connects directly to Day 3 Agent Skills. The IDE is not just generating random code; it is being given domain-specific workflows for the agent lifecycle.

### 3. Create the expense agent project

The lab scaffolds an Ambient Expense Agent compatible with ADK 2.0. The important graph nodes are:

| Node / behavior | Role |
|---|---|
| `auto_approve` | Approves ordinary expenses under `$100`. |
| `review_agent` | Triggers a human-in-the-loop pause for larger expenses. |
| `RequestInput` | Represents the paused state where human approval is required. |

This is a small workflow, but it is a clean example of business rules becoming graph behavior.

### 4. Prepare for Agent Runtime

The lab enhances the local project for cloud deployment.

Important generated artifacts:

| Artifact | Purpose |
|---|---|
| `app/agent_runtime_app.py` | Production service wrapper for Agent Runtime. |
| `deployment_metadata.json` | Deployment layout and runtime metadata used by the tooling. |

The core agent logic remains separate. That separation is important: production wrappers should not casually rewrite business logic.

### 5. Package and dry-run

The lab locks dependencies and runs a deployment dry-run:

```text
uv lock
agents-cli deploy --dry-run
```

My takeaway: dry-run is a safety habit. It checks configuration and dependency problems before cloud provisioning starts.

### 6. Deploy to Agent Runtime

The actual deployment command follows this shape:

```text
agents-cli deploy --project YOUR_PROJECT_ID --region us-west1
```

The codelab also mentions asynchronous deployment with `--no-wait` and checking status later. That is practical because cloud deployments can take several minutes.

### 7. Test the deployed agent

The codelab uses two core test cases:

| Test case | Expected behavior |
|---|---|
| `$50` meal expense | Auto-approved by the `auto_approve` path. |
| `$150` client dinner | Pauses for human review through `RequestInput`. |

This is exactly the type of behavior that should be specified before implementation: one low-risk path, one high-risk path, and an explicit pause boundary.

### 8. Observe traces and logs

The lab points to:

- Cloud Trace for transaction maps, model latency, and tool execution spans.
- Cloud Logging for stdout and diagnostic stack traces.
- Optional BigQuery analytics for approval ratios and trend analysis.

My takeaway: observability is not only for debugging crashes. In agent systems, it also helps explain which path the agent took and where a human checkpoint was triggered.

### 9. Verify registry and cleanup

The deployed agent is expected to be registered in Agent Registry, making it discoverable inside the organization.

The cleanup step removes:

- the Agent Runtime deployment,
- stale local deployment metadata,
- and container images from Artifact Registry.

The cleanup section is not an afterthought. It is part of responsible cloud work.

---

## 🔍 Production concepts captured

| Concept | How this lab demonstrates it |
|---|---|
| Spec-driven workflow | The agent behavior is explicit: auto-approve low values, pause high values. |
| Deployment scaffolding | Local code is wrapped with production descriptors. |
| Dependency locking | `uv lock` makes the package state reproducible. |
| Dry-run validation | Deployment config is checked before provisioning. |
| Managed runtime | Agent Runtime hosts the agent beyond the local machine. |
| Observability | Cloud Trace and Logging expose execution behavior. |
| Enterprise discovery | Agent Registry makes the deployed agent discoverable. |
| Cleanup | Deployed resources must be removed when no longer needed. |

---

## 🧠 My takeaway

This codelab made the word **production** feel more concrete.

Before deployment, an agent is mostly a local workflow. After deployment, it needs runtime identity, service wrappers, dependency locks, deployment metadata, traces, logs, registry records, and a cleanup plan.

```text
A production agent is not just an agent that works.
It is an agent that can be packaged, hosted, tested, observed, discovered, and safely removed.
```
