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

Before starting you should understand that Una is being transpiled to JavaScript and most operators in Una work just like in JavaScript. So you have to be familiar with JavaScript to understand how everything work here. If something is not clear you can check out [our NodeJS example](example/nodejs)

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
= z (calculate x y)
```

Or the same with indentation:

```
= z
  calculate x y
```

Or we can write it much simplier without parantheses:

```
= z calculate x y
```

Or even like this:

```
= z calculate
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

-   `?` - ternary condtion
-   `?!` - condition with return

Ternary conditional operator works just like in JavaScript:

```
= value
  ? (> 2 1) "Greater" "Less"
```

You can use this operator with only 2 parameters, in that case the third one will always be undefined:

```
? (== value 0)
  <- (console.log 'Zero!')

? (> value 10)
  <- (console.log "Greater")
  <- (console.log "Less")
```

Returnable conditional operator `?!` is used in sync/async functions and sync/async computations to return value by some condition. For example, following code in function will return `"One"` if `number` equals `1`:

```
?! (== number 1) "One"
```

This operator can have multiline returnable block:

```
?! (== number 1)
  = a 1
  = b 2
  + a b
```

Operator `?!` can't be used as the last or single operator of any block. The folling example shows _wrong_ usage.

```
= func -> ()
  ?! (> 2 1) 'A'

= value <-
  ?! (> 2 1) 'B'
```

This code won't work

#### String interpolation

Operator `\`` is used for string interpolation. Look at this example:

```
= name 'John'
= count 5
= fruit 'apples'

= text `
  'Hello, ${0}' name
  'I have ${0} ${1}'
    count
    fruit

console.log text
```

This code will print:

```
Hello, John
I have 5 apples
```

Also you can pass special interpolation function as first argument. For example, as in `styled-components`:

```
= Container `
  styled.div
  'background-color: ${0};'
    -> ((: theme)) theme.colors.red
```

### Collections

There're two basic collection types in Una:

-   `::` - List - array in JavaScript
-   `:` - Map - object in JavaScript

#### List and map construction

Here's an example of creating a list of numbers

```
= numbers :: 1 2 3
```

Here's an example of creating a map of user:

```
= user :
  name 'John'
  age 13
  parents :
    mother :
      name 'Alice'
      age 42
    father :
      name 'Bob'
      age 39
```

Maps and lists can be nested to each self:

```
= users ::
  : (name 'Alice') (age 32)
  : (name 'Bob') (age 25)

= user :
  name 'Chris'
  posts ::
    : (title 'Post 1') (likes 30)
    : (title 'Post 2') (likes 44)
    : (title 'Post 3') (likes 2)
```

When creating maps and lists you can use already declared consts:

```
= a 1
= numbers :: a 2 3

= name 'John'
= user :
  name
  age 13
```

#### List and map deconstruction

Just as in JavaScript you can deconstruct maps and lists

```
= numbers :: 1 2 3
= (:: one two three) numbers
console.log one

= user : (name 'John') (age 12)
= (: name) user
console.log name
```

When deconstructing maps you can rename the field:

```
= user : (name 'John') (age 12)
= (: (name title)) user
console.log title
```

You can deconstruct netsted maps and lists as well. For example:

```
= user :
  name 'John'
  age 12
  passport :
    id 1
    country 'USA'

= (: (passport (: id))) user
console.log id
```

#### Getting field and element

To get a field from map or element from list you can use `.`:

```
= list :: 1 2 3
= map : (a 1) (b 2)

console.log (. list 0)
console.log (. map 'a')
```

#### Dynamic field key

Also `.` is used to setup dynamic key for a field in map. Just like `{[key]:value}` in JavaScript. Look at the example:

```
= key 'name'
= value 'John'
= object :
  . key value
```

#### Method calls

Also `.` is used to call methods on any object.

```
= numbers :: 1 2 3
= incrementedNumbers
  numbers.map (-> x (+ x 1))
```

is the same as:

```
= numbers :: 1 2 3
= incrementedNumbers
  .map numbers (-> x (+ x 1))
```

It's used when you chain calls of methods on one object. But better look at `<|` chaining operator described futher.

#### Expansion

Expansion operator `...` works just like in JavaScript for construction and deconstruction of lists and maps:

```
= threeNumbers :: 1 2 3
= fiveNumbers :: ...threeNumbers 45
= (:: one ...restNumbers) fiveNumbers

= userFields :
  name 'John'
  age 13

= user :
  id 1
  gender 'm'
  isAlive true
  ...userFields

= (: isAlive ...rest) user
console.log rest
```

### Symmetries

Una has a lot of symmetrical operators.

#### Right arrow of sync symmetry

Right sync arrow `->` is function. First parameter is function parameters. Last parameter is return of the function. All parameters between are simple code lines.

```
= sum -> (x y)
  + x y

= onePlusTwo -> ()
  = one 1
  = two 2
  + one two
```

If you need to return something before last line you can use returnable conditional operator `?!`:

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

These functions can be used as lambda functions and be passed as a parameter to another function or can be returned as value from another function.

#### Left arrow of sync symmetry

Left sync arrow `<-` is immediatly invoked function. So it allows to isolate some part of code and run it.
In following example result immediatly calculates as `3`.

```
= result <-
  = a 1
  = b 2
  + a b
```

It's pretty good when you need to calculate something based on conditions:

```
<-
  ?! (== value 0) "Zero"
  ?! (== value 1) "One"
  ? (< value 10) "Less than ten" "More than ten"
```

Also you can use this operator with conditional operator `?` to make non returnable code:

```
-> number
  ? (== number 0)
    <-
      console.log "Number is zero!"
      console.log "Hooray!"
  + number 1
```

#### Right arrow of async symmetry

Right async arrow `-->` is async function.

```
= getUserPosts --> user
  database.loadPosts user.postIds
```

#### Left arrow of async symmetry

Left async arrow `<--` is await.

```
= checkIfUserIsAdmin --> userId
  = user <-- (database.loadUser userId)
  == user.role 'admin'
```

You can have multiple lines of code in this operator:

```
= value <--
  = a 1
  = (: b) <-- (getAsync a)
  b
```

#### Right arrow of error symmetry

Right error arrow `|->` is try-catch operator. First parameter is catch function. Other parameters are try lines. Unlike JavaScript `try-catch` operator `|->` in Una always returns some value and it doesn't have `finally` block.

```
|->
  <-
    = getName null
    getName ()
  -> error
    console.log error
    'John'
```

If you need to run async code in try catch user `<--` instead of `<-` in try or `-->` instead `->` in catch:

```
|->
  <--
    getNameAsync ()
  --> error
    console.log error
    "John"
```

#### Left arrow of error symmetry

Left error arrow `<-|` is throwing error.

```
= addOneToNumber -> number
  ?! (isNaN number)
    <-| "number is not valid"
  + number 1
```

#### Right arrow of module symmetry

Una modules are fully compatiable with JavaScript. You can import JavaScript modules to Una and you can import Una modules to JavaScript.

Right module arrow `=->` is import.
If you pass `modules: 'require'` to babel plugin options it works as `require`.
If you pass `modules: 'import'` or pass nothing to babel plugin options it works as `import`.

```
=-> './index.css'
=-> 'react' React
=-> 'react' (: createElement)
=-> 'react' React (: createElement)
```

##### Left arrow of module symmetry

Right module arrow `<-=` is export.
If you pass `modules: 'require'` to babel plugin options it works as `modules.export =`.
If you pass `modules: 'import'` or pass nothing to babel plugin options it works as `export`.

Default module export:

```
<-= a
```

Constant export:

```
<-= = a 1
```

Multiple constants export:

```
<-= ()
  a
  b
  c
  d
```

#### Right arrow of chaining symmetry

Right chainging arrow `|>` is chaining by last parameter.
If you want to use such functional programming libraries as `rambda` you will find `|>` operator very useful.
In following example `phone` constant equals `'IPHONE'`:

```
=-> 'ramda' R
= electronics ::
  :
    title ' iPhone '
    type 'phone'

= phones |>
  electronics
  R.find
    R.propEq 'type' 'phone'
  R.prop 'title'
  R.toUpper
  R.trim
```

#### Left arrow of chaining symmetry

Left chainging arrow `<|` is chaining by last parameter.

Because of Lisp-like application order it's hard to do chains with default JavaScript array methods. Look how ugly it looks:

```
= sum .reduce
  .filter
    .map (:: 1 2 3) (-> x (+ x 1))
    -> x (> x 2)
  -> (x y) (+ x y)
  0
```

With `<|` it can be rewritten as:

```
= sum <| (:: 1 2 3)
  .map (-> x (+ x 1))
  .filter (-> x (> x 2))
  .reduce (-> (x y) (+ x y)) 0
```

## Working with React and React Native

There's no JSX in Una. So instead of JSX you should use React.createElement, where first parameter is component, second parameters is passing props, and the rest of parameters are children.

```
=-> 'react' React

= (: (createElement e)) React

= Component -> ((: count name))
  e div (: (style (: backgroundColor 'red')))
    e div (: ()) count
    e div (: ()) name
```

For styling I recommend to use `styled-components`. I will make code much cleaner. Here's the short example of React app with `styled components`:

```
=-> './index.css'
=-> 'react' React
=-> 'react-dom' ReactDOM
=-> './styles' S

= (: (createElement e)) React

= App -> ((: name))
  = (:: count setCount) (React.useState 0)
  e S.Container (: ())
    e S.Hello (: (color 'green')) 'Hello, '
    e S.Name (: ()) name
    e S.IncrementCount
      : (onClick (-> () (setCount (+ count 1))))
      'Press me'
    e S.Count (: ()) count

ReactDOM.render
  e App (: (name 'John'))
  document.getElementById 'root'
```

For better understanding you can check out [our React example](example/react) and [our React Native example](example/react-native)

## Futher work

What is going to be done soon?

-   Add example of how to use Una for Jest tests
-   Switch-case operator `??`
-   Class instanciation (`new` operator)
-   Regular expressions
-   Comments
-   Bit operators?
-   Proper transpiler errors
-   Create a Visual Studio Code syntax highlighting plugin
-   Create a website on github.io
-   Create REPL
-   Rewrite una transpiler to Una
