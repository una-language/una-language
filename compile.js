const { parse, prepare, print, read, translate, write } = require("./phases");

const printReadResult = print(1, "read lines from source code");
const printPrepareResult = print(2, "prepare code tree from lines");
const printParseResult = print(3, "parse prepared code tree");
const printTranslateResult = print(4, "translate parsed code tree to JS");
const printWriteResult = print(5, "write translated code to file", false);

read
  .then(printReadResult)
  .then(prepare)
  .then(printPrepareResult)
  .then(parse)
  .then(printParseResult)
  .then(translate)
  .then(printTranslateResult)
  .then(write)
  .then(printWriteResult);
