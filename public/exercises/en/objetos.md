---
id: "objetos"
title: "Object Navigation"
functionName: "obterCidade"
args: ["$usuario"]
difficulty: "easy"
tests:
  - input: [{ "nome": "Fellyph", "endereco": { "cidade": "São Paulo" } }]
    output: "São Paulo"
  - input: [{ "nome": "Maria", "endereco": { "cidade": "Lisboa" } }]
    output: "Lisboa"
---

# Object Navigation

In this exercise, you will practice how to access object properties in PHP using the `->` operator.

Create a function called `obterCidade($usuario)` that receives a `$usuario` object.
The object has the following structure:

- A `nome` property (string).
- An `endereco` property, which is another object.
  - The `endereco` object has a `cidade` property (string).

Your function should return the value of the `cidade` property.

## Example:

```php
// If the object is:
// $usuario->endereco->cidade = "São Paulo";

obterCidade($usuario); // should return "São Paulo"
```

## Requirements:

- The function must be named `obterCidade`.
- It must accept one parameter (the user object).
- It must return a string.
