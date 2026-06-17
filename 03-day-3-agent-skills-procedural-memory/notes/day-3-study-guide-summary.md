# 📝 Day 3 Study Guide Summary

This file records how I studied the Unit 3 material before starting the codelabs. The goal was not to copy every detail from the whitepaper. The goal was to understand the main architecture idea well enough to explain it and then test it inside Antigravity.

---

## 📘 Materials studied

For the theory part, I used:

- Unit 3 podcast/video summary
- Day 3 whitepaper: **Agent Skills**
- NoteGPT-style podcast summary
- NotebookLM study guide
- NotebookLM quiz / Q&A review
- NotebookLM explanation video
- Two generated infographics for visual revision

I treated the generated notes as revision aids, not as the source of truth. The main source was still the podcast and the whitepaper.

---

## 🔍 How I studied it

My study flow was:

1. Watch/listen to the podcast first to understand the story.
2. Read through the whitepaper to understand the technical framing.
3. Use NotebookLM to create a study guide and key-term review.
4. Go through short-answer questions to check recall.
5. Use quiz-style review to test whether I could explain terms without looking.
6. Generate visual summaries to make the structure easier to remember.
7. Convert the main ideas into my own GitHub notes.

The most useful part was comparing terms that sound close but are not the same: Skills, MCP, `AGENTS.md`, RAG, tools, and multi-agent systems.

---

## ❓ Questions that helped me check understanding

### What problem are Agent Skills solving?

They solve the problem of packing too much procedural knowledge into one active context. Instead of making the agent carry every workflow at all times, skills let the agent load a specific procedure only when the task needs it.

### Why is `SKILL.md` important?

`SKILL.md` is the anchor file for the skill. It describes what the skill does, when it should be used, when it should not be used, and how the workflow should run. The description field is especially important because it controls routing.

### Why is progressive disclosure useful?

Progressive disclosure keeps the active context small. The agent sees lightweight metadata first, loads the full skill body only when triggered, and accesses resources only when needed.

### How are Skills different from MCP?

MCP connects the agent to external systems. Skills tell the agent how to perform a workflow. A skill may use an MCP tool, but the two are not the same thing.

### Why can a bad skill be worse than no skill?

A bad skill can fail to trigger, trigger too often, give unclear instructions, bloat the context, or break routing for other skills. That is why skills need tests and not just good-looking markdown.

---

## 🧠 Concepts that clicked after multiple passes

### 1. Skills are not just prompts

At first, it is easy to think of a skill as another prompt template. That is too shallow.

A skill is closer to a small software package: it has a name, routing description, instructions, optional helper code, optional references, and optional assets. It can be versioned and tested like a dependency.

### 2. The description field is an interface

The description is not a casual summary. It is the first gate in the routing process.

A weak description creates routing confusion. A strong description uses concrete verbs, clear trigger conditions, and negative boundaries.

### 3. Context should be managed like a budget

The whitepaper changed how I think about long context windows. A large window gives capacity, but it does not guarantee focus.

The better engineering habit is to keep the active context small and load extra capability only when the workflow requires it.

### 4. MCP and Skills compose

Day 2 introduced MCP as a way for agents to connect with tools and external systems. Day 3 adds the procedure layer.

My current map:

```text
MCP       = connect to the system
Skill     = know what to do with that system
AGENTS.md = remember project-wide conventions
```

This distinction matters because mixing these roles can create messy agent setups.

### 5. Evaluation is part of the skill, not an afterthought

A skill without tests is hard to trust.

The most practical idea from the whitepaper was to define eval cases early: positive triggers, negative triggers, expected tool calls, expected output format, and regression checks.

This feels similar to normal software engineering: if a reusable unit has no tests, it is not production-ready.

---

## 🧪 Validation questions for the hands-on phase

Before starting the codelabs, these are the questions I want the implementation to answer:

- How does Antigravity show installed skills?
- Where do skills live on disk?
- How does the agent decide when to use a skill?
- What does a clean `SKILL.md` look like in practice?
- How do skill descriptions affect triggering?
- What happens when a skill should not trigger?
- How does Agents CLI install lifecycle skills?
- How do linting, testing, and playground workflows connect to the skills idea?
- What evidence should I capture without leaking local paths, credentials, or API keys?

These questions should keep the codelab documentation focused instead of turning it into a random command dump.

---

## 🖼️ Visual assets created

Two visual summaries were added to this folder:

| Asset | Why it is useful |
|---|---|
| `Efficient_AI_Procedural_Memory_Systems.png` | Good for remembering the three-tier progressive disclosure model and token-reduction idea. |
| `Specialist_AI_Agent_Skills_Overview.png` | Good for explaining `SKILL.md`, optional folders, and the basic skill anatomy visually. |

These visuals are study artifacts created during my own review process. They are not official course diagrams.

---

## ✅ Study outcome

After completing the podcast, whitepaper, study guide, quiz review, and visual revision, I feel comfortable explaining the Day 3 theory at a high level.

I can explain:

- what an Agent Skill is,
- why `SKILL.md` matters,
- how progressive disclosure works,
- why context rot happens,
- how Skills differ from MCP and `AGENTS.md`,
- why bad skills need evaluation,
- and why skills can make a single agent act like a specialist without turning the setup into a large multi-agent system.

The next step is implementation. The codelabs should turn this theory into actual Antigravity and Agents CLI workflow experience.
