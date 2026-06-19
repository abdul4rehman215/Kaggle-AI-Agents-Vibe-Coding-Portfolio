# 🛡️ Day 4 Reflection - Security Engineering Made the Agent Work Feel Real

Day 4 was the most security-aligned part of the course for me.

The earlier days showed that agents can build, use tools, and carry procedures. Day 4 asked the question I care about more as someone with a security background:

> What keeps that capability from becoming uncontrolled risk?

---

## What felt different

This unit moved past the excitement of “the agent can do it.”

The better question became:

```text
Can the agent do it inside boundaries I can inspect, test, and defend?
```

That framing made the codelabs feel stronger. The expense agent was not only about approving expenses; it was about where to place deterministic routing, where to screen hostile text, where to redact data, and how to evaluate the result.

The shopping assistant was not only about redeeming discounts; it was about building a local security lifecycle around agentic coding.

---

## Security controls became workflow design

I liked that the codelabs did not treat security as an afterthought.

Security showed up as:

- graph topology,
- pre-LLM screening,
- redaction logic,
- human-review routing,
- trace-based evaluation,
- local Semgrep rules,
- pre-commit hooks,
- Antigravity command hooks,
- STRIDE threat modeling,
- and tests that protect behavior.

That is the kind of engineering discipline agents need if they are going to work beyond demos.

---

## My main takeaway

The model is powerful, but the system around the model decides whether that power is safe.

A strong agent project needs:

```text
clear policy boundaries,
least-privilege tools,
observable execution,
security gates,
repeatable tests,
human review where risk is high,
and evidence that the right path actually ran.
```

Day 4 made agent security feel less abstract. It became something I could build, test, break intentionally, and fix.
