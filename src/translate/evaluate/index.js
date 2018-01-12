const _ = require("lodash");
const application = require("./application");
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
const value = require("./value");

const evaluate = expression => {
  if (expression.length === 1) return value(evaluate, expression);

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
    case ">":
      return greater(evaluate, expression);
    case "<=":
      return lessOrEquals(evaluate, expression);
    case "+":
      return plus(evaluate, expression);
    case "-":
      return minus(evaluate, expression);
    default:
      return application(evaluate, expression);
  }
};

module.exports = expression => `${evaluate(expression)};`;
