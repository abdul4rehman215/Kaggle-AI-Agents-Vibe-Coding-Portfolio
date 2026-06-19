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

"""Configuration settings for the ambient expense approval agent."""

import os

# --- Authentication & GCP Environment Configuration ---
if os.getenv("GOOGLE_API_KEY"):
    os.environ.setdefault("GOOGLE_GENAI_USE_VERTEXAI", "False")
else:
    import google.auth

    try:
        _, project_id = google.auth.default()
        os.environ.setdefault("GOOGLE_CLOUD_PROJECT", project_id or "")
        os.environ.setdefault("GOOGLE_CLOUD_LOCATION", "global")
        os.environ.setdefault("GOOGLE_GENAI_USE_VERTEXAI", "True")
    except Exception:
        # Fallback for environments where default credentials aren't configured yet
        pass

# --- Expense Approval Parameters ---
APPROVAL_THRESHOLD = 100.0

# --- Model Selection ---
# Note: "gemini-3.1-flash-lite" is a futuristic/unreleased model not currently
# supported by the installed google-genai (2.8.0) and Vertex AI platforms.
# We fall back to the closest available Gemini Flash model: "gemini-2.5-flash".
MODEL_NAME = "gemini-2.5-flash"
