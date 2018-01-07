# Sova

Sova (<i>owl</i> in Russian) is a functional programming language influenced by JavaScript, Python and Lisp.

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

###### Simple

```
list = | 1 2 3 4
```

###### Complex

```
list = |
  1
  + 1 1
  3
  * 2 2
```

##### Deconstruction

###### Simple

```
| list = first second third
```

###### Complex

```
| list =
  first
  second
  third
```

##### Getting value

```
one = list|0
```

### Map

##### Construction

```
map = .
  a 1
  b
    c 2
    d array
  e integer
```

##### Deconstruction

```
. map =
  a
  b
    c
    d
  e
```

##### Getting value

```
one = map.a
```

### Function

##### Declaration

###### Simple

```
next = -> number
  + number 1

sum = -> first second
  + first second
```

###### Complex

```
doubledNext = -> number
  next = + number 1
  * next 2
```

##### Application

###### Simple

```
two = next 1

three = sum 1 2
```

###### Complex

```
four = sum
  next 1
  2
```

##### Passing

```
numbers.map
  -> number
    double = number * 2
    double + 1
```

### Operator

##### Condition

```
prize = ?
  > goals 3
  'Cup'
  'Medal'
```

### Module

##### Export

```
add = -> number
  + number 1

<- add
```

##### Import

```
add <- './add'
```
