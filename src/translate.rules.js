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
    '?': (expression, value, children) =>
        `(${expression(children[0])} ? ${expression(children[1])} : ${
            children.length > 2 ? expression(children[2]) : 'undefined'
        })`,
    '?!': (expression, value, children) => {
        const returnBodyLines = children.slice(1)
        const returnBody =
            returnBodyLines.length === 1
                ? `return ${expression(returnBodyLines[0])}`
                : `{ ${funcBody(expression, returnBodyLines)} }`
        return `if (${expression(children[0])}) ${returnBody}`
    },
    '->': (expression, value, children) => func(expression, children),
    '-->': (expression, value, children) => `async ${func(expression, children)}`,
    '|->': (expression, value, children) => {
        const tryBody = funcBody(expression, children[0].slice(1))
        const catchBody = funcBody(expression, children[1].slice(2))
        const tryCatch = `try { ${tryBody} } catch (${expression(children[1][1])}) { ${catchBody} }`

        const isAsync = children[0][0] === '<--' || children[1][0] === '-->'
        return `${isAsync ? 'await (async ' : '('}() => { ${tryCatch} })()`
    },
    '<-': (expression, value, children) => `(${func(expression, [[], ...children])})()`,
    '<--': (expression, value, children) =>
        children.length > 1
            ? `await (async ${func(expression, [[], ...children])})()`
            : `await ${expression(children[0])}`,
    '<-|': (expression, value, children) => `(() => { throw new Error(${expression(children[0])}) })()`,
    '::': (expression, value, children) => `[${children.map(expression).join(', ')}]`,
    ':': (expression, value, children) =>
        `{${children
            .map(child =>
                typeof child === 'string'
                    ? expression(child)
                    : child.length > 1
                    ? child[0] === '.'
                        ? `[${expression(child[1])}]: ${expression(child.slice(2))}`
                        : `${expression(child[0])}: ${expression(child.slice(1))}`
                    : expression(child[0])
            )
            .join(', ')}}`,
    '.': (expression, value, children) => `${expression(children[0])}[${expression(children[1])}]`,
    '`': (expression, value, children) => {
        const firstChild = Array.isArray(children[0]) ? children[0][0] : children[0]
        const hasIdentifier =
            typeof firstChild === 'string' && !firstChild.startsWith("'") && !firstChild.startsWith('"')
        const identifier = hasIdentifier ? expression(children[0]) : ''
        const lines = children.slice(hasIdentifier ? 1 : 0)

        const interpolatedString = lines
            .map(line => {
                if (typeof line === 'string') return line.substring(1, line.length - 1)

                const [string, ...substitutions] = line
                return substitutions.reduce(
                    (accumulator, substitution, index) =>
                        accumulator.replace(
                            new RegExp(`(?<!\\\\)\\$\\{${index}\\}`, 'g'),
                            `\${${expression(substitution)}}`
                        ),
                    string.substring(1, string.length - 1)
                )
            })
            .join('\n')
        return `${identifier}\`${interpolatedString}\``
    }
}
