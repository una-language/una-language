# Sova

<i>Sova</i> is a functional programming language inspired by Lisp, Python, JavaScript and Scala. It is compiled to JavaScript so it uses JavaScript environment and you can use any JavaScript code in Sova

## TLDR showcase

```
// JavaScript
const fibonacci = number =>
  number <= 1 ? number : fibonacci(number - 1) + fibonacci(number-2)

console.log(fibonacci(7))

// Sova
= fibonacci -> number
  ? (<= number 1)
    number
    +
     fibonacci (- number 1)
     fibonacci (- number 2)

>> fibonacci 7
```

## Documentation

The documentation for the language lives [here](./documentation) </br>
It describes the syntax and all concepts of the language. It's useful to read it after looking at examples

## Examples

Code examples live [here](./examples) </br>
You can learn the language exploring them and reading documentation sometimes
