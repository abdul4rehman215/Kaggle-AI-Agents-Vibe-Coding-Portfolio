# Testing and Validation - Codelab 2 Agents CLI + ADK Lifecycle

This file records how the final customer support agent was validated.

---

## 1. App import

**Test:** Import the generated ADK app from Python.

```powershell
uv run python -c "from app.agent import app; print(app.name)"
```

**Expected:** `app`

**Result:** Passed.

This confirmed that the final workflow code loaded without route-map validation errors.

---

## 2. Linting

**Test:** Run the Agents CLI lint workflow.

```powershell
agents-cli lint
```

**Expected:** all checks pass.

**Result:** Passed.

The lint workflow ran Ruff, formatting checks, codespell, and type checks.

---

## 3. ADK playground startup

**Test:** Start the local ADK playground.

```powershell
uv run adk web app --host 127.0.0.1 --port 8081
```

**Expected:** ADK web server starts and opens the Dev UI.

**Result:** Passed.

The graph rendered correctly in the playground.

---

## 4. Shipping-rate prompt

**Prompt:**

```text
How much is standard shipping?
```

**Expected:**

- classifier returns `is_shipping_related: true`,
- route becomes `shipping`,
- shipping FAQ agent answers.

**Result:** Passed.

The playground trace showed the classifier, route, FAQ agent, and final formatted response.

Screenshot: [`05-playground-shipping-route-success.png`](../../screenshots/codelab-2-agents-cli-adk-lifecycle/05-playground-shipping-route-success.png)

---

## 5. Unrelated prompt

**Prompt:**

```text
What is the weather like?
```

**Expected:**

- classifier returns `is_shipping_related: false`,
- route goes to the decline path,
- agent politely refuses because the question is outside shipping support.

**Result:** Passed.

The decline message stayed scoped to shipping topics.

---

## 6. Delivery-time prompt

**Prompt:**

```text
How long does standard delivery take?
```

**Expected:** shipping FAQ answer about standard delivery time.

**Result:** Passed.

The answer reported that standard delivery typically takes **3-5 business days** for domestic shipments.

---

## 7. Response-style update

**Change:** Update the shipping FAQ instruction to prefer concise bullet-style responses.

**Expected:** after restart, shipping answers should be shorter and better structured.

**Result:** Passed.

Observed answer:

```text
Standard delivery typically takes 3-5 business days. Please note:
- Delivery times are estimates and can vary based on destination and current shipping volumes.
- Business days do not include weekends or public holidays.
```

Screenshot: [`07-hot-reload-style-change-bullet-response.png`](../../screenshots/codelab-2-agents-cli-adk-lifecycle/07-hot-reload-style-change-bullet-response.png)

---

## 8. Command-line execution

**Test:** Query the running ADK app through Agents CLI.

```powershell
agents-cli run --url http://127.0.0.1:8081 --mode adk --app-name app "How long does standard delivery take?"
```

**Expected:** CLI returns classifier output, shipping FAQ output, and final customer-support workflow response.

**Result:** Passed.

Screenshot: [`08-agents-cli-run-adk-url-success.png`](../../screenshots/codelab-2-agents-cli-adk-lifecycle/08-agents-cli-run-adk-url-success.png)

---

## Final validation summary

| Check | Result |
|---|---|
| App import | ✅ Passed |
| Lint | ✅ Passed |
| ADK web server | ✅ Passed |
| Graph rendering | ✅ Passed |
| Shipping route | ✅ Passed |
| Unrelated route | ✅ Passed |
| Response-style change | ✅ Passed |
| CLI query | ✅ Passed |
