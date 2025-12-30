---
id: "objetos"
title: "Navegação em Objetos"
functionName: "obterCidade"
args: ["$usuario"]
difficulty: "fácil"
tests:
  - input: [{ "nome": "Fellyph", "endereco": { "cidade": "São Paulo" } }]
    output: "São Paulo"
  - input: [{ "nome": "Maria", "endereco": { "cidade": "Lisboa" } }]
    output: "Lisboa"
---

# Navegação em Objetos

Neste exercício, você vai praticar como acessar propriedades de objetos em PHP usando o operador `->`.

Crie uma função chamada `obterCidade($usuario)` que receba um objeto `$usuario`.
O objeto possui a seguinte estrutura:

- Uma propriedade `nome` (string).
- Uma propriedade `endereco` que é um outro objeto.
  - O objeto `endereco` possui uma propriedade `cidade` (string).

Sua função deve retornar o valor da propriedade `cidade`.

## Exemplo:

```php
// Se o objeto for:
// $usuario->endereco->cidade = "São Paulo";

obterCidade($usuario); // deve retornar "São Paulo"
```

## Requisitos:

- A função deve se chamar `obterCidade`.
- Deve aceitar um parâmetro (o objeto usuario).
- Deve retornar uma string.
