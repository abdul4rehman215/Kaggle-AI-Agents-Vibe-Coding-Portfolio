# 🧪 Codelab 1 — Antigravity CLI BigQuery Release Notes App

This folder documents my Day 2 hands-on work for the official **Antigravity CLI** codelab.

The goal was not only to run a command-line AI tool. The real learning goal was to experience how an agentic development assistant can inspect a project folder, use tools, create code, run local commands, generate artifacts, and then improve the result through human review.

The final output is a local Flask web app called **BigQuery Release Notes Hub**.

It fetches the Google Cloud BigQuery release notes XML feed, parses individual updates, displays them in a searchable dashboard, and adds practical sharing/export features.

---

## 🎯 What I built

I built a local web app that turns the BigQuery release notes feed into a small interactive dashboard.

Final app capabilities:

- live BigQuery release notes feed parsing,
- searchable and filterable update cards,
- master-detail release-note viewer,
- manual refresh with feed cache behavior,
- X/Twitter-ready update composer,
- Copy Update button,
- Export CSV for currently visible updates,
- light/dark theme toggle,
- cleaned tweet formatting under 280 characters,
- and UI polish for Windows browser contrast issues.

The app is intentionally simple in architecture: Python Flask on the backend, vanilla HTML/CSS/JavaScript on the frontend.

---

## 🧭 Why this belongs in Day 2

Day 2 is about **Agent Tools & Interoperability**.

This codelab made that theme practical. Antigravity CLI was not just answering questions. It used tools around the model:

- terminal commands,
- local file creation,
- temporary inspection scripts,
- dependency installation,
- local server execution,
- browser-visible output,
- artifacts,
- and iterative code modification.

That changed the work from a chat response into an agentic development workflow. The agent could act inside a real workspace, but the important part was still human review: checking permissions, testing the app, noticing UI problems, and asking for focused fixes.

---

## 🛠️ Tools and environment

| Area | Details |
|---|---|
| OS | Windows |
| Terminal | Command Prompt |
| Agent tool | Antigravity CLI |
| Language/runtime | Python 3 |
| Web framework | Flask |
| Frontend | Vanilla HTML, CSS, JavaScript |
| Version control | Git |
| Extra CLI check | GitHub CLI installed, but final push was intentionally postponed |

I used a dedicated workspace folder instead of running the agent directly from the home directory:

```text
%USERPROFILE%\agy-cli-projects\bq-release-notes
```

For the portfolio copy, local-only folders such as `.venv/`, `__pycache__/`, and `.gemini/` are excluded.

---

## 📦 Folder contents

| Path | Purpose |
|---|---|
| [`source/bq-release-notes/`](./source/bq-release-notes/) | Final Flask app source code. |
| [`commands-used.md`](./commands-used.md) | Exact commands used during setup, verification, Git checkpoints, and testing. |
| [`prompts-used.md`](./prompts-used.md) | The Antigravity prompts used to build, polish, extend, and QA the app. |
| [`observations.md`](./observations.md) | Practical notes about what happened, what differed from expectation, and what I learned. |
| [`testing-and-validation.md`](./testing-and-validation.md) | Manual QA checklist and final validation results. |
| [`artifacts/release-notes-app-summary.md`](./artifacts/release-notes-app-summary.md) | Cleaned Antigravity-generated project summary artifact. |
| [`artifacts/inspection-scripts/`](./artifacts/inspection-scripts/) | Sanitized scratch scripts generated during feed and parser inspection. |
| [`exports/bigquery-release-notes.csv`](./exports/bigquery-release-notes.csv) | Sample CSV export produced by the final app. |

---

## 🧱 App architecture

```text
Google Cloud BigQuery XML feed
        ↓
Flask backend in app.py
        ↓
/api/release-notes JSON endpoint
        ↓
Browser UI in templates/index.html
        ↓
static/js/main.js + static/css/style.css
        ↓
Search, filter, copy, export, theme toggle, and X/Twitter share
```

The backend does the feed fetching and parsing. The frontend handles interaction, filtering, copy/export behavior, theme state, and tweet drafting.

---

## 🖼️ Evidence highlights

### Workspace-scoped CLI launch

![Antigravity CLI launched inside the project folder](../../screenshots/codelab-1-antigravity-cli/01-cli-launched-in-project-folder.png)

I launched Antigravity CLI from the dedicated `bq-release-notes` folder. This kept the workspace scoped to the app instead of giving the agent a broad home-directory context.

### Human-in-the-loop permission review

![Permission request before running feed inspection](../../screenshots/codelab-1-antigravity-cli/03-permission-request-feed-inspection.png)

Antigravity asked before running the temporary feed-inspection script. I used one-time approvals rather than broad always-allow permissions.

### First working app

![Initial working BigQuery Release Notes app](../../screenshots/codelab-1-antigravity-cli/07-initial-app-running-dark-mode.png)

The first generated app worked, but it still needed human QA. Some UI details were clipped or low-contrast on Windows.

### UI polish after review

![Polished dark mode after sidebar and dropdown fixes](../../screenshots/codelab-1-antigravity-cli/13-ui-polished-dark-mode.png)

After testing the first version, I asked Antigravity for a targeted UI polish pass. This fixed sidebar spacing, selected-card readability, dropdown contrast, and button behavior.

### Extended codelab features

![Extension features visible in the dashboard](../../screenshots/codelab-1-antigravity-cli/19-extension-buttons-added-dark-mode.png)

The final app includes the additional codelab-style improvements: Copy Update, Export CSV, and theme toggle.

### Final QA pass

![Final light mode with readable selected card and primary action styling](../../screenshots/codelab-1-antigravity-cli/26-final-light-mode-readable-selected-card.png)

The last QA pass fixed two realistic issues: generated tweet text should not end with broken ellipses, and light mode needed better selected-card contrast.

---

## 🧪 Final validation summary

The final app was manually tested for:

- local app startup,
- release-note loading,
- search,
- category filtering,
- refresh,
- Copy Update,
- Export CSV,
- light/dark theme persistence,
- clean tweet text under 280 characters,
- X/Twitter intent popup,
- and readability in both dark and light themes.

Detailed validation notes are in [`testing-and-validation.md`](./testing-and-validation.md).

---

## 🧠 What made this codelab useful

The most useful part was not that Antigravity generated code quickly.

The useful part was the loop:

```text
prompt → tool action → permission review → artifact/code output → manual test → focused fix → Git checkpoint
```

That loop is much closer to real development than a one-shot generated answer.

The app became better because I tested it, noticed problems, and asked for targeted changes. That is the main Day 2 lesson for me: tool-using agents are powerful, but they still need scoped permissions, review checkpoints, and hands-on verification.

---

## 🚀 Future deployment note

This version is a Flask app and is kept as a complete source snapshot.

I may later deploy it publicly by either:

- hosting the Flask app directly,
- converting the dashboard to Streamlit,
- or reusing the parser as a backend module for another frontend.

For that reason, I kept the source code, CSV export sample, cleaned artifact summary, and sanitized inspection scripts in this folder.

---

## ✅ Status

```text
Antigravity CLI codelab: completed
Generated app: completed
UI polish: completed
Extension features: completed
Manual QA: completed
Local Git checkpoints: completed
Public deployment: not done yet
Google Developer Knowledge MCP codelab: pending
```
