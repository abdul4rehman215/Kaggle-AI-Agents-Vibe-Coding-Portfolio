# 🖼️ Day 4 Codelab Screenshot Index

This index maps renamed screenshot evidence to what each image proves. Screenshots are stored at the Day 4 level so the codelab READMEs can reference them without duplicating image files.

## Codelab 1 - Ambient Expense Agent

| File | Evidence label | What it shows |
|---|---|---|
| [`01-adk-scaffold-skills-confirmed.png`](../screenshots/codelab-1-ambient-expense-agent/01-adk-scaffold-skills-confirmed.png) | ADK and Agents CLI skills confirmed before the ambient expense build | Shows the initial toolchain check inside Antigravity before creating the Day 4 Codelab 1 project. |
| [`02-adk-scaffold-command-help.png`](../screenshots/codelab-1-ambient-expense-agent/02-adk-scaffold-command-help.png) | Agents CLI scaffold command inspected | Captures command help and scaffold options used before generating the ADK project. |
| [`03-adk-workflow-conversion-proof.png`](../screenshots/codelab-1-ambient-expense-agent/03-adk-workflow-conversion-proof.png) | Starter project converted to ADK 2.0 workflow style | Shows the first conversion from a generic scaffold into an ADK graph workflow entrypoint. |
| [`04-scaffold-implementation-plan.png`](../screenshots/codelab-1-ambient-expense-agent/04-scaffold-implementation-plan.png) | Ambient expense project scaffold plan | Documents the plan for building the expense agent inside the correct workspace boundary. |
| [`05-expense-workflow-refactor-plan.png`](../screenshots/codelab-1-ambient-expense-agent/05-expense-workflow-refactor-plan.png) | Expense workflow refactor plan | Shows the plan for replacing the weather/time demo with deterministic expense approval routing. |
| [`06-security-checkpoint-plan.png`](../screenshots/codelab-1-ambient-expense-agent/06-security-checkpoint-plan.png) | Pre-LLM security checkpoint plan | Captures the plan for adding PII redaction, prompt-injection detection, and safe routing. |
| [`07-security-task-checklist-complete.png`](../screenshots/codelab-1-ambient-expense-agent/07-security-task-checklist-complete.png) | Security implementation checklist completed | Shows the implementation checklist after security helpers, workflow edges, tests, linting, and local evaluation were completed. |
| [`08-security-screen-code-and-tests.png`](../screenshots/codelab-1-ambient-expense-agent/08-security-screen-code-and-tests.png) | Security screen code and test validation | Shows the security-screen implementation area and related validation output in Antigravity. |
| [`09-playground-expense-agent-graph.png`](../screenshots/codelab-1-ambient-expense-agent/09-playground-expense-agent-graph.png) | ADK Playground graph for the expense workflow | Visual proof of the expense-agent workflow graph in the local ADK playground. |
| [`10-malicious-expense-pii-redaction-proof.png`](../screenshots/codelab-1-ambient-expense-agent/10-malicious-expense-pii-redaction-proof.png) | PII redaction and malicious expense handling | Shows a malicious high-value expense with sensitive-looking data routed through the protected path. |
| [`11-prompt-injection-bypass-proof.png`](../screenshots/codelab-1-ambient-expense-agent/11-prompt-injection-bypass-proof.png) | Prompt-injection bypass proof | Shows a prompt-injection style expense being contained and routed away from the LLM review path. |
| [`12-human-review-routing-proof.png`](../screenshots/codelab-1-ambient-expense-agent/12-human-review-routing-proof.png) | Human review routing proof | Captures the high-risk path reaching human review instead of automatic approval. |
| [`13-high-value-review-flow-proof.png`](../screenshots/codelab-1-ambient-expense-agent/13-high-value-review-flow-proof.png) | High-value review flow proof | Shows a high-value expense moving through security and review states in the ADK playground. |
| [`14-eval-trace-generator-code.png`](../screenshots/codelab-1-ambient-expense-agent/14-eval-trace-generator-code.png) | Trace generation and offline evaluation code | Shows the local trace generator and evaluator work used because cloud grading required unavailable billing. |
| [`15-eval-workflow-playground-check.png`](../screenshots/codelab-1-ambient-expense-agent/15-eval-workflow-playground-check.png) | Evaluation workflow verified in the local environment | Shows the agent being exercised before generating local evaluation traces. |
| [`16-local-eval-workflow-prompt.png`](../screenshots/codelab-1-ambient-expense-agent/16-local-eval-workflow-prompt.png) | Local evaluation continuation prompt | Captures the transition into trace-based scoring after the implementation was complete. |
| [`17-eval-run-command-output.png`](../screenshots/codelab-1-ambient-expense-agent/17-eval-run-command-output.png) | Evaluation command output | Shows trace generation and grading commands running locally. |
| [`18-eval-scorecard-routing-security.png`](../screenshots/codelab-1-ambient-expense-agent/18-eval-scorecard-routing-security.png) | Routing and security scorecard | Shows the final offline scorecard with routing correctness and security containment checks passing. |
| [`19-final-eval-scorecard-summary.png`](../screenshots/codelab-1-ambient-expense-agent/19-final-eval-scorecard-summary.png) | Final evaluation summary | Shows the final pass summary for all local routing and security evaluation cases. |

## Codelab 2 - Secure Agent Lifecycle

| File | Evidence label | What it shows |
|---|---|---|
| [`01-secure-agent-lab-workspace-setup.png`](../screenshots/codelab-2-secure-agent-lifecycle/01-secure-agent-lab-workspace-setup.png) | Secure-agent-lab workspace setup | Shows the clean Codelab 2 workspace and toolchain preparation inside Antigravity. |
| [`02-shopping-assistant-agent-code-and-scaffold.png`](../screenshots/codelab-2-secure-agent-lifecycle/02-shopping-assistant-agent-code-and-scaffold.png) | Shopping assistant scaffold and discount tool | Shows the generated ADK shopping assistant source with the redeem_discount tool. |
| [`03-context-secure-coding-standards.png`](../screenshots/codelab-2-secure-agent-lifecycle/03-context-secure-coding-standards.png) | Project-specific secure coding standards | Shows .agents/CONTEXT.md with local paved roads for secure agent development. |
| [`04-semgrep-precommit-rule-config.png`](../screenshots/codelab-2-secure-agent-lifecycle/04-semgrep-precommit-rule-config.png) | Semgrep and pre-commit gate configuration | Shows the custom Google API-key-shaped Semgrep rule and local pre-commit config. |
| [`05-antigravity-run-command-hook-config.png`](../screenshots/codelab-2-secure-agent-lifecycle/05-antigravity-run-command-hook-config.png) | Antigravity PreToolUse command hook | Shows hooks.json and the validator script used to block destructive command requests. |
| [`06-stride-threat-model-report.png`](../screenshots/codelab-2-secure-agent-lifecycle/06-stride-threat-model-report.png) | STRIDE threat model generated | Shows threat_model.md with prioritized risks for the shopping assistant agent. |
| [`07-tdd-planning-gate-security-boundaries.png`](../screenshots/codelab-2-secure-agent-lifecycle/07-tdd-planning-gate-security-boundaries.png) | TDD planning gate with security boundaries | Shows the planning-gate verification plan requiring security boundaries before implementation. |
| [`08-outcome-based-tests-added.png`](../screenshots/codelab-2-secure-agent-lifecycle/08-outcome-based-tests-added.png) | Outcome-based pytest tests | Shows tests/test_agent.py with deterministic redemption behavior tests. |
| [`09-precommit-self-correction-summary.png`](../screenshots/codelab-2-secure-agent-lifecycle/09-precommit-self-correction-summary.png) | Pre-commit failure and secure self-correction | Shows the deliberate Semgrep failure, mock-key remediation, passing tests, and commit evidence. |
| [`10-adk-web-terminal-gemini-api-backend.png`](../screenshots/codelab-2-secure-agent-lifecycle/10-adk-web-terminal-gemini-api-backend.png) | ADK web server using Gemini API backend | Shows the local ADK server running and routing through the Gemini API backend instead of Vertex billing. |
| [`11-playground-redeem-discount-success.png`](../screenshots/codelab-2-secure-agent-lifecycle/11-playground-redeem-discount-success.png) | Playground redeem_discount success | Shows the ADK Web UI graph and successful WELCOME50 redemption via the redeem_discount tool. |
