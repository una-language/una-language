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

const expression = node => {
    switch (node.type) {
        case '=':
            return `const ${expression(node.left)} = ${expression(node.right)}`
        case '+':
        case '*':
        case '/':
        case '%':
        case '&&':
        case '||':
            return `(${node.params.map(expression).join(` ${node.type} `)})`
        case '-':
            return node.params.length > 1
                ? `(${node.params.map(expression).join(' - ')})`
                : `-${expression(node.params[0])}`
        case '!':
            return `!${expression(node.value)}`

        case '>':
        case '>=':
        case '<':
        case '<=':
        case '==':
        case '!=':
            let sign = node.type === '==' ? '===' : node.type === '!=' ? '!==' : node.type
            return `(${expression(node.left)} ${sign} ${expression(node.right)})`

        case '?':
            return `(${expression(node.condition)} ? ${expression(node.left)} : ${expression(node.right)})`
    }

    return node
}

module.exports = expression
