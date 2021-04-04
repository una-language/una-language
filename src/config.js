const prettierOptions = {
    arrowParens: 'avoid',
    parser: 'babel',
    printWidth: 120,
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none'
}

module.exports = config => ({
    modules: config.modules || 'import', // 'import' || 'require'
    prettierOptions
})
