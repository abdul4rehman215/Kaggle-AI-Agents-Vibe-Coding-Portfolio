# 🔗 Day 1 Resources and Links

This file keeps the Day 1 official links, codelab references, local evidence, and deployment/demo links in one place.

---

## 🎯 Official assignment links

| Resource | Link |
|---|---|
| Official 5-Day Agents guide | https://www.kaggle.com/learn-guide/5-day-agents |
| Kaggle competition/course page | https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google |
| Day 0 troubleshooting and FAQ notebook | https://www.kaggle.com/code/kaggle5daysofai/day-0-troubleshooting-and-faqs |
| Kaggle 5 Days of AI profile | https://www.kaggle.com/kaggle5daysofai |
| Capstone competition | https://www.kaggle.com/competitions/agents-intensive-capstone-project |

---

## 🧪 Day 1 codelabs

| Codelab | Link | Current status |
|---|---|---|
| Getting Started with Google Antigravity | https://codelabs.developers.google.com/getting-started-google-antigravity | ✅ Completed and documented in [`../codelabs/01-antigravity-getting-started/`](../codelabs/01-antigravity-getting-started/) |
| Deploy from AI Studio to Cloud Run | https://codelabs.developers.google.com/deploy-from-aistudio-to-run | ✅ Completed, Cloud Run tested, Vercel deployed, and documented in [`../codelabs/02-ai-studio-to-cloud-run/`](../codelabs/02-ai-studio-to-cloud-run/) |

---

## 📘 Study artifacts used locally

These were used during the Day 1 learning and documentation phase.

| Local study material | How it was used |
|---|---|
| Day 1 livestream notes | Used to capture the course framing, expert Q&A, pop quiz points, and codelab overview. |
| Day 1 whitepaper notes | Used to summarize the AI-driven SDLC, vibe coding, agentic engineering, context, and verification themes. |
| Key concepts notes | Used as a compact revision file for Day 1 ideas such as model + harness, specification quality, and human review. |
| Screenshots | Used as visual evidence for Antigravity, AI Studio prompts, generated artifacts, refinement steps, and final app state. |
| Reflection notes | Used to connect Day 1 learning with cybersecurity, SOC automation, and production-readiness thinking. |

---

## 🧪 Hands-on artifacts now included

| Artifact | Location | Purpose |
|---|---|---|
| Day 1 overview README | [`../README.md`](../README.md) | Main Day 1 summary, learning themes, evidence links, and live demo reference. |
| Antigravity codelab docs | [`../codelabs/01-antigravity-getting-started/`](../codelabs/01-antigravity-getting-started/) | Documentation for the Antigravity workspace, generated CLI project, artifacts, and review flow. |
| Google News CLI source | [`../codelabs/01-antigravity-getting-started/source/google-news-cli/`](../codelabs/01-antigravity-getting-started/source/google-news-cli/) | Reproducible source folder for the Antigravity-generated CLI project. |
| Code-review skill demo | [`../codelabs/01-antigravity-getting-started/skill-demo-notes.md`](../codelabs/01-antigravity-getting-started/skill-demo-notes.md) | Notes explaining the custom Antigravity code-review skill and intentionally broken Python demo file. |
| AI Studio codelab docs | [`../codelabs/02-ai-studio-to-cloud-run/`](../codelabs/02-ai-studio-to-cloud-run/) | Documentation for the Snowflakes & Balloons app, prompt/refinement workflow, and deployment notes. |
| Snowflakes & Balloons source | [`../codelabs/02-ai-studio-to-cloud-run/source/snowflakes-and-balloons/`](../codelabs/02-ai-studio-to-cloud-run/source/snowflakes-and-balloons/) | Complete cleaned React/Vite app source exported from AI Studio. |
| Codelab 2 deployment notes | [`../codelabs/02-ai-studio-to-cloud-run/deployment-notes.md`](../codelabs/02-ai-studio-to-cloud-run/deployment-notes.md) | Documents Cloud Run testing, Cloud Run cleanup, and current Vercel hosting status. |
| Screenshot evidence | [`../screenshots/`](../screenshots/) | Visual evidence from setup, prompts, artifacts, terminal output, app preview, and final UI state. |
| Day 1 reflection | [`../reflections/day-1-reflection.md`](../reflections/day-1-reflection.md) | Personal learning reflection connecting Day 1 with AI agents, security automation, and review discipline. |
| Live Snowflakes & Balloons app | https://kaggle-ai-agents-vibe-coding-portfo-delta.vercel.app/ | Public Vercel deployment of the Day 1 AI Studio app. |

---

## 🌐 Current public demo

| Demo | Link | Status |
|---|---|---|
| Snowflakes & Balloons app | https://kaggle-ai-agents-vibe-coding-portfo-delta.vercel.app/ | ✅ Currently live on Vercel |

Deployment note:

- The app was originally tested through Cloud Run during the codelab.
- The Cloud Run service was later unpublished for cost control.
- The current public demo is hosted on Vercel as a static frontend deployment.
- The Vercel link is live at the time of documentation, but it may be removed, paused, redeployed, or replaced later.

---

## 🛡️ Resource handling note

I am keeping this repo focused on my own documentation and learning outputs.

For that reason:

- I am linking to official course materials instead of committing full official course content.
- I am not committing API keys, credentials, tokens, private `.env` files, or billing details.
- The Antigravity project source is included, but generated dependency folders such as `node_modules/` are excluded.
- The AI Studio app source is included as a cleaned static frontend project.
- The Vercel demo is documented as a current public portfolio link, not as a guaranteed permanent production service.
- Screenshots should be reviewed before public sharing to avoid exposing private account or project details.

---


<!--

## 📝 Useful reminder for future updates

If the Vercel deployment is removed, paused, or replaced later, update these files together:

- [`../README.md`](../README.md)
- [`../codelabs/README.md`](../codelabs/README.md)
- [`../codelabs/02-ai-studio-to-cloud-run/README.md`](../codelabs/02-ai-studio-to-cloud-run/README.md)
- [`../codelabs/02-ai-studio-to-cloud-run/deployment-notes.md`](../codelabs/02-ai-studio-to-cloud-run/deployment-notes.md)
- this `day-1-links.md` file

-->
