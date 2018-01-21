module.exports = (evaluate, [path, name]) =>
  `const ${name} = require(${path});`;
