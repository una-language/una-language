const _ = require("lodash");

const space = /^\s/;
const leftParenthesis = /^\(/;
const rightParenthesis = /^\)/;
const literal = /^[^\s\(\)]+/;

const tokenize = (line, tree = [], stack = []) => {
  const lineTail = headLength => line.substring(headLength, line.length);

  if (line.length === 0) return tree;
  if (space.exec(line)) return tokenize(lineTail(1), tree, stack);
  if (leftParenthesis.exec(line))
    return tokenize(lineTail(1), [], stack.concat([tree]));

  if (rightParenthesis.exec(line)) {
    const parentTree = stack.pop();
    return tokenize(
      lineTail(1),
      parentTree ? parentTree.concat([tree]) : tree,
      stack
    );
  }

  const token = literal.exec(line)[0];
  return tokenize(lineTail(token.length), tree.concat(token), stack);
};

module.exports = tokenize;
