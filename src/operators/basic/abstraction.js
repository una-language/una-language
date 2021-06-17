module.exports = ({ nary, optionary, validateParametersCount }) => [
  {
    match: '=',
    transform: (transform, operator, operands) => [operator, transform(operands[0]), transform(operands.slice(1))],
    translate: (translate, operator, operands) => `const ${translate(operands[0])} = ${translate(operands[1])}`,
    validate: validateParametersCount(2)
  }
]
