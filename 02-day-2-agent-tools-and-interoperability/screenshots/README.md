# 🖼️ Day 2 Screenshot Evidence

This folder stores screenshots from the Day 2 hands-on work.

Day 2 started as a theory-heavy unit about tools, interoperability, and protocols. The screenshots here capture the practical side through two hands-on tracks: using Antigravity CLI as a local agentic development assistant, and validating Google Developer Knowledge MCP inside Antigravity as a remote documentation-search tool.

---

## 🧪 Codelab 1 — Antigravity CLI

Folder: [`codelab-1-antigravity-cli/`](./codelab-1-antigravity-cli/)

| Screenshot | What it shows |
|---|---|
| `01-cli-launched-in-project-folder.png` | Antigravity CLI launched from the dedicated `bq-release-notes` workspace folder. |
| `02-config-tool-permission-request-review.png` | Antigravity configuration showing the safer review-based permission workflow. |
| `03-permission-request-feed-inspection.png` | Permission request before running the temporary feed-inspection script. |
| `04-antigravity-build-complete-summary.png` | Antigravity completion summary after building and starting the Flask app. |
| `05-artifact-list-summary-and-inspection-scripts.png` | Artifact list showing the project summary and inspection scripts generated during the run. |
| `06-generated-project-folder-files.png` | Final local Flask app folder with `app.py`, `templates`, `static`, `README.md`, and dependencies. |
| `07-initial-app-running-dark-mode.png` | First working browser view of the generated BigQuery Release Notes Hub. |
| `08-initial-ui-cropping-and-contrast-issue.png` | Early UI issue: sidebar cards and composer layout needed polish. |
| `09-dropdown-contrast-issue-before-fix.png` | Windows browser dropdown contrast issue before the UI refinement pass. |
| `10-ui-polish-plan.png` | Antigravity analysis and implementation plan for UI polish. |
| `11-ui-polish-complete-summary.png` | Summary of UI polish changes after the first refinement pass. |
| `12-ui-polish-artifact-approval.png` | Approved artifact summary after the UI polish pass. |
| `13-ui-polished-dark-mode.png` | Improved dark mode after fixing sidebar spacing and readability. |
| `14-dropdown-contrast-fixed.png` | Dropdown options after explicit contrast styling was added. |
| `15-initial-commit-clean-status.png` | Local Git checkpoint for the initial generated app. |
| `16-ui-polish-commit-status.png` | Local Git checkpoint after the UI polish commit. |
| `17-extension-feature-prompt.png` | Prompt requesting Copy Update, Export CSV, and Light/Dark theme toggle. |
| `18-extension-implementation-summary.png` | Antigravity summary of the extension features and files changed. |
| `19-extension-buttons-added-dark-mode.png` | New extension buttons visible in dark mode. |
| `20-light-theme-toggle-working-before-qa.png` | First light mode implementation before the final QA pass. |
| `21-export-csv-download-proof.png` | Browser download evidence for `bigquery-release-notes.csv`. |
| `22-extension-qa-issues-before-refinement.png` | Manual QA identified tweet truncation and light-mode contrast issues. |
| `23-qa-refinement-summary-part-1.png` | Antigravity summary of the tweet formatting and CSS fixes. |
| `24-qa-refinement-summary-part-2.png` | Antigravity testing guidance after the QA refinement pass. |
| `25-final-dark-mode-clean-tweet.png` | Final dark mode with clean tweet text under the character limit. |
| `26-final-light-mode-readable-selected-card.png` | Final light mode with improved selected-card readability and button contrast. |
| `27-tweet-on-x-popup-proof.png` | X/Twitter intent popup proof after selecting a release-note update. |
| `28-final-extension-commit-status.png` | Final local Git checkpoint after extension features and QA refinements. |
| `29-render-start-command-failure.png` | First Render deployment failed because the start command used a placeholder WSGI module. |
| `30-render-live-deployment.png` | Public Render deployment running successfully with the final Flask dashboard. |


---

## 🔌 Codelab 2 — Google Developer Knowledge MCP

Folder: [`codelab-2-developer-knowledge-mcp/`](./codelab-2-developer-knowledge-mcp/)

| Screenshot | What it shows |
|---|---|
| `01-mcp-server-enabled-tools.png` | Google Developer Knowledge MCP server enabled in Antigravity with `search_documents`, `answer_query`, and `get_documents` visible. |
| `02-first-query-tool-permission-prompt.png` | Antigravity permission prompt before using `google-developer-knowledge/search_documents` for the first validation query. |
| `03-first-successful-workspace-mcp-answer.png` | Successful MCP-backed answer about Google Workspace MCP support with Google documentation references. |
| `04-second-query-tool-permission-prompt.png` | Permission prompt for another Developer Knowledge search query, this time around Google Workspace and Cloud Run API information. |
| `05-workspace-and-cloud-run-api-results.png` | Successful result summarizing Google Workspace API information and Cloud Run API naming details. |
| `06-cloud-run-vs-cloud-functions-table.png` | MCP-supported comparison response between Cloud Run and Cloud Functions in a concise Markdown table. |
| `07-flask-cloud-run-deployment-doc-search.png` | Documentation-backed answer giving concise steps for deploying a Python Flask app to Cloud Run. |

These screenshots show the core MCP validation flow: server enabled, tools visible, permission requested, documentation search used, and grounded developer answers returned.

---

## 🔐 Public sharing reminder

Before pushing screenshots publicly, check for:

- API keys, OAuth codes, or tokens,
- credential files or secret values,
- sensitive cloud project identifiers,
- private browser tabs,
- emails or personal account details,
- local paths that reveal unnecessary private information.

The screenshots included here are technical evidence for the codelabs and should remain safe for public portfolio use. For the MCP codelab, I kept the public evidence focused on tool availability, permission review, and documentation-backed results rather than exposing cloud-console credential screens.
