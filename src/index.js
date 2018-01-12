const sova = {
  translate: require("./translate")
};

sova.default = sova;

module.exports = sova;

require("main").run(module, parameters => {
  const glob = require("glob");
  const path = require("path");
  const read = require("./io/read");
  const write = require("./io/write");
  const translate = require("./translate");

  const compilePath = path.join(process.cwd(), parameters(0));
  const libPath = path.join(__dirname, "lib/index.js");

  read(libPath).then(libCode => {
    glob(compilePath + "/**/*.sv", (error, files) => {
      if (error) throw error;
      files.forEach(inputFile => {
        const outputFile = inputFile.substring(0, inputFile.length - 3) + ".js";
        return read(inputFile)
          .then(translate)
          .then(code =>
            write(
              outputFile,
              inputFile === compilePath + "/index.sv" ? libCode + code : code
            )
          );
      });
    });
  });
});

