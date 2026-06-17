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
- Day 3 in progress: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)

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
- skill trigger/testing observations once Day 3 codelabs are completed

### Documentation Location

- future: [`../docs/antigravity-setup.md`](../docs/antigravity-setup.md)
- completed Day 1 evidence: [`../01-day-1-intro-to-agents-and-vibe-coding/codelabs/01-antigravity-getting-started/`](../01-day-1-intro-to-agents-and-vibe-coding/codelabs/01-antigravity-getting-started/)
- Day 3 in progress: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)

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
- Day 3 skill/agent lifecycle commands after completion

### Documentation Location

- completed Day 2 folder: [`../02-day-2-agent-tools-and-interoperability/`](../02-day-2-agent-tools-and-interoperability/)
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

Agent Skills documentation may include:

- `SKILL.md` anatomy
- trigger descriptions
- skill folder layout
- progressive disclosure notes
- skill vs MCP vs `AGENTS.md`
- evaluation notes
- screenshots showing skill discovery or triggering
- command output from installing or testing skills

### Documentation Location

- Day 3 in progress: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)

### Safety Note

Skills can include executable scripts. Treat them like dependencies: review scripts, avoid secrets, and document whether a skill is read-only, draft-only, or action-capable.

---

## 🧬 Agents CLI and ADK

**Role:** Agent lifecycle tooling for scaffolding, linting, testing, and running ADK-based agents.

Agents CLI and ADK become relevant during the Day 3 lifecycle codelab. They connect the Agent Skills idea to a practical agent development workflow.

### Repository Use

After the codelab is completed, documentation should include:

- setup verification
- commands used
- generated project structure
- linting/testing results
- playground or local run evidence
- issues faced and fixes
- security notes around API keys and local config

### Documentation Location

- Day 3 in progress: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)

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

These tools were used during Day 3 theory work to process the podcast and whitepaper more efficiently.

### Repository Use

Study-support tools should be documented carefully:

- mention how they supported learning
- convert outputs into personal notes
- avoid dumping raw generated summaries into the repo
- keep the final documentation concise and readable

### Documentation Location

- Day 3 in progress: [`../03-day-3-agent-skills-procedural-memory/`](../03-day-3-agent-skills-procedural-memory/)

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
| Google Antigravity | Agent-first development workflow | Day 1, Day 2, Day 3 folders |
| Antigravity IDE | Visual agent development environment | Day 1 and Day 3 evidence |
| Antigravity CLI | Terminal interface for agent workflows | Day 2 and future Day 3 codelabs |
| MCP | External tool/knowledge connection layer | Day 2 folder |
| Agent Skills / `SKILL.md` | Reusable procedural memory | Day 3 folder |
| Agents CLI + ADK | Agent lifecycle workflow | Day 3 codelab pending |
| Google AI Studio | Vibe coding and app generation | Day 1 codelabs |
| Cloud Run | Deployment platform | Day 1 codelabs, future deployment notes |
| Render | Supporting deployment/output evidence where relevant | Day 2 folder |
| GitHub | Portfolio and code hosting | Full repository |
| Discord | Community participation | Progress notes if relevant |
| NotebookLM / NoteGPT | Study and revision support | Day 3 study notes |
| Local Terminal / Git | Local workflow and version control | Setup and troubleshooting docs |

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

## 🟡 Day 3 Tooling Update

Day 3 has started from the theory side:

- **Agent Skills** and `SKILL.md` are the core concept.
- **NotebookLM** and **NoteGPT** were used for study support, quiz review, and concept reinforcement.
- **Antigravity Skills**, **Agents CLI**, and **ADK** are still pending hands-on codelab tools.
- The current folder should remain in progress until those codelabs produce real commands, screenshots, and testing evidence.

---

## ⭐ Final Note

The tools are not the main achievement by themselves.

The real portfolio value comes from showing how each tool was used, what was built, what was tested, what problems appeared, and what engineering judgment was applied during the process.
