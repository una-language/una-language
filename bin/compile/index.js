const parse = require('./parse')
const prettier = require('prettier')
const translate = require('./translate')

module.exports = input => {
  const tree = parse(input)
  const translated = tree.map(translate).join('\n')
  return prettier.format(translated, {
    printWidth: 120,
    semi: false,
    singleQuote: true
  })
}
