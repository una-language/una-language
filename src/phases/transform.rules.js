const pipeline = (operands, orderFirst) => {
  if (operands.length === 1) return operands
  const [first, second, ...rest] = operands
  const application =
    Array.isArray(second) && typeof second !== 'string'
      ? orderFirst
        ? [second[0], first, ...second.slice(1)]
        : [...second, first]
      : [second, first]
  return pipeline([application, ...rest], orderFirst)
}

const func = (transform, operator, operands) => {
  const parameters = Array.isArray(operands[0]) ? operands[0].map(transform) : [transform(operands[0])]
  return [operator, parameters, ...operands.slice(1).map(transform)]
}

module.exports = {
  '=': (transform, operator, operands) => [operator, transform(operands[0]), transform(operands.slice(1))],
  '<-=': (transform, operator, operands) => [operator, transform(operands)],
  '->': func,
  '-->': func,
  '<|': (transform, operator, operands) => transform(pipeline(operands, true)),
  '|>': (transform, operator, operands) => transform(pipeline(operands, false))
}
