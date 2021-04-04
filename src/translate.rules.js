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

const funcBody = (expression, lines) =>
    lines
        .map((line, index) => (index === lines.length - 1 ? `return ${expression(line)}` : expression(line)))
        .join('; ')
const func = (expression, children) => {
    const [paramsLine, ...lines] = children
    const params = Array.isArray(paramsLine) ? paramsLine.map(expression).join(', ') : expression(paramsLine)
    return lines.length === 1
        ? `(${params}) => (${expression(lines[0])})`
        : `(${params}) => { ${funcBody(expression, lines)} }`
}

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
    '-': optionary,

    '=': (expression, value, children) => `const ${expression(children[0])} = ${expression(children[1])}`,
    '->': (expression, value, children) => func(expression, children),
    '-->': (expression, value, children) => `async ${func(expression, children)}`,

    '<-': (expression, value, children) => `(${func(expression, [[], ...children])})()`,
    '<--': (expression, value, children) =>
        children.length > 1
            ? `await (async ${func(expression, [[], ...children])})()`
            : `await ${expression(children[0])}`,

    '::': (expression, value, children) => `[${children.map(expression).join(', ')}]`
}
