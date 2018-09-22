const rules = {
  ...require('./rules/basic'),
  ...require('./rules/collections'),
  ...require('./rules/function'),
  ...require('./rules/module'),
  ...require('./rules/syntax')
}

const translate = ({ value, children }) =>
  children && children.length
    ? rules.hasOwnProperty(value)
      ? rules[value](translate, children)
      : `${value}(${children.map(translate).join(', ')})`
    : value.startsWith('"') || value.startsWith("'")
      ? `\`${value.substring(1, value.length - 1)}\``
      : value

module.exports = translate
