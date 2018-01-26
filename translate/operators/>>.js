module.exports = (evaluate, parameters) =>
  `Sova.print(${evaluate(parameters)})`;
