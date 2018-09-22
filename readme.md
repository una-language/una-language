# Sova

<i>Sova</i> is a functional programming language inspired by Lisp, Python and JavaScript

## WARNING!!!
_Sova_ is experimental yet. It's not production ready

## Features
- Lisp-like syntax
- Python-like indentation structure
- Transpiling to JavaScript

## Showcase
```
= a 1
= b 2
 
console.log
  ? (> a b) 'Greater' 'Less'
```
transpiles to:
```javascript
const a = 1
const b = 1

console.log(a > b ? 'Greater' : 'Less')
```

## [Documentation](https://github.com/sergeyshpadyrev/sova/wiki)

## [Examples](https://github.com/sergeyshpadyrev/sova/tree/master/example)
