module.exports = (evaluate, expression) =>
  evaluate(["SovaStandardLibrary.list"].concat(expression.slice(1)));
