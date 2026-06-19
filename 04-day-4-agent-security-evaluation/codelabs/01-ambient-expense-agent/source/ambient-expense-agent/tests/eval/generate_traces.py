# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Trace generator for offline evaluation of the expense approval agent."""

import os
import json
from typing import Any
from unittest.mock import patch

from google.adk import Event
from google.adk.agents.run_config import RunConfig, StreamingMode
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.agents.llm_agent import LlmAgent
from google.genai import types

from expense_agent.agent import root_agent

# Mock LLM run to return mock risk assessment without hitting Vertex AI billing limits
async def mock_review_run(ctx: Any) -> Any:
    ctx.session.state["risk_assessment"] = {
        "risk_level": "low",
        "risk_factors": "none",
        "recommendation": "approve",
    }
    yield Event(
        content=types.Content(
            role="model",
            parts=[types.Part.from_text(text='{"risk_level": "low", "risk_factors": "none", "recommendation": "approve"}')],
        )
    )

def is_request_input(event: Any) -> bool:
    if type(event).__name__ == "RequestInput":
        return True
    if hasattr(event, "content") and event.content:
        for part in getattr(event.content, "parts", []):
            if hasattr(part, "function_call") and part.function_call:
                if getattr(part.function_call, "name", None) == "adk_request_input":
                    return True
    return False

def serialize_event(event: Any) -> dict:
    d = {}
    if hasattr(event, "content") and event.content:
        d["content"] = {
            "role": event.content.role or "model",
            "parts": [{"text": p.text} for p in event.content.parts if p.text]
        }
    if hasattr(event, "output") and event.output is not None:
        d["output"] = event.output
    if hasattr(event, "route") and event.route:
        d["route"] = event.route
    if hasattr(event, "message") and event.message:
        d["message"] = event.message
    if hasattr(event, "payload") and event.payload:
        d["payload"] = event.payload
    
    if is_request_input(event):
        d["type"] = "RequestInput"
        # Extract from function_call args if present
        if hasattr(event, "content") and event.content:
            for part in getattr(event.content, "parts", []):
                if hasattr(part, "function_call") and part.function_call:
                    fc = part.function_call
                    if getattr(fc, "name", None) == "adk_request_input":
                        args = getattr(fc, "args", {}) or {}
                        d["message"] = args.get("message", d.get("message", ""))
                        d["payload"] = args.get("payload", d.get("payload", {}))
                        
    return d

def make_serializable(obj: Any) -> Any:
    if isinstance(obj, dict):
        return {k: make_serializable(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [make_serializable(x) for x in obj]
    elif isinstance(obj, (str, int, float, bool, type(None))):
        return obj
    elif hasattr(obj, "model_dump"):
        return make_serializable(obj.model_dump())
    elif hasattr(obj, "model_dump_json"):
        try:
            return json.loads(obj.model_dump_json())
        except Exception:
            pass
    
    # Check by class name to handle various ADK / GenAI SDK models
    class_name = type(obj).__name__
    if class_name == "Content":
        return {
            "role": getattr(obj, "role", None),
            "parts": [make_serializable(p) for p in getattr(obj, "parts", [])]
        }
    if class_name == "Part":
        d = {}
        if getattr(obj, "text", None) is not None:
            d["text"] = obj.text
        if getattr(obj, "function_call", None) is not None:
            d["function_call"] = make_serializable(obj.function_call)
        if getattr(obj, "function_response", None) is not None:
            d["function_response"] = make_serializable(obj.function_response)
        return d
    if class_name == "FunctionCall":
        return {
            "name": getattr(obj, "name", None),
            "args": make_serializable(getattr(obj, "args", {})),
            "id": getattr(obj, "id", None)
        }
    if class_name == "FunctionResponse":
        return {
            "name": getattr(obj, "name", None),
            "response": make_serializable(getattr(obj, "response", {})),
            "id": getattr(obj, "id", None)
        }
    
    return str(obj)


def main():
    dataset_path = os.path.join("tests", "eval", "datasets", "basic-dataset.json")
    with open(dataset_path, "r", encoding="utf-8") as f:
        dataset = json.load(f)

    os.makedirs(os.path.join("artifacts", "traces"), exist_ok=True)
    traces_path = os.path.join("artifacts", "traces", "generated_traces.jsonl")

    print(f"Loading dataset from: {dataset_path}")
    print(f"Generating traces to: {traces_path}")

    # Open output file
    with open(traces_path, "w", encoding="utf-8") as out_f, patch.object(
        LlmAgent, "_run_async_impl", side_effect=mock_review_run
    ):
        for case in dataset["eval_cases"]:
            case_id = case["eval_case_id"]
            prompt_text = case["prompt"]["parts"][0]["text"]
            print(f"\n--- Running Case: {case_id} ---")

            session_service = InMemorySessionService()
            session = session_service.create_session_sync(
                user_id="eval_user", app_name="expense_agent"
            )
            runner = Runner(
                agent=root_agent, session_service=session_service, app_name="expense_agent"
            )

            # Start run
            message = types.Content(
                role="user",
                parts=[types.Part.from_text(text=prompt_text)]
            )
            events = list(
                runner.run(
                    new_message=message,
                    user_id="eval_user",
                    session_id=session.id,
                    run_config=RunConfig(streaming_mode=StreamingMode.SSE),
                )
            )

            serialized_events = [serialize_event(e) for e in events]
            paused = any(e.get("type") == "RequestInput" for e in serialized_events)

            # Resume if paused (HITL)
            if paused:
                # Find the request input event and its interrupt_id
                interrupt_id = None
                for e in events:
                    if hasattr(e, "content") and e.content:
                        for part in getattr(e.content, "parts", []):
                            if hasattr(part, "function_call") and part.function_call:
                                fc = part.function_call
                                if getattr(fc, "name", None) == "adk_request_input":
                                    interrupt_id = getattr(fc, "id", None)
                                    if not interrupt_id and getattr(fc, "args", None):
                                        interrupt_id = fc.args.get("interruptId")
                
                decision = "reject" if "prompt_injection" in case_id else "approve"
                print(f"Workflow paused for Human-in-the-loop (Interrupt ID: {interrupt_id}). Resuming with decision: {decision}")
                
                # Build function response part to resume correctly
                resume_part = types.Part(
                    function_response=types.FunctionResponse(
                        name="adk_request_input",
                        id=interrupt_id or "default_id",
                        response={"decision": decision}
                    )
                )
                resume_msg = types.Content(
                    role="user",
                    parts=[resume_part]
                )
                resume_events = list(
                    runner.run(
                        new_message=resume_msg,
                        user_id="eval_user",
                        session_id=session.id,
                        run_config=RunConfig(streaming_mode=StreamingMode.SSE),
                    )
                )
                serialized_events.extend([serialize_event(e) for e in resume_events])

            # Get final state
            updated_session = session_service.get_session_sync(
                session_id=session.id, user_id="eval_user", app_name="expense_agent"
            )
            final_state = updated_session.state

            # Determine final output (find the last output event)
            final_output = None
            for e in reversed(serialized_events):
                if "output" in e and e["output"]:
                    if isinstance(e["output"], dict) and "status" in e["output"]:
                        final_output = e["output"]
                        break

            trace_record = {
                "eval_case_id": case_id,
                "prompt": prompt_text,
                "events": serialized_events,
                "state": final_state,
                "output": final_output
            }

            serializable_record = make_serializable(trace_record)
            out_f.write(json.dumps(serializable_record) + "\n")
            print(f"Case {case_id} finished. Output: {final_output}")

    print("\nTrace generation complete!")

if __name__ == "__main__":
    main()
