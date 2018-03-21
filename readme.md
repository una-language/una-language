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

## Documentation

The documentation for the language lives [here](./documentation) </br>
It describes the syntax and all concepts of the language. It's useful to read it after looking at examples

## Examples

Code examples live [here](./examples) </br>
You can learn the language exploring them and reading documentation sometimes
