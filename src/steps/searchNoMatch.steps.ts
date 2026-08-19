import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './search.steps';
import config from '../../input.json';

When(
  'the user enters a syntactically valid but nonexistent claim number {string}',
  async (claimNumber: string) => {
    await page.getByRole('textbox', { name: 'Claim #' }).fill(config.claimNumberDoesNotExist);
  }
);

Then('the search request should complete without an application error', async () => {
  await expect(page.getByRole('heading', { name: 'Search Results' })).toBeVisible();
  await expect(page.locator('body')).not.toContainText(
    /application error|server error|exception/i
  );
});

Then('the search results should display {string}', async (message: string) => {
  await expect(page.getByText(message, { exact: true })).toBeVisible();
});