const _ = require("lodash");

const declare = line => {
  const parts = line.value.split(" = ");
  const name = parts[0].trim();
  const value = parts[1].trim();

  return { type: "declare", name, value };
};

const importExport = line => {
  return { type: "module" };
};

const parseLine = line => {
  const { value } = line;

  if (value.includes(" = ")) return declare(line);
  if (value.includes(" <- ")) return importExport(line);
};

const parse = lines => {
  if (lines.length === 0) return [];

  const parsedLine = parseLine(_.head(lines));
  const parsedTail = parse(_.tail(lines));

  return [parsedLine].concat(parsedTail);
};

module.exports = parse;
