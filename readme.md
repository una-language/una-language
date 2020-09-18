# Una

<i>Una</i> is a functional programming language that took the best parts from Javascript, Lisp and Python:

## Features:

<ul>
<li>Una has very simple syntax based on symmetries</li>
<li>Una is being transpiled to JavaScript. So you can start using it in your JavaScript project right now</li>
<li>Una is fully compatible with JavaScript. You can import Una modules from JavaScript and JavaScript modules from Una.</li>
</ul>

**If you liked this project, please support us with a star** 🌟

## Installation

To use <i>Una</i> to your project you need to install babel plugin:

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

TODO: write here about adding extension option to babel, babel-node etc.

## Documentation

### Symmetries

The whole idea of Una is based on three universal symmetries.

#### Synchronous computation symmetry

##### <-

Write here about simple assignment
Write here about evaluation of multiple lines

##### ->

#### Asynchronous computation symmetry

##### <--

Write here about await
Write here about await Promise.all (when multiple operators)

##### -->

#### Module symmetry

##### <-=

##### =->

### Arithmetical operators

Write here about +, - (unary and nary), \*, /, %

### Logical operators

Write here about &, |, !

### Comparison operators

Write here about =, !=, >, <, >=, <=

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
