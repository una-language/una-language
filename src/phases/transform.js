module.exports = findOperator => {
  const transform = raw => {
    if (!Array.isArray(raw)) return raw
    if (raw.length === 0) return raw
    if (raw.length === 1) return transform(raw[0])

    const [operator, ...operands] = raw
    const transformOperator = findOperator(operator, 'transform')
    return transformOperator ? transformOperator(transform, operator, operands) : raw.map(transform)
  }

  return expressions => expressions.map(transform)
}
