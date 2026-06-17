# 📌 Source Material Note

This note explains how the Day 2 documentation was prepared and what is included in this folder.

---

## 📘 Sources used

The theory notes in this folder were prepared after reviewing:

- the Unit 2 podcast/video,
- the Day 2 whitepaper on Agent Tools & Interoperability,
- generated podcast notes,
- NotebookLM study guide and quiz material,
- and two generated infographics.

The first hands-on update was prepared after completing the Antigravity CLI codelab and testing the generated BigQuery Release Notes Hub locally.

The final Markdown files are written as personal study documentation, not as copied transcripts or pasted official course material.

---

## ✅ What is included

This folder currently includes:

- personal podcast notes,
- whitepaper concept notes,
- key concept glossary,
- study process summary,
- Day 2 reflection,
- official resource links,
- two visual study assets,
- Antigravity CLI codelab documentation,
- final Flask app source,
- screenshot evidence,
- sanitized inspection scripts,
- and a sample CSV export generated from the app.

---

## ⏳ What is not included yet

The following are intentionally not included yet:

- Google Developer Knowledge MCP implementation notes,
- MCP config examples,
- MCP validation prompts and results,
- screenshots from the MCP codelab,
- troubleshooting notes from the MCP setup.

Those will be added only after the MCP codelab is actually completed.

---

## 🛡️ What is intentionally not committed

I am not committing:

- API keys,
- OAuth tokens,
- full local MCP config files containing secrets,
- credential screenshots,
- private Google Cloud project details,
- local virtual environments such as `.venv/`,
- Python cache folders such as `__pycache__/`,
- Antigravity internal `.gemini/` runtime folders,
- or full downloaded course PDFs unless needed and safe to include.

This keeps the repo cleaner and reduces the risk of accidentally exposing private information.

---

## 🧪 Antigravity CLI codelab source note

The completed Codelab 1 app is included under:

```text
codelabs/01-antigravity-cli/source/bq-release-notes/
```

The app source is included because it may be useful later for:

- public deployment,
- Streamlit conversion,
- parser reuse,
- portfolio demonstration,
- or comparing future MCP/tool-based workflows.

The Antigravity scratch inspection scripts are included only after sanitization under:

```text
codelabs/01-antigravity-cli/artifacts/inspection-scripts/
```

They are kept as supporting evidence of how the feed was inspected, not as production app files.

---

## 🖼️ Infographic note

The infographic files in `assets/infographics/` are personal visual study aids generated during review. They are not official diagrams from the course.

They are included because they help explain the protocol stack quickly:

- `orchestrating-interoperable-ai-agents.png`
- `agentic-engineering-ecosystem.png`

---

## 🎯 Documentation principle

The goal is to keep this repository honest and evidence-based.

If something is completed, it should be documented clearly.
If something is still pending, it should be marked as pending.

That is why the Antigravity CLI codelab is now marked completed, while the Google Developer Knowledge MCP codelab remains pending until it is actually done.
