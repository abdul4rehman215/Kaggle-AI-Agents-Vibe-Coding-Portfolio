# 🔎 Sanitized Inspection Scripts

These scripts were generated during the Antigravity CLI codelab to inspect and validate the BigQuery release notes feed and parser behavior.

They are included because they show how the agent explored the external XML feed before building the app logic.

---

## Files

| Script | Purpose |
|---|---|
| `test_fetch.py` | Fetches the BigQuery release notes XML feed, prints a small sample, detects namespaces, and counts entries. |
| `test_fetch_multiple.py` | Prints several feed entries to inspect how Google groups release-note content. |
| `test_app_parse.py` | Imports the local Flask app module and tests the final parser output. |

---

## Sanitization note

The original scratch scripts were created in Antigravity's local scratch area. The portfolio copy has been cleaned so it does not depend on the original user-specific Antigravity scratch path.

No API keys, credentials, OAuth tokens, or private configuration values are required.

---

## How to use later

These are optional diagnostic scripts. They are not required to run the app.

If the app is converted to Streamlit or deployed later, the same inspection approach can be reused to check whether the XML feed shape changed.
