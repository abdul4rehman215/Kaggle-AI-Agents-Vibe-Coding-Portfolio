# Local Project Context & Secure Coding Standards

## Core Paved Roads

We systematically address common vulnerability classes by guiding the agent to use pre-configured, secure-by-default helper patterns instead of writing raw implementation logic from scratch.

1. **Tool Input Validation**: Every agent tool must validate incoming parameters against strict Pydantic schemas rather than parsing raw dictionaries or strings.

2. **No Shell Execution**: Never use `run_command` or raw shell execution tools unless explicitly approved by `.agents/hooks.json`.

3. **Pre-Commit Remediation Loop**: If a git commit fails due to a pre-commit hook error, such as a Semgrep finding, treat the violation as a refactoring task. Apply targeted fixes, run tests to verify no regressions, and attempt the commit again only after checks pass.

4. **No Real Secrets in Code**: Never add real API keys, credentials, tokens, or private configuration values to source files. Use environment variables or local ignored files instead. The current hardcoded Google API key-shaped value in `app/agent.py` is an intentional mock vulnerability for the local lab only.

5. **Outcome-Based Tests**: Prefer tests that assert final outcomes and state changes over brittle tests that only inspect internal implementation details.

6. **Least Privilege Tooling**: Agent tools should expose only the minimum action needed for the task and should not perform unrelated filesystem, shell, network, or credential operations.

## TDD Planning Gate

During the Plan phase, you must decompose the workspace task into logical, modular stages. Every implementation plan MUST include a dedicated **Security Boundaries & Assertions** section outlining specific edge cases that could exploit the feature.

Before writing code for any new feature or refactor, the implementation plan must explicitly address:
- caller identity and authorization boundaries
- input validation rules
- state mutation and race-condition risks
- abuse cases and negative-path behavior
- expected outcome-based tests
- impact on existing pre-commit, Semgrep, and hook guardrails
