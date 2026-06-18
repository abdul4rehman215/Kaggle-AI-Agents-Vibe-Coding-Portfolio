# 🪞 Day 3 Reflection - Agent Skills & Procedural Memory

Day 3 changed how I think about agent memory.

Before this unit, I mostly thought about memory as “more context” or “better retrieval.” The whitepaper and codelabs made the problem more precise. A useful agent does not need every instruction loaded all the time. It needs the right procedure at the right moment.

That is why skills clicked for me.

A skill is not just a prompt snippet. It is closer to a small operational package. It can include routing metadata, instructions, templates, scripts, and examples. When built well, it reduces context noise and gives the agent a sharper way to act.

---

## What felt most practical

The database-schema-validator skill was the best example. The model could have tried to inspect SQL manually, but the skill told it to run a validator script. That made the result more reliable.

This is the part I want to remember:

```text
Use the model for judgment and workflow.
Use scripts for checks that should be deterministic.
```

That pattern will matter in real projects.

---

## What the ADK codelab added

The customer support workflow showed the next layer: once a reusable procedure becomes an agent workflow, I need to validate the graph, not just the final answer.

The ADK playground made the route visible:

- query enters,
- classifier decides,
- router chooses a path,
- FAQ agent or decline node responds.

That made debugging less vague. I could see whether the classifier, route, or final answer was the problem.

---

## What was messy but useful

The errors were actually valuable:

- Vertex mode hit billing restrictions.
- API keys were session-local in PowerShell.
- ADK reload behaved differently on Windows.
- Plain `agents-cli run` timed out, while `agents-cli run --url` worked.
- A route list that looked reasonable still failed ADK validation.

Those are not just random setup issues. They are part of agent engineering. Agents still run inside real software environments, with auth, ports, frameworks, package versions, and operating-system behavior.

---

## Final takeaway

Day 3 made the phrase **procedural memory** feel concrete.

A good agent does not only need access to facts. It needs repeatable ways to do work. Skills and ADK workflows give that know-how a structure I can inspect, test, and reuse.
