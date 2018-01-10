const read = require("./io/read");
const translate = require("./translate");

read(process.argv[2])
  .then(translate)
  .then(eval);
