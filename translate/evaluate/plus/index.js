module.exports = (evaluate, expression) => {
  const row = expression
    .slice(1)
    .map(evaluate)
    .join(" + ");

  return `(${row})`;
};
