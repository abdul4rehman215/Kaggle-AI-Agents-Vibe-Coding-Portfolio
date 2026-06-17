# 🧠 Day 3 - Agent Skills & Procedural Memory

This folder documents the theory work for **Unit 3: Agent Skills** from the Google/Kaggle 5-Day AI Agents Intensive Vibe Coding Course.

Day 2 was mostly about interoperability: how agents connect to tools, documentation sources, APIs, and external systems through protocols such as MCP. Day 3 shifts the question inward:

> How can an agent carry reusable know-how without loading every instruction, workflow, and reference into the context window at once?

The main answer from this unit is **Agent Skills**. A skill turns a reusable workflow into a portable folder. The agent only keeps the lightweight routing information active, then loads the detailed instructions and supporting files when the task actually needs them.

This phase covers the podcast, whitepaper, NotebookLM review, quiz-style revision, and visual study assets. The hands-on Antigravity and Agents CLI codelabs will be added later after implementation.

---

## 📌 Current status

| Area | Status | Notes |
|---|---|---|
| Unit 3 podcast | ✅ Completed | Watched and reviewed with generated timestamped notes. |
| Agent Skills whitepaper | ✅ Completed | Read and revised using structured notes, study guide, quiz, and explanation review. |
| NotebookLM study work | ✅ Completed | Used for Q&A, glossary review, quiz practice, and concept reinforcement. |
| Infographics | ✅ Completed | Added two visual summaries for quick revision. |
| Antigravity Skills codelab | ⏳ Pending | To be completed in the next phase. |
| Agents CLI + ADK lifecycle codelab | ⏳ Pending | To be completed after the first codelab. |

The theory part is complete. The folder is intentionally kept focused for now so that codelab notes, screenshots, commands, and validation evidence can be added only after the hands-on work is actually done.

---

## 🖼️ Visual summary

The first infographic helped me connect the main architecture idea: Agent Skills act like procedural memory, with `SKILL.md`, optional scripts, references, and assets organized as a portable folder.

![Efficient AI Procedural Memory Systems](./assets/infographics/Efficient_AI_Procedural_Memory_Systems.png)

The second infographic gave me a cleaner beginner mental model: metadata is always available, the skill body loads on trigger, and resources stay outside the active context until needed.

![Specialist AI Agent Skills Overview](./assets/infographics/Specialist_AI_Agent_Skills_Overview.png)

---

## 🧠 Main learning summary

The biggest lesson from Day 3 is that **more context is not always more intelligence**.

Before this unit, it was tempting to think that a very large context window could solve agent memory problems. Just add every SOP, every coding rule, every tool description, and every workflow into the prompt. The whitepaper challenged that idea. Large context can create **context rot**, where useful instructions get buried inside noise and the model becomes less focused.

Agent Skills solve this by changing the loading pattern.

```text
One giant prompt:
Everything is loaded every time, even when most of it is irrelevant.

Skills library:
Only metadata is always visible.
The full instructions load only when the task triggers that skill.
Supporting files stay outside the token window until needed.
```

My working mental model:

```text
Agent       = general worker
Skill       = reusable runbook
SKILL.md    = runbook cover + procedure
Description = routing interface
scripts/    = deterministic helper work
references/ = deeper context for edge cases
assets/     = templates, schemas, and reusable files
```

This makes skills feel less like “extra prompt text” and more like a lightweight software primitive for packaging procedural knowledge.

---

## 📁 Folder contents

| File / Folder | Purpose |
|---|---|
| [`notes/day-3-podcast-whitepaper-notes.md`](./notes/day-3-podcast-whitepaper-notes.md) | Main narrative notes from the podcast and whitepaper. |
| [`notes/day-3-key-concepts.md`](./notes/day-3-key-concepts.md) | Compact glossary of the most important Agent Skills terms. |
| [`notes/day-3-study-guide-summary.md`](./notes/day-3-study-guide-summary.md) | How I studied the podcast, whitepaper, quiz material, and visual summaries. |
| [`resources/day-3-links.md`](./resources/day-3-links.md) | Official links for the podcast, whitepaper, and upcoming codelabs. |
| [`resources/source-material-note.md`](./resources/source-material-note.md) | Notes on source material handling, generated study aids, and what is intentionally not committed. |
| [`assets/infographics/`](./assets/infographics/) | Visual study assets created during revision. |

---

## 🧩 Why Agent Skills clicked for me

The cleanest idea is this:

> Skills separate available capability from active context.

An agent can have many capabilities available on disk, but it should not pay the attention cost for all of them on every turn. The skill description acts like the first routing gate. If the user request matches the skill's purpose, the agent loads the body. If the skill needs a script, reference file, or template, it can access that resource without turning the entire library into prompt noise.

That design feels practical because it respects the context window as a budget, not as a dumping ground.

---

## 🔌 Skills vs MCP vs AGENTS.md

This distinction was important because Day 2 already introduced MCP.

| Primitive | My working understanding |
|---|---|
| `AGENTS.md` | Always-loaded project guidance: conventions, build commands, stack notes, and global rules. |
| MCP | The agent's connection layer to external tools, APIs, databases, and documentation sources. |
| Agent Skill | The reusable procedure that tells the agent how to perform a specific workflow. |

My short version:

```text
AGENTS.md = project context
MCP       = reach / hands
Skills    = know-how / runbooks
```

Skills and MCP do not compete. A skill can tell the agent when and how to use an MCP tool as part of a workflow.

---

## 🧪 Why evaluation matters

A skill is not automatically good just because it exists.

The whitepaper made this point strongly: bad skills can reduce capability. A vague description may never trigger. An over-broad description may trigger at the wrong time. A long `SKILL.md` can create token pressure. A new skill can overlap with an existing one and break routing.

The main failure modes I want to remember are:

| Failure mode | What goes wrong |
|---|---|
| Trigger failure | The right skill does not fire, or the wrong one fires. |
| Execution failure | The skill fires but produces bad output or bad tool calls. |
| Token budget failure | The skill body or references add too much context. |
| Regression | A new skill disrupts older skills that already worked. |

That is why the paper pushes **Evaluation-Driven Development**: define test cases, expected tool trajectories, expected output formats, and negative triggers before trusting the skill.

---

## ⏭️ Next work: codelabs

The next phase is hands-on validation.

Planned work:

1. Complete **Explore how Skills work in Antigravity**.
2. Inspect how Antigravity discovers, lists, and triggers skills.
3. Complete **Build agents in Antigravity with Agents CLI and ADK**.
4. Install and verify Agents CLI lifecycle skills.
5. Document commands, prompts, screenshots, failures, and fixes.
6. Update this folder with codelab notes and evidence.

For now, this folder captures the theory foundation before implementation.

---

## ✅ Current takeaway

Agent Skills are a small idea with a large architecture impact.

Instead of trying to make one giant prompt carry every workflow, a skills library lets the agent load reusable procedural knowledge only when needed. That gives the system a cleaner way to scale capability, reduce context pressure, preserve institutional know-how, and evaluate improvements as versioned units.

The concept I want to carry into the codelabs is simple:

> Do not bloat the agent. Package the workflow, route it clearly, test it, and load it only when needed.
