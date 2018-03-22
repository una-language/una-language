const evaluate = require('./evaluate')
const operators = require('./operators')
const parse = require('./parse')
const prettier = require('prettier')
const replace = require('./replace')

module.exports = code => {
  const parsed = parse(code)
  console.log(parsed)
  const replaced = replace(parsed)
  const evaluator = evaluate(operators)
  const evaluated = replaced.map(evaluator).join('\n')
  const withLib = `require("sova-standard-library");\n${evaluated}`

  return prettier.format(withLib)
}
