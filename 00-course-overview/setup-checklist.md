# ✅ Setup Checklist

This file tracks the practical readiness items for the course, repository, and local development workflow.

The goal is to keep setup work visible without mixing it into daily codelab documentation.

---

## 🧭 Course and Community Setup

| Item | Status | Notes |
|------|--------|-------|
| Kaggle account ready | ✅ Done | Required for course access and capstone participation |
| Course enrollment/access | ✅ Done | Course workspace is available |
| Discord/community access | ✅ Done | Community setup and introduction completed |
| Course announcement planning | ✅ Done | LinkedIn announcement strategy prepared |
| Course links saved | ✅ Done | Official links are organized in `resources/official-links.md` and `resources/official-course-links.md` |

---

## 🛠️ Development Environment Setup

| Item | Status | Notes |
|------|--------|-------|
| Google Antigravity IDE installed | ✅ Done | IDE setup completed locally |
| Antigravity CLI installed | ✅ Done | CLI setup completed locally and used during Day 2 work |
| Local terminal ready | ✅ Done | Required for Git and local repository work |
| Git installed/configured | ✅ Done | Verified during local codelab work; final push should still be reviewed intentionally |
| GitHub repository created | ✅ Done | Main portfolio repository has been created |
| Local repository cloned | ✅ Done | Local repository workflow was used while organizing completed day folders and README updates |
| `.gitignore` added | ✅ Done | Protects secrets, caches, builds, and local artifacts |
| `LICENSE` added | ✅ Done | MIT License selected for repository code/docs |
| Python version ready for Day 3 codelabs | ✅ Done | Verified during Day 3 environment audit and used with ADK/Agents CLI projects |
| Node.js/npm ready for Day 3 codelabs | ✅ Done | Verified during Day 3 environment audit for local tooling readiness |
| `uv` package manager ready | ✅ Done | Verified and used for Agents CLI/ADK dependency installation during Day 3 |

---

## ☁️ Google AI and Cloud Setup

| Item | Status | Notes |
|------|--------|-------|
| Google AI Studio access | ✅ Done | Used for the Day 1 AI Studio codelab and Snowflakes & Balloons app build |
| Gemini/API access readiness | ✅ Done | Local Gemini API key mode was used for Day 3 ADK testing; no real keys should be committed or shown in screenshots |
| Google Cloud access | ✅ Done | Used for the Day 1 Cloud Run deployment test |
| Cloud Run deployment readiness | ✅ Done | Validated during the Day 1 AI Studio to Cloud Run codelab |
| Billing/cost awareness reviewed | ✅ Done | Day 1 Cloud Run app was unpublished/cleaned up to avoid unnecessary cost |
| Deployment cleanup process understood | ✅ Done | Cleanup/unpublish decision documented after the Day 1 deployment test |
| Render/deployment note captured where relevant | ✅ Done | Day 2 documentation captured deployment evidence where applicable |

---

## 📁 Repository Structure Setup

| Item | Status | Notes |
|------|--------|-------|
| Root `README.md` created | ✅ Done | Main portfolio landing page |
| `00-course-overview/` created | ✅ Done | Course-level planning and tracking folder |
| Day 1 folder created | ✅ Done | Stores Day 1 notes, codelabs, screenshots, source code, and reflections |
| Day 2 folder created | ✅ Done | Stores Day 2 notes, codelabs, screenshots, tool/MCP documentation, and reflection |
| Day 3 folder created | ✅ Done | Stores Day 3 theory notes, codelabs, screenshots, source snapshots, resources, and reflection |
| Day 4 folder created | 🟡 In Progress | Theory documentation added; codelabs pending |
| Day 5 folder created | ⬜ Pending | Will store Day 5 work |
| `capstone-project/` created | ⬜ Pending | Will store final applied project |
| `docs/` created | ⬜ Pending | Will store setup guides and troubleshooting logs when needed |
| `assets/` created | ⬜ Pending | Will store shared screenshots, diagrams, and visual evidence if needed outside day folders |
| `resources/` created | ✅ Done | Stores official links and course references |

---

## 🔐 Security and Secrets Checklist

| Item | Status | Notes |
|------|--------|-------|
| `.env` files ignored | ✅ Done | Covered through `.gitignore` |
| API keys excluded from Git | ✅ Done | No keys should be committed |
| Credential JSON files ignored | ✅ Done | Service account and token files should stay local |
| MCP config examples sanitized | ✅ Done | Day 2 uses sanitized examples instead of private local config values |
| Screenshots reviewed before upload | ⬜ Ongoing | Remove private account details, billing info, keys, tokens, project IDs, or local paths where needed |
| Terminal outputs reviewed before upload | ⬜ Ongoing | Avoid exposing usernames, keys, private paths, project IDs, or sensitive logs |
| Cloud resources cleaned after testing | ✅ Done | Day 1 Cloud Run test was unpublished/cleaned up to avoid unnecessary cost |
| Skill scripts reviewed before sharing | ✅ Done | Day 3 skill snapshots were curated; executable/runtime folders and private local files were excluded from public documentation |

---

## ✅ Day 1 Setup Update

The Day 1 work confirmed that the main development path is usable:

- Antigravity was used for the first agentic development codelab.
- AI Studio was used for a browser-only app build.
- Cloud Run deployment was tested and then cleaned up.
- Source code and screenshots were organized into the Day 1 folder.
- No real `.env` file or API key is required for the documented Snowflakes & Balloons app.

---

## ✅ Day 2 Setup Update

The Day 2 work confirmed that local/agent tooling needs careful documentation:

- Antigravity CLI work was documented with notes and evidence.
- Google Developer Knowledge MCP setup was documented separately from private local configuration.
- Sanitized config examples were used instead of exposing real credentials or private machine details.
- Screenshots and command evidence were organized inside the Day 2 folder.
- Tool access was treated as a security and reliability concern, not just a setup step.

---

## ✅ Day 3 Setup Validation Note

Day 3 setup was validated through the completed codelabs instead of being guessed in advance:

- Python, Node.js, Git, and `uv` were checked during the local environment audit.
- Antigravity detected the workspace skills and used them during practical tests.
- Agents CLI setup completed and installed the expected CLI skill set.
- ADK Web UI launched locally for graph workflow inspection and playground testing.
- Local Gemini API key mode was used successfully for the `customer-support-agent` codelab.
- Vertex/Google Cloud billing limitations were documented honestly instead of being forced as a blocker for the whole day.
- API keys, account-specific values, cloud project IDs, and private runtime files were kept out of public source snapshots.

This keeps Day 3 reproducible while still respecting security and cost boundaries.

---

## 🧾 Documentation Readiness

| Item | Status | Notes |
|------|--------|-------|
| Course roadmap drafted | ✅ Done | Stored in `course-roadmap.md` and updated through Day 3 completion status |
| Learning objectives drafted | ✅ Done | Stored in `learning-objectives.md` and updated with Agent Skills objectives |
| Progress tracker started | ✅ Done | Stored in `progress-tracker.md` and updated through Day 3 completion status |
| Documentation plan drafted | ✅ Done | Stored in `documentation-plan.md` and updated with completed Day 3 documentation guidance |
| Tools/platforms overview drafted | ✅ Done | Stored in `tools-and-platforms.md` and updated with completed Day 3 Agent Skills, Agents CLI, ADK, and study-support tooling notes |
| Screenshot naming standard defined | ✅ Done | Covered in documentation plan |
| Evidence strategy defined | ✅ Done | Covered in documentation plan |

---

## 🔄 Update Rule

This checklist should be updated whenever a real setup item changes.

Use:

- ✅ Done — confirmed complete
- 🟡 In Progress — started but not fully complete
- ⬜ Pending — not started yet
- 🔁 Verify — needs confirmation before marking done

Do not mark items complete only because they are planned.
