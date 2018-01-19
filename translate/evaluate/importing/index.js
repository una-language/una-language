module.exports = (evaluate, expression) =>
  `var ${expression[2]} = require(${expression[1]});`;
