module.exports = ({ transformFunction, translateFunction, validateParametersCount }) => [
  {
    match: '->',
    transform: transformFunction,
    translate: (translate, operator, operands) => translateFunction(translate, operands),
    validate: validateParametersCount(2)
  },
  {
    match: '<-',
    translate: (translate, operator, operands) => `(${translateFunction(translate, [[], ...operands])})()`,
    validate: validateParametersCount(1)
  }
]
