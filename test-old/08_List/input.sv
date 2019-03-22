= numbers | 1 2 3 4
console.log numbers

= (| first second ...rest) numbers
console.log first
console.log second
console.log rest

= fiveNumbers | ...numbers 5
console.log fiveNumbers

= nextNumbers numbers.map
  -> (number) (+ number 1)

console.log nextNumbers
