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

const getOperator = value => operatorMapping[value] || value
const unary = (translate, value, children) => `${getOperator(value)}${translate(children[0])}`
const nary = (translate, value, children) => `(${children.map(translate).join(` ${getOperator(value)} `)})`
const optionary = (translate, value, children) => (children.length > 1 ? nary : unary)(translate, value, children)

const funcBody = (translate, lines) =>
  lines.map((line, index) => (index === lines.length - 1 ? `return ${translate(line)}` : translate(line))).join('; ')
const func = (translate, children) => {
  const [rawParams, ...lines] = children
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
  '=': (translate, value, children) => `const ${translate(children[0])} = ${translate(children[1])}`,
  '?': (translate, value, children) =>
    `(${translate(children[0])} ? ${translate(children[1])} : ${
      children.length > 2 ? translate(children[2]) : 'undefined'
    })`,
  '?!': (translate, value, children) => {
    const returnBodyLines = children.slice(1)
    const returnBody =
      returnBodyLines.length === 1
        ? `return ${translate(returnBodyLines[0])}`
        : `{ ${funcBody(translate, returnBodyLines)} }`
    return `if (${translate(children[0])}) ${returnBody}`
  },
  '??': nary,
  '->': (translate, value, children) => func(translate, children),
  '-->': (translate, value, children) => `async ${func(translate, children)}`,
  '|->': (translate, value, children) => {
    const tryBody = funcBody(translate, children[0].slice(1))
    const catchBody = funcBody(translate, children[1].slice(2))
    const tryCatch = `try { ${tryBody} } catch (${translate(children[1][1])}) { ${catchBody} }`

    const isAsync = children[0][0] === '<--' || children[1][0] === '-->'
    return `${isAsync ? 'await (async ' : '('}() => { ${tryCatch} })()`
  },
  '=->': (translate, value, children) => {
    const isSingleImport = children.length < 2
    switch (config.modules) {
      case 'import':
        return isSingleImport
          ? `import ${children[0]}`
          : `import ${children.slice(1).map(translate).join(', ')} from ${children[0]}`
      case 'require':
        return isSingleImport
          ? `require(${children[0]})`
          : `const ${children.slice(1).map(translate).join(', ')} = require(${children[0]})`
      default:
        throw new Error("Option 'modules' can be only 'import' or 'require'")
    }
  },
  '<-': (translate, value, children) => `(${func(translate, [[], ...children])})()`,
  '<--': (translate, value, children) =>
    children.length > 1 ? `await (async ${func(translate, [[], ...children])})()` : `await ${translate(children[0])}`,
  '<-|': (translate, value, children) => `(() => { throw new Error(${translate(children[0])}) })()`,
  '<-=': (translate, value, children) => {
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
        const defaultExportBody = translate(children[0])
        return isES ? `export default ${defaultExportBody}` : `module.exports = ${defaultExportBody}`
      case 'common':
        const exportBody = children[0].slice(1).map(translate).join(', ')
        return isES ? `export { ${exportBody} }` : `module.exports = { ${exportBody} }`
      case 'const':
        return isES
          ? `export ${translate(children[0])}`
          : `module.exports.${translate(children[0][1])} = ${translate(children[0].slice(2))}`
    }
  },
  '::': (translate, value, children) => `[${children.map(translate).join(', ')}]`,
  ':': (translate, value, children) =>
    `{${children
      .map(child =>
        typeof child === 'string'
          ? translate(child)
          : child.length > 1
          ? child[0] === '.'
            ? `[${translate(child[1])}]: ${translate(child.slice(2))}`
            : child[0] === '...'
            ? translate(children)
            : `${translate(child[0])}: ${translate(child.slice(1))}`
          : translate(child[0])
      )
      .join(', ')}}`,
  '.': (translate, value, children) => `${translate(children[0])}[${translate(children[1])}]`,
  '?.': (translate, value, children) => `${translate(children[0])}?.[${translate(children[1])}]`,
  '...': (translate, value, children) => `...${translate(children[0])}`,
  '`': (translate, value, children) => {
    const firstChild = Array.isArray(children[0]) ? children[0][0] : children[0]
    const hasIdentifier = typeof firstChild === 'string' && !firstChild.startsWith("'") && !firstChild.startsWith('"')
    const identifier = hasIdentifier ? translate(children[0]) : ''
    const lines = children.slice(hasIdentifier ? 1 : 0)

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
  new: (translate, value, children) =>
    `(new ${translate(children[0])}(${children.slice(1).map(translate).join(', ')}))`,
  typeof: (translate, value, children) => `typeof ${translate(children[0])}`,
  instanceof: (translate, value, children) => `${translate(children[0])} instanceof ${translate(children[1])}`,
  ...config.customTranslateRules
})
