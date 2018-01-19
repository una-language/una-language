module.exports = (evaluate, expression) =>
  `const ${expression[2]} = require(${expression[1]});`;
