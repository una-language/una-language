# Language

## Motivation

I've been developing software using many programming languages like Scala, Javascript and Python. In this language I want to include all advantages of these languages and exclude all disadvantages. The main principle the language design is no redundancy.

## Syntax

### Basic data

```
integer = 1
float = 1.0
string = 'abc'
boolean = true
```

### List

##### Construction

```
list = | 1 2 3
```

```
list = |
  1
  2
  3
```

##### Deconstruction

```
| first second third = list
```

```
|
  first
  second
  third = list
```

##### Getting value

```
one = list|0
```

### Map

##### Construction

```
map =
  a : 1
  b :
    c : 2
    d : array
  e : integer
```

##### Deconstruction

```
a :
b :
  c :
  d :
e : = map
```

##### Getting value

```
one = map.a
```

### Function

##### Declaration

```
next = number => number + 1

sum = first second => first + second
```

```
next = number =>
  number + 1

sum = first second =>
  first + second
```

##### Application

```
two = next 1

three = sum 1 2
```

```
four = sum
  next 1
  2
```

##### Passing

```
numbers.map
  number =>
    double = number * 2
    double + 1
```

### Operator

##### Condition

```
prize = ? goals > 3
  'Cup'
  'Medal'
```

### Module

##### Export

```
add = number => number + 1

<- add
```

##### Import

```
add <- './add'
```
