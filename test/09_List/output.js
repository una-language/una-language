const numbers = Sova.list(1, 2, 3, 4)
console.log(numbers)
const [first, second] = numbers
console.log(first)
console.log(second)

const fiveNumbers = numbers.add(5)
console.log(fiveNumbers)
const nextNumbers = numbers.map(number => number + 1)
console.log(nextNumbers)
console.log(numbers.get(2))
