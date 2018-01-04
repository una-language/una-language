const _ = require("lodash");

const translateLine = line => {
  if (line.type === "declare") return `const ${line.name} = ${line.value};`;

  throw new Error(`Can not translate the line ${line}`);
};

const translate = lines => {
  if (lines.length === 0) return [];

  const translatedLine = translateLine(_.head(lines));
  const translatedTail = translate(_.tail(lines));

  return [translatedLine].concat(translatedTail);
};

module.exports = translate;
