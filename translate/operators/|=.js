module.exports = (evaluate, [list, ...elements]) =>
  `const [${elements.join(", ")}] = ${evaluate(list)};`;

