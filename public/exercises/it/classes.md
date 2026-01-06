---
id: "classi"
title: "Classi e Oggetti"
functionName: "simulaConto"
args: ["$saldoIniziale", "$deposito", "$prelievo"]
difficulty: "intermedio"
tests:
  - input: [100, 50, 30]
    output: "120"
  - input: [500, 200, 100]
    output: "600"
  - input: [100, 0, 150]
    output: "Saldo insufficiente"
---

# Classi e Oggetti

In questo esercizio, farai pratica con la creazione di classi, l'uso dei modificatori di accesso (`private`) e i metodi in PHP.

## Compito

Crea una classe chiamata `ContoBancario` con le seguenti specifiche:

1.  **Proprietà Privata**:
    - `$saldo`: Memorizza il saldo del conto.
2.  **Costruttore**:
    - Riceve `$saldoIniziale` e imposta il saldo del conto.
3.  **Metodo `deposita($valore)`**:
    - Aggiunge il valore al saldo attuale.
4.  **Metodo `preleva($valore)`**:
    - Se il saldo è sufficiente (maggiore o uguale al valore), sottrae il valore.
    - Se il saldo è insufficiente, restituisce la stringa "Saldo insufficiente".
5.  **Metodo `getSaldo()`**:
    - Restituisce il saldo attuale.

Infine, crea una funzione `simulaConto($saldoIniziale, $deposito, $prelievo)` che:

1.  Crei un'istanza di `ContoBancario` con il saldo iniziale.
2.  Chiami il metodo `deposita` con il valore del deposito.
3.  Chiami il metodo `preleva` con il valore del prelievo.
4.  Se il prelievo restituisce "Saldo insufficiente", la funzione deve restituire quella stessa stringa.
5.  Altrimenti, restituisca il saldo finale chiamando `getSaldo()`.

### Esempio:

```php
simulaConto(100, 50, 30); // Restituisce "120"
simulaConto(100, 0, 150); // Restituisce "Saldo insufficiente"
```
