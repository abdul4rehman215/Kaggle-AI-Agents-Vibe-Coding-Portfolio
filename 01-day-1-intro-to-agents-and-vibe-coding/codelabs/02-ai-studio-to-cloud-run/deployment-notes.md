# ☁️ Deployment Notes — Snowflakes & Balloons App

The **Snowflakes & Balloons** app was created during the Day 1 AI Studio codelab.

It was first deployed and tested through **Google Cloud Run** as part of the original codelab workflow. After testing, that Cloud Run service was unpublished/cleaned up to avoid unnecessary cloud cost.

The app is now also deployed as a static frontend on **Vercel** for public portfolio sharing.

---

## ✅ What was done

- App was generated/refined in Google AI Studio.
- Source code was exported from AI Studio.
- Cloud Run deployment was tested from the codelab workflow.
- The Cloud Run version was checked to confirm the app worked.
- The Cloud Run service was then unpublished/cleaned up to avoid ongoing cost.
- The exported frontend source was later deployed from GitHub to Vercel.
- The Vercel deployment was verified as the current public demo link.

---

## 🌐 Current live demo

```text
Current public demo: https://kaggle-ai-agents-vibe-coding-portfo-delta.vercel.app/
Hosting platform: Vercel
App type: static frontend
Backend/API required: no
Database required: no
Login required: no
```

🔗 **Live app:** https://kaggle-ai-agents-vibe-coding-portfo-delta.vercel.app/

Note: this Vercel deployment is currently live for portfolio/demo purposes. It is not guaranteed to remain permanent forever. The link may be removed, paused, redeployed, or replaced later if the hosting setup changes.

---

## 📌 Cloud Run status

```text
Cloud Run deployment: tested during codelab
Live Cloud Run URL: not currently active
Reason: deployment was unpublished after testing
Cost note: avoiding unnecessary cloud charges
```

This is intentional. I do not want the repository to imply that the original Cloud Run service is still running when it has been unpublished.

---

## ⚡ Vercel deployment status

```text
Vercel deployment: currently live
Deployment source: GitHub repository
Root app folder: 01-day-1-intro-to-agents-and-vibe-coding/codelabs/02-ai-studio-to-cloud-run/source/snowflakes-and-balloons
Build output: dist
Environment variables needed: none
```

The Vercel version is suitable because the app is a browser-only React/Vite frontend. It does not require a server-side API, database, login system, or secret key.

---

## 🔐 Deployment safety notes

Before publishing any cloud or hosted app publicly, I would check:

- whether the deployment is still intended to be public,
- whether billing is enabled on the platform,
- whether logs or screenshots reveal sensitive data,
- whether environment variables contain secrets,
- whether project IDs or account details appear in public documentation,
- whether the app depends on private services,
- whether cleanup steps are complete for any unused cloud services.

For this app, the public Vercel demo is low risk because it is a static frontend and does not collect user data.

---

## 🌐 Hosting options

Because this app is a static frontend, it can be hosted through platforms such as:

- Vercel,
- GitHub Pages,
- Netlify,
- Firebase Hosting,
- or another static frontend host.

The current verified public deployment is on Vercel:

🔗 https://kaggle-ai-agents-vibe-coding-portfo-delta.vercel.app/

---

## 🧠 Lesson

Deployment is part of the engineering workflow, but cleanup is also part of the workflow.

A successful codelab deployment does not mean the original cloud service should stay online forever. For learning evidence, it is better to document:

- what was deployed,
- where it was tested,
- whether it is still live,
- why cleanup was done,
- and which public demo link is currently valid.

In this case, Cloud Run was useful for completing the codelab workflow, while Vercel is a better fit for a lightweight public portfolio demo.
