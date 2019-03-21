# Sova

<i>Sova</i> is an experiment of creating functional programming language inspired by Lisp, Python and JavaScript

## Common knowledge

What is software development? Basically, any software can be represented just like a function that turns input data to output data:
```
               -----------
Input Data -> |  Function | -> Output Data
               -----------
```

But what is data? Generally, we use only a few types of data: numbers, strings, booleans, lists and maps. All other types of data can be represented as combination of these basic types. [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church) in theory and <a href="https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)">John McCarthy</a> in practice proved that all types of data can be represented as list but this is only for the brave

But what is this function? It's simply a map from input data state to output data state. This function can consist of other small functions and these functions can also consist of smaller functions and so on. Thus software development is just creating a mapping function from one data state to another.

### Application order

#### Spaces
```
a b c
```
Application order here is `b` and `c` applied to `a`

#### Parentheses
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
  address |
    city "London"
    street "Piccadilly"

// or inline

= user (| (name "John") (lastName: "Doe") (age: 32) (address (: (city "London") (street "Picadilly"))))
```
