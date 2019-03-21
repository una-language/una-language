= people _
  | (name "Alice") (age 24)
  | (name "Bob") (age 15)
  | (name "Chris") (age 46)

= (_ (| name age)) people
print name //Alice
print age //24
