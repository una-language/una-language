module.exports = (evaluate, expression) =>
  `module.exports = ${evaluate(expression[1])};`;
