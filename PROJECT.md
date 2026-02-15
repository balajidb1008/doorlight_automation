# Playwright Test Automation Framework

## Overview

Enterprise-grade, AI-governed test automation framework built on Playwright. Designed for deterministic, traceable, and maintainable test generation.

## Lifecycle

```
Spec → Plan → Test → Report
```

1. **Browse & Capture** — Navigate the app, capture DOM maps
2. **Feature Spec** — Define the feature (scope, UI, flows, assertions)
3. **Test Plan** — Define test strategy (cases, assertions, data)
4. **Generate Code** — POM + test files from approved spec + plan
5. **Pause** — Human review before execution
6. **Run & Heal** — User-triggered execution and one-by-one healing
7. **Report** — Results traced back through the full chain

## Quick Start

1. Read `AGENT.md` — governance rules for all agents
2. Read `docs/folder-structure.md` — target project structure
3. Read `memory/index.md` — current project state and history
4. Use templates from `templates/` when creating specs, plans, and tests

## Key Files

| File | Purpose |
|------|---------|
| `AGENT.md` | AI governance rules |
| `docs/folder-structure.md` | Target project structure |
| `docs/naming-conventions.md` | Naming rules |
| `docs/traceability.md` | Spec→Plan→Test→Report mapping |
| `docs/scaling-guide.md` | Governance & scaling |
| `memory/index.md` | Project memory registry |

## Templates

| Template | Use For |
|----------|---------|
| `templates/feature.spec.template.md` | Creating feature specs |
| `templates/test.plan.template.md` | Creating test plans |
| `templates/test.template.md` | Test file code layout |
| `templates/dom-map.template.json` | DOM map capture format |
| `templates/decision.template.md` | Logging decisions |
| `templates/feature-summary.template.md` | Feature summaries |
| `templates/session.template.md` | Session work logs |

## Agent Workflows

| Workflow | Trigger |
|----------|---------|
| `.agent/workflows/create-spec.md` | "Create spec for `<feature>`" |
| `.agent/workflows/create-plan.md` | "Create plan for `<feature>`" |
| `.agent/workflows/generate-tests.md` | "Generate tests for `<feature>`" |
| `.agent/workflows/run-tests.md` | "Run tests" |
| `.agent/workflows/heal-tests.md` | "Run and fix" / "Heal tests" |
