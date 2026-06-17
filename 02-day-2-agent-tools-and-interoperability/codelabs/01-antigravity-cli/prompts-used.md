# 💬 Prompts Used — Antigravity CLI Codelab

This file records the main prompts used during the Antigravity CLI codelab.

I am keeping the prompts here because the codelab was not only about the final Flask app. It was also about how the agent was guided, reviewed, corrected, and refined.

---

## 1) Initial app build prompt

### Purpose

Build the official developer example app from the Antigravity CLI codelab: a BigQuery release notes dashboard using Flask and vanilla frontend code.

### Prompt

```text
Please build a web application for me using Python Flask and plain vanilla HTML, JavaScript and CSS that fetches the BigQuery Release notes from (https://docs.cloud.google.com/feeds/bigquery-release-notes.xml) and shows them to me.

A simple refresh button with a spinner is good enough, anytime I'd like to refresh the details.

I would also like the ability to take any specific update, select it and then Tweet about it.
```

### Outcome

Antigravity created a Flask app with:

- `app.py`,
- `requirements.txt`,
- `templates/index.html`,
- `static/css/style.css`,
- `static/js/main.js`,
- and an app README.

It also created temporary inspection scripts to understand the XML feed before parsing it.

---

## 2) UI polish prompt

### Purpose

Fix real UI issues found during manual testing.

The first app worked, but the visual quality was not portfolio-ready. Some card text was clipped, the dropdown had poor contrast on Windows, and the Tweet button looked too flat.

### Prompt

```text
Please review and improve the current BigQuery Release Notes Hub UI without changing the core Flask backend behavior.

Observed UI issues to fix:
1. The left sidebar release-note cards are visually cropped and the text/date/badges are partly hidden.
2. The “All Categories” dropdown has poor contrast on Windows: options appear on a light background with very low-contrast text.
3. The “Tweet on X” button works but looks too flat; make it more visually interactive with better hover/focus/active states.
4. Improve selected-card readability and spacing in the sidebar.
5. Keep the existing dark tech-dashboard style, but make the UI cleaner, more readable, and more portfolio-ready.

Please first inspect the existing HTML/CSS/JS structure, then propose a short implementation plan before editing files. Do not add new external frameworks or CDN dependencies. Keep it vanilla HTML, CSS, and JavaScript.
```

### Outcome

Antigravity inspected the UI structure and focused mainly on CSS fixes:

- sidebar spacing,
- selected-card state,
- dropdown option contrast,
- button hover/focus/active states,
- typography and detail-card spacing.

This was committed as a second checkpoint.

---

## 3) Extension features prompt

### Purpose

Add the remaining codelab-style improvements: Copy Update, Export CSV, and theme toggle.

### Prompt

```text
Please extend the current BigQuery Release Notes Hub with the remaining official codelab-style feature improvements.

Add these features:

1. Copy to Clipboard
- Add a clearly visible "Copy Update" button near the tweet/share composer.
- When clicked, copy the currently selected release-note summary or tweet-ready text to the clipboard.
- Show a small success/failure visual message, such as a toast or inline status.
- Keep it accessible with keyboard focus styling.

2. Export to CSV
- Add an "Export CSV" button in the header or sidebar controls.
- Export the currently visible/filtered release notes, not only the selected one.
- CSV columns should include: date, category/type, title/summary, link.
- Escape CSV values correctly so commas, quotes, and line breaks do not break the file.
- The downloaded filename should be clear, such as bigquery-release-notes.csv.

3. Light/Dark Theme Toggle
- Add a theme toggle button in the header.
- Keep the existing dark theme as the default.
- Add a clean light theme using CSS variables, without breaking the current dark dashboard look.
- Save the selected theme in localStorage so it persists after refresh.
- Make sure dropdowns, cards, buttons, sidebar, detail panel, and tweet composer remain readable in both themes.

Constraints:
- Do not add external frameworks or CDN dependencies.
- Keep the app vanilla Flask, HTML, CSS, and JavaScript.
- Do not change the core XML parsing/feed behavior unless absolutely necessary.
- First inspect the existing files and propose a short implementation plan before editing.
- After implementing, summarize exactly which files changed and how to test the new features.
```

### Outcome

Antigravity added:

- `Copy Update` button,
- `Export CSV` button,
- light/dark theme toggle,
- localStorage theme persistence,
- browser-side CSV generation,
- clipboard copy behavior with fallback.

Manual testing found two issues that still needed a follow-up QA pass.

---

## 4) QA and refinement prompt

### Purpose

Fix bugs that only became obvious after hands-on testing:

- some tweet drafts ended with `...`, which looked unfinished,
- light-mode Tweet button styling was too dark,
- selected sidebar cards had poor contrast in light mode.

### Prompt

```text
Please do a focused QA and refinement pass on the new Copy Update, Export CSV, and Light/Dark Theme Toggle features.

The features are present, but I observed these issues after testing:

1. Tweet composer truncation issue
- Some generated tweet text ends with "..." or feels like an incomplete sentence.
- This makes the tweet look unfinished.
- Fix the tweet-generation logic so the tweet stays under 280 characters but ends cleanly.
- Prefer using the first complete sentence if it fits.
- If the text is too long, shorten at a clean word boundary and end with a meaningful phrase such as "Read more in the docs." rather than using "...".
- Always preserve the BigQuery category/type, useful context, docs link, and #BigQuery hashtag.
- The displayed character count should accurately reflect the final tweet text.

2. Light-mode Tweet button styling
- In light mode, the "Tweet on X" button appears too black/dark and does not match the light UI.
- Improve its light-theme style so it looks like a clear primary action button, remains readable, and has polished hover/focus/active states.
- Keep dark mode styling strong and readable too.

3. Light-mode selected sidebar card readability
- In light mode, the selected release-note card in the sidebar has poor contrast.
- Some selected-card text looks too pale/washed out and is hard to read.
- Improve selected-card text, badge, date, and snippet contrast in light mode.
- Keep the selected state visually clear without sacrificing readability.

4. Regression check
- Do not change the Flask XML parsing/feed behavior.
- Keep the app vanilla Flask, HTML, CSS, and JavaScript.
- Verify that search/filter, Export CSV, Copy Update, theme persistence, Refresh, and Tweet on X still work.

Please first inspect the relevant JS and CSS, explain the root cause briefly, then implement the fixes. After implementation, summarize exactly which files changed and how I should test each fix.
```

### Outcome

Antigravity changed:

- `static/js/main.js` for cleaner tweet drafting,
- `static/css/style.css` for light-mode button and selected-card contrast.

The final tweet text now stays under 280 characters without ending with broken ellipses.

---

## Prompting lesson

The most important lesson was that broad prompts can create a working first version, but the best results came from focused prompts based on real testing.

The workflow became:

```text
build → inspect → test → notice issue → request focused fix → test again → commit
```

That felt much more like practical agent-assisted development than simply asking for a finished app once.
