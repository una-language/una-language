#! /usr/bin/env node

const fileSystem = require("fs");
const glob = require("glob");
const path = require("path");
const read = require("./io/read");
const write = require("./io/write");
const translate = require("../translate");

const compilePath = path.join(process.cwd(), process.argv[2]);
const compileDirectory = fileSystem.lstatSync(compilePath).isFile()
  ? path.dirname(compilePath)
  : compilePath;

const compile = inputFile => {
  const writeCode = code => {
    const outputFile = inputFile.substring(0, inputFile.length - 3) + ".js";
    return write(outputFile, code);
  };

  return read(inputFile)
    .then(translate)
    .then(writeCode);
};

const run = () => {
  const scriptPath = fileSystem.lstatSync(compilePath).isFile()
    ? compilePath.substring(0, compilePath.length - 3) + ".js"
    : `${compileDirectory}/index.js`;

  const process = require("child_process").fork(scriptPath);
  process.on("error", console.error);
  process.on("exit", exitCode => {
    if (exitCode !== 0) console.error(`Exit with code ${exitCode}`);
  });
};

glob(compileDirectory + "/**/*.sv", (error, files) => {
  if (error) return console.error(error);
  Promise.all(files.map(compile)).then(run);
});
