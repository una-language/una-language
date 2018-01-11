const condition = require("./condition");
const define = require("./define");
const greater = require("./greater");
const importExport = require("./importExport");
const lessOrEquals = require("./lessOrEquals");
const list = require("./list");
const map = require("./map");
const method = require("./method");
const minus = require("./minus");
const plus = require("./plus");
const string = require("./string");

const transform = expression => {
  const { value, parameters } = expression;

  if (parameters.length > 0) {
    switch (value) {
      case "<-":
        return importExport(transform, expression);
      case "=":
        return define(transform, expression);
      case "->":
        return method(transform, expression);
      case "|":
        return list(transform, expression);
      case ":":
        return map(transform, expression);
      case "'":
        return string(transform, expression);
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
        return `${expression.value}(${parameters.map(transform).join(", ")})`;
    }
  }

  const float = parseFloat(value);
  return !isNaN(float)
    ? float
    : `(!!${value} && !!${value}.constructor && !!${value}.call && !!${value}.apply && ${value}.length === 0 ? ${value}() : ${value})`;
};

module.exports = expression => `${transform(expression)};`;
