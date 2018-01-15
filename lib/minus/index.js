module.exports = (...operands) =>
  operands.length === 1 ? -operands[0] : operands.reduce((a, b) => a - b);
