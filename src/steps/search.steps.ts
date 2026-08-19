import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, expect, Browser, Page } from '@playwright/test';
import config from '../../input.json'; 
setDefaultTimeout(10000 * 1000);

export let browser: Browser;
export let page: Page;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

After(async () => {
  if (browser) {
    await browser.close();
  }
});

Given('the user is logged in', async () => {
  await page.goto(config.baseUrl, {
    waitUntil: 'load',
    timeout: 600000,
  });
  await page.getByLabel('Username').fill(config.username);
  await page.getByLabel('Password').fill(config.password);
  await page.getByRole('button', { name: /Log\s?In/i }).click();
  await expect(page.getByRole('menuitem', { name: 'Claim', exact: true })).toBeVisible({
    timeout: 600000,
  });
});

When('the user clicks the Search menu at the top level', async () => {
  await page.getByRole('menuitem', { name: 'Search' }).getByLabel('Search').click();
});

When('the user selects the Simple Search option', async () => {
  await page.getByRole('textbox', { name: 'Claim #' }).click();
});

When('the user enters a valid claim number {string}', async (claimNumber: string) => {
  await page.getByRole('textbox', { name: 'Claim #' }).fill(config.claimNumber);
});

When('the user clicks the Search button', async () => {
    await page.getByRole('button', { name: 'Search' }).click();
});

Then('the claim search results should include the claim {string}', async (claimNumber: string) => {
  await expect(page.getByText(config.claimNumber, { exact: true })).toBeVisible({
    timeout: 400000,
  });
});

Then('the selected claim should open in the claim details page', async () => {
  await expect(page.locator('body')).toContainText(/Claim/);
});