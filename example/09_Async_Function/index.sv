= getNumber ->> (. number)
  number

= run ->> ()
  = number <<- (getNumber 1)
  console.log number

run ()
