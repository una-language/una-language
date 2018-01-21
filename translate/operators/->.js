module.exports = (evaluate, parameters) => {
  const functionParameters = Array.isArray(parameters[0])
    ? parameters[0].join(", ")
    : parameters[0];

  const lines = parameters.slice(1);
  const last = evaluate(lines[lines.length - 1]);
  const body =
    lines.length > 1
      ? lines
          .slice(0, -1)
          .map(evaluate)
          .join(" ")
      : [];

  return `function(${functionParameters}){${body} return ${last}}`;
};
