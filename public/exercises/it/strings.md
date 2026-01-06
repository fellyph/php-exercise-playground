---
id: "stringhe"
title: "Manipolazione di Stringhe"
functionName: "invertiTesto"
args: ["$testo"]
difficulty: "facile"
tests:
  - input: ["php"]
    output: "php"
  - input: ["ciao"]
    output: "oaic"
  - input: ["sfida"]
    output: "adifs"
---

# Inverti Testo

Crea una funzione chiamata `invertiTesto($testo)` che riceva una stringa e restituisca la stessa stringa invertita.

## Esempio:

```php
invertiTesto("casa"); // dovrebbe restituire "asac"
```

## Requisiti:

- La funzione deve chiamarsi `invertiTesto`.
- Deve accettare un parametro (il testo da invertire).
- Deve restituire la stringa invertita.

## Suggerimento:

In PHP esiste una funzione nativa chiamata `strrev()` che può essere molto utile per questa sfida.
