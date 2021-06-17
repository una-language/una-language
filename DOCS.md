# Documentation

This documentation can be found [here](https://una-language.com/docs)

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

### NodeJS

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

In case of problems check out [our Node example](https://github.com/una-language/example-node)

### React

I assume that you use `create-react-app`.

You need to use `react-app-rewired` with `customize-cra` to make Una work

Install the tools:

```
npm install --save-dev react-app-rewired customize-cra
```

Add the file `config-overrides.js` with the following content:

```
const { getBabelLoader } = require("customize-cra");

module.exports = {
    webpack:  config => {
        const babel = getBabelLoader(config)
        babel.options.plugins.push('una-language')
        babel.test =  /\.(js|mjs|jsx|ts|tsx|una)$/
        return config
    },
    paths: (config) => {
        config.moduleFileExtensions = [...config.moduleFileExtensions, 'una']
        return config
    }
}
```

In case of problems check out [our React example](https://github.com/una-language/example-react)

### React Native

Add `una` file extension to `metro.config.js` like this:

```javascript
module.exports = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'una']
  }
}
```

In case of problems check out [our React Native example](https://github.com/una-language/example-react-native)

## Getting started

Una is based on the ideas of [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus) created by [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church) in the middle of the 20th century.

It has only two basic operations:

- Application
- Abstraction

Everything else is build upon these two operations.

### Functional programming

Una is a functional language. <br/>
Its syntax is mostly inspired by [LISP](<https://en.wikipedia.org/wiki/Lisp_(programming_language)>). <br/>

The essense of the [functional programming](https://en.wikipedia.org/wiki/Functional_programming) can be represented as a simple pipeline:

```
Data -> Function -> Data
```

Where:

- Data is immutable
- Function is pure (always returns the same output for the same input)

### JavaScript platform

You should consider that Una is not standalone language. <br/>
The transpiler translates Una code to [JavaScript](https://en.wikipedia.org/wiki/JavaScript) and your code is executed by JavaScript interpretuer.

- You can run Una on any platform that supports JavaScript
- You can import JavaScript modules to Una
- You can export Una modules to JavaScript
- You can use almost any library from [npm](https://www.npmjs.com)
- You can create React and React Native applications using Una

## Application

Application order is set by parentheses and indentation.

We can apply `a` to `b` in two different ways:

Using parentheses:

```
(a b)
```

Using indentation:

```
a
  b
```

It's not necessary to wrap the first expression on the line in parentheses. So the application can look just like this:

```
a b
```

### Nested application

Here we apply `a` to the result of application of `b` to `c`.

Using parentheses:

```
a (b c)
```

Using indentation:

```
a
  b c
```

or:

```
a
  b
    c
```

### Example

All the expressions below are equivalent:

```
a (b (c d)) (e (f g))
```

```
a
  b (c d)
  e (f g)
```

```
a
  b
    c d
  e
    f g
```

```
a
  b
    c
      d
  e
    f
      g
```

```
a
  b
    c
      d
  e (f g)
```

```
a
  b (c d)
  e
    f
      g
```

## Abstraction

Operator `=` creates an abstraction of a part of your program under the defined name.

We can declare a name `a` and assign `1` to it:

```
= a 1
```

We can declare a name `b` and assign the result of an application `c` to `d` to it.

```
= b (c d)
```

The transpiler has a special built-in transformation rule for abstraction operator.
If you pass more than two parameters to it, it first applies the second one to all of the following parameters and then assigns the result of the application.

So you can rewrite the example above as:

```
= b c d
```

## Data types

Una uses all the basic JavaScript data types.

### Number

#### Integer

```
1
-1
```

#### Float

```
1.5
-1.5
```

### String

You can declare a string using single or double quotes.

```
'Alice'
"Bob"
```

### Boolean

```
true
false
```

### JavaScript null and undefined

```
null
undefined
```

## Arithmetical operator

### Addition

Symbol: `+` <br/>
Translated to JavaScript [addition operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition) <br/>
It takes 2+ parameters.

```
+ 1 2
+ 1 2 3
```

Also can be used for string concatenation:

```
+ 'Hello, ' 'World!'
```

### Subtraction

Symbol: `-` <br/>
Translated to JavaScript [subtraction operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction) <br/>

If it has 1 parameter it works as unary `-` and negates the number:

```
- 1
```

If it takes 2+ parameters it works as subtraction

```
- 2 1
- 10 3 2
```

### Multiplication

Symbol: `*` <br/>
Translated to JavaScript [multiplication operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Multiplication) <br/>
It takes 2+ parameters.

```
* 2 2
* 2 3 5
```

### Division

Symbol: `/` <br/>
Translated to JavaScript [division operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division) <br/>
It takes 2+ parameters.

```
/ 4 2
/ 30 3 10
```

### Remainder

Symbol: `%` <br/>
Translated to JavaScript [remainder operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) <br/>
It takes 2+ parameters.

```
% 5 2
% 25 7 2
```

### Exponentiation

Symbol: `**` <br/>
Translated to JavaScript [exponentiation operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation) <br/>
It takes 2+ parameters.

```
** 2 2
** 2 3 5
```

### Example

The value of the following expression is `25`:

```
+
  * 2 4
  / 9 3
  + (* 3 2) (/ 4 2)
  *
    + 1 2
    / 6 3
```

## Logical operators

### AND

Symbol: `&` <br/>
Translated to JavaScript [logical AND operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) (`&&`) <br/>
It takes 2+ parameters.

```
& true false
& true false false
```

### OR

Symbol: `|` <br/>
Translated to JavaScript [logical OR operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) (`||`) <br/>
It takes 2+ parameters.

```
| true false
| true false false
```

### NOT

Symbol: `!` <br/>
Translated to JavaScript [logical NOT operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT) (`!`) <br/>
It takes 1 parameter.

```
! true
! false
! a
```

Can be written simpler as:

```
!a
```

## Comparison operators

### Equals

Symbol: `==` <br/>
Translated to JavaScript [strict equality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) (`===`) <br/>
It takes 2 parameters.

```
== a b
```

### Equals with implicit type conversion

Symbol: `~=` <br/>
Translated to JavaScript [equality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) (`==`) <br/>
It takes 2 parameters.

```
~= a b
```

### Not equals

Symbol: `==` <br/>
Translated to JavaScript [strict inequality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_inequality) (`!==`) <br/>
It takes 2 parameters.

```
!= a b
```

### Not equals with implicit type conversion

Symbol: `!~=` <br/>
Translated to JavaScript [inequality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Inequality) (`!=`) <br/>
It takes 2 parameters.

```
!~= a b
```

### Greater

Symbol: `>` <br/>
Translated to JavaScript [greater operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than) (`>`) <br/>
It takes 2 parameters.

```
> 2 1
> a b
```

### Greater or equals

Symbol: `>=` <br/>
Translated to JavaScript [greater or equals operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than_or_equal) (`>=`) <br/>
It takes 2 parameters.

```
>= 2 1
>= a b
```

### Less

Symbol: `<` <br/>
Translated to JavaScript [less operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than) (`<`) <br/>
It takes 2 parameters.

```
< 1 2
< a b
```

### Less or equals

Symbol: `<=` <br/>
Translated to JavaScript [less or equals operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than_or_equal) (`<=`) <br/>
It takes 2 parameters.

```
<= 1 2
<= a b
```

## Conditional operators

### Ternary condition

Symbol: `?` <br/>
Usually takes 3 parameters: condition, true branch expression and false branch expression.

```
? true 2 1
```

Example:

```
= value
  ? (> 2 1) "Greater" "Less"
```

If you pass this operator with only 2 parameters the third one is `undefined`:

```
? (== value 0)
  <- (console.log 'Zero!')

? (> value 10)
  <- (console.log "Greater")
  <- (console.log "Less")
```

### Condition with return

Symbol: `?!` <br/>
Takes 2+ parameters: condition and returnable true branch expression.

Returnable conditional operator `?!` is used in sync/async functions and sync/async computations to return value by some condition.
E.g., the following code in function will return `"One"` if `number` equals `1`:

```
-> (number)
  ?! (== number 1) "One"
  "Two"
```

This operator can have multiline returnable block:

```
?! (== number 1)
  = a 1
  = b 2
  + a b
```

Operator `?!` can't be used as the last or single operator of any block. The folling example shows <b>WRONG</b> usage.

```
= func -> ()
  ?! (> 2 1) 'A'

= value <-
  ?! (> 2 1) 'B'
```

## Nullish operators

### Nullish coalesing

Symbol: `??`. <br/>
Translated to JavaScript [nullish coalesing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator). <br/>
Takes 2+ parameters.

```
?? null 2
```

### Default parameters

Symbol: `..`. <br/>
Takes 2 parameters.

```
.. a 1
```

The following example prints `2`:

```
= add -> ((.. x 1)) (+ x 1)
= result (add ())
console.log(result)
```

The following example prints `1`:

```
= object (: (b 2))
= (: (.. a 1)) object
console.log a
```

## String interpolation

Symbol: `` ` `` <br/>
Translated to JavaScript [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) <br/>
It takes 1+ parameters. <br/>
Each parameter is a string with `${n}` symbols where n is an integer and substitution parameters. <br/>
Substitution parameter can be either value or function.

Example:

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

You can also pass the special interpolation function as the first parameter. E.g., usage of `styled.div` from `styled-components`:

```
= Container `
  styled.div
  'background-color: ${0};'
    -> ((: theme)) theme.colors.red
```

## Bitwise and shift operators

### Bitwise AND

Symbol: `_&` <br/>
Translated to JavaScript [bitwise AND operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND) <br/>
It takes 2+ parameters.

```
_& 0 1
_& 0 1 2
```

### Bitwise OR

Symbol: `_|` <br/>
Translated to JavaScript [bitwise OR operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR) <br/>
It takes 2+ parameters.

```
_| 0 1
_| 0 1 2
```

### Bitwise NOT

Symbol: `_!` <br/>
Translated to JavaScript [bitwise NOT operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) <br/>
It takes 1 parameter.

```
_! 0
```

### Bitwise XOR

Symbol: `_^` <br/>
Translated to JavaScript [bitwise XOR operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR) <br/>
It takes 2+ parameters.

```
_^ 0 1
```

### Right shift

Symbol: `_>>` <br/>
Translated to JavaScript [bitwise right shift operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift) <br/>
It takes 2+ parameters.

```
_>> 0 1
_>> 0 1 2
```

### Right unsigned shift

Symbol: `_>>` <br/>
Translated to JavaScript [bitwise right unsigned shift operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift) <br/>
It takes 2+ parameters.

```
_>>> 0 1
_>>> 0 1 2
```

### Left shift

Symbol: `_<<` <br/>
Translated to JavaScript [bitwise left shift operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift) <br/>
It takes 2+ parameters.

```
_<< 0 1
_<< 0 1 2
```

## JavaScript specific operators

There are a few operators in Una for compatibility with JavaScript

### Class instantiation

Symbol: `new`. <br/>
Translated to JavaScript [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new). <br/>
It takes 1+ parameters: the first one is class name and the rest are constructor parameters.. <br/>

```
new Date

new Date ()

new Cat "red"
```

### Type of

Symbol: `typeof`. <br/>
Translated to JavaScript [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).<br/>
It takes 1 parameter.

```
typeof 'Hello'
```

### Instance of

Symbol: `instanceof`. <br/>
Translated to JavaScript [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof).<br/>
It takes 2 parameters.

```
instanceof func Function
```

## Custom operators

You can create your own custom operators by passing `customOperators` array to babel plugin config.
Operator signature:

```
{
  match: string | (string => boolean),
  transform: (transform, operator, operands) => [],
  translate: (translate, operator, operands) => string,
}
```

Transform rule transforms the code from AST to AST <br/>
Translate rule translates the code from AST to JavaScript

### Example

```
{
  plugins: [
    [
      'una-language',
      {
        customOperators: [
         {
           match: '+++',
           transform: (transform, operator, operands) => [operator, transform(operands[1]), transform(operands[0])],
           translate: (translate, operator, operands) => `${translate(operands[0])} + ${translate(operands[1])}`
         }
        ]
      }
    ]
  ]
}
```

Every time you use this operator in your code like this:

```
console.log (+++ 1 2)
```

Before translating to JavaScript it first transforms to:

```
console.log (+++ 2 1)
```

And translates to JavaScript as:

```
console.log(2 + 1)
```

## Map collection

Symbol: `:` <br/>
Translated to JavaScript object.

### Construction

Takes key-field pairs as parameters.

Example:

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

You can use already declared names as key-field pair:

```
= name 'John'
= user :
  name
  age 13
```

### Deconstruction

You can put a map to first argument of abstraction operator `=`. In this case it deconstructs the value to it's structure and create named abstractions from its elements.

Example:

```
= user : (name 'John') (age 12)
= (: name) user
console.log name
```

You can rename the field while deconstructing:

```
= user : (name 'John') (age 12)
= (: (name title)) user
console.log title
```

You can deconstruct netsted maps:

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

## List collection

Symbol: `::` <br/>
Translated to JavaScript array.

### Construction

Example:

```
= numbers :: 1 2 3
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

You can use already declared names as elements of list:

```
= a 1
= numbers :: a 2 3
```

### Deconstruction

You can put a list to first argument of abstraction operator `=`. In this case it deconstructs the value to it's structure and create named abstractions from its fields.

Example:

```
= numbers :: 1 2 3
= (:: one two three) numbers
console.log one
```

## Field operator

Symbol: `.` <br/>

### Field or element getting

Gets a field from map or an element from list.

Example:

```
= list :: 1 2 3
= map : (a 1) (b 2)

console.log (. list 0)
console.log (. map 'a')
```

### Dynamic field key

Set dynamic key for a map field.
Translated to JavaScript as `{[key]:value}`.

Example:

```
= key 'name'
= value 'John'
= object :
  . key value
```

### Function calls

If you want to call a function that is stored as field in the map you don't need to the following:

```
= numbers :: 1 2 3
= incrementedNumbers
  (. numbers 'map') (-> x (+ x 1))
```

You can just do this:

```
= numbers :: 1 2 3
= incrementedNumbers
  .map numbers (-> x (+ x 1))
```

or even this:

```
= numbers :: 1 2 3
= incrementedNumbers
  numbers.map (-> x (+ x 1))
```

## Optional chaining

Symbol: `?.` <br/>
Translated to JavaScript [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). <br/>

### Optional field getting

You can get `b` field from `a` map in two ways:

```
?. a 'b'
```

or:

```
a?.b
```

### Optional field getting by dynamic key

```
= a : (key 2)
= b 'key'
?. a b
```

### Function calls

```
?.b a
```

equals to:

```
?. a b
```

You can call function `b` if it exists in map `a` with parameter `1` with such syntax:

```
?.b a 1
```

## Expansion operator

Symbol: `...`
Expansion operator `...` works just like in JavaScript for construction and deconstruction of lists and maps.

Can work in two ways. <br/>
Together with value:

```
...a
```

or separated:

```
... a
```

Example:

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

## Sync symmetry

Symmetry of synchronous computations.

### Function

Symbol: `->` <br/>
Translated to JavaScript function.

First parameter is function parameters. <br/>
Last parameter is return of the function. <br/>
All parameters between are simple code lines. <br/>

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

To call parameterless function use `()`

```
= randomNumber
  Math.random ()
```

These functions can be used as lambda functions and be passed as a parameter to another function or can be returned as value from another function.

### Immediately invoked functional expression

Symbol: `<-` <br/>
Translated to JavaScript function.

In the following example result is `3`:

```
= result <-
  = a 1
  = b 2
  + a b
```

It's useful when you need to calculate something based on conditions:

```
<-
  ?! (== value 0) "Zero"
  ?! (== value 1) "One"
  ? (< value 10) "Less than ten" "More than ten"
```

You can use this operator with conditional operator `?` to make non returnable code:

```
-> number
  ? (== number 0)
    <-
      console.log "Number is zero!"
      console.log "Hooray!"
  + number 1
```

## Async symmetry

Symmetry of asynchronous computations.

### Async function

Symbol: `-->` <br/>
Translated to JavaScript [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function)

```
= getUserPosts --> user
  database.loadPosts user.postIds
```

### Await

Symbol: `<--` <br/>
Translated to JavaScript [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

```
= checkIfUserIsAdmin --> userId
  = user <-- (database.loadUserAsync userId)
  == user.role 'admin'
```

You can have multiple lines of code in this operator:

```
= value <--
  = a 1
  = (: b) <-- (getAsync a)
  b
```

## Error symmetry

Symmetry of error throwing and handling.

### Try-catch

Symbol: `|->` <br/>
Translated to JavaScript [try-catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch).

First parameter is catch function. <br/>
Other parameters are try lines. <br/>
Unlike JavaScript `try-catch` operator `|->` in Una always returns some value and it doesn't have `finally` block. <br/>

Example:

```
|->
  <-
    = getName null
    getName ()
  -> error
    console.log error
    'John'
```

If you need to run async code use `<--` instead of `<-` in try or `-->` instead `->` in catch:

```
|->
  <--
    getNameAsync ()
  --> error
    console.log error
    "John"
```

### Throw error

Symbol: `<-|` <br/>
Translated to JavaScript [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw).

Example:

```
= addOneToNumber -> number
  ?! (isNaN number)
    <-| "number is not valid"
  + number 1
```

## Chaining symmetry

Symmetry of chaining.

### Chaining by last parameter

Symbol: `|>` <br/>
Works as transformation rule. <br/>
It takes the result of expression and puts it as the last parameter to the next expression. <br/>

If you want to use such functional programming libraries as `rambda` you will find `|>` operator very useful. <br/>
In the following example `phone` constant equals `'IPHONE'`:

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

### Chaining by first parameter

Symbol: `<|` <br/>
Works as transformation rule. <br/>
It takes the result of the expression and puts it as the second parameter to the next expression. <br/>

Because of "Polish notation" application order it's hard to do chains with functions stored in maps.

Look how ugly it looks:

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

## Module symmetry

Symmetry of module importing and exporting. <br/>

Una modules are fully compatiable with JavaScript. <br/>
You can import JavaScript modules to Una and you can import Una modules to JavaScript. <br/>
For better understanding of how to use it you can look at [this example](https://github.com/una-language/examples/tree/main/nodejs/src/15_module_symmetry)

### Import

Symbol: `=->` <br/>
Translated to JavaScript `require` or `import`.
First parameter is path.
The second parameter is imported object.

If you pass `modules: 'require'` to babel plugin options it works as `require`. <br/>
If you pass `modules: 'import'` or pass nothing to babel plugin options it works as `import`.

You can import module:

```
=-> 'react' React
```

You can deconstruct the imported module

```
=-> 'react' (: createElement)
```

You just import the module without taking anything from it:

```
=-> './index.css'
```

You can import default from module and other fields:

```
=-> 'react' React (: createElement)
```

### Export

Symbol: `<-=` <br/>
Translated to JavaScript `module.exports` or `export` or `export default`.

If you pass `modules: 'require'` to babel plugin options it works as `modules.export =`. <br/>
If you pass `modules: 'import'` or pass nothing to babel plugin options it works as `export` or `export default`.

#### Default module export:

```
<-= a
```

Translates to:

```
export default a
```

or:

```
module.exports = a
```

#### Constant export:

```
<-= = a 1
```

Translates to:

```
export const a = 1
```

or:

```
module.exports.a = 1
```

#### Multiple constants export:

```
<-= ()
  a
  b
  c
  d
```

Translates to:

```
export {a, b, c, d}
```

## JavaScript API

Una is transpiled to JavaScript. <br/>
It means you can use any JavaScript default functions, objects, etc.

Example:

```
console.log 'Hello World!'

= root (document.getElementById 'root')
```

## Regular expressions

Una doesn't have a special syntax for regular expressions but you can use [JavaScript RegExp class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

Example:

```
= regexp new RegExp 'foo*'
console.log (regexp.test 'table football')
```

## React

Una doesn't support JSX. <br/>
Instead of JSX you can use React.createElement, where first parameter is component, second parameter is props and the rest of parameters are children.

Example:

```
=-> 'react' React

= (: (createElement e)) React

= Component -> ((: count name))
  e div (: (style (: backgroundColor 'red')))
    e div : count
    e div : name
```

Another example using [styled-components](https://github.com/styled-components/styled-components) and React hooks:

```
=-> './index.css'
=-> 'react' React
=-> 'react-dom' ReactDOM
=-> './styles' S

= (: (createElement e)) React

= App -> ((: name))
  = (:: count setCount) (React.useState 0)
  e S.Container :
    e S.Hello (: (color 'green')) 'Hello, '
    e S.Name : name
    e S.IncrementCount
      : (onClick (-> () (setCount (+ count 1))))
      'Press me'
    e S.Count : count

ReactDOM.render
  e App (: (name 'John'))
  document.getElementById 'root'
```

For better understanding you can check out [React example](https://github.com/una-language/example-react) and [React Native example](https://github.com/una-language/example-react-native)
