module.exports = (evaluate, expression) => {
  const parameters = expression
    .slice(1)
    .map(line => (Array.isArray(line) ? line.join(" ") : line))
    .join("\n");

  return "`" + parameters + "`";
};
