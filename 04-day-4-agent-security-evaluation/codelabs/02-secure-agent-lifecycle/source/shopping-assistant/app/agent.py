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

import os
import google.auth
from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.models import Gemini
from google.adk.tools import ToolContext
from google.genai import types

try:
    _, project_id = google.auth.default()
    os.environ["GOOGLE_CLOUD_PROJECT"] = project_id
except Exception:
    pass

os.environ["GOOGLE_CLOUD_LOCATION"] = "global"
# Local developer authentication should use GEMINI_API_KEY from environment, not source code.
os.environ.setdefault("GOOGLE_GENAI_USE_VERTEXAI", "False")


# In-memory stores for discount redemption
DISCOUNT_CODES = {"WELCOME50": 50, "SUMMER20": 20}
REDEEMED_CODES = set()
REGISTERED_USERS = {"user123", "user_abc", "alice", "bob", "customer_01"}


def redeem_discount(
    discount_code: str, user_id: str, tool_context: ToolContext
) -> dict:
    """Redeems a discount code for the user.

    Args:
        discount_code: The code of the discount to redeem (e.g., WELCOME50, SUMMER20).
        user_id: The ID of the user requesting the discount redemption.

    Returns:
        A dict with the status of the redemption, discount details, or error message.
    """
    # Normalize inputs
    discount_code = discount_code.strip().upper()
    user_id = user_id.strip()

    # Reject guest or missing user IDs
    if not user_id or user_id.lower() in ("guest", "", "none"):
        return {
            "status": "error",
            "message": "Redemption failed: Guest or missing user IDs are not allowed to redeem discounts.",
        }

    # Reject unregistered user IDs
    if user_id not in REGISTERED_USERS:
        return {
            "status": "error",
            "message": f"Redemption failed: User ID '{user_id}' is not a registered user.",
        }

    # Reject unknown discount codes
    if discount_code not in DISCOUNT_CODES:
        return {
            "status": "error",
            "message": f"Redemption failed: Unknown discount code '{discount_code}'.",
        }

    # Reject already redeemed codes
    if discount_code in REDEEMED_CODES:
        return {
            "status": "error",
            "message": f"Redemption failed: Discount code '{discount_code}' has already been redeemed.",
        }

    # Mark as redeemed and return success
    REDEEMED_CODES.add(discount_code)
    discount_value = DISCOUNT_CODES[discount_code]
    return {
        "status": "success",
        "message": f"Successfully redeemed discount code '{discount_code}' for user '{user_id}'.",
        "discount_value": discount_value,
        "user_id": user_id,
    }


root_agent = Agent(
    name="shopping_assistant_agent",
    model=Gemini(
        model="gemini-2.5-flash",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=(
        "You are a premium AI shopping assistant for our retail store. "
        "Your goal is to help customers find products, answer shopping queries, "
        "and assist them in redeeming discount codes. "
        "When a user wants to redeem a discount code, you must ask for their user ID and "
        "the discount code, then call the redeem_discount tool and present the outcome."
    ),
    tools=[redeem_discount],
)

app = App(
    root_agent=root_agent,
    name="app",
)
