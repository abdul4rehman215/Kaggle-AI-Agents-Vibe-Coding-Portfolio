# 🧾 Commands Used — Antigravity CLI Codelab

This file records the command-line work used during the Day 2 Antigravity CLI codelab.

The commands are grouped by phase so this works as a reproducibility log rather than a random terminal dump.

---

## 1) Antigravity CLI verification

```cmd
agy --version
```

Purpose:

- confirm that Antigravity CLI was installed,
- confirm that the CLI could start,
- confirm that the account/model context was available.

Observed:

- Antigravity CLI launched successfully.
- The CLI showed an authenticated session and a Gemini model selection.

I exited the CLI before creating the actual codelab workspace:

```text
/quit
```

---

## 2) Dedicated workspace folder

```cmd
mkdir agy-cli-projects
cd agy-cli-projects
```

Purpose:

- avoid running the agent directly from the user home folder,
- keep generated files and permissions scoped to a dedicated workspace.

---

## 3) Developer tool checks

```cmd
python --version
git --version
gh --version
```

Observed:

```text
Python 3.14.0
git version 2.53.0.windows.2
gh version 2.94.0
```

GitHub CLI was installed during setup because it is part of the broader developer workflow. I did not push this codelab as a standalone repository because the final source belongs inside the existing course portfolio repository.

---

## 4) App project folder

```cmd
mkdir bq-release-notes
cd bq-release-notes
agy
```

Purpose:

- create the actual local app folder,
- launch Antigravity CLI from inside that folder,
- keep generated Flask app files in one clean place.

---

## 5) Antigravity settings check

Inside Antigravity CLI:

```text
/config
```

Checked:

```text
Tool Permission = request-review
```

I kept the safer review-based workflow and avoided broad autonomous permission modes.

---

## 6) Local project inspection

After the app was generated:

```cmd
cd "%USERPROFILE%\agy-cli-projects\bq-release-notes"
dir /b
type requirements.txt
git status
```

Observed source files:

```text
.venv
app.py
README.md
requirements.txt
static
templates
__pycache__
```

At this stage, Git had not been initialized yet. That was expected.

---

## 7) File tree and Git ignore setup

```cmd
tree /f
dir /b static
dir /b templates
```

Created `.gitignore`:

```cmd
(
echo .venv/
echo __pycache__/
echo *.pyc
echo .env
echo .DS_Store
echo .gemini/
) > .gitignore
```

Verified:

```cmd
type .gitignore
```

Final `.gitignore` contents:

```text
.venv/
__pycache__/
*.pyc
.env
.DS_Store
.gemini/
```

---

## 8) Initial Git checkpoint

```cmd
git init
git status --ignored
git add app.py README.md requirements.txt static templates .gitignore
git status
git commit -m "Initial Antigravity-generated BigQuery release notes app"
git status
git log --oneline -1
```

Purpose:

- create a clean baseline before UI fixes,
- keep generated source separate from later human-reviewed refinements.

---

## 9) UI polish checkpoint

After the first UI refinement pass:

```cmd
git status
git diff --stat
git add static/css/style.css README.md
git commit -m "Improve BigQuery release notes UI polish"
git status
git log --oneline -2
```

Observed:

- `static/css/style.css` changed.
- The working tree was clean after commit.

---

## 10) Extension feature checkpoint

After Copy Update, Export CSV, light/dark theme, and QA fixes:

```cmd
git status
git diff --stat
git add templates/index.html static/css/style.css static/js/main.js README.md
git commit -m "Add codelab extension features and QA refinements"
git status
git log --oneline -3
```

Purpose:

- keep the final feature work as a separate local Git checkpoint,
- document the app evolution clearly:

```text
Commit 1: initial generated app
Commit 2: UI polish
Commit 3: extension features and QA refinements
```

---

## 11) Local run command

The app can be run from the source folder with:

```cmd
.venv\Scripts\python.exe app.py
```

---

## 12) Render deployment preparation

To deploy the Flask app on Render, I added Gunicorn to the existing dependency file:

```text
gunicorn
```

Render Web Service settings used:

```text
Root Directory:
02-day-2-agent-tools-and-interoperability/codelabs/01-antigravity-cli/source/bq-release-notes

Build Command:
pip install -r requirements.txt

Start Command:
gunicorn app:app
```

The first deploy attempt failed because the start command was still using a placeholder value:

```text
gunicorn your_application.wsgi
```

The fix was to point Gunicorn to the actual Flask app object in `app.py`:

```text
gunicorn app:app
```

After updating the start command, the app deployed successfully on Render.

Live URL:

```text
https://kaggle-day2-bigquery-release-notes.onrender.com/
```


Then open:

```text
http://127.0.0.1:5000
```

In the portfolio copy, `.venv/` is intentionally not committed. A fresh environment can be rebuilt with:

```cmd
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python.exe app.py
```
