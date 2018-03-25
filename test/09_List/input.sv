= numbers | 1 2 3 4

console.log numbers

|= numbers first second

console.log first
console.log second

= fiveNumbers numbers.add 5
console.log fiveNumbers

= nextNumbers numbers.map
  -> number (+ number 1)
  
console.log nextNumbers
console.log (numbers.get 2)
