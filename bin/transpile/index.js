const parse = require('./parse')
const prettier = require('prettier')
const translate = require('./translate')

module.exports = code => {
  const expressions = parse(code)
  const translatedExpressions = expressions.map(translate).join('\n')
  return prettier.format(translatedExpressions, { printWidth: 120, semi: false, singleQuote: true })
}
