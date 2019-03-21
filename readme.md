# Sova

<i>Sova</i> is an experiment of creating functional programming language inspired by Lisp, Python and JavaScript

## Common knowledge

### Application order

#### Spaces
```
a b c
```
Application order here is `b` and `c` applied to `a`

#### Parenthesises
```
a (b c)
```
Application order here is `c` applied to `b` and the result is applied to `a`

#### Intendation
```
a b c
  d
  e
```
Application order here is `d` and `e` applied to `c` - `b` and the result of application is applied to `a`

### Data Structures

#### List

_Symbol_: `_` </br>
_Parameters_: list elements

_Example_:
```
= numbers _ 1 2 3 4

// or expanded

= numbers _
  1
  2
  3
  4
```

#### Map
_Symbol_: `|` </br>
_Parameters_: keys and values

_Example_:
```
= user |
  name "John"
  lastName: "Doe"
  age: 32
  address :
    city "London"
    street "Piccadilly"
    
// or inline

= user (| (name "John") (lastName: "Doe") (age: 32) (address (: (city "London") (street "Picadilly"))))
```
