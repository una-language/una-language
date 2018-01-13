module.exports = (evaluate, expression) => {
  const parameters = Array.isArray(expression[1])
    ? expression[1].join(", ")
    : expression[1];

  const lines = expression.slice(2);
  const last = evaluate(lines[lines.length - 1]);
  const body =
    lines.length > 1
      ? lines
          .slice(lines.length - 1, 1)
          .map(evaluate)
          .join(" ")
      : [];

  return `function(${parameters}){${body} return ${last}}`;
};
