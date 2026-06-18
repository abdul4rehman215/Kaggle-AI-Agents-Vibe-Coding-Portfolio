# Observations - Codelab 1 Antigravity Skills

These are the practical notes I want to remember from the Antigravity Skills codelab.

---

## `SKILL.md` is the routing surface

The file is small, but it controls a lot. The `description` field decides when a skill becomes relevant. If the description is vague, the agent may never use the skill. If it is too broad, the skill may trigger in the wrong task.

A good description should say:

- what the skill does,
- when to use it,
- what input it expects,
- and what kind of task should trigger it.

---

## Supporting files make skills more reliable

The strongest examples were not just Markdown instructions.

The schema validator had a `scripts/` folder. That mattered because SQL policy checks should not depend only on the model reading a file and guessing. The script turned the skill into a repeatable validation step.

The license skill used a resource template. The JSON-to-Pydantic skill used examples. These were small additions, but they changed the skill from a prompt into a packaged workflow.

---

## Multiple skills can trigger in one task

When Antigravity created a Python file, it naturally used the license-header skill. When it committed a Git change, it used the commit formatter. This showed that skills do not always act one at a time; the agent may combine relevant skills during a development workflow.

That is powerful, but it also means skill descriptions need careful boundaries.

---

## The codelab had real environment friction

The Agents CLI setup succeeded, but the weather assistant exposed the difference between local scaffolding and cloud-backed execution.

The scaffold and ADK UI were fine. The model call failed because the generated prototype used Vertex/Agent Platform mode and the active Cloud project did not have billing enabled.

That failure was still useful. It separated code issues from environment issues:

```text
project scaffold -> works
local dependency install -> works
ADK web UI -> works
model call through Vertex -> blocked by billing
```

---

## Main takeaway

Agent Skills are useful when they behave like disciplined engineering assets: clear trigger, small scope, supporting files where needed, and validation evidence. A skill folder should not become a dumping ground for every possible instruction.
