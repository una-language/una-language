// TODO add .
// Add syntax for [key] for objects and arrays
// TODO add evaluation of argumentless functions like  (Math.random ())

// TODO change params for function to children[0]
// TODO change all nodes to {value, children}. If it's elementary then {value: 1, children:[]}

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
    const params = paramsLine.map(expression).join(', ')
    if (lines.length === 1) return `(${params}) => ${expression(lines[0])}`

    const body = lines
        .map((line, index) => {
            const isLastLine = index === lines.length - 1
            const translatedLine = `${expression(line)};`
            return isLastLine ? `return ${translatedLine}` : translatedLine
        })
        .join(' ')

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
    if (node.length === 0) return expression[node[0]]

    const [value, ...children] = node
    switch (value) {
        case '=':
            return `const ${expression(children[0])} = ${expression(children[1])}`
        case '?':
            if (children.length === 2)
                return `if (${expression(children[0])}) return ${expression(children[1])}`

            return `(${expression(children[0])} ? ${expression(children[1])} : ${expression(
                children[2]
            )})`

        case '->':
            return func(node)
        case '<-':
            return `(${func(['->', [], ...children])})()`
        case '-->':
            return `async ${func(node)}`
        case '<--':
            return `await ${expression(children[0])}`
        case '=->':
            return `module.exports = ${expression(children[0])}`
        case '<-=':
            return `const ${children[1]} = require(${children[0]})`

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
