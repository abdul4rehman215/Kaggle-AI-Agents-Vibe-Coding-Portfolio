# 🧾 Documentation Plan

This file defines how the repository should be documented as the course progresses.

The goal is to keep the repository clean, consistent, and useful as a technical portfolio. Every note, codelab, screenshot, and reflection should help a reviewer understand what was learned, what was built, and how the work was verified.

---

## 📌 Documentation Principles

The repository should follow these principles:

1. **Document real work, not vague claims.**
2. **Keep folder names consistent across all links.**
3. **Separate planning from implementation evidence.**
4. **Avoid copying course text directly.**
5. **Write explanations in a natural, human technical voice.**
6. **Mark future work as planned or pending until it is completed.**
7. **Never expose secrets, keys, billing details, or private account information.**
8. **Use screenshots only when they add evidence or clarity.**
9. **Keep the root README high-level and use day folders for details.**
10. **Make the repository understandable without needing outside chat history.**

---

## 🧱 Standard Day Folder Structure

Each day folder should follow this general pattern:

```text
day-folder/
├── README.md
├── notes/
├── codelabs/
├── screenshots/
└── reflections/
```

Some days may need extra folders depending on the actual work, but this base structure should stay consistent.

---

## 📄 Standard Day README Format

Each day-level `README.md` should include:

```text
# Day X — Title

## Overview
Short explanation of the day’s theme.

## Learning Focus
Main concepts covered.

## Work Completed
What was actually done.

## Hands-On Artifacts
Code, codelabs, notebooks, apps, or deployment files.

## Screenshots / Evidence
Links to screenshots or output evidence.

## Key Learnings
What was understood from the work.

## Security / Production Notes
Relevant risks, constraints, or operational observations.

## Next Steps
What remains to be completed or improved.
```

The day README should not become too long. Detailed notes should go inside `notes/`, and implementation details should go inside codelab folders.

---

## 🧪 Standard Codelab Documentation Format

Each codelab folder should include its own README.

Recommended codelab README structure:

```text
# Codelab Title

## Purpose
What this codelab is meant to teach.

## Tools Used
Platforms, CLIs, IDEs, cloud services, or libraries involved.

## Steps Followed
Clean summary of the workflow.

## Files Created
List of important files created or modified.

## Output
What the final result does.

## Screenshots
Evidence of setup, build, test, or deployment.

## Issues Faced
Errors, blockers, or confusing steps.

## Fixes / Decisions
How problems were handled.

## Security Notes
Any secret handling, permissions, cloud, or deployment concerns.

## Reflection
What this codelab taught beyond the exact steps.
```

This format keeps each codelab useful as both evidence and future reference.

---

## 🖼️ Screenshot Strategy

Screenshots should be used for evidence, not decoration.

Good screenshot examples:

- setup completion
- successful command output
- working application UI
- deployment success screen
- important error message
- cloud service confirmation
- final project output

Avoid screenshots that show:

- API keys
- tokens
- billing details
- private account information
- private email addresses
- unnecessary browser tabs
- unrelated personal files

---

## 🏷️ Screenshot Naming Standard

Use clear names with date or step context when useful.

Recommended examples:

```text
antigravity-ide-first-launch.png
antigravity-cli-version-check.png
ai-studio-generated-app-preview.png
cloud-run-deployment-success.png
day-1-codelab-final-output.png
capstone-architecture-diagram.png
```

Avoid vague names:

```text
image1.png
screenshot.png
final.png
new.png
test.png
```

---

## 📁 File Naming Standard

Use lowercase names with hyphens.

Good examples:

```text
setup-checklist.md
course-roadmap.md
vibe-coding-whitepaper-notes.md
cloud-run-deployment-notes.md
security-and-secrets-handling.md
day-1-reflection.md
```

Avoid:

```text
My Notes.md
finalREADME.md
new_file.md
Day1FinalFinal.md
```

---

## 🔐 Security Documentation Rules

Any documentation involving tools, cloud services, APIs, or deployment should include a short security note.

Security notes may cover:

- whether secrets were used
- where credentials were stored
- what was excluded from Git
- whether screenshots were redacted
- whether cloud resources need cleanup
- whether the agent had access to tools or files
- what risks were noticed

This does not need to be dramatic. It just needs to show careful engineering thinking.

---

## 🧠 Reflection Standard

Each day should have a reflection, but it should be specific.

Weak reflection:

> Today I learned about AI agents. It was useful.

Stronger reflection:

> Day 1 showed that vibe coding can speed up the first version of an application, but the developer still needs to review generated code, test behavior, and decide whether the output is safe and maintainable.

Good reflections should mention:

- what changed in understanding
- what felt powerful
- what felt risky or unclear
- what should be improved next
- how the learning connects to real workflows

---

## ✅ Evidence Standard

A task is considered properly documented only when at least one of these exists:

- notes explaining the concept
- code or generated files
- screenshot evidence
- command output summary
- deployment link
- troubleshooting record
- reflection

For major codelabs, aim to include multiple evidence types.

---

## 🚫 What To Avoid

Avoid:

- overclaiming completion
- copying large course text directly
- dumping raw screenshots without explanation
- committing secrets or private files
- using inconsistent folder names
- writing generic AI-sounding filler
- creating many empty folders with no purpose
- mixing unrelated notes into the wrong day folder

---

## 🔄 Update Rule

This documentation plan should be used as the standard for future work.

If a better structure becomes necessary after real codelab work begins, update this file and keep the repository consistent.
