module.exports = ({ validateParametersCount }) => [
  {
    match: 'new',
    translate: (translate, operator, operands) =>
      `(new ${translate(operands[0])}(${operands.slice(1).map(translate).join(', ')}))`,
    validate: validateParametersCount(1)
  },
  {
    match: 'typeof',
    translate: (translate, operator, operands) => `typeof ${translate(operands[0])}`,
    validate: validateParametersCount(1, 1)
  },
  {
    match: 'instanceof',
    translate: (translate, operator, operands) => `${translate(operands[0])} instanceof ${translate(operands[1])}`,
    validate: validateParametersCount(2, 2)
  }
]
