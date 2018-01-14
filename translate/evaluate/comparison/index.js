module.exports = (evaluate, expression) =>
  `(${evaluate(expression[1])} ${expression[0]} ${evaluate(expression[2])})`;
