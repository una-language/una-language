const operatorMapping = {
    '==': '===',
    '~=': '==',
    '!=': '!==',
    '!~=': '!=',
    '&': '&&',
    '|': '||'
}

const getOperator = value => operatorMapping[value] || value
const unary = (expression, value, children) => `${getOperator(value)}${expression(children[0])}`
const nary = (expression, value, children) => `(${children.map(expression).join(` ${getOperator(value)} `)})`
const optionary = (expression, value, children) => (children.length > 1 ? nary : unary)(expression, value, children)

module.exports = {
    '!': unary,
    '!!': unary,
    '+': nary,
    '*': nary,
    '/': nary,
    '%': nary,
    '&': nary,
    '|': nary,
    '>': nary,
    '>=': nary,
    '<': nary,
    '<=': nary,
    '==': nary,
    '~=': nary,
    '!=': nary,
    '!~=': nary,
    '-': optionary
}
