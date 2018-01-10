const _ = require("lodash");

const categorize = input => {
  if (!isNaN(parseFloat(input)))
    return { type: "number", value: parseFloat(input) };

  if (input[0] === '"' && input.slice(-1) === '"')
    return { type: "string", value: input.slice(1, -1) };

  return { type: "identifier", value: input };
};

const parenthesize = (input, list) => {
  if (!list) return parenthesize(input, []);

  const token = input.shift();
  if (!token) return list.pop();
  if (token === "(") {
    list.push(parenthesize(input, []));
    return parenthesize(input, list);
  }
  if (token === ")") return list;

  return parenthesize(input, list.concat(categorize(token)));
};

const tokenize = input =>
  input
    .split('"')
    .map(
      (token, index) =>
        index % 2 === 0
          ? token.replace(/\(/g, " ( ").replace(/\)/g, " ) ")
          : token.replace(/ /g, "!whitespace!")
    )
    .join('"')
    .trim()
    .split(/\s+/)
    .map(token => token.replace(/!whitespace!/g, " "));

const transformParts = parts =>
  Array.isArray(parts)
    ? {
        value: parts[0].value,
        parameters: parts.slice(1).map(transformParts)
      }
    : { value: parts.value };

module.exports = line => transformParts(parenthesize(tokenize(`(${line})`)));
