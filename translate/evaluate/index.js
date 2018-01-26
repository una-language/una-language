module.exports = operators => {
  const simplify = expression =>
    Array.isArray(expression) && expression.length === 1
      ? simplify(expression[0])
      : expression;

  const isSimple = value => !Array.isArray(value);
  const isNumber = value => !isNaN(parseFloat(value));
  const isString = value => value.startsWith('"') || value.startsWith("'");
  const operator = name => operators[name];

  const namedValue = expression => {
    const wrap = value =>
      `Sova.isFunctionWithoutArguments(${value}) ? ${value}() : ${value}`;

    const parts = expression.split(".");

    return parts.length > 1
      ? wrap(parts.reduce((object, field) => `(${wrap(object)}).${field}`))
      : wrap(parts[0]);
  };

  const evaluate = expression => {
    expression = simplify(expression);

    if (isSimple(expression)) {
      if (isNumber(expression)) return expression;
      if (isString(expression)) {
        const stringValue = expression.substring(1, expression.length - 1);
        return `\`${stringValue}\``;
      }
      if (operator(expression)) return operator(expression)(evaluate, []);

      return namedValue(expression);
    }

    const [name, ...parameters] = expression;
    if (operator(name)) return operator(name)(evaluate, parameters);

    const evaluatedParameters = parameters.map(evaluate).join(", ");
    return `${name}(${evaluatedParameters})`;
  };

  return evaluate;
};
