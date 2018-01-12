module.exports = (transform, expression) => {
  const { parameters } = expression;
  return `(${transform(parameters[0])} > ${transform(parameters[1])})`;
};
