# 📝 Day 5 Study Guide Summary

This file records how I studied the Unit 5 material before moving to the optional codelabs. The goal was not to copy the full whitepaper into the repo. The goal was to understand the production development mindset well enough to explain it and later apply it.

---

## 📘 Materials studied

For the theory part, I used:

- Unit 5 podcast / summary episode
- Day 5 whitepaper: **Spec-Driven Production Grade Development in the Age of Vibe Coding**
- NoteGPT-style podcast notes
- Podcast core-point extraction
- Smart podcast summary
- NotebookLM study guide
- NotebookLM quiz / Q&A review
- NotebookLM explanation video
- Two generated infographics for visual revision

I treated the generated notes as revision material, not as content to paste directly. The main sources were still the podcast and the whitepaper.

---

## 🔍 How I studied it

My study flow was:

1. Listen to the podcast first to get the high-level story.
2. Read through the whitepaper to understand the technical framing.
3. Use NoteGPT summaries to check whether I missed any major podcast points.
4. Use NotebookLM to create a study guide and key-term review.
5. Go through quiz-style questions to test recall.
6. Watch the explainer video to reinforce the structure visually.
7. Generate infographics to make the flow easier to remember.
8. Convert the useful ideas into my own GitHub notes.

The most useful part was comparing ideas that sound similar but are not the same: vibe coding, spec-driven development, BDD, testing, evaluation, policy servers, and sandboxing.

---

## 💡 Questions that helped me check understanding

### What is the difference between vibe coding and vibe-in-production?

Vibe coding is a fast way to explore and prototype with AI. Vibe-in-production would mean trusting that loose process inside real systems. Day 5 rejects that shortcut because production needs specs, validation, guardrails, and review.

### Why does the spec become more important than the code?

Because code can now be generated quickly. The harder and more valuable work is defining what the system should do, what it should not do, and how we will know the generated output is correct.

### Why is Gherkin useful for agents?

Gherkin forces behavior into a clear state-action-outcome structure. That reduces the agent's need to guess what should happen.

### Why are prompts alone not enough for security?

Prompts can be ignored, diluted, or attacked. Production systems need external controls: sandboxing, policy checks, human approval, context hygiene, and logging.

### Why do we need evaluation if tests already exist?

Tests catch exact deterministic failures. Evaluation catches softer behavior problems such as drift, poor tool choice, hallucination, and quality drops.

### What does a policy server add?

It intercepts tool calls before they hit external systems. It can block actions using deterministic rules and semantic checks.

---

## 🧠 Concepts that clicked after multiple passes

### 1. The code bottleneck moved

Before AI coding agents, writing code was a large part of the bottleneck. Now the bottleneck is often integration: reviewing, testing, validating, and safely shipping what the agent produced.

### 2. Specs are not just documentation

A spec is not a write-up after the work is done. In this workflow, the spec is a build input. The agent uses it to generate the system, and humans use it to review intent.

### 3. The repo should hold durable context

If an instruction matters, it should not live only in chat. It should live in a stable place like a `specs/` folder, project config, or a reusable skill.

### 4. Review has to change

Reviewing every generated line manually does not scale. The reviewer needs summaries, risk notes, tests, evaluations, and automated reviewer agents to focus attention where it matters.

### 5. Safety must be outside the model too

A model can be helpful, but it is not a security boundary. Real boundaries are enforced by sandboxes, permissions, policy servers, approval gates, and sanitized context.

---

## 🧪 Validation questions for the optional codelabs

Before starting the cloud codelabs, these are the questions I want the implementation to answer:

- What does the deployment path look like for an ADK agent?
- What files does `agents-cli` generate or require?
- How is the agent tested before deployment?
- What does dry-run validation check?
- Where do logs and traces appear after deployment?
- How does the high-value expense review flow behave when hosted?
- How does the frontend dashboard connect to the deployed agent?
- What Pub/Sub event path triggers the workflow?
- What resources need cleanup to avoid billing surprises?
- What screenshots are useful without leaking account, project, or billing details?

These questions should keep the codelab documentation focused when I work on it later.

---

## 🖼️ Visual assets created

Two visual summaries were added to this folder:

| Asset | Why it is useful |
|---|---|
| `spec-driven-development-workflow.png` | Good for remembering the flow from vibe coding to spec-first production controls. |
| `from-vibe-coding-to-production.png` | Good for remembering the blueprint/safety-net split: SDD on one side, sandbox/HITL/policy on the other. |

These visuals are study artifacts created during my own review process. They are not official course diagrams.

---

## ✅ Study outcome

After completing the podcast, whitepaper, study guide, quiz review, explainer video, and visual revision, I feel comfortable explaining the Day 5 theory at a high level.

I can explain:

- why vibe coding alone is not production development,
- why specs become the stable source of truth,
- why code can be treated as regenerable,
- how BDD and Gherkin reduce ambiguity,
- where instructions should live,
- how execution modes change prompting strategy,
- why review fatigue appears in AI-heavy workflows,
- why testing and evaluation are both needed,
- and why sandboxing, HITL, policy servers, and context hygiene form the production safety net.

The next step is optional implementation. The codelabs should turn this theory into hosted-agent and frontend workflow experience.
