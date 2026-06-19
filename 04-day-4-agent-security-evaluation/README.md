# 🛡️ Day 4 - Agent Security & Evaluation

This folder documents my work for **Unit 4: Agent Security & Evaluation** from the Google/Kaggle 5-Day AI Agents Intensive Vibe Coding Course.

Day 3 showed how agents can carry reusable procedural memory through skills and ADK workflows. Day 4 moved into the part of agent engineering that feels closest to my cybersecurity background:

> How do we let agents act, build, and iterate without giving up control of boundaries, evidence, review, and trust?

The unit started with the **Vibe Coding Agent Security and Evaluation** whitepaper and ended with two hands-on builds: an ambient expense-approval agent with security/evaluation controls, and a secure agent-development lifecycle around a shopping assistant. Together they turned the theory into something concrete: security is not one checkbox, and evaluation is not only “the app ran.”

---

## 📌 Current status

| Area | Status | Notes |
|---|---|---|
| Day 4 podcast | ✅ Completed | Reviewed the unit summary and converted the main ideas into study notes. |
| Security & Evaluation whitepaper | ✅ Completed | Read the 41-page whitepaper and mapped the security/evaluation framework into notes. |
| NotebookLM review | ✅ Completed | Used study guide, Q&A, quiz-style review, and explanation checks for revision. |
| Visual revision | ✅ Completed | Added two visual summaries for the secure agent framework and evaluation model. |
| Codelab 1: Ambient Expense Agent | ✅ Completed | Built an ADK 2.0 expense workflow with deterministic routing, pre-LLM security screening, PII redaction, prompt-injection bypass, HITL review, trace generation, and offline evaluation. |
| Codelab 2: Secure Agent Lifecycle | ✅ Completed | Built a local shopping assistant and hardened the development loop with project rules, Semgrep, pre-commit, Antigravity hooks, STRIDE threat modeling, a TDD planning gate, tests, and self-correction. |

Day 4 is now complete as both a theory unit and a hands-on security engineering module.

---

## 🧠 Main learning summary

The biggest shift in this unit is that **trust cannot be assumed just because generated code runs**.

In traditional software, a lot of confidence comes from deterministic checks: the code compiles, tests pass, credentials are valid, and the deployment path is known. Agents break that simple model. They can plan, call tools, edit files, generate code, route decisions, read external context, and mutate local or cloud environments.

That creates two separate questions:

```text
Security:   Did the agent stay inside the safe boundary?
Evaluation: Did the agent actually produce something worth shipping?
```

That distinction became the spine of my Day 4 work. Codelab 1 secured and evaluated a running agent workflow. Codelab 2 secured the lifecycle used to build and change an agent.

---

## 🧪 Hands-on Codelab 1 update

The first Day 4 codelab focused on an **ADK 2.0 ambient expense approval agent**.

📂 Codelab folder: [`codelabs/01-ambient-expense-agent/`](./codelabs/01-ambient-expense-agent/)

I started from a scaffolded ADK project and converted it into an expense workflow that could parse incoming expense events, route low-value expenses deterministically, escalate high-value expenses, and pause for human review when risk or policy required it.

The important security decision was to keep threshold routing in Python instead of letting the LLM decide policy:

```text
START
  -> parse_expense_email
  -> route_by_amount
       AUTO_APPROVE -> auto_approve
       NEEDS_REVIEW -> security_screen
            CLEAN -> review_agent -> request_approval -> process_decision
            BYPASS_LLM -> request_approval -> process_decision
```

### Evidence snapshot

![Expense workflow graph in the local ADK Playground](./screenshots/codelab-1-ambient-expense-agent/09-playground-expense-agent-graph.png)

![Prompt-injection attempt routed through the protected review path](./screenshots/codelab-1-ambient-expense-agent/11-prompt-injection-bypass-proof.png)

![Offline evaluation scorecard for routing and security containment](./screenshots/codelab-1-ambient-expense-agent/18-eval-scorecard-routing-security.png)

This codelab made the Day 4 security model practical. PII redaction protected downstream prompts and review payloads. Prompt-injection detection avoided handing malicious text to the review LLM. The final local evaluation used generated traces and a faithful offline grader because the hosted grading path required billing that was not available in the project environment.

---

## 🔐 Hands-on Codelab 2 update

The second Day 4 codelab focused on **secure agentic development with Antigravity and TDD**.

📂 Codelab folder: [`codelabs/02-secure-agent-lifecycle/`](./codelabs/02-secure-agent-lifecycle/)

The final project is a local ADK shopping assistant with a `redeem_discount` tool. The tool itself is simple on purpose: redeem a valid code for a registered user, reject invalid users and unknown codes, and prevent the same code from being redeemed twice.

The real lesson was the development lifecycle around it:

```text
Project context rules
  -> Semgrep + pre-commit gate
  -> Antigravity command hook
  -> STRIDE threat model
  -> TDD planning gate
  -> outcome-based tests
  -> blocked commit on mock secret
  -> secure remediation
  -> local Playground proof
```

### Evidence snapshot

![Project-specific secure coding standards in .agents/CONTEXT.md](./screenshots/codelab-2-secure-agent-lifecycle/03-context-secure-coding-standards.png)

![STRIDE threat model generated for the shopping assistant](./screenshots/codelab-2-secure-agent-lifecycle/06-stride-threat-model-report.png)

![Successful redeem_discount call in the ADK Web UI](./screenshots/codelab-2-secure-agent-lifecycle/11-playground-redeem-discount-success.png)

The strongest part of this codelab was the self-correction loop. The first commit failed because Semgrep caught the intentionally hardcoded mock Google API-key-shaped value. I then removed the mock key, switched the app to secure environment-based authentication, reran tests and scans, and committed the clean version without bypassing the hook.

---

## 🖼️ Visual Study Assets

I created two visual summaries while revising the Day 4 theory material.

| Asset | Purpose |
|---|---|
| [`from-vibes-to-victory-enterprise-agent-framework.png`](./assets/infographics/from-vibes-to-victory-enterprise-agent-framework.png) | A broad visual map of the journey from casual vibe coding to enterprise-ready agentic engineering. |
| [`from-vibes-to-verified-agent-security-evaluation-framework.png`](./assets/infographics/from-vibes-to-verified-agent-security-evaluation-framework.png) | A cleaner split between the security harness and the evaluation glass box. |

![From Vibes to Verified](./assets/infographics/from-vibes-to-verified-agent-security-evaluation-framework.png)

---

## 📁 Folder contents

| File / Folder | Purpose |
|---|---|
| [`notes/day-4-podcast-whitepaper-notes.md`](./notes/day-4-podcast-whitepaper-notes.md) | Theory notes from the podcast and whitepaper. |
| [`notes/day-4-key-concepts.md`](./notes/day-4-key-concepts.md) | Compact revision map for the main Day 4 security and evaluation terms. |
| [`notes/day-4-study-guide-summary.md`](./notes/day-4-study-guide-summary.md) | Study process, recall prompts, and NotebookLM-style review summary. |
| [`notes/day-4-codelab-1-ambient-expense-agent.md`](./notes/day-4-codelab-1-ambient-expense-agent.md) | Practical notes from the ambient expense agent codelab. |
| [`notes/day-4-codelab-2-secure-agent-lifecycle.md`](./notes/day-4-codelab-2-secure-agent-lifecycle.md) | Practical notes from the secure agent lifecycle codelab. |
| [`codelabs/`](./codelabs/) | Completed hands-on codelab documentation, command logs, validation notes, source snapshots, and evidence files. |
| [`screenshots/`](./screenshots/) | Renamed screenshot evidence from both Day 4 codelabs. |
| [`assets/infographics/`](./assets/infographics/) | Visual study assets generated during the theory phase. |
| [`resources/day-4-links.md`](./resources/day-4-links.md) | Official Day 4 links and implementation references. |
| [`resources/commands-index.md`](./resources/commands-index.md) | Index of command logs kept inside each codelab folder. |
| [`reflections/day-4-security-engineering-reflection.md`](./reflections/day-4-security-engineering-reflection.md) | Personal reflection on how the security lens changed the way I think about agents. |

---

## 🛡️ What clicked after the codelabs

Day 4 made the security boundary visible.

Before this unit, it was easy to look at an agent as a model plus tools. After doing the codelabs, I see it more like a small distributed system that needs policy, runtime checks, identity boundaries, logging, tests, evaluation data, and safe failure modes.

A few ideas became much more concrete:

- **Deterministic policy stays outside the LLM.** The LLM can judge risk or summarize context, but dollar thresholds and allow/deny decisions should live in explicit code.
- **Security checks need to sit before the model when input is hostile.** If a prompt contains PII or injection text, the system should not politely ask the LLM to reason over it first.
- **Evaluation needs artifacts.** A trace file and scorecard create better evidence than a vague statement that the agent “worked.”
- **Secure development is a chain of small gates.** Context rules, hooks, pre-commit, Semgrep, tests, and threat modeling each catch different failure modes.
- **Auth mode matters.** Vertex AI ADC and AI Studio API-key mode behave differently. The final local run used Gemini API mode without committing secrets.

---

## 🔐 Safety notes I followed

- No real API keys committed.
- No `.env` files committed.
- No virtual environments committed.
- No local ADK session databases committed.
- No Google Cloud credential files committed.
- No raw API-key setup screenshots committed.
- Prompt-injection and mock-secret evidence kept as training artifacts only.
- Terraform scaffold kept only as generated deployment evidence, not as executed infrastructure.

---

## ✅ Final Day 4 takeaway

Day 4 changed the way I think about agentic software.

The valuable skill is not only getting an agent to generate something quickly. The valuable skill is building the harness around it: routing rules, security screens, test suites, scan gates, threat models, trace evidence, and human review paths.

```text
Generation is fast.
Verification is the craft.
Security is the discipline that keeps the speed usable.
```
