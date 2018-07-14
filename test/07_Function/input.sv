= next -> (. number) (+ number 1)
console.log (next 1)

= doubleAndAddOne -> (. number)
  = doubled (* number 2)
  next doubled

console.log (doubleAndAddOne 2)

= sum -> (. first second)
  + first second

console.log (sum 2 3)

= adder -> (. addition)
  -> (. number) (+ number addition)

= addOne (adder 1)
console.log (addOne 1)
console.log (addOne 3)
