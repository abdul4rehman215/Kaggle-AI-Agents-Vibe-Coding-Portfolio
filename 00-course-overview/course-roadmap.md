# 🗺️ Course Roadmap

This roadmap gives a high-level view of how the 5-day AI agents course work is documented inside this repository.

The goal is not to over-explain every task here. Detailed notes, codelabs, screenshots, source files, and reflections belong inside each day-wise folder. This file keeps the full course direction visible in one place.

---

## 📌 Roadmap Philosophy

Each stage of the course should produce visible learning evidence.

That means every major day or project should eventually contain:

- notes or concept summary
- hands-on codelab files
- screenshots or output evidence
- troubleshooting notes where needed
- reflection on what was learned
- security or production-readiness observations where relevant

The roadmap is organized around the repository structure, not only the course schedule.

---

## ✅ Day 0 / Setup — Course Readiness and Repository Foundation

**Folder:** [`../00-course-overview/`](../00-course-overview/)  
**Status:** Completed / Maintained  
**Main purpose:** Establish the learning workspace, environment readiness, and repository foundation.

### Focus Areas

- course onboarding
- Kaggle access
- Discord/community setup
- Antigravity IDE and CLI readiness
- GitHub repository creation
- documentation structure
- local development readiness
- secrets and security hygiene

### Expected Artifacts

- setup checklist
- learning objectives
- progress tracker
- documentation plan
- tools/platforms overview
- root repository README
- `.gitignore`
- `LICENSE`

### Portfolio Value

This stage proves that the course work is being organized from the beginning, not collected randomly after completion.

---

## 🧠 Day 1 — Introduction to Agents and Vibe Coding

**Folder:** [`../01-day-1-intro-to-agents-and-vibe-coding/`](../01-day-1-intro-to-agents-and-vibe-coding/)  
**Status:** Completed  
**Main purpose:** Understand the starting concepts of AI agents and natural-language-driven development, then capture the first hands-on agentic/vibe-coding workflows with source code and evidence.

### Focus Areas

- AI agent fundamentals
- vibe coding mindset
- human-AI collaboration in development
- Google Antigravity exploration
- AI Studio application generation
- Cloud Run deployment workflow

### Expected Artifacts

- Day 1 README
- podcast notes
- whitepaper notes
- livestream notes
- Antigravity codelab documentation
- Antigravity Google News CLI source
- custom code-review skill demo
- AI Studio codelab documentation
- Snowflakes & Balloons app source
- Cloud Run deployment notes
- screenshots
- reflection

### Portfolio Value

Day 1 shows the transition from course theory into practical agent-assisted software building. It proves that the first implementations were documented with durable source artifacts, screenshot evidence, notes, and reflections.

### ✅ Completion Notes

The completed Day 1 module includes two practical codelab tracks:

1. **Antigravity Getting Started** — workspace exploration, agent settings, generated Google News CLI, implementation evidence, and code-review skill demo.
2. **AI Studio to Cloud Run** — browser-only Snowflakes & Balloons app, prompt-driven refinements, exported source code, Cloud Run deployment test, and cleanup notes.

The portfolio documents the Day 1 work through source files, screenshots, prompt notes, deployment notes, and reflection, so the implementation can be reviewed without depending on a separate chat record.

---

## ✅ Day 2 — Agent Tools and Interoperability

**Folder:** [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)  
**Status:** Completed  
**Main purpose:** Document how agents interact with tools, CLIs, MCP servers, external systems, and developer workflows.

### Focus Areas

- tool-using agents
- Antigravity CLI workflow
- Google Developer Knowledge MCP
- external system interaction
- function/tool calling concepts
- workflow interoperability
- boundaries around agent access
- setup hygiene and safe configuration

### Expected Artifacts

- Day 2 README
- podcast and whitepaper notes
- study guide summary
- Antigravity CLI codelab documentation
- Google Developer Knowledge MCP codelab documentation
- codelab source/artifacts where relevant
- screenshots and output evidence
- Render deployment record where relevant
- security and workflow reflection

### Portfolio Value

Day 2 shows that agents are not only chat interfaces. They can become workflow participants when connected safely to tools, command-line environments, MCP servers, and external knowledge systems.

### ✅ Completion Notes

The completed Day 2 module documents both concept learning and hands-on implementation evidence:

1. **Antigravity CLI work** — local CLI workflow, command execution, artifact tracking, screenshots, and troubleshooting notes.
2. **Google Developer Knowledge MCP codelab** — MCP configuration, security notes, prompt-result validation, sanitized config examples, and evidence screenshots.
3. **Documentation and reflection** — notes connect tool access with reliability, permission boundaries, deployment thinking, and responsible repository hygiene.

The main lesson from Day 2 is that agent power increases with tool access, but so does the need for controlled permissions, clear setup notes, and careful evidence handling.

---

## ✅ Day 3 — Agent Skills and Procedural Memory

**Folder:** [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)  
**Status:** Completed  
**Main purpose:** Understand how Agent Skills give agents reusable procedural memory without bloating the active context window, then validate that idea through Antigravity Skills and ADK lifecycle codelabs.

### Focus Areas

- Agent Skills as reusable procedural memory
- `SKILL.md` as the central skill primitive
- skill folder anatomy: `scripts/`, `resources/`, `examples/`, and source-supporting files
- progressive disclosure
- context rot and active context budget
- trigger descriptions and routing quality
- Skill vs MCP vs `AGENTS.md`
- single agent with skills vs multi-agent architectures
- evaluation-driven skill design
- trajectory scoring, token budget failure, and regression risk
- Agents CLI skill installation and lifecycle workflow
- ADK graph workflow design, linting, playground testing, and command-line execution

### Completed Artifacts

- Day 3 README
- podcast and whitepaper notes
- Agent Skills key concepts
- study guide summary
- source material note
- official resource links
- personal infographics for visual revision
- Antigravity Skills codelab documentation
- curated workspace skill source snapshots
- codelab commands, validation notes, and observations
- Agents CLI + ADK lifecycle codelab documentation
- `customer-support-agent` graph workflow source snapshot
- screenshots for skill discovery, skill tests, ADK playground testing, and CLI execution
- troubleshooting notes for API key visibility, Windows ADK behavior, and Google Cloud billing limits
- final Day 3 reflection

### Portfolio Value

Day 3 demonstrates that useful agents need more than a single prompt or a long tool list. They need reusable know-how, clean routing, small active context, and testable skill behavior.

The completed codelabs make that idea concrete: Antigravity Skills show how procedural memory can be packaged and triggered, while Agents CLI + ADK show how a routed graph workflow can be scaffolded, linted, tested, adjusted, and executed from the command line.

### ✅ Completion Notes

The Day 3 module is now closed as a documented learning unit. It preserves both the conceptual side of Agent Skills and the hands-on evidence from the Antigravity Skills and ADK lifecycle workflows.

---

## 🔐 Day 4 — Agent Security and Evaluation

**Folder:** [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)  
**Status:** In progress - theory documented, codelabs pending  
**Main purpose:** Study agent reliability, testing, observability, and security risks.

### Focus Areas

- prompt injection awareness
- safe tool usage
- agent evaluation
- observability
- testing behavior
- guardrails and failure modes
- secure handling of credentials and permissions

### Current Artifacts

- Day 4 README
- podcast and whitepaper notes
- key-concepts glossary
- study guide summary
- official links
- source material note
- visual study assets

### Pending After Codelabs

- evaluation examples
- security testing notes
- screenshots
- implementation notes
- risk observations
- SOC/security automation reflection

### Portfolio Value

Day 4 is important because agentic systems can create risk if they are given tools, memory, or external access without proper evaluation and controls.

---

## 🚀 Day 5 — Production Agent Deployment

**Folder:** [`../05-day-5-production-agent-deployment/`](../05-day-5-production-agent-deployment/)  
**Status:** Pending  
**Main purpose:** Connect prototype work to production-style deployment and operational thinking.

### Focus Areas

- deployment workflow
- production readiness
- debugging and monitoring
- Cloud Run notes
- final documentation cleanup
- course wrap-up
- lessons learned

### Expected Artifacts

- Day 5 README
- deployment notes
- screenshots
- production-readiness checklist
- final reflections
- links to working outputs where applicable

### Portfolio Value

Day 5 should show the difference between an experiment and a documented, reviewable, deployable artifact.

---

## 🏁 Capstone Project — Final Applied Build

**Folder:** [`../capstone-project/`](../capstone-project/)  
**Status:** Pending  
**Main purpose:** Build and document the final applied AI agents project.

### Focus Areas

- problem statement
- use case selection
- architecture
- agent workflow
- implementation
- testing
- evaluation
- screenshots and evidence
- final submission documentation

### Expected Artifacts

- capstone README
- problem statement
- architecture notes or diagram
- implementation files
- screenshots
- evaluation notes
- final submission evidence
- lessons learned

### Portfolio Value

The capstone should become the strongest applied section of the repository. It should show practical agentic system building, not only course participation.

---

## 📊 Roadmap Summary

| Stage | Status | Main Output |
|------|--------|-------------|
| Day 0 / Setup | Completed / Maintained | Environment and repository foundation |
| Day 1 | Completed | Antigravity, AI Studio, Cloud Run evidence, screenshots, and reflections |
| Day 2 | Completed | Agent tools, Antigravity CLI, MCP notes, screenshots, security notes, and reflection |
| Day 3 | Completed | Agent Skills theory, Antigravity Skills, Agents CLI setup, ADK lifecycle codelab, screenshots, source snapshots, troubleshooting notes, and reflection |
| Day 4 | In progress | Theory notes and visual study assets added; codelabs pending |
| Day 5 | Pending | Production deployment and final course wrap-up |
| Capstone | Pending | Final applied AI agents project |

---

## 🔄 Update Rule

This roadmap should be updated only when the actual repository state changes.

Avoid marking future work as complete before:

- notes are written
- codelab files are added
- screenshots or evidence are stored
- the corresponding day README is updated
- final reflections are documented
