module.exports = ({ nary, unary, validateParametersCount }) => [
  { match: '!!', translate: unary(), validate: validateParametersCount(1, 1) },
  { match: '??', translate: nary(), validate: validateParametersCount(2) },
  {
    match: '..',
    translate: (translate, operator, operands) => `${translate(operands[0])} = ${translate(operands[1])}`,
    validate: validateParametersCount(2, 2)
  }
]
