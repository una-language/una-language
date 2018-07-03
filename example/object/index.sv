console.log '--------------------- Object ---------------------'

= object :
  a 1
  b :
    c 2
    d . 3 4 5
  e 6
console.log object

= (: a (b : c d) e:renamed) object
console.log a
console.log c
console.log d
console.log renamed
