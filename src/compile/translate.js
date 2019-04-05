const application = (head, ...tail) => `${head}(${tail.map(expression).join(', ')})`

const expression = ast => {
    if (!Array.isArray(ast)) return value(ast)
    if (ast.length === 0) return `()`
    if (ast.length === 1) return expression(ast[0])

    const [head, ...tail] = ast
    if (languageConstructions.hasOwnProperty(head)) return languageConstructions[head](...tail)
    // if (head.startsWith('.')) // method application ///check ...array to work

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
        !!elseCase
            ? `${expression(ifCondition)} ? ${expression(thenCase)} : ${expression(elseCase)}`
            : `if (${expression(ifCondition)}) {${expression(thenCase)}}`,

    '|': (...elements) => `[${elements.map(expression).join(', ')}]`,
    ':': () => null, // map

    '->': func, // function (check that last line is return but can already have <- sign)
    '<-': (...returningValue) => `return ${expression(returningValue)}`,

    '-->': (...parameters) => `async ${func(...parameters)}`, // async function
    '<--': (...parameters) => `await ${expression(parameters)}`, // await

    '=->': () => null, // require
    '<-=': exportedValue => `module.exports = ${expression(exportedValue)}`,

    '+': nary('+'),
    '-': (...parameters) => (parameters.length > 1 ? nary(...parameters) : unary(...parameters)),
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

const value = ast => ast

module.exports = expression
