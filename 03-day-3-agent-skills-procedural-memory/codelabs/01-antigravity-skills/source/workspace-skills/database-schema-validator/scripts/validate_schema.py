import re
import sys
from pathlib import Path


def is_snake_case(name: str) -> bool:
    return bool(re.fullmatch(r"[a-z][a-z0-9_]*", name))


def main(path: str) -> int:
    sql = Path(path).read_text(encoding="utf-8")
    errors = []
    if re.search(r"\bDROP\s+TABLE\b", sql, re.IGNORECASE):
        errors.append("ERROR: 'DROP TABLE' statements are forbidden.")

    for match in re.finditer(r"CREATE\s+TABLE\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*?)\);", sql, re.IGNORECASE | re.DOTALL):
        table_name, body = match.group(1), match.group(2)
        if not is_snake_case(table_name):
            errors.append(f"ERROR: Table '{table_name}' must be snake_case.")
        if not re.search(r"\bid\b.*\bPRIMARY\s+KEY\b", body, re.IGNORECASE):
            errors.append(f"ERROR: Table '{table_name}' is missing a primary key named 'id'.")

    for error in errors:
        print(error)
    return 1 if errors else 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python validate_schema.py <schema.sql>")
        raise SystemExit(2)
    raise SystemExit(main(sys.argv[1]))
