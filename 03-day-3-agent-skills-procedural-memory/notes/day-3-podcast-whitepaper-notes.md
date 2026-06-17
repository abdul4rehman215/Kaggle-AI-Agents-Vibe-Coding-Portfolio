# 📝 Day 3 Podcast & Whitepaper Notes - Agent Skills

These notes combine my understanding from the Unit 3 podcast and the **Agent Skills** whitepaper. I used the podcast as the first pass and the whitepaper as the deeper technical pass.

The main topic is not just “skills” as a feature. The bigger idea is how agents can use reusable procedural knowledge without carrying all of it in active context all the time.

---

## 🎯 1. The problem: bigger context is not always better

The unit started with a useful warning: giving an agent more context does not automatically make it better.

At first, a large context window sounds like the obvious fix. If a company has thousands of pages of SOPs, runbooks, coding standards, compliance policies, and product rules, just paste everything into the agent context and let the model figure it out.

The problem is that the model still has to distribute attention across everything it sees. When too many unrelated instructions are active at the same time, important details can get buried.

My short version:

```text
Large context window != clear working memory
```

This is where **context rot** becomes important. The model may still technically “have” the information, but its ability to use the right information at the right time can degrade.

The practical lesson is to treat active context like memory in software systems: useful, limited, and worth managing carefully.

---

## 🧠 2. Agent Skills as procedural memory

The phrase that helped me most was **procedural memory**.

LLMs already have something close to semantic memory because they know facts and patterns from training. They can also use conversation history as a kind of episodic memory. What they usually lack is a clean way to remember **how to do a task step by step** in a repeatable, inspectable format.

That is the role of Agent Skills.

A skill is not just another paragraph in the prompt. It is a reusable procedure packaged as a folder. The agent can discover it, route to it, load it, and use its supporting files only when needed.

My mental model:

```text
Semantic memory   = knowing facts
Episodic memory   = remembering what happened
Procedural memory = knowing how to do something
Agent Skill       = packaged procedural memory for an agent
```

This makes skills feel closer to runbooks, playbooks, and engineering checklists than ordinary prompt snippets.

---

## 📁 3. Anatomy of a Skill

The folder structure is intentionally simple.

```text
skill_name/
├── SKILL.md      # required: metadata + instructions
├── scripts/      # optional: executable helper code
├── references/   # optional: deeper context and domain material
└── assets/       # optional: templates, schemas, examples, data
```

The simplicity is the point. A skill can be reviewed, versioned, shared, tested, and moved between compatible tools.

### `SKILL.md`

This is the required file. It usually contains:

- YAML frontmatter,
- skill name,
- description,
- optional metadata,
- when to use the skill,
- when not to use it,
- workflow steps,
- examples,
- output format.

The description field matters more than it looks. It is not just a summary. It is the routing interface.

If the description is vague, the agent may never load the skill. If it is too broad, the skill may trigger at the wrong time.

### `scripts/`

This is where deterministic helper work belongs.

Examples:

- parsing files,
- validating schemas,
- calculating quantities,
- formatting outputs,
- checking constraints.

The idea is to avoid asking the model to do precise repeatable work through prose when a small script can do it reliably.

### `references/`

This is for domain context that is useful but too heavy for the main skill body.

Examples:

- policy notes,
- long examples,
- edge-case guidance,
- product documentation,
- internal runbooks.

### `assets/`

This is for reusable files the skill may need.

Examples:

- templates,
- JSON schemas,
- example outputs,
- configuration samples.

---

## 🪜 4. Progressive disclosure

Progressive disclosure is the core architecture pattern behind skills.

The agent does not load everything at once. It loads in layers.

```text
Level 1: Metadata
Always visible. Usually name + description.

Level 2: Skill body
Loaded only when the skill triggers.

Level 3: Resources
References, scripts, and assets are used only when needed.
```

This is the part that made the whole idea click for me. Skills are not only about organization. They are about **context control**.

A single general-purpose agent can have a large library of available workflows, but the active context stays focused on the current task.

---

## 📉 5. Context rot and active context budget

The whitepaper’s argument is that context should be treated as a budget.

A large context window may allow more tokens, but every extra token still competes for attention. In real agent workflows, context can fill up with:

- old tool outputs,
- unrelated instructions,
- partially relevant references,
- long system prompts,
- too many tool descriptions,
- repeated warnings,
- intermediate reasoning artifacts.

Skills reduce this pressure by keeping most workflow details out of active memory until they are needed.

My practical takeaway:

> Available capability can be large. Active context should stay small.

That distinction is important. The goal is not to hide knowledge from the agent. The goal is to route to the right knowledge at the right moment.

---

## 🔌 6. Skills vs MCP vs AGENTS.md

This was an important bridge from Day 2.

### MCP

MCP gives the agent access to external systems.

Examples:

- search documentation,
- query a database,
- read files,
- call APIs,
- interact with external services.

MCP is about **reach**.

### Agent Skills

Skills tell the agent how to perform a specific workflow.

Examples:

- how to process a refund request,
- how to prepare a release note summary,
- how to review a database migration,
- how to generate a customer-support response.

Skills are about **know-how**.

### `AGENTS.md`

`AGENTS.md` is always-loaded project guidance.

Examples:

- project stack,
- build commands,
- coding conventions,
- repository rules,
- global agent instructions.

My short mental model:

```text
MCP       = hands
Skills    = runbooks
AGENTS.md = project memory
```

The clean setup uses all three without mixing their responsibilities.

---

## 🏗️ 7. Single agent with skills vs many agents

Before this unit, a common answer to specialization was “make more agents.” A manager agent routes work to specialist agents, and each specialist has its own prompt and tools.

That still makes sense in some cases:

- true parallel work,
- separate permission boundaries,
- different models for different jobs,
- adversarial review,
- strong isolation between teams or data types.

But the whitepaper argues that many workflows do not need a whole new agent. They only need a reusable specialist procedure.

For example, if a company has 100 variants of a process, creating 100 sub-agents can become heavy. Creating 100 skills may be cleaner because each workflow becomes a small folder with its own owner, description, tests, and resources.

The practical line I want to remember:

```text
Use a new agent when you need a new actor.
Use a skill when you need reusable know-how.
```

---

## 🧪 8. Evaluation before trust

A skill should not be trusted just because it looks well-written.

The whitepaper describes predictable failure modes:

| Failure mode | What I understood |
|---|---|
| Trigger failure | The skill does not fire when needed, or fires for the wrong task. |
| Execution failure | The skill triggers but gives wrong instructions, bad output, or unsafe tool calls. |
| Token budget failure | The skill body or references become too large and create context pressure. |
| Regression | A new skill overlaps with existing skills and breaks routing. |

This makes the description field and test cases very important.

A useful evaluation habit is **Evaluation-Driven Development**:

```text
1. Write example inputs.
2. Define which skill should trigger.
3. Define expected tool calls or actions.
4. Define expected output format.
5. Then write or refine the SKILL.md.
```

That is a better workflow than writing a long skill first and hoping it works.

---

## 🧭 9. Tool trajectory matters

For simple read-only tasks, final output may be enough to judge quality.

For action-capable workflows, the path matters. An agent can produce a correct-looking final answer while taking a risky or wrong sequence of steps.

That is why trajectory scoring matters.

Example:

```text
Bad evaluation:
Did the final answer say the refund was processed?

Better evaluation:
Did the agent look up the order first?
Did it verify the duplicate charge?
Did it avoid changing unrelated customer data?
Did it return the correct confirmation format?
```

This connects strongly to security thinking. When agents can call tools, the sequence of actions matters as much as the final text.

---

## 🏭 10. Production thinking: read, draft, act

The whitepaper’s staged authority model made sense to me.

| Stage | Meaning |
|---|---|
| Read-only | The skill can fetch, summarize, or analyze, but not change state. |
| Draft-only | The skill can prepare content or recommendations, but a human reviews before action. |
| Action-allowed | The skill can perform real actions after strong testing and approval. |

This is important because not all skills carry the same risk.

A skill that summarizes documentation is not the same as a skill that issues refunds, sends emails, reserves inventory, deletes files, or changes infrastructure.

The more real-world impact a skill has, the stricter its evaluation and approval process should be.

---

## 🧬 11. Meta-skills and self-improvement

The whitepaper also introduced **meta-skills**: skills that help create, evaluate, or improve other skills.

This is powerful, but also risky.

A good use case:

```text
The agent completes a workflow successfully several times.
A meta-skill turns that repeated pattern into a draft SKILL.md.
A human reviews it before it becomes part of the library.
```

The risk is letting an agent rewrite the skill library without strong tests. It could overfit descriptions, break existing triggers, or improve one metric while making the system worse overall.

My takeaway:

> Let agents draft and improve skills, but do not skip human review and regression testing.

---

## 🧱 12. Composing skills without flooding context

Real workflows may need more than one skill.

The whitepaper warns that chaining skills by dumping every intermediate result back into the conversation can recreate the same context problem.

A cleaner pattern is to use:

- DAG orchestration,
- structured handoffs,
- file references,
- schemas,
- and deterministic scripts.

The idea is to avoid using the chat context as a database.

My short version:

```text
Pass pointers, not piles of text.
```

If a workflow produces a large JSON file or report, store it and pass a path or reference. The agent can load the part it needs instead of carrying the whole payload in the conversation.

---

## 🧠 13. What I want to test in the codelabs

The theory is clear enough now, but the codelabs should answer the practical questions:

- Where does Antigravity look for skills?
- How does the agent decide when a skill should trigger?
- What does a good `SKILL.md` look like in practice?
- How visible is the skill-loading trace during real use?
- How does Agents CLI install lifecycle skills?
- How do linting, scaffolding, testing, and playground workflows feel with skills installed?
- What screenshots and command logs should be captured without exposing secrets?

These questions will guide the next phase.

---

## ✅ Final takeaway before codelabs

Agent Skills are not just a convenience feature. They are a way to package procedural knowledge so agents can scale without drowning in their own context.

The most useful phrase for me is:

> Skills are reusable runbooks that load on demand.

That one sentence captures why the topic matters: reusable, portable, versioned, testable, and context-aware.
