const sova = {
  translate: require("./translate")
};

sova.default = sova;

module.exports = sova;

require("main").run(module, parameters => {
  require("./lib");

  const inputFile = parameters(0);
  const read = require("./io/read");
  const translate = require("./translate");

  read(process.argv[2])
    .then(translate)
    // .then(code => {
    //   console.log(code);
    //   return code;
    // })
    .then(eval);
});
