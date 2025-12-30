import { test, expect } from '@playwright/test';

test.describe('Arrays Exercise', () => {
  test.beforeEach(async ({ page }) => {
    // Load the arrays exercise in Portuguese
    await page.goto('/?exercise=arrays&lang=pt');
    // Wait for PHP to be ready
    await expect(page.locator('#output')).toContainText(/Pronto/i, { timeout: 15000 });
  });

  test('should load the arrays exercise instructions', async ({ page }) => {
    await expect(page.locator('#exercise-content h1')).toHaveText('Manipulando Arrays');
    await expect(page.locator('.cm-content')).toContainText('function adicionarItem');
  });

  test('should pass with a correct solution in PT', async ({ page }) => {
    const solution = `<?php
function adicionarItem($lista, $item) {
    $lista[] = $item;
    return $lista;
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
    await expect(page.locator('#output')).toContainText('["Maçã","Banana","Laranja"]');
  });

  test('should fail with an incorrect solution', async ({ page }) => {
    const wrongSolution = `<?php
function adicionarItem($lista, $item) {
    return $lista; // Forgot to add the item
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
