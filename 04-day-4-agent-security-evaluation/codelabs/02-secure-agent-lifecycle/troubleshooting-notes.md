# Troubleshooting Notes - Secure Agent Lifecycle

This file records issues that were part of the real development loop.

---

## Git root vs project root

The Git repository root was:

```text
secure-agent-lab/
```

The Python project root was:

```text
secure-agent-lab/shopping-assistant/
```

That affected pre-commit paths. The Semgrep config path had to be written relative to the Git root:

```text
shopping-assistant/.semgrep/rules.yaml
```

During commits, the project virtual environment Scripts path had to be available so Git could find `semgrep`, `end-of-file-fixer`, and `trailing-whitespace-fixer`.

---

## Windows PowerShell behavior

PowerShell command piping added a UTF-8 BOM in one validator test path. The validator was adjusted to strip `\ufeff` before parsing JSON.

This is a small Windows-specific reliability fix that made the hook testable in both PowerShell and `cmd`.

---

## Vertex AI billing issue

The first ADK Playground attempt used Vertex AI Application Default Credentials and failed with a billing-required permission error.

That was an auth-routing issue, not a tool-logic failure.

The secure fix was:

- do not enable billing just for the local codelab,
- do not hardcode any key,
- route local dev through AI Studio / Gemini API mode,
- supply the key only through the shell environment.

Final config:

```python
os.environ.setdefault("GOOGLE_GENAI_USE_VERTEXAI", "False")
```

---

## API key safety

No real API key is stored in this repository. The codelab included a mock key-shaped value only to prove Semgrep and pre-commit enforcement. That mock was removed before the successful commit.
