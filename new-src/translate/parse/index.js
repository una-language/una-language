const _ = require("lodash");

const divide = code => {
  if (!code.includes("\n")) return [code];

  const lines = code.split("\n");
  const last = _.last(lines);

  return !last ? _.dropRight(lines, 1) : lines;
};

const makeTree = (lines, spaces = 0) => {
  if (lines.length === 0) return [];

  const isChild = line => line.spaces > spaces;
  const children = _.takeWhile(_.tail(lines), isChild);

  const tree = {
    value: _.head(lines).value,
    parameters: children.length ? makeTree(children, spaces + 2) : undefined
  };

  const tail = _.drop(lines, children.length + 1);
  return [tree].concat(makeTree(tail, spaces));
};

module.exports = code => {
  const lines = divide(code)
    .map(line => ({
      value: line.trim(),
      spaces: line.search(/\S/)
    }))
    .filter(line => line.spaces >= 0);

  return makeTree(lines);
};
