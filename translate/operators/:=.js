module.exports = (evaluate, [name, ...fields]) => {
  const createField = field => {
    if (!Array.isArray(field)) return field;

    const [fieldName, ...subFields] = field;
    const evaluatedSubFields = subFields.map(createField).join(", ");

    return `${fieldName} : {${evaluatedSubFields}}`;
  };

  const deconstructedFields = fields.map(createField).join(", ");
  return `const {${deconstructedFields}} = ${name}`;
};
