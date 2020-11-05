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

### Basic

#### Assignment

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

#### Arithmetical operators

Una has all basic arithmetical operators that work the same as in JavaScript:

-   `+` - addition
-   `-` - subtraction
-   `*` - multiplication
-   `/` - division
-   `%` - modulo

Example:

```
= a (+ 1 2)
= b (- 2 1)
= c (* 3 2)
= d (/ 4 2)
= e (% 5 2)
```

All of these operators can get any amount of parameters more than two:

```
= a (+ 1 2 3 4)
```

And `-` can also take one parameter:

```
= a (- 1)
```

But it can be written even simpler:

```
= a -1
```

One more example with the result equals `25`:

```
= a +
  * 2 4
  / 9 3
  + (* 3 2) (/ 4 2)
  *
    + 1 2
    / 6 3
```

#### Comparison operators

Una has all basic comparison operators that work the same as in JavaScript:

-   `==` - strictly equals (like `===` in JavaScript)
-   `!=` - not strictly equals (like `!==` in JavaScript)
-   `~=` - not nonstrictly equals (like `==` in JavaScript)
-   `!~=` - not nonstrictly equals (like `!=` in JavaScript)
-   `>` - greater
-   `>=` - greater or equals
-   `<` - less
-   `<=` - less or equals

Example:

```
= a (== 1 1)
= b (~= 1 '1')
= c (!= 1 '1')
= d (!~= 1 '2')
= e (> 2 1)
= f (>= 2 1)
= g (< 1 2)
= h (<= 1 2)
```

#### Logical operators

Una has all basic logical operators that work the same as in JavaScript:

-   `&` - and
-   `|` - or
-   `!` - not

Example:

```
= a (& true false)
= b (| true false)
= c (! true)
```

`&` and `|` operators can get any amount of parameters:

```
= a (& b c true)
= d (| e f false)
```

`!` operator can be written even simpler:

```
= a !b
```

#### Conditional operators

Una has three conditional operators:

-   `?` - ternary
-   `?!` - binary returnable
-   `??` - switch case

Ternary works just like in JavaScript:

```
= value
  ? (> 2 1) "Greater" "Less"
```

Binary returnable conditional operator is used in sync/async functions and sync/async computations to return value by some condition. For example, following code in function will return `"One"` if `number` equals `1`:

```
?! (== number 1) "One"
```

Switch-case conditional operator works justl like in JavaScript except of it always return:

```

```

### Collections

#### List

::

#### Map

:

#### Work with collections

. - used for object[key]
. - used for array[index]
. - used for {[key]: value} (. key value)
. - used for .map array e.g.

#### Expansion

Add here that ... works just like in JavaScript

### Symmetries

Una has four symmetries: sync symmetry, async symmetry, error symmetry and module symmetry.

#### Sync symmetry

##### ->

Right sync arrow is used for function creation. First parameter is function parameters. Last parameter is return of the function. All parameters between are simple code lines.

```
= sum -> (x y)
  + x y

= onePlusTwo -> ()
  = one 1
  = two 2
  + one two
```

If you need to return something before last line you can use binary returnable conditional operator `?!`:

```
= func -> (x y)
  ?! (== x 0) "Nothing"
  = sum (+ x y)
  ? (> sum 5)
    "Great"
    "Not so great"

```

Calling function is just an application of it to parameters:

```
= a (sum 1 2)
= b sum 1 2
= c
  sum 1 2
= d sum
  1
  2
```

To call parameterless function just use `()`

```
= randomNumber
  Math.random ()
```

##### <-

Write here about evaluation of multiple lines

```
-> ()
   ? true
     <- (console.log 1)
     <- (console.log 2)
```

##### Use with binary conditional operator

```
<-
  ?! (== value 0) 1
  ?! (== value 1) 2
  ?! (< value 10) 3
  4
```

#### Asynchronous computation symmetry

##### -->

##### <--

Write here about await
Write here about await of multiple lines (it works just as <-)

#### Error symmetry

##### |->

Throw error

##### <-|

Try catch

#### Module symmetry

##### =->

##### <-=

<-= a
<-= = a 1

## Interop with JavaScript

### Basic

### Modules

### React and React Native

Write here about `createElement` instead of JSX

For better understanding you can check out [our React example](example/react) and [our React Native example](example/react-native)

## Next work

What is going to be done soon?

<ul>
<li>Class instanciation (`new` operator)</li>
<li>Regular expressions</li>
<li>Comments</li>
<li>Bit operators</li>
<li>Create a Visual Studio Code syntax highlighting plugin</li>
<li>Create a website on github.io</li>
<li>Create REPL</li>
</ul>
