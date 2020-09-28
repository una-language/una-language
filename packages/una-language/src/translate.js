// TODO add .
// Add syntax for [key] for objects and arrays
// TODO add evaluation of argumentless functions like  (Math.random ())

// TODO change params for function to children[0]
// TODO change all nodes to {value, children}. If it's elementary then {value: 1, children:[]}

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
    const { children, type } = node
    switch (type) {
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
            return `(${func({ type: '->', params: [], children: children })})()`
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
                    child.children.length > 0
                        ? `${expression(child.type)}: ${expression(child.children[0])}`
                        : expression(child.type)
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
                ? `${type}(${children.map(expression).join(', ')})`
                : node
    }
}

module.exports = expression
