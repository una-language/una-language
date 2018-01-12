const FileSystem = require("fs");
const path = require("path");

module.exports = filePath =>
  new Promise((resolve, reject) =>
    FileSystem.readFile(
      filePath,
      "utf8",
      (error, content) => (error ? reject(error) : resolve(content))
    )
  );
