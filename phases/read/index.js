const fileSystem = require("fs");
const path = require("path");
const Reader = require("line-by-line");

const sourceFile = path.join(process.cwd(), process.argv[2]);
const reader = new Reader(sourceFile);

module.exports = new Promise(resolve => {
  const lines = [];
  const read = line =>
    lines.push({
      line: line.trim(),
      spaces: line.search(/\S/)
    });

  reader.on("line", read);
  reader.on("end", () => {
    const nonEmptyLines = lines.filter(line => line.spaces >= 0);
    return resolve(nonEmptyLines);
  });
});
