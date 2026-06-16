# 🧪 Antigravity Implementation Notes

This file documents what was actually produced in the Antigravity codelab.

---

## 📁 Project name

```text
my-first-project
```

The cleaned source copy in this repo is stored as:

```text
source/google-news-cli/
```

The folder name was changed in the repo to describe what the project does, while the codelab screenshots still show the original sandbox name.

---

## 🧾 Generated Node.js files

### `index.js`

The CLI uses `rss-parser` to fetch results from Google News RSS.

Main behavior:

- reads `process.argv[2]` as the query,
- defaults to `Google`,
- builds a Google News RSS search URL,
- parses the feed,
- prints the first 10 results,
- handles fetch/parse errors with a readable message.

### `package.json`

Defines:

- project name: `google-news-cli`,
- entry file: `index.js`,
- start script: `node index.js`,
- dependency: `rss-parser`.

### `package-lock.json`

Kept for reproducibility. Dependencies themselves are not committed.

---

## ▶️ How to run locally

```bash
cd source/google-news-cli
npm install
npm start
node index.js "Google Gemini"
```

The command depends on live internet access because it fetches Google News RSS results.

---

## 🧠 Why this small CLI matters

This project is simple on purpose. It is useful as a first agent-generated artifact because it is easy to inspect:

- the input is a command-line query,
- the external dependency is visible,
- the output is readable,
- and the generated files are small enough to review manually.

That makes it a good first example for learning how to verify agent-generated code.

---

## ⚠️ Limitations

This is a learning codelab artifact, not a production news tool.

Known limitations:

- no retry/backoff logic,
- no structured JSON output mode,
- no tests,
- no source filtering,
- no caching,
- no feed normalization beyond what `rss-parser` provides.

Possible improvements:

- add CLI flags,
- add JSON output,
- add error-specific messages,
- add unit tests around URL construction and result formatting,
- add rate-limit and network failure handling.
