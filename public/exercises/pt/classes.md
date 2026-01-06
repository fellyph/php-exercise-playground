---
id: "classes"
title: "Classes e Objetos"
functionName: "simularConta"
args: ["$saldoInicial", "$deposito", "$saque"]
difficulty: "intermediário"
tests:
  - input: [100, 50, 30]
    output: "120"
  - input: [500, 200, 100]
    output: "600"
  - input: [100, 0, 150]
    output: "Saldo insuficiente"
---

# Classes e Objetos

Neste exercício, você vai praticar a criação de classes, o uso de modificadores de acesso (`private`) e métodos em PHP.

## Tarefa

Crie uma classe chamada `ContaBancaria` com as seguintes especificações:

1.  **Propriedade Privada**:
    - `$saldo`: Armazena o saldo da conta.
2.  **Construtor**:
    - Recebe `$saldoInicial` e define o saldo da conta.
3.  **Método `depositar($valor)`**:
    - Adiciona o valor ao saldo atual.
4.  **Método `sacar($valor)`**:
    - Se o saldo for suficiente (maior ou igual ao valor), subtrai o valor.
    - Se o saldo for insuficiente, retorna a string "Saldo insuficiente".
5.  **Método `getSaldo()`**:
    - Retorna o saldo atual.

Por fim, crie uma função `simularConta($saldoInicial, $deposito, $saque)` que:

1.  Crie uma instância de `ContaBancaria` com o saldo inicial.
2.  Chame o método `depositar` com o valor do depósito.
3.  Chame o método `sacar` com o valor do saque.
4.  Se o saque retornar "Saldo insuficiente", a função deve retornar essa mesma string.
5.  Caso contrário, retorne o saldo final chamando `getSaldo()`.

### Exemplo:

```php
simularConta(100, 50, 30); // Retorna "120"
simularConta(100, 0, 150); // Retorna "Saldo insuficiente"
```
