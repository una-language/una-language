# Sova

Sova (<i>owl</i> in Russian) is a functional programming language influenced by JavaScript, Python and Lisp.

## Syntax

### Basic data

```
= integer 1
= float 1.4
= string 'abc'
= boolean true
```

### List

##### Construction

###### Simple

```
= numbers list 1 2 3 4
```

###### Complex

```
= numbers list
  1
  + 1 1
  3
  * 2 2
```

##### Getting value

```
one = numbers.get 0
```

### Map

##### Construction

```
= object map
  a 1
  b
    c 2
    d 'abc'
  e list 1 2 3
```

##### Getting value

```
= value object.property 'key'
= value object.key
```

### Function

##### Declaration

###### Simple

```
= next -> number
  + number 1

= sum -> first second
  + first second
```

###### Complex

```
= doubledNext -> number
    next = + number 1
    * next 2
```

##### Application

###### Simple

```
= two next 1

= three sum 1 2
```

###### Complex

```
= four sum
  next 1
  2
```

##### Passing

```
numbers.map
  -> number
    = double * number 2
    + double 1
```

### Operator

##### Condition

```
= prize ?
  > goals 3
  'Cup'
  'Medal'
```

### Module

##### Export

```
= add -> number
  + number 1

<- add
```

##### Import

```
<- add './add'
```
