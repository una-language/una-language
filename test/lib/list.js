const assert = require("chai").assert;
const ImmutableList = require("../../src/lib/list");

const test = tests =>
  describe("List", () =>
    Object.keys(tests).forEach(functionName => {
      const name = `${functionName} should work`;
      it(name, tests[functionName]);
    }));

test({
  add: () => {
    const source = ImmutableList([1, 2, 3]);
    const result = source.add(4);

    assert(result.size === 4);
    assert((result[3] = 4));
  },
  addFirst: () => {
    const source = ImmutableList([1, 2, 3]);
    const result = source.addFirst(0);

    assert(result.size === 4);
    assert(result[0] === 0);
  },
  addLast: () => {
    const source = ImmutableList([1, 2, 3]);
    const result = source.addLast(4);

    assert(result.size === 4);
    assert((result[3] = 4));
  }
});
