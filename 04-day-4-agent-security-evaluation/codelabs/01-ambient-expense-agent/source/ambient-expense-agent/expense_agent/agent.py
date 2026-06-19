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

"""Expense approval workflow agent using ADK 2.0 Graph Workflow API."""

import base64
import json
import re
from typing import Any

from google.adk import Agent, Context, Event, Workflow
from google.adk.apps import App
from google.adk.events import RequestInput
from google.adk.models import Gemini
from google.genai import types
from pydantic import BaseModel, Field

from .config import APPROVAL_THRESHOLD, MODEL_NAME

# ---------------------------------------------------------------------------
# Pydantic schemas for structured data flow
# ---------------------------------------------------------------------------


class ExpenseData(BaseModel):
    """Expense report data extracted from the incoming event."""

    amount: float = Field(description="Expense amount in USD")
    submitter: str = Field(description="Email of the person who submitted")
    category: str = Field(description="Expense category, e.g. travel, meals")
    description: str = Field(description="What the expense is for")
    date: str = Field(description="Date of the expense (YYYY-MM-DD)")


class RiskAssessment(BaseModel):
    """Structured LLM risk review assessment schema."""

    risk_level: str = Field(description="Risk level: low, medium, or high")
    risk_factors: str = Field(description="What policy flags or risks were found")
    recommendation: str = Field(description="approve, reject, or request-more-info")


# ---------------------------------------------------------------------------
# Security Helpers: PII Redaction & Prompt-Injection Detection
# ---------------------------------------------------------------------------


def redact_pii(text: str) -> tuple[str, list[str]]:
    """Detects and redacts US-style SSNs and credit card-like numbers.

    Returns sanitized text and list of redaction categories.
    """
    redactions = []

    # Redact US-style SSNs: e.g., 123-45-6789
    ssn_pattern = re.compile(r"\b\d{3}-\d{2}-\d{4}\b")
    if ssn_pattern.search(text):
        text = ssn_pattern.sub("[REDACTED_SSN]", text)
        redactions.append("ssn")

    # Redact Credit Cards: 13 to 19 digits, possibly with single spaces or hyphens
    card_regex = re.compile(r"\b(?:\d[ -]?){13,19}\b")

    def cc_replacer(match: re.Match) -> str:
        val = match.group(0)
        digits = re.sub(r"[^0-9]", "", val)
        if 13 <= len(digits) <= 19:
            redactions.append("credit_card")
            return "[REDACTED_CARD]"
        return val

    text = card_regex.sub(cc_replacer, text)

    # Deduplicate and sort redactions list
    redactions = sorted(set(redactions))
    return text, redactions


def detect_prompt_injection(text: str) -> bool:
    """Detects obvious malicious instruction patterns in the description."""
    phrases = [
        "ignore previous instructions",
        "bypass rules",
        "auto approve",
        "approve this expense",
        "override policy",
        "system prompt",
        "developer message",
        "do not tell the user",
    ]
    text_lower = text.lower()
    for phrase in phrases:
        if phrase in text_lower:
            return True
    return False


# ---------------------------------------------------------------------------
# Graph Nodes: Python Functions
# ---------------------------------------------------------------------------


def parse_expense_email(node_input: Any) -> Event:
    """Node: Parses the incoming expense event payload.

    Supports:
    1. Base64-encoded JSON payload under a Pub/Sub 'message.data' key.
    2. Plain JSON under a 'data' key.
    3. Unstructured string inputs.
    """
    raw_str = ""
    if isinstance(node_input, types.Content):
        if node_input.parts:
            raw_str = "".join(part.text for part in node_input.parts if part.text)
    elif isinstance(node_input, str):
        raw_str = node_input
    elif isinstance(node_input, dict):
        data = node_input
        if "data" in data:
            sub_data = data["data"]
            if isinstance(sub_data, str):
                try:
                    sub_data = json.loads(base64.b64decode(sub_data).decode("utf-8"))
                except Exception:
                    pass
            if isinstance(sub_data, dict):
                data = sub_data
        elif (
            "message" in data
            and isinstance(data["message"], dict)
            and "data" in data["message"]
        ):
            sub_data = data["message"]["data"]
            if isinstance(sub_data, str):
                try:
                    sub_data = json.loads(base64.b64decode(sub_data).decode("utf-8"))
                except Exception:
                    pass
            if isinstance(sub_data, dict):
                data = sub_data

        return Event(
            output={
                "amount": float(data.get("amount", 0)),
                "submitter": data.get("submitter", "unknown"),
                "category": data.get("category", "other"),
                "description": data.get("description", ""),
                "date": data.get("date", ""),
            }
        )

    try:
        event = json.loads(raw_str)
    except Exception:
        return Event(output={"error": f"Invalid JSON input: {raw_str[:200]}"})

    message = event.get("message")
    if isinstance(message, dict) and "data" in message:
        data_str = message.get("data", "")
        try:
            data = json.loads(base64.b64decode(data_str).decode("utf-8"))
        except Exception:
            return Event(
                output={
                    "error": f"Failed to decode base64 Pub/Sub data: {data_str[:200]}"
                }
            )
    elif "data" in event:
        data = event["data"]
        if isinstance(data, str):
            try:
                data = json.loads(base64.b64decode(data).decode("utf-8"))
            except Exception:
                pass
    else:
        data = event

    return Event(
        output={
            "amount": float(data.get("amount", 0)),
            "submitter": data.get("submitter", "unknown"),
            "category": data.get("category", "other"),
            "description": data.get("description", ""),
            "date": data.get("date", ""),
        }
    )


def route_by_amount(node_input: dict, ctx: Context) -> Event:
    """Node: Routes the workflow depending on the APPROVAL_THRESHOLD limit.

    Saves the parsed expense data in workflow state so downstream nodes can
    access it. Routes to:
    - AUTO_APPROVE: if amount < APPROVAL_THRESHOLD and no parsing errors.
    - NEEDS_REVIEW: if amount >= APPROVAL_THRESHOLD or parsing errors are present.
    """
    ctx.state["expense_data"] = node_input
    if "error" in node_input:
        return Event(route="NEEDS_REVIEW", output=node_input)

    # Store at root level of ctx.state to support LLM instruction variables
    for k, v in node_input.items():
        ctx.state[k] = v

    amount = node_input.get("amount", 0.0)
    if amount >= APPROVAL_THRESHOLD:
        return Event(route="NEEDS_REVIEW", output=node_input)
    return Event(route="AUTO_APPROVE", output=node_input)


def auto_approve(node_input: dict) -> Any:
    """Node: Auto-approves expenses under the threshold without LLM calls.

    Generates a structured log and sets status to approved.
    """
    if "error" in node_input:
        msg = f"Expense processing error: {node_input['error']}"
        yield Event(
            content=types.Content(role="model", parts=[types.Part.from_text(text=msg)])
        )
        yield Event(output={"status": "error", "message": msg})
        return

    msg = f"Expense auto-approved: ${node_input['amount']:.2f} from {node_input['submitter']}."
    log_entry = {
        "severity": "INFO",
        "message": msg,
        "decision": "approved",
        "amount": node_input["amount"],
        "submitter": node_input["submitter"],
        "category": node_input["category"],
    }
    print(json.dumps(log_entry), flush=True)
    yield Event(
        content=types.Content(role="model", parts=[types.Part.from_text(text=msg)])
    )
    yield Event(output={"status": "approved", **node_input})


def security_screen(node_input: dict, ctx: Context) -> Event:
    """Node: Inspects the expense details for PII and prompt injection.

    If a parsing error was passed from route_by_amount, it bypasses the LLM
    entirely. If prompt injection is detected, it flags a security event and
    bypasses the LLM. Otherwise, it redacts PII and routes to the LLM agent.
    """
    if "error" in node_input:
        # Route unparsed/invalid cases to human review directly
        ctx.state["expense_data"] = node_input
        return Event(route="BYPASS_LLM", output=node_input)

    desc = node_input.get("description", "")
    sanitized_desc, redactions = redact_pii(desc)

    sanitized_expense = {**node_input, "description": sanitized_desc}

    ctx.state["expense_data"] = sanitized_expense
    if redactions:
        ctx.state["redactions"] = redactions

    # Store at root level of ctx.state to support LLM instruction variables
    for k, v in sanitized_expense.items():
        ctx.state[k] = v

    if detect_prompt_injection(desc):
        ctx.state["security_event"] = True
        ctx.state["prompt_injection_detected"] = True
        ctx.state["llm_bypassed"] = True

        # Add flags to output payload
        sanitized_expense["security_event"] = True
        sanitized_expense["prompt_injection_detected"] = True
        sanitized_expense["llm_bypassed"] = True

        # Update root state flags too
        ctx.state["security_event"] = True
        ctx.state["prompt_injection_detected"] = True
        ctx.state["llm_bypassed"] = True

        return Event(route="BYPASS_LLM", output=sanitized_expense)

    return Event(route="CLEAN", output=sanitized_expense)


# ---------------------------------------------------------------------------
# Graph Node: LLM Risk Review Agent
# ---------------------------------------------------------------------------


def emit_expense_alert(
    submitter: str,
    amount: float,
    category: str,
    risk_summary: str,
) -> dict:
    """Emit a structured log alerting finance to review a high-value expense.

    Args:
        submitter: Who submitted the expense.
        amount: The expense expense in USD.
        category: The expense category.
        risk_summary: Why this expense needs review.

    Returns:
        Confirmation that the alert was emitted.
    """
    log_entry = {
        "severity": "WARNING",
        "message": (
            f"Expense review alert: ${amount:.2f} from {submitter} - {risk_summary}"
        ),
        "alert_type": "expense_review",
        "submitter": submitter,
        "amount": amount,
        "category": category,
        "risk_summary": risk_summary,
    }
    print(json.dumps(log_entry), flush=True)
    return {"status": "alert_emitted", "submitter": submitter, "amount": amount}


review_agent = Agent(
    name="review_agent",
    model=Gemini(
        model=MODEL_NAME,
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=(
        "You are an expense review agent. Evaluate the risk of the following expense:\n"
        "Amount={amount}, Submitter={submitter}, Category={category}, Description={description}, Date={date}.\n"
        "Check for policy violations, suspiciously high amounts, or vague description, and output the structured risk review."
    ),
    input_schema=ExpenseData,
    output_schema=RiskAssessment,
    output_key="risk_assessment",
    tools=[emit_expense_alert],
)


# ---------------------------------------------------------------------------
# Graph Nodes: Human-in-the-Loop Approval Pause
# ---------------------------------------------------------------------------


def request_approval(node_input: Any, ctx: Context) -> Any:
    """Node: Pauses the workflow graph using RequestInput to ask for approval.

    Yields a RequestInput event which halts execution until resumed with feedback.
    If parsing errors or prompt injection occurred, manager is warned.
    """
    expense = ctx.state.get("expense_data", {})
    if "error" in expense:
        msg = f"[WARNING: PARSING ERROR] Could not parse expense: {expense['error']}. Human intervention required. Approve or reject."
    elif ctx.state.get("prompt_injection_detected"):
        msg = "[WARNING: PROMPT INJECTION ATTEMPT DETECTED] This expense bypassed automated review. Approve or reject."
    else:
        msg = "Expense requires manager approval. Approve or reject."

    yield RequestInput(
        message=msg,
        payload=expense,
    )


def process_decision(node_input: Any, ctx: Context) -> Any:
    """Node: Processes the manager's decision and logs the final outcome.

    Normalizes input from raw string or dictionary to record final approval.
    """
    decision = "unknown"
    if isinstance(node_input, dict):
        decision = node_input.get("decision", "unknown")
    elif isinstance(node_input, str):
        decision = "approve" if "approve" in node_input.lower() else "reject"

    approved = decision == "approve"
    expense = ctx.state.get("expense_data", {})
    status = "approved" if approved else "rejected"

    is_sec_event = ctx.state.get("prompt_injection_detected", False)
    has_error = "error" in expense

    log_entry = {
        "severity": (
            "INFO" if (approved and not is_sec_event and not has_error) else "WARNING"
        ),
        "message": (
            f"Expense {status} by manager"
            + (" [SECURITY FLAG SET]" if is_sec_event else "")
        ),
        "decision": status,
        "security_event": is_sec_event,
        "prompt_injection_detected": is_sec_event,
        "llm_bypassed": ctx.state.get("llm_bypassed", False),
    }
    if has_error:
        log_entry["error"] = expense["error"]
    print(json.dumps(log_entry), flush=True)

    if has_error:
        parts = [
            f"Expense (unparsed) has been {status} by manager. Error was: {expense['error']}."
        ]
        parts_str = " ".join(parts)
        yield Event(
            content=types.Content(
                role="model", parts=[types.Part.from_text(text=parts_str)]
            )
        )
        yield Event(
            output={"status": status, "message": parts_str, "error": expense["error"]}
        )
        return

    submitter = expense.get("submitter", "unknown")
    amount = expense.get("amount", 0.0)
    category = expense.get("category", "")
    description = expense.get("description", "")
    date = expense.get("date", "")

    parts = [f"${amount:.2f} expense from {submitter} has been {status}."]
    if description:
        parts.append(f'"{description}" ({category}) on {date}.')

    if is_sec_event:
        parts.append("[SECURITY WARNING: Prompt injection attempt was blocked.]")

    if approved:
        parts.append(
            "The expense has been logged and will be processed for reimbursement."
        )
    else:
        parts.append(
            "The submitter will be notified and may resubmit with additional documentation."
        )

    parts_str = " ".join(parts)
    yield Event(
        content=types.Content(
            role="model", parts=[types.Part.from_text(text=parts_str)]
        )
    )
    yield Event(
        output={
            "status": status,
            "message": parts_str,
            "security_event": is_sec_event,
            "prompt_injection_detected": is_sec_event,
            "llm_bypassed": ctx.state.get("llm_bypassed", False),
        }
    )


# ---------------------------------------------------------------------------
# Graph Topology Setup: root_agent
# ---------------------------------------------------------------------------

root_agent = Workflow(
    name="root_agent",
    edges=[
        # 1. Parse incoming email
        ("START", parse_expense_email),
        # 2. Route based on the expense amount threshold or parsing status
        (parse_expense_email, route_by_amount),
        # 3. Auto-approve under-$100 directly; route others to security screening
        (
            route_by_amount,
            {
                "AUTO_APPROVE": auto_approve,
                "NEEDS_REVIEW": security_screen,
            },
        ),
        # 4. Security screen routes bypass directly or clean path through review agent
        (
            security_screen,
            {
                "BYPASS_LLM": request_approval,
                "CLEAN": review_agent,
            },
        ),
        # 5. Connect review agent to request approval node
        (review_agent, request_approval),
        # 6. Resume from human input and execute decision logging node
        (request_approval, process_decision),
    ],
)

app = App(
    root_agent=root_agent,
    name="expense_agent",
)
