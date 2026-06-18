# 🛡️ Day 4 - Agent Security & Evaluation

This folder documents the **theory and study phase** of Day 4 from the Google/Kaggle 5-Day AI Agents Intensive Vibe Coding Course.

Day 4 is where the course moved from "agents can build things" to a harder question:

> How do we make agentic systems safe, observable, testable, and worth trusting?

At this stage, I have completed the podcast, whitepaper reading, NotebookLM revision, quiz-style review, explainer video, and visual study summaries. The codelabs are intentionally not documented here yet because I have not started the hands-on Day 4 implementation phase.

---

## 🎯 Current Status

| Area | Status | Notes |
|---|---|---|
| Podcast | ✅ Completed | Reviewed the Day 4 summary and converted the main ideas into study notes. |
| Whitepaper | ✅ Completed | Read the 41-page **Vibe Coding Agent Security and Evaluation** whitepaper. |
| NotebookLM review | ✅ Completed | Used study guide, Q&A, quiz, and explainer-video style revision. |
| Visual revision | ✅ Completed | Created two infographics to make the framework easier to remember. |
| Codelab 1 | ⏭️ Pending | Ambient expense approval agent with human-in-the-loop and local evals. |
| Codelab 2 | ⏭️ Pending | Secure agentic coding with threat scans, safety guards, and tests. |

---

## 🧠 Main Learning Summary

The biggest shift in this unit is that **trust can no longer be assumed just because code runs**.

In traditional software, a lot of confidence comes from deterministic behavior: the code compiles, tests pass, credentials are valid, and the deployment path is known. With AI agents, that model breaks down. Agents can plan, call tools, generate code, install packages, read external context, and take actions across a changing environment.

That creates two separate questions:

```text
Security:   Did the agent stay inside the safe boundary?
Evaluation: Did the agent actually build something worth shipping?
```

This distinction clicked for me. A secure agent is not automatically a good agent. It may avoid dangerous actions but still misunderstand the user, ignore project conventions, create poor code, or degrade the user experience.

Day 4 is about building the discipline around that gap.

---

## 🖼️ Visual Study Assets

I created two visual summaries while revising the whitepaper and podcast material.

| Asset | Purpose |
|---|---|
| [`from-vibes-to-victory-enterprise-agent-framework.png`](./assets/infographics/from-vibes-to-victory-enterprise-agent-framework.png) | A broad visual map of the journey from casual vibe coding to enterprise-ready agentic engineering. |
| [`from-vibes-to-verified-agent-security-evaluation-framework.png`](./assets/infographics/from-vibes-to-verified-agent-security-evaluation-framework.png) | A cleaner split between the security harness and the evaluation glass box. |

![From Vibes to Verified](./assets/infographics/from-vibes-to-verified-agent-security-evaluation-framework.png)

---

## 🛡️ Why Security Changed in Agentic Systems

The whitepaper frames a raw model as only a prediction engine. It becomes an agent when it is wrapped in a harness that gives it state, memory, tools, execution capability, and feedback loops.

That harness is powerful, but it also creates risk.

An agent with the wrong permissions can become a confused deputy. An agent that reads poisoned context can follow malicious instructions. An agent that installs hallucinated packages can pull malware into the workflow. An agent that keeps running without limits can waste tokens, execute bad code, or drift away from the original intent.

My practical takeaway:

```text
The model is not the security boundary.
The harness, permissions, sandbox, telemetry, and review process are the boundary.
```

---

## 🔍 Why Evaluation Is Different from Normal Testing

Normal software testing usually starts from a clearer specification. Vibe coding starts from natural language intent, which is often vague and incomplete.

A prompt like `make this dashboard better` is not a full spec. The agent has to infer design choices, performance goals, coding style, and hidden user expectations.

That is the **underspecification gap**.

Because of that, evaluation has to look beyond pass/fail tests. It needs to inspect:

- whether the output matches the user's real intent,
- whether the code builds and behaves correctly,
- whether the UI looks and acts as expected,
- whether the agent used a sensible trajectory,
- whether it repaired failures safely,
- whether the token/tool cost was reasonable,
- and whether security and responsible AI checks held up.

This is why the paper calls for a glass-box style of evaluation. For agents, the path matters as much as the final answer.

---

## 📁 Folder Contents

```text
04-day-4-agent-security-evaluation/
|-- README.md
|-- notes/
|   |-- day-4-podcast-whitepaper-notes.md
|   |-- day-4-key-concepts.md
|   `-- day-4-study-guide-summary.md
|-- resources/
|   |-- day-4-links.md
|   `-- source-material-note.md
`-- assets/
    `-- infographics/
        |-- from-vibes-to-victory-enterprise-agent-framework.png
        `-- from-vibes-to-verified-agent-security-evaluation-framework.png
```

---

## 🧠 Concepts That Clicked for Me

### 1. Effective Trust is continuous, not a one-time gate

Static identity is too weak for agents. A valid token does not prove that the agent is still aligned with the original task. Trust has to be checked across runtime behavior, tool use, supply chain, identity, observability, and context.

### 2. Sandboxing limits the blast radius

Agent-generated code should not run directly beside important host systems. The whitepaper makes a strong case for ephemeral, network-isolated, amnesiac execution environments where risky work can happen without leaving persistent damage.

### 3. Slopsquatting is an AI-native supply-chain risk

The threat is clever: if models hallucinate fake package names, attackers can publish malware under those names and wait for agents to install them. This makes dependency verification, internal registries, SBOM checks, and version pinning much more important.

### 4. Human approval needs context, not blind buttons

A simple approve/reject button is weak when the human does not understand the generated code. The **Vibe Diff** idea is useful because it translates complex generated actions into plain English before high-stakes approval.

### 5. Evaluation must inspect the trajectory

An agent can land on a correct-looking output after using a risky path. It might skip the right files, choose the wrong tool, delete tests, or ignore project conventions. Trajectory quality catches that hidden fragility.

---

## 🔗 Connection to Upcoming Codelabs

The theory should map directly into the two Day 4 codelabs:

| Codelab | Expected connection to theory |
|---|---|
| Ambient expense approval agent | Human-in-the-loop approval, deterministic routing, security screening, PII redaction, prompt-injection defense, and local evaluation. |
| Secure agentic coding | Threat modeling, secure standards, tests, Semgrep, pre-commit checks, and agent execution hooks. |

I want the codelabs to answer one practical question:

> What does continuous trust look like when it is implemented in an actual agent workflow?

---

## 🔐 Safety Notes I Want to Remember

- Do not commit API keys, `.env` files, credentials, local project IDs, or raw account screenshots.
- Do not treat generated code as safe just because it runs.
- Do not let agents inherit broad human permissions.
- Do not trust external packages without verification.
- Do not rely only on final output; inspect the tool calls, trace, tests, and review path.
- Do not document codelab completion until the implementation evidence exists.

---

## ⏭️ Next Work

Next, I will start the Day 4 codelabs:

1. Build the ambient expense approval agent with ADK, Agents CLI, Antigravity, human-in-the-loop review, and local evaluations.
2. Build the secure agentic coding workflow with threat modeling, security tests, Semgrep, pre-commit checks, and agent hooks.

After those are complete, this folder will be expanded with codelab notes, screenshots, commands, testing evidence, source snapshots, and a final Day 4 reflection.

---

## ✅ Current Takeaway

Day 4 changed the way I think about AI-generated software.

The important skill is no longer only writing code faster. The important skill is defining boundaries, testing behavior, inspecting trajectories, reviewing risky actions, and building enough evidence to know whether an agentic workflow is safe and useful.

```text
Generation is fast.
Verification is the new craft.
```
