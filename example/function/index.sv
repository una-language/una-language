console.log '--------------------- Function ---------------------'

= addOne -> (. number) (+ number 1)
console.log (addOne 2)

= sum -> (. first second)
  + first second
console.log (sum 1 2)

= parse -> (. (: a (b : c)))
  + a c
= object :
  a 1
  b :
    c 2
console.log (parse object)

= getSomething -> () 3
console.log (getSomething())

= calced <-
  = s1 1
  = s2 2
  + s1 s2

console.log calced
