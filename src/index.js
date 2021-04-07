const join = require('./phases/join')
const parse = require('././phases/parse')
const prettify = require('./phases/prettify')
const setDefaultConfig = require('./config')
const transform = require('./phases/transform')
const translate = require('./phases/translate')

const phases = [parse, transform, translate, join, prettify]

module.exports = (code, options = {}) => {
    const config = setDefaultConfig(options)
    const pipeline = phases.map(phase => phase(config))
    return pipeline.reduce((data, phase) => phase(data), code)
}
