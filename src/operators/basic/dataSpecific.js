module.exports = ({ validateParametersCount }) => [
  { match: '...', translate: (translate, operator, operands) => `...${translate(operands[0])}` },
  { match: '.', translate: (translate, operator, operands) => `${translate(operands[0])}[${translate(operands[1])}]` },
  {
    match: '?.',
    translate: (translate, operator, operands) => `${translate(operands[0])}?.[${translate(operands[1])}]`,
    validate: validateParametersCount(2, 3)
  },
  {
    match: value =>
      typeof value === 'string' &&
      ['.', '?.'].some(point => value.startsWith(point) && value.length > point.length && value[point.length] !== '.'),
    translate: (translate, operator, operands) => {
      const field = `${translate(operands[0])}${operator}`
      return operands.length > 1 ? `${field}(${operands.slice(1).map(translate).join(', ')})` : field
    }
  }
]
