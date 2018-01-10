const callStandardLibrary = require("./callStandardLibrary");
const define = require("./define");
const defineFunction = require("./function");
const plus = require("./plus");
const minus = require("./minus");

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
      return define(transform, expression);
    case "->":
      return defineFunction(transform, expression);
    case "|":
      return list(transform, expression);
    case "+":
      return plus(transform, expression);
    case "-":
      return minus(transform, expression);
    default:
      const evaluatedParameters = parameters.map(transform).join(", ");
      return `${expression.value}(${evaluatedParameters})`;
  }
};

module.exports = expression => `${transform(expression)};`;
