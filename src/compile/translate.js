const application = (head, ...tail) =>
  `${head}(${tail.map(expression).join(", ")})`;

const expression = ast => {
  if (!Array.isArray(ast)) return value(ast);
  if (ast.length === 0) return `()`;
  if (ast.length === 1) return expression(ast[0]);

  const [head, ...tail] = ast;
  if (languageConstructions.hasOwnProperty(head))
    return languageConstructions[head](...tail);

  return application(head, ...tail);
};

const languageConstructionsHelpers = {
  nary: symbol => (...parameters) =>
    parameters.map(expression).join(` ${symbol} `)
};

const languageConstructions = {
  "=": (left, ...right) => `const ${expression(left)} = ${expression(right)};`,

  "+": languageConstructionsHelpers.nary("+")
};

const value = ast => ast;

module.exports = expression;
