# 📺 Day 1 Livestream Notes

These notes summarize the Day 1 livestream in my own words. I am not storing the full transcript here because the repo should stay focused on useful learning notes and implementation evidence.

---

## 🧭 Course framing

The livestream opened by framing the course as a practical response to how quickly software development is changing. The key message was that AI coding agents are no longer a future idea; they are becoming part of the normal developer workflow.

The course structure includes:

- white papers,
- companion podcasts,
- hands-on codelabs,
- daily livestreams / AMAs,
- and an optional capstone project.

The practical expectation is clear: do not only read about agents. Build with them, review the output, and learn where the workflow succeeds or breaks.

---

## 🧠 Shift from syntax to intent

A major point from Day 1 was the movement from traditional syntax-first programming toward intent-first development.

That does **not** mean syntax, architecture, or debugging no longer matter. It means the developer spends more time on:

- explaining the desired outcome,
- setting boundaries,
- checking generated output,
- verifying behavior,
- and deciding whether the result fits the actual problem.

This is especially important because fast code generation can create a false sense of completion. A working-looking prototype is not automatically safe, maintainable, or production-ready.

---

## 🏭 New SDLC bottlenecks

The livestream described how AI compresses the implementation stage. When implementation becomes faster, the bottleneck moves elsewhere.

The new pressure points are:

- requirement quality,
- specification clarity,
- verification,
- testing,
- review,
- and operational safety.

This maps strongly to the way real security and cloud workflows work. If the specification is vague or the verification is weak, the speed of generation can amplify mistakes instead of reducing them.

---

## 🧩 Agent = model + harness

One concept that stood out was:

```text
agent = model + harness
```

The model is the reasoning engine, but the harness is what makes the system useful in practice.

The harness can include:

- tools,
- sandboxes,
- orchestration,
- permissions,
- memory/context handling,
- tests,
- evaluation loops,
- guardrails,
- and human review points.

This is the part that connects most directly to production thinking. A model alone can generate text. A harness decides what the agent can touch, what it can execute, what it must verify, and when a human should intervene.

---

## 🛠️ Context engineering

The livestream treated context engineering as a core skill for modern AI development.

The simple version:

- Too little context makes the agent guess.
- Too much unstructured context makes the agent inefficient or confused.
- Good dynamic context gives the agent what it needs at the right time.

Agent skills were mentioned as one example of dynamic context: instead of stuffing every instruction into a permanent prompt, the agent can load a specific capability when it is needed.

That idea appears directly in my Antigravity codelab through the `code-review` skill.

---

## 🧑‍🏫 Education and hiring angle

The expert discussion around computer science education was useful. The argument was not that developers no longer need fundamentals. The better argument was that fundamentals become even more important because AI changes the surface-level work.

Syntax knowledge still helps, but the differentiator becomes:

- architecture judgment,
- problem decomposition,
- verification discipline,
- system thinking,
- and proof of work.

A portfolio like this repo matters because it shows the work, not only claims about learning.

---

## 🔁 Long-running agents

Long-running agents were discussed through examples like research, coding, scientific workflows, and dynamic business processes such as loans, insurance claims, and legal workflows.

The useful pattern is not “let an agent run forever.” The useful pattern is:

- give the agent a long task,
- provide tools,
- keep verification loops active,
- avoid wasting tokens and time,
- and add human checks where uncertainty or risk is high.

For security automation, this matters because investigations can also be long-running and context-heavy. An agent that helps with triage or investigation needs memory, tool boundaries, logs, and review gates.

---

## ⚠️ Risks discussed

The Q&A raised important risks in AI-driven SDLC:

1. **Erosion of human codebase expertise** — if AI writes and changes too much code, humans may lose deep understanding.
2. **Accountability gaps** — when something breaks, ownership can become unclear.
3. **Lost innovation** — if developers stop understanding the system deeply, they may miss better architectural opportunities.
4. **Security gaps** — agents with tools can create risk if permissions and verification are weak.
5. **Sustainability issues** — impressive demos can become expensive or impractical if not optimized.

This was one reason I kept the AI Studio app constrained: browser-only, no credentials, no backend, and no private data.

---

## 🧪 Day 1 codelabs introduced

The livestream introduced two hands-on codelabs:

1. **Google Antigravity** — explore the agentic development workspace and how agents create plans, artifacts, and code changes.
2. **Google AI Studio** — vibe-code an app from plain-language instructions and publish/test it through Cloud Run.

The advice was to read the steps carefully instead of only copy-pasting commands. That shaped how I documented the codelabs: I recorded not just the outputs, but the workflow decisions and constraints.

---

## 🧠 Personal takeaway

Day 1 made the course feel less like a tool tutorial and more like a shift in engineering behavior.

The real skill is not pressing “generate.” The real skill is knowing what to ask for, what not to allow, what to verify, and when the generated work is only a prototype.
