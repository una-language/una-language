= addOne -> (. number)
  + number 1

= doubleAndAddOne -> (. number)
  = doubled (* number 2)
  addOne doubled

console.log (doubleAndAddOne 2)
