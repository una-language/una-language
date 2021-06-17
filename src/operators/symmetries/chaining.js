const transformPipeline = (operands, orderFirst) => {
  if (operands.length === 1) return operands
  const [first, second, ...rest] = operands
  const application =
    Array.isArray(second) && typeof second !== 'string'
      ? orderFirst
        ? [second[0], first, ...second.slice(1)]
        : [...second, first]
      : [second, first]
  return transformPipeline([application, ...rest], orderFirst)
}

module.exports = ({ validateParametersCount }) => [
  {
    match: '|>',
    transform: (transform, operator, operands) => transform(transformPipeline(operands, false)),
    validate: validateParametersCount(2)
  },
  {
    match: '<|',
    transform: (transform, operator, operands) => transform(transformPipeline(operands, true)),
    validate: validateParametersCount(2)
  }
]
