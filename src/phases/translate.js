module.exports = findOperator => {
  const translate = node => {
    if (!Array.isArray(node)) {
      const translateNode = findOperator(node, 'translate')
      return !!translateNode ? translateNode(translate, node, []) : node
    }

    if (node.length === 1) return translate(node[0])

    const [operator, ...operands] = node
    const translateOperator = findOperator(operator, 'translate')
    if (translateOperator) return translateOperator(translate, operator, operands)

    return !!operands && operands.length > 0
      ? `${translate(operator)}(${operands.map(translate).join(', ')})`
      : operator
  }

  return expressions => expressions.map(translate)
}
