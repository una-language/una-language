module.exports = (transform, expression) =>
  `(${transform(expression[1])} <= ${transform(expression[2])})`;

