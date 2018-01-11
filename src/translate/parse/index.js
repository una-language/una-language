const _ = require("lodash");
const parseLine = require("./parse-line");

const divide = code => {
  if (!code.includes("\n")) return [code];

  const lines = code.split("\n");
  const last = _.last(lines);

  return !last ? _.dropRight(lines, 1) : lines;
};

const makeTree = (lines, spaces = 0) => {
  if (lines.length === 0) return [];

  const isChild = line => line.spaces > spaces;
  const parsedValue = parseLine(_.head(lines).value);
  const children = _.takeWhile(_.tail(lines), isChild);

  const tree = Object.assign({}, parsedValue, {
    parameters: parsedValue.parameters.concat(makeTree(children, spaces + 2))
  });

  const tail = _.drop(lines, children.length + 1);
  return [tree].concat(makeTree(tail, spaces));
};

module.exports = code => {
  const lines = divide(code)
    .map(line => ({
      value: line.trim(),
      spaces: line.search(/\S/)
    })) // count spaces in the beginning of a line
    .filter(line => line.spaces >= 0) // filter empty lines
    .filter(line => !line.value.startsWith("//")); // filter commented lines

  return makeTree(lines);
};
