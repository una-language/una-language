= next -> number (+ number 1)
console.log next 2

= doubleFirstAndAddSecond -> (first second)
  = doubled * first 2
  + doubled second

console.log doubleFirstAndAddSecond 3 7

= numbers | 1 2 3 4
console.log numbers.map next

= a <-
  console.log 'translate a'
  + 1 2

= b --
  console.log 'translate b'
  + 1 1

console.log a
console.log b
console.log a
console.log b

= add
  -> first
    -> second
      + first second

= addOne add 1

console.log (addOne 3)
