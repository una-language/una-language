const parse = require('./parse')
const prettier = require('prettier')
const transform = require('./transform')

module.exports = text => {
    const tree = parse(text)
    const js = transform(tree)
    return prettier.format(js, { parser: 'babel', printWidth: 120, semi: false, singleQuote: true })
}
