const divide = expression => {
  const parts = expression.split(".");
  const wrap = value =>
    `Sova.isFunctionWithoutArguments(${value}) ? ${value}() : ${value}`;

  return parts.length > 1
    ? wrap(parts.reduce((object, field) => `(${wrap(object)}).${field}`))
    : wrap(parts[0]);
};

module.exports = operators => {
  const evaluate = expression => {
    expression = !Array.isArray(expression)
      ? expression
      : expression.length === 1 ? expression[0] : expression;

    if (!Array.isArray(expression))
      return expression.startsWith('"') || expression.startsWith("'")
        ? `\`${expression.substring(1, expression.length - 1)}\``
        : divide(expression);

    const [name, ...parameters] = expression;
    if (operators[name]) return operators[name](evaluate, parameters);

    const evaluatedParameters = parameters.map(evaluate).join(", ");
    return `${name}(${evaluatedParameters})`;
  };

  return expression => `${evaluate(expression)};`;
};
