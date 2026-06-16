# ☁️ Cloud Run Deployment Notes

The Snowflakes & Balloons app was deployed and tested through Cloud Run during the Day 1 AI Studio codelab.

---

## ✅ What was done

- App was generated/refined in Google AI Studio.
- Source code was exported.
- Cloud Run deployment was tested from the codelab workflow.
- The deployed app was checked to confirm it worked.
- The service was then unpublished/cleaned up to avoid ongoing cost.

---

## 📌 Current status

```text
Live Cloud Run URL: not currently active
Reason: deployment was unpublished after testing
Cost note: avoiding unnecessary cloud charges
```

This is intentional. I do not want the repository to imply there is a live deployment when the service has been unpublished.

---

## 🔐 Deployment safety notes

Before publishing any cloud app publicly, I would check:

- whether the service is still running,
- whether billing is enabled,
- whether traffic is public,
- whether logs show sensitive data,
- whether environment variables contain secrets,
- whether screenshots reveal project IDs or account details,
- and whether cleanup steps are complete.

---

## 🌐 Future hosting options

Because this app is a static frontend, it can likely be hosted later through a free or low-cost static platform such as:

- GitHub Pages,
- Netlify,
- Vercel,
- Firebase Hosting,
- or another static frontend host.

A future deployment should be documented only after the link is actually live and verified.

---

## 🧠 Lesson

Deployment is part of the engineering workflow, but cleanup is also part of the workflow.

A successful codelab deployment does not mean the service should stay online forever. If the app is only needed as learning evidence, screenshots, source code, and deployment notes are enough.
