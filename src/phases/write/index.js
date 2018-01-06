const FileSystem = require("fs");

const write = lines => {
  const writer = FileSystem.createWriteStream("output.js", { flags: "w" });

  lines.forEach(line => writer.write(line + "\n"));
  writer.end();

  return "Output file successfully created";
};

module.exports = write;
