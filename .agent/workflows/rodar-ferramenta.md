---
description: Como rodar a ferramenta de exercícios de PHP
---

Para rodar a ferramenta localmente, siga estes passos:

1. Instale as dependências caso ainda não tenha feito:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
   // turbo

```bash
npm run dev
```

3. Abra o link fornecido no terminal (geralmente http://localhost:5173).

### Notas sobre a implementação:

- Esta ferramenta usa **WebAssembly** para rodar o PHP diretamente no seu navegador.
- Não é necessário ter o PHP instalado na sua máquina!
- O código é executado instantaneamente ao clicar em "Executar" ou usar **Ctrl+Enter**.
