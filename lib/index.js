global.Sova = {
  list: require("./list"),
  map: require("./map"),
  condition: (condition, trueBranch, falseBranch) =>
    condition ? trueBranch : falseBranch,
  plus: (...operands) => operands.reduce((a, b) => a + b),
  minus: (...operands) => operands.reduce((a, b) => a - b),
  multiply: (...operands) => operands.reduce((a, b) => a * b),
  divide: (...operands) => operands.reduce((a, b) => a / b),
  mod: (...operands) => operands.reduce((a, b) => a % b),
  and: (...operands) => operands.reduce((a, b) => a && b),
  or: (...operands) => operands.reduce((a, b) => a || b),
  not: value => !value,
  greater: (first, second) => first > second,
  greaterOrEquals: (first, second) => first >= second,
  less: (first, second) => first < second,
  lessOrEquals: (first, second) => first <= second,
  equals: (first, second) => first == second,
  accuratlyEquals: (first, second) => first === second,
  notEquals: (first, second) => first != second,
  notAccuratlyEquals: (first, second) => first !== second,
  multiline: (...strings) => strings.join("\n"),
  print: object => console.log(!!object ? object.toString() : object)
};
