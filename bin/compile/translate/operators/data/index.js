module.exports = {
  '.': (translate, elements) => `[${elements.map(translate).join(', ')}]`,
  ':': (translate, fields) => {
    const createField = field => (Array.isArray(field) ? `${field[0]} : ${translate(field.slice(1))}` : field)
    return `{${fields.map(createField).join(', ')}}`
  }
}
