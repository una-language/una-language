module.exports = (evaluate, expression) => {
  const createField = field => {
    if (field.length === 1) return field[0];

    const name = field[0];
    const value = evaluate([field[1]].concat(field.slice(2)));
    return `${name} : ${value}`;
  };

  const fields = expression.slice(1).map(createField);
  return `Sova.map({${fields.join(", ")}})`;
};