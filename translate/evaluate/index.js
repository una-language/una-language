const _ = require("lodash");
const application = require("./application");
const arithmetic = require("./arithmetic");
const comparison = require("./comparison");
const condition = require("./condition");
const define = require("./define");
const importExport = require("./importExport");
const list = require("./list");
const logical = require("./logical");
const map = require("./map");
const method = require("./method");
const string = require("./string");
const value = require("./value");

const arithmeticOperators = ["+", "-", "*", "/", "%"];
const comparisonOperators = ["==", "===", ">", ">=", "<", "<="];
const logicalOperators = ["&&", "||", "!"];

const evaluate = expression => {
  if (!Array.isArray(expression) || expression.length === 1)
    return value(evaluate, expression);

  if (arithmeticOperators.includes(expression[0]))
    return arithmetic(evaluate, expression);

  if (comparisonOperators.includes(expression[0]))
    return comparison(evaluate, expression);

  if (logicalOperators.includes(expression[0]))
    return logical(evaluate, expression);

  switch (expression[0]) {
    case "<-":
      return importExport(evaluate, expression);
    case "=":
      return define(evaluate, expression);
    case "->":
      return method(evaluate, expression);
    case "|":
      return list(evaluate, expression);
    case ":":
      return map(evaluate, expression);
    case "'":
      return string(evaluate, expression);
    case "?":
      return condition(evaluate, expression);
    default:
      return application(evaluate, expression);
  }
};

module.exports = expression => `${evaluate(expression)};`;
