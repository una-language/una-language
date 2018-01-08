module.exports = (transform, expression) => {
  const { parameters } = expression;
  const name = parameters[0].value;
  const value = transform(parameters[1]);
  return `var ${name} = ${value};`;
};
