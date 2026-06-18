# ruff: noqa
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

from google.adk.agents import Agent, LlmAgent
from google.adk.apps import App
from google.adk.workflow import Workflow, START
from google.adk.events.event import Event, EventActions
from google.adk.agents.context import Context
from google.genai import types
from pydantic import BaseModel
from typing import Any


# Models for structured I/O
class ClassificationResult(BaseModel):
    is_shipping_related: bool


class ShippingAnswer(BaseModel):
    answer: str


# Helper to safely extract text from inputs (types.Content or str)
def get_text(content: Any) -> str:
    if hasattr(content, "parts") and content.parts:
        return "".join(part.text for part in content.parts if part.text)
    if isinstance(content, str):
        return content
    return str(content)


# Node 1: Extract and save the user's original query
def initialize_workflow(ctx: Context, node_input: Any) -> Event:
    user_query = get_text(node_input)
    return Event(
        output=user_query,
        actions=EventActions(state_delta={"original_query": user_query}),
    )


# Node 2: Classify the query using LLM
classifier = LlmAgent(
    name="classifier",
    model="gemini-2.5-flash",
    instruction=(
        "Classify if the user query is related to shipping (such as rates, tracking, delivery, returns, etc.) "
        "or unrelated. Set is_shipping_related to True if it is related, and False otherwise."
    ),
    output_schema=ClassificationResult,
)


# Node 3: Router function based on classification
def route_query(ctx: Context, node_input: dict) -> Event:
    is_related = node_input.get("is_shipping_related", False)
    original_query = ctx.state.get("original_query", "")
    if is_related:
        return Event(output=original_query, actions=EventActions(route="shipping"))
    return Event(output=original_query, actions=EventActions(route="unrelated"))


# Node 4: Shipping FAQ LLM Agent
shipping_faq_agent = LlmAgent(
    name="shipping_faq_agent",
    model="gemini-2.5-flash",
    instruction=(
        "You are a shipping company customer support representative. Answer the customer's shipping "
        "question (rates, tracking, delivery, returns) politely, accurately, and helpful. Focus only "
        "on shipping FAQ information. Your answers must:\n"
        "- Start with a short, direct answer.\n"
        "- Use 2-3 bullet points when helpful.\n"
        "- Avoid long paragraphs.\n"
        "- Stay focused on shipping support questions."
    ),
    output_schema=ShippingAnswer,
)


# Node 5: Decline Node for unrelated queries
def decline_node(node_input: str):
    message = (
        "I'm sorry, but I can only assist with shipping-related inquiries such as rates, tracking, "
        "delivery, or returns. How can I help you with your shipping needs today?"
    )
    yield Event(
        content=types.Content(role="model", parts=[types.Part.from_text(text=message)]),
        output=message,
    )


# Node 6: Format Shipping Answer
def format_shipping_answer(node_input: dict):
    answer = node_input.get("answer", "")
    yield Event(
        content=types.Content(role="model", parts=[types.Part.from_text(text=answer)]),
        output=answer,
    )


# Construct Workflow
root_agent = Workflow(
    name="customer_support_workflow",
    description="Customer support representative workflow for a shipping company.",
    edges=[
        (START, initialize_workflow, classifier, route_query),
        (
            route_query,
            {
                "shipping": shipping_faq_agent,
                "__DEFAULT__": decline_node,
            },
        ),
        (shipping_faq_agent, format_shipping_answer),
    ],
)

app = App(
    root_agent=root_agent,
    name="app",
)
