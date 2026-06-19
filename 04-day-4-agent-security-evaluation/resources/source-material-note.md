# 📘 Source Material Note - Day 4

This file documents what material was used for the Day 4 theory notes, codelab documentation, and source snapshots.

---

## Source material used

The Day 4 theory notes were based on:

- the official Day 4 podcast / summary episode,
- the official **Vibe Coding Agent Security and Evaluation** whitepaper,
- NoteGPT-style podcast notes,
- podcast core-point extraction,
- smart podcast summary,
- NotebookLM study guide and review material,
- NotebookLM quiz / Q&A revision,
- NotebookLM explainer video,
- two visual infographics created during study revision,
- and my own interpretation of the concepts before starting the codelabs.

The hands-on documentation was based on:

- the completed ambient expense agent source snapshot,
- the completed secure shopping assistant source snapshot,
- Antigravity implementation summaries,
- local test and scan output,
- local ADK Playground evidence,
- screenshot evidence from both codelabs,
- local evaluation scorecard artifacts,
- and post-codelab cleanup decisions.

---

## What is committed

This folder includes:

- human-readable study notes,
- compact key-concept notes,
- codelab READMEs,
- command notes,
- validation records,
- troubleshooting notes,
- curated source snapshots,
- selected codelab artifacts,
- renamed screenshot evidence,
- a screenshot index,
- and a Day 4 security engineering reflection.

---

## What is intentionally excluded

The following are intentionally excluded:

- real API keys,
- `.env` files,
- Google Cloud credential files,
- Application Default Credentials files,
- virtual environments,
- local ADK session databases,
- Python bytecode caches,
- raw runtime logs,
- `.ruff_cache`, `.pytest_cache`, and `.google-agents-cli` folders,
- account-specific API-key setup screenshots,
- and any private billing/account screenshots.

---

## About the source snapshots

The source snapshots are not raw workspace dumps. They are cleaned copies of the working projects.

For Codelab 1, the source snapshot preserves the expense-agent implementation, tests, local evaluation scripts, traces, and scorecard.

For Codelab 2, the source snapshot preserves the shopping assistant, `.agents/` security configuration, Semgrep/pre-commit files, tests, threat model, evidence docs, and the full generated Terraform deployment scaffold as evidence. Runtime state files and local caches were removed.

---

## Why this matters

Good public documentation should be useful, readable, and safe.

That matters even more for Day 4 because the topic itself is security and evaluation. It would be inconsistent to document agent security while casually committing credentials, runtime databases, or noisy local environment files.
