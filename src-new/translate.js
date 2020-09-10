const expression = node => {
    if (node.type === '=') return `const ${expression(node.left)} = ${expression(node.right)}`

    return node
}

module.exports = expression
