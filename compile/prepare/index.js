const _ = require("lodash");

const makeTree = (lines, spaces = 0) => {
  if (lines.length === 0) return [];

  const isChild = line => line.spaces > spaces;
  const children = _.takeWhile(_.tail(lines), isChild);

  const tree = {
    line: _.head(lines).line,
    children: makeTree(children, spaces + 2)
  };

  const tail = _.drop(lines, children.length + 1);
  return [tree].concat(makeTree(tail, spaces));
};

module.exports = makeTree;
