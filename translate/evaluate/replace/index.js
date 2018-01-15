const replace = expression => {
  switch (expression) {
    case "|":
      return "Sova.list";
    case "?":
      return "Sova.condition";
    case "+":
      return "Sova.plus";
    case "-":
      return "Sova.minus";
    case "*":
      return "Sova.multiply";
    case "/":
      return "Sova.divide";
    case "%":
      return "Sova.mod";
    case "&&":
      return "Sova.and";
    case "||":
      return "Sova.or";
    case "!":
      return "Sova.not";
    case ">":
      return "Sova.greater";
    case ">=":
      return "Sova.greaterOrEquals";
    case "<":
      return "Sova.less";
    case "<=":
      return "Sova.lessOrEquals";
    case "==":
      return "Sova.equals";
    case "==":
      return "Sova.accuratlyEquals";
    case "!=":
      return "Sova.notEquals";
    case "!==":
      return "Sova.notAccuratlyEquals";
    case "`":
      return "Sova.multiline";
    default:
      return expression;
  }
};

module.exports = expression =>
  Array.isArray(expression) ? expression : replace(expression);
