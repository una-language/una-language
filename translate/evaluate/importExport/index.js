module.exports = (evaluate, expression) =>
  expression.length > 2
    ? `var ${expression[1]} = require("${expression[2]}");`
    : `module.exports = ${expression[1]};`;
