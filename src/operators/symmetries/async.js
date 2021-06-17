module.exports = ({ transformFunction, translateFunction, validateParametersCount }) => [
  {
    match: '-->',
    transform: transformFunction,
    translate: (translate, operator, operands) => `async ${translateFunction(translate, operands)}`,
    validate: validateParametersCount(2)
  },
  {
    match: '<--',
    translate: (translate, operator, operands) =>
      operands.length > 1
        ? `await (async ${translateFunction(translate, [[], ...operands])})()`
        : `await ${translate(operands[0])}`,
    validate: validateParametersCount(1)
  }
]
