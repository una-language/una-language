module.exports = () => [
  { match: '::', translate: (translate, operator, operands) => `[${operands.map(translate).join(', ')}]` },
  {
    match: ':',
    translate: (translate, operator, operands) => {
      const translateOperand = child => {
        if (typeof child === 'string') return translate(child)

        const [key, ...value] = child
        if (child.length === 1) return translate(key)

        if (key === '.') return `[${translate(value[0])}]: ${translate(value.slice(1))}`
        if (key === '..') return `${translate(value[0])} = ${translate(value.slice(1))}`
        if (key === '...') return translate(operands)

        return `${translate(key)}: ${translate(value)}`
      }
      return `{${operands.map(translateOperand).join(', ')}}`
    }
  }
]
