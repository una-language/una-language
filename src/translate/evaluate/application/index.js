module.exports = (evaluate, expression) => {
  const value = expression[0];
  const parameters = expression
    .slice(1)
    .map(parameter =>
      evaluate(Array.isArray(parameter) ? parameter : [parameter])
    )
    .join(", ");

  return `${value}(${parameters})`;
};
