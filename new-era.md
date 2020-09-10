Everything should be symbols not words (even return)
Everything should be done by TDD
New equation:

```
a = 1
```

New function declaration and arithmetic operations

```
plus = (x y) ->
    x + y
```

New expression calculation

```
result = <-
    a = 1
    b = 2
    a + b
```

New await expression calculation

```
result = <--
  a = <-- fetch 'GET' '/posts' (: id 3)
  b = a + 2
  b / 2
```

Better composition of objects

```
people = |
  : name 'Alice' age 24
  : name 'Bob' age 15
```

Better decomposition of objects:

```
: a b c = object
```
