module.exports = {
  '-->': (translate, entity) => `require(${translate(entity)});`,
  '<--': (translate, entity) => `module.exports = ${translate(entity)};`
}
