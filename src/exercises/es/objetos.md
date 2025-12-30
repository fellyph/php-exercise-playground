---
id: "objetos"
title: "Navegación de Objetos"
functionName: "obterCidade"
args: ["$usuario"]
difficulty: "fácil"
tests:
  - input: [{ "nome": "Fellyph", "endereco": { "cidade": "São Paulo" } }]
    output: "São Paulo"
  - input: [{ "nome": "Maria", "endereco": { "cidade": "Lisboa" } }]
    output: "Lisboa"
---

# Navegación de Objetos

En este ejercicio, practicarás cómo acceder a las propiedades de los objetos en PHP utilizando el operador `->`.

Crea una función llamada `obterCidade($usuario)` que reciba un objeto `$usuario`.
El objeto tiene la siguiente estructura:

- Una propiedad `nome` (string).
- Una propiedad `endereco` que es otro objeto.
  - El objeto `endereco` tiene una propiedad `cidade` (string).

Tu función debe devolver el valor de la propiedad `cidade`.

## Ejemplo:

```php
// Si el objeto es:
// $usuario->endereco->cidade = "São Paulo";

obterCidade($usuario); // debe devolver "São Paulo"
```

## Requisitos:

- La función debe llamarse `obterCidade`.
- Debe aceptar un parámetro (el objeto usuario).
- Debe devolver un string.
