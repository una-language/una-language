const _ = require("lodash");

const parseLine = line => {
  const parts = line.value.split(" = ");
  const name = parts[0].trim();
  const value = parts[1].trim();

  return { type: "declare", name, value };
};

const parse = lines => {
  if (lines.length === 0) return [];

  const parsedLine = parseLine(_.head(lines));
  const parsedTail = parse(_.tail(lines));

  return [parsedLine].concat(parsedTail);
};

module.exports = parse;
