const _ = require("lodash");

module.exports = content => {
  if (!content.includes("\n")) return [content];

  const lines = content.split("\n");
  const last = _.last(lines);

  return !last ? _.dropRight(lines, 1) : lines;
};
