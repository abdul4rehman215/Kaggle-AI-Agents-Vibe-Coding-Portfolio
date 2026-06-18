---
name: git-commit-formatter
description: Formats git commit messages according to Conventional Commits specification. Use this when the user asks to commit changes or write a commit message.
---

# Git Commit Formatter Skill

When writing a git commit message, follow the Conventional Commits specification.

## Format

`<type>[optional scope]: <description>`

## Allowed Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Formatting-only changes
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Test additions or corrections
- **chore**: Build process, auxiliary tools, or maintenance

## Instructions

1. Inspect the changed files.
2. Select the most accurate type and scope.
3. Keep the description short, imperative, and lowercase.
4. Do not add vague messages such as `update files`.
