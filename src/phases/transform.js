module.exports = findOperator => {
  const transform = expression => {
    if (!Array.isArray(expression)) return expression
    if (expression.length === 0) return expression
    if (expression.length === 1) return transform(expression[0])

    const [operator, ...operands] = expression
    const transformOperator = findOperator(operator, 'transform')
    return transformOperator ? transformOperator(transform, operator, operands) : expression.map(transform)
  }

  return expressions => expressions.map(transform)
}
