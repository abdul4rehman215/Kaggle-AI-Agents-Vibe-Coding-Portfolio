# 🧭 Day 3 Codelab 2 Notes - Agents CLI + ADK Lifecycle

These notes capture what I learned while building and testing the Day 3 `customer-support-agent` with Agents CLI and ADK 2.0.

---

## What I built

The final agent is a small customer support workflow for a shipping company.

It does not answer every question directly. It first classifies the user's request, then routes the request through the graph.

```text
shipping question   -> shipping FAQ answer
unrelated question  -> polite decline
```

The final workflow looked like this:

```text
START
  ↓
initialize_workflow
  ↓
classifier
  ↓
route_query
  ├── shipping -> shipping_faq_agent -> format_shipping_answer -> END
  └── default  -> decline_node -> END
```

This was a useful shift from thinking about a chatbot as one long prompt. The agent became a graph with visible steps.

---

## Why the graph helped

The ADK Dev UI made the workflow visible. I could see:

- the original query saved into state,
- the classifier output,
- the selected route,
- the FAQ agent output,
- and the final formatted response.

That made debugging easier than reading only the final answer.

For example, when I asked:

```text
What is the weather like?
```

The classifier returned:

```json
{"is_shipping_related": false}
```

The route moved to the decline path. That proved the refusal was not random; it came from the workflow design.

---

## The auth-mode decision mattered

The first generated code leaned toward Google Cloud / Vertex mode. That was not the right path for this local codelab because the weather assistant already exposed a Cloud billing blocker.

So I moved the project into local Gemini API-key mode.

The important validation check was:

```text
GEMINI_API_KEY: True
GOOGLE_API_KEY: True
VERTEX: False
```

The key itself was never committed. It stayed in the terminal environment.

---

## Route-map syntax was the real code fix

One issue was easy to miss: the workflow branch edges looked readable but were not valid for ADK's route-map validation.

The fix was to map routes through a dictionary:

```python
(
    route_query,
    {
        "shipping": shipping_faq_agent,
        "__DEFAULT__": decline_node,
    },
)
```

That was a good reminder that generated code can be close but still not quite aligned with the framework's runtime rules.

---

## Testing changed the agent from demo to working project

The codelab was not complete when the project scaffolded. It became complete only after validation:

- lint passed,
- app import passed,
- ADK playground started,
- shipping route passed,
- unrelated route passed,
- response-style change worked after restart,
- command-line query worked through Agents CLI.

The final command-line run was especially useful because it proved the agent was not only a browser demo.

---

## What failed and why it was useful

There were two useful failures.

First, the playground said no API key was provided. The reason was simple: the API key was set in a different PowerShell session. Setting it in the same terminal that launched ADK fixed the issue.

Second, plain `agents-cli run` timed out while starting its own local server on Windows. Since the ADK server was already running, I used:

```powershell
agents-cli run --url http://127.0.0.1:8081 --mode adk --app-name app "How long does standard delivery take?"
```

That worked.

The lesson is that agent lifecycle work includes normal software debugging: processes, ports, environment variables, framework syntax, and operating-system behavior.

---

## What I would reuse later

For a future ADK workflow, I would follow this sequence:

1. scaffold the project,
2. inspect `app/agent.py`,
3. decide local API-key mode vs Cloud mode early,
4. run lint and import checks before launching the playground,
5. test both expected and rejected routes,
6. capture graph traces,
7. verify one command-line query,
8. document the troubleshooting path honestly.

That sequence made this codelab much easier to finish cleanly.
