module.exports = (evaluate, expression) =>
  `var ${expression[1]} = require(${expression[2]});`;
