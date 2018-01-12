module.exports = (transform, expression) => {
  const row = expression.parameters.map(transform).join(" - ");
  return `(${row})`;
};
