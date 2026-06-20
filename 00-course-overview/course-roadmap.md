# 🗺️ Course Roadmap

This roadmap shows how the 5-day AI agents course work is organized inside the repository.

It stays high-level on purpose. Detailed notes, codelab steps, screenshots, source snapshots, troubleshooting notes, and reflections belong inside the day folders. This file gives the clean course path and shows how each stage contributes to the portfolio.

---

## 📌 Roadmap Philosophy

Every completed course stage should leave behind visible evidence:

- what concept was studied
- what was built or reviewed
- what tools were used
- what evidence was captured
- what issue or limitation mattered
- how the work connects to agentic systems, security, or production readiness

The roadmap follows the repository structure rather than acting as a private task log.

---

## ✅ Day 0 / Setup — Course Readiness and Repository Foundation

**Status:** Completed / Maintained  
**Folder:** [`../00-course-overview/`](../00-course-overview/)  
**Focus:** Prepare the course workspace, local setup, repository structure, and documentation approach.

### Key Topics

- Kaggle course access and onboarding
- community/course links
- local development readiness
- repository setup
- documentation standards
- security and secrets hygiene

### Completed Evidence

- course overview folder
- setup checklist
- learning objectives
- progress tracker
- documentation plan
- tools/platforms reference
- repository foundation files

### Portfolio Value

Day 0 shows that the repository was built as a structured learning portfolio from the beginning, not as a loose collection of files after the fact.

---

## 🧠 Day 1 — Introduction to Agents and Vibe Coding

**Status:** Completed  
**Folder:** [`../01-day-1-intro-to-agents-and-vibe-coding/`](../01-day-1-intro-to-agents-and-vibe-coding/)  
**Focus:** Move from course concepts into the first practical agent-assisted and prompt-to-application workflows.

### Key Topics

- AI agent foundations
- vibe coding and natural-language-driven development
- agent = model + harness concept
- specification and verification as development bottlenecks
- Google Antigravity first-run workflow
- Google AI Studio application generation
- Cloud Run deployment test and cleanup awareness

### Completed Evidence

- Day 1 README and study notes
- Antigravity Getting Started codelab
- Google News CLI source and review artifacts
- custom `code-review` skill example
- AI Studio to Cloud Run codelab
- Snowflakes & Balloons React/Vite app
- screenshots, deployment notes, and reflection material

### Portfolio Value

Day 1 establishes the first hands-on proof that natural-language-driven development can produce working outputs, but still needs human review, testing, cleanup, and clear documentation.

---

## 🛠️ Day 2 — Agent Tools and Interoperability

**Status:** Completed  
**Folder:** [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)  
**Focus:** Understand how agents become more useful when they connect to tools, APIs, protocols, and external systems.

### Key Topics

- tool-using agents
- API integration and external data access
- MCP concepts and validation
- interoperability across agent/tool ecosystems
- permission review and scoped access
- deployment evidence for a small utility app

### Completed Evidence

- Day 2 README and theory notes
- BigQuery Release Notes Hub Flask application
- source files, QA notes, screenshots, and Render deployment evidence
- Google Developer Knowledge MCP setup and prompt-result validation
- sanitized MCP configuration template
- security notes around credentials and public documentation access

### Portfolio Value

Day 2 shows that practical agents are not isolated chat interfaces. They operate around tools, APIs, documents, permissions, deployment environments, and trust boundaries.

---

## 🧩 Day 3 — Agent Skills, Procedural Memory, and Context Control

**Status:** Completed  
**Folder:** [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)  
**Focus:** Package reusable agent behavior through skills, reduce context bloat, and build inspectable workflow agents.

### Key Topics

- Agent Skills and `SKILL.md` structure
- procedural memory
- progressive disclosure
- context rot and active context control
- Skills vs MCP vs project instructions
- Agents CLI and ADK lifecycle
- graph-based workflow routing

### Completed Evidence

- Day 3 README and theory documentation
- Antigravity workspace skill examples
- skill-trigger tests and validation screenshots
- Agents CLI skill installation evidence
- `customer-support-agent` ADK workflow
- import/lint checks, ADK Playground testing, CLI execution proof, and troubleshooting notes

### Portfolio Value

Day 3 moves the portfolio from using agents as broad assistants toward engineering reusable procedures and workflow graphs that can be inspected, tested, and refined.

---

## 🔐 Day 4 — Agent Security, Observability, and Evaluation

**Status:** Completed  
**Folder:** [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)  
**Focus:** Treat agent systems as security-sensitive workflows that need guardrails, evaluation, trace evidence, and safe lifecycle practices.

### Key Topics

- agent security and trust boundaries
- prompt-injection handling
- PII redaction and containment
- deterministic routing before LLM judgment
- human-in-the-loop review
- trace generation and local/offline grading
- secure development lifecycle gates

### Completed Evidence

- Day 4 README, notes, and study summaries
- Ambient Expense Agent codelab
- deterministic approval/review routing
- pre-LLM security screening and prompt-injection bypass
- trace artifacts and offline evaluation scorecard
- Secure Agent Lifecycle codelab
- Semgrep rule, pre-commit hook, command validation, STRIDE threat model, TDD planning gate, pytest evidence, and ADK Playground proof

### Portfolio Value

Day 4 is the strongest security-focused stage of the course. It shows how agent work can be documented with evidence, safe failure paths, review boundaries, and tests instead of relying only on model behavior.

---

## 🏗️ Day 5 — Spec-Driven Production Development

**Status:** Completed  
**Folder:** [`../05-day-5-spec-driven-production-development/`](../05-day-5-spec-driven-production-development/)  
**Focus:** Study production-style agent development through specification-first thinking, cloud architecture review, and deployment-boundary documentation.

### Key Topics

- spec-driven development for agent systems
- production-readiness thinking
- Agent Runtime and Agent Registry concepts
- cloud architecture review
- event-driven workflow patterns
- observability and deployment boundaries
- safe review-track documentation where live cloud execution is constrained

### Completed Evidence

- Day 5 README and theory notes
- production architecture map
- codelab review documentation
- study summaries and visual assets
- deployment-readiness and boundary notes
- documented reasoning around review-track completion instead of unverified live deployment claims

### Portfolio Value

Day 5 keeps the production discussion honest. It records architecture, specification, runtime, and deployment concepts without pretending that optional cloud execution was completed beyond the environment or billing limits available during the course.

---

## 🏁 Capstone Project — Final Applied Agent Build

**Status:** Pending  
**Folder:** `../capstone-project/` when created  
**Focus:** Build a final applied project that connects the course work to a practical agentic use case.

### Planned Direction

The strongest capstone direction for this portfolio is a security- or automation-oriented agent workflow, because that aligns with the existing Day 4 and Day 5 strengths.

Possible portfolio-aligned themes include:

- SOC alert triage assistant
- security report automation workflow
- cloud monitoring investigation assistant
- documentation or evidence-review agent
- controlled tool-using workflow with clear human approval points

### Expected Evidence

- problem statement
- architecture and workflow design
- implementation files
- screenshots or output evidence
- testing and evaluation notes
- security boundaries
- final submission documentation

### Portfolio Value

The capstone should convert the course learning into one focused applied build. It should not be a generic chatbot if a more security-aware workflow can demonstrate stronger judgment.

---

## 📊 Roadmap Summary

| Stage | Status | Main Portfolio Contribution |
|------|--------|-----------------------------|
| Day 0 / Setup | ✅ Completed | Repository foundation and course control structure |
| Day 1 | ✅ Completed | First agentic/vibe-coding builds and deployment test |
| Day 2 | ✅ Completed | Tool use, MCP validation, interoperability, and deployment evidence |
| Day 3 | ✅ Completed | Agent Skills, procedural memory, and ADK workflow implementation |
| Day 4 | ✅ Completed | Security, evaluation, guardrails, and secure lifecycle practices |
| Day 5 | ✅ Completed | Spec-driven production development and architecture-review documentation |
| Capstone | ⬜ Pending | Final applied agent project |

---

## 🔄 Update Rule

Update this roadmap only when the status or structure of a course stage changes. Detailed codelab notes should stay inside the relevant day folder.
