# 🛠️ Tools and Platforms

This file explains the role of each major tool or platform used in this course portfolio.

The goal is not to provide full tutorials here. Detailed setup and codelab steps belong in the relevant day folders or `docs/`. This file acts as a quick reference for why each tool appears in the repository.

---

## 📚 Kaggle

**Role:** Course platform and capstone workspace.

Kaggle is the main course hub for the 5-day AI agents intensive. It is used for course access, learning materials, assignments, community context, and capstone participation.

### Repository Use

Kaggle-related work is documented through:

- course roadmap
- daily notes
- codelab progress
- capstone tracking
- official course references

### Documentation Location

- [`course-roadmap.md`](./course-roadmap.md)
- [`../resources/official-links.md`](../resources/official-links.md)
- [`../resources/official-course-links.md`](../resources/official-course-links.md)

---

## 🤖 Google Antigravity

**Role:** Agent-oriented development platform.

Google Antigravity is used in the course to explore agent-first development workflows. It supports working with agents that can assist with coding and non-coding tasks.

### Repository Use

Antigravity work may include:

- IDE setup notes
- CLI setup notes
- first-run screenshots
- task execution observations
- codelab evidence
- skill usage notes
- troubleshooting records
- reflections on agent-assisted development

### Documentation Location

- future: [`../docs/antigravity-setup.md`](../docs/antigravity-setup.md)
- completed Day 1 codelab: [`../01-day-1-intro-to-agents-and-vibe-coding/codelabs/01-antigravity-getting-started/`](../01-day-1-intro-to-agents-and-vibe-coding/codelabs/01-antigravity-getting-started/)
- completed Day 2 folder: [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)
- completed Day 3 folder: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)
- completed Day 4 folder: [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)
- completed Day 4 folder: [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)
- completed Day 4 folder: [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)

---

## 💻 Antigravity IDE

**Role:** Visual development environment for agentic coding workflows.

The IDE provides a workspace where agent-assisted development tasks can be planned, reviewed, and executed in a more visual way.

### Repository Use

IDE usage should be documented with:

- setup notes
- screenshots
- workflow observations
- generated artifacts where relevant
- issues or configuration steps
- skill trigger/testing observations from the completed Day 3 codelabs
- secure lifecycle observations from Day 4 project rules, command hooks, STRIDE skill usage, and TDD planning gates

### Documentation Location

- future: [`../docs/antigravity-setup.md`](../docs/antigravity-setup.md)
- completed Day 1 evidence: [`../01-day-1-intro-to-agents-and-vibe-coding/codelabs/01-antigravity-getting-started/`](../01-day-1-intro-to-agents-and-vibe-coding/codelabs/01-antigravity-getting-started/)
- completed Day 3 folder: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)

---

## ⌨️ Antigravity CLI

**Role:** Terminal-based interface for agent workflows.

The CLI is useful for local development, command-line interaction, and terminal-based agent workflows.

### Repository Use

CLI usage should be documented with:

- installation verification
- command examples
- terminal output summaries
- troubleshooting notes
- safe handling of local environment details
- Day 2 codelab evidence
- Day 3 skill and agent lifecycle commands
- Day 4 security/evaluation codelab commands, validation commands, and secure commit workflow evidence

### Documentation Location

- completed Day 2 folder: [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)
- completed Day 4 folder: [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)
- future: [`../docs/antigravity-setup.md`](../docs/antigravity-setup.md)
- future: [`../docs/troubleshooting-log.md`](../docs/troubleshooting-log.md)

---

## 🔌 Model Context Protocol (MCP)

**Role:** Connect agents to external tools, knowledge sources, and services.

MCP is important because it expands what an agent can reach. In Day 2, it was documented through the Google Developer Knowledge MCP codelab.

### Repository Use

MCP-related documentation should capture:

- what server or tool was configured
- what capability it gave the agent
- what prompt/result validation was performed
- what configuration was sanitized before public sharing
- what security boundaries or risks were noticed

### Documentation Location

- completed Day 2 folder: [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)

### Safety Note

MCP configuration can contain local paths, tokens, server details, or account-specific values. Public documentation should use sanitized examples and avoid real credentials.

---

## 🧩 Agent Skills and `SKILL.md`

**Role:** Reusable procedural memory for agents.

Agent Skills are folder-based capabilities centered around a `SKILL.md` file. They let an agent load task-specific know-how only when the task needs it, instead of putting every instruction into the active context window.

### Repository Use

The completed Day 3 Agent Skills documentation includes:

- `SKILL.md` anatomy
- trigger descriptions
- skill folder layout
- progressive disclosure notes
- skill vs MCP vs `AGENTS.md`
- evaluation notes
- screenshots showing skill discovery or triggering
- command output from installing or testing skills

### Documentation Location

- completed Day 3 folder: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)

### Safety Note

Skills can include executable scripts. Treat them like dependencies: review scripts, avoid secrets, and document whether a skill is read-only, draft-only, or action-capable.

---

## 🧬 Agents CLI and ADK

**Role:** Agent lifecycle tooling for scaffolding, linting, testing, and running ADK-based agents.

Agents CLI and ADK were used during the Day 3 lifecycle codelab and extended further during Day 4 security/evaluation work. They connect agent design to a practical lifecycle: scaffold an agent, validate it, inspect the graph, test behavior, evaluate traces, enforce security gates, and run the agent locally.

### Repository Use

The completed Day 3 and Day 4 documentation includes:

- setup verification
- commands used
- generated project structure
- linting/testing results
- playground and command-line run evidence
- issues faced, fixes, and documented workarounds
- security notes around API keys and local config
- Day 4 ambient expense workflow, trace generation, offline grading, and secure shopping-assistant lifecycle evidence

### Documentation Location

- completed Day 3 folder: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)

---

## 🧠 Google AI Studio

**Role:** AI application generation and experimentation platform.

Google AI Studio is used in the course for vibe coding workflows, where an application can be generated or improved through natural language prompts.

### Repository Use

AI Studio work may include:

- prompts used
- generated app code
- UI previews
- testing notes
- improvements made after generation
- screenshots of final output

### Documentation Location

- completed Day 1 codelab: [`../01-day-1-intro-to-agents-and-vibe-coding/codelabs/02-ai-studio-to-cloud-run/`](../01-day-1-intro-to-agents-and-vibe-coding/codelabs/02-ai-studio-to-cloud-run/)
- completed Day 4 secure lifecycle notes: [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)

---

## ☁️ Google Cloud Run

**Role:** Serverless deployment platform.

Cloud Run is used to deploy web applications generated or prepared through course codelabs.

### Repository Use

Cloud Run work should be documented with:

- deployment steps
- service setup notes
- final deployment evidence
- screenshots
- live URL if safe to share
- cleanup notes
- cost and security considerations

### Documentation Location

- future: [`../docs/cloud-run-deployment-notes.md`](../docs/cloud-run-deployment-notes.md)
- completed Day 1 deployment note: [`../01-day-1-intro-to-agents-and-vibe-coding/codelabs/02-ai-studio-to-cloud-run/deployment-notes.md`](../01-day-1-intro-to-agents-and-vibe-coding/codelabs/02-ai-studio-to-cloud-run/deployment-notes.md)
- future: deployment notes inside relevant day folders

---

## 🚀 Render

**Role:** Deployment/testing platform used where relevant for course artifacts.

Render appears in the Day 2 documentation as part of deployment/output evidence. It is not the main course platform, but it can support portfolio validation when a codelab or project needs a simple hosted result.

### Repository Use

Render-related documentation should include:

- what was deployed
- what evidence was captured
- whether the URL is safe to share
- what cleanup/cost considerations apply

### Documentation Location

- completed Day 2 folder: [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)

---


## 🧪 Semgrep, Pre-Commit, and Pytest

**Role:** Local security gates and outcome-based validation.

Day 4 introduced Semgrep, pre-commit hooks, and pytest as part of the secure agent lifecycle codelab. These tools helped turn security rules into enforceable workflow checks rather than optional reminders.

### Repository Use

The Day 4 documentation captures:

- a custom Semgrep rule for Google API-key-shaped strings
- pre-commit enforcement that blocked the intentional mock-key vulnerability
- remediation of the simulated key issue without hardcoding a real secret
- outcome-based pytest tests for the deterministic discount redemption tool
- command validation tests for safe and destructive payload handling

### Documentation Location

- completed Day 4 folder: [`../04-day-4-agent-security-evaluation/`](../04-day-4-agent-security-evaluation/)

### Safety Note

These tools are not only quality checks. In the Day 4 workflow they acted as security boundaries: block risky code before commit, validate deterministic tool behavior, and keep secret handling visible in the development process.

## 🧑‍💻 GitHub

**Role:** Portfolio, documentation, and code hosting platform.

GitHub is the public home for this learning journey. It stores the README files, codelab code, notes, screenshots, setup documentation, and final capstone artifacts.

### Repository Use

GitHub is used for:

- version control
- portfolio presentation
- documentation organization
- artifact preservation
- public technical storytelling

### Documentation Location

- root [`../README.md`](../README.md)
- all repository folders

---

## 💬 Discord

**Role:** Course community and peer interaction space.

Discord is used for community participation, introductions, updates, and potential collaboration.

### Repository Use

Discord itself is not a code platform, but community participation can support:

- course engagement
- discussion
- collaboration
- idea sharing
- capstone awareness

### Documentation Location

Discord content should not be copied directly unless it is your own message and safe to share. General community participation can be mentioned in progress notes.

---

## 📝 NotebookLM and NoteGPT

**Role:** Study-support tools for summarization, revision, quizzes, and concept reinforcement.

These tools were used during Day 3 theory work to process the podcast and whitepaper more efficiently before the hands-on codelabs were documented.

### Repository Use

Study-support tools should be documented carefully:

- mention how they supported learning
- convert outputs into personal notes
- avoid dumping raw generated summaries into the repo
- keep the final documentation concise and readable

### Documentation Location

- completed Day 3 folder: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)

---

## 🖥️ Local Terminal and Git

**Role:** Local repository management and command-line workflow.

The local terminal is used to manage files, run Git commands, push changes, and work with CLI tools.

### Repository Use

Terminal usage may appear in:

- setup notes
- troubleshooting logs
- deployment steps
- Git workflow notes
- CLI/codelab command summaries

### Security Note

Before documenting terminal output, review it for:

- usernames
- private local paths
- tokens
- environment variables
- cloud project IDs if sensitive
- account details

---

## 🔐 Environment Variables and Local Secret Files

**Role:** Safe local handling of credentials and configuration.

This course may involve API keys, cloud credentials, MCP configuration, or environment-specific setup. Those values must not be committed.

### Repository Use

Safe examples:

```text
.env.example
README instructions
placeholder values
redacted screenshots
sanitized config examples
```

Unsafe examples:

```text
.env
credentials.json
actual API keys
service account files
token outputs
private MCP config values
```

### Documentation Location

- future: [`../docs/security-and-secrets-handling.md`](../docs/security-and-secrets-handling.md)
- root `.gitignore`
- relevant day-level security notes

---

## 🧭 Tooling Summary

| Tool / Platform | Main Role | Repository Location |
|-----------------|-----------|---------------------|
| Kaggle | Course and capstone platform | `00-course-overview/`, `resources/` |
| Google Antigravity | Agent-first development workflow | Day 1, Day 2, Day 3, Day 4 folders |
| Antigravity IDE | Visual agent development environment | Day 1, Day 3, and Day 4 evidence |
| Antigravity CLI | Terminal interface for agent workflows | Day 2, Day 3, and Day 4 command evidence |
| MCP | External tool/knowledge connection layer | Day 2 folder |
| Agent Skills / `SKILL.md` | Reusable procedural memory | Day 3 folder |
| Agents CLI + ADK | Agent lifecycle workflow, local ADK testing, and evaluation-oriented agent development | Completed Day 3 and Day 4 codelabs |
| Google AI Studio / Gemini API | Vibe coding, app generation, and local Gemini API authentication | Day 1 codelabs and Day 4 local ADK verification |
| Cloud Run | Deployment platform | Day 1 codelabs, future deployment notes |
| Render | Supporting deployment/output evidence where relevant | Day 2 folder |
| GitHub | Portfolio and code hosting | Full repository |
| Discord | Community participation | Progress notes if relevant |
| NotebookLM / NoteGPT | Study and revision support | Day 3 study notes |
| Local Terminal / Git | Local workflow, version control, and secure commit validation | Setup, troubleshooting docs, and Day 4 secure lifecycle evidence |
| Semgrep / Pre-Commit / Pytest | Security scanning, commit-time enforcement, and outcome-based validation | Day 4 secure lifecycle codelab |

---

## ✅ Day 1 Tooling Update

Day 1 confirmed the practical role of the first toolchain:

- **Antigravity** was used for workspace exploration, generated source code, and a custom skill demo.
- **AI Studio** was used for prompt-to-app development.
- **Cloud Run** was used for deployment testing and then cleaned up to avoid cost.
- **GitHub** now stores the Day 1 source, notes, screenshots, and reflections in a reviewable portfolio structure.

---

## ✅ Day 2 Tooling Update

Day 2 expanded the toolchain from app generation into tool-connected agent workflows:

- **Antigravity CLI** was documented through local command-line usage.
- **MCP** was explored through the Google Developer Knowledge MCP codelab.
- **Render** appears as supporting deployment/output evidence where relevant.
- **GitHub** stores the Day 2 notes, codelab evidence, security notes, sanitized config examples, and reflection.

---

## ✅ Day 3 Tooling Update

Day 3 is now documented as completed tooling work:

- **Agent Skills** and `SKILL.md` were studied as the core procedural-memory pattern.
- **NotebookLM** and **NoteGPT** were used for study support, quiz review, and concept reinforcement before the final notes were written in a personal technical voice.
- **Antigravity IDE** was used to inspect, trigger, and validate workspace skills.
- **Agents CLI** was installed and used for skill setup, project scaffolding, linting, and lifecycle commands.
- **ADK Web UI** was used to inspect and test the customer-support graph workflow.
- **Gemini API key local mode** was used for the successful ADK codelab path while keeping secrets out of the repository.
- **uv** supported dependency installation and reproducible local execution for the generated ADK projects.

The Day 3 folder now stores the practical evidence: renamed screenshots, curated source snapshots, command notes, validation notes, and troubleshooting records.

---


## ✅ Day 4 Tooling Update

Day 4 made the tooling stack feel closest to security engineering. The work was not only to build agents, but to surround them with detection, validation, safe execution gates, and repeatable evidence.

The completed Day 4 tooling work includes:

- **ADK and Agents CLI** for scaffolding, linting, running, and inspecting local agent projects.
- **ADK Web UI** for graph inspection and tool-call proof during the ambient expense and shopping-assistant workflows.
- **Semgrep** with a custom rule that detected the intentional API-key-shaped mock vulnerability.
- **pre-commit** enforcement that blocked the first insecure commit attempt and forced remediation before the secure commit succeeded.
- **Antigravity `PreToolUse` hooks** for validating command execution requests before allowing shell-like actions.
- **STRIDE threat-modeling skill** for turning vague security concern into structured spoofing, tampering, repudiation, information disclosure, denial-of-service, and privilege-risk notes.
- **pytest** for outcome-based validation of deterministic agent tool behavior.
- **Gemini API / AI Studio local authentication** for final local Playground verification without committing credentials.

This fits the security direction of the portfolio: each tool added a boundary, a check, a trace, or a review point around the agent lifecycle.

## ⭐ Final Note

The tools are not the main achievement by themselves.

The real portfolio value comes from showing how each tool was used, what was built, what was tested, what problems appeared, and what engineering judgment was applied during the process.
