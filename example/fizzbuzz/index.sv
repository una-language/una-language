console.log '--------------------- FizzBuzz ---------------------'

= _ <-- 'lodash'

= numbers (_.range 1 101)
= result numbers.map
  -> (. number)
    ? (! (% number 3))
      ? (! (% number 5)) 'fizzbuzz' 'fizz'
      ? (! (% number 5)) 'buzz' number

console.log result
