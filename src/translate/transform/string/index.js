module.exports = (transform, expression) => {
  const getLine = line =>
    [line.value]
      .concat(line.parameters.map(parameter => parameter.value))
      .join(" ");

  return "`" + expression.parameters.map(getLine).join("\n") + "`";
};
