const parse = require('./parse')
const prettier = require('prettier')
const translate = require('./translate')

module.exports = code => {
  const expressions = parse(code)
  // console.log(JSON.stringify(expressions))
  const translatedExpressions = expressions.map(translate).join('\n')
  // console.log(prettier.format(translatedExpressions, { printWidth: 120, semi: false, singleQuote: true }))
  return prettier.format(translatedExpressions, { printWidth: 120, semi: false, singleQuote: true })
}
