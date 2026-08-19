import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('https://cc-sandbox-gwcpdev.tenzing.zeta1-andromeda.guidewire.net/ClaimCenter.do');

    await page.getByLabel('Username').fill('su');
    await page.getByLabel('Password').fill('gw');
    await page.getByRole('button', { name: /Log\s?In/i }).click();

    const claimMenu = page.getByRole('menuitem', { name: 'Claim', exact: true });
    await expect(claimMenu).toBeVisible();
  });
});