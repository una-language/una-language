const parse = require("./parse");
const prettier = require("prettier");
const evaluate = require("./evaluate");

module.exports = code => {
  const expressions = parse(code);
  const resultCode = expressions.map(evaluate).join("\n");
  const resultCodeWithLib = `require("sova-standard-library");\n${resultCode}`;
  const formattedCode = prettier.format(resultCodeWithLib);
  return formattedCode;
};
