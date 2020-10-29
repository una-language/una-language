const parser = require('@babel/parser')
const una = require('una-language')

module.exports = (_, config) => ({
    parserOverride: (code, options) =>
        parser.parse(options.sourceFileName.endsWith('.una') ? una(code, config) : code, options)
})
