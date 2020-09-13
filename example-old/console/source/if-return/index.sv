= checkNumber -> number
  ? (=== number 1) (<- 'One')
  ? (=== number 2) (<- 'Two')
  ? (<= number 9) (<- 'From three to nine')
  'Ten or more'

console.log (checkNumber 1)
console.log (checkNumber 4)
console.log (checkNumber 11)
