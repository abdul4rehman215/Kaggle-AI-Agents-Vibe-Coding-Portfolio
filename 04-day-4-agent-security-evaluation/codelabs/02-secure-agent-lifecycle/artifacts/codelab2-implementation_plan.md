# Implementation Plan: `update_discount_status` Tool

This plan is created to verify the TDD Planning Gate by designing a tool named `update_discount_status` that allows admins to activate or deactivate discount codes. Note: This plan is for gate verification only; no code implementation will be performed in this phase.

## Goal
Implement a management tool `update_discount_status` to allow administrative users to change the activation status (active/inactive) of discount codes.

## Security Boundaries & Assertions
As required by the **TDD Planning Gate**, we must explicitly address security considerations for this administrative feature:

1. **Caller Identity & Authorization Boundaries**:
   * The tool must verify that the caller is an authenticated administrator.
   * Access must be rejected if the user is a non-admin, guest, or unregistered.
   * Admin roles must be verified via secure session state (`tool_context.state.get("is_admin")` or similar) rather than relying on parameters passed from the LLM prompt.

2. **Input Validation Rules**:
   * `discount_code`: Must be a non-empty string, normalized to uppercase, and must exist in the `DISCOUNT_CODES` database schema/dictionary.
   * `active`: Must be a boolean value.
   * Strict validation should reject any malformed inputs or unmapped fields.

3. **State Mutation & Race-Condition Risks**:
   * Changing a discount code's status modifies the shared discount configuration.
   * State changes must be atomic. Under concurrent execution, updates must prevent race conditions (e.g. deactivating a code while another request is in the middle of redeeming it).

4. **Abuse Cases & Negative-Path Behavior**:
   * A malicious user attempts to call `update_discount_status` claiming they are an admin via the prompt. This must fail (fail-closed).
   * Attempts to update a non-existent code must return a descriptive error and not mutate any status.

5. **Expected Outcome-Based Tests**:
   * Assert that calling the tool with a non-admin `user_id` returns an error status and does not change the state.
   * Assert that an admin call with a valid code and status updates the store correctly and returns a success response.
   * Assert that a duplicate or invalid code request returns a failure and keeps existing codes unchanged.

6. **Impact on Guardrails**:
   * Ensure that the code does not introduce hardcoded credentials or invoke subshells.
   * Semgrep and ruff checks must be validated locally.

## Proposed Changes

### Shopping Assistant Core

#### [MODIFY] [agent.py](file:///C:/Users/Abdul%20Rehman/agy2-projects/kaggle-day4-hands-on/secure-agent-lab/shopping-assistant/app/agent.py)
* Plan the structure for `update_discount_status(discount_code: str, active: bool, tool_context: ToolContext) -> dict`.

## Verification Plan

### Automated Tests
* None. (No implementation at this phase).
