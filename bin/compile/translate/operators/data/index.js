module.exports = {
  '|': (translate, [...elements]) => `Sova.list(${elements.join(', ')})`,
  '|=': (translate, [list, ...elements]) => `const [${elements.join(', ')}] = ${translate(list)};`,
  ':': (translate, fields) => {
    const createField = ([name, ...parameters]) =>
      parameters.length === 0 ? name : `${name} : ${translate(parameters)}`

    const translatedFields = fields.map(createField).join(', ')
    return `Sova.map({${translatedFields}})`
  },
  ':=': (translate, [object, ...fields]) => {
    const createField = field => {
      if (!Array.isArray(field)) return field

      const [fieldName, ...subFields] = field
      const translatedSubFields = subFields.map(createField).join(', ')

      return `${fieldName} : {${translatedSubFields}}`
    }

    const deconstructedFields = fields.map(createField).join(', ')
    return `const {${deconstructedFields}} = ${translate(object)}`
  },
  '`': (translate, [...elements]) => elements.map(translate).join('\n')
}
