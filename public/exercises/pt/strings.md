---
id: "strings"
title: "Manipulação de Strings"
functionName: "inverterTexto"
args: ["$texto"]
difficulty: "fácil"
tests:
  - input: ["php"]
    output: "php"
  - input: ["ola"]
    output: "alo"
  - input: ["desafio"]
    output: "oifased"
---

# Inverter Texto

Crie uma função chamada `inverterTexto($texto)` que receba uma string e retorne a mesma string invertida.

## Exemplo:

```php
inverterTexto("casa"); // deve retornar "asac"
```

## Requisitos:

- A função deve se chamar `inverterTexto`.
- Deve aceitar um parâmetro (o texto a ser invertido).
- Deve retornar a string invertida.

## Dica:

Em PHP, existe uma função nativa chamada `strrev()` que pode ser muito útil para este desafio.
