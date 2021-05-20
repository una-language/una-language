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

    return !!operands && operands.length > 0
      ? `${translate(operator)}(${operands.map(translate).join(', ')})`
      : operator
  }

  return expressions => expressions.map(translate)
}
