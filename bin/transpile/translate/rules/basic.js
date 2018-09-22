const unary = symbol => (translate, [operand]) => `(${symbol}${translate(operand)})`
const binary = symbol => (translate, [first, second]) => nary(symbol)(translate, [first, second])
const nary = symbol => (translate, operands) => `(${operands.map(translate).join(` ${symbol} `)})`
const variable = symbol => (translate, operands) =>
  operands.length === 1 ? unary(symbol)(translate, operands) : nary(symbol)(translate, operands)

module.exports = {
  '+': nary('+'),
  '-': variable('-'),
  '*': nary('*'),
  '/': nary('/'),
  '%': nary('%'),

  '&&': nary('&&'),
  '||': nary('||'),
  '!': unary('!'),

  '>': binary('>'),
  '>=': binary('>='),
  '<': binary('<'),
  '<=': binary('<='),

  '==': binary('=='),
  '!=': binary('!='),
  '===': binary('==='),
  '!==': binary('!==')
}
