import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { loginData, urls } from './login.data';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC-001: Login page loads with all elements visible', {
    annotation: [
      { type: 'spec', description: 'SPEC-001' },
      { type: 'plan', description: 'PLAN-001' },
    ],
  }, async () => {
    // ASSERTION: A-001 | visible | form
    await expect(loginPage.form).toBeVisible();
    // ASSERTION: A-002 | visible | email input
    await expect(loginPage.emailInput).toBeVisible();
    // ASSERTION: A-003 | visible | password input
    await expect(loginPage.passwordInput).toBeVisible();
    // ASSERTION: A-004 | visible | submit button
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('TC-002: Login with valid credentials succeeds', {
    annotation: [
      { type: 'spec', description: 'SPEC-001' },
      { type: 'plan', description: 'PLAN-001' },
    ],
  }, async ({ page }) => {
    await loginPage.login(loginData.valid.email, loginData.valid.password);
    await page.waitForTimeout(2000);
    // ASSERTION: A-005 | url | redirect after login
    await expect(page).not.toHaveURL(urls.signIn);
  });

  test('TC-003: Login with invalid credentials shows error', {
    annotation: [
      { type: 'spec', description: 'SPEC-001' },
      { type: 'plan', description: 'PLAN-001' },
    ],
  }, async ({ page }) => {
    await loginPage.login(loginData.invalid.email, loginData.invalid.password);
    await page.waitForTimeout(2000);
    // ASSERTION: A-006 | url | stays on sign-in page
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('TC-004: Login with empty fields shows validation', {
    annotation: [
      { type: 'spec', description: 'SPEC-001' },
      { type: 'plan', description: 'PLAN-001' },
    ],
  }, async ({ page }) => {
    await loginPage.submitButton.click();
    await page.waitForTimeout(1000);
    // ASSERTION: A-007 | url | stays on sign-in page
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('TC-005: Navigate to Sign Up page', {
    annotation: [
      { type: 'spec', description: 'SPEC-001' },
      { type: 'plan', description: 'PLAN-001' },
    ],
  }, async ({ page }) => {
    await loginPage.clickSignUp();
    await loginPage.form.waitFor();
    // ASSERTION: A-008 | url | contains /sign-up
    await expect(page).toHaveURL(/\/sign-up/);
  });

  test('TC-006: Navigate to Forgot Password page', {
    annotation: [
      { type: 'spec', description: 'SPEC-001' },
      { type: 'plan', description: 'PLAN-001' },
    ],
  }, async ({ page }) => {
    await loginPage.clickForgotPassword();
    await loginPage.form.waitFor();
    // ASSERTION: A-009 | url | contains /forgot-password
    await expect(page).toHaveURL(/\/forgot-password/);
  });

  test('TC-007: Google Sign In button is visible', {
    annotation: [
      { type: 'spec', description: 'SPEC-001' },
      { type: 'plan', description: 'PLAN-001' },
    ],
  }, async () => {
    // ASSERTION: A-010 | visible | Google button
    await expect(loginPage.googleButton).toBeVisible();
  });

  test('TC-008: Terms link is visible and clickable', {
    annotation: [
      { type: 'spec', description: 'SPEC-001' },
      { type: 'plan', description: 'PLAN-001' },
    ],
  }, async ({ page }) => {
    // ASSERTION: A-011 | visible | terms link
    await expect(loginPage.termsLink).toBeVisible();
    await loginPage.clickTerms();
    await page.waitForTimeout(1000);
  });

  test('TC-009: Privacy Policy link is visible and clickable', {
    annotation: [
      { type: 'spec', description: 'SPEC-001' },
      { type: 'plan', description: 'PLAN-001' },
    ],
  }, async ({ page }) => {
    // ASSERTION: A-012 | visible | privacy link
    await expect(loginPage.privacyLink).toBeVisible();
    await loginPage.clickPrivacy();
    await page.waitForTimeout(1000);
  });
});
