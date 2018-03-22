= next -> number (+ number 1)
>> next 2

= doubleFirstAndAddSecond -> (first second)
  = doubled * first 2
  + doubled second

>> doubleFirstAndAddSecond 3 7

= numbers | 1 2 3 4
>> numbers.map next

= a <-
  >> 'Evaluate a'
  + 1 2

= b --
  >> 'Evaluate b'
  + 1 1

>> a
>> b
>> a
>> b

= add
  -> first
    -> second
      + first second

= addOne add 1

>> (addOne 3)
