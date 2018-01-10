const assert = require("chai").assert;
const ImmutableList = require("../src/lib/list");

const test = tests =>
  describe("List", () =>
    Object.keys(tests).forEach(functionName => {
      const name = `${functionName} should work`;
      it(name, tests[functionName]);
    }));

test({
  add: () => {
    const list = ImmutableList(1, 2, 3);
    const result = list.add(4);

    assert(result.size === 4);
    assert((result[3] = 4));
  },
  addFirst: () => {
    const list = ImmutableList(1, 2, 3);
    const result = list.addFirst(0);

    assert(result.size === 4);
    assert(result[0] === 0);
  },
  addLast: () => {
    const list = ImmutableList(1, 2, 3);
    const result = list.addLast(4);

    assert(result.size === 4);
    assert((result[3] = 4));
  },
  exists: () => {
    const list = ImmutableList(1, 2, 3);
    const emptyList = ImmutableList();

    assert(list.exists(element => element > 2));
    assert(!list.exists(element => element > 3));
    assert(!emptyList.exists(element => element > 0));
  },
  forAll: () => {
    const list = ImmutableList(1, 2, 3);
    const emptyList = ImmutableList();

    assert(list.forAll(element => element > 0));
    assert(!list.forAll(element => element > 1));
    assert(emptyList.forAll(element => element > 1));
  },
  head: () => {
    const list = ImmutableList(1, 2, 3);
    const emptyList = ImmutableList();

    assert(list.head === 1);
    assert(emptyList.head === undefined);
  },
  length: () => {
    const list = ImmutableList(1, 2, 3);

    assert(list.length === 3);
  },
  size: () => {
    const list = ImmutableList(1, 2, 3);

    assert(list.size === 3);
  },
  tail: () => {
    const list = ImmutableList(1, 2, 3);
    const emptyList = ImmutableList();

    assert(list.tail.length === 2);
    assert(list.tail[0] === 2);
    assert(list.tail[1] === 3);
    assert(emptyList.tail === undefined);
  }
});
