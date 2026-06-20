# 🛠️ Tools and Platforms

This file explains why each major tool or platform appears in the course portfolio.

It is a reference map, not a tutorial. Setup steps, screenshots, commands, and codelab-specific notes belong inside the relevant day folders.

---

## 📌 Tooling Summary

| Tool / Platform | Role in the Portfolio | Main Evidence Location |
|-----------------|-----------------------|------------------------|
| Kaggle | Course hub, learning path, and capstone context | [`../resources/`](../resources/), roadmap files |
| Google Antigravity | Agent-oriented development environment | Day 1, Day 2, Day 3, Day 4, Day 5 folders |
| Antigravity CLI | Local agent-assisted app-building workflow | Day 2 folder |
| Google AI Studio | Prompt-to-application generation | Day 1 folder |
| Cloud Run | Serverless deployment workflow and production concept | Day 1 and Day 5 folders |
| Render | External deployment evidence for a small Flask app | Day 2 folder |
| MCP | Tool/document interoperability pattern | Day 2 folder |
| Agent Skills | Reusable procedural memory for agents | Day 3 folder |
| Agents CLI | CLI workflow for agent/skill lifecycle work | Day 3 folder |
| ADK | Agent workflow implementation and local testing | Day 3 and Day 4 folders |
| Semgrep | Static analysis/security gate | Day 4 folder |
| pre-commit | Local security and quality enforcement | Day 4 folder |
| pytest | Outcome-based validation | Day 4 folder |
| Agent Runtime / Agent Registry | Production agent architecture concepts | Day 5 folder |
| Pub/Sub / Cloud Trace / Cloud Logging | Production architecture and observability concepts | Day 5 folder |

---

## 📚 Course and Learning Platforms

### Kaggle

**Role:** Main course platform and capstone entry point.

Kaggle provides the course structure, learning guide, assignments, and capstone context. In this repository, Kaggle is referenced through roadmap notes, official links, daily documentation, and the eventual capstone work.

**Evidence locations:**

- [`course-roadmap.md`](./course-roadmap.md)
- [`../resources/`](../resources/)

---

### Course Community and Study Aids

**Role:** Supporting context for learning, discussion, summaries, and review.

Community access and study aids are used as support, but the repository does not paste raw generated summaries as final documentation. The final notes are rewritten into a technical portfolio style.

**Evidence locations:**

- day-level notes and reflections
- [`learning-objectives.md`](./learning-objectives.md)

---

## 🤖 Agent Development Tools

### Google Antigravity

**Role:** Agent-oriented development environment used across multiple course days.

Antigravity appears in the portfolio as both a coding environment and a place to inspect agent behavior, review plans, test skills, apply project rules, and document permission-sensitive workflows.

**Used in:**

- Day 1: first Antigravity workflow and Google News CLI codelab
- Day 2: CLI-driven app-building workflow
- Day 3: workspace skills and procedural memory testing
- Day 4: secure lifecycle rules, tool hooks, threat modeling, and TDD gates
- Day 5: production/spec-driven architecture review work

**Evidence locations:**

- [`../01-day-1-intro-to-agents-and-vibe-coding/`](../01-day-1-intro-to-agents-and-vibe-coding/)
- [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)
- [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)
- [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)
- [`../05-day-5-spec-driven-production-development/`](../05-day-5-spec-driven-production-development/)

---

### Antigravity CLI

**Role:** Command-line workflow for local agent-assisted development.

The CLI is important because it shows agent-assisted work outside a purely visual IDE flow. It was used most clearly during the Day 2 app-building work.

**Evidence location:**

- [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)

---

### Agent Skills

**Role:** Reusable procedural memory for agents.

Agent Skills are used to package repeatable task knowledge into structured `SKILL.md` files and supporting scripts. This helps reduce repeated prompting and keeps specialized procedures separate from general conversation context.

**Used in:**

- Day 1: custom code-review skill example
- Day 3: workspace skills, skill tests, and procedural-memory codelab
- Day 4: STRIDE threat-modeling skill in the secure lifecycle workflow

**Evidence locations:**

- [`../01-day-1-intro-to-agents-and-vibe-coding/`](../01-day-1-intro-to-agents-and-vibe-coding/)
- [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)
- [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)

---

### Agents CLI and ADK

**Role:** Agent lifecycle and workflow implementation tooling.

Agents CLI and ADK support a more structured agent-building workflow. They are used to define, test, and inspect graph-style agent behavior rather than only prompting a model directly.

**Used in:**

- Day 3: `customer-support-agent` ADK workflow
- Day 4: ambient expense agent and secure shopping-assistant lifecycle

**Evidence locations:**

- [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)
- [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)

---

## 🧰 Application and Interoperability Tools

### Google AI Studio

**Role:** Prompt-to-application generation.

Google AI Studio is used in Day 1 to generate the Snowflakes & Balloons browser app. The portfolio uses this codelab to show both the speed of vibe coding and the need for review, testing, and cleanup.

**Evidence location:**

- [`../01-day-1-intro-to-agents-and-vibe-coding/`](../01-day-1-intro-to-agents-and-vibe-coding/)

---

### MCP

**Role:** Interoperability layer for connecting agents to external tools and documentation.

MCP is documented in Day 2 through Google Developer Knowledge MCP validation. The focus is not only whether the tool works, but also how permission review, scoped access, and sanitized configuration should be handled.

**Evidence location:**

- [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)

---

### Flask, React/Vite, and Supporting App Frameworks

**Role:** Application outputs created or reviewed during codelabs.

These frameworks are not the main subject of the course, but they appear as implementation surfaces for agent-assisted development.

**Used in:**

- Day 1: React/Vite Snowflakes & Balloons app
- Day 2: Flask BigQuery Release Notes Hub

**Evidence locations:**

- [`../01-day-1-intro-to-agents-and-vibe-coding/`](../01-day-1-intro-to-agents-and-vibe-coding/)
- [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)

---

## ☁️ Cloud and Production Tools

### Cloud Run

**Role:** Serverless deployment workflow and production-readiness concept.

Cloud Run appears in two ways:

- Day 1: deployment test and cleanup for the AI Studio app
- Day 5: production architecture and deployment-boundary review

The documentation distinguishes between verified test deployment, cleanup decisions, and architecture-level production review.

**Evidence locations:**

- [`../01-day-1-intro-to-agents-and-vibe-coding/`](../01-day-1-intro-to-agents-and-vibe-coding/)
- [`../05-day-5-spec-driven-production-development/`](../05-day-5-spec-driven-production-development/)

---

### Render

**Role:** External app deployment evidence.

Render is used for the Day 2 BigQuery Release Notes Hub deployment evidence. It is included because it shows a practical deployed app workflow outside local-only testing.

**Evidence location:**

- [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)

---

### Agent Runtime, Agent Registry, Pub/Sub, Cloud Trace, and Cloud Logging

**Role:** Production architecture and observability concepts.

These tools appear in Day 5 as part of production-style agent development review. They are documented as architecture and runtime concepts rather than overstated as fully verified live production deployment evidence.

**Evidence location:**

- [`../05-day-5-spec-driven-production-development/`](../05-day-5-spec-driven-production-development/)

---

## 🔐 Security and Validation Tools

### Semgrep

**Role:** Static analysis and secret-pattern detection.

Semgrep is used in Day 4 to enforce a security gate around key-shaped values. It helps show that security can be part of the agent-development lifecycle instead of a manual final check.

**Evidence location:**

- [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)

---

### pre-commit

**Role:** Local enforcement before code is committed.

The pre-commit workflow supports the secure lifecycle work by catching unsafe patterns before they enter the repository history.

**Evidence location:**

- [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)

---

### pytest

**Role:** Outcome-based validation.

pytest is used to validate expected behavior in the Day 4 secure lifecycle workflow. This matters because agent systems still need deterministic tests around business rules, tool behavior, and state changes.

**Evidence location:**

- [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)

---

## 🧪 Local Workflow and Secret Handling

The repository uses local environment variables, ignored `.env` files, and sanitized templates where credentials or private configuration are involved.

Important rules:

- do not commit real API keys or service account files
- keep local config outside Git unless it is sanitized
- review screenshots before publishing
- avoid exposing billing data, account details, project IDs, tokens, or private paths
- document cloud limitations honestly when billing or access prevents full execution

This is especially important for Day 2 MCP work, Day 3/Day 4 ADK usage, and Day 5 production architecture discussion.

---

## 🧭 Final Note

The tools in this portfolio are not listed to show a large stack for its own sake. Each one supports a specific part of the learning path: building with agents, connecting tools, packaging reusable procedures, validating behavior, securing workflows, or reviewing production architecture.
