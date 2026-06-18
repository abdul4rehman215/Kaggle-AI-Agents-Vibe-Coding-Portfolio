---
name: json-to-pydantic
description: Converts JSON data snippets into Python Pydantic data models.
---

# JSON to Pydantic Skill

This skill converts raw JSON data or API responses into structured Python Pydantic models.

## Instructions

1. Analyze the JSON object.
2. Infer field types.
3. Extract nested dictionaries into separate model classes.
4. Use `Optional[...]` for nullable fields.
5. Use `List[...]` or `list[...]` for arrays.
6. Follow the examples folder style when generating models.
