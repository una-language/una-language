const createOperators = require('./operators')
const join = require('./phases/join')
const parse = require('././phases/parse')
const setDefaultConfig = require('./config')
const transform = require('./phases/transform')
const translate = require('./phases/translate')
const validate = require('./phases/validate')

module.exports = (code, options = {}) => {
  const config = setDefaultConfig(options)
  const findOperator = createOperators(config)
  const phases = [parse, validate(findOperator), transform(findOperator), translate(findOperator), join]
  return phases.reduce((data, phase) => phase(data), code)
}
