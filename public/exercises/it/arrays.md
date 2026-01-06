---
id: "array-base"
title: "Manipolazione di Array"
functionName: "aggiungiElemento"
difficulty: "facile"
args: ["$lista", "$elemento"]
tests:
  - input: [["Mela", "Banana"], "Arancia"]
    output: ["Mela", "Banana", "Arancia"]
  - input: [[1, 2], 3]
    output: [1, 2, 3]
  - input: [[], "Primo"]
    output: ["Primo"]
---

# Manipolazione di Array

In PHP, gli array sono fondamentali per memorizzare liste di dati. Puoi aggiungere elementi a un array in vari modi, essendo `$array[] = $valore` uno dei più comuni.

Il tuo compito è creare una funzione chiamata `aggiungiElemento($lista, $elemento)` che riceva un array e un nuovo elemento, aggiunga tale elemento alla fine della lista e restituisca l'array aggiornato.

## Esempio:

```php
aggiungiElemento(["Riso", "Fagioli"], "Carne");
// Dovrebbe restituire: ["Riso", "Fagioli", "Carne"]
```

## Requisiti:

- La funzione deve chiamarsi `aggiungiElemento`.
- Deve accettare due parametri: la lista originale e il nuovo elemento.
- Deve restituire l'array con il nuovo elemento aggiunto alla fine.
