// TODO add binary ? (? condition action)
// TODO add function
// TODO add curry function
// TODO add async function
// TODO add await
// TODO add expression evaluation
// TODO add import with setting (import or require)
// TODO add export with setting (export or module.exports)
// TODO add .
// TODO add function apply
// TODO add | list
// TODO add : map

// TODO make all nodes like this {type:"=", children: []}

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

const unary = node => `${node.type}${expression(node.children[0])}`
const nary = node => `(${node.children.map(expression).join(` ${changeSign(node.type)} `)})`

const expression = node => {
    switch (node.type) {
        case '=':
            return `const ${expression(node.children[0])} = ${expression(node.children[1])}`
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

        case '?':
            return `(${expression(node.children[0])} ? ${expression(
                node.children[1]
            )} : ${expression(node.children[2])})`
    }

    return node
}

module.exports = expression
