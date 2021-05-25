module.exports = findOperator => {
  const transform = expression => {
    if (!Array.isArray(expression)) return expression

    const [operator, ...operands] = expression
    if (!operator) return expression
    if (operands.length === 0) return transform(operator)

    const transformOperator = findOperator(operator, 'transform')
    return transformOperator ? transformOperator(transform, operator, operands) : expression.map(transform)
  }

  return expressions => expressions.map(transform)
}
