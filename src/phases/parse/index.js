const _ = require("lodash");

const expression = line => {
  const { value, children } = line;

  if (value.startsWith("-> ")) return functionExpression(line);
  if (value.startsWith(".")) return mapExpression(line);
  if (value.startsWith("|")) return listExpression(line);

  return functionApplication(line);
};

const parseLine = line => {
  const { value } = line;

  if (value.startsWith(". ") || value.startsWith("| "))
    return deconstruction(line);

  if (value.includes("<- ")) return improtExport(line);
  if (value.includes(" = ")) return declaration(line);

  return expression(value);
};

const parse = lines => {
  if (lines.length === 0) return [];

  const parsedLine = parseLine(_.head(lines));
  const parsedTail = parse(_.tail(lines));

  return [parsedLine].concat(parsedTail);
};

module.exports = parse;
