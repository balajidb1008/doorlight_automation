import { type Locator, type Page, expect } from '@playwright/test';

export class ExplorePage {
  readonly page: Page;
  
  readonly logoLink: Locator;
  readonly searchInput: Locator;
  readonly userMenuButton: Locator;
  
  readonly priceFilterBtn: Locator;
  readonly homeTypeFilterBtn: Locator;
  readonly bedsBathsFilterBtn: Locator;
  readonly statusFilterBtn: Locator;
  readonly filtersButton: Locator;
  readonly saveSearchButton: Locator;
  readonly sortDropdown: Locator;
  
  readonly propertyListings: Locator;
  readonly firstPropertyLink: Locator;
  
  readonly priceMinInput: Locator;
  readonly priceMaxInput: Locator;
  readonly priceDoneBtn: Locator;
  readonly priceResetBtn: Locator;
  
  readonly homeTypeHouse: Locator;
  readonly homeTypeCondo: Locator;
  readonly homeTypeTownHouse: Locator;
  readonly homeTypeLand: Locator;
  readonly homeTypeMultiFamily: Locator;
  readonly homeTypeMobile: Locator;
  readonly homeTypeCommercial: Locator;
  readonly homeTypeOther: Locator;
  readonly homeTypeDoneBtn: Locator;
  readonly homeTypeResetBtn: Locator;
  
  readonly bedsBathsDoneBtn: Locator;
  readonly bedsBathsResetBtn: Locator;
  
  readonly page2Button: Locator;
  readonly nextPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.logoLink = page.getByRole('link', { name: 'logo', exact: true }).locator('a');
    this.searchInput = page.getByRole('textbox', { name: 'City, Neighbourhood, Address' });
    this.userMenuButton = page.getByRole('button', { name: 'Balaji V Balaji V' });
    
    this.priceFilterBtn = page.getByRole('button', { name: 'Price' });
    this.homeTypeFilterBtn = page.getByRole('button', { name: 'Home Type' });
    this.bedsBathsFilterBtn = page.getByRole('button', { name: 'Beds / Baths' });
    this.statusFilterBtn = page.getByRole('button', { name: 'Active' });
    this.filtersButton = page.getByRole('button', { name: 'Filters' });
    this.saveSearchButton = page.getByRole('button', { name: 'Save search' });
    this.sortDropdown = page.locator('.react-select__control');
    
    this.propertyListings = page.locator('a[href*="/home-for-sale/"], a[href*="/condo-for-sale/"], a[href*="/townhouse-for-sale/"]');
    this.firstPropertyLink = page.locator('a[href*="/home-for-sale/"], a[href*="/condo-for-sale/"], a[href*="/townhouse-for-sale/"]').first();
    
    this.priceMinInput = page.getByRole('tooltip', { name: 'Select price range - Reset' }).getByPlaceholder('Enter min');
    this.priceMaxInput = page.getByRole('tooltip', { name: 'Select price range $100,000' }).getByPlaceholder('Enter max');
    this.priceDoneBtn = page.getByRole('tooltip').getByRole('button', { name: 'Done' });
    this.priceResetBtn = page.getByRole('tooltip').getByRole('button', { name: 'Reset' });
    
    this.homeTypeHouse = page.getByRole('tooltip').getByRole('button', { name: 'House', exact: true });
    this.homeTypeCondo = page.getByRole('tooltip').getByRole('button', { name: 'Condo Condo' });
    this.homeTypeTownHouse = page.getByRole('tooltip').getByRole('button', { name: 'Townhouse Town House' });
    this.homeTypeLand = page.getByRole('tooltip').getByRole('button', { name: 'Land' });
    this.homeTypeMultiFamily = page.getByRole('tooltip').getByRole('button', { name: 'Multi-Family' });
    this.homeTypeMobile = page.getByRole('tooltip').getByRole('button', { name: 'Mobile' });
    this.homeTypeCommercial = page.getByRole('tooltip').getByRole('button', { name: 'Commercial' });
    this.homeTypeOther = page.getByRole('tooltip').getByRole('button', { name: 'Other' });
    this.homeTypeDoneBtn = page.getByRole('tooltip').getByRole('button', { name: 'Done' });
    this.homeTypeResetBtn = page.getByRole('tooltip').getByRole('button', { name: 'Reset' });
    
    this.bedsBathsDoneBtn = page.getByRole('tooltip').getByRole('button', { name: 'Done' });
    this.bedsBathsResetBtn = page.getByRole('tooltip').getByRole('button', { name: 'Reset' });
    
    this.page2Button = page.getByRole('button', { name: 'Go to page 2', exact: true });
    this.nextPageButton = page.getByRole('button', { name: 'Go to next page' });
  }

  async navigate() {
    await this.page.goto('/explore');
    await this.propertyListings.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async expectPageLoaded() {
    await expect(this.propertyListings.first()).toBeVisible();
  }

  async expectLogoVisible() {
    await expect(this.logoLink).toBeVisible();
  }

  async expectSearchInputVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async expectUserMenuVisible() {
    await expect(this.userMenuButton).toBeVisible();
  }

  async expectPriceFilterVisible() {
    await expect(this.priceFilterBtn).toBeVisible();
  }

  async expectHomeTypeFilterVisible() {
    await expect(this.homeTypeFilterBtn).toBeVisible();
  }

  async expectBedsBathsFilterVisible() {
    await expect(this.bedsBathsFilterBtn).toBeVisible();
  }

  async expectStatusFilterVisible() {
    await expect(this.statusFilterBtn).toBeVisible();
  }

  async expectSortDropdownVisible() {
    await expect(this.sortDropdown).toBeVisible();
  }

  async expectFiltersButtonVisible() {
    await expect(this.filtersButton).toBeVisible();
  }

  async expectSaveSearchVisible() {
    await expect(this.saveSearchButton).toBeVisible();
  }

  async expectPropertyListingsVisible() {
    await expect(this.propertyListings.first()).toBeVisible();
  }

  async getPropertyListingCount(): Promise<number> {
    return await this.propertyListings.count();
  }

  async clickPriceFilter() {
    await this.priceFilterBtn.click();
  }

  async setPriceRange(min: number, max: number) {
    await this.priceMinInput.fill(min.toString());
    await this.priceMaxInput.fill(max.toString());
  }

  async clickPriceDone() {
    await this.priceDoneBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickPriceReset() {
    await this.priceResetBtn.click();
  }

  async applyPriceFilter(min: number, max: number) {
    await this.clickPriceFilter();
    await this.setPriceRange(min, max);
    await this.clickPriceDone();
  }

  async clickHomeTypeFilter() {
    await this.homeTypeFilterBtn.click();
  }

  async selectHomeType(homeType: 'House' | 'Condo' | 'Town House' | 'Land' | 'Multi-Family' | 'Mobile' | 'Commercial' | 'Other') {
    const selectors: Record<string, Locator> = {};
    selectors['House'] = this.homeTypeHouse;
    selectors['Condo'] = this.homeTypeCondo;
    selectors['Town House'] = this.homeTypeTownHouse;
    selectors['Land'] = this.homeTypeLand;
    selectors['Multi-Family'] = this.homeTypeMultiFamily;
    selectors['Mobile'] = this.homeTypeMobile;
    selectors['Commercial'] = this.homeTypeCommercial;
    selectors['Other'] = this.homeTypeOther;
    await selectors[homeType].click();
  }

  async clickHomeTypeDone() {
    await this.homeTypeDoneBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickHomeTypeReset() {
    await this.homeTypeResetBtn.click();
  }

  async applyHomeTypeFilter(homeType: 'House' | 'Condo' | 'Town House' | 'Land' | 'Multi-Family' | 'Mobile' | 'Commercial' | 'Other') {
    await this.clickHomeTypeFilter();
    await this.selectHomeType(homeType);
    await this.clickHomeTypeDone();
  }

  async clickBedsBathsFilter() {
    await this.bedsBathsFilterBtn.click();
  }

  async selectBeds(beds: number) {
    await this.page.getByRole('tooltip').getByRole('cell', { name: beds.toString() }).click();
  }

  async selectBaths(baths: string) {
    // For baths with + like "2+", use without exact match
    await this.page.getByRole('tooltip').getByRole('button', { name: baths }).click();
  }

  async clickBedsBathsDone() {
    await this.bedsBathsDoneBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickBedsBathsReset() {
    await this.bedsBathsResetBtn.click();
  }

  async applyBedsBathsFilter(beds?: number, baths?: string) {
    await this.clickBedsBathsFilter();
    if (beds) await this.selectBeds(beds);
    if (baths) await this.selectBaths(baths);
    await this.clickBedsBathsDone();
  }

  async clickStatusFilter() {
    await this.statusFilterBtn.click();
  }

  async selectStatus(status: 'Active' | 'Sold' | 'Pending' | 'Contingent') {
    await this.page.getByRole('tooltip').locator('label').filter({ hasText: status }).click();
  }

  async getCurrentStatus(): Promise<string> {
    return await this.statusFilterBtn.textContent() || '';
  }

  async openFirstProperty() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.firstPropertyLink.click(),
    ]);
    return newPage;
  }

  async openPropertyAtIndex(index: number) {
    const property = this.propertyListings.nth(index);
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      property.click(),
    ]);
    return newPage;
  }

  async goToPage2() {
    await this.page2Button.click();
    await this.page.waitForTimeout(1000);
  }

  async goToNextPage() {
    await this.nextPageButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickSortDropdown() {
    await this.sortDropdown.first().click();
  }

  async selectSortOption(option: string) {
    await this.page.getByRole('option', { name: option }).click();
    await this.page.waitForTimeout(500);
  }

  async expectUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  async getPropertyUrls(): Promise<string[]> {
    const count = await this.propertyListings.count();
    const urls: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await this.propertyListings.nth(i).getAttribute('href');
      if (href) urls.push(href);
    }
    return urls;
  }

  async getPropertyUrlAtIndex(index: number): Promise<string | null> {
    return await this.propertyListings.nth(index).getAttribute('href');
  }

  async expectPropertyUrlsContain(pattern: string) {
    const urls = await this.getPropertyUrls();
    const matches = urls.some(url => url.includes(pattern));
    expect(matches).toBeTruthy();
  }
}
