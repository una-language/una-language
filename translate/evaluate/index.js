module.exports = operators => {
  const evaluate = expression => {
    expression = !Array.isArray(expression)
      ? expression
      : expression.length === 1 ? expression[0] : expression;

    if (!Array.isArray(expression))
      return expression.startsWith('"') || expression.startsWith("'")
        ? `\`${expression.substring(1, expression.length - 1)}\``
        : expression;

    const [name, ...parameters] = expression;
    if (operators[name]) return operators[name](evaluate, parameters);

    const evaluatedParameters = parameters.map(evaluate).join(", ");
    return `${name}(${evaluatedParameters})`;
  };

  return expression => `${evaluate(expression)};`;
};
