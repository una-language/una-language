const replacements = {
  ">_": "print",
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
  "!==": "notAccuratlyEquals",
  "++": "createInstance",
  "|>": "handlePromise"
};

const replace = expression =>
  Array.isArray(expression)
    ? expression.map(replace)
    : replacements.hasOwnProperty(expression)
      ? `Sova.${replacements[expression]}`
      : expression;

module.exports = replace;
