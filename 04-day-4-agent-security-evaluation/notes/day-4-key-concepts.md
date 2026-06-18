# 🧠 Day 4 Key Concepts - Agent Security & Evaluation

This file is my compact revision map for Day 4. I kept each concept short on purpose so it can work as a quick reference before codelabs and later review.

---

## Vibe coding

Building software by expressing high-level intent in natural language and letting an AI system generate, modify, and iterate on the code.

My note: vibe coding is fast, but speed creates risk when the generated output is trusted too quickly.

---

## Agentic engineering

A more disciplined version of vibe coding where the AI acts as an implementation engine inside clear constraints, tests, permissions, logs, and review boundaries.

```text
Vibe coding says: build this.
Agentic engineering says: build this, within these boundaries, and prove it works.
```

---

## Ambient agency

The ability of an AI agent to take real actions in an environment, such as running code, calling APIs, editing files, installing dependencies, or changing production-like systems.

This is where the risk becomes real. The agent is no longer only generating text.

---

## Agent harness

The structure around a model that turns it into an agent.

A harness can include:

- memory,
- tools,
- state,
- execution loops,
- permissions,
- constraints,
- logging,
- and human approval steps.

The harness is the real control surface.

---

## Effective Trust

A continuous trust model for agents.

Instead of trusting an agent once because it has a valid identity, the system keeps checking its behavior, context, supply chain, permissions, runtime actions, and alignment with the user's intent.

---

## Context-as-a-perimeter

A security model where the boundary is not only identity or network location. The system also checks whether an action makes sense inside the current task context.

Example: an agent optimizing a query should not suddenly install an unknown package or access unrelated secrets.

---

## Security axis

The part of trust that asks:

```text
Did the agent stay inside the safe boundary?
```

This includes sandboxing, permissions, prompt-injection defense, supply-chain controls, tool governance, and audit trails.

---

## Evaluation axis

The part of trust that asks:

```text
Did the agent produce something useful, correct, aligned, and worth shipping?
```

This includes intent satisfaction, tests, visual behavior, code quality, trajectory quality, and self-repair.

---

## 7-pillar security architecture

The baseline security framework for enterprise agents:

1. Infrastructure & Networking
2. Data
3. Model
4. Application & Runtime
5. IAM
6. Observability & SecOps
7. Governance

My summary: do not protect only the model. Protect the full system around the model.

---

## Ephemeral sandboxing

Running agent-generated code in a temporary, isolated environment that disappears after execution.

Useful because risky code should not persist, touch the host directly, or contaminate future runs.

---

## Amnesiac sandbox

A sandbox that fully resets state between runs.

This matters because agents often run a fast write-test-fix loop. A compromised or buggy state should not survive the next iteration.

---

## Slopsquatting

A supply-chain attack where attackers publish malicious packages using names that LLMs are likely to hallucinate.

The agent thinks it is installing a useful dependency. In reality, it may be pulling malware from a fake package name.

---

## SBOM

Software Bill of Materials.

A list of the software components and dependencies inside an application or artifact. In agentic workflows, SBOM checks help verify that generated dependency changes are expected and safe.

---

## Non-interactive web access

A safer model where agents do not freely browse and interact with live websites. They access sanitized, cached, or governed snapshots instead.

This helps reduce prompt injection and malicious web-content risk.

---

## Prompt injection

A malicious instruction hidden inside user input, documents, web pages, repositories, or context. The goal is to make the agent ignore its rules or perform an unintended action.

My rule:

```text
Treat external content as data, not authority.
```

---

## MCP spoofing

A risk where a forged or compromised tool server pretends to be a legitimate Model Context Protocol tool and tricks the agent into unsafe calls.

The fix is not blind tool trust. Use gateways, authorization checks, and runtime monitoring.

---

## Centralized Agent Gateway

A governed entry and exit point for agent tool calls.

It checks whether a requested action matches the user's intent, the agent's permissions, and the current context.

---

## Confused deputy problem

A security problem where an agent with legitimate access is tricked into using that access for the attacker's purpose.

This is dangerous because logs may show a valid agent action, even though the intent came from malicious hidden context.

---

## Zero Ambient Authority

A principle that says agents should not inherit broad, standing human permissions.

Instead, they should get narrowly scoped, temporary credentials for the exact task.

---

## JIT downscoping

Just-in-time permission reduction.

The agent receives fresh, limited credentials only when needed, scoped to a specific action, and expired immediately after.

---

## SPIFFE ID

A cryptographic identity pattern used to give workloads or agents unique identities.

The important idea is that agents should have observable identities separate from broad human credentials.

---

## Vibe Diff

A plain-English explanation of what the agent-generated code or action will do before a high-risk approval.

This helps the human review the real impact instead of blindly approving a complex diff.

---

## Confirmation fatigue

The habit of approving prompts, permission requests, or code changes without reading them carefully because there are too many or they are too hard to understand.

A good Vibe Diff should reduce this risk.

---

## Red Team

The attacker role in agentic SecOps.

It injects adversarial prompts, poisoned context, jailbreak attempts, and malicious examples to test whether the target agent can be manipulated.

---

## Blue Team

The defender role.

It watches agent behavior, traces, tool calls, runtime dependencies, and anomalies. For agents, this becomes Agent Behavioral Analytics rather than only traditional system monitoring.

---

## Green Team

The fixer role.

It quarantines risky agents, rolls back bad state, and may auto-refactor insecure generated code into a safer version.

---

## AgBOM

Runtime Agent Bill of Materials.

Unlike a static SBOM, an AgBOM tracks the live set of tools, models, dependencies, data sources, and resources the agent is using during execution.

---

## Vibe trajectory

The trace of how a user intent becomes agent action.

It can include prompts, model calls, tool calls, file edits, retrieved context, retries, errors, cost, and final result.

This is the evidence trail for both security and evaluation.

---

## Intent drift

When an agent's internal steps move away from the original user request.

Example: a simple optimization task turns into an attempt to install a new unauthorized library.

---

## Trust decay

The idea that trust in an agent can weaken during execution if its behavior becomes less aligned, less explainable, more costly, or more risky.

Trust is not permanent. It has to be maintained.

---

## Stateful circuit breaker

A safety mechanism that pauses, freezes, rolls back, or restricts an agent when risk signals cross a threshold.

The goal is to stop damage without corrupting connected systems.

---

## Underspecification gap

The gap between what the user says and the full specification required to build the right thing.

A prompt like `make this app cleaner` leaves many details unstated. The agent has to infer them, and evaluation has to check whether those inferences were correct.

---

## Intent satisfaction

Whether the agent built what the user actually meant, not just what the words literally said.

This is one of the hardest things to evaluate because the user's intent may be fuzzy or evolving.

---

## Functional correctness

Whether the generated code builds, runs, and passes tests.

Important, but not enough. Tests can be incomplete, removed, mocked, or gamed.

---

## Visual and behavioral correctness

Whether a UI looks right and behaves correctly when used.

For UI-producing agents, the artifact is the rendered experience, not only the code diff.

---

## Trajectory quality

Whether the agent took a sensible path.

Did it inspect the right files? Use the right tools? Sequence edits correctly? Avoid shortcuts? Recover cleanly?

Correct output from a bad trajectory can still be fragile.

---

## Self-repair behavior

How the agent responds when something fails.

A good agent diagnoses, narrows the problem, preserves tests, and fixes the cause. A weak agent may delete tests, overpatch, or create more errors.

---

## LLM-as-judge

Using a model to evaluate outputs against a rubric.

Useful for intent satisfaction, style, trajectory review, and cases where deterministic rules are not enough. It should support evaluation, not replace all human and automated checks.

---

## Multimodal evaluation

Evaluating artifacts using more than code text, such as screenshots, rendered pages, UI states, and interaction traces.

This helps catch issues that code-level checks miss.

---

## Session convergence

How quickly a user and agent reach an acceptable result across multiple turns.

Many corrections, repeated dissatisfaction, or abandoned sessions are signals that the agent did not understand the task well.

---

## My compact mental model

```text
Security asks: Did the agent stay safe?
Evaluation asks: Did the agent do the right thing well?
Observability asks: Can we prove what happened?
Governance asks: Who is accountable for the action?
```
