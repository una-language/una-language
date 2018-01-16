= next
  -> number
    + number 1

console.log (next 2)

= doubleFirstAndAddSecond -> (first second)
  = doubled * first 2
  + doubled second

console.log
  doubleFirstAndAddSecond 3 7

= numbers | 1 2 3 4

console.log
  numbers.map next
