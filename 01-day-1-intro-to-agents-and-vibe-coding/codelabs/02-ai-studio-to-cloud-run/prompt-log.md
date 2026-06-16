# 🧾 AI Studio Prompt Log

This file reconstructs the important prompt decisions from the saved screenshots and exported app code. It does not claim to be a complete lost chat transcript.

---

## 🧱 Initial implementation constraints

The initial prompt required a small Snowflakes & Balloons app with strict implementation boundaries.

Core constraints:

```text
No login.
No API keys.
No backend.
No external paid services.
No private data.
The app should run fully in the browser.
Keep the final result suitable for deployment to Cloud Run through AI Studio.
Build using React and Tailwind CSS.
```

Why this mattered:

- It reduced security risk.
- It kept the app reproducible.
- It avoided cloud/API dependency confusion.
- It matched the codelab goal without adding unnecessary complexity.

Screenshot evidence:

![Initial browser-only requirements](../../screenshots/codelab-2-ai-studio-cloud-run/ai-studio-browser-only-requirements.png)

---

## 🐛 Bug-fix refinement

After the first version, the refinement prompt focused on behavior correctness.

Problems to fix:

- Snowflakes or balloons should not spawn when browser zoom changes.
- Snowflakes or balloons should not spawn when the AI Studio preview panel resizes.
- Particles should spawn only from intentional user actions.
- Resize/dimension updates should not retrigger particle-spawn effects.
- Clearing should not use `window.location.reload()`.

Why this mattered:

A visual app can look correct while still having flawed state behavior. This refinement made the canvas logic more deliberate and less accidental.

Screenshot evidence:

![Bug-fix prompt](../../screenshots/codelab-2-ai-studio-cloud-run/refinement-bug-fix-prompt.png)

---

## 🎨 UI/UX refinement

The next prompt focused on polish and removing generated-demo roughness.

Requested improvements:

- remove footer text such as “Powered by React 19…”;
- remove AI/dev labels like “Interactive Motion Sandbox” or “Simulation Running”;
- make the interface feel like a playful web experience;
- add visible 5-second progress/countdown indicators;
- add optional sound on/off using browser Web Audio only;
- add reduced-motion support if simple;
- keep the two required main buttons: `Snowflakes` and `Balloons`;
- keep animations smooth, responsive, and browser-only;
- do not add login, backend, database, analytics, API keys, paid APIs, or private data.

Screenshot evidence:

![UI/UX improvement prompt](../../screenshots/codelab-2-ai-studio-cloud-run/ui-ux-improvement-prompt.png)

---

## 🧠 Prompting lesson

The most useful prompts were not the most decorative ones. The strongest prompts were the ones that gave boundaries:

- what must happen,
- what must not happen,
- what should trigger behavior,
- what should never trigger behavior,
- and what dependencies are not allowed.

That is the practical difference between a quick demo prompt and a more engineering-focused vibe-coding workflow.
