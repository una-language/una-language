const operatorMapping = {
  '==': '===',
  '~=': '==',
  '!=': '!==',
  '!~=': '!=',
  '&': '&&',
  '|': '||',
  '_&': '&',
  '_|': '|',
  '_!': '~',
  '_^': '^',
  '_>>': '>>',
  '_>>>': '>>>',
  '_<<': '<<'
}

const getOperator = operator => operatorMapping[operator] || operator
const unary = (translate, operator, operands) => `${getOperator(operator)}${translate(operands[0])}`
const nary = (translate, operator, operands) => `(${operands.map(translate).join(` ${getOperator(operator)} `)})`
const optionary = (translate, operator, operands) => (operands.length > 1 ? nary : unary)(translate, operator, operands)

const funcBody = (translate, lines) =>
  lines.map((line, index) => (index === lines.length - 1 ? `return ${translate(line)}` : translate(line))).join('; ')
const func = (translate, operands) => {
  const [rawParams, ...lines] = operands
  const params = rawParams.map(translate).join(', ')
  return lines.length === 1
    ? `(${params}) => (${translate(lines[0])})`
    : `(${params}) => { ${funcBody(translate, lines)} }`
}

module.exports = config => ({
  '!': unary,
  '!!': unary,
  '+': nary,
  '-': optionary,
  '*': nary,
  '/': nary,
  '**': nary,
  '%': nary,
  '&': nary,
  '|': nary,
  '>': nary,
  '>=': nary,
  '<': nary,
  '<=': nary,
  '==': nary,
  '~=': nary,
  '!=': nary,
  '!~=': nary,
  '_&': nary,
  '_|': nary,
  '_!': unary,
  '_^': nary,
  '_>>': nary,
  '_>>>': nary,
  '_<<': nary,
  '=': (translate, operator, operands) => `const ${translate(operands[0])} = ${translate(operands[1])}`,
  '?': (translate, operator, operands) =>
    `(${translate(operands[0])} ? ${translate(operands[1])} : ${
      operands.length > 2 ? translate(operands[2]) : 'undefined'
    })`,
  '?!': (translate, operator, operands) => {
    const returnBodyLines = operands.slice(1)
    const returnBody =
      returnBodyLines.length === 1
        ? `return ${translate(returnBodyLines[0])}`
        : `{ ${funcBody(translate, returnBodyLines)} }`
    return `if (${translate(operands[0])}) ${returnBody}`
  },
  '??': nary,
  '->': (translate, operator, operands) => func(translate, operands),
  '-->': (translate, operator, operands) => `async ${func(translate, operands)}`,
  '|->': (translate, operator, operands) => {
    const tryBody = funcBody(translate, operands[0].slice(1))
    const catchBody = funcBody(translate, operands[1].slice(2))
    const tryCatch = `try { ${tryBody} } catch (${translate(operands[1][1])}) { ${catchBody} }`

    const isAsync = operands[0][0] === '<--' || operands[1][0] === '-->'
    return `${isAsync ? 'await (async ' : '('}() => { ${tryCatch} })()`
  },
  '=->': (translate, operator, operands) => {
    const isSingleImport = operands.length < 2
    switch (config.modules) {
      case 'import':
        return isSingleImport
          ? `import ${operands[0]}`
          : `import ${operands.slice(1).map(translate).join(', ')} from ${operands[0]}`
      case 'require':
        return isSingleImport
          ? `require(${operands[0]})`
          : `const ${operands.slice(1).map(translate).join(', ')} = require(${operands[0]})`
      default:
        throw new Error("Option 'modules' can be only 'import' or 'require'")
    }
  },
  '<-': (translate, operator, operands) => `(${func(translate, [[], ...operands])})()`,
  '<--': (translate, operator, operands) =>
    operands.length > 1 ? `await (async ${func(translate, [[], ...operands])})()` : `await ${translate(operands[0])}`,
  '<-|': (translate, operator, operands) => `(() => { throw new Error(${translate(operands[0])}) })()`,
  '<-=': (translate, operator, operands) => {
    const areoperandsArray = Array.isArray(operands[0])
    const exportType =
      Array.isArray(operands[0]) && operands[0][0] === '='
        ? 'const'
        : areoperandsArray && Array.isArray(operands[0][0]) && operands[0][0].length === 0
        ? 'common'
        : 'default'

    const isES = config.modules === 'import'

    switch (exportType) {
      case 'default':
        const defaultExportBody = translate(operands[0])
        return isES ? `export default ${defaultExportBody}` : `module.exports = ${defaultExportBody}`
      case 'common':
        const exportBody = operands[0].slice(1).map(translate).join(', ')
        return isES ? `export { ${exportBody} }` : `module.exports = { ${exportBody} }`
      case 'const':
        return isES
          ? `export ${translate(operands[0])}`
          : `module.exports.${translate(operands[0][1])} = ${translate(operands[0].slice(2))}`
    }
  },
  '::': (translate, operator, operands) => `[${operands.map(translate).join(', ')}]`,
  ':': (translate, operator, operands) =>
    `{${operands
      .map(child =>
        typeof child === 'string'
          ? translate(child)
          : child.length > 1
          ? child[0] === '.'
            ? `[${translate(child[1])}]: ${translate(child.slice(2))}`
            : child[0] === '...'
            ? translate(operands)
            : `${translate(child[0])}: ${translate(child.slice(1))}`
          : translate(child[0])
      )
      .join(', ')}}`,
  '.': (translate, operator, operands) => `${translate(operands[0])}[${translate(operands[1])}]`,
  '?.': (translate, operator, operands) => `${translate(operands[0])}?.[${translate(operands[1])}]`,
  '...': (translate, operator, operands) => `...${translate(operands[0])}`,
  '`': (translate, operator, operands) => {
    const firstChild = Array.isArray(operands[0]) ? operands[0][0] : operands[0]
    const hasIdentifier = typeof firstChild === 'string' && !firstChild.startsWith("'") && !firstChild.startsWith('"')
    const identifier = hasIdentifier ? translate(operands[0]) : ''
    const lines = operands.slice(hasIdentifier ? 1 : 0)

    const interpolatedString = lines
      .map(line => {
        if (typeof line === 'string') return line.substring(1, line.length - 1)

        const [string, ...substitutions] = line
        return substitutions.reduce(
          (accumulator, substitution, index) =>
            accumulator.replace(new RegExp(`(?<!\\\\)\\$\\{${index}\\}`, 'g'), `\${${translate(substitution)}}`),
          string.substring(1, string.length - 1)
        )
      })
      .join('\n')
    return `${identifier}\`${interpolatedString}\``
  },
  new: (translate, operator, operands) =>
    `(new ${translate(operands[0])}(${operands.slice(1).map(translate).join(', ')}))`,
  typeof: (translate, operator, operands) => `typeof ${translate(operands[0])}`,
  instanceof: (translate, operator, operands) => `${translate(operands[0])} instanceof ${translate(operands[1])}`,
  ...config.customTranslateRules
})
