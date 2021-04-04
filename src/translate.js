const translateRules = require('./translate.rules')

module.exports = config => {
    const expression = node => {
        if (!Array.isArray(node)) {
            switch (node) {
                case '::':
                    return '[]'
                case ':':
                    return '{}'
                default:
                    return node
            }
        }
        if (node.length === 1) return expression(node[0])

        const [value, ...children] = node

        if (typeof value === 'string' && value.startsWith('.') && value.length > 1) {
            const field = `${expression(children[0])}.${value.substring(1)}`
            return children.length > 1 ? `${field}(${children.slice(1).map(expression).join(', ')})` : field
        }

        const translateRule = translateRules[value]
        if (translateRule) return translateRule(expression, value, children)

        switch (value) {
            case '=->':
                const isSingleImport = children.length < 2
                switch (config.modules) {
                    case 'import':
                        return isSingleImport
                            ? `import ${children[0]}`
                            : `import ${children.slice(1).map(expression).join(', ')} from ${children[0]}`
                    case 'require':
                        return isSingleImport
                            ? `require(${children[0]})`
                            : `const ${children.slice(1).map(expression).join(', ')} = require(${children[0]})`
                    default:
                        throw new Error("Option 'modules' can be only 'import' or 'require'")
                }
            case '<-=':
                const areChildrenArray = Array.isArray(children[0])
                const exportType =
                    Array.isArray(children[0]) && children[0][0] === '='
                        ? 'const'
                        : areChildrenArray && Array.isArray(children[0][0]) && children[0][0].length === 0
                        ? 'common'
                        : 'default'

                const isES = config.modules === 'import'

                switch (exportType) {
                    case 'default':
                        const defaultExportBody = expression(children[0])
                        return isES ? `export default ${defaultExportBody}` : `module.exports = ${defaultExportBody}`
                    case 'common':
                        const exportBody = children[0].slice(1).map(expression).join(', ')
                        return isES ? `export { ${exportBody} }` : `module.exports = { ${exportBody} }`
                    case 'const':
                        return isES
                            ? `export ${expression(children[0])}`
                            : `module.exports.${expression(children[0][1])} = ${expression(children[0].slice(2))}`
                }

            case ':':
                return `{${children
                    .map(child =>
                        typeof child === 'string'
                            ? expression(child)
                            : child.length > 1
                            ? child[0] === '.'
                                ? `[${expression(child[1])}]: ${expression(child.slice(2))}`
                                : `${expression(child[0])}: ${expression(child.slice(1))}`
                            : expression(child[0])
                    )
                    .join(', ')}}`

            case '`':
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
            default:
                return !!children && children.length > 0
                    ? `${expression(value)}(${children.map(expression).join(', ')})`
                    : node
        }
    }

    return expression
}
