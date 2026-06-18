# 🎯 Learning Objectives

This file defines the personal learning goals behind this repository.

The course provides the structure, but the portfolio direction is broader: understand AI agents practically, build hands-on outputs, document the process professionally, and connect the learning to security automation and real-world engineering workflows.

---

## 🧠 Primary Objective

The main objective is to understand how AI agents can move from simple LLM interactions into more useful systems that can reason, use tools, manage context, load reusable skills, support workflows, and produce deployable applications.

This repository should show that learning progression clearly.

The goal is not only:

> “Complete the course.”

The stronger goal is:

> Build a structured, evidence-backed portfolio showing how AI agents, vibe coding, tool interoperability, Agent Skills, cloud deployment, and security-aware automation can fit into practical engineering work.

---

## 🤖 AI Agents Understanding

By the end of this course journey, I want to understand:

- what makes an AI system an agent
- how agents differ from basic chatbot interactions
- how agents use models, tools, skills, memory, and orchestration
- how human review fits into agentic workflows
- where agents are useful and where they can fail
- how to evaluate agent behavior more carefully

Success criteria:

- I can explain AI agent workflows in my own words
- I can identify the components of an agentic system
- I can document what an agent did, what tools or skills it used, and what evidence was produced
- I can separate useful agent behavior from unreliable or unsafe automation

---

## 💬 Vibe Coding and Natural-Language Development

A major course theme is vibe coding: describing intent in natural language and guiding AI systems to generate, modify, test, and deploy applications.

My objective is to understand this workflow practically, not treat it as magic.

I want to learn:

- how to write better intent-driven prompts
- how to review AI-generated code
- how to debug generated outputs
- when manual editing is still required
- how to preserve code quality while using natural-language development
- how to document prompt-to-output decisions

Success criteria:

- I can turn a high-level idea into a working implementation using AI-assisted workflows
- I can review and improve generated code instead of blindly accepting it
- I can document the difference between prompt, generated output, manual fix, and final result

---

## 🛠️ Google Antigravity Workflow

Google Antigravity is one of the main agent-oriented tools involved in this course.

My objective is to understand:

- how Antigravity supports agent-based development
- how the IDE and CLI fit into the workflow
- how tasks are planned, executed, and reviewed
- how agent artifacts or evidence can support transparency
- how skills can extend the agent’s behavior without bloating the main prompt
- how this type of environment may change developer workflows

Success criteria:

- I can document the setup clearly
- I can explain the purpose of Antigravity in this course
- I can capture screenshots and notes from hands-on usage
- I can explain how Antigravity Skills are installed, triggered, tested, and documented from the Day 3 codelabs
- I can reflect on where agent-first development is useful and where caution is needed

---

## ☁️ AI Studio and Cloud Run Deployment

The course includes hands-on work using Google AI Studio and Cloud Run.

My objectives are:

- build a simple web application through AI Studio
- understand the generated project structure
- test the generated output
- deploy to Cloud Run where required
- document deployment steps and evidence
- understand cost, cleanup, and security considerations

Success criteria:

- I can store generated code in the correct folder
- I can explain what the application does
- I can document how it was generated, tested, and deployed
- I can preserve screenshots and output evidence
- I can avoid exposing credentials or account information

---

## 🔗 Tool Use, APIs, MCP, and Agent Interoperability

Agents become more useful when they can interact with external tools and systems.

My objective is to understand:

- how agents call tools or functions
- how APIs expand agent capabilities
- how MCP connects an agent to external knowledge or systems
- how tool permissions should be controlled
- how to document inputs, outputs, and side effects
- how tool use connects to automation workflows

Success criteria:

- I can document tool-using agent workflows clearly
- I can describe what system, API, or MCP server the agent interacted with
- I can identify security or reliability concerns around tool access
- I can explain the value and risk of external integrations

---

## 🧩 Agent Skills, Procedural Memory, and Context Budget

Useful agents need more than one prompt. They need reusable know-how, clean routing, controlled context, and sometimes memory.

My objective is to learn:

- how Agent Skills act as procedural memory for agents
- how a `SKILL.md` file defines metadata, trigger description, and task instructions
- how `scripts/`, `references/`, and `assets/` support a skill without forcing everything into the prompt
- how progressive disclosure reduces active context pressure
- how context rot and attention dilution affect agent reliability
- how Skills differ from MCP and `AGENTS.md`
- how skill descriptions route work and why vague triggers fail
- how evaluation-driven development can make skills more trustworthy

Success criteria:

- I can explain why bigger context is not automatically better
- I can describe the anatomy of an Agent Skill in my own words
- I can explain the difference between know-how, reach, and always-loaded project context
- I can document reusable agent behavior patterns without repeating the same notes everywhere
- I can identify trigger failure, execution failure, token budget failure, and regression risk
- I can connect Day 3 theory to the completed Antigravity Skills and Agents CLI/ADK codelabs

---

## 🔐 Security, Evaluation, and Reliability

This is one of the most important learning objectives because agentic systems can take actions, use tools, access files, invoke scripts, or interact with cloud services.

My objectives are:

- understand prompt injection risks
- think about safe tool permissions
- evaluate agent outputs critically
- test generated applications
- avoid committing secrets
- document risk and reliability concerns
- connect agent safety to cybersecurity thinking
- treat skills and MCP configurations as reviewable dependencies

Success criteria:

- I can include security notes in relevant codelab documentation
- I can identify failure modes or unsafe assumptions
- I can explain what was tested and what still needs verification
- I can treat agent output as something to review, not blindly trust
- I can separate read-only, draft-only, and action-capable workflows when thinking about agent risk

---

## 🧑‍💻 Portfolio and Documentation Skill

This repository is also a documentation project.

My objective is to make the repository easy to understand for:

- future me
- technical reviewers
- recruiters
- collaborators
- other learners exploring AI agents

Success criteria:

- every major folder has a README
- every codelab has clear notes and evidence
- screenshots are organized and meaningful
- progress is tracked honestly
- incomplete items are not presented as completed
- documentation is readable without needing the original chat history
- generated study aids are converted into concise personal notes, not pasted directly

---

## 🏁 Capstone Objective

The capstone should become the strongest applied section of this repository.

My objective is to build a final project that is:

- practical
- documented
- connected to agentic workflows
- reviewable
- supported by screenshots or output evidence
- meaningful from a security, automation, or workflow perspective if possible

Success criteria:

- the capstone has a clear problem statement
- the architecture is explained
- implementation files are organized
- testing and evaluation are documented
- final output or submission evidence is preserved
- lessons learned are written clearly

---

## ✅ Day 1 Objective Progress

Day 1 produced the first concrete evidence toward these objectives:

- I used Antigravity to explore an agent-oriented development workspace.
- I preserved a generated Node.js CLI project instead of only describing it from memory.
- I documented a custom code-review skill demo using an intentionally broken Python file.
- I used AI Studio to guide a browser-only app from prompt to working frontend code.
- I tested the AI Studio app through Cloud Run and documented the cleanup/cost decision.
- I organized screenshots, notes, source files, and reflections so the work can be reviewed from durable repository artifacts.

This turned the initial learning objective into a documented implementation baseline for the rest of the course.

---

## ✅ Day 2 Objective Progress

Day 2 extended the learning from app generation into tool-connected agent workflows:

- I documented how agents interact with tools and external systems.
- I captured Antigravity CLI work as evidence instead of leaving it only in terminal history.
- I documented the Google Developer Knowledge MCP codelab with setup, security notes, and validation evidence.
- I treated MCP configuration as something that needs careful handling rather than a casual copy-paste step.
- I connected tool access to reliability, permissions, troubleshooting, and safe public documentation.

This made the tooling objective more practical: agents are powerful because they can act through tools, but that action surface needs control.

---

## ✅ Day 3 Objective Progress

Day 3 is now complete across both concept study and hands-on codelab work.

Completed progress:

- I completed the Unit 3 podcast and Agent Skills whitepaper study.
- I used NoteGPT and NotebookLM for revision, quiz-style review, and explanation support.
- I created visual study assets for procedural memory, progressive disclosure, and context reduction.
- I documented the main vocabulary: `SKILL.md`, procedural memory, progressive disclosure, context rot, trigger descriptions, MCP vs Skills, evaluation-driven development, and skill failure modes.
- I tested Antigravity workspace skills through practical tasks such as commit formatting, license headers, JSON-to-Pydantic conversion, and schema validation.
- I installed and documented Agents CLI skills as part of the Day 3 tooling workflow.
- I scaffolded and tested an ADK-based `customer-support-agent` graph workflow with classifier routing, a shipping FAQ path, and an unrelated-query decline path.
- I captured linting, import validation, ADK playground traces, response-style refinement, and command-line execution evidence.
- I documented runtime lessons around API key visibility, Windows ADK reload behavior, and Google Cloud billing limitations without exposing secrets.

This objective moved from theory into practice: Agent Skills became a reusable procedural-memory pattern, and ADK turned routing into a visible workflow that could be tested and reviewed.

---

## ⭐ Final Learning Outcome

The final outcome I want from this course portfolio is:

> A clean, structured, hands-on AI agents repository that shows how I studied the course, built practical outputs, documented evidence, and connected agentic AI concepts to real-world automation and security-aware engineering thinking.
