module.exports = (evaluate, [name, ...parameters]) => {
  const value =
    parameters.length > 1
      ? evaluate([parameters[0], ...parameters.slice(1)])
      : evaluate(parameters[0]);

  return `const ${name} = ${value};`;
};
