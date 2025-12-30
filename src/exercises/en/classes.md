---
id: "classes"
title: "Classes and Objects"
functionName: "simulateAccount"
args: ["$initialBalance", "$deposit", "$withdrawal"]
difficulty: "intermediate"
tests:
  - input: [100, 50, 30]
    output: "120"
  - input: [500, 200, 100]
    output: "600"
  - input: [100, 0, 150]
    output: "Insufficient balance"
---

# Classes and Objects

In this exercise, you will practice creating classes, using access modifiers (`private`), and methods in PHP.

## Task

Create a class named `BankAccount` with the following specifications:

1.  **Private Property**:
    - `$balance`: Stores the account balance.
2.  **Constructor**:
    - Receives `$initialBalance` and sets the account balance.
3.  **Method `deposit($amount)`**:
    - Adds the amount to the current balance.
4.  **Method `withdraw($amount)`**:
    - If the balance is sufficient (greater than or equal to the amount), subtracts the amount.
    - If the balance is insufficient, returns the string "Insufficient balance".
5.  **Method `getBalance()`**:
    - Returns the current balance.

Finally, create a function `simulateAccount($initialBalance, $deposit, $withdrawal)` that:

1.  Creates an instance of `BankAccount` with the initial balance.
2.  Calls the `deposit` method with the deposit amount.
3.  Calls the `withdraw` method with the withdrawal amount.
4.  If the withdrawal returns "Insufficient balance", the function should return that string.
5.  Otherwise, return the final balance by calling `getBalance()`.

### Example:

```php
simulateAccount(100, 50, 30); // Returns "120"
simulateAccount(100, 0, 150); // Returns "Insufficient balance"
```
