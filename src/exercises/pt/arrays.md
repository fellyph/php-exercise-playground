---
id: "arrays-basico"
title: "Manipulando Arrays"
functionName: "adicionarItem"
difficulty: "fácil"
args: ["$lista", "$item"]
tests:
  - input: [["Maçã", "Banana"], "Laranja"]
    output: ["Maçã", "Banana", "Laranja"]
  - input: [[1, 2], 3]
    output: [1, 2, 3]
  - input: [[], "Primeiro"]
    output: ["Primeiro"]
---

# Manipulando Arrays

Em PHP, arrays são fundamentais para armazenar listas de dados. Você pode adicionar elementos a um array de várias formas, sendo `$array[] = $valor` uma das mais comuns.

Sua tarefa é criar uma função chamada `adicionarItem($lista, $item)` que receba um array e um novo item, adicione esse item ao final da lista e retorne o array atualizado.

## Exemplo:

```php
adicionarItem(["Arroz", "Feijão"], "Carne");
// Deve retornar: ["Arroz", "Feijão", "Carne"]
```

## Requisitos:

- A função deve se chamar `adicionarItem`.
- Deve aceitar dois parâmetros: a lista original e o novo item.
- Deve retornar o array com o novo item adicionado ao final.
