# 🧠 Day 2 Key Concepts

This file is a compact reference for the main terms from Day 2. I wrote these definitions in my own words so I can quickly revise them before doing the codelabs.

---

## Agentic Engineering

A style of software development where the developer does not only write code manually, but designs systems where agents can plan, use tools, generate artifacts, and help execute workflows.

The important shift is from typing every line to guiding and verifying a system that can produce useful work.

---

## Agent = Model + Harness

The model is the reasoning/generation layer. The harness is everything around it that lets it act.

A harness can include tools, memory, files, APIs, permissions, logs, terminal access, browser access, MCP servers, and approval flows.

This formula matters because a powerful model with a weak harness is limited, while a powerful harness without boundaries can become risky.

---

## MCP - Model Context Protocol

MCP is a standard protocol for connecting models to tools and data sources.

My mental model:

```text
MCP is the tool socket for agents.
```

It helps avoid writing custom connectors for every model-tool combination.

---

## The NxM integration problem

When every model needs a custom connection to every tool, integration work grows quickly.

```text
N models x M tools = N x M custom connections
```

MCP reduces this by giving both sides a shared interface.

```text
N models + M tools = N + M protocol connections
```

The practical benefit is less custom glue code and less maintenance debt.

---

## MCP Discovery

The process of finding an MCP server that already exposes the tool or data source I need.

Possible sources:

- public registries,
- official platform servers,
- third-party managed servers,
- internal company registries.

Discovery should always be paired with a trust check.

---

## MCP Configuration

The step where I define how the MCP server is allowed to run.

This can involve:

- credentials,
- environment variables,
- read/write permissions,
- project scope,
- filesystem boundaries,
- and authentication methods.

This is where security mistakes can easily happen.

---

## MCP Connection

The step where the client connects to the server and discovers the available tools and schemas.

The handshake/list-tools step is important because the agent should call tools based on actual schema, not guesswork.

---

## stdio transport

A local MCP transport where the client communicates with the server through standard input and standard output.

Best fit:

- local prototyping,
- simple development workflows,
- tools that can run as local subprocesses.

---

## SSE over HTTP

A remote MCP transport where the client connects to a remote endpoint and receives streamed events.

Best fit:

- hosted services,
- remote MCP servers,
- managed APIs,
- deployed applications.

---

## MCP Inspector

A debugging tool for inspecting MCP servers, tool schemas, requests, and responses.

Useful when the agent calls the wrong tool or sends malformed arguments. Instead of only changing the prompt, I can inspect what is happening at the protocol boundary.

---

## Tool

A bounded capability exposed to an agent.

Examples:

- search a document,
- query a database,
- read a file,
- call an API,
- run a calculation.

A tool usually expects a structured request and returns a structured response.

---

## Specialist Agent

An agent that handles a specific domain or workflow.

Unlike a simple tool, a specialist agent may need multiple turns, clarification, negotiation, or stateful progress.

Example: a compliance review agent, billing support agent, documentation agent, or incident investigation agent.

---

## A2A - Agent-to-Agent

A protocol for communication between agents.

My mental model:

```text
A2A is the coordination channel between specialist agents.
```

It helps an orchestrator delegate work to other agents without custom integration for every framework or vendor.

---

## Bounded domain

A problem space where the task is structured and predictable.

Example:

```text
Input: stock ticker
Output: current price
```

Bounded domains usually fit tools well.

---

## Unbounded domain

A problem space where the task may require judgment, clarification, or multiple steps.

Example:

```text
Investigate this suspicious alert and decide what context is missing.
```

Unbounded domains often fit specialist agents better than simple tools.

---

## The GOTO problem in agent architecture

A problem that happens when a workflow jumps into an unpredictable agent interaction and does not return cleanly to the orchestrator.

This can happen if a collaborative specialist agent is treated like a simple tool.

A2A helps isolate and manage this messy multi-turn state.

---

## Agent Card

A machine-readable profile for an agent.

It can describe:

- capabilities,
- security policies,
- interaction schema,
- input/output expectations,
- and how to communicate with the agent.

My mental model:

```text
An Agent Card is the resume/API profile of an agent.
```

---

## Agent Registry

A place where agents can be listed and discovered.

This could be public, like a marketplace, or private, inside a company.

Registries make the idea of Agent-as-a-Service more practical.

---

## Orchestrator

The agent or system that understands the user's high-level intent and delegates work to tools or specialist agents.

The orchestrator should not do everything itself. Its job is to route, coordinate, and verify.

---

## Monolithic Ceiling

The limit a single agent hits when it becomes responsible for too many tasks, tools, schemas, and instructions.

Symptoms:

- too much context,
- tool confusion,
- hallucinated parameters,
- weaker reasoning,
- and harder debugging.

Specialization helps reduce this pressure.

---

## Attention Dilution

A failure mode where the model's context is overloaded with too many unrelated tools, instructions, or details.

The agent becomes less focused and more likely to make mistakes.

This is one reason dynamic tool loading and smaller specialist agents matter.

---

## A2UI - Agent-to-User Interface

A standard for letting agents describe user interface intent in a safe, structured way.

Instead of generating arbitrary frontend code, the agent describes what should be rendered. A trusted client renderer turns that description into UI.

My mental model:

```text
A2UI is sheet music for user interfaces.
```

---

## Generative UI

A UI that is created dynamically based on user intent and context.

Example:

```text
User asks for regional sales comparison.
Agent returns an interactive dashboard layout instead of only JSON.
```

A2UI makes this safer by keeping rendering inside trusted components.

---

## Component Catalog

A set of approved UI components that the A2UI renderer allows.

The agent can request components from the catalog, but it should not create arbitrary executable code.

This is a key part of A2UI's safety model.

---

## Canvas

A persistent workspace where the user and agent can interact with a living artifact instead of only sending linear chat messages.

The canvas idea matters because many agent workflows need ongoing updates, edits, and visual interaction.

---

## UCP - Universal Commerce Protocol

A protocol for agent-commerce interaction.

It helps agents talk to providers, browse catalogs, check options, build carts, and create orders in a standard way.

My mental model:

```text
UCP is the commerce/order language.
```

---

## AP2 - Agent Payments Protocol

A protocol for secure, rule-bound agent payments.

It helps ensure that agents can pay only within human-approved constraints.

My mental model:

```text
AP2 is the payment guardrail.
```

---

## Mandate

A human-approved payment rule used by AP2.

Example:

```text
Spend up to $25 at this merchant for this order.
```

The mandate protects against unauthorized or hallucinated payments.

---

## L402 / x402

A machine-to-machine payment pattern based around the HTTP 402 Payment Required idea.

In simple terms, a service can request payment, the calling agent can satisfy that payment, and then retry the request with proof.

This is more advanced than what I need for the codelabs, but it shows how agent marketplaces could become economically active.

---

## Final mental map

```text
MCP  = tools and data
A2A  = agent collaboration
A2UI = safe user interfaces
UCP  = commerce interactions
AP2  = payment authorization
```

The protocols are easier to understand when I stop treating them as competing ideas. Each one solves a different connection problem.
