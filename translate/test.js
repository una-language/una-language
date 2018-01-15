const assert = require("chai").assert;
const translate = require(".");

const formatInput = input => {
  const splitted = input.includes("\n") ? input.split("\n") : [input];
  const lines = splitted.filter(line => line);
  const commonSpaces = lines[0].search(/\S/);
  const formatLine = line => line.substring(commonSpaces, line.length);
  return lines.map(formatLine).join("\n");
};

const formatOutput = (output, needToSlice = false) => {
  const splitted = output.includes("\n") ? output.split("\n") : [output];
  const lines = splitted.filter(line => line);
  const spliced = needToSlice ? lines.slice(1) : lines;
  return spliced.map(line => line.trim()).filter(line => line);
};

const check = (input, output) => {
  const expectingOutput = formatOutput(translate(formatInput(input)), true);
  const realOutput = formatOutput(output);

  assert(realOutput.every((line, index) => expectingOutput[index] === line));
};

describe("String", () => {
  describe("one word string", () => {
    it("can be declared in one line", () =>
      check(
        `
        = string 'Hello'
        `,
        `var string = \`Hello\`;`
      ));
    it("can be declared in two lines", () =>
      check(
        `
          = string
            'Hello'
        `,
        `var string = \`Hello\`;`
      ));
    it("can be passed to function", () =>
      check(
        `
        console.log 'Hello'
        `,
        `console.log(\`Hello\`);`
      ));
  });
  describe("two words string", () => {
    it("can be declared in one line", () =>
      check(
        `
          = string 'Hello World!'
        `,
        `var string = \`Hello World!\`;`
      ));
    it("can be declared in two lines", () =>
      check(
        `
          = string
            'Hello World!'
        `,
        `
          var string = \`Hello World!\`;
        `
      ));
    it("can be declared with interpolated incertions", () =>
      check(
        `
          = name 'John'
          = string 'Hello \${name}'
        `,
        `
          var name = \`John\`;
          var string = \`Hello \${name}\`;
        `
      ));
    it("can be passed to function", () =>
      check(
        `
          console.log
            'Hello World!'
          `,
        `
          console.log(\`Hello World!\`);
        `
      ));
  });

  // describe("multiple lines string", () => {
  //   it("can be declared", () =>
  //     check(
  //       `
  //         = string \`
  //           'One two three'
  //           'Four five six'
  //           'Seven eight nine'
  //       `,
  //       `
  //         var string = \`One two three
  //           Four five six
  //           Seven eight nine\`;
  //       `
  //     ));
  //
  //   it("can be declared with interpolated incertions", () =>
  //     check(
  //       `
  //         = number 'three'
  //         = string \`
  //           'One two \${number}'
  //           'Four five six'
  //           'Seven eight nine'
  //       `,
  //       `
  //         var number = \`three\`;
  //         var string = \`One two \${number}
  //           Four five six
  //           Seven eight nine\`;
  //       `
  //     ));
  // });
});

describe("Number", () => {
  describe("integer number", () => {
    it("can be declared", () => check(`= integer 1`, `var integer = 1;`));
  });
  describe("float number", () => {
    it("can be declared", () => check(`= float 1.4`, `var float = 1.4;`));
  });
});
