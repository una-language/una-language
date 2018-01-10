const FileSystem = require("fs");
const path = require("path");

module.exports = fileName =>
  new Promise((resolve, reject) =>
    FileSystem.readFile(
      fileName,
      "utf8",
      (error, content) => (error ? reject(error) : resolve(content))
    )
  );
