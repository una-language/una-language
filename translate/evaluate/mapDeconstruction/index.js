module.exports = (evaluate, expression) => {
  const createField = field => {
    if (!Array.isArray(field)) return field;

    const subFields = field
      .slice(1)
      .map(createField)
      .join(", ");

    return `${field[0]} : {${subFields}}`;
  };

  const deconstructedFields = expression
    .slice(2)
    .map(createField)
    .join(", ");

  return `const {${deconstructedFields}} = ${expression[1]}`;
};
