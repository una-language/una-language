const parse = require('./parse')
const prettier = require('prettier')
const prettierOptions = { parser: 'babel', printWidth: 120, semi: false, singleQuote: true }
const transform = require('./transform')

module.exports = text => {
    const expressions = parse(text)
    const js = expressions.map(transform).join('\n')
    return prettier.format(js, prettierOptions)
}
