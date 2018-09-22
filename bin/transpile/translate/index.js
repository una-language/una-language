const rules = require('./operators')

const translate = ({ value, children }) =>
  children && children.length
    ? rules.hasOwnProperty(value)
      ? rules[value](translate, children)
      : `${value}(${children.map(translate).join(', ')})`
    : value.startsWith('"') || value.startsWith("'")
      ? `\`${value.substring(1, value.length - 1)}\``
      : value

module.exports = translate
