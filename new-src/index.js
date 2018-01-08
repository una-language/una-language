const translate = require("./translate");

const source = `
=
  sum
  ->
    first second
    +
      first
      second

console.log
  sum
    1
    2
`;

const output = translate(source);

console.log("Output code:");
console.log(output);
console.log("Result :");
eval(output);
