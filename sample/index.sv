=-> './jsthing'

= checkNumber -> number
  ? (=== number 1) (<- 'One')
  ? (=== number 2) (<- 'Two')
  ? (<= number 9) (<- 'From three to nine')
  <- 'Ten or more'

console.log (checkNumber 6)

.log console 1
