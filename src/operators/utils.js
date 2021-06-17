const ary = creator => jsOperator => (translate, operator, operands) =>
  creator(translate, jsOperator || operator, operands)
const unary = ary((translate, operator, operands) => `${operator}${translate(operands[0])}`)
const nary = ary((translate, operator, operands) => `(${operands.map(translate).join(` ${operator} `)})`)
const optionary = ary((translate, operator, operands) =>
  (operands.length > 1 ? nary : unary)(operator)(translate, operator, operands)
)

const translateFunctionBody = (translate, lines) =>
  lines.map((line, index) => (index === lines.length - 1 ? `return ${translate(line)}` : translate(line))).join('; ')
const translateFunction = (translate, operands) => {
  const [rawParams, ...lines] = operands
  const params = rawParams.map(translate).join(', ')
  return lines.length === 1
    ? `(${params}) => (${translate(lines[0])})`
    : `(${params}) => { ${translateFunctionBody(translate, lines)} }`
}
const transformFunction = (transform, operator, operands) => {
  const parameters = Array.isArray(operands[0]) ? operands[0].map(transform) : [transform(operands[0])]
  return [operator, parameters, ...operands.slice(1).map(transform)]
}

const validateParametersCount = (minimumCount, maximumCount) => (operator, operands) => {
  if (operands.length < minimumCount) throw new Error(`${operator} should have at least ${minimumCount} operands`)
  if (maximumCount !== undefined && operands.length > maximumCount)
    throw new Error(`${operator} should have no more than ${maximumCount} operands`)
}

module.exports = {
  nary,
  optionary,
  unary,
  transformFunction,
  translateFunctionBody,
  translateFunction,
  validateParametersCount
}
