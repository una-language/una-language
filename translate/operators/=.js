module.exports = (evaluate, [name, ...parameters]) => `const ${name} = ${evaluate(parameters)};`
