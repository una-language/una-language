const condition = require("./condition");
const define = require("./define");
const greater = require("./greater");
const method = require("./method");
const lessOrEquals = require("./lessOrEquals");
const list = require("./list");
const map = require("./map");
const plus = require("./plus");
const minus = require("./minus");

const transform = expression => {
  const { value, parameters } = expression;

  if (!parameters || parameters.length === 0) {
    let evaluatedExpressionValue = null;
    try {
      evaluatedExpressionValue = eval(value) ? value : null;
    } catch (error) {
      evaluatedExpressionValue = `(!!${expression.value} && !!${
        expression.value
      }.constructor && !!${expression.value}.call && !!${
        expression.value
      }.apply && ${expression.value}.length === 0 ? ${expression.value}() : ${
        expression.value
      })`;
    }

    return evaluatedExpressionValue;
  }

  switch (value) {
    case "=":
      return define(transform, expression);
    case "->":
      return method(transform, expression);
    case "|":
      return list(transform, expression);
    case ":":
      return map(transform, expression);
    case "?":
      return condition(transform, expression);
    case ">":
      return greater(transform, expression);
    case "<=":
      return lessOrEquals(transform, expression);
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
