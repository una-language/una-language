const application = (head, ...tail) => `${head}(${tail.map(expression).join(', ')})`

const expression = ast => {
    if (!Array.isArray(ast)) return value(ast)
    if (ast.length === 0) return `()`
    if (ast.length === 1) return expression(ast[0])

    const [head, ...tail] = ast
    if (languageConstructions.hasOwnProperty(head)) return languageConstructions[head](...tail)
    if (head.startsWith('.')) return methodApplication(head, ...tail)

    return application(head, ...tail)
}

const func = (parameters, ...lines) => {
    const last = lines[lines.length - 1]
    const lastTranslated = Array.isArray(last) && last[0] === '<-' ? expression(last) : `return ${expression(last)}`
    const params = Array.isArray(parameters)
        ? parameters.length
            ? parameters.map(expression).join(', ')
            : []
        : [expression(parameters)]
    const body = lines
        .slice(0, -1)
        .map(expression)
        .map(line => `${line};`)
        .join(' ')

    return `(${params}) => {${body} ${lastTranslated};}`
}

const nary = symbol => (...parameters) => `(${parameters.map(expression).join(` ${symbol} `)})`
const unary = symbol => parameter => `(${symbol}${expression(parameter)})`

const languageConstructions = {
    '=': (left, ...right) => `const ${expression(left)} = ${expression(right)};`,
    '?': (ifCondition, thenCase, elseCase) =>
        elseCase !== undefined
            ? `${expression(ifCondition)} ? ${expression(thenCase)} : ${expression(elseCase)}`
            : `if (${expression(ifCondition)}) {${expression(thenCase)}}`,

    '|': (...elements) => `[${elements.map(expression).join(', ')}]`,
    ':': (...fields) => `{${fields.map(mapField).join(', ')}}`,

    '->': func,
    '<-': (...returningValue) => `return ${expression(returningValue)}`,

    '-->': (...parameters) => `async ${func(...parameters)}`,
    '<--': (...parameters) => `await ${expression(parameters)}`,

    '=->': (name, ...parameters) =>
        parameters.length > 0 ? `const ${expression(...parameters)} = require(${name})` : `require(${name})`, // require
    '<-=': exportedValue => `module.exports = ${expression(exportedValue)}`,

    '+': nary('+'),
    '-': (...parameters) => (parameters.length > 1 ? nary('-')(...parameters) : unary('-')(...parameters)),
    '*': nary('*'),
    '/': nary('/'),
    '%': nary('%'),

    '&&': nary('&&'),
    '||': nary('||'),
    '!': unary('!'),

    '>': nary('>'),
    '>=': nary('>='),
    '<': nary('<'),
    '<=': nary('<='),
    '==': nary('=='),
    '!=': nary('!='),
    '===': nary('==='),
    '!==': nary('!==')
}

const mapField = field => {
    if (!Array.isArray(field)) return expression(field)
    const [head, ...tail] = field
    return tail.length ? `${expression(head)} : ${expression(tail)}` : expression(head)
}

const methodApplication = (methodName, container, ...parameters) => {
    const method = methodName
        .split('')
        .slice(1)
        .join('')
    return application(`${expression(container)}.${method}`, ...parameters)
}

const value = ast => ast

module.exports = expression
