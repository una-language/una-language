const expression = node => {
    switch (node.type) {
        case '=':
            return `const ${expression(node.left)} = ${expression(node.right)}`
        case '+':
        case '*':
        case '/':
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
    }

    return node
}

module.exports = expression
