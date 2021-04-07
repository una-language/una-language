const prettier = require('prettier')

const options = {
    arrowParens: 'avoid',
    parser: 'babel',
    printWidth: 120,
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none'
}

module.exports = config => code => prettier.format(code, options)