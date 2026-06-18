# Testing and Validation - Codelab 1 Antigravity Skills

This file records the practical validation steps from the Antigravity Skills codelab.

---

## 1. Workspace skills discovered

**Test:** Ask Antigravity what skills are available in the workspace.

**Expected:** Antigravity should list the skills under `.agents/skills/`.

**Result:** Passed.

Detected skills included:

- `code-review`
- `database-schema-validator`
- `git-commit-formatter`
- `json-to-pydantic`
- `license-header-adder`

Screenshot: [`07-antigravity-workspace-skills-detected.png`](../../screenshots/codelab-1-antigravity-skills/07-antigravity-workspace-skills-detected.png)

---

## 2. Git commit formatter

**Test:** Create a small `git_test` repo, modify `auth.py`, then ask Antigravity to stage and commit using the Conventional Commits skill.

**Expected:** Commit message should follow the `<type>(scope): description` structure.

**Result:** Passed.

Observed commits:

```text
feat(auth): add initial login function
feat(auth): add google login function
```

The working tree was clean after the final commit.

---

## 3. License header adder

**Test:** Create `my_script.py` and verify the license header.

**Expected:** Header should be prepended and adapted to Python comment syntax.

**Result:** Passed.

The generated file started with Apache-style copyright text converted to `#` comments.

Screenshot: [`15-license-header-my-script-evidence.png`](../../screenshots/codelab-1-antigravity-skills/15-license-header-my-script-evidence.png)

---

## 4. JSON to Pydantic

**Test:** Convert `product.json` into `product_model.py`.

Input:

```json
{
  "product": "Widget",
  "cost": 10.99,
  "stock": null
}
```

**Expected:** A Pydantic model with typed fields and an optional nullable field.

**Result:** Passed.

Output included:

```python
class Product(BaseModel):
    product: str
    cost: float
    stock: Optional[int] = None
```

Screenshot: [`16-product-json-pydantic-conversion.png`](../../screenshots/codelab-1-antigravity-skills/16-product-json-pydantic-conversion.png)

---

## 5. Database schema validator

**Test:** Validate a deliberately bad SQL schema.

**Expected:** The script should catch three violations:

1. forbidden `DROP TABLE`,
2. non-snake-case table name,
3. missing `id` primary key.

**Result:** Passed.

Observed output:

```text
ERROR: 'DROP TABLE' statements are forbidden.
ERROR: Table 'userProfile' must be snake_case.
ERROR: Table 'posts' is missing a primary key named 'id'.
```

Screenshot: [`18-database-schema-validator-errors.png`](../../screenshots/codelab-1-antigravity-skills/18-database-schema-validator-errors.png)

---

## 6. Agents CLI skills

**Test:** Run `uvx google-agents-cli setup`, then inspect installed skills.

**Expected:** Seven `google-agents-cli-*` skills should be installed.

**Result:** Passed.

Detected skills:

- `google-agents-cli-adk-code`
- `google-agents-cli-deploy`
- `google-agents-cli-eval`
- `google-agents-cli-observability`
- `google-agents-cli-publish`
- `google-agents-cli-scaffold`
- `google-agents-cli-workflow`

Screenshot: [`23-antigravity-agents-cli-skills-explained.png`](../../screenshots/codelab-1-antigravity-skills/23-antigravity-agents-cli-skills-explained.png)

---

## 7. Weather assistant scaffold

**Test:** Create and install a prototype weather assistant.

**Expected:** Project scaffold and dependency sync should complete.

**Result:** Partially passed.

Worked:

- project scaffold,
- dependency install,
- app import,
- ADK web server,
- graph rendering.

Blocked:

- live model call through Vertex/Agent Platform because Cloud billing was disabled.

I documented this as an environment limitation instead of editing the prototype into a different auth mode.
