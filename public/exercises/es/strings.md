---
id: "strings"
title: "Manipulación de Strings"
functionName: "invertirTexto"
args: ["$texto"]
difficulty: "fácil"
tests:
  - input: ["php"]
    output: "php"
  - input: ["hola"]
    output: "aloh"
  - input: ["desafio"]
    output: "oifased"
---

# Invertir Texto

Crea una función llamada `invertirTexto($texto)` que reciba un string y devuelva el mismo string invertido.

## Ejemplo:

```php
invertirTexto("casa"); // debe devolver "asac"
```

## Requisitos:

- La función debe llamarse `invertirTexto`.
- Debe aceptar un parámetro (el texto a invertir).
- Debe devolver el string invertido.

## Consejo:

En PHP, existe una función nativa llamada `strrev()` que puede ser muy útil para este desafío.
