module.exports = operators => {
  const transformRules = {
    ...require('./transform.rules')
  }
  const transform = raw => {
    if (!Array.isArray(raw)) return raw
    if (raw.length === 0) return raw
    if (raw.length === 1) return transform(raw[0])

    const [operator, ...operands] = raw
    return transformRules.hasOwnProperty(operator)
      ? transformRules[operator](transform, operator, operands)
      : raw.map(transform)
  }

  return expressions => expressions.map(transform)
}
