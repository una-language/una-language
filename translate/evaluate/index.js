const _ = require("lodash");
const application = require("./application");
const define = require("./define");
const exporting = require("./exporting");
const importing = require("./importing");
const map = require("./map");
const method = require("./method");
const replace = require("./replace");
const value = require("./value");

const evaluate = expression => {
  expression = Array.isArray(expression) ? expression.map(replace) : expression;

  if (!Array.isArray(expression) || expression.length === 1)
    return value(evaluate, expression);

  switch (expression[0]) {
    case "-->":
      return importing(evaluate, expression);
    case "<--":
      return exporting(evaluate, expression);
    case "=":
      return define(evaluate, expression);
    case "->":
      return method(evaluate, expression);
    case ":":
      return map(evaluate, expression);
    default:
      return application(evaluate, expression);
  }
};

module.exports = expression => `${evaluate(expression)};`;
