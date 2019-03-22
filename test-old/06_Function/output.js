const next = number => number + 1
console.log(next(1))
const doubleAndAddOne = number => {
  const doubled = number * 2
  return next(doubled)
}
console.log(doubleAndAddOne(2))
const sum = (first, second) => first + second
console.log(sum(2, 3))

const adder = addition => number => number + addition
const addOne = adder(1)
console.log(addOne(1))
console.log(addOne(3))
