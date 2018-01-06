const assert = require("chai").assert;
const { divide, parse, prepare, translate } = require("../src/phases");
const compile = content => translate(parse(prepare(divide(content))));

const test = tests =>
  describe("Declaration of", () =>
    Object.keys(tests).forEach(dataType =>
      it(`${dataType} should work`, () => {
        const { input, output } = tests[dataType];
        const compiledInput = compile(input);
        const dividedOutput = divide(output);

        assert(
          compiledInput.every((line, index) => line === dividedOutput[index])
        );
      })
    ));

test({
  array: {
    input: `array = [1, 2, 3]`,
    output: `const array = [1, 2, 3];`
  },
  boolean: {
    input: `visible = true`,
    output: `const visible = true;`
  },
  float: {
    input: `count = 1.5`,
    output: `const count = 1.5;`
  },
  integer: {
    input: `count = 1`,
    output: `const count = 1;`
  },
  string: {
    input: `name = 'John'`,
    output: `const name = 'John';`
  }
});
