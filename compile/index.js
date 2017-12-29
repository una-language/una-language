const prepare = require("./prepare");
const print = require("./print");
const read = require("./read");

const printReadResult = print(1, "read lines from source code");
const printPrepareResult = print(2, "prepare code tree from lines");

read
  .then(printReadResult)
  .then(prepare)
  .then(printPrepareResult);
