module.exports = (evaluate, expression) =>
  `((${evaluate(expression[1])}) ? (${evaluate(expression[2])}) : (${evaluate(
    expression[3]
  )}))`;

