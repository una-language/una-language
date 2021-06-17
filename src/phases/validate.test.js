const createOperators = require('../operators')
const setDefaultConfig = require('../config')
const validate = require('./validate')(createOperators(setDefaultConfig({})))

const throwsError = (expression, message) => {
  const validation = () => validate([expression])
  return expect(validation).toThrowError(message)
}

const notThrowsError = expression => {
  const validation = () => validate([expression])
  return expect(validation).not.toThrowError()
}

const createParams = count => new Array(count).fill('a')
const checkParametersCount = (operator, minimumCount, maximumCount) => {
  for (let i = 0; i < minimumCount - 1; i++) {
    throwsError([operator, ...createParams(i)], `${operator} should have at least ${minimumCount} operands`)
  }

  if (maximumCount === undefined) {
    notThrowsError([operator, ...createParams(minimumCount)])
    return
  }

  for (let j = minimumCount; j < maximumCount; j++) {
    notThrowsError([operator, ...createParams(j)])
  }

  throwsError(
    [operator, ...createParams(maximumCount + 1)],
    `${operator} should have no more than ${maximumCount} operands`
  )
}

test('+', () => {
  checkParametersCount('+', 2)
})

test('-', () => {
  checkParametersCount('-', 1)
})

test('!', () => {
  checkParametersCount('!', 1, 1)
})

test('!!', () => {
  checkParametersCount('!!', 1, 1)
})

test('>', () => {
  checkParametersCount('>', 2, 2)
})

test('>=', () => {
  checkParametersCount('>', 2, 2)
})

test('<', () => {
  checkParametersCount('<', 2, 2)
})

test('<=', () => {
  checkParametersCount('<=', 2, 2)
})

test('==', () => {
  checkParametersCount('==', 2, 2)
})

test('~=', () => {
  checkParametersCount('~=', 2, 2)
})

test('!=', () => {
  checkParametersCount('!=', 2, 2)
})

test('!~=', () => {
  checkParametersCount('!~=', 2, 2)
})

test('=', () => {
  checkParametersCount('=', 2)
})

test('?', () => {
  checkParametersCount('?', 2, 3)
})

test('?!', () => {
  checkParametersCount('?!', 2)
})

test('->', () => {
  checkParametersCount('->', 2)
})

test('-->', () => {
  checkParametersCount('-->', 2)
})

test('|->', () => {
  checkParametersCount('|->', 2, 3)
})

test('|>', () => {
  checkParametersCount('<|', 2)
})

test('<-', () => {
  checkParametersCount('<-', 1)
})

test('<--', () => {
  checkParametersCount('<--', 1)
})

test('<-|', () => {
  checkParametersCount('<-|', 1, 1)
})

test('<|', () => {
  checkParametersCount('<|', 2)
})

test('new', () => {
  checkParametersCount('new', 1)
})

test('typeof', () => {
  checkParametersCount('typeof', 1, 1)
})

test('instanceof', () => {
  checkParametersCount('instanceof', 2, 2)
})
