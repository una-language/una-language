module.exports = {
  '<--': (translate, [name, dependency]) => `const ${translate(name)} = require(${translate(dependency)})`,
  '-->': (translate, entity) => `module.exports = ${translate(entity)};`
}
