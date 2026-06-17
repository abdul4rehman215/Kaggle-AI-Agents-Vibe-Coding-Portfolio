# 🔌 Codelab 2 — Google Developer Knowledge MCP in Antigravity

This folder documents my second Day 2 hands-on codelab: configuring and validating the **Google Developer Knowledge MCP server** inside **Google Antigravity**.

The goal of this codelab was different from the Antigravity CLI app build. I was not building another web app here. I was testing a more focused Day 2 idea:

> Can an agent inside Antigravity connect to an official MCP server, ask permission before using a tool, search Google developer documentation, and return grounded technical answers?

That makes this codelab a practical bridge between the Day 2 theory and real tool-connected agent behavior.

---

## 🎯 What I completed

I completed the Google Developer Knowledge MCP setup and validation workflow for Antigravity.

The completed work included:

- enabling the required Developer Knowledge API flow in Google Cloud,
- creating the API key needed for the MCP connection,
- keeping the key out of the repository and screenshots,
- enabling the Google Developer Knowledge MCP server in Antigravity,
- confirming that Antigravity exposed the MCP tools,
- reviewing tool-use permission prompts before execution,
- testing real documentation queries through the MCP server,
- checking that responses were grounded in Google documentation,
- and preserving screenshots from the validation stage.

The screenshot set focuses mainly on the Antigravity-side validation, because that is where the MCP behavior is visible. Not every Google Cloud Console setup screen is included in this repo, but the API-key setup step was completed before the validation screenshots were captured.

---

## 🧭 Why this belongs in Day 2

Day 2 is about **Agent Tools & Interoperability**.

The first codelab showed an agent using local development tools to create and refine a Flask app. This second codelab showed a different kind of tool use: connecting the agent to an official remote documentation source through MCP.

That difference matters.

Without MCP, an assistant may answer from general model knowledge or whatever context is already loaded. With the Developer Knowledge MCP server connected, the assistant can call a documentation tool and retrieve relevant Google developer documentation during the task.

The practical pattern looked like this:

```text
User prompt
   ↓
Antigravity decides a documentation lookup is useful
   ↓
MCP tool permission prompt appears
   ↓
User reviews and approves the tool call
   ↓
Developer Knowledge MCP searches Google developer docs
   ↓
Antigravity returns a grounded answer with documentation references
```

For me, this made MCP feel less abstract. It is not only a protocol name from the whitepaper. It is a visible workflow where an agent discovers tools, requests permission, and uses external documentation in a controlled way.

---

## 🛠️ Tools and environment

| Area | Details |
|---|---|
| Development environment | Google Antigravity |
| MCP server | Google Developer Knowledge MCP server |
| Authentication method | API key flow |
| Cloud setup | Google Cloud project with Developer Knowledge API enabled |
| Main MCP tools observed | `search_documents`, `answer_query`, `get_documents` |
| Documentation target | Google developer documentation corpus |
| Evidence type | Antigravity screenshots and prompt-result records |

---

## 📦 Folder contents

| File | Purpose |
|---|---|
| [`README.md`](./README.md) | Main codelab documentation and evidence summary. |
| [`prompts-and-results.md`](./prompts-and-results.md) | Test prompts, MCP behavior, results, and screenshot mapping. |
| [`setup-and-security-notes.md`](./setup-and-security-notes.md) | Setup notes, credential handling, permission review, and safety observations. |
| [`mcp-config-template.json`](./mcp-config-template.json) | Sanitized placeholder-only MCP config template. No real key is included. |

Screenshot evidence is stored in the Day 2 screenshot folder:

📂 [`../../screenshots/codelab-2-developer-knowledge-mcp/`](../../screenshots/codelab-2-developer-knowledge-mcp/)

---

## 🖼️ Evidence highlights

### MCP server enabled with available tools

![Google Developer Knowledge MCP server enabled with tools visible](../../screenshots/codelab-2-developer-knowledge-mcp/01-mcp-server-enabled-tools.png)

Antigravity showed the Google Developer Knowledge MCP server as enabled and listed the available tools: `search_documents`, `answer_query`, and `get_documents`.

This was the first validation checkpoint. Before testing prompts, I wanted to confirm that the MCP server was actually available inside the environment and not only described in the codelab instructions.

---

### Human review before tool use

![Antigravity permission prompt before using the Developer Knowledge search tool](../../screenshots/codelab-2-developer-knowledge-mcp/02-first-query-tool-permission-prompt.png)

The next checkpoint was permission review. Antigravity asked before using `google-developer-knowledge/search_documents`.

This is a small screenshot, but it is important. It shows the same security idea repeated across Day 2: tool access should be visible and reviewable, especially when an agent is reaching outside the local prompt context.

---

### First successful MCP-backed answer

![Successful Developer Knowledge MCP answer about Google Workspace MCP support](../../screenshots/codelab-2-developer-knowledge-mcp/03-first-successful-workspace-mcp-answer.png)

The first successful test asked whether Google Workspace has MCP server support. Antigravity used the Developer Knowledge MCP flow and returned an answer with references to Google documentation.

This confirmed the main outcome of the codelab: the server was not only installed, it was being used during the conversation.

---

### Practical documentation lookup for Cloud Run deployment

![Developer Knowledge MCP result for deploying a Flask app to Cloud Run](../../screenshots/codelab-2-developer-knowledge-mcp/07-flask-cloud-run-deployment-doc-search.png)

The final visible test asked for concise steps to deploy a Python Flask app to Cloud Run. This was a practical query because it connects to the earlier course work around web apps and deployment.

The response returned a short deployment sequence and referenced Google documentation instead of relying only on generic memory.

---

## 🧪 Validation tests completed

I tested the MCP connection with four visible prompt categories:

| Test | Focus | Result |
|---|---|---|
| 1 | Google Workspace MCP support | Successful documentation-backed response. |
| 2 | Google Workspace and Cloud Run API names | Successful API/documentation lookup response. |
| 3 | Cloud Run vs Cloud Functions comparison | Successful concise Markdown comparison table. |
| 4 | Python Flask deployment to Cloud Run | Successful step-by-step answer grounded in Google docs. |

The detailed prompt/result record is kept in [`prompts-and-results.md`](./prompts-and-results.md).

---

## 🔐 Security observations

This codelab involved credentials, so I treated the documentation carefully.

What I kept in the repo:

- sanitized setup notes,
- a placeholder-only MCP config template,
- screenshots where no API key is visible,
- and prompt/result evidence from Antigravity validation.

What I did not commit:

- real API keys,
- local credential files,
- private Google Cloud project identifiers,
- raw local config containing secrets,
- or screenshots that expose sensitive values.

The security lesson was clear: MCP makes agents more useful, but it also makes permission and credential boundaries more important. A documentation-search MCP server is relatively low-risk compared with tools that modify cloud resources, but the setup still deserves careful handling.

---

## 🧠 What I learned

The most useful part of this codelab was seeing MCP as a working developer workflow.

In theory, MCP sounds like a connector standard. In practice, I saw three concrete things:

1. **Tool discovery** — Antigravity showed the available Developer Knowledge MCP tools.
2. **Permission review** — Antigravity asked before calling a tool.
3. **Grounded retrieval** — the responses were tied to Google developer documentation.

That changed how I think about documentation inside agentic workflows.

Instead of copying long documentation pages into a prompt or relying on model memory, the agent can query an official documentation corpus when needed. The human still has to review the result, but the workflow is more reliable than guessing from stale context.

For cybersecurity and cloud automation, this pattern matters. A future security or cloud operations agent should not rely only on general memory for commands, permissions, APIs, or deployment steps. It should be able to retrieve current, official, scoped documentation and show the tool boundary clearly.

---

## ✅ Status

```text
Developer Knowledge API setup: completed
API key setup: completed
MCP server enabled in Antigravity: completed
MCP tools visible: completed
Tool permission prompts reviewed: completed
Documentation queries tested: completed
Screenshot evidence preserved: completed
Secrets committed to repo: no
```

---

## 🔗 References

- Official codelab: https://codelabs.developers.google.com/developer-knowledge-mcp-antigravity
- Developer Knowledge MCP documentation: https://developers.google.com/knowledge/mcp
