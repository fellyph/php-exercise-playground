---
id: "classes"
title: "Clases y Objetos"
functionName: "simularCuenta"
args: ["$saldoInicial", "$deposito", "$retiro"]
difficulty: "intermedio"
tests:
  - input: [100, 50, 30]
    output: "120"
  - input: [500, 200, 100]
    output: "600"
  - input: [100, 0, 150]
    output: "Saldo insuficiente"
---

# Clases y Objetos

En este ejercicio, practicarás la creación de clases, el uso de modificadores de acceso (`private`) y métodos en PHP.

## Tarea

Crea una clase llamada `CuentaBancaria` con las siguientes especificaciones:

1.  **Propriedad Privada**:
    - `$saldo`: Almacena el saldo de la cuenta.
2.  **Constructor**:
    - Recibe `$saldoInicial` y define el saldo de la cuenta.
3.  **Método `depositar($valor)`**:
    - Añade el valor al saldo actual.
4.  **Método `sacar($valor)`**:
    - Si el saldo es suficiente (mayor o igual al valor), resta el valor.
    - Si el saldo es insuficiente, devuelve la cadena "Saldo insuficiente".
5.  **Método `getSaldo()`**:
    - Devuelve el saldo actual.

Finalmente, crea una función `simularCuenta($saldoInicial, $deposito, $retiro)` que:

1.  Cree una instancia de `CuentaBancaria` con el saldo inicial.
2.  Llame al método `depositar` con el valor del depósito.
3.  Llame al método `sacar` con el valor del retiro.
4.  Si el retiro devuelve "Saldo insuficiente", la función debe devolver esa misma cadena.
5.  De lo contrario, devuelva el saldo final llamando a `getSaldo()`.

### Ejemplo:

```php
simularCuenta(100, 50, 30); // Devuelve "120"
simularCuenta(100, 0, 150); // Devuelve "Saldo insuficiente"
```
