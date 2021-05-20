module.exports = operators => {
  const translate = node => {
    if (!Array.isArray(node)) {
      const nodeOperator = operators(node)
      return !!nodeOperator ? nodeOperator.translate(translate, node, []) : node
    }

    if (node.length === 1) return translate(node[0])

    const [operator, ...operands] = node
    const translateRule = operators(operator)
    if (translateRule) return translateRule.translate(translate, operator, operands)

    if (
      typeof operator === 'string' &&
      ['.', '?.'].some(point => operator.startsWith(point) && operator.length > point.length)
    ) {
      const field = `${translate(operands[0])}${operator}`
      return operands.length > 1 ? `${field}(${operands.slice(1).map(translate).join(', ')})` : field
    }

    return !!operands && operands.length > 0
      ? `${translate(operator)}(${operands.map(translate).join(', ')})`
      : operator
  }

  return expressions => expressions.map(translate)
}
