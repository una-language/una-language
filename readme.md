[![npm version](https://img.shields.io/npm/v/una-language)](https://badge.fury.io/js/una-language)
[![License: MIT](https://img.shields.io/npm/l/una-language)](https://opensource.org/licenses/MIT)
![test](https://github.com/sergeyshpadyrev/una/workflows/test/badge.svg?branch=master)

# Una

<i>Una</i> is a functional programming language that transpiles to JavaScript and looks like the bastard son of Lisp and Python.

**If you liked this project, please support it with a star** 🌟

## Installation

To use <i>Una</i> in your project you need to install babel plugin:

```
npm i --save-dev babel-plugin-una-language
```

or

```
yarn add -D babel-plugin-una-language
```

then add the plugin to your babel config:

```
plugins: ['una-language']
```

TODO: write here about adding extension option to nodejs, webpack and metro packagers

## Babel plugin options

modules - "require" | "import" (default : 'import')

## Documentation

### Assignment

Let's start with assignment

```
= name "John"
= number 1
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

#### Pattern matching

```
<- count
    ? (= value 0) 1
    ? (= value 1) 2
    ? (< value 10) 3
    4
```

### Collections

#### List

::

#### Map

:

Add here that ... works just like in JavaScript

#### Key operation

.

## What's next?

<ul>
<li>Comments</li>
<li>Bit operators</li>
<li>Regular expressions</li>
<li>Visual Studio Code syntax highlighting plugin</li>
<li>github.io site creation</li>
<li>REPL</li>
</ul>
