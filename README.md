# Language

## Motivation

I've been developing software using many programming languages like Scala, Javascript and Python. In this language I want to include all advantages of these languages and exclude all disadvantages. The main principle the language design is no redundancy.

## Syntax

Programming consists of data and operations on it.

### Data types

#### Elementary

```
integer = 1
float = 1.0
string = 'abc'
boolean = true
```

#### List

###### Construction

```
array = | 1 2 3
```

```
array = |
  1
  2
  3
```

###### Deconstruction

```
| first second third = array
```

```
|
  first
  second
  third = array
```

#### Map

###### Construction

```
map =
  a : 1
  b :
    c : 2
    d : array
  e : integer
```

###### Deconstruction

```
a :
b :
  c :
  d :
e : = map
```

###### Getting value

```
one = map.a
```
