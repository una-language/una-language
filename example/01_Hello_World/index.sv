= getObject -> (number)
  :
    a 1
    b :
      run -> (another) (+ number another)

console.log
  (. (getObject 1) b run) 2
