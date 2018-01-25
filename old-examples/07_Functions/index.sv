= next -> number (+ number 1)

>> (next 2)

= doubleFirstAndAddSecond -> (first second)
  = doubled * first 2
  + doubled second

>>
  doubleFirstAndAddSecond 3 7

= numbers | 1 2 3 4

>>
  numbers.map next
