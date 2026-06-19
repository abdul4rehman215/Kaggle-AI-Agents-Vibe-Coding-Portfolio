# Testing and Validation - Secure Agent Lifecycle

This file records how Codelab 2 was validated.

---

## Pytest

The final test suite focused on deterministic tool behavior.

Result:

```text
7 passed
```

Test coverage:

| Test area | Result |
|---|---|
| Registered user redeems valid code | ✅ Passed |
| Duplicate redemption fails | ✅ Passed |
| Unknown code rejected | ✅ Passed |
| Missing user ID rejected | ✅ Passed |
| Guest user rejected | ✅ Passed |
| Unregistered user rejected | ✅ Passed |
| Failed attempts do not mutate redeemed-code state | ✅ Passed |

Test isolation was handled by clearing `REDEEMED_CODES` before and after every test.

---

## Linting

`agents-cli lint` passed after formatting fixes.

The lint command validated formatting, spelling, and type checks through the configured Agents CLI tooling.

---

## Semgrep

Before remediation, the custom Semgrep rule caught the intentional mock key:

```text
Rule ID: detect-hardcoded-google-api-key
Severity: ERROR
```

After remediation, direct Semgrep passed:

```text
0 findings
```

---

## Antigravity hook validator

The validator script was tested with safe and destructive payloads.

| Payload | Expected | Result |
|---|---|---|
| `echo hello` | Approved | ✅ Approved |
| `rm -rf /` | Blocked | ✅ Blocked |
| `format d:` | Blocked | ✅ Blocked |

The hook validates command requests before execution, which is different from a Git hook. It protects the agent tool-use path earlier in the workflow.

---

## Playground proof

The ADK Web UI displayed the graph:

```text
shopping_assistant_agent -> redeem_discount
```

Final prompt:

```text
Can you redeem the discount code WELCOME50 for user user123?
```

Observed response:

```text
The discount code WELCOME50 has been successfully redeemed for user user123. You received a 50% discount!
```

That proves the model connected to the local app, selected the tool, executed it, and returned the tool result through the chat interface.
