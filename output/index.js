require('./jsthing')
const checkNumber = number => {
  if (number === 1) {
    return 'One'
  }
  if (number === 2) {
    return 'Two'
  }
  if (number <= 9) {
    return 'From three to nine'
  }
  return 'Ten or more'
}
console.log(checkNumber(6))
console.log(1)

