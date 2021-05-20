const createOperators = require('./operators')
const join = require('./phases/join')
const parse = require('././phases/parse')
const setDefaultConfig = require('./config')
const transform = require('./phases/transform')
const translate = require('./phases/translate')

module.exports = (code, options = {}) => {
  const config = setDefaultConfig(options)
  const operators = createOperators(config)
  const phases = [parse, transform(operators), translate(operators), join]
  return phases.reduce((data, phase) => phase(data), code)
}
