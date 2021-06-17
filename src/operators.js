const ary = creator => jsOperator => (translate, operator, operands) =>
  creator(translate, jsOperator || operator, operands)
const unary = ary((translate, operator, operands) => `${operator}${translate(operands[0])}`)
const nary = ary((translate, operator, operands) => `(${operands.map(translate).join(` ${operator} `)})`)
const optionary = ary((translate, operator, operands) =>
  (operands.length > 1 ? nary : unary)(operator)(translate, operator, operands)
)

const translateFunctionBody = (translate, lines) =>
  lines.map((line, index) => (index === lines.length - 1 ? `return ${translate(line)}` : translate(line))).join('; ')
const translateFunction = (translate, operands) => {
  const [rawParams, ...lines] = operands
  const params = rawParams.map(translate).join(', ')
  return lines.length === 1
    ? `(${params}) => (${translate(lines[0])})`
    : `(${params}) => { ${translateFunctionBody(translate, lines)} }`
}
const transformFunction = (transform, operator, operands) => {
  const parameters = Array.isArray(operands[0]) ? operands[0].map(transform) : [transform(operands[0])]
  return [operator, parameters, ...operands.slice(1).map(transform)]
}

const transformPipeline = (operands, orderFirst) => {
  if (operands.length === 1) return operands
  const [first, second, ...rest] = operands
  const application =
    Array.isArray(second) && typeof second !== 'string'
      ? orderFirst
        ? [second[0], first, ...second.slice(1)]
        : [...second, first]
      : [second, first]
  return transformPipeline([application, ...rest], orderFirst)
}

const validateParametersCount = (minimumCount, maximumCount) => (operator, operands) => {
  if (operands.length < minimumCount) throw new Error(`${operator} should have at least ${minimumCount} operands`)
  if (maximumCount !== undefined && operands.length > maximumCount)
    throw new Error(`${operator} should have no more than ${maximumCount} operands`)
}

const createOperators = config => [
  { match: '+', translate: nary(), validate: validateParametersCount(2) },
  { match: '-', translate: optionary(), validate: validateParametersCount(1) },
  { match: '*', translate: nary(), validate: validateParametersCount(2) },
  { match: '**', translate: nary(), validate: validateParametersCount(2) },
  { match: '/', translate: nary(), validate: validateParametersCount(2) },
  { match: '%', translate: nary(), validate: validateParametersCount(2) },
  { match: '&', translate: nary('&&'), validate: validateParametersCount(2) },
  { match: '|', translate: nary('||'), validate: validateParametersCount(2) },
  { match: '!', translate: unary(), validate: validateParametersCount(1, 1) },
  { match: '!!', translate: unary(), validate: validateParametersCount(1, 1) },
  { match: '>', translate: nary(), validate: validateParametersCount(2, 2) },
  { match: '>=', translate: nary(), validate: validateParametersCount(2, 2) },
  { match: '<', translate: nary(), validate: validateParametersCount(2, 2) },
  { match: '<=', translate: nary(), validate: validateParametersCount(2, 2) },
  { match: '==', translate: nary('==='), validate: validateParametersCount(2, 2) },
  { match: '~=', translate: nary('=='), validate: validateParametersCount(2, 2) },
  { match: '!=', translate: nary('!=='), validate: validateParametersCount(2, 2) },
  { match: '!~=', translate: nary('!='), validate: validateParametersCount(2, 2) },
  { match: '_&', translate: nary('&'), validate: validateParametersCount(2) },
  { match: '_|', translate: nary('|'), validate: validateParametersCount(2) },
  { match: '_!', translate: unary('~'), validate: validateParametersCount(1, 1) },
  { match: '_^', translate: nary('^'), validate: validateParametersCount(2) },
  { match: '_>>', translate: nary('>>'), validate: validateParametersCount(2) },
  { match: '_>>>', translate: nary('>>>'), validate: validateParametersCount(2) },
  { match: '_<<', translate: nary('<<'), validate: validateParametersCount(2) },
  { match: '??', translate: nary(), validate: validateParametersCount(2) },

  {
    match: '=',
    transform: (transform, operator, operands) => [operator, transform(operands[0]), transform(operands.slice(1))],
    translate: (translate, operator, operands) => `const ${translate(operands[0])} = ${translate(operands[1])}`,
    validate: validateParametersCount(2)
  },
  {
    match: '?',
    translate: (translate, operator, operands) =>
      `(${translate(operands[0])} ? ${translate(operands[1])} : ${
        operands.length > 2 ? translate(operands[2]) : 'undefined'
      })`,
    validate: validateParametersCount(2, 3)
  },
  {
    match: '?!',
    translate: (translate, operator, operands) => {
      const returnBodyLines = operands.slice(1)
      const returnBody =
        returnBodyLines.length === 1
          ? `return ${translate(returnBodyLines[0])}`
          : `{ ${translateFunctionBody(translate, returnBodyLines)} }`
      return `if (${translate(operands[0])}) ${returnBody}`
    },
    validate: validateParametersCount(2)
  },

  { match: '::', translate: (translate, operator, operands) => `[${operands.map(translate).join(', ')}]` },
  {
    match: ':',
    translate: (translate, operator, operands) =>
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
        .join(', ')}}`
  },
  { match: '...', translate: (translate, operator, operands) => `...${translate(operands[0])}` },
  { match: '.', translate: (translate, operator, operands) => `${translate(operands[0])}[${translate(operands[1])}]` },
  {
    match: '?.',
    translate: (translate, operator, operands) => `${translate(operands[0])}?.[${translate(operands[1])}]`,
    validate: validateParametersCount(2, 3)
  },
  {
    match: value =>
      typeof value === 'string' &&
      ['.', '?.'].some(point => value.startsWith(point) && value.length > point.length && value[point.length] !== '.'),
    translate: (translate, operator, operands) => {
      const field = `${translate(operands[0])}${operator}`
      return operands.length > 1 ? `${field}(${operands.slice(1).map(translate).join(', ')})` : field
    }
  },

  {
    match: '->',
    transform: transformFunction,
    translate: (translate, operator, operands) => translateFunction(translate, operands),
    validate: validateParametersCount(2)
  },
  {
    match: '-->',
    transform: transformFunction,
    translate: (translate, operator, operands) => `async ${translateFunction(translate, operands)}`,
    validate: validateParametersCount(2)
  },
  {
    match: '|->',
    translate: (translate, operator, operands) => {
      const tryBody = translateFunctionBody(translate, operands[0].slice(1))
      const catchBody = translateFunctionBody(translate, operands[1].slice(2))
      const tryCatch = `try { ${tryBody} } catch (${translate(operands[1][1])}) { ${catchBody} }`

      const isAsync = operands[0][0] === '<--' || operands[1][0] === '-->'
      return `${isAsync ? 'await (async ' : '('}() => { ${tryCatch} })()`
    },
    validate: validateParametersCount(2, 3)
  },
  {
    match: '=->',
    translate: (translate, operator, operands) => {
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
    }
  },
  {
    match: '|>',
    transform: (transform, operator, operands) => transform(transformPipeline(operands, false)),
    validate: validateParametersCount(2)
  },
  {
    match: '<-',
    translate: (translate, operator, operands) => `(${translateFunction(translate, [[], ...operands])})()`,
    validate: validateParametersCount(1)
  },
  {
    match: '<--',
    translate: (translate, operator, operands) =>
      operands.length > 1
        ? `await (async ${translateFunction(translate, [[], ...operands])})()`
        : `await ${translate(operands[0])}`,
    validate: validateParametersCount(1)
  },
  {
    match: '<-|',
    translate: (translate, operator, operands) => `(() => { throw new Error(${translate(operands[0])}) })()`,
    validate: validateParametersCount(1, 1)
  },
  {
    match: '<-=',
    transform: (transform, operator, operands) => [operator, transform(operands)],
    translate: (translate, operator, operands) => {
      const areOperandsArray = Array.isArray(operands[0])
      const exportType =
        Array.isArray(operands[0]) && operands[0][0] === '='
          ? 'const'
          : areOperandsArray && Array.isArray(operands[0][0]) && operands[0][0].length === 0
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
    }
  },
  {
    match: '<|',
    transform: (transform, operator, operands) => transform(transformPipeline(operands, true)),
    validate: validateParametersCount(2)
  },

  {
    match: '`',
    translate: (translate, operator, operands) => {
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
    }
  },

  {
    match: 'new',
    translate: (translate, operator, operands) =>
      `(new ${translate(operands[0])}(${operands.slice(1).map(translate).join(', ')}))`,
    validate: validateParametersCount(1)
  },
  {
    match: 'typeof',
    translate: (translate, operator, operands) => `typeof ${translate(operands[0])}`,
    validate: validateParametersCount(1, 1)
  },
  {
    match: 'instanceof',
    translate: (translate, operator, operands) => `${translate(operands[0])} instanceof ${translate(operands[1])}`,
    validate: validateParametersCount(2, 2)
  },
  ...config.customOperators
]

module.exports = config => {
  const operators = createOperators(config)
  return (value, method) => {
    const foundOperator = operators.find(operator =>
      typeof operator.match === 'function' ? operator.match(value) : operator.match === value
    )
    return foundOperator && foundOperator[method]
  }
}
