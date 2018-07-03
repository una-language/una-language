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
  '=': (translate, [name, ...parameters]) => `const ${translate(name)} = ${translate(parameters)};`,
  '?': (translate, [condition, trueBranch, falseBranch]) =>
    `(${translate(condition)} ? ${translate(trueBranch)} : ${translate(falseBranch)})`,
  '->': (translate, [parameters, ...lines]) =>
    createFunction(translate, lines, Array.isArray(parameters) ? parameters.join(', ') : parameters),
  '<-': (translate, lines) => `(${createFunction(translate, lines, [])})()`,
  '-->': (translate, entity) => `module.exports = ${translate(entity)};`,
  '`': (translate, elements) => `[${elements.map(translate).join(', ')}].join('\\n')`
}
