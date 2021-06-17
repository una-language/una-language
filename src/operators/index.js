const utils = require('./utils')

const createOperators = config => {
  const create = operatorCreator => operatorCreator(utils, config)
  return [
    ...create(require('./basic/abstraction')),
    ...create(require('./basic/arithmetical')),
    ...create(require('./basic/bitwise')),
    ...create(require('./basic/comparison')),
    ...create(require('./basic/conditional')),
    ...create(require('./basic/data')),
    ...create(require('./basic/dataSpecific')),
    ...create(require('./basic/javascriptSpecific')),
    ...create(require('./basic/logical')),
    ...create(require('./basic/nullish')),
    ...create(require('./basic/string')),
    ...create(require('./symmetries/async')),
    ...create(require('./symmetries/chaining')),
    ...create(require('./symmetries/error')),
    ...create(require('./symmetries/module')),
    ...create(require('./symmetries/sync')),
    ...config.customOperators
  ]
}

module.exports = config => {
  const operators = createOperators(config)
  return (value, method) => {
    const foundOperator = operators.find(operator => {
      const isOperatorMatchFunction = typeof operator.match === 'function'
      return isOperatorMatchFunction ? operator.match(value) : operator.match === value
    })
    return foundOperator && foundOperator[method]
  }
}
