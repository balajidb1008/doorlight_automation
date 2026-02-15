import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly form: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly googleButton: Locator;
  readonly signUpLink: Locator;
  readonly forgotPasswordLink: Locator;
  readonly termsLink: Locator;
  readonly privacyLink: Locator;
  readonly logoLink: Locator;
  readonly heading: Locator;
  readonly subtitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('form');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]:has-text("Sign in")');
    this.googleButton = page.locator('button:has-text("Continue with Google")');
    this.signUpLink = page.locator('a[href="/sign-up"]');
    this.forgotPasswordLink = page.locator('a[href="/forgot-password"]');
    this.termsLink = page.locator('a[href="/terms-services"]');
    this.privacyLink = page.locator('a[href="/privacy-policy"]');
    this.logoLink = page.locator('a[href="/"]');
    this.heading = page.locator('form p:has-text("Sign in")');
    this.subtitle = page.locator('form p:has-text("Access your personalized")');
  }

  async navigate() {
    await this.page.goto('/sign-in');
    await this.form.waitFor();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submitButton.click();
  }

  async clickSignUp() {
    await this.signUpLink.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickTerms() {
    await this.termsLink.click();
  }

  async clickPrivacy() {
    await this.privacyLink.click();
  }

  async expectFormVisible() {
    await expect(this.form).toBeVisible();
  }

  async expectEmailVisible() {
    await expect(this.emailInput).toBeVisible();
  }

  async expectPasswordVisible() {
    await expect(this.passwordInput).toBeVisible();
  }

  async expectSubmitVisible() {
    await expect(this.submitButton).toBeVisible();
  }

  async expectSubmitEnabled() {
    await expect(this.submitButton).toBeEnabled();
  }

  async expectGoogleButtonVisible() {
    await expect(this.googleButton).toBeVisible();
  }

  async expectSignUpLinkVisible() {
    await expect(this.signUpLink).toBeVisible();
  }

  async expectForgotPasswordLinkVisible() {
    await expect(this.forgotPasswordLink).toBeVisible();
  }

  async expectTermsLinkVisible() {
    await expect(this.termsLink).toBeVisible();
  }

  async expectPrivacyLinkVisible() {
    await expect(this.privacyLink).toBeVisible();
  }
}

function expect(locator: Locator) {
  return {
    toBeVisible: async () => await locator.waitFor({ state: 'visible' }),
    toBeEnabled: async () => {
      const isDisabled = await locator.getAttribute('disabled');
      if (isDisabled !== null) {
        throw new Error('Element is disabled');
      }
    },
  };
}
