module.exports = (translate, expression) => {
  const createField = field => {
    const fieldName = field.value;
    const fieldValue = translate({
      value: field.parameters[0].value,
      parameters: field.parameters[0].parameters.concat(
        field.parameters.slice(1)
      )
    });
    return `${fieldName} : ${fieldValue}`;
  };

  const fields = expression.parameters.map(createField);
  return `{${fields.join(", ")}}`;
};
