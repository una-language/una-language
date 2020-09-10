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
    }

    return node
}

module.exports = expression
