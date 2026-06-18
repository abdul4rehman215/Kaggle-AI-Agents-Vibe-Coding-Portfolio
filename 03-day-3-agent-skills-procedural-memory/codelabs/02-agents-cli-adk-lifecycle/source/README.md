# Source Snapshot - Codelab 2 Agents CLI + ADK Lifecycle

This folder keeps the curated source snapshot for the final `customer-support-agent` project.

| Folder | Purpose |
|---|---|
| [`customer-support-agent/`](./customer-support-agent/) | Final ADK graph workflow agent source, project metadata, tests, and lockfile. |

Removed from the source snapshot:

- `.venv/`
- `.ruff_cache/`
- `.google-agents-cli/`
- `.adk/` local session storage
- `__pycache__/`
- compiled Python files
- secrets or `.env` files

The project uses local Gemini API-key mode during testing, but the API key is not stored in the repo.
