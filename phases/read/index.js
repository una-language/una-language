const FileSystem = require("fs");
const path = require("path");

module.exports = new Promise((resolve, reject) =>
  FileSystem.readFile(
    path.join(process.cwd(), process.argv[2]),
    "utf8",
    (error, content) => (error ? reject(error) : resolve(content))
  )
);
