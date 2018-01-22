= next
  -> number
    + number 1

>_ (next 2)

= doubleFirstAndAddSecond -> (first second)
  = doubled * first 2
  + doubled second

>_
  doubleFirstAndAddSecond 3 7

= numbers | 1 2 3 4

>_
  numbers.map next
