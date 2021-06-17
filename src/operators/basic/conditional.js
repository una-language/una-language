module.exports = ({ translateFunctionBody, validateParametersCount }) => [
  {
    match: '?',
    translate: (translate, operator, operands) => {
      const condition = translate(operands[0])
      const trueBranch = translate(operands[1])
      const falsebranch = operands.length > 2 ? translate(operands[2]) : 'undefined'

      return `(${condition} ? ${trueBranch} : ${falsebranch})`
    },
    validate: validateParametersCount(2, 3)
  },
  {
    match: '?!',
    translate: (translate, operator, operands) => {
      const condition = translate(operands[0])

      const returnBodyLines = operands.slice(1)
      const returnBody =
        returnBodyLines.length === 1
          ? `return ${translate(returnBodyLines[0])}`
          : `{ ${translateFunctionBody(translate, returnBodyLines)} }`

      return `if (${condition}) ${returnBody}`
    },
    validate: validateParametersCount(2)
  }
]
