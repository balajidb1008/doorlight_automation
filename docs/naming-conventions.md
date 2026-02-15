# Naming Conventions

> All agents and contributors MUST follow these conventions.

## File Names

| Item | Convention | Example |
|------|-----------|---------|
| Spec file | `<feature>.spec.md` | `login.spec.md` |
| Plan file | `<feature>.plan.md` | `login.plan.md` |
| Test file (E2E) | `<feature>.spec.ts` | `login.spec.ts` |
| Test file (API) | `<feature>.api.spec.ts` | `login.api.spec.ts` |
| Test data file | `<feature>.data.ts` | `login.data.ts` |
| Page object | `<feature>.page.ts` | `login.page.ts` |
| Component wrapper | `<component>.component.ts` | `datepicker.component.ts` |
| DOM map | `<page>.dom.json` | `login.dom.json` |
| DOM map (state) | `<page>.<state>.dom.json` | `login.error.dom.json` |
| Decision log | `DEC-<NNN>.md` | `DEC-001.md` |
| Session log | `<YYYY-MM-DD>.session.md` | `2026-02-15.session.md` |
| Feature summary | `<feature>.summary.md` | `login.summary.md` |

## Folder Names

- Use **kebab-case** for all folders: `user-profile/`, `forgot-password/`
- Feature folders match feature names used in specs and plans

## Code Identifiers

| Item | Convention | Example |
|------|-----------|---------|
| Page class | PascalCase + `Page` | `LoginPage` |
| Component class | PascalCase + `Component` | `DatePickerComponent` |
| Helper function | camelCase, verb-first | `fillLoginForm()` |
| Selector constant | UPPER_SNAKE_CASE | `LOGIN_SUBMIT_BTN` |
| Test name | Sentence-case, behavior-driven | `'should display error for invalid credentials'` |

## HTML Attributes

| Attribute | Convention | Example |
|-----------|-----------|---------|
| `data-testid` | kebab-case | `data-testid="login-submit-btn"` |

## IDs

| ID Type | Format | Example |
|---------|--------|---------|
| Spec ID | `SPEC-<NNN>` | `SPEC-001` |
| Plan ID | `PLAN-<NNN>` | `PLAN-001` |
| User Flow | `UF-<NNN>` | `UF-001` |
| UI Element | `UI-<NNN>` | `UI-001` |
| API Contract | `API-<NNN>` | `API-001` |
| Edge Case | `EC-<NNN>` | `EC-001` |
| Assertion | `A-<NNN>` | `A-001` |
| Validation | `VAL-<NNN>` | `VAL-001` |
| Test Data | `TD-<NNN>` | `TD-001` |
| Decision | `DEC-<NNN>` | `DEC-001` |
