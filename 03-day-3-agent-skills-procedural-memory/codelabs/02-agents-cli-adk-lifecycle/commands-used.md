# Commands Used - Codelab 2 Agents CLI + ADK Lifecycle

This file records the main commands used during the Agents CLI + ADK lifecycle codelab. API keys are never printed or stored here.

---

## Return to project workspace

```powershell
cd "<PROJECT_ROOT>"
pwd
agents-cli --version
```

Purpose: confirm that the project workspace and Agents CLI were ready.

---

## Gemini API-key mode checks

```powershell
Test-Path Env:GEMINI_API_KEY
Test-Path Env:GOOGLE_API_KEY
```

If the keys were not visible in the current terminal session, they were set through `Read-Host -AsSecureString` and assigned to session-local environment variables.

```powershell
$env:GEMINI_API_KEY = $key
$env:GOOGLE_API_KEY = $key
$env:GOOGLE_GENAI_USE_ENTERPRISE = "FALSE"
$env:GOOGLE_GENAI_USE_VERTEXAI = "FALSE"
```

Verification:

```powershell
uv run python -c "import os; print('GEMINI_API_KEY:', bool(os.environ.get('GEMINI_API_KEY'))); print('GOOGLE_API_KEY:', bool(os.environ.get('GOOGLE_API_KEY'))); print('VERTEX:', os.environ.get('GOOGLE_GENAI_USE_VERTEXAI'))"
```

Expected:

```text
GEMINI_API_KEY: True
GOOGLE_API_KEY: True
VERTEX: False
```

---

## Create the customer support agent

The codelab prompt in Antigravity triggered the scaffold command:

```powershell
agents-cli scaffold create customer-support-agent --agent adk --prototype --auto-approve
```

Then dependencies were installed:

```powershell
cd customer-support-agent
agents-cli install
```

---

## Project inspection

```powershell
Get-ChildItem customer-support-agent -Force
Get-ChildItem customer-support-agent/app -Force
Get-Content customer-support-agent/pyproject.toml -TotalCount 80
Get-Content customer-support-agent/app/agent.py -TotalCount 260
```

Purpose: inspect the generated structure, project metadata, and graph workflow code.

---

## Runtime and lint checks

```powershell
Select-String -Path app/agent.py -Pattern "google.auth|GOOGLE_GENAI_USE_VERTEXAI|GOOGLE_CLOUD_PROJECT|Gemini\("

uv run python -c "from app.agent import app; print(app.name)"

agents-cli lint
```

Expected:

```text
app
All checks passed
```

Purpose: confirm that the app imported correctly, lint passed, and no forced Vertex setup remained.

---

## Launch ADK playground

```powershell
uv run adk web app --host 127.0.0.1 --port 8081
```

The codelab used port `8081` to avoid conflicts with the previous weather assistant server.

---

## Playground test prompts

```text
How much is standard shipping?
What is the weather like?
How long does standard delivery take?
```

Expected behavior:

- shipping-rate question routes to the shipping FAQ path,
- weather question routes to the unrelated decline path,
- delivery-time question routes to the shipping FAQ path.

---

## Response-style update

After editing `shipping_faq_agent` to use concise bullet-style responses:

```powershell
Select-String -Path app/agent.py -Pattern "bullet|concise|shipping_faq_agent|GOOGLE_GENAI_USE_VERTEXAI|google.auth"

uv run python -c "from app.agent import app; print(app.name)"

agents-cli lint
```

Then the ADK server was restarted and the delivery-time prompt was retested.

---

## Command-line execution

Plain `agents-cli run` timed out while starting its own local server on Windows:

```powershell
agents-cli run "How long does standard delivery take?"
```

The working command used the already-running ADK endpoint:

```powershell
agents-cli run --url http://127.0.0.1:8081 --mode adk --app-name app "How long does standard delivery take?"
```

Result: the CLI returned the classifier output, shipping FAQ output, and final customer-support workflow answer.
