module.exports = (transform, expression) => {
  const { parameters } = expression;
  return parameters.length > 1
    ? `var ${parameters[0].value} = require(${parameters[1].value});`
    : `module.exports = ${parameters[0].value};`;
};
