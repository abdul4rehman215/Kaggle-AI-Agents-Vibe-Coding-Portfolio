# 🧾 Documentation Plan

This file defines the documentation standard for the portfolio.

The purpose is practical: a reviewer should be able to open the repository, follow the course path, inspect the evidence, and understand what was learned or built without needing private chat history or scattered notes.

---

## 📌 Documentation Principles

1. **Document real work, not vague claims.**
2. **Keep folder names and links consistent.**
3. **Separate course-level tracking from day-level implementation details.**
4. **Use present tense for completed work and clear pending labels for unfinished work.**
5. **Do not copy large blocks of course text. Summarize understanding in your own words.**
6. **Write in a natural technical voice. Avoid generic AI-generated filler.**
7. **Keep screenshots and source snapshots close to the codelab they prove.**
8. **Document blockers honestly, especially cloud billing or access limitations.**
9. **Never expose secrets, API keys, private credentials, billing details, or sensitive screenshots.**
10. **Make the repository useful as both a learning record and a technical portfolio.**

---

## 🧱 Standard Day Folder Structure

A completed hands-on day usually follows this pattern:

```text
day-folder/
├── README.md
├── notes/
├── codelabs/
├── screenshots/
├── source-snapshots/        # when curated source copies are useful
├── resources/               # when day-specific links are useful
└── reflections/
```

Not every day needs every folder. A theory-heavy or review-track day can stay smaller when that better matches the actual work.

The structure should follow the evidence, not force empty folders.

---

## 📄 Standard Day README Format

Each day-level `README.md` should make the day understandable before a reviewer opens the deeper files.

Recommended structure:

```text
# Day X — Title

## Overview
## Learning Focus
## Work Completed
## Key Artifacts
## Evidence and Screenshots
## Important Notes or Limitations
## Key Learnings
## Folder Structure
```

Use the day README as a guide. Do not turn it into a full duplicate of every codelab README.

---

## 🧪 Standard Codelab Documentation Format

Each codelab folder should include a focused README or notes file that explains:

- what the codelab was about
- which tools were used
- what was built, tested, or reviewed
- important commands or setup steps
- source files or artifacts created
- screenshots or output evidence
- issues encountered and how they were handled
- security or production-readiness observations where relevant

For code-heavy codelabs, keep runnable files and curated notes separate. A reviewer should be able to distinguish implementation from explanation.

---

## 🖼️ Screenshot Strategy

Screenshots are evidence, not decoration.

Use screenshots to prove:

- successful setup or tool access
- generated application output
- deployment or runtime behavior
- command-line validation
- test results
- agent workflow routing
- security tool findings or clean scans
- trace/evaluation evidence

Avoid screenshots that expose private account information, billing details, credentials, project IDs, tokens, or unnecessary personal data.

---

## 🏷️ Screenshot Naming Standard

Use descriptive, ordered names:

```text
01-antigravity-plan-view.png
02-terminal-command-output.png
03-app-running-locally.png
04-cloud-run-cleanup-note.png
05-test-results-passed.png
```

Good screenshot names should answer two questions quickly:

- What does this image prove?
- Where does it fit in the workflow?

---

## 🗂️ File Naming Standard

Use lowercase folder and file names with hyphens:

```text
course-roadmap.md
setup-checklist.md
progress-tracker.md
cloud-run-deployment-notes.md
security-reflection.md
```

Use names that describe the content directly. Avoid vague names like `notes2.md`, `final-final.md`, or `new-readme.md`.

---

## 🔐 Security Documentation Rules

Security-sensitive work needs extra care.

Use these rules across the repository:

- keep `.env` files local and excluded by `.gitignore`
- never commit real keys, tokens, cookies, or credential JSON files
- use sanitized templates for MCP, cloud, or local config examples
- redact screenshots before committing
- document failed or blocked steps without exposing private values
- avoid publishing private usernames, absolute local paths, account IDs, billing details, or project identifiers
- clearly label mock credentials as mock values when they appear in tests

Day 4 and Day 5 are especially important for this standard because they involve security controls, evaluation evidence, production architecture, and deployment-boundary discussion.

---

## 🧠 Reflection Standard

Reflections should not simply say that a task was completed.

A useful reflection explains:

- what changed in understanding
- what worked well
- what was difficult or blocked
- what required human judgment
- how the work connects to real development, cloud workflows, or security operations
- what would be improved in a production version

Personal reactions are fine in reflection files. The root README and course-control files should stay more concise and technical.

---

## ✅ Evidence Standard

A completed task is stronger when it includes at least one of these evidence types:

- source code or configuration snapshot
- command output or test result
- screenshot of working behavior
- deployment note or cleanup record
- evaluation scorecard or trace artifact
- troubleshooting note
- security scan or validation result
- written reflection explaining the technical outcome

The goal is not to over-document everything. The goal is to leave enough evidence that the work is reviewable.

---

## 🧭 Applied Documentation Patterns

| Area | Pattern Used |
|------|--------------|
| Day 1 | Codelab folders with source code, screenshots, deployment notes, and reflection |
| Day 2 | Tool/MCP notes, sanitized configuration, app source, deployment evidence, and prompt-result validation |
| Day 3 | Agent Skills examples, ADK workflow files, validation evidence, source snapshots, and troubleshooting notes |
| Day 4 | Security/evaluation artifacts, tests, traces, scorecards, threat modeling notes, and secure lifecycle evidence |
| Day 5 | Spec-driven production notes, codelab review artifacts, architecture maps, and documented execution boundaries |
| Capstone | Pending final applied project with architecture, implementation, tests, evaluation, and submission evidence |

---

## 🚫 What To Avoid

Avoid these patterns because they make the repository look less professional:

- repeating the same day summary in every file
- linking to folders or files that do not exist yet
- mixing private planning notes with public portfolio documentation
- keeping old “planned folder” text after work is completed
- using future-tense language for completed artifacts
- writing huge status dumps in the root README or overview files
- committing screenshots that reveal private account or billing details
- claiming deployment or production completion when only review-track documentation was completed

---

## 🔄 Update Rule

Update this file only when the documentation standard changes. Daily progress updates belong in the day folders or the progress tracker, not here.
