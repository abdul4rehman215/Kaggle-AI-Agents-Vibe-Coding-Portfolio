# Troubleshooting Notes - Ambient Expense Agent

This file keeps the environment and compatibility issues separate from the main README.

---

## ADK 2.0 API inspection

The installed ADK package did not always match assumptions from older ADK examples. Before editing the workflow, I inspected the available modules and event signatures from the active environment.

That avoided mixing ADK 1.x sequential-agent patterns with the ADK 2.0 graph workflow approach used in the codelab.

---

## Model-name compatibility

The requested model name was not available in the installed SDK/project environment, so the implementation used the closest working Gemini Flash model available locally.

This was documented as a compatibility note, not hidden as a success path.

---

## Windows shell behavior

PowerShell sometimes expands wildcard arguments before they reach CLI tools. Running the ADK web server directly through `uv run adk web` with simpler arguments avoided avoidable command parsing issues.

---

## Cloud grading limitation

The hosted grading path required cloud access/billing that was not available. Instead of bypassing evaluation, I created a local trace generator and offline grader.

That preserved the learning objective: the workflow still produced measurable evidence for routing and security containment.
