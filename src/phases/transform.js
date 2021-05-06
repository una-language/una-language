module.exports = config => {
  const transformRules = {
    ...require('./transform.rules'),
    ...config.rules.transform
  }
  const transform = raw => {
    if (!Array.isArray(raw)) return raw
    if (raw.length === 0) return raw
    if (raw.length === 1) return transform(raw[0])

    const [value, ...children] = raw
    return transformRules.hasOwnProperty(value) ? transformRules[value](transform, value, children) : raw.map(transform)
  }

  return expressions => expressions.map(transform)
}
