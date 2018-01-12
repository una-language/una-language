module.exports = (evaluate, expression) => {
  const value = expression[0];
  const float = parseFloat();

  if (!isNaN(float)) return float;

  return `(!!${value} && !!${value}.constructor && !!${value}.call && !!${value}.apply && ${value}.length === 0 ? ${value}() : ${value})`;
};
