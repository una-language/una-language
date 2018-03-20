= fibonacci -> number
  ? (<= number 1)
    number
    +
     fibonacci (- number 1)
     fibonacci (- number 2)

>> fibonacci 7

const fibonacci = number =>
  number <= 1 ? number : fibonacci(number - 1) + fibonacci(number-2)

console.log(fibonacci(7))
