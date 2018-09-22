module.exports = {
  '=': (translate, [name, ...parameters]) =>
    `const ${translate(name)} = ${translate({
      value: parameters[0].value,
      children: [...(parameters[0].children || []), ...parameters.slice(1)]
    })};`,
  '?': (translate, [condition, trueBranch, falseBranch]) =>
    `(${translate(condition)} ? ${translate(trueBranch)} : ${translate(falseBranch)})`,
  '`': (translate, elements) => `[${elements.map(translate).join(', ')}].join('\\n')`
}
