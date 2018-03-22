const operators = require('./operators')

const simplify = expression => {
  if (!Array.isArray(expression)) return expression

  switch (expression.length) {
    case 0:
      return expression
    case 1:
      return simplify(expression[0])
    default:
      return expression.map(simplify)
  }
}

const translateComplex = ([name, ...parameters]) =>
  !!operators[name]
    ? operators[name](translate, parameters)
    : !!name ? `${name}(${parameters.map(translate).join(', ')})` : ''

const translateSimple = expression => {
  const isNumber = !isNaN(parseFloat(expression))
  if (isNumber) return expression

  const isString = expression.startsWith('"') || expression.startsWith("'")
  if (isString) return `\`${expression.substring(1, expression.length - 1)}\``

  const isOperator = !!operators[expression]
  if (isOperator) return operators[expression](translate, [])

  return expression
}

const translate = expression => {
  expression = simplify(expression)
  return Array.isArray(expression) ? translateComplex(expression) : translateSimple(expression)
}

module.exports = translate
