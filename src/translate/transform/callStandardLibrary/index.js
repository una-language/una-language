module.exports = (translate, expression) => {
  const updatedExpression = Object.assign({}, expression, {
    value: `SovaStandardLibrary.${expression.value}`
  });
  return translate(updatedExpression);
};
