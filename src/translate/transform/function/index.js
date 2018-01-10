module.exports = (transform, expression) => {
  const getFunctionParameters = child => {
    if (!child.parameters) return [child.value];

    return [child.value].concat(getFunctionParameters(child.parameters[0]));
  };

  const functionParameters = getFunctionParameters(
    expression.parameters[0]
  ).join(", ");

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
