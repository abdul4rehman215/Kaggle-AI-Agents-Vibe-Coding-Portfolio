# Security Controls - Secure Agent Lifecycle

Codelab 2 layered several controls around a small ADK agent. This file explains what each control does and why it mattered.

---

## `.agents/CONTEXT.md`

The context file stored project-specific secure coding standards so Antigravity did not rely only on generic model behavior.

Key rules:

- validate tool inputs,
- avoid raw shell execution unless allowed,
- remediate failed pre-commit checks instead of bypassing them,
- never commit real secrets,
- write outcome-based tests,
- keep tools least-privilege,
- include security boundaries during planning.

---

## Custom Semgrep rule

The rule detected Google API-key-shaped strings:

```yaml
pattern-regex: 'AIzaSy[A-Za-z0-9_\-]*'
```

This caught the intentional mock key during the first commit attempt. The failure proved the local gate worked before the code was remediated.

---

## Pre-commit hook

The pre-commit config ran:

- end-of-file fixer,
- trailing whitespace fixer,
- Semgrep security scan.

The important behavior was that the commit failed at the correct point. Security feedback arrived before the unsafe source could enter the repository history as a normal success.

---

## Antigravity `PreToolUse` hook

The Antigravity hook intercepted `run_command` calls before execution.

That is a different boundary from pre-commit:

```text
PreToolUse hook -> protects command execution while the agent is working.
Pre-commit hook -> protects the repository before code is committed.
```

The validator blocked destructive-looking commands such as `rm -rf /`, `format`, `mkfs`, `shutdown`, and Windows destructive remove patterns.

---

## STRIDE skill

The local `stride-threat-model` skill turned security review into a repeatable procedure.

It forced the agent to inspect:

- spoofing,
- tampering,
- repudiation,
- information disclosure,
- denial of service,
- elevation of privilege.

That structure is better than a vague request like “check if this is secure.”

---

## TDD planning gate

The planning gate required a **Security Boundaries & Assertions** section before implementation.

That means a new tool plan must address:

- caller identity,
- authorization,
- input validation,
- state mutation,
- race conditions,
- abuse cases,
- expected outcome-based tests,
- and guardrail impact.

The optional `update_discount_status` plan verified this behavior without implementing unnecessary app code.
