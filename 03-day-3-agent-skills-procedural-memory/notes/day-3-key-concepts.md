# 🧠 Day 3 Key Concepts - Agent Skills

This file is my compact glossary for Unit 3. I kept the definitions short enough to revise quickly before the codelabs.

---

## Agent Skill

A portable folder that gives an agent a specific reusable capability.

A skill usually contains a required `SKILL.md` file and optional helper folders such as `scripts/`, `references/`, and `assets/`.

My mental model:

```text
A skill is a runbook the agent can open only when the task needs it.
```

---

## `SKILL.md`

The required file inside every skill folder.

It contains the skill metadata and the main workflow instructions. The most important metadata field is the description because the agent uses it to decide whether the skill should load.

---

## YAML frontmatter

The metadata block at the top of `SKILL.md`.

It commonly includes:

- skill name,
- description,
- version,
- author,
- allowed tools,
- license or other metadata.

This is not decoration. It is part of the routing surface.

---

## Description field

The description tells the agent what the skill does and when to use it.

A strong description should include:

- the action,
- the trigger conditions,
- the expected input or task type,
- and when not to use the skill.

Weak description:

```text
Helps with documents.
```

Stronger description:

```text
Generate structured meeting summaries from transcripts. Use when the user provides meeting notes, call transcripts, or action-item discussions. Do not use for legal contracts or code review.
```

---

## Procedural memory

The ability to remember **how** to do something step by step.

For agents, procedural memory is different from simply knowing facts. A skill packages repeatable know-how into a reusable workflow.

---

## Context rot

A performance problem where the model becomes less reliable as the active context fills with too much irrelevant or competing information.

The information may still be present, but the model does not use it consistently because attention is diluted.

---

## Attention dilution

The loss of focus that happens when many tokens compete for the model's attention.

This is why a larger context window does not automatically solve agent memory or workflow problems.

---

## Active context budget

The amount of information currently loaded into the model's working context.

My takeaway:

```text
Context is not just storage. It is working memory.
```

Every unnecessary instruction, tool schema, old result, or reference file increases pressure on that budget.

---

## Progressive disclosure

The loading strategy behind Agent Skills.

```text
1. Load metadata first.
2. Load the skill body only when triggered.
3. Load supporting resources only when needed.
```

This keeps the agent capable without keeping every workflow active at all times.

---

## `scripts/`

An optional folder for executable helper code.

Best used for deterministic work such as:

- parsing,
- validation,
- calculations,
- formatting,
- schema checks,
- repeatable transformations.

If the task requires precision, a script is often better than another paragraph of instructions.

---

## `references/`

An optional folder for deeper supporting knowledge.

Useful for:

- long policy notes,
- domain rules,
- edge-case handling,
- product documentation,
- detailed examples.

If `SKILL.md` starts becoming too long, some content probably belongs in `references/`.

---

## `assets/`

An optional folder for reusable files used by the skill.

Examples:

- templates,
- schemas,
- sample outputs,
- configuration files,
- static data.

Assets help keep the main skill body clean.

---

## MCP

Model Context Protocol.

MCP connects agents to external systems such as tools, APIs, data sources, documentation search, files, or databases.

My short version:

```text
MCP gives the agent reach.
Skills give the agent procedure.
```

---

## `AGENTS.md`

A project-level guidance file that is usually loaded all the time.

Good for:

- project conventions,
- stack notes,
- build commands,
- testing commands,
- repository rules.

If something is always relevant to the whole project, it may belong in `AGENTS.md`. If it is only relevant to a specific workflow, it may belong in a skill.

---

## Skill trigger

The moment when the agent decides a skill is relevant and loads its body.

Triggering depends heavily on the skill description. That is why descriptions need concrete action verbs and clear boundaries.

---

## Trigger failure

A skill-routing failure.

Two common cases:

- the correct skill does not trigger,
- the wrong skill triggers.

This usually points to vague, overlapping, or misleading descriptions.

---

## Execution failure

The skill triggers, but the workflow does not produce the right result.

Possible causes:

- unclear instructions,
- outdated references,
- missing tool constraints,
- broken scripts,
- bad output format guidance.

---

## Token budget failure

The skill adds too much context and hurts the agent's performance.

This can happen when:

- `SKILL.md` is too long,
- references are loaded too eagerly,
- too many skills are co-loaded,
- or intermediate outputs are pasted into the conversation instead of stored externally.

---

## Regression

A new skill breaks behavior that previously worked.

Example: a new broad “documentation-helper” skill starts triggering for tasks that should have gone to a more specific “api-reference-summary” skill.

Regression tests are needed because skill libraries interact as a system.

---

## Evaluation-Driven Development

A workflow where evaluation cases are written before or alongside the skill.

A useful eval case should define:

- input scenario,
- expected skill,
- expected tool calls,
- expected output format,
- rubric or success criteria.

This forces the skill to become a tested capability instead of a hopeful prompt.

---

## Golden dataset

A curated set of example inputs and expected outputs.

It helps test whether a skill handles common cases, edge cases, and negative cases consistently.

---

## LLM-as-Judge

A testing pattern where another model evaluates the skill output against a rubric.

Useful for scaling review, but it should not fully replace human checks for high-risk actions.

---

## Tool trajectory

The sequence of tools or actions the agent performs while completing a task.

For action-capable skills, the trajectory matters because a correct final sentence can hide a risky action path.

---

## Trajectory scoring

Evaluation that checks the path, not only the final output.

Example:

```text
Did the agent call lookup_order before issuing a refund?
Did it verify the duplicate charge?
Did it avoid unrelated mutations?
```

This is especially important for skills that can change real systems.

---

## `pass^k`

A reliability idea where a skill must pass the same evaluation across multiple consecutive runs.

It filters out lucky single-run successes.

My simple version:

```text
One pass proves the skill can work.
Repeated passes prove it is more likely to keep working.
```

---

## Read-only skill

A skill that can fetch, inspect, summarize, or explain but cannot change external state.

Lowest risk tier.

---

## Draft-only skill

A skill that can prepare an output for human review.

Examples:

- draft an email,
- prepare a materials list,
- suggest a response,
- generate a report.

The human still approves before anything is sent or committed.

---

## Action-allowed skill

A skill allowed to execute real actions.

Examples:

- send a message,
- issue a refund,
- deploy code,
- reserve inventory,
- modify data.

This tier needs stricter evaluation, logging, permission control, and human review before graduation.

---

## Meta-skill

A skill that helps create, review, improve, or evaluate other skills.

Useful, but risky if allowed to change the library without tests and human review.

---

## DAG orchestration

Directed Acyclic Graph orchestration.

A workflow structure where tasks move through a controlled graph without circular dependencies.

Useful for chaining skills while avoiding messy prompt chaining and infinite loops.

---

## File message bus

A pattern where large intermediate outputs are written to files and only file references are passed between workflow steps.

My short version:

```text
Pass file paths, not giant blobs of text.
```

This protects the context window from becoming a dumping ground.

---

## Capability profile

A scoped bundle of active skills, tools, instructions, and model settings for a specific role or execution state.

Useful when an agent needs to switch between domains without carrying every possible capability at once.

---

## Context debt

The buildup of long, brittle, repeated instructions that make the agent harder to steer.

Examples:

- too many “always do this” rules,
- duplicated warnings,
- unclear exception lists,
- bloated skill bodies.

Context debt should be reduced by moving deterministic logic into scripts and splitting broad workflows into smaller skills.

---

## Shift intelligence left

The practice of moving precise logic out of prompt instructions and into deterministic, testable code.

Instead of hoping the model follows a complex rule every time, encode the rule where it can be validated.

Example:

```text
Weak: Tell the model to always validate the JSON.
Better: Run a schema validation script.
```

---

## One-sentence memory

```text
Agent Skills package reusable know-how as portable, versioned, testable runbooks that load only when the agent needs them.
```
