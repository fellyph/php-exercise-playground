---
description: Valida erros de script e de tipos na aplicação.
---

Este workflow executa uma série de verificações para garantir que o código está livre de erros de sintaxe, tipos e compilação.

### Passos:

1. **Checagem de tipos (TypeScript)**:
   // turbo

```bash
npm run type-check
```

2. **Build da aplicação**:
   Isso verifica se o Vite consegue compilar todos os assets corretamente.
   // turbo

```bash
npm run build
```

3. **Verificação de Runtime (Console do Navegador)**:
   Caso necessário, o agente pode abrir o navegador para verificar erros em tempo de execução.
