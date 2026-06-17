# 🔗 Day 2 Resources and Links

This file keeps the Day 2 official links and supporting references in one place.

---

## 🎯 Official assignment links

| Resource | Link |
|---|---|
| Unit 2 podcast | https://www.youtube.com/watch?v=GjjKXqxFTOY |
| Unit 2 whitepaper | https://www.kaggle.com/whitepaper-agent-tools-and-interoperability |
| Official 5-Day Agents guide | https://www.kaggle.com/learn-guide/5-day-agents |
| Kaggle competition/course page | https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google |

---

## 🧪 Day 2 codelabs

| Codelab | Link | Current status |
|---|---|---|
| Get started with Antigravity CLI | https://codelabs.developers.google.com/antigravity-cli-hands-on#0 | ✅ Completed, documented, and deployed on Render in [`../codelabs/01-antigravity-cli/`](../codelabs/01-antigravity-cli/) |
| Explore Google Developer Knowledge MCP server in Google Antigravity | https://codelabs.developers.google.com/developer-knowledge-mcp-antigravity | ✅ Completed and documented in [`../codelabs/02-google-developer-knowledge-mcp/`](../codelabs/02-google-developer-knowledge-mcp/) |

---

## 📘 Supporting official docs

| Resource | Link | Why it matters |
|---|---|---|
| Developer Knowledge MCP docs | https://developers.google.com/knowledge/mcp | Main reference for the completed MCP codelab, including tool capabilities, API-key setup, and verification guidance. |
| Google Antigravity site | https://antigravity.google/ | Official product site. |
| Google Antigravity download | https://antigravity.google/download | Installation reference. |

---

## 📘 Study artifacts used locally

These were used during the theory study phase but are not all committed as full source documents.

| Local study material | How it was used |
|---|---|
| Podcast notes | Used to capture the high-level story and timestamped structure. |
| Smart podcast summary | Used as a second pass to confirm key points. |
| Whitepaper PDF | Used as the main technical source for Day 2 concepts. |
| NotebookLM study guide | Used for quiz-style revision and glossary review. |
| Generated infographics | Used as visual revision aids. |

---

## 🧪 Hands-on artifacts now included

| Artifact | Location | Purpose |
|---|---|---|
| Antigravity CLI codelab docs | [`../codelabs/01-antigravity-cli/`](../codelabs/01-antigravity-cli/) | Main hands-on documentation. |
| Final Flask app source | [`../codelabs/01-antigravity-cli/source/bq-release-notes/`](../codelabs/01-antigravity-cli/source/bq-release-notes/) | Complete local app source snapshot. |
| Antigravity project summary artifact | [`../codelabs/01-antigravity-cli/artifacts/release-notes-app-summary.md`](../codelabs/01-antigravity-cli/artifacts/release-notes-app-summary.md) | Cleaned generated artifact summary. |
| Sanitized inspection scripts | [`../codelabs/01-antigravity-cli/artifacts/inspection-scripts/`](../codelabs/01-antigravity-cli/artifacts/inspection-scripts/) | Feed/parser inspection scripts generated during the codelab. |
| CSV export sample | [`../codelabs/01-antigravity-cli/exports/bigquery-release-notes.csv`](../codelabs/01-antigravity-cli/exports/bigquery-release-notes.csv) | Proof that the final Export CSV feature worked. |
| Codelab 1 screenshot evidence | [`../screenshots/codelab-1-antigravity-cli/`](../screenshots/codelab-1-antigravity-cli/) | Visual evidence from setup, build, refinement, QA, and Render deployment. |
| Developer Knowledge MCP docs | [`../codelabs/02-google-developer-knowledge-mcp/`](../codelabs/02-google-developer-knowledge-mcp/) | MCP codelab documentation, prompt-result validation, setup/security notes, and sanitized config template. |
| Codelab 2 screenshot evidence | [`../screenshots/codelab-2-developer-knowledge-mcp/`](../screenshots/codelab-2-developer-knowledge-mcp/) | Visual evidence from MCP server enablement, tool permission review, and successful documentation-backed answers. |
| Live BigQuery Release Notes Hub | https://kaggle-day2-bigquery-release-notes.onrender.com/ | Public Render deployment of the Day 2 Codelab 1 Flask app. |


---

## 🛡️ Resource handling note

I am keeping this repo focused on my own documentation and learning outputs.

For that reason:

- I am linking to official course materials instead of committing full official whitepaper content.
- I am not committing API keys, credentials, OAuth tokens, or local configuration files.
- The Antigravity CLI app source is included, but generated dependency folders such as `.venv/` are excluded.
- Sanitized inspection scripts are included because they are useful for understanding the feed and may help with a future deployment or Streamlit conversion.
- Screenshots were checked before committing to avoid leaking secrets.

---

## 📝 MCP codelab evidence now included

The Developer Knowledge MCP codelab is now documented with evidence for:

- Google Developer Knowledge MCP connection inside Antigravity,
- visible MCP tools,
- permission prompts before tool use,
- successful documentation-backed prompts,
- a safe placeholder config template,
- credential-handling notes,
- and screenshot evidence from the validation stage.

The real API key and any raw local credential configuration are intentionally excluded from the repository.
