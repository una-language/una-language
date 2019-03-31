const naryOperation = symbol => (translate, operands) =>
  `(${operands.map(translate).join(` ${symbol} `)})`;
const unaryOperation = symbol => (translate, [operand]) =>
  `(${symbol}${translate(operand)})`;
const binaryOperation = symbol => (translate, [first, second]) =>
  naryOperation(symbol)(translate, [first, second]);
const changingArityOperation = symbol => (translate, operands) =>
  operands.length === 1
    ? unaryOperation(symbol)(translate, operands)
    : naryOperation(symbol)(translate, operands);

const createFunction = (translate, lines, parameters) => {
  const last = translate(lines[lines.length - 1]);
  const params = parameters.length ? parameters.map(translate).join(", ") : [];
  const body = lines
    .slice(0, -1)
    .map(translate)
    .map(line => `${line};`)
    .join(" ");

  return lines.length === 1
    ? `(${params}) => (${last})`
    : `(${params}) => {${body} return ${last};}`;
};

const createObjectField = (translate, field) => {
  if (!Array.isArray(field)) return field;
  const [head, ...tail] = field;
  return tail.length ? `${head} : ${translate(tail)}` : head;
};

const rules = {
  "=": (translate, [head, ...tail]) =>
    `const ${translate(head)} = ${translate(
      tail.length === 1 && Array.isArray(tail[0]) ? tail[0] : tail
    )};`,
  "?": (translate, [condition, left, right]) =>
    `(${translate(condition)} ? ${translate(left)} : ${translate(right)})`,

  "|": (translate, elements) => `[${elements.map(translate).join(", ")}]`,
  ":": (translate, fields) =>
    `{${fields.map(field => createObjectField(translate, field)).join(", ")}}`,
  ".": (translate, [head, ...tail]) =>
    `${translate(head)}${tail.map(field => `['${field}']`).join("")}`,

  "->": (translate, [parameters, ...lines]) =>
    createFunction(translate, lines, parameters),

  "<--": (translate, path) => `require(${translate(path)})`,
  "-->": (translate, entity) => `module.exports = ${translate(entity)};`,

  "+": naryOperation("+"),
  "-": changingArityOperation("-"),
  "*": naryOperation("*"),
  "/": naryOperation("/"),
  "%": naryOperation("%"),

  "&&": naryOperation("&&"),
  "||": naryOperation("||"),
  "!": unaryOperation("!"),

  ">": binaryOperation(">"),
  ">=": binaryOperation(">="),
  "<": binaryOperation("<"),
  "<=": binaryOperation("<="),
  "==": binaryOperation("=="),
  "!=": binaryOperation("!="),
  "===": binaryOperation("==="),
  "!==": binaryOperation("!==")
};

const translate = expression => {
  if (!Array.isArray(expression)) return expression;
  const [head, ...tail] = expression;
  return tail.length
    ? rules.hasOwnProperty(head)
      ? rules[head](translate, tail)
      : `${translate(head)}(${tail.map(translate).join(", ")})`
    : head;
};

module.exports = translate;
