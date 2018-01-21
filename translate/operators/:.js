module.exports = (evaluate, fields) => {
  const createField = ([name, ...parameters]) =>
    parameters.length === 0 ? name : `${name} : ${evaluate(parameters)}`;

  const evaluatedFields = fields.map(createField).join(", ");
  return `Sova.map({${evaluatedFields}})`;
};
