const replacements = {
  "`": "multiline",
  "|": "list",
  "+": "plus",
  "-": "minus",
  "*": "multiply",
  "/": "divide",
  "%": "mod",
  "?": "condition",
  "&&": "and",
  "||": "or",
  "!": "not",
  ">": "greater",
  ">=": "greaterOrEquals",
  "<": "less",
  "<=": "lessOrEquals",
  "==": "equals",
  "===": "accuratlyEquals",
  "!=": "notEquals",
  "!==": "notAccuratlyEquals"
};

const replace = expression =>
  Array.isArray(expression)
    ? expression.map(replace)
    : replacements[expression]
      ? `Sova.${replacements[expression]}`
      : expression;

module.exports = replace;
