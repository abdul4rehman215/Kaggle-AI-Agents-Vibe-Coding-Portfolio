# 🧭 Course Overview

This folder is the course-level control hub for the **Kaggle AI Agents Vibe Coding Portfolio**.

The root `README.md` introduces the repository as a public portfolio. This folder keeps the course structure, documentation rules, setup state, tooling map, learning goals, and progress tracking in one place.

It is not a storage area for codelab code or screenshots. Those belong inside the relevant day folders. The purpose here is to keep the full learning path organized and easy to review.

---

## 📌 What This Folder Contains

| File | Purpose |
|------|---------|
| [`course-roadmap.md`](./course-roadmap.md) | Day-by-day course roadmap from setup through Day 5 and the pending capstone |
| [`setup-checklist.md`](./setup-checklist.md) | Practical readiness checklist for accounts, tools, local environment, repository setup, and secrets hygiene |
| [`learning-objectives.md`](./learning-objectives.md) | Main learning goals and the outcomes demonstrated through the completed course work |
| [`progress-tracker.md`](./progress-tracker.md) | Compact status tracker for course stages, completed work, and next steps |
| [`documentation-plan.md`](./documentation-plan.md) | Documentation standards for day folders, codelabs, screenshots, reflections, and evidence |
| [`tools-and-platforms.md`](./tools-and-platforms.md) | Reference map for the tools and platforms used across the portfolio |
| [`../resources/`](../resources/) | Official course links and supporting references |

---

## 🎯 Folder Role in the Repository

`00-course-overview/` answers the course-level questions:

- How is the 5-day course organized in this repository?
- Which days are completed and which work is still pending?
- What documentation standard is used across the portfolio?
- What setup and tooling were required?
- How does the work connect to AI agents, production thinking, and security automation?

The implementation details stay in the day folders:

```text
01-day-1-intro-to-agents-and-vibe-coding/        # Antigravity, AI Studio, Cloud Run test workflow
02-day-2-agent-tools-and-interoperability/       # Tool use, MCP validation, interoperability, deployed Flask app
03-day-3-agent-skills-procedural-memory/         # Agent Skills, procedural memory, Agents CLI, ADK workflow
04-day-4-agent-security-evaluation/              # Secure agents, guardrails, evaluation, secure lifecycle work
05-day-5-spec-driven-production-development/     # Spec-driven development, production review, cloud architecture notes
capstone-project/                                # Pending final applied build
```

---

## 📈 Current Course Status

| Stage | Status | Repository Role |
|------|--------|-----------------|
| Day 0 / Setup | ✅ Completed | Course readiness, setup tracking, and documentation foundation |
| Day 1 | ✅ Completed | First hands-on agentic and vibe-coding workflows |
| Day 2 | ✅ Completed | Tool use, MCP validation, interoperability, and deployment evidence |
| Day 3 | ✅ Completed | Agent Skills, procedural memory, and ADK workflow implementation |
| Day 4 | ✅ Completed | Agent security, evaluation, guardrails, and secure lifecycle practices |
| Day 5 | ✅ Completed | Spec-driven production development and architecture-review documentation |
| Capstone Project | ⬜ Pending | Final applied agent project |

---

## 🧠 Portfolio Direction

The course work is documented through a practical engineering lens:

```text
Study → Build → Test → Document → Reflect → Improve
```

The strongest direction of this portfolio is the connection between **AI agents**, **vibe coding**, **tool-using workflows**, **Agent Skills**, **production readiness**, and **security-aware automation**.

That means the documentation does not only say what the course covered. It also records what was built, how the work was validated, what constraints appeared, and where the concepts connect to real-world engineering or SOC-style automation.

---

## 🧱 Repository Organization Standard

The repository is organized by course stage. Day folders contain the detailed work, while this folder keeps the overview and standards.

```text
Kaggle-AI-Agents-Vibe-Coding-Portfolio/
├── README.md
├── .gitignore
├── LICENSE
│
├── 00-course-overview/
├── 01-day-1-intro-to-agents-and-vibe-coding/
├── 02-day-2-agent-tools-and-interoperability/
├── 03-day-3-agent-skills-procedural-memory/
├── 04-day-4-agent-security-evaluation/
├── 05-day-5-spec-driven-production-development/
│
├── capstone-project/        # pending
└── resources/
```

Shared `docs/` or root-level `assets/` folders can be added later if a cross-repository guide or shared visual asset is needed. Until then, setup notes, screenshots, source snapshots, and evidence remain inside the relevant day folders.

---

## 🧾 Documentation Standard

Across the repository, each completed course stage should make the work reviewable without needing outside chat history.

A completed day folder normally includes:

- a day-level `README.md`
- concept notes or study summaries
- codelab folders where hands-on work exists
- screenshots or output evidence
- source snapshots or implementation files
- troubleshooting notes when useful
- reflections that connect the work to agentic systems, security, or production readiness

The exact structure can vary by day. The important rule is that a reviewer should be able to understand **what was done, where the evidence is, and why the work matters**.

---

## 🔐 Security and Evidence Handling

This portfolio involves cloud tools, local development, generated code, API access, and agent workflows. The documentation standard therefore includes basic security hygiene:

- do not commit API keys, tokens, service account files, `.env` files, or private credentials
- use sanitized config examples when documenting local setup
- review screenshots before committing them
- avoid exposing billing information, private account details, project IDs, or sensitive terminal output
- keep failed attempts and blockers documented honestly, but without leaking private values

Day 4 and Day 5 strengthen this security focus by documenting guardrails, evaluation, trace evidence, secure lifecycle checks, and production architecture review boundaries.

---

## 🧭 How To Use This Folder

A good reading order is:

1. Start with [`course-roadmap.md`](./course-roadmap.md) to understand the course path.
2. Check [`progress-tracker.md`](./progress-tracker.md) for the current status.
3. Use [`setup-checklist.md`](./setup-checklist.md) to see the environment and security readiness state.
4. Read [`documentation-plan.md`](./documentation-plan.md) before reviewing how day folders are structured.
5. Use [`tools-and-platforms.md`](./tools-and-platforms.md) as a reference when a tool or platform appears in the day folders.
6. Use [`learning-objectives.md`](./learning-objectives.md) to understand the learning outcomes behind the work.

---

## 🔗 Back to Repository Home

Return to the main portfolio overview:

[`../README.md`](../README.md)
