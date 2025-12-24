import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playground PHP/);
});

test('check if editor is loaded', async ({ page }) => {
  await page.goto('/');

  // Check if the editor container exists
  const editor = page.locator('#editor-container');
  await expect(editor).toBeVisible();
});

test('should show PHP Interativo heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'PHP Interativo' })).toBeVisible();
});
