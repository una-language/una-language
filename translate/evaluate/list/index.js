module.exports = (evaluate, expression) =>
  evaluate(["Sova.list"].concat(expression.slice(1)));
