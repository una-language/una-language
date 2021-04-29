const rulesCreator = require('./translate.rules')

module.exports = config => {
  const translateRules = rulesCreator(config)
  const translate = node => {
    if (!Array.isArray(node))
      return translateRules.hasOwnProperty(node) ? translateRules[node](translate, node, []) : node
    if (node.length === 1) return translate(node[0])

    const [value, ...children] = node
    const translateRule = translateRules[value]
    if (translateRule) return translateRule(translate, value, children)

    if (typeof value === 'string' && value.startsWith('.') && value.length > 1) {
      const field = `${translate(children[0])}.${value.substring(1)}`
      return children.length > 1 ? `${field}(${children.slice(1).map(translate).join(', ')})` : field
    }

    return !!children && children.length > 0 ? `${translate(value)}(${children.map(translate).join(', ')})` : value
  }

  return expressions => expressions.map(translate)
}
