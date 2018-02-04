const assert = require('chai').assert
const List = require('.')

const test = tests =>
  describe('List', () =>
    Object.keys(tests).forEach(functionName => {
      const name = `${functionName} should work`
      it(name, tests[functionName])
    }))

test({
  add: () => {
    const list = List(1, 2, 3)
    const result = list.add(4)

    assert(result.size === 4)
    assert((result[3] = 4))
  },
  addFirst: () => {
    const list = List(1, 2, 3)
    const result = list.addFirst(0)

    assert(result.size === 4)
    assert(result[0] === 0)
  },
  addLast: () => {
    const list = List(1, 2, 3)
    const result = list.addLast(4)

    assert(result.size === 4)
    assert((result[3] = 4))
  },
  drop: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.drop(1).length === 2)
    assert(list.drop(1)[0] === 2)
    assert(list.drop(1)[1] === 3)
    assert(emptyList.drop(1).length === 0)
  },
  dropRight: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.dropRight(1).length === 2)
    assert(list.dropRight(1)[0] === 1)
    assert(list.dropRight(1)[1] === 2)
    assert(emptyList.dropRight(1).length === 0)
  },
  dropWhile: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.dropWhile(number => number < 2).length === 2)
    assert(list.dropWhile(number => number < 2)[0] === 2)
    assert(list.dropWhile(number => number < 2)[1] === 3)
    assert(emptyList.dropWhile(number => number < 2).length === 0)
  },
  dropUntil: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.dropUntil(number => number > 1).length === 2)
    assert(list.dropUntil(number => number > 1)[0] === 2)
    assert(list.dropUntil(number => number > 1)[1] === 3)
    assert(emptyList.dropUntil(number => number > 1).length === 0)
  },
  exists: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.exists(element => element > 2))
    assert(!list.exists(element => element > 3))
    assert(!emptyList.exists(element => element > 0))
  },
  forAll: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.forAll(element => element > 0))
    assert(!list.forAll(element => element > 1))
    assert(emptyList.forAll(element => element > 1))
  },
  head: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.head === 1)
    assert(emptyList.head === undefined)
  },
  length: () => {
    const list = List(1, 2, 3)

    assert(list.length === 3)
  },
  map: () => {
    const list = List(1, 2, 3)

    assert(list.map(number => number + 1).length === 3)
    assert(list.map(number => number + 1)[0] === 2)
    assert(list.map(number => number + 1)[1] === 3)
    assert(list.map(number => number + 1)[2] === 4)
  },
  size: () => {
    const list = List(1, 2, 3)

    assert(list.size === 3)
  },
  tail: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.tail.length === 2)
    assert(list.tail[0] === 2)
    assert(list.tail[1] === 3)
    assert(emptyList.tail.length === 0)
  },
  take: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.take(2).length === 2)
    assert(list.take(2)[0] === 1)
    assert(list.take(2)[1] === 2)
    assert(emptyList.take(2).length === 0)
  },
  takeRight: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.takeRight(2).length === 2)
    assert(list.takeRight(2)[0] === 2)
    assert(list.takeRight(2)[1] === 3)
    assert(emptyList.takeRight(2).length === 0)
  },
  takeWhile: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.takeWhile(number => number < 3).length === 2)
    assert(list.takeWhile(number => number < 3)[0] === 1)
    assert(list.takeWhile(number => number < 3)[1] === 2)
    assert(emptyList.takeWhile(number => number < 3).length === 0)
  },
  takeUntil: () => {
    const list = List(1, 2, 3)
    const emptyList = List()

    assert(list.takeUntil(number => number > 2).length === 2)
    assert(list.takeUntil(number => number > 2)[0] === 1)
    assert(list.takeUntil(number => number > 2)[1] === 2)
    assert(emptyList.takeUntil(number => number > 2).length === 0)
  }
})
