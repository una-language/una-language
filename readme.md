# Una

<i>Una</i> is an experimental functional programming language that took the best parts from Javascript, Python and Lisp.

## Showcase

```
sum = numbers ->
    numbers.reduce ((x y) -> (x + y)) 0

numbers = | 1 2 3 4 5 6
console.log (sum numbers)
```
