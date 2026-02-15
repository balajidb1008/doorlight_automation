# Test File Template

> Every generated `.spec.ts` file MUST follow this structure exactly.

---

## File Header

```typescript
// PLAN: PLAN-<NNN>
// SPEC: SPEC-<NNN>
```

## Imports

```typescript
import { test, expect } from '@playwright/test';
import { <Feature>Page } from '../../pages/<feature>.page';
import { testData } from './<feature>.data';
```

## Test Structure

```typescript
test.describe('<Feature Name>', () => {

  // FLOW: UF-001
  test('should <expected behavior>', {
    annotation: [
      { type: 'spec', description: 'SPEC-<NNN>' },
      { type: 'flow', description: 'UF-001' },
    ],
  }, async ({ page }) => {
    // --- Arrange ---
    const featurePage = new <Feature>Page(page);

    // --- Act ---
    await featurePage.navigate();
    await featurePage.performAction(testData.validInput);

    // --- Assert ---
    // ASSERTION: A-001 | visible
    await expect(featurePage.element).toBeVisible();

    // ASSERTION: A-002 | text
    await expect(featurePage.heading).toHaveText('Expected');

    // ASSERTION: A-003 | url
    await expect(page).toHaveURL('/expected-route');
  });

  // EDGE-CASE: EC-001
  test('should handle <edge case>', {
    annotation: [
      { type: 'spec', description: 'SPEC-<NNN>' },
      { type: 'edge-case', description: 'EC-001' },
    ],
  }, async ({ page }) => {
    // --- Arrange ---
    const featurePage = new <Feature>Page(page);

    // --- Act ---
    await featurePage.navigate();
    await featurePage.performAction(testData.invalidInput);

    // --- Assert ---
    // ASSERTION: A-004 | attribute
    await expect(featurePage.submitButton).toBeDisabled();

    // ASSERTION: A-005 | text
    await expect(featurePage.errorMessage).toHaveText('Invalid input');
  });
});
```

---

## Rules

1. Every `test()` block MUST reference its Spec ID
2. **Every `test()` block MUST have at least one assertion** — tests without assertions are invalid
3. Use **Arrange-Act-Assert** pattern
4. No hardcoded selectors — use page objects
5. No inline test data — import from `.data.ts`
6. No `page.waitForTimeout()` — use auto-wait or explicit conditions
7. Test name must be a **sentence describing expected behavior**
8. Each assertion MUST have a **comment referencing its Assertion ID** from the plan

---

## Assertion Types Reference

| Type | Playwright Method | Example |
|------|-------------------|---------|
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

## Page Object Template

```typescript
// pages/<feature>.page.ts
import { Page, Locator } from '@playwright/test';

export class <Feature>Page {
  readonly page: Page;

  // --- Selectors (from spec UI Elements) ---
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.submitButton = page.locator('[data-testid="submit-btn"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  // --- Navigation ---
  async navigate() {
    await this.page.goto('<URL>');
  }

  // --- Actions (reusable) ---
  async fillForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  // --- Assertions (reusable) ---
  async expectErrorMessage(text: string) {
    await expect(this.errorMessage).toHaveText(text);
  }
}
```

---

## Test Data Template

```typescript
// tests/e2e/<feature>/<feature>.data.ts
export const testData = {
  validInput: {
    username: 'testuser@example.com',
    password: 'ValidPass123!',
  },
  invalidInput: {
    username: '',
    password: '',
  },
};
```
