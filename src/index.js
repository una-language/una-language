const parse = require('./parse')
const prettier = require('prettier')
const prettierOptions = {
    arrowParens: 'avoid',
    parser: 'babel',
    printWidth: 120,
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none'
}
const setDefaultConfig = require('./config')

module.exports = (text, config = {}) => {
    config = setDefaultConfig(config)

    const translate = require('./translate')(config)
    const transform = require('./transform')

    const expressions = parse(text)
    const js = expressions.map(transform).map(translate).join(';\n')
    return prettier.format(js, prettierOptions)
}
