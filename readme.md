[![npm version](https://img.shields.io/npm/v/una-language)](https://badge.fury.io/js/una-language)
[![License: MIT](https://img.shields.io/npm/l/una-language)](https://opensource.org/licenses/MIT)
![test](https://github.com/sergeyshpadyrev/una/workflows/test/badge.svg?branch=master)

**If you like this project, please support it with a star** 🌟

# Una

Una is a functional programming language that is being transpiled to JavaScript and looks like the bastard son of Lisp, JavaScript and Python.

## Installation

Install transpiler and babel plugin:

```
npm i --save-dev una-language babel-plugin-una-language
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

// TODO add info about passing extension to babel-node to package.json

If you have problems setting it up you can check out [our Express example](example/express)

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

If you have problems setting it up you can check out [our React example](example/react)

#### React Native

Add `una` file extension to `metro.config.js` like this:

```javascript
module.exports = {
    resolver: {
        sourceExts: [..., 'una']
    }
}
```

If you have problems setting it up you can check out [our React Native example](example/react-native)

## Syntax

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

#### Key operation

. - used for object[key]
. - used for array[index]
. - used for {[key]: value} (. key value)

#### Expansion

Add here that ... works just like in JavaScript

## What's next?

<ul>
<li>Add error throwing</li>
<li>Add comments</li>
<li>Add regular expressions</li>
<li>Add bit operators</li>
<li>Create a Visual Studio Code syntax highlighting plugin</li>
<li>Create a website on github.io</li>
<li>Create REPL</li>
</ul>
