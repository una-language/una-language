const parse = require('./parse')
const prettier = require('prettier')
const translate = require('./translate')

module.exports = code => {
  const parsed = parse(code)
  const translated = parsed.map(translate).join('\n')
  return prettier.format(translated, { parser: 'babylon', printWidth: 120, semi: false, singleQuote: true })
}
