const translate = expression => {
  const [applicator, ...parameters] = expression
  console.log('---')
  console.log(applicator)
  console.log(parameters)
  console.log('---')
}

module.exports = translate
