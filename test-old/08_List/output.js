const numbers = [1, 2, 3, 4]
console.log(numbers)

const [first, second, ...rest] = numbers
console.log(first)
console.log(second)
console.log(rest)

const fiveNumbers = [...numbers, 5]
console.log(fiveNumbers)

const nextNumbers = numbers.map(number => number + 1)
console.log(nextNumbers)
