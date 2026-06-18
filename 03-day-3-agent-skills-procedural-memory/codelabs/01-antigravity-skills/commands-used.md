# Commands Used - Codelab 1 Antigravity Skills

This file records the main commands used during the Antigravity Skills codelab. Secrets, account identifiers, and private project details are intentionally omitted.

---

## Environment audit

```powershell
python --version
node --version
uv --version
git --version
agents-cli --version
```

```powershell
ls ~/.agents/skills
ls ~/.gemini/config/skills
ls ~/.gemini/antigravity-cli/skills
```

Purpose: check whether Python, Node, uv, Git, Agents CLI, and Antigravity skill folders were already available.

---

## Workspace skill folder inspection

```powershell
pwd
Get-ChildItem -Force
Test-Path .agents
Test-Path .agents/skills
```

```powershell
Get-ChildItem .agents/skills -Force

Get-ChildItem .agents/skills -Directory | ForEach-Object {
  $skillFile = Join-Path $_.FullName "SKILL.md"
  [PSCustomObject]@{
    Skill = $_.Name
    HasSkillMd = Test-Path $skillFile
  }
}
```

Purpose: confirm that project-scoped skills were stored under `.agents/skills/`.

---

## Existing skill inspection

```powershell
Get-ChildItem .agents/skills/code-review -Force
Get-Content .agents/skills/code-review/SKILL.md -TotalCount 120
```

Purpose: inspect the baseline `code-review` skill and confirm that `SKILL.md` used YAML frontmatter plus Markdown instructions.

---

## Official sample skills clone and copy

```powershell
$src = Join-Path $env:TEMP "antigravity-skills"

if (Test-Path $src) {
  Remove-Item $src -Recurse -Force
}

git clone https://github.com/rominirani/antigravity-skills.git $src

Get-ChildItem "$src\skills_tutorial" -Directory
```

```powershell
$src = Join-Path $env:TEMP "antigravity-skills"

$skills = @(
  "git-commit-formatter",
  "license-header-adder",
  "database-schema-validator",
  "json-to-pydantic"
)

foreach ($skill in $skills) {
  $from = Join-Path $src "skills_tutorial\$skill"
  $to = Join-Path ".agents\skills" $skill

  if (Test-Path $to) {
    Write-Host "SKIP: $skill already exists"
  } else {
    Copy-Item $from $to -Recurse
    Write-Host "COPIED: $skill"
  }
}

Get-ChildItem .agents/skills -Directory | Sort-Object Name | ForEach-Object {
  $skillFile = Join-Path $_.FullName "SKILL.md"
  [PSCustomObject]@{
    Skill = $_.Name
    HasSkillMd = Test-Path $skillFile
  }
}
```

Purpose: install the four official tutorial skills into the workspace.

---

## Skill structure inspection

```powershell
$skills = @(
  "git-commit-formatter",
  "license-header-adder",
  "database-schema-validator",
  "json-to-pydantic"
)

foreach ($skill in $skills) {
  Write-Host "`n=============================="
  Write-Host "SKILL: $skill"
  Write-Host "=============================="

  Write-Host "`nFolder contents:"
  Get-ChildItem ".agents/skills/$skill" -Force | ForEach-Object {
    Write-Host ("- " + $_.Name)
  }

  Write-Host "`nSKILL.md first 25 lines:"
  Get-Content ".agents/skills/$skill/SKILL.md" -TotalCount 25
}
```

Purpose: inspect `SKILL.md`, `resources/`, `scripts/`, and `examples/` patterns.

---

## Git formatter validation

```powershell
Get-ChildItem git_test -Force
Get-Content git_test/auth.py
git -C git_test status
git -C git_test log --oneline -n 5
```

Purpose: verify the test Git repo, committed file, and Conventional Commit history.

---

## License header validation

```powershell
Get-Content my_script.py -TotalCount 40
```

Purpose: confirm that the Python file received the expected header with `#` comment syntax.

---

## JSON to Pydantic validation

```powershell
Get-Content product.json
Get-Content product_model.py -TotalCount 100
```

Purpose: inspect the JSON input and generated Pydantic model.

---

## Database schema validator

```powershell
Get-Content bad_schema.sql
python .agents/skills/database-schema-validator/scripts/validate_schema.py bad_schema.sql
$LASTEXITCODE
```

Expected result:

```text
ERROR: 'DROP TABLE' statements are forbidden.
ERROR: Table 'userProfile' must be snake_case.
ERROR: Table 'posts' is missing a primary key named 'id'.
1
```

Purpose: verify the script-backed skill catches the expected failures.

---

## Agents CLI skill setup and verification

```powershell
uvx google-agents-cli setup
agents-cli --version

Get-ChildItem ~/.agents/skills -Directory | Sort-Object Name | Select-Object Name
Get-ChildItem ~/.gemini/antigravity-cli/skills -Directory | Sort-Object Name | Select-Object Name
```

Purpose: install Agents CLI and confirm the seven `google-agents-cli-*` skills.

---

## Weather assistant prototype

```powershell
agents-cli create weather-assistant --prototype --yes
cd weather-assistant
agents-cli install
```

The one-off `agents-cli run` command timed out on Windows, so I tested the app with ADK directly:

```powershell
uv run python -c "from app.agent import app; print(app.name)"
uv run adk web app --host 127.0.0.1 --port 8080
```

The local server and graph loaded. Live model calls were blocked later by Cloud billing on the active project.
