[![npm version](https://img.shields.io/npm/v/una-language)](https://badge.fury.io/js/una-language)
[![License: MIT](https://img.shields.io/npm/l/una-language)](https://opensource.org/licenses/MIT)
![test](https://github.com/sergeyshpadyrev/una/workflows/test/badge.svg?branch=master)

**If you like this project, please support it with a star** 🌟

# Una

The functional programming language.

## Documentation
[Documentation](https://una-language.com/docs/) <br/>

## Examples
[NodeJS](https://github.com/una-language/example-node) <br/>
[Express](https://github.com/una-language/example-express) <br/>
[React](https://github.com/una-language/example-react) <br/>
[React Native](https://github.com/una-language/example-react-native) <br/>

## Showcase

### Hello World
```
console.log 'Hello, World!'
```

### Fibonacci sequence
This program prints the 10th number of Fibonacci sequence:
```
= fibonacci -> index
  ? (> index 1)
    +
      fibonacci (- index 1) 
      fibonacci (- index 2)
    index

console.log (fibonacci 10)
```
Result should be: `55`

### Adult users average age
This programs prints average age of adult users:
```
= users ::
  : (name 'Alice') (age 12)
  : (name 'Bob') (age 41)
  : (name 'Chris') (age 32)
  : (name 'Diana') (age 56)
  : (name 'Ethan') (age 15)

= adultUsers users.filter (-> user (> user.age 18))
= averageAdultAge /
  adultUsers.reduce (-> (acc user) (+ acc user.age)) 0
  adultUsers.length

console.log averageAdultAge
```
Result should be: `43`
