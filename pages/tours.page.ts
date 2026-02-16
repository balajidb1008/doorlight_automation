import { type Locator, type Page, expect } from '@playwright/test';

export class ToursPage {
  readonly page: Page;
  
  readonly manageTourButtons: Locator;
  readonly manageTourFirstButton: Locator;
  
  readonly rescheduleOption: Locator;
  readonly addToCalendarOption: Locator;
  readonly cancelTourOption: Locator;
  
  readonly cancelRequestButton: Locator;
  readonly closeButton: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  
  readonly tourRequestCreatedMessage: Locator;
  readonly tourRescheduledMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.manageTourButtons = page.getByRole('button', { name: 'Manage Tour' });
    this.manageTourFirstButton = page.getByRole('button', { name: 'Manage Tour' }).first();
    
    this.rescheduleOption = page.locator('div').filter({ hasText: /^Reschedule Tour$/ });
    this.addToCalendarOption = page.locator('div').filter({ hasText: /^Add tour to my calendar$/ });
    this.cancelTourOption = page.locator('div').filter({ hasText: /^Cancel Tour Request$/ });
    
    this.cancelRequestButton = page.getByRole('button', { name: 'Cancel Request' });
    this.closeButton = page.getByRole('button', { name: 'Close' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    
    this.tourRequestCreatedMessage = page.getByText('Tour Request Created');
    this.tourRescheduledMessage = page.getByText('Tour Rescheduled Successfully');
  }

  async navigate() {
    await this.page.goto('/tours');
    await this.page.waitForTimeout(1000);
  }

  async expectPageLoaded() {
    await expect(this.manageTourFirstButton).toBeVisible();
  }

  async expectManageTourVisible() {
    await expect(this.manageTourFirstButton).toBeVisible();
  }

  async getManageTourCount(): Promise<number> {
    return await this.manageTourButtons.count();
  }

  async clickManageTour() {
    await this.manageTourFirstButton.click();
    await this.page.waitForTimeout(500);
  }

  async clickReschedule() {
    await this.rescheduleOption.click();
    await this.page.waitForTimeout(500);
  }

  async clickAddToCalendar() {
    await this.addToCalendarOption.click();
    await this.page.waitForTimeout(500);
  }

  async clickCancelTour() {
    await this.cancelTourOption.click();
    await this.page.waitForTimeout(500);
  }

  async clickCancelRequest() {
    await this.cancelRequestButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickClose() {
    await this.closeButton.click();
    await this.page.waitForTimeout(500);
  }

  async clickSubmit() {
    await this.submitButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickReset() {
    await this.resetButton.click();
    await this.page.waitForTimeout(500);
  }

  async selectDate(day: number) {
    await this.page.getByRole('gridcell', { name: day.toString() }).click();
    await this.page.waitForTimeout(500);
  }

  async selectTime(time: string) {
    await this.page.getByRole('button', { name: time }).click();
    await this.page.waitForTimeout(500);
  }

  async expectTourRequestCreatedVisible() {
    await expect(this.tourRequestCreatedMessage).toBeVisible();
  }

  async expectTourRescheduledVisible() {
    await expect(this.tourRescheduledMessage).toBeVisible({ timeout: 10000 });
  }

  async expectUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }
}
