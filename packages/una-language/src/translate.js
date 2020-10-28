const changeSign = value => {
    switch (value) {
        case '==':
            return '==='
        case '!=':
            return '!=='
        case '&':
            return '&&'
        case '|':
            return '||'
        default:
            return value
    }
}

const func = node => {
    const [paramsLine, ...lines] = node.slice(1)
    const params = Array.isArray(paramsLine)
        ? paramsLine.map(expression).join(', ')
        : expression(paramsLine)
    if (lines.length === 1) return `(${params}) => ${expression(lines[0])}`

    const body = lines
        .map((line, index) =>
            index === lines.length - 1 ? `return ${expression(line)}` : expression(line)
        )
        .join('; ')

    return `(${params}) => { ${body} }`
}

const unary = node => `${node[0]}${expression(node[1])}`
const nary = node =>
    `(${node
        .slice(1)
        .map(expression)
        .join(` ${changeSign(node[0])} `)})`

const expression = node => {
    if (!Array.isArray(node)) return node
    if (node.length === 1) return expression[node[0]]

    const [value, ...children] = node
    if (typeof value === 'string' && value.startsWith('.') && value.length > 1)
        return `${expression(children[0])}.${value.substring(1)}(${children
            .slice(1)
            .map(expression)
            .join(', ')})`

    switch (value) {
        case '=':
            return `const ${expression(children[0])} = ${expression(children[1])}`

        case '?':
            if (children.length === 2)
                return `if (${expression(children[0])}) return ${expression(children[1])}`

            return `(${expression(children[0])} ? ${expression(children[1])} : ${expression(
                children[2]
            )})`
        case '?!':
            const errorHandlerIndex = children.findIndex(
                child => child.length > 1 && child[0] === '->'
            )
            const tryPart = children.slice(0, errorHandlerIndex)
            const catchPart = children[errorHandlerIndex]
            const finallyPart = children.slice(errorHandlerIndex + 1, children.length)

            return `try { ${tryPart.map(expression).join('; ')} } catch (${expression(
                catchPart[1]
            )}) { ${catchPart.slice(2).map(expression).join('; ')} }${
                finallyPart.length > 0
                    ? ` finally { ${finallyPart.map(expression).join('; ')} }`
                    : ''
            }`

        case '->':
            return func(node)
        case '<-':
            return `(${func(['->', [], ...children])})()`
        case '-->':
            return `async ${func(node)}`
        case '<--':
            return `await ${expression(children[0])}`
        case '=->':
            return children.length >= 2
                ? `import ${expression(children[1])} from ${children[0]}`
                : `import ${children[0]}`
        case '<-=':
            const isConst = Array.isArray(children[0]) && children[0][0] === '='
            return `export ${isConst ? '' : 'default '}${expression(children[0])}`

        case '::':
            return `[${children.map(expression).join(', ')}]`
        case ':':
            return `{${children
                .map(child =>
                    child.length > 1
                        ? `${expression(child[0])}: ${expression(child[1])}`
                        : expression(child[0])
                )
                .join(', ')}}`
        case '.':
            return `${expression(children[0])}[${expression(children[1])}]`

        case '+':
        case '*':
        case '/':
        case '%':
        case '&':
        case '|':
        case '>':
        case '>=':
        case '<':
        case '<=':
        case '==':
        case '!=':
            return nary(node)
        case '!':
            return unary(node)
        case '-':
            return children.length > 1 ? nary(node) : unary(node)

        default:
            return !!children && children.length > 0
                ? `${value}(${children.map(expression).join(', ')})`
                : node
    }
}

module.exports = expression
