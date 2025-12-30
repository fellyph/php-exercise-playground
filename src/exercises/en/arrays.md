---
id: "arrays-basico"
title: "Handling Arrays"
functionName: "addItem"
difficulty: "easy"
args: ["$list", "$item"]
tests:
  - input: [["Apple", "Banana"], "Orange"]
    output: ["Apple", "Banana", "Orange"]
  - input: [[1, 2], 3]
    output: [1, 2, 3]
  - input: [[], "First"]
    output: ["First"]
---

# Handling Arrays

In PHP, arrays are essential for storing lists of data. You can add elements to an array in several ways, with `$array[] = $value` being one of the most common.

Your task is to create a function called `addItem($list, $item)` that takes an array and a new item, adds that item to the end of the list, and returns the updated array.

## Example:

```php
addItem(["Rice", "Beans"], "Meat");
// Should return: ["Rice", "Beans", "Meat"]
```

## Requirements:

- The function must be named `addItem`.
- It must accept two parameters: the original list and the new item.
- It must return the array with the new item added to the end.
