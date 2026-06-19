# Evidence Log - Secure Agent Lifecycle

This file captures the key evidence points from Codelab 2.

---

## Timeline

| Phase | Evidence |
|---|---|
| Workspace setup | Git repo initialized, uv venv created, Agents CLI setup verified. |
| ADK scaffold | `shopping-assistant` created with app package, tests, manifest, and deployment scaffold. |
| Secure context | `.agents/CONTEXT.md` created with project-specific security rules. |
| Semgrep gate | `.semgrep/rules.yaml` detected API-key-shaped strings. |
| Pre-commit | `.pre-commit-config.yaml` ran formatting and Semgrep hooks. |
| Antigravity hook | `validate_tool_call.py` approved safe commands and blocked destructive payloads. |
| STRIDE skill | `threat_model.md` generated from local project files. |
| TDD planning gate | `update_discount_status` planning test included Security Boundaries & Assertions. |
| Tests | `tests/test_agent.py` passed 7 outcome-based tests. |
| Self-correction | First commit failed on mock key, remediation removed it, second commit passed. |
| Auth fix | AI Studio auth routing added without hardcoded keys. |
| Final Playground | `WELCOME50` redeemed successfully for `user123` through `redeem_discount`. |

---

## Commits

```text
645cf3dff81de6c9cd4f041e26d6bceaf0b24e35  feat: implement shopping assistant agent
427bc1fd873bff790fc57b3e386e6ea542150f5b  chore: support AI Studio API key auth
```

---

## Final Playground proof

Command:

```powershell
uv run adk web --host 127.0.0.1 --port 8080
```

URL:

```text
http://127.0.0.1:8080/dev-ui/?app=app
```

Prompt:

```text
Can you redeem the discount code WELCOME50 for user user123?
```

Observed response:

```text
The discount code WELCOME50 has been successfully redeemed for user user123. You received a 50% discount!
```

Screenshot evidence is stored in:

```text
screenshots/codelab-2-secure-agent-lifecycle/11-playground-redeem-discount-success.png
```
