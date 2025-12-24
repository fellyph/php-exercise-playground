---
description: Como criar novos testes E2E com Playwright
---

# Fluxo para Criar Testes E2E com Playwright

Este workflow descreve como criar, gravar e executar testes de ponta a ponta.

## 1. Gravar um novo teste (Codegen)

Se você quiser gerar um teste interagindo com a página, use o codegen:
// turbo

```bash
npx playwright codegen http://localhost:5173
```

_Isso abrirá um navegador e um inspetor. Suas interações serão convertidas em código TypeScript._

## 2. Criar manualmente um teste

Crie um arquivo em `tests/` com o sufixo `.spec.ts`.
Exemplo `tests/meu-teste.spec.ts`:

```typescript
import { test, expect } from "@playwright/test";

test("verificar título da página", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/PHP Mobile Editor/);
});
```

## 3. Executar os testes

Para rodar todos os testes no terminal:
// turbo

```bash
npx playwright test
```

Para abrir a interface visual:
// turbo

```bash
npx playwright test --ui
```

## 4. Debugging

Para rodar um teste específico em modo debug:
// turbo

```bash
npx playwright test tests/example.spec.ts --debug
```

## 5. Instalar navegadores (caso necessário)

Se os navegadores não estiverem instalados:
// turbo

```bash
npx playwright install
```
