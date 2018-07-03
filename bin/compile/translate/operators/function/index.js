const createFunction = (translate, lines, parameters) => {
  const last = translate(lines[lines.length - 1])
  if (lines.length === 1) return `(${parameters}) => ${last}`

  const body = lines
    .slice(0, -1)
    .map(translate)
    .map(line => `${line};`)
    .join(' ')

  return `(${parameters}) => {${body} return ${last};}`
}

module.exports = {
  '->': (translate, [parametersArray, ...lines]) => {
    const parameters =
      parametersArray.length === 0
        ? []
        : parametersArray
            .slice(1)
            .map(translate)
            .join(', ')

    return createFunction(translate, lines, parameters)
  },
  '<-': (translate, lines) => `(${createFunction(translate, lines, [])})()`
}
