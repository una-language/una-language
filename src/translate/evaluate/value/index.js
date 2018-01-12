module.exports = (evaluate, expression) => {
  const value = Array.isArray(expression) ? expression[0] : expression;
  const float = parseFloat(expression);

  if (!isNaN(float)) return float;

  return `(!!${value} && !!${value}.constructor && !!${value}.call && !!${value}.apply && ${value}.length === 0 ? ${value}() : ${value})`;
};
