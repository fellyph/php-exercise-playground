import { test, expect } from '@playwright/test';

test.describe('Strings Exercise', () => {
  test.beforeEach(async ({ page }) => {
    // Load the strings exercise in Portuguese
    await page.goto('/?exercise=strings&lang=pt');
    // Wait for PHP to be ready
    await expect(page.locator('#output')).toContainText(/Pronto/i, { timeout: 15000 });
  });

  test('should load the strings exercise instructions', async ({ page }) => {
    await expect(page.locator('#exercise-content h1')).toHaveText('Inverter Texto');
    await expect(page.locator('.cm-content')).toContainText('function inverterTexto');
  });

  test('should pass with a correct solution using strrev', async ({ page }) => {
    const solution = `<?php
function inverterTexto($texto) {
    return strrev($texto);
}
?>`;

    await page.evaluate((code) => {
      const ed = (window as any).editor;
      if (ed) {
        ed.dispatch({
          changes: { from: 0, to: ed.state.doc.length, insert: code }
        });
      }
    }, solution);

    await page.getByRole('button', { name: /Executar/ }).click();

    // Verify all tests pass
    await expect(page.locator('#test-status')).toHaveText(/Aprovado/);
    await expect(page.locator('#output')).toContainText('Teste 1: Passou');
  });

  test('should fail with an incorrect solution', async ({ page }) => {
    const wrongSolution = `<?php
function inverterTexto($texto) {
    return $texto; // Forgot to reverse
}
?>`;

    await page.evaluate((code) => {
      const ed = (window as any).editor;
      if (ed) {
        ed.dispatch({
          changes: { from: 0, to: ed.state.doc.length, insert: code }
        });
      }
    }, wrongSolution);

    await page.getByRole('button', { name: /Executar/ }).click();

    // Verify it fails
    await expect(page.locator('#test-status')).toHaveText(/Falhou/);
    await expect(page.locator('#output')).toContainText('Falhou');
  });
});
