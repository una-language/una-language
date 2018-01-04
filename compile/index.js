const parse = require("./parse");
const prepare = require("./prepare");
const print = require("./print");
const read = require("./read");
const translate = require("./translate");

const printReadResult = print(1, "read lines from source code");
const printPrepareResult = print(2, "prepare code tree from lines");
const printParseResult = print(3, "parse prepared code tree");
const printTranslateResult = print(4, "translate parsed code tree to JS");

read
  .then(printReadResult)
  .then(prepare)
  .then(printPrepareResult)
  .then(parse)
  .then(printParseResult)
  .then(translate)
  .then(printTranslateResult);
