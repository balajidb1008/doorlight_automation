# AGENT.md — AI Governance Rules

> **This file governs all AI agent behavior in this repository.**
> Every agent (Playwright Test Agent, coding assistant, etc.) MUST read and follow these rules before performing any action.

---

## 1. Core Principles

| Principle | Rule |
|-----------|------|
| **Deterministic** | Same spec + plan → same generated tests. No randomness. |
| **No Hallucination** | Only generate code from APPROVED specs and plans. Never invent features, selectors, or flows. |
| **No Scope Expansion** | Work on ONE feature at a time. Never touch unrelated files. |
| **Pause After Generation** | After generating code, say **"Ready to run"** and STOP. Never auto-run tests. |
| **User-Triggered Execution** | Run tests ONLY when the user explicitly asks (e.g., "run the tests", "run and fix"). |
| **Traceability** | Every test traces back to: Spec ID → Plan ID → Assertion ID → Report line. |

---

## 2. Lifecycle: Spec → Plan → Test → Report

```
1. Browse & Capture DOM Map   →  Understand the feature via browser
2. Create Feature Spec (MD)   →  Define what the feature is
3. Create Test Plan (MD)      →  Define how to test it
4. Generate Test Code + POM   →  Write tests & page objects
5. PAUSE                      →  Say "Ready to run", wait for user
6. Run Tests (user-triggered) →  Execute only when asked
7. Heal (user-triggered)      →  Fix failures one-by-one when asked
8. Report                     →  Generate and update traceability
```

### Validation Gates

| Gate | Condition |
|------|-----------|
| Before creating a plan | Spec must exist and be APPROVED |
| Before generating code | Plan must exist and be APPROVED |
| Before running tests | Code must be reviewed by user |
| Before healing | User must explicitly request it |

---

## 3. Page Capture: DOM Map (JSON)

### Rules

1. **Primary format is DOM Map (JSON)** — never default to PNG screenshots
2. **Check existing maps first** — if `dom-maps/<feature>/<page>.dom.json` exists, reuse it
3. **Capture different states** — default, error, loaded, empty
4. **PNG is optional** — take only when visual ambiguity requires it
5. **Include all interactive elements** — buttons, inputs, links, forms, dropdowns
6. **Prefer `data-testid` selectors** — fall back to CSS if no testid exists

### DOM Map Location

```
dom-maps/<feature>/<page-name>.dom.json
dom-maps/<feature>/<page-name>.<state>.dom.json
```

See `templates/dom-map.template.json` for the full format.

---

## 4. Page Object Model (Mandatory)

### Rules

1. **Every page/screen MUST have a POM class** in `pages/<feature>.page.ts`
2. **Selectors live ONLY in POM classes** — never in test files
3. **Reusable actions as POM methods** — `fillForm()`, `submit()`, `navigate()`
4. **Reusable assertions as POM methods** — `expectErrorMessage()`, `expectTitle()`
5. **Before creating a new POM, check if one already exists**
6. **Shared components** go in `components/<component>.component.ts`

---

## 5. Code Generation Rules

| # | Rule |
|---|------|
| 1 | **No test code without an APPROVED spec** |
| 2 | **No test code without an APPROVED plan** |
| 3 | **One feature at a time** — never mix features in a single generation |
| 4 | **Always create/reuse Page Object classes** — no inline selectors |
| 5 | **Always create/reuse helper functions** — search `utils/` before creating |
| 6 | **No `page.waitForTimeout()`** — use Playwright auto-wait or explicit conditions |
| 7 | **Every `test()` must reference its Spec ID** — `// SPEC: SPEC-001` |
| 8 | **Every `test()` must have at least one assertion** — tests without assertions are invalid |
| 9 | **Every assertion must reference its Assertion ID** — `// ASSERTION: A-001` |
| 10 | **No modification of unrelated files** — only touch files for the current feature |
| 11 | **PAUSE after generation** — say "Ready to run", never auto-run |
| 12 | **Test data in `.data.ts` files** — never hardcode data inline |
| 13 | **Reuse existing DOM maps** — only capture new ones for unvisited pages |

---

## 6. Test Execution

- **Never auto-run tests** after generating code
- After code generation, output: `"✅ Tests generated. Ready to run. Say 'run tests' to execute."`
- Run only when user explicitly says to (e.g., "run tests", "run and fix")
- Use command: `npx playwright test tests/e2e/<feature>/`

---

## 7. Healer Strategy

ONLY execute when user explicitly requests (e.g., "run and fix", "heal the tests").

```
FOR each failed test (one at a time, sorted by file then line):
  1. Read failure message + stack trace
  2. Categorize root cause:
     - SELECTOR_CHANGED  → Update POM selector
     - TIMING_ISSUE      → Add proper wait condition
     - DATA_MISMATCH     → Update test data file
     - ASSERTION_FAILED  → Check spec, fix assertion or logic
     - API_CHANGE        → Update spec + test
     - ENV_ISSUE         → Escalate to human
  3. Apply the MINIMUM change to fix
  4. Re-run ONLY the healed test
  5. Fixed → log in healer/healer.log.md → next failure
  6. Not fixed after 2 attempts → escalate to human
  7. After all individual heals → run full suite for regression check
END
```

### Healing Rules

- **Never fix more than one test at a time**
- **Never change POM selectors without checking all tests that use them**
- **Never add `page.waitForTimeout()` as a fix**
- **Maximum 2 auto-heal attempts per test**
- **Log every action** in `healer/healer.log.md`

---

## 8. Assertions

### Requirements

- Every test MUST have at least one assertion
- Every assertion MUST map to an Assertion ID from the test plan
- Use Playwright's built-in `expect()` API — no custom assertion libraries

### Assertion Types Reference

| Type | Method | Example |
|------|--------|---------|
| visible | `toBeVisible()` | `await expect(el).toBeVisible()` |
| hidden | `toBeHidden()` | `await expect(el).toBeHidden()` |
| text | `toHaveText()` | `await expect(el).toHaveText('X')` |
| contain-text | `toContainText()` | `await expect(el).toContainText('X')` |
| url | `toHaveURL()` | `await expect(page).toHaveURL('/x')` |
| title | `toHaveTitle()` | `await expect(page).toHaveTitle('X')` |
| count | `toHaveCount()` | `await expect(els).toHaveCount(5)` |
| attribute | `toHaveAttribute()` | `await expect(el).toHaveAttribute('k','v')` |
| value | `toHaveValue()` | `await expect(input).toHaveValue('X')` |
| checked | `toBeChecked()` | `await expect(cb).toBeChecked()` |
| enabled | `toBeEnabled()` | `await expect(btn).toBeEnabled()` |
| disabled | `toBeDisabled()` | `await expect(btn).toBeDisabled()` |
| api-status | `status()` | `expect(resp.status()).toBe(200)` |
| api-body | `json()` | `expect(body.field).toBe('value')` |
| screenshot | `toHaveScreenshot()` | `await expect(page).toHaveScreenshot()` |

---

## 9. File & Folder Structure

> **Refer to `docs/folder-structure.md`** for the complete target folder structure.

### Key Paths

| Purpose | Path |
|---------|------|
| Specs | `specs/<feature>.spec.md` |
| Plans | `plans/<feature>.plan.md` |
| E2E Tests | `tests/e2e/<feature>/<feature>.spec.ts` |
| API Tests | `tests/api/<feature>/<feature>.api.spec.ts` |
| Page Objects | `pages/<feature>.page.ts` |
| Components | `components/<component>.component.ts` |
| DOM Maps | `dom-maps/<feature>/<page>.dom.json` |
| Test Data | `tests/e2e/<feature>/<feature>.data.ts` |
| Utilities | `utils/` |
| Fixtures | `fixtures/` |
| Reports | `reports/` |
| Healer | `healer/` |
| Memory | `memory/` |

---

## 10. Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Spec file | `<feature>.spec.md` | `login.spec.md` |
| Plan file | `<feature>.plan.md` | `login.plan.md` |
| Test file | `<feature>.spec.ts` | `login.spec.ts` |
| Data file | `<feature>.data.ts` | `login.data.ts` |
| Page object | `<feature>.page.ts` | `login.page.ts` |
| DOM map | `<page>.dom.json` | `login.dom.json` |
| Feature folder | kebab-case | `user-profile/` |
| Test name | Sentence, behavior | `'should display error for invalid credentials'` |
| Page class | PascalCase + Page | `LoginPage` |
| Selector const | UPPER_SNAKE | `LOGIN_SUBMIT_BTN` |
| data-testid | kebab-case | `data-testid="login-submit-btn"` |

---

## 11. Memory Management

### Rules

1. **Always update `memory/index.md`** after completing a feature or session
2. **Create session log** at end of each working session → `memory/sessions/`
3. **Create feature summary** when a feature's tests pass → `memory/features/`
4. **Log architectural decisions** → `memory/decisions/DEC-NNN.md`
5. **Start every new session** by reading `memory/index.md`
6. **Never delete memory files** — supersede decisions, don't delete

### Memory Location

```
memory/
├── index.md                     ← START HERE
├── decisions/DEC-NNN.md
├── features/<feature>.summary.md
├── sessions/YYYY-MM-DD.session.md
└── glossary.md
```

---

## 12. Traceability

Every test file must include traceability:

```typescript
// PLAN: PLAN-001
// SPEC: SPEC-001

test('should display login form', {
  annotation: [
    { type: 'spec', description: 'SPEC-001' },
    { type: 'flow', description: 'UF-001' },
  ],
}, async ({ page }) => {
  // ASSERTION: A-001 | visible
  await expect(loginPage.form).toBeVisible();
});
```

Traceability chain: `Spec → Plan → Test → Assertion → Report`

See `docs/traceability.md` for the full mapping guide.

---

## 13. Prohibited Actions

| ❌ Never Do | ✅ Do Instead |
|-------------|--------------|
| Generate tests without approved spec | Get spec approved first |
| Generate tests without approved plan | Get plan approved first |
| Auto-run tests after generation | Say "Ready to run" and wait |
| Auto-heal without user request | Wait for user to say "run and fix" |
| Use `page.waitForTimeout()` | Use auto-wait or explicit conditions |
| Hardcode selectors in tests | Use POM classes |
| Hardcode test data | Use `.data.ts` files |
| Modify unrelated files | Only touch current feature files |
| Create duplicate helpers | Search `utils/` first |
| Take PNG by default | Use DOM Map (JSON) |
| Skip memory updates | Always update `memory/index.md` |
| Work on multiple features at once | One feature at a time |
