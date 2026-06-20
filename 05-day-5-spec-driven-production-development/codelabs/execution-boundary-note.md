# ⚠️ Execution Boundary Note

This note keeps the Day 5 folder honest about what was reviewed and what was actually executed.

---

## What was reviewed

I reviewed both optional Day 5 codelabs end to end:

1. Deploying the ADK Ambient Expense Agent to Agent Runtime using `agents-cli`.
2. Building a Cloud Run manager dashboard and Pub/Sub event pipeline around the deployed agent.

The review covered the prompts, commands, expected artifacts, cloud services, test cases, observability path, and cleanup steps.

---

## What was not executed

No live cloud resources were created for this review pass.

That means this folder does not include:

- deployed Agent Runtime IDs,
- Cloud Run service URLs,
- Pub/Sub topic outputs,
- Cloud Trace screenshots,
- Cloud Logging screenshots,
- BigQuery analytics output,
- Agent Registry screenshots,
- or terminal logs from actual deployments.

---

## Why I kept this as a review track

The codelabs require a cloud environment capable of provisioning managed Google Cloud resources. For this pass, I focused on understanding and documenting the architecture rather than producing partial or misleading execution evidence.

This keeps the documentation accurate:

```text
Reviewed architecture: yes.
Provisioned cloud resources: no.
Fake evidence: never.
```

---

## What would be needed to run it later

A real hands-on run would need:

- a prepared Google Cloud project,
- authenticated `gcloud`,
- enabled platform APIs,
- `uv`,
- Google Antigravity,
- `agents-cli` and ADK skills,
- a region selection,
- permission to deploy Agent Runtime and Cloud Run resources,
- time to test the approval and rejection flows,
- and a cleanup checklist before closing the session.

---

## What I intentionally avoided documenting

I avoided adding placeholder output that could be mistaken for real execution:

- no fake command results,
- no invented project IDs,
- no made-up endpoints,
- no copied console screenshots,
- no simulated Cloud Trace data,
- and no deployment success claims.

The codelab notes are therefore architecture-review notes, not a replacement for an actual deployment log.
