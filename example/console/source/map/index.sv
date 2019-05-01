= map :
  a 1
  b 2
  c :
    d 3
    e 4
  f 'Hello'

console.log map

= (: a (c (: d e))) map

console.log a
console.log d
console.log e
