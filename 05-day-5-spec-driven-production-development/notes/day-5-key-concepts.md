# 🧠 Day 5 Key Concepts - Spec-Driven Production Development

This file is my compact revision map for Day 5. I kept the definitions short so it can work as a quick review before the optional codelabs.

---

## Spec-Driven Development

A development workflow where the specification becomes the source of truth. The agent builds against the spec instead of guessing from a vague prompt.

My note: the spec should be reviewed like architecture, not treated like extra documentation.

---

## Vibe coding

Fast AI-assisted coding from high-level intent.

Useful for prototypes, but risky when the generated output is accepted without strong specs, tests, review, or safety boundaries.

---

## Vibe-in-production

The unsafe version of vibe coding: putting loosely specified, probabilistic output into production as if it were fully validated.

Day 5 rejects this idea. Production needs intended behavior and controlled execution.

---

## Disposable code

The idea that generated code can be regenerated, rewritten, or replaced if the specification is strong enough.

This does not mean code quality is irrelevant. It means the implementation is less permanent than the behavioral contract.

---

## Specification as source of truth

The spec defines the expected behavior, constraints, interfaces, edge cases, tests, and safety boundaries.

Code should follow the spec. The spec should not be reverse-engineered from whatever code the agent happened to generate.

---

## Architectural North Star

A production spec that keeps both humans and agents aligned.

It prevents the project from drifting when multiple prompts, files, agents, and implementation passes are involved.

---

## Context fragmentation

The agent loses the plot because it is working from stale, incomplete, overloaded, or disconnected context.

Good specs reduce this by keeping the important instructions in stable files instead of scattered chat messages.

---

## Markdown + YAML hybrid format

A practical documentation format where Markdown explains narrative intent and YAML captures structured configuration.

My note: Markdown is good for human-readable sections; YAML is cleaner for structured data than deeply nested prose.

---

## Token economics / token physics

The idea that every character, newline, repeated instruction, and nested symbol consumes model context and attention.

Large context windows help, but clean context still matters.

---

## Behavior-Driven Development

A method for describing software behavior before implementation.

In this unit, BDD matters because it turns vague goals into explicit state-action-outcome rules.

---

## Gherkin

A structured syntax for BDD scenarios.

Typical shape:

```gherkin
Scenario: A specific behavior
  Given a starting condition
  When an action happens
  Then an expected outcome should occur
```

---

## Given / When / Then

The core Gherkin pattern.

| Keyword | Meaning |
|---|---|
| Given | Starting state or context. |
| When | Action or trigger. |
| Then | Expected outcome. |

This helps the agent reason through behavior instead of inventing missing steps.

---

## Architect mode

The execution mode for scaffolding a new project.

The agent should first propose folder structure, tech stack, dependencies, tests, docs, and logging before writing code.

---

## Builder mode

The execution mode for adding features to an existing project.

The agent should match existing patterns, error handling, names, and file organization. Review the diff carefully.

---

## Forensic specialist mode

The execution mode for bug fixing.

The agent should start with evidence, create a failing test or reproduction command, and fix only the root cause.

---

## Evidence prompting

A bug-fixing prompt style based on logs, traces, errors, commands, and reproduction steps.

Better than saying "it does not work" because it gives the agent a grounded starting point.

---

## Author mode

The execution mode for documentation work.

In SDD, documentation is part of the system contract. If documentation and code drift apart, agents can begin building from the wrong assumptions.

---

## Librarian mode

The execution mode for querying or moving data.

The agent should show the query, command, or transformation used so the result can be checked.

---

## MCP

Model Context Protocol. A standard way for agents to connect to tools, APIs, databases, and file systems.

My map:

```text
MCP gives reach.
Specs give intent.
Skills give procedure.
Policy gives permission.
```

---

## Approval fatigue

The exhaustion that comes from approving too many agent actions, diffs, or micro-decisions.

The risk is that humans begin clicking approve without meaningful review.

---

## Conditional LGTM

A review pattern where a human approves the intent or core logic, but merge only happens after automated checks pass.

This reduces review delay without removing guardrails.

---

## AI reviewing AI

Using AI systems to review AI-generated code, summaries, risks, or PRs.

This becomes necessary when the amount of generated code is too high for manual review alone.

---

## Tier 1 review runtime

Managed/off-the-shelf AI reviewer.

Fast to enable, but its judgment may be generic and not tuned to the team's rules.

---

## Tier 2 review runtime

Hybrid reviewer using team-owned prompts or skills inside CI/CD.

Good starting point when the team needs repo-specific checks without owning a full custom runtime.

---

## Tier 3 review runtime

Fully custom reviewer with memory, durable context, graph-native code understanding, sub-agents, observability, and policy controls.

Powerful, but expensive to own and operate.

---

## Graph-native code understanding

Representing code, docs, tickets, and dependencies as a graph so the agent can understand relationships, not only text similarity.

Useful for large legacy systems where simple RAG loses structure.

---

## Knowledge graph

A structured map of entities and relationships.

For code review, it can represent files, classes, functions, service calls, dependencies, owners, tickets, and design docs.

---

## Vector search

Search based on meaning rather than exact words.

Useful when two pieces of code describe the same idea using different language.

---

## Full-text search

Search based on exact identifiers, strings, function names, class names, or literals.

Still important because code often depends on exact names.

---

## Sandboxing

Running agent-driven tasks in isolated, low-privilege, disposable environments.

If something goes wrong, the damage should stay inside the sandbox.

---

## Human-in-the-loop

A checkpoint where a human reviews and approves high-risk actions.

Best used for deployments, financial actions, database changes, production access, or sensitive data operations.

---

## AI-generated test coverage

Using the agent to write tests, including failing tests or reproduction commands before a fix.

This turns fast generation into something that can be checked repeatedly.

---

## Evaluation

A quality check for probabilistic systems where exact pass/fail tests are not enough.

Evaluation can score behavior, compare against a baseline, and detect drift.

---

## Behavioral drift

A system still runs but slowly changes behavior in a way that hurts quality, trust, or user experience.

Tests may pass while behavior gets worse.

---

## Policy server

A governance layer that intercepts agent actions before they reach external systems.

It keeps permission and safety logic separate from the agent's own reasoning.

---

## Structural gating

Deterministic policy checks.

Example: a viewer role cannot use `send_email`, or localhost cannot call a production payment tool.

---

## Semantic gating

Meaning-based policy checks, often using a secondary LLM.

Example: the tool is allowed, but the email content contains unmasked PII, so the action should be blocked.

---

## Context hygiene

Keeping sensitive or irrelevant data out of the model context.

This includes masking PII, using placeholders, avoiding real customer data in tests, and sanitizing tool arguments.

---

## Prompt sanitization

Cleaning incoming or outgoing text so malicious instructions, leaked secrets, or unsafe content do not get passed into the agent workflow unchecked.

---

## Dynamic context resolver

A utility that replaces placeholders like `[[COMMENTER_EMAIL]]` with approved runtime values.

This avoids hardcoding sensitive data in prompts, tests, or examples.

---

## Final revision map

```text
Spec -> Behavior -> Implementation -> Test -> Evaluate -> Review -> Govern -> Deploy
```

That is the Day 5 production mindset in one line.
