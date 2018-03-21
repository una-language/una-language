# Sova

<i>Sova</i> is a functional programming language inspired by Lisp, Python, JavaScript and Scala. It is compiled to JavaScript so it uses JavaScript environment and you can use any JavaScript code in Sova

## Showcase

#### 1. Hello World

```
>> 'Hello World!'
```

Output:

```
Hello World!
```

#### 2. Constant declaration

```
= number 5

>> number
```

Output:

```
5
```

#### 3. Functions

```
= next -> number (+ number 1)

= doubleFirstAndAddSecond -> (first second)
  = doubled * first 2
  + doubled second

>> next 2
>> doubleFirstAndAddSecond 3 7
```

Output:

```
3
13
```

#### 4. Functional expressions and complex values
Functional expressions `<-` are simple functions without arguments. Their value is evaluated every time it's called. Complex values are evaluated only once and used as simple constants.

```
= a <-
  >> 'Evaluate a'
  + 1 2

= b --
  >> 'Evaluate b'
  + 1 1

>> a
>> b
>> a
>> b
```

Output:

```
Evaluate b
Evaluate a
3
2
Evaluate a
3
2
```

#### 5. Lists

###### Construction
```
= digits | 0 1 2 3 4 5 6 7 8 9
>> digits
```

Output:

```
List [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

###### Deconstruction

```
|= digits zero one two
>> zero
>> one
>> two
```

Output:

```
0
1
2
```

#### 6. Maps

###### Construction
```
= e 3
= object :
  a 1
  b :
    c 2.0
    d 'Hello'
  e
  f | 4 5 6

>> object
>> object.a
>> object.b
>> object.b.c
>> object.b.d
>> object.e
>> object.f
```

Output:

```
Map { "a": 1, "b": Map { "c": 2, "d": "Hello" }, "e": 3, "f": List [ 4, 5, 6 ] }
1
Map { "c": 2, "d": "Hello" }
2
Hello
3
List [ 4, 5, 6 ]
```

###### Deconstruction

```
:= object a (b c d) f

>> a
>> c
>> d
>> f
```

Output:

```
1
2
Hello
List [ 4, 5, 6 ]
```

###### Elvis
```
>> ?. object.b.c
>> ?. object.b.x
>> ?. object.x.y
```

Output:

```
2
undefined
undefined
```

## Documentation

The documentation for the language lives [here](./documentation) </br>
It describes the syntax and all concepts of the language. It's useful to read it after looking at examples

## Examples

Code examples live [here](./examples) </br>
You can learn the language exploring them and reading documentation sometimes
