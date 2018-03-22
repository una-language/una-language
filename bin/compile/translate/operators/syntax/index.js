module.exports = {
  '=': (translate, [name, ...parameters]) => `const ${name} = ${translate(parameters)};`,
  '?': (translate, [condition, primary, alternative]) =>
    `(${translate(condition)} ? ${translate(primary)} : ${translate(alternative)})`,
  '->': (translate, parameters) => {
    const functionParameters = Array.isArray(parameters[0])
      ? parameters[0].join(', ')
      : parameters[0]

    const lines = parameters.slice(1)
    const last = translate(lines[lines.length - 1])
    const body =
      lines.length > 1
        ? lines
            .slice(0, -1)
            .map(translate)
            .map(line => `${line};`)
            .join(' ')
        : []

    return `function(${functionParameters}){${body} return ${last};}`
  },
  '<-': (translate, lines) => {
    const last = translate(lines[lines.length - 1])
    const body =
      lines.length > 1
        ? lines
            .slice(0, -1)
            .map(translate)
            .map(line => `${line};`)
            .join(' ')
        : []

    return `function(){${body} return ${last}}`
  },
  '--': (translate, lines) => {
    const last = translate(lines[lines.length - 1])
    const body =
      lines.length > 1
        ? lines
            .slice(0, -1)
            .map(translate)
            .map(line => `${line};`)
            .join(' ')
        : []

    return `(function(){${body} return ${last};})()`
  },
  'module.exports': (translate, entity) => `module.exports = ${translate(entity)};`,
  '`': (translate, [...elements]) => elements.map(translate).join('\n')
}
