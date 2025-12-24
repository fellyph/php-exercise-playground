# PHP Learning Playground (PHP Scholar)

Este é um protótipo de uma ferramenta interativa para estudantes de PHP, utilizando WebAssembly (**PHP-WASM**) para executar código diretamente no navegador.

## 🚀 Como Executar

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. No diretório do projeto, instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173`.

## 🛠️ Tecnologias Utilizadas

- **@php-wasm/web**: O motor PHP rodando em WebAssembly.
- **CodeMirror 6**: Editor de código moderno com suporte a PHP.
- **Vite**: Build tool rápida para o frontend.
- **Vanilla JS**: Para manter o projeto leve e focado.

## 💡 Como funciona

A ferramenta carrega o runtime do PHP 8.3 via WASM. Quando o estudante clica em "Executar" (ou usa `Ctrl+Enter`), o código do editor é enviado para o `php.runStream()`, que retorna o `stdout` e `stderr` do script.

### Versão para Node.js

Embora o protótipo seja web, a biblioteca `@php-wasm/node` (citada na sua solicitação) funciona de forma quase idêntica:

```javascript
import { PHP } from "@php-wasm/universal";
import { loadNodeRuntime } from "@php-wasm/node";

async function run() {
  const php = new PHP(await loadNodeRuntime("8.3"));
  const result = await php.runStream({ code: '<?php echo "Olá!"; ?>' });
  console.log(await result.stdoutText);
}
```

## 📂 Estrutura do Projeto

- `index.html`: Estrutura da UI.
- `style.css`: Estilização premium (Dark Mode).
- `main.js`: Lógica de integração PHP + Editor.
- `vite.config.js`: Configurações necessárias para carregar arquivos `.so` e `.wasm`.
