const transform = expression => {
  const { value, parameters } = expression;

  if (!parameters) {
    let evaluatedExpressionValue = null;
    try {
      evaluatedExpressionValue = eval(value);
    } catch (error) {
      evaluatedExpressionValue = `${value}`;
    }

    return evaluatedExpressionValue;
  }

  switch (value) {
    case "=":
      return require("./define")(transform, expression);
    case "->":
      return require("./function")(transform, expression);
    case "+":
      return require("./plus")(transform, expression);
    case "-":
      return require("./minus")(transform, expression);
    default:
      const evaluatedParameters = parameters.map(transform).join(", ");
      return `${expression.value}(${evaluatedParameters})`;
  }
};

module.exports = expression => `${transform(expression)};`;
