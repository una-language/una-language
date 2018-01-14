module.exports = (evaluate, expression) => {
  if (expression[0] === "!") return `!${evaluate(expression[1])}`;

  const evaluatedParameters = expression.slice(1).map(evaluate);
  return `(${evaluatedParameters.join(` ${expression[0]} `)})`;
};
