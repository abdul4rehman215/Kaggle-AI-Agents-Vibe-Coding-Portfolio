import json
import sys


def main():
    try:
        # Read from stdin and strip any potential UTF-8 BOM
        raw_data = sys.stdin.read().lstrip("\ufeff")
        data = json.loads(raw_data)
    except Exception as e:
        print(f"BLOCKED: Malformed JSON or read error: {e}", file=sys.stderr)
        sys.exit(1)

    # Extract command
    cmd = None

    # Check tool_args dictionary
    tool_args = data.get("tool_args", {})
    if isinstance(tool_args, dict):
        cmd = (
            tool_args.get("CommandLine")
            or tool_args.get("command")
            or tool_args.get("cmd")
        )

    # Check top-level command field
    if not cmd:
        cmd = data.get("command")

    if not cmd:
        print(
            "BLOCKED: Could not extract command line from tool arguments.",
            file=sys.stderr,
        )
        sys.exit(1)

    # Normalize command for checks
    cmd_lower = cmd.lower().strip()

    # Define destructive blacklist
    blocked_commands = [
        "rm -rf /",
        "rm -rf /*",
        "del /s /q c:\\",
        "format",
        "mkfs",
        "shutdown",
        "remove-item -recurse -force c:\\",
    ]

    is_blocked = False
    matched_pattern = None

    for pattern in blocked_commands:
        if pattern in ("format", "shutdown", "mkfs"):
            # Standalone word match or prefix match to prevent false positives on words like "formatting"
            words = (
                cmd_lower.replace(";", " ").replace("&", " ").replace("|", " ").split()
            )
            if pattern in words or any(w.startswith(pattern) for w in words):
                is_blocked = True
                matched_pattern = pattern
                break
        else:
            if pattern in cmd_lower:
                is_blocked = True
                matched_pattern = pattern
                break

    if is_blocked:
        print(
            f"BLOCKED: Destructive command detected containing '{matched_pattern}'.",
            file=sys.stderr,
        )
        sys.exit(1)

    print("APPROVED: Command validation passed.")
    sys.exit(0)


if __name__ == "__main__":
    main()
