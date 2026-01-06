---
id: "oggetti"
title: "Navigazione negli oggetti"
functionName: "ottieniCitta"
args: ["$utente"]
difficulty: "facile"
tests:
  - input: [{ "nome": "Fellyph", "indirizzo": { "citta": "San Paolo" } }]
    output: "San Paolo"
  - input: [{ "nome": "Maria", "indirizzo": { "citta": "Lisbona" } }]
    output: "Lisbona"
---

# Navigazione negli oggetti

In questo esercizio, farai pratica su come accedere alle proprietà degli oggetti in PHP usando l'operatore `->`.

Crea una funzione chiamata `ottieniCitta($utente)` che riceva un oggetto `$utente`.
L'oggetto ha la seguente struttura:

- Una proprietà `nome` (stringa).
- Una proprietà `indirizzo` che è un altro oggetto.
  - L'oggetto `indirizzo` ha una proprietà `citta` (stringa).

La tua funzione deve restituire il valore della proprietà `citta`.

## Esempio:

```php
// Se l'oggetto è:
// $utente->indirizzo->citta = "San Paolo";

ottieniCitta($utente); // dovrebbe restituire "San Paolo"
```

## Requisiti:

- La funzione deve chiamarsi `ottieniCitta`.
- Deve accettare un parametro (l'oggetto utente).
- Deve restituire una stringa.
