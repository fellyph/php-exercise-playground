import { test, expect } from '@playwright/test';

test.describe('Exercise Reusability and Iframe Support', () => {
  test('should load a different exercise via URL parameter', async ({ page }) => {
    // Load 'multiplicar' exercise in English
    await page.goto('/?exercise=multiplicar&lang=en');
    
    // Wait for PHP and Exercise to load
    await expect(page.locator('#output')).toContainText(/Ready/i, { timeout: 15000 });

    // Check Exercise Instructions
    const exerciseTitle = page.locator('#exercise-content h1');
    await expect(exerciseTitle).toHaveText('Multiply Integers');

    // Check Editor code (should contain 'function multiply')
    const editorContent = page.locator('.cm-content');
    await expect(editorContent).toContainText('function multiply');
  });

  test('should hide header when hide-header=true is present', async ({ page }) => {
    await page.goto('/?hide-header=true');
    
    const header = page.locator('header');
    await expect(header).not.toBeVisible();

    // Check if the layout fills the screen (no-header class on body)
    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toContain('no-header');
  });

  test('should work together: different exercise, language and no-header', async ({ page }) => {
    await page.goto('/?exercise=multiplicar&lang=es&hide-header=true');

    // Wait for load
    await expect(page.locator('#output')).toContainText(/Listo/i, { timeout: 15000 });

    // Check everything
    await expect(page.locator('header')).not.toBeVisible();
    await expect(page.locator('#exercise-content h1')).toHaveText('Multiplicación de Enteros');
    await expect(page.locator('.cm-content')).toContainText('function multiplicar');
  });
});
