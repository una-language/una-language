const rules = require('./operators')

const translateSimpleValue = value => {
  if (value.startsWith('"') || value.startsWith("'")) return `\`${value.substring(1, value.length - 1)}\``
  return value
}

const translate = expression => {
  if (!expression.children || !expression.children.length) return translateSimpleValue(expression.value)
  const rule = rules[expression.value]

  return !!rule
    ? rule(translate, expression.children)
    : `${expression.value}(${expression.children.map(translate).join(', ')})`
}

module.exports = translate
