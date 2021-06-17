module.exports = (utils, config) => [
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
  }
]
