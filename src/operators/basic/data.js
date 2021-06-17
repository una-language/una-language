module.exports = () => [
  { match: '::', translate: (translate, operator, operands) => `[${operands.map(translate).join(', ')}]` },
  {
    match: ':',
    translate: (translate, operator, operands) =>
      `{${operands
        .map(child =>
          typeof child === 'string'
            ? translate(child)
            : child.length > 1
            ? child[0] === '.'
              ? `[${translate(child[1])}]: ${translate(child.slice(2))}`
              : child[0] === '...'
              ? translate(operands)
              : `${translate(child[0])}: ${translate(child.slice(1))}`
            : translate(child[0])
        )
        .join(', ')}}`
  }
]
