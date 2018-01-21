module.exports = (evaluate, parameters) => {
  const elements = parameters.slice(1).join(", ");
  return `const [${elements}] = ${parameters[0]};`;
};
