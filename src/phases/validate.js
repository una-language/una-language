module.exports = findOperator => {
  const validate = expression => {
    if (!Array.isArray(expression)) return expression

    const [operator, ...operands] = expression
    if (!operator) return expression

    const validateOperator = findOperator(operator, 'validate')
    if (validateOperator) validateOperator(operator, operands)
    if (operands.length > 0) operands.map(validate)

    return expression
  }

  return expressions => expressions.map(validate)
}
