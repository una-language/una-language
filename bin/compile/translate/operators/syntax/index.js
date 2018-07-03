module.exports = {
  '=': (translate, [name, ...parameters]) => `const ${translate(name)} = ${translate(parameters)};`,
  '?': (translate, [condition, trueBranch, falseBranch]) =>
    `(${translate(condition)} ? ${translate(trueBranch)} : ${translate(falseBranch)})`,
  '`': (translate, elements) => `[${elements.map(translate).join(', ')}].join('\\n')`
}
