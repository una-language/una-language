= first true
= second false

>> first
>> second

>> (! second)
>> (&& true true true)
>> (&& true false true)
>> (|| false false false)
>> (|| false true false)

>> (> 2 1)
>> (< 1 2)
>> (>= 1 1)
>> (<= 1 1)
>> (== 1 "1")
>> (=== 1 1)
>> (!= 1 2)
>> (!== 1 "1")

>>
  ? (> 2 1) 15 30
