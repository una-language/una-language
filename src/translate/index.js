const parse = require("./parse");
const prettier = require("prettier");
const transform = require("./transform");

module.exports = code =>
  prettier.format(
    parse(code)
      .map(transform)
      .join(" ")
  );
