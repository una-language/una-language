const parse = require('./parse')
const prettier = require('prettier')
const prettierOptions = { parser: 'babel', printWidth: 120, semi: false, singleQuote: true }
const transform = require('./transform')
const translate = require('./translate')

module.exports = text => {
    const expressions = parse(text)
    const js = expressions.map(transform).map(translate).join('\n')
    return prettier.format(js, prettierOptions)
}
