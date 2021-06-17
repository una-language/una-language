module.exports = ({ translateFunctionBody, validateParametersCount }) => [
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
    match: '<-|',
    translate: (translate, operator, operands) => `(() => { throw new Error(${translate(operands[0])}) })()`,
    validate: validateParametersCount(1, 1)
  }
]
