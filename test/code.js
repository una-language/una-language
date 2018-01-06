const assert = require("chai").assert;
const { divide, parse, prepare, translate } = require("../src/phases");
const compile = content => translate(parse(prepare(divide(content))));

const test = tests =>
  Object.keys(tests).forEach(testName =>
    describe(testName, () => {
      const test = tests[testName];
      Object.keys(test).forEach(testCaseName =>
        it(testCaseName, () => {
          const { input, output } = test[testCaseName];
          const compiledInput = compile(input);
          const dividedOutput = divide(output);

          assert(
            compiledInput.every((line, index) => line === dividedOutput[index])
          );
        })
      );
    })
  );

test({
  "Integer declaration": {
    "should be compiled well": {
      input: `count = 1`,
      output: `const count = 1;`
    }
  },
  "Float declaration": {
    "should be compiled well": {
      input: `count = 1.5`,
      output: `const count = 1.5;`
    }
  },
  "String declaration": {
    "should be compiled well": {
      input: `name = 'John'`,
      output: `const name = 'John';`
    }
  },
  "Boolean declaration": {
    "should be compiled well": {
      input: `visible = true`,
      output: `const visible = true;`
    }
  }
});
