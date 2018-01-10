module.exports = (translate, expression) =>
  translate({
    value: `SovaStandardLibrary.list`,
    parameters: expression.parameters
  });

