const FileSystem = require("fs");
const path = require("path");

module.exports = fileName =>
  new Promise((resolve, reject) =>
    FileSystem.readFile(
      path.join(process.cwd(), fileName),
      "utf8",
      (error, content) => (error ? reject(error) : resolve(content))
    )
  );
