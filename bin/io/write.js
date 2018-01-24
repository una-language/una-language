const FileSystem = require("fs");

module.exports = (fileName, content) =>
  FileSystem.writeFile(fileName, content, error => {
    if (error) throw error;
  });
