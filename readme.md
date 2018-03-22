# Sova

<i>Sova</i> is a functional programming language inspired by Lisp, Python, JavaScript and Scala. It is compiled to JavaScript so it uses JavaScript environment and you can use any JavaScript code in Sova

## Showcase

#### 1. Hello World

```
console.log 'Hello World!'
```

Output:

```
Hello World!
```

#### 2. Constant declaration

```
= number 5

console.log number
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

console.log next 2
console.log doubleFirstAndAddSecond 3 7
```

Output:

```
3
13
```

#### 4. Functional expressions and complex values
Functional expressions `<-` are simple functions without arguments. Their value is translated every time it's called. Complex values are translated only once and used as simple constants.

```
= a <-
  console.log 'translate a'
  + 1 2

= b --
  console.log 'translate b'
  + 1 1

console.log a
console.log b
console.log a
console.log b
```

Output:

```
translate b
translate a
3
2
translate a
3
2
```

#### 5. Lists

##### Construction
```
= digits | 0 1 2 3 4 5 6 7 8 9
console.log digits
```

Output:

```
List [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

##### Deconstruction

```
|= digits zero one two
console.log zero
console.log one
console.log two
```

Output:

```
0
1
2
```

#### 6. Maps

##### Construction
```
= e 3
= object :
  a 1
  b :
    c 2.0
    d 'Hello'
  e
  f | 4 5 6

console.log object
console.log object.a
console.log object.b
console.log object.b.c
console.log object.b.d
console.log object.e
console.log object.f
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

##### Deconstruction

```
:= object a (b c d) f

console.log a
console.log c
console.log d
console.log f
```

Output:

```
1
2
Hello
List [ 4, 5, 6 ]
```

##### Elvis
```
console.log ?. object.b.c
console.log ?. object.b.x
console.log ?. object.x.y
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
