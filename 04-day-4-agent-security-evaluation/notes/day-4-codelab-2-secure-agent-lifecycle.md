# 🔐 Day 4 Codelab 2 Notes - Secure Agent Lifecycle

This codelab focused less on building a complex app and more on building a secure development loop around an agent.

That made it feel very close to real security engineering: define rules, enforce them locally, test the boundary, break the build intentionally, remediate, and prove the final state.

---

## The useful pattern was layered defense

No single control carried the whole codelab.

```text
CONTEXT.md      -> tells the agent the local security standards
Semgrep         -> detects secret-shaped source patterns
pre-commit      -> blocks unsafe code before commit
PreToolUse hook -> blocks risky command execution before it happens
STRIDE skill    -> makes threat modeling repeatable
TDD gate        -> forces security assertions before implementation
tests           -> prove deterministic business behavior
```

Each layer handled a different failure mode.

---

## The pre-commit failure was the point

The codelab intentionally added a mock API-key-shaped value. The first commit failing was not a mistake; it was the proof that the local gate worked.

That is a good security habit to remember: a control is more convincing when it catches a known bad case.

---

## Antigravity hooks protect a different boundary

Git hooks protect the repository. Antigravity hooks protect the agent’s tool-use behavior while the work is still happening.

That matters because a dangerous command can cause damage before any commit exists.

The validator script was simple, but the pattern is powerful: fail closed, inspect command payloads, and block destructive intent early.

---

## STRIDE gave the review better shape

Without STRIDE, it is easy to say “check security” and get vague feedback.

With STRIDE, the review had named categories:

- spoofing,
- tampering,
- repudiation,
- information disclosure,
- denial of service,
- elevation of privilege.

That produced better risks: spoofable `user_id`, global in-memory state, weak audit logging, rate-limit gaps, and mock secret exposure.

---

## Outcome-based tests felt more durable

The tests did not care exactly how the function was written. They checked what mattered:

- a valid user can redeem once,
- duplicate use fails,
- invalid users fail,
- invalid codes fail,
- failed attempts do not mutate state.

That is the right shape for an agent tool test. The contract matters more than the implementation style.
