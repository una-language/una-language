module.exports = {
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
};
