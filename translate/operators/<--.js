module.exports = (evaluate, exportingEntity) =>
  `module.exports = ${evaluate(exportingEntity)};`;
