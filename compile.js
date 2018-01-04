const {
  clean,
  divide,
  parse,
  prepare,
  print,
  read,
  translate,
  write
} = require("./phases");

const printReadResult = print(1, "read source code from input file");
const printDivideResult = print(2, "divide source code onto lines");
const printCleanResult = print(3, "clean source code");
const printPrepareResult = print(4, "prepare code tree from lines");
const printParseResult = print(5, "parse prepared code tree");
const printTranslateResult = print(6, "translate parsed code tree to JS");
const printWriteResult = print(7, "write translated code to file", false);

read
  .then(printReadResult)
  .then(divide)
  .then(printDivideResult)
  .then(clean)
  .then(printCleanResult)
  .then(prepare)
  .then(printPrepareResult)
  .then(parse)
  .then(printParseResult)
  .then(translate)
  .then(printTranslateResult)
  .then(write)
  .then(printWriteResult);
