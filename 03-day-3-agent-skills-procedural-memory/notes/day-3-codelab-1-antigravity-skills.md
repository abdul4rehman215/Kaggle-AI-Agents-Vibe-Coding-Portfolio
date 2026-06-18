# 🧪 Day 3 Codelab 1 Notes - Antigravity Skills

These are my working notes from the Antigravity Skills codelab. I kept them separate from the README so the README can stay as a portfolio overview, while this file captures what I actually noticed while doing the work.

---

## What I did

I started by auditing the local environment inside Antigravity IDE. Python, Node, uv, and Git were already installed. `agents-cli` was not available yet, and the global `~/.agents/skills` folder did not exist before setup.

The important discovery was that my project already had a workspace skills directory:

```text
my-first-project/.agents/skills/
```

It contained one existing `code-review` skill. After inspecting its `SKILL.md`, I cloned the official tutorial skills repository and copied four sample skills into the workspace.

The final workspace skills were:

- `code-review`
- `database-schema-validator`
- `git-commit-formatter`
- `json-to-pydantic`
- `license-header-adder`

Antigravity detected them from the workspace, which confirmed that the skill path was correct.

---

## What I learned about skill structure

The codelab made the anatomy of a skill much more practical.

A skill is not only the instructions in `SKILL.md`. The folder can carry extra procedural material:

```text
SKILL.md      -> routing metadata and instructions
scripts/      -> code the agent can run
resources/    -> reusable templates or supporting files
examples/     -> input/output examples that guide generation
```

This matters because different tasks need different kinds of support.

The commit formatter worked mostly through instructions. The license header skill needed a reusable template. The JSON-to-Pydantic skill benefited from examples. The database validator needed a deterministic script.

That helped me see the design choice: do not force every skill into the same shape. Add support files only where they make the workflow more reliable.

---

## Why the description field matters

The `description` field in `SKILL.md` is the part the agent sees before loading the full skill. That means it behaves like a routing contract.

A weak description can fail in two ways:

1. the skill does not trigger when it should,
2. the skill triggers on tasks that do not need it.

The best descriptions in this codelab were action-oriented and specific. They said what the skill does and when the agent should use it.

Example pattern:

```text
Formats git commit messages according to Conventional Commits specification.
Use this when the user asks to commit changes or write a commit message.
```

That is stronger than something like:

```text
Helps with Git.
```

---

## Skill tests that stood out

### Git commit formatter

The skill was used when Antigravity staged and committed changes in a small `git_test` repo. The final log showed Conventional Commit messages.

The useful part was not only the commit message. It was the fact that Antigravity routed to the skill at the right time during a normal development workflow.

### License header adder

When `my_script.py` was created, Antigravity added the license header immediately. It also adapted the comment syntax to Python.

This showed that a skill can quietly enforce a project convention during file creation.

### JSON to Pydantic

The model generation worked for both a richer customer JSON sample and the codelab's small `product.json` sample. The nullable `stock` field became optional.

This was a good example of a skill guiding output shape rather than running a command.

### Database schema validator

This was the cleanest example of a script-backed skill. The SQL file was intentionally bad, and the validator caught the expected problems:

- forbidden `DROP TABLE`,
- `userProfile` not in `snake_case`,
- `posts` missing an `id` primary key.

This skill made the strongest case for mixing LLM instructions with deterministic code.

---

## Agents CLI skill setup

Later in the codelab, I ran the Agents CLI setup flow. It installed the CLI and seven `google-agents-cli-*` skills.

Those skills covered:

- ADK code guidance,
- scaffolding,
- workflow lifecycle,
- deployment,
- evaluation,
- observability,
- publishing.

This connected the first codelab to the second one. Codelab 1 showed how skills are packaged. Codelab 2 used those skills and Agents CLI workflow patterns to build a real graph agent.

---

## Main friction point

The `weather-assistant` prototype scaffolded successfully and the ADK web UI opened. The graph rendered with tools for weather and time.

The live model call failed because the generated prototype used Vertex/Agent Platform mode and the active Cloud project had billing disabled.

I decided not to hide that failure. It is an important engineering note:

```text
Scaffolding and local UI worked.
Cloud-backed model execution needed billing configuration.
```

That distinction matters when documenting agent projects.

---

## What I would reuse later

The most reusable pattern from this codelab is:

1. write a narrow skill description,
2. keep `SKILL.md` focused,
3. use `resources/` for templates,
4. use `examples/` for output shape,
5. use `scripts/` for deterministic checks,
6. test the skill through a real task instead of only inspecting the file.

That is a practical checklist for building my own skills later.
