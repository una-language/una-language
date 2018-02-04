module.exports = (evaluate, [object]) => {
  const fields = object.split('.')
  const checkedFields = fields.map((field, index) => `!!${fields.slice(0, index + 1).join('.')}`).join(' && ')

  return `(${checkedFields} ? ${object} : undefined)`
}
