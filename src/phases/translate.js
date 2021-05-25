module.exports = findOperator => {
  const translate = expression => {
    if (!Array.isArray(expression)) {
      const translateExpression = findOperator(expression, 'translate')
      return !!translateExpression ? translateExpression(translate, expression, []) : expression
    }

    if (expression.length === 1) return translate(expression[0])

    const [operator, ...operands] = expression
    const translateOperator = findOperator(operator, 'translate')
    if (translateOperator) return translateOperator(translate, operator, operands)

    return !!operands && operands.length > 0
      ? `${translate(operator)}(${operands.map(translate).join(', ')})`
      : operator
  }

  return expressions => expressions.map(translate)
}
