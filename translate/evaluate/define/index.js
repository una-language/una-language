module.exports = (evaluate, expression) => {
  const name = expression[1];
  const parameters = expression.slice(2);

  const value =
    parameters.length > 1
      ? evaluate([parameters[0], ...parameters.slice(1)])
      : evaluate(parameters[0]);

  return `var ${name} = ${value};`;
};
