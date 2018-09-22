const createFunction = (translate, lines, parameters, asynchronyous) => {
  const last = translate(lines[lines.length - 1])
  if (lines.length === 1) return `(${parameters}) => ${last}`

  const body = lines
    .slice(0, -1)
    .map(translate)
    .map(line => `${line};`)
    .join(' ')

  return `${asynchronyous ? 'async' : ''} (${parameters}) => {${body} return ${last};}`
}

const parametrizedFunction = asynchronyous => (translate, [parameters, ...lines]) => {
  const arguments = parameters.children.length ? parameters.children.map(translate).join(', ') : []
  return createFunction(translate, lines, arguments, asynchronyous)
}

module.exports = {
  '->': parametrizedFunction(false),
  '->>': parametrizedFunction(true),
  '<-': (translate, lines) => `(${createFunction(translate, lines, [])})()`,
  '<<-': (translate, lines) => `await (${createFunction(translate, lines, [])})()`
}
