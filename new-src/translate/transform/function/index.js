module.exports = (transform, expression) => {
  const functionParameters = expression.parameters[0].value
    .split(" ")
    .join(", ");

  const functionLines = expression.parameters.slice(1);
  const functionReturn = transform(functionLines[functionLines.length - 1]);
  const functionBody =
    functionLines.length === 1
      ? []
      : functionLines
          .slice(functionLines.length - 1, 1)
          .map(transform)
          .join(" ");

  return `function(${functionParameters}){${functionBody} return ${functionReturn}}`;
};
