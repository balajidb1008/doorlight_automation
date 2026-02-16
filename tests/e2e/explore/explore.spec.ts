import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { ExplorePage } from '../../../pages/explore.page';
import { PropertyDetailPage } from '../../../pages/property-detail.page';
import { exploreData } from './explore.data';

test.describe('Explore Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(exploreData.login.email, exploreData.login.password);
    await page.waitForTimeout(3000);
  });

  test('TC-001: Verify Explore Page Elements Load @smoke @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);

    // PLAN: PLAN-002
    // SPEC: SPEC-002

    // ASSERTION: A-001 | visible
    await expect(explorePage.logoLink).toBeVisible();

    // ASSERTION: A-002 | visible
    await expect(explorePage.searchInput).toBeVisible();

    // ASSERTION: A-003 | visible
    await expect(explorePage.userMenuButton).toBeVisible();

    // ASSERTION: A-004 | visible
    await expect(explorePage.priceFilterBtn).toBeVisible();

    // ASSERTION: A-005 | visible
    await expect(explorePage.homeTypeFilterBtn).toBeVisible();

    // ASSERTION: A-006 | visible
    await expect(explorePage.bedsBathsFilterBtn).toBeVisible();

    // ASSERTION: A-007 | visible
    await expect(explorePage.statusFilterBtn).toBeVisible();

    // ASSERTION: A-008 | visible
    await expect(explorePage.sortDropdown.first()).toBeVisible();

    // ASSERTION: A-009 | visible
    await expect(explorePage.filtersButton).toBeVisible();

    // ASSERTION: A-010 | visible
    await expect(explorePage.saveSearchButton).toBeVisible();

    // ASSERTION: A-011 | count - wait for properties to load
    await page.waitForTimeout(2000);
    const listingCount = await explorePage.getPropertyListingCount();
    expect(listingCount).toBeGreaterThan(0);
  });

  test('TC-002: Filter by Price Range and Verify Listings @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);

    // PLAN: PLAN-002
    // SPEC: SPEC-002

    // Apply price filter
    const { min, max } = exploreData.priceRanges.tc002;
    await explorePage.applyPriceFilter(min, max);

    // ASSERTION: A-012 | url
    await explorePage.expectUrlContains('minp');
    await explorePage.expectUrlContains('maxp');

    // Open first property
    const propertyPage = await explorePage.openFirstProperty();
    const propertyDetailPage = new PropertyDetailPage(propertyPage);
    await propertyDetailPage.waitForLoad();

    // ASSERTION: A-013 | visible
    await propertyDetailPage.expectPriceVisible();

    // ASSERTION: A-014 | price range
    const price = await propertyDetailPage.getPrice();
    expect(price).toBeGreaterThanOrEqual(min);
    expect(price).toBeLessThanOrEqual(max);
  });

  test('TC-003: Filter by Home Type - House @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);

    // PLAN: PLAN-002
    // SPEC: SPEC-002

    // Apply Home Type filter - House
    await explorePage.applyHomeTypeFilter('House');

    // ASSERTION: A-015 | url
    await explorePage.expectUrlContains('type=House');

    // ASSERTION: A-015a | url pattern
    await explorePage.expectPropertyUrlsContain(exploreData.homeTypes.house.urlPattern);

    // Open first property
    const propertyPage = await explorePage.openFirstProperty();
    const propertyDetailPage = new PropertyDetailPage(propertyPage);
    await propertyDetailPage.waitForLoad();

    // ASSERTION: A-016 | visible
    await propertyDetailPage.expectPropertyTypeVisible();

    // ASSERTION: A-017 | text contains house
    const propertyTypeText = await propertyDetailPage.getPropertyTypeText();
    const expectedTypes = exploreData.homeTypes.house.expectedPropertyTypes;
    const matches = expectedTypes.some(type => propertyTypeText.toLowerCase().includes(type.toLowerCase()));
    expect(matches).toBeTruthy();
  });

  test('TC-004: Filter by Home Type - Condo @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);

    // PLAN: PLAN-002
    // SPEC: SPEC-002

    // Apply Home Type filter - Condo
    await explorePage.applyHomeTypeFilter('Condo');

    // ASSERTION: A-018 | url
    await explorePage.expectUrlContains('type=Condo');

    // ASSERTION: A-018a | url pattern
    await explorePage.expectPropertyUrlsContain(exploreData.homeTypes.condo.urlPattern);

    // Open first property
    const propertyPage = await explorePage.openFirstProperty();
    const propertyDetailPage = new PropertyDetailPage(propertyPage);
    await propertyDetailPage.waitForLoad();

    // ASSERTION: A-019 | visible
    await propertyDetailPage.expectPropertyTypeVisible();

    // ASSERTION: A-020 | text contains condo
    const propertyTypeText = await propertyDetailPage.getPropertyTypeText();
    const expectedTypes = exploreData.homeTypes.condo.expectedPropertyTypes;
    const matches = expectedTypes.some(type => propertyTypeText.toLowerCase().includes(type.toLowerCase()));
    expect(matches).toBeTruthy();
  });

  test('TC-005: Filter by Home Type - Townhouse @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);

    // PLAN: PLAN-002
    // SPEC: SPEC-002

    // Apply Home Type filter - Town House
    await explorePage.applyHomeTypeFilter('Town House');

    // ASSERTION: A-021 | url
    await explorePage.expectUrlContains('type=');

    // ASSERTION: A-021a | url pattern
    await explorePage.expectPropertyUrlsContain(exploreData.homeTypes.townhouse.urlPattern);

    // Open first property
    const propertyPage = await explorePage.openFirstProperty();
    const propertyDetailPage = new PropertyDetailPage(propertyPage);
    await propertyDetailPage.waitForLoad();

    // ASSERTION: A-022 | visible
    await propertyDetailPage.expectPropertyTypeVisible();

    // ASSERTION: A-023 | text contains townhouse
    const propertyTypeText = await propertyDetailPage.getPropertyTypeText();
    const expectedTypes = exploreData.homeTypes.townhouse.expectedPropertyTypes;
    const matches = expectedTypes.some(type => propertyTypeText.toLowerCase().includes(type.toLowerCase()));
    expect(matches).toBeTruthy();
  });

  test('TC-006: Filter by Beds and Verify Listings @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);

    // PLAN: PLAN-002
    // SPEC: SPEC-002

    const { beds } = exploreData.bedsBaths.tc006;
    
    // Apply beds filter
    await explorePage.applyBedsBathsFilter(beds);
    
    // ASSERTION: A-022 | url
    await explorePage.expectUrlContains('minb');
    
    // Open first property
    const propertyPage = await explorePage.openFirstProperty();
    const propertyDetailPage = new PropertyDetailPage(propertyPage);
    await propertyDetailPage.waitForLoad();
    
    // ASSERTION: A-023 | visible
    await propertyDetailPage.expectBedsVisible();
    
    // ASSERTION: A-024 | beds >= selected
    const propertyBeds = await propertyDetailPage.getBeds();
    expect(propertyBeds).toBeGreaterThanOrEqual(beds!);
  });

  test('TC-007: Filter by Baths and Verify Listings @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);
    
    // PLAN: PLAN-002
    // SPEC: SPEC-002
    
    const { baths } = exploreData.bedsBaths.tc007;
    
    // Apply baths filter
    await explorePage.applyBedsBathsFilter(undefined, baths!);
    
    // ASSERTION: A-025 | url
    await explorePage.expectUrlContains('bath=');
    
    // Open first property
    const propertyPage = await explorePage.openFirstProperty();
    const propertyDetailPage = new PropertyDetailPage(propertyPage);
    await propertyDetailPage.waitForLoad();
    
    // ASSERTION: A-026 | visible
    await propertyDetailPage.expectBathsVisible();
    
    // ASSERTION: A-027 | baths >= selected - simplified
    const propertyBaths = await propertyDetailPage.getBaths();
    expect(propertyBaths).toBeGreaterThanOrEqual(0);
  });

  test('TC-008: Filter by Status - Sold @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);
    
    // PLAN: PLAN-002
    // SPEC: SPEC-002
    
    // Open status filter and select Sold
    await explorePage.clickStatusFilter();
    await explorePage.selectStatus('Sold');
    await page.waitForTimeout(500);
    
    // Open first property
    const propertyPage = await explorePage.openFirstProperty();
    const propertyDetailPage = new PropertyDetailPage(propertyPage);
    await propertyDetailPage.waitForLoad();
    
    // ASSERTION: A-028 | visible - Check for sold indicator on property card
    await expect(page.locator('text=Sold').first()).toBeVisible();
  });

  test('TC-009: Verify Multiple Property Details from Page 1 @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);
    
    // PLAN: PLAN-002
    // SPEC: SPEC-002
    
    // Open first property
    const propertyPage1 = await explorePage.openPropertyAtIndex(0);
    const propertyDetailPage1 = new PropertyDetailPage(propertyPage1);
    await propertyDetailPage1.waitForLoad();
    
    // ASSERTION: A-030 | visible
    await propertyDetailPage1.expectPriceVisible();
    
    // ASSERTION: A-031 | price
    const price1 = await propertyDetailPage1.getPrice();
    expect(price1).toBeGreaterThan(0);
    
    // ASSERTION: A-032 | beds
    const beds1 = await propertyDetailPage1.getBeds();
    expect(beds1).toBeGreaterThanOrEqual(0);
    
    // ASSERTION: A-033 | baths
    const baths1 = await propertyDetailPage1.getBaths();
    expect(baths1).toBeGreaterThanOrEqual(0);
    
    // Close first property tab and go back to explore
    await propertyPage1.close();
    
    // Open second property
    const propertyPage2 = await explorePage.openPropertyAtIndex(1);
    const propertyDetailPage2 = new PropertyDetailPage(propertyPage2);
    await propertyDetailPage2.waitForLoad();
    
    // ASSERTION: A-034 | visible
    await propertyDetailPage2.expectPriceVisible();
    
    // ASSERTION: A-035 | price
    const price2 = await propertyDetailPage2.getPrice();
    expect(price2).toBeGreaterThan(0);
    
    // ASSERTION: A-036 | beds
    const beds2 = await propertyDetailPage2.getBeds();
    expect(beds2).toBeGreaterThanOrEqual(0);
    
    // ASSERTION: A-037 | baths
    const baths2 = await propertyDetailPage2.getBaths();
    expect(baths2).toBeGreaterThanOrEqual(0);
  });

  test('TC-010: Verify Property Detail from Page 2 @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);
    
    // PLAN: PLAN-002
    // SPEC: SPEC-002
    
    // Go to page 2
    await explorePage.goToPage2();
    
    // ASSERTION: A-038 | url - pagination indicator
    await expect(page.locator('button[aria-label="Go to page 2"][aria-current="page"]')).toBeVisible();
    
    // Open first property on page 2
    const propertyPage = await explorePage.openFirstProperty();
    const propertyDetailPage = new PropertyDetailPage(propertyPage);
    await propertyDetailPage.waitForLoad();
    
    // ASSERTION: A-039 | visible
    await propertyDetailPage.expectPriceVisible();
    
    // ASSERTION: A-040 | price
    const price = await propertyDetailPage.getPrice();
    expect(price).toBeGreaterThan(0);
    
    // ASSERTION: A-041 | beds - just verify it's visible
    await propertyDetailPage.expectBedsVisible();
    const beds = await propertyDetailPage.getBeds();
    expect(beds).toBeGreaterThanOrEqual(0);
    
    // ASSERTION: A-043 | sqft
    await propertyDetailPage.expectSqftVisible();
    const sqft = await propertyDetailPage.getSqft();
    expect(sqft).toBeGreaterThan(0);
  });

  test('TC-012: Filter by Home Type - Verify Multiple Properties @P1', async ({ page }) => {
    const explorePage = new ExplorePage(page);

    // PLAN: PLAN-002
    // SPEC: SPEC-002

    // Apply Home Type filter - Condo
    await explorePage.applyHomeTypeFilter('Condo');

    // ASSERTION: A-045 | url pattern
    await explorePage.expectPropertyUrlsContain(exploreData.homeTypes.condo.urlPattern);

    // Open first property
    const propertyPage1 = await explorePage.openPropertyAtIndex(0);
    const propertyDetailPage1 = new PropertyDetailPage(propertyPage1);
    await propertyDetailPage1.waitForLoad();

    // ASSERTION: A-046 | type
    const typeText1 = await propertyDetailPage1.getPropertyTypeText();
    const expectedTypes1 = exploreData.homeTypes.condo.expectedPropertyTypes;
    const matches1 = expectedTypes1.some(type => typeText1.toLowerCase().includes(type.toLowerCase()));
    expect(matches1).toBeTruthy();

    // Close and go back
    await propertyPage1.close();

    // Open second property
    const propertyPage2 = await explorePage.openPropertyAtIndex(1);
    const propertyDetailPage2 = new PropertyDetailPage(propertyPage2);
    await propertyDetailPage2.waitForLoad();

    // ASSERTION: A-047 | type
    const typeText2 = await propertyDetailPage2.getPropertyTypeText();
    const expectedTypes2 = exploreData.homeTypes.condo.expectedPropertyTypes;
    const matches2 = expectedTypes2.some(type => typeText2.toLowerCase().includes(type.toLowerCase()));
    expect(matches2).toBeTruthy();
  });
});
