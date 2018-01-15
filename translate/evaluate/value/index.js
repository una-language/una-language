module.exports = (evaluate, expression) => {
  const value = Array.isArray(expression) ? expression[0] : expression;
  const float = parseFloat(expression);

  if (!isNaN(float)) return float;

  if (value.startsWith('"') || value.startsWith("'"))
    return `\`${value.substring(1, value.length - 1)}\``;

  return `${value}`;
};
