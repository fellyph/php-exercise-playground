---
id: "strings"
title: "String Manipulation"
functionName: "reverseText"
args: ["$text"]
difficulty: "easy"
tests:
  - input: ["php"]
    output: "php"
  - input: ["hello"]
    output: "olleh"
  - input: ["challenge"]
    output: "egnellahc"
---

# Reverse Text

Create a function named `reverseText($text)` that receives a string and returns the same string reversed.

## Example:

```php
reverseText("house"); // should return "esuoh"
```

## Requirements:

- The function must be named `reverseText`.
- It must accept one parameter (the text to be reversed).
- It must return the reversed string.

## Tip:

In PHP, there is a built-in function called `strrev()` that can be very useful for this challenge.
