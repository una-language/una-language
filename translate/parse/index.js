const _ = require("lodash");
const clean = require("./clean");
const structurize = require("./structurize");
const tokenize = require("./tokenize");

module.exports = code => {
  const lines = clean(code);
  const structure = structurize(lines);

  const tokenizeStructure = ({ line, children }) => {
    const lineTokens = tokenize(line);
    const childrenTokens = children.map(tokenizeStructure);
    return lineTokens.concat(childrenTokens);
  };

  return structure.map(tokenizeStructure);
};
