= first true
= second false

console.log first
console.log second

console.log (! second)
console.log (&& true true true)
console.log (&& true false true)
console.log (|| false false false)
console.log (|| false true false)

console.log (> 2 1)
console.log (< 1 2)
console.log (>= 1 1)
console.log (<= 1 1)
console.log (== 1 "1")
console.log (=== 1 1)
console.log (!= 1 2)
console.log (!== 1 "1")

console.log
  ? (> 2 1) 15 30
