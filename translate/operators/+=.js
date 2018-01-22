module.exports = (evaluate, [className, ...parameters]) => {
  const classParameters = parameters.map(evaluate).join(", ");
  return `(new ${className}(${classParameters}))`;
};
