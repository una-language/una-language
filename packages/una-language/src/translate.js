// TODO add async function
// TODO add await
// TODO add expression evaluation
// TODO add import with setting (import or require)
// TODO add export with setting (export or module.exports)
// TODO add .
// TODO add function apply
// TODO add :: list
// TODO add : map
// TODO add evaluation of argumentless functions like Math.random

const changeSign = type => {
    switch (type) {
        case '==':
            return '==='
        case '!=':
            return '!=='
        case '&':
            return '&&'
        case '|':
            return '||'
        default:
            return type
    }
}

const func = node => {
    const params = node.params.map(expression).join(', ')
    if (node.children.length === 1) return `(${params}) => ${expression(node.children[0])}`

    const body = node.children
        .map((line, index) => {
            const isLastLine = index === node.children.length - 1
            const translatedLine = `${expression(line)};`
            return isLastLine ? `return ${translatedLine}` : translatedLine
        })
        .join(' ')

    return `(${params}) => { ${body} }`
}

const unary = node => `${node.type}${expression(node.children[0])}`
const nary = node => `(${node.children.map(expression).join(` ${changeSign(node.type)} `)})`

const expression = node => {
    switch (node.type) {
        case '=':
            return `const ${expression(node.children[0])} = ${expression(node.children[1])}`
        case '?':
            if (node.children.length === 2)
                return `if (${expression(node.children[0])}) return ${expression(node.children[1])}`

            return `(${expression(node.children[0])} ? ${expression(
                node.children[1]
            )} : ${expression(node.children[2])})`

        case '->':
            return func(node)
        case '-->':
            return `async ${func(node)}`
        case '<-':
            return `(${func({ type: '->', params: [], children: node.children })})()`

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
            return node.children.length > 1 ? nary(node) : unary(node)
    }

    return node
}

module.exports = expression
