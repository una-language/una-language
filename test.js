const assert = require("chai").assert;
const { divide, parse, prepare, translate } = require("./phases");
const tests = require("./tests");

const compile = content => translate(parse(prepare(divide(content))));

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
