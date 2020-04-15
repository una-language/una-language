# Sova

<i>Sova</i> is an experimental functional programming language based on:

-   Lisp-like syntax
-   Python indentation and comfort
-   Compilation to JavaScript

## Showcase

```
= sum
    -> numbers
        numbers.reduce (-> (x y) (+ x y)) 0


= zeroToNine (range 0 10)
console.log (sum zeroToNine)
```

## Syntax

### General operators

```
=     | declaration
->    | function
<-    | code execution (()  => {return 1})()
-->   | async function
<--   | await
=->   | import module
<-=   | export module
?     | if (long with 3 parts) (short with 2 parts)

:     | map
|     | list
```

### Arithmetic operators

```
+     | addition
-     | subtraction
*     | multiplication
/     | division
%     | mod
```

### Boolean logic operators

```
!     | not
&&    | and
||    | or
```

### Comparison operators

```
==    | equals
===   | type-accurate equals
!=    | not equals
!==   | type-accurate not equals
>     | greater
>=    | greater or equals
<     | less
<=    | less or equals
```

### Slicing operators

```
[::1]   | slicing like in Python
```
