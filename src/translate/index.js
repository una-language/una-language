const parse = require("./parse");
const prettier = require("prettier");
const evaluate = require("./evaluate");

module.exports = code => {
  const expressions = parse(code);
  const result = expressions.map(evaluate).join("\n");
  return prettier.format(result);
};
