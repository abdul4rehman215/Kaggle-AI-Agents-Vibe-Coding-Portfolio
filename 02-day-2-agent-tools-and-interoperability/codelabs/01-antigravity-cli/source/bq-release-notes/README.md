# BigQuery Release Notes Hub

A local Flask web app built during the **Day 2 Antigravity CLI codelab** for the Kaggle / Google AI Agents Intensive Vibe Coding Course.

The app fetches the official Google Cloud BigQuery release notes XML feed, parses the grouped feed entries into individual updates, and presents them in a searchable dashboard with sharing and export utilities.

---

## ✨ Features

- Fetches the BigQuery release notes XML feed from Google Cloud.
- Parses grouped release-note entries into individual update cards.
- Provides keyword search and category filtering.
- Shows release-note details in a master-detail dashboard layout.
- Generates clean X/Twitter-ready text under the 280-character limit.
- Supports Copy Update using the browser clipboard API with fallback behavior.
- Exports the currently visible or filtered updates to CSV.
- Includes a light/dark theme toggle with localStorage persistence.
- Uses a 5-minute in-memory cache with a manual refresh option.

---

## 🧱 Tech stack

| Layer | Tooling |
|---|---|
| Backend | Python, Flask, Requests, BeautifulSoup4, ElementTree |
| Frontend | Vanilla HTML, CSS, JavaScript |
| UI | Custom CSS variables, responsive layout, Font Awesome icons, Google Fonts |
| Data source | Google Cloud BigQuery release notes XML feed |

---

## 📁 Project structure

```text
bq-release-notes/
├── app.py
├── requirements.txt
├── README.md
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── templates/
    └── index.html
```

---

## ▶️ Run locally

From this folder:

```bash
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python.exe app.py
```

Then open:

```text
http://127.0.0.1:5000
```

On macOS/Linux, activate or call the virtual environment using the equivalent path:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

## 🧪 Manual validation checklist

- Release notes load in the sidebar.
- Search filters the visible updates.
- Category filter narrows the result set.
- Refresh reloads the feed and keeps the UI responsive.
- Copy Update copies the generated text and shows feedback.
- Export CSV downloads `bigquery-release-notes.csv`.
- Theme toggle switches between dark and light mode and persists after refresh.
- Tweet text stays under 280 characters and does not end with broken ellipses.
- Tweet on X opens the X/Twitter intent composer.

---

## 🚀 Future deployment note

This version is a Flask app. If I later deploy the project publicly, the cleanest route is likely one of these:

- deploy the Flask app as-is on a Python web host,
- convert the parser and dashboard into a Streamlit app,
- or split the feed parser into a reusable module and build a new frontend around it.

The current source is kept complete so the parsing logic, UI behavior, and export workflow can be reused later.

---

## 🔐 Safety note

No API keys, OAuth tokens, credentials, or private configuration files are required for this app. The `.gitignore` excludes local virtual environments, Python cache files, `.env`, and local tool scratch folders.
