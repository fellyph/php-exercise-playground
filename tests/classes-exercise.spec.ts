import { test, expect } from '@playwright/test';

test.describe('Classes and Objects Exercise', () => {
  test.beforeEach(async ({ page }) => {
    // Load the classes exercise in Portuguese
    await page.goto('/?exercise=classes&lang=pt');
    // Wait for PHP to be ready
    await expect(page.locator('#output')).toContainText(/Pronto/i, { timeout: 15000 });
  });

  test('should load the classes exercise instructions', async ({ page }) => {
    await expect(page.locator('#exercise-content h1')).toHaveText('Classes e Objetos');
    await expect(page.locator('.cm-content')).toContainText('function simularConta');
  });

  test('should pass with a correct solution', async ({ page }) => {
    const solution = `<?php
class ContaBancaria {
    private $saldo;

    public function __construct($saldoInicial) {
        $this->saldo = $saldoInicial;
    }

    public function depositar($valor) {
        $this->saldo += $valor;
    }

    public function sacar($valor) {
        if ($this->saldo >= $valor) {
            $this->saldo -= $valor;
        } else {
            return "Saldo insuficiente";
        }
    }

    public function getSaldo() {
        return $this->saldo;
    }
}

function simularConta($saldoInicial, $deposito, $saque) {
    $conta = new ContaBancaria($saldoInicial);
    $conta->depositar($deposito);
    $resultadoSaque = $conta->sacar($saque);
    
    if ($resultadoSaque === "Saldo insuficiente") {
        return $resultadoSaque;
    }
    
    return (string)$conta->getSaldo();
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
    await expect(page.locator('#output')).toContainText('Teste 2: Passou');
    await expect(page.locator('#output')).toContainText('Teste 3: Passou');
  });

  test('should fail with an incorrect solution', async ({ page }) => {
    const wrongSolution = `<?php
class ContaBancaria {
    public function __construct($s) {}
    public function depositar($v) {}
    public function sacar($v) {}
    public function getSaldo() { return 0; }
}
function simularConta($s, $d, $w) {
    return "Erro";
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
