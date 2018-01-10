module.exports = (transform, expression) => {
  const { parameters } = expression;
  const name = parameters[0].value;
  const value =
    parameters.length > 2
      ? transform({
          value: parameters[1].value,
          parameters: parameters.slice(2)
        })
      : transform(parameters[1]);
  return `var ${name} = ${value};`;
};
