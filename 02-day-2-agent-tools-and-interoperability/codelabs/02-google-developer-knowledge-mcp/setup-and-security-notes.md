# 🔐 Setup and Security Notes — Developer Knowledge MCP Codelab

This file records the practical setup and security notes for the Google Developer Knowledge MCP codelab.

The purpose is to document the configuration responsibly without exposing private credentials or local configuration details.

---

## 🎯 Setup goal

The goal was to connect Antigravity to the **Google Developer Knowledge MCP server** so the agent could search Google developer documentation through MCP tool calls.

The setup path included:

1. using a Google Cloud project,
2. enabling the Developer Knowledge API flow required for the codelab,
3. creating an API key for the MCP connection,
4. restricting/handling the key safely,
5. enabling or installing the Google Developer Knowledge MCP server in Antigravity,
6. confirming the server tools were visible,
7. and testing the integration through real prompts.

---

## ✅ Setup completed

| Step | Status | Notes |
|---|---|---|
| Google Cloud project available | ✅ Completed | Used for Developer Knowledge API setup. |
| Developer Knowledge API setup | ✅ Completed | Required before validating the MCP server. |
| API key created | ✅ Completed | Used for the Developer Knowledge MCP connection. |
| API key handled safely | ✅ Completed | Real key is not included in this repository. |
| MCP server enabled in Antigravity | ✅ Completed | Confirmed by the enabled-server screenshot. |
| MCP tools visible | ✅ Completed | `search_documents`, `answer_query`, and `get_documents` were visible. |
| MCP tool call tested | ✅ Completed | Tool permission prompts and successful answers were captured. |

The screenshot evidence focuses on the Antigravity validation stage. Some Google Cloud Console setup screens are not included, but the setup work was completed before testing.

---

## 🧩 MCP tools observed

The enabled server view showed these tools:

| Tool | Practical meaning |
|---|---|
| `search_documents` | Searches Google developer documentation and returns relevant snippets/results. |
| `answer_query` | Produces a grounded answer from the Developer Knowledge corpus. |
| `get_documents` | Retrieves document content from selected search results. |

In the visible validation screenshots, `search_documents` was the main tool used.

---

## 🔑 API key handling

The API key was required for setup, but it should never be treated like normal documentation content.

Rules I followed for the repo:

- Do not commit the real API key.
- Do not include the raw local MCP config if it contains secrets.
- Use placeholder values in shared config examples.
- Check screenshots before publishing.
- Avoid exposing Google Cloud project identifiers unless they are intentionally public.
- Treat the key as revocable and scoped, not as a permanent credential.

The included [`mcp-config-template.json`](./mcp-config-template.json) is intentionally sanitized.

---

## 🧱 Sanitized config pattern

The exact local configuration can vary by tool and authentication method. For this repo, I am keeping only a safe template:

```json
{
  "mcpServers": {
    "google-developer-knowledge": {
      "url": "https://developerknowledge.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

For Google Antigravity, the codelab flow can install or configure the server through the Antigravity MCP server interface. The important portfolio point is not the private local config value; it is that the server was enabled, the tools were visible, and the tool calls were validated.

---

## 👀 Permission review

The most important operational behavior was the permission prompt before tool use.

The first visible prompt showed Antigravity asking before using:

```text
google-developer-knowledge/search_documents
```

That permission review is part of what makes agentic tooling safer. The model did not silently call the external documentation search tool without surfacing the action.

For future codelabs, I want to keep this habit:

- read the tool name,
- check the query being sent,
- approve only when the action matches the task,
- avoid broad always-allow behavior for unfamiliar tools,
- and capture permission evidence when it helps explain the workflow.

---

## 🧪 Validation approach

I validated the MCP setup with practical queries rather than only a generic test prompt.

The tests covered:

- Google Workspace MCP support,
- Google Workspace and Cloud Run API naming,
- Cloud Run vs Cloud Functions comparison,
- and Flask deployment guidance for Cloud Run.

This gave a better signal than asking only one simple question. It showed that the server could support different kinds of developer-documentation tasks: lookup, explanation, comparison, and step-by-step guidance.

---

## 🛡️ Security reflection

MCP makes agent workflows more capable, but capability also increases responsibility.

A documentation-search MCP server is safer than a tool that can deploy infrastructure or modify production data, but it still crosses an important boundary: the agent is no longer limited to the prompt and model context. It can call an external service.

That is why the safe workflow matters:

```text
scoped setup → sanitized config → visible tools → permission review → focused prompt → verified answer
```

This is the same pattern I want to carry into more sensitive automation work later, especially anything related to cloud, SOC workflows, ticketing systems, logs, or security operations.

---

## ✅ Public repo checklist

Before adding this codelab documentation to the public repository, I checked that:

- no API key is committed,
- no raw credential file is committed,
- no local MCP secret config is committed,
- screenshots do not show secret values,
- screenshots are placed in a dedicated codelab evidence folder,
- and the documentation explains the difference between setup completion and screenshot evidence.
