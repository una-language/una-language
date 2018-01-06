const {
  divide,
  parse,
  prepare,
  print,
  read,
  translate,
  write
} = require("./phases");

const printReadResult = print(1, "read source code from input file");
const printDivideResult = print(2, "divide source code on lines");
const printPrepareResult = print(3, "prepare tree from code");
const printParseResult = print(4, "parse prepared code tree");
const printTranslateResult = print(5, "translate parsed code tree to JS");
const printWriteResult = print(6, "write translated code to file", false);

read
  .then(printReadResult)
  .then(divide)
  .then(printDivideResult)
  .then(prepare)
  .then(printPrepareResult)
  .then(parse)
  .then(printParseResult)
  .then(translate)
  .then(printTranslateResult)
  .then(write)
  .then(printWriteResult);
