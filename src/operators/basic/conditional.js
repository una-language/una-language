module.exports = ({ translateFunctionBody, validateParametersCount }) => [
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
  }
]
