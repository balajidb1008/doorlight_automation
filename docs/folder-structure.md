# Target Folder Structure

> **This is the REFERENCE structure** for the full test automation project.
> These folders are created incrementally as features are added.
> The `AGENT.md` references this file — all agents must follow this layout.

```
automation_test_md_poc/
│
├── AGENT.md                              # AI governance rules
├── PROJECT.md                            # Project overview
│
├── templates/                            # Reusable templates
│   ├── feature.spec.template.md
│   ├── test.plan.template.md
│   ├── test.template.md
│   ├── dom-map.template.json
│   ├── decision.template.md
│   ├── feature-summary.template.md
│   └── session.template.md
│
├── docs/                                 # Documentation
│   ├── naming-conventions.md
│   ├── folder-structure.md               # ← This file
│   ├── traceability.md
│   └── scaling-guide.md
│
├── specs/                                # Feature specs (one per feature)
│   └── <feature>.spec.md
│
├── plans/                                # Test plans (one per feature)
│   └── <feature>.plan.md
│
├── dom-maps/                             # DOM maps (per feature, per page)
│   └── <feature>/
│       ├── <page>.dom.json
│       └── <page>.<state>.dom.json
│
├── snapshots/                            # Optional visual screenshots
│   └── <feature>/
│       └── <page>.png
│
├── tests/
│   ├── e2e/                              # End-to-end tests
│   │   └── <feature>/
│   │       ├── <feature>.spec.ts
│   │       └── <feature>.data.ts
│   │
│   ├── api/                              # API tests
│   │   └── <feature>/
│   │       ├── <feature>.api.spec.ts
│   │       └── <feature>.api.data.ts
│   │
│   └── visual/                           # Visual regression tests
│       └── <feature>/
│           └── <feature>.visual.spec.ts
│
├── pages/                                # Page Object Model classes
│   ├── base.page.ts                      # Abstract base
│   └── <feature>.page.ts                 # One per page/screen
│
├── components/                           # Reusable UI component wrappers
│   └── <component>.component.ts
│
├── utils/                                # Shared utilities
│   ├── test-helpers.ts
│   ├── api-helpers.ts
│   ├── data-factory.ts
│   ├── selectors.ts
│   └── constants.ts
│
├── fixtures/                             # Playwright custom fixtures
│   └── base.fixture.ts
│
├── reports/                              # Generated reports (gitignored)
│   ├── html/
│   ├── json/
│   └── traces/
│
├── healer/                               # Test healing
│   ├── healer.config.ts
│   ├── healer.runner.ts
│   └── healer.log.md
│
├── memory/                               # Project memory (persistent)
│   ├── index.md                          # ← START HERE
│   ├── glossary.md
│   ├── decisions/
│   │   └── DEC-<NNN>.md
│   ├── features/
│   │   └── <feature>.summary.md
│   └── sessions/
│       └── <YYYY-MM-DD>.session.md
│
└── .agent/
    └── workflows/
        ├── create-spec.md
        ├── create-plan.md
        ├── generate-tests.md
        ├── run-tests.md
        └── heal-tests.md
```

## When to Create Folders

| Folder | Created When |
|--------|-------------|
| `specs/` | First feature spec is created |
| `plans/` | First test plan is created |
| `dom-maps/<feature>/` | First DOM map capture for a feature |
| `tests/e2e/<feature>/` | Tests are generated for a feature |
| `pages/` | First POM class is generated |
| `reports/` | First test run |
| `healer/` | First healing session |
| `memory/decisions/` | First architectural decision |
| `memory/features/` | First feature completes testing |
| `memory/sessions/` | First session log |
