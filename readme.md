[![npm version](https://img.shields.io/npm/v/una-language)](https://badge.fury.io/js/una-language)
[![License: MIT](https://img.shields.io/npm/l/una-language)](https://opensource.org/licenses/MIT)
![test](https://github.com/sergeyshpadyrev/una/workflows/test/badge.svg?branch=master)

**If you like this project, please support it with a star** 🌟

# Una

Una is a functional programming language that is being transpiled to JavaScript and looks like a bastard son of Lisp, JavaScript and Python.

## Installation

Install transpiler and babel plugin:

```
npm i -D una-language babel-plugin-una-language
```

Add the babel plugin to your `babel.config.js`:

```javascript
{
    plugins: ['una-language']
}
```

Setup your build tool to support transpiling `.una` files to JavaScript:

#### NodeJS

If you use `require` instead of `import` you need to pass `modules: 'require'` property to your plugin configuration in `babel.config.js` like this:

```javascript
{
    plugins: [['una-language', { modules: 'require' }]],
}
```

Add `una` extension to cli properties of `babel` and `babel-node` scripts in `package.json` like this:

```javascript
{
  "scripts": {
      "build": "babel src -d build --extensions .una",
      "start": "babel-node --extensions .una src"
  }
}
```

If you have problems setting it up check out [our Express example](example/express)

#### React

I assume that you use `create-react-app`.

Add `una` file extension to `moduleFileExtensions` in `config/paths.js` like this:

```javascript
const moduleFileExtensions = [..., 'una']
```

Then add `una` file extension to `babel-loader` in `config/webpack.config.js` like this:

```javascript
{
    test: /\.(js|mjs|jsx|ts|tsx|una)$/
}
```

If you have problems setting it up check out [our React example](example/react)

#### React Native

Add `una` file extension to `metro.config.js` like this:

```javascript
module.exports = {
    resolver: {
        sourceExts: [..., 'una']
    }
}
```

If you have problems setting it up check out [our React Native example](example/react-native)

## Syntax

### Application

The most important thing you should know about Una is how application order works.
You can set the application order in two different ways:

-   wrap up expression with parentheses
-   move expression to the next line with additional indentation

Let's look at the example. We won't use real operators, just letters.
Here we apply `a` to `b`:

```
a b
```

Here we apply `a` to the result of application of `b` to `c`:

```
a (b c)
```

This expression we can also write using indentation:

```
a
  b c
```

I think the underlying idea is pretty obvious but let's look at more complicated example:

```
a (b (c d)) (e (f g))
```

It can be writte like this:

```
a
  b (c d)
  e (f g)
```

or even like this:

```
a
  b
    c d
  e
    f g
```

### Assignment

The most used operator in any programming language is assignment `=`. Because of Una is pure functional language `=` is not really assignment but only declaration of a constant.

```
= name 'John'
```

This operator takes its second parameter and assigns it to the first one. If there're more parameters, at first it applies the second parameter to the rest of them and then assigns the result to the first one. Sounds complicated but it's simple. It just means that we can write assigning expression with parantheses:

```
= z (calclulate x y)
```

Or the same with indentation:

```
= z
  calculate x y
```

Or we can write it much simplier without parantheses:

```
= z calclulate x y
```

Or even like this:

```
= z calclulate
  x
  y
```

### Symmetries

Una has three symmetries: synchronous computations symmetry, asynchronous computation symmetry and module symmetry.

#### Synchronous computation symmetry

##### ->

##### <-

Write here about simple assignment
Write here about evaluation of multiple lines

#### Asynchronous computation symmetry

##### -->

##### <--

Write here about await
Write here about await of multiple lines (it works just as <-)

#### Module symmetry

##### =->

##### <-=

<-= a
<-= = a 1

### Arithmetical operators

Write here about +, - (unary and nary), \*, /, %

### Logical operators

Write here about &, |, !

### Comparison operators

Write here about ==, !=, >, <, >=, <=

### Conditional operator

```
? (> a 1) "Greater" "Less"
```

##### Simple if/else

```
= func -> ()
   ? true
     <- (console.log 1)
     <- (console.log 2)

func ()
```

#### Pattern matching

```
<- count
    ? (== value 0) 1
    ? (== value 1) 2
    ? (< value 10) 3
    4
```

### Collections

#### List

::

#### Map

:

#### Key operation

. - used for object[key]
. - used for array[index]
. - used for {[key]: value} (. key value)

#### Expansion

Add here that ... works just like in JavaScript

## What is going to be done soon?

<ul>
<li>Add error throwing</li>
<li>Add comments</li>
<li>Add regular expressions</li>
<li>Add bit operators</li>
<li>Create a Visual Studio Code syntax highlighting plugin</li>
<li>Create a website on github.io</li>
<li>Create REPL</li>
</ul>
