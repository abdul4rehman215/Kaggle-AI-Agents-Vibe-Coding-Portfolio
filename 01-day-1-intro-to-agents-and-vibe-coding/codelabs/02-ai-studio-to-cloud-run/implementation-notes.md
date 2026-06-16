# 🧪 Snowflakes & Balloons Implementation Notes

This file documents the exported AI Studio app code at a practical level.

---

## 📁 App folder

```text
source/snowflakes-and-balloons/
```

The app is a Vite/React frontend with TypeScript source files.

---

## 🧩 Main components

### `src/App.tsx`

Handles the app shell and user controls:

- snowflake trigger,
- balloon trigger,
- combined celebration trigger,
- clear/reset trigger,
- active particle counts,
- countdown progress,
- sound toggle,
- reduced-motion toggle,
- and layout.

### `src/components/VisualCanvas.tsx`

Handles the animation engine:

- canvas sizing,
- particle creation,
- snowflake movement,
- balloon movement,
- fade-out behavior,
- particle caps,
- clear/reset state,
- active count reporting.

The important design decision is that spawning depends on explicit trigger counters, not on resize changes. That avoids accidental effects when the browser zoom or preview panel changes.

---

## 🎧 Sound design

The app uses the browser Web Audio API directly.

No audio files are stored, loaded, or fetched. The sounds are generated in-browser with oscillators and gain envelopes.

This keeps the app lightweight and avoids external assets.

---

## ♿ Reduced motion

The reduced-motion toggle lowers animation intensity by limiting particle counts and movement behavior.

This is not a full accessibility audit, but it is a useful first step toward making the interaction less overwhelming.

---

## 🧹 Clear/reset behavior

The clear action does not reload the page.

Instead, it:

- resets active countdowns,
- clears internal particle state,
- and triggers the canvas to empty itself.

This is cleaner than `window.location.reload()` because it preserves app state and avoids a heavy full-page reset.

---

## 📦 Cleaned portfolio copy

The exported AI Studio project had generic template traces that suggested Gemini/API usage. The actual Snowflakes & Balloons app does not call Gemini and does not need an API key.

For this portfolio copy:

- the README explains local frontend usage,
- `.env.example` uses safe optional placeholders only,
- and package metadata is kept focused on the frontend app.

---

## ▶️ Local run

```bash
cd source/snowflakes-and-balloons
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

---

## ⚠️ Limitations

This is a codelab app, not a production product.

Possible improvements:

- add automated UI tests,
- add linting rules,
- improve reduced-motion behavior using system preferences,
- add stronger mobile testing,
- add a deployment guide for a free static host,
- simplify dependencies further if AI Studio export adds unused packages.
