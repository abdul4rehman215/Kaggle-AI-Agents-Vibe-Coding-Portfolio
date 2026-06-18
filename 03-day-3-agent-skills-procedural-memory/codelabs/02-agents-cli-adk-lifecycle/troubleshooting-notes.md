# Troubleshooting Notes - Codelab 2 Agents CLI + ADK Lifecycle

This file records the issues that appeared during the codelab and how they were resolved.

---

## 1. Vertex mode repeated the Codelab 1 billing problem

The first generated version of `app/agent.py` used Google Cloud ADC and forced Vertex mode.

That was not ideal for this codelab because the earlier weather assistant had already shown that the active Cloud project was blocked by billing.

Fix:

- removed `google.auth.default()` setup,
- removed forced `GOOGLE_CLOUD_PROJECT`,
- removed forced `GOOGLE_GENAI_USE_VERTEXAI=True`,
- used Gemini API-key mode for local development,
- used model string values such as `"gemini-2.5-flash"` directly in the `LlmAgent` definitions.

---

## 2. ADK route-map validation

The first routed workflow used separate 3-tuples for route branches.

That looked readable, but ADK validation rejected it. The fix was to use a route-map dictionary from the router node:

```python
(
    route_query,
    {
        "shipping": shipping_faq_agent,
        "__DEFAULT__": decline_node,
    },
)
```

The router still returns `EventActions(route="shipping")` for shipping queries and `EventActions(route="unrelated")` for unrelated queries. Since `unrelated` is not explicitly mapped, it falls through to `__DEFAULT__`, which is the decline node.

---

## 3. API key was set in the wrong terminal session

The first ADK playground test failed with:

```text
No API key was provided.
```

The key had been set earlier, but PowerShell environment variables set with `$env:` are session-local. The ADK server was started in a terminal session that could not see the key.

Fix:

- stopped the server,
- set `GEMINI_API_KEY` and `GOOGLE_API_KEY` in the same terminal that launched ADK,
- verified with a boolean check instead of printing the key,
- restarted the playground.

---

## 4. Windows reload behavior

ADK printed a warning that reload is not supported on Windows because of the event loop used by Uvicorn.

Instead of relying on automatic hot reload, I used a safe restart loop:

1. stop the ADK server,
2. update `agent.py`,
3. run lint/import checks,
4. restart `uv run adk web`,
5. retest the prompt in a new session.

That still validated the response-style change without depending on unsupported reload behavior.

---

## 5. Plain `agents-cli run` timed out

The command below failed by timing out while starting a local server:

```powershell
agents-cli run "How long does standard delivery take?"
```

Because the ADK server was already working on port `8081`, I used Agents CLI remote endpoint mode:

```powershell
agents-cli run --url http://127.0.0.1:8081 --mode adk --app-name app "How long does standard delivery take?"
```

That succeeded and satisfied the command-line execution goal.

---

## Practical lesson

Most failures in this codelab were not prompt failures. They were runtime alignment issues: auth mode, route syntax, terminal environment, operating-system behavior, and local server startup. That is exactly why agent development needs real validation instead of only reading generated code.
