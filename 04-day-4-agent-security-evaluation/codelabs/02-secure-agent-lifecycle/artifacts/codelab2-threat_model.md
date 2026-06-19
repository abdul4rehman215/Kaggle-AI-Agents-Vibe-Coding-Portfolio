# STRIDE Threat Model: Shopping Assistant Agent

## Scope
This threat model covers the `shopping-assistant` agent project, including the core agent logic, tool implementations, and environment configuration located in `shopping-assistant/app/`. It also covers the local gating hook configuration in `.agents/`, `.semgrep/`, and `.pre-commit-config.yaml`.

## Architecture Summary
The application is built using the Google Agent Development Kit (ADK) 2.0. It exposes an AI shopping assistant backed by a Gemini model (`gemini-2.5-flash`) via an `App` runner wrapper.

The agent is equipped with a `redeem_discount` tool that implements the business rules for validating and applying discount codes. The model is initialized using a custom `VulnerableGemini` class that forces the use of a hardcoded mock API key for gating demonstration purposes.

## Assets
1. **Discount Store state**: In-memory dictionary `DISCOUNT_CODES` containing valid discount keys and values.
2. **Redemption Registry state**: In-memory set `REDEEMED_CODES` tracking codes that have already been applied.
3. **User Database/Registry**: A mock list of registered users `REGISTERED_USERS`.
4. **Google GenAI Client Credentials**: Simulated API key in `app/agent.py`.

## Entry Points
1. **User Prompt / Chat session**: The main input stream where users converse with the shopping assistant agent.
2. **`redeem_discount` tool execution**: The callable function endpoint used by the agent to validate and process discount redemptions.

## Trust Boundaries
1. **User input vs Agent processing**: The boundary between untrusted user prompts and the agent's internal instruction/reasoning.
2. **LLM vs Tools**: The boundary between the LLM's generative output and the deterministic execution of the local Python tools.

---

## STRIDE Findings

### Spoofing
* **Unauthenticated User Impersonation**: The `redeem_discount` tool requires a `user_id` parameter. However, the model determines this parameter based on the chat history. A user can easily spoof another user's ID by saying "My user ID is user_abc" in the prompt, allowing them to redeem discounts on behalf of registered users.
* **Mitigation**: Authenticate the caller at the runner layer and pass the verified identity securely using the session state (`tool_context.state["user_id"]`) instead of relying on the LLM to supply it as a tool parameter.

### Tampering
* **Global In-Memory State Manipulation**: `REDEEMED_CODES` and `DISCOUNT_CODES` are stored in global python variables. Concurrent sessions or multiple users sharing the same application process can read/write the same state. A user could cause race conditions or tamper with the list of redeemed codes by triggering concurrent requests.
* **Mitigation**: Persist the redemption state in a secure, ACID-compliant database (such as Cloud SQL) or scoped session storage rather than global python memory.

### Repudiation
* **Lack of Audit Logging**: Successful and failed discount redemptions are not logged to a tamper-proof audit trail. If a user exploits a vulnerability to redeem multiple codes, there is no reliable, structured log to trace the sequence of events.
* **Mitigation**: Integrate Google Cloud Logging or another persistent telemetry pipeline to log all execution results of `redeem_discount` with structured metadata.

### Information Disclosure
* **Hardcoded Mock API Key**: The subclass `VulnerableGemini` contains a hardcoded string `api_key="AIzaSyD-mock-key-value-12345"`. While this is currently an intentional mock key for the local lab, leaving hardcoded keys in source files risks leaking active credentials if real keys are accidentally committed.
* **Mitigation**: Remove all hardcoded API keys and retrieve credentials securely via environment variables (`GOOGLE_API_KEY` or Application Default Credentials).
* **Exception Stack Traces**: Uncaught tool execution errors might propagate back to the LLM and be presented to the user, potentially leaking internal implementation details.
* **Mitigation**: Catch exceptions within the tool and return sanitized error dictionaries.

### Denial of Service
* **State Exhaustion**: The `REDEEMED_CODES` in-memory set can grow indefinitely as more codes are redeemed, causing memory leaks.
* **Mitigation**: Implement TTLs or utilize external persistent storage for redemptions.
* **Token Exhaustion / Spamming**: An attacker could feed long prompts or trigger infinite tool loops to exhaust LLM rate limits and API budgets.
* **Mitigation**: Enforce rate limiting on the chat endpoint and set maximum iteration limits on the agent executor.

### Elevation of Privilege
* **Guest User Privilege Escalation**: A guest user could gain unauthorized access to discount redemptions by claiming a registered ID (as discussed in Spoofing). Since guest users should only have browse permissions, this constitutes a privilege escalation vulnerability.
* **Mitigation**: Validate the user's role and registration status via strict session variables before allowing the tool to execute.

---

## Prioritized Risks
1. **Critical**: Hardcoded API key in `app/agent.py` (Vulnerability to credential leakage).
2. **High**: User ID spoofing due to the tool accepting `user_id` as a model-controlled parameter rather than a session-verified state value.
3. **High**: Race conditions and cross-session state contamination due to global in-memory tracking of redemptions.
4. **Medium**: Lack of persistent audit logging for discount transactions.
5. **Medium**: Denial of service/rate limit exhaustion on tool invocation.

---

## Recommended Mitigations
1. **Secret Scanning & Externalization**: Fix the hardcoded API key in `app/agent.py` by removing it and relying on environment variables or Application Default Credentials (ADC).
2. **Session-based Identity Binding**: Refactor `redeem_discount` to fetch `user_id` directly from `tool_context.state` (which is populated securely by the application backend) rather than allowing the model to supply it.
3. **ACID Storage**: Move the discount configuration and redemption records to a database with transaction management.
4. **Audit Trails**: Implement structured logging for all tool calls.

---

## Notes for Later TDD Tests
* Write unit/integration tests to assert that `redeem_discount` fails if:
  - The `user_id` is missing or resolves to "guest".
  - The `user_id` is not registered.
  - The discount code is invalid or unknown.
  - The discount code has already been redeemed.
* Verify that a registered user ID with a valid code returns a success dictionary and updates the redemption registry.
* Verify that attempting to redeem the same code twice fails.
