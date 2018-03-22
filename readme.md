# Sova

<i>Sova</i> is a functional programming language inspired by Lisp, Python, JavaScript and Scala. It is compiled to JavaScript so it uses JavaScript environment and you can use any JavaScript code in Sova

## Showcase

```
= fibonacci -> number
  ? (<= number 1)
    number
    +
     fibonacci (- number 1)
     fibonacci (- number 2)

console.log (fibonacci 7)
```

Output:

```
13
```
