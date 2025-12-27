import { test, expect } from '@playwright/test';

test.describe('Multi-language Support', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for PHP to be ready
    await expect(page.locator('#output')).toContainText(/Pronto/i, { timeout: 15000 });
  });

  test('should default to Portuguese', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'PHP Interativo' })).toBeVisible();
    await expect(page.locator('#language-select')).toHaveValue('pt');
    await expect(page.getByRole('button', { name: /Executar/ })).toBeVisible();
  });

  test('should switch to English', async ({ page }) => {
    const langSelect = page.locator('#language-select');
    await langSelect.selectOption('en');

    // Check UI Header
    await expect(page.getByRole('heading', { name: 'Interactive PHP' })).toBeVisible();
    
    // Check Run Button
    await expect(page.getByRole('button', { name: /Run/ })).toBeVisible();

    // Check Exercise Instructions (h1 inside #exercise-content)
    const exerciseTitle = page.locator('#exercise-content h1');
    await expect(exerciseTitle).toHaveText('Sum of Integers');

    // Check Editor code (should contain 'function sum')
    const editorContent = page.locator('.cm-content');
    await expect(editorContent).toContainText('function sum');
    await expect(editorContent).toContainText('Write your code here');
  });

  test('should switch to Spanish', async ({ page }) => {
    const langSelect = page.locator('#language-select');
    await langSelect.selectOption('es');

    // Check UI Header
    await expect(page.getByRole('heading', { name: 'PHP Interactivo' })).toBeVisible();
    
    // Check Run Button
    await expect(page.getByRole('button', { name: /Ejecutar/ })).toBeVisible();

    // Check Exercise Instructions
    const exerciseTitle = page.locator('#exercise-content h1');
    await expect(exerciseTitle).toHaveText('Suma de Enteros');

    // Check Editor code (should contain 'function sumar')
    const editorContent = page.locator('.cm-content');
    await expect(editorContent).toContainText('function sumar');
    await expect(editorContent).toContainText('Escriba su código aquí');
  });

  test('should run code successfully in English', async ({ page }) => {
    const langSelect = page.locator('#language-select');
    await langSelect.selectOption('en');

    // Wait for exercise to load
    await expect(page.locator('#exercise-content h1')).toHaveText('Sum of Integers');

    // Type the solution in the editor
    const editorContent = page.locator('.cm-content');
    await editorContent.click();
    
    // Clear the existing code and type a working solution
    // CodeMirror is tricky to type into, sometimes we need to use keyboard commands
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('<?php\nfunction sum($a, $b) {\n    return $a + $b;\n}\n?>');

    // Run the code
    await page.getByRole('button', { name: /Run/ }).click();

    // Verify results
    await expect(page.locator('#test-status')).toHaveText(/Passed/);
    await expect(page.locator('#output')).toContainText('Test 1: Passed');
  });
});
