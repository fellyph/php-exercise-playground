---
id: "arrays-basico"
title: "Manipulando Arrays"
functionName: "agregarElemento"
difficulty: "fácil"
args: ["$lista", "$elemento"]
tests:
  - input: [["Manzana", "Plátano"], "Naranja"]
    output: ["Manzana", "Plátano", "Naranja"]
  - input: [[1, 2], 3]
    output: [1, 2, 3]
  - input: [[], "Primero"]
    output: ["Primero"]
---

# Manipulando Arrays

En PHP, los arrays son fundamentales para almacenar listas de datos. Puedes agregar elementos a un array de varias formas, siendo `$array[] = $valor` una de las más comunes.

Tu tarea es crear una función llamada `agregarElemento($lista, $elemento)` que reciba un array y un nuevo elemento, agregue ese elemento al final de la lista y devuelva el array actualizado.

## Ejemplo:

```php
agregarElemento(["Arroz", "Frijoles"], "Carne");
// Debe devolver: ["Arroz", "Frijoles", "Carne"]
```

## Requisitos:

- La función debe llamarse `agregarElemento`.
- Debe aceptar dos parámetros: la lista original y el nuevo elemento.
- Debe devolver el array con el nuevo elemento agregado al final.
