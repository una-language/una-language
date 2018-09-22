module.exports = {
  '<--': (translate, [path]) => `require(${translate(path)})`,
  '-->': (translate, [entity]) => `module.exports = ${translate(entity)};`
}
