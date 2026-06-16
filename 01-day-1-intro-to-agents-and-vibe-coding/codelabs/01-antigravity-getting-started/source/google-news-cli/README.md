# 📰 Google News CLI

Small Node.js CLI generated during the Day 1 Antigravity codelab.

## What it does

Fetches recent Google News RSS results for a query and prints the first 10 results.

## Run locally

```bash
npm install
npm start
node index.js "Google Gemini"
```

## Files

- `index.js` — main CLI script
- `package.json` — scripts and dependency metadata
- `package-lock.json` — dependency lockfile
- `.agents/skills/code-review/SKILL.md` — reusable code-review skill
- `demo_bad_code.py` — intentionally broken Python file used for review testing

## Notes

`node_modules/` is intentionally not committed. Recreate it with `npm install`.
