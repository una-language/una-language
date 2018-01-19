module.exports = (evaluate, expression) => {
  const parameters = expression.slice(2).join(", ");
  return `const [${parameters}] = ${expression[1]};`;
};
