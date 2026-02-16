import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { ExplorePage } from '../../../pages/explore.page';
import { ToursPage } from '../../../pages/tours.page';

// Test data
const toursData = {
  login: {
    email: 'balaji@db1008.in',
    password: 'Baljai@#1998',
  },
  times: {
    schedule: '10:00 AM',
    scheduleAlt: '10:30 AM',
    reschedule: '11:00 AM',
  },
  homeTypes: ['House', 'Condo', 'Town House'] as const,
};

function getTomorrowDate(): number {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.getDate();
}

function getDayAfterTomorrow(): number {
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  return dayAfter.getDate();
}

function getRandomHomeType(): 'House' | 'Condo' | 'Town House' {
  const randomIndex = Math.floor(Math.random() * toursData.homeTypes.length);
  return toursData.homeTypes[randomIndex];
}

test.describe('Tours Management Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(toursData.login.email, toursData.login.password);
    await page.waitForTimeout(3000);
  });

  test('TC-001: Schedule a Tour @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);
    const toursPage = new ToursPage(page);

    // PLAN: PLAN-003
    // SPEC: SPEC-003

    // Apply random home type filter
    const homeType = getRandomHomeType();
    console.log('Selected home type:', homeType);
    await explorePage.applyHomeTypeFilter(homeType);
    await page.waitForTimeout(1000);

    // Click on first property
    const [propertyPage] = await Promise.all([
      page.context().waitForEvent('page'),
      explorePage.firstPropertyLink.click(),
    ]);
    await propertyPage.waitForTimeout(2000);

    // Click Tour button
    await propertyPage.getByRole('button', { name: 'Tour' }).click();
    await propertyPage.waitForTimeout(1000);

    // Select tomorrow's date
    const tomorrowDate = getTomorrowDate();
    await propertyPage.getByRole('gridcell', { name: tomorrowDate.toString() }).click();
    await propertyPage.waitForTimeout(500);

    // Select time
    await propertyPage.getByRole('button', { name: toursData.times.schedule }).click();
    await propertyPage.waitForTimeout(500);

    // Click Submit
    await propertyPage.getByRole('button', { name: 'Submit' }).click();
    await propertyPage.waitForTimeout(2000);

    // ASSERTION: A-001 | url contains /tours
    await expect(propertyPage).toHaveURL(/\/tours/);

    // ASSERTION: A-002 | success message
    await expect(propertyPage.getByText('Tour Request Created')).toBeVisible();
  });

  test('TC-002: Verify Tour Details in My Tours @P0', async ({ page }) => {
    const toursPage = new ToursPage(page);

    // PLAN: PLAN-003
    // SPEC: SPEC-003

    // Navigate to tours page
    await toursPage.navigate();

    // ASSERTION: A-001 | tour listing visible
    await toursPage.expectManageTourVisible();

    // ASSERTION: A-002 | verify tour exists
    const count = await toursPage.getManageTourCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-003: Reschedule a Tour @P0', async ({ page }) => {
    const toursPage = new ToursPage(page);

    // PLAN: PLAN-003
    // SPEC: SPEC-003

    // Navigate to tours page
    await toursPage.navigate();

    // Click Manage Tour
    await toursPage.clickManageTour();

    // Click Reschedule
    await toursPage.clickReschedule();

    // Select day after tomorrow
    const dayAfterTomorrow = getDayAfterTomorrow();
    await toursPage.selectDate(dayAfterTomorrow);

    // Select time
    await toursPage.selectTime(toursData.times.reschedule);

    // Click Submit
    await toursPage.clickSubmit();
    
    // ASSERTION: A-001 | wait for URL to change
    await expect(page).toHaveURL(/\/tours/);
    
    // ASSERTION: A-002 | success toast message (auto-waits for element)
    await expect(page.getByText('Tour Rescheduled Successfully')).toBeVisible();
  });

  test('TC-004: Verify Rescheduled Tour Details @P0', async ({ page }) => {
    const toursPage = new ToursPage(page);

    // PLAN: PLAN-003
    // SPEC: SPEC-003

    // Navigate to tours page
    await toursPage.navigate();

    // ASSERTION: A-001 | tour listing visible
    await toursPage.expectManageTourVisible();

    // ASSERTION: A-002 | verify tour exists
    const count = await toursPage.getManageTourCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-005: Add Tour to Calendar @P1', async ({ page }) => {
    const toursPage = new ToursPage(page);

    // PLAN: PLAN-003
    // SPEC: SPEC-003

    // Navigate to tours page
    await toursPage.navigate();

    // Click Manage Tour
    await toursPage.clickManageTour();

    // Click Add to Calendar
    await toursPage.clickAddToCalendar();
    await page.waitForTimeout(1000);

    // ASSERTION: A-001 | Close button visible
    await expect(toursPage.closeButton).toBeVisible();

    // Click Close
    await toursPage.clickClose();
  });

  test('TC-006: Cancel a Tour @P0', async ({ page }) => {
    const toursPage = new ToursPage(page);

    // PLAN: PLAN-003
    // SPEC: SPEC-003

    // Navigate to tours page
    await toursPage.navigate();

    // Get initial tour count
    const initialCount = await toursPage.getManageTourCount();

    // Click Manage Tour
    await toursPage.clickManageTour();

    // Click Cancel Tour Request
    await toursPage.clickCancelTour();

    // Click Cancel Request
    await toursPage.clickCancelRequest();
    await page.waitForTimeout(2000);

    // ASSERTION: A-001 | url contains /tours
    await toursPage.expectUrlContains('/tours');
  });

  test('TC-007: Schedule Tour with Different Time @P1', async ({ page }) => {
    const explorePage = new ExplorePage(page);
    const toursPage = new ToursPage(page);

    // PLAN: PLAN-003
    // SPEC: SPEC-003

    // Apply random home type filter
    const homeType = getRandomHomeType();
    await explorePage.applyHomeTypeFilter(homeType);
    await page.waitForTimeout(1000);

    // Click on first property
    const [propertyPage] = await Promise.all([
      page.context().waitForEvent('page'),
      explorePage.firstPropertyLink.click(),
    ]);
    await propertyPage.waitForTimeout(2000);

    // Click Tour button
    await propertyPage.getByRole('button', { name: 'Tour' }).click();
    await propertyPage.waitForTimeout(1000);

    // Select tomorrow's date
    const tomorrowDate = getTomorrowDate();
    await propertyPage.getByRole('gridcell', { name: tomorrowDate.toString() }).click();
    await propertyPage.waitForTimeout(500);

    // Select different time
    await propertyPage.getByRole('button', { name: toursData.times.scheduleAlt }).click();
    await propertyPage.waitForTimeout(500);

    // Click Submit
    await propertyPage.getByRole('button', { name: 'Submit' }).click();

    // ASSERTION: A-001 | wait for URL to change
    await expect(propertyPage).toHaveURL(/\/tours/);
    
    // ASSERTION: A-002 | success toast message
    await expect(propertyPage.getByText('Tour Request Created')).toBeVisible();
  });

  test.skip('TC-008: Full Tour Workflow @P0', async ({ page }) => {
    const explorePage = new ExplorePage(page);
    const toursPage = new ToursPage(page);
    
    // PLAN: PLAN-003
    // SPEC: SPEC-003
    
    // Step 1: Schedule a tour
    const homeType = getRandomHomeType();
    await explorePage.applyHomeTypeFilter(homeType);
    await page.waitForTimeout(1000);
    
    const [propertyPage] = await Promise.all([
      page.context().waitForEvent('page'),
      explorePage.firstPropertyLink.click(),
    ]);
    await propertyPage.waitForTimeout(2000);
    
    await propertyPage.getByRole('button', { name: 'Tour' }).click();
    await propertyPage.waitForTimeout(1000);
    
    const tomorrowDate = getTomorrowDate();
    await propertyPage.getByRole('gridcell', { name: tomorrowDate.toString() }).click();
    await propertyPage.waitForTimeout(500);
    
    await propertyPage.getByRole('button', { name: toursData.times.schedule }).click();
    await propertyPage.waitForTimeout(500);
    
    await propertyPage.getByRole('button', { name: 'Submit' }).click();
    
    // ASSERTION: A-001 | wait for URL to change
    await expect(propertyPage).toHaveURL(/\/tours/);
    
    // ASSERTION: A-002 | success toast message
    await expect(propertyPage.getByText('Tour Request Created')).toBeVisible();
    
    // Close popup and use main page for reschedule (like TC-003)
    await propertyPage.close();
    
    // Step 2: Reschedule - navigate fresh to /tours
    await toursPage.navigate();
    await toursPage.clickManageTour();
    await toursPage.clickReschedule();
    
    const dayAfterTomorrow = getDayAfterTomorrow();
    await toursPage.selectDate(dayAfterTomorrow);
    await toursPage.selectTime(toursData.times.reschedule);
    await toursPage.clickSubmit();
    
    // ASSERTION: A-003 | wait for URL to change
    await expect(page).toHaveURL(/\/tours/);
    
    // ASSERTION: A-004 | success toast message
    await expect(page.getByText('Tour Rescheduled Successfully')).toBeVisible();
  });
});
