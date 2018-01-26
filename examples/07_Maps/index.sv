>> :

= e 3
= object :
  a 1
  b :
    c 2.0
    d 'Hello'
  e
  f | 4 5 6

>> object
>> object.a
>> object.b
>> object.b.c
>> object.b.d
>> object.e
>> object.f


:= object a (b c d) f

>> a
>> c
>> d
>> f

>> ?. object.b.c
>> ?. object.b.x
>> ?. object.x.y
