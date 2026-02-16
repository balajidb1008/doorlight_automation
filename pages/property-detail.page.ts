import { type Locator, type Page, expect } from '@playwright/test';

export class PropertyDetailPage {
  readonly page: Page;
  
  readonly propertyPrice: Locator;
  readonly propertyBeds: Locator;
  readonly propertyBaths: Locator;
  readonly propertySqft: Locator;
  readonly propertyType: Locator;
  readonly propertyStatus: Locator;
  readonly propertyAddress: Locator;
  
  readonly neighborhoodTab: Locator;
  readonly propertyDetailsTab: Locator;
  readonly similarTab: Locator;
  readonly overviewTab: Locator;
  
  readonly aboutThisHome: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Price is in an h1 heading with dollar sign
    this.propertyPrice = page.locator('h1:has-text("$")').first();
    this.propertyBeds = page.locator('text=/\\d+\\s*bed/i');
    this.propertyBaths = page.locator('text=/\\d+\\s*bath/i');
    this.propertySqft = page.locator('text=/\\d+,?\\d*\\s*sq\\s*ft/i').first();
    this.propertyType = page.locator('div').filter({ hasText: /Property Type/ }).first();
    this.propertyStatus = page.locator('text=Active, text=Sold, text=Pending, text=Contingent').first();
    this.propertyAddress = page.locator('h1').first();
    
    this.neighborhoodTab = page.getByRole('tab', { name: 'Navigate to Neighborhood' });
    this.propertyDetailsTab = page.getByRole('tab', { name: 'Navigate to Property Details' });
    this.similarTab = page.getByRole('tab', { name: 'Navigate to Similar' });
    this.overviewTab = page.getByRole('tab', { name: 'Navigate to Overview section' });
    
    this.aboutThisHome = page.getByText('About this home').first();
  }

  async waitForLoad() {
    await this.propertyPrice.waitFor({ state: 'visible', timeout: 10000 });
  }

  async expectPriceVisible() {
    await expect(this.propertyPrice).toBeVisible();
  }

  async expectBedsVisible() {
    await expect(this.propertyBeds.first()).toBeVisible();
  }

  async expectBathsVisible() {
    await expect(this.propertyBaths.first()).toBeVisible();
  }

  async expectSqftVisible() {
    await expect(this.propertySqft).toBeVisible();
  }

  async expectPropertyTypeVisible() {
    await expect(this.propertyType).toBeVisible();
  }

  async expectStatusVisible() {
    await expect(this.propertyStatus).toBeVisible();
  }

  async expectAddressVisible() {
    await expect(this.propertyAddress).toBeVisible();
  }

  async getPriceText(): Promise<string> {
    return await this.propertyPrice.textContent() || '';
  }

  async getBedsText(): Promise<string> {
    return await this.propertyBeds.first().textContent() || '';
  }

  async getBathsText(): Promise<string> {
    return await this.propertyBaths.first().textContent() || '';
  }

  async getSqftText(): Promise<string> {
    return await this.propertySqft.textContent() || '';
  }

  async getPropertyTypeText(): Promise<string> {
    return await this.propertyType.textContent() || '';
  }

  async getStatusText(): Promise<string> {
    return await this.propertyStatus.textContent() || '';
  }

  async extractNumberFromPrice(priceText: string): number {
    // Get only the first number from the text (price)
    const match = priceText.match(/\$[\d,]+/);
    if (match) {
      const cleaned = match[0].replace(/[^0-9]/g, '');
      return parseInt(cleaned, 10) || 0;
    }
    return 0;
  }

  async extractNumberFromText(text: string): number {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  async getPrice(): Promise<number> {
    const priceText = await this.getPriceText();
    return this.extractNumberFromPrice(priceText);
  }

  async getBeds(): Promise<number> {
    const bedsText = await this.getBedsText();
    return this.extractNumberFromText(bedsText);
  }

  async getBaths(): Promise<number> {
    const bathsText = await this.getBathsText();
    return this.extractNumberFromText(bathsText);
  }

  async getSqft(): Promise<number> {
    const sqftText = await this.getSqftText();
    return this.extractNumberFromText(sqftText);
  }

  async clickNeighborhoodTab() {
    await this.neighborhoodTab.click();
  }

  async clickPropertyDetailsTab() {
    await this.propertyDetailsTab.click();
  }

  async clickSimilarTab() {
    await this.similarTab.click();
  }

  async clickOverviewTab() {
    await this.overviewTab.click();
  }

  async expectAboutThisHomeVisible() {
    await expect(this.aboutThisHome).toBeVisible();
  }
}
