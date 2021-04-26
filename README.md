[![npm version](https://img.shields.io/npm/v/una-language)](https://badge.fury.io/js/una-language)
[![License: MIT](https://img.shields.io/npm/l/una-language)](https://opensource.org/licenses/MIT)
![test](https://github.com/sergeyshpadyrev/una/workflows/test/badge.svg?branch=master)

**If you like this project, please support it with a star** 🌟

# Una

The functional programming language.

[Documentation](https://una-language.com/docs/) <br/>
[Examples](https://github.com/una-language/examples)

## Showcase

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
