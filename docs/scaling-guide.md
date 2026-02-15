# Scaling & Governance Guide

> Best practices for maintaining this framework as the team, features, and test count grow.

---

## Governance Principles

### 1. Single Source of Truth

| Concern | Source |
|---------|--------|
| AI behavior | `AGENT.md` |
| Folder layout | `docs/folder-structure.md` |
| Naming rules | `docs/naming-conventions.md` |
| Feature state | `memory/index.md` |
| Traceability | `docs/traceability.md` |

### 2. No Uncontrolled Changes

- **All framework-level changes** (folder structure, naming, governance) require a decision log in `memory/decisions/`
- **No agent modifies governance files** without explicit user approval
- **Templates are immutable** unless a decision log justifies the change

### 3. One Feature at a Time

- Never generate specs, plans, or tests for multiple features simultaneously
- Complete the full lifecycle (Spec → Plan → Test → Report) before starting the next feature

---

## Scaling Strategies

### Adding a New Feature

1. Create DOM maps → `dom-maps/<feature>/`
2. Write spec → `specs/<feature>.spec.md`
3. Write plan → `plans/<feature>.plan.md`
4. Generate tests → `tests/e2e/<feature>/`
5. Generate POM → `pages/<feature>.page.ts`
6. Update memory → `memory/features/<feature>.summary.md` + `memory/index.md`

### Adding a New Team Member

1. Read `PROJECT.md` → overview
2. Read `AGENT.md` → rules
3. Read `memory/index.md` → project state
4. Read `docs/` → conventions and structure
5. Review `templates/` → how to create specs, plans, tests

### Adding a New Test Type

1. Log decision → `memory/decisions/DEC-NNN.md`
2. Update `docs/folder-structure.md` → add new folder
3. Create template if needed → `templates/`
4. Update `AGENT.md` if rules change

### Handling Large Test Suites

- **Tag tests** for selective execution: `smoke`, `regression`, `<feature>`
- **Use Playwright sharding** for parallel execution across CI nodes
- **Group by feature** — each feature folder is independently runnable
- **Use fixtures** to share state setup across tests in a feature

---

## Anti-Patterns to Avoid

| ❌ Anti-Pattern | ✅ Best Practice |
|----------------|-----------------|
| Tests in one giant file | One file per feature |
| Selectors in test files | Selectors in POM only |
| Shared state between features | Each feature is self-contained |
| Modifying governance without logging | Always log in `memory/decisions/` |
| Skipping spec/plan for "simple" tests | Every test needs spec + plan |
| Bulk healing of failures | One-by-one healing |
| Auto-running tests after generation | Pause for human review |
| Deleting memory files | Supersede, never delete |

---

## CI/CD Integration (Future)

When integrating with CI/CD:

1. Run tests per feature: `npx playwright test tests/e2e/<feature>/`
2. Run by tag: `npx playwright test --grep @smoke`
3. Generate reports: `npx playwright test --reporter=html,json`
4. Store reports: `reports/html/`, `reports/json/`
5. Upload traces: `reports/traces/`

---

## Review Cadence

| Frequency | Action |
|-----------|--------|
| Per feature | Review spec, plan, and tests |
| Per session | Update memory index and session log |
| Monthly | Review governance docs for accuracy |
| Quarterly | Audit naming conventions and folder structure |
