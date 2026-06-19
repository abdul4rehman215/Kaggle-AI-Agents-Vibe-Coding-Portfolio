.PHONY: install lint test playground generate-traces grade eval

install:
	agents-cli install

lint:
	agents-cli lint

test:
	uv run pytest

playground:
	uv run uvicorn expense_agent.fast_api_app:app --host 127.0.0.1 --port 8080 --reload

generate-traces:
	uv run python tests/eval/generate_traces.py

grade:
	uv run python tests/eval/grade_traces.py

eval: generate-traces grade
