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

### Parentheses from LISP + Intendation from Python
```
a (b c) d
  e f
  g h
    i
  j

// is equivalent to

a (b c) d (e f) (g h i) j
```
