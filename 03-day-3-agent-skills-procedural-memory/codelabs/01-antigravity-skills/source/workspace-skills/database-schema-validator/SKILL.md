---
name: database-schema-validator
description: Validates SQL schema files for compliance with internal safety and naming policies.
---

# Database Schema Validator Skill

This skill validates SQL schema files against strict database standards.

## Policies Enforced

1. No `DROP TABLE` statements.
2. Table names must use `snake_case`.
3. Every table must have an `id` column as `PRIMARY KEY`.

## Instructions

1. Do not validate the file manually by eye.
2. Run `python scripts/validate_schema.py <path_to_user_file>`.
3. Report each validation error clearly.
4. Suggest specific fixes.
