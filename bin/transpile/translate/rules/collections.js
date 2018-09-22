module.exports = {
  '.': (translate, elements) => `[${elements.map(translate).join(', ')}]`,
  ':': (translate, fields) => {
    const createField = field =>
      !!field.children && field.children.length
        ? `${field.value} : ${translate({ value: field.children[0].value, children: field.children.slice(1) })}`
        : field.value

    return `{${fields.map(createField).join(', ')}}`
  }
}
