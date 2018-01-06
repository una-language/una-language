# Language

## Motivation
I've been developing software using many programming languages like Scala, Javascript and Python. In this language I want to include all advantages of these languages and exclude all disadvantages. The main principle the language design is no redundancy.

## Data types

#### Elementary
```
integer = 1
float = 1.0
string = 'abc'
boolean = true
```

#### List 
```
list = [1 2 3]

[first second third] = list
```

#### Map
```
object = 
  a : 1
  b : 
    c : 2
    d : 3
  e : 4
    
a :
b :
  c : 
  d : 
e : = object
```

## Functions
```
add = number =>
  number + 1
```

## Expressions 

#### Conditional
```
condition = true
number = condition ? 1 : 2
```

## Modules

#### Export 
```
add = (number)
  number + 1

<- add
```

#### Import
```
add <- './add'

result = add(1) // 2
```
